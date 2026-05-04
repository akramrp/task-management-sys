import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = async (p = 1) => {
    const { data } = await api.get(`/projects?page=${p}&limit=5`);
    setProjects(data.data);
    setPages(data.pages || 1);
    setPage(p);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/projects', { title, description });
    setTitle('');
    setDescription('');
    load(page);
  };

  const del = async (id) => {
    await api.delete(`/projects/${id}`);
    load(page);
  };

  return (
    <div className='card'>
      <h2 className='title'>Projects</h2>
      <p className='muted'>Create and manage your projects in one place.</p>
      <form onSubmit={create} className='row'>
        <input className='grow' value={title} placeholder='Project title' onChange={(e) => setTitle(e.target.value)} />
        <input className='grow' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        <button>Add Project</button>
      </form>

      {projects.map((p) => (
        <div key={p._id} className='list-item'>
          <Link to={`/projects/${p._id}`}><strong>{p.title}</strong></Link>
          <span className='muted'>{p.description || 'No description'}</span>
          <button className='btn-danger' onClick={() => del(p._id)}>Delete</button>
        </div>
      ))}

      <div className='row'>
        <button disabled={page <= 1} onClick={() => load(page - 1)}>Prev</button>
        <span className='muted'>Page {page} of {pages}</span>
        <button disabled={page >= pages} onClick={() => load(page + 1)}>Next</button>
      </div>
    </div>
  );
}
