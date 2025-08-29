import React, { useState } from "react";

const FeedbackForm = ( {resourceId, onFeedbackSubmitted } ) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorPost, setErrorPost] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedbackText('');
        setIsSubmitting(true);
        setErrorPost(null);
        setSuccessMessage(null);

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
            setSuccessMessage('Ihr Feedback wurde erfolgreich gespeichert!');
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
            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-400 text-green-800 p-4 rounded-r-xl" role="alert">
                    <p className="font-bold">Erfolg!</p>
                    <p>{successMessage}</p>
                </div>
            )}
            <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light focus:border-transparent resize-y text-gray-700 placeholder-gray-500"
                rows="4"
                placeholder="Teilen Sie Ihr Feedback zu dieser Ressource mit..."
                value={feedbackText}
                onChange={(event) => setFeedbackText(event.target.value)}
                disabled={isSubmitting}
                onClick={() => setSuccessMessage(null)}
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