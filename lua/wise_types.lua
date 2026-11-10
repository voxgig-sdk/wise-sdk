-- Typed models for the Wise SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AccountDetail
---@field accountHolderName string
---@field accountIdentification any
---@field country string
---@field id number
---@field profileId number
---@field state string

---@class AccountDetailLoadMatch
---@field id number

---@class AccountRequirement
---@field accountHolderName? string
---@field currency? string
---@field details? table
---@field fields? table
---@field ownedByCustomer? boolean
---@field profile? number
---@field title? string
---@field type? string
---@field ultimateBeneficiary table|nil
---@field usageInfo? string

---@class AccountRequirementListMatch
---@field quote_id string
---@field address_required? boolean
---@field originator_legal_entity_type? string

---@class AccountRequirementCreateData
---@field quote_id string
---@field originator_legal_entity_type? string
---@field accountHolderName? string
---@field currency? string
---@field details? table
---@field ownedByCustomer? boolean
---@field profile? number
---@field type? string
---@field ultimateBeneficiary table|nil

---@class Activity
---@field createdOn? string
---@field description? string
---@field id? string
---@field primaryAmount? string
---@field resource? table
---@field secondaryAmount? string
---@field status? string
---@field title? string
---@field type? string
---@field updatedOn? string

---@class ActivityListMatch
---@field profile_id number
---@field monetary_resource_type? string
---@field next_cursor? string
---@field since? string
---@field size? number
---@field status? string
---@field until? string

---@class Address
---@field details? table
---@field id? number
---@field profile? number

---@class AddressLoadMatch
---@field id number

---@class AddressListMatch
---@field profile? number

---@class AddressCreateData
---@field details table
---@field profile number

---@class AddressRequirement
---@field details table
---@field fields? table
---@field profile? number
---@field type? string

---@class AddressRequirementListMatch
---@field details? table
---@field fields? table
---@field profile? number
---@field type? string

---@class AddressRequirementCreateData
---@field details table
---@field profile? number

---@class Balance
---@field amount? table
---@field cashAmount? table
---@field creationTime? string
---@field currency? string
---@field icon? table|nil
---@field id? number
---@field investmentState? string
---@field modificationTime? string
---@field name? string|nil
---@field overdraft? table
---@field reservedAmount? table
---@field state string
---@field targetRecipientId number
---@field totalAvailable? table
---@field totalCash? table
---@field totalWorth? table
---@field type? string
---@field visible? boolean

---@class BalanceLoadMatch
---@field currency? string
---@field profile_id number
---@field id? number

---@class BalanceListMatch
---@field profile_id number
---@field type string

---@class BalanceCreateData
---@field hold_limit_breach_id? number
---@field profile_id number
---@field currency string
---@field name? string|nil
---@field state string
---@field targetRecipientId number
---@field type string

---@class BalanceRemoveMatch
---@field id number
---@field profile_id number

---@class BalanceStatement
---@field accountHolder? table
---@field bankDetails? table|nil
---@field endOfStatementBalance? table
---@field id? string
---@field issuer? table
---@field query? table
---@field transactions? table

---@class BalanceStatementLoadMatch
---@field id number
---@field profile_id number
---@field currency string
---@field interval_end string
---@field interval_start string
---@field statement_locale? string
---@field type? string

---@class BankAccountDetail
---@field active? boolean
---@field currency? string
---@field id? string
---@field internationalDetails? table|nil
---@field localDetails? table
---@field reason? string
---@field targetAccountId number

---@class BankAccountDetailCreateData
---@field payment_id? number
---@field profile_id number
---@field reason? string
---@field targetAccountId number

---@class BankAccountDetailsOrder
---@field accountDetailsId? number
---@field balanceId? number|nil
---@field creationTime? string
---@field currency? string
---@field id? string
---@field modificationTime? string
---@field requirements? table
---@field status? string

---@class BankAccountDetailsOrderListMatch
---@field profile_id number
---@field currency string

---@class BankAccountDetailsOrderCreateData
---@field profile_id number
---@field currency string

---@class BatchGroup
---@field alreadyPaid? boolean
---@field fileName? string|nil
---@field groupType? string
---@field id? string
---@field name? string
---@field payInDetails? table
---@field payinSessionId? string|nil
---@field profileId? number
---@field shortId? number
---@field sourceCurrency? string
---@field status? string
---@field transferIds? table
---@field type string
---@field userId? number
---@field version? number

---@class BatchGroupLoadMatch
---@field id string
---@field profile_id number

---@class BatchGroupCreateData
---@field batch_payment_id? string
---@field profile_id number
---@field name string
---@field sourceCurrency string
---@field type string

---@class BatchGroupUpdateData
---@field id string
---@field profile_id number
---@field status? string
---@field version? number

---@class BulkSettlement
---@field balanceTransfer? number
---@field refundedTransfers? table
---@field settlementCurrency? string
---@field settlementDate string
---@field settlementReference string
---@field transfers table
---@field type string

