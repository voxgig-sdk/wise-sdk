import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { CardTransaction, CardTransactionLoadMatch, CardTransactionListMatch } from '../WiseTypes';
declare class CardTransactionEntity extends WiseEntityBase<CardTransaction> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CardTransactionEntity): CardTransactionEntity;
    load(this: any, reqmatch?: CardTransactionLoadMatch, ctrl?: Control): Promise<CardTransactionEntity>;
    list(this: any, reqmatch?: CardTransactionListMatch, ctrl?: Control): Promise<CardTransactionEntity[]>;
}
export { CardTransactionEntity };
