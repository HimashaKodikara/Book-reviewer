import React, { useState } from 'react';
import { StarRating } from './StarRating';
import axios from 'axios';

export function BookUpdated({ onSubmitSuccess, initialData, buttonText = 'Submit Review' }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    rating: initialData?.rating || 0,
    reviewText: initialData?.review_text || '',
  });

  const handleSubmit = async (e) => {
    
  
    if (!initialData?.id) {
      console.error('Book ID is missing. Cannot update the review.');
      return;
    }
  
    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        rating: formData.rating,
        review_text: formData.reviewText,
      };
  
      // Include the book ID in the URL
      const response = await axios.put(
        `http://localhost:8001/books/books/${initialData.id}`,
        payload
      );
  
      if (response.status === 200 || response.status === 204) {
        // Notify the parent component about successful submission
        if (onSubmitSuccess) {
          onSubmitSuccess(response.data);
        }
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      // Handle errors gracefully
      console.error('Error submitting review:', error.message);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
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
