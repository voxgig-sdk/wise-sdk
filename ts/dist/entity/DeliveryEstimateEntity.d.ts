import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { DeliveryEstimate, DeliveryEstimateLoadMatch } from '../WiseTypes';
declare class DeliveryEstimateEntity extends WiseEntityBase<DeliveryEstimate> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DeliveryEstimateEntity): DeliveryEstimateEntity;
    load(this: any, reqmatch?: DeliveryEstimateLoadMatch, ctrl?: Control): Promise<DeliveryEstimateEntity>;
}
export { DeliveryEstimateEntity };
