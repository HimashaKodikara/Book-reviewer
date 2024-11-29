import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookReviewCard } from './BookReviewCard';
import { BookReviewForm } from './BookReviewForm';
import {BookUpdated} from './BookUpdated';

export function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:8001/books')
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteReview = (reviewId) => {
    axios.delete(`http://localhost:8001/books/books/${reviewId}`)
      .then(() => {
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      })
      .catch(err => {
        console.error("Error deleting the review:", err);
        setError('Failed to delete the review. Please try again.');
      });
  };

  const handleEdit = (review) => {
    setEditingReview(review); 
  };

 

  if (loading) {
    return <p className="py-8 text-center text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return <p className="py-8 text-center text-red-600">Error: {error}</p>;
  }

  if (editingReview) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Edit Review</h2>
        <BookUpdated
          initialData={editingReview}
          buttonText="Update Review"
          onSubmit={(updatedReview) => handleUpdate({ ...updatedReview, id: editingReview.id })}
        />
        <button
          onClick={() => setEditingReview(null)} 
          className="w-full px-4 py-2 mt-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="py-8 text-center text-gray-600">
        No reviews found. Try adjusting your search or add a new review!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <BookReviewCard
          key={review.id}
          review={review}
          onEdit={handleEdit} 
          onDelete={() => deleteReview(review.id)} // Pass deleteReview with review ID
        />
      ))}
    </div>
  );
}
