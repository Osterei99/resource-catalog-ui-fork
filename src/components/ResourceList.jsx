import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import { fetchResources } from "../lib/api";

const ResourceList = ({ onSelectResource }) => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        // keep a tiny delay to show spinner nicely (optional)
        await new Promise(r => setTimeout(r, 400));
        const data = await fetchResources();
        if (on) setResources(data);
      } catch (err) {
        if (on) setError(err?.message || String(err));
      } finally {
        if (on) setIsLoading(false);
      }
    })();
    return () => { on = false; };
  }, []);

  if (isLoading) return <LoadingSpinner label="Ressourcen werden geladen..." />;

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
        message="Es wurden keine Ressourcen gefunden."
        hint="Vielleicht sind keine Daten vorhanden?"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {resources.map(resource => (
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
