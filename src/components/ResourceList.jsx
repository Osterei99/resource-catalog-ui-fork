import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

const ResourceList = ({ onSelectResource }) => {

    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
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
            <LoadingSpinner label="Ressourcen werden geladen..." />
        );
    }

    if (error) {
        return (
         <ErrorMessage 
                variant="error"
                title="Ooooops!..."
                message={`Fehler beim Laden der Ressourcen: ${error}`}
                hint="Bitte prüfen, ob das Backend unter http://localhost:5002 läuft, oder später erneut versuchen."
            />   
        );
    }

    if (resources.length === 0) {
        return (
        <ErrorMessage 
                variant="info"
                title="Keine Ressourcen verfügbar"
                message={`Es wurden keine Ressourcen gefunden`}
                hint="Vielleicht sind noch keine Ressourcen verfügbar."
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
                <ResourceCard 
                    key={resource.id}  
                    resource={resource}
                    onClick={() => onSelectResource(resource.id)} 
                />
            ))}
        </div>
    );
};

export default ResourceList;