import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // Initial state for auth
};

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: ''
  },
  reducers: {
    setItem: (state, action) => {
      state.data = action.payload
    }
  },
});

export const { setItem } = homeSlice.actions;

export function fetchData(dispatch, getState) {

  return async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: 'http://localhost:3000/products/getAll'
      })
      dispatch(setItem(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export default homeSlice.reducer;
