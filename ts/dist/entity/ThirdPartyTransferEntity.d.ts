import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ThirdPartyTransfer, ThirdPartyTransferLoadMatch, ThirdPartyTransferCreateData } from '../WiseTypes';
declare class ThirdPartyTransferEntity extends WiseEntityBase<ThirdPartyTransfer> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ThirdPartyTransferEntity): ThirdPartyTransferEntity;
    load(this: any, reqmatch?: ThirdPartyTransferLoadMatch, ctrl?: Control): Promise<ThirdPartyTransferEntity>;
    create(this: any, reqdata?: ThirdPartyTransferCreateData, ctrl?: Control): Promise<ThirdPartyTransferEntity>;
}
export { ThirdPartyTransferEntity };
