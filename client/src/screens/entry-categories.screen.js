import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryLabel from "../components/category-label.component";
import _ from 'underscore';

const window = Dimensions.get('window');

import SortableListView from 'react-native-sortable-listview';
import Dropdown from '../components/dropdown.component';

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
        flex: 1
    },
    container: {
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
    contentContainer: {
        width: window.width,
        paddingHorizontal: 30,
    },
    row: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,
    }
});

const {
    screenWrapper,
    header,
    headerLeft,
    headerRight,
    dropdownContainer,
    dropdownInput,
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
const keys = Array.apply(null, {length: data.length}).map(Number.call, Number);
const dataObj = _.object(keys, data);

/*
    TODO: Create category delete mutation
    TODO: Create category title edit mutation
    TODO: Create category add mutation
    TODO: add subtext to display swipe to delete text
    TODO: Refactor navigation options
    TODO: Move Sortable Label to its on file and make PureComponent
    TODO: Move data transforming logic into a function
    TODO: Fix swipe to delete text positioning and functionality
    TODO: change X to left arrow
 */

class SortableLabel extends Component {
    render() {
        return <CategoryLabel title={ this.props.data.title } icon={ this.props.data.icon } handlers={this.props.sortHandlers} />
    }
}

class CategoryList extends Component {

    static navigationOptions = ({ navigation }) => {
        const showAdd = navigation.state.params && !navigation.state.params.cancel ?
                            navigation.state.params.showAddCategory :
                            undefined;
        const cancel = navigation.state.params && navigation.state.params.cancel ?
                            navigation.state.params.dismiss :
                            undefined;
        const rightButton = navigation.state.params && !navigation.state.params.cancel ?
                                <Icon name="plus" style={ headerRight }/>:
                                <Text style={ headerRight }>Cancel</Text>;
        return {
            title: 'Categories',
            headerStyle: header,
            headerLeft: <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen') }>
                            <Icon name="google" style={ headerLeft }/>
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
        this.dismissAlert = this.dismissAlert.bind(this);
        this.updateNavBar = this.updateNavBar.bind(this);
    }

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

    render() {
        return (
            <View style={ screenWrapper }>
                <SortableListView
                    style={{ flex: 1, marginBottom: 0 }}
                    data={ dataObj }
                    order={ keys }
                    activeOpacity={ 0.6 }
                    onRowMoved={e => {
                        keys.splice(e.to, 0, keys.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortableLabel data={row} />}
                />
                <Dropdown
                    ref={(ref) => this.dropdown = ref }
                    containerStyle={ dropdownContainer }>
                    <TextInput
                        style={ dropdownInput }
                        placeholder={ 'Add a new category...'}
                        placeholderTextColor={ '#ffffff' }
                        onChangeText={ text => this.updateNavBar(text) }
                        value={ this.state.text }
                    />
                </Dropdown>
            </View>
        )
    }
}

export default CategoryList;

