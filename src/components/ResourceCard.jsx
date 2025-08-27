import React from "react";

const ResourceCard = ({ resource, onClick }) => {
    if (!resource) {
        return null;
    }

    const { id, title, type, description, authorId, createdAt } = resource;

    const formattedDate = createdAt 
        ? new Date(createdAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'N/A';

    return (
        <div 
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col h-full cursor-pointer"
            onClick={onClick}
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">{title}</h2>
            {type && (
                <span className="text-sm font-medium text-accent-light bg-accent-light/10 px-2 py-1 rounded-full self-start mb-3">{type}</span>
            )}
            <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">{description}</p>
            <div className="text-xs text-gray-500 flex flex-col space-y-1 mt-auto">
                {authorId &&
                    <span className="flex items-center">Autor-ID: {authorId}</span>
                }
                {createdAt && 
                    <span className="flex items-center">Erstellt: {formattedDate}</span>
                }
            </div>
        </div>
    );
};

export default ResourceCard;