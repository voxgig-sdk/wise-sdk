# Typed models for the Wise SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AccountDetail(TypedDict):
    accountHolderName: str
    accountIdentification: Any
    country: str
    id: int
    profileId: int
    state: str


class AccountDetailLoadMatch(TypedDict):
    id: int


class AccountRequirementRequired(TypedDict):
    ultimateBeneficiary: dict | None


class AccountRequirement(AccountRequirementRequired, total=False):
    accountHolderName: str
    currency: str
    details: dict
    fields: list
    ownedByCustomer: bool
    profile: int
    title: str
    type: str
    usageInfo: str


class AccountRequirementListMatchRequired(TypedDict):
    quote_id: str


class AccountRequirementListMatch(AccountRequirementListMatchRequired, total=False):
    address_required: bool
    originator_legal_entity_type: str


class AccountRequirementCreateDataRequired(TypedDict):
    quote_id: str
    ultimateBeneficiary: dict | None


class AccountRequirementCreateData(AccountRequirementCreateDataRequired, total=False):
    originator_legal_entity_type: str
    accountHolderName: str
    currency: str
    details: dict
    ownedByCustomer: bool
    profile: int
    type: str


class Activity(TypedDict, total=False):
    createdOn: str
    description: str
    id: str
    primaryAmount: str
    resource: dict
    secondaryAmount: str
    status: str
    title: str
    type: str
    updatedOn: str


class ActivityListMatchRequired(TypedDict):
    profile_id: int


class ActivityListMatch(ActivityListMatchRequired, total=False):
    monetary_resource_type: str
    next_cursor: str
    since: str
    size: int
    status: str
    until: str


class Address(TypedDict, total=False):
    details: dict
    id: int
    profile: int


class AddressLoadMatch(TypedDict):
    id: int


class AddressListMatch(TypedDict, total=False):
    profile: int


class AddressCreateData(TypedDict):
    details: dict
    profile: int


class AddressRequirementRequired(TypedDict):
    details: dict


class AddressRequirement(AddressRequirementRequired, total=False):
    fields: list
    profile: int
    type: str


class AddressRequirementListMatch(TypedDict, total=False):
    details: dict
    fields: list
    profile: int
    type: str


class AddressRequirementCreateDataRequired(TypedDict):
    details: dict


class AddressRequirementCreateData(AddressRequirementCreateDataRequired, total=False):
    profile: int


class BalanceRequired(TypedDict):
    state: str
    targetRecipientId: int


class Balance(BalanceRequired, total=False):
    amount: dict
    cashAmount: dict
    creationTime: str
    currency: str
    icon: dict | None
    id: int
    investmentState: str
    modificationTime: str
    name: str | None
    overdraft: dict
    reservedAmount: dict
    totalAvailable: dict
    totalCash: dict
    totalWorth: dict
    type: str
    visible: bool


class BalanceLoadMatchRequired(TypedDict):
    profile_id: int


class BalanceLoadMatch(BalanceLoadMatchRequired, total=False):
    currency: str
    id: int


class BalanceListMatch(TypedDict):
    profile_id: int
    type: str


class BalanceCreateDataRequired(TypedDict):
    profile_id: int
    currency: str
    state: str
    targetRecipientId: int
    type: str


class BalanceCreateData(BalanceCreateDataRequired, total=False):
    hold_limit_breach_id: int
    name: str | None


class BalanceRemoveMatch(TypedDict):
    id: int
    profile_id: int


class BalanceStatement(TypedDict, total=False):
    accountHolder: dict
    bankDetails: dict | None
    endOfStatementBalance: dict
    id: str
    issuer: dict
    query: dict
    transactions: list


class BalanceStatementLoadMatchRequired(TypedDict):
    id: int
    profile_id: int
    currency: str
    interval_end: str
    interval_start: str


class BalanceStatementLoadMatch(BalanceStatementLoadMatchRequired, total=False):
    statement_locale: str
    type: str


class BankAccountDetailRequired(TypedDict):
    targetAccountId: int


class BankAccountDetail(BankAccountDetailRequired, total=False):
    active: bool
    currency: str
    id: str
    internationalDetails: dict | None
    localDetails: dict
    reason: str


class BankAccountDetailCreateDataRequired(TypedDict):
    profile_id: int
    targetAccountId: int


class BankAccountDetailCreateData(BankAccountDetailCreateDataRequired, total=False):
    payment_id: int
    reason: str


class BankAccountDetailsOrder(TypedDict, total=False):
    accountDetailsId: int
    balanceId: int | None
    creationTime: str
    currency: str
    id: str
    modificationTime: str
    requirements: list
    status: str


class BankAccountDetailsOrderListMatch(TypedDict):
    profile_id: int
    currency: str


class BankAccountDetailsOrderCreateData(TypedDict):
    profile_id: int
    currency: str


class BatchGroupRequired(TypedDict):
    type: str


class BatchGroup(BatchGroupRequired, total=False):
    alreadyPaid: bool
    fileName: str | None
    groupType: str
    id: str
    name: str
    payInDetails: list
    payinSessionId: str | None
    profileId: int
    shortId: int
    sourceCurrency: str
    status: str
    transferIds: list
    userId: int
    version: int


class BatchGroupLoadMatch(TypedDict):
    id: str
    profile_id: int


class BatchGroupCreateDataRequired(TypedDict):
    profile_id: int
    name: str
    sourceCurrency: str
    type: str


class BatchGroupCreateData(BatchGroupCreateDataRequired, total=False):
    batch_payment_id: str


class BatchGroupUpdateDataRequired(TypedDict):
    id: str
    profile_id: int


