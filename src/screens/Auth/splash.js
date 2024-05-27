import {StyleSheet, Text,  TouchableOpacity , View,} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
  
      <TouchableOpacity
     onPress={() => {
                  navigation.navigate('signup')
                }}>
        <Text style={{color: 'black', fontSize:20}}>splash</Text>
        </TouchableOpacity>
        
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
