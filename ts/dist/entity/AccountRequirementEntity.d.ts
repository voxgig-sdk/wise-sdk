import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { AccountRequirement, AccountRequirementListMatch, AccountRequirementCreateData } from '../WiseTypes';
declare class AccountRequirementEntity extends WiseEntityBase<AccountRequirement> {
    constructor(client: WiseSDK, entopts: any);
    make(this: AccountRequirementEntity): AccountRequirementEntity;
    list(this: any, reqmatch?: AccountRequirementListMatch, ctrl?: Control): Promise<AccountRequirementEntity[]>;
    create(this: any, reqdata?: AccountRequirementCreateData, ctrl?: Control): Promise<AccountRequirementEntity>;
}
export { AccountRequirementEntity };
