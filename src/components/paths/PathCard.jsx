// src/components/paths/PathCard.jsx
import React from 'react';
import GoalsSubtitle from './GoalsSubtitle';
import ResourceChip from './ResourceChip';

/**
 * Props:
 *  - path: { pathId, userId, createdAt, summary?, goals, milestones }
 *  - mapTopicIdToName: (id) => string | undefined
 *  - mapSkillIdToName: (id) => string | undefined
 *  - mapResIdToTitle: (id) => string | undefined
 */
export default function PathCard({
  path,
  mapTopicIdToName,
  mapSkillIdToName,
  mapResIdToTitle,
}) {
  const created = path.createdAt ? new Date(path.createdAt).toLocaleString() : '';

  // Resolve goals (names or fallback to ids/names already present)
  const goalTopicNames = (path.goals?.topics || [])
    .map(x => typeof x === 'string' ? (mapTopicIdToName(x) || x) : (mapTopicIdToName(x?.id) || x?.name || ''))
    .filter(Boolean);

  const goalSkillNames = (path.goals?.skills || [])
    .map(x => typeof x === 'string' ? (mapSkillIdToName(x) || x) : (mapSkillIdToName(x?.id) || x?.name || ''))
    .filter(Boolean);

  // Build a friendly title if no summary exists
  const fallbackTitle = (() => {
    const parts = [];
    if (goalTopicNames.length) parts.push(`Themen: ${goalTopicNames.slice(0, 3).join(', ')}${goalTopicNames.length > 3 ? ' …' : ''}`);
    if (goalSkillNames.length) parts.push(`Skills: ${goalSkillNames.slice(0, 3).join(', ')}${goalSkillNames.length > 3 ? ' …' : ''}`);
    return parts.length ? parts.join(' • ') : 'Learning Path';
  })();

  const title = (path.summary || '').trim() || fallbackTitle;

  // Collect unique resource IDs from milestones (if present)
  const resIds = new Set();
  (path.milestones || []).forEach(m => {
    (m.resources || []).forEach(r => {
      if (r?.resourceId) resIds.add(String(r.resourceId));
    });
  });
  const resList = Array.from(resIds).map(id => ({ id, title: mapResIdToTitle(id) || `Ressource ${id}` }));
  const preview = resList.slice(0, 4);
  const moreCount = Math.max(0, resList.length - preview.length);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Erstellt</div>
        <div className="text-xs text-gray-500">{created}</div>
      </div>

      {/* MAIN TITLE = SUMMARY (fallback to goals-based title). Truncate to keep cards tight. */}
      <h3 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2">
        {title}
      </h3>

      {/* User (kept subtle) */}
      <div className="mt-1 text-sm text-gray-700">
        <span className="font-medium">User:</span> {path.userId || '—'}
      </div>

      {/* Goals as subtitle (chips) */}
      <div className="mt-3">
        <GoalsSubtitle topicNames={goalTopicNames} skillNames={goalSkillNames} />
      </div>

      {/* Resource preview chips */}
      {!!resList.length && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-1">Ressourcen (Vorschau):</div>
          <div className="flex flex-wrap gap-2">
            {preview.map(r => <ResourceChip key={r.id} id={r.id} title={r.title} />)}
            {moreCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                +{moreCount} mehr
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <a href={`/paths/${path.pathId}`} className="text-main-dark hover:underline">
          Öffnen
        </a>
      </div>
    </div>
  );
}
