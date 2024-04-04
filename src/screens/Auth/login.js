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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
const Login = () => {
  const loading = useSelector(state => state.auth.loading);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  showAlert = viewId => Alert.alert('Alert', 'Button pressed ' + viewId);

  const getToken = () => {
    if (email !== '' && password !== '') {
      dispatch({
        type: 'auth/login_request',
        payload: {
          email,
          password,
          url: 'login',
        },
        navigation,
      });
    } else {
      Alert.alert('Please fill all the value');
    }
    // navigation.reset({index:0,routes:[{name:'Home'}])
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Loader loading={loading} />
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
      </View>
    </View>
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
});

export default Login;
