import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  playlist: [],
  loading: false,
  groups: [],
  affirmations: [],
};
const Home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    playlist_request: (state, action) => {
      return {...state, loading: true};
    },
    playlist_success: (state, action) => {
      return {...state, playlist: action.payload, loading: false};
    },
    playlist_error: (state, action) => {
      return {...state, loading: false};
    },
    group_fetch_request: (state, action) => {
      return {...state, loading: true};
    },
    group_fetch_success: (state, action) => {
      return {...state, groups: action.payload, loading: false};
    },
    group_fetch_error: (state, action) => {
      return {...state, loading: false};
    },
    affirmation_fetch_request: (state, action) => {
      return {...state, loading: true};
    },
    affirmation_fetch_success: (state, action) => {
      return {...state, loading: false, affirmations: action.payload};
    },
    affirmation_fetch_error: (state, action) => {
      return {...state, loading: false};
    },
  },
});
export default Home.reducer;
