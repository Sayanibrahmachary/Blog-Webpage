import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/profilesData/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
