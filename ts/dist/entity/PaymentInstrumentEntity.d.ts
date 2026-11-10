import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { PaymentInstrument, PaymentInstrumentLoadMatch, PaymentInstrumentListMatch, PaymentInstrumentCreateData } from '../WiseTypes';
declare class PaymentInstrumentEntity extends WiseEntityBase<PaymentInstrument> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PaymentInstrumentEntity): PaymentInstrumentEntity;
    load(this: any, reqmatch?: PaymentInstrumentLoadMatch, ctrl?: Control): Promise<PaymentInstrumentEntity>;
    list(this: any, reqmatch?: PaymentInstrumentListMatch, ctrl?: Control): Promise<PaymentInstrumentEntity[]>;
    create(this: any, reqdata?: PaymentInstrumentCreateData, ctrl?: Control): Promise<PaymentInstrumentEntity>;
}
export { PaymentInstrumentEntity };
