import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import {fonts} from '../../Context/Conctants';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../Loader';
import {useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
const data = [
  {
    id: '1',
    text: 'Listen Playlist',
    icon: 'play',
  },
  {
    id: '2',
    text: 'Edit',
    icon: 'pencil',
  },
  {
    id: '3',
    text: 'Delete Playlist',
    icon: 'delete',
  },
];

const Playlist_Menu = ({
  visible,
  image,
  item,
  onClose,
  onPressEdit,
  onPressListen,
  onPressDelete,
  loading,
}) => {
  const parentItem = item;
  const {fromLibrary} = useSelector(state => state.home);

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={{flex: 1}}>
        <BlurView
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          blurType="dark"
          blurAmount={15}
          reducedTransparencyFallbackColor="grey"
        />
        <Loader loading={loading} />
        <View style={{height: '20%'}} />
        {(item && item != 'fav') || fromLibrary.liked ? (
          <View style={styles.card}>
            <View
              style={{
                height: hp(9),
                width: hp(9),
                backgroundColor: !image?.uri ? '#fff' : null,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wp(2),
                overflow: 'hidden',
              }}>
              <Image
                tintColor={!image?.uri ? '#B72658' : null}
                source={image}
                style={{height: '100%', width: '100%'}}
                resizeMode="stretch"
              />
            </View>
            <View style={{paddingBottom: '5%', marginLeft: '2%'}}>
              <Text style={[styles.title]}>
                {item.title ?? 'Liked affirmations'}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: wp(3.5),
                    color: 'grey',
                    fontWeight: '400',
                    marginTop: '13%',
                  },
                ]}>
                {item?.description?.substring(0, 20) ?? 'Liked by you'}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{paddingLeft: wp(5), paddingTop: hp(4)}}>
          <FlatList
            data={fromLibrary.liked ? data.slice(0, 1) : data}
            keyExtractor={item => item.id}
            contentContainerStyle={{alignSelf: 'right', marginLeft: wp(8)}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.id == '1') {
                      onPressListen(parentItem);
                    } else if (item.id == '2') {
                      onPressEdit(parentItem);
                    } else if (item.id == '3') {
                      onPressDelete(parentItem);
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: '3%',
                  }}>
                  {index == 0 || index == 2 ? (
                    <AntDesign color={'white'} size={wp(6)} name={item.icon} />
                  ) : (
                    <Entypo color="white" size={wp(6)} name={item.icon} />
                  )}

                  <Text
                    style={{
                      color: 'white',
                      fontSize: wp(4),
                      marginLeft: '5%',
                      fontFamily: fonts.medium,
                    }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Text
            style={{
              color: '#fff',
              fontSize: wp(6),
              fontFamily: fonts.medium,
              // fontWeight: 'bol000d',
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Playlist_Menu;

const styles = StyleSheet.create({
  card: {
    // borderWidth: 0.2,
    borderRadius: wp(2),
    paddingHorizontal: hp(1),
    paddingVertical: hp(0.5),
    width: '80%',
    alignSelf: 'center',
    // paddingVertical: wp(1),
    paddingLeft: wp(1),
    // backgroundColor: '#4A4949',
    backgroundColor: 'rgba(22, 21, 26,1)',
    elevation: 10,
    shadowColor: '#fff',
    borderColor: 'lightgrey',

    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(4.5),
    marginLeft: wp(3),
    fontWeight: 'bold',
    color: '#fff',
  },
  close: {
    bottom: hp(20),
    position: 'absolute',
    alignSelf: 'center',
  },
});
