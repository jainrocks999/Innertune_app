import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';

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
];
const Goal = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#f0f8ff'}}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            fontWeight: '600',
            color: 'black',
          }}>
          {' '}
          What are your Goals
        </Text>

        <View style={{marginVertical: 10, marginBottom: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              fontFamily: 'Poppins-Medium',
              color: 'grey',
            }}>
            {' '}
            You can choose multiple options
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: wp(100),
          height: hp(18),
          top: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(14),
                justifyContent: 'center',
                marginHorizontal: wp(2),
                width: wp(28),
                marginVertical: 10,
                backgroundColor: 'black',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center', marginVertical: 10}}>
                <Entypo name="baidu" size={40} color="white" />
              </View>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>divfsidf</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          width: wp(100),
          height: hp(18),
          top: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(14),
                justifyContent: 'center',
                marginHorizontal: wp(2),
                width: wp(28),
                marginVertical: 10,
                backgroundColor: 'black',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center', marginVertical: 10}}>
                <Entypo name="add-user" size={40} color="white" />
              </View>
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>divfsidf</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          width: wp(100),
          height: hp(18),
          top: hp(2),
        }}>
        <FlatList
          data={Img}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(14),
                justifyContent: 'center',
                marginHorizontal: wp(2),
                width: wp(28),
                marginVertical: 10,
                backgroundColor: 'black',
                borderRadius: 20,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Entypo name="emoji-happy" size={40} color="white" />
              </View>
              <View style={{justifyContent: 'center', marginVertical: 10}}>
                <Text style={styles.text}>divfsidf</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          margin: hp(2),
          top: hp(15),
        }}>
        <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(70),
            borderRadius: 10,
            flexDirection: 'row',
          }}
          //   onPress={() => {
          //     navigation.navigate('createaffirmation',{selected:selected});
          //   }}
        >
          <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Goal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(5),
  },
  text: {
    color: 'white',
    fontSize: hp(2),
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 10,
  },
});
