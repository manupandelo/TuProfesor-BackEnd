import React from "react";
import {View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, seguridadPassword}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={value=>setValue(value)}
            placeholder={placeholder}
            secureTextEntry={seguridadPassword}
            style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        width: '100%',
        borderColor: 'blue',
        borderRadius: 5, //lo curva del borde
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {

    }
})

export default CustomInput;