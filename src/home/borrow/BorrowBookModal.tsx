import React, { useState } from "react";
import type { Book } from "../Type/book";
import { useBorrowBookMutation } from "@/redux/api/BookCreateApi";
import toast from "react-hot-toast";

type Props = {
  book: Book;
  open: boolean;
  onClose: () => void;
};

const BorrowBookModal: React.FC<Props> = ({ book, open, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async () => {
    if (!dueDate) {
      toast.error("Please select a due date.");
      return;
    }

    const payload = {
      book: book._id,
      quantity,
      dueDate: new Date(dueDate),
    };

    try {
      await borrowBook(payload).unwrap();
      toast.success(`Successfully borrowed "${book.title}"`);
      onClose();
    } catch (error) {
      console.error("Borrow failed:", error);
      toast.error("Failed to borrow book.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Borrow Book</h2>
        <p className="mb-4">
          Borrowing: <strong>{book.title}</strong> by{" "}
          <strong>{book.author}</strong>
        </p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            min={1}
            max={book.copies}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Borrow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowBookModal;
