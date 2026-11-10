import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ScaOtp, ScaOtpCreateData, ScaOtpRemoveMatch } from '../WiseTypes';
declare class ScaOtpEntity extends WiseEntityBase<ScaOtp> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ScaOtpEntity): ScaOtpEntity;
    create(this: any, reqdata?: ScaOtpCreateData, ctrl?: Control): Promise<ScaOtpEntity>;
    remove(this: any, reqmatch?: ScaOtpRemoveMatch, ctrl?: Control): Promise<ScaOtpEntity>;
}
export { ScaOtpEntity };
