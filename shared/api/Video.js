import Base from './Base';

export default class MediaAPI extends Base {
    async uploadVideo(fileUri) {
        return await this.apiClient.postFile('videos', { fileUri });
    }

    async sendMetadata(data) {
        return await this.apiClient.postJSON('metadata', data);
    }
}
