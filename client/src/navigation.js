import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { DrawerRoutes, DrawerOptions } from "./navigation/stacks"

// Navigation Stack for the Entire Application
const AppNavigator = DrawerNavigator(DrawerRoutes, DrawerOptions);

// reducer initialization code
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
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
