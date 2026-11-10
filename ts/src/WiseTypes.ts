// Typed models for the Wise SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AccountDetail {
  accountHolderName: string
  accountIdentification: any
  country: string
  id: number
  profileId: number
  state: string
}

export interface AccountDetailLoadMatch {
  id: number
}

export interface AccountRequirement {
  accountHolderName?: string
  currency?: string
  details?: Record<string, any>
  fields?: any[]
  ownedByCustomer?: boolean
  profile?: number
  title?: string
  type?: string
  ultimateBeneficiary: Record<string, any> | null
  usageInfo?: string
}

export interface AccountRequirementListMatch {
  quote_id: string
  address_required?: boolean
  originator_legal_entity_type?: string
}

export interface AccountRequirementCreateData {
  quote_id: string
  originator_legal_entity_type?: string
  accountHolderName?: string
  currency?: string
  details?: Record<string, any>
  ownedByCustomer?: boolean
  profile?: number
  type?: string
  ultimateBeneficiary: Record<string, any> | null
}

export interface Activity {
  createdOn?: string
  description?: string
  id?: string
  primaryAmount?: string
  resource?: Record<string, any>
  secondaryAmount?: string
  status?: string
  title?: string
  type?: string
  updatedOn?: string
}

export interface ActivityListMatch {
  profile_id: number
  monetary_resource_type?: string
  next_cursor?: string
  since?: string
  size?: number
  status?: string
  until?: string
}

export interface Address {
  details?: Record<string, any>
  id?: number
  profile?: number
}

export interface AddressLoadMatch {
  id: number
}

export interface AddressListMatch {
  profile?: number
}

export interface AddressCreateData {
  details: Record<string, any>
  profile: number
}

export interface AddressRequirement {
  details: Record<string, any>
  fields?: any[]
  profile?: number
  type?: string
}

export interface AddressRequirementListMatch {
  details?: Record<string, any>
  fields?: any[]
  profile?: number
  type?: string
}

export interface AddressRequirementCreateData {
  details: Record<string, any>
  profile?: number
}

export interface Balance {
  amount?: Record<string, any>
  cashAmount?: Record<string, any>
  creationTime?: string
  currency?: string
  icon?: Record<string, any> | null
  id?: number
  investmentState?: string
  modificationTime?: string
  name?: string | null
  overdraft?: Record<string, any>
  reservedAmount?: Record<string, any>
  state: string
  targetRecipientId: number
  totalAvailable?: Record<string, any>
  totalCash?: Record<string, any>
  totalWorth?: Record<string, any>
  type?: string
  visible?: boolean
}

export interface BalanceLoadMatch {
  currency?: string
  profile_id: number
  id?: number
}

export interface BalanceListMatch {
  profile_id: number
  type: string
}

export interface BalanceCreateData {
  hold_limit_breach_id?: number
  profile_id: number
  currency: string
  name?: string | null
  state: string
  targetRecipientId: number
  type: string

  // Selects a custom action instead of the plain create:
  //   'movement'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BalanceRemoveMatch {
  id: number
  profile_id: number
}

export interface BalanceStatement {
  accountHolder?: Record<string, any>
  bankDetails?: Record<string, any> | null
  endOfStatementBalance?: Record<string, any>
  id?: string
  issuer?: Record<string, any>
  query?: Record<string, any>
  transactions?: any[]
}

export interface BalanceStatementLoadMatch {
  id: number
  profile_id: number
  currency: string
  interval_end: string
  interval_start: string
  statement_locale?: string
  type?: string
}

export interface BankAccountDetail {
  active?: boolean
  currency?: string
  id?: string
  internationalDetails?: Record<string, any> | null
  localDetails?: Record<string, any>
  reason?: string
  targetAccountId: number
}

export interface BankAccountDetailCreateData {
  payment_id?: number
  profile_id: number
  reason?: string
  targetAccountId: number
}

export interface BankAccountDetailsOrder {
  accountDetailsId?: number
  balanceId?: number | null
  creationTime?: string
  currency?: string
  id?: string
  modificationTime?: string
  requirements?: any[]
  status?: string
}

export interface BankAccountDetailsOrderListMatch {
  profile_id: number
  currency: string
}

export interface BankAccountDetailsOrderCreateData {
  profile_id: number
  currency: string
}

export interface BatchGroup {
  alreadyPaid?: boolean
  fileName?: string | null
  groupType?: string
  id?: string
  name?: string
  payInDetails?: any[]
  payinSessionId?: string | null
  profileId?: number
  shortId?: number
  sourceCurrency?: string
  status?: string
  transferIds?: any[]
  type: string
  userId?: number
  version?: number
}

export interface BatchGroupLoadMatch {
  id: string
  profile_id: number
}

export interface BatchGroupCreateData {
  batch_payment_id?: string
  profile_id: number
  name: string
  sourceCurrency: string
  type: string

  // Selects a custom action instead of the plain create:
  //   'transfer'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BatchGroupUpdateData {
  id: string
  profile_id: number
  status?: string
  version?: number
}

export interface BulkSettlement {
  balanceTransfer?: number
  refundedTransfers?: any[]
  settlementCurrency?: string
  settlementDate: string
  settlementReference: string
  transfers: any[]
  type: string
}

export interface BulkSettlementCreateData {
  balanceTransfer?: number
  refundedTransfers?: any[]
  settlementCurrency?: string
  settlementDate: string
  settlementReference: string
  transfers: any[]
  type: string
}

