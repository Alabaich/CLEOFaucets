'use client';

import { useState } from "react";

const UploadProducts = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel file to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Products uploaded successfully!");
        setFile(null);
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
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Products</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadProducts;
