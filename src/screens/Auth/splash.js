import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={{color: 'black', fontSize: 20}}>splash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
