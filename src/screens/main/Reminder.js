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
  {id: '4', title: 'Daily Practice', time: '09:00', frequency: '1x Every Day'},
];
const data2 = [
  {id: '1', title: 'Affirmations', time: '09:00', frequency: '1x Every Day'},
  {id: '2', title: 'Affirmations', time: '09:00', frequency: '1x Every Day'},
  {id: '3', title: 'Affirmations', time: '09:00', frequency: '1x Every Day'},
];
const Reminder = () => {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleToggle = itemId => {
    setSelectedToggles(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };
  const [visible, setVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState();
  const [selectedToggles, setSelectedToggles] = useState({});
  const handleModalPress = titles => {
    // Alert.alert('thisis')
    setSelectedModal(titles);
    setVisible(true);
  };
  console.log('thiss vidzxc', visible);
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
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
            Set your reminders
          </Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 10}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleModalPress('Remindmodal4');
              }}>
              <View
                style={{
                  height: hp(10),
                  width: wp(90),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'black',
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
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '400'}}>
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
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '300'}}>
                    {item.frequency}
                  </Text>
                  <ToggleSwitch
                    isOn={selectedToggles[item.id]}
                    onColor="#426e56"
                    offColor="#434343"
                    size="small"
                    onToggle={() => handleToggle(item.id)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleModalPress('Remindmodal5');
              }}>
              <View
                style={{
                  height: hp(10),
                  width: wp(90),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'black',
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
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '400'}}>
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
                  <Text
                    style={{color: 'white', fontSize: 15, fontWeight: '300'}}>
                    {item.frequency}
                  </Text>
                  <ToggleSwitch
                    isOn={selectedToggles[item.id]}
                    onColor="#426e56"
                    offColor="#434343"
                    size="small"
                    onToggle={() => handleToggle(item.id)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <View style={{alignSelf: 'center', position: 'absolute', bottom: hp(8)}}>
        <TouchableOpacity
          style={{
            height: 45,
            backgroundColor: '#426e56',
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
        titles={selectedModal}
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
