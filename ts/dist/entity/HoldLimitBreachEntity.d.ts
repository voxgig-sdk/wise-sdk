import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { HoldLimitBreach, HoldLimitBreachListMatch } from '../WiseTypes';
declare class HoldLimitBreachEntity extends WiseEntityBase<HoldLimitBreach> {
    constructor(client: WiseSDK, entopts: any);
    make(this: HoldLimitBreachEntity): HoldLimitBreachEntity;
    list(this: any, reqmatch?: HoldLimitBreachListMatch, ctrl?: Control): Promise<HoldLimitBreachEntity[]>;
}
export { HoldLimitBreachEntity };
