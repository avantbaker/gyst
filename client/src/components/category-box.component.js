import PropTypes from 'prop-types';
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

    constructor(props) {
        super(props);

        this.goToCategoryDetail = this.props.onPress ? this.props.onPress.bind(this, this.props.category ) : undefined;
    }

    renderItemsLeft() {
        const { itemsLeft } = this.props.category || this.props;
        return itemsLeft ? <View style={ itemsLeftIndicator }>
                                <Text style={ itemsLeftText }>{ itemsLeft }</Text>
                            </View> : undefined
    }

    renderContent() {
        const { component, icon } = this.props.category || this.props;
        return component ? component : <Icon name={ icon } style={ itemIcon }/>
    }

    render() {
        const { icon, title } = this.props.category || this.props;
        return (
            <TouchableOpacity onPress={ this.goToCategoryDetail } >
                <View style={ [ boxWrapper, this.props.boxWrapperStyle] }>
                    { this.renderItemsLeft() }
                    <View style={ [box, this.props.boxInnerStyle ] }>
                        { this.renderContent() }
                        <Text style={ [itemTitle, this.props.itemTitleStyle] }>{ title }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

Box.propTypes = {
    title: PropTypes.string,
    itemTitle: PropTypes.string,
    itemsLeft: PropTypes.number
};

export default Box;