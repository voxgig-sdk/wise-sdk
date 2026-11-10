import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Comparison, ComparisonLoadMatch } from '../WiseTypes';
declare class ComparisonEntity extends WiseEntityBase<Comparison> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ComparisonEntity): ComparisonEntity;
    load(this: any, reqmatch?: ComparisonLoadMatch, ctrl?: Control): Promise<ComparisonEntity>;
}
export { ComparisonEntity };
