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
    image: require('../../assets/profilepic/profile1.jpg'),
    title: 'Control Stress and Anxiety',
  },
  {
    id: '2',
    image: require('../../assets/profilepic/profile2.jpg'),
    title: 'Be a Better Friend',
  },
  {
    id: '3',
    image: require('../../assets/profilepic/profile3.jpg'),
    title: 'Liked affirmations',
  },
  {
    id: '4',
    image: require('../../assets/profilepic/profile4.jpg'),
    title: 'Billionaire Mindset',
  },
  {
    id: '5',
    image: require('../../assets/profilepic/profile5.jpg'),
    title: 'Manifest Wealth',
  },
  {
    id: '6',
    image: require('../../assets/profilepic/profile6.jpg'),
    title: 'Awaken Your Money Power',
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const getFavriote = item => {
    console.log(item);
  };
  const {loading, playlist, groups, category} = useSelector(
    state => state.home,
  );

  const getAllCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/playlist_request',
      token,
      url: 'playList',
      user_id: '1',
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
  const getAffetMations = async item => {
    const token = await AsyncStorage.getItem('token');
    dispatch({
      type: 'home/affirmation_fetch_request',
      token,
      user_id: '1',
      navigation,
      url: 'affirmation',
      item,
    });
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <Header
        onChangeText={text => {
          console.log(text);
        }}
      />
      <Loader loading={loading} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Last sessions</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <FlatList
            data={Img}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              // <TouchableOpacity>
              //   <View style={styles.carddd}>
              //     {/* <LinearGradient
              // start={{x: 0.0, y: 0.0}}
              // end={{x: 5, y: 0.0}}
              // locations={[0, 0.5, 0.3]}
              // colors={['#191919', '#89FFBF']}
              // style={styles.linearGradienttt}> */}
              //     <Image
              //       source={item.image}
              //       style={{height: hp(8), width: wp(16), borderRadius: 20}}
              //     />
              //     <View
              //       style={{
              //         flexDirection: 'column',
              //         alignSelf: 'center',
              //         width: wp(45),
              //         marginHorizontal: '5%',
              //       }}>
              //       <Text
              //         style={{
              //           fontSize: 13,
              //           width: wp(26),
              //           fontWeight: '400',
              //           fontFamily: 'Poppins-Medium',
              //           color: '#ffffff',
              //           backgroundColor: 'transparent',
              //         }}>
              //         {'item.title'}
              //       </Text>
              //     </View>
              //     {/* </LinearGradient> */}
              //   </View>
              // </TouchableOpacity>
              <View style={styles.lastSestionItem}>
                <Image
                  source={item.image}
                  style={{height: hp(8), width: hp(8), borderRadius: hp(4)}}
                />
                <Text
                  style={{
                    marginLeft: '5%',
                    fontWeight: '400',
                    fontFamily: 'Poppins-Medium',
                    color: '#ffffff',
                    width: '50%',
                  }}>
                  {item.title.substring(0, 17)}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.FeatureContainer}>
          <Text style={styles.Featurecategory}>Just For You</Text>
          <View style={{paddingHorizontal: '20%'}}>
            <TouchableOpacity
              onPress={() => {
                getFavriote(item);
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
        {/* <FlatList
          horizontal={true}
          data={Img}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.imageContainer}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/music.jpg')}
                    style={styles.image}
                  />
                  <Text style={styles.textttt}>Believe in yourself</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: hp(-2.5),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      getFavriote(item);
                    }}>
                    <Icon name="heart" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.text2}>{'90 affirmations'}</Text> 
              </View>
            );
          }}
        /> */}
        <Horizontal
          onPress={items => {
            getAffetMations(items);
          }}
          data={category}
        />
        {/* Light color  :-  #               
Dark color   :-  #B72658 */}

        <View style={styles.cardd}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 5, y: 0.0}}
            locations={[0, 0.3, 0.0]}
            colors={['#B72658', '#D485D1']}
            style={styles.linearGradientt}>
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
          <Text style={styles.Featurecategory}>Populer Playlist</Text>
          <View style={{paddingHorizontal: '20%'}}>
            <TouchableOpacity
              onPress={() => {
                getFavriote(item);
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
        {/* <FlatList
          horizontal={true}
          data={Img}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.imageContainer}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/music.jpg')}
                    style={styles.image}
                  />
                  <Text style={styles.textttt}>Believe in yourself</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: hp(-2.5),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      getFavriote(item);
                    }}>
                    <Icon name="heart" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.text2}>{'90 affirmations'}</Text> 
              </View>
            );
          }}
        /> */}
        <Horizontal
          onPress={items => {
            getAffetMations(items);
          }}
          data={category}
        />

        <FlatList
          data={groups}
          renderItem={({item, index}) => (
            <>
              <View style={styles.FeatureContainer}>
                <Text style={styles.Featurecategory}>{item?.group_name}</Text>
                <View style={{paddingHorizontal: '20%'}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Popular', {name: item?.group_name});
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
                onPress={items => {
                  getAffetMations(items);
                }}
                data={category}
              />
              {index == 1 ? (
                <View
                  style={{
                    width: wp(100),
                    justifyContent: 'space-around',
                    marginVertical: 10,
                  }}>
                  <View style={styles.card}>
                    <TouchableOpacity>
                      <LinearGradient
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 5, y: 0.0}}
                        locations={[0, 0.5, 0.3]}
                        colors={['#191919', '#89FFBF']}
                        style={styles.linearGradient}>
                        <Image
                          source={require('../../assets/review.jpg')}
                          style={{
                            height: hp(30),
                            width: wp(40),
                            borderRadius: 20,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            width: wp(35),
                            marginHorizontal: '5%',
                            bottom: hp(2),
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '600',
                              color: '#ffffff',
                              backgroundColor: 'transparent',
                            }}>
                            Leave us review...
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <LinearGradient
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 5, y: 0.0}}
                        locations={[0, 0.5, 0.3]}
                        colors={['#191919', '#89FFBF']}
                        style={styles.linearGradient}>
                        <Image
                          source={require('../../assets/music1.jpg')}
                          style={{
                            height: hp(30),
                            width: wp(40),
                            borderRadius: 20,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            width: wp(35),
                            marginHorizontal: '5%',
                            bottom: hp(2),
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
                    </TouchableOpacity>
                  </View>
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
  scrollView: {},
  imageContainer: {
    padding: 12,
  },
  image: {
    width: hp(30),
    height: hp(20),
    resizeMode: 'stretch',
    borderRadius: 20,
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
  textttt: {
    width: wp(60),
    marginTop: 10,
    marginLeft: 10,
    color: 'white',
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
  card: {
    height: hp(30),

    width: wp(40),
    borderColor: 'black',

    flexDirection: 'row',
    borderRadius: 20,
  },
  linearGradient: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  linearGradientt: {
    flexDirection: 'row',
    width: wp(90),
    borderRadius: 20,
  },
  linearGradienttt: {
    flexDirection: 'row',
    width: wp(45),
    borderRadius: 20,
  },
  cardd: {
    height: hp(13),
    width: wp(100),
    left: wp(4),
    marginVertical: hp(4),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    // backgroundColor: '#bb98ed',
    marginBottom: 20,
  },
  carddd: {
    height: hp(8),
    width: wp(45),
    borderColor: 'black',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 10,
  },
  lastSestionItem: {
    // paddingVertical: '1%',
    width: '46%',
    marginHorizontal: '2%',
    marginVertical: '2%',
    backgroundColor: 'black',
    borderRadius: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '2%',
  },
});

export default HomeScreen;
