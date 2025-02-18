"use client";

import { useState, useEffect } from "react";
import RichtextEditor from "./RichtextEditor";

const UploadSingleProduct = ({ productToEdit }: { productToEdit?: any }) => {
  // SKU is now optional whether creating a new product or updating
  const [sku, setSku] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [collection, setCollection] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [variants, setVariants] = useState<
    { sku: string; images: string; options: { name: string; value: string }[] }[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // Array of booleans to track whether each variant is expanded (dropdown)
  const [expandedVariants, setExpandedVariants] = useState<boolean[]>([]);

  useEffect(() => {
    if (productToEdit) {
      // For updates, prefill fields from productToEdit. SKU may be empty.
      setSku(productToEdit.id || "");
      setTitle(productToEdit.title || "");
      setDescription(productToEdit.description || "");
      setCollection(productToEdit.collection || "");
      setTags(productToEdit.tags ? productToEdit.tags.join(", ") : "");
      setImages(productToEdit.images ? productToEdit.images.join(", ") : "");
      setVariants(
        productToEdit.variants && productToEdit.variants.length > 0
          ? productToEdit.variants
          : [{ sku: "", images: "", options: [{ name: "", value: "" }] }]
      );
    }
  }, [productToEdit]);

  // Initialize expanded state whenever the number of variants changes
  useEffect(() => {
    setExpandedVariants(new Array(variants.length).fill(false));
  }, [variants.length]);

  const toggleVariantExpansion = (index: number) => {
    setExpandedVariants((prev) =>
      prev.map((expanded, idx) => (idx === index ? !expanded : expanded))
    );
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prevVariants) =>
      prevVariants.filter((_, variantIndex) => variantIndex !== index)
    );
  };

  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter(
      (_, optIndex) => optIndex !== optionIndex
    );
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      { sku: "", images: "", options: [{ name: "", value: "" }] },
    ]);
  };

  const handleVariantChange = (
    index: number,
    field: "sku" | "images",
    value: string
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddOption = (variantIndex: number) => {
    const updatedVariants = [...variants];
    if (updatedVariants[variantIndex].options.length < 3) {
      updatedVariants[variantIndex].options.push({ name: "", value: "" });
      setVariants(updatedVariants);
    }
  };

  const handleOptionChange = (
    variantIndex: number,
    optionIndex: number,
    field: "name" | "value",
    value: string
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options[optionIndex][field] = value;
    setVariants(updatedVariants);
  };

  const handleUpload = async () => {
    // SKU is optional now. For variants, we require only that images are provided.
    if (
      !title ||
      !description ||
      !collection ||
      !tags ||
      !images ||
      variants.some((v) => !v.images)
    ) {
      setMessage("Please fill out all the required fields.");
      return;
    }

    setIsUploading(true);

    const productData = {
      sku, // May be empty
      title,
      description,
      collection,
      tags: tags.split(",").map((tag) => tag.trim()),
      images: images.split(",").map((img) => img.trim()),
      variants,
    };

    try {
      const res = await fetch("/api/upload-single-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Product uploaded successfully!");
        // For new products, clear the form; for updates, you might choose to retain values.
        if (!productToEdit) {
          setSku("");
          setTitle("");
          setDescription("");
          setCollection("");
          setTags("");
          setImages("");
          setVariants([]);
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during upload:", error.message);
        setMessage(`An unexpected error occurred: ${error.message}`);
      } else {
        console.error("Unknown error during upload:", error);
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {productToEdit ? "Update Product" : "Upload Single Product"}
      </h2>

      {/* Always render SKU field if you want to allow manual changes; it's optional */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          SKU (optional)
        </label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU is optional"
          className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <RichtextEditor value={description} onChange={setDescription} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Collection
        </label>
        <input
          type="text"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Images (comma-separated URLs)
        </label>
        <input
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Variants</h3>
      {variants.map((variant, variantIndex) => (
        <div key={variantIndex} className="mb-4 border rounded">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleVariantExpansion(variantIndex)}
          >
            <span>
              Variant {variantIndex + 1}{" "}
              {variant.sku ? `- ${variant.sku}` : "- New Variant"}
            </span>
            <span>{expandedVariants[variantIndex] ? "−" : "+"}</span>
          </div>
          {expandedVariants[variantIndex] && (
            <div className="p-4">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">
                  Variant SKU (optional)
                </label>
                <input
                  type="text"
                  value={variant.sku}
                  onChange={(e) =>
                    handleVariantChange(variantIndex, "sku", e.target.value)
                  }
                  placeholder="Optional"
                  className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">
                  Variant Images (comma-separated URLs)
                </label>
                <input
                  type="text"
                  value={variant.images}
                  onChange={(e) =>
                    handleVariantChange(variantIndex, "images", e.target.value)
                  }
                  className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2">Options</h4>
              {variant.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Option Name
                  </label>
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) =>
                      handleOptionChange(
                        variantIndex,
                        optionIndex,
                        "name",
                        e.target.value
                      )
                    }
                    className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
                  />
                  <label className="block text-sm font-medium text-gray-600 mt-2">
                    Option Value
                  </label>
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) =>
                      handleOptionChange(
                        variantIndex,
                        optionIndex,
                        "value",
                        e.target.value
                      )
                    }
                    className="mt-1 p-2 text-gray-900 w-full border border-gray-400"
                  />
                  <button
                    onClick={() => handleRemoveOption(variantIndex, optionIndex)}
                    className="text-red-600 underline mt-2 bg-red-50 hover:bg-red-100"
                  >
                    Remove Option
                  </button>
                </div>
              ))}
              <div className="flex gap-4">
                <button
                  onClick={() => handleAddOption(variantIndex)}
                  className="text-green-800 underline mt-4 bg-green-50 hover:bg-green-100"
                  disabled={variant.options.length >= 3}
                >
                  + Add Option
                </button>
                <button
                  onClick={() => handleRemoveVariant(variantIndex)}
                  className="text-red-600 underline mt-4 bg-red-50 hover:bg-red-100"
                >
                  Remove Variant
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex w-full justify-between">
        <button
          onClick={handleAddVariant}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4"
        >
          + Add Variant
        </button>
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadSingleProduct;
