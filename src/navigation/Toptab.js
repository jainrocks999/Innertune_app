import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {TouchableOpacity} from 'react-native';
const data = [
  {id: '1', title: 'Affirmation'},
  {id: '2', title: 'Playlist'},
  {id: '3', title: 'By me'},
];
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
  {
    id: '3',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '4',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '5',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '6',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '7',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
  {
    id: '8',
    image: require('../assets/music.jpg'),
    title: 'abcd',
    title2: 'by You',
  },
];

const Toptab = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const handleTabPress = title => {
    setSelectedTab(title);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#191919', height: '100%'}}>
      <View style={{marginHorizontal: hp(3), marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: hp(3),
            color: 'white',
            marginVertical: 10,
          }}>
          My Library
        </Text>
      </View>

      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            top: hp(3),
          }}>
          <View style={styles.imageContainer}>
            <LinearGradient
              start={{x: 0.5, y: 0.0}}
              end={{x: 0.0, y: 1}}
              locations={[0, 1]}
              colors={['#000000', '#FFFFFF']}
              style={styles.linearGradient}>
              <View style={{justifyContent: 'center'}}>
                <Entypo name="heart" size={30} color="#426e56" />
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={styles.text}>Afffirmation liked</Text>
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
              start={{x: 0.5, y: 0.0}}
              end={{x: 0.0, y: 1}}
              locations={[0, 1]}
              colors={['#000000', '#FFFFFF']}
              style={styles.linearGradient}>
            <View style={{justifyContent: 'center'}}>
              <Entypo name="heart" size={30} color="#426e56" />
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={styles.text}>Liked Playlist</Text>
              <Text style={styles.text2}>90 affirmations</Text>
            </View>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{marginHorizontal: hp(3), marginTop: hp(3)}}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: hp(2.5),
            color: 'white',
            marginVertical: 10,
          }}>
          Playlist
        </Text>
      </View>

      <FlatList
        data={Img}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <View style={styles.imageeContainer}>
                <View style={{justifyContent: 'center'}}>
                  <Image source={item.image} style={styles.image} />
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginHorizontal: hp(2.5),
                  }}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.text2}>{item.title2}</Text>
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
    borderRadius: 20,
    justifyContent: 'space-around',
  },

  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
  },
  image: {
    width: hp(10),
    height: hp(10),
    borderRadius: 30,
  },
  text: {
    width: wp(50),
    color: 'white',
    fontSize: hp(2),
    fontWeight: '500',
  },
  text2: {
    width: wp(50),
    top: 3,
    color: 'white',
    fontSize: hp(1.8),
    fontWeight: '300',
  },
});
