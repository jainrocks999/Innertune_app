import React, {useState} from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
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
  showAlert = viewId => Alert.alert('Alert', 'Button pressed ' + viewId);
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
        <ScrollView>
          <Intro title1="Welcome" title2="Back" title3="Let's Sign In here" />
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    width: wp(85),
    height: hp(6),
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: hp(6),
    width: wp(80),
    marginLeft: wp(4),
    fontSize: hp(2.1),
    fontWeight: '400',
    borderBottomColor: '#FFFFFF',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    height: hp(10),
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: 'black',
    marginTop: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: hp(2.5),
    fontWeight: '500',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#191919',
  },
  round1: {
    height: hp(45),
    width: hp(45),
    backgroundColor: 'rgba(60, 60, 60,0.5)',
    borderRadius: hp(22.5),
    position: 'absolute',
    right: wp(-26),
    top: hp(-15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  round2: {
    height: hp(35),
    width: hp(35),
    backgroundColor: 'rgba(10, 10, 10, 0.1)',
    borderRadius: hp(17.5),
    position: 'absolute',
  },
  roundSecond: {
    position: 'absolute',
    left: wp(-55),
    top: hp(30),
  },
});

export default Login;
{
  /*
 <View style={{flexDirection: 'row', marginTop: hp(1)}}>
        <View style={{alignSelf: 'center', marginHorizontal: hp(2)}}>
          <Icon name="arrow-back" size={30} color="black" />
        </View>
        <Image
          source={require('../../assets/logo.png')}
          style={{height: hp(6.5), width: wp(15), marginHorizontal: wp(28)}}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50%',
        }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>
          Sign in
        </Text>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '200'}}>
          to current account
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => setPassword(password)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text
              // onPress={() => {
              //   navigation.navigate('forgot');
              // }}
              style={{
                color: 'grey',
                padding: hp(1.5),
                fontSize: 15,
                fontWeight: '400',
              }}>
              Forgot password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: hp(6),
              marginLeft: wp(5),
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              width: wp(45),
              borderRadius: 30,
            }}
            onPress={() => {
              getToken();
            }}>
            <Text style={styles.loginText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>*/
}
