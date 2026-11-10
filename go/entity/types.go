// Typed models for the Wise SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/wise-sdk/go/core"
)

// AccountDetail is the typed data model for the account_detail entity.
type AccountDetail struct {
}

// AccountDetailLoadMatch is the typed request payload for AccountDetail.LoadTyped.
type AccountDetailLoadMatch struct {
	Id int `json:"id"`
}

// AccountRequirement is the typed data model for the account_requirement entity.
type AccountRequirement struct {
}

// AccountRequirementListMatch is the typed request payload for AccountRequirement.ListTyped.
type AccountRequirementListMatch struct {
	QuoteId string `json:"quote_id"`
	AddressRequired *bool `json:"address_required,omitempty"`
	OriginatorLegalEntityType *string `json:"originator_legal_entity_type,omitempty"`
}

// AccountRequirementCreateData is the typed request payload for AccountRequirement.CreateTyped.
type AccountRequirementCreateData struct {
	QuoteId string `json:"quote_id"`
	OriginatorLegalEntityType *string `json:"originator_legal_entity_type,omitempty"`
	AccountHolderName *string `json:"accountHolderName,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	OwnedByCustomer *bool `json:"ownedByCustomer,omitempty"`
	Profile *int `json:"profile,omitempty"`
	Type *string `json:"type,omitempty"`
	UltimateBeneficiary any `json:"ultimateBeneficiary"`
}

// Activity is the typed data model for the activity entity.
type Activity struct {
}

// ActivityListMatch is the typed request payload for Activity.ListTyped.
type ActivityListMatch struct {
	ProfileId int `json:"profile_id"`
	MonetaryResourceType *string `json:"monetary_resource_type,omitempty"`
	NextCursor *string `json:"next_cursor,omitempty"`
	Since *string `json:"since,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Until *string `json:"until,omitempty"`
}

// Address is the typed data model for the address entity.
type Address struct {
}

// AddressLoadMatch is the typed request payload for Address.LoadTyped.
type AddressLoadMatch struct {
	Id int `json:"id"`
}

// AddressListMatch is the typed request payload for Address.ListTyped.
type AddressListMatch struct {
	Profile *int `json:"profile,omitempty"`
}

// AddressCreateData is the typed request payload for Address.CreateTyped.
type AddressCreateData struct {
	Details map[string]any `json:"details"`
	Profile int `json:"profile"`
}

// AddressRequirement is the typed data model for the address_requirement entity.
type AddressRequirement struct {
}

// AddressRequirementListMatch is the typed request payload for AddressRequirement.ListTyped.
type AddressRequirementListMatch struct {
	Details *map[string]any `json:"details,omitempty"`
	Fields *[]any `json:"fields,omitempty"`
	Profile *int `json:"profile,omitempty"`
	Type *string `json:"type,omitempty"`
}

// AddressRequirementCreateData is the typed request payload for AddressRequirement.CreateTyped.
type AddressRequirementCreateData struct {
	Details map[string]any `json:"details"`
	Profile *int `json:"profile,omitempty"`
}

// Balance is the typed data model for the balance entity.
type Balance struct {
}

// BalanceLoadMatch is the typed request payload for Balance.LoadTyped.
type BalanceLoadMatch struct {
	Currency *string `json:"currency,omitempty"`
	ProfileId int `json:"profile_id"`
	Id *int `json:"id,omitempty"`
}

// BalanceListMatch is the typed request payload for Balance.ListTyped.
type BalanceListMatch struct {
	ProfileId int `json:"profile_id"`
	Type string `json:"type"`
}

// BalanceCreateData is the typed request payload for Balance.CreateTyped.
type BalanceCreateData struct {
	HoldLimitBreachId *int `json:"hold_limit_breach_id,omitempty"`
	ProfileId int `json:"profile_id"`
	Currency string `json:"currency"`
	Name *any `json:"name,omitempty"`
	State string `json:"state"`
	TargetRecipientId int `json:"targetRecipientId"`
	Type string `json:"type"`
}

// BalanceRemoveMatch is the typed request payload for Balance.RemoveTyped.
type BalanceRemoveMatch struct {
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
}

// BalanceStatement is the typed data model for the balance_statement entity.
type BalanceStatement struct {
}

// BalanceStatementLoadMatch is the typed request payload for BalanceStatement.LoadTyped.
type BalanceStatementLoadMatch struct {
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
	Currency string `json:"currency"`
	IntervalEnd string `json:"interval_end"`
	IntervalStart string `json:"interval_start"`
	StatementLocale *string `json:"statement_locale,omitempty"`
	Type *string `json:"type,omitempty"`
}

// BankAccountDetail is the typed data model for the bank_account_detail entity.
type BankAccountDetail struct {
}

// BankAccountDetailCreateData is the typed request payload for BankAccountDetail.CreateTyped.
type BankAccountDetailCreateData struct {
	PaymentId *int `json:"payment_id,omitempty"`
	ProfileId int `json:"profile_id"`
	Reason *string `json:"reason,omitempty"`
	TargetAccountId int `json:"targetAccountId"`
}

// BankAccountDetailsOrder is the typed data model for the bank_account_details_order entity.
type BankAccountDetailsOrder struct {
}

// BankAccountDetailsOrderListMatch is the typed request payload for BankAccountDetailsOrder.ListTyped.
type BankAccountDetailsOrderListMatch struct {
	ProfileId int `json:"profile_id"`
	Currency string `json:"currency"`
}

// BankAccountDetailsOrderCreateData is the typed request payload for BankAccountDetailsOrder.CreateTyped.
type BankAccountDetailsOrderCreateData struct {
	ProfileId int `json:"profile_id"`
	Currency string `json:"currency"`
}

// BatchGroup is the typed data model for the batch_group entity.
type BatchGroup struct {
}

// BatchGroupLoadMatch is the typed request payload for BatchGroup.LoadTyped.
type BatchGroupLoadMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// BatchGroupCreateData is the typed request payload for BatchGroup.CreateTyped.
type BatchGroupCreateData struct {
	BatchPaymentId *string `json:"batch_payment_id,omitempty"`
	ProfileId int `json:"profile_id"`
	Name string `json:"name"`
	SourceCurrency string `json:"sourceCurrency"`
	Type string `json:"type"`
}

// BatchGroupUpdateData is the typed request payload for BatchGroup.UpdateTyped.
type BatchGroupUpdateData struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
	Status *string `json:"status,omitempty"`
	Version *int `json:"version,omitempty"`
}

// BulkSettlement is the typed data model for the bulk_settlement entity.
type BulkSettlement struct {
}

// BulkSettlementCreateData is the typed request payload for BulkSettlement.CreateTyped.
type BulkSettlementCreateData struct {
	BalanceTransfer *float64 `json:"balanceTransfer,omitempty"`
	RefundedTransfers *[]any `json:"refundedTransfers,omitempty"`
	SettlementCurrency *string `json:"settlementCurrency,omitempty"`
	SettlementDate string `json:"settlementDate"`
	SettlementReference string `json:"settlementReference"`
	Transfers []any `json:"transfers"`
	Type string `json:"type"`
}

// BusinessProfile is the typed data model for the business_profile entity.
type BusinessProfile struct {
}

