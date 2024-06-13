import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Toast from 'react-native-simple-toast';

import {FlatList} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../Context/Conctants';
import Background from '../Auth/compoents/Background';
import storage from '../../utils/StorageService';
import Api from '../../redux/api';
import Loader from '../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {MusicPlayerContext} from '../../Context/MusicPlayerConstaxt';
import PlayPopup from '../../components/PlayPopup';
const data = [
  {
    id: '1',
    title: 'Get Premium',
    image: require('../../assets/flaticon/lock.png'),
  },
  {
    id: '2',
    title: 'Create reminders',
    image: require('../../assets/flaticon/notification.png'),
  },
  {
    id: '3',
    title: 'Share innertune app',
    image: require('../../assets/flaticon/share.png'),
  },
  {
    id: '4',
    title: 'Rate innertune on Googleplay',
    image: require('../../assets/flaticon/star.png'),
  },
];

const data2 = [
  {
    id: '1',
    title: 'Suggest an affirmation',
    image: require('../../assets/flaticon/frequency.png'),
  },
  {
    id: '2',
    title: 'Suggest an app improvement',
    image: require('../../assets/flaticon/add.png'),
  },
  {
    id: '3',
    title: 'Report a bug',
    image: require('../../assets/flaticon/warning.png'),
  },
];
const data3 = [
  {
    id: '1',
    title: 'Delete an account',
    image: require('../../assets/flaticon/delete.png'),
  },
  {
    id: '2',
    title: 'Sign out',
    image: require('../../assets/flaticon/switch.png'),
  },
];
const Setting = ({}) => {
  const navigation = useNavigation();
  const {getNameImage, playPlalist} = useContext(MusicPlayerContext);
  const dispatch = useDispatch();
  const {screens, loading} = useSelector(state => state.home);
  const Logout = async () => {
    console.log('caleed');
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_EMAIL,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const email = items.find(([key]) => key === storage.USER_EMAIL)?.[1];
    // console.log('sfjoisois', email, token);
    console.log('caled');
    dispatch({
      type: 'home/logout_request',
      url: 'logout',
      email: email,
      token: token,
      navigation,
    });
  };

  console.log('thid is', loading);

  return (
    <Background>
      <Loader loading={loading} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <Text
          style={{
            // fontFamily: 'Montserrat',
            fontSize: hp(4),
            color: 'white',
            marginVertical: 10,
          }}>
          Settings
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: playPlalist.length > 0 ? hp(5) : null,
        }}>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={{
              // fontFamily: 'Montserrat',
              fontSize: 20,
              color: 'white',

              marginVertical: 15,
            }}>
            Follow us
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: wp(3),
            paddingRight: '40%',
            marginVertical: wp(4),
            justifyContent: 'space-around',
          }}>
          {/* <Entypo name="instagram" size={30} color="white" /> */}
          <Image
            style={{height: 30, width: 30}}
            source={require('../../assets/social_logo/instagram.png')}
          />
          <Image
            style={{height: 30, width: 30}}
            tintColor="#1877F2"
            source={require('../../assets/social_logo/facebook.png')}
          />
          <Image
            style={{height: 30, width: 30}}
            tintColor="#B72658"
            source={require('../../assets/social_logo/social-media.png')}
          />
          <Image
            style={{height: 38, width: 38}}
            // tintColor="#fff"
            source={require('../../assets/social_logo/youtube.png')}
          />
          {/* <Feather name="facebook" size={30} color="white" /> */}
          {/* <FontAwesome6 name="x-twitter" size={30} color="white" /> */}
          {/* <Feather name="youtube" size={30} color="white" /> */}
        </View>
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View
                  style={{
                    height: hp(7),
                    width: wp(94),
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'rgba(97, 95, 95,0.3)',
                    borderRadius: 10,
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: '5%',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: wp(4.5),
                        fontWeight: '400',
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      tintColor="#D1CECE"
                      source={item.image}
                      style={[
                        styles.image,
                        {
                          height: hp(3),
                          width: hp(3),
                        },
                      ]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              marginVertical: 10,
              // fontWeight: '700',
              fontFamily: fonts.bold,
            }}>
            Partner Program
          </Text>
        </View>
        <TouchableOpacity>
          <View
            style={{
              height: hp(7),
              width: wp(94),
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(97, 95, 95,0.3)',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp(4.5),
                  fontWeight: '400',
                }}>
                Get premium
              </Text>
              <Image
                source={require('../../assets/flaticon/handshake.png')}
                style={{
                  height: hp(3.8),
                  width: hp(3.8),
                  borderRadius: 20,
                  tintColor: '#D1CECE',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              // fontFamily: 'Montserrat',
              fontSize: 20,
              color: 'white',
              marginVertical: 10,
              fontFamily: fonts.bold,
            }}>
            Suggestion
          </Text>
        </View>
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                height: hp(7),
                width: wp(94),
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: 'rgba(97, 95, 95,0.3)',
                borderRadius: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: '5%',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp(4.5),
                    fontWeight: '400',
                  }}>
                  {item.title}
                </Text>
                <Image
                  tintColor="#D1CECE"
                  source={item.image}
                  style={[
                    styles.image,
                    item.id == '3' ? {height: hp(3), width: hp(3)} : null,
                  ]}
                />
              </View>
            </View>
          )}
        />

        <TouchableOpacity>
          <View
            style={{
              height: hp(7),
              width: wp(94),
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(97, 95, 95,0.3)',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp(4.5),
                  fontWeight: '400',
                }}>
                Manage subscription
              </Text>
              <Image
                source={require('../../assets/flaticon/star.png')}
                style={{
                  height: hp(3.5),
                  width: hp(3.5),
                  borderRadius: 20,
                  tintColor: '#D1CECE',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              // fontFamily: 'Montserrat',
              fontSize: 20,
              color: 'white',
              marginVertical: 10,
              // fontWeight: '700',
              fontFamily: fonts.bold,
            }}>
            Account
          </Text>
        </View>
        <View style={{marginBottom: 30}}>
          <FlatList
            data={data3}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View
                style={{
                  height: hp(7),
                  width: wp(94),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(97, 95, 95,0.3)',
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    if (item.title === 'Sign out') {
                      Alert.alert(
                        'Logout',
                        'Are you sure you want to logout?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Logout',
                            onPress: () => {
                              Logout();
                            },
                            style: 'destructive',
                          },
                        ],
                        {cancelable: true},
                      );
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: '5%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp(4.5),
                      fontWeight: '400',
                    }}>
                    {item.title}
                  </Text>
                  <Image
                    tintColor="#D1CECE"
                    source={item.image}
                    style={{
                      height: hp(3),
                      width: hp(3),
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {playPlalist.length > 0 && getNameImage().name != '' ? (
        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
          <PlayPopup />
        </View>
      ) : null}
    </Background>
  );
};

export default Setting;

const styles = StyleSheet.create({
  image: {
    height: hp(3.5),
    width: hp(3.5),
    resizeMode: 'stretch',
  },
});
