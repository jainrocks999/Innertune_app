import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
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
const data = [
  {id: '1', title: 'Voice'},
  {id: '2', title: 'Time'},
  {id: '3', title: 'Music'},
];

const Playsong = () => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const {affirmations} = useSelector(state => state.home);
  console.log(affirmations);
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
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setVisibleIndex(prevIndex => {
  //       const newIndex = (prevIndex + 1) % affirmations.length;
  //       flatListRef.current.scrollToIndex({
  //         animated: true,
  //         index: newIndex,
  //       });
      
     
  //       return newIndex;
  //     });
      
  //   }, 8000);
  //   return () => clearInterval(interval);
  // }, [affirmations]);
  useEffect(() => {
    setVisibleIndex(0);
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % affirmations.length;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: newIndex,
          viewPosition: 0.5,
          viewOffset: 0,
          duration: 500, // Adjust animation duration as needed
        });
  
        return newIndex;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [affirmations]);
  
  const [progress, setProgress] = useState(0);
  const maxTimeInMinutes = 0.5;
  useEffect(() => {
    let currentTimeInSeconds = progress;
    const maxTimeInSeconds = maxTimeInMinutes * 100;

    const interval = setInterval(() => {
      if (!isPaused) {
        if (currentTimeInSeconds < maxTimeInSeconds) {
          currentTimeInSeconds++;
          // const calculatedProgress =
          //   (currentTimeInSeconds / maxTimeInSeconds)* 100;
          setProgress(currentTimeInSeconds);
        } else {
          clearInterval(interval); // Stop interval when progress reaches or exceeds the maximum timeout
        }
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [maxTimeInMinutes, isPaused]);

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
              flexDirection: 'column',
              marginTop: hp(15),
              marginLeft: hp(40),
              position: 'absolute',
            }}>
            <Feather
              name="heart"
              size={30}
              color="white"
              paddingVertical="30%"
            />
            <FontAwesome6
              name="repeat"
              size={30}
              color="white"
              paddingVertical="30%"
            />
            <Entypo
              name="dots-three-vertical"
              size={30}
              color="white"
              paddingVertical="30%"
            />
          </View>
          <View style={{height: hp(100)}}>
            <FlatList
              ref={flatListRef}
              pagingEnabled
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
                        top: '20%',
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
              onViewableItemsChanged={({viewableItems,changed})=>{
                console.log(viewableItems[0].item.affirmation_text);
                Tts.speak(viewableItems[0].item.affirmation_text, {
                  iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                  rate: 2,
                });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsPaused(prev => !prev)}
            style={{
              height: hp(10),
              justifyContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              bottom: '20%',
              width: hp(10),
              // borderWidth: 5,
            }}>
            <Image
              // tintColor={'red'}
              source={require('../../assets/pause.png')}
              style={{
                height: hp(10),
                width: wp(21),
                tintColor: 'white',
                position: 'absolute',
                zIndex: 0,
              }}
            />
            <CircularProgress
              value={progress}
              radius={hp(5)}
              progressValueFontSize={20}
              duration={3000}
              progressValueColor={'#ecf0f1'}
              maxValue={maxTimeInMinutes * 60}
              inActiveStrokeColor="white"
              showProgressValue={false}
              activeStrokeWidth={12}
              ac
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