export interface BusinessProfile {
  abn?: string | null
  acn?: string | null
  actorEmail?: string
  address?: Record<string, any>
  arbn?: string | null
  businessFreeFormDescription?: string
  businessName?: string
  businessNameInKatakana?: string | null
  businessRepresentative?: Record<string, any>
  companyRole?: string
  companyType?: string
  contactDetails?: Record<string, any>
  createdAt?: string
  currentState?: string
  descriptionOfBusiness?: string
  email?: string
  externalCustomerId?: string
  firstLevelCategory?: string
  fullName?: string
  id?: number
  industryCategories?: any[]
  operationalAddresses?: any[]
  publicId?: string
  registrationNumber?: string
  secondLevelCategory?: string
  type: string
  updatedAt?: string
  userId?: number
  webpage?: string
}

export interface BusinessProfileCreateData {
  abn?: string | null
  acn?: string | null
  actorEmail?: string
  address?: Record<string, any>
  arbn?: string | null
  businessFreeFormDescription?: string
  businessName?: string
  businessNameInKatakana?: string | null
  businessRepresentative?: Record<string, any>
  companyRole?: string
  companyType?: string
  contactDetails: Record<string, any>
  externalCustomerId?: string
  firstLevelCategory?: string
  industryCategories?: any[]
  operationalAddresses?: any[]
  registrationNumber?: string
  secondLevelCategory?: string
  webpage?: string
}

export interface BusinessProfileUpdateData {
  profile_id: number
  abn?: string | null
  acn?: string | null
  address?: Record<string, any>
  arbn?: string | null
  businessFreeFormDescription?: string
  businessName?: string
  businessNameInKatakana?: string | null
  companyRole?: string
  companyType?: string
  contactDetails?: Record<string, any>
  externalCustomerId?: string
  firstLevelCategory?: string
  id?: number
  industryCategories?: any[]
  operationalAddresses?: any[]
  registrationNumber?: string
  secondLevelCategory?: string
  webpage?: string
}

export interface Card {
  bankIdentificationNumber?: string
  cardHolderName?: string
  cardProgram?: Record<string, any>
  clientId?: string
  creationTime?: string
  expiryDate?: string
  id?: string
  lastFourDigits?: string
  modificationTime?: string
  phoneNumber?: string
  profileId?: number
  status?: Record<string, any>
  token?: string
  unlockSpendingPermissions?: string
}

export interface CardLoadMatch {
  id: string
  profile_id: number
}

export interface CardListMatch {
  profile_id: number
  page_number?: number
  page_size?: number

  // Selects a custom action instead of the plain list:
  //   'spending_permission'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardCreateData {
  card_token: string
  profile_id: number
  bankIdentificationNumber?: string
  cardHolderName?: string
  cardProgram?: Record<string, any>
  clientId?: string
  creationTime?: string
  expiryDate?: string
  id?: string
  lastFourDigits?: string
  modificationTime?: string
  phoneNumber?: string
  profileId?: number
  status?: Record<string, any>
  token?: string
  unlockSpendingPermissions?: string

  // Selects a custom action instead of the plain create:
  //   'reset_pin_count'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardUpdateData {
  card_token: string
  profile_id: number
  status?: Record<string, any>
  permissions?: any

  // Selects a custom action instead of the plain update:
  //   'spending_permission' | 'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardHolderLimit {
  aggregateWindow: Record<string, any>
  spendLimits?: any[]
  type: string
}

export interface CardHolderLimitListMatch {
  card_holder_profile_id: number
  profile_id: number
}

export interface CardHolderLimitUpdateData {
  card_holder_profile_id: number
  profile_id: number
  aggregateWindow?: Record<string, any>
  type?: string
}

export interface CardHolderLimitRemoveMatch {
  card_holder_profile_id: number
  profile_id: number
}

export interface CardLimit {
  daily?: Record<string, any> | null
  lifetime?: Record<string, any> | null
  monthly?: Record<string, any> | null
  transaction?: Record<string, any> | null
}

export interface CardLimitLoadMatch {
  card_token: string
  profile_id: number
}

export interface CardLimitUpdateData {
  card_token: string
  profile_id: number
  daily?: Record<string, any> | null
  lifetime?: Record<string, any> | null
  monthly?: Record<string, any> | null
  transaction?: Record<string, any> | null
}

export interface CardOrder {
  address?: Record<string, any>
  cardHolderName?: string
  cardHolderProfileId?: number
  cardProgram?: Record<string, any>
  cardToken?: string | null
  city?: string
  clientId?: string
  country?: string
  creationTime?: string
  deliveryDetails?: Record<string, any>
  deliveryEstimate?: string
  deliveryOption?: string
  embossedName?: string
  errors?: any[]
  firstLine?: string
  id?: number
  lifetimeLimit?: number | null
  modificationTime?: string
  phoneNumber?: string
  postCode?: string
  profileId?: number
  program: string
  replacementDetails?: Record<string, any>
  replacesCard?: string | null
  secondLine?: string | null
  state?: string | null
  status?: string
  thirdLine?: string | null
}

export interface CardOrderLoadMatch {
  id: number
  profile_id: number
}

export interface CardOrderListMatch {
  profile_id: number
  page_number?: number
  page_size?: number

