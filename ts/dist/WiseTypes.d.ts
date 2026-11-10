export interface AccountDetail {
    accountHolderName: string;
    accountIdentification: any;
    country: string;
    id: number;
    profileId: number;
    state: string;
}
export interface AccountDetailLoadMatch {
    id: number;
}
export interface AccountRequirement {
    accountHolderName?: string;
    currency?: string;
    details?: Record<string, any>;
    fields?: any[];
    ownedByCustomer?: boolean;
    profile?: number;
    title?: string;
    type?: string;
    ultimateBeneficiary: Record<string, any> | null;
    usageInfo?: string;
}
export interface AccountRequirementListMatch {
    quote_id: string;
    address_required?: boolean;
    originator_legal_entity_type?: string;
}
export interface AccountRequirementCreateData {
    quote_id: string;
    originator_legal_entity_type?: string;
    accountHolderName?: string;
    currency?: string;
    details?: Record<string, any>;
    ownedByCustomer?: boolean;
    profile?: number;
    type?: string;
    ultimateBeneficiary: Record<string, any> | null;
}
export interface Activity {
    createdOn?: string;
    description?: string;
    id?: string;
    primaryAmount?: string;
    resource?: Record<string, any>;
    secondaryAmount?: string;
    status?: string;
    title?: string;
    type?: string;
    updatedOn?: string;
}
export interface ActivityListMatch {
    profile_id: number;
    monetary_resource_type?: string;
    next_cursor?: string;
    since?: string;
    size?: number;
    status?: string;
    until?: string;
}
export interface Address {
    details?: Record<string, any>;
    id?: number;
    profile?: number;
}
export interface AddressLoadMatch {
    id: number;
}
export interface AddressListMatch {
    profile?: number;
}
export interface AddressCreateData {
    details: Record<string, any>;
    profile: number;
}
export interface AddressRequirement {
    details: Record<string, any>;
    fields?: any[];
    profile?: number;
    type?: string;
}
export interface AddressRequirementListMatch {
    details?: Record<string, any>;
    fields?: any[];
    profile?: number;
    type?: string;
}
export interface AddressRequirementCreateData {
    details: Record<string, any>;
    profile?: number;
}
export interface Balance {
    amount?: Record<string, any>;
    cashAmount?: Record<string, any>;
    creationTime?: string;
    currency?: string;
    icon?: Record<string, any> | null;
    id?: number;
    investmentState?: string;
    modificationTime?: string;
    name?: string | null;
    overdraft?: Record<string, any>;
    quoteId?: string;
    reservedAmount?: Record<string, any>;
    sourceBalanceId?: number;
    state: string;
    targetBalanceId?: number;
    targetRecipientId: number;
    totalAvailable?: Record<string, any>;
    totalCash?: Record<string, any>;
    totalWorth?: Record<string, any>;
    type?: string;
    visible?: boolean;
}
export interface BalanceLoadMatch {
    currency?: string;
    profile_id: number;
    id?: number;
}
export interface BalanceListMatch {
    profile_id: number;
    type: string;
}
export interface BalanceCreateData {
    hold_limit_breach_id?: number;
    profile_id: number;
    amount?: Record<string, any>;
    currency: string;
    name?: string | null;
    quoteId?: string;
    sourceBalanceId?: number;
    state: string;
    targetBalanceId?: number;
    targetRecipientId: number;
    type: string;
}
export interface BalanceRemoveMatch {
    id: number;
    profile_id: number;
}
export interface BalanceStatement {
    amount?: Record<string, any>;
    date?: string;
    details?: Record<string, any>;
    exchangeDetails?: Record<string, any> | null;
    id?: string;
    referenceNumber?: string;
    runningBalance?: Record<string, any>;
    totalFees?: Record<string, any>;
    type?: string;
}
export interface BalanceStatementListMatch {
    id: number;
    profile_id: number;
    currency: string;
    interval_end: string;
    interval_start: string;
    statement_locale?: string;
    type?: string;
}
export interface BankAccountDetail {
    accountDetailsId?: number;
    active?: boolean;
    balanceId?: number | null;
    creationTime?: string;
    currency?: string;
    id?: string;
    internationalDetails?: Record<string, any> | null;
    localDetails?: Record<string, any>;
    modificationTime?: string;
    reason?: string;
    requirements?: any[];
    status?: string;
    targetAccountId: number;
}
export interface BankAccountDetailListMatch {
    profile_id: number;
    currency: string;
}
export interface BankAccountDetailCreateData {
    payment_id?: number;
    profile_id: number;
    currency: string;
    reason?: string;
    targetAccountId: number;
}
export interface BatchGroup {
    alreadyPaid?: boolean;
    fileName?: string | null;
    groupType?: string;
    id?: string;
    name?: string;
    payInDetails?: any[];
    payinSessionId?: string | null;
    profileId?: number;
    shortId?: number;
    sourceCurrency?: string;
    status?: string;
    transferIds?: any[];
    type: string;
    userId?: number;
    version?: number;
}
export interface BatchGroupLoadMatch {
    id: string;
    profile_id: number;
}
export interface BatchGroupCreateData {
    batch_payment_id?: string;
    profile_id: number;
    name: string;
    sourceCurrency: string;
    type: string;
    $action?: string;
    [action: string]: any;
}
export interface BatchGroupUpdateData {
    id: string;
    profile_id: number;
    status?: string;
    version?: number;
}
export interface BulkSettlement {
    balanceTransfer?: number;
    refundedTransfers?: any[];
    settlementCurrency?: string;
    settlementDate: string;
    settlementReference: string;
    transfers: any[];
    type: string;
}
export interface BulkSettlementCreateData {
    balanceTransfer?: number;
    refundedTransfers?: any[];
    settlementCurrency?: string;
    settlementDate: string;
    settlementReference: string;
    transfers: any[];
    type: string;
}
export interface BusinessProfile {
    abn?: string | null;
    acn?: string | null;
    actorEmail?: string;
    address?: Record<string, any>;
    arbn?: string | null;
    businessFreeFormDescription?: string;
    businessName?: string;
    businessNameInKatakana?: string | null;
    businessRepresentative?: Record<string, any>;
    companyRole?: string;
    companyType?: string;
    contactDetails?: Record<string, any>;
    createdAt?: string;
    currentState?: string;
    descriptionOfBusiness?: string;
    email?: string;
    externalCustomerId?: string;
    firstLevelCategory?: string;
    fullName?: string;
    id?: number;
    industryCategories?: any[];
    operationalAddresses?: any[];
    publicId?: string;
    registrationNumber?: string;
    secondLevelCategory?: string;
    type: string;
    updatedAt?: string;
    userId?: number;
    webpage?: string;
}
export interface BusinessProfileCreateData {
    abn?: string | null;
    acn?: string | null;
    actorEmail?: string;
    address?: Record<string, any>;
    arbn?: string | null;
    businessFreeFormDescription?: string;
    businessName?: string;
    businessNameInKatakana?: string | null;
    businessRepresentative?: Record<string, any>;
    companyRole?: string;
    companyType?: string;
    contactDetails: Record<string, any>;
    externalCustomerId?: string;
    firstLevelCategory?: string;
    industryCategories?: any[];
    operationalAddresses?: any[];
    registrationNumber?: string;
    secondLevelCategory?: string;
    webpage?: string;
}
export interface BusinessProfileUpdateData {
    profile_id: number;
    abn?: string | null;
    acn?: string | null;
    address?: Record<string, any>;
    arbn?: string | null;
    businessFreeFormDescription?: string;
    businessName?: string;
    businessNameInKatakana?: string | null;
    companyRole?: string;
    companyType?: string;
    contactDetails?: Record<string, any>;
    externalCustomerId?: string;
    firstLevelCategory?: string;
    id?: number;
    industryCategories?: any[];
    operationalAddresses?: any[];
    registrationNumber?: string;
    secondLevelCategory?: string;
    webpage?: string;
}
export interface Card {
    bankIdentificationNumber?: string;
    cardHolderName?: string;
    cardProgram?: Record<string, any>;
    clientId?: string;
    creationTime?: string;
    expiryDate?: string;
    id?: string;
    lastFourDigits?: string;
    modificationTime?: string;
    phoneNumber?: string;
    profileId?: number;
    status?: Record<string, any>;
    token?: string;
    unlockSpendingPermissions?: string;
}
export interface CardLoadMatch {
    id: string;
    profile_id: number;
}
export interface CardListMatch {
    profile_id: number;
    page_number?: number;
    page_size?: number;
    $action?: string;
    [action: string]: any;
}
export interface CardCreateData {
    card_token: string;
    profile_id: number;
    bankIdentificationNumber?: string;
    cardHolderName?: string;
    cardProgram?: Record<string, any>;
    clientId?: string;
    creationTime?: string;
    expiryDate?: string;
    id?: string;
    lastFourDigits?: string;
    modificationTime?: string;
    phoneNumber?: string;
    profileId?: number;
    status?: Record<string, any>;
    token?: string;
    unlockSpendingPermissions?: string;
    $action?: string;
    [action: string]: any;
}
export interface CardUpdateData {
    card_token: string;
    profile_id: number;
    status?: Record<string, any>;
    permissions?: any;
    $action?: string;
    [action: string]: any;
}
export interface CardHolderLimit {
    aggregateWindow: Record<string, any>;
    spendLimits?: any[];
    type: string;
}
export interface CardHolderLimitListMatch {
    card_holder_profile_id: number;
    profile_id: number;
}
export interface CardHolderLimitUpdateData {
    card_holder_profile_id: number;
    profile_id: number;
    aggregateWindow?: Record<string, any>;
    type?: string;
}
export interface CardHolderLimitRemoveMatch {
    card_holder_profile_id: number;
    profile_id: number;
}
export interface CardLimit {
    daily?: Record<string, any> | null;
    lifetime?: Record<string, any> | null;
    monthly?: Record<string, any> | null;
    transaction?: Record<string, any> | null;
}
export interface CardLimitLoadMatch {
    card_token: string;
    profile_id: number;
}
export interface CardLimitUpdateData {
    card_token: string;
    profile_id: number;
    daily?: Record<string, any> | null;
    lifetime?: Record<string, any> | null;
    monthly?: Record<string, any> | null;
    transaction?: Record<string, any> | null;
}
export interface CardOrder {
    address?: Record<string, any>;
    cardHolderName?: string;
    cardHolderProfileId?: number;
    cardProgram?: Record<string, any>;
    cardToken?: string | null;
    city?: string;
    clientId?: string;
    country?: string;
    creationTime?: string;
    deliveryDetails?: Record<string, any>;
    deliveryEstimate?: string;
    deliveryOption?: string;
    embossedName?: string;
    errors?: any[];
    firstLine?: string;
    id?: number;
    lifetimeLimit?: number | null;
    modificationTime?: string;
    phoneNumber?: string;
    postCode?: string;
    profileId?: number;
    program: string;
    replacementDetails?: Record<string, any>;
    replacesCard?: string | null;
    secondLine?: string | null;
    state?: string | null;
    status?: string;
    thirdLine?: string | null;
}
export interface CardOrderLoadMatch {
    id: number;
    profile_id: number;
}
export interface CardOrderListMatch {
    profile_id: number;
    page_number?: number;
    page_size?: number;
    $action?: string;
    [action: string]: any;
}
export interface CardOrderCreateData {
    address?: Record<string, any>;
    cardHolderName: string;
    cardHolderProfileId?: number;
    city?: string;
    country?: string;
    deliveryOption?: string;
    embossedName?: string;
    firstLine?: string;
    lifetimeLimit?: number | null;
    phoneNumber?: string;
    postCode?: string;
    program: string;
    replacementDetails?: Record<string, any>;
    secondLine?: string | null;
    state?: string | null;
    thirdLine?: string | null;
}
export interface CardOrderUpdateData {
    id: number;
    profile_id: number;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface CardSensitiveDetail {
    cardholderName?: string;
    cvv2?: string;
    encryptedPayload: string;
    expiryDate?: string;
    key?: string;
    keyVersion: number;
    nonce?: string;
    pan?: string;
    pin?: string;
    version?: number;
}
export interface CardSensitiveDetailLoadMatch {
    cardholderName?: string;
    cvv2?: string;
    encryptedPayload?: string;
    expiryDate?: string;
    key?: string;
    keyVersion?: number;
    nonce?: string;
    pan?: string;
    pin?: string;
    version?: number;
}
export interface CardSensitiveDetailCreateData {
    encryptedPayload: string;
    keyVersion: number;
}
export interface CardTransaction {
    approvalCode?: string | null;
    arn?: string | null;
    authorisationMethod?: string;
    balanceChannelReferenceId?: string | null;
    billingAmount?: Record<string, any>;
    cardToken?: string;
    creationTime?: string;
    credits?: any[];
    debits?: any[];
    declineReason?: string | null;
    detailedDeclineReason?: string | null;
    fees?: any[];
    id?: number;
    merchant?: Record<string, any>;
    modificationTime?: string;
    pinValidationResult?: string | null;
    purgeTime?: string | null;
    relayAuthorisationData?: Record<string, any> | null;
    state?: string;
    transactionAmount?: Record<string, any>;
    transactionAmountWithFees?: Record<string, any>;
    type?: string;
}
export interface CardTransactionLoadMatch {
    id: number;
    profile_id: number;
}
export interface CardTransactionListMatch {
    card_token: string;
    profile_id: number;
    from_creation_time: string;
    last_id?: number;
    page_size?: number;
    to_creation_time: string;
}
export interface Case {
    createdAt: string;
    description?: string;
    details?: Record<string, any>;
    externalId?: string;
    id: number;
    messages: any[];
    profileId: number;
    reference: Record<string, any>;
    status: string;
    subType?: string;
    subject?: string;
    type: string;
    updatedAt?: string;
}
export interface CaseLoadMatch {
    id: number;
}
export interface CaseCreateData {
    description?: string;
    details?: Record<string, any>;
    externalId?: string;
    subject?: string;
    type?: string;
}
export interface ClaimAccount {
    claimAccountCode?: string;
    registrationCode: string;
}
export interface ClaimAccountCreateData {
    registrationCode: string;
}
export interface Comparison {
    alias?: string;
    id?: number;
    logos?: Record<string, any>;
    name?: string;
    partner?: boolean;
    quotes?: any[];
    type?: string;
}
export interface ComparisonListMatch {
    exclude_partner?: boolean;
    filter?: string;
    include_wise?: boolean;
    mid_market_rate?: number;
    number_of_provider?: number;
    pay_in_method?: string;
    provider?: string;
    provider_country?: string;
    provider_type?: any[];
    recipient_gets_amount?: number;
    send_amount?: number;
    source_country?: string;
    source_currency: string;
    target_country?: string;
    target_currency: string;
    wise_estimated_delivery?: string;
    wise_fee?: number;
    wise_quote_created_time?: string;
}
export interface Contact {
    contactId?: string;
    identifier?: string;
    name?: string;
    targetCurrency?: string;
}
export interface ContactCreateData {
    profile_id: number;
    is_direct_identifier_creation: boolean;
    identifier?: string;
    targetCurrency?: string;
}
export interface CreateThirdPartyTransferResponseContent {
    details: Record<string, any>;
    originalTransferId: string;
    originator: any;
    quote: string;
    sourceAccount?: number;
    targetAccount: number;
}
export interface CreateThirdPartyTransferResponseContentCreateData {
    profile_id: number;
    details: Record<string, any>;
    originalTransferId: string;
    originator: any;
    quote: string;
    sourceAccount?: number;
    targetAccount: number;
}
export interface Currency {
    code?: string;
    countryKeywords?: any[];
    name?: string;
    supportsDecimals?: boolean;
    symbol?: string;
}
export interface CurrencyListMatch {
    code?: string;
    countryKeywords?: any[];
    name?: string;
    supportsDecimals?: boolean;
    symbol?: string;
}
export interface DeliveryEstimate {
    estimatedDeliveryDate?: string;
    formattedEstimatedDeliveryDate?: string;
    id?: string;
}
export interface DeliveryEstimateLoadMatch {
    id: number;
    timezone?: string;
}
export interface DeliveryUpdate {
    delivery_update: string;
    delivery_update_path: any[];
    estimated_delivery_at?: string | null;
    observation_id: string;
    occurred_at: string;
    scheme?: string | null;
}
export interface DeliveryUpdateCreateData {
    transfer_id: number;
    delivery_update: string;
    delivery_update_path: any[];
    estimated_delivery_at?: string | null;
    scheme?: string | null;
}
export interface DigitalWallet {
    activation: string;
    activationData?: string;
    cardDisplayName?: string;
    cardLastDigits?: string;
    cardNetwork?: string;
    certificates: any[];
    clientDeviceId: string;
    clientWalletAccountId: string;
    encryptedPassData?: string;
    ephemeralKey?: string;
    nonce: string;
    nonceSignature: string;
    opaquePaymentCard?: string;
    paymentTokens?: any[];
    tokenServiceProvider?: string;
    userAddress?: Record<string, any>;
    walletNames?: any[];
}
export interface DigitalWalletCreateData {
    activation: string;
    certificates: any[];
    clientDeviceId: string;
    clientWalletAccountId: string;
    nonce: string;
    nonceSignature: string;
    walletNames?: any[];
}
export interface DirectDebitAccount {
    currency?: string;
    details?: Record<string, any>;
    id?: number;
    type?: string;
}
export interface DirectDebitAccountListMatch {
    profile_id: number;
    currency: string;
    type: string;
}
export interface DirectDebitAccountCreateData {
    profile_id: number;
    currency?: string;
    details?: Record<string, any>;
    type?: string;
}
export interface Director {
    countryOfResidenceIso3Code?: string;
    dateOfBirth?: string;
    directors?: any[];
    firstName?: string;
    id?: number;
    lastName?: string;
}
export interface DirectorListMatch {
    profile_id: number;
}
export interface DirectorCreateData {
    profile_id: number;
    directors?: any[];
}
export interface DirectorUpdateData {
    profile_id: number;
    directors?: any[];
}
export interface DirectorRemoveMatch {
    profile_id: number;
}
export interface Dispute {
    canWithdraw?: boolean;
    createdAt?: string;
    createdBy?: string;
    disclaimer?: Record<string, any>;
    files?: Record<string, any>;
    form?: Record<string, any>;
    id?: string;
    lastUpdatedAt?: string;
    profileId?: number;
    reason?: string;
    receipt?: string;
    status?: string;
    statusMessage?: string;
    subStatus?: string;
    transaction?: Record<string, any>;
    transactionId?: number;
}
export interface DisputeLoadMatch {
    id: string;
    profile_id: number;
}
export interface DisputeListMatch {
    profile_id: number;
    page_number?: number;
    page_size?: number;
    status?: string;
    transaction_id?: number;
}
export interface DisputeCreateData {
    profile_id: number;
    reason?: string;
    scheme?: string;
    canWithdraw?: boolean;
    createdAt?: string;
    createdBy?: string;
    disclaimer?: Record<string, any>;
    files?: Record<string, any>;
    form?: Record<string, any>;
    id?: string;
    lastUpdatedAt?: string;
    profileId?: number;
    receipt?: string;
    status?: string;
    statusMessage?: string;
    subStatus?: string;
    transaction?: Record<string, any>;
    transactionId?: number;
}
export interface DisputeUpdateData {
    id: string;
    profile_id: number;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface DisputeReason {
    code?: string;
    description?: string;
    isFraud?: boolean;
    subOptions?: any[];
    supportsMultipleTransactions?: boolean;
    tooltip?: string;
}
export interface DisputeReasonListMatch {
    profile_id: number;
}
export interface Facetec {
}
export interface FacetecLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface File {
    createdAt: string;
    file: string;
    fileId: string;
    fileName: string;
    profileId: number;
    purpose: string;
    submissionData: Record<string, any>;
}
export interface FileListMatch {
    page_number?: number;
    page_size?: number;
    profile_id?: number;
}
export interface FileCreateData {
    createdAt: string;
    file: string;
    fileId: string;
    fileName: string;
    profileId: number;
    purpose: string;
    submissionData: Record<string, any>;
}
export interface Funding {
    balanceTransactionId?: number;
    status?: string;
    type?: string;
}
export interface FundingCreateData {
    profile_id: number;
    transfer_id: number;
    status?: string;
    type?: string;
    balanceId?: any;
    partnerReference?: any;
}
export interface HoldLimitBreach {
    amount?: number;
    closingReason?: string;
    createdAt?: string;
    currency?: string;
    id?: number;
    profileId?: number;
    state?: string;
    updatedAt?: string;
}
export interface HoldLimitBreachListMatch {
    profile_id: number;
    closing_reason?: string;
    state?: string;
}
export interface IncomingTransfer {
    accountDetailsId?: string;
    amounts: Record<string, any>;
    balanceId: string;
    chargeBearer?: string;
    creditTransferType?: string;
    creditedTime: string;
    creditor: Record<string, any>;
    debtor: Record<string, any>;
    endToEndId?: string;
    exchangeRate: number;
    fees: Record<string, any>;
    id: string;
    previousInstructingAgents: any[];
    profileId: number;
    scheme: string;
    state: string;
    uetr?: string;
    unstructuredReference?: string;
}
export interface IncomingTransferLoadMatch {
    id: string;
}
export interface Jose {
    keyId?: string;
    keyMaterial?: Record<string, any>;
    publicKeyMaterial?: Record<string, any>;
    scope?: string;
    validFrom?: string;
    validTill?: string;
    version?: number;
}
export interface JoseLoadMatch {
    algorithm: string;
    scope: string;
    version?: number;
}
export interface JoseCreateData {
    keyId?: string;
    publicKeyMaterial?: Record<string, any>;
    scope?: string;
    validFrom?: string;
    validTill?: string;
}
export interface KycReview {
    createdAt?: string;
    id?: string;
    link?: Record<string, any> | null;
    redirectUrl?: string | null;
    requiredBy?: string | null;
    requirements?: any[] | null;
    status?: string;
    triggerData?: Record<string, any>;
    triggerReferences?: any[];
    type: string;
    updatedAt?: string;
}
export interface KycReviewLoadMatch {
    id: string;
    profile_id: number;
}
export interface KycReviewListMatch {
    profile_id: number;
    page_number?: number;
    page_size?: number;
}
export interface KycReviewCreateData {
    profile_id: number;
    requirement_key?: string;
    createdAt?: string;
    id?: string;
    link?: Record<string, any> | null;
    redirectUrl?: string | null;
    requiredBy?: string | null;
    requirements?: any[] | null;
    status?: string;
    triggerData?: Record<string, any>;
    triggerReferences?: any[];
    type: string;
    updatedAt?: string;
}
export interface KycReviewUpdateData {
    id: string;
    profile_id: number;
    redirectUrl?: string | null;
}
export interface LinkRequest {
    clientKey: string;
    email: string;
    id: string;
    metadata: Record<string, any>;
    profileId: number;
    redirectUrl: string;
    transactionId: number;
    type: string;
}
export interface LinkRequestLoadMatch {
    id: string;
}
export interface LinkRequestCreateData {
    profile_id: number;
    email: string;
    redirectUrl: string;
    transactionId: number;
    $action?: string;
    [action: string]: any;
}
export interface LookupGpiTrackingResponseContent {
    identifier: string;
    identifierType: string;
    transactions?: any[];
}
export interface LookupGpiTrackingResponseContentCreateData {
    identifier: string;
    identifierType: string;
}
export interface Message {
    submissionData: Record<string, any>;
    type: string;
}
export interface MessageCreateData {
    case_id: number;
    submissionData: Record<string, any>;
    type: string;
}
export interface MultiCurrencyAccount {
}
export interface MultiCurrencyAccountLoadMatch {
    country?: string;
    profile_id?: number;
    state?: string;
    $action?: string;
    [action: string]: any;
}
export interface MultiCurrencyAccountListMatch {
    profile_id: number;
}
export interface N3ds {
    challengeStatus: string;
    transactionReference: string;
}
export interface N3dsCreateData {
    profile_id: number;
    challengeStatus: string;
    transactionReference: string;
}
export interface OneTimeToken {
    challenges?: any[];
    faceMap?: string;
    oneTimeToken?: string;
    validity?: number;
}
export interface OneTimeTokenCreateData {
    profile_id: number;
    faceMap?: string;
}
export interface Ott {
    actionType?: string;
    challenges?: any[];
    oneTimeToken?: string;
    otpCode?: string;
    userId?: number;
    validity?: number;
}
export interface OttLoadMatch {
    actionType?: string;
    challenges?: any[];
    oneTimeToken?: string;
    otpCode?: string;
    userId?: number;
    validity?: number;
}
export interface OttCreateData {
    otpCode?: string;
}
export interface Payin {
    amount?: number;
    currency?: string;
    details?: Record<string, any>;
    failureReason?: string;
    id?: string;
    payinSessionId?: string;
    paymentInstrumentId?: string;
    qrCodeInBase64?: string;
    reference?: string;
    status?: string;
}
export interface PayinCreateData {
    payin_session_id?: string;
    profile_id: number;
    payment_instrument_id?: string;
    amount?: number;
    currency?: string;
    details?: Record<string, any>;
    failureReason?: string;
    id?: string;
    payinSessionId: string;
    paymentInstrumentId?: string;
    qrCodeInBase64?: string;
    reference?: string;
    status?: string;
}
export interface PayinDepositDetail {
    payinBank?: Record<string, any>;
    payinBankAccount?: Record<string, any>;
    wiseInformation?: Record<string, any>;
}
export interface PayinDepositDetailLoadMatch {
    profile_id: number;
    transfer_id: number;
}
export interface Payment {
    amount?: number;
    currency?: string;
    id?: number;
    method?: string;
    pricingVariant?: string | null;
    timeCreated?: string;
    timeUpdated?: string;
}
export interface PaymentListMatch {
    transfer_id: number;
}
export interface PaymentInitiation {
    id?: string;
}
export interface PaymentInitiationLoadMatch {
    batch_group_id: string;
    id: number;
    profile_id: number;
}
export interface PaymentInitiationCreateData {
    batch_group_id: string;
    profile_id: number;
    accountId?: any;
    reference?: any;
    type?: any;
}
export interface PaymentInstrument {
    accountHolderName?: string;
    accountNumber?: string;
    accountOwnerDetails?: Record<string, any>;
    accountType?: string;
    bankCode?: string;
    bankName?: string;
    branchCode?: string;
    disconnectReason?: string;
    id?: string;
    reference?: string;
    status?: string;
    type?: string;
}
export interface PaymentInstrumentLoadMatch {
    id: string;
    profile_id: number;
}
export interface PaymentInstrumentListMatch {
    id: string;
    profile_id: number;
    $action?: string;
    [action: string]: any;
}
export interface PaymentInstrumentCreateData {
    profile_id: number;
    accountHolderName?: string;
    accountNumber: string;
    accountOwnerDetails?: Record<string, any>;
    accountType?: string;
    bankCode?: string;
    branchCode?: string;
    reference?: string;
    type: string;
}
export interface PaymentInstrumentDetailsResource {
    accountNumber?: string;
    accountOwnerDetails?: Record<string, any>;
    bankCode?: string;
    bankName?: string;
    branchCode?: string;
    disconnectReason?: string;
    id?: string;
    reference?: string;
    status?: string;
    type?: string;
}
export interface PaymentInstrumentDetailsResourceCreateData {
    id: string;
    profile_id: number;
    accountNumber?: string;
    accountOwnerDetails?: Record<string, any>;
    bankCode?: string;
    bankName?: string;
    branchCode?: string;
    disconnectReason?: string;
    reference?: string;
    status?: string;
    type?: string;
    $action?: string;
    [action: string]: any;
}
export interface PaymentIntent {
    allocationId?: string;
    allocationType?: string;
    createdAt?: string;
    fundingSource?: string;
    id?: string;
    partnerEntityId?: string;
    paymentReference?: string;
    profileId?: string;
    reason?: string;
    recipientType?: string;
    sourceAmount?: number;
    sourceCurrency?: string;
    state?: string;
    targetAmount?: number;
    targetCurrency?: string;
    updatedAt?: string;
}
export interface PaymentIntentLoadMatch {
    allocation_id: string;
    id: string;
}
export interface PhoneNumber {
    clientId?: string;
    id?: number;
    phoneNumber?: string;
    type?: string;
    verified?: boolean;
}
export interface PhoneNumberCreateData {
    user_id: number;
    phoneNumber?: string;
}
export interface Production {
    description?: string | null;
    errorCode?: string | null;
    kioskId?: string | null;
    occurredAt?: string;
    status?: string;
}
export interface ProductionLoadMatch {
    card_token: string;
    profile_id: number;
}
export interface ProductionUpdateData {
    card_token: string;
    profile_id: number;
    kioskId?: string | null;
}
export interface Profile {
    address?: Record<string, any>;
    avatar?: string;
    contactDetails?: Record<string, any>;
    createdAt?: string;
    currentState?: string;
    dateOfBirth?: string;
    email?: string;
    firstName?: string;
    fullName?: string;
    id?: number;
    lastName?: string;
    phoneNumber?: string;
    preferredName?: string;
    publicId?: string;
    secondaryAddresses?: any[];
    type?: string;
    updatedAt?: string;
    userId?: number;
}
export interface ProfileLoadMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface ProfileListMatch {
    address?: Record<string, any>;
    avatar?: string;
    contactDetails?: Record<string, any>;
    createdAt?: string;
    currentState?: string;
    dateOfBirth?: string;
    email?: string;
    firstName?: string;
    fullName?: string;
    id?: number;
    lastName?: string;
    phoneNumber?: string;
    preferredName?: string;
    publicId?: string;
    secondaryAddresses?: any[];
    type?: string;
    updatedAt?: string;
    userId?: number;
}
export interface ProfileCreateData {
    address?: Record<string, any>;
    avatar?: string;
    contactDetails?: Record<string, any>;
    createdAt?: string;
    currentState?: string;
    dateOfBirth?: string;
    email?: string;
    firstName?: string;
    fullName?: string;
    id?: number;
    lastName?: string;
    phoneNumber?: string;
    preferredName?: string;
    publicId?: string;
    secondaryAddresses?: any[];
    type?: string;
    updatedAt?: string;
    userId?: number;
    birthCity?: any;
    birthCountry?: any;
    employerCity?: any;
    employerCountry?: any;
    employerName?: any;
    expiryDate?: any;
    externalCustomerId?: any;
    firstNameInKana?: any;
    issueDate?: any;
    issuerCountry?: any;
    issuerState?: any;
    lastNameInKana?: any;
    nationality?: any;
    occupations?: any;
    recipientId?: any;
    uniqueIdentifier?: any;
    $action?: string;
    [action: string]: any;
}
export interface ProfileUpdateData {
    id: number;
    address?: Record<string, any>;
    contactDetails?: Record<string, any>;
    dateOfBirth?: string;
    firstName?: string;
    lastName?: string;
    preferredName?: string;
    type?: string;
    actorEmail?: any;
    clientId?: any;
    expiryDate?: any;
    externalCustomerId?: any;
    firstNameInKana?: any;
    issueDate?: any;
    issuerCountry?: any;
    issuerState?: any;
    lastNameInKana?: any;
    localizedInformation?: any;
    nationality?: any;
    occupations?: any;
    placeOfBirth?: any;
    sex?: any;
    uniqueIdentifier?: any;
    updateContext?: any;
    $action?: string;
    [action: string]: any;
}
export interface ProfileRemoveMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface Quote {
    createdTime?: string;
    creationContext?: Record<string, any>;
    expirationTime?: string;
    guaranteedTargetAmount?: boolean;
    guaranteedTargetAmountAllowed?: boolean;
    id?: string;
    notices?: any[];
    payOut?: string;
    paymentMetadata?: Record<string, any>;
    paymentOptions?: any[];
    preferredPayIn?: string;
    pricingConfiguration?: Record<string, any>;
    profile?: number;
    providedAmountType?: string;
    rate?: number;
    rateExpirationTime?: string;
    rateType?: string;
    sourceAmount?: number;
    sourceCurrency?: string;
    status?: string;
    targetAccount?: number;
    targetAmount?: number;
    targetAmountAllowed?: boolean;
    targetCurrency?: string;
    user?: number;
}
export interface QuoteLoadMatch {
    id: string;
    profile_id: number;
}
export interface QuoteCreateData {
    creationContext?: Record<string, any>;
    payOut?: string;
    paymentMetadata?: Record<string, any>;
    preferredPayIn?: string;
    pricingConfiguration?: Record<string, any>;
    sourceAmount?: number;
    sourceCurrency: string;
    targetAccount?: number;
    targetAmount?: number;
    targetCurrency: string;
}
export interface QuoteUpdateData {
    id: string;
    profile_id: number;
    payOut?: string;
    paymentMetadata?: Record<string, any>;
    pricingConfiguration?: Record<string, any>;
    targetAccount?: number;
}
export interface Rate {
    rate: number;
    source: string;
    target: string;
    time: string;
}
export interface RateListMatch {
    from?: string;
    group?: string;
    source?: string;
    target?: string;
    time?: string;
    to?: string;
}
export interface Recipient {
    acceptedOutcomes: boolean;
    accountHolderName?: string;
    accountId?: number;
    accountSummary?: string;
    active?: boolean;
    commonFieldMap?: Record<string, any>;
    confirmations?: Record<string, any>;
    country?: string;
    creatorId?: number;
    currency?: string;
    details?: Record<string, any>;
    displayFields?: any[];
    hash?: string;
    id?: number;
    isInternal?: boolean;
    legalEntityType?: string;
    longAccountSummary?: string;
    name?: Record<string, any>;
    ownedByCustomer?: boolean;
    profile?: number;
    profileId?: number;
    quoteId?: string;
    type?: string;
    ultimateBeneficiary: Record<string, any> | null;
}
export interface RecipientLoadMatch {
    account_id: number;
}
export interface RecipientListMatch {
    active?: boolean;
    creator_id?: number;
    currency?: string;
    owned_by_customer?: boolean;
    profile?: number;
    profile_id?: number;
    seek_position?: number | null;
    size?: number;
    sort?: string;
    type?: string;
}
export interface RecipientCreateData {
    refund?: boolean;
    acceptedOutcomes: boolean;
    accountHolderName?: string;
    accountId?: number;
    accountSummary?: string;
    active?: boolean;
    commonFieldMap?: Record<string, any>;
    confirmations?: Record<string, any>;
    country?: string;
    creatorId?: number;
    currency?: string;
    details?: Record<string, any>;
    displayFields?: any[];
    hash?: string;
    id?: number;
    isInternal?: boolean;
    legalEntityType?: string;
    longAccountSummary?: string;
    name?: Record<string, any>;
    ownedByCustomer?: boolean;
    profile?: number;
    profileId?: number;
    quoteId?: string;
    type?: string;
    ultimateBeneficiary: Record<string, any> | null;
}
export interface RecipientUpdateData {
    account_id: number;
    quote_id?: string;
    acceptedOutcomes?: boolean;
}
export interface RecipientRemoveMatch {
    account_id: number;
}
export interface Rule {
    description?: string;
    id?: number;
    operation?: string;
    type?: string;
    values?: any[];
}
export interface RuleListMatch {
    application_id: string;
}
export interface RuleCreateData {
    application_id: string;
    description?: string;
    operation?: string;
    type?: string;
    values?: any[];
}
export interface Saml {
    RelayState?: string;
    SAMLResponse: string;
}
export interface SamlLoadMatch {
    registration_id: string;
}
export interface SamlCreateData {
    RelayState?: string;
    SAMLResponse: string;
}
export interface ScaDeviceFingerprint {
    createdAt?: string;
    deviceFingerprintId?: string;
    id?: string;
}
export interface ScaDeviceFingerprintCreateData {
    profile_id: number;
}
export interface ScaDeviceFingerprintRemoveMatch {
    id: string;
    profile_id: number;
}
export interface ScaFacemap {
    faceMap?: string;
}
export interface ScaFacemapCreateData {
    profile_id: number;
    faceMap?: string;
}
export interface ScaFacemapRemoveMatch {
    profile_id: number;
}
export interface ScaOtp {
    obfuscatedPhoneNo?: string;
}
export interface ScaOtpCreateData {
    obfuscatedPhoneNo?: string;
}
export interface ScaOtpRemoveMatch {
    phone_number_id: number;
    user_id: number;
}
export interface ScaSession {
}
export interface ScaSessionCreateData {
    profile_id: number;
    $action?: string;
    [action: string]: any;
}
export interface SettlementAllocationResponseContent {
    createdAt?: string;
    currency?: string;
    expectedTotalAmount?: number;
    id?: string;
    nextPageToken?: string;
    paymentIntents?: any[];
    paymentReference?: string;
    state?: string;
    updatedAt?: string;
}
export interface SettlementAllocationResponseContentLoadMatch {
    allocation_id: string;
    include_payment_intent?: boolean;
    page_size?: number;
    page_token?: string;
}
export interface SettlementAllocationResponseContentCreateData {
    createdAt?: string;
    currency?: string;
    expectedTotalAmount?: number;
    id?: string;
    nextPageToken?: string;
    paymentIntents?: any[];
    paymentReference?: string;
    state?: string;
    updatedAt?: string;
    $action?: string;
    [action: string]: any;
}
export interface Simulation {
    amount?: Record<string, any>;
    balanceId: number;
    balancesAfter?: any[];
    beneficiaryAccount?: string;
    beneficiaryAddress?: Record<string, any>;
    beneficiaryName?: string;
    business?: string;
    cardNumber?: string;
    channel?: string;
    charges?: any[];
    created?: string;
    creationTime?: number;
    currency: string;
    currencyCode: string;
    description?: string | null;
    details?: Record<string, any>;
    errorCode?: string;
    failure_reason_code?: string;
    hasActiveIssues?: boolean;
    id?: string;
    instructedAmount?: number;
    instructedCurrencyCode?: string;
    key?: string;
    mcc?: number;
    paymentReference?: string;
    pos?: string;
    previousInstructingAgents?: any[];
    profileId: number;
    quote?: number;
    rate?: number;
    ref?: Record<string, any>;
    reference?: string;
    requestedAction?: string;
    requirement?: string;
    requirements?: any[];
    senderAccount?: string;
    senderAccountNumber?: string;
    senderAddress?: Record<string, any>;
    senderBank?: Record<string, any>;
    senderBankCode?: string;
    senderBic?: string;
    senderName?: string;
    sourceAccount?: string;
    sourceCurrency?: string;
    sourceValue?: number;
    state?: string;
    status?: string;
    targetAccount?: number;
    targetCurrency?: string;
    targetValue?: number;
    transactionId?: number;
    transactionType?: string;
    transferRequest?: string;
    user?: number;
    wise_id?: number;
}
export interface SimulationLoadMatch {
    status: string;
    transfer_id: number;
}
export interface SimulationListMatch {
    card_token?: string;
    profile_id: number;
    limit?: number;
    kyc_review_id?: string;
}
export interface SimulationCreateData {
    amount: Record<string, any>;
    balanceId: number;
    balancesAfter?: any[];
    beneficiaryAccount?: string;
    beneficiaryAddress?: Record<string, any>;
    beneficiaryName?: string;
    business?: string;
    cardNumber?: string;
    channel?: string;
    charges?: any[];
    created?: string;
    creationTime?: number;
    currency: string;
    currencyCode: string;
    description?: string | null;
    details?: Record<string, any>;
    errorCode?: string;
    failure_reason_code?: string;
    hasActiveIssues?: boolean;
    id?: string;
    instructedAmount?: number;
    instructedCurrencyCode?: string;
    key?: string;
    mcc?: number;
    paymentReference: string;
    pos?: string;
    previousInstructingAgents?: any[];
    profileId: number;
    quote?: number;
    rate?: number;
    ref?: Record<string, any>;
    reference?: string;
    requestedAction?: string;
    requirement?: string;
    requirements?: any[];
    senderAccount?: string;
    senderAccountNumber?: string;
    senderAddress?: Record<string, any>;
    senderBank?: Record<string, any>;
    senderBankCode?: string;
    senderBic?: string;
    senderName?: string;
    sourceAccount?: string;
    sourceCurrency?: string;
    sourceValue?: number;
    state?: string;
    status?: string;
    targetAccount?: number;
    targetCurrency?: string;
    targetValue?: number;
    transactionId?: number;
    transactionType?: string;
    transferRequest?: string;
    user?: number;
    wise_id?: number;
    $action?: string;
    [action: string]: any;
}
export interface SpendControl {
    ruleId?: string;
}
export interface SpendControlListMatch {
    application_id: string;
}
export interface SpendControlCreateData {
    application_id: string;
    ruleId?: string;
}
export interface SpendControlRemoveMatch {
    application_id: string;
    rule_id: number;
}
export interface SpendLimit {
    aggregateWindow?: Record<string, any>;
    id?: string;
    type?: string;
}
export interface SpendLimitListMatch {
    profile_id: number;
}
export interface SpendLimitUpdateData {
    profile_id: number;
    aggregateWindow?: Record<string, any>;
    type?: string;
}
export interface SpendLimitRemoveMatch {
    card_id: string;
    id: string;
    profile_id: number;
}
export interface Subscription {
    created_at?: string;
    created_by?: Record<string, any>;
    delivery?: Record<string, any>;
    id?: string;
    name?: string;
    scope?: Record<string, any>;
    trigger_on?: string;
}
export interface SubscriptionLoadMatch {
    client_key?: string;
    id: string;
    profile_id?: number;
}
export interface SubscriptionListMatch {
    client_key: string;
}
export interface SubscriptionCreateData {
    client_key: string;
    delivery: Record<string, any>;
    name: string;
    trigger_on: string;
}
export interface SubscriptionRemoveMatch {
    client_key?: string;
    id: string;
    profile_id?: number;
}
export interface TestNotification {
    created_at?: string;
    delivery_id?: string;
}
export interface TestNotificationCreateData {
    client_key: string;
    subscription_id: string;
    created_at?: string;
    delivery_id?: string;
}
export interface ThirdPartyTransfer {
    created?: string;
    details?: Record<string, any>;
    hasActiveIssues?: boolean;
    id?: number;
    originalTransferId?: string;
    originator?: Record<string, any>;
    quote?: string;
    rate?: number;
    sourceAccount?: number;
    sourceCurrency?: string;
    sourceValue?: number;
    status?: string;
    targetAccount?: number;
    targetCurrency?: string;
    targetValue?: number;
    user?: number;
}
export interface ThirdPartyTransferLoadMatch {
    id: number;
    profile_id: number;
}
export interface Token {
    access_token?: string;
    created_at?: string;
    expires_at?: string;
    expires_in?: number;
    refresh_token?: string;
    refresh_token_expires_at?: string;
    refresh_token_expires_in?: number;
    scope?: string;
    token_type?: string;
}
export interface TokenCreateData {
    access_token?: string;
    created_at?: string;
    expires_at?: string;
    expires_in?: number;
    refresh_token?: string;
    refresh_token_expires_at?: string;
    refresh_token_expires_in?: number;
    scope?: string;
    token_type?: string;
}
export interface Transfer {
    business?: number | null;
    created?: string;
    customerTransactionId?: string;
    details?: Record<string, any>;
    hasActiveIssues?: boolean;
    id?: number;
    payinSessionId?: string;
    quote?: number | null;
    quoteUuid?: string;
    rate?: number;
    reference?: string;
    sourceAccount?: number | null;
    sourceCurrency?: string;
    sourceValue?: number;
    status?: string;
    targetAccount?: number;
    targetCurrency?: string;
    targetValue?: number;
    transferRequest?: number | null;
    user?: number;
}
export interface TransferLoadMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface TransferListMatch {
    created_date_end?: string;
    created_date_start?: string;
    limit?: number;
    offset?: number;
    profile?: number;
    source_currency?: string;
    status?: string;
    target_currency?: string;
}
export interface TransferCreateData {
    customerTransactionId: string;
    details?: Record<string, any>;
    quoteUuid: string;
    sourceAccount?: number | null;
    targetAccount: number;
}
export interface TransferUpdateData {
    id: number;
    business?: number | null;
    created?: string;
    customerTransactionId?: string;
    details?: Record<string, any>;
    hasActiveIssues?: boolean;
    payinSessionId?: string;
    quote?: number | null;
    quoteUuid?: string;
    rate?: number;
    reference?: string;
    sourceAccount?: number | null;
    sourceCurrency?: string;
    sourceValue?: number;
    status?: string;
    targetAccount?: number;
    targetCurrency?: string;
    targetValue?: number;
    transferRequest?: number | null;
    user?: number;
    $action?: string;
    [action: string]: any;
}
export interface TransferRequirement {
    customerTransactionId?: string;
    details?: Record<string, any>;
    originatorLegalEntityType?: string;
    quoteUuid: string;
    targetAccount: number;
}
export interface TransferRequirementCreateData {
    customerTransactionId?: string;
    details?: Record<string, any>;
    originatorLegalEntityType?: string;
    quoteUuid: string;
    targetAccount: number;
}
export interface Ubo {
    addressFirstLine?: string;
    city?: string;
    countryOfResidenceIso3Code?: string;
    dateOfBirth?: string;
    id?: string;
    name?: string;
    ownershipPercentage?: number;
    postCode?: string;
    state?: string;
    ubos?: any[];
}
export interface UboListMatch {
    profile_id: number;
}
export interface UboCreateData {
    profile_id: number;
    ubos?: any[];
}
export interface UboUpdateData {
    profile_id: number;
    ubos?: any[];
}
export interface User {
    active?: boolean;
    details?: Record<string, any> | null;
    email?: string;
    id?: number;
    language?: string;
    name?: string | null;
    registrationCode: string;
}
export interface UserLoadMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface UserCreateData {
    email: string;
    language?: string;
    registrationCode: string;
    $action?: string;
    [action: string]: any;
}
export interface UserUpdateData {
    id: number;
    email?: string;
    $action?: string;
    [action: string]: any;
}
export interface Verification {
    required_evidences?: any[];
}
export interface VerificationListMatch {
    profile_id: number;
}
export interface VerificationCreateData {
    profile_id: number;
    accountPurpose?: any;
    accountPurposeExplanation?: any;
    annualIncome?: any;
    businessUseCase?: any;
    incomeExplanation?: any;
    intendedCountries?: any;
    mainSourceOfFunding?: any;
    mainSourceOfIncome?: any;
    monthlyAnticipatedVolume?: any;
    yearlyAnticipatedVolume?: any;
}
