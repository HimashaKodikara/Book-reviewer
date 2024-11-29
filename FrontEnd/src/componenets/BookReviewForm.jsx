import React, { useState, Alert } from 'react';
import { StarRating } from './StarRating';
import axios from 'axios';

export function BookReviewForm({ onSubmitSuccess, initialData, buttonText = 'Submit Review' }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    rating: initialData?.rating || 0,
    reviewText: initialData?.review_text || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/books/books', {
        title: formData.title,
        author: formData.author,
        rating: formData.rating,
        review_text: formData.reviewText,
      });

      window.alert("New Review is added");


      if (onSubmitSuccess) {
        onSubmitSuccess(response.data);


      }
    } catch (error) {
      window.Alert("Error submitting review");
      console.error('Error submitting review:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Book Title
        </label>
        <input
          type="text"
          id="title"
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="author"
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => setFormData({ ...formData, rating })}
        />
      </div>

      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700">
          Review
        </label>
        <textarea
          id="review"
          required
          rows={4}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.reviewText}
          onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>

    </form>
  );
}