// BusinessProfileCreateData is the typed request payload for BusinessProfile.CreateTyped.
type BusinessProfileCreateData struct {
	Abn *any `json:"abn,omitempty"`
	Acn *any `json:"acn,omitempty"`
	ActorEmail *string `json:"actorEmail,omitempty"`
	Address *map[string]any `json:"address,omitempty"`
	Arbn *any `json:"arbn,omitempty"`
	BusinessFreeFormDescription *string `json:"businessFreeFormDescription,omitempty"`
	BusinessName *string `json:"businessName,omitempty"`
	BusinessNameInKatakana *any `json:"businessNameInKatakana,omitempty"`
	BusinessRepresentative *map[string]any `json:"businessRepresentative,omitempty"`
	CompanyRole *string `json:"companyRole,omitempty"`
	CompanyType *string `json:"companyType,omitempty"`
	ContactDetails map[string]any `json:"contactDetails"`
	ExternalCustomerId *string `json:"externalCustomerId,omitempty"`
	FirstLevelCategory *string `json:"firstLevelCategory,omitempty"`
	IndustryCategories *[]any `json:"industryCategories,omitempty"`
	OperationalAddresses *[]any `json:"operationalAddresses,omitempty"`
	RegistrationNumber *string `json:"registrationNumber,omitempty"`
	SecondLevelCategory *string `json:"secondLevelCategory,omitempty"`
	Webpage *string `json:"webpage,omitempty"`
}

// BusinessProfileUpdateData is the typed request payload for BusinessProfile.UpdateTyped.
type BusinessProfileUpdateData struct {
	ProfileId int `json:"profile_id"`
	Abn *any `json:"abn,omitempty"`
	Acn *any `json:"acn,omitempty"`
	Address *map[string]any `json:"address,omitempty"`
	Arbn *any `json:"arbn,omitempty"`
	BusinessFreeFormDescription *string `json:"businessFreeFormDescription,omitempty"`
	BusinessName *string `json:"businessName,omitempty"`
	BusinessNameInKatakana *any `json:"businessNameInKatakana,omitempty"`
	CompanyRole *string `json:"companyRole,omitempty"`
	CompanyType *string `json:"companyType,omitempty"`
	ContactDetails *map[string]any `json:"contactDetails,omitempty"`
	ExternalCustomerId *string `json:"externalCustomerId,omitempty"`
	FirstLevelCategory *string `json:"firstLevelCategory,omitempty"`
	Id *int `json:"id,omitempty"`
	IndustryCategories *[]any `json:"industryCategories,omitempty"`
	OperationalAddresses *[]any `json:"operationalAddresses,omitempty"`
	RegistrationNumber *string `json:"registrationNumber,omitempty"`
	SecondLevelCategory *string `json:"secondLevelCategory,omitempty"`
	Webpage *string `json:"webpage,omitempty"`
}

// Card is the typed data model for the card entity.
type Card struct {
}

// CardLoadMatch is the typed request payload for Card.LoadTyped.
type CardLoadMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// CardListMatch is the typed request payload for Card.ListTyped.
type CardListMatch struct {
	ProfileId int `json:"profile_id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// CardCreateData is the typed request payload for Card.CreateTyped.
type CardCreateData struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
	BankIdentificationNumber *string `json:"bankIdentificationNumber,omitempty"`
	CardHolderName *string `json:"cardHolderName,omitempty"`
	CardProgram *map[string]any `json:"cardProgram,omitempty"`
	ClientId *string `json:"clientId,omitempty"`
	CreationTime *string `json:"creationTime,omitempty"`
	ExpiryDate *string `json:"expiryDate,omitempty"`
	Id *string `json:"id,omitempty"`
	LastFourDigits *string `json:"lastFourDigits,omitempty"`
	ModificationTime *string `json:"modificationTime,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	ProfileId2 *int `json:"profileId,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Token *string `json:"token,omitempty"`
	UnlockSpendingPermissions *string `json:"unlockSpendingPermissions,omitempty"`
}

// CardUpdateData is the typed request payload for Card.UpdateTyped.
type CardUpdateData struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
	Status *map[string]any `json:"status,omitempty"`
	Permissions *any `json:"permissions,omitempty"`
}

// CardHolderLimit is the typed data model for the card_holder_limit entity.
type CardHolderLimit struct {
}

// CardHolderLimitListMatch is the typed request payload for CardHolderLimit.ListTyped.
type CardHolderLimitListMatch struct {
	CardHolderProfileId int `json:"card_holder_profile_id"`
	ProfileId int `json:"profile_id"`
}

// CardHolderLimitUpdateData is the typed request payload for CardHolderLimit.UpdateTyped.
type CardHolderLimitUpdateData struct {
	CardHolderProfileId int `json:"card_holder_profile_id"`
	ProfileId int `json:"profile_id"`
	AggregateWindow *map[string]any `json:"aggregateWindow,omitempty"`
	Type *string `json:"type,omitempty"`
}

// CardHolderLimitRemoveMatch is the typed request payload for CardHolderLimit.RemoveTyped.
type CardHolderLimitRemoveMatch struct {
	CardHolderProfileId int `json:"card_holder_profile_id"`
	ProfileId int `json:"profile_id"`
}

// CardLimit is the typed data model for the card_limit entity.
type CardLimit struct {
}

// CardLimitLoadMatch is the typed request payload for CardLimit.LoadTyped.
type CardLimitLoadMatch struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
}

// CardLimitUpdateData is the typed request payload for CardLimit.UpdateTyped.
type CardLimitUpdateData struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
	Daily *any `json:"daily,omitempty"`
	Lifetime *any `json:"lifetime,omitempty"`
	Monthly *any `json:"monthly,omitempty"`
	Transaction *any `json:"transaction,omitempty"`
}

// CardOrder is the typed data model for the card_order entity.
type CardOrder struct {
}

// CardOrderLoadMatch is the typed request payload for CardOrder.LoadTyped.
type CardOrderLoadMatch struct {
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
}

// CardOrderListMatch is the typed request payload for CardOrder.ListTyped.
type CardOrderListMatch struct {
	ProfileId int `json:"profile_id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// CardOrderCreateData is the typed request payload for CardOrder.CreateTyped.
type CardOrderCreateData struct {
	Address *map[string]any `json:"address,omitempty"`
	CardHolderName string `json:"cardHolderName"`
	CardHolderProfileId *int `json:"cardHolderProfileId,omitempty"`
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	DeliveryOption *string `json:"deliveryOption,omitempty"`
	EmbossedName *string `json:"embossedName,omitempty"`
	FirstLine *string `json:"firstLine,omitempty"`
	LifetimeLimit *any `json:"lifetimeLimit,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	PostCode *string `json:"postCode,omitempty"`
	Program string `json:"program"`
	ReplacementDetails *map[string]any `json:"replacementDetails,omitempty"`
	SecondLine *any `json:"secondLine,omitempty"`
	State *any `json:"state,omitempty"`
	ThirdLine *any `json:"thirdLine,omitempty"`
}

// CardOrderUpdateData is the typed request payload for CardOrder.UpdateTyped.
type CardOrderUpdateData struct {
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
	Status *string `json:"status,omitempty"`
}

// CardSensitiveDetail is the typed data model for the card_sensitive_detail entity.
type CardSensitiveDetail struct {
}

