import React, { useState } from 'react';
import timeAgo from '../utils/timeAgo';
import CreateComment from './CreateComment';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// ganti dengan user login sebenarnya
const CURRENT_USER = 'You';

export default function ThreadDetail({ thread }) {
  // State awal: setiap komentar punya daftar nama up/down
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
      <h1 className="thread-title">{stripHtml(thread.title)}</h1>
      <div className="thread-meta-detail">
        By {thread.owner?.name || 'Unknown'} • {timeAgo(thread.createdAt)}
      </div>
      <p className="pre-wrap">{stripHtml(thread.body)}</p>

      <h2>Comments</h2>
      {thread.comments.length === 0 && <p>No comments yet.</p>}

      <ul className="comments-list">
        {thread.comments.map((c) => {
          const voteData = commentVotes[c.id] || {
            upUsers: [],
            downUsers: [],
            userVote: null,
          };
          const upCount = voteData.upUsers.length;
          const downCount = voteData.downUsers.length;

          return (
            <li key={c.id} className="comment-item">
              <div>{stripHtml(c.content)}</div>
              <div className="comment-owner">
                By {c.owner?.name || 'Unknown'} • {timeAgo(c.createdAt)}
              </div>

              {/* Ikon + jumlah tepat di sampingnya */}
              <div className="comment-votes flex items-center gap-4 mt-1">
                <button
                  className="flex items-center gap-1 vote-btn"
                  onClick={() => handleVote(c.id, 'up')}
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    style={{ color: voteData.userVote === 'up' ? 'green' : 'gray' }}
                  />
                  <span>{upCount}</span>
                </button>

                <button
                  className="flex items-center gap-1 vote-btn"
                  onClick={() => handleVote(c.id, 'down')}
                >
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    style={{ color: voteData.userVote === 'down' ? 'red' : 'gray' }}
                  />
                  <span>{downCount}</span>
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
