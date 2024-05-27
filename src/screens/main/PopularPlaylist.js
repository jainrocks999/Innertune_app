import {
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
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Header2 from '../../components/molecules/Header2';
import MyTabs from '../../navigation/Bottomtab';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'Liked affirmations',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
];
const Popularplaylist = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header2 />
      <View
        style={{
          height: hp(10),
          width: wp(100),

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 25, color: 'black'}}>Popular playlist</Text>
      </View>
      <ScrollView style={{marginTop: 20}}>
        <FlatList
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: '100%',
                justifyContent: 'center',
              }}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.text}>{item.title}</Text>

                  <Text style={styles.text2}>{item.title2}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Feather name="heart" size={25} color="black" />
                </View>
                <View style={{justifyContent: 'center', marginLeft: 30}}>
                  <Entypo name="dots-three-vertical" size={20} color="black" />
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Popularplaylist;
const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  image: {
    width: hp(8),
    height: hp(8),
    borderRadius: 20,
    marginRight: 15,
  },
  text: {
    width: wp(50),
    marginTop: 10,
    marginLeft: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
});
