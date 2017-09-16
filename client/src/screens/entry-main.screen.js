import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import moment from 'moment';
import Box from '../components/category-box.component';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
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
        shadowColor: 'transparent'
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

class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: header,
        headerLeft: <Icon name="google" style={ headerLeft }/>,
        headerRight: <Icon name="line-chart" style={ headerRight } />
    };

    keyExtractor = item => item.id;

    renderBox = ({ item: { icon, title, itemsLeft } }) => {
        return <Box title={title} itemsLeft={ itemsLeft } icon={icon} />
    };

    render() {
        return (
            <View style={ screenWrapper }>
                <View style={ dateContainer }>
                    <Text style={ dateText }> { moment().format("MMM Do YYYY") } </Text>
                </View>
                <FlatList
                    data={data}
                    contentContainerStyle={ container }
                    keyExtractor={ this.keyExtractor }
                    renderItem={ this.renderBox }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

export default Home;