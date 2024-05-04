import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const images = [
  {
    title: 'Get Over Your Fear ',
    path: require('../../assets/Intrested/icon1.png'),
  },
  {
    title: 'Get Higher Self Love',
    path: require('../../assets/Intrested/icon2.png'),
  },
  {
    title: 'Get Our an Addiction',
    path: require('../../assets/Intrested/icon3.png'),
  },
  {title: 'Get More Health', path: require('../../assets/Intrested/icon4.png')},
  {
    title: 'Get More Motivation',
    path: require('../../assets/Intrested/icon5.png'),
  },
  {
    title: 'Get More Confidence',
    path: require('../../assets/Intrested/icon6.png'),
  },
  {
    title: 'Get More Happiness',
    path: require('../../assets/Intrested/icon7.png'),
  },
  {
    title: 'Get More Aboundence',
    path: require('../../assets/Intrested/icon8.png'),
  },
];

const Intrested = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          name="arrowleft"
          size={25}
          color="white"
          style={{margin: '5%'}}
        />
        <Text style={styles.headerTitle}>Welecome to STIMUILI</Text>
        <Image
          style={{
            marginTop: '2%',
            height: 50,
            width: 50,
            // alignSelf: 'flex-end',
            marginRight: '5%',
          }}
          source={require('../../assets/logo/stimuili-logos1-.png')}
          // source={require('../../assets/Intrested')}
        />
      </View>
      <View style={{marginTop: '10%'}}>
        <Text
          style={{
            marginLeft: wp(3),
            width: '80%',
            color: 'white',
            fontSize: wp(5),
            fontWeight: '500',
          }}>
          What are your Intrest
        </Text>
        <Text
          style={{
            width: '95%',
            textAlign: 'left',
            marginLeft: wp(3),
            marginTop: '1%',
            color: 'white',
          }}>
          You are capable, resilient, and worthy of all the good things life
          offers. Your unique qualities shine brightly, guiding you towards
          success and fulfillment.
        </Text>
      </View>
      <View style={{width: '100%', alignItems: 'center', marginTop: '8%'}}>
        <FlatList
          data={images}
          numColumns={3}
          keyExtractor={item => item.title}
          renderItem={({item, index}) => (
            <View
              style={{
                alignItems: 'center',
                width: wp(25),
                paddingBottom: '1%',
                marginHorizontal: wp(2.5),
              }}>
              <View style={styles.item}>
                <Image
                  style={{height: '50%', width: '50%'}}
                  source={item.path}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        }}
        style={[styles.nextBtn]}>
        <LinearGradient
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          start={{x: 0.0, y: 0.0}}
          end={{x: 5, y: 0.0}}
          locations={[0, 0.4, 0.2]}
          colors={['#B72658', '#D485D1']}>
          <Text style={{color: 'white', fontSize: wp(5.5), fontWeight: '400'}}>
            {'Next'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Intrested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  headerTitle: {
    color: '#FFF',
    marginLeft: '-21%',
    fontSize: wp(5),
  },
  item: {
    width: wp(22),
    height: wp(22),
    backgroundColor: '#fff',

    marginVertical: hp(2),
    elevation: 4,
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    color: 'white',
    textAlign: 'center',
    width: '80%',
    marginTop: '-15%',
  },
  nextBtn: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
    height: hp(6),
    width: wp(50),
    elevation: 4,
    borderRadius: 5,
    overflow: 'hidden',
    bottom: hp(-12),
  },
});
