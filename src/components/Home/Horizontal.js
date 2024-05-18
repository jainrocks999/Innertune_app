import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Clipboard,
} from 'react-native';
import {FlatList} from 'react-native';
import {widthPrecent as wp} from '../../components/atoms/responsive';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fonts} from '../../Context/Conctants';
import {NavigationContext} from '@react-navigation/native';
import storage from '../../utils/StorageService';

const Horizontal = ({data, onPress}) => {
  const {Createfavriote} = useSelector(state => state.home);

  const dispatch = useDispatch();
  const navigation = React.useContext(NavigationContext);
  const getFavriote = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/Createfavriote_request',
      user_id: user,
      category_id: item.id,
      affirmation_id: '',
      url: 'createFavoriteList',
      navigation,
      token,
    });
  };
  const removeFavroit = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/removeFavriout_request',
      url: 'unlikeCategories',
      user_id: user,
      favorite_id: item.favorite_id,
      category_id: item.id,
      token,
      isCat: true,
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

        let image =
          item?.categories_image[0]?.original_url ??
          'https://img.freepik.com/free-photo/outdoor-adventurers-hiking-towards-mountain-peak-sunrise-silhouette-generated-by-ai_188544-30928.jpg';
        title = item?.categories_name;

        return (
          <TouchableOpacity onPress={() => onPress(item)} style={styles.main}>
            <Icon
              onPress={() => {
                !item.is_favorite ? getFavriote(item) : removeFavroit(item);
              }}
              style={{position: 'absolute', zIndex: 1, left: 20, top: 10}}
              name={item.is_favorite ? 'heart-fill' : 'heart'}
              color={item.is_favorite ? '#B72658' : 'white'}
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
    borderRadius: wp(5),
  },
  title: {
    color: 'white',
    marginTop: wp(2),
    fontSize: wp(4.5),
    width: wp(43),
    marginLeft: wp(4),
    fontFamily: fonts.regular,
  },
});

export default Horizontal;
