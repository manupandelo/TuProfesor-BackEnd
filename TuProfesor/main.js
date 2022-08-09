import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import ContactosFlatlist from './contactos-flatlist'
import React, { useState, useEffect } from 'react';
import {getAll} from './backend'

export default function Main({navigation}) {


  const getLocal=(setCont) => {
    setCont(contactold)
  }


  /*const verDetalles=(id, nombre, fecha) => {
    navigation.navigate('Detalles',{id, nombre, fecha})
  }*/

  const [contactos, setContactos] = useState({})
  useEffect (()=> getAll(setContactos),[])

  return (
    <View style={styles.container}>
        <View style={styles.lista}>
          <ContactosFlatlist contactos={contactos}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10,
  },

  lista: {
    flex:1,
    marginTop:20,
    marginBottom:20,
    marginHorizontal:20,
  },

});