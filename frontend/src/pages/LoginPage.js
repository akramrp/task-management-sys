import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (e2) {
      setError(e2.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className='auth-wrap'>
      <form onSubmit={submit} className='card'>
        <h2 className='title'>Welcome back 👋</h2>
        <p className='muted'>Sign in to continue managing your projects and tasks.</p>
        {error && <p className='error'>{error}</p>}
        <input placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type='password' placeholder='Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button>{loading ? 'Signing in...' : 'Login'}</button>
        <p className='muted'>No account? <Link to='/signup'>Create one</Link></p>
      </form>
    </div>
  );
}
