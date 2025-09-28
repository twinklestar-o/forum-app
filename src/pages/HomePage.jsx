import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../features/threads/threadsSlice';
import ThreadList from '../components/ThreadList';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { threads, isLoading, error } = useSelector((state) => state.threads);
  const { user } = useSelector((state) => state.auth);

  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  const categories = ['all', ...new Set(threads.map(t => t.category))];

  const filteredThreads =
    categoryFilter === 'all'
      ? threads
      : threads.filter(t => t.category === categoryFilter);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Dropdown filter kategori */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="cat" className="font-semibold">Filter Kategori:</label>
        <select
          id="cat"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded p-1"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {isLoading ? <Loading /> : <ThreadList threads={filteredThreads} />}

      {/* Floating button hanya tampil jika user login */}
      {user && (
        <button
          className="floating-btn"
          onClick={() => navigate('/create')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </div>
  );
}
