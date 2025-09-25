import React from 'react';
import { fetchTopics, fetchSkills, lpGenerate } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

import UserIdField from '../components/generate/UserIdField';
import SelectionSummary from '../components/generate/SelectionSummary';
import GenerateCTA from '../components/generate/GenerateCTA';

const LS_TOPICS = 'lp_selected_topics';
const LS_SKILLS = 'lp_selected_skills';

function mapIdsToNamedList(ids, catalog, idKey = 'id', nameKey = 'name') {
  if (!Array.isArray(ids) || !Array.isArray(catalog)) return [];
  const byId = new Map(catalog.map(item => [String(item[idKey]), item]));
  return ids
    .map(id => {
      const item = byId.get(String(id));
      return item ? { id: item[idKey], name: item[nameKey] } : null;
    })
    .filter(Boolean);
}

export default function GeneratePath() {
  // user & selections
  const [userId, setUserId] = React.useState('demo-user');
  const [selectedTopicIds] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_TOPICS) || '[]'); } catch { return []; }
  });
  const [selectedSkillIds] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_SKILLS) || '[]'); } catch { return []; }
  });

  // catalogs
  const [topics, setTopics] = React.useState([]);
  const [skills, setSkills] = React.useState([]);

  // ui state
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  // load catalogs to map IDs -> names
  React.useEffect(() => {
    let on = true;
    (async () => {
      try {
        const [t, s] = await Promise.all([fetchTopics(), fetchSkills()]);
        if (!on) return;
        setTopics(t || []);
        setSkills(s || []);
      } catch (e) {
        setError(e?.message || String(e));
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, []);

  const selectedTopicsNamed = React.useMemo(
    () => mapIdsToNamedList(selectedTopicIds, topics, 'id', 'name'),
    [selectedTopicIds, topics]
  );

  const selectedSkillsNamed = React.useMemo(
    () => mapIdsToNamedList(selectedSkillIds, skills, 'id', 'name'),
    [selectedSkillIds, skills]
  );

  const hasNoSelection = selectedTopicsNamed.length === 0 && selectedSkillsNamed.length === 0;

  async function handleGenerate() {
    setSubmitting(true);
    setError('');
    try {
      // You can send IDs, but sending names is friendlier for LLM prompts.
      const payload = {
        userId,
        desiredTopics: selectedTopicsNamed.map(t => t.name),
        desiredSkills: selectedSkillsNamed.map(s => s.name),
      };
      const res = await lpGenerate(payload);
      window.location.assign(`/paths/${res.pathId}`);
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <LoadingSpinner label="Lade Auswahl…" />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Learning Path erzeugen</h2>
        <p className="text-sm text-gray-600 mt-1">
          Bitte prüfen Sie die Auswahl. Wir zeigen die **Namen** Ihrer Themen & Skills, nicht nur IDs.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="grid gap-4 sm:grid-cols-2">
          <UserIdField value={userId} onChange={setUserId} />
          <div className="hidden sm:block" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <SelectionSummary
            title="Gewählte Themen"
            items={selectedTopicsNamed}
            emptyText="Keine Themen ausgewählt."
            footer={
              <a href="/topics-skills" className="text-main-dark text-sm hover:underline">
                Themen auswählen
              </a>
            }
          />

          <SelectionSummary
            title="Gewählte Skills"
            items={selectedSkillsNamed}
            emptyText="Keine Skills ausgewählt."
            footer={
              <a href="/topics-skills" className="text-main-dark text-sm hover:underline">
                Skills auswählen
              </a>
            }
          />
        </div>

        {error && (
          <div className="mt-4">
            <ErrorMessage title="Fehler" message={error} />
          </div>
        )}

        <div className="mt-6">
          <GenerateCTA
            loading={submitting}
            disabled={hasNoSelection || !userId.trim()}
            onClick={handleGenerate}
          />
          {hasNoSelection && (
            <p className="mt-2 text-sm text-gray-500">
              Tipp: Wählen Sie zuerst Themen/Skills auf der Seite&nbsp;
              <a className="text-main-dark hover:underline" href="/topics-skills">Themen &amp; Skills</a>.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
