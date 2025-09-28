import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import threadReducer from '../features/threads/threadsSlice';
import usersReducer from '../features/threads/threadsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
    users: usersReducer, 
  },
});

export default store;
