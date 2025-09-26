// src/pages/LearningPathDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { lpGet, fetchTopics, fetchSkills, fetchResources } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

import SummaryCard from '../components/pathDetail/SummaryCard';
import MilestonesList from '../components/pathDetail/MilestonesList';

// Helper (plain function)
function buildMap(list = [], idKey = 'id', nameKey = 'name') {
  const m = new Map();
  (list || []).forEach(item => {
    const id = String(item?.[idKey]);
    const nm = item?.[nameKey];
    if (id) m.set(id, nm);
  });
  return m;
}

export default function LearningPathDetail() {
  // Hooks at the top
  const { pathId } = useParams();

  const [path, setPath] = React.useState(null);
  const [topics, setTopics] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [resources, setResources] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let on = true;
    (async () => {
      try {
        const [p, t, s, r] = await Promise.all([
          lpGet(pathId),
          fetchTopics(),
          fetchSkills(),
          fetchResources(), // [{ id, title, ... }]
        ]);
        if (!on) return;
        setPath(p || null);
        setTopics(t || []);
        setSkills(s || []);
        setResources(r || []);
      } catch (e) {
        if (!on) return;
        setError(e?.message || String(e));
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, [pathId]);

  // Derived data (not hooks)
  const topicMap = buildMap(topics, 'id', 'name');
  const skillMap = buildMap(skills, 'id', 'name');
  const resourceMap = (() => {
    const m = new Map();
    (resources || []).forEach(r => {
      const id = String(r?.id ?? r?._id);
      if (id) m.set(id, r?.title || `Ressource ${id}`);
    });
    return m;
  })();

  const mapTopicIdToName = (id) => topicMap.get(String(id));
  const mapSkillIdToName = (id) => skillMap.get(String(id));
  const mapResIdToTitle  = (id) => resourceMap.get(String(id));

  const goalsTopicNames = (path?.goals?.topics || [])
    .map(x => typeof x === 'string' ? (mapTopicIdToName(x) || x)
                                    : (mapTopicIdToName(x?.id) || x?.name || ''))
    .filter(Boolean);

  const goalsSkillNames = (path?.goals?.skills || [])
    .map(x => typeof x === 'string' ? (mapSkillIdToName(x) || x)
                                    : (mapSkillIdToName(x?.id) || x?.name || ''))
    .filter(Boolean);

  // Early returns after hooks
  if (loading) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <LoadingSpinner label="Lade Learning Path…" />
      </main>
    );
  }
  if (error) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <ErrorMessage title="Fehler" message={error} />
      </main>
    );
  }
  if (!path) return null;

  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      {/* Page heading focuses on summary (inside SummaryCard). No ID shown. */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Learning Path</h2>

      {/* Summary/title card */}
      <SummaryCard
        summary={path.summary}
        userId={path.userId}
        createdAt={path.createdAt}
        goalsTopicNames={goalsTopicNames}
        goalsSkillNames={goalsSkillNames}
      />

      {/* Milestones */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800">Meilensteine</h3>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
            {path.milestones?.length || 0} Schritte
          </span>
        </div>
        <MilestonesList
          milestones={path.milestones || []}
          mapTopicIdToName={mapTopicIdToName}
          mapSkillIdToName={mapSkillIdToName}
          mapResIdToTitle={mapResIdToTitle}
        />
      </div>

      <div className="mt-6">
        <Link to="/paths" className="text-main-dark hover:underline">Zurück zur Übersicht</Link>
      </div>
    </main>
  );
}
