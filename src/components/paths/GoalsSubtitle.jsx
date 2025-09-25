import React from 'react';

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800">
      {children}
    </span>
  );
}

/**
 * Props:
 *  - topicNames: string[]
 *  - skillNames: string[]
 */
export default function GoalsSubtitle({ topicNames = [], skillNames = [] }) {
  const hasTopics = topicNames.length > 0;
  const hasSkills = skillNames.length > 0;

  if (!hasTopics && !hasSkills) {
    return <p className="text-sm text-gray-500">Keine Ziele festgelegt.</p>;
  }

  return (
    <div className="space-y-1">
      {hasTopics && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Themen:</span>
          {topicNames.map((t, i) => <Chip key={`${t}-${i}`}>{t}</Chip>)}
        </div>
      )}
      {hasSkills && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Skills:</span>
          {skillNames.map((s, i) => <Chip key={`${s}-${i}`}>{s}</Chip>)}
        </div>
      )}
    </div>
  );
}
