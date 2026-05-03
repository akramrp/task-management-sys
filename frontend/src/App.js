import React from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className='container'>
      {user && (
        <nav className='nav'>
          <strong>✨ TaskFlow</strong>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/projects'>Projects</Link>
          <button onClick={logout} className='btn-secondary'>Logout</button>
        </nav>
      )}

      <Routes>
        <Route path='/' element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/projects' element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path='/projects/:id' element={<ProtectedRoute><ProjectDetailsPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
