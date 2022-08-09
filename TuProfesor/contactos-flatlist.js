import React from 'react'
import {Text,View, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import moment from 'react-moment';

export default (props)  => {

    /*const renderItem = ({ item }) => (
      <TouchableOpacity onPress={()=>props.verDetalles(item.Id ,item.Nombre , item.FechaNac.substring(0,10))}>
        <Text style={[styles.bigBlue,{color:'green'}]}> {item.Id +': ' + item.Nombre + ' ' + item.FechaNac.substring(0,10)}</Text>
      </TouchableOpacity>
      );*/


    return(
        <View>

<FlatList
        data={props.contactos}
        //renderItem={renderItem}
        //keyExtractor={item => item.Id}
        horizontal={false}
      />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 24,
    },
    red: {
      color: 'red',
    },
  });