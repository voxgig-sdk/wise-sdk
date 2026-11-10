import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { CardSensitiveDetail, CardSensitiveDetailLoadMatch, CardSensitiveDetailCreateData } from '../WiseTypes';
declare class CardSensitiveDetailEntity extends WiseEntityBase<CardSensitiveDetail> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CardSensitiveDetailEntity): CardSensitiveDetailEntity;
    load(this: any, reqmatch?: CardSensitiveDetailLoadMatch, ctrl?: Control): Promise<CardSensitiveDetailEntity>;
    create(this: any, reqdata?: CardSensitiveDetailCreateData, ctrl?: Control): Promise<CardSensitiveDetailEntity>;
}
export { CardSensitiveDetailEntity };
