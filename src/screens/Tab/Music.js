import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import Focus from './Focus';
import Relax from './Relax';
import Sleep from './Sleep';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {fonts} from '../../Context/Conctants';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {id: '1', title: 'Focus'},
  {id: '2', title: 'Relax'},
  {id: '3', title: 'Sleep'},
];

const Music = ({
  playBackondSound,
  backgroundSound,
  bgVolume,
  handleOnBackgroundSoundVolume,
}) => {
  const [selectedTab, setSelectedTab] = useState('Focus');
  const {loading, bgSound, bgcategories} = useSelector(state => state.home);
  // console.log('thisis', JSON.stringify(bgSound));

  const handleTabPress = title => {
    setSelectedTab(title);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <Loader loading={loading} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: '500',
            color: 'white',
            fontFamily: fonts.bold,
          }}>
          Background Music
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          justifyContent: 'center',
          marginTop: hp(2),

          alignItems: 'center',
          borderBottomWidth: 1,
        }}>
        <FlatList
          data={bgcategories}
          horizontal={true}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                height: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  selectedTab === item.bg_name ? '#D485D1' : '#DEDEDE',
                borderRadius: 10,
                marginHorizontal: hp(1),
                marginVertical: 20,
                paddingHorizontal: hp(4),
                overflow: 'hidden',
                elevation: 5,
                shadowColor: '#fff',
              }}
              onPress={() => handleTabPress(item.bg_name)}>
              {selectedTab === item.bg_name ? (
                <LinearGradient
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 0.8}}
                  locations={[0, 1]}
                  colors={['#D485D1', '#B72658']}
                />
              ) : null}
              <Text
                style={{
                  color: selectedTab === item.bg_name ? 'white' : 'black',
                  fontSize: wp(4.2),
                  fontWeight: '400',
                  fontFamily: fonts.bold,
                }}>
                {item.bg_name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Relax
        onPress={playBackondSound}
        backgroundSound={backgroundSound}
        data={bgSound}
      />
      <LinearGradient
        start={{x: 0.3, y: 0}}
        end={{x: 0.3, y: 1}}
        locations={[-3, 0.7, 1]}
        colors={[
          'rgba(0, 0, 0, 0)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(0, 0, 0, 0.9)',
        ]}
        style={{
          // backgroundColor: 'rgba(0,0,0,0.5)',
          height: hp(8),
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
          borderColor: '#fff',
          // borderWidth: 1,
          width: '100%',
        }}></LinearGradient>
      <View
        style={{
          height: hp(15),
          // backgroundColor: 'rgba(97, 95, 95,0.3)', //#4A4949
          borderTopEndRadius: 30,
          overflow: 'hidden',
          borderTopStartRadius: 30,
          shadowColor: 'white',
          shadowOpacity: 1,
          marginBottom: hp(8),
          // elevation: 1,
          // borderWidth: 0.7,
          // borderBottomWidth: 0,
          // borderTopColor: 'lightgrey',
          width: '105%',
          marginLeft: '-2%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            margin: hp(2),
            width: '100%',
            justifyContent: 'space-between',
            paddingRight: '12%',
          }}>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: '500',
              color: '#fff',
              fontFamily: fonts.medium,
            }}>
            Background Volume
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: '500',
              color: '#fff',
              fontFamily: fonts.medium,
            }}>
            {(bgVolume * 100).toFixed(0) + '%'}
          </Text>
        </View>
        <View
          style={{
            marginTop: hp(1),

            alignItems: 'center',
          }}>
          <Slider
            style={{width: '90%', height: 20}}
            minimumValue={0}
            maximumValue={1}
            value={bgVolume}
            minimumTrackTintColor="white"
            maximumTrackTintColor="white"
            thumbTintColor="white"
            onValueChange={value => {
              handleOnBackgroundSoundVolume(value);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Music;
const styles = StyleSheet.create({
  imageContainerrr: {
    width: hp(20),
    height: hp(15),
    borderRadius: 20,
    marginVertical: hp(3),
    // borderWidth: 1,
    // borderColor: 'black',
    // backgroundColor: 'black',
  },
  imageee: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  texttt: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
});
