
import type { Book } from "../Type/book";
import { useDeleteBookMutation } from "@/redux/api/BookCreateApi";

type Props = {
  book: Book | null;
  open: boolean;
  onClose: () => void;
};

export default function DeleteBookModal({ book, open, onClose }: Props) {
  const [deleteBook, { isLoading, isError }] = useDeleteBookMutation();

  if (!open) return null;

  const handleDelete = async () => {
    if (!book) return;
    try {
      await deleteBook(book._id).unwrap();
      onClose();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>
          Are you sure you want to delete the book{" "}
          <strong>{book?.title}</strong>?
        </p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>

        {isError && (
          <p className="text-red-600 mt-2">
            Error deleting book. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