// CardSensitiveDetailLoadMatch is the typed request payload for CardSensitiveDetail.LoadTyped.
type CardSensitiveDetailLoadMatch struct {
	EncryptedPayload *string `json:"encryptedPayload,omitempty"`
	Key *string `json:"key,omitempty"`
	KeyVersion *int `json:"keyVersion,omitempty"`
	Version *int `json:"version,omitempty"`
}

// CardSensitiveDetailCreateData is the typed request payload for CardSensitiveDetail.CreateTyped.
type CardSensitiveDetailCreateData struct {
	EncryptedPayload string `json:"encryptedPayload"`
	KeyVersion int `json:"keyVersion"`
}

// CardTransaction is the typed data model for the card_transaction entity.
type CardTransaction struct {
}

// CardTransactionLoadMatch is the typed request payload for CardTransaction.LoadTyped.
type CardTransactionLoadMatch struct {
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
}

// CardTransactionListMatch is the typed request payload for CardTransaction.ListTyped.
type CardTransactionListMatch struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
	FromCreationTime string `json:"from_creation_time"`
	LastId *int `json:"last_id,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	ToCreationTime string `json:"to_creation_time"`
}

// Case is the typed data model for the case entity.
type Case struct {
}

// CaseLoadMatch is the typed request payload for Case.LoadTyped.
type CaseLoadMatch struct {
	Id int `json:"id"`
}

// CaseCreateData is the typed request payload for Case.CreateTyped.
type CaseCreateData struct {
	Description *string `json:"description,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	ExternalId *string `json:"externalId,omitempty"`
	Subject *string `json:"subject,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ClaimAccount is the typed data model for the claim_account entity.
type ClaimAccount struct {
}

// ClaimAccountCreateData is the typed request payload for ClaimAccount.CreateTyped.
type ClaimAccountCreateData struct {
	RegistrationCode string `json:"registrationCode"`
}

// Comparison is the typed data model for the comparison entity.
type Comparison struct {
}

// ComparisonLoadMatch is the typed request payload for Comparison.LoadTyped.
type ComparisonLoadMatch struct {
	ExcludePartner *bool `json:"exclude_partner,omitempty"`
	Filter *string `json:"filter,omitempty"`
	IncludeWise *bool `json:"include_wise,omitempty"`
	MidMarketRate *float64 `json:"mid_market_rate,omitempty"`
	NumberOfProvider *int `json:"number_of_provider,omitempty"`
	PayInMethod *string `json:"pay_in_method,omitempty"`
	Provider *string `json:"provider,omitempty"`
	ProviderCountry *string `json:"provider_country,omitempty"`
	ProviderType *[]any `json:"provider_type,omitempty"`
	RecipientGetsAmount *float64 `json:"recipient_gets_amount,omitempty"`
	SendAmount *float64 `json:"send_amount,omitempty"`
	SourceCountry *string `json:"source_country,omitempty"`
	SourceCurrency string `json:"source_currency"`
	TargetCountry *string `json:"target_country,omitempty"`
	TargetCurrency string `json:"target_currency"`
	WiseEstimatedDelivery *string `json:"wise_estimated_delivery,omitempty"`
	WiseFee *float64 `json:"wise_fee,omitempty"`
	WiseQuoteCreatedTime *string `json:"wise_quote_created_time,omitempty"`
}

// Contact is the typed data model for the contact entity.
type Contact struct {
}

// ContactCreateData is the typed request payload for Contact.CreateTyped.
type ContactCreateData struct {
	ProfileId int `json:"profile_id"`
	IsDirectIdentifierCreation bool `json:"is_direct_identifier_creation"`
	Identifier *string `json:"identifier,omitempty"`
	TargetCurrency *string `json:"targetCurrency,omitempty"`
}

// Currency is the typed data model for the currency entity.
type Currency struct {
}

// CurrencyListMatch is the typed request payload for Currency.ListTyped.
type CurrencyListMatch struct {
	Code *string `json:"code,omitempty"`
	CountryKeywords *[]any `json:"countryKeywords,omitempty"`
	Name *string `json:"name,omitempty"`
	SupportsDecimals *bool `json:"supportsDecimals,omitempty"`
	Symbol *string `json:"symbol,omitempty"`
}

// DeliveryEstimate is the typed data model for the delivery_estimate entity.
type DeliveryEstimate struct {
}

// DeliveryEstimateLoadMatch is the typed request payload for DeliveryEstimate.LoadTyped.
type DeliveryEstimateLoadMatch struct {
	Id int `json:"id"`
	Timezone *string `json:"timezone,omitempty"`
}

// DeliveryUpdate is the typed data model for the delivery_update entity.
type DeliveryUpdate struct {
}

// DeliveryUpdateCreateData is the typed request payload for DeliveryUpdate.CreateTyped.
type DeliveryUpdateCreateData struct {
	TransferId int `json:"transfer_id"`
	DeliveryUpdate string `json:"delivery_update"`
	DeliveryUpdatePath []any `json:"delivery_update_path"`
	EstimatedDeliveryAt *any `json:"estimated_delivery_at,omitempty"`
	Scheme *any `json:"scheme,omitempty"`
}

// DigitalWallet is the typed data model for the digital_wallet entity.
type DigitalWallet struct {
}

// DigitalWalletCreateData is the typed request payload for DigitalWallet.CreateTyped.
type DigitalWalletCreateData struct {
	CardToken string `json:"card_token"`
	PaymentTokenUniqueReference *string `json:"payment_token_unique_reference,omitempty"`
	ProfileId int `json:"profile_id"`
	Activation string `json:"activation"`
	WalletNames *[]any `json:"walletNames,omitempty"`
}

// DirectDebitAccount is the typed data model for the direct_debit_account entity.
type DirectDebitAccount struct {
}

// DirectDebitAccountListMatch is the typed request payload for DirectDebitAccount.ListTyped.
type DirectDebitAccountListMatch struct {
	ProfileId int `json:"profile_id"`
	Currency string `json:"currency"`
	Type string `json:"type"`
}

// DirectDebitAccountCreateData is the typed request payload for DirectDebitAccount.CreateTyped.
type DirectDebitAccountCreateData struct {
	ProfileId int `json:"profile_id"`
	Currency *string `json:"currency,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Director is the typed data model for the director entity.
type Director struct {
}

// DirectorListMatch is the typed request payload for Director.ListTyped.
type DirectorListMatch struct {
	ProfileId int `json:"profile_id"`
}

// DirectorCreateData is the typed request payload for Director.CreateTyped.
type DirectorCreateData struct {
	ProfileId int `json:"profile_id"`
	Directors *[]any `json:"directors,omitempty"`
}

// DirectorUpdateData is the typed request payload for Director.UpdateTyped.
type DirectorUpdateData struct {
	ProfileId int `json:"profile_id"`
	Directors *[]any `json:"directors,omitempty"`
}

// DirectorRemoveMatch is the typed request payload for Director.RemoveTyped.
type DirectorRemoveMatch struct {
	ProfileId int `json:"profile_id"`
}

// Dispute is the typed data model for the dispute entity.
type Dispute struct {
}

