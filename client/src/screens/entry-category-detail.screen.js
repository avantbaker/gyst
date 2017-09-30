import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { graphql } from 'react-apollo';
import { _ } from 'lodash';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Todo from '../components/todo-item.component';
import {TODO_QUERY} from "../graphql/todos.query";

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

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.title : "Category",
        headerStyle: header,
        headerLeft: <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <Icon name="chevron-left" style={ headerLeft }/>
                    </TouchableOpacity>,
        headerRight: <Icon name="plus" style={ headerRight } />,
    });

    keyExtractor = item => item.id;

    renderBox = ({ item: { title, description } }) => {
        return <Todo title={title} description={description} />
    };

    render() {

        const { loading, user, navigation } = this.props;

        if(loading) {
            return (
                <View style={[screenWrapper, styles.loading]}>
                    <ActivityIndicator/>
                </View>
            );
        }

        const { todos } = user.entries[0];

        const data = _.filter( todos, todo => todo.category.id === navigation.state.params.id );

        return (
            <View style={ screenWrapper }>
                <View style={ dateContainer }>
                    <Text style={ dateText }> { moment().format("MMM Do YYYY") } </Text>
                </View>
                <FlatList
                    data={ data }
                    keyExtractor={ this.keyExtractor }
                    renderItem={ this.renderBox }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const todoQuery = graphql( TODO_QUERY, {
    options: ownProps => ({ variables: { id: 1 }}),
    props: ({data: { loading, user }}) => ({ loading, user })
});

export default todoQuery(CategoryDetail);