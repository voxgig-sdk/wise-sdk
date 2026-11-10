import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { N3ds, N3dsCreateData } from '../WiseTypes';
declare class N3dsEntity extends WiseEntityBase<N3ds> {
    constructor(client: WiseSDK, entopts: any);
    make(this: N3dsEntity): N3dsEntity;
    create(this: any, reqdata?: N3dsCreateData, ctrl?: Control): Promise<N3dsEntity>;
}
export { N3dsEntity };
