import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { TestNotification, TestNotificationCreateData } from '../WiseTypes';
declare class TestNotificationEntity extends WiseEntityBase<TestNotification> {
    constructor(client: WiseSDK, entopts: any);
    make(this: TestNotificationEntity): TestNotificationEntity;
    create(this: any, reqdata?: TestNotificationCreateData, ctrl?: Control): Promise<TestNotificationEntity>;
}
export { TestNotificationEntity };
