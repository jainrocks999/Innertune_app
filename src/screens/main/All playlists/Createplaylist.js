import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../components/atoms/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Img = [
  {
    id: '1',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../../assets/music.jpg'),
    title: 'Lorem Ipsum is simply dummy text of the  ',
    title2: '90 affirmations',
  },
];
const Createplaylist = () => {
  const navigation = useNavigation();
  // const [text, setText] = useState('');
  // const handleClear = () => {
  //   setText;
  //   onChangeText;
  // };
  return (
    <View style={{flex: 1, backgroundColor: '#191919'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: hp(5), marginLeft: '15%'}}>
          <Icon
            onPress={() =>
              navigation.reset({index: 0, routes: [{name: 'Home'}]})
            }
            name="arrow-back"
            size={30}
            color="white"
          />
        </View>
        <View style={{height: hp(5), width: wp(100)}}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: '600',
              marginHorizontal: '15%',
              fontFamily: 'Montserrat-SemiBold',
              color: 'white',
            }}>
            Create Your Playlist
          </Text>
        </View>
      </View>
      {/* <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="grey"
          value={text}
          onChangeText={value => {
            setText(value);
            onChangeText(value);
          }}
        />
        {text.length > 0 && (
          <AntDesign
            name="close"
            size={20}
            color="gray"
            onPress={handleClear}
          />
        )}
      </View> */}
      <ScrollView style={{marginTop: 20}}>
        <FlatList
          data={Img}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  height: hp(8),
                  width: wp(90),
                  marginVertical: 10,
                  backgroundColor: 'black',
                  borderRadius: 20,
                }}>
                <View
                  style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                  <Text style={styles.text}>{item.title}</Text>
                </View>
                <View
                  style={{justifyContent: 'center', marginHorizontal: '10%'}}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color="white"
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          margin: hp(2),
        }}>
        <TouchableOpacity
          style={{
            height: 45,
            marginLeft: 20,
            backgroundColor: '#426e56',
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(70),
            borderRadius: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('createaffirmation');
          }}>
          <Text style={styles.loginText}>Added affirmations</Text>
          <Text style={styles.loginText}>1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Createplaylist;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: 30,
    paddingHorizontal: 10,

    elevation: 5,
    width: wp(70),
    height: hp(5),
  },
  text: {
    width: wp(50),
    fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
    color: 'white',
    fontSize: hp(1.8),
  },
  input: {
    marginLeft: 10,
    width: wp(50),
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
    marginHorizontal: 10,
  },
});
