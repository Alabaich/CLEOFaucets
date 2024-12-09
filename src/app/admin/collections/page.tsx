"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import UploadSingleCollection from "../../../components/UploadSingleCollection";
import { FaEllipsisV } from "react-icons/fa";

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string; // Include slug for collections
}

const CollectionsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showUploadSingleCollection, setShowUploadSingleCollection] = useState<boolean>(false);
  const [collectionToEdit, setCollectionToEdit] = useState<Collection | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("/api/get-collections");
        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await res.json();
        setCollections(data.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []);

  const handleMenuClick = () => {
    setShowUploadSingleCollection(true);
    setShowMenu(false);
  };

  const handleEditClick = (collection: Collection) => {
    setCollectionToEdit(collection);
    setShowUploadSingleCollection(true);
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
        <h1 className="text-3xl font-semibold text-black">Collections</h1>
        <div className="relative">
          <FaEllipsisV
            className="cursor-pointer fill-black stroke-black"
            size={20}
            onClick={() => setShowMenu((prev) => !prev)}
          />
          {showMenu && (
            <div className="absolute top-6 right-0 bg-white shadow-md rounded-md p-2 w-40">
              <button
                className="w-full text-left py-2 px-4 text-sm bg-white hover:bg-blue-100"
                onClick={handleMenuClick}
              >
                Add Collection
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="py-6">
        {showUploadSingleCollection && (
          <UploadSingleCollection collectionToEdit={collectionToEdit} />
        )}
      </div>

      {loadingCollections ? (
        <p>Loading collections...</p>
      ) : collections.length > 0 ? (
        <div className="flex flex-col flex-wrap gap-4 w-full">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="flex justify-between items-center bg-white shadow-sm p-4 rounded-lg w-full"
            >
              <div className="flex items-center gap-4">
                <img
                  src={collection.image} // Display collection image
                  alt={collection.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h5 className="text-md font-semibold text-black">{collection.name}</h5>
                  <p className="text-sm text-gray-600">Slug: {collection.slug}</p>
                  <p className="text-sm text-gray-600">{collection.description}</p>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => handleEditClick(collection)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No collections found.</p>
      )}
    </div>
  );
};

export default CollectionsPage;
