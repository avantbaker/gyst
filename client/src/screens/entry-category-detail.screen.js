import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import Todo from '../components/todo-item.component';

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
    headerTitle: {
        fontSize: 10
    },
    headerLeft: {
        fontSize: 20,
        marginLeft: 20
    },
    headerRight: {
        fontSize: 20,
        marginRight: 20
    },
    dateContainer: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        top: -20,
        fontWeight: 'bold',
        fontSize: 16
    },
});

const {
    screenWrapper,
    header,
    headerLeft,
    headerRight,
    dateContainer,
    dateText
} = styles;

const data = [
    {
        id: 1,
        title: "Call Mom",
        description: "Make sure that you ask her about that thing that you have to do. She hasn't been doing that well",
        complete: false
    },
    {
        id: 2,
        title: "Pick up a gift for Ashley's Baby Shower",
        description: "Im thinking about getting her some daipers or maybe a crib or something",
        complete: true
    },
    {
        id: 3,
        title: "Schedule a workout with dad",
        description: "We should work on legs and back this time",
        complete: false
    }
];

/*
    TODO: Add input to allow creation of a new Todo Item
    TODO: Connect headerRight button to launch add new input dropdown
    TODO: add subtext to display swipe to delete text
    TODO: Add faded background image of Category Icon
    TODO: Integrate Category Name in header
    TODO: Create Dropdown component to contain input
 */

class CategoryDetail extends Component {

    static navigationOptions = {
        title: 'Category Name Here',
        headerStyle: header,
        headerLeft: <Icon name="google" style={ headerLeft }/>,
        headerRight: <Icon name="plus" style={ headerRight } />
    };

    keyExtractor = item => item.id;

    renderBox = ({ item: { title, description, complete } }) => {
        return <Todo title={title} description={description} />
    };

    render() {
        return (
            <View style={ screenWrapper }>
                <View style={ dateContainer }>
                    <Text style={ dateText }> { moment().format("MMM Do YYYY") } </Text>
                </View>
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