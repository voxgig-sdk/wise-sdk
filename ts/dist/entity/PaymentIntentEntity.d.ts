import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { PaymentIntent, PaymentIntentLoadMatch } from '../WiseTypes';
declare class PaymentIntentEntity extends WiseEntityBase<PaymentIntent> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PaymentIntentEntity): PaymentIntentEntity;
    load(this: any, reqmatch?: PaymentIntentLoadMatch, ctrl?: Control): Promise<PaymentIntentEntity>;
}
export { PaymentIntentEntity };
