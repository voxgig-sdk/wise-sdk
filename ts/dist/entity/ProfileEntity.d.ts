import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Profile, ProfileLoadMatch, ProfileListMatch, ProfileCreateData, ProfileUpdateData, ProfileRemoveMatch } from '../WiseTypes';
declare class ProfileEntity extends WiseEntityBase<Profile> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ProfileEntity): ProfileEntity;
    load(this: any, reqmatch?: ProfileLoadMatch, ctrl?: Control): Promise<ProfileEntity>;
    list(this: any, reqmatch?: ProfileListMatch, ctrl?: Control): Promise<ProfileEntity[]>;
    create(this: any, reqdata?: ProfileCreateData, ctrl?: Control): Promise<ProfileEntity>;
    update(this: any, reqdata?: ProfileUpdateData, ctrl?: Control): Promise<ProfileEntity>;
    remove(this: any, reqmatch?: ProfileRemoveMatch, ctrl?: Control): Promise<ProfileEntity>;
}
export { ProfileEntity };
