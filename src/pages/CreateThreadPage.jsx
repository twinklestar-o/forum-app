import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThread } from '../features/threads/threadsSlice';

export default function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;

    dispatch(createThread({ title, body }));
    setTitle('');
    setBody('');
    alert('Thread berhasil dibuat!');
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Buat Thread Baru</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Isi Thread</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buat Thread
        </button>
      </form>
    </div>
  );
}
