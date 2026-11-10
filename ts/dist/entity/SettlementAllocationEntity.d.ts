import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { SettlementAllocation, SettlementAllocationLoadMatch, SettlementAllocationCreateData } from '../WiseTypes';
declare class SettlementAllocationEntity extends WiseEntityBase<SettlementAllocation> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SettlementAllocationEntity): SettlementAllocationEntity;
    load(this: any, reqmatch?: SettlementAllocationLoadMatch, ctrl?: Control): Promise<SettlementAllocationEntity>;
    create(this: any, reqdata?: SettlementAllocationCreateData, ctrl?: Control): Promise<SettlementAllocationEntity>;
}
export { SettlementAllocationEntity };
