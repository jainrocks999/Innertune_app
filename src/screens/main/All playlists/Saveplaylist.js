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
import React, {useEffect, useState} from 'react';

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
import storage from '../../../utils/StorageService';
import Toast from 'react-native-simple-toast';
let launchImageLibrary = _launchImageLibrary;

const Saveplaylist = ({route}) => {
  const {isEdit} = route.params;
  const {loading, item, addetItems_to_playlist} = useSelector(
    state => state.home,
  );
  const editedItem = item.item ?? false;
  const navigation = useNavigation();
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (isEdit) {
      setPlaylistName(editedItem.title);
      setDescription(editedItem.description);
    } else {
      setPlaylistName('');
      setDescription('');
    }
  }, []);
  const handlePlaylistNameChange = text => {
    setPlaylistName(text);
  };
  const handleDescriptionChange = text => {
    setDescription(text);
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (playlistName == '') {
      Toast.show('Please Enter Playlist Name');
      return;
    }
    if (description == '') {
      Toast.show('Please Enter Description');
      return;
    }
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    if (!isEdit) {
      dispatch({
        type: 'home/createPlayList_request',
        description: description,
        title: playlistName,
        user_id: user,
        url: 'createPlayList',
        token,
        navigation,
        selected: addetItems_to_playlist,
        image: selectedImage,
      });
    } else {
      dispatch({
        type: 'home/createPlayList_request',
        description: description,
        title: playlistName,
        user_id: user,
        playlist_id: item.item.id,
        url: 'updatePlayList',
        token,
        navigation,
        selected: [],
      });
    }
  };
  const [selectedImage, setSelectedImage] = useState({
    name: '',
    type: '',
    uri: '',
  });

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('user cancled the selecting of image');
      } else {
        let mainRes = res.assets[0];
        setSelectedImage({
          name: mainRes.fileName,
          type: mainRes.type,
          uri: mainRes.uri,
        });
      }
    });
  };
  console.log(selectedImage);

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
              fontSize: wp(5),
              fontWeight: '600',
              marginHorizontal: '10%',
              // fontFamily: fonts.bold,

              color: 'white',
            }}>
            Save your Playlist
          </Text>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity
          disabled={selectedImage.uri != ''}
          onPress={openImagePicker}>
          <View
            style={{
              height: hp(28),
              width: hp(28),
              backgroundColor: '#B72658',
              borderRadius: 20,
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '10%',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            {selectedImage.uri == '' ? (
              <>
                <Image
                  source={require('../../../assets/playlist.png')}
                  style={{
                    height: '40%',
                    width: '40%',
                    borderRadius: 20,
                    tintColor: 'white',
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginTop: '5%',
                    fontSize: wp(5),
                    color: '#fff',
                    fontWeight: '700',
                  }}>
                  Select Image +
                </Text>
              </>
            ) : (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: selectedImage.uri}}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Playlist Name</Text>
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
        <View style={{alignSelf: 'center', margin: hp(5)}}>
          <Buttun
            title={'Create'}
            style={{
              height: hp(6.7),
              width: wp(50),
              elevation: 4,
              shadowColor: '#fff',
            }}
            onPress={handleSubmit}
            textStyle={{
              fontSize: wp(5),
            }}
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
    backgroundColor: 'rgba(97, 95, 95,0.3)',
    fontFamily: fonts.regular,
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 0.4,
    fontSize: wp(4.5),

    // elevation: 4,
    // shadowColor: 'grey',
  },
  label: {
    marginBottom: 2,
    fontSize: wp(4.5),
    color: 'white',
    fontWeight: '500',
    fontFamily: fonts.bold,
  },
});
