import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { MultiCurrencyAccount, MultiCurrencyAccountLoadMatch, MultiCurrencyAccountListMatch } from '../WiseTypes';
declare class MultiCurrencyAccountEntity extends WiseEntityBase<MultiCurrencyAccount> {
    constructor(client: WiseSDK, entopts: any);
    make(this: MultiCurrencyAccountEntity): MultiCurrencyAccountEntity;
    load(this: any, reqmatch?: MultiCurrencyAccountLoadMatch, ctrl?: Control): Promise<MultiCurrencyAccountEntity>;
    list(this: any, reqmatch?: MultiCurrencyAccountListMatch, ctrl?: Control): Promise<MultiCurrencyAccountEntity[]>;
}
export { MultiCurrencyAccountEntity };
