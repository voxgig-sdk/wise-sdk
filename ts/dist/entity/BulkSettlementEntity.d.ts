import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BulkSettlement, BulkSettlementCreateData } from '../WiseTypes';
declare class BulkSettlementEntity extends WiseEntityBase<BulkSettlement> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BulkSettlementEntity): BulkSettlementEntity;
    create(this: any, reqdata?: BulkSettlementCreateData, ctrl?: Control): Promise<BulkSettlementEntity>;
}
export { BulkSettlementEntity };
