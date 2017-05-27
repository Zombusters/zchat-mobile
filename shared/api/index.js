import ApiClient from './ApiClient';

import ConfigAPI       from './Config';
import SessionAPI      from './Session';
import ScheduleAPI     from './Schedule';
import VideoAPI        from './Video';
import TrainingAPI     from './Training';
import NotificationAPI from './Notification';

export default function apiConstruct(config) {
    if (!config || !config.apiMediaPrefix) throw new Error('[config.apiMediaPrefix] required');

    const api = new ApiClient();
    const apiMedia = new ApiClient({ prefix: config.apiMediaPrefix });

    return {
        apiClient   : api,
        config      : new ConfigAPI({ apiClient: api, apiMedia }),
        session     : new SessionAPI({ apiClient: api, apiMedia }),
        schedule    : new ScheduleAPI({ apiClient: api }),
        video       : new VideoAPI({ apiClient: apiMedia }),
        training    : new TrainingAPI({ apiClient: api }),
        notification: new NotificationAPI({ apiClient: apiMedia })
    };
}