class BatchGroupUpdateData(BatchGroupUpdateDataRequired, total=False):
    status: str
    version: int


class BulkSettlementRequired(TypedDict):
    settlementDate: str
    settlementReference: str
    transfers: list
    type: str


class BulkSettlement(BulkSettlementRequired, total=False):
    balanceTransfer: float
    refundedTransfers: list
    settlementCurrency: str


class BulkSettlementCreateDataRequired(TypedDict):
    settlementDate: str
    settlementReference: str
    transfers: list
    type: str


class BulkSettlementCreateData(BulkSettlementCreateDataRequired, total=False):
    balanceTransfer: float
    refundedTransfers: list
    settlementCurrency: str


class BusinessProfileRequired(TypedDict):
    type: str


class BusinessProfile(BusinessProfileRequired, total=False):
    abn: str | None
    acn: str | None
    actorEmail: str
    address: dict
    arbn: str | None
    businessFreeFormDescription: str
    businessName: str
    businessNameInKatakana: str | None
    businessRepresentative: dict
    companyRole: str
    companyType: str
    contactDetails: dict
    createdAt: str
    currentState: str
    descriptionOfBusiness: str
    email: str
    externalCustomerId: str
    firstLevelCategory: str
    fullName: str
    id: int
    industryCategories: list
    operationalAddresses: list
    publicId: str
    registrationNumber: str
    secondLevelCategory: str
    updatedAt: str
    userId: int
    webpage: str


class BusinessProfileCreateDataRequired(TypedDict):
    contactDetails: dict


class BusinessProfileCreateData(BusinessProfileCreateDataRequired, total=False):
    abn: str | None
    acn: str | None
    actorEmail: str
    address: dict
    arbn: str | None
    businessFreeFormDescription: str
    businessName: str
    businessNameInKatakana: str | None
    businessRepresentative: dict
    companyRole: str
    companyType: str
    externalCustomerId: str
    firstLevelCategory: str
    industryCategories: list
    operationalAddresses: list
    registrationNumber: str
    secondLevelCategory: str
    webpage: str


class BusinessProfileUpdateDataRequired(TypedDict):
    profile_id: int


class BusinessProfileUpdateData(BusinessProfileUpdateDataRequired, total=False):
    abn: str | None
    acn: str | None
    address: dict
    arbn: str | None
    businessFreeFormDescription: str
    businessName: str
    businessNameInKatakana: str | None
    companyRole: str
    companyType: str
    contactDetails: dict
    externalCustomerId: str
    firstLevelCategory: str
    id: int
    industryCategories: list
    operationalAddresses: list
    registrationNumber: str
    secondLevelCategory: str
    webpage: str


class Card(TypedDict, total=False):
    bankIdentificationNumber: str
    cardHolderName: str
    cardProgram: dict
    clientId: str
    creationTime: str
    expiryDate: str
    id: str
    lastFourDigits: str
    modificationTime: str
    phoneNumber: str
    profileId: int
    status: dict
    token: str
    unlockSpendingPermissions: str


class CardLoadMatch(TypedDict):
    id: str
    profile_id: int


class CardListMatchRequired(TypedDict):
    profile_id: int


class CardListMatch(CardListMatchRequired, total=False):
    page_number: int
    page_size: int


class CardCreateDataRequired(TypedDict):
    card_token: str
    profile_id: int


class CardCreateData(CardCreateDataRequired, total=False):
    bankIdentificationNumber: str
    cardHolderName: str
    cardProgram: dict
    clientId: str
    creationTime: str
    expiryDate: str
    id: str
    lastFourDigits: str
    modificationTime: str
    phoneNumber: str
    profileId: int
    status: dict
    token: str
    unlockSpendingPermissions: str


class CardUpdateDataRequired(TypedDict):
    card_token: str
    profile_id: int


class CardUpdateData(CardUpdateDataRequired, total=False):
    status: dict
    permissions: Any


class CardHolderLimitRequired(TypedDict):
    aggregateWindow: dict
    type: str


class CardHolderLimit(CardHolderLimitRequired, total=False):
    spendLimits: list


class CardHolderLimitListMatch(TypedDict):
    card_holder_profile_id: int
    profile_id: int


class CardHolderLimitUpdateDataRequired(TypedDict):
    card_holder_profile_id: int
    profile_id: int


class CardHolderLimitUpdateData(CardHolderLimitUpdateDataRequired, total=False):
    aggregateWindow: dict
    type: str


class CardHolderLimitRemoveMatch(TypedDict):
    card_holder_profile_id: int
    profile_id: int


class CardLimit(TypedDict, total=False):
    daily: dict | None
    lifetime: dict | None
    monthly: dict | None
    transaction: dict | None


class CardLimitLoadMatch(TypedDict):
    card_token: str
    profile_id: int


class CardLimitUpdateDataRequired(TypedDict):
    card_token: str
    profile_id: int


class CardLimitUpdateData(CardLimitUpdateDataRequired, total=False):
    daily: dict | None
    lifetime: dict | None
    monthly: dict | None
    transaction: dict | None


class CardOrderRequired(TypedDict):
    program: str


class CardOrder(CardOrderRequired, total=False):
    address: dict
    cardHolderName: str
    cardHolderProfileId: int
    cardProgram: dict
    cardToken: str | None
    city: str
    clientId: str
    country: str
    creationTime: str
    deliveryDetails: dict
    deliveryEstimate: str
    deliveryOption: str
    embossedName: str
    errors: list
    firstLine: str
    id: int
    lifetimeLimit: float | None
    modificationTime: str
    phoneNumber: str
    postCode: str
    profileId: int
    replacementDetails: dict
    replacesCard: str | None
    secondLine: str | None
    state: str | None
    status: str
    thirdLine: str | None


