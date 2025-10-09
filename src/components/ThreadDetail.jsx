// src/components/ThreadDetail.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import timeAgo from '../utils/timeAgo';
import CreateComment from './CreateComment';
import '../index.css';

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

const CURRENT_USER = 'You';

export default function ThreadDetail({ thread }) {
  const initialVotes = {};
  thread.comments.forEach((c) => {
    initialVotes[c.id] = {
      upUsers: c.upUsers || [],
      downUsers: c.downUsers || [],
      userVote: null,
    };
  });
  const [commentVotes, setCommentVotes] = useState(initialVotes);

  const handleVote = (commentId, type) => {
    setCommentVotes((prev) => {
      const current = prev[commentId];
      if (!current) return prev;

      let { upUsers, downUsers, userVote } = current;
      const removeUser = (arr) => arr.filter((u) => u !== CURRENT_USER);
      const addUser = (arr) => (arr.includes(CURRENT_USER) ? arr : [...arr, CURRENT_USER]);

      if (type === 'up') {
        if (userVote === 'up') {
          upUsers = removeUser(upUsers);
          userVote = null;
        } else {
          if (userVote === 'down') downUsers = removeUser(downUsers);
          upUsers = addUser(upUsers);
          userVote = 'up';
        }
      } else if (type === 'down') {
        if (userVote === 'down') {
          downUsers = removeUser(downUsers);
          userVote = null;
        } else {
          if (userVote === 'up') upUsers = removeUser(upUsers);
          downUsers = addUser(downUsers);
          userVote = 'down';
        }
      }

      return {
        ...prev,
        [commentId]: { upUsers, downUsers, userVote },
      };
    });
  };

  return (
    <div className="thread-detail">
      {/* ✅ Avatar dan nama pembuat thread */}
      <header className="flex items-center gap-3 mb-4">
        
        <div>
          <h1 className="thread-title text-xl font-bold">
            {stripHtml(thread.title)}
          </h1>
          <div className="thread-meta-detail text-gray-600 text-sm">
            By 
            {thread.owner?.avatar && (
              <img
                src={thread.owner.avatar}
                alt={`Avatar of ${thread.owner.name}`}
                className="avatar-img"
              />
            )}
            {thread.owner?.name || 'Unknown'} • {timeAgo(thread.createdAt)}
          </div>
        </div>
      </header>

      <p className="pre-wrap mb-6">{stripHtml(thread.body)}</p>

      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      {thread.comments.length === 0 && <p>No comments yet.</p>}

      <ul className="comments-list space-y-4">
        {thread.comments.map((c) => {
          const voteData = commentVotes[c.id] || {
            upUsers: [],
            downUsers: [],
            userVote: null,
          };
          return (
            <li key={c.id} className="comment-item border-b pb-3">
              <div>{stripHtml(c.content)}</div>
              <div className="comment-owner text-sm text-gray-600 mt-1">
                By {c.owner?.avatar && (
                  <img
                    src={c.owner.avatar}
                    alt={`Avatar of ${c.owner.name}`}
                    className="avatar-img"
                  />
                )}
             {c.owner?.name || 'Unknown'} • {timeAgo(c.createdAt)}
              </div>
              <div className="comment-votes flex items-center gap-4 mt-2">
                <button
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => handleVote(c.id, 'up')}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ color: voteData.userVote === 'up' ? 'green' : 'gray' }}
                  />
                  <span>{voteData.upUsers.length}</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => handleVote(c.id, 'down')}
                >
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    style={{ color: voteData.userVote === 'down' ? 'red' : 'gray' }}
                  />
                  <span>{voteData.downUsers.length}</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <CreateComment threadId={thread.id} />
    </div>
  );
}
