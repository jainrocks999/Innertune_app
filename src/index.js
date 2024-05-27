import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {MusicPlayerProvider} from './Context/MusicPlayerConstaxt';

const Root = () => {
  return (
    <MusicPlayerProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MusicPlayerProvider>
  );
};

export default Root;

const styles = StyleSheet.create({});
