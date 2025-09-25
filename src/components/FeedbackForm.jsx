import React, { useState } from "react";
import { postFeedback } from "../lib/api";

const FeedbackForm = ({ resourceId, onFeedbackSubmitted }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorPost, setErrorPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorPost(null);
    setSuccessMessage(null);
    try {
      const updated = await postFeedback(resourceId, feedbackText.trim(), 'anonymous');
      setSuccessMessage('Vielen Dank! Ihr Feedback wurde gespeichert.');
      if (onFeedbackSubmitted) onFeedbackSubmitted(updated);
      setFeedbackText('');
    } catch (err) {
      setErrorPost(err?.message || String(err));
    } finally {
      setIsSubmitting(false);
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
      {errorPost && (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-4 rounded-r-xl" role="alert">
          <p className="font-bold">Fehler</p>
          <p>{errorPost}</p>
        </div>
      )}
      <textarea
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-main-dark/20 focus:border-transparent resize-y text-gray-700 placeholder-gray-500"
        rows="4"
        placeholder="Teilen Sie Ihr Feedback zu dieser Ressource mit..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        disabled={isSubmitting}
        onClick={() => setSuccessMessage(null)}
      />
      <button
        type="submit"
        disabled={isSubmitting || feedbackText.trim() === ''}
        className="bg-main-dark text-white py-2 px-6 rounded-xl shadow-sm hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Feedback senden'}
      </button>
    </form>
  );
};

export default FeedbackForm;
