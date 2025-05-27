import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Modal2 from '../../../components/molecules/Modal2';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Buttun from '../../Auth/compoents/Buttun';
import { fonts } from '../../../Context/Conctants';
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

const Remindmodal2 = ({ onPress }) => {
  // const [selectedDay, setSelectedDay] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  // const handleSelectedDay = items => {
  //   // Alert.alert('i am here')
  //   console.log(items.id);
  //   if (selectedDay.includes(items.id)) {
  //     // Alert.alert('i am here')
  //     let filter = [...selectedDay].filter((item, index) => item != items.id);
  //     console.log(filter);
  //     setSelectedDay(filter);
  //   } else {
  //     setSelectedDay([...selectedDay, items.id]);
  //   }
  // };
  const handleDaySelection = (dayId) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(dayId)
        ? prevSelected.filter((id) => id !== dayId) 
        : [...prevSelected, dayId] 
    );
  };
  const [currentTime1, setCurrentTime1] = useState('9:00');
  const [currentTime2, setCurrentTime2] = useState('9:00');
  const updateTime1 = increment => {
    let [hour, minute] = currentTime1.split(':');
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

    setCurrentTime1(hour + ':' + minute);
  };
  const updateTime2 = increment => {
    let [hour, minute] = currentTime2.split(':');
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

    setCurrentTime2(hour + ':' + minute);
  };
  const [reapeat, setRepeat] = useState(7);
  return (
    <View style={{ flex: 1, backgroundColor: '#191919' }}>
      <View style={{ height: '2%' }} />
      <Text
        style={{
          alignSelf: 'center',
          color: 'white',
          fontSize: wp(6),
          fontWeight: 'bold',
          fontFamily: fonts.bold,
        }}>
        Affirmations
      </Text>
      <View style={{ height: '2%' }} />
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.sec_container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => {
              if (reapeat != 0) {
                setRepeat(reapeat - 1);
              } else {
                setRepeat(30);
              }
            }}
            style={styles.cicrcle}>
            <Entypo name="minus" style={styles.icon} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(11),
              marginTop: '-5%',
              fontFamily: fonts.medium,
            }}>
            {reapeat}X
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (reapeat != 30) {
                setRepeat(reapeat + 1);
              } else {
                setRepeat(0);
              }
            }}
            style={styles.cicrcle}>
            <Entypo name="plus" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#eee',
            marginTop: '3%',
            fontSize: wp(5),
            fontFamily: fonts.medium,
          }}>
          How many
        </Text>
      </View>
      <View style={{ height: '2%' }} />
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.playlisttime}>
        <Text style={styles.txt2}>Select the playlist</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txt2}>Genral </Text>
          <Feather
            name="chevron-right"
            style={[styles.txt2, { fontSize: wp(6.5), marginTop: '5%' }]}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '5%',
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.playlisttime}>
        <Text style={styles.txt2}>Start at</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => updateTime1(false)}
            style={styles.cicrcle2}>
            <Entypo name="minus" style={styles.icon2} />
          </TouchableOpacity>
          <Text
            style={{ color: 'white', fontSize: wp(4), fontFamily: fonts.medium }}>
            {currentTime1}
          </Text>
          <TouchableOpacity
            onPress={() => updateTime1(true)}
            style={styles.cicrcle2}>
            <Entypo name="plus" style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '5%',
        }}
      />
      <View style={{ height: '2%' }} />
      <View style={styles.playlisttime}>
        <Text style={styles.txt2}>Finish at</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => updateTime2(false)}
            style={styles.cicrcle2}>
            <Entypo name="minus" style={styles.icon2} />
          </TouchableOpacity>
          <Text
            style={{ color: 'white', fontSize: wp(4), fontFamily: fonts.medium }}>
            {currentTime2}
          </Text>
          <TouchableOpacity
            onPress={() => updateTime2(true)}
            style={styles.cicrcle2}>
            <Entypo name="plus" style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: '#333',
          alignSelf: 'center',
          borderWidth: 0.5,
          marginTop: '5%',
        }}
      />
      <View style={{ height: '0%' }} />
      <View
        style={{
          marginTop: hp(2),
          alignItems: 'center',
        }}>
        <Text style={styles.txt2}>Repeat</Text>
        <View
          style={{
            marginTop: '2%',
            borderColor: 'white',
            height: hp(7),
          }}>
          <FlatList
            data={Img}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedDays.includes(item.id); // Check if selected

              return (
                <TouchableOpacity
                  onPress={() => handleDaySelection(item.id)}
                  style={[
                    styles.listCircle,
                    { backgroundColor: isSelected ? "#B72658" : "#fff" } // Selected: Pink, Unselected: White
                  ]}
                >
                  <Text
                    style={{
                      alignSelf:'center',
                      marginLeft: wp(1),
                      color: isSelected ? "#fff" : "#B72658", // Selected text: White, Unselected: Pink
                      fontWeight: "500",
                      fontFamily: fonts.bold,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          {/* <FlatList
            data={Img}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.listCircle}>
                <Text
                  style={{
                    marginLeft: '5%',
                    color: '#B72658',
                    fontWeight: '500',
                    fontFamily: fonts.bold,
                  }}>
                  {item.title}
                </Text>
              </View>
            )}
          /> */}
        </View>
      </View>
      <View style={{ height: '2%' }} />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            width: '65%',
            fontFamily: fonts.medium,
          }}>
          Remind yourself on selected Affirmations
        </Text>
      </View>
      <View style={{ height: '1%' }} />
      <Buttun
        style={{
          alignSelf: 'center',
          height: hp(7),
          width: '60%',
          borderRadius: wp(2),
          elevation: 4,
        }}
        onPress={onPress}
        title="Create"
      />
    </View>
  );
};

export default Remindmodal2;

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
  sec_container: {
    backgroundColor: '#121212',
    height: '22%',

    width: '90%',
    alignSelf: 'center',
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cicrcle: {
    height: hp(4.5),
    width: hp(4.5),
    backgroundColor: '#fff',
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cicrcle2: {
    height: hp(4),
    width: hp(4),
    backgroundColor: '#fff',
    borderRadius: hp(2.75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#B72658',
    fontSize: wp(4),
    textAlign: 'center',
    // marginTop: '-5%',
  },
  icon2: {
    color: '#B72658',
    fontSize: wp(3.5),
    textAlign: 'center',
    // marginTop: '-5%',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '47%',
    justifyContent: 'space-between',
    marginTop: '0%',
    alignItems: 'center',
  },
  playlisttime: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '85%',
    alignSelf: 'center',
  },
  txt2: {
    color: 'white',
    fontSize: wp(4.5),
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: fonts.medium,
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