class CardOrderLoadMatch(TypedDict):
    id: int
    profile_id: int


class CardOrderListMatchRequired(TypedDict):
    profile_id: int


class CardOrderListMatch(CardOrderListMatchRequired, total=False):
    page_number: int
    page_size: int


class CardOrderCreateDataRequired(TypedDict):
    cardHolderName: str
    program: str


class CardOrderCreateData(CardOrderCreateDataRequired, total=False):
    address: dict
    cardHolderProfileId: int
    city: str
    country: str
    deliveryOption: str
    embossedName: str
    firstLine: str
    lifetimeLimit: float | None
    phoneNumber: str
    postCode: str
    replacementDetails: dict
    secondLine: str | None
    state: str | None
    thirdLine: str | None


class CardOrderUpdateDataRequired(TypedDict):
    id: int
    profile_id: int


class CardOrderUpdateData(CardOrderUpdateDataRequired, total=False):
    status: str


class CardSensitiveDetailRequired(TypedDict):
    encryptedPayload: str
    keyVersion: int


class CardSensitiveDetail(CardSensitiveDetailRequired, total=False):
    key: str
    version: int


class CardSensitiveDetailLoadMatch(TypedDict, total=False):
    encryptedPayload: str
    key: str
    keyVersion: int
    version: int


class CardSensitiveDetailCreateData(TypedDict):
    encryptedPayload: str
    keyVersion: int


class CardTransaction(TypedDict, total=False):
    approvalCode: str | None
    arn: str | None
    authorisationMethod: str
    balanceChannelReferenceId: str | None
    billingAmount: dict
    cardToken: str
    creationTime: str
    credits: list
    debits: list
    declineReason: str | None
    detailedDeclineReason: str | None
    fees: list
    id: int
    merchant: dict
    modificationTime: str
    pinValidationResult: str | None
    purgeTime: str | None
    relayAuthorisationData: dict | None
    state: str
    transactionAmount: dict
    transactionAmountWithFees: dict
    type: str


class CardTransactionLoadMatch(TypedDict):
    id: int
    profile_id: int


class CardTransactionListMatchRequired(TypedDict):
    card_token: str
    profile_id: int
    from_creation_time: str
    to_creation_time: str


class CardTransactionListMatch(CardTransactionListMatchRequired, total=False):
    last_id: int
    page_size: int


class CaseRequired(TypedDict):
    createdAt: str
    id: int
    messages: list
    profileId: int
    reference: dict
    status: str
    type: str


class Case(CaseRequired, total=False):
    description: str
    details: dict
    externalId: str
    subType: str
    subject: str
    updatedAt: str


class CaseLoadMatch(TypedDict):
    id: int


class CaseCreateData(TypedDict, total=False):
    description: str
    details: dict
    externalId: str
    subject: str
    type: str


class ClaimAccountRequired(TypedDict):
    registrationCode: str


class ClaimAccount(ClaimAccountRequired, total=False):
    claimAccountCode: str


class ClaimAccountCreateData(TypedDict):
    registrationCode: str


class Comparison(TypedDict, total=False):
    amount: float
    amountType: str
    providerCountry: str | None
    providerTypes: list
    providers: list
    sourceCountry: str | None
    sourceCurrency: str | None
    targetCountry: str | None
    targetCurrency: str | None


class ComparisonLoadMatchRequired(TypedDict):
    source_currency: str
    target_currency: str


class ComparisonLoadMatch(ComparisonLoadMatchRequired, total=False):
    exclude_partner: bool
    filter: str
    include_wise: bool
    mid_market_rate: float
    number_of_provider: int
    pay_in_method: str
    provider: str
    provider_country: str
    provider_type: list
    recipient_gets_amount: float
    send_amount: float
    source_country: str
    target_country: str
    wise_estimated_delivery: str
    wise_fee: float
    wise_quote_created_time: str


class Contact(TypedDict, total=False):
    contactId: str
    identifier: str
    name: str
    targetCurrency: str


class ContactCreateDataRequired(TypedDict):
    profile_id: int
    is_direct_identifier_creation: bool


class ContactCreateData(ContactCreateDataRequired, total=False):
    identifier: str
    targetCurrency: str


class Currency(TypedDict, total=False):
    code: str
    countryKeywords: list
    name: str
    supportsDecimals: bool
    symbol: str


class CurrencyListMatch(TypedDict, total=False):
    code: str
    countryKeywords: list
    name: str
    supportsDecimals: bool
    symbol: str


class DeliveryEstimate(TypedDict, total=False):
    estimatedDeliveryDate: str
    formattedEstimatedDeliveryDate: str
    id: str


class DeliveryEstimateLoadMatchRequired(TypedDict):
    id: int


class DeliveryEstimateLoadMatch(DeliveryEstimateLoadMatchRequired, total=False):
    timezone: str


class DeliveryUpdateRequired(TypedDict):
    delivery_update: str
    delivery_update_path: list
    observation_id: str
    occurred_at: str


class DeliveryUpdate(DeliveryUpdateRequired, total=False):
    estimated_delivery_at: str | None
    scheme: str | None


class DeliveryUpdateCreateDataRequired(TypedDict):
    transfer_id: int
    delivery_update: str
    delivery_update_path: list


class DeliveryUpdateCreateData(DeliveryUpdateCreateDataRequired, total=False):
    estimated_delivery_at: str | None
    scheme: str | None


class DigitalWalletRequired(TypedDict):
    activation: str


class DigitalWallet(DigitalWalletRequired, total=False):
    paymentTokens: list
    walletNames: list


