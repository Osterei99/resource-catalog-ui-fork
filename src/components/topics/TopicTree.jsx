import React from 'react';
import SearchInput from '../common/SearchInput';
import CounterBadge from '../common/CounterBadge';
import ListItemCheckbox from '../common/ListItemCheckbox';

function norm(s) { return (s || '').toLowerCase().trim(); }

export default function TopicTree({
  topics = [],
  selected = [],
  setSelected,
  className = '',
}) {
  const [q, setQ] = React.useState('');

  const roots = React.useMemo(() => topics.filter(t => !t.parentTopicID), [topics]);
  const childrenOf = React.useCallback(
    (pid) => topics.filter(t => t.parentTopicID === pid),
    [topics]
  );

  const matches = React.useCallback((t) => !q || norm(t.name).includes(norm(q)), [q]);

  const parentVisible = React.useCallback((parent) => {
    if (matches(parent)) return true;
    return childrenOf(parent.id).some(c => matches(c));
  }, [childrenOf, matches]);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <section className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="border-b border-gray-100 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Themen</h3>
          <p className="text-xs text-gray-500 mt-0.5">Eltern-Themen und Unterthemen.</p>
        </div>
        <CounterBadge count={selected.length} />
      </div>

      <div className="p-5">
        <SearchInput
          label="Themen suchen"
          value={q}
          onChange={setQ}
          placeholder="z. B. JavaScript, Docker, SQL…"
        />

        <ul className="mt-4 space-y-4">
          {roots.filter(parentVisible).map(rt => {
            const kids = childrenOf(rt.id).filter(ch => matches(ch));
            const parentChecked = selected.includes(rt.id);

            return (
              <li key={rt.id} className="rounded-xl border border-gray-200">
                <div className="flex items-center justify-between p-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-main-dark"
                      checked={parentChecked}
                      onChange={() => toggle(rt.id)}
                    />
                    <span className="font-medium text-gray-900">{rt.name}</span>
                  </label>
                  <span className="text-xs text-gray-500">
                    {kids.length} Unterthema{kids.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {kids.length > 0 && (
                  <ul className="grid gap-2 sm:grid-cols-2 p-3 pt-0">
                    {kids.map(ch => (
                      <li key={ch.id}>
                        <ListItemCheckbox
                          checked={selected.includes(ch.id)}
                          onChange={() => toggle(ch.id)}
                          left={<span className="text-gray-800">{ch.name}</span>}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          {roots.filter(parentVisible).length === 0 && (
            <li className="text-sm text-gray-500">Keine Themen gefunden.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
