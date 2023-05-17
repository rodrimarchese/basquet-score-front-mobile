import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    homeTeamName: string;
    homeScore: number;
    awayTeamName: string;
    awayScore: number;
}
const Scoreboard = ({ homeTeamName, homeScore, awayTeamName, awayScore }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.teamContainer}>
                <Text style={styles.teamName}>{homeTeamName}</Text>
                <Text style={styles.teamPoints}>{homeScore}</Text>
            </View>
            <Text style={styles.middle}>-</Text>
            <View style={styles.teamContainer}>
                <Text style={styles.teamName}>{awayTeamName}</Text>
                <Text style={styles.teamPoints}>{awayScore}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

    },
    teamContainer: {
        alignItems: 'center',
    },
    teamName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    teamPoints: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    middle: {
        fontSize: 72,
        margin: 16
    }
});

export default Scoreboard;
