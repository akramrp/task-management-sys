import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]); const [title, setTitle] = useState(''); const [search, setSearch] = useState(''); const [status, setStatus] = useState('');
  const load = async () => { const { data } = await api.get(`/tasks?project=${id}&search=${search}&status=${status}`); setTasks(data.data); };
  useEffect(() => { load(); }, [id]);
  const create = async (e) => { e.preventDefault(); await api.post('/tasks', { title, project: id }); setTitle(''); load(); };
  const updateStatus = async (taskId, newStatus) => { await api.put(`/tasks/${taskId}`, { status: newStatus }); load(); };
  const del = async (taskId) => { await api.delete(`/tasks/${taskId}`); load(); };
  return <div className='card'><h2>Project Tasks</h2><form onSubmit={create}><input value={title} placeholder='Task title' onChange={e=>setTitle(e.target.value)}/><button>Add Task</button></form><div className='row'><input value={search} placeholder='Search tasks' onChange={e=>setSearch(e.target.value)}/><select value={status} onChange={e=>setStatus(e.target.value)}><option value=''>All</option><option>To Do</option><option>In Progress</option><option>Done</option></select><button onClick={load}>Filter</button></div>{tasks.map(t=><div className='row' key={t._id}><span>{t.title}</span><select value={t.status} onChange={e=>updateStatus(t._id,e.target.value)}><option>To Do</option><option>In Progress</option><option>Done</option></select><button onClick={()=>del(t._id)}>Delete</button></div>)}</div>;
}
