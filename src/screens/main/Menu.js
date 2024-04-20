import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          height: hp(8),
          width: wp(90),
          alignItems: 'center',
          backgroundColor: 'black',
          borderRadius: 20,
          top: hp(20),
        }}>
        <Text style={styles.text}>i allow abundance</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',

          height: hp(50),
          top: hp(20),
        }}>
        <View style={styles.imageContainer}>
          <View style={{justifyContent: 'center'}}>
            <AntDesign name="hearto" size={30} color="white" />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text
              style={{
                width: wp(50),
                color: 'white',
                fontSize: hp(2),
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
              }}>
              Like Affirmation
            </Text>
          </View>
        </View>
        {/* <View style={styles.imageContainer}>
          <View style={{justifyContent: 'center'}}>
          <Image
                source={require('../../assets/flaticon/add.png')}
                style={{height: hp(4), width: wp(8), borderRadius: 20, tintColor:'white'}}
              />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text
              style={{
                width: wp(50),
                color: 'white',
                fontSize: hp(2),
                fontWeight: '500',
              }}>
           Add to playlist
            </Text>
          </View>
        </View> */}
        <View style={styles.imageContainer}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={require('../../assets/flaticon/add.png')}
              style={{
                height: hp(4),
                width: wp(8),
                borderRadius: 20,
                tintColor: 'white',
              }}
            />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text
              style={{
                width: wp(50),
                color: 'white',
                fontSize: hp(2),
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
              }}>
              Share
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={{justifyContent: 'center'}}>
            <AntDesign name="minuscircleo" size={30} color="white" />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text
              style={{
                width: wp(50),
                color: 'white',
                fontSize: hp(2),
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
              }}>
              Hide
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignSelf: 'center', top: hp(25)}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: 'white',
              fontSize: hp(2.5),
              fontFamily: 'Poppins-Medium',
            }}>
            {' '}
            Close{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  text: {
    width: wp(80),
    marginHorizontal: wp(8),
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: hp(2),
  },
  imageContainer: {
    justifyContent: 'space-around',

    height: hp(10),
    width: wp(90),

    flexDirection: 'row',
  },
});
