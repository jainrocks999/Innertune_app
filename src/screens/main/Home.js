import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Header from '../../components/molecules/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Horizontal from '../../components/Home/Horizontal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'Believe in yourself',
    title2: '90 affirmations',
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {loading, playlist} = useSelector(state => state.home);
  const getAllCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/playlist_request',
      payload: token,
      url: 'playListItem',
    });
    dispatch({
      type: 'home/group_fetch_request',
      payload: token,
      url: 'groups',
    });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <Loader loading={loading} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Just for You</Text>
          <View style={{paddingHorizontal: '30%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Popular');
              }}>
              <Text style={{fontSize: 15, fontWeight: '700', color: 'grey'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <FlatList
          horizontal={true}
          data={Img}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('playsong');
                }}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: hp(-2.5),
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Popular');
                  }}>
                  <Icon name="heart" size={20} color="#434343" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text2}>{item.title2}</Text>
            </View>
          )}
        /> */}
        <Horizontal data={playlist} />

        <View style={styles.card}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 5, y: 0.0}}
            locations={[0, 0.15, 0.36]}
            colors={['#A89AD5', '#7153CD']}
            style={styles.linearGradient}>
            <Image
              source={require('../../assets/music1.jpg')}
              style={{height: hp(13), width: wp(25), borderRadius: 20}}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                width: wp(50),
                marginHorizontal: '5%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                }}>
                Share Innertunes with your loved...
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Popular Playlist</Text>
          <View style={{paddingHorizontal: '30%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Popular');
              }}>
              <Text style={{fontSize: 15, fontWeight: '900', color: 'grey'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          horizontal={true}
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: hp(-2.5),
                  marginRight: 10,
                }}>
                <Icon name="heart" size={20} color="#434343" />
              </View>
              <Text style={styles.text2}>{item.title2}</Text>
            </View>
          )}
        />
        <View style={styles.card}>
          <Image
            source={require('../../assets/music1.jpg')}
            style={{height: hp(13), width: wp(25), borderRadius: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              width: wp(50),
              marginHorizontal: '5%',
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>
              Share Innertunes with your loved...
            </Text>
          </View>
        </View>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Popular Playlist</Text>
          <View style={{paddingHorizontal: '30%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Popular');
              }}>
              <Text style={{fontSize: 15, fontWeight: '900', color: 'grey'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          horizontal={true}
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: hp(-2.5),
                  marginRight: 10,
                }}>
                <Icon name="heart" size={20} color="#434343" />
              </View>
              <Text style={styles.text2}>{item.title2}</Text>
            </View>
          )}
        />
        <View style={styles.card}>
          <Image
            source={require('../../assets/music1.jpg')}
            style={{height: hp(13), width: wp(25), borderRadius: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              width: wp(50),
              marginHorizontal: '5%',
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>
              Share Innertunes with your loved...
            </Text>
          </View>
        </View>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Popular Playlist</Text>
          <View style={{paddingHorizontal: '30%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Popular');
              }}>
              <Text style={{fontSize: 15, fontWeight: '900', color: 'grey'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          horizontal={true}
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: hp(-2.5),
                  marginRight: 10,
                }}>
                <Icon name="heart" size={20} color="#434343" />
              </View>
              <Text style={styles.text2}>{item.title2}</Text>
            </View>
          )}
        />
        <View style={styles.card}>
          <Image
            source={require('../../assets/music1.jpg')}
            style={{height: hp(13), width: wp(25), borderRadius: 20}}
          />
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              width: wp(50),
              marginHorizontal: '5%',
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>
              Share Innertunes with your loved...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: hp(5),
    width: wp(10),
  },
  FeatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: wp(100),
    height: hp(7),
  },
  Featurecategory: {
    fontSize: wp(5),
    width: wp(50),
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color: 'black',
    paddingHorizontal: 10,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  imageContainer: {
    padding: 15,
  },
  image: {
    width: hp(32),
    height: hp(18),
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  card: {
    height: hp(13),
    width: wp(90),
    borderColor: 'black',
    alignSelf: 'center',
    margin: '5%',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#bb98ed',
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },

  text: {
    width: wp(50),
    marginTop: 10,
    marginLeft: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  text2: {
    width: wp(50),
    marginTop: 4,
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
});

export default HomeScreen;
