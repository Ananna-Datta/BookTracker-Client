import { Dialog } from "@headlessui/react";
import type { Book } from "../Type/book";

type Props = {
  book: Book | null;
  open: boolean;
  onClose: () => void;
};

export default function BookDetailsModal({ book, open, onClose }: Props) {
  if (!book) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            📖 Book Details
          </Dialog.Title>

          <div className="space-y-2">
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Copies:</strong> {book.copies}</p>
            <p><strong>Availability:</strong> {book.available ? "Available" : "Unavailable"}</p>
            {book.description && (
              <p><strong>Description:</strong> {book.description}</p>
            )}
            {book.createdAt && (
              <p><strong>Created At:</strong> {new Date(book.createdAt).toLocaleString()}</p>
            )}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
