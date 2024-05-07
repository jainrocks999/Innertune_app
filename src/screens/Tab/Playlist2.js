import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/molecules/Header';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import Horizontal from '../../components/Home/Horizontal';
// import {affirmations} from '../main/affmatin';
import {Image} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {ScrollView} from 'react-native';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../components/Playlist/Menu';
import Buttun from '../Auth/compoents/Buttun';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];

const Playlistdetails = () => {
  const dispatch = useDispatch();
  const {favoriteList} = useSelector(state => state.home);
  console.log('tjhidi', favoriteList.favoritelist);
  const {loading, affirmations, groups, category, item} = useSelector(
    state => state.home,
  );
  const image =
    // item?.categories_image[0]?.original_url ??
    'https://img.freepik.com/free-photo/relaxed-woman-enjoying-sea_1098-1441.jpg';
  const title = item?.categories_name ?? 'Believe in yourself';
  const navigation = useNavigation();
  const HEADER_HEIGHT = 50;
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, hp(55));
  const translateY = diffClamp.interpolate({
    inputRange: [0, hp(55)],
    outputRange: [0, hp(-55)],
  });
  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );
  const [menuvisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(affirmations[0]);
  const onClose = () => {
    setMenuVisible(false);
  };
  return (
    <View style={styles.container}>
      <Menu
        onClose={onClose}
        selectedItem={selectedItem}
        visible={menuvisible}
      />
      <Loader loading={loading} />
      <View style={[styles.header]}>
        <View style={{height: '3%'}} />
        <View
          style={{
            height: '100%',
            width: '90%',
            alignSelf: 'center',
            borderRadius: wp(2),
            elevation: 5,
            overflow: 'hidden',
            shadowColor: 'rgba(255,255,255,.5)',
          }}>
          <LinearGradient
            start={{x: 0.3, y: 0}}
            end={{x: 0.3, y: 1}}
            locations={[-3, 0.7, 1]}
            colors={['rgba(0,0,0,1)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
            style={[styles.gradient, {top: 0}]}
          />
          <Entypo
            name="chevron-left"
            size={30}
            color={'white'}
            style={{position: 'absolute', zIndex: 8, margin: '4%'}}
          />
          <Text
            style={{
              position: 'absolute',
              zIndex: 7,
              color: 'white',
              top: '2%',
              fontSize: wp(7),
              fontWeight: '600',
              right: '5%',
            }}>
            {title}
          </Text>
          <Image
            source={require('../../assets/profilepic/plalist.png')}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <LinearGradient
            start={{x: 0.6, y: 0}}
            end={{x: 0.6, y: 1}}
            locations={[-3, 0.2, 1]}
            colors={[
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0.5)',
              'rgba(0, 0, 0, 1)',
            ]}
            style={[styles.gradient, {bottom: 0, height: '60%'}]}
          />
          <View
            style={{
              position: 'absolute',
              zIndex: 5,
              color: 'white',
              alignSelf: 'center',
              bottom: '18%',
              height: '8%',
              width: '50%',
              borderRadius: wp(1),
              elevation: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Buttun
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
                elevation: 3,
                shadowColor: '#fff',
              }}
              onPress={() => navigation.navigate('playsong')}
              title={'Play'}
              playlist
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '35%',
              position: 'absolute',
              zIndex: 5,
              alignSelf: 'center',
              bottom: '5%',
              justifyContent: 'space-between',
            }}>
            <Feather name="heart" size={25} color="white" />
            <Entypo name="share" size={25} color="white" />
            <Entypo
              onPress={() => {
                navigation.navigate('Menu');
              }}
              name="dots-three-vertical"
              size={25}
              color="white"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            position: 'absolute',
            zIndex: 5,
          }}></View>
      </View>
      <View style={{paddingTop: hp(4)}}>
        <FlatList
          data={affirmations}
          keyExtractor={item => item.id}
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
              <View style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                <Text style={styles.text}>
                  {item.affirmation_text.substring(0, 30)}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Entypo
                  onPress={() => {
                    setMenuVisible(true);
                    setSelectedItem(item);
                  }}
                  name="dots-three-horizontal"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Playlistdetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  header: {
    height: hp(68),
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
    // elevation: 4,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {marginTop: hp(23)},
  text: {
    width: wp(60),

    marginLeft: 5,
    color: 'white',
    fontSize: hp(2),
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    zIndex: 3,
    height: '40%',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
});
