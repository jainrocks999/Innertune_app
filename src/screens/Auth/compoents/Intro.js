import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import {Image} from 'react-native';
import {fonts} from '../../../Context/Conctants';

const Intro = ({title1, title2, title3, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={{
          height: 65,
          width: 65,
          alignSelf: 'center',
          marginTop: '6%',
        }}
        source={require('../../../assets/logo/stimuili-logos1-.png')}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{title1}</Text>
        <Text style={[styles.title, {fontSize: wp(9), marginTop: '-10%'}]}>
          {title2}
        </Text>
        <Text
          style={{
            fontSize: wp(4),
            color: 'white',
            marginTop: '-6%',
            fontFamily: 'Charm-Regular',
          }}>
          {title3}
        </Text>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    height: hp(35),
  },
  title: {
    color: 'white',
    fontSize: wp(12),
    fontFamily: 'Charm-Regular',
    marginTop: '-2%',
  },
});