---@class BulkSettlementCreateData
---@field balanceTransfer? number
---@field refundedTransfers? table
---@field settlementCurrency? string
---@field settlementDate string
---@field settlementReference string
---@field transfers table
---@field type string

---@class BusinessProfile
---@field abn? string|nil
---@field acn? string|nil
---@field actorEmail? string
---@field address? table
---@field arbn? string|nil
---@field businessFreeFormDescription? string
---@field businessName? string
---@field businessNameInKatakana? string|nil
---@field businessRepresentative? table
---@field companyRole? string
---@field companyType? string
---@field contactDetails? table
---@field createdAt? string
---@field currentState? string
---@field descriptionOfBusiness? string
---@field email? string
---@field externalCustomerId? string
---@field firstLevelCategory? string
---@field fullName? string
---@field id? number
---@field industryCategories? table
---@field operationalAddresses? table
---@field publicId? string
---@field registrationNumber? string
---@field secondLevelCategory? string
---@field type string
---@field updatedAt? string
---@field userId? number
---@field webpage? string

---@class BusinessProfileCreateData
---@field abn? string|nil
---@field acn? string|nil
---@field actorEmail? string
---@field address? table
---@field arbn? string|nil
---@field businessFreeFormDescription? string
---@field businessName? string
---@field businessNameInKatakana? string|nil
---@field businessRepresentative? table
---@field companyRole? string
---@field companyType? string
---@field contactDetails table
---@field externalCustomerId? string
---@field firstLevelCategory? string
---@field industryCategories? table
---@field operationalAddresses? table
---@field registrationNumber? string
---@field secondLevelCategory? string
---@field webpage? string

---@class BusinessProfileUpdateData
---@field profile_id number
---@field abn? string|nil
---@field acn? string|nil
---@field address? table
---@field arbn? string|nil
---@field businessFreeFormDescription? string
---@field businessName? string
---@field businessNameInKatakana? string|nil
---@field companyRole? string
---@field companyType? string
---@field contactDetails? table
---@field externalCustomerId? string
---@field firstLevelCategory? string
---@field id? number
---@field industryCategories? table
---@field operationalAddresses? table
---@field registrationNumber? string
---@field secondLevelCategory? string
---@field webpage? string

---@class Card
---@field bankIdentificationNumber? string
---@field cardHolderName? string
---@field cardProgram? table
---@field clientId? string
---@field creationTime? string
---@field expiryDate? string
---@field id? string
---@field lastFourDigits? string
---@field modificationTime? string
---@field phoneNumber? string
---@field profileId? number
---@field status? table
---@field token? string
---@field unlockSpendingPermissions? string

---@class CardLoadMatch
---@field id string
---@field profile_id number

---@class CardListMatch
---@field profile_id number
---@field page_number? number
---@field page_size? number

---@class CardCreateData
---@field card_token string
---@field profile_id number
---@field bankIdentificationNumber? string
---@field cardHolderName? string
---@field cardProgram? table
---@field clientId? string
---@field creationTime? string
---@field expiryDate? string
---@field id? string
---@field lastFourDigits? string
---@field modificationTime? string
---@field phoneNumber? string
---@field profileId? number
---@field status? table
---@field token? string
---@field unlockSpendingPermissions? string

---@class CardUpdateData
---@field card_token string
---@field profile_id number
---@field status? table
---@field permissions? any

---@class CardHolderLimit
---@field aggregateWindow table
---@field spendLimits? table
---@field type string

---@class CardHolderLimitListMatch
---@field card_holder_profile_id number
---@field profile_id number

---@class CardHolderLimitUpdateData
---@field card_holder_profile_id number
---@field profile_id number
---@field aggregateWindow? table
---@field type? string

---@class CardHolderLimitRemoveMatch
---@field card_holder_profile_id number
---@field profile_id number

---@class CardLimit
---@field daily? table|nil
---@field lifetime? table|nil
---@field monthly? table|nil
---@field transaction? table|nil

---@class CardLimitLoadMatch
---@field card_token string
---@field profile_id number

---@class CardLimitUpdateData
---@field card_token string
---@field profile_id number
---@field daily? table|nil
---@field lifetime? table|nil
---@field monthly? table|nil
---@field transaction? table|nil

---@class CardOrder
---@field address? table
---@field cardHolderName? string
---@field cardHolderProfileId? number
---@field cardProgram? table
---@field cardToken? string|nil
---@field city? string
---@field clientId? string
---@field country? string
---@field creationTime? string
---@field deliveryDetails? table
---@field deliveryEstimate? string
---@field deliveryOption? string
---@field embossedName? string
---@field errors? table
---@field firstLine? string
---@field id? number
---@field lifetimeLimit? number|nil
---@field modificationTime? string
---@field phoneNumber? string
---@field postCode? string
---@field profileId? number
---@field program string
---@field replacementDetails? table
---@field replacesCard? string|nil
---@field secondLine? string|nil
---@field state? string|nil
---@field status? string
---@field thirdLine? string|nil

