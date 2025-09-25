import React from 'react';
import { useParams } from 'react-router-dom';
import { lpGet } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function LearningPathDetail() {
  const { pathId } = useParams();
  const [p, setP] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let on = true;
    (async () => {
      try {
        const data = await lpGet(pathId);
        if (on) setP(data);
      } catch (e) {
        if (on) setError(e?.message || String(e));
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, [pathId]);

  if (loading) return <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8"><LoadingSpinner/></main>;
  if (error)   return <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8"><ErrorMessage title="Fehler" message={error}/></main>;
  if (!p) return null;

  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Learning Path</h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="text-sm text-gray-500">{p.pathId}</div>
        {p.summary && <p className="mt-3 text-gray-800">{p.summary}</p>}
        <h3 className="mt-6 text-xl font-semibold text-gray-800">Meilensteine</h3>
        <ol className="mt-3 space-y-4">
          {p.milestones?.map(m => (
            <li key={m.milestoneId} className="rounded-xl border border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900">{m.label}</div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{m.type}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {m.topicId ? <>topicId: <span className="font-mono">{m.topicId}</span>&nbsp;</> : null}
                {m.skillId ? <>skillId: <span className="font-mono">{m.skillId}</span></> : null}
              </div>
              {!!m.resources?.length && (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {m.resources.map((r, i) => (
                    <li key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-2">
                      <a className="text-main-dark hover:underline" href={`/resources/${r.resourceId}`}>
                        Ressource öffnen {r.resourceId}
                      </a>
                      {r.why && <div className="text-xs text-gray-600 mt-1">— {r.why}</div>}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
