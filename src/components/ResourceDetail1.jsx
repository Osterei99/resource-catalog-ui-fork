import React from "react";

const ResourceDetail = ({ resource }) => {
    if (!resource) {
        return null;
    }

    const { 
        id, 
        title, 
        type, 
        description, 
        authorId, 
        createdAt, 
        averageRating, 
        feedback 
    } = resource;

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

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <button className="text-accent-light hover:underline mb-6 flex items-center transition-colors">
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
                                <p className="text-gray-800 mb-2 leading-relaxed">{item.feedback}</p>
                                <div className="text-xs text-gray-500 flex justify-between items-center">
                                    <span>Von: {item.userId}</span>
                                    <span>
                                        {new Date(item.timestamp).toLocaleDateString('de-DE', {
                                            year
                                        })}
                                    </span>
                                </div>
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