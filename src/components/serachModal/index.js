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
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {BackHandler} from 'react-native';
import {ScrollView} from 'react-native';
import storage from '../../utils/StorageService';
import thisdata from './this';
import Loader from '../Loader';
import LinearGradient from 'react-native-linear-gradient';
const SearchModal = ({visible, onClose, onCategories}) => {
  const dispatch = useDispatch();
  const {searchData, Createfavriote, loading} = useSelector(
    state => state.home,
  );
  const [value, setValue] = useState('');
  const [searchType, setSearchType] = useState('All');
  const handleonSearch = async (input, stype) => {
    console.log('thid', input);
    const items = await storage.getMultipleItems([
      storage.TOKEN,
      storage.USER_ID,
    ]);
    const token = items.find(([key]) => key === storage.TOKEN)?.[1];
    const user = items.find(([key]) => key === storage.USER_ID)?.[1];
    dispatch({
      type: 'home/search_request',
      url: 'playListSearch',
      search_text: input,
      search_type: stype,
      user_id: user,
      token,
    });
  };
  useEffect(() => {
    const delay = 500;
    const deBounce = setTimeout(() => {
      handleonSearch(value, searchType);
    }, delay);
    return () => {
      clearTimeout(deBounce);
    };
  }, [value, Createfavriote]);

  return (
    <Modal animationType="fade" visible={visible}>
      <View style={{flex: 1, backgroundColor: '#191919'}}>
        <Loader loading={loading} />
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
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setSearchType('All');
              handleonSearch(value, 'All');
            }}
            style={[
              styles.btn,
              {backgroundColor: searchType == 'All' ? '#D485D1' : 'white'},
            ]}>
            {searchType == 'All' ? (
              <LinearGradient
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.8}}
                locations={[0, 1]}
                colors={['#D485D1', '#B72658']}
              />
            ) : null}

            <Fontisto
              color={searchType == 'All' ? 'white' : 'black'}
              name="star"
              size={18}
            />
            <Text
              style={[
                styles.text,
                {color: searchType == 'All' ? 'white' : 'black'},
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setSearchType('playlist');
              handleonSearch(value, 'playlist');
            }}
            style={[
              styles.btn,
              {backgroundColor: searchType == 'playlist' ? '#D485D1' : 'white'},
            ]}>
            {searchType == 'playlist' ? (
              <LinearGradient
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.8}}
                locations={[0, 1]}
                colors={['#D485D1', '#B72658']}
              />
            ) : null}
            <SimpleLineIcons
              color={searchType == 'playlist' ? 'white' : 'black'}
              name="playlist"
              size={18}
            />
            <Text
              style={[
                styles.text,
                {color: searchType == 'playlist' ? 'white' : 'black'},
              ]}>
              PlayList
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setSearchType('affirmation');
              handleonSearch(value, 'affirmation');
            }}
            style={[
              styles.btn,
              {
                backgroundColor:
                  searchType == 'affirmation' ? '#D485D1' : 'white',
              },
            ]}>
            {searchType == 'affirmation' ? (
              <LinearGradient
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.8}}
                locations={[0, 1]}
                colors={['#D485D1', '#B72658']}
              />
            ) : null}
            <FontAwesome
              color={searchType == 'affirmation' ? 'white' : 'black'}
              name="buysellads"
              size={18}
            />
            <Text
              style={[
                styles.text,
                {color: searchType == 'affirmation' ? 'white' : 'black'},
              ]}>
              Affirmations
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Array.isArray(searchData?.categories) &&
          searchData?.categories.length > 0 ? (
            <>
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
              <List
                onPress={item => onCategories(item)}
                cate={searchData?.categories}
                onPressPlay={onCategories}
              />
            </>
          ) : null}
          {Array.isArray(searchData?.affirmations) &&
          searchData.affirmations.length > 0 ? (
            <>
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
                data={searchData.affirmations}
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
                      style={{
                        justifyContent: 'center',
                        marginHorizontal: '10%',
                      }}>
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
            </>
          ) : null}
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
