import { createSlice } from "@reduxjs/toolkit";

// first time the app opens, we show these 3 books
const startingBooks = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", year: 2020, status: "available" },
  { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self Help", year: 2018, status: "issued" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", genre: "Technology", year: 2008, status: "available" },
];

// read books from localStorage (if the browser has some saved)
function getSavedBooks() {
  if (typeof window === "undefined") return startingBooks;
  const saved = localStorage.getItem("books");
  return saved ? JSON.parse(saved) : startingBooks;
}

// save the books back to localStorage after every change
function save(books) {
  if (typeof window !== "undefined") {
    localStorage.setItem("books", JSON.stringify(books));
  }
}

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    search: "",
  },
  reducers: {
    // called once when the page loads on the browser
    loadBooks(state) {
      state.list = getSavedBooks();
    },
    addBook(state, action) {
      state.list.push({ id: Date.now(), ...action.payload });
      save(state.list);
    },
    updateBook(state, action) {
      const book = state.list.find((b) => b.id === action.payload.id);
      if (book) {
        book.title = action.payload.title;
        book.author = action.payload.author;
        book.genre = action.payload.genre;
        book.year = action.payload.year;
      }
      save(state.list);
    },
    deleteBook(state, action) {
      state.list = state.list.filter((b) => b.id !== action.payload);
      save(state.list);
    },
    toggleStatus(state, action) {
      const book = state.list.find((b) => b.id === action.payload);
      if (book) {
        book.status = book.status === "available" ? "issued" : "available";
      }
      save(state.list);
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { loadBooks, addBook, updateBook, deleteBook, toggleStatus, setSearch } =
  booksSlice.actions;

export default booksSlice.reducer;
