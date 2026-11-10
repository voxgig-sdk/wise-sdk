# frozen_string_literal: true

# Typed models for the Wise SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AccountDetail entity data model.
#
# @!attribute [rw] accountHolderName
#   @return [String]
#
# @!attribute [rw] accountIdentification
#   @return [Object]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profileId
#   @return [Integer]
#
# @!attribute [rw] state
#   @return [String]
AccountDetail = Struct.new(
  :accountHolderName,
  :accountIdentification,
  :country,
  :id,
  :profileId,
  :state,
  keyword_init: true
)

# Request payload for AccountDetail#load.
#
# @!attribute [rw] id
#   @return [Integer]
AccountDetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# AccountRequirement entity data model.
#
# @!attribute [rw] accountHolderName
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] fields
#   @return [Array, nil]
#
# @!attribute [rw] ownedByCustomer
#   @return [Boolean, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] ultimateBeneficiary
#   @return [Object]
#
# @!attribute [rw] usageInfo
#   @return [String, nil]
AccountRequirement = Struct.new(
  :accountHolderName,
  :currency,
  :details,
  :fields,
  :ownedByCustomer,
  :profile,
  :title,
  :type,
  :ultimateBeneficiary,
  :usageInfo,
  keyword_init: true
)

# Request payload for AccountRequirement#list.
#
# @!attribute [rw] quote_id
#   @return [String]
#
# @!attribute [rw] address_required
#   @return [Boolean, nil]
#
# @!attribute [rw] originator_legal_entity_type
#   @return [String, nil]
AccountRequirementListMatch = Struct.new(
  :quote_id,
  :address_required,
  :originator_legal_entity_type,
  keyword_init: true
)

# Request payload for AccountRequirement#create.
#
# @!attribute [rw] quote_id
#   @return [String]
#
# @!attribute [rw] originator_legal_entity_type
#   @return [String, nil]
#
# @!attribute [rw] accountHolderName
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] ownedByCustomer
#   @return [Boolean, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] ultimateBeneficiary
#   @return [Object]
AccountRequirementCreateData = Struct.new(
  :quote_id,
  :originator_legal_entity_type,
  :accountHolderName,
  :currency,
  :details,
  :ownedByCustomer,
  :profile,
  :type,
  :ultimateBeneficiary,
  keyword_init: true
)

# Activity entity data model.
#
# @!attribute [rw] createdOn
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] primaryAmount
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [Hash, nil]
#
# @!attribute [rw] secondaryAmount
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedOn
#   @return [String, nil]
Activity = Struct.new(
  :createdOn,
  :description,
  :id,
  :primaryAmount,
  :resource,
  :secondaryAmount,
  :status,
  :title,
  :type,
  :updatedOn,
  keyword_init: true
)

# Request payload for Activity#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] monetary_resource_type
#   @return [String, nil]
#
# @!attribute [rw] next_cursor
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] until
#   @return [String, nil]
ActivityListMatch = Struct.new(
  :profile_id,
  :monetary_resource_type,
  :next_cursor,
  :since,
  :size,
  :status,
  :until,
  keyword_init: true
)

# Address entity data model.
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
Address = Struct.new(
  :details,
  :id,
  :profile,
  keyword_init: true
)

# Request payload for Address#load.
#
# @!attribute [rw] id
#   @return [Integer]
AddressLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Address#list.
#
# @!attribute [rw] profile
#   @return [Integer, nil]
AddressListMatch = Struct.new(
  :profile,
  keyword_init: true
)

# Request payload for Address#create.
#
# @!attribute [rw] details
#   @return [Hash]
#
# @!attribute [rw] profile
#   @return [Integer]
AddressCreateData = Struct.new(
  :details,
  :profile,
  keyword_init: true
)

# AddressRequirement entity data model.
#
# @!attribute [rw] details
#   @return [Hash]
#
# @!attribute [rw] fields
#   @return [Array, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
AddressRequirement = Struct.new(
  :details,
  :fields,
  :profile,
  :type,
  keyword_init: true
)

# Request payload for AddressRequirement#list.
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] fields
#   @return [Array, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
AddressRequirementListMatch = Struct.new(
  :details,
  :fields,
  :profile,
  :type,
  keyword_init: true
)

# Request payload for AddressRequirement#create.
#
# @!attribute [rw] details
#   @return [Hash]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
AddressRequirementCreateData = Struct.new(
  :details,
  :profile,
  keyword_init: true
)

# Balance entity data model.
#
# @!attribute [rw] amount
#   @return [Hash, nil]
#
# @!attribute [rw] cashAmount
#   @return [Hash, nil]
#
# @!attribute [rw] creationTime
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] icon
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] investmentState
#   @return [String, nil]
#
# @!attribute [rw] modificationTime
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] overdraft
#   @return [Hash, nil]
#
# @!attribute [rw] reservedAmount
#   @return [Hash, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] targetRecipientId
#   @return [Integer]
#
# @!attribute [rw] totalAvailable
#   @return [Hash, nil]
#
# @!attribute [rw] totalCash
#   @return [Hash, nil]
#
# @!attribute [rw] totalWorth
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] visible
#   @return [Boolean, nil]
Balance = Struct.new(
  :amount,
  :cashAmount,
  :creationTime,
  :currency,
  :icon,
  :id,
  :investmentState,
  :modificationTime,
  :name,
  :overdraft,
  :reservedAmount,
  :state,
  :targetRecipientId,
  :totalAvailable,
  :totalCash,
  :totalWorth,
  :type,
  :visible,
  keyword_init: true
)

# Request payload for Balance#load.
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [Integer, nil]
BalanceLoadMatch = Struct.new(
  :currency,
  :profile_id,
  :id,
  keyword_init: true
)

# Request payload for Balance#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
BalanceListMatch = Struct.new(
  :profile_id,
  :type,
  keyword_init: true
)

# Request payload for Balance#create.
#
# @!attribute [rw] hold_limit_breach_id
#   @return [Integer, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] targetRecipientId
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
BalanceCreateData = Struct.new(
  :hold_limit_breach_id,
  :profile_id,
  :currency,
  :name,
  :state,
  :targetRecipientId,
  :type,
  keyword_init: true
)

# Request payload for Balance#remove.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
BalanceRemoveMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# BalanceStatement entity data model.
#
# @!attribute [rw] accountHolder
#   @return [Hash, nil]
#
# @!attribute [rw] bankDetails
#   @return [Object, nil]
#
# @!attribute [rw] endOfStatementBalance
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] issuer
#   @return [Hash, nil]
#
# @!attribute [rw] query
#   @return [Hash, nil]
#
# @!attribute [rw] transactions
#   @return [Array, nil]
BalanceStatement = Struct.new(
  :accountHolder,
  :bankDetails,
  :endOfStatementBalance,
  :id,
  :issuer,
  :query,
  :transactions,
  keyword_init: true
)

# Request payload for BalanceStatement#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] interval_end
#   @return [String]
#
# @!attribute [rw] interval_start
#   @return [String]
#
# @!attribute [rw] statement_locale
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
BalanceStatementLoadMatch = Struct.new(
  :id,
  :profile_id,
  :currency,
  :interval_end,
  :interval_start,
  :statement_locale,
  :type,
  keyword_init: true
)

# BankAccountDetail entity data model.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] internationalDetails
#   @return [Object, nil]
#
# @!attribute [rw] localDetails
#   @return [Hash, nil]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] targetAccountId
#   @return [Integer]
BankAccountDetail = Struct.new(
  :active,
  :currency,
  :id,
  :internationalDetails,
  :localDetails,
  :reason,
  :targetAccountId,
  keyword_init: true
)

# Request payload for BankAccountDetail#create.
#
# @!attribute [rw] payment_id
#   @return [Integer, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] targetAccountId
#   @return [Integer]
BankAccountDetailCreateData = Struct.new(
  :payment_id,
  :profile_id,
  :reason,
  :targetAccountId,
  keyword_init: true
)

# BankAccountDetailsOrder entity data model.
#
# @!attribute [rw] accountDetailsId
#   @return [Integer, nil]
#
# @!attribute [rw] balanceId
#   @return [Object, nil]
#
# @!attribute [rw] creationTime
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] modificationTime
#   @return [String, nil]
#
# @!attribute [rw] requirements
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
BankAccountDetailsOrder = Struct.new(
  :accountDetailsId,
  :balanceId,
  :creationTime,
  :currency,
  :id,
  :modificationTime,
  :requirements,
  :status,
  keyword_init: true
)

# Request payload for BankAccountDetailsOrder#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String]
BankAccountDetailsOrderListMatch = Struct.new(
  :profile_id,
  :currency,
  keyword_init: true
)

# Request payload for BankAccountDetailsOrder#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String]
BankAccountDetailsOrderCreateData = Struct.new(
  :profile_id,
  :currency,
  keyword_init: true
)

# BatchGroup entity data model.
#
# @!attribute [rw] alreadyPaid
#   @return [Boolean, nil]
#
# @!attribute [rw] fileName
#   @return [Object, nil]
#
# @!attribute [rw] groupType
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] payInDetails
#   @return [Array, nil]
#
# @!attribute [rw] payinSessionId
#   @return [Object, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] shortId
#   @return [Integer, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] transferIds
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
BatchGroup = Struct.new(
  :alreadyPaid,
  :fileName,
  :groupType,
  :id,
  :name,
  :payInDetails,
  :payinSessionId,
  :profileId,
  :shortId,
  :sourceCurrency,
  :status,
  :transferIds,
  :type,
  :userId,
  :version,
  keyword_init: true
)

# Request payload for BatchGroup#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
BatchGroupLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for BatchGroup#create.
#
# @!attribute [rw] batch_payment_id
#   @return [String, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] sourceCurrency
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
BatchGroupCreateData = Struct.new(
  :batch_payment_id,
  :profile_id,
  :name,
  :sourceCurrency,
  :type,
  keyword_init: true
)

# Request payload for BatchGroup#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
BatchGroupUpdateData = Struct.new(
  :id,
  :profile_id,
  :status,
  :version,
  keyword_init: true
)

# BulkSettlement entity data model.
#
# @!attribute [rw] balanceTransfer
#   @return [Float, nil]
#
# @!attribute [rw] refundedTransfers
#   @return [Array, nil]
#
# @!attribute [rw] settlementCurrency
#   @return [String, nil]
#
# @!attribute [rw] settlementDate
#   @return [String]
#
# @!attribute [rw] settlementReference
#   @return [String]
#
# @!attribute [rw] transfers
#   @return [Array]
#
# @!attribute [rw] type
#   @return [String]
BulkSettlement = Struct.new(
  :balanceTransfer,
  :refundedTransfers,
  :settlementCurrency,
  :settlementDate,
  :settlementReference,
  :transfers,
  :type,
  keyword_init: true
)

# Request payload for BulkSettlement#create.
#
# @!attribute [rw] balanceTransfer
#   @return [Float, nil]
#
# @!attribute [rw] refundedTransfers
#   @return [Array, nil]
#
# @!attribute [rw] settlementCurrency
#   @return [String, nil]
#
# @!attribute [rw] settlementDate
#   @return [String]
#
# @!attribute [rw] settlementReference
#   @return [String]
#
# @!attribute [rw] transfers
#   @return [Array]
#
# @!attribute [rw] type
#   @return [String]
BulkSettlementCreateData = Struct.new(
  :balanceTransfer,
  :refundedTransfers,
  :settlementCurrency,
  :settlementDate,
  :settlementReference,
  :transfers,
  :type,
  keyword_init: true
)

