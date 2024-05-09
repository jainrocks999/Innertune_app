import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
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

  showAlert = viewId => Alert.alert('Alert', 'Button pressed ' + viewId);

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(3),
  },
  inputContainer: {
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 0.5,
    width: wp(85),
    height: hp(6),
    margin: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: hp(5),
    marginLeft: wp(3),
    fontSize: hp(1.8),
    flex: 1,
  },
  inputIcon: {
    width: wp(3),
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp(85),
    borderRadius: 30,
    margin: hp(2),
  },
  loginButton: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '400',
  },
});

export default Signup;
{
  /*


<View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={{marginHorizontal: hp(1)}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{height: hp(10), width: wp(17)}}
          />
        </View>
        <Text style={{fontSize: 50, fontWeight: '500', color: 'black'}}>
          {' '}
          Empower
        </Text>
        <Text style={{fontSize: 50, fontWeight: '200', color: 'black'}}>
          {' '}
          yourself now
        </Text>

        <View
          style={{marginHorizontal: 10, marginVertical: 10, marginBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: '400', color: 'black'}}>
            {' '}
            Let's get you signed up
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your name "
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => setEmail({email})}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Your Email"
            underlineColorAndroid="transparent"
            onChangeText={password => setPassword({password})}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => setPassword({password})}
          />
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text style={{color: 'grey', fontSize: 20, fontWeight: '400'}}>
          {' '}
          Already have an account?
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: 'blue',
              fontSize: 20,
              fontWeight: '400',
              marginLeft: 5,
              textDecorationLine: 'underline',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 70}}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => showAlert('login')}>
          <Text style={styles.loginText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
*/
}
