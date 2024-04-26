import { configureStore } from '@reduxjs/toolkit';

// Import reducers
import homeReducer from './homeSlice';

// Combine reducers
const reducers = {
  home: homeReducer
};

// Configure store
const store = configureStore({
  reducer: reducers,
});

export default store;