# BusinessProfile entity data model.
#
# @!attribute [rw] abn
#   @return [Object, nil]
#
# @!attribute [rw] acn
#   @return [Object, nil]
#
# @!attribute [rw] actorEmail
#   @return [String, nil]
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] arbn
#   @return [Object, nil]
#
# @!attribute [rw] businessFreeFormDescription
#   @return [String, nil]
#
# @!attribute [rw] businessName
#   @return [String, nil]
#
# @!attribute [rw] businessNameInKatakana
#   @return [Object, nil]
#
# @!attribute [rw] businessRepresentative
#   @return [Hash, nil]
#
# @!attribute [rw] companyRole
#   @return [String, nil]
#
# @!attribute [rw] companyType
#   @return [String, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currentState
#   @return [String, nil]
#
# @!attribute [rw] descriptionOfBusiness
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] externalCustomerId
#   @return [String, nil]
#
# @!attribute [rw] firstLevelCategory
#   @return [String, nil]
#
# @!attribute [rw] fullName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] industryCategories
#   @return [Array, nil]
#
# @!attribute [rw] operationalAddresses
#   @return [Array, nil]
#
# @!attribute [rw] publicId
#   @return [String, nil]
#
# @!attribute [rw] registrationNumber
#   @return [String, nil]
#
# @!attribute [rw] secondLevelCategory
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
#
# @!attribute [rw] webpage
#   @return [String, nil]
BusinessProfile = Struct.new(
  :abn,
  :acn,
  :actorEmail,
  :address,
  :arbn,
  :businessFreeFormDescription,
  :businessName,
  :businessNameInKatakana,
  :businessRepresentative,
  :companyRole,
  :companyType,
  :contactDetails,
  :createdAt,
  :currentState,
  :descriptionOfBusiness,
  :email,
  :externalCustomerId,
  :firstLevelCategory,
  :fullName,
  :id,
  :industryCategories,
  :operationalAddresses,
  :publicId,
  :registrationNumber,
  :secondLevelCategory,
  :type,
  :updatedAt,
  :userId,
  :webpage,
  keyword_init: true
)

# Request payload for BusinessProfile#create.
#
# @!attribute [rw] abn
#   @return [Object, nil]
#
# @!attribute [rw] acn
#   @return [Object, nil]
#
# @!attribute [rw] actorEmail
#   @return [String, nil]
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] arbn
#   @return [Object, nil]
#
# @!attribute [rw] businessFreeFormDescription
#   @return [String, nil]
#
# @!attribute [rw] businessName
#   @return [String, nil]
#
# @!attribute [rw] businessNameInKatakana
#   @return [Object, nil]
#
# @!attribute [rw] businessRepresentative
#   @return [Hash, nil]
#
# @!attribute [rw] companyRole
#   @return [String, nil]
#
# @!attribute [rw] companyType
#   @return [String, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash]
#
# @!attribute [rw] externalCustomerId
#   @return [String, nil]
#
# @!attribute [rw] firstLevelCategory
#   @return [String, nil]
#
# @!attribute [rw] industryCategories
#   @return [Array, nil]
#
# @!attribute [rw] operationalAddresses
#   @return [Array, nil]
#
# @!attribute [rw] registrationNumber
#   @return [String, nil]
#
# @!attribute [rw] secondLevelCategory
#   @return [String, nil]
#
# @!attribute [rw] webpage
#   @return [String, nil]
BusinessProfileCreateData = Struct.new(
  :abn,
  :acn,
  :actorEmail,
  :address,
  :arbn,
  :businessFreeFormDescription,
  :businessName,
  :businessNameInKatakana,
  :businessRepresentative,
  :companyRole,
  :companyType,
  :contactDetails,
  :externalCustomerId,
  :firstLevelCategory,
  :industryCategories,
  :operationalAddresses,
  :registrationNumber,
  :secondLevelCategory,
  :webpage,
  keyword_init: true
)

# Request payload for BusinessProfile#update.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] abn
#   @return [Object, nil]
#
# @!attribute [rw] acn
#   @return [Object, nil]
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] arbn
#   @return [Object, nil]
#
# @!attribute [rw] businessFreeFormDescription
#   @return [String, nil]
#
# @!attribute [rw] businessName
#   @return [String, nil]
#
# @!attribute [rw] businessNameInKatakana
#   @return [Object, nil]
#
# @!attribute [rw] companyRole
#   @return [String, nil]
#
# @!attribute [rw] companyType
#   @return [String, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash, nil]
#
# @!attribute [rw] externalCustomerId
#   @return [String, nil]
#
# @!attribute [rw] firstLevelCategory
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] industryCategories
#   @return [Array, nil]
#
# @!attribute [rw] operationalAddresses
#   @return [Array, nil]
#
# @!attribute [rw] registrationNumber
#   @return [String, nil]
#
# @!attribute [rw] secondLevelCategory
#   @return [String, nil]
#
# @!attribute [rw] webpage
#   @return [String, nil]
BusinessProfileUpdateData = Struct.new(
  :profile_id,
  :abn,
  :acn,
  :address,
  :arbn,
  :businessFreeFormDescription,
  :businessName,
  :businessNameInKatakana,
  :companyRole,
  :companyType,
  :contactDetails,
  :externalCustomerId,
  :firstLevelCategory,
  :id,
  :industryCategories,
  :operationalAddresses,
  :registrationNumber,
  :secondLevelCategory,
  :webpage,
  keyword_init: true
)

# Card entity data model.
#
# @!attribute [rw] bankIdentificationNumber
#   @return [String, nil]
#
# @!attribute [rw] cardHolderName
#   @return [String, nil]
#
# @!attribute [rw] cardProgram
#   @return [Hash, nil]
#
# @!attribute [rw] clientId
#   @return [String, nil]
#
# @!attribute [rw] creationTime
#   @return [String, nil]
#
# @!attribute [rw] expiryDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastFourDigits
#   @return [String, nil]
#
# @!attribute [rw] modificationTime
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] unlockSpendingPermissions
#   @return [String, nil]
Card = Struct.new(
  :bankIdentificationNumber,
  :cardHolderName,
  :cardProgram,
  :clientId,
  :creationTime,
  :expiryDate,
  :id,
  :lastFourDigits,
  :modificationTime,
  :phoneNumber,
  :profileId,
  :status,
  :token,
  :unlockSpendingPermissions,
  keyword_init: true
)

# Request payload for Card#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
CardLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for Card#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] page_number
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
CardListMatch = Struct.new(
  :profile_id,
  :page_number,
  :page_size,
  keyword_init: true
)

# Request payload for Card#create.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] bankIdentificationNumber
#   @return [String, nil]
#
# @!attribute [rw] cardHolderName
#   @return [String, nil]
#
# @!attribute [rw] cardProgram
#   @return [Hash, nil]
#
# @!attribute [rw] clientId
#   @return [String, nil]
#
# @!attribute [rw] creationTime
#   @return [String, nil]
#
# @!attribute [rw] expiryDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastFourDigits
#   @return [String, nil]
#
# @!attribute [rw] modificationTime
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] unlockSpendingPermissions
#   @return [String, nil]
CardCreateData = Struct.new(
  :card_token,
  :profile_id,
  :bankIdentificationNumber,
  :cardHolderName,
  :cardProgram,
  :clientId,
  :creationTime,
  :expiryDate,
  :id,
  :lastFourDigits,
  :modificationTime,
  :phoneNumber,
  :profileId,
  :status,
  :token,
  :unlockSpendingPermissions,
  keyword_init: true
)

# Request payload for Card#update.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] permissions
#   @return [Object, nil]
CardUpdateData = Struct.new(
  :card_token,
  :profile_id,
  :status,
  :permissions,
  keyword_init: true
)

# CardHolderLimit entity data model.
#
# @!attribute [rw] aggregateWindow
#   @return [Hash]
#
# @!attribute [rw] spendLimits
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String]
CardHolderLimit = Struct.new(
  :aggregateWindow,
  :spendLimits,
  :type,
  keyword_init: true
)

# Request payload for CardHolderLimit#list.
#
# @!attribute [rw] card_holder_profile_id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
CardHolderLimitListMatch = Struct.new(
  :card_holder_profile_id,
  :profile_id,
  keyword_init: true
)

# Request payload for CardHolderLimit#update.
#
# @!attribute [rw] card_holder_profile_id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] aggregateWindow
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
CardHolderLimitUpdateData = Struct.new(
  :card_holder_profile_id,
  :profile_id,
  :aggregateWindow,
  :type,
  keyword_init: true
)

# Request payload for CardHolderLimit#remove.
#
# @!attribute [rw] card_holder_profile_id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
CardHolderLimitRemoveMatch = Struct.new(
  :card_holder_profile_id,
  :profile_id,
  keyword_init: true
)

# CardLimit entity data model.
#
# @!attribute [rw] daily
#   @return [Object, nil]
#
# @!attribute [rw] lifetime
#   @return [Object, nil]
#
# @!attribute [rw] monthly
#   @return [Object, nil]
#
# @!attribute [rw] transaction
#   @return [Object, nil]
CardLimit = Struct.new(
  :daily,
  :lifetime,
  :monthly,
  :transaction,
  keyword_init: true
)

# Request payload for CardLimit#load.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
CardLimitLoadMatch = Struct.new(
  :card_token,
  :profile_id,
  keyword_init: true
)

# Request payload for CardLimit#update.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] daily
#   @return [Object, nil]
#
# @!attribute [rw] lifetime
#   @return [Object, nil]
#
# @!attribute [rw] monthly
#   @return [Object, nil]
#
# @!attribute [rw] transaction
#   @return [Object, nil]
CardLimitUpdateData = Struct.new(
  :card_token,
  :profile_id,
  :daily,
  :lifetime,
  :monthly,
  :transaction,
  keyword_init: true
)

# CardOrder entity data model.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] cardHolderName
#   @return [String, nil]
#
# @!attribute [rw] cardHolderProfileId
#   @return [Integer, nil]
#
# @!attribute [rw] cardProgram
#   @return [Hash, nil]
#
# @!attribute [rw] cardToken
#   @return [Object, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] clientId
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] creationTime
#   @return [String, nil]
#
# @!attribute [rw] deliveryDetails
#   @return [Hash, nil]
#
# @!attribute [rw] deliveryEstimate
#   @return [String, nil]
#
# @!attribute [rw] deliveryOption
#   @return [String, nil]
#
# @!attribute [rw] embossedName
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] firstLine
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lifetimeLimit
#   @return [Object, nil]
#
# @!attribute [rw] modificationTime
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] postCode
#   @return [String, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] program
#   @return [String]
#
# @!attribute [rw] replacementDetails
#   @return [Hash, nil]
#
# @!attribute [rw] replacesCard
#   @return [Object, nil]
#
# @!attribute [rw] secondLine
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thirdLine
#   @return [Object, nil]
CardOrder = Struct.new(
  :address,
  :cardHolderName,
  :cardHolderProfileId,
  :cardProgram,
  :cardToken,
  :city,
  :clientId,
  :country,
  :creationTime,
  :deliveryDetails,
  :deliveryEstimate,
  :deliveryOption,
  :embossedName,
  :errors,
  :firstLine,
  :id,
  :lifetimeLimit,
  :modificationTime,
  :phoneNumber,
  :postCode,
  :profileId,
  :program,
  :replacementDetails,
  :replacesCard,
  :secondLine,
  :state,
  :status,
  :thirdLine,
  keyword_init: true
)

