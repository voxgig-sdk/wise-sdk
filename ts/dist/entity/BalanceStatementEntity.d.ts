import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { BalanceStatement, BalanceStatementListMatch } from '../WiseTypes';
declare class BalanceStatementEntity extends WiseEntityBase<BalanceStatement> {
    constructor(client: WiseSDK, entopts: any);
    make(this: BalanceStatementEntity): BalanceStatementEntity;
    list(this: any, reqmatch?: BalanceStatementListMatch, ctrl?: Control): Promise<BalanceStatementEntity[]>;
}
export { BalanceStatementEntity };
