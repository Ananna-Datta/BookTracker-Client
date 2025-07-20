import type { ColumnDef } from "@tanstack/react-table";
import type { Book } from "../Type/book";

export const BookColumns = (
  onEdit: (book: Book) => void,
  onDelete: (book: Book) => void,
  onDetails: (book: Book) => void,
  onBorrow: (book: Book) => void
): ColumnDef<Book>[] => [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "author", header: "Author" },
  { accessorKey: "genre", header: "Genre" },
  { accessorKey: "isbn", header: "ISBN" },
  { accessorKey: "copies", header: "Copies" },
  {
    accessorKey: "available",
    header: "Availability",
    cell: ({ row }) => (row.original.available ? "Available" : "Unavailable"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex gap-2">
          <button
            onClick={() => onDetails(book)}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            Details
          </button>
          <button
            onClick={() => onEdit(book)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => onBorrow(book)}
            className="bg-green-600 text-white px-2 py-1 rounded disabled:opacity-50"
            disabled={!book.available || book.copies === 0}
          >
            Borrow
          </button>
        </div>
      );
    },
  },
];
