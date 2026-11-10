package voxgigwisesdk

import (
	"github.com/voxgig-sdk/wise-sdk/go/core"
	"github.com/voxgig-sdk/wise-sdk/go/entity"
	"github.com/voxgig-sdk/wise-sdk/go/feature"
	_ "github.com/voxgig-sdk/wise-sdk/go/utility"
)

// Type aliases preserve external API.
type WiseSDK = core.WiseSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WiseEntityBase = core.WiseEntityBase

// Deprecated: use WiseEntityBase.
type WiseEntity = core.WiseEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WiseError = core.WiseError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewSecretsFeatureFunc = func() core.Feature {
		return feature.NewSecretsFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAccountDetailEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewAccountDetailEntity(client, entopts)
	}
	core.NewAccountRequirementEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewAccountRequirementEntity(client, entopts)
	}
	core.NewActivityEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewActivityEntity(client, entopts)
	}
	core.NewAddressEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewAddressEntity(client, entopts)
	}
	core.NewAddressRequirementEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewAddressRequirementEntity(client, entopts)
	}
	core.NewBalanceEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBalanceEntity(client, entopts)
	}
	core.NewBalanceStatementEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBalanceStatementEntity(client, entopts)
	}
	core.NewBankAccountDetailEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBankAccountDetailEntity(client, entopts)
	}
	core.NewBankAccountDetailsOrderEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBankAccountDetailsOrderEntity(client, entopts)
	}
	core.NewBatchGroupEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBatchGroupEntity(client, entopts)
	}
	core.NewBulkSettlementEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBulkSettlementEntity(client, entopts)
	}
	core.NewBusinessProfileEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewBusinessProfileEntity(client, entopts)
	}
	core.NewCardEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewCardHolderLimitEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCardHolderLimitEntity(client, entopts)
	}
	core.NewCardLimitEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCardLimitEntity(client, entopts)
	}
	core.NewCardOrderEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCardOrderEntity(client, entopts)
	}
	core.NewCardSensitiveDetailEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCardSensitiveDetailEntity(client, entopts)
	}
	core.NewCardTransactionEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCardTransactionEntity(client, entopts)
	}
	core.NewCaseEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCaseEntity(client, entopts)
	}
	core.NewClaimAccountEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewClaimAccountEntity(client, entopts)
	}
	core.NewComparisonEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewComparisonEntity(client, entopts)
	}
	core.NewContactEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewContactEntity(client, entopts)
	}
	core.NewCurrencyEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewCurrencyEntity(client, entopts)
	}
	core.NewDeliveryEstimateEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDeliveryEstimateEntity(client, entopts)
	}
	core.NewDeliveryUpdateEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDeliveryUpdateEntity(client, entopts)
	}
	core.NewDigitalWalletEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDigitalWalletEntity(client, entopts)
	}
	core.NewDirectDebitAccountEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDirectDebitAccountEntity(client, entopts)
	}
	core.NewDirectorEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDirectorEntity(client, entopts)
	}
	core.NewDisputeEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDisputeEntity(client, entopts)
	}
	core.NewDisputeReasonEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewDisputeReasonEntity(client, entopts)
	}
	core.NewFacetecEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewFacetecEntity(client, entopts)
	}
	core.NewFileEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewFileEntity(client, entopts)
	}
	core.NewFundingEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewFundingEntity(client, entopts)
	}
	core.NewGpiTrackingEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewGpiTrackingEntity(client, entopts)
	}
	core.NewHoldLimitBreachEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewHoldLimitBreachEntity(client, entopts)
	}
	core.NewIncomingTransferEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewIncomingTransferEntity(client, entopts)
	}
	core.NewJoseEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewJoseEntity(client, entopts)
	}
	core.NewKycReviewEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewKycReviewEntity(client, entopts)
	}
	core.NewLinkRequestEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewLinkRequestEntity(client, entopts)
	}
	core.NewMessageEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewMessageEntity(client, entopts)
	}
	core.NewMultiCurrencyAccountEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewMultiCurrencyAccountEntity(client, entopts)
	}
	core.NewOneTimeTokenEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewOneTimeTokenEntity(client, entopts)
	}
	core.NewOttEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewOttEntity(client, entopts)
	}
	core.NewPayinEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPayinEntity(client, entopts)
	}
	core.NewPayinDepositDetailEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPayinDepositDetailEntity(client, entopts)
	}
	core.NewPaymentEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPaymentEntity(client, entopts)
	}
	core.NewPaymentInitiationEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPaymentInitiationEntity(client, entopts)
	}
	core.NewPaymentInstrumentEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPaymentInstrumentEntity(client, entopts)
	}
	core.NewPaymentIntentEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPaymentIntentEntity(client, entopts)
	}
	core.NewPhoneNumberEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewPhoneNumberEntity(client, entopts)
	}
	core.NewProductionEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewProductionEntity(client, entopts)
	}
	core.NewProfileEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewProfileEntity(client, entopts)
	}
	core.NewQuoteEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewQuoteEntity(client, entopts)
	}
	core.NewRateEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewRateEntity(client, entopts)
	}
	core.NewRecipientEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewRecipientEntity(client, entopts)
	}
	core.NewRuleEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewRuleEntity(client, entopts)
	}
	core.NewSamlEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewSamlEntity(client, entopts)
	}
	core.NewScaDeviceFingerprintEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewScaDeviceFingerprintEntity(client, entopts)
	}
	core.NewScaFacemapEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewScaFacemapEntity(client, entopts)
	}
	core.NewScaOtpEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewScaOtpEntity(client, entopts)
	}
	core.NewScaSessionEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewScaSessionEntity(client, entopts)
	}
	core.NewSettlementAllocationEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewSettlementAllocationEntity(client, entopts)
	}
	core.NewSimulationEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewSimulationEntity(client, entopts)
	}
	core.NewSpendControlEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewSpendControlEntity(client, entopts)
	}
	core.NewSpendLimitEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewSpendLimitEntity(client, entopts)
	}
	core.NewSubscriptionEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewSubscriptionEntity(client, entopts)
	}
	core.NewTestNotificationEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewTestNotificationEntity(client, entopts)
	}
	core.NewThirdPartyTransferEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewThirdPartyTransferEntity(client, entopts)
	}
	core.NewThreeDSecureEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewThreeDSecureEntity(client, entopts)
	}
	core.NewTokenEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewTokenEntity(client, entopts)
	}
	core.NewTransferEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewTransferEntity(client, entopts)
	}
	core.NewTransferRequirementEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewTransferRequirementEntity(client, entopts)
	}
	core.NewUboEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewUboEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewUserEntity(client, entopts)
	}
	core.NewVerificationEntityFunc = func(client *core.WiseSDK, entopts map[string]any) core.WiseEntityBase {
		return entity.NewVerificationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWiseSDK = core.NewWiseSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWiseSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WiseSDK  { return NewWiseSDK(nil) }
func Test() *WiseSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewSecretsFeature = feature.NewSecretsFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
