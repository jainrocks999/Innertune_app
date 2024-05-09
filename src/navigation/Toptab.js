import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../Context/Conctants';

const Img = [
  {
    id: '1',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '2',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  // {
  //   id: '3',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '4',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '5',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '6',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '7',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
  // {
  //   id: '8',
  //   image: require('../assets/music.jpg'),
  //   title: 'abcd',
  //   title2: 'by You',
  // },
];

const Toptab = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getplaylist();
  }, []);
  const getplaylist = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/playlist_request',
      token,
      url: 'playList',
      user_id: '1',
    });
  };
  const getfavoriteList = async item => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/favoriteList_request',
      token,
      user_id: '1',
      navigation,
      url: 'favoriteList',
      item,
    });
  };
  const {playlist} = useSelector(state => state.home);
  console.log('tjhissisi', JSON.stringify(playlist));

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#191919', height: '100%'}}>
      <View style={{marginHorizontal: hp(3), marginTop: 10}}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: hp(3),
            color: 'white',
            marginVertical: 10,
          }}>
          My Library
        </Text>
      </View>

      <TouchableOpacity
        onPress={items => {
          getfavoriteList(items);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            top: hp(3),
          }}>
          <View style={styles.imageContainer}>
            <LinearGradient
              // start={{x: 1.4, y: 0}}
              // end={{x: 0, y: 1}}
              // locations={[0, 1]}
              // colors={['#D485D1', '#B72658']}
              start={{x: 1, y: 0}}
              end={{x: -0.2, y: 0}}
              locations={[0.3, 1]}
              colors={['#D485D1', '#B72658']}
              style={styles.linearGradient}>
              <View style={{justifyContent: 'center', marginLeft: '5%'}}>
                <Entypo name="heart" size={30} color="white" />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    width: wp(50),
                    color: '#fff',
                    fontSize: wp(5),
                    fontWeight: '500',
                    fontFamily: fonts.bold,
                  }}>
                  Afffirmation liked
                </Text>
                <Text style={styles.text2}>90 affirmations</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            top: hp(3),
          }}>
          <View style={styles.imageContainer}>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: -0.2, y: 0}}
              locations={[0.3, 1]}
              colors={['#D485D1', '#B72658']}
              style={styles.linearGradient}>
              <View style={{justifyContent: 'center', marginLeft: '5%'}}>
                <Entypo name="heart" size={30} color="white" />
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text
                  style={{
                    width: wp(50),
                    color: '#fff',
                    fontSize: wp(5),
                    fontWeight: '500',
                    fontFamily: fonts.bold,
                  }}>
                  Liked Playlist
                </Text>
                <Text style={styles.text2}>90 affirmations</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{marginHorizontal: hp(3), marginTop: hp(3)}}>
        <Text
          style={{
            fontFamily: fonts.bold, // fontFamily: 'Montserrat',
            fontSize: hp(2.5),
            color: 'white',
            marginVertical: 10,
          }}>
          Playlist
        </Text>
      </View>

      <FlatList
        data={playlist[0].playlist}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Menu');
              }}>
              <View style={styles.imageeContainer}>
                {/* <LinearGradient
                  style={{borderRadius: 20}}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0, y: 1}}
                  locations={[0, 1]}
                  colors={['#D485D1', '#fff']}> */}
                <View
                  style={{
                    justifyContent: 'center',
                    height: hp(8),
                    width: wp(16),
                    alignItems: 'center',
                    borderRadius: wp(2),
                    backgroundColor: 'white',
                  }}>
                  <Image
                    source={require('../assets/playlist.png')}
                    style={styles.image}
                    tintColor={'#B72658'}
                  />
                </View>
                {/* </LinearGradient> */}
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginHorizontal: hp(2.5),
                  }}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.text2}>{item.description}</Text>
                </View>
                <View style={{justifyContent: 'center', paddingRight: 20}}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Toptab;
const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: hp(1.5),

    justifyContent: 'space-around',

    height: hp(10),
    width: wp(90),
    borderRadius: 10,
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: wp(2),
    justifyContent: 'space-around',
    paddingRight: '20%',
  },

  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
  },
  image: {
    width: hp(4),
    height: hp(4),
    borderRadius: 30,
  },
  text: {
    width: wp(50),
    color: 'white',
    fontSize: hp(2),
    fontWeight: '500',
    fontFamily: fonts.bold,
  },
  text2: {
    width: wp(50),
    top: 3,
    color: 'white',
    fontSize: hp(1.8),
    fontWeight: '300',
    fontFamily: fonts.medium,
  },
});
