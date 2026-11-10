import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { DirectDebitAccount, DirectDebitAccountListMatch, DirectDebitAccountCreateData } from '../WiseTypes';
declare class DirectDebitAccountEntity extends WiseEntityBase<DirectDebitAccount> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DirectDebitAccountEntity): DirectDebitAccountEntity;
    list(this: any, reqmatch?: DirectDebitAccountListMatch, ctrl?: Control): Promise<DirectDebitAccountEntity[]>;
    create(this: any, reqdata?: DirectDebitAccountCreateData, ctrl?: Control): Promise<DirectDebitAccountEntity>;
}
export { DirectDebitAccountEntity };
