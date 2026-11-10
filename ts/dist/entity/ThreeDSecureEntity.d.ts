import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ThreeDSecure, ThreeDSecureCreateData } from '../WiseTypes';
declare class ThreeDSecureEntity extends WiseEntityBase<ThreeDSecure> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ThreeDSecureEntity): ThreeDSecureEntity;
    create(this: any, reqdata?: ThreeDSecureCreateData, ctrl?: Control): Promise<ThreeDSecureEntity>;
}
export { ThreeDSecureEntity };
