import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { DeliveryUpdate, DeliveryUpdateCreateData } from '../WiseTypes';
declare class DeliveryUpdateEntity extends WiseEntityBase<DeliveryUpdate> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DeliveryUpdateEntity): DeliveryUpdateEntity;
    create(this: any, reqdata?: DeliveryUpdateCreateData, ctrl?: Control): Promise<DeliveryUpdateEntity>;
}
export { DeliveryUpdateEntity };
