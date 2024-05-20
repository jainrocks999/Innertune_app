import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {widthPrecent as wp, heightPercent as hp} from '../atoms/responsive';
import {fonts} from '../../Context/Conctants';
import Entypo from 'react-native-vector-icons/Entypo';

const List = ({cate, onPress}) => {
  return (
    <View>
      <FlatList
        data={cate}
        keyExtractor={item => item?.id}
        scrollEnabled={false}
        renderItem={({item}) => {
          let image =
            item.categories_image.length > 0
              ? item.categories_image[0].original_url
              : 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a';
          return (
            <View
              o
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  onPress(item);
                }}>
                <View style={styles.imageeContainer}>
                  <View
                    style={{
                      justifyContent: 'center',
                      height: hp(8),
                      width: wp(16),
                      alignItems: 'center',
                      borderRadius: wp(2),
                      backgroundColor: 'white',
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={{uri: image}}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                  {/* </LinearGradient> */}
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginHorizontal: hp(2.5),
                    }}>
                    <Text style={styles.text}>{item.categories_name}</Text>
                    <Text style={styles.text2}>{'Buy Stimuli '}</Text>
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
          );
        }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  imageeContainer: {
    marginVertical: hp(1.5),
    justifyContent: 'space-around',
    width: wp(90),
    flexDirection: 'row',
  },
  text: {
    width: wp(50),
    color: 'white',
    fontSize: hp(2),
    fontWeight: '500',
    fontFamily: fonts.bold,
  },
  text2: {
    width: wp(50),
    top: 3,
    color: 'white',
    fontSize: hp(1.8),
    fontWeight: '300',
    fontFamily: fonts.medium,
  },
});
