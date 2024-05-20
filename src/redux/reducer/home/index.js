import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  playlist: [],
  loading: false,
  groups: [],
  category: [],
  affirmations: [],
  bgSound: [],
  bgcategories: [],
  createPlayList: [],
  Createfavriote: {},
  favoriteList: [],
  item: {},
  addetItems_to_playlist: [],
  favorite_Cat: [],
  favorite_aff: [],
  searchData: {},
};
const Home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    playList_item: (state, action) => {
      return {...state, item: action.payload};
    },
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
    bg_categories_request: (state, action) => {
      return {...state, loading: true};
    },
    bg_categories_success: (state, action) => {
      return {...state, bgcategories: action.payload, loading: false};
    },
    bg_categories_error: (state, action) => {
      return {...state, loading: false};
    },
    bg_sound_request: (state, action) => {
      return {...state, loading: true};
    },
    bg_sound_success: (state, action) => {
      return {...state, bgSound: action.payload, loading: false};
    },
    bg_sound_error: (state, action) => {
      return {...state, loading: false};
    },
    createPlayList_request: (state, action) => {
      return {...state, loading: true};
    },
    createPlayList_success: (state, action) => {
      return {...state, createPlayList: action.payload, loading: false};
    },
    createPlayList_error: (state, action) => {
      return {...state, loading: false};
    },
    Createfavriote_request: (state, action) => {
      return {...state, loading: true};
    },
    Createfavriote_success: (state, action) => {
      return {...state, Createfavriote: action.payload, loading: false};
    },
    Createfavriote_error: (state, action) => {
      return {...state, loading: false};
    },
    favoriteList_request: (state, action) => {
      return {...state, loading: true};
    },
    favoriteList_success: (state, action) => {
      return {...state, favoriteList: action.payload, loading: false};
    },
    favoriteList_error: (state, action) => {
      return {...state, loading: false};
    },
    Add_item_to_Create_Playlist: (state, action) => {
      return {...state, addetItems_to_playlist: action.payload};
    },
    add_playlistItem_request: (state, action) => {
      return {...state, loading: true};
    },
    add_playlistItem_success: (state, action) => {
      return {...state, loading: false};
    },
    add_playlistItem_error: (state, action) => {
      return {...state, loading: false};
    },
    getPlayListItem_request: (state, action) => {
      return {...state, loading: true};
    },
    getPlayListItem_success: (state, action) => {
      return {...state, affirmations: action.payload, loading: false};
    },
    getPlayListItem_error: (state, action) => {
      return {...state, loading: false};
    },
    getFavriotCategories_request: (state, action) => {
      return {...state, loading: true};
    },
    getFavriotCategories_success: (state, action) => {
      return {...state, favorite_Cat: action.payload, loading: false};
    },

    getFavriotAffermation_request: (state, action) => {
      return {...state, loading: true};
    },
    getFavriotAffermation_success: (state, action) => {
      return {...state, affirmations: action.payload, loading: false};
    },
    getFavriot_error: (state, action) => {
      return {...state, loading: false};
    },
    removeFavriout_request: (state, action) => {
      return {...state, loading: true};
    },
    removeFavriout_success: (state, action) => {
      return {...state, Createfavriote: action.payload, loading: false};
    },
    removeFavriout_erorr: (state, action) => {
      return {...state, loading: false};
    },
    affirmationBYCategory_request: (state, action) => {
      return {...state, loading: true};
    },
    affirmationBYCategory_success: (state, action) => {
      return {...state, loading: false, affirmations: action.payload};
    },
    affirmationBYCategory_error: (state, action) => {
      return {...state, loading: false};
    },
    search_request: (state, action) => {
      return {...state, loading: true};
    },
    search_success: (state, action) => {
      return {...state, searchData: action.payload, loading: false};
    },
    search_error: (state, action) => {
      return {...state, loading: false};
    },
  },
});
export default Home.reducer;
