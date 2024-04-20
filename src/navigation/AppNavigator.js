import {createStackNavigator} from '@react-navigation/stack';

import MyTabs from './Bottomtab';
import Login from '../screens/Auth/login';

import Splash from '../screens/Auth/splash';
import Signup from '../screens/Auth/Signup';
import HomeScreen from '../screens/main/Home';
import Popularplaylist from '../screens/main/PopularPlaylist';
import Createplaylist from '../screens/main/All playlists/Createplaylist';
import Createaffirmation from '../screens/main/All playlists/Createaffiremation';
import Saveplaylist from '../screens/main/All playlists/Saveplaylist';
import Playsong from '../screens/main/Playsong';
import Mymodal from '../components/molecules/Modal';
import Playlistdetails from '../screens/Tab/Playlistdetails';
import Menu from '../screens/main/Menu';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Popular"
        component={Popularplaylist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createplaylist"
        component={Createplaylist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createaffirmation"
        component={Createaffirmation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="saveplaylist"
        component={Saveplaylist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="playsong"
        component={Playsong}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="modal"
        component={Mymodal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Playlistdetails"
        component={Playlistdetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default MyStack;
