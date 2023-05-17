import DatePicker from "react-native-date-picker";
import React, {useEffect, useState} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

export const API_URL = 'http://192.168.40.85:8080';
export interface Team {
    "id": string
    "name": string
    "createdAt": string
}

// @ts-ignore
export const StartGame = ({navigation}) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL+'/team');
                const data: Team[] = await response.json();
                setTeams(data);
                if (data.length > 1) {
                    setTeam1(data[0].name);
                    setTeam2(data[1].name);
                }
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const createGame = async () => {
        const team1Data = teams.find((team) => team.id === team1);
        const team2Data = teams.find((team) => team.id === team2);
        if (!team1Data || !team2Data) {
            console.error("Missing team")
            return;
        } else if (team1Data.name === team2Data.name) {
            console.error("Same team")
            return;
        }
        const game = await axios.post('http://192.168.40.85:8080/game', {
            homeTeamId: team1Data.id,
            awayTeamId: team2Data.id,
            date: new Date().toISOString()
        }).catch((error) => {
            console.error(error)
        })
        if (game) {
            console.log(game.data)
            // Navigating to ScreenB
            navigation.navigate('Home');
        }
    };


    const handleTeam1Change = (value: string) => {
        setTeam1(value);
    };

    const handleTeam2Change = (value: string) => {
        setTeam2(value);
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={team1}
                onValueChange={handleTeam1Change}
                style={styles.picker}
            >
                <Picker.Item label="Select Team 1" value=""/>
                {teams.map((team) => (
                    <Picker.Item
                        key={team.id}
                        label={team.name}
                        value={team.id.toString()}
                    />
                ))}
            </Picker>
            <Picker
                selectedValue={team2}
                onValueChange={handleTeam2Change}
                style={styles.picker}
            >
                <Picker.Item label="Select Team 2" value=""/>
                {teams.map((team) => (
                    <Picker.Item
                        key={team.id}
                        label={team.name}
                        value={team.id.toString()}
                    />
                ))}
            </Picker>
            <View style={{height: 100}}/>
            <Button title="Create Game" onPress={createGame}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    picker: {
        width: 200,
        height: 150,
        marginBottom: 40,
    },
});

