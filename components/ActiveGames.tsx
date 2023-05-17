import DatePicker from "react-native-date-picker";
import React, {useEffect, useState} from "react";
import {Button, View, Text} from "react-native";
import {Picker} from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import {Team} from "../App";

export const ActiveGames = () => {
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.40.85:8080/team');
                const data: Team[] = await response.json();
                setTeams(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const logTeamNames = () => {
        console.log(team1);
        console.log(team2);
    };

    return (
        <View style={{padding: 16, backgroundColor: "#f5f5f5"}}>
            {teams !== undefined && teams.length > 0 && (
                <>
                    <Picker
                        selectedValue={team1}
                        onValueChange={(itemValue, itemIndex) => setTeam1(itemValue)}
                    >
                        {teams.map((team) => (
                            <Picker.Item key={team.id} label={team.name} value={team.id}/>
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={team2}
                        onValueChange={(itemValue, itemIndex) => setTeam2(itemValue)}
                    >
                        {teams.map((team) => (
                            <Picker.Item key={team.id} label={team.name} value={team.id}/>
                        ))}
                    </Picker>

                    <Button title="Log Teams" onPress={logTeamNames}/>
                </>
            )}
        </View>
    );
};
