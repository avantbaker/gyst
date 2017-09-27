import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Text } from 'react-native';

import SideDrawer from "./components/side-drawer.component";
import Home from '../screens/entry-main.screen';
import CategoryDetail from '../screens/entry-category-detail.screen';
import Categories from '../screens/entry-categories.screen';
import Analytics from "../screens/analytics-main.screen";

export const HomeStack = StackNavigator({
    HomeScreen: { screen: Home },
    DetailsScreen: { screen: CategoryDetail }
},  {
    initialRouteName: 'HomeScreen',
    backBehavior: 'initialRoute',
    navigationOptions: {
        drawerLabel: 'Home'
    }
});

export const CategoriesStack = StackNavigator({
    CategoriesScreen: { screen: Categories }
});

export const AnalyticsStack = StackNavigator({
    AnalyticsScreen: { screen: Analytics }
});

export const DrawerRoutes = {
    Home: {
        screen: HomeStack,
    },
    Categories: {
        screen: CategoriesStack,
        navigationOptions: {
            drawer: {
                label: () => <Text>Categories</Text>
            }
        }
    },
    Analytics: {
        screen: AnalyticsStack,
        navigationOptions: {
            drawer: {
                label: () => <Text>Analytics</Text>
            }
        }
    },
};

export const DrawerOptions = {
    initialRouteName: 'Home',
    contentComponent: SideDrawer
};