export default class Base {
    constructor({ apiClient, apiMedia }) {
        if (!apiClient) throw new Error('[apiClient] required');
        this.apiClient = apiClient;
        this.apiMedia  = apiMedia;
    }
}
