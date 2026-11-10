import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Case, CaseLoadMatch, CaseCreateData } from '../WiseTypes';
declare class CaseEntity extends WiseEntityBase<Case> {
    constructor(client: WiseSDK, entopts: any);
    make(this: CaseEntity): CaseEntity;
    load(this: any, reqmatch?: CaseLoadMatch, ctrl?: Control): Promise<CaseEntity>;
    create(this: any, reqdata?: CaseCreateData, ctrl?: Control): Promise<CaseEntity>;
}
export { CaseEntity };
