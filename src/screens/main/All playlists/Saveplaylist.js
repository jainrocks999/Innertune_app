import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useState} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Saveplaylist = () => {
  const navigation = useNavigation();
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');

  const handlePlaylistNameChange = text => {
    setPlaylistName(text);
  };

  const handleDescriptionChange = text => {
    setDescription(text);
  };

  const handleSubmit = () => {
    // You can perform actions with playlistName and description here
    console.log('Playlist Name:', playlistName);
    console.log('Description:', description);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
         <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: hp(5), marginLeft: '15%'}}>
          <Icon    onPress={() => navigation.goBack()}name="arrow-back" size={30} color="black" />
        </View>
        <View style={{height: hp(5), width: wp(100)}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              marginHorizontal: '17%',
              color: 'black',
            }}>
      Save your Playlist
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            height: hp(30),
            width: wp(50),
            backgroundColor: '#7153CD',
            borderRadius: 20,
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: '20%',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/upload.png')}
            style={{
              height: hp(15),
              width: wp(24),
              borderRadius: 20,
              tintColor: 'white',
            }}
          />
          <Text style={{color: 'white', fontSize: 30}}>Upload File</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>My Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={'grey'}
              value={playlistName}
              onChangeText={handlePlaylistNameChange}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Description</Text>
            <TextInput
              style={[
                styles.input,
                {marginTop: 10, height: hp(15), textAlignVertical: 'top'},
              ]}
              placeholder="Description"
              placeholderTextColor={'grey'}
              value={description}
              onChangeText={handleDescriptionChange}
              multiline={true}
              numberOfLines={4} 
            />
          </View>
        </View>
      </ScrollView>
      <View style={{alignSelf: 'center', margin: hp(5)}}>
        <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#7254CD',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(60),
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('saveplaylist');
          }}>
          <Text style={styles.loginText}>Save Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Saveplaylist;
const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  inputContainer: {
    marginBottom: 10,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.4,
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    color:'black',
    fontWeight: '500',
  },
});
