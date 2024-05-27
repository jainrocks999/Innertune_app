import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/Home';
import Mylibrary from '../screens/main/Mylibrary';
import Reminder from '../screens/main/Reminder';
import Setting from '../screens/main/Setting';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../themes/Colors';
import Mymodal from '../components/molecules/Modal';
import {BottomSheet} from 'react-native-btr';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {useTabMenu} from '../Context/context';
import Addbutton from '../screens/main/Addbutton';
import TopTabs from './Toptab';
import {useNavigation} from '@react-navigation/native';
import Popularplaylist from '../screens/main/PopularPlaylist';
const Tab = createBottomTabNavigator();
const getIconColor = focused => ({
  tintColor: focused ? '#bb98ed' : 'black',
});
const getTextColor = focused => ({
  color: focused ? '#bb98ed' : 'black',
});
const MyTabs = () => {
  const navigation = useNavigation();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const {opened, toggleOpened} = useTabMenu();
  return (
    <View style={{flex: 1}}>
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
                  source={require('../assets/home.png')}
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
                  source={require('../assets/heart.png')}
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
              <TouchableOpacity
                style={styles.addIconContainer}
                onPress={() => setBottomSheetVisible(true)}>
                <Image
                  source={require('../assets/plus.png')}
                  resizeMode="contain"
                  style={styles.addIcon}
                />
              </TouchableOpacity>
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
                  source={require('../assets/clock.png')}
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
                <Text style={[styles.textIcon, getTextColor(focused)]}>
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
                  source={require('../assets/setting.png')}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('createaffirmation');
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('createplaylist');
            }}>
            <View style={styles.card}>
              <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 5, y: 0.0}}
                locations={[0, 0.15, 0.36]}
                colors={['#A89AD5', '#7153CD']}
                style={styles.linearGradient}>
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
                    Create your playlist
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    shadowColor: 'black',
    shadowOffset: {
      height: 100,
      width: 0,
    },
    shadowOpacity: 100,
    shadowRadius: 100,
    elevation: 5,
    width: wp(100),
    height: hp(10),
  },
  tabIconContainer: {
    width: wp(20),
    height: hp(8),
    top: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#6947D2',
    borderRadius: 50,
  },
  addIcon: {
    width: 25,
    height: 35,
    borderRadius: 50,
  },
  tabIcon: {
    width: 28,
    height: 35,
  },
  textIcon: {
    color: '#6947D2',
  },
  bottomSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color of the bottom sheet
    height: hp(50),
  },
  bottomSheetContent: {
    backgroundColor: 'white', // Background color of the content within the bottom sheet
    padding: 20,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20, // Add border radius to style the shape of the bottom sheet
    borderTopRightRadius: 20,
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
    backgroundColor: 'orange',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },
});

export default MyTabs;
