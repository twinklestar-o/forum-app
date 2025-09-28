import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice'; // pastikan path benar
import '../index.css';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!users || users.length === 0) return <p>No users yet.</p>;

  // Urutkan berdasarkan score descending
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <ul>
        {sortedUsers.map((user, idx) => (
          <li
            key={user.id}
            className="p-2 border rounded mb-2 flex items-center gap-3"
          >
            <img
              src={user.avatar}
              alt={user.name}
              width="40"
              height="40"
              className="rounded-full"
            />
            <span>{idx + 1}. {user.name}</span>
            <span style={{ marginLeft: 'auto' }}>{user.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