  // Selects a custom action instead of the plain list:
  //   'availability' | 'requirement'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardOrderCreateData {
  address?: Record<string, any>
  cardHolderName: string
  cardHolderProfileId?: number
  city?: string
  country?: string
  deliveryOption?: string
  embossedName?: string
  firstLine?: string
  lifetimeLimit?: number | null
  phoneNumber?: string
  postCode?: string
  program: string
  replacementDetails?: Record<string, any>
  secondLine?: string | null
  state?: string | null
  thirdLine?: string | null
}

export interface CardOrderUpdateData {
  id: number
  profile_id: number
  status?: string

  // Selects a custom action instead of the plain update:
  //   'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardSensitiveDetail {
  encryptedPayload: string
  key?: string
  keyVersion: number
  version?: number
}

export interface CardSensitiveDetailLoadMatch {
  encryptedPayload?: string
  key?: string
  keyVersion?: number
  version?: number
}

export interface CardSensitiveDetailCreateData {
  encryptedPayload: string
  keyVersion: number

  // Selects a custom action instead of the plain create:
  //   'details' | 'pin'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CardTransaction {
  approvalCode?: string | null
  arn?: string | null
  authorisationMethod?: string
  balanceChannelReferenceId?: string | null
  billingAmount?: Record<string, any>
  cardToken?: string
  creationTime?: string
  credits?: any[]
  debits?: any[]
  declineReason?: string | null
  detailedDeclineReason?: string | null
  fees?: any[]
  id?: number
  merchant?: Record<string, any>
  modificationTime?: string
  pinValidationResult?: string | null
  purgeTime?: string | null
  relayAuthorisationData?: Record<string, any> | null
  state?: string
  transactionAmount?: Record<string, any>
  transactionAmountWithFees?: Record<string, any>
  type?: string
}

export interface CardTransactionLoadMatch {
  id: number
  profile_id: number
}

export interface CardTransactionListMatch {
  card_token: string
  profile_id: number
  from_creation_time: string
  last_id?: number
  page_size?: number
  to_creation_time: string
}

export interface Case {
  createdAt: string
  description?: string
  details?: Record<string, any>
  externalId?: string
  id: number
  messages: any[]
  profileId: number
  reference: Record<string, any>
  status: string
  subType?: string
  subject?: string
  type: string
  updatedAt?: string
}

export interface CaseLoadMatch {
  id: number
}

export interface CaseCreateData {
  description?: string
  details?: Record<string, any>
  externalId?: string
  subject?: string
  type?: string
}

export interface ClaimAccount {
  claimAccountCode?: string
  registrationCode: string
}

export interface ClaimAccountCreateData {
  registrationCode: string
}

export interface Comparison {
  amount?: number
  amountType?: string
  providerCountry?: string | null
  providerTypes?: any[]
  providers?: any[]
  sourceCountry?: string | null
  sourceCurrency?: string | null
  targetCountry?: string | null
  targetCurrency?: string | null
}

export interface ComparisonLoadMatch {
  exclude_partner?: boolean
  filter?: string
  include_wise?: boolean
  mid_market_rate?: number
  number_of_provider?: number
  pay_in_method?: string
  provider?: string
  provider_country?: string
  provider_type?: any[]
  recipient_gets_amount?: number
  send_amount?: number
  source_country?: string
  source_currency: string
  target_country?: string
  target_currency: string
  wise_estimated_delivery?: string
  wise_fee?: number
  wise_quote_created_time?: string
}

export interface Contact {
  contactId?: string
  identifier?: string
  name?: string
  targetCurrency?: string
}

export interface ContactCreateData {
  profile_id: number
  is_direct_identifier_creation: boolean
  identifier?: string
  targetCurrency?: string
}

export interface Currency {
  code?: string
  countryKeywords?: any[]
  name?: string
  supportsDecimals?: boolean
  symbol?: string
}

export interface CurrencyListMatch {
  code?: string
  countryKeywords?: any[]
  name?: string
  supportsDecimals?: boolean
  symbol?: string
}

export interface DeliveryEstimate {
  estimatedDeliveryDate?: string
  formattedEstimatedDeliveryDate?: string
  id?: string
}

export interface DeliveryEstimateLoadMatch {
  id: number
  timezone?: string
}

export interface DeliveryUpdate {
  delivery_update: string
  delivery_update_path: any[]
  estimated_delivery_at?: string | null
  observation_id: string
  occurred_at: string
  scheme?: string | null
}

export interface DeliveryUpdateCreateData {
  transfer_id: number
  delivery_update: string
  delivery_update_path: any[]
  estimated_delivery_at?: string | null
  scheme?: string | null
}

export interface DigitalWallet {
  activation: string
  paymentTokens?: any[]
  walletNames?: any[]
}

export interface DigitalWalletCreateData {
  card_token: string
  payment_token_unique_reference?: string
  profile_id: number
  activation: string
  walletNames?: any[]

  // Selects a custom action instead of the plain create:
  //   'apple-pay' | 'google-pay'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DirectDebitAccount {
  currency?: string
  details?: Record<string, any>
  id?: number
  type?: string
}

export interface DirectDebitAccountListMatch {
  profile_id: number
  currency: string
  type: string
}

export interface DirectDebitAccountCreateData {
  profile_id: number
  currency?: string
  details?: Record<string, any>
  type?: string
}

