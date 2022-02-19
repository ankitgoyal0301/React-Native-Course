import React from "react";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const FavoritesScreen = props => {

    props.navigation.setOptions({
        headerTitle: 'Your Favorites',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                props.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    });

    const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')

    return <MealList listData={favMeals} navigation={props.navigation} />
}

export default FavoritesScreen;