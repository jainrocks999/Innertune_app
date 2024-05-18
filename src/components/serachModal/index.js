import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from './Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {widthPrecent as wp, heightPercent as hp} from '../atoms/responsive';
import {fonts} from '../../Context/Conctants';
import List from '../CategoriesList';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {BackHandler} from 'react-native';
import {ScrollView} from 'react-native';
const SearchModal = ({visible, onClose}) => {
  const {category, affirmations} = useSelector(state => state.home);
  const [value, setValue] = useState('');
  const handleonSearch = input => {
    console.log('thissisis');
  };
  useEffect(() => {
    const delay = 100;
    const deBounce = setTimeout(() => {
      handleonSearch();
    }, delay);
    return () => {
      clearTimeout(deBounce);
    };
  }, [value]);

  return (
    <Modal animationType="fade" visible={visible}>
      <View style={{flex: 1, backgroundColor: '#191919'}}>
        <Header
          onCLose={() => {
            onClose(false);
          }}
          onChangeText={val => setValue(val)}
          value={value}
        />

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignSelf: 'center',
            height: hp(6.6),
            marginTop: '2%',
            justifyContent: 'space-between',
            paddingHorizontal: '2%',
          }}>
          <TouchableOpacity style={styles.btn}>
            <Fontisto color="black" name="star" size={18} />
            <Text style={styles.text}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <SimpleLineIcons color="black" name="playlist" size={18} />
            <Text style={styles.text}>PlayList</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome color="black" name="buysellads" size={18} />
            <Text style={styles.text}>Affirmations</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text
            style={{
              fontFamily: fonts.bold, // fontFamily: 'Montserrat',
              fontSize: hp(2.5),
              color: 'white',
              marginVertical: 10,
              marginLeft: wp(2),
            }}>
            Playlist
          </Text>
          <List cate={category.slice(0, 3)} />
          <Text
            style={{
              fontFamily: fonts.bold, // fontFamily: 'Montserrat',
              fontSize: hp(2.5),
              color: 'white',
              marginVertical: 10,
              marginLeft: wp(2),
            }}>
            Affirmations
          </Text>
          <FlatList
            data={affirmations}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={{
              marginTop: '3%',
            }}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  height: hp(8),
                  width: wp(90),
                  marginVertical: 10,
                  backgroundColor: '#4A4949',
                  borderRadius: 8,
                }}>
               
                <View
                  style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                  <Text style={styles.text2}>
                    {item.affirmation_text.substring(0, 40)}
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Entypo
                    onPress={() => {}}
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: '89%',
    borderRadius: wp(1),
    elevation: 5,
    shadowColor: 'green',
  },
  text: {
    marginLeft: '2%',
    fontSize: wp(4),
    fontFamily: fonts.medium,
    color: 'black',
  },
  text2: {
    width: wp(60),
    marginLeft: 5,
    color: 'white',
    fontSize: hp(2.5),
    fontFamily: fonts.regular,
  },
});
