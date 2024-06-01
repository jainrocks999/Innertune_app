import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {fonts} from '../../Context/Conctants';
import {MusicPlayerProvider} from '../../Context/MusicPlayerConstaxt';
import {MusicPlayerContext} from '../../Context/backup';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'John cena',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Annie sharma',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lilly barde',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'maxvell',
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

const Relax = ({data, onPress, backgroundSound}) => {
  return (
    <View style={{backgroundColor: '#191919', flex: 1}}>
      <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                // const obj = {
                //   ...item,
                //   music: {
                //     url: item.media[1]?.original_url,
                //     title: 'Titel',
                //     artist: 'Innertune',
                //     artwork: item.media[0]?.original_url,
                //     duration: null,
                //   },
                // };
                // onPress(obj);
                console.log(item);
                onPress(item.media[1]?.original_url);
              }}
              activeOpacity={0.7}
              style={{alignItems: 'center'}}>
              <View style={styles.listContainer}>
                {/*  ( */}
                <Image
                  source={{uri: item?.bgsound_image[0]?.original_url}}
                  style={styles.imageee}
                />
                {backgroundSound == item.media[1]?.original_url ? (
                  <View
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      zIndex: 4,
                      backgroundColor: 'rgba(25, 25, 25, 0.5)',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.8,
                    }}>
                    <AntDesign name="checkcircle" size={25} color={'#fff'} />
                  </View>
                ) : null}
              </View>
              <Text style={styles.texttt}>{item?.bgsound_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Relax;

const styles = StyleSheet.create({
  imageContainerrr: {
    width: hp(20),
    height: hp(15),
    borderRadius: 20,
    marginVertical: hp(3.5),
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
    marginBottom: hp(3),
    fontFamily: fonts.medium,
  },
  listContainer: {
    // borderWidth: 1,
    borderColor: 'white',
    height: hp(18),
    width: wp(45),
    marginHorizontal: wp(2),
    marginVertical: wp(2),
    borderRadius: 20,
  },
});
