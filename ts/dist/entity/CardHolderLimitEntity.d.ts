import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { CardHolderLimit, CardHolderLimitListMatch, CardHolderLimitUpdateData, CardHolderLimitRemoveMatch } from '../WiseTypes';
declare class CardHolderLimitEntity extends WiseEntityBase<CardHolderLimit> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CardHolderLimitEntity): CardHolderLimitEntity;
    list(this: any, reqmatch?: CardHolderLimitListMatch, ctrl?: Control): Promise<CardHolderLimitEntity[]>;
    update(this: any, reqdata?: CardHolderLimitUpdateData, ctrl?: Control): Promise<CardHolderLimitEntity>;
    remove(this: any, reqmatch?: CardHolderLimitRemoveMatch, ctrl?: Control): Promise<CardHolderLimitEntity>;
}
export { CardHolderLimitEntity };
