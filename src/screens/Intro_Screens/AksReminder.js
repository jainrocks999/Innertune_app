import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../components/atoms/responsive';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {fonts} from '../../Context/Conctants';

const AksReminder = ({navigation}) => {
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
        />
      </View>
      <FastImage
        style={{
          height: 200,
          width: 200,

          alignSelf: 'center',
          marginTop: '5%',
          backfaceVisibility: 'hidden',
        }}
        source={require('../../assets/logo/Animatedgif.gif')}
        resizeMode="contain"
        onPointerMoveCapture={ec => {
          console.log(ec);
        }}
      />
      <Text
        style={{
          marginLeft: wp(3),
          width: '80%',
          color: 'white',
          fontSize: wp(5),
          fontWeight: '500',
          marginTop: '10%',
          fontFamily: fonts.medium,
        }}>
        Get reminded to respect along your favorite affirmations{' '}
      </Text>
      <Text
        style={{
          width: '95%',
          textAlign: 'left',
          marginLeft: wp(3),
          marginTop: '1%',
          color: 'white',
        }}>
        ou are capable, resilient, and worthy of all the good things life
        offers. Your unique qualities shine brightly, guiding you towards
        success and fulfillment.
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Intrested');
        }}
        style={[styles.nextBtn]}>
        <LinearGradient
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // start={{x: 0.0, y: 0.0}}
          // end={{x: 5, y: 0.0}}
          // locations={[0, 0.4, 0.2]}
          // colors={['#B72658', '#D485D1']}
          start={{x: 1.4, y: 0}}
          end={{x: 0, y: 1}}
          locations={[0, 1]}
          colors={['#D485D1', '#B72658']}>
          <Text
            style={{
              color: 'white',
              fontSize: wp(5.5),
              fontWeight: '400',
              fontFamily: fonts.regular,
            }}>
            {'Get Started'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AksReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    // alignItems: 'center',
    // marginLeft: '2b%',
  },
  headerTitle: {
    color: '#FFF',
    marginLeft: '-21%',
    fontSize: wp(5),
    fontFamily: fonts.bold,
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
    bottom: hp(4),
  },
});
