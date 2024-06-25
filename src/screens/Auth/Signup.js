import React, {useState} from 'react';
import {Alert, StyleSheet, Text, ToastAndroid, View} from 'react-native';
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
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
const Signup = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const loading = useSelector(state => state.auth.loading);
  const {country} = route.params;
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    country_id: '',
    confirmPassword: '',
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
    country_id: false,
    confirmPassword: false,
  });

  const validate = () => {
    if (!inputs.name) {
      return 'Name is required';
    }
    if (!inputs.email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      return 'Email is invalid';
    }
    if (!inputs.country_id) {
      return 'Please select country';
    }
    if (!inputs.password) {
      return 'Password is required';
    } else if (inputs.password.length < 6) {
      return 'Password must be at least 6 characters';
    } else if (inputs.password !== inputs.confirmPassword) {
      return "Password dosen't match";
    }

    return true;
  };
  const hanndleOnSubmit = () => {
    if (typeof validate() == 'string') {
      ToastAndroid.show(validate(), ToastAndroid.SHORT);
    } else if (validate()) {
      console.log('iergdfiogdfiogb', inputs);

      dispatch({
        type: 'auth/registration_request',
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        password_confirmation: inputs.password,
        country_id: inputs.country_id,
        url: 'registration',
        navigation,
      });
    }
  };
  const handleOnchange = (key, value) => {
    setInputs(prev => ({...prev, [key]: value}));
  };

  return (
    <Background>
      <View style={{height: hp(35)}}>
        <Intro
          title1="Empower"
          title2="Yourself Now"
          title3="Let's get you Signed Up"
          style={{
            height: hp(30),
          }}
        />
      </View>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{paddingBottom: hp(4)}}>
        <View style={{alignItems: 'center'}}>
          <Input
            placeholder="Enter your name "
            keyboardType="email-address"
            value={inputs.name}
            onChangeText={email => handleOnchange('name', email)}
            underlineColorAndroid="transparent"
            focused={focused.name}
            onFocus={() => {
              setFocused({
                name: true,
                email: false,
                password: false,
                country_id: false,
                confirmPassword: false,
              });
              setIsFocus(false);
            }}
          />
          <Input
            placeholder="Your Email"
            underlineColorAndroid="transparent"
            value={inputs.email}
            onChangeText={email => handleOnchange('email', email)}
            focused={focused.email}
            onFocus={() => {
              setFocused({
                name: false,
                email: true,
                password: false,
                country_id: false,
                confirmPassword: false,
              });
              setIsFocus(false);
            }}
          />
          <View
            style={[
              styles.input,
              isFocus && {
                borderColor: '#FFB6C1',
                borderWidth: 0.5,
                elevation: 1,
                shadowColor: '#fff',
                borderRadius: wp(4),
              },
            ]}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={country}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              itemContainerStyle={{
                borderBottomWidth: 0.5,
                // paddingVertical: -5,
              }}
              itemTextStyle={{
                color: 'black',
                fontSize: wp(4),
              }}
              placeholder={!isFocus ? 'Select Country' : '...'}
              searchPlaceholder="Search..."
              value={inputs.country_id}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                handleOnchange('country_id', item.id);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            />
          </View>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={inputs.password}
            onChangeText={text => handleOnchange('password', text)}
            focused={focused.password}
            onFocus={() => {
              setFocused({
                name: false,
                email: false,
                password: true,
                country_id: false,
                confirmPassword: false,
              });
              setIsFocus(false);
            }}
          />
          <Input
            placeholder="Confirm Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={inputs.confirmPassword}
            onChangeText={text => handleOnchange('confirmPassword', text)}
            focused={focused.confirmPassword}
            onFocus={() => {
              setFocused({
                name: false,
                email: false,
                password: false,
                country_id: false,
                confirmPassword: true,
              });
              setIsFocus(false);
            }}
          />
          <Buttun onPress={hanndleOnSubmit} title="Sing Up" />
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
          Already have an account ?{' '}
          <Text
            onPress={() => {
              navigation.navigate('login');
            }}
            style={{
              fontFamily: fonts.medium,
              color: '#B72658',
              fontSize: wp(4.5),
              fontWeight: 'bold',
              elevation: 4,
              shadowColor: 'white',
            }}>
            {' Sign In'}
          </Text>
        </Text>
      </ScrollView>
    </Background>
  );
};

export default Signup;
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
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: '100%',
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    paddingHorizontal: '5%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: '5%',
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: wp(2),
  },
  placeholderStyle: {
    fontSize: wp(3.8),
    fontFamily: fonts.medium,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: wp(3.8),
    fontFamily: fonts.medium,
    color: '#ccc',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#fff',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
