import React from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Touchable } from "react-native";
import Colors from "../constants/Colors";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGrisTile from "../components/CategoryGridTile";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = props => {

    props.navigation.setOptions({
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                props.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    });

    const renderGridItem = (ItemData) => {
        return (
            <CategoryGrisTile
                title={ItemData.item.title}
                color={ItemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        name: "CategoryMeals",
                        params: {
                            categoryId: ItemData.item.id
                        }
                    })
                }} />
        )
    }

    return (

        <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
        // <View style={styles.screen}>
        //     <Text>The Categories Screen</Text>
        //     <Button title="Go to Meals!" onPress={() => {
        //         props.navigation.navigate({ name: 'CategoryMeals' })
        //         // props.navigation.replace('CategoryMeals')
        //     }} />
        // </View>
    )
}

// Doesn't work
// function StackScreen() {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'My home' }}
//         />
//       </Stack.Navigator>
//     );
//   }
CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories',
    headerStyle: {
        backgroundColor: Colors.primaryColor
    }
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default CategoriesScreen;