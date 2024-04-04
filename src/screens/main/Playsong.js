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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Mymodal from '../../components/molecules/Modal';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {} from 'react-native-gesture-handler';
import CircularProgress from 'react-native-circular-progress-indicator';
const data = [
  {id: '1', title: 'Voice'},
  {id: '2', title: 'Time'},
  {id: '3', title: 'Music'},
];

const Playsong = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const {affirmations} = useSelector(state => state.home);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(1);
  const handleTabPress = title => {
    setSelectedTab(title);
    setVisible(true);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % affirmations.length;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: newIndex,
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
    const maxTimeInSeconds = maxTimeInMinutes * 60;

    const interval = setInterval(() => {
      if (!isPaused) {
        if (currentTimeInSeconds < maxTimeInSeconds) {
          currentTimeInSeconds++;
          // const calculatedProgress =
          //   (currentTimeInSeconds / maxTimeInSeconds) * 100;
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
        <View style={{backgroundColor: 'rgba(69, 71, 71,.8)', height: hp(100)}}>
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
          <TouchableOpacity onPress={() => handleTabPress('Playlistdetails')}>
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    selectedTab === 'Playlistdetails' ? '#000000' : '#DEDEDE',
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
                    color:
                      selectedTab === 'Playlistdetails' ? 'white' : 'black',
                  }}>
                  Playlist Details
                  {progress}
                </Text>
              </View>
              <Image
                source={require('../../assets/music.jpg')}
                style={{height: hp(6), width: wp(12), borderRadius: 26}}
              />
            </View>
          </TouchableOpacity>
          <View style={{height: hp(60)}}>
            <FlatList
              ref={flatListRef}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              data={affirmations}
              renderItem={({item, index}) =>
                true ? (
                  <View style={{height: hp(60)}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginTop: hp(2),
                        marginHorizontal: hp(4),
                        alignItems: 'flex-end',
                      }}>
                      <Feather
                        name="heart"
                        size={30}
                        color="white"
                        paddingVertical="5%"
                      />
                      <FontAwesome6
                        name="repeat"
                        size={30}
                        color="white"
                        paddingVertical="5%"
                      />
                      <Entypo
                        name="dots-three-vertical"
                        size={30}
                        color="white"
                        paddingVertical="5%"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: wp(70),
                        position: 'absolute',
                        top: '30%',
                      }}>
                      <Text
                        style={{
                          fontSize: hp(4),
                          color: 'white',
                          width: '80%',
                          // borderWidth: 1,
                          textAlign: 'center',
                        }}>
                        {item['affirmation_text']}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{height: hp(60)}} />
                )
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsPaused(prev => !prev)}
            style={{
              height: hp(10),
              justifyContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              bottom: '16%',
              width: hp(10),
              // borderWidth: 5,
            }}>
            <Image
              // tintColor={'red'}
              source={require('../../assets/play-button.png')}
              style={{
                height: hp(10),
                width: hp(10),
                tintColor: 'white',
                position: 'absolute',
                zIndex: 0,
              }}
            />
            <CircularProgress
              value={progress}
              radius={hp(5)}
              progressValueFontSize={10}
              duration={2000}
              progressValueColor={'#ecf0f1'}
              maxValue={maxTimeInMinutes * 60}
              inActiveStrokeColor="white"
              showProgressValue={false}
              activeStrokeWidth={5.5}
              inActiveStrokeWidth={5.5}
            />
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: hp(8),
              height: hp(7),
              position: 'absolute',
              bottom: '3%',
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
                      width: hp(14),
                      height: hp(7),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor:
                        selectedTab === item.title ? '#000000' : '#DEDEDE',
                      borderRadius: hp(5),
                      marginHorizontal: hp(1),
                    }}>
                    <Text
                      style={{
                        color: selectedTab === item.title ? 'white' : 'black',
                        fontSize: hp(2.1),
                        fontWeight: '400',
                        marginHorizontal: hp(1.2),
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={require('../../assets/music.jpg')}
                      style={{
                        width: hp(7),
                        height: hp(7),
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
