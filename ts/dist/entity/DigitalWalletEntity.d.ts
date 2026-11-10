import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { DigitalWallet, DigitalWalletCreateData } from '../WiseTypes';
declare class DigitalWalletEntity extends WiseEntityBase<DigitalWallet> {
    constructor(client: WiseSDK, entopts: any);
    make(this: DigitalWalletEntity): DigitalWalletEntity;
    create(this: any, reqdata?: DigitalWalletCreateData, ctrl?: Control): Promise<DigitalWalletEntity>;
}
export { DigitalWalletEntity };
