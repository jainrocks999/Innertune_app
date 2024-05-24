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
import React, {useEffect, useRef, useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Playlistdetails from '../Tab/Playlistdetails';
import Feather from 'react-native-vector-icons/Feather';
import Tts from 'react-native-tts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Mymodal from '../../components/molecules/Modal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {} from 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Clipboard} from 'react-native';
import {setupPlayer} from '../../utils/Setup';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import {fonts} from '../../Context/Conctants';
import storage from '../../utils/StorageService';
// import {affirmations} from './affmatin';

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
  const dispatch = useDispatch();
  const [maxTimeInMinutes, setMaxTimeInMinuts] = useState(1);

  const [bgVolume, setBgVolume] = useState(0.1);
  const [progress, setProgress] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  // const v
  const {affirmations} = useSelector(state => state.home);

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
  const [isPaused, setIsPaused] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(
    indexxxx == -1 ? 0 : indexxxx,
  );
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
      dispatch({
        type: 'home/bg_sound_request',
        token,
        url: 'bgSound',
        user_id: user,
      });
      dispatch({
        type: 'home/bg_categories_request',
        token,
        url: 'bgCategories',
        user_id: user,
      });
    }
  };

  const currentTimeRef = useRef(0);

  useEffect(() => {
    player('Sleeping.wav');
  }, []);

  useEffect(() => {
    const maxTimeInSeconds = maxTimeInMinutes * 60;
    let currentTime = currentTimeRef.current || 0;
    const initialProgress = (currentTime / maxTimeInSeconds) * 100;
    setProgress(initialProgress);

    const intervalForProgress = setInterval(async () => {
      if (!isPaused) {
        if (currentTime < maxTimeInSeconds) {
          currentTime++;
          const newProgress = (currentTime / maxTimeInSeconds) * 100;
          setProgress(newProgress);
          currentTimeRef.current = currentTime;
        } else if (progress < 100) {
          clearInterval(intervalForProgress);
          setProgress(100);
          setIsPaused(true);
          Tts.stop();
          await TrackPlayer.pause();
        }
      } else {
        Tts.pause();
        await TrackPlayer.pause();
      }
    }, 1000);

    if (!isPaused) {
      readText(affirmations[visibleIndex].affirmation_text);
      TrackPlayer.play();
    }

    return () => {
      clearInterval(intervalForProgress);
      Tts.stop();
    };
  }, [maxTimeInMinutes, isPaused]);

  const handlePlayPauseClick = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
    if (isPaused & (progress >= 100)) {
      setProgress(0);
      currentTimeRef.current = 0;
      flatListRef.current.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0.5,
        viewOffset: 0,
        duration: 500,
      });
      setVisibleIndex(0);
    }
  };

  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState('initiliazing');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.4);
  const [speechPitch, setSpeechPitch] = useState(1);

  const updateSpokenAffirmation = index => {
    readText(affirmations[index].affirmation_text);
  };
  const handleTTSFinish = () => {
    setVisibleIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % affirmations.length;
      flatListRef.current.scrollToIndex({
        animated: true,
        index: newIndex,
        viewPosition: 0.5,
        viewOffset: 0,
        duration: 500,
      });
      // readText(affirmations[newIndex].affirmation_text); // Read text after automatic scroll
      return newIndex;
    });
  };

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: indexxxx != -1 ? indexxxx : 0,
      viewPosition: 0.5,
      viewOffset: 0,
      duration: 500,
    });
  }, [indexxxx]);
  useEffect(() => {
    Tts.getInitStatus().then(initTts);
    // Tts.addEventListener('tts-finish', handleTTSFinish);
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    TrackPlayer.setVolume(0.5);

    return () => {
      // Tts.removeEventListener('tts-finish', handleTTSFinish);
    };
  }, []);

  const initTts = async () => {
    const voices = await Tts.voices();

    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = 'en-au-x-auc-local';
      try {
        await Tts.setDefaultLanguage('en-AU');
      } catch (err) {
        console.log(`setDefaultLanguage error `, err);
      }

      await Tts.setDefaultVoice('en-au-x-auc-local');
      if (affirmations.length > 0) {
        readText(affirmations[0].affirmation_text);
      }
      setVoices(availableVoices);
      setSelectedVoice(selectedVoice);
      setTtsStatus('initialized');
    } else {
      setTtsStatus('initialized');
    }
  };
  const updateSpeechRate = async rate => {
    await Tts.setDefaultRate(speechRate);
    setSpeechRate(rate);
  };
  const updateSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    setSpeechPitch(rate);
  };
  const onVoicePress = async voice => {
    try {
      await Tts.setDefaultLanguage(voice.language);
      if (isPaused & (progress >= 100)) {
        setIsPaused(false);
        setProgress(0);
        currentTimeRef.current = 0;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: 0,
          viewPosition: 0.5,
          viewOffset: 0,
          duration: 500,
        });
        setVisibleIndex(0);
        await Tts.setDefaultVoice(voice.id);
        readText(affirmations[visibleIndex].affirmation_text);
        setSelectedVoice(voice.id);
      } else {
        await Tts.setDefaultVoice(voice.id);
        readText(affirmations[visibleIndex].affirmation_text);
        setSelectedVoice(voice.id);
      }
    } catch (err) {
      console.log(`setDefaultLanguage error `, err);
    }
  };
  const path = Platform.select({
    android: 'asset:/files/',
    ios: RNFS.MainBundlePath + '/files/',
  });
  const readText = async text => {
    Tts.stop();
    Tts.speak(text);
  };
  const player = async sound => {
    const isSetup = await setupPlayer();
    console.log(isSetup);
    if (isSetup) {
      const track = {
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/98/BGFOUR.mp3',
        title: 'Titel',
        artist: 'Innertune',
        artwork: `asset:/files/backOne.wav`,
        duration: null,
      };
      await TrackPlayer.reset();
      await TrackPlayer.add(sound?.music ?? track);
      await TrackPlayer.setRepeatMode(1);
      await TrackPlayer.play();
    }
  };
  const setVovluem = async value => {
    await TrackPlayer.setVolume(value);
    setBgVolume(value);
  };
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
    const modified = getmodified(affirmations, index, true);
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
  const removeFavroit = async (item, index) => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const modified = getmodified(affirmations, index, false);
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
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/music.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            backgroundColor: '#191919',
            height: hp(100),
            zIndex: 1,
            opacity: 0.93,
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
              right: wp(10),
              position: 'absolute',
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{zIndex: 2}}
              onPress={() => {
                !affirmations[visibleIndex].is_favorite
                  ? handleHeartPress(affirmations[visibleIndex], visibleIndex)
                  : removeFavroit(affirmations[visibleIndex], visibleIndex);
              }}>
              <FontAwesome
                name={
                  affirmations[visibleIndex].is_favorite ? 'heart' : 'heart-o'
                }
                size={30}
                color={
                  affirmations[visibleIndex].is_favorite ? '#B72658' : 'white'
                }
              />
            </TouchableOpacity>

            <FontAwesome
              name="repeat"
              size={30}
              color="white"
              marginHorizontal="22%"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu');
              }}>
              <Entypo name="dots-three-horizontal" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{height: hp(100)}}>
            <FlatList
              ref={flatListRef}
              pagingEnabled
              initialScrollIndex={0}
              showsVerticalScrollIndicator={false}
              data={affirmations}
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
              onViewableItemsChanged={async ({viewableItems, changed}) => {
                const newIndex = viewableItems[0].index;
                readText(affirmations[newIndex].affirmation_text); // Read text when view changes
                setVisibleIndex(newIndex);
                setIsPaused(false);
                if (isPaused & (progress >= 100)) {
                  // setIsPaused(false);
                  setProgress(0);
                  currentTimeRef.current = 0;
                }
              }}
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
                      height: hp(6),
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      backgroundColor:
                        selectedTab === item.title ? '#000000' : '#DEDEDE',
                      borderRadius: hp(5),
                      marginHorizontal: wp(1),
                    }}>
                    <Text
                      style={{
                        color: selectedTab === item.title ? 'white' : 'black',
                        fontSize: hp(2.1),
                        fontWeight: '400',
                        right: wp(3),
                        fontFamily: fonts.medium,
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={item.image}
                      style={{
                        width: hp(6),
                        color: selectedTab === item.image ? 'white' : 'black',
                        height: hp(6),
                        borderRadius: hp(7),
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
          onVolumeChange={setVovluem}
          bgVolume={bgVolume}
          visible={visible}
          voices={voices}
          onVoicePress={onVoicePress}
          selectedVoice={selectedVoice}
          maxTimeInMinutes={maxTimeInMinutes}
          onTimePress={item => {
            setMaxTimeInMinuts(item.title);
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
