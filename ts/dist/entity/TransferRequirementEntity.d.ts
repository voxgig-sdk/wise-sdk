import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { TransferRequirement, TransferRequirementCreateData } from '../WiseTypes';
declare class TransferRequirementEntity extends WiseEntityBase<TransferRequirement> {
    constructor(client: WiseSDK, entopts: any);
    make(this: TransferRequirementEntity): TransferRequirementEntity;
    create(this: any, reqdata?: TransferRequirementCreateData, ctrl?: Control): Promise<TransferRequirementEntity>;
}
export { TransferRequirementEntity };
