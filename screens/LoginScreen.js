import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { auth } from '../firebase'



const LoginScreen = ({navigation} ) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe
    }, []);

    const signIn = () => {
auth.signInWithEmailAndPassword(email, password)
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <View style={styles.inputContainer}>
                <Input 
                placeholder="Email" 
                autoFocus type="email" 
                value={email} 
                onChangeText={(text) => setEmail(text)} />
                <Input 
                placeholder="Password" 
                secureTextEntry 
                type="password" 
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}


                />
            </View>

            <Button containerStyle={styles.button}  
            onPress={signIn}
            title="Login"/>
            <Button containerStyle={styles.button} 
            onPress={() => navigation.navigate("Register")}
            type="outline" title="Register"/>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
