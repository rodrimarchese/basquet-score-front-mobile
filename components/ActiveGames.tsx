import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Button,
    TouchableOpacity,
    RefreshControl, ScrollView
} from 'react-native';
import axios from 'axios';
import {GameDetails} from "./GameDetails";

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

interface Props {
    ended?: boolean;
    navigation?: any;
}

export const ActiveGames = (props: Props) => {
    const {ended, navigation} = props;
    const [games, setGames] = useState<Game[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const url = ended ? `${API_URL}/game/ended?limit=10&page=` : `${API_URL}/game/active?limit=10&page=`;


    useEffect(() => {
        fetchGames(0);
    }, []);

    const fetchGames = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get(url + page);
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
            fetchGames(page + 1);
            setPage(page + 1);
        }
    };

    const handleRefresh = async () => {
        if (!refreshing) {
            setRefreshing(true);
            setIsLoading(true);
            try {
                const response = await axios.get(url + page);
                const newGames = response.data.games;
                console.log(newGames)
                setCount(response.data.count)
                newGames && setGames(newGames)
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setIsLoading(false);
                setRefreshing(false)
            }
        }
    };

    console.log(count,page)

    return (
        <View style={styles.container}>
            {
                games.length > 0 ? (
                    <>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                            }
                        >
                            {games.map((item) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('GameDetails', {gameId: item.id, ended: ended})}
                                >
                                    <View style={styles.itemContainer}>

                                        <Text>{item.homeTeamName}:{item.homeScore} - {item.awayTeamName}:{item.awayScore}</Text>

                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            {count > (page + 1) * 10 && <Button title={"Load more"} onPress={handleLoadMore}/>}
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

