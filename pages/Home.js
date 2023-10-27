import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "darkgreen", }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 2, /*backgroundColor: "red",*/ }}>
          <Image style={styles.places_img} source={require('../assets/images/beautiful-shot.jpg')} />
        </View>
        <View style={{ flex: 2, /* backgroundColor: "green" */ }}>
          <Image style={styles.places1_img} source={require('../assets/images/landmark-forest.jpg')} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <Image style={styles.places2_img} source={require('../assets/images/beautiful-girl.jpg')} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image style={styles.places3_img} source={require('../assets/images/low-angle-shot.jpg')} />
        </View>
        <View style={{ flex: 1 }}>
          <Image style={styles.places4_img} source={require('../assets/images/low-angle-shot.jpg')} />
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: 'white', borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
        <View>
          <Text style={{
            fontFamily: 'OpenSans-Medium', justifyContent: 'center', left: 40,
            color: 'black', fontSize: 30, padding: 25
          }}>All Images One Place</Text>
        </View>
        <TouchableOpacity style={{
          justifyContent: 'center', width: '90%',
          backgroundColor: 'darkgreen', height: 50, top: 210, left: 20, marginBottom: 30, borderRadius: 10
        }}
          onPress={() => navigation.navigate("Login")}>
          <Text style={{
            fontSize: 15, letterSpacing: 1.5,
            textAlign: 'center', position: 'relative', fontFamily: 'OpenSans-SemiBold', color: 'white'
          }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  places_img: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 100,
    height: 100,
    marginLeft: 15,
    transform: [{ rotate: '-20deg' }],
  },
  places1_img: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    marginLeft: 15,
    transform: [{ rotate: '35deg' }],
  },
  places2_img: {
    position: 'absolute',
    top: 10,
    left: 130,
    width: 100,
    height: 100,
    marginLeft: 15,
  },
  places3_img: {
    position: 'absolute',
    top: 10,
    left: 30,
    width: 100,
    height: 100,
    marginLeft: 15,
    transform: [{ rotate: '35deg' }],
  },
  places4_img: {
    position: 'absolute',
    top: 10,
    left: 30,
    width: 100,
    height: 100,
    marginLeft: 15,
    transform: [{ rotate: '-20deg' }],
  }
})