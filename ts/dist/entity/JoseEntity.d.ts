import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Jose, JoseLoadMatch, JoseCreateData } from '../WiseTypes';
declare class JoseEntity extends WiseEntityBase<Jose> {
    constructor(client: WiseSDK, entopts: any);
    make(this: JoseEntity): JoseEntity;
    load(this: any, reqmatch?: JoseLoadMatch, ctrl?: Control): Promise<JoseEntity>;
    create(this: any, reqdata?: JoseCreateData, ctrl?: Control): Promise<JoseEntity>;
}
export { JoseEntity };
