import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { AddressRequirement, AddressRequirementListMatch, AddressRequirementCreateData } from '../WiseTypes';
declare class AddressRequirementEntity extends WiseEntityBase<AddressRequirement> {
    constructor(client: WiseSDK, entopts: any);
    make(this: AddressRequirementEntity): AddressRequirementEntity;
    list(this: any, reqmatch?: AddressRequirementListMatch, ctrl?: Control): Promise<AddressRequirementEntity[]>;
    create(this: any, reqdata?: AddressRequirementCreateData, ctrl?: Control): Promise<AddressRequirementEntity>;
}
export { AddressRequirementEntity };
