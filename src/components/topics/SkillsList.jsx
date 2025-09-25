import React from 'react';
import SearchInput from '../common/SearchInput';
import CounterBadge from '../common/CounterBadge';
import ListItemCheckbox from '../common/ListItemCheckbox';

function norm(s) { return (s || '').toLowerCase().trim(); }

export default function SkillsList({
  skills = [],
  selectedTopics = [],
  selected = [],
  setSelected,
  className = '',
}) {
  const [q, setQ] = React.useState('');

  // filter by selected topics (if any)
  const base = React.useMemo(() => {
    return selectedTopics.length ? skills.filter(s => selectedTopics.includes(s.topicID)) : skills;
  }, [skills, selectedTopics]);

  const filtered = React.useMemo(() => {
    if (!q) return base;
    const n = norm(q);
    return base.filter(s => norm(s.name).includes(n));
  }, [base, q]);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <section className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="border-b border-gray-100 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {selectedTopics.length ? 'Gefiltert nach Themen.' : 'Alle Skills.'}
          </p>
        </div>
        <CounterBadge count={selected.length} />
      </div>

      <div className="p-5">
        <SearchInput
          label="Skills durchsuchen"
          value={q}
          onChange={setQ}
          placeholder="z. B. Flexbox, Promises, Joins…"
        />

        <div className="mt-4 max-h-[520px] overflow-auto">
          <ul className="grid gap-2">
            {filtered.map(sk => (
              <li key={sk.id}>
                <ListItemCheckbox
                  checked={selected.includes(sk.id)}
                  onChange={() => toggle(sk.id)}
                  left={<span className="text-gray-800">{sk.name}</span>}
                  right={
                    <span className="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                      {sk.difficulty}
                    </span>
                  }
                />
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-sm text-gray-500">Keine Skills gefunden.</li>
            )}
          </ul>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
          <span>
            Themen gewählt:&nbsp;
            <span className="font-semibold text-gray-900">{selectedTopics.length}</span>
          </span>
          <span>
            Skills gewählt:&nbsp;
            <span className="font-semibold text-gray-900">{selected.length}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
