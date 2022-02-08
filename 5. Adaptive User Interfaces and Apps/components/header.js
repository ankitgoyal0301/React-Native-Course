import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndriod }) }}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },
    headerAndriod: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: Platform.OS === 'ios' ? Colors.primary : 'white'
    }
});

export default Header;