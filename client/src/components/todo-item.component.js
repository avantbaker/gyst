import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Collapsible from 'react-native-collapsible';

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
        borderWidth: 1,
        padding: 3,
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    todoCheckboxComplete: {
        backgroundColor: 'black',
        flex: 1
    }
});

const {
    todoContainer,
    todoContent,
    todoCheckboxWrapper,
    todoTitle,
    todoDescription,
    todoCheckboxOuter,
    todoCheckboxComplete
} = styles;

/*
    TODO: Add checkbox inner and completion functionality
    TODO: Add onClick edit functionality for todo Content
    TODO: Add Swipe to delete item
 */

class Todo extends Component {

    state = {
        collapsed: true,
        complete: this.props.complete || null
    };

    constructor(props) {
        super(props);

        this.toggleDescription = this.toggleDescription.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    elipsifyContent(prop, length){
        return prop.length > length ? prop.substr(0,length) + '...' : prop;
    }

    toggleDescription() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    renderContent(content, length) {
        return this.state.collapsed ? this.elipsifyContent(content, length) : content;
    }

    render() {
        const { title, description } = this.props;
        return (
            <TouchableOpacity onPress={ this.toggleDescription }>
                <View style={ todoContainer}>
                    <View style={ todoContent } >
                        <Text style={ todoTitle }>{ this.renderContent(title, 34) }</Text>
                        <Collapsible
                            collapsed={ this.state.collapsed }
                            collapsedHeight={ 35 }
                            duration={ 1000 }>
                            <Text style={ todoDescription }>{ this.renderContent(description, 74) }</Text>
                        </Collapsible>
                    </View>
                    <TouchableOpacity onPress={ () => this.setState({ complete: !this.state.complete }) }>
                        <View style={ todoCheckboxWrapper }>
                            <View style={ todoCheckboxOuter }>
                                { this.state.complete ?
                                    <View style={ todoCheckboxComplete }><Text>X</Text></View> :
                                    null }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
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