---@class CardOrderLoadMatch
---@field id number
---@field profile_id number

---@class CardOrderListMatch
---@field profile_id number
---@field page_number? number
---@field page_size? number

---@class CardOrderCreateData
---@field address? table
---@field cardHolderName string
---@field cardHolderProfileId? number
---@field city? string
---@field country? string
---@field deliveryOption? string
---@field embossedName? string
---@field firstLine? string
---@field lifetimeLimit? number|nil
---@field phoneNumber? string
---@field postCode? string
---@field program string
---@field replacementDetails? table
---@field secondLine? string|nil
---@field state? string|nil
---@field thirdLine? string|nil

---@class CardOrderUpdateData
---@field id number
---@field profile_id number
---@field status? string

---@class CardSensitiveDetail
---@field encryptedPayload string
---@field key? string
---@field keyVersion number
---@field version? number

---@class CardSensitiveDetailLoadMatch
---@field encryptedPayload? string
---@field key? string
---@field keyVersion? number
---@field version? number

---@class CardSensitiveDetailCreateData
---@field encryptedPayload string
---@field keyVersion number

---@class CardTransaction
---@field approvalCode? string|nil
---@field arn? string|nil
---@field authorisationMethod? string
---@field balanceChannelReferenceId? string|nil
---@field billingAmount? table
---@field cardToken? string
---@field creationTime? string
---@field credits? table
---@field debits? table
---@field declineReason? string|nil
---@field detailedDeclineReason? string|nil
---@field fees? table
---@field id? number
---@field merchant? table
---@field modificationTime? string
---@field pinValidationResult? string|nil
---@field purgeTime? string|nil
---@field relayAuthorisationData? table|nil
---@field state? string
---@field transactionAmount? table
---@field transactionAmountWithFees? table
---@field type? string

---@class CardTransactionLoadMatch
---@field id number
---@field profile_id number

---@class CardTransactionListMatch
---@field card_token string
---@field profile_id number
---@field from_creation_time string
---@field last_id? number
---@field page_size? number
---@field to_creation_time string

---@class Case
---@field createdAt string
---@field description? string
---@field details? table
---@field externalId? string
---@field id number
---@field messages table
---@field profileId number
---@field reference table
---@field status string
---@field subType? string
---@field subject? string
---@field type string
---@field updatedAt? string

---@class CaseLoadMatch
---@field id number

---@class CaseCreateData
---@field description? string
---@field details? table
---@field externalId? string
---@field subject? string
---@field type? string

---@class ClaimAccount
---@field claimAccountCode? string
---@field registrationCode string

---@class ClaimAccountCreateData
---@field registrationCode string

---@class Comparison
---@field amount? number
---@field amountType? string
---@field providerCountry? string|nil
---@field providerTypes? table
---@field providers? table
---@field sourceCountry? string|nil
---@field sourceCurrency? string|nil
---@field targetCountry? string|nil
---@field targetCurrency? string|nil

---@class ComparisonLoadMatch
---@field exclude_partner? boolean
---@field filter? string
---@field include_wise? boolean
---@field mid_market_rate? number
---@field number_of_provider? number
---@field pay_in_method? string
---@field provider? string
---@field provider_country? string
---@field provider_type? table
---@field recipient_gets_amount? number
---@field send_amount? number
---@field source_country? string
---@field source_currency string
---@field target_country? string
---@field target_currency string
---@field wise_estimated_delivery? string
---@field wise_fee? number
---@field wise_quote_created_time? string

---@class Contact
---@field contactId? string
---@field identifier? string
---@field name? string
---@field targetCurrency? string

---@class ContactCreateData
---@field profile_id number
---@field is_direct_identifier_creation boolean
---@field identifier? string
---@field targetCurrency? string

---@class Currency
---@field code? string
---@field countryKeywords? table
---@field name? string
---@field supportsDecimals? boolean
---@field symbol? string

---@class CurrencyListMatch
---@field code? string
---@field countryKeywords? table
---@field name? string
---@field supportsDecimals? boolean
---@field symbol? string

---@class DeliveryEstimate
---@field estimatedDeliveryDate? string
---@field formattedEstimatedDeliveryDate? string
---@field id? string

---@class DeliveryEstimateLoadMatch
---@field id number
---@field timezone? string

---@class DeliveryUpdate
---@field delivery_update string
---@field delivery_update_path table
---@field estimated_delivery_at? string|nil
---@field observation_id string
---@field occurred_at string
---@field scheme? string|nil

---@class DeliveryUpdateCreateData
---@field transfer_id number
---@field delivery_update string
---@field delivery_update_path table
---@field estimated_delivery_at? string|nil
---@field scheme? string|nil

---@class DigitalWallet
---@field activation string
---@field paymentTokens? table
---@field walletNames? table

---@class DigitalWalletCreateData
---@field card_token string
---@field payment_token_unique_reference? string
---@field profile_id number
---@field activation string
---@field walletNames? table

