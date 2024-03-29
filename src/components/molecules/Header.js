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
        backgroundColor: 'white',
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{height: hp(7), width: wp(13), marginRight: 25}}
      />
      <View style={styles.searchContainer}>
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
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    elevation: 5,
    width: wp(70),
    height: hp(5),
  },
  input: {
    marginLeft: 10,
    width: wp(50),
  },
});
export default Header;
