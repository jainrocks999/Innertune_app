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
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Signup = ({route}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {country} = route.params;
  function transformArray(data) {
    return data.map(country => ({value: country.id, label: country.name}));
  }
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
        <View style={styles.input}>
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
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.id);
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
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '88%',
    height: hp(6.5),
    borderColor: '#fff',
    borderRadius: wp(1),
    // paddingLeft: '5%',
    marginTop: '8%',
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
    fontSize: wp(5),
    fontFamily: fonts.medium,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: wp(5),
    fontFamily: fonts.medium,
    color: '#fff',
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