# Request payload for CardOrder#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
CardOrderLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for CardOrder#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] page_number
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
CardOrderListMatch = Struct.new(
  :profile_id,
  :page_number,
  :page_size,
  keyword_init: true
)

# Request payload for CardOrder#create.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] cardHolderName
#   @return [String]
#
# @!attribute [rw] cardHolderProfileId
#   @return [Integer, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] deliveryOption
#   @return [String, nil]
#
# @!attribute [rw] embossedName
#   @return [String, nil]
#
# @!attribute [rw] firstLine
#   @return [String, nil]
#
# @!attribute [rw] lifetimeLimit
#   @return [Object, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] postCode
#   @return [String, nil]
#
# @!attribute [rw] program
#   @return [String]
#
# @!attribute [rw] replacementDetails
#   @return [Hash, nil]
#
# @!attribute [rw] secondLine
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [Object, nil]
#
# @!attribute [rw] thirdLine
#   @return [Object, nil]
CardOrderCreateData = Struct.new(
  :address,
  :cardHolderName,
  :cardHolderProfileId,
  :city,
  :country,
  :deliveryOption,
  :embossedName,
  :firstLine,
  :lifetimeLimit,
  :phoneNumber,
  :postCode,
  :program,
  :replacementDetails,
  :secondLine,
  :state,
  :thirdLine,
  keyword_init: true
)

# Request payload for CardOrder#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
CardOrderUpdateData = Struct.new(
  :id,
  :profile_id,
  :status,
  keyword_init: true
)

# CardSensitiveDetail entity data model.
#
# @!attribute [rw] encryptedPayload
#   @return [String]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] keyVersion
#   @return [Integer]
#
# @!attribute [rw] version
#   @return [Integer, nil]
CardSensitiveDetail = Struct.new(
  :encryptedPayload,
  :key,
  :keyVersion,
  :version,
  keyword_init: true
)

# Request payload for CardSensitiveDetail#load.
#
# @!attribute [rw] encryptedPayload
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] keyVersion
#   @return [Integer, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
CardSensitiveDetailLoadMatch = Struct.new(
  :encryptedPayload,
  :key,
  :keyVersion,
  :version,
  keyword_init: true
)

# Request payload for CardSensitiveDetail#create.
#
# @!attribute [rw] encryptedPayload
#   @return [String]
#
# @!attribute [rw] keyVersion
#   @return [Integer]
CardSensitiveDetailCreateData = Struct.new(
  :encryptedPayload,
  :keyVersion,
  keyword_init: true
)

# CardTransaction entity data model.
#
# @!attribute [rw] approvalCode
#   @return [Object, nil]
#
# @!attribute [rw] arn
#   @return [Object, nil]
#
# @!attribute [rw] authorisationMethod
#   @return [String, nil]
#
# @!attribute [rw] balanceChannelReferenceId
#   @return [Object, nil]
#
# @!attribute [rw] billingAmount
#   @return [Hash, nil]
#
# @!attribute [rw] cardToken
#   @return [String, nil]
#
# @!attribute [rw] creationTime
#   @return [String, nil]
#
# @!attribute [rw] credits
#   @return [Array, nil]
#
# @!attribute [rw] debits
#   @return [Array, nil]
#
# @!attribute [rw] declineReason
#   @return [Object, nil]
#
# @!attribute [rw] detailedDeclineReason
#   @return [Object, nil]
#
# @!attribute [rw] fees
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] modificationTime
#   @return [String, nil]
#
# @!attribute [rw] pinValidationResult
#   @return [Object, nil]
#
# @!attribute [rw] purgeTime
#   @return [Object, nil]
#
# @!attribute [rw] relayAuthorisationData
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] transactionAmount
#   @return [Hash, nil]
#
# @!attribute [rw] transactionAmountWithFees
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
CardTransaction = Struct.new(
  :approvalCode,
  :arn,
  :authorisationMethod,
  :balanceChannelReferenceId,
  :billingAmount,
  :cardToken,
  :creationTime,
  :credits,
  :debits,
  :declineReason,
  :detailedDeclineReason,
  :fees,
  :id,
  :merchant,
  :modificationTime,
  :pinValidationResult,
  :purgeTime,
  :relayAuthorisationData,
  :state,
  :transactionAmount,
  :transactionAmountWithFees,
  :type,
  keyword_init: true
)

# Request payload for CardTransaction#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
CardTransactionLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for CardTransaction#list.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] from_creation_time
#   @return [String]
#
# @!attribute [rw] last_id
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] to_creation_time
#   @return [String]
CardTransactionListMatch = Struct.new(
  :card_token,
  :profile_id,
  :from_creation_time,
  :last_id,
  :page_size,
  :to_creation_time,
  keyword_init: true
)

# Case entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] externalId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] profileId
#   @return [Integer]
#
# @!attribute [rw] reference
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] subType
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
Case = Struct.new(
  :createdAt,
  :description,
  :details,
  :externalId,
  :id,
  :messages,
  :profileId,
  :reference,
  :status,
  :subType,
  :subject,
  :type,
  :updatedAt,
  keyword_init: true
)

# Request payload for Case#load.
#
# @!attribute [rw] id
#   @return [Integer]
CaseLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Case#create.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] externalId
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
CaseCreateData = Struct.new(
  :description,
  :details,
  :externalId,
  :subject,
  :type,
  keyword_init: true
)

# ClaimAccount entity data model.
#
# @!attribute [rw] claimAccountCode
#   @return [String, nil]
#
# @!attribute [rw] registrationCode
#   @return [String]
ClaimAccount = Struct.new(
  :claimAccountCode,
  :registrationCode,
  keyword_init: true
)

# Request payload for ClaimAccount#create.
#
# @!attribute [rw] registrationCode
#   @return [String]
ClaimAccountCreateData = Struct.new(
  :registrationCode,
  keyword_init: true
)

# Comparison entity data model.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] amountType
#   @return [String, nil]
#
# @!attribute [rw] providerCountry
#   @return [Object, nil]
#
# @!attribute [rw] providerTypes
#   @return [Array, nil]
#
# @!attribute [rw] providers
#   @return [Array, nil]
#
# @!attribute [rw] sourceCountry
#   @return [Object, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [Object, nil]
#
# @!attribute [rw] targetCountry
#   @return [Object, nil]
#
# @!attribute [rw] targetCurrency
#   @return [Object, nil]
Comparison = Struct.new(
  :amount,
  :amountType,
  :providerCountry,
  :providerTypes,
  :providers,
  :sourceCountry,
  :sourceCurrency,
  :targetCountry,
  :targetCurrency,
  keyword_init: true
)

# Request payload for Comparison#load.
#
# @!attribute [rw] exclude_partner
#   @return [Boolean, nil]
#
# @!attribute [rw] filter
#   @return [String, nil]
#
# @!attribute [rw] include_wise
#   @return [Boolean, nil]
#
# @!attribute [rw] mid_market_rate
#   @return [Float, nil]
#
# @!attribute [rw] number_of_provider
#   @return [Integer, nil]
#
# @!attribute [rw] pay_in_method
#   @return [String, nil]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] provider_country
#   @return [String, nil]
#
# @!attribute [rw] provider_type
#   @return [Array, nil]
#
# @!attribute [rw] recipient_gets_amount
#   @return [Float, nil]
#
# @!attribute [rw] send_amount
#   @return [Float, nil]
#
# @!attribute [rw] source_country
#   @return [String, nil]
#
# @!attribute [rw] source_currency
#   @return [String]
#
# @!attribute [rw] target_country
#   @return [String, nil]
#
# @!attribute [rw] target_currency
#   @return [String]
#
# @!attribute [rw] wise_estimated_delivery
#   @return [String, nil]
#
# @!attribute [rw] wise_fee
#   @return [Float, nil]
#
# @!attribute [rw] wise_quote_created_time
#   @return [String, nil]
ComparisonLoadMatch = Struct.new(
  :exclude_partner,
  :filter,
  :include_wise,
  :mid_market_rate,
  :number_of_provider,
  :pay_in_method,
  :provider,
  :provider_country,
  :provider_type,
  :recipient_gets_amount,
  :send_amount,
  :source_country,
  :source_currency,
  :target_country,
  :target_currency,
  :wise_estimated_delivery,
  :wise_fee,
  :wise_quote_created_time,
  keyword_init: true
)

# Contact entity data model.
#
# @!attribute [rw] contactId
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
Contact = Struct.new(
  :contactId,
  :identifier,
  :name,
  :targetCurrency,
  keyword_init: true
)

# Request payload for Contact#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] is_direct_identifier_creation
#   @return [Boolean]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
ContactCreateData = Struct.new(
  :profile_id,
  :is_direct_identifier_creation,
  :identifier,
  :targetCurrency,
  keyword_init: true
)

# Currency entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] countryKeywords
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] supportsDecimals
#   @return [Boolean, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
Currency = Struct.new(
  :code,
  :countryKeywords,
  :name,
  :supportsDecimals,
  :symbol,
  keyword_init: true
)

# Request payload for Currency#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] countryKeywords
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] supportsDecimals
#   @return [Boolean, nil]
#
# @!attribute [rw] symbol
#   @return [String, nil]
CurrencyListMatch = Struct.new(
  :code,
  :countryKeywords,
  :name,
  :supportsDecimals,
  :symbol,
  keyword_init: true
)

# DeliveryEstimate entity data model.
#
# @!attribute [rw] estimatedDeliveryDate
#   @return [String, nil]
#
# @!attribute [rw] formattedEstimatedDeliveryDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
DeliveryEstimate = Struct.new(
  :estimatedDeliveryDate,
  :formattedEstimatedDeliveryDate,
  :id,
  keyword_init: true
)

# Request payload for DeliveryEstimate#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] timezone
#   @return [String, nil]
DeliveryEstimateLoadMatch = Struct.new(
  :id,
  :timezone,
  keyword_init: true
)

# DeliveryUpdate entity data model.
#
# @!attribute [rw] delivery_update
#   @return [String]
#
# @!attribute [rw] delivery_update_path
#   @return [Array]
#
# @!attribute [rw] estimated_delivery_at
#   @return [Object, nil]
#
# @!attribute [rw] observation_id
#   @return [String]
#
# @!attribute [rw] occurred_at
#   @return [String]
#
# @!attribute [rw] scheme
#   @return [Object, nil]
DeliveryUpdate = Struct.new(
  :delivery_update,
  :delivery_update_path,
  :estimated_delivery_at,
  :observation_id,
  :occurred_at,
  :scheme,
  keyword_init: true
)

# Request payload for DeliveryUpdate#create.
#
# @!attribute [rw] transfer_id
#   @return [Integer]
#
# @!attribute [rw] delivery_update
#   @return [String]
#
# @!attribute [rw] delivery_update_path
#   @return [Array]
#
# @!attribute [rw] estimated_delivery_at
#   @return [Object, nil]
#
# @!attribute [rw] scheme
#   @return [Object, nil]
DeliveryUpdateCreateData = Struct.new(
  :transfer_id,
  :delivery_update,
  :delivery_update_path,
  :estimated_delivery_at,
  :scheme,
  keyword_init: true
)

