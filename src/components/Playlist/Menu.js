import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {widthPrecent as wp, heightPercent as hp} from '../atoms/responsive';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Menu = ({visible, selectedItem, onClose}) => {
  const data = [
    {
      id: '1',
      text: 'Like Affermaion',
      icon: 'hearto',
    },
    {
      id: '2',
      text: 'Add to Playlist',
      icon: 'pluscircleo',
    },
    {
      id: '3',
      text: 'Share',
      icon: 'share-alternative',
    },
    {
      id: '4',
      text: 'Hide',
      icon: 'minuscircleo',
    },
  ];
  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={{flex: 1, backgroundColor: '#191919', opacity: 0.99}}>
        <View style={{height: '25%'}} />
        <View style={styles.main}>
          <Text style={styles.txt}>{selectedItem.affirmation_text}</Text>
        </View>
        <View style={{height: '5%'}} />
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          contentContainerStyle={{alignSelf: 'right', marginLeft: wp(8)}}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: '5%',
                }}>
                {index != 2 ? (
                  <AntDesign color="white" size={wp(7)} name={item.icon} />
                ) : (
                  <Entypo color="white" size={wp(7)} name={item.icon} />
                )}

                <Text
                  style={{color: 'white', fontSize: wp(5), marginLeft: '5%'}}>
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Text style={{color: '#fff', fontSize: wp(6), fontWeight: 'bold'}}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  main: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#4A4949',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2.5),
    elevation: 5,
  },
  txt: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'left',
  },
  close: {
    bottom: hp(10),
    position: 'absolute',
    alignSelf: 'center',
  },
});
