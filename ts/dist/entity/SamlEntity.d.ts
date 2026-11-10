import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Saml, SamlLoadMatch, SamlCreateData } from '../WiseTypes';
declare class SamlEntity extends WiseEntityBase<Saml> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SamlEntity): SamlEntity;
    load(this: any, reqmatch?: SamlLoadMatch, ctrl?: Control): Promise<SamlEntity>;
    create(this: any, reqdata?: SamlCreateData, ctrl?: Control): Promise<SamlEntity>;
}
export { SamlEntity };
