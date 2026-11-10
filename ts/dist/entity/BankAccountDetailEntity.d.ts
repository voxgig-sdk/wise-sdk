import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BankAccountDetail, BankAccountDetailCreateData } from '../WiseTypes';
declare class BankAccountDetailEntity extends WiseEntityBase<BankAccountDetail> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BankAccountDetailEntity): BankAccountDetailEntity;
    create(this: any, reqdata?: BankAccountDetailCreateData, ctrl?: Control): Promise<BankAccountDetailEntity>;
}
export { BankAccountDetailEntity };
