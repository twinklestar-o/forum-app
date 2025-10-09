import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchThreadById } from '../features/threads/threadsSlice';
import ThreadDetail from '../components/ThreadDetail';
import Loading from '../components/Loading';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentThread, isLoading } = useSelector((state) => state.threads);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchThreadById(id));
  }, [dispatch, id]);

  // Fetch daftar users dengan token (jika diperlukan)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/users', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const json = await res.json();
        if (json.status === 'success') setUsers(json.data.users);
      } catch {
        // eslint-disable-next-line no-alert
        alert('Gagal memuat daftar user.');
      }
    }
    fetchUsers();
  }, []);

  if (isLoading || !currentThread) return <Loading />;

  // aman: cek array sebelum .find
  const owner = users?.find((u) => u.id === currentThread?.owner?.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {owner && (
        <div className="flex items-center gap-3 mb-4">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="w-12 h-12 rounded-full border"
          />
          <span className="font-semibold">{owner.name}</span>
        </div>
      )}
      <ThreadDetail thread={currentThread} />
    </div>
  );
}