// DisputeLoadMatch is the typed request payload for Dispute.LoadTyped.
type DisputeLoadMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// DisputeListMatch is the typed request payload for Dispute.ListTyped.
type DisputeListMatch struct {
	ProfileId int `json:"profile_id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Status *string `json:"status,omitempty"`
	TransactionId *int `json:"transaction_id,omitempty"`
}

// DisputeCreateData is the typed request payload for Dispute.CreateTyped.
type DisputeCreateData struct {
	ProfileId int `json:"profile_id"`
	Reason *string `json:"reason,omitempty"`
	Scheme *string `json:"scheme,omitempty"`
	CanWithdraw *bool `json:"canWithdraw,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CreatedBy *string `json:"createdBy,omitempty"`
	Disclaimer *map[string]any `json:"disclaimer,omitempty"`
	Files *map[string]any `json:"files,omitempty"`
	Form *map[string]any `json:"form,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdatedAt *string `json:"lastUpdatedAt,omitempty"`
	ProfileId2 *int `json:"profileId,omitempty"`
	Receipt *string `json:"receipt,omitempty"`
	Status *string `json:"status,omitempty"`
	StatusMessage *string `json:"statusMessage,omitempty"`
	SubStatus *string `json:"subStatus,omitempty"`
	Transaction *map[string]any `json:"transaction,omitempty"`
	TransactionId *int `json:"transactionId,omitempty"`
}

// DisputeUpdateData is the typed request payload for Dispute.UpdateTyped.
type DisputeUpdateData struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
	Status *string `json:"status,omitempty"`
}

// DisputeReason is the typed data model for the dispute_reason entity.
type DisputeReason struct {
}

// DisputeReasonListMatch is the typed request payload for DisputeReason.ListTyped.
type DisputeReasonListMatch struct {
	ProfileId int `json:"profile_id"`
}

// Facetec is the typed data model for the facetec entity.
type Facetec struct {
}

// FacetecLoadMatch is the typed request payload for Facetec.LoadTyped.
type FacetecLoadMatch struct {
}

// File is the typed data model for the file entity.
type File struct {
}

// FileListMatch is the typed request payload for File.ListTyped.
type FileListMatch struct {
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	ProfileId *int `json:"profile_id,omitempty"`
}

// FileCreateData is the typed request payload for File.CreateTyped.
type FileCreateData struct {
	CreatedAt string `json:"createdAt"`
	File string `json:"file"`
	FileId string `json:"fileId"`
	FileName string `json:"fileName"`
	ProfileId int `json:"profileId"`
	Purpose string `json:"purpose"`
	SubmissionData map[string]any `json:"submissionData"`
}

// Funding is the typed data model for the funding entity.
type Funding struct {
}

// FundingCreateData is the typed request payload for Funding.CreateTyped.
type FundingCreateData struct {
	ProfileId int `json:"profile_id"`
	TransferId int `json:"transfer_id"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	BalanceId *any `json:"balanceId,omitempty"`
	PartnerReference *any `json:"partnerReference,omitempty"`
}

// GpiTracking is the typed data model for the gpi_tracking entity.
type GpiTracking struct {
}

// GpiTrackingCreateData is the typed request payload for GpiTracking.CreateTyped.
type GpiTrackingCreateData struct {
	Identifier string `json:"identifier"`
	IdentifierType string `json:"identifierType"`
}

// HoldLimitBreach is the typed data model for the hold_limit_breach entity.
type HoldLimitBreach struct {
}

// HoldLimitBreachListMatch is the typed request payload for HoldLimitBreach.ListTyped.
type HoldLimitBreachListMatch struct {
	ProfileId int `json:"profile_id"`
	ClosingReason *string `json:"closing_reason,omitempty"`
	State *string `json:"state,omitempty"`
}

// IncomingTransfer is the typed data model for the incoming_transfer entity.
type IncomingTransfer struct {
}

// IncomingTransferLoadMatch is the typed request payload for IncomingTransfer.LoadTyped.
type IncomingTransferLoadMatch struct {
	Id string `json:"id"`
}

// Jose is the typed data model for the jose entity.
type Jose struct {
}

// JoseLoadMatch is the typed request payload for Jose.LoadTyped.
type JoseLoadMatch struct {
	Algorithm string `json:"algorithm"`
	Scope string `json:"scope"`
	Version *int `json:"version,omitempty"`
}

// JoseCreateData is the typed request payload for Jose.CreateTyped.
type JoseCreateData struct {
	KeyId *string `json:"keyId,omitempty"`
	PublicKeyMaterial *map[string]any `json:"publicKeyMaterial,omitempty"`
	Scope *string `json:"scope,omitempty"`
	ValidFrom *string `json:"validFrom,omitempty"`
	ValidTill *string `json:"validTill,omitempty"`
}

// KycReview is the typed data model for the kyc_review entity.
type KycReview struct {
}

