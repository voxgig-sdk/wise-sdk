import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ScaFacemap, ScaFacemapCreateData, ScaFacemapRemoveMatch } from '../WiseTypes';
declare class ScaFacemapEntity extends WiseEntityBase<ScaFacemap> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ScaFacemapEntity): ScaFacemapEntity;
    create(this: any, reqdata?: ScaFacemapCreateData, ctrl?: Control): Promise<ScaFacemapEntity>;
    remove(this: any, reqmatch?: ScaFacemapRemoveMatch, ctrl?: Control): Promise<ScaFacemapEntity>;
}
export { ScaFacemapEntity };
