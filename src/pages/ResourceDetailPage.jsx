import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResourceDetail from '../components/ResourceDetail.jsx';

export default function ResourceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-6 max-w-screen-xl py-8 mt-8">
      <ResourceDetail resourceId={id} onBack={() => navigate(-1)} />
    </main>
  );
}
