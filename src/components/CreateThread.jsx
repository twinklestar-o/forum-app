import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createThread } from '../features/threads/threadsSlice';

export default function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.threads);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createThread({ title, body, category }));
    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 mb-4 rounded thread-create-form"
    >
      <h2 className="text-xl font-semibold mb-2">Create Thread</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Posting...' : 'Post Thread'}
      </button>

      {/* Floating Button */}
      <button
        type="button"
        className="floating-btn"
        onClick={() => navigate('/create')}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
