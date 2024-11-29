import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookReviewCard } from './BookReviewCard';
import { BookReviewForm } from './BookReviewForm';
import { BookUpdated } from './BookUpdated';
import { Search, Calendar, Star } from 'lucide-react';

export function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    date: '',
    rating: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:8001/books')
      .then((response) => {
        setReviews(response.data);
        setFilteredReviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteReview = (reviewId) => {
    axios
      .delete(`http://localhost:8001/books/books/${reviewId}`)
      .then(() => {
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
        setFilteredReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      })
      .catch((err) => {
        console.error('Error deleting the review:', err);
        setError('Failed to delete the review. Please try again.');
      });
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let filtered = reviews;

    if (filters.title) {
      filtered = filtered.filter((review) =>
        review.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.date) {
      filtered = filtered.filter((review) => {
        if (!review.date) return false;
        try {
          const reviewDate = new Date(review.date).toISOString().split('T')[0];
          return reviewDate === filters.date;
        } catch (error) {
          console.error('Invalid date value:', review.date, error);
          return false;
        }
      });
    }

    if (filters.rating) {
      filtered = filtered.filter((review) => review.rating === parseInt(filters.rating, 10));
    }

    setFilteredReviews(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

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

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filter Reviews</h2>
        <div className="flex flex-row gap-8 mx-auto">
        
          <div className="flex items-center border rounded-md overflow-hidden ">
            <div className="px-3 text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              name="title"
              placeholder="Filter by title"
              value={filters.title}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border-none focus:ring-0"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="px-3 text-gray-500">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              name="date"
              placeholder="Filter by date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border-none focus:ring-0"
            />
          </div>

          {/* Rating Filter */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <div className="px-3 text-gray-500">
              <Star size={18} />
            </div>
            <input
              type="number"
              name="rating"
              placeholder="Filter by rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <p className="py-8 text-center text-gray-600">
          No reviews found. Try adjusting your filters or add a new review!
        </p>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <BookReviewCard
              key={review.id}
              review={review}
              onEdit={handleEdit}
              onDelete={() => deleteReview(review.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
