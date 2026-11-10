import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { CreateThirdPartyTransferResponseContent, CreateThirdPartyTransferResponseContentCreateData } from '../WiseTypes';
declare class CreateThirdPartyTransferResponseContentEntity extends WiseEntityBase<CreateThirdPartyTransferResponseContent> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CreateThirdPartyTransferResponseContentEntity): CreateThirdPartyTransferResponseContentEntity;
    create(this: any, reqdata?: CreateThirdPartyTransferResponseContentCreateData, ctrl?: Control): Promise<CreateThirdPartyTransferResponseContentEntity>;
}
export { CreateThirdPartyTransferResponseContentEntity };
