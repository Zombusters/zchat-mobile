import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Video } from 'expo';

export default class extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        currentRoute: PropTypes.object
    }

    state = {
        isOpen: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentRoute.routeName === 'Video') this.setState({ isOpen: true });
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.currentRoute.routeName === 'Video';
    }

    _handleVideoRef = component => {
        const playbackObject = component;

        if (this.state.isOpen) {
            playbackObject.loadAsync({ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }, {}, true);
        }
    }

    static navigationOptions = {
        tabBarIcon: (
            <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Video</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ width: 300, height: 400, backgroundColor: 'black' }}>
                {this.state.isOpen
                    ? <Video
                        ref={this._handleVideoRef}
                        style={{ width: 300, height: 400, backgroundColor: 'black' }}
                        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        useNativeControls
                      />
                    : null}
            </View>
        );
    }
}
