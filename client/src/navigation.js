import PropTypes from 'prop-types';
import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Home from './screens/entry-main.screen';
import CategoryDetail from './screens/entry-category-detail.screen';
import Categories from './screens/entry-categories.screen';
import Analytics from "./screens/analytics-main.screen";

// Navigation Stack for the Entire Application
const AppNavigator = StackNavigator({
    // Home: { screen: Home },
    // Detail: { screen: CategoryDetail },
    // Categories: { screen: Categories }
    Analytics: { screen: Analytics }
});

// reducer initialization code
const firstAction = AppNavigator.router.getActionForPathAndParams('Analytics');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(tempNavState);

// reducer code
export const navigationReducer = (state = initialNavState, action) => {
    let nextState;
    switch(action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
};

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
