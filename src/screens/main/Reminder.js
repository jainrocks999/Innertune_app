import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
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
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../Context/Conctants';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import storage from '../../utils/StorageService';
import Remindmodal4 from './Reminder/Remindmodal4';
import Buttun from '../Auth/compoents/Buttun';
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
  const Modelclose = useSelector(state => state.home.Modelclose);
  const selector = useSelector(state => state.home.RememberList);
  const loading = useSelector(state => state.home.loading);
  console.log('selectror get data updater data .... ');
  const dispatch = useDispatch();
  useEffect(() => {
    Apicall();
  }, []);

  const Apicall = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/reminderList_request',
      url: 'reminderList',
      user_id: user,
      token,
      // Modelclose:!Modelclose,
    });
  };

  const days = {
    mon: 'M',
    tues: 'T',
    wed: 'W',
    thurs: 'T',
    fri: 'F',
    sat: 'S',
    sun: 'S',
  };

  const handleToggle = async itemId => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    const newSelectedDay = Object.keys(itemId).filter(key => itemId[key] === 1);

    let obj = {};
    for (const key in days) {
      obj = {...obj, [key]: newSelectedDay.includes(key) ? '1' : '0'};
    }

    const r_status = itemId.r_status == '1' ? '0' : '1';
    dispatch({
      type: 'home/createReminder1_request',
      url: 'createReminder',
      user_id: user,
      days: obj,
      start_at: itemId.start_at,
      token,
      reminder_id: itemId.id,
      r_status: r_status,
      Modelclose: !Modelclose,
    });
  };
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [selectedModal, setSelectedModal] = useState();
  const [selectedToggles, setSelectedToggles] = useState({});
  const handleModalPress = titles => {
    setSelectedModal(titles);
    setVisible(true);
  };

  const Deletereminder = async item => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    console.log('logsjsjsnsnfs', item);
    dispatch({
      type: 'home/reminderDelete_request',
      url: 'reminderDelete',
      user_id: user,
      reminder_id: item.id,
      token: token,
      Modelclose: !Modelclose,
    });
  };
  useEffect(() => {
    setVisible(false);
    setSelectedModal('');
  }, [Modelclose]);

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
              fontFamily: fonts.bold,
            }}>
            Set your reminders
          </Text>
        </View>
      </View>

      <Loader loading={loading} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 10}}
        style={{marginTop: 10}}>
        <FlatList
          data={selector ?? []}
          pagingEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleModalPress('Remindmodal4');
                setValue(item);
              }}
              onLongPress={() =>
                Alert.alert(
                  'Logout',
                  'Are you sure you want to delete?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: async () => {
                        Deletereminder(item);
                      },
                      style: 'destructive',
                    },
                  ],
                  {cancelable: true},
                )
              }>
              <View
                style={{
                  height: hp(13),
                  width: wp(90),
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#4A4949',
                  borderRadius: wp(2),
                  marginVertical: 10,
                  padding: '0%',
                  // alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '8%',
                    marginTop: '3%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: '500',
                      fontFamily: fonts.bold,
                    }}>
                    {'Daily Practice'}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: '400',
                      fontFamily: fonts.medium,
                    }}>
                    {item.start_at}
                  </Text>
                </View>
                <View style={styles.mainContainer}>
                  <View style={styles.daysContainer}>
                    {Object.keys(days).map(
                      day =>
                        item[day] === 1 && (
                          <View key={day} style={styles.dayCircle}>
                            <Text style={styles.dayText}>{days[day]}</Text>
                          </View>
                        ),
                    )}
                  </View>
                  <ToggleSwitch
                    isOn={item.r_status == '1'}
                    onColor="#DEDEDE"
                    circleColor={item.r_status == '1' ? '#B72658' : '#191919'}
                    offColor="#DEDEDE"
                    size="medium"
                    onToggle={() => handleToggle(item)}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <View style={{alignSelf: 'center', bottom: hp(1)}}>
        {/* <TouchableOpacity
          style={{
            height: hp(6.5),
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(90),
            overflow: 'hidden',
            borderRadius: 8,
          }}
          onPress={() => handleModalPress('Remindermodal1')}>
          <LinearGradient
            style={{
              height: '100%',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // start={{x: 0.0, y: 0.0}}
            // end={{x: 5, y: 0.0}}
            // locations={[0, 0.4, 0.2]}
            // colors={['#B72658', '#D485D1']}
            start={{x: 1.4, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0, 1]}
            colors={['#D485D1', '#B72658']}>
            <Text style={styles.loginText}>Add New Reminder</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        <Buttun
          title={'Add New Reminder'}
          style={{
            width: '60%',
            position: 'absolute',
            bottom: hp(4),
            alignSelf: 'center',
            height: hp(6),
          }}
        />
      </View>
      <Modal2
        title={selectedModal}
        onClose={() => setVisible(false)}
        visible={visible}
        value={value}
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
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '7%',
    marginVertical: 10,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 5,
  },
  dayText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'medium',
  },
});
