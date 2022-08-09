import React from 'react';
import { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableHighlight, LogBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LogIn = () => {

    const navigation = useNavigation();

    const [_email, setUsuario] = useState('');
    const [_password, setContraseña] = useState('');

    const inicioSesionBoton = () => {
        console.log({_email,_password})

        fetch("http://localhost:3000/login?email="+_email+"&password="+_password,
        {method: 'GET',
        redirect: 'follow'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.msj == 'hola'){
                navigation.navigate('Home') //pasar params navigation: navigation.navigate('Detalelprofesor', {})
            }
        });
    }

    /*useEffect(() =>{
        axios.post("https://localhost:5000/users/LogIn", {
            usuario : _usuario,
            contrasena : _contrasena

        })
        .then(res => {
            console.log(res.status);
            setUsuario(res.data);
            setContraseña(res.data);
        })
    })
*/

    return (
        <View>
            <Text>Tu Profesor</Text>
            <CustomInput placeholder="Usuario" value={_email} setValue={setUsuario}/>
            <CustomInput placeholder="Contraseña" seguridadPassword={true} value={_password} setValue={setContraseña}/>

            <TouchableHighlight
                onPress={inicioSesionBoton}
            >
                <Text>Iniciar Sesion</Text>
            </TouchableHighlight>
            
            <CustomButton text="Todavia no tienes cuenta, registrate aqui"/>
        </View>
    )
}

export default LogIn;