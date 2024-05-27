import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Focus from './Focus';
import Relax from './Relax';
import Sleep from './Sleep';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';

const data = [
  {id: '1', title: 'Focus'},
  {id: '2', title: 'Relax'},
  {id: '3', title: 'Sleep'},
];

const Music = () => {
  const [selectedTab, setSelectedTab] = useState('Focus');

  const handleTabPress = title => {
    setSelectedTab(title);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Text style={{fontSize: hp(2.5), fontWeight: '500', color: 'black'}}>
          Background Music
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          justifyContent: 'center',
          marginTop: hp(2),

          alignItems: 'center',
          borderBottomWidth: 1,
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
                  height: hp(6),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    selectedTab === item.title ? 'black' : '#DEDEDE',
                  borderRadius: 10,
                  marginHorizontal: hp(1),
                  marginVertical: 20,
                  paddingHorizontal: hp(4),
                }}>
                <Text
                  style={{
                    color: selectedTab === item.title ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: '400',
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedTab == 'Focus' ? <Focus /> : ''}
      {selectedTab == 'Relax' ? <Relax /> : ''}
      {selectedTab == 'Sleep' ? <Sleep /> : ''}
      <View
        style={{
          height: hp(12),
          backgroundColor: 'black',
          // borderTopWidth: 1.5,
          // borderTopColor: 'grey',
          borderTopEndRadius: 30,
          overflow: 'hidden',
          borderTopStartRadius: 30,
          shadowColor: 'white',
          shadowOpacity: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp(5.5),
            marginTop: hp(2),
          }}>
          <Text style={{fontSize: hp(2), fontWeight: '500', color: 'white'}}>
            Background Volume
          </Text>
        </View>
        <View style={{marginTop: hp(3), alignItems: 'center'}}>
          <Slider
            style={{width: '90%', height: 20}}
            minimumValue={0}
            maximumValue={2}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Music;
const styles = StyleSheet.create({
  imageContainerrr: {
    width: hp(20),
    height: hp(15),
    borderRadius: 20,
    marginVertical: hp(3),
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'black',
  },
  imageee: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  texttt: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
});
