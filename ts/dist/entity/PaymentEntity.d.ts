import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Payment, PaymentListMatch } from '../WiseTypes';
declare class PaymentEntity extends WiseEntityBase<Payment> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PaymentEntity): PaymentEntity;
    list(this: any, reqmatch?: PaymentListMatch, ctrl?: Control): Promise<PaymentEntity[]>;
}
export { PaymentEntity };
