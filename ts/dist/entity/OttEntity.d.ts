import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Ott, OttLoadMatch, OttCreateData } from '../WiseTypes';
declare class OttEntity extends WiseEntityBase<Ott> {
    constructor(client: WiseSDK, entopts: any);
    make(this: OttEntity): OttEntity;
    load(this: any, reqmatch?: OttLoadMatch, ctrl?: Control): Promise<OttEntity>;
    create(this: any, reqdata?: OttCreateData, ctrl?: Control): Promise<OttEntity>;
}
export { OttEntity };
