import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState, Component } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ route, navigation }) {
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const [loader, setLoader] = useState(false);
    const [marker, setMarker] = useState([]);
    const item = route.params;
    // console.log(parseFloat(item.latitude));
    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        fetch(`${baseUrl}/api/place/get_place`)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json),
                setLoader(true);
                // setLatitude(json[0].latitude);
                // setLongitude(json[0].longitude);
                setMarker(json);
            })
    }
    return (
        <SafeAreaView>
            {loader ?
                <MapView
                    style={styles.map}
                    key={item.id}
                    initialRegion={{
                        // latitude: 7.499,
                        // latitude: parseFloat(item.description),
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {
                        marker.map((item,index) => {
                            return (
                                <Marker key={index} coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }} title="rrrr" description="hjgf">
                                    <View>
                                        <Image style={{ height: 50, width: 50 }}
                                            source={require('../assets/icons/icons8-marker-50.png')}
                                        />
                                    </View>
                                </Marker>
                            )
                        })
                    }
                </MapView>
                 :
                 <Text>Loading</Text>
            }
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    map: {
        height: '100%'
    }
})