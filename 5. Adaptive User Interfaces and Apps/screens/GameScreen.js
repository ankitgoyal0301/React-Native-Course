import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { ScrollView, FlatList } from "react-native";
import { ScreenOrientation } from 'expo';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else return rndNum;
}

const renderListItem = (listLength, itemData) => ( //Default agument in flatlist is itself passed as the last argument
    <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>

)

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100); //Survives rerenders

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            // runs before useeffect runs
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]); // Only runs for every render ONLY IF any of our dependencies change

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(rounds => rounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            < View style={styles.screen} >
                <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
                <View style={styles.control}>
                    <MainButton onPress={() => nextGuessHandler('lower')} >
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <MainButton onPress={() => nextGuessHandler('greater')} >
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                    <FlatList
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list} />
                </View>
            </View >
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        width: Dimensions.get('window') > 350 ? '60%' : '80%',
        flex: 1 //for andriod
    },
    list: {
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    control: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;