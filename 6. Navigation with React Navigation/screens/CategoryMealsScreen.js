import React from "react";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";


const CategoryMealScreen = props => {

    const catId = props.route.params['categoryId'];
    const displayedMeals = MEALS.filter(
        meal => meal.CategoryIds.indexOf(catId) >= 0
    )

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    // Setting header dynamically
    props.navigation.setOptions({ title: selectedCategory.title });

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    )
}



export default CategoryMealScreen;