import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { PayinDepositDetail, PayinDepositDetailLoadMatch } from '../WiseTypes';
declare class PayinDepositDetailEntity extends WiseEntityBase<PayinDepositDetail> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PayinDepositDetailEntity): PayinDepositDetailEntity;
    load(this: any, reqmatch?: PayinDepositDetailLoadMatch, ctrl?: Control): Promise<PayinDepositDetailEntity>;
}
export { PayinDepositDetailEntity };