class DigitalWalletCreateDataRequired(TypedDict):
    card_token: str
    profile_id: int
    activation: str


class DigitalWalletCreateData(DigitalWalletCreateDataRequired, total=False):
    payment_token_unique_reference: str
    walletNames: list


class DirectDebitAccount(TypedDict, total=False):
    currency: str
    details: dict
    id: int
    type: str


class DirectDebitAccountListMatch(TypedDict):
    profile_id: int
    currency: str
    type: str


class DirectDebitAccountCreateDataRequired(TypedDict):
    profile_id: int


class DirectDebitAccountCreateData(DirectDebitAccountCreateDataRequired, total=False):
    currency: str
    details: dict
    type: str


class Director(TypedDict, total=False):
    countryOfResidenceIso3Code: str
    dateOfBirth: str
    directors: list
    firstName: str
    id: int
    lastName: str


class DirectorListMatch(TypedDict):
    profile_id: int


class DirectorCreateDataRequired(TypedDict):
    profile_id: int


class DirectorCreateData(DirectorCreateDataRequired, total=False):
    directors: list


class DirectorUpdateDataRequired(TypedDict):
    profile_id: int


class DirectorUpdateData(DirectorUpdateDataRequired, total=False):
    directors: list


class DirectorRemoveMatch(TypedDict):
    profile_id: int


class Dispute(TypedDict, total=False):
    canWithdraw: bool
    createdAt: str
    createdBy: str
    disclaimer: dict
    files: dict
    form: dict
    id: str
    lastUpdatedAt: str
    profileId: int
    reason: str
    receipt: str
    status: str
    statusMessage: str
    subStatus: str
    transaction: dict
    transactionId: int


class DisputeLoadMatch(TypedDict):
    id: str
    profile_id: int


class DisputeListMatchRequired(TypedDict):
    profile_id: int


class DisputeListMatch(DisputeListMatchRequired, total=False):
    page_number: int
    page_size: int
    status: str
    transaction_id: int


class DisputeCreateDataRequired(TypedDict):
    profile_id: int


class DisputeCreateData(DisputeCreateDataRequired, total=False):
    reason: str
    scheme: str
    canWithdraw: bool
    createdAt: str
    createdBy: str
    disclaimer: dict
    files: dict
    form: dict
    id: str
    lastUpdatedAt: str
    profileId: int
    receipt: str
    status: str
    statusMessage: str
    subStatus: str
    transaction: dict
    transactionId: int


class DisputeUpdateDataRequired(TypedDict):
    id: str
    profile_id: int


class DisputeUpdateData(DisputeUpdateDataRequired, total=False):
    status: str


class DisputeReason(TypedDict, total=False):
    code: str
    description: str
    isFraud: bool
    subOptions: list
    supportsMultipleTransactions: bool
    tooltip: str


class DisputeReasonListMatch(TypedDict):
    profile_id: int


class Facetec(TypedDict):
    pass


class FacetecLoadMatch(TypedDict):
    pass


class File(TypedDict):
    createdAt: str
    file: str
    fileId: str
    fileName: str
    profileId: int
    purpose: str
    submissionData: dict


class FileListMatch(TypedDict, total=False):
    page_number: int
    page_size: int
    profile_id: int


class FileCreateData(TypedDict):
    createdAt: str
    file: str
    fileId: str
    fileName: str
    profileId: int
    purpose: str
    submissionData: dict


class Funding(TypedDict, total=False):
    balanceTransactionId: int
    status: str
    type: str


class FundingCreateDataRequired(TypedDict):
    profile_id: int
    transfer_id: int


class FundingCreateData(FundingCreateDataRequired, total=False):
    status: str
    type: str
    balanceId: Any
    partnerReference: Any


class GpiTrackingRequired(TypedDict):
    identifier: str
    identifierType: str


class GpiTracking(GpiTrackingRequired, total=False):
    transactions: list


class GpiTrackingCreateData(TypedDict):
    identifier: str
    identifierType: str


class HoldLimitBreach(TypedDict, total=False):
    amount: float
    closingReason: str
    createdAt: str
    currency: str
    id: int
    profileId: int
    state: str
    updatedAt: str


class HoldLimitBreachListMatchRequired(TypedDict):
    profile_id: int


class HoldLimitBreachListMatch(HoldLimitBreachListMatchRequired, total=False):
    closing_reason: str
    state: str


class IncomingTransferRequired(TypedDict):
    amounts: dict
    balanceId: str
    creditedTime: str
    creditor: dict
    debtor: dict
    exchangeRate: float
    fees: dict
    id: str
    previousInstructingAgents: list
    profileId: int
    scheme: str
    state: str


class IncomingTransfer(IncomingTransferRequired, total=False):
    accountDetailsId: str
    chargeBearer: str
    creditTransferType: str
    endToEndId: str
    uetr: str
    unstructuredReference: str


class IncomingTransferLoadMatch(TypedDict):
    id: str


class Jose(TypedDict, total=False):
    keyId: str
    keyMaterial: dict
    publicKeyMaterial: dict
    scope: str
    validFrom: str
    validTill: str
    version: int


class JoseLoadMatchRequired(TypedDict):
    algorithm: str
    scope: str


class JoseLoadMatch(JoseLoadMatchRequired, total=False):
    version: int


class JoseCreateData(TypedDict, total=False):
    keyId: str
    publicKeyMaterial: dict
    scope: str
    validFrom: str
    validTill: str


class KycReviewRequired(TypedDict):
    type: str


class KycReview(KycReviewRequired, total=False):
    createdAt: str
    id: str
    link: dict | None
    redirectUrl: str | None
    requiredBy: str | None
    requirements: list | None
    status: str
    triggerData: dict
    triggerReferences: list
    updatedAt: str


