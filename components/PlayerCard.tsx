import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PlayerCard = ({ id, name, surname, position, shirtNum, handlePressPlayer }: {
    id: string
    name: string,
    surname: string,
    position: string,
    shirtNum: number,
    handlePressPlayer: (id: string) => void
}) => {
    return (
        <TouchableOpacity style={playerCardStyles.container} onPress={e => handlePressPlayer(id)}>
            <View style={playerCardStyles.playerInfoContainer}>
                <Text style={playerCardStyles.playerName}>{surname}</Text>
                <Text style={playerCardStyles.playerSurname}>{name}</Text>
            </View>
            <View style={playerCardStyles.playerPositionContainer}>
                <Text style={playerCardStyles.playerPosition}>{position}</Text>
                <Text style={playerCardStyles.playerShirtNum}>{shirtNum}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const playerCardStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    playerInfoContainer: {},
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    playerSurname: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    playerPositionContainer: {
        alignItems: 'center',
    },
    playerPosition: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    playerShirtNum: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlayerCard;
