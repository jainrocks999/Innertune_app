import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './compoents/Background';
import ForceUpdateModal from './compoents/UpdateModal';
const Splash = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState({});

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Stimuli Notification Permission',
          message:
            'Stimuli would like to send you push notifications ' +
            'to keep you updated on the latest photo trends and app features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Don’t Allow',
          buttonPositive: 'Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the app sould get notication');
      }
      console.log('this', granted);
    } catch (err) {
      console.warn(err);
    }
  };
  const version = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const res = await fetch(
        'https://stimuli.forebearpro.co.in/api/v1/version-update',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .catch(error => console.error(error));
      if (res.code == '200') {
        if (Platform.OS == 'android' && res.data.android_version > '1.0.0') {
          setVisible(true);
          setUpdate(res.data);
        } else {
          navigate();
        }
      } else {
        navigate();
      }
    } catch (err) {
      navigate();
      console.log(err);
    }
  };
  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      version();
    }, 1500);
  }, []);
  const navigate = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token != null) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } else {
      navigation.replace('login');
    }
  };
  const onUpdate = () => {
    Linking.openURL(update?.android_url ?? 'www.google.com');
  };

  return (
    <Background>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ForceUpdateModal
          appLogo={require('../../assets/logo/stimuili-logos1-.png')}
          isVisible={visible}
          onUpdate={onUpdate}
          message={update.android_message}
        />
        <Image
          style={{
            height: 180,
            width: 180,
            margin: '6%',
            marginBottom: '3%',
            borderRadius: 90,
          }}
          source={require('../../assets/logo/stimuili-logos1-.png')}
        />
      </View>
    </Background>
  );
};

export default Splash;

const styles = StyleSheet.create({});