# DigitalWallet entity data model.
#
# @!attribute [rw] activation
#   @return [String]
#
# @!attribute [rw] paymentTokens
#   @return [Array, nil]
#
# @!attribute [rw] walletNames
#   @return [Array, nil]
DigitalWallet = Struct.new(
  :activation,
  :paymentTokens,
  :walletNames,
  keyword_init: true
)

# Request payload for DigitalWallet#create.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] payment_token_unique_reference
#   @return [String, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] activation
#   @return [String]
#
# @!attribute [rw] walletNames
#   @return [Array, nil]
DigitalWalletCreateData = Struct.new(
  :card_token,
  :payment_token_unique_reference,
  :profile_id,
  :activation,
  :walletNames,
  keyword_init: true
)

# DirectDebitAccount entity data model.
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
DirectDebitAccount = Struct.new(
  :currency,
  :details,
  :id,
  :type,
  keyword_init: true
)

# Request payload for DirectDebitAccount#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
DirectDebitAccountListMatch = Struct.new(
  :profile_id,
  :currency,
  :type,
  keyword_init: true
)

# Request payload for DirectDebitAccount#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
DirectDebitAccountCreateData = Struct.new(
  :profile_id,
  :currency,
  :details,
  :type,
  keyword_init: true
)

# Director entity data model.
#
# @!attribute [rw] countryOfResidenceIso3Code
#   @return [String, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] directors
#   @return [Array, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
Director = Struct.new(
  :countryOfResidenceIso3Code,
  :dateOfBirth,
  :directors,
  :firstName,
  :id,
  :lastName,
  keyword_init: true
)

# Request payload for Director#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
DirectorListMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# Request payload for Director#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] directors
#   @return [Array, nil]
DirectorCreateData = Struct.new(
  :profile_id,
  :directors,
  keyword_init: true
)

# Request payload for Director#update.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] directors
#   @return [Array, nil]
DirectorUpdateData = Struct.new(
  :profile_id,
  :directors,
  keyword_init: true
)

# Request payload for Director#remove.
#
# @!attribute [rw] profile_id
#   @return [Integer]
DirectorRemoveMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# Dispute entity data model.
#
# @!attribute [rw] canWithdraw
#   @return [Boolean, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] createdBy
#   @return [String, nil]
#
# @!attribute [rw] disclaimer
#   @return [Hash, nil]
#
# @!attribute [rw] files
#   @return [Hash, nil]
#
# @!attribute [rw] form
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdatedAt
#   @return [String, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] receipt
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] statusMessage
#   @return [String, nil]
#
# @!attribute [rw] subStatus
#   @return [String, nil]
#
# @!attribute [rw] transaction
#   @return [Hash, nil]
#
# @!attribute [rw] transactionId
#   @return [Integer, nil]
Dispute = Struct.new(
  :canWithdraw,
  :createdAt,
  :createdBy,
  :disclaimer,
  :files,
  :form,
  :id,
  :lastUpdatedAt,
  :profileId,
  :reason,
  :receipt,
  :status,
  :statusMessage,
  :subStatus,
  :transaction,
  :transactionId,
  keyword_init: true
)

# Request payload for Dispute#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
DisputeLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for Dispute#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] page_number
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] transaction_id
#   @return [Integer, nil]
DisputeListMatch = Struct.new(
  :profile_id,
  :page_number,
  :page_size,
  :status,
  :transaction_id,
  keyword_init: true
)

# Request payload for Dispute#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] scheme
#   @return [String, nil]
#
# @!attribute [rw] canWithdraw
#   @return [Boolean, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] createdBy
#   @return [String, nil]
#
# @!attribute [rw] disclaimer
#   @return [Hash, nil]
#
# @!attribute [rw] files
#   @return [Hash, nil]
#
# @!attribute [rw] form
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdatedAt
#   @return [String, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] receipt
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] statusMessage
#   @return [String, nil]
#
# @!attribute [rw] subStatus
#   @return [String, nil]
#
# @!attribute [rw] transaction
#   @return [Hash, nil]
#
# @!attribute [rw] transactionId
#   @return [Integer, nil]
DisputeCreateData = Struct.new(
  :profile_id,
  :reason,
  :scheme,
  :canWithdraw,
  :createdAt,
  :createdBy,
  :disclaimer,
  :files,
  :form,
  :id,
  :lastUpdatedAt,
  :profileId,
  :receipt,
  :status,
  :statusMessage,
  :subStatus,
  :transaction,
  :transactionId,
  keyword_init: true
)

# Request payload for Dispute#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
DisputeUpdateData = Struct.new(
  :id,
  :profile_id,
  :status,
  keyword_init: true
)

# DisputeReason entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] isFraud
#   @return [Boolean, nil]
#
# @!attribute [rw] subOptions
#   @return [Array, nil]
#
# @!attribute [rw] supportsMultipleTransactions
#   @return [Boolean, nil]
#
# @!attribute [rw] tooltip
#   @return [String, nil]
DisputeReason = Struct.new(
  :code,
  :description,
  :isFraud,
  :subOptions,
  :supportsMultipleTransactions,
  :tooltip,
  keyword_init: true
)

# Request payload for DisputeReason#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
DisputeReasonListMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# Facetec entity data model.
class Facetec
end

# Request payload for Facetec#load.
class FacetecLoadMatch
end

# File entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] file
#   @return [String]
#
# @!attribute [rw] fileId
#   @return [String]
#
# @!attribute [rw] fileName
#   @return [String]
#
# @!attribute [rw] profileId
#   @return [Integer]
#
# @!attribute [rw] purpose
#   @return [String]
#
# @!attribute [rw] submissionData
#   @return [Hash]
FileType = Struct.new(
  :createdAt,
  :file,
  :fileId,
  :fileName,
  :profileId,
  :purpose,
  :submissionData,
  keyword_init: true
)

# Request payload for File#list.
#
# @!attribute [rw] page_number
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer, nil]
FileListMatch = Struct.new(
  :page_number,
  :page_size,
  :profile_id,
  keyword_init: true
)

# Request payload for File#create.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] file
#   @return [String]
#
# @!attribute [rw] fileId
#   @return [String]
#
# @!attribute [rw] fileName
#   @return [String]
#
# @!attribute [rw] profileId
#   @return [Integer]
#
# @!attribute [rw] purpose
#   @return [String]
#
# @!attribute [rw] submissionData
#   @return [Hash]
FileCreateData = Struct.new(
  :createdAt,
  :file,
  :fileId,
  :fileName,
  :profileId,
  :purpose,
  :submissionData,
  keyword_init: true
)

# Funding entity data model.
#
# @!attribute [rw] balanceTransactionId
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Funding = Struct.new(
  :balanceTransactionId,
  :status,
  :type,
  keyword_init: true
)

# Request payload for Funding#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] transfer_id
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] balanceId
#   @return [Object, nil]
#
# @!attribute [rw] partnerReference
#   @return [Object, nil]
FundingCreateData = Struct.new(
  :profile_id,
  :transfer_id,
  :status,
  :type,
  :balanceId,
  :partnerReference,
  keyword_init: true
)

# GpiTracking entity data model.
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] identifierType
#   @return [String]
#
# @!attribute [rw] transactions
#   @return [Array, nil]
GpiTracking = Struct.new(
  :identifier,
  :identifierType,
  :transactions,
  keyword_init: true
)

# Request payload for GpiTracking#create.
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] identifierType
#   @return [String]
GpiTrackingCreateData = Struct.new(
  :identifier,
  :identifierType,
  keyword_init: true
)

# HoldLimitBreach entity data model.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] closingReason
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
HoldLimitBreach = Struct.new(
  :amount,
  :closingReason,
  :createdAt,
  :currency,
  :id,
  :profileId,
  :state,
  :updatedAt,
  keyword_init: true
)

# Request payload for HoldLimitBreach#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] closing_reason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
HoldLimitBreachListMatch = Struct.new(
  :profile_id,
  :closing_reason,
  :state,
  keyword_init: true
)

# IncomingTransfer entity data model.
#
# @!attribute [rw] accountDetailsId
#   @return [String, nil]
#
# @!attribute [rw] amounts
#   @return [Hash]
#
# @!attribute [rw] balanceId
#   @return [String]
#
# @!attribute [rw] chargeBearer
#   @return [String, nil]
#
# @!attribute [rw] creditTransferType
#   @return [String, nil]
#
# @!attribute [rw] creditedTime
#   @return [String]
#
# @!attribute [rw] creditor
#   @return [Hash]
#
# @!attribute [rw] debtor
#   @return [Hash]
#
# @!attribute [rw] endToEndId
#   @return [String, nil]
#
# @!attribute [rw] exchangeRate
#   @return [Float]
#
# @!attribute [rw] fees
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] previousInstructingAgents
#   @return [Array]
#
# @!attribute [rw] profileId
#   @return [Integer]
#
# @!attribute [rw] scheme
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] uetr
#   @return [String, nil]
#
# @!attribute [rw] unstructuredReference
#   @return [String, nil]
IncomingTransfer = Struct.new(
  :accountDetailsId,
  :amounts,
  :balanceId,
  :chargeBearer,
  :creditTransferType,
  :creditedTime,
  :creditor,
  :debtor,
  :endToEndId,
  :exchangeRate,
  :fees,
  :id,
  :previousInstructingAgents,
  :profileId,
  :scheme,
  :state,
  :uetr,
  :unstructuredReference,
  keyword_init: true
)

# Request payload for IncomingTransfer#load.
#
# @!attribute [rw] id
#   @return [String]
IncomingTransferLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Jose entity data model.
#
# @!attribute [rw] keyId
#   @return [String, nil]
#
# @!attribute [rw] keyMaterial
#   @return [Hash, nil]
#
# @!attribute [rw] publicKeyMaterial
#   @return [Hash, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] validFrom
#   @return [String, nil]
#
# @!attribute [rw] validTill
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Integer, nil]
Jose = Struct.new(
  :keyId,
  :keyMaterial,
  :publicKeyMaterial,
  :scope,
  :validFrom,
  :validTill,
  :version,
  keyword_init: true
)

# Request payload for Jose#load.
#
# @!attribute [rw] algorithm
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] version
#   @return [Integer, nil]
JoseLoadMatch = Struct.new(
  :algorithm,
  :scope,
  :version,
  keyword_init: true
)

# Request payload for Jose#create.
#
# @!attribute [rw] keyId
#   @return [String, nil]
#
# @!attribute [rw] publicKeyMaterial
#   @return [Hash, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] validFrom
#   @return [String, nil]
#
# @!attribute [rw] validTill
#   @return [String, nil]
JoseCreateData = Struct.new(
  :keyId,
  :publicKeyMaterial,
  :scope,
  :validFrom,
  :validTill,
  keyword_init: true
)

# KycReview entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [Object, nil]
#
# @!attribute [rw] redirectUrl
#   @return [Object, nil]
#
# @!attribute [rw] requiredBy
#   @return [Object, nil]
#
# @!attribute [rw] requirements
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] triggerData
#   @return [Hash, nil]
#
# @!attribute [rw] triggerReferences
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
KycReview = Struct.new(
  :createdAt,
  :id,
  :link,
  :redirectUrl,
  :requiredBy,
  :requirements,
  :status,
  :triggerData,
  :triggerReferences,
  :type,
  :updatedAt,
  keyword_init: true
)

