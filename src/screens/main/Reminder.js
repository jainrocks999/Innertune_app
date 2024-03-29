import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import Modal2 from '../../components/molecules/Modal2';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
const data = [
  {id: '1', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
  {id: '2', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
  {id: '3', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
];
const data2 = [
  {id: '1', titles: 'Remindermodal1'},
  {id: '2', titles: 'Remindmodal2'},
  {id: '3', titles: 'Remindmodal3'},
  {id: '4', titles: 'Remindmodal4'},
  {id: '5', titles: 'Remindmodal5'},
];
const Reminder = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggle = isOn => {
    setIsSwitchOn(isOn);
    console.log('changed to:', isOn);
  };

  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();

  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };
  console.log('thiss vidzxc', visible);
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
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="black"
          />
        </View>
        <View style={{height: hp(5), width: wp(100)}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              marginHorizontal: '17%',

              color: 'black',
            }}>
            Set your reminders
          </Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 40}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                height: hp(10),
                width: wp(90),
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: '#F2F2F2',
                borderRadius: 30,
                marginVertical: 10,
                padding: '6%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '10%',
                }}>
                <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                  {item.title}
                </Text>
                <Text style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
                  {item.time}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '10%',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'black', fontSize: 15, fontWeight: '300'}}>
                  {item.frequency}
                </Text>
                <ToggleSwitch
                  isOn={isSwitchOn}
                  onColor="#7357CB"
                  offColor="#434343"
                  size="small"
                  onToggle={handleToggle}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View style={{alignSelf: 'center', marginBottom: hp(25)}}>
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
          onPress={() => handleModalPress('Remindermodal1')}>
          <Text style={styles.loginText}>Add New Reminder</Text>
        </TouchableOpacity>
      </View>
      <Modal2
        title={selectedModal}
        onClose={() => setVisible(false)}
        visible={visible}
      />
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
});
