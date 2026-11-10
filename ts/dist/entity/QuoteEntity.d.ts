import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Quote, QuoteLoadMatch, QuoteCreateData, QuoteUpdateData } from '../WiseTypes';
declare class QuoteEntity extends WiseEntityBase<Quote> {
    constructor(client: WiseSDK, entopts: any);
    make(this: QuoteEntity): QuoteEntity;
    load(this: any, reqmatch?: QuoteLoadMatch, ctrl?: Control): Promise<QuoteEntity>;
    create(this: any, reqdata?: QuoteCreateData, ctrl?: Control): Promise<QuoteEntity>;
    update(this: any, reqdata?: QuoteUpdateData, ctrl?: Control): Promise<QuoteEntity>;
}
export { QuoteEntity };
