import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Ionicons } from "@expo/vector-icons"
import { db,auth } from '../firebase'
import firebase from 'firebase'



const ChatScreen = ( {navigation, route} ) => {
    
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            tittle: "chat",
            headerTitle: () => (
                <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                >
                    <Avatar rounded/>
                    <Text
                    style={{
                        color: 'white', marginLeft: 70, fontWeight: '800'
                    }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("")

    }

    useLayoutEffect(()=> {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'asc').
        onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))

        return unsubscribe
    }, [route])
    
    
    return (
        <View style={{ flex: 1, BackgroundColor: "white"}}>
            
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={90}
            >

                <>
                    <ScrollView contentContainerStyle={{paddingTop: 15}} >

                    {messages.map(({id, data}) => (
                        data.email === auth.currentUser.email ? (
                              <View key={id} style={styles.receiver}>
                                
                                <Text style={styles.receiverText}>{data.message}</Text>
                              </View>              
                        ) : (
                            <View style={styles.sender}>
                            
                            <Text style={styles.senderText}>{data.message}</Text>
                            {/* <Text style={styles.senderName}>{data.displayName}</Text> */}
                            </View>
                        )
                    ))}

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput value={input} onChangeText={(text) => setInput(text)}
                            placeholder="Chat Now!"
                            onSubmitEditing={sendMessage}
                            style={styles.textInput}
                        />

                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2B68E6" />
                        </TouchableOpacity>

                    </View>
                </>

            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    receiver:{
        padding: 15,
        backgroundColor: "grey",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    sender:{
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 12,
        color: 'white'
    },
    senderText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 10,
        marginBottom: 15,
    },
    receiverText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 10,
     
    },

    textInput:{

        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: 'transparent',
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },
    receiverText:{
        color: 'white',
        fontWeight: '300',
        
    },
    senderText:{
        color: 'white',
        fontWeight: '400',
        
    }
})
