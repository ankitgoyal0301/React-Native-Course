import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native'
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import DefaultText from "../components/DefaultText";

const FavoritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favoriteMeals)

    props.navigation.setOptions({
        headerTitle: 'Your Favorites',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                props.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    });

    if (favMeals.length === 0 || !favMeals) {
        return <View style={styles.content}>
            <DefaultText>
                No Favorite meals found. Start adding some!
            </DefaultText>
        </View>
    }

    // const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')

    return <MealList listData={favMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;