---@class DirectDebitAccount
---@field currency? string
---@field details? table
---@field id? number
---@field type? string

---@class DirectDebitAccountListMatch
---@field profile_id number
---@field currency string
---@field type string

---@class DirectDebitAccountCreateData
---@field profile_id number
---@field currency? string
---@field details? table
---@field type? string

---@class Director
---@field countryOfResidenceIso3Code? string
---@field dateOfBirth? string
---@field directors? table
---@field firstName? string
---@field id? number
---@field lastName? string

---@class DirectorListMatch
---@field profile_id number

---@class DirectorCreateData
---@field profile_id number
---@field directors? table

---@class DirectorUpdateData
---@field profile_id number
---@field directors? table

---@class DirectorRemoveMatch
---@field profile_id number

---@class Dispute
---@field canWithdraw? boolean
---@field createdAt? string
---@field createdBy? string
---@field disclaimer? table
---@field files? table
---@field form? table
---@field id? string
---@field lastUpdatedAt? string
---@field profileId? number
---@field reason? string
---@field receipt? string
---@field status? string
---@field statusMessage? string
---@field subStatus? string
---@field transaction? table
---@field transactionId? number

---@class DisputeLoadMatch
---@field id string
---@field profile_id number

---@class DisputeListMatch
---@field profile_id number
---@field page_number? number
---@field page_size? number
---@field status? string
---@field transaction_id? number

---@class DisputeCreateData
---@field profile_id number
---@field reason? string
---@field scheme? string
---@field canWithdraw? boolean
---@field createdAt? string
---@field createdBy? string
---@field disclaimer? table
---@field files? table
---@field form? table
---@field id? string
---@field lastUpdatedAt? string
---@field profileId? number
---@field receipt? string
---@field status? string
---@field statusMessage? string
---@field subStatus? string
---@field transaction? table
---@field transactionId? number

---@class DisputeUpdateData
---@field id string
---@field profile_id number
---@field status? string

---@class DisputeReason
---@field code? string
---@field description? string
---@field isFraud? boolean
---@field subOptions? table
---@field supportsMultipleTransactions? boolean
---@field tooltip? string

---@class DisputeReasonListMatch
---@field profile_id number

---@class Facetec

---@class FacetecLoadMatch

---@class File
---@field createdAt string
---@field file string
---@field fileId string
---@field fileName string
---@field profileId number
---@field purpose string
---@field submissionData table

---@class FileListMatch
---@field page_number? number
---@field page_size? number
---@field profile_id? number

---@class FileCreateData
---@field createdAt string
---@field file string
---@field fileId string
---@field fileName string
---@field profileId number
---@field purpose string
---@field submissionData table

---@class Funding
---@field balanceTransactionId? number
---@field status? string
---@field type? string

---@class FundingCreateData
---@field profile_id number
---@field transfer_id number
---@field status? string
---@field type? string
---@field balanceId? any
---@field partnerReference? any

---@class GpiTracking
---@field identifier string
---@field identifierType string
---@field transactions? table

---@class GpiTrackingCreateData
---@field identifier string
---@field identifierType string

---@class HoldLimitBreach
---@field amount? number
---@field closingReason? string
---@field createdAt? string
---@field currency? string
---@field id? number
---@field profileId? number
---@field state? string
---@field updatedAt? string

---@class HoldLimitBreachListMatch
---@field profile_id number
---@field closing_reason? string
---@field state? string

---@class IncomingTransfer
---@field accountDetailsId? string
---@field amounts table
---@field balanceId string
---@field chargeBearer? string
---@field creditTransferType? string
---@field creditedTime string
---@field creditor table
---@field debtor table
---@field endToEndId? string
---@field exchangeRate number
---@field fees table
---@field id string
---@field previousInstructingAgents table
---@field profileId number
---@field scheme string
---@field state string
---@field uetr? string
---@field unstructuredReference? string

---@class IncomingTransferLoadMatch
---@field id string

---@class Jose
---@field keyId? string
---@field keyMaterial? table
---@field publicKeyMaterial? table
---@field scope? string
---@field validFrom? string
---@field validTill? string
---@field version? number

---@class JoseLoadMatch
---@field algorithm string
---@field scope string
---@field version? number

---@class JoseCreateData
---@field keyId? string
---@field publicKeyMaterial? table
---@field scope? string
---@field validFrom? string
---@field validTill? string

---@class KycReview
---@field createdAt? string
---@field id? string
---@field link? table|nil
---@field redirectUrl? string|nil
---@field requiredBy? string|nil
---@field requirements? table|nil
---@field status? string
---@field triggerData? table
---@field triggerReferences? table
---@field type string
---@field updatedAt? string

---@class KycReviewLoadMatch
---@field id string
---@field profile_id number

---@class KycReviewListMatch
---@field profile_id number
---@field page_number? number
---@field page_size? number

