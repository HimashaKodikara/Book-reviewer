import React from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating, onRatingChange, readonly = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRatingChange?.(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} text-yellow-400`}
          disabled={readonly}
          type="button"
        >
          {star <= rating ? (
            <Star className="fill-current" size={20} />
          ) : (
            <Star size={20} />
          )}
        </button>
      ))}
    </div>
  );
}