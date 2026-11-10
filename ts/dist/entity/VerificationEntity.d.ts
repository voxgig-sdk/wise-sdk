import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Verification, VerificationListMatch, VerificationCreateData } from '../WiseTypes';
declare class VerificationEntity extends WiseEntityBase<Verification> {
    constructor(client: WiseSDK, entopts: any);
    make(this: VerificationEntity): VerificationEntity;
    list(this: any, reqmatch?: VerificationListMatch, ctrl?: Control): Promise<VerificationEntity[]>;
    create(this: any, reqdata?: VerificationCreateData, ctrl?: Control): Promise<VerificationEntity>;
}
export { VerificationEntity };
