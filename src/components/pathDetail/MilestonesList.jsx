import React from 'react';
import MilestoneItem from './MilestoneItem';

export default function MilestonesList({
  milestones = [],
  mapTopicIdToName,
  mapSkillIdToName,
  mapResIdToTitle,
}) {
  if (!milestones.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        <div className="text-sm font-medium text-gray-700">Keine Meilensteine vorhanden</div>
      </div>
    );
  }

  return (
    <ol className="space-y-4">
      {milestones.map(m => (
        <MilestoneItem
          key={m.milestoneId || `${m.label}-${Math.random()}`}
          milestone={m}
          mapTopicIdToName={mapTopicIdToName}
          mapSkillIdToName={mapSkillIdToName}
          mapResIdToTitle={mapResIdToTitle}
        />
      ))}
    </ol>
  );
}
