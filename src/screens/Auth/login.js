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
import storage from '../../utils/StorageService';
const Login = () => {
  const loading = useSelector(state => state.auth.loading);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState({
    email: false,
    password: false,
  });
  const dispatch = useDispatch();
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const getToken = async () => {
    const token = await storage.getItem(storage.FCM_TOKEN);

    if (!token) {
      Toast.show('Something went wrong');
      return;
    }
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
        fcm_token: token,
        url: 'login',
      },
      navigation,
    });
  };
  const getSigup = async () => {
    console.log('called');
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const res = await fetch(
      'https://stimuli.forebearpro.co.in/api/v1/country',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.error(error));
    if (res.status) {
      navigation.navigate('signup', {country: res.data});
    }
  };
  return (
    <Background>
      <Loader loading={loading} />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Intro
            title1="Welcome To"
            title2="STIMULI"
            title3="Let's Sign In here"
          />
          <View style={{alignItems: 'center'}}>
            <Input
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => setEmail(email)}
              focused={focused.email}
              onFocus={() => {
                setFocused({
                  email: true,
                  password: false,
                });
              }}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              underlineColorAndroid="transparent"
              onChangeText={password => setPassword(password)}
              focused={focused.password}
              onFocus={() => {
                setFocused({
                  email: false,
                  password: true,
                });
              }}
            />
            <Text
              onPress={() => {
                navigation.navigate('Forgot');
              }}
              style={{
                color: 'grey',
                alignSelf: 'flex-end',
                marginRight: '10%',
                marginTop: '3%',
                fontFamily: 'OpenSans_Condensed-Regular',
                fontSize: wp(4),
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
              color: 'lightgrey',
              fontFamily: fonts.medium,
            }}>
            Don't have an account ?{' '}
            <Text
              onPress={() => {
                // navigation.navigate('signup');
                getSigup();
              }}
              style={{
                fontFamily: fonts.medium,
                color: '#B72658',
                fontSize: wp(4.5),
                fontWeight: 'bold',
                elevation: 4,
                shadowColor: 'white',
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
