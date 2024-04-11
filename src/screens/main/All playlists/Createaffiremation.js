import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Img = [
  {
    id: '1',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];
const Createaffirmation = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: hp(5), marginLeft: '15%'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{height: hp(5), width: wp(100)}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              marginHorizontal: '15%',
              fontFamily:'Montserrat',
              color: 'white',
            }}>
           Edit List of Affirmation
          </Text>
        </View>
      </View>
      {/* <View style={styles.searchContainer}>
        <Text style={{color: 'white', fontSize: 17}}>
          Edit List of Affirmation
        </Text>
      </View> */}
      <ScrollView style={{marginTop: 20}}>
        <FlatList
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
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
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>{item.title}</Text>
              </View>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Entypo name="dots-three-horizontal" size={20} color="white" />
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View style={{alignSelf: 'center', margin: hp(2)}}>
        <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(60),
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('saveplaylist');
          }}>
          <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Createaffirmation;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',

   

    marginTop: 30,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
  },
  image: {
    width: hp(8),
    height: hp(8),
    borderRadius: 8,
  },
  text: {
    width: wp(50),

    marginLeft: 5,
    color: 'white',
    fontSize: 15,
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
});
