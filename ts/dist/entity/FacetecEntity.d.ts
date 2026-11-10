import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Facetec, FacetecLoadMatch } from '../WiseTypes';
declare class FacetecEntity extends WiseEntityBase<Facetec> {
    constructor(client: WiseSDK, entopts: any);
    make(this: FacetecEntity): FacetecEntity;
    load(this: any, reqmatch?: FacetecLoadMatch, ctrl?: Control): Promise<FacetecEntity>;
}
export { FacetecEntity };
