import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {StartGame} from "./components/StartGame";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ActiveGames} from "./components/ActiveGames";
import {EndedGames} from "./components/EndedGames";

export interface Team {
    "id": string
    "name": string
    "createdAt": string
}

// Components for navigation
const Stack = createStackNavigator();

// Main screen component
// @ts-ignore
const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('StartGame')}
        >
            <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ActiveGames')}
        >
            <Text style={styles.buttonText}>Active Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EndedGames')}
        >
            <Text style={styles.buttonText}>Ended Games</Text>
        </TouchableOpacity>
    </View>
);

const App = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="StartGame" component={StartGame} />
                <Stack.Screen name="ActiveGames" component={ActiveGames} />
                <Stack.Screen name="EndedGames" component={EndedGames} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default App;
