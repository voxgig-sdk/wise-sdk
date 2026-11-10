import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Subscription, SubscriptionLoadMatch, SubscriptionListMatch, SubscriptionCreateData, SubscriptionRemoveMatch } from '../WiseTypes';
declare class SubscriptionEntity extends WiseEntityBase<Subscription> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SubscriptionEntity): SubscriptionEntity;
    load(this: any, reqmatch?: SubscriptionLoadMatch, ctrl?: Control): Promise<SubscriptionEntity>;
    list(this: any, reqmatch?: SubscriptionListMatch, ctrl?: Control): Promise<SubscriptionEntity[]>;
    create(this: any, reqdata?: SubscriptionCreateData, ctrl?: Control): Promise<SubscriptionEntity>;
    remove(this: any, reqmatch?: SubscriptionRemoveMatch, ctrl?: Control): Promise<SubscriptionEntity>;
}
export { SubscriptionEntity };
