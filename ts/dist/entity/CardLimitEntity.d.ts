import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { CardLimit, CardLimitLoadMatch, CardLimitUpdateData } from '../WiseTypes';
declare class CardLimitEntity extends WiseEntityBase<CardLimit> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CardLimitEntity): CardLimitEntity;
    load(this: any, reqmatch?: CardLimitLoadMatch, ctrl?: Control): Promise<CardLimitEntity>;
    update(this: any, reqdata?: CardLimitUpdateData, ctrl?: Control): Promise<CardLimitEntity>;
}
export { CardLimitEntity };
