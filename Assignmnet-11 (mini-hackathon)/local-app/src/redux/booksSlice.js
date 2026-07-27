import { createSlice } from "@reduxjs/toolkit";

const startingBooks = [
 { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", year: 2020, status: "available" },
  { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self Help", year: 2018, status: "issued" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", genre: "Technology", year: 2008, status: "available" },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", year: 1988, status: "available" },
  { id: 5, title: "Deep Work", author: "Cal Newport", genre: "Productivity", year: 2016, status: "issued" },
  { id: 6, title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", genre: "Finance", year: 1997, status: "available" },
  { id: 7, title: "The Pragmatic Programmer", author: "Andrew Hunt", genre: "Technology", year: 1999, status: "available" },
  { id: 8, title: "Think and Grow Rich", author: "Napoleon Hill", genre: "Self Help", year: 1937, status: "issued" },
  { id: 9, title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", year: 2020, status: "available" },
  { id: 10, title: "Ikigai", author: "Héctor García", genre: "Self Help", year: 2016, status: "available" },
  { id: 11, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", year: 1997, status: "issued" },
  { id: 12, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year: 1937, status: "available" },
  { id: 13, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", year: 1960, status: "available" },
  { id: 14, title: "The Lean Startup", author: "Eric Ries", genre: "Business", year: 2011, status: "issued" },
  { id: 15, title: "Zero to One", author: "Peter Thiel", genre: "Business", year: 2014, status: "available" },
];


function getSavedBooks() {
  if (typeof window === "undefined") return startingBooks;
  const saved = localStorage.getItem("books");
  return saved ? JSON.parse(saved) : startingBooks;
}


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
