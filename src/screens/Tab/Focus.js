import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'John',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Annie',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lilly',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '9',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '10',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
];
const data2 = [
  {
    id: '1',
    name: 'Relaxing nature',
    music: {
      url: require('../../assets/backound/backOne.wav'),
      title: 'Titel',
      artist: 'Innertune',
      artwork: `asset:/files/backOne.wav`,
      duration: null,
    },
    image:
      'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
  },
  {
    id: '2',
    name: 'stress relief ',
    music: {
      url: require('../../assets/backound/backTwo.wav'),
      title: 'Titel',
      artist: 'Innertune',
      artwork: `asset:/files/backOne.wav`,
      duration: null,
    },
    image:
      'https://stimuli.forebearpro.co.in/storage/app/public/11/[FREE---HDconvert.com]-dkfk.png',
  },
  {
    id: '3',
    name: 'stress relief ',
    music: {
      url: require('../../assets/backound/backOne.wav'),
      title: 'Titel',
      artist: 'Innertune',
      artwork: `asset:/files/backOne.wav`,
      duration: null,
    },
    image:
      'https://stimuli.forebearpro.co.in/storage/app/public/8/hollybood1.jpg',
  },
  {
    id: '4  ',
    name: 'Clam and peace ',
    music: {
      url: require('../../assets/backound/backTwo.wav'),
      title: 'Titel',
      artist: 'Innertune',
      artwork: `asset:/files/backOne.wav`,
      duration: null,
    },
    image:
      'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
  },
];

const Focus = ({data, onPress}) => {
  // Alert.alert(JSON.stringify(data))

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView contentContainerStyle={{alignSelf: 'center'}}>
        <FlatList
          data={data2}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                width: wp(49),
                alignItems: 'center',
              }}>
              <View style={styles.imageContainerrr}>
                <TouchableOpacity onPress={() => onPress(item)}>
                  <Image source={{uri: item.image}} style={styles.imageee} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={styles.texttt}>{item?.name}</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    height: hp(4),
                    width: wp(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: null,
                  }}>
                  {/* <Fontisto name="locked" size={20} color="black" /> */}
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Focus;

const styles = StyleSheet.create({
  imageContainerrr: {
    width: hp(20),
    height: hp(15),
    borderRadius: 20,
    marginVertical: hp(3.5),
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'black',
  },
  imageee: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  texttt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
