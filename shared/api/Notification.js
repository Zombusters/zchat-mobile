import Base from './Base';

export default class NotificationAPI extends Base {
    async registerUserTag(data) {
        return await this.apiClient.postJSON('notifications', data);
    }

    async unRegisterUserTag(registrationId) {
        return await this.apiClient.delete(`notifications/${registrationId}`);
    }
}
