import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { GpiTracking, GpiTrackingCreateData } from '../WiseTypes';
declare class GpiTrackingEntity extends WiseEntityBase<GpiTracking> {
    constructor(client: WiseSDK, entopts: any);
    make(this: GpiTrackingEntity): GpiTrackingEntity;
    create(this: any, reqdata?: GpiTrackingCreateData, ctrl?: Control): Promise<GpiTrackingEntity>;
}
export { GpiTrackingEntity };
