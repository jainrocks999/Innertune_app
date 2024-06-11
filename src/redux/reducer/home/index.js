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
  affirmations2: [],
  paly: {},
  screens: {
    prev: '',
    current: '',
  },
  playItem: {
    categories_image: [
      {
        original_url: '',
      },
    ],
    categories_name: '',
  },
  playPlalist: [],
  createRem: [],
  createRem1: [],
  deleteRem: [],
  RememberList: [],
  Modelclose: false,
  togglePlay: false,
  last_popular: {
    lastSesstion: [],
    Popular: [],
  },
  fromLibrary: {
    playlist: false,
    liked: false,
  },
  fav_affirmations: [],
};
const Home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setFromLibrary: (state, action) => {
      state.fromLibrary = action.payload;
    },
    setTogglePlay: (state, action) => {
      // return {...state, togglePlay: action.payload};
      state.togglePlay = action.payload;
    },
    currentPLaylist: (state, action) => {
      // return {...state, playItem: action.payload};
      state.playItem = action.payload;
    },

    setPageChange: (state, action) => {
      // return {...state, screens: action.payload};
      state.screens = action.payload;
    },
    playList_item: (state, action) => {
      // return {...state, item: action.payload};
      state.item = action.payload;
    },
    playlist_request: (state, action) => {
      // return {...state, loading: true};
      state.loading = true;
    },
    playlist_success: (state, action) => {
      // return {...state, playlist: action.payload, loading: false};
      state.loading = false;
      state.playlist = action.payload;
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
      return {...state, paly: action.payload, loading: false};
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
    getPlayListItem_success2: (state, action) => {
      return {...state, affirmations2: action.payload, loading: false};
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
      return {...state, fav_affirmations: action.payload, loading: false};
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
      // return {...state, loading: false, affirmations: action.payload};
      state.loading = false;
      state.affirmations = action.payload;
      if (action?.navigation) {
        action.navigation.navigate('Playlistdetails2');
      }
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
    delete_playlist_request: (state, action) => {
      return {...state, loading: true};
    },
    delete_playlist_error: (state, action) => {
      return {...state, loading: false};
    },
    update_playlistitem_request: (state, action) => {
      return {...state, loading: true};
    },
    update_playlistitem_success: (state, action) => {
      return {...state, loading: false};
    },
    update_playlistitem_error: (state, action) => {
      return {...state, loading: false};
    },
    play_playlist_request: (state, action) => {
      return {...state, loading: true};
    },
    play_playlist_success: (state, action) => {
      return {...state, playPlalist: action.payload, loading: false};
    },
    logout_request: (state, action) => {
      return {...state, loading: true};
    },
    logout_success: (state, action) => {
      return {...state, playlist: action.payload, loading: false};
    },
    logout_error: (state, action) => {
      return {...state, loading: false};
    },
    createReminder1_request: (state, action) => {
      return {...state, loading: true};
    },
    createReminder1_success: (state, action) => {
      return {...state, createRem1: action.payload, loading: false};
    },
    createReminder1_error: (state, action) => {
      return {...state, loading: false};
    },

    createReminder_request: (state, action) => {
      return {...state, loading: true};
    },
    createReminder_success: (state, action) => {
      return {...state, createRem: action.payload, loading: false};
    },
    createReminder_error: (state, action) => {
      return {...state, loading: false};
    },
    reminderList_request: (state, action) => {
      return {...state, loading: true};
    },
    reminderList_success: (state, action) => {
      return {...state, RememberList: action.payload, loading: false};
    },
    reminderList_error: (state, action) => {
      return {...state, loading: false};
    },

    reminderDelete_request: (state, action) => {
      return {...state, loading: true};
    },
    reminderDelete_success: (state, action) => {
      return {...state, deleteRem: action.payload, loading: false};
    },
    reminderDelete_error: (state, action) => {
      return {...state, loading: false};
    },
    Modelclose_success: (state, action) => {
      return {...state, Modelclose: action.payload};
    },
    lastSessctionAndPopular_request: (state, action) => {
      state.loading = true;
    },
    lastSessctionAndPopular_success: (state, action) => {
      state.loading = false;
      state.last_popular = action.payload;
    },
    lastSessctionAndPopular_error: state => {
      state.loading = false;
    },
  },
});

export default Home.reducer;
