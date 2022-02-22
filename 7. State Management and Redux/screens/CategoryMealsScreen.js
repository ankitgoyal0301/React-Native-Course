import React from "react";
import { useSelector } from 'react-redux'
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";
import { StyleSheet } from "react-native";
import { View } from "react-native";


const CategoryMealScreen = props => {

    const catId = props.route.params['categoryId'];

    const availableMeals = useSelector(state => state.meals.filteredMeals) // state.meals because state root ki hogi, hume specifically meals ki chahiye

    const displayedMeals = availableMeals.filter(
        meal => meal.CategoryIds.indexOf(catId) >= 0
    )

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    // Setting header dynamically
    props.navigation.setOptions({ title: selectedCategory.title });

    if (displayedMeals.length === 0) {
        return (<View style={styles.content}>
            <DefaultText>No meals found, maybe check your filters?</DefaultText>
        </View>
        )
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryMealScreen;