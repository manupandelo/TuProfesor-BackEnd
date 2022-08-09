import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import Main from './screens/Main.jsx';
import LogIn from './screens/LogIn.jsx';
import Home from './screens/Home.jsx';
//import React, { useState, useEffect } from 'react'; (flatlist, contactos-flatlist, main y backend)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  /*return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Principal" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
