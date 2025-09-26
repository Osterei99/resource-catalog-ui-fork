// src/components/pathDetail/SummaryCard.jsx
import React from 'react';
import Chip from './Chip';

function buildFallbackTitle(goalsTopicNames = [], goalsSkillNames = []) {
  const parts = [];
  if (goalsTopicNames.length) {
    const a = goalsTopicNames.slice(0, 3).join(', ');
    parts.push(`Themen: ${a}${goalsTopicNames.length > 3 ? ' …' : ''}`);
  }
  if (goalsSkillNames.length) {
    const a = goalsSkillNames.slice(0, 3).join(', ');
    parts.push(`Skills: ${a}${goalsSkillNames.length > 3 ? ' …' : ''}`);
  }
  return parts.length ? parts.join(' • ') : 'Learning Path';
}

export default function SummaryCard({
  summary,
  userId,
  createdAt,
  goalsTopicNames = [],
  goalsSkillNames = [],
}) {
  const title = (summary || '').trim() || buildFallbackTitle(goalsTopicNames, goalsSkillNames);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Erstellt</div>
        {createdAt ? <div className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</div> : null}
      </div>

      {/* MAIN TITLE (Summary or fallback) */}
      <h3 className="mt-2 text-2xl font-semibold text-gray-900">{title}</h3>

      {/* User */}
      {userId && (
        <div className="mt-1 text-sm text-gray-700">
          <span className="font-medium">User:</span> {userId}
        </div>
      )}

      {/* Goals as chips */}
      {(goalsTopicNames.length || goalsSkillNames.length) ? (
        <div className="mt-5 space-y-2">
          {goalsTopicNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Themen:</span>
              {goalsTopicNames.map((t, i) => <Chip key={`${t}-${i}`}>{t}</Chip>)}
            </div>
          )}
          {goalsSkillNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Skills:</span>
              {goalsSkillNames.map((s, i) => <Chip key={`${s}-${i}`}>{s}</Chip>)}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
