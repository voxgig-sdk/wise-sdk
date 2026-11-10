import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { CardOrder, CardOrderLoadMatch, CardOrderListMatch, CardOrderCreateData, CardOrderUpdateData } from '../WiseTypes';
declare class CardOrderEntity extends WiseEntityBase<CardOrder> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CardOrderEntity): CardOrderEntity;
    load(this: any, reqmatch?: CardOrderLoadMatch, ctrl?: Control): Promise<CardOrderEntity>;
    list(this: any, reqmatch?: CardOrderListMatch, ctrl?: Control): Promise<CardOrderEntity[]>;
    create(this: any, reqdata?: CardOrderCreateData, ctrl?: Control): Promise<CardOrderEntity>;
    update(this: any, reqdata?: CardOrderUpdateData, ctrl?: Control): Promise<CardOrderEntity>;
}
export { CardOrderEntity };
