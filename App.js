import React, { Component } from 'react';
import { Provider }         from 'react-redux';

import TrueNavigation from './shared/navigation/TrueNavigation.js';

import store from './shared/store/configureStore.js';

export default class extends Component {
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const initialPosition = JSON.stringify(position);
                console.log({ initialPosition });
            },
            (error) => console.log(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    render() {
        return (
            <Provider store={store}>
                <TrueNavigation />
            </Provider>
        );
    }
}
