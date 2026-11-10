import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { IncomingTransfer, IncomingTransferLoadMatch } from '../WiseTypes';
declare class IncomingTransferEntity extends WiseEntityBase<IncomingTransfer> {
    constructor(client: WiseSDK, entopts: any);
    make(this: IncomingTransferEntity): IncomingTransferEntity;
    load(this: any, reqmatch?: IncomingTransferLoadMatch, ctrl?: Control): Promise<IncomingTransferEntity>;
}
export { IncomingTransferEntity };
