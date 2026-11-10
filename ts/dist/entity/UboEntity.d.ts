import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Ubo, UboListMatch, UboCreateData, UboUpdateData } from '../WiseTypes';
declare class UboEntity extends WiseEntityBase<Ubo> {
    constructor(client: WiseSDK, entopts: any);
    make(this: UboEntity): UboEntity;
    list(this: any, reqmatch?: UboListMatch, ctrl?: Control): Promise<UboEntity[]>;
    create(this: any, reqdata?: UboCreateData, ctrl?: Control): Promise<UboEntity>;
    update(this: any, reqdata?: UboUpdateData, ctrl?: Control): Promise<UboEntity>;
}
export { UboEntity };
