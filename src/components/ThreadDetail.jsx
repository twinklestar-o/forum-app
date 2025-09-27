import React from 'react';
import timeAgo from '../utils/timeAgo';
import CreateComment from './CreateComment';

// Fungsi untuk membersihkan HTML tags
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export default function ThreadDetail({ thread }) {
  return (
    <div className="thread-detail">
      <h1 className="thread-title">{stripHtml(thread.title)}</h1>
      <div className="thread-meta-detail">
        By {thread.owner.name} • {timeAgo(thread.createdAt)}
      </div>
      <p className="pre-wrap">{stripHtml(thread.body)}</p>

      <h2>Comments</h2>
      {thread.comments.length === 0 && (
        <p className="text-gray-600 mb-4">No comments yet.</p>
      )}
      <ul className="comments-list">
        {thread.comments.map((c) => (
          <li key={c.id}>
            <div>{stripHtml(c.content)}</div>
            <div className="comment-owner">
              By {c.owner.name} • {timeAgo(c.createdAt)}
            </div>
          </li>
        ))}
      </ul>

      <CreateComment threadId={thread.id} />
    </div>
  );
}
