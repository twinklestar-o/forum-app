import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchThreadById } from '../features/threads/threadsSlice';
import ThreadDetail from '../components/ThreadDetail';
import Loading from '../components/Loading';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentThread, isLoading } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(fetchThreadById(id));
  }, [dispatch, id]);

  if (isLoading || !currentThread) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ThreadDetail thread={currentThread} />
    </div>
  );
}
