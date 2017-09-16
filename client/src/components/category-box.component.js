import PropTypes from 'prop-types';
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
    boxWrapper: {
        width: (width/2) - 30,
        height: (width/2) - 30,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 15
    },
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemsLeftIndicator: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'black',
        position: 'absolute',
        right: 8,
        top: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemsLeftText: {
        color: 'white'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemIcon: {
        fontSize: 40,
        marginBottom: 8
    }
});

const {
    boxWrapper,
    box,
    itemsLeftIndicator,
    itemsLeftText,
    itemTitle,
    itemIcon,
} = styles;

class Box extends Component {
    render() {
        const { icon, title, itemsLeft } = this.props;
        return (
            <View style={ boxWrapper }>
                <View style={ itemsLeftIndicator }>
                    <Text style={ itemsLeftText }>{ itemsLeft }</Text>
                </View>
                <View style={ box }>
                    <Icon name={ icon } style={ itemIcon }/>
                    <Text style={ itemTitle }>{ title }</Text>
                </View>
            </View>
        );
    }
}

Box.propTypes = {
    title: PropTypes.string,
    itemTitle: PropTypes.string,
    itemsLeft: PropTypes.number
};

export default Box;