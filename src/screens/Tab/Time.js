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
const Img2 = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: '1 min',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: '3 min',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: '5 min',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: '8 min',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: '10 min',
  },
];

const Time = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919',}}>
     
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop:hp(2)
          }}>
          <Text style={{fontSize: hp(2.5), fontWeight: '500', color: 'white'}}>
            Session Length
          </Text>
        </View>
      
        <View style={{height:hp(20),width:wp(100),marginHorizontal:hp(1),marginVertical:hp(6)}}>
        <FlatList
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={Img2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.imageContainerr}>
              <View>
                <Image source={item.image} style={styles.imagee} />
                <Text style={styles.textt}>{item.title}</Text>
              </View>
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
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: hp(15),
    height: hp(15),
    borderRadius: 20,
    marginHorizontal: hp(0.5),
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
  },
  imagee: {
    width: hp(6),
    height: hp(6),
    marginVertical: 10,
    borderRadius: hp(7),
  },
  textt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
