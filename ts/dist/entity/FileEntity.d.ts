import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { File, FileListMatch, FileCreateData } from '../WiseTypes';
declare class FileEntity extends WiseEntityBase<File> {
    constructor(client: WiseSDK, entopts: any);
    make(this: FileEntity): FileEntity;
    list(this: any, reqmatch?: FileListMatch, ctrl?: Control): Promise<FileEntity[]>;
    create(this: any, reqdata?: FileCreateData, ctrl?: Control): Promise<FileEntity>;
}
export { FileEntity };
