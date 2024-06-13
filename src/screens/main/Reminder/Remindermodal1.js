import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
import {fonts} from '../../../Context/Conctants';
import {BlurView} from '@react-native-community/blur';
const Remindermodal1 = ({onPress}) => {
  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();

  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };
  console.log('thiss vidzxc', visible);
  return (
    <View style={{flex: 1, borderWidth: 1, borderColor: 'grey'}}>
      <BlurView
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
        blurType="dark"
        blurAmount={15}
        reducedTransparencyFallbackColor="grey"
      />
      <View style={styles.bottomSheetContent}>
        {/* <TouchableOpacity
          onPress={() => {
            handleModalPress('Remindmodal2');
          }}>
          <View style={styles.card}>
            <LinearGradient
              start={{x: 1.4, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0, 1]}
              colors={['#D485D1', '#B72658']}
              style={styles.linearGradient}>
              <Image
                source={require('../../../assets/music.jpg')}
                style={{height: hp(15), width: wp(30), borderRadius: 20}}
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
                    fontFamily: fonts.bold,
                  }}>
                  Affirmations Notifications
                </Text>
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            handleModalPress('Remindmodal3');
          }}>
          <View style={styles.card}>
            <ImageBackground
              // start={{x: 1.4, y: 0}}
              // end={{x: 0, y: 1}}
              // locations={[0, 1]}
              // colors={['#D485D1', '#B72658']}
              source={require('../../../assets/sparkle_Images/3634321.jpg')}
              style={[styles.linearGradient, {opacity: 0.8}]}>
              <Image
                source={require('../../../assets/music.jpg')}
                style={{height: hp(15), width: wp(30), borderRadius: 20}}
              />
              <View
                style={{
                  flexDirection: 'column',
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
                    fontFamily: fonts.bold,
                  }}>
                  Daily Practice Reminders
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
      <Modal2
        title={selectedModal}
        onClose={() => setVisible(false)}
        visible={visible}
        titles={selectedModal}
      />
    </View>
  );
};

export default Remindermodal1;

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    height: hp(13),
    width: wp(80),

    alignSelf: 'center',
    margin: '5%',
    flexDirection: 'row',
    borderRadius: 20,

    overflow: 'hidden',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },
});
