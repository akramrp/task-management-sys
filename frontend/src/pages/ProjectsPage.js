import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]); const [title, setTitle] = useState(''); const [description, setDescription] = useState('');
  const [page, setPage] = useState(1); const [pages, setPages] = useState(1);
  const load = async (p=1) => { const { data } = await api.get(`/projects?page=${p}&limit=5`); setProjects(data.data); setPages(data.pages||1); setPage(p); };
  useEffect(() => { load(); }, []);
  const create = async (e) => { e.preventDefault(); await api.post('/projects', { title, description }); setTitle(''); setDescription(''); load(page); };
  const del = async (id) => { await api.delete(`/projects/${id}`); load(page); };
  return <div className='card'><h2>Projects</h2><form onSubmit={create}><input value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/><input value={description} placeholder='Description' onChange={e=>setDescription(e.target.value)}/><button>Add Project</button></form>{projects.map(p => <div key={p._id} className='row'><Link to={`/projects/${p._id}`}>{p.title}</Link><button onClick={()=>del(p._id)}>Delete</button></div>)}<div><button disabled={page<=1} onClick={()=>load(page-1)}>Prev</button><span>{page}/{pages}</span><button disabled={page>=pages} onClick={()=>load(page+1)}>Next</button></div></div>;
}
