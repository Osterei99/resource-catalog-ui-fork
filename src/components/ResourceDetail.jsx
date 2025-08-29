import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import BackButton from "./BackButton.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import FeedbackForm from "./FeedbackForm.jsx";
import FeedbackItem from "./FeedbackItem.jsx";
import StarRating from "./StarRating.jsx";
import { formatDate } from "../utils/formatDate.js";

const ResourceDetail = ({ resourceId, onBack }) => {

    const [detailResource, setDetailResource] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(true);
    const [errorDetail, setErrorDetail] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchResourceDetails = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoadingDetail(true);
            setErrorDetail(null);
            setNotFound(false);

            try {
                const response = await fetch(`http://localhost:5002/resources/${resourceId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setNotFound(true);
                        setDetailResource(null);
                        setIsLoadingDetail(false);
                        return;
                    }

                    setErrorDetail({code: response.status, message: response.statusText});
                    setDetailResource(null);
                    setIsLoadingDetail(false);
                    return;
                }

                const data = await response.json();
                setDetailResource(data);
            } catch (err) {
                console.error("Fehler beim Abrufen der Daten:", err);
                setErrorDetail(err.message);
            } finally {
                setIsLoadingDetail(false);
            }
        };
        if (resourceId) {
            fetchResourceDetails();
        }
    }, [resourceId]);

    const { 
        id, 
        title, 
        type, 
        description, 
        authorId, 
        createdAt, 
        averageRating, 
        feedback 
    } = detailResource || {};

    const formattedDate = formatDate(createdAt, 'de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    const feedbackCount = feedback?.length || 0;

    const handleFeedbackSubmitted = (updatedResource) => {
        setDetailResource(updatedResource);
    };

    const handleRatingSubmitted = (updatedResource) => {
        setDetailResource(updatedResource);
    };

    if (isLoadingDetail) {
        return (
            <LoadingSpinner label="Ressourcendetails werden geladen..." />
        );
    }

    if (errorDetail) {
        return (
            <ErrorMessage
                variant="error"
                title="Ooooops!..."
                message={`Fehler beim Laden der Ressourcendetails: ${errorDetail}`}
                hint="Bitte prüfen, ob das Backend unter http://localhost:5002 läuft, oder später erneut versuchen."
            >
                <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>
            </ErrorMessage>
        );
    }

    if (notFound) {
        return (
            <ErrorMessage
                variant="info"
                title="Ressource nicht gefunden"
                message={`Die Ressource mit ID ${resourceId} konnte nicht gefunden werden.`}
            >
                <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>
            </ErrorMessage>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            {/*Back Button to Resource List */}
            <BackButton onBack={onBack} label="Zurück zu allen Ressourcen"/>

            <h2 className="text-4xl font-extrabold text-main-dark mb-4">{title}</h2>
            <div className="flex items-center space-x-4 mb-6">
                {type && (
                    <span className="text-sm font-medium text-highlight-light bg-highlight-light/10 px-3 py-1 rounded-full">
                        {type}
                    </span>
                )}
            </div>

            {/*Ressourcendetails zeigen */}
            {description && 
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{description}</p>}
            <div className="border-t border-gray-200 pt-8 mt-8 text-gray-600 text-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                {authorId && (
                    <p className="flex items-center">
                        <strong className="mr-2">Author-ID:</strong>
                        <span className="font-medium text-gray-700">{authorId}</span>
                    </p>
                )}
                {createdAt && (
                    <p className="flex items-center">
                        <strong className="mr-2">Erstellt am:</strong>
                        <span className="font-medium text-gray-700">{formattedDate}</span>
                    </p>
                )}
                {averageRating && (
                    <p className="flex items-center">
                        <strong className="mr-2">Durchschnittliche Bewertung:</strong>
                        <span className="font-medium text-gray-700">{averageRating.toFixed(1)} / 5</span>
                    </p>
                )}
                {feedbackCount !== undefined && (
                    <p className="flex items-center">
                        <strong className="mr-2">Feedback:</strong>
                        <span className="font-medium text-gray-700">{feedbackCount}</span>
                    </p>
                )}
            </div>
            
            {/* StarRating zeigen */}
            <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ihre Bewertung geben</h3>
                <StarRating resourceId={id} value={averageRating} onRatingSubmitted={handleRatingSubmitted}/>
            </div>

            {/*Feedbackeintreage zeigen*/}
            {feedback && feedback.length > 0 && (
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Feedback</h3>
                    <div className="space-y-6">
                        {feedback.slice().reverse().map((item) => (
                            <FeedbackItem key={item.id} feedback={item}/>
                        ))}
                    </div>
                </div>
            )}

            {/*Feedback Form */}
            <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ihr Feedback teilen</h3>
                <FeedbackForm resourceId={id} onFeedbackSubmitted={handleFeedbackSubmitted}/>
            </div>
        </div>
    );
};

export default ResourceDetail;