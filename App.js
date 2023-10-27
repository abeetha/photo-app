import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Places from './pages/Places';
import Welcome from './pages/Welcome';
import Screen1 from './pages/Screen1';
import Screen2 from './pages/Screen2';
import Map from './pages/Map';
import { enableLatestRenderer } from 'react-native-maps';

enableLatestRenderer();

import DrawerNav from './pages/DrawerNav';
DrawerNav
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
                <Stack.Screen name="Places" component={Places} options={{ headerShown: false }} />
                <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
                <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}