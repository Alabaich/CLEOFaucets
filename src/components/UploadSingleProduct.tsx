"use client";

import { useState, useEffect } from "react";

const UploadSingleProduct = ({ productToEdit }: { productToEdit: any }) => {
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

  useEffect(() => {
    if (productToEdit) {
      setSku(productToEdit.id); // Set the SKU as product ID (as product has ID not SKU)
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setCollection(productToEdit.collection);
      setTags(productToEdit.tags.join(", "));
      setImages(productToEdit.images.join(", "));
      setVariants(
        productToEdit.variants || [
          { sku: "", images: "", options: [{ name: "", value: "" }] },
        ]
      );
    }
  }, [productToEdit]);

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
    if (
      !sku ||
      !title ||
      !description ||
      !collection ||
      !tags ||
      !images ||
      variants.some((v) => !v.sku || !v.images)
    ) {
      setMessage("Please fill out all the fields.");
      return;
    }

    setIsUploading(true);

    const productData = {
      sku, // This will be the product ID, not SKU
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Product uploaded successfully!");
        setSku(""); // Clear SKU as ID will be used now
        setTitle("");
        setDescription("");
        setCollection("");
        setTags("");
        setImages("");
        setVariants([]);
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
      <h2 className="text-2xl font-semibold mb-4">Upload Single Product</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">SKU</label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Collection
        </label>
        <input
          type="text"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
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
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
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
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Variants</h3>
      {variants.map((variant, variantIndex) => (
        <div key={variantIndex} className="mb-4 border p-4 rounded">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Variant SKU
            </label>
            <input
              type="text"
              value={variant.sku}
              onChange={(e) =>
                handleVariantChange(variantIndex, "sku", e.target.value)
              }
              className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
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
              className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
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
                  handleOptionChange(variantIndex, optionIndex, "name", e.target.value)
                }
                className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
              />
              <label className="block text-sm font-medium text-gray-600 mt-2">
                Option Value
              </label>
              <input
                type="text"
                value={option.value}
                onChange={(e) =>
                  handleOptionChange(variantIndex, optionIndex, "value", e.target.value)
                }
                className="mt-1 p-2 text-gray-900 w-full border-gray-400 border-[1px]"
              />
            </div>
          ))}
          <button
            onClick={() => handleAddOption(variantIndex)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-2"
            disabled={variant.options.length >= 3}
          >
            + Add Option
          </button>
        </div>
      ))}
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

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadSingleProduct;
