import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { OneTimeToken, OneTimeTokenCreateData } from '../WiseTypes';
declare class OneTimeTokenEntity extends WiseEntityBase<OneTimeToken> {
    constructor(client: WiseSDK, entopts: any);
    make(this: OneTimeTokenEntity): OneTimeTokenEntity;
    create(this: any, reqdata?: OneTimeTokenCreateData, ctrl?: Control): Promise<OneTimeTokenEntity>;
}
export { OneTimeTokenEntity };
