import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Button} from 'react-native';
import axios from 'axios';

export const API_URL = 'http://192.168.40.85:8080';

interface Game {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number;
    awayScore: number;
    date: string;
}

export const ActiveGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        fetchGames(0);
    }, []);

    const fetchGames = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/game?limit=10&page=${page}`);
            const newGames = response.data.games;
            console.log(newGames)
            setCount(response.data.count)
            newGames && setGames((prevGames) => [...prevGames, ...newGames]);
        } catch (error) {
            console.error('Error fetching games:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderItem = ({item}: any) => (
        <View style={styles.itemContainer}>
            <Text>{item.homeTeamName}:{item.homeScore} - {item.awayTeamName}:{item.awayScore}</Text>
            {/* Render other game details */}
        </View>
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    };

    const handleLoadMore = () => {
        if (!isLoading) {
            fetchGames(page+1);
            setPage(page + 1);
        }
    };

    console.log(count,page)

    return (
        <View style={styles.container}>
            {
                games.length > 0 ? (
                    <>
                    <FlatList
                        data={games}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        ListFooterComponent={renderFooter}
                    />
                    <View style={styles.buttonContainer}>
                        {count > (page+1)*10 && <Button title={"Load more"} onPress={handleLoadMore}/>}
                    </View>
                    </>
                ) : !isLoading && (
                    <View style={styles.container}>
                        <Text>No games found</Text>
                    </View>
                )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    footerContainer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    buttonContainer: {
        paddingBottom: 20,
    }
});

