import './index.css';
import React from 'react';
import ResourceList from './components/ResourceList.jsx';
import ResourceDetail from './components/ResourceDetail.jsx';

function App() {

  const dummyDetailResource = {
    id: 'detail-1',
    title: 'Fortgeschrittene React-Patterns',
    type: 'Buch',
    description: 'Tauchen Sie tief in Hooks, Context API, Render Props und mehr ein, um robuste und wartbare React-Anwendungen zu erstellen. Dieses Buch bietet praktische Beispiele und Best Practices für erfahrene Entwickler, die ihre Fähigkeiten erweitern möchten.',
    authorId: 'sophie_dev',
    createdAt: '2023-03-01T11:45:00Z',
    averageRating: 4.8,
    feedback: [
      { id: 'f1', resourceId: 'detail-1', feedbackText: 'Sehr aufschlussreich und gut erklärt!', userId: 'johndoe', timestamp: '2023-03-05T10:00:00Z' },
      { id: 'f2', resourceId: 'detail-1', feedbackText: 'Ein Muss für jeden erfahrenen React-Entwickler.', userId: 'janedoe', timestamp: '2023-03-06T15:30:00Z' },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <header className="bg-main-dark py-6 shadow-xl">
        <div className="container mx-auto px-6 max-w-screen-xl flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Ressourcen-Katalog</h1>
          <nav></nav>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Entdecken Sie unsere Ressourcen</h2>
        <ResourceList />
        <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-800">Ressourcen-Details</h2>
        <ResourceDetail resource={dummyDetailResource}/>
      </main>
    </div>
  )
}

export default App