export interface Director {
  countryOfResidenceIso3Code?: string
  dateOfBirth?: string
  directors?: any[]
  firstName?: string
  id?: number
  lastName?: string
}

export interface DirectorListMatch {
  profile_id: number
}

export interface DirectorCreateData {
  profile_id: number
  directors?: any[]
}

export interface DirectorUpdateData {
  profile_id: number
  directors?: any[]
}

export interface DirectorRemoveMatch {
  profile_id: number
}

export interface Dispute {
  canWithdraw?: boolean
  createdAt?: string
  createdBy?: string
  disclaimer?: Record<string, any>
  files?: Record<string, any>
  form?: Record<string, any>
  id?: string
  lastUpdatedAt?: string
  profileId?: number
  reason?: string
  receipt?: string
  status?: string
  statusMessage?: string
  subStatus?: string
  transaction?: Record<string, any>
  transactionId?: number
}

export interface DisputeLoadMatch {
  id: string
  profile_id: number
}

export interface DisputeListMatch {
  profile_id: number
  page_number?: number
  page_size?: number
  status?: string
  transaction_id?: number
}

export interface DisputeCreateData {
  profile_id: number
  reason?: string
  scheme?: string
  canWithdraw?: boolean
  createdAt?: string
  createdBy?: string
  disclaimer?: Record<string, any>
  files?: Record<string, any>
  form?: Record<string, any>
  id?: string
  lastUpdatedAt?: string
  profileId?: number
  receipt?: string
  status?: string
  statusMessage?: string
  subStatus?: string
  transaction?: Record<string, any>
  transactionId?: number
}

export interface DisputeUpdateData {
  id: string
  profile_id: number
  status?: string

  // Selects a custom action instead of the plain update:
  //   'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DisputeReason {
  code?: string
  description?: string
  isFraud?: boolean
  subOptions?: any[]
  supportsMultipleTransactions?: boolean
  tooltip?: string
}

export interface DisputeReasonListMatch {
  profile_id: number
}

export interface Facetec {
}

export interface FacetecLoadMatch {

  // Selects a custom action instead of the plain load:
  //   'public_key'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface File {
  createdAt: string
  file: string
  fileId: string
  fileName: string
  profileId: number
  purpose: string
  submissionData: Record<string, any>
}

export interface FileListMatch {
  page_number?: number
  page_size?: number
  profile_id?: number
}

export interface FileCreateData {
  createdAt: string
  file: string
  fileId: string
  fileName: string
  profileId: number
  purpose: string
  submissionData: Record<string, any>
}

export interface Funding {
  balanceTransactionId?: number
  status?: string
  type?: string
}

export interface FundingCreateData {
  profile_id: number
  transfer_id: number
  status?: string
  type?: string
  balanceId?: any
  partnerReference?: any
}

export interface GpiTracking {
  identifier: string
  identifierType: string
  transactions?: any[]
}

export interface GpiTrackingCreateData {
  identifier: string
  identifierType: string
}

export interface HoldLimitBreach {
  amount?: number
  closingReason?: string
  createdAt?: string
  currency?: string
  id?: number
  profileId?: number
  state?: string
  updatedAt?: string
}

export interface HoldLimitBreachListMatch {
  profile_id: number
  closing_reason?: string
  state?: string
}

export interface IncomingTransfer {
  accountDetailsId?: string
  amounts: Record<string, any>
  balanceId: string
  chargeBearer?: string
  creditTransferType?: string
  creditedTime: string
  creditor: Record<string, any>
  debtor: Record<string, any>
  endToEndId?: string
  exchangeRate: number
  fees: Record<string, any>
  id: string
  previousInstructingAgents: any[]
  profileId: number
  scheme: string
  state: string
  uetr?: string
  unstructuredReference?: string
}

export interface IncomingTransferLoadMatch {
  id: string
}

export interface Jose {
  keyId?: string
  keyMaterial?: Record<string, any>
  publicKeyMaterial?: Record<string, any>
  scope?: string
  validFrom?: string
  validTill?: string
  version?: number
}

export interface JoseLoadMatch {
  algorithm: string
  scope: string
  version?: number

  // Selects a custom action instead of the plain load:
  //   'jwe' | 'jwsjwe'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface JoseCreateData {
  keyId?: string
  publicKeyMaterial?: Record<string, any>
  scope?: string
  validFrom?: string
  validTill?: string

  // Selects a custom action instead of the plain create:
  //   'jwe' | 'jwe-direct-encryption' | 'jws' | 'jwsjwe'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface KycReview {
  createdAt?: string
  id?: string
  link?: Record<string, any> | null
  redirectUrl?: string | null
  requiredBy?: string | null
  requirements?: any[] | null
  status?: string
  triggerData?: Record<string, any>
  triggerReferences?: any[]
  type: string
  updatedAt?: string
}

export interface KycReviewLoadMatch {
  id: string
  profile_id: number
}

export interface KycReviewListMatch {
  profile_id: number
  page_number?: number
  page_size?: number
}

export interface KycReviewCreateData {
  profile_id: number
  requirement_key?: string
  createdAt?: string
  id?: string
  link?: Record<string, any> | null
  redirectUrl?: string | null
  requiredBy?: string | null
  requirements?: any[] | null
  status?: string
  triggerData?: Record<string, any>
  triggerReferences?: any[]
  type: string
  updatedAt?: string
}

export interface KycReviewUpdateData {
  id: string
  profile_id: number
  redirectUrl?: string | null
}