class KycReviewLoadMatch(TypedDict):
    id: str
    profile_id: int


class KycReviewListMatchRequired(TypedDict):
    profile_id: int


class KycReviewListMatch(KycReviewListMatchRequired, total=False):
    page_number: int
    page_size: int


class KycReviewCreateDataRequired(TypedDict):
    profile_id: int
    type: str


class KycReviewCreateData(KycReviewCreateDataRequired, total=False):
    requirement_key: str
    createdAt: str
    id: str
    link: dict | None
    redirectUrl: str | None
    requiredBy: str | None
    requirements: list | None
    status: str
    triggerData: dict
    triggerReferences: list
    updatedAt: str


class KycReviewUpdateDataRequired(TypedDict):
    id: str
    profile_id: int


class KycReviewUpdateData(KycReviewUpdateDataRequired, total=False):
    redirectUrl: str | None


class LinkRequest(TypedDict):
    clientKey: str
    email: str
    id: str
    metadata: dict
    profileId: int
    redirectUrl: str
    transactionId: int
    type: str


class LinkRequestLoadMatch(TypedDict):
    id: str


class LinkRequestCreateData(TypedDict):
    profile_id: int
    email: str
    redirectUrl: str
    transactionId: int


class Message(TypedDict):
    submissionData: dict
    type: str


class MessageCreateData(TypedDict):
    case_id: int
    submissionData: dict
    type: str


class MultiCurrencyAccount(TypedDict):
    pass


class MultiCurrencyAccountLoadMatch(TypedDict, total=False):
    country: str
    profile_id: int
    state: str


class MultiCurrencyAccountListMatch(TypedDict):
    profile_id: int


class OneTimeToken(TypedDict, total=False):
    challenges: list
    faceMap: str
    oneTimeToken: str
    validity: int


class OneTimeTokenCreateDataRequired(TypedDict):
    profile_id: int


class OneTimeTokenCreateData(OneTimeTokenCreateDataRequired, total=False):
    faceMap: str


class Ott(TypedDict, total=False):
    actionType: str
    challenges: list
    oneTimeToken: str
    userId: int
    validity: int


class OttLoadMatch(TypedDict, total=False):
    actionType: str
    challenges: list
    oneTimeToken: str
    userId: int
    validity: int


class OttCreateData(TypedDict, total=False):
    otpCode: Any


class Payin(TypedDict, total=False):
    amount: float
    currency: str
    details: dict
    failureReason: str
    id: str
    payinSessionId: str
    paymentInstrumentId: str
    qrCodeInBase64: str
    reference: str
    status: str


class PayinCreateDataRequired(TypedDict):
    profile_id: int
    payinSessionId: str


class PayinCreateData(PayinCreateDataRequired, total=False):
    payin_session_id: str
    payment_instrument_id: str
    amount: float
    currency: str
    details: dict
    failureReason: str
    id: str
    paymentInstrumentId: str
    qrCodeInBase64: str
    reference: str
    status: str


class PayinDepositDetail(TypedDict, total=False):
    payinBank: dict
    payinBankAccount: dict
    wiseInformation: dict


class PayinDepositDetailLoadMatch(TypedDict):
    profile_id: int
    transfer_id: int


class Payment(TypedDict, total=False):
    amount: float
    currency: str
    id: int
    method: str
    pricingVariant: str | None
    timeCreated: str
    timeUpdated: str


class PaymentListMatch(TypedDict):
    transfer_id: int


class PaymentInitiation(TypedDict, total=False):
    id: str


class PaymentInitiationLoadMatch(TypedDict):
    batch_group_id: str
    id: int
    profile_id: int


class PaymentInitiationCreateDataRequired(TypedDict):
    batch_group_id: str
    profile_id: int


class PaymentInitiationCreateData(PaymentInitiationCreateDataRequired, total=False):
    accountId: Any
    reference: Any
    type: Any


class PaymentInstrument(TypedDict, total=False):
    accountHolderName: str
    accountNumber: str
    accountOwnerDetails: dict
    accountType: str
    bankCode: str
    bankName: str
    branchCode: str
    disconnectReason: str
    id: str
    reference: str
    status: str
    type: str


class PaymentInstrumentLoadMatch(TypedDict):
    id: str
    profile_id: int


class PaymentInstrumentListMatch(TypedDict):
    id: str
    profile_id: int


class PaymentInstrumentCreateDataRequired(TypedDict):
    profile_id: int
    accountNumber: str
    type: str


class PaymentInstrumentCreateData(PaymentInstrumentCreateDataRequired, total=False):
    accountHolderName: str
    accountOwnerDetails: dict
    accountType: str
    bankCode: str
    branchCode: str
    reference: str


class PaymentIntent(TypedDict, total=False):
    allocationId: str
    allocationType: str
    createdAt: str
    fundingSource: str
    id: str
    partnerEntityId: str
    paymentReference: str
    profileId: str
    reason: str
    recipientType: str
    sourceAmount: float
    sourceCurrency: str
    state: str
    targetAmount: float
    targetCurrency: str
    updatedAt: str


class PaymentIntentLoadMatch(TypedDict):
    allocation_id: str
    id: str


class PhoneNumber(TypedDict, total=False):
    clientId: str
    id: int
    phoneNumber: str
    type: str
    verified: bool


class PhoneNumberCreateDataRequired(TypedDict):
    user_id: int


class PhoneNumberCreateData(PhoneNumberCreateDataRequired, total=False):
    phoneNumber: str


