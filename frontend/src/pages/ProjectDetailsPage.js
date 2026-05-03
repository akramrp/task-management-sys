import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const badgeClass = (status) => {
  if (status === 'Done') return 'badge done';
  if (status === 'In Progress') return 'badge progress';
  return 'badge todo';
};

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const load = async () => {
    const { data } = await api.get(`/tasks?project=${id}&search=${search}&status=${status}`);
    setTasks(data.data);
  };

  useEffect(() => { load(); }, [id]);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/tasks', { title, project: id });
    setTitle('');
    load();
  };

  const updateStatus = async (taskId, newStatus) => {
    await api.put(`/tasks/${taskId}`, { status: newStatus });
    load();
  };

  const del = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    load();
  };

  return (
    <div className='card'>
      <h2 className='title'>Project Tasks</h2>
      <form onSubmit={create} className='row'>
        <input className='grow' value={title} placeholder='Task title' onChange={(e) => setTitle(e.target.value)} />
        <button>Add Task</button>
      </form>

      <div className='row'>
        <input className='grow' value={search} placeholder='Search tasks' onChange={(e) => setSearch(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value=''>All</option><option>To Do</option><option>In Progress</option><option>Done</option>
        </select>
        <button onClick={load} type='button'>Filter</button>
      </div>

      {tasks.map((t) => (
        <div className='list-item' key={t._id}>
          <div>
            <strong>{t.title}</strong>
            <div><span className={badgeClass(t.status)}>{t.status}</span></div>
          </div>
          <select value={t.status} onChange={(e) => updateStatus(t._id, e.target.value)}>
            <option>To Do</option><option>In Progress</option><option>Done</option>
          </select>
          <button className='btn-danger' onClick={() => del(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
