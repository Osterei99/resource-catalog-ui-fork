import React from 'react';
import Badge from './Badge';
import Chip from './Chip';
import ResourceLink from './ResourceLink';

/**
 * Props:
 *  - milestone: { milestoneId, label, type, topicId?, skillId?, resources?: [{resourceId, why?}] }
 *  - mapTopicIdToName: (id) => string | undefined
 *  - mapSkillIdToName: (id) => string | undefined
 *  - mapResIdToTitle: (id) => string | undefined
 */
export default function MilestoneItem({ milestone, mapTopicIdToName, mapSkillIdToName, mapResIdToTitle }) {
  const topicName = milestone.topicId ? (mapTopicIdToName(milestone.topicId) || milestone.topicName || milestone.topicId) : null;
  const skillName = milestone.skillId ? (mapSkillIdToName(milestone.skillId) || milestone.skillName || milestone.skillId) : null;

  return (
    <li className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-900">{milestone.label}</div>
        {milestone.type && <Badge>{milestone.type}</Badge>}
      </div>

      {(topicName || skillName) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {topicName && <Chip>{topicName}</Chip>}
          {skillName && <Chip className="bg-indigo-50 text-indigo-800">{skillName}</Chip>}
        </div>
      )}

      {!!(milestone.resources?.length) && (
        <div className="mt-3">
          <div className="text-xs text-gray-500 mb-1">Ressourcen:</div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {milestone.resources.map((r, i) => {
              const title = r?.resourceId ? (mapResIdToTitle(r.resourceId) || `Ressource ${r.resourceId}`) : '';
              return (
                <li key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-2">
                  <div className="text-sm">
                    <ResourceLink id={r.resourceId} title={title} />
                  </div>
                  {r.why && <div className="text-xs text-gray-600 mt-1">— {r.why}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
