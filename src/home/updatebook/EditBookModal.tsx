import React, { useEffect, useState } from "react";
import type { Book } from "../Type/book";
import { useUpdateBookMutation } from "@/redux/api/BookCreateApi";

type Props = {
  book: Book | null;
  onClose: () => void;
  open: boolean;
};

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function EditBookModal({ book, onClose, open }: Props) {
  const [formData, setFormData] = useState<Book | null>(book);
  const [updateBook, { isLoading, isError }] = useUpdateBookMutation();

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "copies"
                ? Number(value)
                : value,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const updatedBook = {
      ...formData,
      available: formData.copies > 0,
    };

    try {
      await updateBook({ id: updatedBook._id, body: updatedBook }).unwrap();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData?.title || ""}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="author"
            value={formData?.author || ""}
            onChange={handleChange}
            placeholder="Author"
            required
            className="w-full border px-3 py-2 rounded"
          />
          {/* Genre select dropdown */}
          <select
            name="genre"
            value={formData?.genre || ""}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select genre
            </option>
            {genreOptions.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="isbn"
            value={formData?.isbn || ""}
            onChange={handleChange}
            placeholder="ISBN"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={formData?.description || ""}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="copies"
            value={formData?.copies || 0}
            onChange={handleChange}
            placeholder="Copies"
            min={0}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>

          {isError && (
            <p className="text-red-600 mt-2">
              Something went wrong while updating.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