---@class KycReviewCreateData
---@field profile_id number
---@field requirement_key? string
---@field createdAt? string
---@field id? string
---@field link? table|nil
---@field redirectUrl? string|nil
---@field requiredBy? string|nil
---@field requirements? table|nil
---@field status? string
---@field triggerData? table
---@field triggerReferences? table
---@field type string
---@field updatedAt? string

---@class KycReviewUpdateData
---@field id string
---@field profile_id number
---@field redirectUrl? string|nil

---@class LinkRequest
---@field clientKey string
---@field email string
---@field id string
---@field metadata table
---@field profileId number
---@field redirectUrl string
---@field transactionId number
---@field type string

---@class LinkRequestLoadMatch
---@field id string

---@class LinkRequestCreateData
---@field profile_id number
---@field email string
---@field redirectUrl string
---@field transactionId number

---@class Message
---@field submissionData table
---@field type string

---@class MessageCreateData
---@field case_id number
---@field submissionData table
---@field type string

---@class MultiCurrencyAccount

---@class MultiCurrencyAccountLoadMatch
---@field country? string
---@field profile_id? number
---@field state? string

---@class MultiCurrencyAccountListMatch
---@field profile_id number

---@class OneTimeToken
---@field challenges? table
---@field faceMap? string
---@field oneTimeToken? string
---@field validity? number

---@class OneTimeTokenCreateData
---@field profile_id number
---@field faceMap? string

---@class Ott
---@field actionType? string
---@field challenges? table
---@field oneTimeToken? string
---@field userId? number
---@field validity? number

---@class OttLoadMatch
---@field actionType? string
---@field challenges? table
---@field oneTimeToken? string
---@field userId? number
---@field validity? number

---@class OttCreateData
---@field otpCode? any

---@class Payin
---@field amount? number
---@field currency? string
---@field details? table
---@field failureReason? string
---@field id? string
---@field payinSessionId? string
---@field paymentInstrumentId? string
---@field qrCodeInBase64? string
---@field reference? string
---@field status? string

---@class PayinCreateData
---@field payin_session_id? string
---@field profile_id number
---@field payment_instrument_id? string
---@field amount? number
---@field currency? string
---@field details? table
---@field failureReason? string
---@field id? string
---@field payinSessionId string
---@field paymentInstrumentId? string
---@field qrCodeInBase64? string
---@field reference? string
---@field status? string

---@class PayinDepositDetail
---@field payinBank? table
---@field payinBankAccount? table
---@field wiseInformation? table

---@class PayinDepositDetailLoadMatch
---@field profile_id number
---@field transfer_id number

---@class Payment
---@field amount? number
---@field currency? string
---@field id? number
---@field method? string
---@field pricingVariant? string|nil
---@field timeCreated? string
---@field timeUpdated? string

---@class PaymentListMatch
---@field transfer_id number

---@class PaymentInitiation
---@field id? string

---@class PaymentInitiationLoadMatch
---@field batch_group_id string
---@field id number
---@field profile_id number

---@class PaymentInitiationCreateData
---@field batch_group_id string
---@field profile_id number
---@field accountId? any
---@field reference? any
---@field type? any

---@class PaymentInstrument
---@field accountHolderName? string
---@field accountNumber? string
---@field accountOwnerDetails? table
---@field accountType? string
---@field bankCode? string
---@field bankName? string
---@field branchCode? string
---@field disconnectReason? string
---@field id? string
---@field reference? string
---@field status? string
---@field type? string

---@class PaymentInstrumentLoadMatch
---@field id string
---@field profile_id number

---@class PaymentInstrumentListMatch
---@field id string
---@field profile_id number

---@class PaymentInstrumentCreateData
---@field profile_id number
---@field accountHolderName? string
---@field accountNumber string
---@field accountOwnerDetails? table
---@field accountType? string
---@field bankCode? string
---@field branchCode? string
---@field reference? string
---@field type string

---@class PaymentIntent
---@field allocationId? string
---@field allocationType? string
---@field createdAt? string
---@field fundingSource? string
---@field id? string
---@field partnerEntityId? string
---@field paymentReference? string
---@field profileId? string
---@field reason? string
---@field recipientType? string
---@field sourceAmount? number
---@field sourceCurrency? string
---@field state? string
---@field targetAmount? number
---@field targetCurrency? string
---@field updatedAt? string

---@class PaymentIntentLoadMatch
---@field allocation_id string
---@field id string

---@class PhoneNumber
---@field clientId? string
---@field id? number
---@field phoneNumber? string
---@field type? string
---@field verified? boolean

---@class PhoneNumberCreateData
---@field user_id number
---@field phoneNumber? string

---@class Production
---@field description? string|nil
---@field errorCode? string|nil
---@field kioskId? string|nil
---@field occurredAt? string
---@field status? string

---@class ProductionLoadMatch
---@field card_token string
---@field profile_id number

---@class ProductionUpdateData
---@field card_token string
---@field profile_id number
---@field kioskId? string|nil

