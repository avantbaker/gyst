import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { _ } from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import Todo from '../components/todo-item.component';
import Dropdown from '../components/dropdown.component';

import { TODO_QUERY } from "../graphql/todos.query";
import { CREATE_TODO_MUTATION } from "../graphql/create-todo.mutation";

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
    dropdownContainer: {
        backgroundColor: 'black',
        paddingBottom: 20,
        paddingLeft: 20,
        paddingTop: 12
    },
    dropdownInput: {
        height: 40,
        borderColor: 'white',
        borderBottomWidth: 2,
        flex: 1,
        color: 'white'
    },
});

const {
    screenWrapper,
    header,
    headerLeft,
    headerRight,
    dateContainer,
    dateText,
    dropdownContainer,
    dropdownInput
} = styles;

/*
    TODO: ( later ) non collapsed state on the newly added todo
    TODO: add subtext to display swipe to delete text
    TODO: Add faded background image of Category Icon
    TODO: Create Overlay that launches when the dropdown comes down
 */

class CategoryDetail extends Component {

    static navigationOptions = ({ navigation }) => {

        const showAdd       = navigation.state.params && !navigation.state.params.cancel ?
                                navigation.state.params.showAddCategory :
                                undefined;
        const cancel        = navigation.state.params && navigation.state.params.cancel ?
                                navigation.state.params.dismiss :
                                undefined;
        const rightButton   = navigation.state.params && !navigation.state.params.cancel ?
                                <Icon name="plus" style={ headerRight }/> :
                                <Text style={ [headerRight, { fontSize: 17, fontWeight: 'bold' } ] }>Cancel</Text>;

        return {
            title: navigation.state.params ? navigation.state.params.title : "Category",
            headerStyle: header,
            headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-left" style={headerLeft}/>
                        </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={ showAdd || cancel }>
                            { rightButton }
                        </TouchableOpacity>
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.showAddCategory = this.showAddCategory.bind(this);
        this.updateNavBar = this.updateNavBar.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    keyExtractor = item => item.id;

    renderBox = ({ item: { title, description, complete } }) => {
        return <Todo title={title} description={description} complete={complete} />
    };

    componentDidMount() {
        this.props.navigation.setParams({
            showAddCategory: this.showAddCategory,
            dismiss: this.dismissAlert
        })
    }

    dismissAlert() {
        this.dropdown.dismiss();
        this.props.navigation.setParams({
            cancel: false,
        })
    };

    showAddCategory() {
        this.dropdown.alertWithType();
        this.props.navigation.setParams({
            cancel: true,
            dismissAlert: this.dismissAlert()
        })
    }

    updateNavBar(text) {
        this.setState({ text });
    }

    createTodo() {
        const { createTodo, navigation, user } = this.props;
        const { text } = this.state;

        createTodo({
            title: text,
            description: 'Something goes heree',
            userId: user.id,
            categoryId: navigation.state.params.categoryId,
            entryId: navigation.state.params.entryId
        });

        this.dismissAlert();

    }

    getTodos(todos) {
        const { navigation } = this.props;
        return _.filter( todos, todo => todo.category.id === navigation.state.params.id );
    }

    render() {

        const { loading, user } = this.props;

        if(loading) {
            return (
                <View style={[screenWrapper, styles.loading]}>
                    <ActivityIndicator/>
                </View>
            );
        }

        const { todos } = user.entries[0];

        return (
            <View style={ screenWrapper }>
                <View style={ dateContainer }>
                    <Text style={ dateText }> { moment().format("MMM Do YYYY") } </Text>
                </View>
                <FlatList
                    data={ this.getTodos(todos) }
                    keyExtractor={ this.keyExtractor }
                    renderItem={ this.renderBox }
                    showsVerticalScrollIndicator={false}
                />
                <Dropdown
                    ref={(ref) => this.dropdown = ref }
                    containerStyle={ dropdownContainer }>
                    <TextInput
                        style={ dropdownInput }
                        placeholder={ 'Add a new Todo...'}
                        placeholderTextColor={ '#ffffff' }
                        onChangeText={ text => this.updateNavBar(text) }
                        value={ this.state.text }
                    />
                    <TouchableOpacity onPress={ this.createTodo }>
                        <View style={{ width: 60, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="plus" style={{color: 'white', fontSize: 30}}/>
                        </View>
                    </TouchableOpacity>
                </Dropdown>
            </View>
        )
    }
}

const todoQuery = graphql( TODO_QUERY, {
    options: ownProps => ({ variables: { id: 1 }}),
    props: ({data: { loading, user }}) => ({ loading, user })
});

const createTodo = graphql( CREATE_TODO_MUTATION, {
    props: ({ownProps, mutate}) => ({
        createTodo: (args) => mutate({
            variables: args,
            update: (store, { data: { createTodo }}) => {
                // Get current cached data
                const data = store.readQuery({
                    query: TODO_QUERY,
                    variables: {
                        id: 1
                    }
                });
                // add the completion status to the to do for the Optimistic UI update
                createTodo.complete = false;
                // add the to do to the list of cached todos
                data.user.entries[0].todos.push(createTodo);
                // Re write to the cache
                store.writeQuery({
                    query: TODO_QUERY,
                    variables: {
                        id: 1
                    },
                    data
                });
            }
        })
    })
});

export default compose( todoQuery, createTodo )(CategoryDetail);