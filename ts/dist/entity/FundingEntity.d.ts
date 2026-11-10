import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Funding, FundingCreateData } from '../WiseTypes';
declare class FundingEntity extends WiseEntityBase<Funding> {
    constructor(client: WiseSDK, entopts: any);
    make(this: FundingEntity): FundingEntity;
    create(this: any, reqdata?: FundingCreateData, ctrl?: Control): Promise<FundingEntity>;
}
export { FundingEntity };
