"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import UploadSingleSubcollection from "../../../components/UploadSingleSubcollection";
import { FaEllipsisV } from "react-icons/fa";

interface Subcollection {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
}

const SubcollectionsPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [subcollections, setSubcollections] = useState<Subcollection[]>([]);
    const [loadingSubcollections, setLoadingSubcollections] = useState<boolean>(true);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showUploadSingleSubcollection, setShowUploadSingleSubcollection] = useState<boolean>(false);
    const [subcollectionToEdit, setSubcollectionToEdit] = useState<Subcollection | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchSubcollections = async () => {
            try {
                const res = await fetch("/api/get-all-subcollections");
                if (!res.ok) {
                    throw new Error("Failed to fetch subcollections");
                }
                const data = await res.json();
                setSubcollections(data.subcollections || []);
            } catch (error) {
                console.error("Error fetching subcollections:", error);
            } finally {
                setLoadingSubcollections(false);
            }
        };

        fetchSubcollections();
    }, []);

    const handleMenuClick = () => {
        setShowUploadSingleSubcollection(true);
        setShowMenu(false);
    };

    const handleEditClick = (subcollection: Subcollection) => {
        setSubcollectionToEdit(subcollection);
        setShowUploadSingleSubcollection(true);
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
                <h1 className="text-3xl font-semibold text-black">Subcollections</h1>
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
                                Add Subcollection
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="py-6">
                {showUploadSingleSubcollection && (
                    <UploadSingleSubcollection subcollectionToEdit={subcollectionToEdit} />
                )}
            </div>

            {loadingSubcollections ? (
                <p>Loading subcollections...</p>
            ) : subcollections.length > 0 ? (
                <div className="flex flex-col flex-wrap gap-4 w-full">
                    {subcollections.map((subcollection) => (
                        <div
                            key={subcollection.id}
                            className="flex justify-between items-center bg-white shadow-sm p-4 rounded-lg w-full"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={subcollection.image}
                                    alt={subcollection.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h5 className="text-md font-semibold text-black">{subcollection.name}</h5>
                                    <p className="text-sm text-gray-600">Slug: {subcollection.slug}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    onClick={() => handleEditClick(subcollection)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    onClick={async () => {
                                        if (confirm("Are you sure you want to delete this subcollection?")) {
                                            try {
                                                const res = await fetch(`/api/delete-subcollection?id=${subcollection.id}`, { method: "DELETE" });
                                                if (res.ok) {
                                                    setSubcollections(subcollections.filter((sc) => sc.id !== subcollection.id));
                                                } else {
                                                    console.error("Failed to delete subcollection");
                                                }
                                            } catch (error) {
                                                console.error("Error deleting subcollection:", error);
                                            }
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>


                        </div>
                    ))}
                </div>
            ) : (
                <p>No subcollections found.</p>
            )}
        </div>
    );
};

export default SubcollectionsPage;
