import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryLabel from "../components/category-label.component";

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
        flex: 1
    },
    header: {
        backgroundColor: 'white',
        shadowColor: 'transparent',
    },
    headerLeft: {
        fontSize: 20,
        marginLeft: 20
    },
    headerRight: {
        fontSize: 20,
        marginRight: 20
    },
});

const {
    screenWrapper,
    header,
    headerLeft,
    headerRight,
} = styles;

const data = [
    {
        id: 1,
        icon: "users",
        title: "Family",
    },
    {
        id: 2,
        icon: "odnoklassniki",
        title: "Fitness",
        itemsLeft: 1
    },
    {
        id: 3,
        icon: "leaf",
        title: "Health",
    },
    {
        id: 4,
        icon: "home",
        title: "Home",
    },
    {
        id: 5,
        icon: "shopping-bag",
        title: "Fashion",
    },
    {
        id: 6,
        icon: "reddit",
        title: "Personal",
    },
    {
        id: 7,
        icon: "heart",
        title: "Love",
    },
    {
        id: 8,
        icon: "code-fork",
        title: "Work",
    },
    {
        id: 9,
        icon: "btc",
        title: "Finance",
    }
];

/*
    TODO: Add input to allow creation of a new Todo Item
    TODO: Connect headerRight button to launch add new input dropdown
    TODO: add subtext to display swipe to delete text
    TODO: Add faded background image of Category Icon
 */

class CategoryDetail extends Component {

    static navigationOptions = {
        title: 'Categories',
        headerStyle: header,
        headerLeft: <Icon name="google" style={ headerLeft }/>,
        headerRight: <Icon name="plus" style={ headerRight } />
    };

    keyExtractor = item => item.id;

    renderBox = ({ item: { title, icon } }) => {
        return <CategoryLabel title={title} icon={icon} />
    };

    render() {
        return (
            <View style={ screenWrapper }>
                <FlatList
                    data={data}
                    keyExtractor={ this.keyExtractor }
                    renderItem={ this.renderBox }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

export default CategoryDetail;