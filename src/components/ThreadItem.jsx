import React from 'react';
import { Link } from 'react-router-dom';
import timeAgo from '../utils/timeAgo';
import '../../src/index.css';

export default function ThreadItem({ thread }) {
  return (
    <div className="thread-item">
      <Link
        to={`/thread/${thread.id}`}
        className="thread-title"
      >
        {thread.title}
      </Link>

      {thread.body && (
        <div
          className="thread-body"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />
      )}

      <div className="thread-meta">
        <span>By {thread.owner?.name || 'Unknown'}</span>
        <span>• {timeAgo(thread.createdAt)}</span>
        <span>• {thread.totalComments} comments</span>
      </div>
    </div>
  );
}
