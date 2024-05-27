import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Mymodal from '../../components/molecules/Modal';
import {useNavigation} from '@react-navigation/native';
const data = [
  {id: '1', title: 'Voice'},
  {id: '2', title: 'Time'},
  {id: '3', title: 'Music'},
];

const Playsong = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState();

  const handleTabPress = title => {
    // Alert.alert('thisis')
    setSelectedTab(title);
    setVisible(true);
  };
  console.log('thiss vid', visible);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/music.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={{backgroundColor: 'rgba(69, 71, 71,.8)', height: hp(100)}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{height: hp(5), marginLeft: '5%'}}>
              <Icon
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={30}
                color="white"
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => handleTabPress('Playlistdetails')}>
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    selectedTab === 'Playlistdetails' ? '#000000' : '#DEDEDE',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: wp(50),
                  marginHorizontal: '4%',
                }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontWeight: '600',
                    color: selectedTab === 'Playlistdetails' ? 'white' : 'black',
                  }}>
                  Playlist Details
                </Text>
              </View>
              <Image
                source={require('../../assets/music.jpg')}
                style={{height: hp(6), width: wp(12), borderRadius: 26}}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              marginTop: hp(2),
              marginHorizontal: hp(4),
              alignItems: 'flex-end',
            }}>
            <Feather
              name="heart"
              size={30}
              color="white"
              paddingVertical="5%"
            />
            <FontAwesome6
              name="repeat"
              size={30}
              color="white"
              paddingVertical="5%"
            />
            <Entypo
              name="dots-three-vertical"
              size={30}
              color="white"
              paddingVertical="5%"
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',

              flexDirection: 'column',
              height: hp(30),
              width: wp(70),
              position: 'absolute',
              marginTop: hp(30),
            }}>
            <Text style={{fontSize: hp(4), color: 'white'}}>
              I accept and Love My Imperfactions
            </Text>
          </View>
          <View
            style={{
              height: hp(20),

              justifyContent: 'center',

              alignSelf: 'center',
              marginTop: hp(20),
            }}>
            <Image
              source={require('../../assets/play-button.png')}
              style={{height: hp(10), width: wp(20), tintColor: 'white'}}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: hp(8),
              height: hp(7),
            }}>
            <FlatList
              data={data}
              horizontal={true}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleTabPress(item.title)}>
                  <View
                    style={{
                      width: hp(14),
                      height: hp(7),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor:
                        selectedTab === item.title ? '#000000' : '#DEDEDE',
                      borderRadius: hp(5),
                      marginHorizontal: hp(1),
                    }}>
                    <Text
                      style={{
                        color: selectedTab === item.title ? 'white' : 'black',
                        fontSize: hp(2.1),
                        fontWeight: '400',
                        marginHorizontal: hp(1.2),
                      }}>
                      {item.title}
                    </Text>
                    <Image
                      source={require('../../assets/music.jpg')}
                      style={{width: hp(7), height: hp(7), borderRadius: hp(7)}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <Mymodal
          title={selectedTab}
          onClose={() => setVisible(false)}
          visible={visible}
        />
      </ImageBackground>
    </View>
  );
};

export default Playsong;

const styles = StyleSheet.create({
  card: {
    height: hp(6),
    width: wp(67),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 26,
    backgroundColor: '#000000',
  },
});
