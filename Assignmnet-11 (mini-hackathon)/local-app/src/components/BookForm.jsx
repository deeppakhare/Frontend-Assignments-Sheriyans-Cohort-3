import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../redux/booksSlice";

export default function BookForm({ editingBook, stopEditing }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editingBook ? editingBook.title : "");
  const [author, setAuthor] = useState(editingBook ? editingBook.author : "");
  const [genre, setGenre] = useState(editingBook ? editingBook.genre : "");
  const [year, setYear] = useState(editingBook ? editingBook.year : "");

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || author === "") {
      alert("Please fill title and author");
      return;
    }

    if (editingBook) {
      dispatch(updateBook({ id: editingBook.id, title, author, genre, year }));
      stopEditing();
    } else {
      dispatch(addBook({ title, author, genre, year, status: "available" }));
      setTitle("");
      setAuthor("");
      setGenre("");
      setYear("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">{editingBook ? "Save changes" : "Add book"}</button>
      {editingBook && (
        <button type="button" onClick={stopEditing}>
          Cancel
        </button>
      )}
    </form>
  );
}
