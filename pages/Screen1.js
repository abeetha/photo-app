import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { FlatList } from 'react-native-gesture-handler';

export default function Screen1({ navigation }) {
    const [reviews, setReviews] = useState([
        { title: 'Zelda', rating: 5 },
        { title: 'Gotta', rating: 4 },
        { title: 'Not So', rating: 3 },
    ]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <FlatList
                data={reviews}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Screen2', item)}>
                        <Text >{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}