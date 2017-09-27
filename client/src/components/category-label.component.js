import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    categoryContainer: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 12,
        padding: 8,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        backgroundColor: 'white'
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
    TODO: Move swipe button styles and logic into their own partial
 */

const swipeoutStyles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    textButton: {
        color: 'white'
    },
    opacity: {
        opacity: 0.8,
    },
});

let swipeBtns = [{
    text: 'Delete',
    // component: SwipeDelete,
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)'
}];

let swipeOutStyle = {
    backgroundColor: 'white',
};

class CategoryLabel extends Component {

    constructor(props) {
        super(props);

        this.state = { viewHeight: undefined };
    }

    onLayout = event => {
        if( this.state.viewHeight ) return;
        let { height } = event.nativeEvent.layout;
        this.setState({ viewHeight: height })
    };

    render() {
        const { icon, title } = this.props;

        if( this.state.viewHeight ) {
            swipeOutStyle = {
                ...swipeOutStyle,
                height: this.state.viewHeight,
                marginBottom: 12
            }
        }

        return  (
            <Swipeout
                right={swipeBtns}
                autoclose="true"
                style={swipeOutStyle}
            >
                <TouchableOpacity {...this.props.handlers}>
                    <View style={ categoryContainer } onLayout={this.onLayout}>
                        <View style={ categoryContent }>
                            <Icon name={ icon } style={ categoryIcon } />
                            <Text style={ categoryTitle }>{ title }</Text>
                        </View>
                        <View style={ categoryWrapper }>
                            <Icon style={ categoryDelete } name="times" />
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}


export default CategoryLabel;