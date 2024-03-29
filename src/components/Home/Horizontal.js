import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
const Horizontal = ({data}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      horizontal={true}
      data={data}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('playsong');
            }}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: hp(-2.5),
              marginRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Popular');
              }}>
              <Icon name="heart" size={20} color="#434343" />
            </TouchableOpacity>
          </View>
          <Text style={styles.text2}>{item.title2}</Text>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  text: {
    width: wp(50),
    marginTop: 10,
    marginLeft: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
  imageContainer: {
    padding: 15,
  },
  image: {
    width: hp(32),
    height: hp(18),
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});

export default Horizontal;
