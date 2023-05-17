import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Pressable} from 'react-native';
import axios from "axios";
import Scoreboard from "./ScoreBoard";
import {Game} from "./GameDetails";
import PlayerCard, {playerCardStyles} from "./PlayerCard";
import PlayerStatsCard from "./PlayerStatsCard";

export const API_URL = 'http://192.168.40.85:8080';

interface PlayerData {
    createdAt: string,
    id: string,
    name: string,
    position: string,
    shirtNum: number,
    surname: string,
}

interface PlayerStats {
    player_id: string;
    player_name: string;
    player_surname: string;
    game_id: string;
    fouls: number;
    points: number;
}

type TeamTab = 'home' | 'away'
export const EndGameDetails = ({game, navigation}: { game: Game, navigation: any }) => {
    const [selectedTab, setSelectedTab] = useState<TeamTab>('home'); // Track the selected tab
    const [homeTeamData, setHomeTeamData] = useState<PlayerData[]>([]);
    const [awayTeamData, setAwayTeamData] = useState<PlayerData[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTeamName, setSelectedTeamName] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | undefined>(undefined);
    const [playerLoading, setPlayerLoading] = useState(false);

    const selectedTeamData = selectedTab === 'home' ? homeTeamData : awayTeamData;
    useEffect(() => {
        handleTabPress('home');
    }, []);


    const handleTabPress = async (tab: TeamTab) => {
        setSelectedTab(tab);
        if (tab === 'home'){
            setSelectedTeamName(game.homeTeamName);
            if (homeTeamData.length === 0){
                setLoading(true)
                const data = axios.get(`${API_URL}/team/players/${game.homeTeamId}`)
                setLoading(false)
            }
        } else {
            setSelectedTeamName(game.awayTeamName);
            if (awayTeamData.length === 0){
                setLoading(true)
                axios.get(`${API_URL}/team/players/${game.awayTeamId}`).then(response => {
                    setAwayTeamData(response.data);

                }).finally(() => setLoading(false))
            }
        }
    };

    const handlePressPlayer = (playerId: string) => {
        setPlayerLoading(true)
        axios.get(`${API_URL}/player/${playerId}/game_stats/${game.id}`).then(response => {
            setSelectedPlayer(response.data);
        }).finally(() => setPlayerLoading(false))
    }

    return (
        <>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'home' && styles.selectedTab]}
                    onPress={() => handleTabPress('home')}
                >
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'away' && styles.selectedTab]}
                    onPress={() => handleTabPress('away')}
                >
                    <Text style={styles.tabText}>Away</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.teamContainer}>
                {
                    loading ? (
                        <Text style={styles.teamText}>Loading...</Text>
                    ) : (
                        <>
                        <Text style={styles.teamText}>{selectedTeamName}</Text>
                            {
                                selectedTeamData.map((player: PlayerData,i) => (
                                    <PlayerCard key={i} {...player} handlePressPlayer={handlePressPlayer}/>
                                ))
                            }
                        </>
                    )
                }
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={selectedPlayer !== undefined && !playerLoading}
                onRequestClose={() => {
                    setSelectedPlayer(undefined)
                }}>
                <View style={styles.centeredView}>
                    <PlayerStatsCard {...selectedPlayer}/>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setSelectedPlayer(undefined)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    teamName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
    },
    selectedTab: {
        backgroundColor: '#ccc',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    teamContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    teamText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    wholeContainer: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 8,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
