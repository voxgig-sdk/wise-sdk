import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ClaimAccount, ClaimAccountCreateData } from '../WiseTypes';
declare class ClaimAccountEntity extends WiseEntityBase<ClaimAccount> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ClaimAccountEntity): ClaimAccountEntity;
    create(this: any, reqdata?: ClaimAccountCreateData, ctrl?: Control): Promise<ClaimAccountEntity>;
}
export { ClaimAccountEntity };
