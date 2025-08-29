import React from 'react';
import { formatDate } from '../utils/formatDate';

const FeedbackItem = ( {feedback} ) => {
    if (!feedback) return null;

    const { feedbackText, userId, timestamp } = feedback;

    return ( 
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800 mb-2 leading-relaxed">{feedbackText}</p>
            <div className="text-xs text-gray-500 flex justify-between items-center">
                <span>Von: {userId}</span>
                <span>
                    {formatDate(timestamp)}
                </span>
            </div>
        </div>
    );
}
 
export default FeedbackItem;