import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
  Alert,
  Share,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../../components/molecules/Header';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import Horizontal from '../../components/Home/Horizontal';
//import {affirmations} from '../main/affmatin';
import {Image} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {ScrollView} from 'react-native';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../components/Playlist/Menu';
import Buttun from '../Auth/compoents/Buttun';
import {fonts} from '../../Context/Conctants';
import storage from '../../utils/StorageService';
import Categores_menu from '../../components/Playlist/Categores_menu';
import {MusicPlayerContext} from '../../Context/MusicPlayerConstaxt';
import CircularProgress from 'react-native-circular-progress-indicator';
import PlayPopup from '../../components/PlayPopup';
import DraggableFlatList, {
  ScaleDecorator,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import Playlist_Menu from '../../components/Playlist/Playlist_Menu';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy tex   t of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];

const Playlistdetails = () => {
  const dispatch = useDispatch();
  const {getNameImage, playPlalist, setOnMainPage} =
    useContext(MusicPlayerContext);
  const {favoriteList} = useSelector(state => state.home);

  console.log('tjhidi', favoriteList.favoritelist);
  const {
    loading,
    groups,
    fromLibrary,
    affirmations,
    togglePlay,
    category,
    item,
  } = useSelector(state => state.home);
  const playItem = item;
  const image = item?.categories_image[0]?.original_url ?? '';
  const title = item?.categories_name ?? 'Believe in yourself';
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const HEADER_HEIGHT = 50;
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, hp(55));
  const translateY = diffClamp.interpolate({
    inputRange: [0, hp(55)],
    outputRange: [hp(0), hp(-60)],
    extrapolate: 'clamp',
  });
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );
  const [modalIndex, setModalIndex] = useState(-1);
  const [activationDistance, setActivationDistance] = useState(100);
  const onClose = () => {
    setModalIndex(-1);
  };
  const getFavriote = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: item.id,
      affirmation_id: '',
      url: 'createFavoriteList',
      navigation,
      token,
      item: {...playItem, is_favorite: true},
    });
  };
  const removeFavroit = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/removeFavriout_request',
      url: 'unlikeCategories',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: true,
      item: {...playItem, is_favorite: false},
    });
  };
  // useEffect(() => {
  //   setVisible(false);
  // }, [item]);
  const [plalistMenuVisible, setPlaylistMenuVisible] = useState(false);
  const getSong = async index => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];

    dispatch({
      type: 'home/play_playlist_request',
      payload: temAffimation,
      navigation,
      index: index,
      user_id: user,
      token,
      category_id: item.id,
      togglePlay: !togglePlay,
      item: item,
    });
  };
  const [temAffimation, setTempAffimation] = useState([]);
  console.log('this is item', item);
  useEffect(() => {
    setTempAffimation(affirmations);
  }, []);
  const getPlayListItem = async (item, bool) => {
    const token = await storage.getItem(storage.TOKEN);
    console.log(item.id);
    dispatch({
      type: 'home/getPlayListItem_request',
      playlist_id: item.id,
      token,
      url: 'playListItem',
      navigation,
      item: item,
      isEdit: bool ?? false,
      fromLibrary: true,
    });
  };
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
      navigation,
    });
  };
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Categores_menu
        onPressListen={() => {
          // navigation.navigate('playsong', {index: -1})
          setOnMainPage(true);
          getSong(-1);
        }}
        item={item}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        onPressEdit={items => {
          items.is_favorite ? removeFavroit(items) : getFavriote(items);
        }}
        loading={loading}
        image={
          image == ''
            ? require('../../assets/profilepic/plalist.png')
            : {uri: image}
        }
      />
      <Animated.View style={[styles.header]}>
        <View
          style={{
            height: '100%',
            width: '100%',
            zIndex: 100,
          }}>
          <View style={{height: '3%'}} />
          <View
            style={{
              height: '100%',
              width: '90%',
              alignSelf: 'center',
              borderRadius: wp(2),
              elevation: 5,
              overflow: 'hidden',
              shadowOffset: {
                height: 4,
                width: 4,
              },
              shadowRadius: 4,
              shadowOpacity: 4,
              shadowColor: 'rgba(255,255,255,.5)',
            }}>
            <LinearGradient
              start={{x: 0.3, y: 0}}
              end={{x: 0.3, y: 1}}
              locations={[-3, 0.7, 1]}
              colors={[
                'rgba(0,0,0,1)',
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0)',
              ]}
              style={[styles.gradient, {top: 0}]}
            />
            <Entypo
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={30}
              color={'white'}
              style={{position: 'absolute', zIndex: 8, margin: '4%'}}
            />
            <Text
              style={{
                position: 'absolute',
                zIndex: 7,
                color: 'white',
                bottom: '8%',
                fontSize: wp(6),
                fontWeight: '700',
                left: '5%',
                // fontFamily: fonts.medium,
              }}>
              {title}
            </Text>
            <ImageBackground
              source={
                image == ''
                  ? require('../../assets/profilepic/plalist.png')
                  : {uri: image}
              }
              style={{
                height: '100%',
                width: '100%',
              }}>
              <LinearGradient
                start={{x: 0.6, y: 0}}
                end={{x: 0.6, y: 1}}
                locations={[-3, 0.2, 1]}
                colors={[
                  'rgba(0, 0, 0, 0)',
                  'rgba(0, 0, 0, 0.5)',
                  'rgba(0, 0, 0, 1)',
                ]}
                style={[styles.gradient, {bottom: 0, height: '60%'}]}
              />
            </ImageBackground>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              position: 'absolute',
              zIndex: 5,
            }}>
            {/* <Entypo
              name="chevron-left"
              size={30}
              color={'white'}
              style={{position: 'absolute', zIndex: 8, margin: '4%'}}
            /> */}
          </View>
        </View>
      </Animated.View>
      {/* <View
        style={{
          height: '8%',
          flexDirection: 'row',
         
          paddingHorizontal: wp(5),
          alignItems: 'center',
        }}>
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-left"
          size={30}
          color={'white'}
          style={{
            zIndex: 0,
            margin: '4%',
          }}
        />
        <Text
          style={{color: '#fff', fontSize: wp(5.5), fontFamily: fonts.medium}}>
          {title}
        </Text>
      
      </View> */}

      <View
        style={{
          // zIndex: 5,
          marginTop: hp(-2),
          alignSelf: 'center',
          height: hp(12),
          width: '104%',
          // backgroundColor: '#fff',
          elevation: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: wp(8),
          opacity: 1,
          // paddingBottom: '5%',
          // borderBottomWidth: 1,
          shadowColor: 'grey',
          borderBlockColor: '#fff',
          borderBottomEndRadius: wp(9),
          borderBottomLeftRadius: wp(9),
          zIndex: 0,
        }}>
        <Buttun
          style={{
            height: '35%',
            width: '30%',
            flexDirection: 'row',
            elevation: 3,
            shadowColor: '#fff',
            marginTop: '8%',
          }}
          textStyle={{
            fontSize: wp(4.5),
          }}
          onPress={() => {
            setOnMainPage(true);
            getSong(-1);
            // dispatch({
            //   type: 'home/currentPLaylist',
            //   payload: item,
            // });
          }}
          title={'Play'}
          playlist
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '38%',
            zIndex: 5,
            alignSelf: 'center',
            // bottom: '5%',
            justifyContent: 'space-between',
            marginTop: '8%',
            // borderWidth: 1,
          }}>
          {!fromLibrary.playlist ? (
            <>
              <FontAwesome
                onPress={() => {
                  item.is_favorite ? removeFavroit(item) : getFavriote(item);
                }}
                name={item.is_favorite ? 'heart' : 'heart-o'}
                size={22}
                color={item.is_favorite ? '#B72658' : 'white'}
              />
              <Entypo
                onPress={() => {
                  Share.share({
                    title: title,
                    message: title,
                  });
                }}
                name="share"
                size={22}
                color="white"
              />
            </>
          ) : null}
          <Entypo
            onPress={() => {
              if (fromLibrary.playlist) {
                setPlaylistMenuVisible(true);
              } else {
                setVisible(true);
              }
            }}
            name="dots-three-vertical"
            size={20}
            color="white"
            style={[fromLibrary.playlist && {position: 'absolute', right: 0}]}
          />
        </View>
      </View>
      <Playlist_Menu
        //assets/playlist.png
        image={require('../../assets/playlist.png')}
        item={item.item}
        visible={plalistMenuVisible}
        onClose={() => {
          setPlaylistMenuVisible(false);
        }}
        onPressListen={items => {
          getSong(0);
        }}
        onPressEdit={data => {
          getPlayListItem(data, true);
        }}
        onPressDelete={item => {
          onPressDelete(item);
        }}
        loading={loading}
      />
      <ScrollView
        style={styles.scrollViewContent}
        scrollEnabled={activationDistance !== 0}
        // contentContainerStyle={styles.scrollViewContent}
      >
        <NestableScrollContainer>
          <DraggableFlatList
            data={temAffimation}
            activationDistance={activationDistance}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginTop: '3%',
            }}
            onDragEnd={({data}) => {
              setTempAffimation(data);
              setActivationDistance(100);
            }}
            renderItem={({item, drag, isActive, getIndex}) => (
              <ScaleDecorator>
                <TouchableOpacity
                  onLongPress={() => {
                    drag(), setActivationDistance(0);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    // height: hp(8),
                    width: wp(90),
                    marginVertical: 5,
                    backgroundColor: 'rgba(97, 95, 95,0.3)', //#4A4949
                    borderRadius: 8,
                    paddingVertical: wp(3),
                  }}>
                  <Menu
                    onClose={onClose}
                    selectedItem={item}
                    visible={getIndex() == modalIndex}
                    selectedIndex={getIndex()}
                    affirmations={affirmations}
                    loading={loading}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setOnMainPage(true);
                      getSong(index);
                      // dispatch({
                      //   type: 'home/currentPLaylist',
                      //   payload: playItem,
                      // });
                    }}
                    onLongPress={() => {
                      drag(), setActivationDistance(0);
                    }}
                    disabled={isActive}
                    style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                    <Text style={styles.text}>{item.affirmation_text}</Text>
                  </TouchableOpacity>
                  <View style={{justifyContent: 'center'}}>
                    <Entypo
                      onPress={() => {
                        setModalIndex(getIndex());
                      }}
                      name="dots-three-horizontal"
                      size={20}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </ScaleDecorator>
            )}
          />
        </NestableScrollContainer>
      </ScrollView>

      {playPlalist.length > 0 && getNameImage().name != '' ? (
        <PlayPopup />
      ) : (
        <LinearGradient
          start={{x: 0.3, y: 0}}
          end={{x: 0.3, y: 1}}
          locations={[-3, 0.7, 1]}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.6)',
            'rgba(0, 0, 0, 0.9)',
          ]}
          style={{
            // backgroundColor: 'rgba(0,0,0,0.5)',
            height: hp(8),
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
            borderColor: '#fff',
            // borderWidth: 1,
            width: '100%',
          }}></LinearGradient>
      )}
    </View>
  );
};
export default Playlistdetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  header: {
    height: hp(40),

    backgroundColor: '#191919',
    zIndex: 1,
    borderColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {paddingBottom: hp(8)},
  text: {
    width: wp(60),
    marginLeft: 5,
    color: 'white',
    fontSize: wp(4.1),
    fontFamily: fonts.regular,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    height: '40%',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
});
