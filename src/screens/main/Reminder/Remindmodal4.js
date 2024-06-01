import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
import Buttun from '../../Auth/compoents/Buttun';
import {fonts} from '../../../Context/Conctants';
import {useDispatch, useSelector} from 'react-redux';
import storage from '../../../utils/StorageService';
import Loader from '../../../components/Loader';
const Img = [
  {
    id: '1',

    title: 'M  ',
  },
  {
    id: '2',

    title: 'T ',
  },
  {
    id: '3',

    title: 'W ',
  },
  {
    id: '4',

    title: 'T ',
  },
  {
    id: '5',

    title: 'F  ',
  },
  {
    id: '6',

    title: 'S ',
  },
  {
    id: '7',

    title: 'S',
  },
];

const days = {
  mon: 'M',
  tues: 'T',
  wed: 'W',
  thurs: 'T',
  fri: 'F',
  sat: 'S',
  sun: 'S',
};

const Remindmodal4 = ({onPressClose, value}) => {
  const [selectedDay, setSelectedDay] = useState([]);
  const Modelclose = useSelector(state => state.home.Modelclose);
  const loading = useSelector(state => state.home.loading);
  console.log('update value get by selector .....', Modelclose);
  const dispatch = useDispatch();
  useEffect(() => {
    if (value) {
      const newSelectedDay = Object.keys(value).filter(key => value[key] === 1);
      setSelectedDay(newSelectedDay);
      console.log('Selected days:', newSelectedDay);
    }
  }, [value]);

  console.log('this is value', value, selectedDay);

  const createReminder1 = async () => {
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    let days = {
      mon: '0',
      tues: '0',
      wed: '0',
      thurs: '0',
      fri: '0',
      sat: '0',
      sun: '0',
    };
    if (selectedDay.length > 0) {
      selectedDay.map(item => {
        days[item] = '1';
      });
    } else {
      for (const day in days) {
        days[day] = '1';
      }
    }

    if (value == undefined) {
      dispatch({
        type: 'home/createReminder_request',
        url: 'createReminder',
        user_id: user,
        days,
        start_at: currentTime,
        token,
        Modelclose: !Modelclose,
      });
      console.log(days);
    } else {
      dispatch({
        type: 'home/createReminder1_request',
        url: 'createReminder',
        user_id: user,
        days,
        start_at: currentTime,
        token,
        reminder_id: value.id,
        r_status: value.r_status,
        Modelclose: !Modelclose,
      });
    }
  };
  const handleSelectedDay = items => {
    if (selectedDay.includes(items.id)) {
      const filter = [...selectedDay].filter((item, index) => item != items.id);
      console.log(filter);
      setSelectedDay(filter);
    } else {
      setSelectedDay([...selectedDay, items.id]);
    }
  };

  const [currentTime, setCurrentTime] = useState(
    value == undefined ? '9:00' : value.start_at?.substring(0, 5),
  );
  const [selected, setSelected] = useState([]);

  const onclick = items => {
    // console.log('item,,,,,,,,,,,', items);
    console.log(items);
    if (selectedDay.includes(items)) {
      const newarray = selectedDay.filter(id => id !== items);
      console.log(newarray);
      setSelectedDay(newarray);
    } else {
      setSelectedDay([...selectedDay, items]);
    }
  };

  const updateTime = increment => {
    let [hour, minute] = currentTime.split(':');
    hour = parseInt(hour);
    minute = parseInt(minute);

    if (increment) {
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour = (hour + 1) % 24;
      }
    } else {
      minute -= 30;
      if (minute < 0) {
        minute = 30;
        hour = (hour - 1 + 24) % 24;
      }
    }

    hour = (hour < 10 ? '0' : '') + hour;
    minute = (minute < 10 ? '0' : '') + minute;

    setCurrentTime(hour + ':' + minute);
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
          Daily Practice
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '3.3%',
        }}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '6%',
          paddingHorizontal: '5%',
          alignItems: 'center',
        }}>
        <Text
          style={{color: 'white', fontSize: wp(5), fontFamily: fonts.medium}}>
          When
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '55%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => updateTime(false)}
            style={styles.cicrcle}>
            <Entypo name="minus" style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={{color: 'white', fontSize: wp(6), fontFamily: fonts.medium}}>
            {currentTime}
          </Text>
          <TouchableOpacity
            onPress={() => updateTime(true)}
            style={styles.cicrcle}>
            <Entypo name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '6.3%',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '6%',
          paddingHorizontal: '4.8%',
        }}>
        <Text
          style={{color: 'white', fontSize: wp(5), fontFamily: fonts.medium}}>
          {' '}
          Repeat{' '}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: hp(2),
        }}>
        <FlatList
          data={Object.keys(days)}
          horizontal
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onclick(item)}
              style={[
                styles.listCircle,
                {
                  backgroundColor: selectedDay.includes(item)
                    ? '#ff78ac'
                    : '#fff',
                },
              ]}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: selectedDay.includes(item) ? '#fff' : '#B72658',
                  fontWeight: '500',
                  fontFamily: fonts.bold,
                }}>
                {item.substring(0, 1).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          bottom: hp(6),
          width: '100%',
          position: 'absolute',
        }}>
        {/* <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(60),
            borderRadius: 10,
          }}
          // onPress={() => {
          //   navigation.navigate('saveplaylist');
          // }}
        >
          <Text style={styles.loginText}>Close</Text>
        </TouchableOpacity> */}
        <Buttun
          style={{
            alignSelf: 'center',
            height: hp(7),
            width: '60%',
            borderRadius: wp(2),
            elevation: 4,
          }}
          onPress={() => createReminder1()}
          title={value == undefined ? 'Add' : 'Update'}
        />
        {value == undefined ? null : (
          <Buttun
            style={{
              alignSelf: 'center',
              height: hp(7),
              width: '60%',
              borderRadius: wp(2),
              elevation: 4,
            }}
            onPress={() =>
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
                      Deletereminder(value);
                    },
                    style: 'destructive',
                  },
                ],
                {cancelable: true},
              )
            }
            title={'Delete'}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Remindmodal4;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: hp(2),
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
  cicrcle: {
    height: hp(5.5),
    width: hp(5.5),
    backgroundColor: '#fff',
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#B72658',
    fontSize: wp(7),
    textAlign: 'center',
    // marginTop: '-5%',
  },
  listCircle: {
    height: hp(5.5),
    width: hp(5.5),
    backgroundColor: '#fff',
    marginHorizontal: wp(1),
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
