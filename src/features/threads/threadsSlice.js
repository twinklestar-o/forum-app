import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Fetch semua thread
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/threads');
      return res.data.data.threads;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch threads');
    }
  }
);

// Fetch detail thread
export const fetchThreadById = createAsyncThunk(
  'threads/fetchThreadById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/threads/${id}`);
      return res.data.data.detailThread;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch thread detail');
    }
  }
);

// Create thread
export const createThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const res = await api.post('/threads', { title, body, category });
      return res.data.data.thread;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create thread');
    }
  }
);

// Create comment
export const createComment = createAsyncThunk(
  'threads/createComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/threads/${threadId}/comments`, { content });
      return { threadId, comment: res.data.data.comment };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create comment');
    }
  }
);

const threadSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    currentThread: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(fetchThreadById.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentThread = action.payload;
      })
      .addCase(fetchThreadById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(createThread.fulfilled, (state, action) => {
        state.threads.unshift(action.payload);
      })

      .addCase(createComment.fulfilled, (state, action) => {
        if (state.currentThread && state.currentThread.id === action.payload.threadId) {
          state.currentThread.comments.push(action.payload.comment);
        }
      });
  },
});

export default threadSlice.reducer;
