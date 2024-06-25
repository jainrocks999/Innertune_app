import React, {useContext, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/Home';
import Reminder from '../screens/main/Reminder';
import Setting from '../screens/main/Setting';
import LinearGradient from 'react-native-linear-gradient';
import {BottomSheet} from 'react-native-btr';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {useTabMenu} from '../Context/context';
import Addbutton from '../screens/main/Addbutton';
import TopTabs from './Toptab';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fonts} from '../Context/Conctants';
import storage from '../utils/StorageService';
import Buttun from '../screens/Auth/compoents/Buttun';
import {BlurView} from '@react-native-community/blur';
import {MusicPlayerContext} from '../Context/MusicPlayerConstaxt';

const Tab = createBottomTabNavigator();
const getIconColor = focused => ({
  tintColor: focused ? '#D485D1' : '#fff',
});
const getTextColor = focused => ({
  color: focused ? '#D485D1' : '#ffff',
});
const MyTabs = () => {
  const navigation = useNavigation();
  const {getNameImage, reset, playPlalist} = useContext(MusicPlayerContext);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const {opened, toggleOpened} = useTabMenu();
  const dispatch = useDispatch();
  const getAffetMations = async () => {
    setBottomSheetVisible(false);
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    reset(true);
    dispatch({
      type: 'home/play_playlist_success',
      payload: [],
    });
    dispatch({
      type: 'home/affirmation_fetch_request',
      token,
      user_id: user,
      navigation,
      url: 'affirmation',
      page: 'createplaylist',
    });
    // navigation.navigate('createplaylist');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#191919',
        elevation: 4,
        shadowColor: '#fff',
      }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={
                    focused
                      ? require('../assets/home1.png')
                      : require('../assets/home.png')
                  }
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="library"
          component={TopTabs}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={
                    focused
                      ? require('../assets/heart1.png')
                      : require('../assets/heart.png')
                  }
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Library
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="add"
          component={Addbutton}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  paddingLeft: wp(2.5),
                  paddingRight: wp(2.5),
                  paddingBottom: wp(2.7),
                  // backgroundColor: '#191919',
                  alignSelf: 'center',
                  // marginRight: '65%',
                  position: 'absolute',
                  borderRadius: wp(9),
                }}>
                {/* 
                  <Image
                    source={require('../assets/plus.png')}
                    resizeMode="contain"
                    style={styles.addIcon}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.addIconContainer}
                  onPress={() => setBottomSheetVisible(true)}>
                  <LinearGradient
                    style={[
                      {
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                    // start={{x: 0.0, y: 0.0}}
                    // end={{x: 5, y: 0.0}}
                    // locations={[0, 0.4, 0.2]}
                    // colors={['#B72658', '#D485D1']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 0.8}}
                    locations={[0, 1]}
                    colors={['#D485D1', '#B72658']}>
                    <Image
                      source={require('../assets/plus.png')}
                      resizeMode="contain"
                      style={styles.addIcon}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />
        <Tab.Screen
          name="reminder"
          component={Reminder}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={
                    focused
                      ? require('../assets/clock1.png')
                      : require('../assets/clock.png')
                  }
                  resizeMode="contain"
                  style={[
                    styles.tabIcon,
                    getIconColor(focused),
                    focused && {
                      width: 26,
                      height: 36,
                      elevation: 5,
                      marginTop: '-5%',
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.textIcon,
                    getTextColor(focused),
                    focused && {marginTop: '-5%'},
                  ]}>
                  Reminder
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarItemStyle: {
              height: 0,
            },
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={
                    focused
                      ? require('../assets/setting1.png')
                      : require('../assets/setting.png')
                  }
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
                  Setting
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>

      <BottomSheet
        visible={bottomSheetVisible}
        onBackButtonPress={() => setBottomSheetVisible(false)}
        onBackdropPress={() => setBottomSheetVisible(false)}
        style={styles.bottomSheetContainer}>
        <View style={styles.bottomSheetContent}>
          <BlurView
            style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
            blurType="dark"
            blurAmount={15}
            reducedTransparencyFallbackColor="grey"
          />
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('audiorecorder');
            }}>
            <View style={styles.card}>
              <Image
                source={require('../assets/music.jpg')}
                style={{height: hp(13), width: wp(25), borderRadius: 20}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: wp(50),
                  marginHorizontal: '10%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                  }}>
                  Record your affirmations
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              getAffetMations();
            }}>
            <View style={styles.card}>
              <ImageBackground
                source={require('../assets/sparkle_Images/3634321.jpg')}
                // start={{x: 0.0, y: 0.0}}
                // end={{x: 5, y: 0.0}}
                // locations={[0, 0.5, 0.3]}
                // colors={['#D485D1', '#B72658']}
                style={[styles.linearGradient, {opacity: 0.8}]}>
                <Image
                  source={require('../assets/music.jpg')}
                  style={{height: hp(13), width: wp(25), borderRadius: 20}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                    width: wp(50),
                    marginHorizontal: '5%',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: '#ffffff',
                      backgroundColor: 'transparent',
                    }}>
                    Create your Playlist
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: wp(100),
    height: hp(8.2),
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    paddingTop: '1%',
    zIndex: 4,
    elevation: 3,
    shadowColor: '#fff',
  },
  tabIconContainer: {
    width: wp(17),
    height: hp(8),
    top: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addIconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B72658',
    borderRadius: 50,
    elevation: 30, // Android shadow
    shadowColor: '#fff', // iOS shadow color
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5, // iOS shadow opacity
    shadowRadius: 10, // iOS shadow radius
    overflow: 'hidden',
  },
  addIcon: {
    width: 22,
    height: 32,
    borderRadius: 50,
    alignSelf: 'center',

    zIndex: 0,
  },
  tabIcon: {
    width: 24,
    height: 32,
    elevation: 5,
  },
  textIcon: {
    color: '#89FFBF',
    elevation: 5,
    fontFamily: fonts.regular,
    fontSize: wp(3),
  },
  bottomSheetContainer: {
    backgroundColor: '#191919',
    height: hp(50),
  },
  bottomSheetContent: {
    backgroundColor: '#191919',
    padding: 20,
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: 'grey',
  },
  bottomSheetText: {
    fontSize: 18,
    color: 'black',
  },
  card: {
    height: hp(13),
    width: wp(80),
    borderColor: 'black',
    alignSelf: 'center',
    margin: '2%',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#D485D1',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#fff',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,

    overflow: 'hidden',
  },
});

export default MyTabs;
