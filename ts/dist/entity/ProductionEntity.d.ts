import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Production, ProductionLoadMatch, ProductionUpdateData } from '../WiseTypes';
declare class ProductionEntity extends WiseEntityBase<Production> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ProductionEntity): ProductionEntity;
    load(this: any, reqmatch?: ProductionLoadMatch, ctrl?: Control): Promise<ProductionEntity>;
    update(this: any, reqdata?: ProductionUpdateData, ctrl?: Control): Promise<ProductionEntity>;
}
export { ProductionEntity };
