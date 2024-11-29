import React, { useState } from 'react';
import { BookPlus } from 'lucide-react';
import { BookReviewForm } from './componenets/BookReviewForm';
import { ReviewList } from './componenets/ReviewList';
import './App.css'

function App() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);



  const handleAddReview = (formData) => {
    const newReview = {
      ...formData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    setReviews([newReview, ...reviews]);
    setIsFormVisible(true);
  };

  const handleEditReview = (formData) => {
    if (!editingReview) return;
    
    const updatedReviews = reviews.map((review) =>
      review.id === editingReview.id
        ? { ...review, ...formData }
        : review
    );
    
    setReviews(updatedReviews);
    setEditingReview(null);
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

 



  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="justify-center mx-auto text-3xl font-bold text-center text-gray-900 uppercase">Book Reviews</h1>
         
        </div>
        <button
            onClick={() => setIsFormVisible(true)}
            className="flex items-end gap-2 px-3 py-2 mt-5 text-white bg-blue-600 rounded-md float-end hover:bg-blue-700"
          >
            <BookPlus size={20} />
            Add Review
          </button>

        {(isFormVisible || editingReview) && (
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">
              {editingReview ? 'Edit Review' : 'Add New Review'}
            </h2>
            <BookReviewForm
              onSubmit={editingReview ? handleEditReview : handleAddReview}
              initialData={editingReview}
              buttonText={editingReview ? 'Update Review' : 'Submit Review'}
            />
          </div>
        )}

      

        <ReviewList
          
          onEdit={setEditingReview}
          onDelete={handleDeleteReview}
        />
      </div>
    </div>
  );
}

export default App;