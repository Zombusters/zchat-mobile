import Base from './Base';

export default class ConfigAPI extends Base {
    async getAPI() {
        const prefix = await this.apiMedia.get('');

        this.apiClient.setPrefix(prefix.apiUrl);
    }
}
