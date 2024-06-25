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
import {SafeAreaView} from 'react-native-safe-area-context';

const AksReminder = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
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
            size={20}
            color="white"
            style={{margin: '5%'}}
          />
          <Text style={styles.headerTitle}>Welecome to STIMUILI</Text>
          <Image
            style={{
              marginTop: '2%',
              height: 50,
              width: 50,
              marginRight: '5%',
            }}
            source={require('../../assets/logo/stimuili-logos1-.png')}
          />
        </View>
        <View
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            borderRadius: wp(5),
            marginTop: '5%',
            overflow: 'hidden',
            elevation: 5,
            shadowColor: '#fff',
          }}>
          <FastImage
            style={{
              height: '100%',
              width: '100%',
              alignSelf: 'center',
            }}
            source={require('../../assets/logo/Animatedgif.gif')}
            resizeMode="contain"
            onPointerMoveCapture={ec => {
              console.log(ec);
            }}
          />
        </View>
        <Text
          style={{
            marginLeft: wp(6),
            width: '80%',
            color: 'white',
            fontSize: wp(5),
            fontWeight: '700',
            marginTop: '10%',
          }}>
          Get reminded to respect along your favorite affirmations{' '}
        </Text>
        <Text
          style={{
            width: '95%',
            textAlign: 'left',
            marginLeft: wp(6),
            marginTop: '1%',
            color: 'white',
            fontSize: wp(3.5),
          }}>
          You are capable, resilient, and worthy of all the good things life
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
            start={{x: 1.4, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0, 1]}
            colors={['#D485D1', '#B72658']}>
            <Text
              style={{
                color: 'white',
                fontSize: wp(4.5),
                fontWeight: '400',
              }}>
              {'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default AksReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  headerTitle: {
    color: '#FFF',
    marginLeft: '-21%',
    fontSize: wp(5),
    fontWeight: '600',
  },
  nextBtn: {
    alignSelf: 'center',
    zIndex: 1,
    position: 'absolute',
    height: hp(6),
    width: hp(20),
    elevation: 4,
    borderRadius: wp(3),
    overflow: 'hidden',
    bottom: hp(4),
  },
});
