import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Rule, RuleListMatch, RuleCreateData } from '../WiseTypes';
declare class RuleEntity extends WiseEntityBase<Rule> {
    constructor(client: WiseSDK, entopts: any);
    make(this: RuleEntity): RuleEntity;
    list(this: any, reqmatch?: RuleListMatch, ctrl?: Control): Promise<RuleEntity[]>;
    create(this: any, reqdata?: RuleCreateData, ctrl?: Control): Promise<RuleEntity>;
}
export { RuleEntity };
