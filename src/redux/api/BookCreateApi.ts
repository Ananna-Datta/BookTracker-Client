import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://book-trackr-two.vercel.app/" }),
  tagTypes: ["book", "borrow", "counter"],
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => "api/books",
      providesTags: ["book"],
    }),

    addBook: builder.mutation({
      query: (body) => ({
        url: "api/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["book"],
    }),

    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book","borrow"],
    }),

    borrowBook: builder.mutation({
      query: (body) => ({
        url: "api/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    getBorrowSummary: builder.query({
      query: () => "api/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery, // ✅ newly added
} = bookApi;