# Request payload for KycReview#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
KycReviewLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for KycReview#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] page_number
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
KycReviewListMatch = Struct.new(
  :profile_id,
  :page_number,
  :page_size,
  keyword_init: true
)

# Request payload for KycReview#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] requirement_key
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [Object, nil]
#
# @!attribute [rw] redirectUrl
#   @return [Object, nil]
#
# @!attribute [rw] requiredBy
#   @return [Object, nil]
#
# @!attribute [rw] requirements
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] triggerData
#   @return [Hash, nil]
#
# @!attribute [rw] triggerReferences
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
KycReviewCreateData = Struct.new(
  :profile_id,
  :requirement_key,
  :createdAt,
  :id,
  :link,
  :redirectUrl,
  :requiredBy,
  :requirements,
  :status,
  :triggerData,
  :triggerReferences,
  :type,
  :updatedAt,
  keyword_init: true
)

# Request payload for KycReview#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] redirectUrl
#   @return [Object, nil]
KycReviewUpdateData = Struct.new(
  :id,
  :profile_id,
  :redirectUrl,
  keyword_init: true
)

# LinkRequest entity data model.
#
# @!attribute [rw] clientKey
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] profileId
#   @return [Integer]
#
# @!attribute [rw] redirectUrl
#   @return [String]
#
# @!attribute [rw] transactionId
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
LinkRequest = Struct.new(
  :clientKey,
  :email,
  :id,
  :metadata,
  :profileId,
  :redirectUrl,
  :transactionId,
  :type,
  keyword_init: true
)

# Request payload for LinkRequest#load.
#
# @!attribute [rw] id
#   @return [String]
LinkRequestLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for LinkRequest#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] redirectUrl
#   @return [String]
#
# @!attribute [rw] transactionId
#   @return [Integer]
LinkRequestCreateData = Struct.new(
  :profile_id,
  :email,
  :redirectUrl,
  :transactionId,
  keyword_init: true
)

# Message entity data model.
#
# @!attribute [rw] submissionData
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String]
Message = Struct.new(
  :submissionData,
  :type,
  keyword_init: true
)

# Request payload for Message#create.
#
# @!attribute [rw] case_id
#   @return [Integer]
#
# @!attribute [rw] submissionData
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String]
MessageCreateData = Struct.new(
  :case_id,
  :submissionData,
  :type,
  keyword_init: true
)

# MultiCurrencyAccount entity data model.
class MultiCurrencyAccount
end

# Request payload for MultiCurrencyAccount#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
MultiCurrencyAccountLoadMatch = Struct.new(
  :country,
  :profile_id,
  :state,
  keyword_init: true
)

# Request payload for MultiCurrencyAccount#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
MultiCurrencyAccountListMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# OneTimeToken entity data model.
#
# @!attribute [rw] challenges
#   @return [Array, nil]
#
# @!attribute [rw] faceMap
#   @return [String, nil]
#
# @!attribute [rw] oneTimeToken
#   @return [String, nil]
#
# @!attribute [rw] validity
#   @return [Integer, nil]
OneTimeToken = Struct.new(
  :challenges,
  :faceMap,
  :oneTimeToken,
  :validity,
  keyword_init: true
)

# Request payload for OneTimeToken#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] faceMap
#   @return [String, nil]
OneTimeTokenCreateData = Struct.new(
  :profile_id,
  :faceMap,
  keyword_init: true
)

# Ott entity data model.
#
# @!attribute [rw] actionType
#   @return [String, nil]
#
# @!attribute [rw] challenges
#   @return [Array, nil]
#
# @!attribute [rw] oneTimeToken
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
#
# @!attribute [rw] validity
#   @return [Integer, nil]
Ott = Struct.new(
  :actionType,
  :challenges,
  :oneTimeToken,
  :userId,
  :validity,
  keyword_init: true
)

# Request payload for Ott#load.
#
# @!attribute [rw] actionType
#   @return [String, nil]
#
# @!attribute [rw] challenges
#   @return [Array, nil]
#
# @!attribute [rw] oneTimeToken
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
#
# @!attribute [rw] validity
#   @return [Integer, nil]
OttLoadMatch = Struct.new(
  :actionType,
  :challenges,
  :oneTimeToken,
  :userId,
  :validity,
  keyword_init: true
)

# Request payload for Ott#create.
#
# @!attribute [rw] otpCode
#   @return [Object, nil]
OttCreateData = Struct.new(
  :otpCode,
  keyword_init: true
)

# Payin entity data model.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] failureReason
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] payinSessionId
#   @return [String, nil]
#
# @!attribute [rw] paymentInstrumentId
#   @return [String, nil]
#
# @!attribute [rw] qrCodeInBase64
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Payin = Struct.new(
  :amount,
  :currency,
  :details,
  :failureReason,
  :id,
  :payinSessionId,
  :paymentInstrumentId,
  :qrCodeInBase64,
  :reference,
  :status,
  keyword_init: true
)

# Request payload for Payin#create.
#
# @!attribute [rw] payin_session_id
#   @return [String, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] payment_instrument_id
#   @return [String, nil]
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] failureReason
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] payinSessionId
#   @return [String]
#
# @!attribute [rw] paymentInstrumentId
#   @return [String, nil]
#
# @!attribute [rw] qrCodeInBase64
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
PayinCreateData = Struct.new(
  :payin_session_id,
  :profile_id,
  :payment_instrument_id,
  :amount,
  :currency,
  :details,
  :failureReason,
  :id,
  :payinSessionId,
  :paymentInstrumentId,
  :qrCodeInBase64,
  :reference,
  :status,
  keyword_init: true
)

# PayinDepositDetail entity data model.
#
# @!attribute [rw] payinBank
#   @return [Hash, nil]
#
# @!attribute [rw] payinBankAccount
#   @return [Hash, nil]
#
# @!attribute [rw] wiseInformation
#   @return [Hash, nil]
PayinDepositDetail = Struct.new(
  :payinBank,
  :payinBankAccount,
  :wiseInformation,
  keyword_init: true
)

# Request payload for PayinDepositDetail#load.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] transfer_id
#   @return [Integer]
PayinDepositDetailLoadMatch = Struct.new(
  :profile_id,
  :transfer_id,
  keyword_init: true
)

# Payment entity data model.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] method
#   @return [String, nil]
#
# @!attribute [rw] pricingVariant
#   @return [Object, nil]
#
# @!attribute [rw] timeCreated
#   @return [String, nil]
#
# @!attribute [rw] timeUpdated
#   @return [String, nil]
Payment = Struct.new(
  :amount,
  :currency,
  :id,
  :method,
  :pricingVariant,
  :timeCreated,
  :timeUpdated,
  keyword_init: true
)

# Request payload for Payment#list.
#
# @!attribute [rw] transfer_id
#   @return [Integer]
PaymentListMatch = Struct.new(
  :transfer_id,
  keyword_init: true
)

# PaymentInitiation entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
PaymentInitiation = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for PaymentInitiation#load.
#
# @!attribute [rw] batch_group_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
PaymentInitiationLoadMatch = Struct.new(
  :batch_group_id,
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for PaymentInitiation#create.
#
# @!attribute [rw] batch_group_id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] accountId
#   @return [Object, nil]
#
# @!attribute [rw] reference
#   @return [Object, nil]
#
# @!attribute [rw] type
#   @return [Object, nil]
PaymentInitiationCreateData = Struct.new(
  :batch_group_id,
  :profile_id,
  :accountId,
  :reference,
  :type,
  keyword_init: true
)

# PaymentInstrument entity data model.
#
# @!attribute [rw] accountHolderName
#   @return [String, nil]
#
# @!attribute [rw] accountNumber
#   @return [String, nil]
#
# @!attribute [rw] accountOwnerDetails
#   @return [Hash, nil]
#
# @!attribute [rw] accountType
#   @return [String, nil]
#
# @!attribute [rw] bankCode
#   @return [String, nil]
#
# @!attribute [rw] bankName
#   @return [String, nil]
#
# @!attribute [rw] branchCode
#   @return [String, nil]
#
# @!attribute [rw] disconnectReason
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
PaymentInstrument = Struct.new(
  :accountHolderName,
  :accountNumber,
  :accountOwnerDetails,
  :accountType,
  :bankCode,
  :bankName,
  :branchCode,
  :disconnectReason,
  :id,
  :reference,
  :status,
  :type,
  keyword_init: true
)

# Request payload for PaymentInstrument#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
PaymentInstrumentLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for PaymentInstrument#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
PaymentInstrumentListMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for PaymentInstrument#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] accountHolderName
#   @return [String, nil]
#
# @!attribute [rw] accountNumber
#   @return [String]
#
# @!attribute [rw] accountOwnerDetails
#   @return [Hash, nil]
#
# @!attribute [rw] accountType
#   @return [String, nil]
#
# @!attribute [rw] bankCode
#   @return [String, nil]
#
# @!attribute [rw] branchCode
#   @return [String, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
PaymentInstrumentCreateData = Struct.new(
  :profile_id,
  :accountHolderName,
  :accountNumber,
  :accountOwnerDetails,
  :accountType,
  :bankCode,
  :branchCode,
  :reference,
  :type,
  keyword_init: true
)

# PaymentIntent entity data model.
#
# @!attribute [rw] allocationId
#   @return [String, nil]
#
# @!attribute [rw] allocationType
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] fundingSource
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] partnerEntityId
#   @return [String, nil]
#
# @!attribute [rw] paymentReference
#   @return [String, nil]
#
# @!attribute [rw] profileId
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] recipientType
#   @return [String, nil]
#
# @!attribute [rw] sourceAmount
#   @return [Float, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] targetAmount
#   @return [Float, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
PaymentIntent = Struct.new(
  :allocationId,
  :allocationType,
  :createdAt,
  :fundingSource,
  :id,
  :partnerEntityId,
  :paymentReference,
  :profileId,
  :reason,
  :recipientType,
  :sourceAmount,
  :sourceCurrency,
  :state,
  :targetAmount,
  :targetCurrency,
  :updatedAt,
  keyword_init: true
)

# Request payload for PaymentIntent#load.
#
# @!attribute [rw] allocation_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
PaymentIntentLoadMatch = Struct.new(
  :allocation_id,
  :id,
  keyword_init: true
)

# PhoneNumber entity data model.
#
# @!attribute [rw] clientId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
PhoneNumber = Struct.new(
  :clientId,
  :id,
  :phoneNumber,
  :type,
  :verified,
  keyword_init: true
)

# Request payload for PhoneNumber#create.
#
# @!attribute [rw] user_id
#   @return [Integer]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
PhoneNumberCreateData = Struct.new(
  :user_id,
  :phoneNumber,
  keyword_init: true
)

# Production entity data model.
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] errorCode
#   @return [Object, nil]
#
# @!attribute [rw] kioskId
#   @return [Object, nil]
#
# @!attribute [rw] occurredAt
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Production = Struct.new(
  :description,
  :errorCode,
  :kioskId,
  :occurredAt,
  :status,
  keyword_init: true
)

# Request payload for Production#load.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
ProductionLoadMatch = Struct.new(
  :card_token,
  :profile_id,
  keyword_init: true
)

