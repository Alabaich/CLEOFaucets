"use client";

import { useState, useEffect } from "react";

const UploadSingleSubcollection = ({ subcollectionToEdit }: { subcollectionToEdit: any }) => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [parentCollection, setParentCollection] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (subcollectionToEdit) {
      setId(subcollectionToEdit.id || null);
      setName(subcollectionToEdit.name);
      setDescription(subcollectionToEdit.description);
      setImage(subcollectionToEdit.image);
      setParentCollection(subcollectionToEdit.collections[0] || ""); // Assuming one parent collection
    }
  }, [subcollectionToEdit]);

  const handleUpload = async () => {
    if (!name || !description || !image || !parentCollection) {
      setMessage("Please fill out all the fields.");
      return;
    }

    setIsUploading(true);

    const subcollectionData = {
      id,
      name,
      description,
      image,
      collections: [parentCollection],
    };

    try {
      const res = await fetch(
        id ? "/api/update-single-subcollection" : "/api/upload-single-subcollection",
        {
          method: id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subcollectionData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(id ? "Subcollection updated successfully!" : "Subcollection created successfully!");
        if (!id) {
          setName("");
          setDescription("");
          setImage("");
          setParentCollection("");
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
        {id ? "Edit Subcollection" : "Upload New Subcollection"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 divide-solid border-[1px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 divide-solid border-[1px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 divide-solid border-[1px]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Parent Collection</label>
        <input
          type="text"
          value={parentCollection}
          onChange={(e) => setParentCollection(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full border-gray-400 divide-solid border-[1px]"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : id ? "Update" : "Create"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadSingleSubcollection;
