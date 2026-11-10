import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Dispute, DisputeLoadMatch, DisputeListMatch, DisputeCreateData, DisputeUpdateData } from '../WiseTypes';
declare class DisputeEntity extends WiseEntityBase<Dispute> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DisputeEntity): DisputeEntity;
    load(this: any, reqmatch?: DisputeLoadMatch, ctrl?: Control): Promise<DisputeEntity>;
    list(this: any, reqmatch?: DisputeListMatch, ctrl?: Control): Promise<DisputeEntity[]>;
    create(this: any, reqdata?: DisputeCreateData, ctrl?: Control): Promise<DisputeEntity>;
    update(this: any, reqdata?: DisputeUpdateData, ctrl?: Control): Promise<DisputeEntity>;
}
export { DisputeEntity };