# Request payload for Production#update.
#
# @!attribute [rw] card_token
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] kioskId
#   @return [Object, nil]
ProductionUpdateData = Struct.new(
  :card_token,
  :profile_id,
  :kioskId,
  keyword_init: true
)

# Profile entity data model.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] avatar
#   @return [String, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currentState
#   @return [String, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] fullName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] preferredName
#   @return [String, nil]
#
# @!attribute [rw] publicId
#   @return [String, nil]
#
# @!attribute [rw] secondaryAddresses
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
Profile = Struct.new(
  :address,
  :avatar,
  :contactDetails,
  :createdAt,
  :currentState,
  :dateOfBirth,
  :email,
  :firstName,
  :fullName,
  :id,
  :lastName,
  :phoneNumber,
  :preferredName,
  :publicId,
  :secondaryAddresses,
  :type,
  :updatedAt,
  :userId,
  keyword_init: true
)

# Request payload for Profile#load.
#
# @!attribute [rw] id
#   @return [Integer]
ProfileLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Profile#list.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] avatar
#   @return [String, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currentState
#   @return [String, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] fullName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] preferredName
#   @return [String, nil]
#
# @!attribute [rw] publicId
#   @return [String, nil]
#
# @!attribute [rw] secondaryAddresses
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
ProfileListMatch = Struct.new(
  :address,
  :avatar,
  :contactDetails,
  :createdAt,
  :currentState,
  :dateOfBirth,
  :email,
  :firstName,
  :fullName,
  :id,
  :lastName,
  :phoneNumber,
  :preferredName,
  :publicId,
  :secondaryAddresses,
  :type,
  :updatedAt,
  :userId,
  keyword_init: true
)

# Request payload for Profile#create.
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] avatar
#   @return [String, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currentState
#   @return [String, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] fullName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
#
# @!attribute [rw] phoneNumber
#   @return [String, nil]
#
# @!attribute [rw] preferredName
#   @return [String, nil]
#
# @!attribute [rw] publicId
#   @return [String, nil]
#
# @!attribute [rw] secondaryAddresses
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [Integer, nil]
#
# @!attribute [rw] birthCity
#   @return [Object, nil]
#
# @!attribute [rw] birthCountry
#   @return [Object, nil]
#
# @!attribute [rw] employerCity
#   @return [Object, nil]
#
# @!attribute [rw] employerCountry
#   @return [Object, nil]
#
# @!attribute [rw] employerName
#   @return [Object, nil]
#
# @!attribute [rw] expiryDate
#   @return [Object, nil]
#
# @!attribute [rw] externalCustomerId
#   @return [Object, nil]
#
# @!attribute [rw] firstNameInKana
#   @return [Object, nil]
#
# @!attribute [rw] issueDate
#   @return [Object, nil]
#
# @!attribute [rw] issuerCountry
#   @return [Object, nil]
#
# @!attribute [rw] issuerState
#   @return [Object, nil]
#
# @!attribute [rw] lastNameInKana
#   @return [Object, nil]
#
# @!attribute [rw] nationality
#   @return [Object, nil]
#
# @!attribute [rw] occupations
#   @return [Object, nil]
#
# @!attribute [rw] recipientId
#   @return [Object, nil]
#
# @!attribute [rw] uniqueIdentifier
#   @return [Object, nil]
ProfileCreateData = Struct.new(
  :address,
  :avatar,
  :contactDetails,
  :createdAt,
  :currentState,
  :dateOfBirth,
  :email,
  :firstName,
  :fullName,
  :id,
  :lastName,
  :phoneNumber,
  :preferredName,
  :publicId,
  :secondaryAddresses,
  :type,
  :updatedAt,
  :userId,
  :birthCity,
  :birthCountry,
  :employerCity,
  :employerCountry,
  :employerName,
  :expiryDate,
  :externalCustomerId,
  :firstNameInKana,
  :issueDate,
  :issuerCountry,
  :issuerState,
  :lastNameInKana,
  :nationality,
  :occupations,
  :recipientId,
  :uniqueIdentifier,
  keyword_init: true
)

# Request payload for Profile#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] address
#   @return [Hash, nil]
#
# @!attribute [rw] contactDetails
#   @return [Hash, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] firstName
#   @return [String, nil]
#
# @!attribute [rw] lastName
#   @return [String, nil]
#
# @!attribute [rw] preferredName
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] actorEmail
#   @return [Object, nil]
#
# @!attribute [rw] clientId
#   @return [Object, nil]
#
# @!attribute [rw] expiryDate
#   @return [Object, nil]
#
# @!attribute [rw] externalCustomerId
#   @return [Object, nil]
#
# @!attribute [rw] firstNameInKana
#   @return [Object, nil]
#
# @!attribute [rw] issueDate
#   @return [Object, nil]
#
# @!attribute [rw] issuerCountry
#   @return [Object, nil]
#
# @!attribute [rw] issuerState
#   @return [Object, nil]
#
# @!attribute [rw] lastNameInKana
#   @return [Object, nil]
#
# @!attribute [rw] localizedInformation
#   @return [Object, nil]
#
# @!attribute [rw] nationality
#   @return [Object, nil]
#
# @!attribute [rw] occupations
#   @return [Object, nil]
#
# @!attribute [rw] placeOfBirth
#   @return [Object, nil]
#
# @!attribute [rw] sex
#   @return [Object, nil]
#
# @!attribute [rw] uniqueIdentifier
#   @return [Object, nil]
#
# @!attribute [rw] updateContext
#   @return [Object, nil]
ProfileUpdateData = Struct.new(
  :id,
  :address,
  :contactDetails,
  :dateOfBirth,
  :firstName,
  :lastName,
  :preferredName,
  :type,
  :actorEmail,
  :clientId,
  :expiryDate,
  :externalCustomerId,
  :firstNameInKana,
  :issueDate,
  :issuerCountry,
  :issuerState,
  :lastNameInKana,
  :localizedInformation,
  :nationality,
  :occupations,
  :placeOfBirth,
  :sex,
  :uniqueIdentifier,
  :updateContext,
  keyword_init: true
)

# Request payload for Profile#remove.
#
# @!attribute [rw] id
#   @return [Integer]
ProfileRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Quote entity data model.
#
# @!attribute [rw] createdTime
#   @return [String, nil]
#
# @!attribute [rw] creationContext
#   @return [Hash, nil]
#
# @!attribute [rw] expirationTime
#   @return [String, nil]
#
# @!attribute [rw] guaranteedTargetAmount
#   @return [Boolean, nil]
#
# @!attribute [rw] guaranteedTargetAmountAllowed
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] notices
#   @return [Array, nil]
#
# @!attribute [rw] payOut
#   @return [String, nil]
#
# @!attribute [rw] paymentMetadata
#   @return [Hash, nil]
#
# @!attribute [rw] paymentOptions
#   @return [Array, nil]
#
# @!attribute [rw] preferredPayIn
#   @return [String, nil]
#
# @!attribute [rw] pricingConfiguration
#   @return [Hash, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] providedAmountType
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] rateExpirationTime
#   @return [String, nil]
#
# @!attribute [rw] rateType
#   @return [String, nil]
#
# @!attribute [rw] sourceAmount
#   @return [Float, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetAmount
#   @return [Float, nil]
#
# @!attribute [rw] targetAmountAllowed
#   @return [Boolean, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Integer, nil]
Quote = Struct.new(
  :createdTime,
  :creationContext,
  :expirationTime,
  :guaranteedTargetAmount,
  :guaranteedTargetAmountAllowed,
  :id,
  :notices,
  :payOut,
  :paymentMetadata,
  :paymentOptions,
  :preferredPayIn,
  :pricingConfiguration,
  :profile,
  :providedAmountType,
  :rate,
  :rateExpirationTime,
  :rateType,
  :sourceAmount,
  :sourceCurrency,
  :status,
  :targetAccount,
  :targetAmount,
  :targetAmountAllowed,
  :targetCurrency,
  :user,
  keyword_init: true
)

# Request payload for Quote#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
QuoteLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for Quote#create.
#
# @!attribute [rw] creationContext
#   @return [Hash, nil]
#
# @!attribute [rw] payOut
#   @return [String, nil]
#
# @!attribute [rw] paymentMetadata
#   @return [Hash, nil]
#
# @!attribute [rw] preferredPayIn
#   @return [String, nil]
#
# @!attribute [rw] pricingConfiguration
#   @return [Hash, nil]
#
# @!attribute [rw] sourceAmount
#   @return [Float, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetAmount
#   @return [Float, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String]
QuoteCreateData = Struct.new(
  :creationContext,
  :payOut,
  :paymentMetadata,
  :preferredPayIn,
  :pricingConfiguration,
  :sourceAmount,
  :sourceCurrency,
  :targetAccount,
  :targetAmount,
  :targetCurrency,
  keyword_init: true
)

# Request payload for Quote#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] payOut
#   @return [String, nil]
#
# @!attribute [rw] paymentMetadata
#   @return [Hash, nil]
#
# @!attribute [rw] pricingConfiguration
#   @return [Hash, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
QuoteUpdateData = Struct.new(
  :id,
  :profile_id,
  :payOut,
  :paymentMetadata,
  :pricingConfiguration,
  :targetAccount,
  keyword_init: true
)

# Rate entity data model.
#
# @!attribute [rw] rate
#   @return [Float]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] target
#   @return [String]
#
# @!attribute [rw] time
#   @return [String]
Rate = Struct.new(
  :rate,
  :source,
  :target,
  :time,
  keyword_init: true
)

# Request payload for Rate#list.
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] target
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
RateListMatch = Struct.new(
  :from,
  :group,
  :source,
  :target,
  :time,
  :to,
  keyword_init: true
)

# Recipient entity data model.
#
# @!attribute [rw] acceptedOutcomes
#   @return [Boolean]
#
# @!attribute [rw] accountHolderName
#   @return [String, nil]
#
# @!attribute [rw] accountId
#   @return [Integer, nil]
#
# @!attribute [rw] accountSummary
#   @return [String, nil]
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] commonFieldMap
#   @return [Hash, nil]
#
# @!attribute [rw] confirmations
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] creatorId
#   @return [Integer, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] displayFields
#   @return [Array, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] isInternal
#   @return [Boolean, nil]
#
# @!attribute [rw] legalEntityType
#   @return [String, nil]
#
# @!attribute [rw] longAccountSummary
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] ownedByCustomer
#   @return [Boolean, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] quoteId
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] ultimateBeneficiary
#   @return [Object]
Recipient = Struct.new(
  :acceptedOutcomes,
  :accountHolderName,
  :accountId,
  :accountSummary,
  :active,
  :commonFieldMap,
  :confirmations,
  :country,
  :creatorId,
  :currency,
  :details,
  :displayFields,
  :hash,
  :id,
  :isInternal,
  :legalEntityType,
  :longAccountSummary,
  :name,
  :ownedByCustomer,
  :profile,
  :profileId,
  :quoteId,
  :type,
  :ultimateBeneficiary,
  keyword_init: true
)

# Request payload for Recipient#load.
#
# @!attribute [rw] account_id
#   @return [Integer]
RecipientLoadMatch = Struct.new(
  :account_id,
  keyword_init: true
)

