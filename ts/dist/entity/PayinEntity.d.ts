import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Payin, PayinCreateData } from '../WiseTypes';
declare class PayinEntity extends WiseEntityBase<Payin> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PayinEntity): PayinEntity;
    create(this: any, reqdata?: PayinCreateData, ctrl?: Control): Promise<PayinEntity>;
}
export { PayinEntity };
