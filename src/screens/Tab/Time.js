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
  SafeAreaView,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import {fonts} from '../../Context/Conctants';
import {BlurView} from '@react-native-community/blur';
const Img2 = [
  {
    id: '1',
    title: '1',
    title2: 'Min',
  },
  {
    id: '2',
    title: '5',
    title2: 'Min',
  },
  {
    id: '3',
    title: '10',
    title2: 'Min',
  },
  {
    id: '4',
    title: '20',
    title2: 'Min',
  },
  {
    id: '5',
    title: '30',
    title2: 'Min',
  },
];

const Time = ({maxTimeInMinutes, onPress}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: '500',
            color: 'white',
            fontFamily: fonts.bold,
          }}>
          Session Length
        </Text>
      </View>

      <View
        style={{
          height: hp(20),
          width: wp(100),
          marginHorizontal: hp(1),
          marginVertical: hp(6),
          marginTop: hp(4),
        }}>
        <FlatList
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={Img2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={[
                styles.imageContainerr,
                maxTimeInMinutes == item.title && {
                  borderWidth: 0.3,
                  borderColor: 'grey',
                  borderRadius: wp(2),
                },
              ]}>
              <Text style={styles.textt}>{item.title}</Text>
              <Text style={[styles.textt, {fontSize: wp(4)}]}>
                {item.title2}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default Time;
const styles = StyleSheet.create({
  imageContainerr: {
    height: hp(15),
    width: hp(15),
    backgroundColor: 'rgba(97, 95, 95,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '2%',
    marginHorizontal: wp(1),
    overflow: 'hidden',
    borderRadius: wp(2),
  },
  imagee: {
    width: hp(6),
    height: hp(6),
    marginVertical: 10,
    borderRadius: hp(7),
  },
  textt: {
    color: 'white',
    fontSize: hp(6),
    fontFamily: fonts.medium,
    fontWeight: '500',
    // elevation: 5,
    // shadowColor: '#fff',
    textShadowColor: 'lightgrey',
    textShadowRadius: 4,
    textShadowOffset: {width: 1, height: 1},
  },
});
