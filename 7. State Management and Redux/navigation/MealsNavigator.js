import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import FavoritesScreen from '../screens/FavoritesScreen'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    // presentation: 'modal',
    // initialRouteName: 'CategoryMeals', Add this to the screen below you want to start with
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}

const { Navigator, Screen } = createStackNavigator();

// navigationKey​
// Optional key for a group of screens screen. If the key changes, all existing screens in this group will be removed or reset:

// <Stack.Group navigationKey={isSignedIn ? 'user' : 'guest'}>
//   {/* screens */}
// </Stack.Group>
// This is similar to the navigationKey prop on Screen, but applies to a group of screens.

const AuthStack = () => (
    // screenOptions are default navigation options
    <Navigator screenOptions={defaultStackNavOptions}>
        <Screen
            name="Categories"
            component={CategoriesScreen}
            options={
                {
                    title: 'Meal Categories',
                }
            }
        />
        <Screen name="CategoryMeals"
            component={CategoryMealScreen}
        // screenOptions={{ presentation: 'modal' }}
        />
        <Screen name="MealDetail" component={MealDetailScreen} />
    </Navigator>
);

const FavoriteStack = createStackNavigator();

const FavAuthStack = () => (
    // screenOptions are default navigation options
    <FavoriteStack.Navigator screenOptions={defaultStackNavOptions}>
        <FavoriteStack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={
                {
                    title: 'Your Favorites',
                }
            }
        />
        <FavoriteStack.Screen name="MealDetail" component={MealDetailScreen} />
    </FavoriteStack.Navigator>
);

const FiltersStack = createStackNavigator();

const FiltersNavigator = () => (
    // screenOptions are default navigation options
    <FiltersStack.Navigator screenOptions={defaultStackNavOptions}>
        <FiltersStack.Screen
            name="FiltersStack"
            component={FiltersScreen}
            options={
                {
                    title: 'Filter Meals',
                }
            } />
    </FiltersStack.Navigator>
);

const BottomTabs = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <BottomTabs.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBarOptions={{
                activeTintColor: Colors.accentColor,
                labelStyle: {
                    fontFamily: 'open-sans'
                }
            }}
        >
            <BottomTabs.Screen
                name="Meals"
                component={AuthStack}
                options={{
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.color} />
                    }
                }} />
            <BottomTabs.Screen
                name="Favorites"
                component={FavAuthStack}
                options={{
                    tabBarLabel: 'Favorites!',
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='ios-star' size={25} color={tabInfo.color} />
                    }
                }} />
        </BottomTabs.Navigator>
    );
}

// Solving the error faced while using drawerNavigator
// https://stackoverflow.com/questions/67130651/reanimated-2-failed-to-create-a-worklet-maybe-you-forgot-to-add-reanimateds-ba
const MainNavigator = createDrawerNavigator();

const SideDrawerNavigator = () => {
    return (
        // screenOptions: https://stackoverflow.com/questions/68713977/how-to-make-drawercontentoptions-work-in-react-navigation-6-x
        <MainNavigator.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Colors.accentColor,
                drawerLabelStyle: {
                    fontFamily: 'open-sans'
                }
            }}
        >
            <MainNavigator.Screen name="MealsFavs" component={MyTabs} options={
                {
                    title: 'Meals',
                }
            } />
            <MainNavigator.Screen name="Filters" component={FiltersNavigator} />
        </MainNavigator.Navigator>
    );
}

const AppNavigator = () => (
    <NavigationContainer>
        <SideDrawerNavigator />
    </NavigationContainer>
);

export default AppNavigator;

// const MealsNavigator = createStackNavigator({
//     Categories: CategoriesScreen,
//     CategoryMeals: {
//         screen: CategoryMealScreen,
//     },
//     MealDetail: MealDetailScreen
// });

// export default createAppContainer(MealsNavigator);