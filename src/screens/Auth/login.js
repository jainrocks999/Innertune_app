import React, {useState} from 'react';
import {View, Text, Alert, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import Background from './compoents/Background';
import Intro from './compoents/Intro';
import Input from './compoents/Input';
import Buttun from './compoents/Buttun';
import Line from './compoents/Line';
import Social from './compoents/Social';
import {fonts} from '../../Context/Conctants';
import Toast from 'react-native-simple-toast';
import {ScrollView} from 'react-native-gesture-handler';
const Login = () => {
  const loading = useSelector(state => state.auth.loading);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const getToken = () => {
    if (email == '') {
      Toast.show('Please enter email');
      return;
    }
    if (!validateEmail(email)) {
      Toast.show('Email is invalid');
      return;
    }
    if (password == '') {
      Toast.show('Please Enter password');
      return;
    }

    dispatch({
      type: 'auth/login_request',
      payload: {
        email,
        password,
        url: 'login',
      },
      navigation,
    });
  };

  return (
    <Background>
      <Loader loading={loading} />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Intro
            title1="Welcome"
            title2="To STIMULI"
            title3="Let's Sign In here"
          />
          <View style={{alignItems: 'center'}}>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => setEmail(email)}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => setPassword(password)}
            />
            <Text
              onPress={() => {
                navigation.navigate('Forgot');
              }}
              style={{
                color: '#fff',
                alignSelf: 'flex-end',
                marginRight: '6%',
                marginTop: '3%',
                fontFamily: 'OpenSans_Condensed-Regular',
                fontSize: wp(5),
              }}>
              Forgot Your password ?
            </Text>
            <Buttun
              onPress={() => {
                getToken();
              }}
              title="Sign In"
            />
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
            Don't have an account ?{' '}
            <Text
              onPress={() => {
                navigation.navigate('signup');
              }}
              style={{
                color: '#B72658',
                fontSize: wp(5),
                fontWeight: '500',
                fontFamily: fonts.medium,
              }}>
              {' Sign Up'}
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default Login;
