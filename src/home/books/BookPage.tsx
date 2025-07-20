import { useState } from "react";
import type { Book } from "../Type/book";
import { BookTable } from "./BookTable";
import { BookColumns } from "./columns";
import EditBookModal from "../updatebook/EditBookModal";
import DeleteBookModal from "../DeleteBook/DeleteBookModal";
import BookDetailsModal from "./BookDetailsModal";
import BorrowBookModal from "../borrow/BorrowBookModal";
import { BookAddModal } from "../bookadd/BookForm";
import BorrowSummaryModal from "../borrow/BorrowSummaryModal";
import { useGetBookQuery } from "@/redux/api/BookCreateApi";

export default function BookPage() {
  const { data, isLoading, isError, error } = useGetBookQuery(undefined);

  // Modal states
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedDeleteBook, setSelectedDeleteBook] = useState<Book | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDetailsBook, setSelectedDetailsBook] = useState<Book | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedBorrowBook, setSelectedBorrowBook] = useState<Book | null>(null);
  const [openBorrowModal, setOpenBorrowModal] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  // Handlers
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setOpenEditModal(true);
  };

  const handleDelete = (book: Book) => {
    setSelectedDeleteBook(book);
    setOpenDeleteModal(true);
  };

  const handleDetails = (book: Book) => {
    setSelectedDetailsBook(book);
    setOpenDetailsModal(true);
  };

  const handleBorrow = (book: Book) => {
    setSelectedBorrowBook(book);
    setOpenBorrowModal(true);
  };

  const books: Book[] = data?.data ?? [];

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading books...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center mt-10">
        Error loading books:{" "}
        {"status" in error ? JSON.stringify(error.status) : "Unknown error"}
      </p>
    );
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          📚 Book List
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <BookAddModal />
          <button
            onClick={() => setOpenSummaryModal(true)}
            className="bg-blue-100 text-blue-800 font-semibold text-sm px-3 py-1.5 rounded-md shadow hover:bg-blue-200 transition whitespace-nowrap"
          >
            📘 Borrow Summary
          </button>
        </div>
      </div>

      {/* Book Table Section */}
      <div className="overflow-x-auto">
        <BookTable
          columns={BookColumns(handleEdit, handleDelete, handleDetails, handleBorrow)}
          data={books}
        />
      </div>

      {/* Modals */}
      {openEditModal && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={() => setOpenEditModal(false)}
          open={openEditModal}
        />
      )}
      {openDeleteModal && selectedDeleteBook && (
        <DeleteBookModal
          book={selectedDeleteBook}
          onClose={() => setOpenDeleteModal(false)}
          open={openDeleteModal}
        />
      )}
      {openDetailsModal && selectedDetailsBook && (
        <BookDetailsModal
          book={selectedDetailsBook}
          onClose={() => setOpenDetailsModal(false)}
          open={openDetailsModal}
        />
      )}
      {openBorrowModal && selectedBorrowBook && (
        <BorrowBookModal
          book={selectedBorrowBook}
          onClose={() => setOpenBorrowModal(false)}
          open={openBorrowModal}
        />
      )}
      <BorrowSummaryModal
        open={openSummaryModal}
        onClose={() => setOpenSummaryModal(false)}
      />
    </div>
  );
}
