import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import BackButton from "./BackButton.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import FeedbackForm from "./FeedbackForm.jsx";
import FeedbackItem from "./FeedbackItem.jsx";
import StarRating from "./StarRating.jsx";
import { formatDate } from "../utils/formatDate.js";
import { fetchResource } from "../lib/api";

const ResourceDetail = ({ resourceId, onBack }) => {
  const [detailResource, setDetailResource] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [errorDetail, setErrorDetail] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        setIsLoadingDetail(true);
        setErrorDetail(null);
        setNotFound(false);
        const data = await fetchResource(resourceId);
        if (!data || data.message === "Not Found") {
          if (on) setNotFound(true);
          return;
        }
        if (on) setDetailResource(data);
      } catch (err) {
        if (on) setErrorDetail(err?.message || String(err));
      } finally {
        if (on) setIsLoadingDetail(false);
      }
    })();
    return () => { on = false; };
  }, [resourceId]);

  const {
    id, title, type, description, authorId,
    createdAt, averageRating, feedback
  } = detailResource || {};

  const formattedDate = formatDate(createdAt, 'de-DE', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const handleRatingSubmitted = (updated) => {
    // If your endpoint returns the whole resource with new avg, update it here:
    setDetailResource(prev => ({ ...(prev||{}), ...updated }));
  };

  const handleFeedbackSubmitted = (updated) => {
    // merge feedback list if returned
    setDetailResource(prev => {
      if (!prev) return updated || prev;
      if (updated?.feedback) return { ...prev, feedback: updated.feedback };
      return prev;
    });
  };

  if (isLoadingDetail) return <LoadingSpinner label="Ressource wird geladen..." />;

  if (errorDetail) {
    return (
      <ErrorMessage
        variant="error"
        title="Fehler beim Laden"
        message={errorDetail}
        hint="Bitte prüfen Sie das Backend oder versuchen Sie es später erneut."
      >
        <BackButton onBack={onBack} label="Zurück zu allen Ressourcen" />
      </ErrorMessage>
    );
  }

  if (notFound || !detailResource) {
    return (
      <ErrorMessage
        variant="info"
        title="Nicht gefunden"
        message={`Die Ressource mit ID ${resourceId} konnte nicht gefunden werden.`}
      >
        <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>
      </ErrorMessage>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>
      <h2 className="text-4xl font-extrabold text-main-dark mb-4">{title}</h2>

      <div className="flex items-center space-x-4 mb-6">
        {type && (
          <span className="text-sm font-medium text-highlight-light bg-highlight-light/10 px-3 py-1 rounded-full">
            {type}
          </span>
        )}
        <StarRating resourceId={id} averageRating={averageRating} onRatingSubmitted={handleRatingSubmitted}/>
      </div>

      {description && <p className="text-gray-700 text-lg leading-relaxed mb-8">{description}</p>}

      <div className="border-t border-gray-200 pt-8 mt-8 text-gray-600 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        {authorId && (
          <p className="flex items-center">
            <strong className="mr-2">Author-ID:</strong>
            <span className="font-medium text-gray-700">{authorId}</span>
          </p>
        )}
        {createdAt && (
          <p className="flex items-center">
            <strong className="mr-2">Erstellt:</strong>
            <span className="font-medium text-gray-700">{formattedDate}</span>
          </p>
        )}
      </div>

      {Array.isArray(feedback) && feedback.length > 0 && (
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback.map((item, idx) => <FeedbackItem key={idx} feedback={item} />)}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Ihr Feedback teilen</h3>
        <FeedbackForm resourceId={id} onFeedbackSubmitted={handleFeedbackSubmitted}/>
      </div>
    </div>
  );
};

export default ResourceDetail;
