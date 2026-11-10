import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Activity, ActivityListMatch } from '../WiseTypes';
declare class ActivityEntity extends WiseEntityBase<Activity> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ActivityEntity): ActivityEntity;
    list(this: any, reqmatch?: ActivityListMatch, ctrl?: Control): Promise<ActivityEntity[]>;
}
export { ActivityEntity };
