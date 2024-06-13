import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Clipboard,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../Context/Conctants';
import storage from '../utils/StorageService';
import Loader from '../components/Loader';
import Playlist_Menu from '../components/Playlist/Playlist_Menu';
import Categores_menu from '../components/Playlist/Categores_menu';
import PlayPopup from '../components/PlayPopup';
import {MusicPlayerContext} from '../Context/MusicPlayerConstaxt';

const Img = [
  {
    id: '1',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '2',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  // {
  //   id: '3',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '4',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '5',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '6',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '7',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '8',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
];

const Toptab = () => {
  const {
    playlist,
    favorite_Cat,
    affirmations,
    fav_affirmations,
    category,
    affirmations2,
    loading,
    grops,
  } = useSelector(state => state.home);
  const {getNameImage, playPlalist} = useContext(MusicPlayerContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    getplaylist();
  }, []);
  const getplaylist = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/playlist_request',
      token,
      url: 'playList',
      user_id: user,
    });
  };
  useEffect(() => {
    dispatch({
      type: 'home/setFromLibrary',
      payload: {
        playlist: false,
        liked: false,
      },
    });
  }, []);

  const getPlayListItem = async (item, bool, image) => {
    const token = await storage.getItem(storage.TOKEN);
    dispatch({
      type: 'home/getPlayListItem_request',
      playlist_id: item.id,
      token,
      url: 'playListItem',
      navigation,
      item: item,
      image,
      isEdit: bool ?? false,
      fromLibrary: true,
    });
  };
  const getFavroitCategories = async bool => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/getFavriotCategories_request',
      url: bool ? 'likeCategories' : 'likeAffirmations',
      user_id: user,
      token,
      category: bool,
      navigation,
    });
  };
  useEffect(() => {
    getFavroitCategories(true);
    getFavroitCategories(false);
  }, [grops, category]);
  const getAffetMations = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/affirmation_fetch_request',
      token,
      user_id: user,
      navigation,
      url: 'affirmation',
      item,
      page: 'Playlistdetails2',
    });
  };
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [categoriesIndex, setCategoryIndex] = useState(-1);
  useEffect(() => {
    setVisibleIndex(-1);
    setCategoryIndex(-1);
  }, [affirmations, affirmations2, playlist, favorite_Cat]);

  const onPressDelete = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);

    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/delete_playlist_request',
      user_id: user,
      token,
      playlist_id: item.id,
      url: 'playListDelete',
      navigation: false,
    });
  };

  const getAffetMationsbyCategories = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/affirmationBYCategory_request',
      token,
      user_id: user,
      navigation,
      url: 'categoryByAffermation',
      item,
      page: 'Playlistdetails2',
      category_id: item.id,
    });
  };
  const getFilter = (array, id) => {
    return array.filter(item => item.id != id);
  };
  const removeFavroit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    // const modified = getmodified(groups, item.index, index, false);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const filter = getFilter([...favorite_Cat], item.id);

    dispatch({
      type: 'home/removeFavriout_request',
      url: 'unlikeCategories',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: true,
      data: filter,
      removeFromFavrioutList: true,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#191919', height: '100%'}}>
      <Loader loading={loading} />
      <View style={{marginHorizontal: hp(3), marginTop: 10}}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: hp(3),
            color: 'white',
            marginVertical: 10,
          }}>
          My Library
        </Text>
      </View>
      <TouchableOpacity
        onPress={items => {
          dispatch({
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
          dispatch({
            type: 'home/setFromLibrary',
            payload: {
              playlist: true,
              liked: true,
            },
          });
          dispatch({
            type: 'home/affirmationBYCategory_success',
            payload: fav_affirmations,
            navigation,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            top: hp(3),
          }}>
          <View style={styles.imageContainer}>
            <ImageBackground
              // start={{x: 1, y: 0}}
              // end={{x: -0.2, y: 0}}
              // locations={[0.3, 1]}
              // colors={['#D485D1', '#B72658']}
              source={require('../assets/sparkle_Images/3634321.jpg')}
              style={[styles.linearGradient, {opacity: 0.8}]}>
              <View style={{justifyContent: 'center', marginLeft: '5%'}}>
                <Entypo name="heart" size={30} color="white" />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    width: wp(50),
                    color: '#fff',
                    fontSize: wp(5),
                    fontWeight: '700',
                    // fontFamily: fonts.bold,
                  }}>
                  Affirmation liked
                </Text>
                <Text style={[styles.text2, {color: '#fff'}]}>
                  {fav_affirmations.length} affirmations
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{marginHorizontal: hp(3), marginTop: hp(3)}}>
        <Text
          style={{
            fontFamily: fonts.bold, // fontFamily: 'Montserrat',
            fontSize: hp(2.5),
            color: 'white',
            marginVertical: 10,
          }}>
          Playlist
        </Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: hp(4)}}>
        <View>
          <FlatList
            data={favorite_Cat}
            keyExtractor={item => item?.id}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              let image =
                item.categories_image.length > 0
                  ? item.categories_image[0].original_url
                  : 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a';
              // console.log(image, item.categories_name);
              return (
                // <View
                //   style={{
                //     flexDirection: 'row',
                //     alignSelf: 'center',
                //     justifyContent: 'center',
                //   }}>
                //   <Categores_menu
                //     visible={categoriesIndex == index}
                //     image={{uri: image}}
                //     item={item}
                //     onClose={() => {
                //       setCategoryIndex(-1);
                //     }}
                //     onPressListen={getAffetMationsbyCategories}
                //     onPressEdit={removeFavroit}
                //     loading={loading}
                //   />
                //   <TouchableOpacity
                //     onPress={() => {
                //       getAffetMations(item);
                //     }}>
                //     <View style={styles.imageeContainer}>
                //       <View
                //         style={{
                //           justifyContent: 'center',
                //           height: hp(8),
                //           width: wp(16),
                //           alignItems: 'center',
                //           borderRadius: wp(2),
                //           backgroundColor: 'white',
                //           overflow: 'hidden',
                //         }}>
                //         <Image
                //           source={{uri: image}}
                //           style={{height: '100%', width: '100%'}}
                //           resizeMode="stretch"
                //         />
                //       </View>
                //       <View
                //         style={{
                //           flexDirection: 'column',
                //           justifyContent: 'center',
                //           marginHorizontal: hp(2.5),
                //         }}>
                //         <Text style={styles.text}>{item.categories_name}</Text>
                //         <Text style={styles.text2}>{'Buy Stimuli '}</Text>
                //       </View>
                //       <View
                //         style={{justifyContent: 'center', paddingRight: 20}}>
                //         <Entypo
                //           onPress={() => {
                //             setCategoryIndex(index);
                //           }}
                //           name="dots-three-horizontal"
                //           size={20}
                //           color="white"
                //         />
                //       </View>
                //     </View>
                //   </TouchableOpacity>
                // </View>
                <View
                  style={{
                    width: '98%',
                    borderColor: '#fff',
                    marginVertical: 8,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: '2%',
                    paddingVertical: '1%',
                  }}>
                  <Categores_menu
                    visible={categoriesIndex == index}
                    image={{uri: image}}
                    item={item}
                    onClose={() => {
                      setCategoryIndex(-1);
                    }}
                    onPressListen={getAffetMationsbyCategories}
                    onPressEdit={removeFavroit}
                    loading={loading}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      getAffetMations(item);
                    }}
                    style={{
                      height: '100%',
                      width: '80%',
                      flexDirection: 'row',
                      // borderWidth: 1,
                    }}>
                    <Image
                      source={{uri: image}}
                      style={{
                        height: hp(9),
                        width: hp(9),
                        borderRadius: wp(2),
                      }}
                      // tintColor={!playImage?.uri ? '#B72658' : null}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginHorizontal: hp(2.5),
                        marginTop: '-7%',
                      }}>
                      <Text style={styles.text}>{item.categories_name}</Text>
                      <Text style={styles.text2}>{'Buy Stimuli '}</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'center',
                      borderColor: 'lightgrey',
                      marginRight: '2%',
                      paddingHorizontal: '2.8%',
                      paddingVertical: '3%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      elevation: 1,
                      shadowColor: 'grey',
                      // borderWidth: 0.3,
                      borderRadius: hp(3.4),
                    }}>
                    <Entypo
                      onPress={() => {
                        setCategoryIndex(index);
                      }}
                      name="dots-three-horizontal"
                      size={16}
                      color="white"
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>

        <FlatList
          data={playlist[0]?.playlist ?? []}
          keyExtractor={item => item?.id}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            let playImage =
              Array.isArray(item.media) && item.media.length > 0
                ? {uri: item.media[0]?.original_url}
                : require('../assets/playlist.png');
            return (
              // <View
              //   style={{
              //     flexDirection: 'row',
              //     alignSelf: 'center',
              //     justifyContent: 'center',
              //     justifyContent: 'space-between',
              //   }}>
              //   <Playlist_Menu
              //     image={playImage}
              //     item={item}
              //     visible={index == visibleIndex}
              //     onClose={() => setVisibleIndex(-1)}
              //     onPressListen={items => {
              //       getPlayListItem(items, false, playImage);
              //     }}
              //     onPressEdit={data => {
              //       getPlayListItem(data, true, playImage);
              //       // console.log('thisissis', data);
              //     }}
              //     onPressDelete={item => {
              //       onPressDelete(item);
              //     }}
              //     loading={loading}
              //   />
              //   <TouchableOpacity
              //     onPress={() => {
              //       getPlayListItem(item, false, playImage);
              //     }}>
              //     <View style={styles.imageeContainer}>
              //       <View
              //         style={{
              //           justifyContent: 'center',
              //           height: hp(8),
              //           width: wp(16),
              //           alignItems: 'center',
              //           borderRadius: wp(2),
              //           backgroundColor: 'white',
              //           elevation: 5,
              //           shadowColor: '#fff',
              //         }}>
              //         <Image
              //           source={playImage}
              //           style={
              //             !playImage?.uri
              //               ? styles.image
              //               : {
              //                   height: '100%',
              //                   width: '100%',
              //                   borderRadius: wp(2),
              //                 }
              //           }
              //           tintColor={!playImage?.uri ? '#B72658' : null}
              //         />
              //       </View>
              //       {/* </LinearGradient> */}
              //       <View
              //         style={{
              //           flexDirection: 'column',
              //           justifyContent: 'center',
              //           marginHorizontal: hp(2.5),
              //         }}>
              //         <Text style={styles.text}>{item.title}</Text>
              //         <Text style={styles.text2}>{item.description}</Text>
              //       </View>
              //     </View>
              //   </TouchableOpacity>
              //   <View
              //     style={{
              //       justifyContent: 'center',
              //       paddingRight: 20,
              //       borderWidth: 1,
              //       borderColor: 'white',
              //     }}>
              //     <Entypo
              //       onPress={() => {
              //         setVisibleIndex(index);
              //       }}
              //       name="dots-three-horizontal"
              //       size={16}
              //       color="white"
              //     />
              //   </View>
              // </View>
              <View
                style={{
                  width: '98%',
                  borderColor: '#fff',
                  marginVertical: 8,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '2%',
                  paddingVertical: '1%',
                }}>
                <Playlist_Menu
                  image={playImage}
                  item={item}
                  visible={index == visibleIndex}
                  onClose={() => setVisibleIndex(-1)}
                  onPressListen={items => {
                    getPlayListItem(items, false, playImage);
                  }}
                  onPressEdit={data => {
                    getPlayListItem(data, true, playImage);
                    // console.log('thisissis', data);
                  }}
                  onPressDelete={item => {
                    onPressDelete(item);
                  }}
                  loading={loading}
                />
                <TouchableOpacity
                  onPress={() => {
                    getPlayListItem(item, false, playImage);
                  }}
                  style={{
                    height: '100%',
                    width: '80%',
                    flexDirection: 'row',
                    // borderWidth: 1,
                  }}>
                  <Image
                    source={playImage}
                    style={
                      !playImage?.uri
                        ? styles.image
                        : {
                            height: hp(9),
                            width: hp(9),
                            borderRadius: wp(2),
                          }
                    }
                    tintColor={!playImage?.uri ? '#B72658' : null}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginHorizontal: hp(2.5),
                      marginTop: '-7%',
                    }}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.text2}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    borderColor: 'lightgrey',
                    marginRight: '2%',
                    paddingHorizontal: '2.8%',
                    paddingVertical: '3%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    elevation: 1,
                    shadowColor: 'grey',
                    // borderWidth: 0.3,
                    borderRadius: hp(3.4),
                  }}>
                  <Entypo
                    onPress={() => {
                      setVisibleIndex(index);
                    }}
                    name="dots-three-horizontal"
                    size={16}
                    color="white"
                  />
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
      {playPlalist.length > 0 && getNameImage().name != '' ? (
        <PlayPopup />
      ) : null}
    </View>
  );
};

export default Toptab;
const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: hp(10),
    width: wp(90),
    borderRadius: 10,
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: wp(2),
    justifyContent: 'space-around',
    // paddingRight: '20%',
    overflow: 'hidden',
    borderRadius: 10,
  },

  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
  },
  image: {
    width: hp(4),
    height: hp(4),
    borderRadius: 30,
  },
  text: {
    width: wp(50),
    color: 'white',
    fontSize: wp(4.5),
    fontWeight: '500',
    fontFamily: fonts.bold,
  },
  text2: {
    width: wp(50),
    top: 3,
    marginTop: '3%',
    color: 'grey',
    fontSize: wp(3.5),
    fontWeight: '300',
    fontFamily: fonts.medium,
  },
});
