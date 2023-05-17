import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from "axios";
import Scoreboard from "./ScoreBoard";
import {EndGameDetails} from "./EndGameDetails";

export const API_URL = 'http://192.168.40.85:8080';


export interface Game {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number;
    awayScore: number;
    date: string;
}

export const GameDetails = ({route,navigation}: { route: any,navigation:any }) => {
    const {gameId, ended} = route.params;
    const [gameData, setGameData] = useState<Game | undefined>(undefined);

    useEffect(() => {
        if (gameId) {
            axios.get(API_URL + '/game/' + gameId)
                .then((response) => {
                    setGameData(response.data);
                })
        }
    }, [gameId]);

    const handleEndGame = (gameId: string) => {
        axios.post(API_URL + '/game/end_game/' + gameId )
            .then((response) => {
                navigation.navigate('ActiveGames');
                console.log(response.data);
            })
    }


    return (
        <View>
            {
                gameData ? (
                    <>
                        <Scoreboard
                            {...gameData}
                        />
                        {
                            !ended ? (
                                <Button title={'End Game'} onPress={() => handleEndGame(gameId)}/>
                            ) : (
                                <EndGameDetails game={gameData} navigation={navigation}/>
                            )
                        }
                    </>
                ) : (
                    <Text>Loading...</Text>
                )
            }

        </View>
    );
};

