import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { PaymentInitiation, PaymentInitiationLoadMatch, PaymentInitiationCreateData } from '../WiseTypes';
declare class PaymentInitiationEntity extends WiseEntityBase<PaymentInitiation> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PaymentInitiationEntity): PaymentInitiationEntity;
    load(this: any, reqmatch?: PaymentInitiationLoadMatch, ctrl?: Control): Promise<PaymentInitiationEntity>;
    create(this: any, reqdata?: PaymentInitiationCreateData, ctrl?: Control): Promise<PaymentInitiationEntity>;
}
export { PaymentInitiationEntity };
