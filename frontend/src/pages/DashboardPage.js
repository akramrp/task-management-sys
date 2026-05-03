import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className='card'>
      <h2 className='title'>Dashboard</h2>
      <p className='muted'>Welcome, <strong>{user?.name}</strong>! Ready to ship something amazing today?</p>
    </div>
  );
}
