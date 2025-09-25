import React, { useState } from 'react';
import { postRating } from '../lib/api';

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick, disabled }) => (
  <button
    type="button"
    className={`p-1 ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    disabled={disabled}
    aria-label={filled ? "Stern ausgewählt" : "Stern nicht ausgewählt"}
  >
    <svg viewBox="0 0 20 20" fill="currentColor" className={`w-6 h-6 ${filled ? "text-yellow-400" : "text-gray-300"}`}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.037a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.985 2.037c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.379 8.72c-.783-.57-.38-1.81.588-1.81H7.43a1 1 0 00.95-.69l1.07-3.292z"/>
    </svg>
  </button>
);

const StarRating = ({ resourceId, averageRating = 0, onRatingSubmitted }) => {
  const [hover, setHover] = useState(0);
  const [currentRating, setCurrentRating] = useState(averageRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const sendRating = async (value) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const updatedResource = await postRating(resourceId, value, 'anonymous');
      setCurrentRating(value);
      if (onRatingSubmitted) onRatingSubmitted(updatedResource);
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1,2,3,4,5].map(star => (
          <Star
            key={star}
            filled={star <= (hover || currentRating)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => sendRating(star)}
            disabled={isSubmitting}
          />
        ))}
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};

export default StarRating;
