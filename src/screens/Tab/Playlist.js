import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Playlist = () => {
  return (
    <View style={{flex:1, justifyContent:'center', backgroundColor:'white'}}>
    <View style={{ alignItems:'center'}}>
      <Text style={{ fontSize:20, color :'black'}}> No item</Text>
    </View>
    </View>
  )
}

export default Playlist

const styles = StyleSheet.create({})