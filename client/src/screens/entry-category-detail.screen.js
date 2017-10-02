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
import { graphql } from 'react-apollo';
import { _ } from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import Todo from '../components/todo-item.component';
import Dropdown from '../components/dropdown.component';

import { TODO_QUERY } from "../graphql/todos.query";

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
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
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
    TODO: create mutation to add new Todo Item to Category
    TODO: add subtext to display swipe to delete text
    TODO: Add faded background image of Category Icon
    TODO: Give bottom padding to the input dropdown
    TODO: Create Overlay that launches when the dropdown comes down
    TODO: Put add todo button within the dropdown and change the + to cancel
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
                                <Text style={ headerRight }>Cancel</Text>;

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
    }

    keyExtractor = item => item.id;

    renderBox = ({ item: { title, description, complete } }) => {
        console.log(complete);
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
        this.updateNavBar('');
    };

    showAddCategory() {
        this.dropdown.alertWithType();
    }

    updateNavBar(text) {
        this.setState({ text });
        if( this.state.text >= 1 ) return;
        this.props.navigation.setParams({
            cancel: !!text.length,
            dismiss: this.dismissAlert
        });
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
                </Dropdown>
            </View>
        )
    }
}

const todoQuery = graphql( TODO_QUERY, {
    options: ownProps => ({ variables: { id: 1 }}),
    props: ({data: { loading, user }}) => ({ loading, user })
});

export default todoQuery(CategoryDetail);