---@class Profile
---@field address? table
---@field avatar? string
---@field contactDetails? table
---@field createdAt? string
---@field currentState? string
---@field dateOfBirth? string
---@field email? string
---@field firstName? string
---@field fullName? string
---@field id? number
---@field lastName? string
---@field phoneNumber? string
---@field preferredName? string
---@field publicId? string
---@field secondaryAddresses? table
---@field type? string
---@field updatedAt? string
---@field userId? number

---@class ProfileLoadMatch
---@field id number

---@class ProfileListMatch
---@field address? table
---@field avatar? string
---@field contactDetails? table
---@field createdAt? string
---@field currentState? string
---@field dateOfBirth? string
---@field email? string
---@field firstName? string
---@field fullName? string
---@field id? number
---@field lastName? string
---@field phoneNumber? string
---@field preferredName? string
---@field publicId? string
---@field secondaryAddresses? table
---@field type? string
---@field updatedAt? string
---@field userId? number

---@class ProfileCreateData
---@field address? table
---@field avatar? string
---@field contactDetails? table
---@field createdAt? string
---@field currentState? string
---@field dateOfBirth? string
---@field email? string
---@field firstName? string
---@field fullName? string
---@field id? number
---@field lastName? string
---@field phoneNumber? string
---@field preferredName? string
---@field publicId? string
---@field secondaryAddresses? table
---@field type? string
---@field updatedAt? string
---@field userId? number
---@field birthCity? any
---@field birthCountry? any
---@field employerCity? any
---@field employerCountry? any
---@field employerName? any
---@field expiryDate? any
---@field externalCustomerId? any
---@field firstNameInKana? any
---@field issueDate? any
---@field issuerCountry? any
---@field issuerState? any
---@field lastNameInKana? any
---@field nationality? any
---@field occupations? any
---@field recipientId? any
---@field uniqueIdentifier? any

---@class ProfileUpdateData
---@field id number
---@field address? table
---@field contactDetails? table
---@field dateOfBirth? string
---@field firstName? string
---@field lastName? string
---@field preferredName? string
---@field type? string
---@field actorEmail? any
---@field clientId? any
---@field expiryDate? any
---@field externalCustomerId? any
---@field firstNameInKana? any
---@field issueDate? any
---@field issuerCountry? any
---@field issuerState? any
---@field lastNameInKana? any
---@field localizedInformation? any
---@field nationality? any
---@field occupations? any
---@field placeOfBirth? any
---@field sex? any
---@field uniqueIdentifier? any
---@field updateContext? any

---@class ProfileRemoveMatch
---@field id number

---@class Quote
---@field createdTime? string
---@field creationContext? table
---@field expirationTime? string
---@field guaranteedTargetAmount? boolean
---@field guaranteedTargetAmountAllowed? boolean
---@field id? string
---@field notices? table
---@field payOut? string
---@field paymentMetadata? table
---@field paymentOptions? table
---@field preferredPayIn? string
---@field pricingConfiguration? table
---@field profile? number
---@field providedAmountType? string
---@field rate? number
---@field rateExpirationTime? string
---@field rateType? string
---@field sourceAmount? number
---@field sourceCurrency? string
---@field status? string
---@field targetAccount? number
---@field targetAmount? number
---@field targetAmountAllowed? boolean
---@field targetCurrency? string
---@field user? number

---@class QuoteLoadMatch
---@field id string
---@field profile_id number

---@class QuoteCreateData
---@field creationContext? table
---@field payOut? string
---@field paymentMetadata? table
---@field preferredPayIn? string
---@field pricingConfiguration? table
---@field sourceAmount? number
---@field sourceCurrency string
---@field targetAccount? number
---@field targetAmount? number
---@field targetCurrency string

---@class QuoteUpdateData
---@field id string
---@field profile_id number
---@field payOut? string
---@field paymentMetadata? table
---@field pricingConfiguration? table
---@field targetAccount? number

---@class Rate
---@field rate number
---@field source string
---@field target string
---@field time string

---@class RateListMatch
---@field from? string
---@field group? string
---@field source? string
---@field target? string
---@field time? string
---@field to? string

---@class Recipient
---@field acceptedOutcomes boolean
---@field accountHolderName? string
---@field accountId? number
---@field accountSummary? string
---@field active? boolean
---@field commonFieldMap? table
---@field confirmations? table
---@field country? string
---@field creatorId? number
---@field currency? string
---@field details? table
---@field displayFields? table
---@field hash? string
---@field id? number
---@field isInternal? boolean
---@field legalEntityType? string
---@field longAccountSummary? string
---@field name? table
---@field ownedByCustomer? boolean
---@field profile? number
---@field profileId? number
---@field quoteId? string
---@field type? string
---@field ultimateBeneficiary table|nil

---@class RecipientLoadMatch
---@field account_id number

---@class RecipientListMatch
---@field active? boolean
---@field creator_id? number
---@field currency? string
---@field owned_by_customer? boolean
---@field profile? number
---@field profile_id? number
---@field seek_position? number|nil
---@field size? number
---@field sort? string
---@field type? string

