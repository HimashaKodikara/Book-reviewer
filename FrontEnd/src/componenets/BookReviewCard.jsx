import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { StarRating } from './StarRating';

export function BookReviewCard({ review, onEdit, onDelete }) {
  const formattedDate = new Date(review.date_added).toISOString().split('T')[0];
  return (
    <div className="p-6 space-y-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{review.title}</h3>
          <p className="text-gray-600">by {review.author}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(review)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <StarRating rating={review.rating} readonly />

      <p className="text-gray-700">{review.reviewText}</p>
      
      <p className="text-sm text-gray-500">
        Added on {formattedDate}
      </p>
    </div>
  );
}