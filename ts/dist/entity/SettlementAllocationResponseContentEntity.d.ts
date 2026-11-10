import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { SettlementAllocationResponseContent, SettlementAllocationResponseContentLoadMatch, SettlementAllocationResponseContentCreateData } from '../WiseTypes';
declare class SettlementAllocationResponseContentEntity extends WiseEntityBase<SettlementAllocationResponseContent> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SettlementAllocationResponseContentEntity): SettlementAllocationResponseContentEntity;
    load(this: any, reqmatch?: SettlementAllocationResponseContentLoadMatch, ctrl?: Control): Promise<SettlementAllocationResponseContentEntity>;
    create(this: any, reqdata?: SettlementAllocationResponseContentCreateData, ctrl?: Control): Promise<SettlementAllocationResponseContentEntity>;
}
export { SettlementAllocationResponseContentEntity };
