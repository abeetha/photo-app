import { View, Text,Button } from 'react-native'
import React from 'react'

export default function Screen2({ route, navigation }) {
    const { title,body } = route.params;
    console.log(JSON.stringify(title));
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(title)}</Text>
            <Text>otherParam: {JSON.stringify(body)}</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Screen1')} />
        </View>
    );
}