import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import timeAgo from '../utils/timeAgo';
import '../../src/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

const CURRENT_USER = { id: 'u123', name: 'CurrentUser' };

export default function ThreadItem({ thread }) {
  if (!thread) return null;

  const [upvoters, setUpvoters] = useState(thread.upvoters || []);
  const [downvoters, setDownvoters] = useState(thread.downvoters || []);

  const handleVote = (type) => {
    if (type === 'up') {
      if (!upvoters.some((u) => u.id === CURRENT_USER.id)) {
        setUpvoters([...upvoters, CURRENT_USER]);
      }
    } else {
      if (!downvoters.some((u) => u.id === CURRENT_USER.id)) {
        setDownvoters([...downvoters, CURRENT_USER]);
      }
    }
  };

  return (
    <div className="thread-item">
      <Link to={`/thread/${thread.id}`} className="thread-title">
        {stripHtml(thread.title)}
      </Link>

      {thread.body && (
        <div className="thread-body">{stripHtml(thread.body)}</div>
      )}

      <div className="thread-meta">
        <span>By {thread.owner?.name || 'Unknown'}</span>
        <span>• {timeAgo(thread.createdAt)}</span>
        <span>• {thread.totalComments || 0} comments</span>
      </div>

      {/* --- Vote Section --- */}
      <div className="comment-votes" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
        <button
          className="vote-btn"
          onClick={() => handleVote('up')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ color: 'green' }}
          />
          <span>{upvoters.length}</span>
        </button>

        <button
          className="vote-btn"
          onClick={() => handleVote('down')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            style={{ color: 'red' }}
          />
          <span>{downvoters.length}</span>
        </button>
      </div>
    </div>
  );
}
