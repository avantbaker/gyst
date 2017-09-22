import React, { PureComponent } from 'react';
import { DrawerItems } from 'react-navigation';

import { View } from 'react-native';

export default class SideDrawer extends PureComponent {
    render() {
        return(
            <View>
                <DrawerItems {...this.props} />
            </View>
        );
    }
}