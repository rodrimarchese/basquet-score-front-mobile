import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayerStatsCard = ({ player_name, player_surname, fouls, points }: {
    player_name?: string,
    player_surname?: string,
    fouls?: number,
    points?: number,
}) => {
    return (
        <View style={styles.wholeContainer}>
            <View style={styles.playerInfoContainer}>
                <Text style={styles.player_name}>{player_surname}</Text>
                <Text style={styles.player_surname}>{player_name}</Text>
            </View>
        <View style={styles.container}>
            <View style={styles.playerStatsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Fouls</Text>
                    <Text style={styles.statValue}>{fouls}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Points</Text>
                    <Text style={styles.statValue}>{points}</Text>
                </View>
            </View>
        </View>
        </View>

    );
};

const styles = StyleSheet.create({
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
    container: {
        marginVertical: 14,
    },
    playerInfoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    player_name: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    player_surname: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    playerStatsContainer: {
        flexDirection: 'row',
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    statLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlayerStatsCard;
