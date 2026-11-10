import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BusinessProfile, BusinessProfileCreateData, BusinessProfileUpdateData } from '../WiseTypes';
declare class BusinessProfileEntity extends WiseEntityBase<BusinessProfile> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BusinessProfileEntity): BusinessProfileEntity;
    create(this: any, reqdata?: BusinessProfileCreateData, ctrl?: Control): Promise<BusinessProfileEntity>;
    update(this: any, reqdata?: BusinessProfileUpdateData, ctrl?: Control): Promise<BusinessProfileEntity>;
}
export { BusinessProfileEntity };
