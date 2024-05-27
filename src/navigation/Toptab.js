import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import All from '../screens/Tab/All';

import Playlist from '../screens/Tab/Playlist';
import Byme from '../screens/Tab/Byme';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../components/atoms/responsive';
import {TouchableOpacity} from 'react-native';
const data = [
  {id: '1', title: 'All'},
  {id: '2', title: 'Playlist'},
  {id: '3', title: 'By me'},
];
const Toptab = () => {
  const [selectedTab, setSelectedTab] = useState('All'); // Initial selection is 'All'

  const handleTabPress = title => {
    setSelectedTab(title);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginHorizontal: hp(3), marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: hp(3),
            color: 'black',
            marginVertical: 10,
          }}>
          My Library
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          alignItems: 'center',
          borderBottomWidth: 1,
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
                  height: hp(6),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    selectedTab === item.title ? '#9E8CD5' : '#DEDEDE',
                  borderRadius: 10,
                  marginHorizontal: hp(1),
                  marginVertical: 20,
                  paddingHorizontal: hp(4),
                }}>
                <Text
                  style={{
                    color: selectedTab === item.title ? 'white' : 'black',
                    fontSize: 18,
                    fontWeight: '400',
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedTab == 'All' ? <All /> : ''}
      {selectedTab == 'Playlist' ? <Playlist /> : ''}
      {selectedTab == 'By me' ? <Byme /> : ''}
    </View>
  );
};

export default Toptab;
