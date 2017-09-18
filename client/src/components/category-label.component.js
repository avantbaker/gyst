import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    categoryContainer: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 12,
        padding: 8,
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    categoryContent: {
        width: (width - 56) * .85,
        alignItems: 'center',
        flexDirection: 'row'
    },
    categoryWrapper: {
        width: (width - 56) * .15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryTitle: {
        fontSize: 15,
        lineHeight: 15,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    categoryDelete: {
        fontSize: 20
    },
    categoryIcon: {
        marginRight: 8,
        fontSize: 20
    }
});

const {
    categoryContainer,
    categoryContent,
    categoryWrapper,
    categoryTitle,
    categoryDelete,
    categoryIcon
} = styles;


/*
    TODO: Fix misaligned title and Icon
 */

class CategoryLabel extends Component {
    render() {
        const { icon, title } = this.props;
        return (
            <View style={ categoryContainer }>
                <View style={ categoryContent }>
                    <Icon name={ icon } style={ categoryIcon } />
                    <Text style={ categoryTitle }>{ title }</Text>
                </View>
                <View style={ categoryWrapper }>
                    <Icon style={ categoryDelete } name="times" />
                </View>
            </View>
        )
    }
}

export default CategoryLabel;