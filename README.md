# Minimal Library Management System | BOOKTRACKR 📚

Live link:https://booktrack-client.vercel.app

Welcome to the **Minimal Library Management System**! This is a simple, clean, and fully functional app built with **React**, **TypeScript**, and **Redux Toolkit Query (RTK Query)** to manage books and borrowing in a library — all without the hassle of authentication or complex features. Perfect for learning and quick demos!

---

## What This Project Does

- Shows a list of books with all the essential details.
- Lets you add new books, update existing ones, or delete books you no longer need.
- Borrow books by selecting how many copies and setting a due date.
- See a borrow summary that aggregates all the books borrowed so far.
- Designed to be easy to use, responsive on all devices, and built with type safety in mind.

---

## Core Features

### 1. No Login, No Fuss — Public Access

Everyone can use the system without needing an account or login. The goal here is to focus on managing books and borrowing quickly and smoothly.

### 2. Manage Your Books with Ease

- **Book List Table**: All books are displayed in a neat table showing Title, Author, Genre, ISBN, Number of Copies, Availability, and action buttons.
- **Edit Books**: Quickly update any book’s details. If you set copies to zero, the book automatically marks as unavailable.
- **Delete Books**: Remove any book with confirmation so you don’t delete by mistake.
- **Add New Book**: Fill out a simple form to add new books with all necessary details.

### 3. Borrowing Made Simple

- Click the "Borrow" button next to a book to borrow it.
- Enter the quantity you want (cannot exceed available copies) and set a due date.
- When you borrow, the book’s available copies update automatically.
- After borrowing, you’re redirected to a summary page showing all borrowed books.

### 4. Borrow Summary

- A clean summary page that aggregates all borrowed books.
- Shows book titles, ISBNs, and total quantities borrowed.

---

## How the User Navigates

- **All Books Page**: View, edit, delete, and borrow books.
- **Create Book Page**: Add new books.
- **Book Detail Page**: See full info about a book.
- **Edit Book Page**: Update book details.
- **Borrow Book Page**: Borrow specific books.
- **Borrow Summary Page**: Review borrowing stats.

---

## UI & UX Highlights

- Clean and minimal design using **Tailwind CSS** for fast and beautiful styling.
- Responsive layout that works perfectly on mobiles, tablets, and desktops.
- Easy to understand forms and buttons with clear labels.
- Fast and smooth experience with instant updates thanks to **RTK Query**.

---

## Optional Bonus Features (If Implemented)

- Optimistic UI updates for faster perceived performance.
- Toast notifications for success/error messages.
- Fully responsive design across devices.
- Type-safe forms leveraging TypeScript for safer, bug-free code.

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/Ananna-Datta/BookTracker-Client.git
   cd BookTracker-Client
