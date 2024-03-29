import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  login: {},
  accessToken: '',
  authToken: '',
  loading: false,
  groups: {},
};
const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login_request: (state, action) => {
      return {...state, loading: true};
    },
    login_success: (state, action) => {
      return {...state, loading: false};
    },
    login_error: (state, action) => {
      return {...state, loading: false};
    },
    group_fetch_request: (state, action) => {
      return {...state, loading: true};
    },
    group_fetch_success: (state, action) => {
      return {...state, loading: false, groups: action.payload};
    },
    group_fetch_error: (state, action) => {
      return {...state, loading: false};
    },
  },
});
export default Auth.reducer;