# Request payload for Recipient#list.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] creator_id
#   @return [Integer, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] owned_by_customer
#   @return [Boolean, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer, nil]
#
# @!attribute [rw] seek_position
#   @return [Object, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
RecipientListMatch = Struct.new(
  :active,
  :creator_id,
  :currency,
  :owned_by_customer,
  :profile,
  :profile_id,
  :seek_position,
  :size,
  :sort,
  :type,
  keyword_init: true
)

# Request payload for Recipient#create.
#
# @!attribute [rw] refund
#   @return [Boolean, nil]
#
# @!attribute [rw] acceptedOutcomes
#   @return [Boolean]
#
# @!attribute [rw] accountHolderName
#   @return [String, nil]
#
# @!attribute [rw] accountId
#   @return [Integer, nil]
#
# @!attribute [rw] accountSummary
#   @return [String, nil]
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] commonFieldMap
#   @return [Hash, nil]
#
# @!attribute [rw] confirmations
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] creatorId
#   @return [Integer, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] displayFields
#   @return [Array, nil]
#
# @!attribute [rw] hash
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] isInternal
#   @return [Boolean, nil]
#
# @!attribute [rw] legalEntityType
#   @return [String, nil]
#
# @!attribute [rw] longAccountSummary
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] ownedByCustomer
#   @return [Boolean, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] profileId
#   @return [Integer, nil]
#
# @!attribute [rw] quoteId
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] ultimateBeneficiary
#   @return [Object]
RecipientCreateData = Struct.new(
  :refund,
  :acceptedOutcomes,
  :accountHolderName,
  :accountId,
  :accountSummary,
  :active,
  :commonFieldMap,
  :confirmations,
  :country,
  :creatorId,
  :currency,
  :details,
  :displayFields,
  :hash,
  :id,
  :isInternal,
  :legalEntityType,
  :longAccountSummary,
  :name,
  :ownedByCustomer,
  :profile,
  :profileId,
  :quoteId,
  :type,
  :ultimateBeneficiary,
  keyword_init: true
)

# Request payload for Recipient#update.
#
# @!attribute [rw] account_id
#   @return [Integer]
#
# @!attribute [rw] quote_id
#   @return [String, nil]
#
# @!attribute [rw] acceptedOutcomes
#   @return [Boolean, nil]
RecipientUpdateData = Struct.new(
  :account_id,
  :quote_id,
  :acceptedOutcomes,
  keyword_init: true
)

# Request payload for Recipient#remove.
#
# @!attribute [rw] account_id
#   @return [Integer]
RecipientRemoveMatch = Struct.new(
  :account_id,
  keyword_init: true
)

# Rule entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] operation
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
Rule = Struct.new(
  :description,
  :id,
  :operation,
  :type,
  :values,
  keyword_init: true
)

# Request payload for Rule#list.
#
# @!attribute [rw] application_id
#   @return [String]
RuleListMatch = Struct.new(
  :application_id,
  keyword_init: true
)

# Request payload for Rule#create.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] operation
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
RuleCreateData = Struct.new(
  :application_id,
  :description,
  :operation,
  :type,
  :values,
  keyword_init: true
)

# Saml entity data model.
#
# @!attribute [rw] RelayState
#   @return [String, nil]
#
# @!attribute [rw] SAMLResponse
#   @return [String]
Saml = Struct.new(
  :RelayState,
  :SAMLResponse,
  keyword_init: true
)

# Request payload for Saml#load.
#
# @!attribute [rw] registration_id
#   @return [String]
SamlLoadMatch = Struct.new(
  :registration_id,
  keyword_init: true
)

# Request payload for Saml#create.
#
# @!attribute [rw] RelayState
#   @return [String, nil]
#
# @!attribute [rw] SAMLResponse
#   @return [String]
SamlCreateData = Struct.new(
  :RelayState,
  :SAMLResponse,
  keyword_init: true
)

# ScaDeviceFingerprint entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] deviceFingerprintId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
ScaDeviceFingerprint = Struct.new(
  :createdAt,
  :deviceFingerprintId,
  :id,
  keyword_init: true
)

# Request payload for ScaDeviceFingerprint#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
ScaDeviceFingerprintCreateData = Struct.new(
  :profile_id,
  keyword_init: true
)

# Request payload for ScaDeviceFingerprint#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
ScaDeviceFingerprintRemoveMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# ScaFacemap entity data model.
#
# @!attribute [rw] faceMap
#   @return [String, nil]
ScaFacemap = Struct.new(
  :faceMap,
  keyword_init: true
)

# Request payload for ScaFacemap#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] faceMap
#   @return [String, nil]
ScaFacemapCreateData = Struct.new(
  :profile_id,
  :faceMap,
  keyword_init: true
)

# Request payload for ScaFacemap#remove.
#
# @!attribute [rw] profile_id
#   @return [Integer]
ScaFacemapRemoveMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# ScaOtp entity data model.
class ScaOtp
end

# Request payload for ScaOtp#create.
class ScaOtpCreateData
end

# Request payload for ScaOtp#remove.
#
# @!attribute [rw] phone_number_id
#   @return [Integer]
#
# @!attribute [rw] user_id
#   @return [Integer]
ScaOtpRemoveMatch = Struct.new(
  :phone_number_id,
  :user_id,
  keyword_init: true
)

# ScaSession entity data model.
class ScaSession
end

# Request payload for ScaSession#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
ScaSessionCreateData = Struct.new(
  :profile_id,
  keyword_init: true
)

# SettlementAllocation entity data model.
#
# @!attribute [rw] command
#   @return [Hash]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] expectedTotalAmount
#   @return [Float, nil]
#
# @!attribute [rw] file
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] nextPageToken
#   @return [String, nil]
#
# @!attribute [rw] paymentIntents
#   @return [Array, nil]
#
# @!attribute [rw] paymentReference
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
SettlementAllocation = Struct.new(
  :command,
  :createdAt,
  :currency,
  :expectedTotalAmount,
  :file,
  :id,
  :nextPageToken,
  :paymentIntents,
  :paymentReference,
  :state,
  :updatedAt,
  keyword_init: true
)

# Request payload for SettlementAllocation#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] include_payment_intent
#   @return [Boolean, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] page_token
#   @return [String, nil]
SettlementAllocationLoadMatch = Struct.new(
  :id,
  :include_payment_intent,
  :page_size,
  :page_token,
  keyword_init: true
)

# Request payload for SettlementAllocation#create.
#
# @!attribute [rw] command
#   @return [Hash]
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] expectedTotalAmount
#   @return [Float]
#
# @!attribute [rw] file
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] nextPageToken
#   @return [String, nil]
#
# @!attribute [rw] paymentIntents
#   @return [Array, nil]
#
# @!attribute [rw] paymentReference
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String]
SettlementAllocationCreateData = Struct.new(
  :command,
  :createdAt,
  :currency,
  :expectedTotalAmount,
  :file,
  :id,
  :nextPageToken,
  :paymentIntents,
  :paymentReference,
  :state,
  :updatedAt,
  keyword_init: true
)

# Simulation entity data model.
#
# @!attribute [rw] business
#   @return [String, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] creationTime
#   @return [Float, nil]
#
# @!attribute [rw] description
#   @return [Object, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] failure_reason_code
#   @return [String, nil]
#
# @!attribute [rw] hasActiveIssues
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Integer, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] sourceAccount
#   @return [String, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] sourceValue
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
#
# @!attribute [rw] targetValue
#   @return [Float, nil]
#
# @!attribute [rw] transactionId
#   @return [Integer, nil]
#
# @!attribute [rw] transferRequest
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Integer, nil]
#
# @!attribute [rw] wise_id
#   @return [Integer, nil]
Simulation = Struct.new(
  :business,
  :created,
  :creationTime,
  :description,
  :details,
  :failure_reason_code,
  :hasActiveIssues,
  :id,
  :key,
  :quote,
  :rate,
  :reference,
  :sourceAccount,
  :sourceCurrency,
  :sourceValue,
  :state,
  :status,
  :targetAccount,
  :targetCurrency,
  :targetValue,
  :transactionId,
  :transferRequest,
  :user,
  :wise_id,
  keyword_init: true
)

# Request payload for Simulation#load.
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] transfer_id
#   @return [Integer]
SimulationLoadMatch = Struct.new(
  :status,
  :transfer_id,
  keyword_init: true
)

# Request payload for Simulation#list.
#
# @!attribute [rw] card_token
#   @return [String, nil]
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] kyc_review_id
#   @return [String, nil]
SimulationListMatch = Struct.new(
  :card_token,
  :profile_id,
  :limit,
  :kyc_review_id,
  keyword_init: true
)

# Request payload for Simulation#create.
#
# @!attribute [rw] transfer_id
#   @return [Integer]
#
# @!attribute [rw] failure_reason_code
#   @return [String, nil]
SimulationCreateData = Struct.new(
  :transfer_id,
  :failure_reason_code,
  keyword_init: true
)

# SpendControl entity data model.
#
# @!attribute [rw] ruleId
#   @return [Integer, nil]
SpendControl = Struct.new(
  :ruleId,
  keyword_init: true
)

# Request payload for SpendControl#list.
#
# @!attribute [rw] application_id
#   @return [String]
SpendControlListMatch = Struct.new(
  :application_id,
  keyword_init: true
)

# Request payload for SpendControl#create.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] ruleId
#   @return [Integer, nil]
SpendControlCreateData = Struct.new(
  :application_id,
  :ruleId,
  keyword_init: true
)

# Request payload for SpendControl#remove.
#
# @!attribute [rw] application_id
#   @return [String]
#
# @!attribute [rw] rule_id
#   @return [Integer]
SpendControlRemoveMatch = Struct.new(
  :application_id,
  :rule_id,
  keyword_init: true
)

# SpendLimit entity data model.
#
# @!attribute [rw] aggregateWindow
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
SpendLimit = Struct.new(
  :aggregateWindow,
  :id,
  :type,
  keyword_init: true
)

# Request payload for SpendLimit#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
SpendLimitListMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# Request payload for SpendLimit#update.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] aggregateWindow
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
SpendLimitUpdateData = Struct.new(
  :profile_id,
  :aggregateWindow,
  :type,
  keyword_init: true
)

# Request payload for SpendLimit#remove.
#
# @!attribute [rw] card_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer]
SpendLimitRemoveMatch = Struct.new(
  :card_id,
  :id,
  :profile_id,
  keyword_init: true
)

# Subscription entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] created_by
#   @return [Hash, nil]
#
# @!attribute [rw] delivery
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] scope
#   @return [Hash, nil]
#
# @!attribute [rw] trigger_on
#   @return [String, nil]
Subscription = Struct.new(
  :created_at,
  :created_by,
  :delivery,
  :id,
  :name,
  :scope,
  :trigger_on,
  keyword_init: true
)

# Request payload for Subscription#load.
#
# @!attribute [rw] client_key
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer, nil]
SubscriptionLoadMatch = Struct.new(
  :client_key,
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for Subscription#list.
#
# @!attribute [rw] client_key
#   @return [String]
SubscriptionListMatch = Struct.new(
  :client_key,
  keyword_init: true
)

# Request payload for Subscription#create.
#
# @!attribute [rw] client_key
#   @return [String]
#
# @!attribute [rw] delivery
#   @return [Hash]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] trigger_on
#   @return [String]
SubscriptionCreateData = Struct.new(
  :client_key,
  :delivery,
  :name,
  :trigger_on,
  keyword_init: true
)

# Request payload for Subscription#remove.
#
# @!attribute [rw] client_key
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] profile_id
#   @return [Integer, nil]
SubscriptionRemoveMatch = Struct.new(
  :client_key,
  :id,
  :profile_id,
  keyword_init: true
)

