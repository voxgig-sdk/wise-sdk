import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { PaymentInstrumentDetailsResource, PaymentInstrumentDetailsResourceCreateData } from '../WiseTypes';
declare class PaymentInstrumentDetailsResourceEntity extends WiseEntityBase<PaymentInstrumentDetailsResource> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PaymentInstrumentDetailsResourceEntity): PaymentInstrumentDetailsResourceEntity;
    create(this: any, reqdata?: PaymentInstrumentDetailsResourceCreateData, ctrl?: Control): Promise<PaymentInstrumentDetailsResourceEntity>;
}
export { PaymentInstrumentDetailsResourceEntity };