// KycReviewLoadMatch is the typed request payload for KycReview.LoadTyped.
type KycReviewLoadMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// KycReviewListMatch is the typed request payload for KycReview.ListTyped.
type KycReviewListMatch struct {
	ProfileId int `json:"profile_id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// KycReviewCreateData is the typed request payload for KycReview.CreateTyped.
type KycReviewCreateData struct {
	ProfileId int `json:"profile_id"`
	RequirementKey *string `json:"requirement_key,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Id *string `json:"id,omitempty"`
	Link *any `json:"link,omitempty"`
	RedirectUrl *any `json:"redirectUrl,omitempty"`
	RequiredBy *any `json:"requiredBy,omitempty"`
	Requirements *any `json:"requirements,omitempty"`
	Status *string `json:"status,omitempty"`
	TriggerData *map[string]any `json:"triggerData,omitempty"`
	TriggerReferences *[]any `json:"triggerReferences,omitempty"`
	Type string `json:"type"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// KycReviewUpdateData is the typed request payload for KycReview.UpdateTyped.
type KycReviewUpdateData struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
	RedirectUrl *any `json:"redirectUrl,omitempty"`
}

// LinkRequest is the typed data model for the link_request entity.
type LinkRequest struct {
}

// LinkRequestLoadMatch is the typed request payload for LinkRequest.LoadTyped.
type LinkRequestLoadMatch struct {
	Id string `json:"id"`
}

// LinkRequestCreateData is the typed request payload for LinkRequest.CreateTyped.
type LinkRequestCreateData struct {
	ProfileId int `json:"profile_id"`
	Email string `json:"email"`
	RedirectUrl string `json:"redirectUrl"`
	TransactionId int `json:"transactionId"`
}

// Message is the typed data model for the message entity.
type Message struct {
}

// MessageCreateData is the typed request payload for Message.CreateTyped.
type MessageCreateData struct {
	CaseId int `json:"case_id"`
	SubmissionData map[string]any `json:"submissionData"`
	Type string `json:"type"`
}

// MultiCurrencyAccount is the typed data model for the multi_currency_account entity.
type MultiCurrencyAccount struct {
}

// MultiCurrencyAccountLoadMatch is the typed request payload for MultiCurrencyAccount.LoadTyped.
type MultiCurrencyAccountLoadMatch struct {
	Country *string `json:"country,omitempty"`
	ProfileId *int `json:"profile_id,omitempty"`
	State *string `json:"state,omitempty"`
}

// MultiCurrencyAccountListMatch is the typed request payload for MultiCurrencyAccount.ListTyped.
type MultiCurrencyAccountListMatch struct {
	ProfileId int `json:"profile_id"`
}

// OneTimeToken is the typed data model for the one_time_token entity.
type OneTimeToken struct {
}

// OneTimeTokenCreateData is the typed request payload for OneTimeToken.CreateTyped.
type OneTimeTokenCreateData struct {
	ProfileId int `json:"profile_id"`
	FaceMap *string `json:"faceMap,omitempty"`
}

// Ott is the typed data model for the ott entity.
type Ott struct {
}

// OttLoadMatch is the typed request payload for Ott.LoadTyped.
type OttLoadMatch struct {
	ActionType *string `json:"actionType,omitempty"`
	Challenges *[]any `json:"challenges,omitempty"`
	OneTimeToken *string `json:"oneTimeToken,omitempty"`
	UserId *int `json:"userId,omitempty"`
	Validity *int `json:"validity,omitempty"`
}

// OttCreateData is the typed request payload for Ott.CreateTyped.
type OttCreateData struct {
	OtpCode *any `json:"otpCode,omitempty"`
}

// Payin is the typed data model for the payin entity.
type Payin struct {
}

// PayinCreateData is the typed request payload for Payin.CreateTyped.
type PayinCreateData struct {
	PayinSessionId *string `json:"payin_session_id,omitempty"`
	ProfileId int `json:"profile_id"`
	PaymentInstrumentId *string `json:"payment_instrument_id,omitempty"`
	Amount *float64 `json:"amount,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	FailureReason *string `json:"failureReason,omitempty"`
	Id *string `json:"id,omitempty"`
	PayinSessionId2 string `json:"payinSessionId"`
	PaymentInstrumentId2 *string `json:"paymentInstrumentId,omitempty"`
	QrCodeInBase64 *string `json:"qrCodeInBase64,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Status *string `json:"status,omitempty"`
}

// PayinDepositDetail is the typed data model for the payin_deposit_detail entity.
type PayinDepositDetail struct {
}

// PayinDepositDetailLoadMatch is the typed request payload for PayinDepositDetail.LoadTyped.
type PayinDepositDetailLoadMatch struct {
	ProfileId int `json:"profile_id"`
	TransferId int `json:"transfer_id"`
}

// Payment is the typed data model for the payment entity.
type Payment struct {
}

// PaymentListMatch is the typed request payload for Payment.ListTyped.
type PaymentListMatch struct {
	TransferId int `json:"transfer_id"`
}

// PaymentInitiation is the typed data model for the payment_initiation entity.
type PaymentInitiation struct {
}

// PaymentInitiationLoadMatch is the typed request payload for PaymentInitiation.LoadTyped.
type PaymentInitiationLoadMatch struct {
	BatchGroupId string `json:"batch_group_id"`
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
}

// PaymentInitiationCreateData is the typed request payload for PaymentInitiation.CreateTyped.
type PaymentInitiationCreateData struct {
	BatchGroupId string `json:"batch_group_id"`
	ProfileId int `json:"profile_id"`
	AccountId *any `json:"accountId,omitempty"`
	Reference *any `json:"reference,omitempty"`
	Type *any `json:"type,omitempty"`
}

// PaymentInstrument is the typed data model for the payment_instrument entity.
type PaymentInstrument struct {
}

// PaymentInstrumentLoadMatch is the typed request payload for PaymentInstrument.LoadTyped.
type PaymentInstrumentLoadMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// PaymentInstrumentListMatch is the typed request payload for PaymentInstrument.ListTyped.
type PaymentInstrumentListMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// PaymentInstrumentCreateData is the typed request payload for PaymentInstrument.CreateTyped.
type PaymentInstrumentCreateData struct {
	ProfileId int `json:"profile_id"`
	AccountHolderName *string `json:"accountHolderName,omitempty"`
	AccountNumber string `json:"accountNumber"`
	AccountOwnerDetails *map[string]any `json:"accountOwnerDetails,omitempty"`
	AccountType *string `json:"accountType,omitempty"`
	BankCode *string `json:"bankCode,omitempty"`
	BranchCode *string `json:"branchCode,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Type string `json:"type"`
}

// PaymentIntent is the typed data model for the payment_intent entity.
type PaymentIntent struct {
}

// PaymentIntentLoadMatch is the typed request payload for PaymentIntent.LoadTyped.
type PaymentIntentLoadMatch struct {
	AllocationId string `json:"allocation_id"`
	Id string `json:"id"`
}

// PhoneNumber is the typed data model for the phone_number entity.
type PhoneNumber struct {
}

// PhoneNumberCreateData is the typed request payload for PhoneNumber.CreateTyped.
type PhoneNumberCreateData struct {
	UserId int `json:"user_id"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
}

// Production is the typed data model for the production entity.
type Production struct {
}

// ProductionLoadMatch is the typed request payload for Production.LoadTyped.
type ProductionLoadMatch struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
}

// ProductionUpdateData is the typed request payload for Production.UpdateTyped.
type ProductionUpdateData struct {
	CardToken string `json:"card_token"`
	ProfileId int `json:"profile_id"`
	KioskId *any `json:"kioskId,omitempty"`
}

// Profile is the typed data model for the profile entity.
type Profile struct {
}

// ProfileLoadMatch is the typed request payload for Profile.LoadTyped.
type ProfileLoadMatch struct {
	Id int `json:"id"`
}

// ProfileListMatch is the typed request payload for Profile.ListTyped.
type ProfileListMatch struct {
	Address *map[string]any `json:"address,omitempty"`
	Avatar *string `json:"avatar,omitempty"`
	ContactDetails *map[string]any `json:"contactDetails,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CurrentState *string `json:"currentState,omitempty"`
	DateOfBirth *string `json:"dateOfBirth,omitempty"`
	Email *string `json:"email,omitempty"`
	FirstName *string `json:"firstName,omitempty"`
	FullName *string `json:"fullName,omitempty"`
	Id *int `json:"id,omitempty"`
	LastName *string `json:"lastName,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	PreferredName *string `json:"preferredName,omitempty"`
	PublicId *string `json:"publicId,omitempty"`
	SecondaryAddresses *[]any `json:"secondaryAddresses,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	UserId *int `json:"userId,omitempty"`
}