# TestNotification entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] delivery_id
#   @return [String, nil]
TestNotification = Struct.new(
  :created_at,
  :delivery_id,
  keyword_init: true
)

# Request payload for TestNotification#create.
#
# @!attribute [rw] client_key
#   @return [String]
#
# @!attribute [rw] subscription_id
#   @return [String]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] delivery_id
#   @return [String, nil]
TestNotificationCreateData = Struct.new(
  :client_key,
  :subscription_id,
  :created_at,
  :delivery_id,
  keyword_init: true
)

# ThirdPartyTransfer entity data model.
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] hasActiveIssues
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] originalTransferId
#   @return [String, nil]
#
# @!attribute [rw] originator
#   @return [Hash, nil]
#
# @!attribute [rw] quote
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] sourceAccount
#   @return [Integer, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] sourceValue
#   @return [Float, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
#
# @!attribute [rw] targetValue
#   @return [Float, nil]
#
# @!attribute [rw] user
#   @return [Integer, nil]
ThirdPartyTransfer = Struct.new(
  :created,
  :details,
  :hasActiveIssues,
  :id,
  :originalTransferId,
  :originator,
  :quote,
  :rate,
  :sourceAccount,
  :sourceCurrency,
  :sourceValue,
  :status,
  :targetAccount,
  :targetCurrency,
  :targetValue,
  :user,
  keyword_init: true
)

# Request payload for ThirdPartyTransfer#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] profile_id
#   @return [Integer]
ThirdPartyTransferLoadMatch = Struct.new(
  :id,
  :profile_id,
  keyword_init: true
)

# Request payload for ThirdPartyTransfer#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] details
#   @return [Hash]
#
# @!attribute [rw] originalTransferId
#   @return [String]
#
# @!attribute [rw] originator
#   @return [Hash]
#
# @!attribute [rw] quote
#   @return [String]
#
# @!attribute [rw] sourceAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer]
ThirdPartyTransferCreateData = Struct.new(
  :profile_id,
  :details,
  :originalTransferId,
  :originator,
  :quote,
  :sourceAccount,
  :targetAccount,
  keyword_init: true
)

# ThreeDSecure entity data model.
#
# @!attribute [rw] challengeStatus
#   @return [String]
#
# @!attribute [rw] transactionReference
#   @return [String]
ThreeDSecure = Struct.new(
  :challengeStatus,
  :transactionReference,
  keyword_init: true
)

# Request payload for ThreeDSecure#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] challengeStatus
#   @return [String]
#
# @!attribute [rw] transactionReference
#   @return [String]
ThreeDSecureCreateData = Struct.new(
  :profile_id,
  :challengeStatus,
  :transactionReference,
  keyword_init: true
)

# Token entity data model.
#
# @!attribute [rw] access_token
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] refresh_token_expires_at
#   @return [String, nil]
#
# @!attribute [rw] refresh_token_expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] token_type
#   @return [String, nil]
Token = Struct.new(
  :access_token,
  :created_at,
  :expires_at,
  :expires_in,
  :refresh_token,
  :refresh_token_expires_at,
  :refresh_token_expires_in,
  :scope,
  :token_type,
  keyword_init: true
)

# Request payload for Token#create.
#
# @!attribute [rw] access_token
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] refresh_token_expires_at
#   @return [String, nil]
#
# @!attribute [rw] refresh_token_expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] token_type
#   @return [String, nil]
TokenCreateData = Struct.new(
  :access_token,
  :created_at,
  :expires_at,
  :expires_in,
  :refresh_token,
  :refresh_token_expires_at,
  :refresh_token_expires_in,
  :scope,
  :token_type,
  keyword_init: true
)

# Transfer entity data model.
#
# @!attribute [rw] business
#   @return [Object, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] customerTransactionId
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] hasActiveIssues
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] payinSessionId
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Object, nil]
#
# @!attribute [rw] quoteUuid
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] sourceAccount
#   @return [Object, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] sourceValue
#   @return [Float, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
#
# @!attribute [rw] targetValue
#   @return [Float, nil]
#
# @!attribute [rw] transferRequest
#   @return [Object, nil]
#
# @!attribute [rw] user
#   @return [Integer, nil]
Transfer = Struct.new(
  :business,
  :created,
  :customerTransactionId,
  :details,
  :hasActiveIssues,
  :id,
  :payinSessionId,
  :quote,
  :quoteUuid,
  :rate,
  :reference,
  :sourceAccount,
  :sourceCurrency,
  :sourceValue,
  :status,
  :targetAccount,
  :targetCurrency,
  :targetValue,
  :transferRequest,
  :user,
  keyword_init: true
)

# Request payload for Transfer#load.
#
# @!attribute [rw] id
#   @return [Integer]
TransferLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Transfer#list.
#
# @!attribute [rw] created_date_end
#   @return [String, nil]
#
# @!attribute [rw] created_date_start
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] profile
#   @return [Integer, nil]
#
# @!attribute [rw] source_currency
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] target_currency
#   @return [String, nil]
TransferListMatch = Struct.new(
  :created_date_end,
  :created_date_start,
  :limit,
  :offset,
  :profile,
  :source_currency,
  :status,
  :target_currency,
  keyword_init: true
)

# Request payload for Transfer#create.
#
# @!attribute [rw] customerTransactionId
#   @return [String]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] quoteUuid
#   @return [String]
#
# @!attribute [rw] sourceAccount
#   @return [Object, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer]
TransferCreateData = Struct.new(
  :customerTransactionId,
  :details,
  :quoteUuid,
  :sourceAccount,
  :targetAccount,
  keyword_init: true
)

# Request payload for Transfer#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] business
#   @return [Object, nil]
#
# @!attribute [rw] created
#   @return [String, nil]
#
# @!attribute [rw] customerTransactionId
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] hasActiveIssues
#   @return [Boolean, nil]
#
# @!attribute [rw] payinSessionId
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [Object, nil]
#
# @!attribute [rw] quoteUuid
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] sourceAccount
#   @return [Object, nil]
#
# @!attribute [rw] sourceCurrency
#   @return [String, nil]
#
# @!attribute [rw] sourceValue
#   @return [Float, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] targetAccount
#   @return [Integer, nil]
#
# @!attribute [rw] targetCurrency
#   @return [String, nil]
#
# @!attribute [rw] targetValue
#   @return [Float, nil]
#
# @!attribute [rw] transferRequest
#   @return [Object, nil]
#
# @!attribute [rw] user
#   @return [Integer, nil]
TransferUpdateData = Struct.new(
  :id,
  :business,
  :created,
  :customerTransactionId,
  :details,
  :hasActiveIssues,
  :payinSessionId,
  :quote,
  :quoteUuid,
  :rate,
  :reference,
  :sourceAccount,
  :sourceCurrency,
  :sourceValue,
  :status,
  :targetAccount,
  :targetCurrency,
  :targetValue,
  :transferRequest,
  :user,
  keyword_init: true
)

# TransferRequirement entity data model.
#
# @!attribute [rw] customerTransactionId
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] originatorLegalEntityType
#   @return [String, nil]
#
# @!attribute [rw] quoteUuid
#   @return [String]
#
# @!attribute [rw] targetAccount
#   @return [Integer]
TransferRequirement = Struct.new(
  :customerTransactionId,
  :details,
  :originatorLegalEntityType,
  :quoteUuid,
  :targetAccount,
  keyword_init: true
)

# Request payload for TransferRequirement#create.
#
# @!attribute [rw] customerTransactionId
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] originatorLegalEntityType
#   @return [String, nil]
#
# @!attribute [rw] quoteUuid
#   @return [String]
#
# @!attribute [rw] targetAccount
#   @return [Integer]
TransferRequirementCreateData = Struct.new(
  :customerTransactionId,
  :details,
  :originatorLegalEntityType,
  :quoteUuid,
  :targetAccount,
  keyword_init: true
)

# Ubo entity data model.
#
# @!attribute [rw] addressFirstLine
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] countryOfResidenceIso3Code
#   @return [String, nil]
#
# @!attribute [rw] dateOfBirth
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] ownershipPercentage
#   @return [Integer, nil]
#
# @!attribute [rw] postCode
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] ubos
#   @return [Array, nil]
Ubo = Struct.new(
  :addressFirstLine,
  :city,
  :countryOfResidenceIso3Code,
  :dateOfBirth,
  :id,
  :name,
  :ownershipPercentage,
  :postCode,
  :state,
  :ubos,
  keyword_init: true
)

# Request payload for Ubo#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
UboListMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# Request payload for Ubo#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] ubos
#   @return [Array, nil]
UboCreateData = Struct.new(
  :profile_id,
  :ubos,
  keyword_init: true
)

# Request payload for Ubo#update.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] ubos
#   @return [Array, nil]
UboUpdateData = Struct.new(
  :profile_id,
  :ubos,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] details
#   @return [Object, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Object, nil]
#
# @!attribute [rw] registrationCode
#   @return [String]
User = Struct.new(
  :active,
  :details,
  :email,
  :id,
  :language,
  :name,
  :registrationCode,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [Integer]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for User#create.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] registrationCode
#   @return [String]
UserCreateData = Struct.new(
  :email,
  :language,
  :registrationCode,
  keyword_init: true
)

# Request payload for User#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] email
#   @return [String, nil]
UserUpdateData = Struct.new(
  :id,
  :email,
  keyword_init: true
)

# Verification entity data model.
#
# @!attribute [rw] required_evidences
#   @return [Array, nil]
Verification = Struct.new(
  :required_evidences,
  keyword_init: true
)

# Request payload for Verification#list.
#
# @!attribute [rw] profile_id
#   @return [Integer]
VerificationListMatch = Struct.new(
  :profile_id,
  keyword_init: true
)

# Request payload for Verification#create.
#
# @!attribute [rw] profile_id
#   @return [Integer]
#
# @!attribute [rw] accountPurpose
#   @return [Object, nil]
#
# @!attribute [rw] accountPurposeExplanation
#   @return [Object, nil]
#
# @!attribute [rw] annualIncome
#   @return [Object, nil]
#
# @!attribute [rw] businessUseCase
#   @return [Object, nil]
#
# @!attribute [rw] incomeExplanation
#   @return [Object, nil]
#
# @!attribute [rw] intendedCountries
#   @return [Object, nil]
#
# @!attribute [rw] mainSourceOfFunding
#   @return [Object, nil]
#
# @!attribute [rw] mainSourceOfIncome
#   @return [Object, nil]
#
# @!attribute [rw] monthlyAnticipatedVolume
#   @return [Object, nil]
#
# @!attribute [rw] yearlyAnticipatedVolume
#   @return [Object, nil]
VerificationCreateData = Struct.new(
  :profile_id,
  :accountPurpose,
  :accountPurposeExplanation,
  :annualIncome,
  :businessUseCase,
  :incomeExplanation,
  :intendedCountries,
  :mainSourceOfFunding,
  :mainSourceOfIncome,
  :monthlyAnticipatedVolume,
  :yearlyAnticipatedVolume,
  keyword_init: true
)

