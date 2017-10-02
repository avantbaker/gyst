import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ProgressViewIOS,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

import Box from '../components/category-box.component';
import FullWidthButton from "../components/full-width-button.component";

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: 'white',
        padding: 20,
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
    headerTitle: {
        fontSize: 10
    },
    headerLeft: {
        fontSize: 20,
        marginLeft: 20
    },
    progressBarWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBar: {
        width: 300
    },
    calendarAndContentWrapper: {
        flex: 1,
        marginTop: 10
    },
    calendar: {
        marginBottom: 8
    }
});
const calendarTheme =  {
    selectedDayBackgroundColor: 'black',
    selectedDayTextColor: 'white',
    arrowColor: 'black'
};

const {
    screenWrapper,
    header,
    headerLeft,
    container,
    progressBarWrapper,
    progressBar,
    calendarAndContentWrapper,
    calendar
} = styles;

/*
    TODO: Create Component for the inner Content on this pages boxes
    TODO: Integrate with current Entry stats
    TODO: Calculate Total stats
    TODO: create all incomplete todo pages
    TODO: add ability to view TODO by date
 */

class Analytics extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Analytics',
        headerStyle: header,
        headerLeft: <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen') }>
                        <Icon name="google" style={ headerLeft }/>
                    </TouchableOpacity>,
    });

    constructor(props) {
        super(props);

        this.state = {
            selected: [moment().format()]
        }
    }

    render() {
        return (
            <View style={ screenWrapper }>
                <View style={ progressBarWrapper }>
                    <ProgressViewIOS
                        progressTintColor={"black"}
                        style={ progressBar }
                        progress={ .6 }
                    />
                </View>
                <View style={ calendarAndContentWrapper }>
                    <Calendar
                        style={ calendar }
                        selected={ this.state.selected }
                        onDayPress={ (day) => this.setState({ selected: [ day.dateString ]}) }
                        theme={ calendarTheme } />
                    <View style={ container }>
                        <Box title="Today" component={ <Text>6/10</Text> } />
                        <Box title="Overall" component={ <Text>80%</Text> } />
                    </View>
                    <FullWidthButton title="Today's Incomplete Items" icon="list" />
                </View>
            </View>
        )
    }
}

export default Analytics;