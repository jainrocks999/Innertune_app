import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import Slider from '@react-native-community/slider';
import Voice from '../../screens/Tab/Voice';
import Time from '../../screens/Tab/Time';
import Music from '../../screens/Tab/Music';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import Playlistdetails from '../../screens/Tab/Playlistdetails';
import {fonts} from '../../Context/Conctants';
const data = [
  {id: '1', title: 'Voice'},
  {id: '2', title: 'Time'},
  {id: '3', title: 'Music'},
  {id: '4', title: 'Playlistdetails'},
];
const data2 = [
  {
    id: '1',
    title: 'Voice',
    image: require('../../assets/profilepic/profile2.jpg'),
  },
  {id: '2', title: 'Time', image: require('../../assets/timer.jpg')},
  {id: '3', title: 'Music', image: require('../../assets/music1.jpg')},
];

const Mymodal = ({
  visible,
  onClose,
  title,
  voices,
  onVoicePress,
  voiceVolume,
  selectedVoice,
  maxTimeInMinutes,
  onTimePress,
  ttsVolume,
  playBackondSound,
  onVolumeChange,
  bgVolume,
  handleOnBackgroundSoundVolume,
  backgroundSoundVolume,
  backgroundSound,
  handleTabPress,
  selectedTab,
}) => {
  console.log(title);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'flex-end'}}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={{
            backgroundColor: 'white',
            height: hp(
              title == 'Voice'
                ? 43
                : title == 'Music'
                ? 97
                : title == 'Playlistdetails'
                ? 97
                : 37,
            ),
            borderTopEndRadius: 30,
            overflow: 'hidden',
            borderTopStartRadius: 30,
          }}>
          {title == 'Voice' ? (
            <Voice
              selectedVoice={selectedVoice}
              voice={voices}
              onPress={item => onVoicePress(item)}
              voiceVolume={voiceVolume}
              onVolumeChange={onVolumeChange}
            />
          ) : title == 'Music' ? (
            <Music
              bgVolume={backgroundSoundVolume}
              backgroundSound={backgroundSound}
              handleOnBackgroundSoundVolume={handleOnBackgroundSoundVolume}
              playBackondSound={playBackondSound}
            />
          ) : title == 'Time' ? (
            <Time
              onPress={item => {
                onTimePress(item);
              }}
              maxTimeInMinutes={maxTimeInMinutes}
            />
          ) : (
            <Playlistdetails />
          )}
        </View>
        <View
          style={{
            // alignItems: 'center',

            height: hp(10),
            width: wp(100),
            position: 'absolute',
            bottom: hp(-2),
            // backgroundColor: 'rgba(97, 95, 95,0.3)', // justifyContent: 'space-between',
            borderColor: '#fff',
          }}>
          <FlatList
            data={data2}
            horizontal={true}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleTabPress(item.title)}
                style={{
                  width: wp(27),
                  height: hp(5),
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  backgroundColor:
                    selectedTab === item.title
                      ? 'rgba(0,0,0,0.7)'
                      : 'rgba(222,222,222,0.7)',
                  borderRadius: hp(5),
                  marginHorizontal: wp(1),
                  marginLeft: wp(4),
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
                      ? maxTimeInMinutes + ' Min'
                      : maxTimeInMinutes + ' Min'
                    : item.title}
                </Text>
                <Image
                  source={item.image}
                  style={{
                    width: hp(4.5),
                    color: selectedTab === item.image ? 'white' : 'black',
                    height: hp(5),
                    borderRadius: hp(2.5),
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default Mymodal;
const styles = StyleSheet.create({});
