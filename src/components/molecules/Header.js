import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TextInput} from 'react-native';
import {heightPercent as hp, widthPrecent as wp} from '../atoms/responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Header = ({placeholder, onChangeText}) => {
  const [text, setText] = useState('');
  const handleClear = () => {
    setText;
    onChangeText;
  };
  return (
    <View
      style={{
        height: hp(10),
        width: '100%',
        backgroundColor: '#191919',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{height: hp(7), width: wp(13), marginRight: 15,tintColor:'white'}}
      />
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="white" />
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
            color="grey"
            onPress={handleClear}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 50,
    borderWidth:.2,
    borderColor:'grey',
    paddingHorizontal: 10,
    width: wp(75),
    height: hp(5),
  },
  input: {
    marginLeft: 10,
    width: wp(50),
    color:'white'
  },
});
export default Header;
