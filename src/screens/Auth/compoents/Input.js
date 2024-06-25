import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import {fonts} from '../../../Context/Conctants';

const Input = ({value, onFocus, focused, ...props}) => {
  return (
    <View
      style={[
        styles.input,
        focused && {
          borderColor: '#FFB6C1',
          borderWidth: 0.5,
          elevation: 1,
          shadowColor: '#fff',
          borderRadius: wp(4),
        },
      ]}>
      <TextInput
        {...props}
        placeholderTextColor={'grey'}
        value={value}
        style={{
          fontSize: wp(3.8),
          color: '#ccc',
          height: '100%',
          width: '100%',
          alignSelf: 'flex-end',
        }}
        onFocus={onFocus}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.2,
    width: '80%',
    height: hp(6.8),
    borderColor: 'lightgrey',
    borderRadius: wp(3),
    // paddingLeft: '5%',
    marginTop: '8%',
    paddingLeft: '5%',
  },
});
