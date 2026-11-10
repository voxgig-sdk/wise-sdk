import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Token, TokenCreateData } from '../WiseTypes';
declare class TokenEntity extends WiseEntityBase<Token> {
    constructor(client: WiseSDK, entopts: any);
    make(this: TokenEntity): TokenEntity;
    create(this: any, reqdata?: TokenCreateData, ctrl?: Control): Promise<TokenEntity>;
}
export { TokenEntity };
