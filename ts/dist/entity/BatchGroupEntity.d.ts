import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BatchGroup, BatchGroupLoadMatch, BatchGroupCreateData, BatchGroupUpdateData } from '../WiseTypes';
declare class BatchGroupEntity extends WiseEntityBase<BatchGroup> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BatchGroupEntity): BatchGroupEntity;
    load(this: any, reqmatch?: BatchGroupLoadMatch, ctrl?: Control): Promise<BatchGroupEntity>;
    create(this: any, reqdata?: BatchGroupCreateData, ctrl?: Control): Promise<BatchGroupEntity>;
    update(this: any, reqdata?: BatchGroupUpdateData, ctrl?: Control): Promise<BatchGroupEntity>;
}
export { BatchGroupEntity };
