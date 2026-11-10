import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Transfer, TransferLoadMatch, TransferListMatch, TransferCreateData, TransferUpdateData } from '../WiseTypes';
declare class TransferEntity extends WiseEntityBase<Transfer> {
    constructor(client: WiseSDK, entopts: any);
    make(this: TransferEntity): TransferEntity;
    load(this: any, reqmatch?: TransferLoadMatch, ctrl?: Control): Promise<TransferEntity>;
    list(this: any, reqmatch?: TransferListMatch, ctrl?: Control): Promise<TransferEntity[]>;
    create(this: any, reqdata?: TransferCreateData, ctrl?: Control): Promise<TransferEntity>;
    update(this: any, reqdata?: TransferUpdateData, ctrl?: Control): Promise<TransferEntity>;
}
export { TransferEntity };
