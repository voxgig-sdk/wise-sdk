import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { KycReview, KycReviewLoadMatch, KycReviewListMatch, KycReviewCreateData, KycReviewUpdateData } from '../WiseTypes';
declare class KycReviewEntity extends WiseEntityBase<KycReview> {
    constructor(client: WiseSDK, entopts: any);
    make(this: KycReviewEntity): KycReviewEntity;
    load(this: any, reqmatch?: KycReviewLoadMatch, ctrl?: Control): Promise<KycReviewEntity>;
    list(this: any, reqmatch?: KycReviewListMatch, ctrl?: Control): Promise<KycReviewEntity[]>;
    create(this: any, reqdata?: KycReviewCreateData, ctrl?: Control): Promise<KycReviewEntity>;
    update(this: any, reqdata?: KycReviewUpdateData, ctrl?: Control): Promise<KycReviewEntity>;
}
export { KycReviewEntity };