export interface LinkRequest {
  clientKey: string
  email: string
  id: string
  metadata: Record<string, any>
  profileId: number
  redirectUrl: string
  transactionId: number
  type: string
}

export interface LinkRequestLoadMatch {
  id: string
}

export interface LinkRequestCreateData {
  profile_id: number
  email: string
  redirectUrl: string
  transactionId: number

  // Selects a custom action instead of the plain create:
  //   'kyc_review' | 'payment_instrument' | 'recipient'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Message {
  submissionData: Record<string, any>
  type: string
}

export interface MessageCreateData {
  case_id: number
  submissionData: Record<string, any>
  type: string
}

export interface MultiCurrencyAccount {
}

export interface MultiCurrencyAccountLoadMatch {
  country?: string
  profile_id?: number
  state?: string

  // Selects a custom action instead of the plain load:
  //   'eligibility'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MultiCurrencyAccountListMatch {
  profile_id: number

  // Selects a custom action instead of the plain list:
  //   'available-currencies' | 'payin-currencies'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OneTimeToken {
  challenges?: any[]
  faceMap?: string
  oneTimeToken?: string
  validity?: number
}

export interface OneTimeTokenCreateData {
  profile_id: number
  faceMap?: string

  // Selects a custom action instead of the plain create:
  //   'device-fingerprint' | 'pin'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Ott {
  actionType?: string
  challenges?: any[]
  oneTimeToken?: string
  userId?: number
  validity?: number
}

export interface OttLoadMatch {
  actionType?: string
  challenges?: any[]
  oneTimeToken?: string
  userId?: number
  validity?: number
}

export interface OttCreateData {
  otpCode?: any

  // Selects a custom action instead of the plain create:
  //   'sms' | 'voice' | 'whatsapp'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Payin {
  amount?: number
  currency?: string
  details?: Record<string, any>
  failureReason?: string
  id?: string
  payinSessionId?: string
  paymentInstrumentId?: string
  qrCodeInBase64?: string
  reference?: string
  status?: string
}

export interface PayinCreateData {
  payin_session_id?: string
  profile_id: number
  payment_instrument_id?: string
  amount?: number
  currency?: string
  details?: Record<string, any>
  failureReason?: string
  id?: string
  payinSessionId: string
  paymentInstrumentId?: string
  qrCodeInBase64?: string
  reference?: string
  status?: string
}

export interface PayinDepositDetail {
  payinBank?: Record<string, any>
  payinBankAccount?: Record<string, any>
  wiseInformation?: Record<string, any>
}

export interface PayinDepositDetailLoadMatch {
  profile_id: number
  transfer_id: number
}

export interface Payment {
  amount?: number
  currency?: string
  id?: number
  method?: string
  pricingVariant?: string | null
  timeCreated?: string
  timeUpdated?: string
}

export interface PaymentListMatch {
  transfer_id: number
}

export interface PaymentInitiation {
  id?: string
}

export interface PaymentInitiationLoadMatch {
  batch_group_id: string
  id: number
  profile_id: number
}

export interface PaymentInitiationCreateData {
  batch_group_id: string
  profile_id: number
  accountId?: any
  reference?: any
  type?: any
}

export interface PaymentInstrument {
  accountHolderName?: string
  accountNumber?: string
  accountOwnerDetails?: Record<string, any>
  accountType?: string
  bankCode?: string
  bankName?: string
  branchCode?: string
  disconnectReason?: string
  id?: string
  reference?: string
  status?: string
  type?: string
}

export interface PaymentInstrumentLoadMatch {
  id: string
  profile_id: number
}

export interface PaymentInstrumentListMatch {
  id: string
  profile_id: number

  // Selects a custom action instead of the plain list:
  //   'payin'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PaymentInstrumentCreateData {
  profile_id: number
  accountHolderName?: string
  accountNumber: string
  accountOwnerDetails?: Record<string, any>
  accountType?: string
  bankCode?: string
  branchCode?: string
  reference?: string
  type: string

  // Selects a custom action instead of the plain create:
  //   'manual-confirmation'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PaymentIntent {
  allocationId?: string
  allocationType?: string
  createdAt?: string
  fundingSource?: string
  id?: string
  partnerEntityId?: string
  paymentReference?: string
  profileId?: string
  reason?: string
  recipientType?: string
  sourceAmount?: number
  sourceCurrency?: string
  state?: string
  targetAmount?: number
  targetCurrency?: string
  updatedAt?: string
}

export interface PaymentIntentLoadMatch {
  allocation_id: string
  id: string
}

export interface PhoneNumber {
  clientId?: string
  id?: number
  phoneNumber?: string
  type?: string
  verified?: boolean
}

export interface PhoneNumberCreateData {
  user_id: number
  phoneNumber?: string
}

export interface Production {
  description?: string | null
  errorCode?: string | null
  kioskId?: string | null
  occurredAt?: string
  status?: string
}

export interface ProductionLoadMatch {
  card_token: string
  profile_id: number
}

export interface ProductionUpdateData {
  card_token: string
  profile_id: number
  kioskId?: string | null
}

export interface Profile {
  address?: Record<string, any>
  avatar?: string
  contactDetails?: Record<string, any>
  createdAt?: string
  currentState?: string
  dateOfBirth?: string
  email?: string
  firstName?: string
  fullName?: string
  id?: number
  lastName?: string
  phoneNumber?: string
  preferredName?: string
  publicId?: string
  secondaryAddresses?: any[]
  type?: string
  updatedAt?: string
  userId?: number
}

