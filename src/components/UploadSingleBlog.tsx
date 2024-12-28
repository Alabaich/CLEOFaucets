import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { generateJSON } from "@tiptap/html";

const UploadSingleBlog = ({ blogToEdit }: { blogToEdit: any }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [readingTime, setReadingTime] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: blogToEdit
      ? generateJSON(blogToEdit.content, [StarterKit]) 
      : "", 
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setImage(blogToEdit.image);
      setTags(blogToEdit.tags.join(", "));
      setReadingTime(blogToEdit.readingTime || 0);

      if (editor) {
        editor.commands.setContent(generateJSON(blogToEdit.content, [StarterKit]));
      }
    }
  }, [blogToEdit, editor]);

  const handleSave = async () => {
    if (!title || !content || !image) {
      setMessage("Please fill out all the required fields (title, content, image).");
      return;
    }

    setIsUploading(true);

    const blogData = {
      // If editing, make sure to pass the existing blog ID
      id: blogToEdit?.id,
      title,
      content,
      image,
      tags: tags.split(",").map((tag) => tag.trim()),
      readingTime,
    };

    try {
      // Decide which endpoint to call:
      const endpoint = blogToEdit ? "/api/update-single-blog" : "/api/upload-single-blog";
      // Decide which method to use:
      const method = blogToEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(blogToEdit ? "Blog updated successfully!" : "Blog uploaded successfully!");
        // Clear or refresh logic if needed
        if (!blogToEdit) {
          // Clear inputs only if it was a new upload
          setTitle("");
          setContent("");
          setImage("");
          setTags("");
          setReadingTime(0);
          if (editor) editor.commands.clearContent();
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setMessage(`An unexpected error occurred: ${error.message || error}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md text-gray-200">
      <h2 className="text-2xl font-semibold mb-4">
        {blogToEdit ? "Edit Blog" : "Upload Single Blog"}
      </h2>

      {/* Title input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      {/* Content editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Content</label>
        <div className="bg-white text-gray-900 rounded-md p-2">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Image input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      {/* Reading Time */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200">Reading Time (minutes)</label>
        <input
          type="number"
          value={readingTime}
          onChange={(e) => setReadingTime(Number(e.target.value))}
          className="mt-1 p-2 text-gray-900 w-full"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSave}
        disabled={isUploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading
          ? (blogToEdit ? "Updating..." : "Uploading...")
          : (blogToEdit ? "Update" : "Upload")}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UploadSingleBlog;
