import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { combineReducers, applyMiddleware } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

// Create the Network Interface for graphql endpoint
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql'
});

// create an instance of the ApolloClient
export const client = new ApolloClient({
    networkInterface
});

Reactotron
    .configure({
        name: 'Gylt'
    }) // controls connection & communication settings
    .useReactNative()
    .use(reactotronRedux())// add all built-in react native plugins
    .connect(); // let's connect!

export const store = Reactotron.createStore(
    combineReducers({
        apollo: client.reducer()
    }),
    {},
    applyMiddleware(client.middleware())
);