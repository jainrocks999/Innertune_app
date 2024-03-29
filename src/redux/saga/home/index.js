import {takeEvery, put, call} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import Api from '../../api';
function* getAllCategories(action) {
  try {
    let params = {
      playlist_id: 1,
    };
    const res = yield call(Api.API_GET, {
      token: action.payload,
      url: action.url,
      params,
    });
    if (res.status) {
      yield put({
        type: 'home/playlist_success',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'home/playlist_error',
      });
    }
  } catch (err) {
    yield put({
      type: 'home/playlist_error',
    });
    Toast.show('Some thing went wrong');
    console.log(err);
  }
}
function* fetchGroups(action) {
  const params = {
    user_id: 1,
  };
  const res = yield call(Api.API_GET, {
    token: action.payload,
    url: action.url,
    params,
  });
  console.log(JSON.stringify(res));
}
export default function* homeSaga() {
  yield takeEvery('home/playlist_request', getAllCategories);
  yield takeEvery('home/group_fetch_request', fetchGroups);
}
