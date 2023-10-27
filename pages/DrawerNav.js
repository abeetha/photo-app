import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import Login from './Login'
import About from './About'
import Home from './Home'
import Places from './Places'
import Map from './Map'
import { Text, Button } from 'react-native-paper';
import { red } from 'react-native-reanimated';
const Drawer = createDrawerNavigator();


export default function DrawerNav({ navigation }) {
    return (
        <Drawer.Navigator drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Home');
                    }} style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 100, width: '80%', marginTop: '220%', marginLeft: '3%' }}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                </DrawerContentScrollView>
            )
        }}
        >
            <Drawer.Screen name="Places" component={Places} />
            <Drawer.Screen name="Map" component={Map} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    )
}

