import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Horizontal = ({data, onPress}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getFavriote = async item => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: '1',
      category_id: item.id,
      url: 'createFavoriteList',
      navigation,
      token,
    });
  };
  return (
    <FlatList
      horizontal={true}
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        let title = 'Believe in yourself';
        // let image =
        //   'https://stimuli.forebearpro.co.in/storage/app/public/3/download-(8).jpg';

        let image =
          item?.categories_image[0]?.original_url ??
          'https://stimuli.forebearpro.co.in/storage/app/public/3/download-(8).jpg';
        title = item?.categories_name;

        return (
          <TouchableOpacity onPress={() => onPress(item)} style={styles.main}>
            <Icon
              style={{position: 'absolute', zIndex: 1, left: 20, top: 10}}
              name="heart"
              color={'white'}
              size={20}
            />
            <View style={styles.container}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{uri: image}}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    marginHorizontal: wp(2.5),
  },
  container: {
    height: wp(43),
    width: wp(43),
    overflow: 'hidden',
    // borderWidth: 2,

    borderRadius: wp(5),
  },
  title: {
    color: 'white',
    marginTop: wp(2),
    fontSize: wp(5),
    width: wp(43),
    // marginLeft: hp(4),
    marginLeft: wp(4),
  },
});

export default Horizontal;
