import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { ScaDeviceFingerprint, ScaDeviceFingerprintCreateData, ScaDeviceFingerprintRemoveMatch } from '../WiseTypes';
declare class ScaDeviceFingerprintEntity extends WiseEntityBase<ScaDeviceFingerprint> {
    constructor(client: WiseSDK, entopts: any);
    make(this: ScaDeviceFingerprintEntity): ScaDeviceFingerprintEntity;
    create(this: any, reqdata?: ScaDeviceFingerprintCreateData, ctrl?: Control): Promise<ScaDeviceFingerprintEntity>;
    remove(this: any, reqmatch?: ScaDeviceFingerprintRemoveMatch, ctrl?: Control): Promise<ScaDeviceFingerprintEntity>;
}
export { ScaDeviceFingerprintEntity };
