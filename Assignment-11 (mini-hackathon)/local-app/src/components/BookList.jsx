import { useDispatch, useSelector } from "react-redux";
import { deleteBook, toggleStatus } from "../redux/booksSlice";

export default function BookList({ startEditing }) {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const search = useSelector((state) => state.books.search);


  const shownBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  if (shownBooks.length === 0) {
    return <p className="empty">No books found.</p>;
  }

  return (
    <div className="book-list">
      {shownBooks.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p className="small">
            {book.genre} {book.year ? "- " + book.year : ""}
          </p>
          <p className={book.status === "issued" ? "status issued" : "status"}>{book.status}</p>

          <div className="actions">
            <button onClick={() => dispatch(toggleStatus(book.id))}>
              {book.status === "issued" ? "Return" : "Issue"}
            </button>
            <button onClick={() => startEditing(book)}>Edit</button>
            <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
