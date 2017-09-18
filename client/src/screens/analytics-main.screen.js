import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ProgressViewIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import Box from '../components/category-box.component';
import FullWidthButton from "../components/full-width-button.component";

// import ProgressBar from '../components/progress-bar.component';

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
        fontSize: 16
    },
});

const {
    screenWrapper,
    header,
    headerLeft,
    container,
} = styles;

/*
 */

class Analytics extends Component {

    static navigationOptions = {
        title: 'Analytics',
        headerStyle: header,
        headerLeft: <Icon name="google" style={ headerLeft }/>,
    };


    render() {
        return (
            <View style={ screenWrapper }>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <ProgressViewIOS
                        progressTintColor={"black"}
                        style={{ width: 300 }}
                        progress={.6}
                    />
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <Calendar theme={{
                        selectedDayBackgroundColor: 'black',
                        selectedDayTextColor: 'white', arrowColor: 'black'}} />
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