export interface ProfileLoadMatch {
  id: number

  // Selects a custom action instead of the plain load:
  //   'balance_capacity' | 'business_profile_business_representative' | 'multi_currency_account'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProfileListMatch {
  address?: Record<string, any>
  avatar?: string
  contactDetails?: Record<string, any>
  createdAt?: string
  currentState?: string
  dateOfBirth?: string
  email?: string
  firstName?: string
  fullName?: string
  id?: number
  lastName?: string
  phoneNumber?: string
  preferredName?: string
  publicId?: string
  secondaryAddresses?: any[]
  type?: string
  updatedAt?: string
  userId?: number
}

export interface ProfileCreateData {
  address?: Record<string, any>
  avatar?: string
  contactDetails?: Record<string, any>
  createdAt?: string
  currentState?: string
  dateOfBirth?: string
  email?: string
  firstName?: string
  fullName?: string
  id?: number
  lastName?: string
  phoneNumber?: string
  preferredName?: string
  publicId?: string
  secondaryAddresses?: any[]
  type?: string
  updatedAt?: string
  userId?: number
  birthCity?: any
  birthCountry?: any
  employerCity?: any
  employerCountry?: any
  employerName?: any
  expiryDate?: any
  externalCustomerId?: any
  firstNameInKana?: any
  issueDate?: any
  issuerCountry?: any
  issuerState?: any
  lastNameInKana?: any
  nationality?: any
  occupations?: any
  recipientId?: any
  uniqueIdentifier?: any

  // Selects a custom action instead of the plain create:
  //   'excess_money_account' | 'personal_profile' | 'pin' | 'update_window' | 'verification_document' | 'verification_status_bank_transfer' | 'verification_status_upload_document'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProfileUpdateData {
  id: number
  address?: Record<string, any>
  contactDetails?: Record<string, any>
  dateOfBirth?: string
  firstName?: string
  lastName?: string
  preferredName?: string
  type?: string
  actorEmail?: any
  clientId?: any
  expiryDate?: any
  externalCustomerId?: any
  firstNameInKana?: any
  issueDate?: any
  issuerCountry?: any
  issuerState?: any
  lastNameInKana?: any
  localizedInformation?: any
  nationality?: any
  occupations?: any
  placeOfBirth?: any
  sex?: any
  uniqueIdentifier?: any
  updateContext?: any

  // Selects a custom action instead of the plain update:
  //   'business_profile_business_representative' | 'personal_profile' | 'verification_document'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProfileRemoveMatch {
  id: number

  // Selects a custom action instead of the plain remove:
  //   'pin' | 'update_window'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Quote {
  createdTime?: string
  creationContext?: Record<string, any>
  expirationTime?: string
  guaranteedTargetAmount?: boolean
  guaranteedTargetAmountAllowed?: boolean
  id?: string
  notices?: any[]
  payOut?: string
  paymentMetadata?: Record<string, any>
  paymentOptions?: any[]
  preferredPayIn?: string
  pricingConfiguration?: Record<string, any>
  profile?: number
  providedAmountType?: string
  rate?: number
  rateExpirationTime?: string
  rateType?: string
  sourceAmount?: number
  sourceCurrency?: string
  status?: string
  targetAccount?: number
  targetAmount?: number
  targetAmountAllowed?: boolean
  targetCurrency?: string
  user?: number
}

export interface QuoteLoadMatch {
  id: string
  profile_id: number
}

export interface QuoteCreateData {
  creationContext?: Record<string, any>
  payOut?: string
  paymentMetadata?: Record<string, any>
  preferredPayIn?: string
  pricingConfiguration?: Record<string, any>
  sourceAmount?: number
  sourceCurrency: string
  targetAccount?: number
  targetAmount?: number
  targetCurrency: string
}

export interface QuoteUpdateData {
  id: string
  profile_id: number
  payOut?: string
  paymentMetadata?: Record<string, any>
  pricingConfiguration?: Record<string, any>
  targetAccount?: number
}

export interface Rate {
  rate: number
  source: string
  target: string
  time: string
}

export interface RateListMatch {
  from?: string
  group?: string
  source?: string
  target?: string
  time?: string
  to?: string
}

export interface Recipient {
  acceptedOutcomes: boolean
  accountHolderName?: string
  accountId?: number
  accountSummary?: string
  active?: boolean
  commonFieldMap?: Record<string, any>
  confirmations?: Record<string, any>
  country?: string
  creatorId?: number
  currency?: string
  details?: Record<string, any>
  displayFields?: any[]
  hash?: string
  id?: number
  isInternal?: boolean
  legalEntityType?: string
  longAccountSummary?: string
  name?: Record<string, any>
  ownedByCustomer?: boolean
  profile?: number
  profileId?: number
  quoteId?: string
  type?: string
  ultimateBeneficiary: Record<string, any> | null
}

export interface RecipientLoadMatch {
  account_id: number
}

export interface RecipientListMatch {
  active?: boolean
  creator_id?: number
  currency?: string
  owned_by_customer?: boolean
  profile?: number
  profile_id?: number
  seek_position?: number | null
  size?: number
  sort?: string
  type?: string
}

