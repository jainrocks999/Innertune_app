import {takeEvery, put, call} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import Api from '../../api';
import storage from '../../../utils/StorageService';
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

      yield storage.setItem(storage.TOKEN, mainRes?.data?.token);
      yield storage.setItem(storage.USER_ID, mainRes?.data?.id);
      yield put({type: 'auth/login_success', payload: mainRes.data});
      Toast.show('Login Success');
      action.navigation.replace('Welecome2');
    } else {
      yield put({
        type: 'auth/login_error',
      });
      Toast.show('Invalid email or password2');
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
