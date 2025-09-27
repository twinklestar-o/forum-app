import React from 'react';
import ThreadItem from './ThreadItem';

export default function ThreadList({ threads }) {
  if (!threads?.length) return <p className="text-gray-600">No threads yet.</p>;

  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
