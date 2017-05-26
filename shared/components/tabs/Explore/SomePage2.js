import React, { PureComponent } from 'react';
import { View, Text }           from 'react-native';

import { tabBarIcon } from './tabsConfig.js';

export default class extends PureComponent {
    static navigationOptions = {
        tabBarIcon: tabBarIcon('SomePage2')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Some Page 2</Text>
            </View>
        );
    }
}
