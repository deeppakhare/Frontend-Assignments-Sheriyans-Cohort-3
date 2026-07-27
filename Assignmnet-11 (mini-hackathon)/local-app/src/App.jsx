import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBooks, setSearch } from "./redux/booksSlice";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

export default function App() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const search = useSelector((state) => state.books.search);
  const [editingBook, setEditingBook] = useState(null);


  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);

  const issued = books.filter((b) => b.status === "issued").length;

  return (
    <div className="page">
      <h1>Book Library Management</h1>
      <p className="small">React + Redux Toolkit mini project</p>

      <div className="stats">
        <span>Total: {books.length}</span>
        <span>Available: {books.length - issued}</span>
        <span>Issued: {issued}</span>
      </div>

      <BookForm
        key={editingBook ? editingBook.id : "new"}
        editingBook={editingBook}
        stopEditing={() => setEditingBook(null)}
      />

      <input
        className="search"
        type="text"
        placeholder="Search book or author..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <BookList startEditing={setEditingBook} />
    </div>
  );
}
