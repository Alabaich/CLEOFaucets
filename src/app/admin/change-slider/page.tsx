"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

interface PromotionSlide {
  id: string;
  imageUrl: string;
  link: string;
  createdAt: string;
}

const UploadPromotionSlidesPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [slides, setSlides] = useState<PromotionSlide[]>([]);
  const [loadingSlides, setLoadingSlides] = useState<boolean>(true);
  const [showUploadSlideForm, setShowUploadSlideForm] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/get-promotion-slides");
        if (!res.ok) {
          throw new Error("Failed to fetch slides");
        }
        const data = await res.json();
        setSlides(data.slides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoadingSlides(false);
      }
    };

    fetchSlides();
  }, []);

  const handleUploadSlide = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl || !link) {
      alert("Image URL and link are required.");
      return;
    }

    try {
      const res = await fetch("/api/upload-promotion-slide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, link }),
      });

      if (!res.ok) {
        throw new Error("Failed to upload promotion slide.");
      }

      const data = await res.json();
      alert("Slide uploaded successfully!");
      setSlides((prevSlides) => [
        ...prevSlides,
        { id: data.slideId, imageUrl, link, createdAt: new Date().toISOString() },
      ]);

      setImageUrl("");
      setLink("");
      setShowUploadSlideForm(false);
    } catch (error) {
      console.error("Error uploading promotion slide:", error);
      alert("Failed to upload promotion slide. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-black">Promotion Slides</h1>
        <button
          onClick={() => setShowUploadSlideForm((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showUploadSlideForm ? "Cancel" : "Add Slide"}
        </button>
      </div>

      {showUploadSlideForm && (
        <form className="mb-6" onSubmit={handleUploadSlide}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter link"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Slide
          </button>
        </form>
      )}

      {loadingSlides ? (
        <p>Loading slides...</p>
      ) : slides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={slide.imageUrl}
                alt="Promotion Slide"
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Visit Link
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No slides found.</p>
      )}
    </div>
  );
};

export default UploadPromotionSlidesPage;
