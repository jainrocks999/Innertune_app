import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/molecules/Header';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Horizontal from '../../components/Home/Horizontal';
import {Image} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';

import {ScrollView} from 'react-native';
import Loader from '../../components/Loader';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];

const Playlistdetails = () => {
  const dispatch = useDispatch();
  const {affirmations,favoriteList} = useSelector(state => state.home);
  console.log('tjhidi',favoriteList.favoritelist);
  const {loading, groups, category,item} = useSelector(
    state => state.home,
  );
  const image = item?.categories_image[0]?.original_url??'https://stimuli.forebearpro.co.in/storage/app/public/3/download-(8).jpg';
  const title = item?.categories_name??'Believe in yourself';
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <Loader loading={loading} />
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri:image}}
          style={{
            height: hp(30),
            width: wp(100),
            resizeMode:'stretch'
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          position: 'absolute',
        }}>
        <View style={{height: hp(5), marginLeft: wp(5)}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
      </View>
      <View style={{marginTop: hp(1.5), marginLeft: wp(6)}}>
        <Text
          style={{
            color: 'white',
            fontSize: hp(3),
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          marginHorizontal: hp(3),
          marginTop: hp(2),
        }}>
        <Feather name="heart" size={20} color="white" />

        <Entypo name="share" size={20} color="white" marginHorizontal="10%" />
        <Entypo name="dots-three-horizontal" size={20} color="white" />
        <TouchableOpacity
          onPress={() => {
           navigation.navigate('playsong')
          }}
          data={category}>
          <Image
            source={require('../../assets/playkey.png')}
            style={{
              height: hp(8),
              width: wp(16),
              left: wp(35),
              tintColor: '#426e56',
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop: 20}}>
        <FlatList
          data={affirmations}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  height: hp(8),
                  width: wp(90),
                  marginVertical: 10,
                  backgroundColor: 'black',
                  borderRadius: 20,
                }}>
                <View
                  style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                  <Text style={styles.text}>{item.affirmation_text.substring(0,30)}</Text>
                </View>
                <View
                  style={{justifyContent: 'center', }}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* <Horizontal
          onPress={() => {
            getAffetMations();
          }}
          data={category}
        /> */}
      </ScrollView>
    </View>
  );
};
export default Playlistdetails;
const styles = StyleSheet.create({
  text: {
    width: wp(60),

    marginLeft: 5,
    color: 'white',
    fontSize: hp(2),
  },
});