---@class RecipientCreateData
---@field refund? boolean
---@field acceptedOutcomes boolean
---@field accountHolderName? string
---@field accountId? number
---@field accountSummary? string
---@field active? boolean
---@field commonFieldMap? table
---@field confirmations? table
---@field country? string
---@field creatorId? number
---@field currency? string
---@field details? table
---@field displayFields? table
---@field hash? string
---@field id? number
---@field isInternal? boolean
---@field legalEntityType? string
---@field longAccountSummary? string
---@field name? table
---@field ownedByCustomer? boolean
---@field profile? number
---@field profileId? number
---@field quoteId? string
---@field type? string
---@field ultimateBeneficiary table|nil

---@class RecipientUpdateData
---@field account_id number
---@field quote_id? string
---@field acceptedOutcomes? boolean

---@class RecipientRemoveMatch
---@field account_id number

---@class Rule
---@field description? string
---@field id? number
---@field operation? string
---@field type? string
---@field values? table

---@class RuleListMatch
---@field application_id string

---@class RuleCreateData
---@field application_id string
---@field description? string
---@field operation? string
---@field type? string
---@field values? table

---@class Saml
---@field RelayState? string
---@field SAMLResponse string

---@class SamlLoadMatch
---@field registration_id string

---@class SamlCreateData
---@field RelayState? string
---@field SAMLResponse string

---@class ScaDeviceFingerprint
---@field createdAt? string
---@field deviceFingerprintId? string
---@field id? string

---@class ScaDeviceFingerprintCreateData
---@field profile_id number

---@class ScaDeviceFingerprintRemoveMatch
---@field id string
---@field profile_id number

---@class ScaFacemap
---@field faceMap? string

---@class ScaFacemapCreateData
---@field profile_id number
---@field faceMap? string

---@class ScaFacemapRemoveMatch
---@field profile_id number

---@class ScaOtp

---@class ScaOtpCreateData

---@class ScaOtpRemoveMatch
---@field phone_number_id number
---@field user_id number

---@class ScaSession

---@class ScaSessionCreateData
---@field profile_id number

---@class SettlementAllocation
---@field command table
---@field createdAt? string
---@field currency? string
---@field expectedTotalAmount? number
---@field file string
---@field id? string
---@field nextPageToken? string
---@field paymentIntents? table
---@field paymentReference? string
---@field state? string
---@field updatedAt? string

---@class SettlementAllocationLoadMatch
---@field id string
---@field include_payment_intent? boolean
---@field page_size? number
---@field page_token? string

---@class SettlementAllocationCreateData
---@field command table
---@field createdAt string
---@field currency string
---@field expectedTotalAmount number
---@field file string
---@field id string
---@field nextPageToken? string
---@field paymentIntents? table
---@field paymentReference string
---@field state string
---@field updatedAt string

---@class Simulation
---@field business? string
---@field created? string
---@field creationTime? number
---@field description? string|nil
---@field details? table
---@field failure_reason_code? string
---@field hasActiveIssues? boolean
---@field id? string
---@field key? string
---@field quote? number
---@field rate? number
---@field reference? string
---@field sourceAccount? string
---@field sourceCurrency? string
---@field sourceValue? number
---@field state? string
---@field status? string
---@field targetAccount? number
---@field targetCurrency? string
---@field targetValue? number
---@field transactionId? number
---@field transferRequest? string
---@field user? number
---@field wise_id? number

---@class SimulationLoadMatch
---@field status string
---@field transfer_id number

---@class SimulationListMatch
---@field card_token? string
---@field profile_id number
---@field limit? number
---@field kyc_review_id? string

---@class SimulationCreateData
---@field transfer_id number
---@field failure_reason_code? string

---@class SpendControl
---@field ruleId? number

---@class SpendControlListMatch
---@field application_id string

---@class SpendControlCreateData
---@field application_id string
---@field ruleId? number

---@class SpendControlRemoveMatch
---@field application_id string
---@field rule_id number

---@class SpendLimit
---@field aggregateWindow? table
---@field id? string
---@field type? string

---@class SpendLimitListMatch
---@field profile_id number

---@class SpendLimitUpdateData
---@field profile_id number
---@field aggregateWindow? table
---@field type? string

---@class SpendLimitRemoveMatch
---@field card_id string
---@field id string
---@field profile_id number

---@class Subscription
---@field created_at? string
---@field created_by? table
---@field delivery? table
---@field id? string
---@field name? string
---@field scope? table
---@field trigger_on? string

---@class SubscriptionLoadMatch
---@field client_key? string
---@field id string
---@field profile_id? number

---@class SubscriptionListMatch
---@field client_key string

---@class SubscriptionCreateData
---@field client_key string
---@field delivery table
---@field name string
---@field trigger_on string

---@class SubscriptionRemoveMatch
---@field client_key? string
---@field id string
---@field profile_id? number

