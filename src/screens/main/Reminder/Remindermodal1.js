import { StyleSheet, Text, View,TouchableOpacity , Image} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../components/molecules/Modal2';
const Remindermodal1 = () => {
  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();
  const data2 = [
    {id: '1', titles: 'Remindermodal1'},
    {id: '2', titles: 'Remindmodal2'},
    {id: '3', titles: 'Remindmodal3'},
    {id: '4', titles: 'Remindmodal4'},
    {id: '5', titles: 'Remindmodal5'},
  ];
  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };
  console.log('thiss vidzxc', visible);
  return (
    <View style={{flex:1}}>
      <View style={styles.bottomSheetContent}>
          <TouchableOpacity
            onPress={() => {
              handleModalPress('Remindermodal1');
            }}
            >
            <View style={styles.card}>
              <Image
                source={require('../../../assets/music.jpg')}
                style={{height: hp(20), width: wp(30), borderRadius: 20}}
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
                Affirmations Notifications
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate('createplaylist');
            // }}
            >
            <View style={styles.card}>
              <LinearGradient
                start={{x: 0.0, y: 0.0}}
                end={{x: 5, y: 0.0}}
                locations={[0, 0.15, 0.36]}
                colors={['#A89AD5', '#7153CD']}
                style={styles.linearGradient}>
                <Image
                     source={require('../../../assets/music.jpg')}
                  style={{height: hp(20), width: wp(30), borderRadius: 20}}
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
                    }}>
               Daily Practice Reminders
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
        <Modal2
        title={selectedModal}
        onClose={() => setVisible(false)}
        visible={visible}
      />
    </View>
  )
}

export default Remindermodal1

const styles = StyleSheet.create({

  bottomSheetContent: {
    // Background color of the content within the bottom sheet
    padding: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20, // Add border radius to style the shape of the bottom sheet
    borderTopRightRadius: 20,
  },
  card: {
    height: hp(20),
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
})