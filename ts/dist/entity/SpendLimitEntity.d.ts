import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { SpendLimit, SpendLimitListMatch, SpendLimitUpdateData, SpendLimitRemoveMatch } from '../WiseTypes';
declare class SpendLimitEntity extends WiseEntityBase<SpendLimit> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SpendLimitEntity): SpendLimitEntity;
    list(this: any, reqmatch?: SpendLimitListMatch, ctrl?: Control): Promise<SpendLimitEntity[]>;
    update(this: any, reqdata?: SpendLimitUpdateData, ctrl?: Control): Promise<SpendLimitEntity>;
    remove(this: any, reqmatch?: SpendLimitRemoveMatch, ctrl?: Control): Promise<SpendLimitEntity>;
}
export { SpendLimitEntity };
