import React from "react";

const BackButton = ({ onBack, label = "Zurück" }) => {
    return (
        <button 
            className="text-accent-light hover:underline mb-6 flex items-center transition-colors"
            onClick={onBack}
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            {label}
        </button>
    );
};

export default BackButton;