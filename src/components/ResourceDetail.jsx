import React, { useState, useEffect } from "react";

const ResourceDetail = ({ resourceId, onBack }) => {

    const [detailResource, setDetailResource] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(true);
    const [errorDetail, setErrorDetail] = useState(null);

    useEffect(() => {
        const fetchResourceDetails = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoadingDetail(true);
            setErrorDetail(null);

            try {
                const response = await fetch(`http://localhost:5002/resources/${resourceId}`);

                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`)
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

    const formattedDate = createdAt 
        ? new Date(createdAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'N/A';

    const feedbackCount = feedback?.length || 0;

    if (isLoadingDetail) {
        return (
            <div className="flex justify-center items-center py-20 bg-gray-50 rounded-2xl shadow-inner-sm">
                <svg className="animate-spin h-10 w-10 text-main-dark" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="ml-4 text-xl text-gray-700 font-medium">Ressourcendetails werden geladen...</p>
            </div>
        );
    }

        if (!detailResource) {
        return (
            <div className="bg-main-dark/10 border-l-4 border-accent-light text-main-dark p-6 rounded-r-xl text-center" role="alert">
                <button 
                    className="text-accent-light hover:underline mb-6 flex items-center transition-colors"
                    onClick={onBack}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Zurück zu allen Ressourcen
                </button>
                <p className="font-bold text-xl block mb-2">Ressource nicht gefunden</p>
                <p className="text-lg">Die Ressource mit ID {resourceId} konnte nicht gefunden werden.</p>
            </div>
        );
    }

    if (errorDetail) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-6 rounded-r-xl relative text-center" role="alert">
                <button 
                    className="text-accent-light hover:underline mb-6 flex items-center transition-colors"
                    onClick={onBack}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Zurück zu allen Ressourcen
                </button>
                <strong className="font-bold text-xl block mb-2">Ooooops!...</strong>
                <span className="block text-lg">Fehler beim Laden der Ressourcendetails: {errorDetail}</span>
                <p className="text-sm mt-3 text-red-700">Bitte überprüfen Sie, ob das Backend unter `http://localhost:5002/` läuft, oder versuchen Sie es später erneut.</p>
            </div>
        );
    }


    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <button 
                className="text-accent-light hover:underline mb-6 flex items-center transition-colors"
                onClick={onBack}
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Zurück zu allen Ressourcen
            </button>

            <h2 className="text-4xl font-extrabold text-main-dark mb-4">{title}</h2>
            <div className="flex items-center space-x-4 mb-6">
                {type && (
                    <span className="text-sm font-medium text-highlight-light bg-highlight-light/10 px-3 py-1 rounded-full">
                        {type}
                    </span>
                )}
            </div>
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

            {feedback && feedback.length > 0 && (
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Feedback</h3>
                    <div className="space-y-6">
                        {feedback.map((item) => (
                            <div key={item.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                <p className="text-gray-800 mb-2 leading-relaxed">{item.feedbackText}</p>
                                <div className="text-xs text-gray-500 flex justify-between items-center">
                                    <span>Von: {item.userId}</span>
                                    <span>
                                        {new Date(item.timestamp).toLocaleDateString('de-DE', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceDetail;