import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (e2) {
      setError(e2.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className='auth-wrap'>
      <form onSubmit={submit} className='card'>
        <h2 className='title'>Create account 🚀</h2>
        <p className='muted'>Start organizing your work with TaskFlow.</p>
        {error && <p className='error'>{error}</p>}
        <input placeholder='Name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type='password' placeholder='Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button>{loading ? 'Creating...' : 'Sign Up'}</button>
        <p className='muted'>Already have account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
}