class Production(TypedDict, total=False):
    description: str | None
    errorCode: str | None
    kioskId: str | None
    occurredAt: str
    status: str


class ProductionLoadMatch(TypedDict):
    card_token: str
    profile_id: int


class ProductionUpdateDataRequired(TypedDict):
    card_token: str
    profile_id: int


class ProductionUpdateData(ProductionUpdateDataRequired, total=False):
    kioskId: str | None


class Profile(TypedDict, total=False):
    address: dict
    avatar: str
    contactDetails: dict
    createdAt: str
    currentState: str
    dateOfBirth: str
    email: str
    firstName: str
    fullName: str
    id: int
    lastName: str
    phoneNumber: str
    preferredName: str
    publicId: str
    secondaryAddresses: list
    type: str
    updatedAt: str
    userId: int


class ProfileLoadMatch(TypedDict):
    id: int


class ProfileListMatch(TypedDict, total=False):
    address: dict
    avatar: str
    contactDetails: dict
    createdAt: str
    currentState: str
    dateOfBirth: str
    email: str
    firstName: str
    fullName: str
    id: int
    lastName: str
    phoneNumber: str
    preferredName: str
    publicId: str
    secondaryAddresses: list
    type: str
    updatedAt: str
    userId: int


class ProfileCreateData(TypedDict, total=False):
    address: dict
    avatar: str
    contactDetails: dict
    createdAt: str
    currentState: str
    dateOfBirth: str
    email: str
    firstName: str
    fullName: str
    id: int
    lastName: str
    phoneNumber: str
    preferredName: str
    publicId: str
    secondaryAddresses: list
    type: str
    updatedAt: str
    userId: int
    birthCity: Any
    birthCountry: Any
    employerCity: Any
    employerCountry: Any
    employerName: Any
    expiryDate: Any
    externalCustomerId: Any
    firstNameInKana: Any
    issueDate: Any
    issuerCountry: Any
    issuerState: Any
    lastNameInKana: Any
    nationality: Any
    occupations: Any
    recipientId: Any
    uniqueIdentifier: Any


class ProfileUpdateDataRequired(TypedDict):
    id: int


class ProfileUpdateData(ProfileUpdateDataRequired, total=False):
    address: dict
    contactDetails: dict
    dateOfBirth: str
    firstName: str
    lastName: str
    preferredName: str
    type: str
    actorEmail: Any
    clientId: Any
    expiryDate: Any
    externalCustomerId: Any
    firstNameInKana: Any
    issueDate: Any
    issuerCountry: Any
    issuerState: Any
    lastNameInKana: Any
    localizedInformation: Any
    nationality: Any
    occupations: Any
    placeOfBirth: Any
    sex: Any
    uniqueIdentifier: Any
    updateContext: Any


class ProfileRemoveMatch(TypedDict):
    id: int


class Quote(TypedDict, total=False):
    createdTime: str
    creationContext: dict
    expirationTime: str
    guaranteedTargetAmount: bool
    guaranteedTargetAmountAllowed: bool
    id: str
    notices: list
    payOut: str
    paymentMetadata: dict
    paymentOptions: list
    preferredPayIn: str
    pricingConfiguration: dict
    profile: int
    providedAmountType: str
    rate: float
    rateExpirationTime: str
    rateType: str
    sourceAmount: float
    sourceCurrency: str
    status: str
    targetAccount: int
    targetAmount: float
    targetAmountAllowed: bool
    targetCurrency: str
    user: int


class QuoteLoadMatch(TypedDict):
    id: str
    profile_id: int


class QuoteCreateDataRequired(TypedDict):
    sourceCurrency: str
    targetCurrency: str


class QuoteCreateData(QuoteCreateDataRequired, total=False):
    creationContext: dict
    payOut: str
    paymentMetadata: dict
    preferredPayIn: str
    pricingConfiguration: dict
    sourceAmount: float
    targetAccount: int
    targetAmount: float


class QuoteUpdateDataRequired(TypedDict):
    id: str
    profile_id: int


class QuoteUpdateData(QuoteUpdateDataRequired, total=False):
    payOut: str
    paymentMetadata: dict
    pricingConfiguration: dict
    targetAccount: int


class Rate(TypedDict):
    rate: float
    source: str
    target: str
    time: str


RateListMatch = TypedDict('RateListMatch', {
    "from": str,
    "group": str,
    "source": str,
    "target": str,
    "time": str,
    "to": str,
}, total=False)


class RecipientRequired(TypedDict):
    acceptedOutcomes: bool
    ultimateBeneficiary: dict | None


class Recipient(RecipientRequired, total=False):
    accountHolderName: str
    accountId: int
    accountSummary: str
    active: bool
    commonFieldMap: dict
    confirmations: dict
    country: str
    creatorId: int
    currency: str
    details: dict
    displayFields: list
    hash: str
    id: int
    isInternal: bool
    legalEntityType: str
    longAccountSummary: str
    name: dict
    ownedByCustomer: bool
    profile: int
    profileId: int
    quoteId: str
    type: str


class RecipientLoadMatch(TypedDict):
    account_id: int


class RecipientListMatch(TypedDict, total=False):
    active: bool
    creator_id: int
    currency: str
    owned_by_customer: bool
    profile: int
    profile_id: int
    seek_position: int | None
    size: int
    sort: str
    type: str


class RecipientCreateDataRequired(TypedDict):
    acceptedOutcomes: bool
    ultimateBeneficiary: dict | None


