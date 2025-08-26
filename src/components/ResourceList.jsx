import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard.jsx";

const ResourceList = () => {

    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5002/resources');

                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setResources(data);
            } catch(err) {
                console.error("Fehler beim Abrufen der Ressourcen: ", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 bg-gray-50 rounded-2xl shadow-inner-sm">
                <svg className="animate-spin h-10 w-10 text-main-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="ml-4 text-xl text-gray-700 font-medium">Ressourcen werden geladen...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-6 rounded-r-xl relative text-center" role="alert">
                <strong className="font-bold text-xl block mb-2">Ooooops!...</strong>
                <span className="block text-lg">Fehler beim Laden der Ressourcen: {error}</span>
                <p className="text-sm mt-3 text-red-700">Bitte überprüfen Sie, ob das Backend unter `http://localhost:5002/` läuft, oder versuchen Sie es später erneut.</p>
            </div>
        );
    }

    if (resources.length === 0) {
        return (
            <div className="bg-main-dark/10 border-l-4 border-accent-light text-main-dark p-6 rounded-r-xl text-center" role="alert">
                <p className="font-bold text-xl block mb-2">Keine Ressourcen verfügbar</p>
                <p className="text-lg">Es wurden keine Ressourcen vom Backend unter `http://localhost:5002/resources` gefunden. Vielleicht sind keine Daten vorhanden?</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    );
};

export default ResourceList;