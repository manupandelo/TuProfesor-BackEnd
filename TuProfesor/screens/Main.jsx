import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import BottomTab from '../components/BottomTab';
import DropDown from '../components/DropDown';

const Main = () => {

    const navigation = useNavigation();
    return (
        <View>
            <Image 
                style = {styles.logo}
                source={require("../src/imgs/logo3.png")}/>

            <Text>Tu Profesor</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LogIn')}
                >
                    <Text>Iniciar sesion como Alumno</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
      width: 100,
      height: 100,
      marginTop: 10,
      marginEnd: 10,
      justifyContent: 'center'
    },
  });

export default Main;