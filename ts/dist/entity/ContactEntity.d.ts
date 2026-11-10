import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Contact, ContactCreateData } from '../WiseTypes';
declare class ContactEntity extends WiseEntityBase<Contact> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ContactEntity): ContactEntity;
    create(this: any, reqdata?: ContactCreateData, ctrl?: Control): Promise<ContactEntity>;
}
export { ContactEntity };
