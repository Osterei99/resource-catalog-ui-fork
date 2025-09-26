import './index.css';
import React, { useState } from 'react';
import ResourceList from './components/ResourceList.jsx';
import ResourceDetail from './components/ResourceDetail.jsx';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import TopicsSkills from './pages/TopicsSkills.jsx';
import GeneratePath from './pages/GeneratePath.jsx';
import LearningPaths from './pages/LearningPaths.jsx';
import LearningPathDetail from './pages/LearningPathDetail.jsx';
import ResourceDetailPage from './pages/ResourceDetailPage.jsx';

function HomeCatalog() {
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      {selectedResourceId ? (
        <ResourceDetail resourceId={selectedResourceId} onBack={() => setSelectedResourceId(null)} />
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Entdecken Sie unsere Resourcen</h2>
          <ResourceList onSelectResource={(id)=>setSelectedResourceId(id)} />
        </div>
      )}
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans antialiased">
        <header className="bg-main-dark py-6 shadow-xl">
          <div className="container mx-auto px-6 max-w-screen-xl flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Ressourcen-Katalog</h1>
            <nav className="flex gap-3">
              <Link to="/" className="text-white/90 hover:text-white">Ressourcen</Link>
              <Link to="/topics-skills" className="text-white/90 hover:text-white">Themen & Skills</Link>
              <Link to="/generate" className="text-white/90 hover:text-white">Learning Path</Link>
              <Link to="/paths" className="text-white/90 hover:text-white">Meine Pfade</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomeCatalog />} />
          <Route path="/topics-skills" element={<TopicsSkills />} />
          <Route path="/generate" element={<GeneratePath />} />
          <Route path="/paths" element={<LearningPaths />} />
          <Route path="/paths/:pathId" element={<LearningPathDetail />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
