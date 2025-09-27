import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../features/threads/threadsSlice';

export default function CreateComment({ threadId }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.threads);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ threadId, content }));
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4">
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
      >
        {isLoading ? 'Submitting...' : 'Add Comment'}
      </button>
    </form>
  );
}
