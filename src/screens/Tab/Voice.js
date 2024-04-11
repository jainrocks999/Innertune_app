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
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'John',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Annie',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lilly',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Max',
  },
];
const Voice = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop:hp(2)
          }}>
          <Text style={{fontSize: hp(2.5), fontWeight: '500', color: 'white'}}>
            Voice Settings
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: hp(2),
          }}>
          <Text style={{fontSize: hp(2), fontWeight: '500', color: 'grey'}}>
            Voice Over
          </Text>
        </View>
        <View style={{margin: hp(1)}}>
          <FlatList
            data={Img}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View
                  style={{
                    width: hp(14),
                    height: hp(7),
                    borderRadius: hp(7),
                    backgroundColor: 'black',
                    marginHorizontal: wp(1),
                  }}>
                  <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                    <View style={{marginHorizontal: hp(1)}}>
                      <Text style={styles.text}>{item.title}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: hp(2),
          }}>
          <Text style={{fontSize: hp(2), fontWeight: '500', color: 'grey'}}>
            Voice Volume
          </Text>
        </View>

        <View style={[{alignItems:'center'}]}>
          <Slider
            style={{width: '90%', height: 30}}
            minimumValue={0}
            maximumValue={2}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: hp(2),
            marginTop: hp(2),
          }}>
          <Text style={{fontSize: hp(2), fontWeight: '500', color: 'grey'}}>
            Affirmation Delay
          </Text>
        </View>
        <View style={{marginTop: hp(3) , alignItems:'center'}}>
          <Slider
            style={{width: '90%', height: 30}}
            minimumValue={0}
            maximumValue={2}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
        </View>

    </SafeAreaView>
  );
};
export default Voice;
const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(7),
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
