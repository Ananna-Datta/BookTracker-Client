import { useGetBorrowSummaryQuery } from "@/redux/api/BookCreateApi";
import { Dialog } from "@headlessui/react";
// import { useGetBorrowSummaryQuery } from "../redux/api/bookApi"; // adjust the path if needed

type Props = {
  open: boolean;
  onClose: () => void;
  
};
interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
export default function BorrowSummaryModal({ open, onClose }: Props) {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined, {
    skip: !open, // only fetch when modal is open
  });

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            📚 Borrow Summary
          </Dialog.Title>

          {isLoading && <p>Loading...</p>}
          {isError && <p className="text-red-500">Failed to load borrow summary.</p>}

          {!isLoading && !isError && (
  <div className="space-y-4 max-h-[400px] overflow-y-auto">
    {data?.data?.map((item: BorrowSummaryItem, idx: number) => (
      <div
        key={idx}
        className="p-4 border border-gray-200 rounded-md shadow-sm"
      >
        <p><strong>📖 Title:</strong> {item.book?.title}</p>
        <p><strong>🔖 ISBN:</strong> {item.book?.isbn}</p>
        <p><strong>🔢 Total Borrowed:</strong> {item.totalQuantity}</p>
      </div>
    ))}
  </div>
)}

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
