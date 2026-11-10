import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Rate, RateListMatch } from '../WiseTypes';
declare class RateEntity extends WiseEntityBase<Rate> {
    constructor(client: WiseSDK, entopts: any);
    make(this: RateEntity): RateEntity;
    list(this: any, reqmatch?: RateListMatch, ctrl?: Control): Promise<RateEntity[]>;
}
export { RateEntity };
