package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAccountDetailEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewAccountRequirementEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewActivityEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewAddressEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewAddressRequirementEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBalanceEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBalanceStatementEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBankAccountDetailEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBankAccountDetailsOrderEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBatchGroupEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBulkSettlementEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewBusinessProfileEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCardEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCardHolderLimitEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCardLimitEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCardOrderEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCardSensitiveDetailEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCardTransactionEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCaseEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewClaimAccountEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewComparisonEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewContactEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewCurrencyEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDeliveryEstimateEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDeliveryUpdateEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDigitalWalletEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDirectDebitAccountEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDirectorEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDisputeEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewDisputeReasonEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewFacetecEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewFileEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewFundingEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewGpiTrackingEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewHoldLimitBreachEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewIncomingTransferEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewJoseEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewKycReviewEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewLinkRequestEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewMessageEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewMultiCurrencyAccountEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewOneTimeTokenEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewOttEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPayinEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPayinDepositDetailEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPaymentEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPaymentInitiationEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPaymentInstrumentEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPaymentIntentEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewPhoneNumberEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewProductionEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewProfileEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewQuoteEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewRateEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewRecipientEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewRuleEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewSamlEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewScaDeviceFingerprintEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewScaFacemapEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewScaOtpEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewScaSessionEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewSettlementAllocationEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewSimulationEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewSpendControlEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewSpendLimitEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewSubscriptionEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewTestNotificationEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewThirdPartyTransferEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewThreeDSecureEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewTokenEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewTransferEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewTransferRequirementEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewUboEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewUserEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

var NewVerificationEntityFunc func(client *WiseSDK, entopts map[string]any) WiseEntityBase

