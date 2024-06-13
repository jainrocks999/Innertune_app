// ForceUpdateModal.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import Buttun from './Buttun';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
const ForceUpdateModal = ({isVisible, message, onUpdate, appLogo}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.9}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={styles.modalContainer}>
        <View style={styles.logoContainer}>
          <Image source={appLogo} style={styles.logo} />
        </View>
        <Text style={styles.title}>Update Required</Text>
        <Text style={styles.message}>{message}</Text>
        <Buttun
          title={'Update'}
          onPress={onUpdate}
          style={styles.updateButton}
          textStyle={styles.updateButtonText}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: hp(7.5),

    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: hp(15),
    height: hp(15),
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  updateButton: {
    borderRadius: 20,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    height: hp(9),
    overflow: 'hidden',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForceUpdateModal;
