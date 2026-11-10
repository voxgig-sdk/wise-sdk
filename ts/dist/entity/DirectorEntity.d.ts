import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Director, DirectorListMatch, DirectorCreateData, DirectorUpdateData, DirectorRemoveMatch } from '../WiseTypes';
declare class DirectorEntity extends WiseEntityBase<Director> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DirectorEntity): DirectorEntity;
    list(this: any, reqmatch?: DirectorListMatch, ctrl?: Control): Promise<DirectorEntity[]>;
    create(this: any, reqdata?: DirectorCreateData, ctrl?: Control): Promise<DirectorEntity>;
    update(this: any, reqdata?: DirectorUpdateData, ctrl?: Control): Promise<DirectorEntity>;
    remove(this: any, reqmatch?: DirectorRemoveMatch, ctrl?: Control): Promise<DirectorEntity>;
}
export { DirectorEntity };
