import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ScaSession, ScaSessionCreateData } from '../WiseTypes';
declare class ScaSessionEntity extends WiseEntityBase<ScaSession> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ScaSessionEntity): ScaSessionEntity;
    create(this: any, reqdata?: ScaSessionCreateData, ctrl?: Control): Promise<ScaSessionEntity>;
}
export { ScaSessionEntity };
