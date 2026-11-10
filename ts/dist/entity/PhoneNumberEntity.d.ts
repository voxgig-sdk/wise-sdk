import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { PhoneNumber, PhoneNumberCreateData } from '../WiseTypes';
declare class PhoneNumberEntity extends WiseEntityBase<PhoneNumber> {
    constructor(client: WiseSDK, entopts: any);
    make(this: PhoneNumberEntity): PhoneNumberEntity;
    create(this: any, reqdata?: PhoneNumberCreateData, ctrl?: Control): Promise<PhoneNumberEntity>;
}
export { PhoneNumberEntity };
