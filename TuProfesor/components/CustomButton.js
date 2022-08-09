import React from "react";
import {View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({text}) => {

    return (
        <Pressable style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        width: '100',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center', //cambiar
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    }
})

export default CustomButton;