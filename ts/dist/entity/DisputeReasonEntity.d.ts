import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { DisputeReason, DisputeReasonListMatch } from '../WiseTypes';
declare class DisputeReasonEntity extends WiseEntityBase<DisputeReason> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DisputeReasonEntity): DisputeReasonEntity;
    list(this: any, reqmatch?: DisputeReasonListMatch, ctrl?: Control): Promise<DisputeReasonEntity[]>;
}
export { DisputeReasonEntity };
