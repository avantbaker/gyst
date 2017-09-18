import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
// import Reactotron from 'reactotron-react-native';
// import { reactotronRedux } from 'reactotron-redux';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import AppWithNavigationState, { navigationReducer } from "./navigation";

// Create the Network Interface for graphql endpoint
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql'
});

// create an instance of the ApolloClient
export const client = new ApolloClient({
    networkInterface
});

// Reactotron
//     .configure({
//         name: 'Gylt'
//     }) // controls connection & communication settings
//     .useReactNative()
//     .use(reactotronRedux()) // add all built-in react native plugins // let's connect!
//     .connect();

const store = createStore(
    combineReducers({
        apollo: client.reducer(),
        nav: navigationReducer
    }),
    {},
    applyMiddleware(client.middleware())
);

console.disableYellowBox = true;

export default class gylt extends Component {
    render() {
        return (
            <ApolloProvider store={store} client={client}>
                <AppWithNavigationState />
            </ApolloProvider>
        );
    }
}

