import React from 'react';
import { fetchTopics, fetchSkills } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

import TopicTree from '../components/topics/TopicTree';
import SkillsList from '../components/topics/SkillsList';
import ActionsBar from '../components/topics/ActionsBar';

const LS_TOPICS = 'lp_selected_topics';
const LS_SKILLS = 'lp_selected_skills';

export default function TopicsSkills() {
  // data
  const [topics, setTopics] = React.useState([]);
  const [skills, setSkills] = React.useState([]);

  // selection
  const [selectedTopics, setSelectedTopics] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_TOPICS) || '[]'); } catch { return []; }
  });
  const [selectedSkills, setSelectedSkills] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_SKILLS) || '[]'); } catch { return []; }
  });

  // ui state
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  // load
  React.useEffect(() => {
    let on = true;
    (async () => {
      try {
        const [t, s] = await Promise.all([fetchTopics(), fetchSkills()]);
        if (!on) return;
        setTopics(t);
        setSkills(s);
      } catch (e) {
        setError(e?.message || String(e));
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, []);

  // persist
  React.useEffect(() => localStorage.setItem(LS_TOPICS, JSON.stringify(selectedTopics)), [selectedTopics]);
  React.useEffect(() => localStorage.setItem(LS_SKILLS, JSON.stringify(selectedSkills)), [selectedSkills]);

  const resetAll = () => {
    localStorage.removeItem(LS_TOPICS);
    localStorage.removeItem(LS_SKILLS);
    setSelectedTopics([]);
    setSelectedSkills([]);
  };

  // states
  if (loading) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <LoadingSpinner label="Lade Themen & Skills..." />
      </main>
    );
  }
  if (error) {
    return (
      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <ErrorMessage title="Fehler beim Laden" message={error} />
      </main>
    );
  }

  // page
  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Themen & Skills auswählen</h2>
          <p className="text-sm text-gray-600 mt-1">
            Wählen Sie Themen und zugehörige Skills. Ihre Auswahl wird lokal gespeichert.
          </p>
        </div>

        {/* Top actions (desktop) */}
        <ActionsBar onReset={resetAll} className="hidden sm:flex" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <TopicTree
          topics={topics}
          selected={selectedTopics}
          setSelected={setSelectedTopics}
        />
        <SkillsList
          skills={skills}
          selectedTopics={selectedTopics}
          selected={selectedSkills}
          setSelected={setSelectedSkills}
        />
      </div>

      {/* Bottom actions (mobile) */}
      <ActionsBar onReset={resetAll} className="mt-8" mobile />
    </main>
  );
}