// ProfileCreateData is the typed request payload for Profile.CreateTyped.
type ProfileCreateData struct {
	Address *map[string]any `json:"address,omitempty"`
	Avatar *string `json:"avatar,omitempty"`
	ContactDetails *map[string]any `json:"contactDetails,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	CurrentState *string `json:"currentState,omitempty"`
	DateOfBirth *string `json:"dateOfBirth,omitempty"`
	Email *string `json:"email,omitempty"`
	FirstName *string `json:"firstName,omitempty"`
	FullName *string `json:"fullName,omitempty"`
	Id *int `json:"id,omitempty"`
	LastName *string `json:"lastName,omitempty"`
	PhoneNumber *string `json:"phoneNumber,omitempty"`
	PreferredName *string `json:"preferredName,omitempty"`
	PublicId *string `json:"publicId,omitempty"`
	SecondaryAddresses *[]any `json:"secondaryAddresses,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	UserId *int `json:"userId,omitempty"`
	BirthCity *any `json:"birthCity,omitempty"`
	BirthCountry *any `json:"birthCountry,omitempty"`
	EmployerCity *any `json:"employerCity,omitempty"`
	EmployerCountry *any `json:"employerCountry,omitempty"`
	EmployerName *any `json:"employerName,omitempty"`
	ExpiryDate *any `json:"expiryDate,omitempty"`
	ExternalCustomerId *any `json:"externalCustomerId,omitempty"`
	FirstNameInKana *any `json:"firstNameInKana,omitempty"`
	IssueDate *any `json:"issueDate,omitempty"`
	IssuerCountry *any `json:"issuerCountry,omitempty"`
	IssuerState *any `json:"issuerState,omitempty"`
	LastNameInKana *any `json:"lastNameInKana,omitempty"`
	Nationality *any `json:"nationality,omitempty"`
	Occupations *any `json:"occupations,omitempty"`
	RecipientId *any `json:"recipientId,omitempty"`
	UniqueIdentifier *any `json:"uniqueIdentifier,omitempty"`
}

// ProfileUpdateData is the typed request payload for Profile.UpdateTyped.
type ProfileUpdateData struct {
	Id int `json:"id"`
	Address *map[string]any `json:"address,omitempty"`
	ContactDetails *map[string]any `json:"contactDetails,omitempty"`
	DateOfBirth *string `json:"dateOfBirth,omitempty"`
	FirstName *string `json:"firstName,omitempty"`
	LastName *string `json:"lastName,omitempty"`
	PreferredName *string `json:"preferredName,omitempty"`
	Type *string `json:"type,omitempty"`
	ActorEmail *any `json:"actorEmail,omitempty"`
	ClientId *any `json:"clientId,omitempty"`
	ExpiryDate *any `json:"expiryDate,omitempty"`
	ExternalCustomerId *any `json:"externalCustomerId,omitempty"`
	FirstNameInKana *any `json:"firstNameInKana,omitempty"`
	IssueDate *any `json:"issueDate,omitempty"`
	IssuerCountry *any `json:"issuerCountry,omitempty"`
	IssuerState *any `json:"issuerState,omitempty"`
	LastNameInKana *any `json:"lastNameInKana,omitempty"`
	LocalizedInformation *any `json:"localizedInformation,omitempty"`
	Nationality *any `json:"nationality,omitempty"`
	Occupations *any `json:"occupations,omitempty"`
	PlaceOfBirth *any `json:"placeOfBirth,omitempty"`
	Sex *any `json:"sex,omitempty"`
	UniqueIdentifier *any `json:"uniqueIdentifier,omitempty"`
	UpdateContext *any `json:"updateContext,omitempty"`
}

// ProfileRemoveMatch is the typed request payload for Profile.RemoveTyped.
type ProfileRemoveMatch struct {
	Id int `json:"id"`
}

// Quote is the typed data model for the quote entity.
type Quote struct {
}

// QuoteLoadMatch is the typed request payload for Quote.LoadTyped.
type QuoteLoadMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// QuoteCreateData is the typed request payload for Quote.CreateTyped.
type QuoteCreateData struct {
	CreationContext *map[string]any `json:"creationContext,omitempty"`
	PayOut *string `json:"payOut,omitempty"`
	PaymentMetadata *map[string]any `json:"paymentMetadata,omitempty"`
	PreferredPayIn *string `json:"preferredPayIn,omitempty"`
	PricingConfiguration *map[string]any `json:"pricingConfiguration,omitempty"`
	SourceAmount *float64 `json:"sourceAmount,omitempty"`
	SourceCurrency string `json:"sourceCurrency"`
	TargetAccount *int `json:"targetAccount,omitempty"`
	TargetAmount *float64 `json:"targetAmount,omitempty"`
	TargetCurrency string `json:"targetCurrency"`
}

// QuoteUpdateData is the typed request payload for Quote.UpdateTyped.
type QuoteUpdateData struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
	PayOut *string `json:"payOut,omitempty"`
	PaymentMetadata *map[string]any `json:"paymentMetadata,omitempty"`
	PricingConfiguration *map[string]any `json:"pricingConfiguration,omitempty"`
	TargetAccount *int `json:"targetAccount,omitempty"`
}

// Rate is the typed data model for the rate entity.
type Rate struct {
}

// RateListMatch is the typed request payload for Rate.ListTyped.
type RateListMatch struct {
	From *string `json:"from,omitempty"`
	Group *string `json:"group,omitempty"`
	Source *string `json:"source,omitempty"`
	Target *string `json:"target,omitempty"`
	Time *string `json:"time,omitempty"`
	To *string `json:"to,omitempty"`
}

// Recipient is the typed data model for the recipient entity.
type Recipient struct {
}

// RecipientLoadMatch is the typed request payload for Recipient.LoadTyped.
type RecipientLoadMatch struct {
	AccountId int `json:"account_id"`
}

