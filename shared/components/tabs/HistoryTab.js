import React, { PureComponent } from 'react';
import { View, Text }           from 'react-native';

import { tabBarIcon } from '../../navigation/tabsConfig.js';

export default class extends PureComponent {
    static navigationOptions = {
        tabBarIcon: tabBarIcon.bind(this, 'History')
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                <Text>History</Text>
            </View>
        );
    }
}
