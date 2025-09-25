// src/pages/LearningPaths.jsx
import React from 'react';
import { lpList, fetchTopics, fetchSkills, fetchResources } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PathsGrid from '../components/paths/PathsGrid';

// Helper (not a hook)
function buildMap(list = [], idKey = 'id', nameKey = 'name') {
  const m = new Map();
  (list || []).forEach(item => {
    const id = String(item?.[idKey]);
    const nm = item?.[nameKey];
    if (id) m.set(id, nm);
  });
  return m;
}

export default function LearningPaths() {
  // ---------------- Hooks: keep order/stability ----------------
  const [paths, setPaths] = React.useState(null);
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
          lpList(),
          fetchTopics(),
          fetchSkills(),
          fetchResources(), // [{ id, title, ... }]
        ]);
        if (!on) return;
        setPaths(p || []);
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
  }, []);
  // --------------- End of hooks (no more hooks below) ----------

  // These are plain variables, NOT hooks — safe in any render.
  const topicMap   = buildMap(topics, 'id', 'name');
  const skillMap   = buildMap(skills, 'id', 'name');
  const resourceMap = (() => {
    const m = new Map();
    (resources || []).forEach(r => {
      const id = String(r?.id ?? r?._id);
      if (id) m.set(id, r?.title || `Ressource ${id}`);
    });
    return m;
  })();

  // Plain functions (not hooks)
  const mapTopicIdToName = (id) => topicMap.get(String(id));
  const mapSkillIdToName = (id) => skillMap.get(String(id));
  const mapResIdToTitle  = (id) => resourceMap.get(String(id));

  // Early returns AFTER hooks (safe)
  if (loading) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <LoadingSpinner label="Lade Learning Paths…" />
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
  if (!paths?.length) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <ErrorMessage variant="info" title="Keine Learning Paths" message="Noch keine Pfade vorhanden." />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Meine Learning Paths</h2>
      <PathsGrid
        paths={paths}
        mapTopicIdToName={mapTopicIdToName}
        mapSkillIdToName={mapSkillIdToName}
        mapResIdToTitle={mapResIdToTitle}
      />
    </main>
  );
}
