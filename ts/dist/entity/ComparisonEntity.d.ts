import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Comparison, ComparisonListMatch } from '../WiseTypes';
declare class ComparisonEntity extends WiseEntityBase<Comparison> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ComparisonEntity): ComparisonEntity;
    list(this: any, reqmatch?: ComparisonListMatch, ctrl?: Control): Promise<ComparisonEntity[]>;
}
export { ComparisonEntity };
