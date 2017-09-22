import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryLabel from "../components/category-label.component";
// import SortableList from 'react-native-sortable-list';
import DropdownAlert from '../components/dropdown.component';

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
        flex: 1
    },
    container: {
        flex: 1
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
});

const {
    screenWrapper,
    container,
    header,
    headerLeft,
    headerRight,
} = styles;

const data = [
    {
        id: 1,
        icon: "users",
        title: "Family",
    },
    {
        id: 2,
        icon: "odnoklassniki",
        title: "Fitness",
        itemsLeft: 1
    },
    {
        id: 3,
        icon: "leaf",
        title: "Health",
    },
    {
        id: 4,
        icon: "home",
        title: "Home",
    },
    {
        id: 5,
        icon: "shopping-bag",
        title: "Fashion",
    },
    {
        id: 6,
        icon: "reddit",
        title: "Personal",
    },
    {
        id: 7,
        icon: "heart",
        title: "Love",
    },
    {
        id: 8,
        icon: "code-fork",
        title: "Work",
    },
    {
        id: 9,
        icon: "btc",
        title: "Finance",
    }
];

/*
    TODO: Add input to allow creation of a new Todo Item
    TODO: Connect headerRight button to launch add new input dropdown
    TODO: add subtext to display swipe to delete text
    TODO: Add faded background image of Category Icon
 */

// const Sortable = (WrappedComponent) => {
//     return class extends Component {
//         constructor(props) {
//             super(props);
//
//             this._active = new Animated.Value(0);
//
//             this._style = {
//                 transform: [{
//                     scale: this._active.interpolate({
//                         inputRange: [0,1],
//                         outputRange: [0,1.1]
//                     })
//                 }],
//                 shadowRadius: this._active.interpolate({
//                     inputRange: [0,1],
//                     outputRange: [2,10]
//                 })
//             };
//         }
//
//         componentWillReceiveProps(nextProps) {
//             if( this.props.active !== nextProps.active ) {
//                 Animated.timing(this._active, {
//                     duration: 300,
//                     easing: Easing.bounce,
//                     toValue: Number(nextProps.active)
//                 }).start();
//             }
//         }
//
//         render() {
//             const { data } = this.props;
//             console.log(data);
//             return (
//                 <Animated.View style={this._style}>
//                     <WrappedComponent title={ data.title } icon={ data.icon }/>
//                 </Animated.View>
//             )
//         }
//     }
// };
//
// const SortableCategory = Sortable(CategoryLabel);

class CategoryList extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Categories',
        headerStyle: header,
        headerLeft: <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen') }>
                        <Icon name="google" style={ headerLeft }/>
                    </TouchableOpacity>,
        headerRight: <Icon name="plus" style={ headerRight } />
    });

    keyExtractor = item => item.id;

    renderBox = ({ item: { title, icon } }) => {
        return <CategoryLabel title={title} icon={icon} />
    };

    showAlert(item) {
        this.dropdown.alertWithType();
    }

    dismissAlert = () => {
        this.dropdown.dismiss()
    };

    render() {
        return (
            <View style={ screenWrapper }>
                <FlatList
                    data={data}
                    keyExtractor={ this.keyExtractor }
                    renderItem={ this.renderBox }
                    showsVerticalScrollIndicator={false}
                />
                <DropdownAlert
                    ref={(ref) => this.dropdown = ref }
                    containerStyle={{
                        backgroundColor: 'red',
                    }}
                />
                {/*<TouchableOpacity onPress={() => this.showAlert() }>*/}
                    {/*<Text>Open</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => this.dismissAlert() }>*/}
                    {/*<Text>Close</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}

export default CategoryList;

