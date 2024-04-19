import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
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
  const {loading, playlist, groups, category} = useSelector(
    state => state.home,
  );

  const getAllCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/playlist_request',
      token,
      url: 'playListItem',
      playlist_id: 1,
    });
    dispatch({
      type: 'home/group_fetch_request',
      token,
      url: 'groups',
      user_id: 1,
    });
    dispatch({
      type: 'home/category_fetch_request',
      token,
      url: 'categories',
      user_id: '1',
    });
  };
  const test = async () => {
    const token = await AsyncStorage.getItem('token');
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  const getAffetMations = async (item) => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/affirmation_fetch_request',
      token,
      user_id: '1',
      navigation,
      url: 'affirmation',
      item
    });
  };
 
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <Header />
      <Loader loading={loading} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Just for You</Text>
          <View style={{paddingHorizontal: '20%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Popular');
              }}>
              <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Horizontal
          data={category}
          onPress={() => {
            getAffetMations();
          }}
        /> */}
        <View style={styles.card}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 5, y: 0.0}}
            locations={[0, 0.5, 0.3]}
            colors={['#191919', '#89FFBF']}
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

        <FlatList
          data={groups}
          renderItem={({item, index}) => (
            <>
              <View style={styles.FeatureContainer}>
                <Text style={styles.Featurecategory}>{item?.group_name}</Text>
                <View style={{paddingHorizontal: '20%'}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Popular');
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '900',
                        color: 'white',
                      }}>
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Horizontal
                onPress={(items) => {
                  getAffetMations(items);
                }}
                data={category}
              />
              {index == 1 ? (
                <View style={styles.card}>
                  <LinearGradient
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 5, y: 0.0}}
                    locations={[0, 0.5, 0.3]}
                    colors={['#191919', '#89FFBF']}
                    style={styles.linearGradient}>
                    <Image
                      source={require('../../assets/music1.jpg')}
                      style={{
                        height: hp(13),
                        width: wp(25),
                        borderRadius: 20,
                      }}
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
              ) : null}
            </>
          )}
        />
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
    height: hp(6.5),
  },
  Featurecategory: {
    fontSize: wp(5),
    width: wp(60),
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color: 'white',
    paddingHorizontal: 10,
  },
  scrollView: {
    backgroundColor: '#191919',
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
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#bb98ed',
    marginBottom: 20,
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 20,
  },

  text: {
    width: wp(50),
    marginLeft: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  text2: {
    width: wp(50),
    marginLeft: 5,
    color: 'black',
    fontSize: 15,
    fontWeight: '300',
  },
});

export default HomeScreen;
