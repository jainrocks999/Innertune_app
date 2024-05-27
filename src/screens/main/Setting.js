import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {FlatList} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
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
const Setting = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: hp(4),
            color: 'black',
            marginVertical: 10,
          }}>
          Settings
        </Text>
      </View>
      <ScrollView>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 20,
              color: '#434343',
              fontWeight: '700',
              marginVertical: 15,
            }}>
            Follow us
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingRight: '45%',
            marginVertical: 10,
            justifyContent: 'space-around',
          }}>
          <Entypo name="instagram" size={30} color="black" />
          <Feather name="facebook" size={30} color="black" />
          <FontAwesome6 name="x-twitter" size={30} color="black" />
          <Feather name="youtube" size={30} color="black" />
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
                    backgroundColor: '#F8F8F8',
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
                        color: '#434343',
                        fontSize: 17,
                        fontWeight: '400',
                      }}>
                      {item.title}
                    </Text>
                    <Image source={item.image} style={styles.image} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 20,
              color: '#434343',
              marginVertical: 10,
              fontWeight: '700',
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
              backgroundColor: '#F8F8F8',
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
                  color: '#434343',
                  fontSize: 17,
                  fontWeight: '400',
                }}>
                Get premium
              </Text>
              <Image
                source={require('../../assets/flaticon/handshake.png')}
                style={{height: hp(5), width: wp(8), borderRadius: 20}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 20,
              color: '#434343',
              marginVertical: 10,
              fontWeight: '700',
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
                backgroundColor: '#F8F8F8',
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
                  style={{color: '#434343', fontSize: 17, fontWeight: '400'}}>
                  {item.title}
                </Text>
                <Image source={item.image} style={styles.image} />
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
              backgroundColor: '#F8F8F8',
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
                  color: '#434343',
                  fontSize: 17,
                  fontWeight: '400',
                }}>
                Manage subscription
              </Text>
              <Image
                source={require('../../assets/flaticon/star.png')}
                style={{height: hp(5), width: wp(9), borderRadius: 20}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              fontSize: 20,
              color: '#434343',
              marginVertical: 10,
              fontWeight: '700',
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
                  backgroundColor: '#F8F8F8',
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
                    style={{color: '#434343', fontSize: 17, fontWeight: '400'}}>
                    {item.title}
                  </Text>
                  <Image source={item.image} style={styles.image} />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  image: {
    width: hp(3.5),
    height: hp(3.5),
    resizeMode: 'stretch',
  },
});
