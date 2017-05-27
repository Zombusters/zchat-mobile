import RNFetchBlob  from 'react-native-fetch-blob';
import store        from '../store/configureStore.js';

import api from '../apiSingleton.js';

export default class ApiClient {
    constructor({ prefix = '' } = {}) {
        this.prefix = prefix;
    }

    prepareBody(params) {
        return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    }

    get(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            params
        });
    }

    put(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: this.prepareBody(payload)
        });
    }

    patch(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            data: payload
        });
    }

    post(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: this.prepareBody(payload),
            params
        });
    }

    postJSON(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': this.authToken
            },
            params
        });
    }

    postFormData(requestUrl, formData) {
        return this.request({
            url: requestUrl,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
    }

    delete(requestUrl) {
        return this.request({
            url: requestUrl,
            method: 'delete',
            body: '{"data":{}}'
        });
    }

    async postFile(url, { fileUri }) {
        const filename = fileUri.split(/[\\/]/).pop();

        const res = await RNFetchBlob.fetch('POST', `${this.prefix}/${url}`, {
            'Content-Type' : 'multipart/form-data',
            'Authorization': this.authToken
        }, [
            { name : 'video', filename, data: RNFetchBlob.wrap(fileUri) }
        ]).uploadProgress((written, total) => {
            // for now it's just for debug
            console.log('uploaded', written / total);
        });

        const data = await res.json();

        if (data && data.status === 1) {
            return data;
        }

        if (this.onError) {
            this.onError(data.error);
        }

        return Promise.reject(data.error);
    }

    async request(options) {
        const tmpOptions = { ...options };

        if (!tmpOptions.params) {
            tmpOptions.params = {};
        }

        if (this.authToken) {
            tmpOptions.params.token = this.authToken;
        }

        if (!this.prefix) {
            await api.config.getAPI();
        }

        const { connection } = store.getState();

        if (connection.isConnected && this.prefix) {
            const res = await fetch(`${this.prefix}/${options.url}`, { ...tmpOptions,
                headers: tmpOptions.headers || {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Authorization': this.authToken
                }
            });

            const data = await res.json();

            if (data && !data.error && !data.Message && data.status !== 0) {
                return data;
            }

            if (this.onError) {
                this.onError(data.error);
            }

            return Promise.reject(data.error);
        }

        return Promise.reject('No internet connection');
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }

    setPrefix(prefix = '') {
        this.prefix = prefix;
    }

    setErrorHandler(handler) {
        this.onError = handler;
    }
}