class RecipientCreateData(RecipientCreateDataRequired, total=False):
    refund: bool
    accountHolderName: str
    accountId: int
    accountSummary: str
    active: bool
    commonFieldMap: dict
    confirmations: dict
    country: str
    creatorId: int
    currency: str
    details: dict
    displayFields: list
    hash: str
    id: int
    isInternal: bool
    legalEntityType: str
    longAccountSummary: str
    name: dict
    ownedByCustomer: bool
    profile: int
    profileId: int
    quoteId: str
    type: str


class RecipientUpdateDataRequired(TypedDict):
    account_id: int


class RecipientUpdateData(RecipientUpdateDataRequired, total=False):
    quote_id: str
    acceptedOutcomes: bool


class RecipientRemoveMatch(TypedDict):
    account_id: int


class Rule(TypedDict, total=False):
    description: str
    id: int
    operation: str
    type: str
    values: list


class RuleListMatch(TypedDict):
    application_id: str


class RuleCreateDataRequired(TypedDict):
    application_id: str


class RuleCreateData(RuleCreateDataRequired, total=False):
    description: str
    operation: str
    type: str
    values: list


class SamlRequired(TypedDict):
    SAMLResponse: str


class Saml(SamlRequired, total=False):
    RelayState: str


class SamlLoadMatch(TypedDict):
    registration_id: str


class SamlCreateDataRequired(TypedDict):
    SAMLResponse: str


class SamlCreateData(SamlCreateDataRequired, total=False):
    RelayState: str


class ScaDeviceFingerprint(TypedDict, total=False):
    createdAt: str
    deviceFingerprintId: str
    id: str


class ScaDeviceFingerprintCreateData(TypedDict):
    profile_id: int


class ScaDeviceFingerprintRemoveMatch(TypedDict):
    id: str
    profile_id: int


class ScaFacemap(TypedDict, total=False):
    faceMap: str


class ScaFacemapCreateDataRequired(TypedDict):
    profile_id: int


class ScaFacemapCreateData(ScaFacemapCreateDataRequired, total=False):
    faceMap: str


class ScaFacemapRemoveMatch(TypedDict):
    profile_id: int


class ScaOtp(TypedDict):
    pass


class ScaOtpCreateData(TypedDict):
    pass


class ScaOtpRemoveMatch(TypedDict):
    phone_number_id: int
    user_id: int


class ScaSession(TypedDict):
    pass


class ScaSessionCreateData(TypedDict):
    profile_id: int


class SettlementAllocationRequired(TypedDict):
    command: dict
    file: str


class SettlementAllocation(SettlementAllocationRequired, total=False):
    createdAt: str
    currency: str
    expectedTotalAmount: float
    id: str
    nextPageToken: str
    paymentIntents: list
    paymentReference: str
    state: str
    updatedAt: str


class SettlementAllocationLoadMatchRequired(TypedDict):
    id: str


class SettlementAllocationLoadMatch(SettlementAllocationLoadMatchRequired, total=False):
    include_payment_intent: bool
    page_size: int
    page_token: str


class SettlementAllocationCreateDataRequired(TypedDict):
    command: dict
    createdAt: str
    currency: str
    expectedTotalAmount: float
    file: str
    id: str
    paymentReference: str
    state: str
    updatedAt: str


class SettlementAllocationCreateData(SettlementAllocationCreateDataRequired, total=False):
    nextPageToken: str
    paymentIntents: list


class Simulation(TypedDict, total=False):
    business: str
    created: str
    creationTime: float
    description: str | None
    details: dict
    failure_reason_code: str
    hasActiveIssues: bool
    id: str
    key: str
    quote: int
    rate: float
    reference: str
    sourceAccount: str
    sourceCurrency: str
    sourceValue: int
    state: str
    status: str
    targetAccount: int
    targetCurrency: str
    targetValue: float
    transactionId: int
    transferRequest: str
    user: int
    wise_id: int


class SimulationLoadMatch(TypedDict):
    status: str
    transfer_id: int


class SimulationListMatchRequired(TypedDict):
    profile_id: int


class SimulationListMatch(SimulationListMatchRequired, total=False):
    card_token: str
    limit: int
    kyc_review_id: str


class SimulationCreateDataRequired(TypedDict):
    transfer_id: int


class SimulationCreateData(SimulationCreateDataRequired, total=False):
    failure_reason_code: str


class SpendControl(TypedDict, total=False):
    ruleId: int


class SpendControlListMatch(TypedDict):
    application_id: str


class SpendControlCreateDataRequired(TypedDict):
    application_id: str


class SpendControlCreateData(SpendControlCreateDataRequired, total=False):
    ruleId: int


class SpendControlRemoveMatch(TypedDict):
    application_id: str
    rule_id: int


class SpendLimit(TypedDict, total=False):
    aggregateWindow: dict
    id: str
    type: str


class SpendLimitListMatch(TypedDict):
    profile_id: int


class SpendLimitUpdateDataRequired(TypedDict):
    profile_id: int


class SpendLimitUpdateData(SpendLimitUpdateDataRequired, total=False):
    aggregateWindow: dict
    type: str


class SpendLimitRemoveMatch(TypedDict):
    card_id: str
    id: str
    profile_id: int


class Subscription(TypedDict, total=False):
    created_at: str
    created_by: dict
    delivery: dict
    id: str
    name: str
    scope: dict
    trigger_on: str


class SubscriptionLoadMatchRequired(TypedDict):
    id: str


class SubscriptionLoadMatch(SubscriptionLoadMatchRequired, total=False):
    client_key: str
    profile_id: int


class SubscriptionListMatch(TypedDict):
    client_key: str


class SubscriptionCreateData(TypedDict):
    client_key: str
    delivery: dict
    name: str
    trigger_on: str


class SubscriptionRemoveMatchRequired(TypedDict):
    id: str


