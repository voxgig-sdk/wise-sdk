import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { SpendControl, SpendControlListMatch, SpendControlCreateData, SpendControlRemoveMatch } from '../WiseTypes';
declare class SpendControlEntity extends WiseEntityBase<SpendControl> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SpendControlEntity): SpendControlEntity;
    list(this: any, reqmatch?: SpendControlListMatch, ctrl?: Control): Promise<SpendControlEntity[]>;
    create(this: any, reqdata?: SpendControlCreateData, ctrl?: Control): Promise<SpendControlEntity>;
    remove(this: any, reqmatch?: SpendControlRemoveMatch, ctrl?: Control): Promise<SpendControlEntity>;
}
export { SpendControlEntity };
