import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosNew from "../api/axiosNew";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    axiosNew
      .get("/book")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author) {
      axiosNew
        .post("/book", newBook)
        .then((response) => {
          setBooks([...books, response.data]);
          setNewBook({ title: "", author: "" });
        })
        .catch((err) => {
          setError(`Error adding book: ${err.message}`);
        });
    }
  };

  const handleEditBook = (book) => {
    setEditBook(book);
    setNewBook({ title: book.title, author: book.author });
  };

  const handleSaveEdit = () => {
    axiosNew
      .put(`/book/${editBook.id}`, { ...editBook, ...newBook })
      .then((response) => {
        setBooks(
          books.map((book) => (book.id === editBook.id ? response.data : book))
        );
        setEditBook(null);
        setNewBook({ title: "", author: "" });
      })
      .catch((err) => {
        setError(`Error editing book: ${err.message}`);
      });
  };

  const handleDeleteBook = (id) => {
    axiosNew
      .delete(`/book/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((err) => {
        setError(`Error deleting book: ${err.message}`);
      });
  };

  return (
    <div className="home-page-app">
      <h1 className="home-page-title">Book Inventory</h1>
      {loading && <p className="home-page-loading">Loading books...</p>}
      {error && <p className="home-page-error">Error: {error}</p>}
      {!loading && !error && (
        <>
          <table className="home-page-table">
            <thead>
              <tr>
                <th className="home-page-th">Title</th>
                <th className="home-page-th">Author</th>
                <th className="home-page-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="home-page-tr">
                  <td className="home-page-td">
                    <Link
                      to={`/book/${book.id}`}
                      state={{ book }}
                      className="home-page-link"
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="home-page-td">{book.author}</td>
                  <td className="home-page-td">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="home-page-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="home-page-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="home-page-form">
            <h3>{editBook ? "Edit Book" : "Add New Book"}</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newBook.title}
              onChange={handleInputChange}
              className="home-page-input"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={handleInputChange}
              className="home-page-input"
            />
            <button
              onClick={editBook ? handleSaveEdit : handleAddBook}
              className="home-page-btn"
            >
              {editBook ? "Save" : "Add"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
