import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BankAccountDetailsOrder, BankAccountDetailsOrderListMatch, BankAccountDetailsOrderCreateData } from '../WiseTypes';
declare class BankAccountDetailsOrderEntity extends WiseEntityBase<BankAccountDetailsOrder> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BankAccountDetailsOrderEntity): BankAccountDetailsOrderEntity;
    list(this: any, reqmatch?: BankAccountDetailsOrderListMatch, ctrl?: Control): Promise<BankAccountDetailsOrderEntity[]>;
    create(this: any, reqdata?: BankAccountDetailsOrderCreateData, ctrl?: Control): Promise<BankAccountDetailsOrderEntity>;
}
export { BankAccountDetailsOrderEntity };
