import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosNew from "../api/axiosNew";

import img1 from "../Images/img1.jpg";
import img2 from "../Images/1984.jpg";
import img3 from "../Images/1200px-To_Kill_a_Mockingbird_(first_edition_cover).jpg";
import img4 from "../Images/prideprejudice.jpg";
const images = {
  "img1.jpg": img1, // Map "img1.jpg" to the imported img1
  "1984.jpg": img2, // Map "1984.jpg" to the imported img2
  "1200px-To_.jpg": img3, // Map the specific filename to img3
  "prideprejudice.jpg": img4, // Map "prideprejudice.jpg" to img4
};

export const Bookdetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Invalid book ID");
      setLoading(false);
      return;
    }

    axiosNew
      .get(`/book/${id}`)
      .then((response) => {
        setBook(response.data);
        setError(null);
      })
      .catch((err) => {
        setBook(null);
        if (err.response && err.response.status === 404) {
          setError("Book not found");
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-main">
      <div className="book-details-container">
        <h1>{book.title}</h1>
        {book.coverImage && (
          <img src={images[book.coverImage]} alt={book.title} />
        )}
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Published Date:</strong> {book.publishedDate}
        </p>
        <p>
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p>
          <strong>Overview:</strong> {book.overview}
        </p>
      </div>
    </div>
  );
};