class SubscriptionRemoveMatch(SubscriptionRemoveMatchRequired, total=False):
    client_key: str
    profile_id: int


class TestNotification(TypedDict, total=False):
    created_at: str
    delivery_id: str


class TestNotificationCreateDataRequired(TypedDict):
    client_key: str
    subscription_id: str


class TestNotificationCreateData(TestNotificationCreateDataRequired, total=False):
    created_at: str
    delivery_id: str


class ThirdPartyTransfer(TypedDict, total=False):
    created: str
    details: dict
    hasActiveIssues: bool
    id: int
    originalTransferId: str
    originator: dict
    quote: str
    rate: float
    sourceAccount: int
    sourceCurrency: str
    sourceValue: float
    status: str
    targetAccount: int
    targetCurrency: str
    targetValue: float
    user: int


class ThirdPartyTransferLoadMatch(TypedDict):
    id: int
    profile_id: int


class ThirdPartyTransferCreateDataRequired(TypedDict):
    profile_id: int
    details: dict
    originalTransferId: str
    originator: dict
    quote: str
    targetAccount: int


class ThirdPartyTransferCreateData(ThirdPartyTransferCreateDataRequired, total=False):
    sourceAccount: int


class ThreeDSecure(TypedDict):
    challengeStatus: str
    transactionReference: str


class ThreeDSecureCreateData(TypedDict):
    profile_id: int
    challengeStatus: str
    transactionReference: str


class Token(TypedDict, total=False):
    access_token: str
    created_at: str
    expires_at: str
    expires_in: int
    refresh_token: str
    refresh_token_expires_at: str
    refresh_token_expires_in: int
    scope: str
    token_type: str


class TokenCreateData(TypedDict, total=False):
    access_token: str
    created_at: str
    expires_at: str
    expires_in: int
    refresh_token: str
    refresh_token_expires_at: str
    refresh_token_expires_in: int
    scope: str
    token_type: str


class Transfer(TypedDict, total=False):
    business: int | None
    created: str
    customerTransactionId: str
    details: dict
    hasActiveIssues: bool
    id: int
    payinSessionId: str
    quote: int | None
    quoteUuid: str
    rate: float
    reference: str
    sourceAccount: int | None
    sourceCurrency: str
    sourceValue: float
    status: str
    targetAccount: int
    targetCurrency: str
    targetValue: float
    transferRequest: int | None
    user: int


class TransferLoadMatch(TypedDict):
    id: int


class TransferListMatch(TypedDict, total=False):
    created_date_end: str
    created_date_start: str
    limit: int
    offset: int
    profile: int
    source_currency: str
    status: str
    target_currency: str


class TransferCreateDataRequired(TypedDict):
    customerTransactionId: str
    quoteUuid: str
    targetAccount: int


class TransferCreateData(TransferCreateDataRequired, total=False):
    details: dict
    sourceAccount: int | None


class TransferUpdateDataRequired(TypedDict):
    id: int


class TransferUpdateData(TransferUpdateDataRequired, total=False):
    business: int | None
    created: str
    customerTransactionId: str
    details: dict
    hasActiveIssues: bool
    payinSessionId: str
    quote: int | None
    quoteUuid: str
    rate: float
    reference: str
    sourceAccount: int | None
    sourceCurrency: str
    sourceValue: float
    status: str
    targetAccount: int
    targetCurrency: str
    targetValue: float
    transferRequest: int | None
    user: int


class TransferRequirementRequired(TypedDict):
    quoteUuid: str
    targetAccount: int


class TransferRequirement(TransferRequirementRequired, total=False):
    customerTransactionId: str
    details: dict
    originatorLegalEntityType: str


class TransferRequirementCreateDataRequired(TypedDict):
    quoteUuid: str
    targetAccount: int


class TransferRequirementCreateData(TransferRequirementCreateDataRequired, total=False):
    customerTransactionId: str
    details: dict
    originatorLegalEntityType: str


class Ubo(TypedDict, total=False):
    addressFirstLine: str
    city: str
    countryOfResidenceIso3Code: str
    dateOfBirth: str
    id: str
    name: str
    ownershipPercentage: int
    postCode: str
    state: str
    ubos: list


class UboListMatch(TypedDict):
    profile_id: int


class UboCreateDataRequired(TypedDict):
    profile_id: int


class UboCreateData(UboCreateDataRequired, total=False):
    ubos: list


class UboUpdateDataRequired(TypedDict):
    profile_id: int


class UboUpdateData(UboUpdateDataRequired, total=False):
    ubos: list


class UserRequired(TypedDict):
    registrationCode: str


class User(UserRequired, total=False):
    active: bool
    details: dict | None
    email: str
    id: int
    language: str
    name: str | None


class UserLoadMatch(TypedDict):
    id: int


class UserCreateDataRequired(TypedDict):
    email: str
    registrationCode: str


class UserCreateData(UserCreateDataRequired, total=False):
    language: str


class UserUpdateDataRequired(TypedDict):
    id: int


class UserUpdateData(UserUpdateDataRequired, total=False):
    email: str


class Verification(TypedDict, total=False):
    required_evidences: list


class VerificationListMatch(TypedDict):
    profile_id: int


class VerificationCreateDataRequired(TypedDict):
    profile_id: int


class VerificationCreateData(VerificationCreateDataRequired, total=False):
    accountPurpose: Any
    accountPurposeExplanation: Any
    annualIncome: Any
    businessUseCase: Any
    incomeExplanation: Any
    intendedCountries: Any
    mainSourceOfFunding: Any
    mainSourceOfIncome: Any
    monthlyAnticipatedVolume: Any
    yearlyAnticipatedVolume: Any
