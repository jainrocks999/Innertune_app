import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Playlistdetails from '../Tab/Playlistdetails';
import AntDesign from 'react-native-vector-icons/FontAwesome6';
import Tts from 'react-native-tts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Mymodal from '../../components/molecules/Modal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {} from 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch} from 'react-redux';
import {setupPlayer} from '../../utils/Setup';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import RNFS from 'react-native-fs';
import {fonts} from '../../Context/Conctants';
import storage from '../../utils/StorageService';
import {MusicPlayerContext} from '../../Context/MusicPlayerConstaxt';
import Menu from '../../components/Playlist/Menu';
import SoundPlayer from 'react-native-sound-player';
const data = [
  {
    id: '1',
    title: 'Voice',
    image: require('../../assets/profilepic/profile2.jpg'),
  },
  {id: '2', title: 'Time', image: require('../../assets/timer.jpg')},
  {id: '3', title: 'Music', image: require('../../assets/music1.jpg')},
];

const Playsong = ({route}) => {
  const indexxxx = route.params.index;
  const {screens, bgSound, loading} = useSelector(state => state.home);

  const {
    maxTimeInMinutes,
    setMaxTimeInMinutes,
    progress,
    isPaused,
    setIsPaused,
    voices,
    selectedVoice,
    playPlalist,
    player,
    setVolume,
    updateSpeechRate,
    updateSpeechPitch,
    handlePlayPauseClick,
    visibleIndex,
    flatListRef,
    skipToNext,
    reset,
    skipToPrevious,
    voiceVolume,
    playBackondSound,
    backgroundSoundVolume,
    handleOnBackgroundSoundVolume,
    backgroundSound,
    setScrollDirection,
    repeatMode,
    setRepeatMode,
  } = useContext(MusicPlayerContext);

  const dispatch = useDispatch();
  const [bgVolume, setBgVolume] = useState(0.5);
  const onVoicePress = () => {
    Alert.alert('Voices not available');
  };

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();

  const getAffirmation = async () => {
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
      navigation: false,
      url: 'affirmation',
      item: false,
      page: '',
    });
  };
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  const handleTabPress = async title => {
    setSelectedTab(title);
    setVisible(true);
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);

    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    if (title == 'Music') {
    }
  };

  useEffect(() => {
    if (progress < 100) {
      // player('Sleeping.wav');
      setIsPaused(false);
    }
  }, []);

  const path = Platform.select({
    android: 'asset:/files/',
    ios: RNFS.MainBundlePath + '/files/',
  });

  const getmodified = (array, indexs, bool) => {
    return array.map((item, index) => {
      if (index == indexs) {
        return {...item, is_favorite: bool};
      } else {
        return item;
      }
    });
  };
  const handleHeartPress = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const modified = getmodified(playPlalist, index, true);
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: '',
      affirmation_id: item.id,
      url: 'createFavoriteList',
      navigation,
      token,
      data: modified,
    });
  };

  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const removeFavroit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const modified = getmodified(playPlalist, index, false);

    dispatch({
      type: 'home/removeFavriout_request',
      url: 'unlikeAffirmations',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: false,
      data: modified,
    });
  };

  const handleScrollBeginDrag = () => {
    setIsUserScrolling(true);
  };

  const handleScroll = event => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    if (currentScrollPosition > previousScrollPosition && isUserScrolling) {
      setScrollDirection('up');
    } else if (
      currentScrollPosition < previousScrollPosition &&
      isUserScrolling
    ) {
      setScrollDirection('down');
    }
    setPreviousScrollPosition(currentScrollPosition);
  };
  const [currntTrackIndex, setCurrentTrackIndex] = useState(0);
  const handleScrollEndDrag = () => {};
  const handleViewableItemsChanged = ({viewableItems, changed}) => {
    const newIndex = viewableItems[0].index;
    if (isUserScrolling) {
      setIsUserScrolling(false);
      if (newIndex < currntTrackIndex) {
        skipToPrevious();
      } else {
        skipToNext();
      }
      // setVisibleIndex(newIndex);
      setIsPaused(false);
      if (isPaused & (progress >= 100)) {
        reset();
      }
    }
    setCurrentTrackIndex(newIndex);
  };
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(0);
  const onClose = () => {
    setVisibleMenu(false);
    setVisibleMenuIndex(visibleIndex);
  };

  const setMode = async () => {
    try {
      const mode = await TrackPlayer.getRepeatMode();

      const newMode =
        mode === RepeatMode.Off ? RepeatMode.Track : RepeatMode.Off;

      await TrackPlayer.setRepeatMode(newMode);
      setRepeatMode(newMode);
    } catch (error) {
      console.error('Error setting repeat mode:', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/music.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            backgroundColor: 'rgba(25,25,25,0.8)',
            height: hp(100),
            zIndex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{height: hp(5), marginLeft: '5%'}}>
              <Icon
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={30}
                color="white"
              />
            </View>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: 'black',
                elevation: 3,
                shadowColor: '#fff',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: wp(50),
                marginHorizontal: '4%',
              }}>
              <Text
                style={{
                  fontSize: hp(2.5),
                  fontWeight: '600',
                  marginHorizontal: 10,
                  // fontFamily: 'Poppins-Medium',
                  color: 'white',
                  fontFamily: fonts.medium,
                }}>
                Affirmations
              </Text>
            </View>
            <View
              style={{
                elevation: 5,
                shadowColor: '#fff',
                height: hp(6),
                width: hp(6),
                borderWidth: 1,
                borderRadius: hp(3.5),
                overflow: 'hidden',
                // borderColor: '#fff',
                backgroundColor: '#fff',
              }}>
              <Image
                source={require('../../assets/music.jpg')}
                style={{
                  height: '100%',
                  width: '100%',
                  marginLeft: '5%',
                  borderRadius: hp(3),
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(15),
              alignSelf: 'center',
              marginTop: hp(60),
              position: 'absolute',
              zIndex: 1,
              justifyContent: 'space-between',

              width: '60%',
            }}>
            <TouchableOpacity
              style={{zIndex: 2}}
              onPress={() => {
                !playPlalist[visibleIndex].is_favorite
                  ? handleHeartPress(playPlalist[visibleIndex], visibleIndex)
                  : removeFavroit(playPlalist[visibleIndex], visibleIndex);
              }}>
              <FontAwesome
                name={
                  playPlalist[visibleIndex]?.is_favorite ? 'heart' : 'heart-o'
                }
                size={28}
                color={
                  playPlalist[visibleIndex]?.is_favorite ? '#B72658' : 'white'
                }
              />
            </TouchableOpacity>

            <FontAwesome
              name="repeat"
              size={28}
              color="white"
              onPress={() => reset()}
            />
            <AntDesign
              name="repeat"
              size={28}
              color={repeatMode == 1 ? '#B72658' : '#ffff'}
              onPress={() => setMode()}
            />

            <TouchableOpacity
              onPress={() => {
                setVisibleMenuIndex(visibleIndex);
                setVisibleMenu(true);
              }}>
              <Entypo name="dots-three-horizontal" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <Menu
            onClose={onClose}
            selectedItem={playPlalist[visibleMenuIndex]}
            visible={visibleMenu}
            selectedIndex={visibleMenuIndex}
            affirmations={playPlalist}
            loading={loading}
            onPressHeart={() => {
              !playPlalist[visibleMenuIndex].is_favorite
                ? handleHeartPress(
                    playPlalist[visibleMenuIndex],
                    visibleMenuIndex,
                  )
                : removeFavroit(
                    playPlalist[visibleMenuIndex],
                    visibleMenuIndex,
                  );
            }}
            playsong
          />
          <View style={{height: hp(100)}}>
            <FlatList
              ref={flatListRef}
              pagingEnabled
              onScroll={handleScroll}
              initialScrollIndex={0}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              data={playPlalist}
              renderItem={({item, index}) =>
                true ? (
                  <View style={{height: hp(100)}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: wp(70),
                        position: 'absolute',
                        top: '10%',
                      }}>
                      <Text style={styles.text}>{item?.affirmation_text}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={{height: hp(100)}} />
                )
              }
              keyExtractor={(item, index) => index.toString()}
              onViewableItemsChanged={handleViewableItemsChanged}
              onScrollBeginDrag={handleScrollBeginDrag}
              onScrollEndDrag={handleScrollEndDrag}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  flatListRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => handlePlayPauseClick()}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '20%',
            }}>
            <Image
              source={
                isPaused
                  ? require('../../assets/flaticon/play.png')
                  : require('../../assets/flaticon/pause.png')
              }
              style={{
                height: hp(3.5),
                width: hp(3.5),
                tintColor: !isPaused ? '#fff' : '#fff',
                position: 'absolute',
                zIndex: 0,
              }}
            />
            <CircularProgress
              value={progress}
              radius={hp(5.3)}
              // progressValueFontSize={wp(1)}
              duration={200}
              progressValueColor={'#ecf0f1'}
              maxValue={100}
              inActiveStrokeColor="#fff"
              showProgressValue={false}
              activeStrokeWidth={wp(0.8)}
              inActiveStrokeWidth={wp(0.8)}
              activeStrokeColor="#B72658"
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',

              height: hp(10),
              width: wp(100),
              position: 'absolute',
              bottom: hp(3),
            }}>
            <FlatList
              data={data}
              horizontal={true}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleTabPress(item.title)}>
                  <View
                    style={{
                      width: wp(30),
                      height: hp(5),
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      backgroundColor:
                        selectedTab === item.title ? '#000000' : '#DEDEDE',
                      borderRadius: hp(5),
                      marginHorizontal: wp(1),
                      // paddingLeft: item.id == '2' ? '2%' : '0%',
                    }}>
                    <Text
                      style={{
                        color: selectedTab === item.title ? 'white' : 'black',
                        fontSize: hp(1.8),
                        fontWeight: '400',
                        right: wp(item.id == '2' ? 1 : 3),
                        fontFamily: fonts.medium,
                      }}>
                      {item.id == '2'
                        ? maxTimeInMinutes > 1
                          ? maxTimeInMinutes + ' Minuts'
                          : maxTimeInMinutes + ' Minut'
                        : item.title}
                    </Text>
                    <Image
                      source={item.image}
                      style={{
                        width: hp(5),
                        color: selectedTab === item.image ? 'white' : 'black',
                        height: hp(5),
                        borderRadius: hp(2.5),
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <Mymodal
          title={selectedTab}
          onClose={() => setVisible(false)}
          onVolumeChange={setVolume}
          voiceVolume={voiceVolume}
          bgVolume={bgVolume}
          visible={visible}
          voices={voices}
          playBackondSound={playBackondSound}
          backgroundSoundVolume={backgroundSoundVolume}
          handleOnBackgroundSoundVolume={handleOnBackgroundSoundVolume}
          backgroundSound={backgroundSound}
          onVoicePress={onVoicePress}
          selectedVoice={selectedVoice}
          maxTimeInMinutes={maxTimeInMinutes}
          onTimePress={item => {
            setMaxTimeInMinutes(item.title);
          }}
          onMusicPress={player}
        />
      </ImageBackground>
    </View>
  );
};

export default Playsong;

const styles = StyleSheet.create({
  card: {
    height: hp(6),
    width: wp(67),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 26,
    backgroundColor: '#000000',
  },
  text: {
    fontSize: hp(4.0),
    color: '#fff',
    width: wp(70),
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
});
