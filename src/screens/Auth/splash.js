import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './compoents/Background';
const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate();
    }, 1500);
  }, []);
  const navigate = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token != null) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } else {
      navigation.navigate('login');
    }
  };

  return (
    <Background>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
    </Background>
  );
};

export default Splash;

const styles = StyleSheet.create({});
