import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';

const DetalleProfesor = (props) => {
    const [profesores, setProfesores] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:3000/teachers", {
        method : 'GET',
        //Authorization: "Bearer " + dsffdsfddsf,  k
        })
        .then(response => response.json())
        .then(data => setProfesores(data));
    },[]);

    /*useEffect(() =>{
        axios.get("https://localhost:5000/profesores")
        .then(response => {
            console.log(response.data);
            setProfesores(response.data);
        })
    })
    */

    return (
        <View>
            <Text>Profesor {item.nombre}</Text>
    
            <FlatList
                data={profesores}
                keyExtractor={ (item) => item.id}
                renderItem = {({item, index}) => <Text>
                    {item.nombre} {item.apellido} 
                    {item.edad} {item.descripcion} {item.ubicacion} {item.tipo} {item.horario} {item.materia}</Text>}
            /> 
            
        </View>
    );
}

export default DetalleProfesor;