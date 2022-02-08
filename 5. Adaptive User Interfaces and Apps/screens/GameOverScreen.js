import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from "react-native";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { ScrollView, SafeAreaView } from "react-native";

const GameOverScreen = props => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (

        <ScrollView>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60
    }
})

export default GameOverScreen