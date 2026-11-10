import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Card, CardLoadMatch, CardListMatch, CardCreateData, CardUpdateData } from '../WiseTypes';
declare class CardEntity extends WiseEntityBase<Card> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CardEntity): CardEntity;
    load(this: any, reqmatch?: CardLoadMatch, ctrl?: Control): Promise<CardEntity>;
    list(this: any, reqmatch?: CardListMatch, ctrl?: Control): Promise<CardEntity[]>;
    create(this: any, reqdata?: CardCreateData, ctrl?: Control): Promise<CardEntity>;
    update(this: any, reqdata?: CardUpdateData, ctrl?: Control): Promise<CardEntity>;
}
export { CardEntity };
