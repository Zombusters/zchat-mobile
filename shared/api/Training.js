import Base from './Base';

export default class EmailsAPI extends Base {
    async sendTrainingData(payload) {
        await this.apiClient.postJSON('participant/training', payload);
    }
}
