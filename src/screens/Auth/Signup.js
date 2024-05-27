import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import Background from './compoents/Background';
import Intro from './compoents/Intro';
import Input from './compoents/Input';
import Buttun from './compoents/Buttun';
import Line from './compoents/Line';
import Social from './compoents/Social';
import {fonts} from '../../Context/Conctants';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Background>
      <Intro
        title1="Empower"
        title2="Yourself Now"
        title3="Let's get you Signed Up"
        style={{
          height: hp(30),
        }}
      />
      <View style={{alignItems: 'center'}}>
        <Input
          placeholder="Enter your name "
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => setEmail({email})}
        />
        <Input
          placeholder="Your Email"
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword({password})}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={password => setPassword({password})}
        />
        <Buttun title="Sing Up" />
      </View>
      <Line />
      <View style={{alignItems: 'center', marginTop: '7%'}}>
        <Social />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: '5%',
          color: 'white',
          fontFamily: fonts.medium,
        }}>
        Already have an account ?{' '}
        <Text
          onPress={() => {
            navigation.navigate('login');
          }}
          style={{
            fontFamily: fonts.medium,
            color: '#B72658',
            fontSize: wp(5),
            fontWeight: '500',
          }}>
          {' Sign In'}
        </Text>
      </Text>
    </Background>
  );
};

export default Signup;