export interface RecipientCreateData {
  refund?: boolean
  acceptedOutcomes: boolean
  accountHolderName?: string
  accountId?: number
  accountSummary?: string
  active?: boolean
  commonFieldMap?: Record<string, any>
  confirmations?: Record<string, any>
  country?: string
  creatorId?: number
  currency?: string
  details?: Record<string, any>
  displayFields?: any[]
  hash?: string
  id?: number
  isInternal?: boolean
  legalEntityType?: string
  longAccountSummary?: string
  name?: Record<string, any>
  ownedByCustomer?: boolean
  profile?: number
  profileId?: number
  quoteId?: string
  type?: string
  ultimateBeneficiary: Record<string, any> | null
}

export interface RecipientUpdateData {
  account_id: number
  quote_id?: string
  acceptedOutcomes?: boolean
}

export interface RecipientRemoveMatch {
  account_id: number
}

export interface Rule {
  description?: string
  id?: number
  operation?: string
  type?: string
  values?: any[]
}

export interface RuleListMatch {
  application_id: string
}

export interface RuleCreateData {
  application_id: string
  description?: string
  operation?: string
  type?: string
  values?: any[]
}

export interface Saml {
  RelayState?: string
  SAMLResponse: string
}

export interface SamlLoadMatch {
  registration_id: string
}

export interface SamlCreateData {
  RelayState?: string
  SAMLResponse: string
}

export interface ScaDeviceFingerprint {
  createdAt?: string
  deviceFingerprintId?: string
  id?: string
}

export interface ScaDeviceFingerprintCreateData {
  profile_id: number
}

export interface ScaDeviceFingerprintRemoveMatch {
  id: string
  profile_id: number
}

export interface ScaFacemap {
  faceMap?: string
}

export interface ScaFacemapCreateData {
  profile_id: number
  faceMap?: string
}

export interface ScaFacemapRemoveMatch {
  profile_id: number
}

export interface ScaOtp {
}

export interface ScaOtpCreateData {

  // Selects a custom action instead of the plain create:
  //   'sms' | 'voice' | 'whatsapp'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ScaOtpRemoveMatch {
  phone_number_id: number
  user_id: number
}

export interface ScaSession {
}

export interface ScaSessionCreateData {
  profile_id: number

  // Selects a custom action instead of the plain create:
  //   'authorise'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SettlementAllocation {
  command: Record<string, any>
  createdAt?: string
  currency?: string
  expectedTotalAmount?: number
  file: string
  id?: string
  nextPageToken?: string
  paymentIntents?: any[]
  paymentReference?: string
  state?: string
  updatedAt?: string
}

export interface SettlementAllocationLoadMatch {
  id: string
  include_payment_intent?: boolean
  page_size?: number
  page_token?: string
}

export interface SettlementAllocationCreateData {
  command: Record<string, any>
  createdAt: string
  currency: string
  expectedTotalAmount: number
  file: string
  id: string
  nextPageToken?: string
  paymentIntents?: any[]
  paymentReference: string
  state: string
  updatedAt: string
}

export interface Simulation {
  business?: string
  created?: string
  creationTime?: number
  description?: string | null
  details?: Record<string, any>
  failure_reason_code?: string
  hasActiveIssues?: boolean
  id?: string
  key?: string
  quote?: number
  rate?: number
  reference?: string
  sourceAccount?: string
  sourceCurrency?: string
  sourceValue?: number
  state?: string
  status?: string
  targetAccount?: number
  targetCurrency?: string
  targetValue?: number
  transactionId?: number
  transferRequest?: string
  user?: number
  wise_id?: number
}

export interface SimulationLoadMatch {
  status: string
  transfer_id: number
}

export interface SimulationListMatch {
  card_token?: string
  profile_id: number
  limit?: number
  kyc_review_id?: string
}

export interface SimulationCreateData {
  transfer_id: number
  failure_reason_code?: string

  // Selects a custom action instead of the plain create:
  //   'balance-topup' | 'bank-transaction-import' | 'card-authorisation' | 'card-clearing' | 'card-production' | 'card-reversal' | 'kyc-requirement-add' | 'kyc-requirement-submit' | 'kyc-review-verify' | 'sanction_case' | 'settlement-funds' | 'swift-in' | 'verification' | 'verify_profile'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SpendControl {
  ruleId?: number
}

export interface SpendControlListMatch {
  application_id: string
}

export interface SpendControlCreateData {
  application_id: string
  ruleId?: number

  // Selects a custom action instead of the plain create:
  //   'apply' | 'unapply'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SpendControlRemoveMatch {
  application_id: string
  rule_id: number
}

export interface SpendLimit {
  aggregateWindow?: Record<string, any>
  id?: string
  type?: string
}

export interface SpendLimitListMatch {
  profile_id: number
}

export interface SpendLimitUpdateData {
  profile_id: number
  aggregateWindow?: Record<string, any>
  type?: string
}

export interface SpendLimitRemoveMatch {
  card_id: string
  id: string
  profile_id: number
}

export interface Subscription {
  created_at?: string
  created_by?: Record<string, any>
  delivery?: Record<string, any>
  id?: string
  name?: string
  scope?: Record<string, any>
  trigger_on?: string
}

export interface SubscriptionLoadMatch {
  client_key?: string
  id: string
  profile_id?: number
}

export interface SubscriptionListMatch {
  client_key: string
}

