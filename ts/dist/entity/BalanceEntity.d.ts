import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Balance, BalanceLoadMatch, BalanceListMatch, BalanceCreateData, BalanceRemoveMatch } from '../WiseTypes';
declare class BalanceEntity extends WiseEntityBase<Balance> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BalanceEntity): BalanceEntity;
    load(this: any, reqmatch?: BalanceLoadMatch, ctrl?: Control): Promise<BalanceEntity>;
    list(this: any, reqmatch?: BalanceListMatch, ctrl?: Control): Promise<BalanceEntity[]>;
    create(this: any, reqdata?: BalanceCreateData, ctrl?: Control): Promise<BalanceEntity>;
    remove(this: any, reqmatch?: BalanceRemoveMatch, ctrl?: Control): Promise<BalanceEntity>;
}
export { BalanceEntity };
