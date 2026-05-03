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
    setLoading(true); setError('');
    try { await login(form.email, form.password); navigate('/dashboard'); } catch (e2) { setError(e2.response?.data?.message || 'Login failed'); }
    setLoading(false);
  };
  return <form onSubmit={submit} className='card'><h2>Login</h2>{error && <p className='error'>{error}</p>}<input placeholder='Email' onChange={e=>setForm({...form,email:e.target.value})}/><input type='password' placeholder='Password' onChange={e=>setForm({...form,password:e.target.value})}/><button>{loading?'Loading...':'Login'}</button><p>No account? <Link to='/signup'>Sign up</Link></p></form>;
}
