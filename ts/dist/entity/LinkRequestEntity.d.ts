import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { LinkRequest, LinkRequestLoadMatch, LinkRequestCreateData } from '../WiseTypes';
declare class LinkRequestEntity extends WiseEntityBase<LinkRequest> {
    constructor(client: WiseSDK, entopts: any);
    make(this: LinkRequestEntity): LinkRequestEntity;
    load(this: any, reqmatch?: LinkRequestLoadMatch, ctrl?: Control): Promise<LinkRequestEntity>;
    create(this: any, reqdata?: LinkRequestCreateData, ctrl?: Control): Promise<LinkRequestEntity>;
}
export { LinkRequestEntity };
