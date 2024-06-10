import {takeEvery, put, call} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import Api from '../../api';
import {Alert} from 'react-native';
import storage from '../../../utils/StorageService';
function* getplaylist(action) {
  try {
    let params = {
      user_id: action.user_id,
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
    action.category_id ? (params.category_id = action.category_id) : null;
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
      if (action.item) {
        yield put({
          type: 'home/playList_item',
          payload: {from: false, isFroiut: false, ...action.item, item: false},
        });
      }
      if (action.navigation) {
        yield put({
          type: 'home/setFromLibrary',
          payload: {
            playlist: false,
            liked: false,
          },
        });
        action.navigation?.navigate(action.page);
      }
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
    let formdata = new FormData();
    formdata.append('description', action.description);
    formdata.append('title', action.title);
    formdata.append('user_id', action.user_id);
    if (action.playlist_id) {
      formdata.append('playlist_id', action.playlist_id);
    }
    const res = yield call(Api.API_POST, {
      formdata,
      token: action.token,
      url: action.url,
    });

    if (res.status) {
      yield put({
        type: 'home/Add_item_to_Create_Playlist',
        payload: [],
      });
      yield put({
        type: 'home/createPlayList_success',
        payload: res.data,
      });
      yield put({
        type: 'home/playlist_request',
        token: action.token,
        url: 'playList',
        user_id: action.user_id,
      });
      if (action.playlist_id == undefined) {
        yield put({
          type: 'home/add_playlistItem_request',
          playlist_id: res.data.id,
          affirmation_id: action.selected,
          url: 'createPlayListItem',
          navigation: action.navigation,
          token: action.token,
        });
      } else {
        Toast.show('Play list updated');
        action.navigation.navigate('library');
      }
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

    if (res.status) {
      yield put({
        type: 'home/Createfavriote_success',
        payload: res.data,
      });
      if (action.affirmation_id == '') {
        if (action.categories == undefined) {
          yield put({
            type: 'home/group_fetch_request',
            token: action.token,
            url: 'groups',
            user_id: action.user_id,
          });
          yield put({
            type: 'home/category_fetch_request',
            token: action.token,
            url: 'categories',
            user_id: action.user_id,
          });
        } else {
          yield yield put({
            type: 'home/category_fetch_success',
            payload: action.data,
          });
        }
        if (action.isSearch) {
          yield put({
            type: 'home/category_fetch_request',
            token: action.token,
            url: 'categories',
            user_id: action.user,
          });
          yield put({
            type: 'home/group_fetch_request',
            token: action.token,
            url: 'groups',
            user_id: action.user,
          });
        }
        if (action.item) {
          yield put({
            type: 'home/playList_item',
            payload: {...action.item, item: false},
          });
        }
      } else {
        yield put({
          type: 'home/play_playlist_success',
          payload: action.data,
        });
      }
      Toast.show('Added into Favriote List');
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
      yield put({
        type: 'home/setFromLibrary',
        payload: {
          playlist: true,
          liked: true,
        },
      });
      action.navigation.navigate('Playlistdetails');
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
function* addPlaylistItem(action) {
  try {
    const formdata = new FormData();
    formdata.append('playlist_id', action.playlist_id);
    formdata.append('category_id[0]', 0);
    if (Array.isArray(action.affirmation_id)) {
      action.affirmation_id.map((item, index) => {
        formdata.append(`affirmation_id[${index}]`, item);
      });
      const res = yield call(Api.API_POST, {
        formdata,
        token: action.token,
        url: action.url,
      });
      console.log('thjis is res', res);
      if (res.status) {
        yield put({
          type: 'home/add_playlistItem_success',
          payload: res.data,
        });
        if (action.navigation) {
          Toast.show('Playlist created successfully');
          action.navigation.navigate('library');
        } else {
          Toast.show('Affirmation added to playlist');
        }
      } else {
        yield put({
          type: 'home/add_playlistItem_error',
        });
        console.log(res);
        Toast.show('Something went wrong');
      }
    }
  } catch (error) {
    yield put({
      type: 'home/add_playlistItem_error',
    });
    console.log(error);
    Toast.show('Something went wrong');
  }
}
function* getPlayListItem(action) {
  try {
    const params = {
      playlist_id: action.playlist_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    if (res.status) {
      if (!action.isEdit) {
        yield put({
          type: 'home/getPlayListItem_success',
          payload: res.data,
        });
        yield put({
          type: 'home/playList_item',
          payload: {
            categories_image: [
              {
                original_url:
                  'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a',
              },
            ],
            categories_name: action.item.title,
            from: true,
            isFroiut: false,
            item: action.item,
          },
        });
      } else {
        yield put({
          type: 'home/getPlayListItem_success2',
          payload: res.data,
        });
      }
      if (res.data.length > 0) {
        if (!action.isEdit) {
          yield put({
            type: 'home/setFromLibrary',
            payload: {
              playlist: true,
              liked: false,
            },
          });
        }
        action.navigation.navigate(
          !action.isEdit ? 'Playlistdetails2' : 'EditPlayList',
        );
      } else {
        Toast.show('There are no playlist item added');
      }
    } else {
      yield put({
        type: 'home/getPlayListItem_error',
      });
      Toast.show('Error With Fetching Playlist Item');
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'home/getPlayListItem_error',
    });
    Toast.show('Error With Fetching Playlist Item');
  }
}
function* getFavoriout(action) {
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
      console.log(res.data);
      yield put({
        type: action.category
          ? 'home/getFavriotCategories_success'
          : 'home/getFavriotAffermation_success',
        payload: res.data,
      });
      if (!action.category) {
        yield put({
          type: 'home/playList_item',
          payload: {
            categories_image: [
              {
                original_url:
                  'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a',
              },
            ],
            categories_name: 'Liked affirmations',
            item: 'fav',
          },
        });
        yield put({
          type: 'home/setFromLibrary',
          payload: {
            playlist: true,
            liked: true,
          },
        });
        action.navigation.navigate('Playlistdetails2');
      }
    } else {
      yield put({
        type: 'home/getFavriot_error',
      });
      Toast.show(
        action.category
          ? 'Error with fatching favorite list'
          : 'Error with fatching favorite affirmation',
      );
    }
  } catch (error) {
    Toast.show(
      action.category
        ? 'Error with fatching favorite list'
        : 'Error with fatching favorite affirmation',
    );
    console.log('this is error', error);
  }
}
function* removeFavrioutList(action) {
  try {
    const params = {
      user_id: action.user_id,
      favorite_id: action.favorite_id,
      [action.isCat ? 'category_id' : 'affirmation_id']: action.category_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    if (res.status) {
      yield put({
        type: 'home/removeFavriout_success',
        payload: res.data,
      });
      if (action.item) {
        yield put({
          type: 'home/playList_item',
          payload: action.item,
        });
      }
      if (action.isCat) {
        yield yield put({
          type: action.removeFromFavrioutList
            ? 'home/getFavriotCategories_success'
            : action.categories
            ? 'home/category_fetch_success'
            : 'home/group_fetch_success',
          payload: action.data,
        });
        yield put({
          type: 'home/group_fetch_request',
          token: action.token,
          url: 'groups',
          user_id: action.user_id,
        });
        yield put({
          type: 'home/category_fetch_request',
          token: action.token,
          url: 'categories',
          user_id: action.user_id,
        });
        if (action.removeFromFavrioutList || action.isSearch) {
          yield put({
            type: 'home/category_fetch_request',
            token: action.token,
            url: 'categories',
            user_id: action.user,
          });
          yield put({
            type: 'home/group_fetch_request',
            token: action.token,
            url: 'groups',
            user_id: action.user,
          });
        }
      } else {
        yield put({
          type: 'home/play_playlist_success',
          payload: action.data,
        });
      }
      Toast.show('Removed from favoriut list');
    } else {
      yield put({
        type: 'home/removeFavriout_erorr',
      });
      console.log('this sis resss', res);
      Toast.show('something gone wrong with remove from favorite list');
    }
  } catch (err) {
    console.log('this is error', err);
    yield put({
      type: 'home/removeFavriout_erorr',
    });
    Toast.show('something gone wrong with remove from favorite list');
  }
}
function* fetchAffirmationByCategory(action) {
  try {
    const params = {
      user_id: action.user_id,
      category_id: action.category_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    // console.log('this', JSON.stringify(res));

    if (res.status) {
      yield put({
        type: 'home/affirmationBYCategory_success',
        payload: res.data.categoryByAffermation,
      });
      if (action.item) {
        yield put({
          type: 'home/playList_item',
          payload: {from: false, isFroiut: false, ...action.item},
        });
      }
      if (action.navigation && res.data.categoryByAffermation.length > 0) {
        yield put({
          type: 'home/setFromLibrary',
          payload: {
            playlist: false,
            liked: false,
          },
        });

        action.navigation.navigate(action.page);
      } else {
        Toast.show('No affirmations are in this playlist');
      }
    } else {
      yield put({
        type: 'home/affirmationBYCategory_error',
      });
      Toast.show(res.data.message);
    }
  } catch (error) {
    console.log('this sis errror', error);
    yield put({
      type: 'home/affirmationBYCategory_error',
    });
    Toast.show('error with fetching affirmations');
  }
}
function* doSearch(action) {
  try {
    const params = {
      search_text: action.search_text,
      search_type: action.search_type,
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });

    if (res.status) {
      yield put({
        type: 'home/search_success',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'home/serach_error',
      });
      Toast.show(res.msg);
    }
  } catch (error) {
    yield put({
      type: 'home/serach_error',
    });
    console.log(error);
  }
}
function* deletePlaylist(action) {
  try {
    const params = {
      user_id: action.user_id,
      playlist_id: action.playlist_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    if (res.status) {
      yield put({
        type: 'home/playlist_request',
        token: action.token,
        url: 'playList',
        user_id: action.user_id,
      });
      if (action.navigation) {
        action.navigation.goBack();
      }
      Toast.show('Playlist deleted Successfully');
    } else {
      console.log(res);
      yield put({
        type: 'home/delete_playlist_error',
      });
      Toast.show('Playlist deletion error');
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: 'home/delete_playlist_error',
    });
    Toast.show('something went wrong');
  }
}
function* deletePlaylistItme(action) {
  try {
    const formdata = new FormData();
    formdata.append('playlist_id', action.playlist_id);
    if (Array.isArray(action.affirmation_id)) {
      action.affirmation_id.map((item, index) => {
        formdata.append(`affirmation_id[${index}]`, item);
      });
    }

    const res = yield call(Api.API_POST, {
      formdata,
      token: action.token,
      url: action.url,
    });
    if (res.status) {
      yield put({
        type: 'home/update_playlistitem_success',
      });
      Toast.show('Play list item updated successfully');
      action.navigation.navigate('library');
    } else {
      yield put({
        type: 'home/update_playlistitem_error',
      });
      Toast.show('Error with update playlist item');
    }
  } catch (error) {
    yield put({
      type: 'home/update_playlistitem_error',
    });
    Toast.show('Error with update playlist item');
    console.log(error);
  }
}
function* playaffiramations(action) {
  let formdata = new FormData();
  let formdata2 = new FormData();
  formdata.append('last_session_id', 0);
  formdata2.append('last_session_id', 0);
  formdata.append('user_id', action.user_id);
  formdata2.append('user_id', action.user_id);
  formdata.append('playlist_id', action.category_id);
  formdata2.append('category_id', action.category_id);
  const res = yield call(Api.API_POST, {
    formdata,
    token: action.token,
    url: 'playList/populerPlayListUpdate',
  });
  const res2 = yield call(Api.API_POST, {
    formdata: formdata2,
    token: action.token,
    url: 'playList/LastSessionUpdate',
  });
  console.log('populerPlayListUpdate', res);
  console.log('playList/LastSessionUpdate', res2);
  yield put({
    type: 'home/play_playlist_success',
    payload: action.payload,
  });
  yield put({
    type: 'home/setTogglePlay',
    payload: action.togglePlay,
  });
  yield put({
    type: 'home/currentPLaylist',
    payload: action.item,
  });
  action.navigation.navigate('playsong', {index: action.index});
}
function* Logoutapi(action) {
  console.log('logout action ', action);
  try {
    let formdata = new FormData();

    formdata.append('email', action.email);

    const res = yield call(Api.API_POST, {
      formdata,
      token: action.token,
      url: action.url,
    });
    console.log('response check the logout api ', res);
    if (res.status) {
      yield put({
        type: 'home/logout_success',
        payload: res.data,
      });
      Toast.show('Logout successfully ');
      yield storage.clear();
      action.navigation.reset({index: 0, routes: [{name: 'login'}]});
    } else {
      yield put({
        type: 'home/logout_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching ');
    yield put({
      type: 'home/logout_error',
    });
    console.log('errors with createplaylist', error);
  }
}

function* CreateRember(action) {
  console.log('create rember  action ', action);
  try {
    let formdata = new FormData();
    const days = action.days;
    formdata.append('user_id', action.user_id);
    formdata.append('start_at', action.start_at);
    for (const keys in days) {
      formdata.append(keys, days[keys].toString());
    }

    const res = yield call(Api.API_POST, {
      formdata,
      token: action.token,
      url: action.url,
    });
    console.log('response check the create remember api ', res);
    if (res.status) {
      yield put({
        type: 'home/createReminder_success',
        payload: res.data,
      });
      yield put({
        type: 'home/reminderList_request',
        url: 'reminderList',
        user_id: action.user_id,
        token: action.token,
      });
      yield put({
        type: 'home/Modelclose_success',
        payload: action.Modelclose,
      });
      Toast.show(res.message);
    } else {
      yield put({
        type: 'home/createReminder_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching ');
    yield put({
      type: 'home/createReminder_error',
    });
    console.log('errors with createplaylist', error);
  }
}

function* updateReminder(action) {
  console.log('update data  rember  action ', action);
  try {
    let formdata = new FormData();
    const days = action.days;
    formdata.append('user_id', action.user_id);
    formdata.append('start_at', action.start_at);
    formdata.append('reminder_id', action.reminder_id);
    formdata.append('r_status', action.r_status);
    for (const keys in days) {
      formdata.append(keys, days[keys].toString());
    }

    const res = yield call(Api.API_POST, {
      formdata,
      token: action.token,
      url: action.url,
    });
    console.log('response check the create remember api ', res);
    if (res.status) {
      yield put({
        type: 'home/createReminder_success',
        payload: res.data,
      });
      yield put({
        type: 'home/reminderList_request',
        url: 'reminderList',
        user_id: action.user_id,
        token: action.token,
      });
      yield put({
        type: 'home/Modelclose_success',
        payload: action.Modelclose,
      });
      Toast.show(res.message);
    } else {
      yield put({
        type: 'home/createReminder_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with fetching ');
    yield put({
      type: 'home/createReminder_error',
    });
    console.log('errors with createplaylist', error);
  }
}
function* RememberList(action) {
  console.log('remember list action ...', action);
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    console.log('response data ,,remember list', res.data);
    if (res.status) {
      yield put({
        type: 'home/reminderList_success',
        payload: res.data,
      });
    } else {
      Toast.show('Error with fetching  remember list');
      yield put({
        type: 'home/reminderList_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with remember list');
    yield put({
      type: 'home/reminderList_error',
    });
    console.log('errors with bgcategories', error);
  }
}

function* DeleteRemember(action) {
  console.log('remember delete data  ...', action);
  try {
    const params = {
      user_id: action.user_id,
      reminder_id: action.reminder_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: action.url,
      params,
    });
    console.log('response data ,,remember delete...', res);
    if (res.status) {
      yield put({
        type: 'home/reminderDelete_success',
        payload: res.data,
      });

      yield put({
        type: 'home/reminderList_request',
        url: 'reminderList',
        user_id: action.user_id,
        token: action.token,
      });
      yield put({
        type: 'home/Modelclose_success',
        payload: action.Modelclose,
      });
      Toast.show(res.message);
    } else {
      Toast.show('Not Remove the data ');
      yield put({
        type: 'home/reminderDelete_error',
      });
      console.log(res);
    }
  } catch (error) {
    Toast.show('Error with remember delete lsit');
    yield put({
      type: 'home/reminderDelete_error',
    });
    console.log('errors with bgcategories', error);
  }
}
function* getLastPopular(action) {
  try {
    const params = {
      user_id: action.user_id,
    };
    const res = yield call(Api.API_GET, {
      token: action.token,
      url: 'playList/LastSession',
      params,
    });
    const res2 = yield call(Api.API_GET, {
      token: action.token,
      url: 'playList/popularPlayList',
      params,
    });
    if (res.status && res2.status) {
      yield put({
        type: 'home/lastSessctionAndPopular_success',
        payload: {
          lastSesstion: res.data,
          Popular: res2.data,
        },
      });
    } else {
      yield put({
        type: 'home/lastSessctionAndPopular_error',
      });
      Toast.show('Error on fetchinhg some item');
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'home/lastSessctionAndPopular_error',
    });
    Toast.show('something went wrong');
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
  yield takeEvery('home/add_playlistItem_request', addPlaylistItem);
  yield takeEvery('home/getPlayListItem_request', getPlayListItem);
  yield takeEvery('home/getFavriotCategories_request', getFavoriout);
  yield takeEvery('home/getFavriotAffermation_request', getFavoriout);
  yield takeEvery('home/removeFavriout_request', removeFavrioutList);
  yield takeEvery('home/delete_playlist_request', deletePlaylist);
  yield takeEvery(
    'home/affirmationBYCategory_request',
    fetchAffirmationByCategory,
  );
  yield takeEvery('home/search_request', doSearch);
  yield takeEvery('home/update_playlistitem_request', deletePlaylistItme);
  yield takeEvery('home/play_playlist_request', playaffiramations);
  yield takeEvery('home/logout_request', Logoutapi);
  yield takeEvery('home/createReminder_request', CreateRember);
  yield takeEvery('home/createReminder1_request', updateReminder);
  yield takeEvery('home/reminderDelete_request', DeleteRemember);
  yield takeEvery('home/reminderList_request', RememberList);
  yield takeEvery('home/lastSessctionAndPopular_request', getLastPopular);
}
