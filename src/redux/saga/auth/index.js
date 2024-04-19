import {takeEvery, put, call} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import Api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
function* doLogin(action) {
  try {
    const data = action.payload;
    const res = yield call(Api.getToken, data);
    const formdata = new FormData();
    formdata.append('email', data.email);
    formdata.append('password', data.password);
    if (res?.access_token) {
      const mainRes = yield call(Api.API_POST, {
        formdata,
        token: res?.access_token,
        url: data.url,
      });
      console.log('this is main res',JSON.stringify(mainRes));
      yield AsyncStorage.setItem('token', mainRes?.data?.token);
      yield put({type: 'auth/login_success', payload: mainRes.data});
      Toast.show('Login Success');
      action.navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } else {
      yield put({
        type: 'auth/login_error',
      });
      Toast.show('Invalid email or password');
    }
  } catch (err) {
    yield put({
      type: 'auth/login_error',
    });
    console.log(err);
    Toast.show('Something went wrong');
  }
}
export default function* authSaga() {
  yield takeEvery('auth/login_request', doLogin);
}
