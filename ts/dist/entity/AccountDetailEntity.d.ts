import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { AccountDetail, AccountDetailLoadMatch } from '../WiseTypes';
declare class AccountDetailEntity extends WiseEntityBase<AccountDetail> {
    constructor(client: WiseSDK, entopts: any);
    make(this: AccountDetailEntity): AccountDetailEntity;
    load(this: any, reqmatch?: AccountDetailLoadMatch, ctrl?: Control): Promise<AccountDetailEntity>;
}
export { AccountDetailEntity };
