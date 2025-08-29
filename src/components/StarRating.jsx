import React, { useState } from 'react';

const Star = ({filled, onMouseEnter, onMouseLeave, onClick, disabled}) => (
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
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
    </button>
);

const StarRating = ( {resourceId, value = 0, onRatingSubmitted} ) => {

    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const currentRating = hover || Math.round(value);

    const sendRating = async (rating) => {
        setIsSubmitting(true);
        setError(null);

        const newRating = {
            ratingValue: rating,
            userId: 'anonymous'
        };

        try {
            const response = await fetch(`http://localhost:5002/resources/${resourceId}/ratings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRating)
            });

            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`);
            } 

            const updatedResource = await response.json();
            console.log('Bewertung erfolgreich gesendet', updatedResource);
            
            if (onRatingSubmitted) {
                onRatingSubmitted(updatedResource);
            }

        } catch (err) {
            console.error("Fehler beim Speichern der Bewertung: ", err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return ( 
        <div className="flex">
            {[1,2,3,4,5].map(star => (
                <Star 
                    key={star}
                    filled={star <= currentRating}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => sendRating(star)}
                    disabled={false}
                />                    
            ))}
        </div>
     );
}
 
export default StarRating;