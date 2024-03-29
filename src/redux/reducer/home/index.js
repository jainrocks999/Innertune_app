import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  playlist: [],
  loading: false,
};
const Home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    playlist_request: (state, action) => {
      return {...state, loading: true};
    },
    playlist_success: (state, action) => {
      return {...state, loading: false, playlist: action.payload};
    },
    playlist_error: (state, action) => {
      return {...state, loading: false};
    },
  },
});
export default Home.reducer;
