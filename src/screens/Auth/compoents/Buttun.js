import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import LinearGradient from 'react-native-linear-gradient';

const Buttun = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn]}>
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
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Buttun;

const styles = StyleSheet.create({
  btn: {
    width: '88%',
    height: hp(6.5),
    borderColor: '#fff',
    borderRadius: wp(1),
    marginTop: '6%',
    overflow: 'hidden',
    elevation: 3,
  },
});
