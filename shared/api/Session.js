import Base from './Base';

export default class EmailsAPI extends Base {
    async set(params) {
        const data = await this.apiClient.post('token', params);

        if (data.access_token) {
            const token = `${data.token_type[0].toUpperCase()}${data.token_type.substring(1)} ${data.access_token}`;

            this.apiClient.setAuthToken(token);
            this.apiMedia.setAuthToken(token);
        }

        return data;
    }

    async getUserData() {
        return await this.apiClient.get('participant/caregiverProfile');
    }
}