// RecipientListMatch is the typed request payload for Recipient.ListTyped.
type RecipientListMatch struct {
	Active *bool `json:"active,omitempty"`
	CreatorId *int `json:"creator_id,omitempty"`
	Currency *string `json:"currency,omitempty"`
	OwnedByCustomer *bool `json:"owned_by_customer,omitempty"`
	Profile *int `json:"profile,omitempty"`
	ProfileId *int `json:"profile_id,omitempty"`
	SeekPosition *any `json:"seek_position,omitempty"`
	Size *int `json:"size,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Type *string `json:"type,omitempty"`
}

// RecipientCreateData is the typed request payload for Recipient.CreateTyped.
type RecipientCreateData struct {
	Refund *bool `json:"refund,omitempty"`
	AcceptedOutcomes bool `json:"acceptedOutcomes"`
	AccountHolderName *string `json:"accountHolderName,omitempty"`
	AccountId *int `json:"accountId,omitempty"`
	AccountSummary *string `json:"accountSummary,omitempty"`
	Active *bool `json:"active,omitempty"`
	CommonFieldMap *map[string]any `json:"commonFieldMap,omitempty"`
	Confirmations *map[string]any `json:"confirmations,omitempty"`
	Country *string `json:"country,omitempty"`
	CreatorId *int `json:"creatorId,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	DisplayFields *[]any `json:"displayFields,omitempty"`
	Hash *string `json:"hash,omitempty"`
	Id *int `json:"id,omitempty"`
	IsInternal *bool `json:"isInternal,omitempty"`
	LegalEntityType *string `json:"legalEntityType,omitempty"`
	LongAccountSummary *string `json:"longAccountSummary,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	OwnedByCustomer *bool `json:"ownedByCustomer,omitempty"`
	Profile *int `json:"profile,omitempty"`
	ProfileId *int `json:"profileId,omitempty"`
	QuoteId *string `json:"quoteId,omitempty"`
	Type *string `json:"type,omitempty"`
	UltimateBeneficiary any `json:"ultimateBeneficiary"`
}

// RecipientUpdateData is the typed request payload for Recipient.UpdateTyped.
type RecipientUpdateData struct {
	AccountId int `json:"account_id"`
	QuoteId *string `json:"quote_id,omitempty"`
	AcceptedOutcomes *bool `json:"acceptedOutcomes,omitempty"`
}

// RecipientRemoveMatch is the typed request payload for Recipient.RemoveTyped.
type RecipientRemoveMatch struct {
	AccountId int `json:"account_id"`
}

// Rule is the typed data model for the rule entity.
type Rule struct {
}

// RuleListMatch is the typed request payload for Rule.ListTyped.
type RuleListMatch struct {
	ApplicationId string `json:"application_id"`
}

// RuleCreateData is the typed request payload for Rule.CreateTyped.
type RuleCreateData struct {
	ApplicationId string `json:"application_id"`
	Description *string `json:"description,omitempty"`
	Operation *string `json:"operation,omitempty"`
	Type *string `json:"type,omitempty"`
	Values *[]any `json:"values,omitempty"`
}

// Saml is the typed data model for the saml entity.
type Saml struct {
}

// SamlLoadMatch is the typed request payload for Saml.LoadTyped.
type SamlLoadMatch struct {
	RegistrationId string `json:"registration_id"`
}

// SamlCreateData is the typed request payload for Saml.CreateTyped.
type SamlCreateData struct {
	RelayState *string `json:"RelayState,omitempty"`
	SAMLResponse string `json:"SAMLResponse"`
}

// ScaDeviceFingerprint is the typed data model for the sca_device_fingerprint entity.
type ScaDeviceFingerprint struct {
}

// ScaDeviceFingerprintCreateData is the typed request payload for ScaDeviceFingerprint.CreateTyped.
type ScaDeviceFingerprintCreateData struct {
	ProfileId int `json:"profile_id"`
}

// ScaDeviceFingerprintRemoveMatch is the typed request payload for ScaDeviceFingerprint.RemoveTyped.
type ScaDeviceFingerprintRemoveMatch struct {
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// ScaFacemap is the typed data model for the sca_facemap entity.
type ScaFacemap struct {
}

// ScaFacemapCreateData is the typed request payload for ScaFacemap.CreateTyped.
type ScaFacemapCreateData struct {
	ProfileId int `json:"profile_id"`
	FaceMap *string `json:"faceMap,omitempty"`
}

// ScaFacemapRemoveMatch is the typed request payload for ScaFacemap.RemoveTyped.
type ScaFacemapRemoveMatch struct {
	ProfileId int `json:"profile_id"`
}

// ScaOtp is the typed data model for the sca_otp entity.
type ScaOtp struct {
}

// ScaOtpCreateData is the typed request payload for ScaOtp.CreateTyped.
type ScaOtpCreateData struct {
}

// ScaOtpRemoveMatch is the typed request payload for ScaOtp.RemoveTyped.
type ScaOtpRemoveMatch struct {
	PhoneNumberId int `json:"phone_number_id"`
	UserId int `json:"user_id"`
}

// ScaSession is the typed data model for the sca_session entity.
type ScaSession struct {
}

// ScaSessionCreateData is the typed request payload for ScaSession.CreateTyped.
type ScaSessionCreateData struct {
	ProfileId int `json:"profile_id"`
}

// SettlementAllocation is the typed data model for the settlement_allocation entity.
type SettlementAllocation struct {
}

// SettlementAllocationLoadMatch is the typed request payload for SettlementAllocation.LoadTyped.
type SettlementAllocationLoadMatch struct {
	Id string `json:"id"`
	IncludePaymentIntent *bool `json:"include_payment_intent,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	PageToken *string `json:"page_token,omitempty"`
}

// SettlementAllocationCreateData is the typed request payload for SettlementAllocation.CreateTyped.
type SettlementAllocationCreateData struct {
	Command map[string]any `json:"command"`
	CreatedAt string `json:"createdAt"`
	Currency string `json:"currency"`
	ExpectedTotalAmount float64 `json:"expectedTotalAmount"`
	File string `json:"file"`
	Id string `json:"id"`
	NextPageToken *string `json:"nextPageToken,omitempty"`
	PaymentIntents *[]any `json:"paymentIntents,omitempty"`
	PaymentReference string `json:"paymentReference"`
	State string `json:"state"`
	UpdatedAt string `json:"updatedAt"`
}

// Simulation is the typed data model for the simulation entity.
type Simulation struct {
}

// SimulationLoadMatch is the typed request payload for Simulation.LoadTyped.
type SimulationLoadMatch struct {
	Status string `json:"status"`
	TransferId int `json:"transfer_id"`
}

// SimulationListMatch is the typed request payload for Simulation.ListTyped.
type SimulationListMatch struct {
	CardToken *string `json:"card_token,omitempty"`
	ProfileId int `json:"profile_id"`
	Limit *int `json:"limit,omitempty"`
	KycReviewId *string `json:"kyc_review_id,omitempty"`
}

// SimulationCreateData is the typed request payload for Simulation.CreateTyped.
type SimulationCreateData struct {
	TransferId int `json:"transfer_id"`
	FailureReasonCode *string `json:"failure_reason_code,omitempty"`
}

// SpendControl is the typed data model for the spend_control entity.
type SpendControl struct {
}

// SpendControlListMatch is the typed request payload for SpendControl.ListTyped.
type SpendControlListMatch struct {
	ApplicationId string `json:"application_id"`
}

// SpendControlCreateData is the typed request payload for SpendControl.CreateTyped.
type SpendControlCreateData struct {
	ApplicationId string `json:"application_id"`
	RuleId *int `json:"ruleId,omitempty"`
}

// SpendControlRemoveMatch is the typed request payload for SpendControl.RemoveTyped.
type SpendControlRemoveMatch struct {
	ApplicationId string `json:"application_id"`
	RuleId int `json:"rule_id"`
}

// SpendLimit is the typed data model for the spend_limit entity.
type SpendLimit struct {
}

// SpendLimitListMatch is the typed request payload for SpendLimit.ListTyped.
type SpendLimitListMatch struct {
	ProfileId int `json:"profile_id"`
}

// SpendLimitUpdateData is the typed request payload for SpendLimit.UpdateTyped.
type SpendLimitUpdateData struct {
	ProfileId int `json:"profile_id"`
	AggregateWindow *map[string]any `json:"aggregateWindow,omitempty"`
	Type *string `json:"type,omitempty"`
}

// SpendLimitRemoveMatch is the typed request payload for SpendLimit.RemoveTyped.
type SpendLimitRemoveMatch struct {
	CardId string `json:"card_id"`
	Id string `json:"id"`
	ProfileId int `json:"profile_id"`
}

// Subscription is the typed data model for the subscription entity.
type Subscription struct {
}

// SubscriptionLoadMatch is the typed request payload for Subscription.LoadTyped.
type SubscriptionLoadMatch struct {
	ClientKey *string `json:"client_key,omitempty"`
	Id string `json:"id"`
	ProfileId *int `json:"profile_id,omitempty"`
}

// SubscriptionListMatch is the typed request payload for Subscription.ListTyped.
type SubscriptionListMatch struct {
	ClientKey string `json:"client_key"`
}

// SubscriptionCreateData is the typed request payload for Subscription.CreateTyped.
type SubscriptionCreateData struct {
	ClientKey string `json:"client_key"`
	Delivery map[string]any `json:"delivery"`
	Name string `json:"name"`
	TriggerOn string `json:"trigger_on"`
}

