import React from 'react';
import PathCard from './PathCard';

export default function PathsGrid({
  paths = [],
  mapTopicIdToName,
  mapSkillIdToName,
  mapResIdToTitle,
}) {
  if (!paths.length) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {paths.map(p => (
        <PathCard
          key={p.pathId}
          path={p}
          mapTopicIdToName={mapTopicIdToName}
          mapSkillIdToName={mapSkillIdToName}
          mapResIdToTitle={mapResIdToTitle}
        />
      ))}
    </div>
  );
}
