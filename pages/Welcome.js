import { View, Text,Image } from 'react-native'
import React from 'react'

export default function Welcome({ navigation }) {
  setTimeout(() => {
    navigation.replace('Home')
  },5000)
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#04FC5A' }}>
      <Image source={require('../assets/icons/icons8-photo-100.png')} style={{ width: 150, height: 150 }} />
      {/* <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 25, color: 'white' }}>Student Management System</Text> */}
    </View>
  )
}