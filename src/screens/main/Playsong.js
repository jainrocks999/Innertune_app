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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Mymodal from '../../components/molecules/Modal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {} from 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Clipboard} from 'react-native';
const data = [
  {id: '1', title: 'Voice'},
  {id: '2', title: 'Time'},
  {id: '3', title: 'Music'},
];

const Playsong = () => {
  const dispatch = useDispatch();
  const [maxTimeInMinutes, setMaxTimeInMinuts] = useState(1);
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const {affirmations} = useSelector(state => state.home);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(1);
  const handleTabPress = async title => {
    const token = await AsyncStorage.getItem('token');
    if (title == 'Music') {
      dispatch({
        type: 'home/bg_sound_request',
        token,
        url: 'bgSound',
        user_id: 1,
      });
      dispatch({
        type: 'home/bg_categories_request',
        token,
        url: 'bgCategories',
        user_id: 1,
      });
    }

    setSelectedTab(title);
    setVisible(true);
  };
  const handleHeartPress = async item => {
    const pivot = item.group[0].pivot;

    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: '1',
      category_id: pivot.group_id,
      affirmation_id: pivot.affirmation_id,
      url: 'createFavoriteList',
      navigation,
      token,
    });
    // dispatch({
    //   type:'home/Createfavriote_request',
    //   user_id:'1',
    //   ca
    // })
  };
  const currentTimeRef = useRef(0);

  useEffect(() => {
    setVisibleIndex(0);
    const intervalForAffirmations = setInterval(() => {
      if (!isPaused) {
        setVisibleIndex(prevIndex => {
          const newIndex = (prevIndex + 1) % 5;
          flatListRef.current.scrollToIndex({
            animated: true,
            index: newIndex,
            viewPosition: 0.5,
            viewOffset: 0,
            duration: 500,
          });
          readText(affirmations[newIndex].affirmation_text); // Read text directly after scrolling
          return newIndex;
        });
      }
    }, 8000);

    return () => clearInterval(intervalForAffirmations);
  }, [affirmations, isPaused]);
  useEffect(() => {
    const maxTimeInSeconds = maxTimeInMinutes * 60;
    let currentTime = currentTimeRef.current || 0;
    const initialProgress = (currentTime / maxTimeInSeconds) * 100;
    setProgress(initialProgress);

    const intervalForProgress = setInterval(() => {
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
          Tts.pause();
        }
      } else {
        Tts.pause();
      }
    }, 1000);

    if (!isPaused) {
      Tts.resume();
    }

    return () => {
      clearInterval(intervalForProgress);
      Tts.stop();
    };
  }, [maxTimeInMinutes, isPaused]);

  const handlePlayPauseClick = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
    if (isPaused & (progress == 100)) {
      setProgress(0);
      currentTimeRef.current = 0;
    }
  };
  console.log('thjissi', progress);
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState('initiliazing');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.3);
  const [speechPitch, setSpeechPitch] = useState(0.5);

  useEffect(() => {
    // Tts.addEventListener('tts-start', _event => setTtsStatus('started'));
    // Tts.addEventListener('tts-finish', _event => setTtsStatus('finished'));
    // Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    Tts.getInitStatus().then(initTts);
    // return () => {
    //   Tts.removeEventListener('tts-start', _event => setTtsStatus('started'));
    //   Tts.removeEventListener('tts-finish', _event => setTtsStatus('finished'));
    //   Tts.removeEventListener('tts-cancel', _event =>
    //     setTtsStatus('cancelled'),
    //   );
    // };
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
        //Samsung S9 has always this error:
        //"Language is not supported"
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
    } catch (err) {
      // Samsung S9 has always this error:
      // "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    readText(affirmations[currentIndex].affirmation_text);
    setSelectedVoice(voice.id);
  };

  const readText = async text => {
    Tts.stop();
    Tts.speak(text);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/music.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={{backgroundColor: 'rgba(69, 71, 71,.9)', height: hp(100)}}>
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
                  fontSize: hp(2),
                  fontWeight: '600',
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-Medium',
                  color: 'white',
                }}>
                Affirmations
                {/* {progress} */}
              </Text>
            </View>
            <Image
              source={require('../../assets/music.jpg')}
              style={{height: hp(6), width: wp(12), borderRadius: 26}}
            />
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
                handleHeartPress(affirmations[currentIndex]);
              }}>
              <Feather name="heart" size={30} color="white" />
            </TouchableOpacity>

            <FontAwesome6
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
              showsVerticalScrollIndicator={false}
              data={affirmations.slice(0, 5)}
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
                      <Text
                        style={{
                          fontSize: hp(3.5),
                          color: 'black',
                          width: wp(70),
                          // borderWidth: 1,
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                        }}>
                        {item['affirmation_text']}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{height: hp(100)}} />
                )
              }
              keyExtractor={(item, index) => index.toString()}
              onViewableItemsChanged={({viewableItems, changed}) => {
                setCurrentIndex(viewableItems[0].index);
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
                  ? require('../../assets/play-button.png')
                  : require('../../assets/pause-button.png')
              }
              style={{
                height: hp(3),
                width: wp(6),
                tintColor: 'white',
                position: 'absolute',
                zIndex: 0,
              }}
            />
            <CircularProgress
              value={progress}
              radius={hp(5)}
              progressValueFontSize={20}
              duration={200}
              progressValueColor={'#ecf0f1'}
              maxValue={100}
              inActiveStrokeColor="white"
              showProgressValue={false}
              activeStrokeWidth={wp(3)}
              activeStrokeColor="black"
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
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={require('../../assets/music.jpg')}
                      style={{
                        width: hp(6),

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
          visible={visible}
          voices={voices}
          onVoicePress={onVoicePress}
          selectedVoice={selectedVoice}
          maxTimeInMinutes={maxTimeInMinutes}
          onTimePress={item => {
            setMaxTimeInMinuts(item.value);
          }}
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
});
