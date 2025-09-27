// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads } from '../features/threads/threadsSlice';
import ThreadList from '../components/ThreadList';
import CreateThread from '../components/CreateThread';
import Loading from '../components/Loading';

export default function HomePage() {
  
  const dispatch = useDispatch();
  const { threads, isLoading, error } = useSelector((state) => state.threads);
  const { user } = useSelector((state) => state.auth);

  console.log('threads:', threads, 'user:', user, 'error:', error);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {user && <CreateThread />}
      {isLoading ? <Loading /> : <ThreadList threads={threads} />}
    </div>
    
  );
}
