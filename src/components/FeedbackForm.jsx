import React, { useState } from "react";

const FeedbackForm = ( {resourceId, onFeedbackSubmitted } ) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorPost, setErrorPost] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedbackText('');
        setIsSubmitting(true);
        setErrorPost(null);

        const newFeedback = {
            resourceId: resourceId,
            feedbackText: feedbackText,
            userId: 'anonymous',
            timestamp: new Date().toISOString()
        };

        try {

            const response = await fetch(`http://localhost:5002/resources/${resourceId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFeedback)
            });

            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`);
            } 

            const updatedResource = await response.json();
            console.log('Feedback erfolgreich gesendet', updatedResource);
            if (onFeedbackSubmitted) {
                onFeedbackSubmitted(updatedResource);
            }

        } catch (err) {
            console.error("Fehler beim Abrufen der Ressourcen: ", err);
            setErrorPost(err.message);
        } finally {
            setIsSubmitting(false);
            setFeedbackText('');
        }
    };

    return ( 
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-transparent resize-y text-gray-700 placeholder-gray-500"
                rows="4"
                placeholder="Teilen Sie Ihr Feedback zu dieser Ressource mit..."
                value={feedbackText}
                onChange={(event) => setFeedbackText(event.target.value)}
                disabled={isSubmitting}
            >
            </textarea>
            <button 
                type="submit"
                disabled={isSubmitting || feedbackText.trim() === ''}
                className="bg-main-dark text-white py-2 px-6 rounded-lg hover:bg-main-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
                {isSubmitting ? 'Wird gesendet...' : 'Feedback senden'}
            </button>
        </form>
    );
};

export default FeedbackForm;