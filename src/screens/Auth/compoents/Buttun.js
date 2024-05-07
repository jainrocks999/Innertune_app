import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';

const Buttun = ({onPress, title, style, playlist}) => {
  let bool = playlist;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <LinearGradient
        style={[
          {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          bool ? {flexDirection: 'row', alignItems: 'center'} : undefined,
        ]}
        // start={{x: 0.0, y: 0.0}}
        // end={{x: 5, y: 0.0}}
        // locations={[0, 0.4, 0.2]}
        // colors={['#B72658', '#D485D1']}
        start={{x: 1.4, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 1]}
        colors={['#D485D1', '#B72658']}>
        {bool ? (
          <Foundation
            style={{marginRight: '5%', color: 'white'}}
            name="play"
            size={25}
          />
        ) : null}
        <Text
          style={{
            color: 'white',
            fontSize: wp(bool ? 5.4 : 5.5),
            fontWeight: '600',
            marginTop: bool ? '-2%' : '0%',
          }}>
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
