import './index.css';
import React, { useState } from 'react';
import ResourceList from './components/ResourceList.jsx';
import ResourceDetail from './components/ResourceDetail.jsx';

function App() {

  const [selectedResourceId, setSelectedResourceId] = useState(null);

  const handleSelectResource = (id) => {
    setSelectedResourceId(id);
  };

  const handleBackToList = () => {
    setSelectedResourceId(null);
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
        {selectedResourceId ? (
          <ResourceDetail 
            resourceId={selectedResourceId}
            onBack={handleBackToList}
          />
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-10 text-gray-800">Entdecken Sie unsere Resourcen</h2>
            <ResourceList onSelectResource={handleSelectResource} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
