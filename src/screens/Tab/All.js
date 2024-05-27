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
];
const All = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{marginTop:10,}}>
        <FlatList
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <View
                  style={{flexDirection: 'column', marginHorizontal: hp(2.5)}}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.text2}>{item.title2}</Text>
                </View>
                <View style={{justifyContent: 'center', paddingRight: 20}}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="black"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default All;
const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: hp(1.5),
    flexDirection: 'row',
  },
  image: {
    width: hp(8),
    height: hp(8),
    borderRadius: 8,
  },
  text: {
    width: wp(50),
    marginTop: 10,
    marginLeft: wp(1),
    color: 'black',
    fontSize: hp(2),
    fontWeight: '500',
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: hp(1.8),
    fontWeight: '300',
  },
});
