import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import moment from 'moment';
import Box from '../components/category-box.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import { USER_QUERY } from "../graphql/user.query";

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
        flex: 1
    },
    loading: {
        justifyContent: 'center',
        flex: 1
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flexWrap: 'wrap',
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
    dateContainer: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        top: -20,
        fontWeight: 'bold',
        fontSize: 16 }
    });

const {
    screenWrapper,
    container,
    header,
    headerLeft,
    headerRight,
    dateContainer,
    dateText
} = styles;

const data = [
    {
        id: 1,
        icon: "users",
        title: "Family",
        itemsLeft: 2
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
        itemsLeft: 0
    },
    {
        id: 4,
        icon: "home",
        title: "Home",
        itemsLeft: 3
    },
    {
        id: 5,
        icon: "shopping-bag",
        title: "Fashion",
        itemsLeft: 0
    },
    {
        id: 6,
        icon: "reddit",
        title: "Personal",
        itemsLeft: 0
    },
    {
        id: 7,
        icon: "heart",
        title: "Love",
        itemsLeft: 1
    },
    {
        id: 8,
        icon: "code-fork",
        title: "Work",
        itemsLeft: 3
    },
    {
        id: 9,
        icon: "btc",
        title: "Finance",
        itemsLeft: 1
    }
];

/*
    TODO: Shrink the Header Size
 */

class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerStyle: header,
        headerLeft: <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen') }>
                        <Icon name="google" style={ headerLeft }/>
                    </TouchableOpacity>,
        headerRight: <Icon name="line-chart" style={ headerRight } />
    });

    constructor(props) {
        super(props);

        this.goToCategoryDetail = this.goToCategoryDetail.bind(this);
        this.goToMenu = this.goToMenu.bind(this);
    }

    keyExtractor = item => item.id;

    goToCategoryDetail(category) {
        const { navigate } = this.props.navigation;

        navigate('DetailsScreen', {
            id: category.id,
            title: category.title,
            from: 'HomeScreen'
        })
    }

    goToMenu() {
        const { navigate } = this.props.navigation;

        navigate('Menu');
    }

    renderBox = ({ item }) => {
        // TODO: Refactor the Box component to only take an item
        return <Box category={ item } onPress={ this.goToCategoryDetail } />
    };

    render() {
        const { loading, user } = this.props;

        console.log(user);

        if(loading) {
            return (
                <View style={[ screenWrapper, styles.loading ]}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={ screenWrapper }>
                <View style={ dateContainer }>
                    <Text style={ dateText }> { moment().format("MMM Do YYYY") } </Text>
                </View>
                <FlatList
                    data={ user.categories }
                    contentContainerStyle={ container }
                    keyExtractor={ this.keyExtractor }
                    renderItem={ this.renderBox }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const userQuery = graphql(USER_QUERY, {
    options: ownProps => ({ variables: { id: 1 }}),
    props: ({data: { loading, user }}) => ({ loading, user })
});

export default userQuery(Home);