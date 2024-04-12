import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
const Horizontal = ({data, onPress}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      horizontal={true}
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        let title = 'Believe in yourself';
        let image =
          'https://stimuli.forebearpro.co.in/storage/app/public/3/download-(8).jpg';

        image = item?.categories_image[0]?.original_url;
        title = item?.categories_name;

        return (
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>onPress(item)}>
              <Image source={{uri: image}} style={styles.image} />
              <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginTop: hp(-2.5),
                marginRight: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Popular');
                }}>
                <Icon name="heart" size={20} color="white" />
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.text2}>{'90 affirmations'}</Text> */}
          </View>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  text: {
    width: wp(60),
    marginTop: 10,
    marginLeft: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
  },
  imageContainer: {
    padding: 15,
  },
  image: {
    width: hp(32),
    height: hp(18),
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});

export default Horizontal;
