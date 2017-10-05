import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 12,
        padding: 8,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        height: 55
    },
    buttonContent: {
        width: (width - 56) * .85,
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonWrapper: {
        width: (width - 56) * .15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        fontSize: 15,
        lineHeight: 15,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    buttonArrow: {
        fontSize: 20
    },
    buttonIcon: {
        marginRight: 8,
        fontSize: 20
    }
});

const {
    buttonContainer,
    buttonContent,
    buttonWrapper,
    buttonTitle,
    buttonArrow,
    buttonIcon
} = styles;


/*
    TODO: Fix misaligned title and Icon
 */

class FullWidthButton extends Component {
    render() {
        const { icon, title } = this.props;
        return (
            <TouchableOpacity onPress={ () => this.props.onPress() }>
                <View style={ [buttonContainer, this.props.style, this.props.containerStyle ] }>
                    <View style={ [ buttonContent, this.props.contentStyle ] }>
                        <Icon name={ icon } style={ [buttonIcon, this.props.leftIconStyle ] } />
                        <Text style={ [ buttonTitle, this.props.titleStyle] }>{ title }</Text>
                    </View>
                    <View style={ buttonWrapper }>
                        <Icon style={ [ buttonArrow, this.props.rightIconStyle ] } name="arrow-right" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default FullWidthButton;