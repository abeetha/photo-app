import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Login({ navigation }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // console.log(username + " " + password);
    const login = () => {
        fetch(`${baseUrl}/api/login/get_user`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
                // username: 'a',
                // password: '1',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((json) => {
                // console.log('=========', json);
                if (json == "Login Success") {
                    // navigation.navigate('List');
                    navigation.navigate('DrawerNav');
                }
                else {
                    Alert.alert('Login Failed', 'Your username or password is incorrect.');
                }
            });
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: 'darkgreen' }}>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginVertical: 10 }}>Login</Text>
            </View>
            <View style={{ flex: 4, alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 55 }}>
                <Text style={{ color: 'darkgreen', fontSize: 40, fontWeight: 'bold', marginVertical: 10, marginTop: 40 }}>Welcome Back</Text>
                <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20, marginTop: 40 }}>Login to your Account</Text>
                <TextInput onChangeText={(val) => {
                    setUserName(val)
                }}
                    style={{ borderRadius: 100, color: 'green', paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220,220)', marginBottom: 20 }} placeholder="Email / Username" keyboardType={"email-address"} />
                <TextInput onChangeText={(val) => {
                    setPassword(val)
                }}
                    style={{ borderRadius: 100, color: 'green', paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220,220)' }} placeholder="Password" secureTextEntry={true} />
                <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16 }}>
                    <Text style={{ color: 'darkgreen', fontWeight: 'bold', fontSize: 16 }}>
                        Forgot Password ?
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <TouchableOpacity style={{
                    justifyContent: 'center', width: '90%',
                    backgroundColor: 'darkgreen', height: 50, top: 40, borderRadius: 10
                }}
                    /*onPress={() => navigation.navigate("DrawerNav")}*/
                    onPress={() => { login(); }}>
                    <Text style={{
                        fontSize: 20, letterSpacing: 1.5,
                        textAlign: 'center', position: 'relative', fontFamily: 'OpenSans-SemiBold', color: 'white'
                    }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "darkgreen", fontWeight: "bold", fontSize: 16 }}>Signup</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}