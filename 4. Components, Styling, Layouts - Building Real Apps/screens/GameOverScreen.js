import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from "react-native";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" />
                {/* <Image source={{ uri: 'https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzbm93fGVufDB8fDB8fA%3D%3D&w=1000&q=80' }} style={styles.image} resizeMode="cover" /> */}
            </View>
            <View style={styles.resultContainer}>
                <Text style={DefaultStyles.bodyText}>
                    Your phone nedded <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </Text>
            </View>
            <MainButton onPress={props.onRestart}>
                NEW GAME
            </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: 20
    }
})

export default GameOverScreen