import React from "react";
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return (
        <TextInput {...props} style={{...styles.Input, ...props.style}}/>
    );
}

const styles = StyleSheet.create({
    Input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;