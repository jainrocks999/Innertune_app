import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  playlist: [],
  loading: false,
  groups: [],
  category:[],
  affirmations: [],
  bgSound:[],
  bgcategories:[],
  createPlayList:[],
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
    category_fetch_request: (state, action) => {
      return {...state, loading: true};
    },
    category_fetch_success: (state, action) => {
      return {...state, category: action.payload, loading: false};
    },
    category_fetch_error: (state, action) => {
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
    bg_categories_request:(state,action)=>{
      return {...state,loading:true}
    },
    bg_categories_success:(state,action)=>{
      return {...state,bgcategories:action.payload,loading:false}
    },
    bg_categories_error:(state,action)=>{
      return {...state,loading:false}
    },
    bg_sound_request:(state,action)=>{
      return {...state,loading:true}
    },
    bg_sound_success:(state,action)=>{
      return {...state,bgSound:action.payload,loading:false}
    },
    bg_sound_error:(state,action)=>{
      return {...state,loading:false}
    },
    createPlayList_request:(state,action)=>{
      return {...state,loading:true}
    },
    createPlayList_success:(state,action)=>{
      return {...state,createPlayList:action.payload,loading:false}
    },
    createPlayList_error:(state,action)=>{
      return {...state,loading:false}
    }
  },
});
export default Home.reducer;