// SubscriptionRemoveMatch is the typed request payload for Subscription.RemoveTyped.
type SubscriptionRemoveMatch struct {
	ClientKey *string `json:"client_key,omitempty"`
	Id string `json:"id"`
	ProfileId *int `json:"profile_id,omitempty"`
}

// TestNotification is the typed data model for the test_notification entity.
type TestNotification struct {
}

// TestNotificationCreateData is the typed request payload for TestNotification.CreateTyped.
type TestNotificationCreateData struct {
	ClientKey string `json:"client_key"`
	SubscriptionId string `json:"subscription_id"`
	CreatedAt *string `json:"created_at,omitempty"`
	DeliveryId *string `json:"delivery_id,omitempty"`
}

// ThirdPartyTransfer is the typed data model for the third_party_transfer entity.
type ThirdPartyTransfer struct {
}

// ThirdPartyTransferLoadMatch is the typed request payload for ThirdPartyTransfer.LoadTyped.
type ThirdPartyTransferLoadMatch struct {
	Id int `json:"id"`
	ProfileId int `json:"profile_id"`
}

// ThirdPartyTransferCreateData is the typed request payload for ThirdPartyTransfer.CreateTyped.
type ThirdPartyTransferCreateData struct {
	ProfileId int `json:"profile_id"`
	Details map[string]any `json:"details"`
	OriginalTransferId string `json:"originalTransferId"`
	Originator map[string]any `json:"originator"`
	Quote string `json:"quote"`
	SourceAccount *int `json:"sourceAccount,omitempty"`
	TargetAccount int `json:"targetAccount"`
}

// ThreeDSecure is the typed data model for the three_d_secure entity.
type ThreeDSecure struct {
}

// ThreeDSecureCreateData is the typed request payload for ThreeDSecure.CreateTyped.
type ThreeDSecureCreateData struct {
	ProfileId int `json:"profile_id"`
	ChallengeStatus string `json:"challengeStatus"`
	TransactionReference string `json:"transactionReference"`
}

// Token is the typed data model for the token entity.
type Token struct {
}

// TokenCreateData is the typed request payload for Token.CreateTyped.
type TokenCreateData struct {
	AccessToken *string `json:"access_token,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	RefreshTokenExpiresAt *string `json:"refresh_token_expires_at,omitempty"`
	RefreshTokenExpiresIn *int `json:"refresh_token_expires_in,omitempty"`
	Scope *string `json:"scope,omitempty"`
	TokenType *string `json:"token_type,omitempty"`
}

// Transfer is the typed data model for the transfer entity.
type Transfer struct {
}

// TransferLoadMatch is the typed request payload for Transfer.LoadTyped.
type TransferLoadMatch struct {
	Id int `json:"id"`
}

// TransferListMatch is the typed request payload for Transfer.ListTyped.
type TransferListMatch struct {
	CreatedDateEnd *string `json:"created_date_end,omitempty"`
	CreatedDateStart *string `json:"created_date_start,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Profile *int `json:"profile,omitempty"`
	SourceCurrency *string `json:"source_currency,omitempty"`
	Status *string `json:"status,omitempty"`
	TargetCurrency *string `json:"target_currency,omitempty"`
}

// TransferCreateData is the typed request payload for Transfer.CreateTyped.
type TransferCreateData struct {
	CustomerTransactionId string `json:"customerTransactionId"`
	Details *map[string]any `json:"details,omitempty"`
	QuoteUuid string `json:"quoteUuid"`
	SourceAccount *any `json:"sourceAccount,omitempty"`
	TargetAccount int `json:"targetAccount"`
}

// TransferUpdateData is the typed request payload for Transfer.UpdateTyped.
type TransferUpdateData struct {
	Id int `json:"id"`
	Business *any `json:"business,omitempty"`
	Created *string `json:"created,omitempty"`
	CustomerTransactionId *string `json:"customerTransactionId,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	HasActiveIssues *bool `json:"hasActiveIssues,omitempty"`
	PayinSessionId *string `json:"payinSessionId,omitempty"`
	Quote *any `json:"quote,omitempty"`
	QuoteUuid *string `json:"quoteUuid,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
	Reference *string `json:"reference,omitempty"`
	SourceAccount *any `json:"sourceAccount,omitempty"`
	SourceCurrency *string `json:"sourceCurrency,omitempty"`
	SourceValue *float64 `json:"sourceValue,omitempty"`
	Status *string `json:"status,omitempty"`
	TargetAccount *int `json:"targetAccount,omitempty"`
	TargetCurrency *string `json:"targetCurrency,omitempty"`
	TargetValue *float64 `json:"targetValue,omitempty"`
	TransferRequest *any `json:"transferRequest,omitempty"`
	User *int `json:"user,omitempty"`
}

// TransferRequirement is the typed data model for the transfer_requirement entity.
type TransferRequirement struct {
}

// TransferRequirementCreateData is the typed request payload for TransferRequirement.CreateTyped.
type TransferRequirementCreateData struct {
	CustomerTransactionId *string `json:"customerTransactionId,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	OriginatorLegalEntityType *string `json:"originatorLegalEntityType,omitempty"`
	QuoteUuid string `json:"quoteUuid"`
	TargetAccount int `json:"targetAccount"`
}

// Ubo is the typed data model for the ubo entity.
type Ubo struct {
}

// UboListMatch is the typed request payload for Ubo.ListTyped.
type UboListMatch struct {
	ProfileId int `json:"profile_id"`
}

// UboCreateData is the typed request payload for Ubo.CreateTyped.
type UboCreateData struct {
	ProfileId int `json:"profile_id"`
	Ubos *[]any `json:"ubos,omitempty"`
}

// UboUpdateData is the typed request payload for Ubo.UpdateTyped.
type UboUpdateData struct {
	ProfileId int `json:"profile_id"`
	Ubos *[]any `json:"ubos,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id int `json:"id"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	Email string `json:"email"`
	Language *string `json:"language,omitempty"`
	RegistrationCode string `json:"registrationCode"`
}

// UserUpdateData is the typed request payload for User.UpdateTyped.
type UserUpdateData struct {
	Id int `json:"id"`
	Email *string `json:"email,omitempty"`
}

// Verification is the typed data model for the verification entity.
type Verification struct {
}

// VerificationListMatch is the typed request payload for Verification.ListTyped.
type VerificationListMatch struct {
	ProfileId int `json:"profile_id"`
}

// VerificationCreateData is the typed request payload for Verification.CreateTyped.
type VerificationCreateData struct {
	ProfileId int `json:"profile_id"`
	AccountPurpose *any `json:"accountPurpose,omitempty"`
	AccountPurposeExplanation *any `json:"accountPurposeExplanation,omitempty"`
	AnnualIncome *any `json:"annualIncome,omitempty"`
	BusinessUseCase *any `json:"businessUseCase,omitempty"`
	IncomeExplanation *any `json:"incomeExplanation,omitempty"`
	IntendedCountries *any `json:"intendedCountries,omitempty"`
	MainSourceOfFunding *any `json:"mainSourceOfFunding,omitempty"`
	MainSourceOfIncome *any `json:"mainSourceOfIncome,omitempty"`
	MonthlyAnticipatedVolume *any `json:"monthlyAnticipatedVolume,omitempty"`
	YearlyAnticipatedVolume *any `json:"yearlyAnticipatedVolume,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
