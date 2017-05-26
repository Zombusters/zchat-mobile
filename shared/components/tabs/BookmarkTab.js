import React, { PureComponent } from 'react';
import { View, Text }           from 'react-native';

import { tabBarIcon } from '../../navigation/tabsConfig.js';

export default class extends PureComponent {
    static navigationOptions = {
        tabBarIcon: tabBarIcon.bind(this, 'Bookmarks')
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text>Bookmark</Text>
            </View>
        );
    }
}
