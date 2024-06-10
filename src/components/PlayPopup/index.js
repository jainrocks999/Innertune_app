import {React, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import CircularProgress from 'react-native-circular-progress-indicator';
import {MusicPlayerContext} from '../../Context/MusicPlayerConstaxt';
import {fonts} from '../../Context/Conctants';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
const PlayPopup = () => {
  const {
    progress,
    affirmations,
    handlePlayPauseClick,
    isPaused,
    setProgress,
    getNameImage,
    setOnMainPage,
    PlayerLoading,
  } = useContext(MusicPlayerContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setOnMainPage(false);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: hp(8.5),
        backgroundColor: 'rgba(25,25,25,0.1)',
        borderTopStartRadius: wp(6),
        borderTopEndRadius: wp(6),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // elevation: 3,
        // shadowColor: '#fff',
        borderWidth: 0.5,
        borderBottomWidth: 0,
        borderColor: 'lightgrey',
        overflow: 'hidden',
        width: '103%',
        marginLeft: '-1%',
      }}>
      <BlurView
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
        blurType="light"
        blurAmount={8}
        reducedTransparencyFallbackColor="#191919"
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setOnMainPage(false);
          navigation.navigate('playsong');
        }}
        style={{marginLeft: '5%', flexDirection: 'row', marginTop: '2%'}}>
        <View style={{elevation: 2, shadowColor: '#fff'}}>
          <Image
            style={{
              justifyContent: 'center',
              height: wp(10),
              width: wp(10),
              marginBottom: '2%',
              borderRadius: wp(10),
            }}
            //
            source={{
              uri: getNameImage().image,
            }}
          />
        </View>
        <View style={{marginLeft: '5%'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(3.7),
              fontWeight: fonts.bold,
            }}>
            {getNameImage().name}
            {/* Billionaire Mindset */}
          </Text>
          <Text style={{color: '#fff', fontSize: wp(2.1)}}>
            {getNameImage().title}
            {/* by stimuli */}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePlayPauseClick()}
        style={{
          justifyContent: 'center',
          alignSelf: 'flex-end',
          alignItems: 'center',
          marginBottom: '2%',
          marginRight: '5%',
        }}>
        {!PlayerLoading ? (
          <Image
            source={
              isPaused
                ? require('../../assets/flaticon/play.png')
                : require('../../assets/flaticon/pause.png')
            }
            style={{
              height: hp(1.8),
              width: hp(1.8),
              tintColor: !isPaused ? '#ccc' : '#ccc',
              position: 'absolute',
              zIndex: 0,
            }}
          />
        ) : (
          <ActivityIndicator style={{position: 'absolute'}} color={'#B72658'} />
        )}
        <CircularProgress
          value={progress}
          radius={hp(2.8)}
          duration={200}
          progressValueColor={'#ecf0f1'}
          maxValue={100}
          inActiveStrokeColor="#ccc"
          showProgressValue={false}
          activeStrokeWidth={wp(0.4)}
          inActiveStrokeWidth={wp(0.4)}
          activeStrokeColor="#B72658"
        />
      </TouchableOpacity>
    </View>
  );
};
export default PlayPopup;
