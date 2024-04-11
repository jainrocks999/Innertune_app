import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native';
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
  return (
    <View style={{flex: 1, backgroundColor:'#191919'}}>
      <View style={{alignItems: 'center', marginTop:hp(4),}}>
        <Image
          source={require('../../assets/music.jpg')}
          style={{
            height: hp(30),
            width: wp(60),
            borderRadius:20
          }}
        />
      </View>
      <View style={{alignSelf:'center',marginTop:hp(1.5)}}>
      <Text style={{color:'white',fontSize:hp(2.5),fontWeight:'500'}}>Focus on Your Health</Text>
      </View>
      <ScrollView style={{marginTop: 20}}>
        <FlatList
          data={Img}
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
                  <Text style={styles.text}>{item.title}</Text>
                </View>
                <View
                  style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                  <Entypo
                  onPress={{}}
                    name="plus"
                    size={30}
                    color="white"
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};
export default Playlistdetails;
const styles = StyleSheet.create({

    text: {
        width: wp(50),
    
        marginLeft: 5,
        color: 'white',
        fontSize: 15,
      },
});
