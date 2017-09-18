import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    todoContainer: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 12,
        padding: 8,
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    todoContent: {
        width: (width - 56) * .85
    },
    todoCheckboxWrapper: {
        width: (width - 56) * .15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4
    },
    todoDescription: {
        fontSize: 12.5
    },
    todoCheckboxOuter: {
        height: 26,
        width: 26,
        borderColor: 'black',
        borderWidth: 1
    }
});

const {
    todoContainer,
    todoContent,
    todoCheckboxWrapper,
    todoTitle,
    todoDescription,
    todoCheckboxOuter
} = styles;

/*
    TODO: Add checkbox inner and completion functionality
    TODO: Add onClick edit functionality for todo Content
    TODO: Add Swipe to delete item
 */

class Todo extends Component {

    elipsifyContent(prop, length){
        return prop.length > length ? prop.substr(0,length) + '...' : prop;
    }

    render() {
        const { title, description } = this.props;
        return (
            <View style={ todoContainer}>
                <View style={ todoContent }>
                    <Text style={ todoTitle }>{ this.elipsifyContent(title, 34) }</Text>
                    <Text style={ todoDescription }>{ this.elipsifyContent(description, 84) }</Text>
                </View>
                <View style={ todoCheckboxWrapper }>
                    <View style={ todoCheckboxOuter }></View>
                </View>
            </View>
        )
    }
}

Todo.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    complete: PropTypes.bool,
    onPress: PropTypes.func
};

export default Todo;

