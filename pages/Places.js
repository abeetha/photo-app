import { View, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, TouchableHighlight, Animated, SafeAreaView, } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
// import Hyperlink from 'react-native-hyperlink'
import { TextInput, Text, Button, FAB, IconButton, MD3Colors } from 'react-native-paper';
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import mime from 'mime';
import ImagePicker from 'react-native-image-crop-picker';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { assets } from '../react-native.config';
import Home from './Home';
import '../common/url';

export default function Places({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [selectImages, setSelectImages] = useState('');
    const [search, setSearch] = useState('');
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);

    const [isModalVisible1, setModalVisible1] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [list, setList] = useState('');
    const [list1, setList1] = useState('');
    const [list2, setList2] = useState('');
    const [list3, setList3] = useState('');
    const [list4, setList4] = useState('');
    const [details, setDetails] = useState('');
    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onSelectImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true
        }).then(images => {
            // console.log(images);
            const array = [];

            images.forEach((val) => {

                const newImageUri = "file:///" + val.path.split("file:/").join("");
                // console.log("file:///" + val.path)
                array.push({
                    uri: val.path,
                    type: mime.getType(val.path),
                    name: val.path.split("/").pop()
                })
            })
            // console.log(array)
            setSelectImages(array);
        });
    };

    const saveData = () => {
        try {
            fetch(`${baseUrl}/api/place/save_place`, {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    description: description,
                    location: location
                }),
                headers: {
                    'Content-type': 'application/json',
                },
            })
                // .then((response) => response.json())
                // .then((json) => console.log(json));
                .then(res => res.json())
                .then(res => {
                    const imageData = new FormData()
                    for (let i = 0; i < selectImages.length; i++) {
                        imageData.append("image", selectImages[i])
                    }
                    // imageData.append("image", selectImages)
                    // console.log(imageData);
                    console.log(res.insertId);
                    console.log(imageData);
                    fetch(`${baseUrl}/api/place/upload_array/` + res.insertId,
                        {
                            body: imageData,
                            method: "POST",
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }
                        }).then(res => res.json())
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
        } catch (error) {
            console.error('Error saving note:', error);
        }
    }
    // useEffect(() => {
    //     loadData();
    // }, [])
    // const loadData = () => {
    //     fetch(`${baseUrl}/api/place/get_place`)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json[0]),
    //                 setData(json);
    //         })
    // }
    useEffect(() => {
        searchPlace();
        return () => {

        }
    }, [])
    const searchPlace = () => {
        fetch(`${baseUrl}/api/place/get_place`)
            .then((response) => response.json())
            .then((json) => {
                setfilterdData(json);
                setmasterData(json);
            }).catch((error) => {
                console.error(error);
            })
    }
    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase()
                    : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setSearch(text);
        } else {
            setfilterdData(masterData);
            setSearch(text);
        }
    }
    const renderLeftActions = (progress, list) => {
        return (
            <View style={styles.flatListContainer1}>
                {/* <TouchableOpacity
              style={{ top: 7, width: 100, height: 175, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 30 }}>Delete</Text> */}
                <IconButton
                    icon="delete"
                    iconColor={MD3Colors.error50}
                    size={50}
                    onPress={() => { setModalVisible2(true); setDetails(list); setList1(list.title); setList2(list.description); setList3(list.latitude); setList4(list.longitude); }}
                />
                {/* </TouchableOpacity> */}
            </View>
        );
    };

    const renderRightActions = (progress, list) => {
        return (
            <View style={styles.flatListContainer1}>
                {/* <TouchableOpacity
              style={{ top: 7, width: 100, height: 175, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
              <Text style={{ fontSize: 30 }}>Update</Text> */}
                <IconButton
                    icon="update"
                    iconColor={MD3Colors.error50}
                    size={50}
                    onPress={() => { setModalVisible1(true); setDetails(list); setList1(list.title); setList2(list.description); setList3(list.latitude); setList4(list.longitude); }}
                />
                {/* </TouchableOpacity> */}

            </View>
        );
    };

    const ItemView = ({ item }) => {
        return (
            // <Text style={styles.itemStyle}>
            //     {item.id}{'. '}{item.title.toUpperCase()}{'. '}
            //     {item.description.toUpperCase()}{'. '}{item.latitude.toUpperCase()}
            // </Text>
            <Swipeable renderLeftActions={(progress) => renderLeftActions(progress, item)} renderRightActions={(progress) => renderRightActions(progress, item)}>
                <View>
                    <TouchableOpacity style={styles.flatListContainer} onPress={() => navigation.navigate('Map', item)}>
                        <Text style={{ fontSize: 30, marginBottom: 5 }}>{item.title}</Text>
                        <Text style={{ fontSize: 30, marginBottom: 5 }}>{item.description}</Text>
                        {/* <Text style={{ fontSize: 40, marginBottom: 5 }}>{item.latitude}</Text>
                <Text style={{ fontSize: 40, marginBottom: 5 }}>{item.longitude}</Text> */}

                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: `${baseUrl}/images/` + item.imagename,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </Swipeable>
        )
    }

    return (

        <View style={styles.container}>
            <TextInput
                label="Search"
                style={styles.textInputStyle}
                value={search}
                onChangeText={(text) => searchFilter(text)}
            />
            <FlatList
                data={filterdData}
                keyExtractor={(item, index) => index.toString()}
                //   ItemSeparatorComponent={ItemSeperatorView}
                renderItem={ItemView}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                // onPress={() => { setModalVisible(true); }}
                onPress={toggleModal}
            // onPress={() => console.log('hi')}
            />
            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={toggleModal} />
                <Modal isVisible={isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 10, padding: 10, borderRadius: 2, flex: 1 }}>
                                {/* <Text style={{ fontSize: 20 }}>Modal Text</Text> */}
                                <TextInput placeholder="Title" value={title} onChangeText={(val) => { setTitle(val) }}
                                    style={styles.input} />
                                <TextInput placeholder="Description" value={description} onChangeText={(val) => { setDescription(val) }}
                                    style={styles.input} />
                                <TextInput placeholder="latitude" value={latitude} onChangeText={(val) => { setLatitude(val) }}
                                    style={styles.input} />
                                <TextInput placeholder="longitude" value={longitude} onChangeText={(val) => { setLongitude(val) }}
                                    style={styles.input} />
                                <TouchableOpacity
                                    style={styles.button}
                                // onPress={loadData}
                                >
                                    <FlatList
                                        data={selectImages}
                                        renderItem={({ item }) => {
                                            return (
                                                <View>
                                                    {/* <Text>
                                                            {item.uri}
                                                        </Text> */}
                                                    <Image style={{ height: 50, width: 100, margin: 5 }}
                                                        source={{ uri: item.uri }}
                                                    />
                                                </View>
                                            )
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </TouchableOpacity>
                                {/* <TextInput value={location} onChangeText={(val) => { setLocation(val) }}
                                    style={styles.input} /> */}
                                <View>
                                    {/* <Text>React Native Image Upload Demo</Text> */}
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { setModalVisible(false); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { onSelectImage(); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Open Gallery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { saveData(); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Save Data</Text>
                                    </TouchableOpacity>
                                    <Image
                                        source={{
                                            uri: `${baseUrl}/image_1692528435141.jpg`,
                                        }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={toggleModal1} />
                <Modal isVisible={isModalVisible1}>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 10, padding: 10, borderRadius: 2, flex: 1 }}>
                                <TextInput value={list1} onChangeText={(val) => { setTitle(val) }}
                                    style={styles.input} />
                                <TextInput value={list2} onChangeText={(val) => { setDescription(val) }}
                                    style={styles.input} />
                                <TextInput value={list3} onChangeText={(val) => { setLatitude(val) }}
                                    style={styles.input} />
                                <TextInput value={list4} onChangeText={(val) => { setLongitude(val) }}
                                    style={styles.input} />

                                <Image
                                    style={styles.tinyLogo1}
                                    source={{
                                        uri: 'http://192.168.8.100:3000/images/' + details.imagename,
                                    }}
                                />
                                <View>
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { setModalVisible1(false); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { onSelectImage(); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Open Gallery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { saveData(); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Update Data</Text>
                                    </TouchableOpacity>
                                    <Image
                                        source={{
                                            uri: `${baseUrl}/image_1692528435141.jpg`,
                                        }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>
            </View>
            <View style={{ flex: 1 }}>
                <Button title="Show modal" onPress={toggleModal2} />
                <Modal isVisible={isModalVisible2}>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                            <View style={{ backgroundColor: "#ffffff", margin: 10, padding: 10, borderRadius: 2, flex: 1 }}>
                             
                            <TextInput value={list1} onChangeText={(val) => { setTitle(val) }}
                                    style={styles.input} />
                                <TextInput value={list2} onChangeText={(val) => { setDescription(val) }}
                                    style={styles.input} />
                                <TextInput value={list3} onChangeText={(val) => { setLatitude(val) }}
                                    style={styles.input} />
                                <TextInput value={list4} onChangeText={(val) => { setLongitude(val) }}
                                    style={styles.input} />

                                <Image
                                    style={styles.tinyLogo1}
                                    source={{
                                        uri: 'http://192.168.8.100:3000/images/' + details.imagename,
                                    }}
                                />
                                <View>
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { setModalVisible2(false); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Cancel</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        style={styles. flatListContainer}
                                        onPress={() => { onSelectImage(); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Open Gallery</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={styles.flatListContainer}
                                        onPress={() => { deleteData(); }}
                                    >
                                        <Text style={{ fontSize: 22, height: 25, }}>Delete Data</Text>
                                    </TouchableOpacity>
                                    <Image
                                        source={{
                                            uri: `${baseUrl}/image_1692528435141.jpg`,
                                        }}
                                        style={{ width: 300, height: 300 }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkgreen'
    },
    fab: {
        position: 'absolute',
        width: 70,
        // margin: 16,
        right: 5,
        top: 650,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    flatListContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 30,
        borderRadius: 10
    },
    flatListContainer1: {
        backgroundColor: "white",
        marginVertical: 10,
        width: 100,
        marginHorizontal: 16,
        paddingBottom: 32,
        borderColor: 'black',
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    tinyLogo: {
        display: 'flex',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },
    tinyLogo1: {
        width: 100,
        height: 100,
        left: 110
    },
    textInputStyle: {
        height: 60,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 15
    }
})