export interface SubscriptionCreateData {
  client_key: string
  delivery: Record<string, any>
  name: string
  trigger_on: string
}

export interface SubscriptionRemoveMatch {
  client_key?: string
  id: string
  profile_id?: number
}

export interface TestNotification {
  created_at?: string
  delivery_id?: string
}

export interface TestNotificationCreateData {
  client_key: string
  subscription_id: string
  created_at?: string
  delivery_id?: string
}

export interface ThirdPartyTransfer {
  created?: string
  details?: Record<string, any>
  hasActiveIssues?: boolean
  id?: number
  originalTransferId?: string
  originator?: Record<string, any>
  quote?: string
  rate?: number
  sourceAccount?: number
  sourceCurrency?: string
  sourceValue?: number
  status?: string
  targetAccount?: number
  targetCurrency?: string
  targetValue?: number
  user?: number
}

export interface ThirdPartyTransferLoadMatch {
  id: number
  profile_id: number
}

export interface ThirdPartyTransferCreateData {
  profile_id: number
  details: Record<string, any>
  originalTransferId: string
  originator: Record<string, any>
  quote: string
  sourceAccount?: number
  targetAccount: number
}

export interface ThreeDSecure {
  challengeStatus: string
  transactionReference: string
}

export interface ThreeDSecureCreateData {
  profile_id: number
  challengeStatus: string
  transactionReference: string
}

export interface Token {
  access_token?: string
  created_at?: string
  expires_at?: string
  expires_in?: number
  refresh_token?: string
  refresh_token_expires_at?: string
  refresh_token_expires_in?: number
  scope?: string
  token_type?: string
}

export interface TokenCreateData {
  access_token?: string
  created_at?: string
  expires_at?: string
  expires_in?: number
  refresh_token?: string
  refresh_token_expires_at?: string
  refresh_token_expires_in?: number
  scope?: string
  token_type?: string
}

export interface Transfer {
  business?: number | null
  created?: string
  customerTransactionId?: string
  details?: Record<string, any>
  hasActiveIssues?: boolean
  id?: number
  payinSessionId?: string
  quote?: number | null
  quoteUuid?: string
  rate?: number
  reference?: string
  sourceAccount?: number | null
  sourceCurrency?: string
  sourceValue?: number
  status?: string
  targetAccount?: number
  targetCurrency?: string
  targetValue?: number
  transferRequest?: number | null
  user?: number
}

export interface TransferLoadMatch {
  id: number

  // Selects a custom action instead of the plain load:
  //   'document_noc' | 'invoice_bankingpartner' | 'receiptpdf' | 'us_combined_receiptpdf'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TransferListMatch {
  created_date_end?: string
  created_date_start?: string
  limit?: number
  offset?: number
  profile?: number
  source_currency?: string
  status?: string
  target_currency?: string
}

export interface TransferCreateData {
  customerTransactionId: string
  details?: Record<string, any>
  quoteUuid: string
  sourceAccount?: number | null
  targetAccount: number
}

export interface TransferUpdateData {
  id: number
  business?: number | null
  created?: string
  customerTransactionId?: string
  details?: Record<string, any>
  hasActiveIssues?: boolean
  payinSessionId?: string
  quote?: number | null
  quoteUuid?: string
  rate?: number
  reference?: string
  sourceAccount?: number | null
  sourceCurrency?: string
  sourceValue?: number
  status?: string
  targetAccount?: number
  targetCurrency?: string
  targetValue?: number
  transferRequest?: number | null
  user?: number

  // Selects a custom action instead of the plain update:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TransferRequirement {
  customerTransactionId?: string
  details?: Record<string, any>
  originatorLegalEntityType?: string
  quoteUuid: string
  targetAccount: number
}

export interface TransferRequirementCreateData {
  customerTransactionId?: string
  details?: Record<string, any>
  originatorLegalEntityType?: string
  quoteUuid: string
  targetAccount: number
}

export interface Ubo {
  addressFirstLine?: string
  city?: string
  countryOfResidenceIso3Code?: string
  dateOfBirth?: string
  id?: string
  name?: string
  ownershipPercentage?: number
  postCode?: string
  state?: string
  ubos?: any[]
}

export interface UboListMatch {
  profile_id: number
}

export interface UboCreateData {
  profile_id: number
  ubos?: any[]
}

export interface UboUpdateData {
  profile_id: number
  ubos?: any[]
}

export interface User {
  active?: boolean
  details?: Record<string, any> | null
  email?: string
  id?: number
  language?: string
  name?: string | null
  registrationCode: string
}

export interface UserLoadMatch {
  id: number

  // Selects a custom action instead of the plain load:
  //   'contact_email'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserCreateData {
  email: string
  language?: string
  registrationCode: string

  // Selects a custom action instead of the plain create:
  //   'exist'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserUpdateData {
  id: number
  email?: string

  // Selects a custom action instead of the plain update:
  //   'contact_email'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Verification {
  required_evidences?: any[]
}

export interface VerificationListMatch {
  profile_id: number
}

export interface VerificationCreateData {
  profile_id: number
  accountPurpose?: any
  accountPurposeExplanation?: any
  annualIncome?: any
  businessUseCase?: any
  incomeExplanation?: any
  intendedCountries?: any
  mainSourceOfFunding?: any
  mainSourceOfIncome?: any
  monthlyAnticipatedVolume?: any
  yearlyAnticipatedVolume?: any
}

