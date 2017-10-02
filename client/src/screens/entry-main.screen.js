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
import { _ } from 'lodash';
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

/*
    TODO: Add Create Entry for Today Screen when there isn't a current Entry
    TODO: Integrate that screen with the creation of a new Entry
    TODO: Connect header right button to Analytics page
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
        const { navigate, user } = this.props.navigation;

        navigate('DetailsScreen', {
            id: category.id,
            title: category.title,
            categoryId: category.id,
            entryId: this.props.user.entries[0].id
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

    filterCategoriesForItemsLeft( incompleteTodos ) {
        const { user: { categories } } = this.props;
        // Group the Incomplete To_dos;
        let sorted = _.groupBy( incompleteTodos, 'category.id' );
        return _.map( categories, ( category ) => {
            // if the current category isn't present in sorted than skip
            if( !sorted[category.id] ) {
                category = Object.assign({}, category, { itemsLeft: 0 });
                return category;
            }
            // sorted count to items left category
            category = Object.assign({}, category, { itemsLeft: sorted[category.id].length });
            return category;
        });
    }

    render() {
        const { loading, user } = this.props;

        if(loading) {
            return (
                <View style={[ screenWrapper, styles.loading ]}>
                    <ActivityIndicator />
                </View>
            );
        }

        // Get first Entries incomplete to_dos
        let { incompleteTodos } = user.entries[0];

        return (
            <View style={ screenWrapper }>
                <View style={ dateContainer }>
                    <Text style={ dateText }> { moment().format("MMM Do YYYY") } </Text>
                </View>
                <FlatList
                    data={ this.filterCategoriesForItemsLeft(incompleteTodos) }
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

Home.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool
};

export default userQuery(Home);