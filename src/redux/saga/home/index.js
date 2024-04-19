import {takeEvery, put, call} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import Api from '../../api';
import {Alert} from 'react-native';
function* getplaylist(action) {
  try {
    let params = {
      playlist_id: action.playlist_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
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
      Toast.show('error with fetching playlist');
      console.log('thusius ', res);
    }
  } catch (err) {
    yield put({
      type: 'home/playlist_error',
    });
    Toast.show('Some thing went wrong');
    console.log('errors with playlist', err);
  }
}
function* fetchGroups(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    if (res.status) {
      yield yield put({
        type: 'home/group_fetch_success',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'home/group_fetch_error',
      });
      Toast.show('error with fetching groups');
      console.log('thusius ', res);
    }
  } catch (err) {
    yield put({
      type: 'home/group_fetch_error',
    });
    Toast.show('Something went wrong');
    console.log('errors with groups', err);
  }
}
function* fetchCategories(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });

    if (res.status) {
      yield yield put({
        type: 'home/category_fetch_success',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'home/category_fetch_error',
      });
      Toast.show('error with fetching category');
      console.log('this is category ', res);
    }
  } catch (err) {
    yield put({
      type: 'home/category_fetch_error',
    });
    Toast.show('Something went wrong');
    console.log('errors with category', err);
  }
}

function* fetchAffirmation(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    if (res.status) {
      yield put({
        type: 'home/affirmation_fetch_success',
        payload: res.data,
      });
      yield put({
        type: 'home/playList_item',
        payload: action.item,
      });
      // Alert.alert(JSON.stringify(action.item))
      action.navigation.navigate('Playlistdetails');
    } else {
      Toast.show('Error with fetching affermations');
      yield put({
        type: 'home/affirmation_fetch_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching affermations');
    yield put({
      type: 'home/affirmation_fetch_error',
    });
    console.log('errors with affermation', error);
  }
}
function* getBagSouund(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    console.log(res.data);
    if (res.status) {
      yield put({
        type: 'home/bg_sound_success',
        payload: res.data,
      });
    } else {
      Toast.show('Error with fetching affermations');
      yield put({
        type: 'home/bg_sound_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching bg sound');
    yield put({
      type: 'home/bg_sound_error',
    });
    console.log('errors with bg sound', error);
  }
}
function* getbgcategories(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    console.log(res.data);
    if (res.status) {
      yield put({
        type: 'home/bg_categories_success',
        payload: res.data,
      });
    } else {
      Toast.show('Error with fetching bgcategories');
      yield put({
        type: 'home/bg_categories_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching bgcategories');
    yield put({
      type: 'home/bg_categories_error',
    });
    console.log('errors with bgcategories', error);
  }
}
function* fetchCreatePlaylist(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    console.log(res.data);
    if (res.status) {
      yield put({
        type: 'home/createPlayList_success',
        payload: res.data,
      });
    } else {
      Toast.show('Error with fetching createplaylist ');
      yield put({
        type: 'home/createPlayList_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching createplaylist');
    yield put({
      type: 'home/createPlayList_error',
    });
    console.log('errors with createplaylist', error);
  }
}
function* fetchCreatefavriote(action) {
  Alert.alert('called')
  
  try {
    console.log(action);
    let formdata = new FormData();
    formdata.append('user_id', action.user_id);
    console.log(action.user_id);
    formdata.append('category_id', action.category_id);
    formdata.append('affirmation_id', action.affirmation_id);
    const res = yield call(Api.API_POST, {
      formdata,
      token: action.token,
      url: action.url,
    });
    console.log('thississi rewss', res.data);
    if (res.status) {
      yield put({
        type: 'home/Createfavriote_success',
        payload: res.data,
      });
      Toast.show('Added into Favriote List')
    } else {
      Toast.show('Error with fetching Createfavriote ');
      yield put({
        type: 'home/Createfavriote_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching Createfavriote');
    yield put({
      type: 'home/Createfavriote_error',
    });
    console.log('errors with Createfavriote', error);
  }
}
function* getfavoriteList(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    console.log(res.data);
    if (res.status) {
      yield put({
        type: 'home/favoriteList_success',
        payload: res.data,
      });
      action.navigation.navigate('Playlistdetails')
    } else {
      Toast.show('Error with fetching favoriteList');
      yield put({
        type: 'home/favoriteList_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching favoriteList');
    yield put({
      type: 'home/favoriteList_error',
    });
    console.log('errors with favoriteList', error);
  }
}

export default function* homeSaga() {
  yield takeEvery('home/playlist_request', getplaylist);
  yield takeEvery('home/group_fetch_request', fetchGroups);
  yield takeEvery('home/category_fetch_request', fetchCategories);
  yield takeEvery('home/affirmation_fetch_request', fetchAffirmation);
  yield takeEvery('home/bg_sound_request', getBagSouund);
  yield takeEvery('home/bg_categories_request', getbgcategories);
  yield takeEvery('home/createPlayList_request', fetchCreatePlaylist);
  yield takeEvery('home/Createfavriote_request', fetchCreatefavriote);
  yield takeEvery('home/favoriteList_request', getfavoriteList);
}
