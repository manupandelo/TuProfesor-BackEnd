import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Main from "./screens/Main.jsx";
import LogIn from "./screens/LogIn";
import Home from "./screens/Home";

const MainStackNavigator = createNativeStackNavigator();

function MyStack(){
    return(
        <MainStackNavigator.Navigator
            initialRouteName="Main"
        >
            <MainStackNavigator.Screen
                name="Main"
                component={Main}
            />
            <MainStackNavigator.Screen
                name="LogIn"
                component={LogIn}
            />
            <MainStackNavigator.Screen
                name="Home"
                component={Home}
            />
        </MainStackNavigator.Navigator>
    );
}

export default MyStack;