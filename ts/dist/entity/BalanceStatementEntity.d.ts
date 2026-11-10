import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BalanceStatement, BalanceStatementLoadMatch } from '../WiseTypes';
declare class BalanceStatementEntity extends WiseEntityBase<BalanceStatement> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BalanceStatementEntity): BalanceStatementEntity;
    load(this: any, reqmatch?: BalanceStatementLoadMatch, ctrl?: Control): Promise<BalanceStatementEntity>;
}
export { BalanceStatementEntity };
