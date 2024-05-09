import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import {Image} from 'react-native';
import {Line} from 'react-native-svg';
import {fonts} from '../../../Context/Conctants';

const Intro = ({title1, title2, title3, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={{
          height: 65,
          width: 65,
          margin: '6%',
          marginBottom: '3%',
        }}
        source={require('../../../assets/logo/stimuili-logos1-.png')}
      />
      <View style={{marginLeft: '6%'}}>
        <Text style={styles.title}>{title1}</Text>
        <Text style={styles.title}>{title2}</Text>
        <Text
          style={{
            fontSize: wp(5),
            color: 'white',
            width: '55%',
            fontFamily: 'OpenSans_Condensed-Regular',
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
    fontSize: wp(9),
    fontFamily: fonts.medium,
  },
});
