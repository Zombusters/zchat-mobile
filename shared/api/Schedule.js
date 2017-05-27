import Base from './Base';

export default class ScheduleAPI extends Base {
    async getSchedule(subjectId) {
        return await this.apiClient.get(`participant/${subjectId}/surveys`);
    }

    async updateActivityStatus(activityId) {
        return await this.apiClient.post(`video/surveySectionResponse/${activityId}/mediaServices`);
    }
}
