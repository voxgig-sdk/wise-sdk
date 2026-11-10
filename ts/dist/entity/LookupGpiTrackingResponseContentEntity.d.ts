import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { LookupGpiTrackingResponseContent, LookupGpiTrackingResponseContentCreateData } from '../WiseTypes';
declare class LookupGpiTrackingResponseContentEntity extends WiseEntityBase<LookupGpiTrackingResponseContent> {
    constructor(client: WiseSDK, entopts: any);
    make(this: LookupGpiTrackingResponseContentEntity): LookupGpiTrackingResponseContentEntity;
    create(this: any, reqdata?: LookupGpiTrackingResponseContentCreateData, ctrl?: Control): Promise<LookupGpiTrackingResponseContentEntity>;
}
export { LookupGpiTrackingResponseContentEntity };
