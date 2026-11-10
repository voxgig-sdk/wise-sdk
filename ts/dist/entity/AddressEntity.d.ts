import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Address, AddressLoadMatch, AddressListMatch, AddressCreateData } from '../WiseTypes';
declare class AddressEntity extends WiseEntityBase<Address> {
    constructor(client: WiseSDK, entopts: any);
    make(this: AddressEntity): AddressEntity;
    load(this: any, reqmatch?: AddressLoadMatch, ctrl?: Control): Promise<AddressEntity>;
    list(this: any, reqmatch?: AddressListMatch, ctrl?: Control): Promise<AddressEntity[]>;
    create(this: any, reqdata?: AddressCreateData, ctrl?: Control): Promise<AddressEntity>;
}
export { AddressEntity };