---@class TestNotification
---@field created_at? string
---@field delivery_id? string

---@class TestNotificationCreateData
---@field client_key string
---@field subscription_id string
---@field created_at? string
---@field delivery_id? string

---@class ThirdPartyTransfer
---@field created? string
---@field details? table
---@field hasActiveIssues? boolean
---@field id? number
---@field originalTransferId? string
---@field originator? table
---@field quote? string
---@field rate? number
---@field sourceAccount? number
---@field sourceCurrency? string
---@field sourceValue? number
---@field status? string
---@field targetAccount? number
---@field targetCurrency? string
---@field targetValue? number
---@field user? number

---@class ThirdPartyTransferLoadMatch
---@field id number
---@field profile_id number

---@class ThirdPartyTransferCreateData
---@field profile_id number
---@field details table
---@field originalTransferId string
---@field originator table
---@field quote string
---@field sourceAccount? number
---@field targetAccount number

---@class ThreeDSecure
---@field challengeStatus string
---@field transactionReference string

---@class ThreeDSecureCreateData
---@field profile_id number
---@field challengeStatus string
---@field transactionReference string

---@class Token
---@field access_token? string
---@field created_at? string
---@field expires_at? string
---@field expires_in? number
---@field refresh_token? string
---@field refresh_token_expires_at? string
---@field refresh_token_expires_in? number
---@field scope? string
---@field token_type? string

---@class TokenCreateData
---@field access_token? string
---@field created_at? string
---@field expires_at? string
---@field expires_in? number
---@field refresh_token? string
---@field refresh_token_expires_at? string
---@field refresh_token_expires_in? number
---@field scope? string
---@field token_type? string

---@class Transfer
---@field business? number|nil
---@field created? string
---@field customerTransactionId? string
---@field details? table
---@field hasActiveIssues? boolean
---@field id? number
---@field payinSessionId? string
---@field quote? number|nil
---@field quoteUuid? string
---@field rate? number
---@field reference? string
---@field sourceAccount? number|nil
---@field sourceCurrency? string
---@field sourceValue? number
---@field status? string
---@field targetAccount? number
---@field targetCurrency? string
---@field targetValue? number
---@field transferRequest? number|nil
---@field user? number

---@class TransferLoadMatch
---@field id number

---@class TransferListMatch
---@field created_date_end? string
---@field created_date_start? string
---@field limit? number
---@field offset? number
---@field profile? number
---@field source_currency? string
---@field status? string
---@field target_currency? string

---@class TransferCreateData
---@field customerTransactionId string
---@field details? table
---@field quoteUuid string
---@field sourceAccount? number|nil
---@field targetAccount number

---@class TransferUpdateData
---@field id number
---@field business? number|nil
---@field created? string
---@field customerTransactionId? string
---@field details? table
---@field hasActiveIssues? boolean
---@field payinSessionId? string
---@field quote? number|nil
---@field quoteUuid? string
---@field rate? number
---@field reference? string
---@field sourceAccount? number|nil
---@field sourceCurrency? string
---@field sourceValue? number
---@field status? string
---@field targetAccount? number
---@field targetCurrency? string
---@field targetValue? number
---@field transferRequest? number|nil
---@field user? number

---@class TransferRequirement
---@field customerTransactionId? string
---@field details? table
---@field originatorLegalEntityType? string
---@field quoteUuid string
---@field targetAccount number

---@class TransferRequirementCreateData
---@field customerTransactionId? string
---@field details? table
---@field originatorLegalEntityType? string
---@field quoteUuid string
---@field targetAccount number

---@class Ubo
---@field addressFirstLine? string
---@field city? string
---@field countryOfResidenceIso3Code? string
---@field dateOfBirth? string
---@field id? string
---@field name? string
---@field ownershipPercentage? number
---@field postCode? string
---@field state? string
---@field ubos? table

---@class UboListMatch
---@field profile_id number

---@class UboCreateData
---@field profile_id number
---@field ubos? table

---@class UboUpdateData
---@field profile_id number
---@field ubos? table

---@class User
---@field active? boolean
---@field details? table|nil
---@field email? string
---@field id? number
---@field language? string
---@field name? string|nil
---@field registrationCode string

---@class UserLoadMatch
---@field id number

---@class UserCreateData
---@field email string
---@field language? string
---@field registrationCode string

---@class UserUpdateData
---@field id number
---@field email? string

---@class Verification
---@field required_evidences? table

---@class VerificationListMatch
---@field profile_id number

---@class VerificationCreateData
---@field profile_id number
---@field accountPurpose? any
---@field accountPurposeExplanation? any
---@field annualIncome? any
---@field businessUseCase? any
---@field incomeExplanation? any
---@field intendedCountries? any
---@field mainSourceOfFunding? any
---@field mainSourceOfIncome? any
---@field monthlyAnticipatedVolume? any
---@field yearlyAnticipatedVolume? any

local M = {}

return M
