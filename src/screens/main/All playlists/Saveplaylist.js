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

import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchImageLibrary as _launchImageLibrary,
  launchCamera as _launchCamera,
} from 'react-native-image-picker';
import {fonts} from '../../../Context/Conctants';
import Buttun from '../../Auth/compoents/Buttun';
import Loader from '../../../components/Loader';
let launchImageLibrary = _launchImageLibrary;

const Saveplaylist = ({route}) => {
  const selectedItems = route.params.selected ?? [];
  const {loading, groups, category, Createfavriote, addetItems_to_playlist} =
    useSelector(state => state.home);
  const navigation = useNavigation();
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const handlePlaylistNameChange = text => {
    setPlaylistName(text);
  };
  const handleDescriptionChange = text => {
    setDescription(text);
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/createPlayList_request',
      description: description,
      title: playlistName,
      user_id: '1',
      url: 'createPlayList',
      token,
      navigation,
      selected: addetItems_to_playlist,
    });
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <Loader loading={loading} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: hp(5), marginLeft: '15%'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{height: hp(5), width: wp(100)}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              marginHorizontal: '17%',
              color: 'white',
            }}>
            Save your Playlist
          </Text>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={openImagePicker}>
          <View
            style={{
              height: hp(30),
              width: wp(50),
              backgroundColor: '#B72658',
              borderRadius: 20,
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '10%',
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
            <Text
              style={{color: 'white', fontSize: 30, fontFamily: fonts.regular}}>
              Upload File
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>My Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={'#fff'}
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
              placeholderTextColor={'#fff'}
              value={description}
              onChangeText={handleDescriptionChange}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        <View style={{alignSelf: 'center', margin: hp(5)}}>
          <Buttun
            title={'Create'}
            style={{
              height: hp(6.7),
              width: wp(75),
            }}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
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
    fontFamily: fonts.bold,
  },
  input: {
    backgroundColor: '#4A4949',
    //backgroundColor: '#',
    fontFamily: fonts.regular,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.4,
    // elevation: 4,
    // shadowColor: 'grey',
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    color: 'white',
    // fontWeight: '500',
    fontFamily: fonts.bold,
  },
});
