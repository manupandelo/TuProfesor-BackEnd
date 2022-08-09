import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import DropDown from '../components/DropDown';

const Home = () => {
    const [profesores, setProfesores] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:3000/teachers", {
        method : 'GET',
        //Authorization: "Bearer " + dsffdsfddsf
        })
        .then(response => response.json())
        .then(data => setProfesores(data));
    },[]);

    /*const verDetalles=(id, nombre, fecha) => {
        navigation.navigate('Detalles',{id, nombre, fecha})
    }*/

    return (
        <View>

            <DropDown update={setProfesores}/>

            <Text>Lista de Profesores</Text>
    
            <FlatList
                data={profesores}
                keyExtractor={ (item) => item.id}
                renderItem = {({item, index}) => 
                <Text>{item.nombre} {item.apellido} {item.edad}</Text>
                //<CustomButton text={item.nombre}/>
            }
                showsVerticalScrollIndicator={false}
            /> 
            
        </View>
    );
}

export default Home;