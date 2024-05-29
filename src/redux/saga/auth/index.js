import {takeEvery, put, call} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import Api from '../../api';
import storage from '../../../utils/StorageService';
import {ToastAndroid} from 'react-native';
function* doLogin(action) {
  try {
    const data = action.payload;
    const res = yield call(Api.getToken, data);
    const formdata = new FormData();
    formdata.append('email', data.email);
    formdata.append('password', data.password);
    formdata.append('fcm_token', action.fcm_token);
    if (res?.access_token) {
      const mainRes = yield call(Api.API_POST, {
        formdata,
        token: res?.access_token,
        url: data.url,
      });
      if (mainRes?.data) {
        yield storage.setItem(storage.TOKEN, mainRes?.data?.token);
        yield storage.setItem(storage.USER_ID, mainRes?.data?.id);
        yield storage.setItem(storage.USER_EMAIL, mainRes?.email);
        yield put({type: 'auth/login_success', payload: mainRes.data});
        Toast.show('Login Success');
        action.navigation.replace('Welecome2');
      } else {
        Toast.show(res.errors[0]);
      }
    } else {
      yield put({
        type: 'auth/login_error',
      });
      Toast.show('Invalid email or password');
      console.log(res);
    }
  } catch (err) {
    yield put({
      type: 'auth/login_error',
    });
    console.log(err);
    Toast.show('Something went wrong');
  }
}
function* register(action) {
  try {
    const inputs = action.inputs;
    const formdata = new FormData();
    formdata.append('name', inputs.name);
    formdata.append('email', inputs.email);
    formdata.append('password', inputs.password);
    formdata.append('password_confirmation', inputs.password);
    formdata.append('country_id', inputs.country_id);
    const res = yield call(Api.API_POST, {
      formdata,
      token: '',
      url: data.url,
    });
    if (res.status) {
      yield put({
        type: 'registration_success',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'registration_error',
        payload: res,
      });
    }
  } catch (error) {
    yield put({
      type: 'registration_error',
      payload: error,
    });
    ToastAndroid.show('Something went wrong');
  }
}
export default function* authSaga() {
  yield takeEvery('auth/login_request', doLogin);
  yield takeEvery('auth/registration_request', register);
}
