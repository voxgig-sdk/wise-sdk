# Wise Ruby SDK



The Ruby SDK for the Wise API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AccountDetail` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wise-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/wise-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-wise-sdk", path: "./wise-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Wise_sdk"

client = WiseSDK.new({
  "apikey" => ENV["WISE_APIKEY"],
})
```

### 3. Load a balance

Balance is nested under currency, so provide the `currency`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Balance record (raises on error).
  balance = client.Balance.load({ "currency" => "example_currency", "profile_id" => 1 })
  puts balance.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  comparison = client.Comparison.load({ "source_currency" => "example", "target_currency" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = WiseSDK.test

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
comparison = client.Comparison.load({ "source_currency" => "example", "target_currency" => "example" })
puts comparison.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = WiseSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
WISE_TEST_LIVE=TRUE
WISE_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### WiseSDK

```ruby
require_relative "Wise_sdk"
client = WiseSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = WiseSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### WiseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `AccountDetail` | `(data) -> AccountDetailEntity` | Create an AccountDetail entity instance. |
| `AccountRequirement` | `(data) -> AccountRequirementEntity` | Create an AccountRequirement entity instance. |
| `Activity` | `(data) -> ActivityEntity` | Create an Activity entity instance. |
| `Address` | `(data) -> AddressEntity` | Create an Address entity instance. |
| `AddressRequirement` | `(data) -> AddressRequirementEntity` | Create an AddressRequirement entity instance. |
| `Balance` | `(data) -> BalanceEntity` | Create a Balance entity instance. |
| `BalanceStatement` | `(data) -> BalanceStatementEntity` | Create a BalanceStatement entity instance. |
| `BankAccountDetail` | `(data) -> BankAccountDetailEntity` | Create a BankAccountDetail entity instance. |
| `BankAccountDetailsOrder` | `(data) -> BankAccountDetailsOrderEntity` | Create a BankAccountDetailsOrder entity instance. |
| `BatchGroup` | `(data) -> BatchGroupEntity` | Create a BatchGroup entity instance. |
| `BulkSettlement` | `(data) -> BulkSettlementEntity` | Create a BulkSettlement entity instance. |
| `BusinessProfile` | `(data) -> BusinessProfileEntity` | Create a BusinessProfile entity instance. |
| `Card` | `(data) -> CardEntity` | Create a Card entity instance. |
| `CardHolderLimit` | `(data) -> CardHolderLimitEntity` | Create a CardHolderLimit entity instance. |
| `CardLimit` | `(data) -> CardLimitEntity` | Create a CardLimit entity instance. |
| `CardOrder` | `(data) -> CardOrderEntity` | Create a CardOrder entity instance. |
| `CardSensitiveDetail` | `(data) -> CardSensitiveDetailEntity` | Create a CardSensitiveDetail entity instance. |
| `CardTransaction` | `(data) -> CardTransactionEntity` | Create a CardTransaction entity instance. |
| `Case` | `(data) -> CaseEntity` | Create a Case entity instance. |
| `ClaimAccount` | `(data) -> ClaimAccountEntity` | Create a ClaimAccount entity instance. |
| `Comparison` | `(data) -> ComparisonEntity` | Create a Comparison entity instance. |
| `Contact` | `(data) -> ContactEntity` | Create a Contact entity instance. |
| `Currency` | `(data) -> CurrencyEntity` | Create a Currency entity instance. |
| `DeliveryEstimate` | `(data) -> DeliveryEstimateEntity` | Create a DeliveryEstimate entity instance. |
| `DeliveryUpdate` | `(data) -> DeliveryUpdateEntity` | Create a DeliveryUpdate entity instance. |
| `DigitalWallet` | `(data) -> DigitalWalletEntity` | Create a DigitalWallet entity instance. |
| `DirectDebitAccount` | `(data) -> DirectDebitAccountEntity` | Create a DirectDebitAccount entity instance. |
| `Director` | `(data) -> DirectorEntity` | Create a Director entity instance. |
| `Dispute` | `(data) -> DisputeEntity` | Create a Dispute entity instance. |
| `DisputeReason` | `(data) -> DisputeReasonEntity` | Create a DisputeReason entity instance. |
| `Facetec` | `(data) -> FacetecEntity` | Create a Facetec entity instance. |
| `File` | `(data) -> FileEntity` | Create a File entity instance. |
| `Funding` | `(data) -> FundingEntity` | Create a Funding entity instance. |
| `GpiTracking` | `(data) -> GpiTrackingEntity` | Create a GpiTracking entity instance. |
| `HoldLimitBreach` | `(data) -> HoldLimitBreachEntity` | Create a HoldLimitBreach entity instance. |
| `IncomingTransfer` | `(data) -> IncomingTransferEntity` | Create an IncomingTransfer entity instance. |
| `Jose` | `(data) -> JoseEntity` | Create a Jose entity instance. |
| `KycReview` | `(data) -> KycReviewEntity` | Create a KycReview entity instance. |
| `LinkRequest` | `(data) -> LinkRequestEntity` | Create a LinkRequest entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `MultiCurrencyAccount` | `(data) -> MultiCurrencyAccountEntity` | Create a MultiCurrencyAccount entity instance. |
| `OneTimeToken` | `(data) -> OneTimeTokenEntity` | Create an OneTimeToken entity instance. |
| `Ott` | `(data) -> OttEntity` | Create an Ott entity instance. |
| `Payin` | `(data) -> PayinEntity` | Create a Payin entity instance. |
| `PayinDepositDetail` | `(data) -> PayinDepositDetailEntity` | Create a PayinDepositDetail entity instance. |
| `Payment` | `(data) -> PaymentEntity` | Create a Payment entity instance. |
| `PaymentInitiation` | `(data) -> PaymentInitiationEntity` | Create a PaymentInitiation entity instance. |
| `PaymentInstrument` | `(data) -> PaymentInstrumentEntity` | Create a PaymentInstrument entity instance. |
| `PaymentIntent` | `(data) -> PaymentIntentEntity` | Create a PaymentIntent entity instance. |
| `PhoneNumber` | `(data) -> PhoneNumberEntity` | Create a PhoneNumber entity instance. |
| `Production` | `(data) -> ProductionEntity` | Create a Production entity instance. |
| `Profile` | `(data) -> ProfileEntity` | Create a Profile entity instance. |
| `Quote` | `(data) -> QuoteEntity` | Create a Quote entity instance. |
| `Rate` | `(data) -> RateEntity` | Create a Rate entity instance. |
| `Recipient` | `(data) -> RecipientEntity` | Create a Recipient entity instance. |
| `Rule` | `(data) -> RuleEntity` | Create a Rule entity instance. |
| `Saml` | `(data) -> SamlEntity` | Create a Saml entity instance. |
| `ScaDeviceFingerprint` | `(data) -> ScaDeviceFingerprintEntity` | Create a ScaDeviceFingerprint entity instance. |
| `ScaFacemap` | `(data) -> ScaFacemapEntity` | Create a ScaFacemap entity instance. |
| `ScaOtp` | `(data) -> ScaOtpEntity` | Create a ScaOtp entity instance. |
| `ScaSession` | `(data) -> ScaSessionEntity` | Create a ScaSession entity instance. |
| `SettlementAllocation` | `(data) -> SettlementAllocationEntity` | Create a SettlementAllocation entity instance. |
| `Simulation` | `(data) -> SimulationEntity` | Create a Simulation entity instance. |
| `SpendControl` | `(data) -> SpendControlEntity` | Create a SpendControl entity instance. |
| `SpendLimit` | `(data) -> SpendLimitEntity` | Create a SpendLimit entity instance. |
| `Subscription` | `(data) -> SubscriptionEntity` | Create a Subscription entity instance. |
| `TestNotification` | `(data) -> TestNotificationEntity` | Create a TestNotification entity instance. |
| `ThirdPartyTransfer` | `(data) -> ThirdPartyTransferEntity` | Create a ThirdPartyTransfer entity instance. |
| `ThreeDSecure` | `(data) -> ThreeDSecureEntity` | Create a ThreeDSecure entity instance. |
| `Token` | `(data) -> TokenEntity` | Create a Token entity instance. |
| `Transfer` | `(data) -> TransferEntity` | Create a Transfer entity instance. |
| `TransferRequirement` | `(data) -> TransferRequirementEntity` | Create a TransferRequirement entity instance. |
| `Ubo` | `(data) -> UboEntity` | Create an Ubo entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `Verification` | `(data) -> VerificationEntity` | Create a Verification entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`WiseError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### AccountDetail

| Field | Description |
| --- | --- |
| `accountHolderName` | Name of the account holder as it appears on the account details. |
| `accountIdentification` | Country/scheme-specific account identification. |
| `country` | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | Unique identifier for the account details. |
| `profileId` | Profile ID of the account details owner. |
| `state` | Current state of the account details. |

Operations: Load.

API path: `/balances/account-details/{id}`

#### AccountRequirement

| Field | Description |
| --- | --- |
| `accountHolderName` | Recipient full name. |
| `currency` | 3-character currency code. |
| `details` | Contains the details of the recipient account specific to its currency and type. |
| `fields` | List of UI field groups to collect required data. |
| `ownedByCustomer` | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | Personal or business profile ID of the sender. |
| `title` | Human-readable title for the requirement group. |
| `type` | Recipient account type. |
| `ultimateBeneficiary` | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | Optional usage/help text. |

Operations: Create, List.

API path: `/quotes/{quoteId}/account-requirements`

#### Activity

| Field | Description |
| --- | --- |
| `createdOn` | Timestamp when the activity was created. |
| `description` | A short description that briefly summarizes the activity. |
| `id` | Activity id. |
| `primaryAmount` | A currency formatted text that describe the primary amount of transaction. |
| `resource` | The resource associated with the activity. |
| `secondaryAmount` | A currency formatted text that describe the secondary amount of transaction. |
| `status` | Status of the Activity. |
| `title` | Title of the Activity. |
| `type` | Type of Activity. |
| `updatedOn` | Timestamp when the activity was last modified. |

Operations: List.

API path: `/profiles/{profileId}/activities`

#### Address

| Field | Description |
| --- | --- |
| `details` | Address details. |
| `id` | Address ID. |
| `profile` | User profile ID. |

Operations: Create, List, Load.

API path: `/addresses`

#### AddressRequirement

| Field | Description |
| --- | --- |
| `details` | Address details to provide context for requirements lookup. |
| `fields` | List of fields required for the address. |
| `profile` | User profile ID. |
| `type` | Always "address". |

Operations: Create, List.

API path: `/address-requirements`

#### Balance

| Field | Description |
| --- | --- |
| `amount` | Available balance that can be used to fund transfers. |
| `cashAmount` | Cash amount in the account. |
| `creationTime` | Date when the balance was created. |
| `currency` | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | Icon for the balance. |
| `id` | Balance ID. |
| `investmentState` | Investment state of the balance. |
| `modificationTime` | Date when the balance was last modified. |
| `name` | Name of the balance. |
| `overdraft` | Overdraft details for the account. |
| `reservedAmount` | Amount reserved for transactions. |
| `state` | Must be `CLOSED`. |
| `targetRecipientId` | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | Type of balance account. |
| `visible` | Whether the balance is visible to the user. |

Operations: Create, List, Load, Remove.

API path: `/profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}`

#### BalanceStatement

| Field | Description |
| --- | --- |
| `accountHolder` | Account holder information. |
| `bankDetails` | Local bank details for the account. |
| `endOfStatementBalance` | Closing balance for the specified time period. |
| `id` |  |
| `issuer` | Account issuer information. |
| `query` | Query parameters used for the request. |
| `transactions` | List of transactions in the statement period. |

Operations: Load.

API path: `/profiles/{profileId}/balance-statements/{balanceId}/statement.json`

#### BankAccountDetail

| Field | Description |
| --- | --- |
| `active` | Status of the account detail. |
| `currency` | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | Account detail ID. |
| `internationalDetails` | International bank account details. |
| `localDetails` | Local bank account details. |
| `reason` | Reason for the return. |
| `targetAccountId` | ID of the currency balance to create account details on. |

Operations: Create.

API path: `/profiles/{profileId}/account-details/payments/{paymentId}/returns`

#### BankAccountDetailsOrder

| Field | Description |
| --- | --- |
| `accountDetailsId` | Unique ID of the issued account details. |
| `balanceId` | ID of the balance the order is for. |
| `creationTime` | Timestamp of when the order was created. |
| `currency` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | Unique ID of the order. |
| `modificationTime` | Timestamp of the last modification to the order. |
| `requirements` | List of requirements to fulfill the order. |
| `status` | Order status. |

Operations: Create, List.

API path: `/profiles/{profileId}/account-details-orders`

#### BatchGroup

| Field | Description |
| --- | --- |
| `alreadyPaid` | Not applicable to this use case. |
| `fileName` | If this batch was submitted as a file, this is the given file name. |
| `groupType` | Whether this batch was submitted over the API or as a file. |
| `id` | Batch group ID. |
| `name` | Descriptive name for the batch group. |
| `payInDetails` | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | Optional ID of the payin session. |
| `profileId` | The ID of the profile this payment belongs to. |
| `shortId` | Not applicable to this use case. |
| `sourceCurrency` | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | The IDs of all transfers successfully added to the group. |
| `type` | The method of payment to use. |
| `userId` | The ID of the user who initiated this payment. |
| `version` | Batch version, used for concurrency control. |

Operations: Create, Load, Update.

API path: `/profiles/{profileId}/batch-payments/{batchGroupId}/payments`

#### BulkSettlement

| Field | Description |
| --- | --- |
| `balanceTransfer` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | Array of transfers to be settled. |
| `type` | Type of settlement. |

Operations: Create.

API path: `/settlements`

#### BusinessProfile

| Field | Description |
| --- | --- |
| `abn` | Australian Business Number (only for Australian businesses). |
| `acn` | Australian Company Number (only for Australian businesses). |
| `actorEmail` | Email of the actor. |
| `address` | Main registered address of the business. |
| `arbn` | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | Free-form description of the business activities. |
| `businessName` | Registered business name. |
| `businessNameInKatakana` | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | Business representative details. |
| `companyRole` | Role of the person managing the business profile. |
| `companyType` | Type of company. |
| `contactDetails` | Contact information for the business. |
| `createdAt` | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | Current status of this profile. |
| `descriptionOfBusiness` | Deprecated. |
| `email` | Primary email address for the business. |
| `externalCustomerId` | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | Deprecated. |
| `fullName` | Full legal name of the business. |
| `id` | Unique identifier for the profile. |
| `industryCategories` | One or more industry categories classifying the business. |
| `operationalAddresses` | An array of operational addresses for the business. |
| `publicId` | Publicly accessible identifier for the profile. |
| `registrationNumber` | Business registration number. |
| `secondLevelCategory` | Deprecated. |
| `type` | Type of profile. |
| `updatedAt` | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | The ID of the user associated with this profile. |
| `webpage` | Business website URL. |

Operations: Create, Update.

API path: `/profiles/business-profile`

#### Card

| Field | Description |
| --- | --- |
| `bankIdentificationNumber` | Bank identification number (BIN) of the card. |
| `cardHolderName` | Name of the card holder. |
| `cardProgram` | Card program details. |
| `clientId` | Client ID of the partner that issued the card. |
| `creationTime` | Time when the card was created. |
| `expiryDate` | Date when the card will expire. |
| `id` |  |
| `lastFourDigits` | Last 4 digits of the card number. |
| `modificationTime` | Time when the card was last modified. |
| `phoneNumber` | Phone number associated with the card. |
| `profileId` | Profile ID that owns this card. |
| `status` | Current status of the card. |
| `token` | Unique identifier for the card. |
| `unlockSpendingPermissions` | Method with which physical card spending permissions can be unlocked. |

Operations: Create, List, Load, Update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count`

#### CardHolderLimit

| Field | Description |
| --- | --- |
| `aggregateWindow` | The limits to set, per aggregation window. |
| `spendLimits` | Spend limits configured for this cardholder. |
| `type` | The category of spending the limit applies to. |

Operations: List, Remove, Update.

API path: `/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits`

#### CardLimit

| Field | Description |
| --- | --- |
| `daily` |  |
| `lifetime` |  |
| `monthly` |  |
| `transaction` |  |

Operations: Load, Update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/spend-limits`

#### CardOrder

| Field | Description |
| --- | --- |
| `address` | Address set during card order. |
| `cardHolderName` | Name of the card holder. |
| `cardHolderProfileId` | The cardholder profile for this card. |
| `cardProgram` | The card program associated with this card order. |
| `cardToken` | Token of the card associated with card order. |
| `city` | Card holder's city (max 30 characters). |
| `clientId` | Client ID. |
| `country` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | Time when the card order is created. |
| `deliveryDetails` | Delivery details of a physical card order. |
| `deliveryEstimate` | The estimated time when the card will be delivered. |
| `deliveryOption` | The delivery method for the card order. |
| `embossedName` | The cardholder's name to print on the card (physical card only). |
| `errors` | Collection of validation errors. |
| `firstLine` | Card holder's address (max 30 characters). |
| `id` | ID of the card order. |
| `lifetimeLimit` | Maximum amount of spending on the card once issued. |
| `modificationTime` | Time when the card order was last modified. |
| `phoneNumber` | Phone number associated with the card order. |
| `postCode` | Card holder's postal code (max 10 characters). |
| `profileId` | Profile ID. |
| `program` | The name of the card program. |
| `replacementDetails` | The replacement details for this card. |
| `replacesCard` | Token of the card being replaced by this replacement card order. |
| `secondLine` | Card holder's address (max 30 characters). |
| `state` | Card holder's state (max 30 characters). |
| `status` | Status of the card order. |
| `thirdLine` | Card holder's address (max 30 characters). |

Operations: Create, List, Load, Update.

API path: `/spend/profiles/{profileId}/card-orders`

#### CardSensitiveDetail

| Field | Description |
| --- | --- |
| `encryptedPayload` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | The RSA public key. |
| `keyVersion` | The version of the key to use. |
| `version` | Version of the encryption key. |

Operations: Create, Load.

API path: `/twcard-data/v1/sensitive-card-data/details`

#### CardTransaction

| Field | Description |
| --- | --- |
| `approvalCode` | Also called authorization code. |
| `arn` | Acquirer reference number |
| `authorisationMethod` | Authorisation method |
| `balanceChannelReferenceId` | Balance channel reference ID associated with the card transaction |
| `billingAmount` | Billing amount |
| `cardToken` | Unique identifier of the card |
| `creationTime` | When the transaction was created |
| `credits` | Array of credits. |
| `debits` | Array of debits. |
| `declineReason` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | Array of fees |
| `id` | ID of the transaction |
| `merchant` | Merchant information |
| `modificationTime` | When the transaction was last updated |
| `pinValidationResult` | PIN validation result. |
| `purgeTime` | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | Transaction amount including all fees |
| `type` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

Operations: List, Load.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/transactions`

#### Case

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp when the case was created. |
| `description` | The description of the request. |
| `details` | Details related to the case. |
| `externalId` | Partner-created identifier for this case, if applicable. |
| `id` | Unique identifier of the case. |
| `messages` | List of messages associated with this case. |
| `profileId` | The profile ID associated with this case. |
| `reference` | Reference information linking the case to a related entity. |
| `status` | The current status of the support case. |
| `subType` | The sub-type of the support case. |
| `subject` | The subject of the case. |
| `type` | The type of the support case. |
| `updatedAt` | Timestamp when the case was last updated. |

Operations: Create, Load.

API path: `/cases`

#### ClaimAccount

| Field | Description |
| --- | --- |
| `claimAccountCode` | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

Operations: Create.

API path: `/user/claim-account`

#### Comparison

| Field | Description |
| --- | --- |
| `amount` | The comparison amount |
| `amountType` | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | List of provider types included in the response |
| `providers` | List of providers with their estimated quotes |
| `sourceCountry` | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | ISO 4217 source currency code |
| `targetCountry` | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | ISO 4217 target currency code |

Operations: Load.

API path: `/comparisons`

#### Contact

| Field | Description |
| --- | --- |
| `contactId` | Contact ID in the format of UUID. |
| `identifier` | A Wise profile's identifier. |
| `name` | Full name of the contact. |
| `targetCurrency` | 3 character currency code. |

Operations: Create.

API path: `/profiles/{profileId}/contacts`

#### Currency

| Field | Description |
| --- | --- |
| `code` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | Keywords associated with this currency. |
| `name` | Display name of this currency. |
| `supportsDecimals` | Whether this currency supports decimal values or not. |
| `symbol` | The symbol of this currency. |

Operations: List.

API path: `/currencies`

#### DeliveryEstimate

| Field | Description |
| --- | --- |
| `estimatedDeliveryDate` | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | A string to display to users for the estimated delivery date. |
| `id` |  |

Operations: Load.

API path: `/delivery-estimates/{transferId}`

#### DeliveryUpdate

| Field | Description |
| --- | --- |
| `delivery_update` | The delivery signal to simulate. |
| `delivery_update_path` | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | Optional estimated delivery time. |
| `observation_id` | Server-generated observation identifier. |
| `occurred_at` | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | Payment scheme to include in the observation. |

Operations: Create.

API path: `/simulation/transfers/{transferId}/delivery-update`

#### DigitalWallet

| Field | Description |
| --- | --- |
| `activation` | Approve or decline a payment token activation |
| `paymentTokens` |  |
| `walletNames` | List of supported wallet types. |

Operations: Create.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation`

#### DirectDebitAccount

| Field | Description |
| --- | --- |
| `currency` | Currency of the bank account. |
| `details` | Bank account details |
| `id` | Direct debit account ID |
| `type` | Payment type for which the account is used. |

Operations: Create, List.

API path: `/profiles/{profileId}/direct-debit-accounts`

#### Director

| Field | Description |
| --- | --- |
| `countryOfResidenceIso3Code` | 3 character country code. |
| `dateOfBirth` | Date of birth. |
| `directors` |  |
| `firstName` | Director first name. |
| `id` | ID of the director. |
| `lastName` | Director last name. |

Operations: Create, List, Remove, Update.

API path: `/profiles/{profileId}/directors`

#### Dispute

| Field | Description |
| --- | --- |
| `canWithdraw` | Whether the dispute can be withdrawn. |
| `createdAt` | Time when the dispute was created. |
| `createdBy` | Creator of the dispute. |
| `disclaimer` | Acknowledgement fields. |
| `files` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | Form fields required to submit this dispute. |
| `id` | Unique identifier of the dispute. |
| `lastUpdatedAt` | Time when the dispute was last updated. |
| `profileId` | Profile ID. |
| `reason` | Dispute reason code. |
| `receipt` | The file to upload. |
| `status` | Dispute overall status. |
| `statusMessage` | Explanation for `subStatus`. |
| `subStatus` | Dispute detailed status. |
| `transaction` | Transaction details for the dispute. |
| `transactionId` | Card transaction ID. |

Operations: Create, List, Load, Update.

API path: `/spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}`

#### DisputeReason

| Field | Description |
| --- | --- |
| `code` | The type of reasons available for the dispute. |
| `description` | The description of the dispute reason. |
| `isFraud` | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | Whether the dispute supports multiple transactions. |
| `tooltip` | Text to display when showing the dispute form to your users. |

Operations: List.

API path: `/spend/profiles/{profileId}/dispute-form/reasons`

#### Facetec

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/facetec/public-key`

#### File

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp when the file was uploaded. |
| `file` | The file to upload. |
| `fileId` | Unique identifier of the uploaded file. |
| `fileName` | The name of the uploaded file. |
| `profileId` | The ID of the profile this file belongs to. |
| `purpose` | The purpose of the file upload. |
| `submissionData` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

Operations: Create, List.

API path: `/cases/files`

#### Funding

| Field | Description |
| --- | --- |
| `balanceTransactionId` |  |
| `status` |  |
| `type` |  |

Operations: Create.

API path: `/profiles/{profileId}/transfers/{transferId}/payments`

#### GpiTracking

| Field | Description |
| --- | --- |
| `identifier` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | The type of identifier used to look up the transfer. |
| `transactions` | The matching GPI tracking transactions. |

Operations: Create.

API path: `/gpi-tracking`

#### HoldLimitBreach

| Field | Description |
| --- | --- |
| `amount` | Amount value. |
| `closingReason` | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | Date when the hold limit breach was created. |
| `currency` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | Hold limit breach ID. |
| `profileId` | ID of the profile that owns the hold limit breach |
| `state` | Current state of the hold limit breach. |
| `updatedAt` | Date when the hold limit breach was last modified. |

Operations: List.

API path: `/profiles/{profileId}/balances/hold-limit-breach`

#### IncomingTransfer

| Field | Description |
| --- | --- |
| `accountDetailsId` | Account details ID that received the incoming transfer. |
| `amounts` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | Balance ID associated with the incoming transfer. |
| `chargeBearer` | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | Breakdown of fees applied to the incoming transfer. |
| `id` | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | Profile ID of the balance owner. |
| `scheme` | The payment scheme through which the incoming transfer was received. |
| `state` | Current state of the incoming transfer. |
| `uetr` | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | Unstructured remittance information provided by the debtor. |

Operations: Load.

API path: `/incoming-transfers/{incomingTransferId}`

#### Jose

| Field | Description |
| --- | --- |
| `keyId` | ID of the key in UUID format. |
| `keyMaterial` |  |
| `publicKeyMaterial` |  |
| `scope` | Scope of the key. |
| `validFrom` | The key is valid from this date. |
| `validTill` | The key is valid until this date. |
| `version` | Version of the public key issued. |

Operations: Create, Load.

API path: `/auth/jose/playground/jwsjwe`

#### KycReview

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp marking the creation of the KYC Review. |
| `id` | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | Aggregated state of the underlying requirement set. |
| `triggerData` | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | List of trigger reference objects. |
| `type` | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | Timestamp marking the last update of the KYC Review. |

Operations: Create, List, Load, Update.

API path: `/profiles/{profileId}/kyc-requirements/{requirementKey}`

#### LinkRequest

| Field | Description |
| --- | --- |
| `clientKey` | Client key that created the embedded link request. |
| `email` | The end user's email address, to receive dispute updates. |
| `id` | Embedded link request ID. |
| `metadata` | Flow-specific metadata. |
| `profileId` | Profile that owns the embedded flow. |
| `redirectUrl` | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | The ID of the card transaction to dispute. |
| `type` | Embedded Flow type. |

Operations: Create, Load.

API path: `/profiles/{profileId}/embedded-flows/link-requests/kyc-reviews`

#### Message

| Field | Description |
| --- | --- |
| `submissionData` | The data for the message submission. |
| `type` | The type of message submission. |

Operations: Create.

API path: `/cases/{caseId}/messages`

#### MultiCurrencyAccount

| Field | Description |
| --- | --- |

Operations: List, Load.

API path: `/borderless-accounts-configuration/profiles/{profileId}/available-currencies`

#### OneTimeToken

| Field | Description |
| --- | --- |
| `challenges` | An array of challenges. |
| `faceMap` | A base64 encoded string. |
| `oneTimeToken` | A one-time token unique identifier. |
| `validity` | The One-Time Token expiration in seconds. |

Operations: Create.

API path: `/profiles/{profileId}/device-fingerprints/verify`

#### Ott

| Field | Description |
| --- | --- |
| `actionType` | The action bound to the one time token. |
| `challenges` | Array of challenge objects. |
| `oneTimeToken` | Unique identifier of a one time token. |
| `userId` | Creator of this one time token. |
| `validity` | Seconds until the one time token becomes expired. |

Operations: Create, Load.

API path: `/one-time-token/sms/verify`

#### Payin

| Field | Description |
| --- | --- |
| `amount` |  |
| `currency` |  |
| `details` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` |  |
| `id` |  |
| `payinSessionId` |  |
| `paymentInstrumentId` |  |
| `qrCodeInBase64` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` |  |
| `status` |  |

Operations: Create.

API path: `/profiles/{profileId}/payin-sessions/{payinSessionId}/paynow`

#### PayinDepositDetail

| Field | Description |
| --- | --- |
| `payinBank` | Information about the receiving bank. |
| `payinBankAccount` | Bank account details to use to send the payment to. |
| `wiseInformation` | Information about the receiving Wise entity, the owner of the bank account. |

Operations: Load.

API path: `/profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer`

#### Payment

| Field | Description |
| --- | --- |
| `amount` | Transfer source amount |
| `currency` | Transfer source currency |
| `id` | Payment ID |
| `method` | The payment method used to pay for the transfer |
| `pricingVariant` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | Date of when payment was created |
| `timeUpdated` | Date of when payment was updated |

Operations: List.

API path: `/transfers/{transferId}/payments`

#### PaymentInitiation

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Create, Load.

API path: `/profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations`

#### PaymentInstrument

| Field | Description |
| --- | --- |
| `accountHolderName` |  |
| `accountNumber` |  |
| `accountOwnerDetails` |  |
| `accountType` |  |
| `bankCode` |  |
| `bankName` |  |
| `branchCode` |  |
| `disconnectReason` |  |
| `id` |  |
| `reference` |  |
| `status` |  |
| `type` |  |

Operations: Create, List, Load.

API path: `/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation`

#### PaymentIntent

| Field | Description |
| --- | --- |
| `allocationId` | Unique identifier of the associated settlement allocation. |
| `allocationType` | Type of allocation. |
| `createdAt` | Timestamp when the payment intent was created. |
| `fundingSource` | Source of funding for the payment. |
| `id` | Unique identifier of the payment intent. |
| `partnerEntityId` | Partner entity identifier. |
| `paymentReference` | Payment reference. |
| `profileId` | Profile identifier. |
| `reason` | Reason for the payment. |
| `recipientType` | Type of recipient. |
| `sourceAmount` | Source amount of the payment. |
| `sourceCurrency` | Source currency code (ISO 4217). |
| `state` | Current state of the payment intent. |
| `targetAmount` | Target amount of the payment. |
| `targetCurrency` | Target currency code (ISO 4217). |
| `updatedAt` | Timestamp when the payment intent was last updated. |

Operations: Load.

API path: `/settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}`

#### PhoneNumber

| Field | Description |
| --- | --- |
| `clientId` | Client ID of which this phone number belongs to. |
| `id` | ID of the phone number. |
| `phoneNumber` | A text representation of phone number. |
| `type` | Type of phone number when used in authentication. |
| `verified` | Indicator if phone number is verified. |

Operations: Create.

API path: `/application/users/{userId}/phone-numbers`

#### Production

| Field | Description |
| --- | --- |
| `description` | Detailed description of the error code. |
| `errorCode` | Code returned when card production is not successful. |
| `kioskId` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

Operations: Load, Update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/production`

#### Profile

| Field | Description |
| --- | --- |
| `address` |  |
| `avatar` |  |
| `contactDetails` |  |
| `createdAt` |  |
| `currentState` |  |
| `dateOfBirth` |  |
| `email` |  |
| `firstName` |  |
| `fullName` |  |
| `id` |  |
| `lastName` |  |
| `phoneNumber` |  |
| `preferredName` |  |
| `publicId` |  |
| `secondaryAddresses` |  |
| `type` |  |
| `updatedAt` |  |
| `userId` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/profiles/{profileId}/pin`

#### Quote

| Field | Description |
| --- | --- |
| `createdTime` | Quote created timestamp. |
| `creationContext` | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | The date and time the quote expires. |
| `guaranteedTargetAmount` | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | Indicates whether guaranteed target amount is allowed. |
| `id` | ID of this quote (GUID format). |
| `notices` | Messages to display to the user. |
| `payOut` | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | _Optional_. |
| `paymentOptions` | List of the methods available to pay for the transfer. |
| `preferredPayIn` | Preferred pay-in method. |
| `pricingConfiguration` | Allows partners to override pricing configurations on a transfer level. |
| `profile` | Personal or business profile ID. |
| `providedAmountType` | Indicates whether the quote was created as source or target. |
| `rate` | Exchange rate value used for the conversion. |
| `rateExpirationTime` | Date and time the locked rate expires. |
| `rateType` | Whether the rate is fixed or floating. |
| `sourceAmount` | Amount in source currency to send. |
| `sourceCurrency` | Source (sending) currency code. |
| `status` | Current status of the quote. |
| `targetAccount` | _Optional_. |
| `targetAmount` | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | Indicates whether target amount is allowed. |
| `targetCurrency` | Target (receive) currency code. |
| `user` | User ID that created the quote. |

Operations: Create, Load, Update.

API path: `/profiles/{profileId}/quotes`

#### Rate

| Field | Description |
| --- | --- |
| `rate` | Exchange rate value. |
| `source` | Source (send) currency code. |
| `target` | Target (receive) currency code. |
| `time` | Timestamp for exchange rate. |

Operations: List.

API path: `/rates`

#### Recipient

| Field | Description |
| --- | --- |
| `acceptedOutcomes` | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | Recipient full name. |
| `accountId` | Recipient account ID. |
| `accountSummary` | Summary of account details for ease of lookup. |
| `active` | Status of the recipient account. |
| `commonFieldMap` | Map of key lookup fields for the account. |
| `confirmations` | Contains verification results for the recipient's details. |
| `country` | 2-character country code. |
| `creatorId` | Account entity that owns the recipient account. |
| `currency` | 3-character currency code. |
| `details` | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | Account hash for tracking changes to recipient details. |
| `id` | ID of the recipient. |
| `isInternal` | Indicates whether recipient is internal. |
| `legalEntityType` | Entity type of recipient account. |
| `longAccountSummary` | Longer account details summary. |
| `name` | Recipient name details. |
| `ownedByCustomer` | Inidicates if recipient account belongs to profile owner. |
| `profile` | Personal or business profile ID of the sender. |
| `profileId` | Specific profile that owns the recipient account. |
| `quoteId` | Quote ID. |
| `type` | Recipient account type. |
| `ultimateBeneficiary` | The details for the ultimate beneficiary of this recipient. |

Operations: Create, List, Load, Remove, Update.

API path: `/accounts/{accountId}/quotes/{quoteId}/compatibility`

#### Rule

| Field | Description |
| --- | --- |
| `description` | The description of the authorisation rule. |
| `id` | The unique ID for the authorisation rule. |
| `operation` | Determines whether the transactions should be allowed or blocked. |
| `type` | The type of authorisation rule. |
| `values` | A list of values based on the `type` of rule configured. |

Operations: Create, List.

API path: `/spend/applications/{clientId}/spend-controls/rules`

#### Saml

| Field | Description |
| --- | --- |
| `RelayState` | Opaque state value. |
| `SAMLResponse` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

Operations: Create, Load.

API path: `/login/saml2/sso`

#### ScaDeviceFingerprint

| Field | Description |
| --- | --- |
| `createdAt` | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | The identifier of the device fingerprint. |
| `id` |  |

Operations: Create, Remove.

API path: `/profiles/{profileId}/device-fingerprints`

#### ScaFacemap

| Field | Description |
| --- | --- |
| `faceMap` | A base64 encoded string. |

Operations: Create, Remove.

API path: `/profiles/{profileId}/facemaps`

#### ScaOtp

| Field | Description |
| --- | --- |

Operations: Create, Remove.

API path: `/one-time-token/sms/trigger`

#### ScaSession

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/profiles/{profileId}/sca-sessions/authorise`

#### SettlementAllocation

| Field | Description |
| --- | --- |
| `command` |  |
| `createdAt` | Timestamp when the settlement allocation was created. |
| `currency` | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | Expected total amount for the allocation. |
| `file` | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | Unique identifier of the settlement allocation. |
| `nextPageToken` | Token for fetching the next page of payment intents. |
| `paymentIntents` | List of payment intents associated with the allocation. |
| `paymentReference` | Unique payment reference for the settlement allocation. |
| `state` | Current state of the settlement allocation. |
| `updatedAt` | Timestamp when the settlement allocation was last updated. |

Operations: Create, Load.

API path: `/settlement/allocations`

#### Simulation

| Field | Description |
| --- | --- |
| `business` |  |
| `created` |  |
| `creationTime` | Time when the card transaction was created. |
| `description` | Description of the KYC review item. |
| `details` |  |
| `failure_reason_code` | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` |  |
| `id` |  |
| `key` | KYC review item key. |
| `quote` |  |
| `rate` |  |
| `reference` |  |
| `sourceAccount` |  |
| `sourceCurrency` |  |
| `sourceValue` |  |
| `state` | State of the KYC review item. |
| `status` |  |
| `targetAccount` |  |
| `targetCurrency` |  |
| `targetValue` |  |
| `transactionId` | ID of the transaction. |
| `transferRequest` |  |
| `user` |  |
| `wise_id` |  |

Operations: Create, List, Load.

API path: `/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation`

#### SpendControl

| Field | Description |
| --- | --- |
| `ruleId` | The ID of the applied authorisation rule. |

Operations: Create, List, Remove.

API path: `/spend/applications/{clientId}/spend-controls/rules/apply`

#### SpendLimit

| Field | Description |
| --- | --- |
| `aggregateWindow` |  |
| `id` |  |
| `type` | The type of transaction. |

Operations: List, Remove, Update.

API path: `/spend/profiles/{profileId}/spend-limits`

#### Subscription

| Field | Description |
| --- | --- |
| `created_at` | Timestamp of when the subscription was created. |
| `created_by` |  |
| `delivery` |  |
| `id` | UUID that uniquely identifies the subscription. |
| `name` | A custom name for your webhook to ease with identification. |
| `scope` |  |
| `trigger_on` | The event type this subscription is listening for. |

Operations: Create, List, Load, Remove.

API path: `/applications/{clientKey}/subscriptions`

#### TestNotification

| Field | Description |
| --- | --- |
| `created_at` | Timestamp of when the test notification was created. |
| `delivery_id` | ID of the delivery that was queued for sending. |

Operations: Create.

API path: `/applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications`

#### ThirdPartyTransfer

| Field | Description |
| --- | --- |
| `created` | Timestamp when transfer was created. |
| `details` | Payment Details |
| `hasActiveIssues` | Are there any pending issues which stop executing the transfer? |
| `id` | Transfer ID |
| `originalTransferId` | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | Data block to capture payment originator details |
| `quote` | Quote ID |
| `rate` | Exchange rate value |
| `sourceAccount` | Refund recipient account ID |
| `sourceCurrency` | Source currency code |
| `sourceValue` | Transfer amount in source currency |
| `status` | Transfer current status. |
| `targetAccount` | Recipient account ID |
| `targetCurrency` | Target currency code |
| `targetValue` | Transfer amount in target currency |
| `user` | Your user ID |

Operations: Create, Load.

API path: `/profiles/{profileId}/third-party-transfers`

#### ThreeDSecure

| Field | Description |
| --- | --- |
| `challengeStatus` | The customer's response to the 3DS challenge. |
| `transactionReference` | Transaction reference as received in the 3DS challenge webhook event. |

Operations: Create.

API path: `/spend/profiles/{profileId}/3dsecure/challenge-result`

#### Token

| Field | Description |
| --- | --- |
| `access_token` | Access token to be used when calling the API. |
| `created_at` | Token creation time in ISO 8601 format. |
| `expires_at` | Access token expiration timestamp (UTC). |
| `expires_in` | Access token expiry time in seconds. |
| `refresh_token` | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | Refresh token expiry time in seconds. |
| `scope` | Scope of the token. |
| `token_type` | Type of the token. |

Operations: Create.

API path: `/oauth/token`

#### Transfer

| Field | Description |
| --- | --- |
| `business` | Your business profile ID |
| `created` | Timestamp when transfer was created |
| `customerTransactionId` | Unique identifier randomly generated per transfer request by the calling client |
| `details` |  |
| `hasActiveIssues` | Are there any pending issues which stop executing the transfer? |
| `id` | Transfer ID |
| `payinSessionId` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | V1 quote ID |
| `quoteUuid` | V2 quote ID |
| `rate` | Exchange rate value |
| `reference` | Deprecated, use `details.reference` instead |
| `sourceAccount` | Refund recipient account ID |
| `sourceCurrency` | Source currency code |
| `sourceValue` | Transfer amount in source currency |
| `status` | Transfer current status. |
| `targetAccount` | Recipient account ID |
| `targetCurrency` | Target currency code |
| `targetValue` | Transfer amount in target currency |
| `transferRequest` | Deprecated |
| `user` | Your user ID |

Operations: Create, List, Load, Update.

API path: `/transfers`

#### TransferRequirement

| Field | Description |
| --- | --- |
| `customerTransactionId` | Unique identifier for the transfer request |
| `details` |  |
| `originatorLegalEntityType` | Type of sender. |
| `quoteUuid` | V2 quote ID |
| `targetAccount` | Recipient account ID |

Operations: Create.

API path: `/transfer-requirements`

#### Ubo

| Field | Description |
| --- | --- |
| `addressFirstLine` | First line of address. |
| `city` | City of residential address. |
| `countryOfResidenceIso3Code` | 3 character country code. |
| `dateOfBirth` | Date of birth. |
| `id` | ID of the ultimate beneficial owner. |
| `name` | Owner full name. |
| `ownershipPercentage` | Percentage of ownership. |
| `postCode` | Address post code. |
| `state` | State or region of residential address. |
| `ubos` |  |

Operations: Create, List, Update.

API path: `/profiles/{profileId}/ubos`

#### User

| Field | Description |
| --- | --- |
| `active` | If user is active or not. |
| `details` | User details. |
| `email` | User's email. |
| `id` | User ID. |
| `language` | User default language for UI and email communication. |
| `name` | User's full name. |
| `registrationCode` | Randomly generated registration code that is unique to this user and request. |

Operations: Create, Load, Update.

API path: `/user/signup/registration_code`

#### Verification

| Field | Description |
| --- | --- |
| `required_evidences` | List of evidence types required to complete verification. |

Operations: Create, List.

API path: `/profiles/{profileId}/additional-verification/upload-evidences`



## Entities


### AccountDetail

Create an instance: `account_detail = client.AccountDetail`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `String` | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `Object` | Country/scheme-specific account identification. |
| `country` | `String` | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `Integer` | Unique identifier for the account details. |
| `profileId` | `Integer` | Profile ID of the account details owner. |
| `state` | `String` | Current state of the account details. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AccountDetail record (raises on error).
account_detail = client.AccountDetail.load({ "id" => 1 })
```


### AccountRequirement

Create an instance: `account_requirement = client.AccountRequirement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `String` | Recipient full name. |
| `currency` | `String` | 3-character currency code. |
| `details` | `Hash` | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `Array` | List of UI field groups to collect required data. |
| `ownedByCustomer` | `Boolean` | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `Integer` | Personal or business profile ID of the sender. |
| `title` | `String` | Human-readable title for the requirement group. |
| `type` | `String` | Recipient account type. |
| `ultimateBeneficiary` | `Object` | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `String` | Optional usage/help text. |

#### Example: List

```ruby
# list returns an Array of AccountRequirement entities, one per record (raises on error).
account_requirements = client.AccountRequirement.list({ "quote_id" => "example" })
account_requirements.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
account_requirement = client.AccountRequirement.create({
  "quote_id" => "example_quote_id", # String
  "ultimateBeneficiary" => {}, # Object
})
```


### Activity

Create an instance: `activity = client.Activity`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `String` | Timestamp when the activity was created. |
| `description` | `String` | A short description that briefly summarizes the activity. |
| `id` | `String` | Activity id. |
| `primaryAmount` | `String` | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `Hash` | The resource associated with the activity. |
| `secondaryAmount` | `String` | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `String` | Status of the Activity. |
| `title` | `String` | Title of the Activity. |
| `type` | `String` | Type of Activity. |
| `updatedOn` | `String` | Timestamp when the activity was last modified. |

#### Example: List

```ruby
# list returns an Array of Activity entities, one per record (raises on error).
activitys = client.Activity.list({ "profile_id" => 1 })
activitys.each { |item| puts item.data_get }
```


### Address

Create an instance: `address = client.Address`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `Hash` | Address details. |
| `id` | `Integer` | Address ID. |
| `profile` | `Integer` | User profile ID. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Address record (raises on error).
address = client.Address.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Address entities, one per record (raises on error).
addresss = client.Address.list
addresss.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
address = client.Address.create({
  "details" => {}, # Hash
  "profile" => 1, # Integer
})
```


### AddressRequirement

Create an instance: `address_requirement = client.AddressRequirement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `Hash` | Address details to provide context for requirements lookup. |
| `fields` | `Array` | List of fields required for the address. |
| `profile` | `Integer` | User profile ID. |
| `type` | `String` | Always "address". |

#### Example: List

```ruby
# list returns an Array of AddressRequirement entities, one per record (raises on error).
address_requirements = client.AddressRequirement.list
address_requirements.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
address_requirement = client.AddressRequirement.create({
  "details" => {}, # Hash
})
```


### Balance

Create an instance: `balance = client.Balance`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Hash` | Available balance that can be used to fund transfers. |
| `cashAmount` | `Hash` | Cash amount in the account. |
| `creationTime` | `String` | Date when the balance was created. |
| `currency` | `String` | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `Object` | Icon for the balance. |
| `id` | `Integer` | Balance ID. |
| `investmentState` | `String` | Investment state of the balance. |
| `modificationTime` | `String` | Date when the balance was last modified. |
| `name` | `Object` | Name of the balance. |
| `overdraft` | `Hash` | Overdraft details for the account. |
| `reservedAmount` | `Hash` | Amount reserved for transactions. |
| `state` | `String` | Must be `CLOSED`. |
| `targetRecipientId` | `Integer` | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `Hash` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `Hash` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `Hash` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `String` | Type of balance account. |
| `visible` | `Boolean` | Whether the balance is visible to the user. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Balance record (raises on error).
balance = client.Balance.load({ "id" => 1, "currency" => "currency", "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Balance entities, one per record (raises on error).
balances = client.Balance.list({ "profile_id" => 1, "type" => "example" })
balances.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
balance = client.Balance.create({
  "profile_id" => 1, # Integer
  "currency" => "example_currency", # String
  "state" => "example_state", # String
  "targetRecipientId" => 1, # Integer
  "type" => "example_type", # String
})
```


### BalanceStatement

Create an instance: `balance_statement = client.BalanceStatement`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolder` | `Hash` | Account holder information. |
| `bankDetails` | `Object` | Local bank details for the account. |
| `endOfStatementBalance` | `Hash` | Closing balance for the specified time period. |
| `id` | `String` |  |
| `issuer` | `Hash` | Account issuer information. |
| `query` | `Hash` | Query parameters used for the request. |
| `transactions` | `Array` | List of transactions in the statement period. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BalanceStatement record (raises on error).
balance_statement = client.BalanceStatement.load({ "id" => 1, "profile_id" => 1, "currency" => "currency", "interval_end" => "interval_end", "interval_start" => "interval_start" })
```


### BankAccountDetail

Create an instance: `bank_account_detail = client.BankAccountDetail`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` | Status of the account detail. |
| `currency` | `String` | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `String` | Account detail ID. |
| `internationalDetails` | `Object` | International bank account details. |
| `localDetails` | `Hash` | Local bank account details. |
| `reason` | `String` | Reason for the return. |
| `targetAccountId` | `Integer` | ID of the currency balance to create account details on. |

#### Example: Create

```ruby
bank_account_detail = client.BankAccountDetail.create({
  "profile_id" => 1, # Integer
  "targetAccountId" => 1, # Integer
})
```


### BankAccountDetailsOrder

Create an instance: `bank_account_details_order = client.BankAccountDetailsOrder`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `Integer` | Unique ID of the issued account details. |
| `balanceId` | `Object` | ID of the balance the order is for. |
| `creationTime` | `String` | Timestamp of when the order was created. |
| `currency` | `String` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `String` | Unique ID of the order. |
| `modificationTime` | `String` | Timestamp of the last modification to the order. |
| `requirements` | `Array` | List of requirements to fulfill the order. |
| `status` | `String` | Order status. |

#### Example: List

```ruby
# list returns an Array of BankAccountDetailsOrder entities, one per record (raises on error).
bank_account_details_orders = client.BankAccountDetailsOrder.list({ "profile_id" => 1, "currency" => "example" })
bank_account_details_orders.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
bank_account_details_order = client.BankAccountDetailsOrder.create({
  "profile_id" => 1, # Integer
  "currency" => "example_currency", # String
})
```


### BatchGroup

Create an instance: `batch_group = client.BatchGroup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alreadyPaid` | `Boolean` | Not applicable to this use case. |
| `fileName` | `Object` | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `String` | Whether this batch was submitted over the API or as a file. |
| `id` | `String` | Batch group ID. |
| `name` | `String` | Descriptive name for the batch group. |
| `payInDetails` | `Array` | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `Object` | Optional ID of the payin session. |
| `profileId` | `Integer` | The ID of the profile this payment belongs to. |
| `shortId` | `Integer` | Not applicable to this use case. |
| `sourceCurrency` | `String` | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `String` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `Array` | The IDs of all transfers successfully added to the group. |
| `type` | `String` | The method of payment to use. |
| `userId` | `Integer` | The ID of the user who initiated this payment. |
| `version` | `Integer` | Batch version, used for concurrency control. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BatchGroup record (raises on error).
batch_group = client.BatchGroup.load({ "id" => "batch_group_id", "profile_id" => 1 })
```

#### Example: Create

```ruby
batch_group = client.BatchGroup.create({
  "profile_id" => 1, # Integer
  "name" => "example_name", # String
  "sourceCurrency" => "example_sourceCurrency", # String
  "type" => "example_type", # String
})
```


### BulkSettlement

Create an instance: `bulk_settlement = client.BulkSettlement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransfer` | `Float` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `Array` | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `String` | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `String` | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `String` | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `Array` | Array of transfers to be settled. |
| `type` | `String` | Type of settlement. |

#### Example: Create

```ruby
bulk_settlement = client.BulkSettlement.create({
  "settlementDate" => "example_settlementDate", # String
  "settlementReference" => "example_settlementReference", # String
  "transfers" => [], # Array
  "type" => "example_type", # String
})
```


### BusinessProfile

Create an instance: `business_profile = client.BusinessProfile`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abn` | `Object` | Australian Business Number (only for Australian businesses). |
| `acn` | `Object` | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `String` | Email of the actor. |
| `address` | `Hash` | Main registered address of the business. |
| `arbn` | `Object` | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `String` | Free-form description of the business activities. |
| `businessName` | `String` | Registered business name. |
| `businessNameInKatakana` | `Object` | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `Hash` | Business representative details. |
| `companyRole` | `String` | Role of the person managing the business profile. |
| `companyType` | `String` | Type of company. |
| `contactDetails` | `Hash` | Contact information for the business. |
| `createdAt` | `String` | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `String` | Current status of this profile. |
| `descriptionOfBusiness` | `String` | Deprecated. |
| `email` | `String` | Primary email address for the business. |
| `externalCustomerId` | `String` | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `String` | Deprecated. |
| `fullName` | `String` | Full legal name of the business. |
| `id` | `Integer` | Unique identifier for the profile. |
| `industryCategories` | `Array` | One or more industry categories classifying the business. |
| `operationalAddresses` | `Array` | An array of operational addresses for the business. |
| `publicId` | `String` | Publicly accessible identifier for the profile. |
| `registrationNumber` | `String` | Business registration number. |
| `secondLevelCategory` | `String` | Deprecated. |
| `type` | `String` | Type of profile. |
| `updatedAt` | `String` | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `Integer` | The ID of the user associated with this profile. |
| `webpage` | `String` | Business website URL. |

#### Example: Create

```ruby
business_profile = client.BusinessProfile.create({
  "contactDetails" => {}, # Hash
})
```


### Card

Create an instance: `card = client.Card`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bankIdentificationNumber` | `String` | Bank identification number (BIN) of the card. |
| `cardHolderName` | `String` | Name of the card holder. |
| `cardProgram` | `Hash` | Card program details. |
| `clientId` | `String` | Client ID of the partner that issued the card. |
| `creationTime` | `String` | Time when the card was created. |
| `expiryDate` | `String` | Date when the card will expire. |
| `id` | `String` |  |
| `lastFourDigits` | `String` | Last 4 digits of the card number. |
| `modificationTime` | `String` | Time when the card was last modified. |
| `phoneNumber` | `String` | Phone number associated with the card. |
| `profileId` | `Integer` | Profile ID that owns this card. |
| `status` | `Hash` | Current status of the card. |
| `token` | `String` | Unique identifier for the card. |
| `unlockSpendingPermissions` | `String` | Method with which physical card spending permissions can be unlocked. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Card record (raises on error).
card = client.Card.load({ "id" => "card_id", "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Card entities, one per record (raises on error).
cards = client.Card.list({ "profile_id" => 1 })
cards.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
card = client.Card.create({
  "card_token" => "example_card_token", # String
  "profile_id" => 1, # Integer
})
```


### CardHolderLimit

Create an instance: `card_holder_limit = client.CardHolderLimit`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `Hash` | The limits to set, per aggregation window. |
| `spendLimits` | `Array` | Spend limits configured for this cardholder. |
| `type` | `String` | The category of spending the limit applies to. |

#### Example: List

```ruby
# list returns an Array of CardHolderLimit entities, one per record (raises on error).
card_holder_limits = client.CardHolderLimit.list({ "card_holder_profile_id" => 1, "profile_id" => 1 })
card_holder_limits.each { |item| puts item.data_get }
```


### CardLimit

Create an instance: `card_limit = client.CardLimit`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `Object` |  |
| `lifetime` | `Object` |  |
| `monthly` | `Object` |  |
| `transaction` | `Object` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CardLimit record (raises on error).
card_limit = client.CardLimit.load({ "card_token" => "card_token", "profile_id" => 1 })
```


### CardOrder

Create an instance: `card_order = client.CardOrder`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `Hash` | Address set during card order. |
| `cardHolderName` | `String` | Name of the card holder. |
| `cardHolderProfileId` | `Integer` | The cardholder profile for this card. |
| `cardProgram` | `Hash` | The card program associated with this card order. |
| `cardToken` | `Object` | Token of the card associated with card order. |
| `city` | `String` | Card holder's city (max 30 characters). |
| `clientId` | `String` | Client ID. |
| `country` | `String` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `String` | Time when the card order is created. |
| `deliveryDetails` | `Hash` | Delivery details of a physical card order. |
| `deliveryEstimate` | `String` | The estimated time when the card will be delivered. |
| `deliveryOption` | `String` | The delivery method for the card order. |
| `embossedName` | `String` | The cardholder's name to print on the card (physical card only). |
| `errors` | `Array` | Collection of validation errors. |
| `firstLine` | `String` | Card holder's address (max 30 characters). |
| `id` | `Integer` | ID of the card order. |
| `lifetimeLimit` | `Object` | Maximum amount of spending on the card once issued. |
| `modificationTime` | `String` | Time when the card order was last modified. |
| `phoneNumber` | `String` | Phone number associated with the card order. |
| `postCode` | `String` | Card holder's postal code (max 10 characters). |
| `profileId` | `Integer` | Profile ID. |
| `program` | `String` | The name of the card program. |
| `replacementDetails` | `Hash` | The replacement details for this card. |
| `replacesCard` | `Object` | Token of the card being replaced by this replacement card order. |
| `secondLine` | `Object` | Card holder's address (max 30 characters). |
| `state` | `Object` | Card holder's state (max 30 characters). |
| `status` | `String` | Status of the card order. |
| `thirdLine` | `Object` | Card holder's address (max 30 characters). |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CardOrder record (raises on error).
card_order = client.CardOrder.load({ "id" => 1, "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of CardOrder entities, one per record (raises on error).
card_orders = client.CardOrder.list({ "profile_id" => 1 })
card_orders.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
card_order = client.CardOrder.create({
  "cardHolderName" => "example_cardHolderName", # String
  "program" => "example_program", # String
})
```


### CardSensitiveDetail

Create an instance: `card_sensitive_detail = client.CardSensitiveDetail`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `encryptedPayload` | `String` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `String` | The RSA public key. |
| `keyVersion` | `Integer` | The version of the key to use. |
| `version` | `Integer` | Version of the encryption key. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CardSensitiveDetail record (raises on error).
card_sensitive_detail = client.CardSensitiveDetail.load()
```

#### Example: Create

```ruby
card_sensitive_detail = client.CardSensitiveDetail.create({
  "encryptedPayload" => "example_encryptedPayload", # String
  "keyVersion" => 1, # Integer
})
```


### CardTransaction

Create an instance: `card_transaction = client.CardTransaction`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approvalCode` | `Object` | Also called authorization code. |
| `arn` | `Object` | Acquirer reference number |
| `authorisationMethod` | `String` | Authorisation method |
| `balanceChannelReferenceId` | `Object` | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `Hash` | Billing amount |
| `cardToken` | `String` | Unique identifier of the card |
| `creationTime` | `String` | When the transaction was created |
| `credits` | `Array` | Array of credits. |
| `debits` | `Array` | Array of debits. |
| `declineReason` | `Object` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `Object` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `Array` | Array of fees |
| `id` | `Integer` | ID of the transaction |
| `merchant` | `Hash` | Merchant information |
| `modificationTime` | `String` | When the transaction was last updated |
| `pinValidationResult` | `Object` | PIN validation result. |
| `purgeTime` | `Object` | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `Object` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `String` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `Hash` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `Hash` | Transaction amount including all fees |
| `type` | `String` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the CardTransaction record (raises on error).
card_transaction = client.CardTransaction.load({ "id" => 1, "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of CardTransaction entities, one per record (raises on error).
card_transactions = client.CardTransaction.list({ "card_token" => "example", "profile_id" => 1, "from_creation_time" => "example", "to_creation_time" => "example" })
card_transactions.each { |item| puts item.data_get }
```


### Case

Create an instance: `case_ = client.Case`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` | Timestamp when the case was created. |
| `description` | `String` | The description of the request. |
| `details` | `Hash` | Details related to the case. |
| `externalId` | `String` | Partner-created identifier for this case, if applicable. |
| `id` | `Integer` | Unique identifier of the case. |
| `messages` | `Array` | List of messages associated with this case. |
| `profileId` | `Integer` | The profile ID associated with this case. |
| `reference` | `Hash` | Reference information linking the case to a related entity. |
| `status` | `String` | The current status of the support case. |
| `subType` | `String` | The sub-type of the support case. |
| `subject` | `String` | The subject of the case. |
| `type` | `String` | The type of the support case. |
| `updatedAt` | `String` | Timestamp when the case was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Case record (raises on error).
case_ = client.Case.load({ "id" => 1 })
```

#### Example: Create

```ruby
case_ = client.Case.create({
})
```


### ClaimAccount

Create an instance: `claim_account = client.ClaimAccount`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claimAccountCode` | `String` | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `String` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

#### Example: Create

```ruby
claim_account = client.ClaimAccount.create({
  "registrationCode" => "example_registrationCode", # String
})
```


### Comparison

Create an instance: `comparison = client.Comparison`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` | The comparison amount |
| `amountType` | `String` | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `Object` | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `Array` | List of provider types included in the response |
| `providers` | `Array` | List of providers with their estimated quotes |
| `sourceCountry` | `Object` | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `Object` | ISO 4217 source currency code |
| `targetCountry` | `Object` | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `Object` | ISO 4217 target currency code |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Comparison record (raises on error).
comparison = client.Comparison.load({ "source_currency" => "source_currency", "target_currency" => "target_currency" })
```


### Contact

Create an instance: `contact = client.Contact`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contactId` | `String` | Contact ID in the format of UUID. |
| `identifier` | `String` | A Wise profile's identifier. |
| `name` | `String` | Full name of the contact. |
| `targetCurrency` | `String` | 3 character currency code. |

#### Example: Create

```ruby
contact = client.Contact.create({
  "profile_id" => 1, # Integer
  "is_direct_identifier_creation" => true, # Boolean
})
```


### Currency

Create an instance: `currency = client.Currency`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `Array` | Keywords associated with this currency. |
| `name` | `String` | Display name of this currency. |
| `supportsDecimals` | `Boolean` | Whether this currency supports decimal values or not. |
| `symbol` | `String` | The symbol of this currency. |

#### Example: List

```ruby
# list returns an Array of Currency entities, one per record (raises on error).
currencys = client.Currency.list
currencys.each { |item| puts item.data_get }
```


### DeliveryEstimate

Create an instance: `delivery_estimate = client.DeliveryEstimate`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `estimatedDeliveryDate` | `String` | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `String` | A string to display to users for the estimated delivery date. |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DeliveryEstimate record (raises on error).
delivery_estimate = client.DeliveryEstimate.load({ "id" => 1 })
```


### DeliveryUpdate

Create an instance: `delivery_update = client.DeliveryUpdate`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery_update` | `String` | The delivery signal to simulate. |
| `delivery_update_path` | `Array` | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `Object` | Optional estimated delivery time. |
| `observation_id` | `String` | Server-generated observation identifier. |
| `occurred_at` | `String` | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `Object` | Payment scheme to include in the observation. |

#### Example: Create

```ruby
delivery_update = client.DeliveryUpdate.create({
  "transfer_id" => 1, # Integer
  "delivery_update" => "example_delivery_update", # String
  "delivery_update_path" => [], # Array
})
```


### DigitalWallet

Create an instance: `digital_wallet = client.DigitalWallet`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation` | `String` | Approve or decline a payment token activation |
| `paymentTokens` | `Array` |  |
| `walletNames` | `Array` | List of supported wallet types. |

#### Example: Create

```ruby
digital_wallet = client.DigitalWallet.create({
  "card_token" => "example_card_token", # String
  "profile_id" => 1, # Integer
  "activation" => "example_activation", # String
})
```


### DirectDebitAccount

Create an instance: `direct_debit_account = client.DirectDebitAccount`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `String` | Currency of the bank account. |
| `details` | `Hash` | Bank account details |
| `id` | `Integer` | Direct debit account ID |
| `type` | `String` | Payment type for which the account is used. |

#### Example: List

```ruby
# list returns an Array of DirectDebitAccount entities, one per record (raises on error).
direct_debit_accounts = client.DirectDebitAccount.list({ "profile_id" => 1, "currency" => "example", "type" => "example" })
direct_debit_accounts.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
direct_debit_account = client.DirectDebitAccount.create({
  "profile_id" => 1, # Integer
})
```


### Director

Create an instance: `director = client.Director`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryOfResidenceIso3Code` | `String` | 3 character country code. |
| `dateOfBirth` | `String` | Date of birth. |
| `directors` | `Array` |  |
| `firstName` | `String` | Director first name. |
| `id` | `Integer` | ID of the director. |
| `lastName` | `String` | Director last name. |

#### Example: List

```ruby
# list returns an Array of Director entities, one per record (raises on error).
directors = client.Director.list({ "profile_id" => 1 })
directors.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
director = client.Director.create({
  "profile_id" => 1, # Integer
})
```


### Dispute

Create an instance: `dispute = client.Dispute`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canWithdraw` | `Boolean` | Whether the dispute can be withdrawn. |
| `createdAt` | `String` | Time when the dispute was created. |
| `createdBy` | `String` | Creator of the dispute. |
| `disclaimer` | `Hash` | Acknowledgement fields. |
| `files` | `Hash` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `Hash` | Form fields required to submit this dispute. |
| `id` | `String` | Unique identifier of the dispute. |
| `lastUpdatedAt` | `String` | Time when the dispute was last updated. |
| `profileId` | `Integer` | Profile ID. |
| `reason` | `String` | Dispute reason code. |
| `receipt` | `String` | The file to upload. |
| `status` | `String` | Dispute overall status. |
| `statusMessage` | `String` | Explanation for `subStatus`. |
| `subStatus` | `String` | Dispute detailed status. |
| `transaction` | `Hash` | Transaction details for the dispute. |
| `transactionId` | `Integer` | Card transaction ID. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Dispute record (raises on error).
dispute = client.Dispute.load({ "id" => "dispute_id", "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Dispute entities, one per record (raises on error).
disputes = client.Dispute.list({ "profile_id" => 1 })
disputes.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
dispute = client.Dispute.create({
  "profile_id" => 1, # Integer
})
```


### DisputeReason

Create an instance: `dispute_reason = client.DisputeReason`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `String` | The type of reasons available for the dispute. |
| `description` | `String` | The description of the dispute reason. |
| `isFraud` | `Boolean` | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `Array` | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `Boolean` | Whether the dispute supports multiple transactions. |
| `tooltip` | `String` | Text to display when showing the dispute form to your users. |

#### Example: List

```ruby
# list returns an Array of DisputeReason entities, one per record (raises on error).
dispute_reasons = client.DisputeReason.list({ "profile_id" => 1 })
dispute_reasons.each { |item| puts item.data_get }
```


### Facetec

Create an instance: `facetec = client.Facetec`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Facetec record (raises on error).
facetec = client.Facetec.load()
```


### File

Create an instance: `file = client.File`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` | Timestamp when the file was uploaded. |
| `file` | `String` | The file to upload. |
| `fileId` | `String` | Unique identifier of the uploaded file. |
| `fileName` | `String` | The name of the uploaded file. |
| `profileId` | `Integer` | The ID of the profile this file belongs to. |
| `purpose` | `String` | The purpose of the file upload. |
| `submissionData` | `Hash` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

#### Example: List

```ruby
# list returns an Array of File entities, one per record (raises on error).
files = client.File.list
files.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
file = client.File.create({
  "createdAt" => "example_createdAt", # String
  "file" => "example_file", # String
  "fileId" => "example_fileId", # String
  "fileName" => "example_fileName", # String
  "profileId" => 1, # Integer
  "purpose" => "example_purpose", # String
  "submissionData" => {}, # Hash
})
```


### Funding

Create an instance: `funding = client.Funding`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransactionId` | `Integer` |  |
| `status` | `String` |  |
| `type` | `String` |  |

#### Example: Create

```ruby
funding = client.Funding.create({
  "profile_id" => 1, # Integer
  "transfer_id" => 1, # Integer
})
```


### GpiTracking

Create an instance: `gpi_tracking = client.GpiTracking`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `identifier` | `String` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `String` | The type of identifier used to look up the transfer. |
| `transactions` | `Array` | The matching GPI tracking transactions. |

#### Example: Create

```ruby
gpi_tracking = client.GpiTracking.create({
  "identifier" => "example_identifier", # String
  "identifierType" => "example_identifierType", # String
})
```


### HoldLimitBreach

Create an instance: `hold_limit_breach = client.HoldLimitBreach`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` | Amount value. |
| `closingReason` | `String` | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `String` | Date when the hold limit breach was created. |
| `currency` | `String` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `Integer` | Hold limit breach ID. |
| `profileId` | `Integer` | ID of the profile that owns the hold limit breach |
| `state` | `String` | Current state of the hold limit breach. |
| `updatedAt` | `String` | Date when the hold limit breach was last modified. |

#### Example: List

```ruby
# list returns an Array of HoldLimitBreach entities, one per record (raises on error).
hold_limit_breachs = client.HoldLimitBreach.list({ "profile_id" => 1 })
hold_limit_breachs.each { |item| puts item.data_get }
```


### IncomingTransfer

Create an instance: `incoming_transfer = client.IncomingTransfer`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `String` | Account details ID that received the incoming transfer. |
| `amounts` | `Hash` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `String` | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `String` | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `String` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `String` | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `Hash` | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `Hash` | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `String` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `Float` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `Hash` | Breakdown of fees applied to the incoming transfer. |
| `id` | `String` | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `Array` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `Integer` | Profile ID of the balance owner. |
| `scheme` | `String` | The payment scheme through which the incoming transfer was received. |
| `state` | `String` | Current state of the incoming transfer. |
| `uetr` | `String` | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `String` | Unstructured remittance information provided by the debtor. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the IncomingTransfer record (raises on error).
incoming_transfer = client.IncomingTransfer.load({ "id" => "incoming_transfer_id" })
```


### Jose

Create an instance: `jose = client.Jose`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `keyId` | `String` | ID of the key in UUID format. |
| `keyMaterial` | `Hash` |  |
| `publicKeyMaterial` | `Hash` |  |
| `scope` | `String` | Scope of the key. |
| `validFrom` | `String` | The key is valid from this date. |
| `validTill` | `String` | The key is valid until this date. |
| `version` | `Integer` | Version of the public key issued. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Jose record (raises on error).
jose = client.Jose.load({ "algorithm" => "algorithm", "scope" => "scope" })
```

#### Example: Create

```ruby
jose = client.Jose.create({
})
```


### KycReview

Create an instance: `kyc_review = client.KycReview`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` | Timestamp marking the creation of the KYC Review. |
| `id` | `String` | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `Object` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `Object` | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `Object` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `Object` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `String` | Aggregated state of the underlying requirement set. |
| `triggerData` | `Hash` | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `Array` | List of trigger reference objects. |
| `type` | `String` | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `String` | Timestamp marking the last update of the KYC Review. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the KycReview record (raises on error).
kyc_review = client.KycReview.load({ "id" => "kyc_review_id", "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of KycReview entities, one per record (raises on error).
kyc_reviews = client.KycReview.list({ "profile_id" => 1 })
kyc_reviews.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
kyc_review = client.KycReview.create({
  "profile_id" => 1, # Integer
  "type" => "example_type", # String
})
```


### LinkRequest

Create an instance: `link_request = client.LinkRequest`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientKey` | `String` | Client key that created the embedded link request. |
| `email` | `String` | The end user's email address, to receive dispute updates. |
| `id` | `String` | Embedded link request ID. |
| `metadata` | `Hash` | Flow-specific metadata. |
| `profileId` | `Integer` | Profile that owns the embedded flow. |
| `redirectUrl` | `String` | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `Integer` | The ID of the card transaction to dispute. |
| `type` | `String` | Embedded Flow type. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LinkRequest record (raises on error).
link_request = client.LinkRequest.load({ "id" => "link_request_id" })
```

#### Example: Create

```ruby
link_request = client.LinkRequest.create({
  "profile_id" => 1, # Integer
  "email" => "example_email", # String
  "redirectUrl" => "example_redirectUrl", # String
  "transactionId" => 1, # Integer
})
```


### Message

Create an instance: `message = client.Message`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `submissionData` | `Hash` | The data for the message submission. |
| `type` | `String` | The type of message submission. |

#### Example: Create

```ruby
message = client.Message.create({
  "case_id" => 1, # Integer
  "submissionData" => {}, # Hash
  "type" => "example_type", # String
})
```


### MultiCurrencyAccount

Create an instance: `multi_currency_account = client.MultiCurrencyAccount`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the MultiCurrencyAccount record (raises on error).
multi_currency_account = client.MultiCurrencyAccount.load()
```


### OneTimeToken

Create an instance: `one_time_token = client.OneTimeToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challenges` | `Array` | An array of challenges. |
| `faceMap` | `String` | A base64 encoded string. |
| `oneTimeToken` | `String` | A one-time token unique identifier. |
| `validity` | `Integer` | The One-Time Token expiration in seconds. |

#### Example: Create

```ruby
one_time_token = client.OneTimeToken.create({
  "profile_id" => 1, # Integer
})
```


### Ott

Create an instance: `ott = client.Ott`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actionType` | `String` | The action bound to the one time token. |
| `challenges` | `Array` | Array of challenge objects. |
| `oneTimeToken` | `String` | Unique identifier of a one time token. |
| `userId` | `Integer` | Creator of this one time token. |
| `validity` | `Integer` | Seconds until the one time token becomes expired. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Ott record (raises on error).
ott = client.Ott.load()
```


### Payin

Create an instance: `payin = client.Payin`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` |  |
| `currency` | `String` |  |
| `details` | `Hash` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `String` |  |
| `id` | `String` |  |
| `payinSessionId` | `String` |  |
| `paymentInstrumentId` | `String` |  |
| `qrCodeInBase64` | `String` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `String` |  |
| `status` | `String` |  |

#### Example: Create

```ruby
payin = client.Payin.create({
  "payin_session_id" => "example_payin_session_id", # String
  "profile_id" => 1, # Integer
  "payinSessionId" => "example_payinSessionId", # String
})
```


### PayinDepositDetail

Create an instance: `payin_deposit_detail = client.PayinDepositDetail`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `payinBank` | `Hash` | Information about the receiving bank. |
| `payinBankAccount` | `Hash` | Bank account details to use to send the payment to. |
| `wiseInformation` | `Hash` | Information about the receiving Wise entity, the owner of the bank account. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PayinDepositDetail record (raises on error).
payin_deposit_detail = client.PayinDepositDetail.load({ "profile_id" => 1, "transfer_id" => 1 })
```


### Payment

Create an instance: `payment = client.Payment`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` | Transfer source amount |
| `currency` | `String` | Transfer source currency |
| `id` | `Integer` | Payment ID |
| `method` | `String` | The payment method used to pay for the transfer |
| `pricingVariant` | `Object` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `String` | Date of when payment was created |
| `timeUpdated` | `String` | Date of when payment was updated |

#### Example: List

```ruby
# list returns an Array of Payment entities, one per record (raises on error).
payments = client.Payment.list({ "transfer_id" => 1 })
payments.each { |item| puts item.data_get }
```


### PaymentInitiation

Create an instance: `payment_initiation = client.PaymentInitiation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PaymentInitiation record (raises on error).
payment_initiation = client.PaymentInitiation.load({ "id" => 1, "batch_group_id" => "batch_group_id", "profile_id" => 1 })
```

#### Example: Create

```ruby
payment_initiation = client.PaymentInitiation.create({
  "batch_group_id" => "example_batch_group_id", # String
  "profile_id" => 1, # Integer
})
```


### PaymentInstrument

Create an instance: `payment_instrument = client.PaymentInstrument`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `String` |  |
| `accountNumber` | `String` |  |
| `accountOwnerDetails` | `Hash` |  |
| `accountType` | `String` |  |
| `bankCode` | `String` |  |
| `bankName` | `String` |  |
| `branchCode` | `String` |  |
| `disconnectReason` | `String` |  |
| `id` | `String` |  |
| `reference` | `String` |  |
| `status` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PaymentInstrument record (raises on error).
payment_instrument = client.PaymentInstrument.load({ "id" => "payment_instrument_id", "profile_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of PaymentInstrument entities, one per record (raises on error).
payment_instruments = client.PaymentInstrument.list({ "id" => "example", "profile_id" => 1 })
payment_instruments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
payment_instrument = client.PaymentInstrument.create({
  "profile_id" => 1, # Integer
  "accountNumber" => "example_accountNumber", # String
  "type" => "example_type", # String
})
```


### PaymentIntent

Create an instance: `payment_intent = client.PaymentIntent`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocationId` | `String` | Unique identifier of the associated settlement allocation. |
| `allocationType` | `String` | Type of allocation. |
| `createdAt` | `String` | Timestamp when the payment intent was created. |
| `fundingSource` | `String` | Source of funding for the payment. |
| `id` | `String` | Unique identifier of the payment intent. |
| `partnerEntityId` | `String` | Partner entity identifier. |
| `paymentReference` | `String` | Payment reference. |
| `profileId` | `String` | Profile identifier. |
| `reason` | `String` | Reason for the payment. |
| `recipientType` | `String` | Type of recipient. |
| `sourceAmount` | `Float` | Source amount of the payment. |
| `sourceCurrency` | `String` | Source currency code (ISO 4217). |
| `state` | `String` | Current state of the payment intent. |
| `targetAmount` | `Float` | Target amount of the payment. |
| `targetCurrency` | `String` | Target currency code (ISO 4217). |
| `updatedAt` | `String` | Timestamp when the payment intent was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PaymentIntent record (raises on error).
payment_intent = client.PaymentIntent.load({ "id" => "payment_intent_id", "allocation_id" => "allocation_id" })
```


### PhoneNumber

Create an instance: `phone_number = client.PhoneNumber`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `String` | Client ID of which this phone number belongs to. |
| `id` | `Integer` | ID of the phone number. |
| `phoneNumber` | `String` | A text representation of phone number. |
| `type` | `String` | Type of phone number when used in authentication. |
| `verified` | `Boolean` | Indicator if phone number is verified. |

#### Example: Create

```ruby
phone_number = client.PhoneNumber.create({
  "user_id" => 1, # Integer
})
```


### Production

Create an instance: `production = client.Production`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `Object` | Detailed description of the error code. |
| `errorCode` | `Object` | Code returned when card production is not successful. |
| `kioskId` | `Object` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `String` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `String` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Production record (raises on error).
production = client.Production.load({ "card_token" => "card_token", "profile_id" => 1 })
```


### Profile

Create an instance: `profile = client.Profile`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `Hash` |  |
| `avatar` | `String` |  |
| `contactDetails` | `Hash` |  |
| `createdAt` | `String` |  |
| `currentState` | `String` |  |
| `dateOfBirth` | `String` |  |
| `email` | `String` |  |
| `firstName` | `String` |  |
| `fullName` | `String` |  |
| `id` | `Integer` |  |
| `lastName` | `String` |  |
| `phoneNumber` | `String` |  |
| `preferredName` | `String` |  |
| `publicId` | `String` |  |
| `secondaryAddresses` | `Array` |  |
| `type` | `String` |  |
| `updatedAt` | `String` |  |
| `userId` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Profile record (raises on error).
profile = client.Profile.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Profile entities, one per record (raises on error).
profiles = client.Profile.list
profiles.each { |item| puts item.data_get }
```


### Quote

Create an instance: `quote = client.Quote`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdTime` | `String` | Quote created timestamp. |
| `creationContext` | `Hash` | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `String` | The date and time the quote expires. |
| `guaranteedTargetAmount` | `Boolean` | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `Boolean` | Indicates whether guaranteed target amount is allowed. |
| `id` | `String` | ID of this quote (GUID format). |
| `notices` | `Array` | Messages to display to the user. |
| `payOut` | `String` | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `Hash` | _Optional_. |
| `paymentOptions` | `Array` | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `String` | Preferred pay-in method. |
| `pricingConfiguration` | `Hash` | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `Integer` | Personal or business profile ID. |
| `providedAmountType` | `String` | Indicates whether the quote was created as source or target. |
| `rate` | `Float` | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `String` | Date and time the locked rate expires. |
| `rateType` | `String` | Whether the rate is fixed or floating. |
| `sourceAmount` | `Float` | Amount in source currency to send. |
| `sourceCurrency` | `String` | Source (sending) currency code. |
| `status` | `String` | Current status of the quote. |
| `targetAccount` | `Integer` | _Optional_. |
| `targetAmount` | `Float` | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `Boolean` | Indicates whether target amount is allowed. |
| `targetCurrency` | `String` | Target (receive) currency code. |
| `user` | `Integer` | User ID that created the quote. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Quote record (raises on error).
quote = client.Quote.load({ "id" => "quote_id", "profile_id" => 1 })
```

#### Example: Create

```ruby
quote = client.Quote.create({
  "sourceCurrency" => "example_sourceCurrency", # String
  "targetCurrency" => "example_targetCurrency", # String
})
```


### Rate

Create an instance: `rate = client.Rate`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `Float` | Exchange rate value. |
| `source` | `String` | Source (send) currency code. |
| `target` | `String` | Target (receive) currency code. |
| `time` | `String` | Timestamp for exchange rate. |

#### Example: List

```ruby
# list returns an Array of Rate entities, one per record (raises on error).
rates = client.Rate.list
rates.each { |item| puts item.data_get }
```


### Recipient

Create an instance: `recipient = client.Recipient`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptedOutcomes` | `Boolean` | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `String` | Recipient full name. |
| `accountId` | `Integer` | Recipient account ID. |
| `accountSummary` | `String` | Summary of account details for ease of lookup. |
| `active` | `Boolean` | Status of the recipient account. |
| `commonFieldMap` | `Hash` | Map of key lookup fields for the account. |
| `confirmations` | `Hash` | Contains verification results for the recipient's details. |
| `country` | `String` | 2-character country code. |
| `creatorId` | `Integer` | Account entity that owns the recipient account. |
| `currency` | `String` | 3-character currency code. |
| `details` | `Hash` | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `Array` | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `String` | Account hash for tracking changes to recipient details. |
| `id` | `Integer` | ID of the recipient. |
| `isInternal` | `Boolean` | Indicates whether recipient is internal. |
| `legalEntityType` | `String` | Entity type of recipient account. |
| `longAccountSummary` | `String` | Longer account details summary. |
| `name` | `Hash` | Recipient name details. |
| `ownedByCustomer` | `Boolean` | Inidicates if recipient account belongs to profile owner. |
| `profile` | `Integer` | Personal or business profile ID of the sender. |
| `profileId` | `Integer` | Specific profile that owns the recipient account. |
| `quoteId` | `String` | Quote ID. |
| `type` | `String` | Recipient account type. |
| `ultimateBeneficiary` | `Object` | The details for the ultimate beneficiary of this recipient. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Recipient record (raises on error).
recipient = client.Recipient.load({ "account_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Recipient entities, one per record (raises on error).
recipients = client.Recipient.list
recipients.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
recipient = client.Recipient.create({
  "acceptedOutcomes" => true, # Boolean
  "ultimateBeneficiary" => {}, # Object
})
```


### Rule

Create an instance: `rule = client.Rule`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | The description of the authorisation rule. |
| `id` | `Integer` | The unique ID for the authorisation rule. |
| `operation` | `String` | Determines whether the transactions should be allowed or blocked. |
| `type` | `String` | The type of authorisation rule. |
| `values` | `Array` | A list of values based on the `type` of rule configured. |

#### Example: List

```ruby
# list returns an Array of Rule entities, one per record (raises on error).
rules = client.Rule.list({ "application_id" => "example" })
rules.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
rule = client.Rule.create({
  "application_id" => "example_application_id", # String
})
```


### Saml

Create an instance: `saml = client.Saml`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `RelayState` | `String` | Opaque state value. |
| `SAMLResponse` | `String` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Saml record (raises on error).
saml = client.Saml.load({ "registration_id" => "registration_id" })
```

#### Example: Create

```ruby
saml = client.Saml.create({
  "SAMLResponse" => "example_SAMLResponse", # String
})
```


### ScaDeviceFingerprint

Create an instance: `sca_device_fingerprint = client.ScaDeviceFingerprint`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `String` | The identifier of the device fingerprint. |
| `id` | `String` |  |

#### Example: Create

```ruby
sca_device_fingerprint = client.ScaDeviceFingerprint.create({
  "profile_id" => 1, # Integer
})
```


### ScaFacemap

Create an instance: `sca_facemap = client.ScaFacemap`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `faceMap` | `String` | A base64 encoded string. |

#### Example: Create

```ruby
sca_facemap = client.ScaFacemap.create({
  "profile_id" => 1, # Integer
})
```


### ScaOtp

Create an instance: `sca_otp = client.ScaOtp`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |


### ScaSession

Create an instance: `sca_session = client.ScaSession`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
sca_session = client.ScaSession.create({
  "profile_id" => 1, # Integer
})
```


### SettlementAllocation

Create an instance: `settlement_allocation = client.SettlementAllocation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `Hash` |  |
| `createdAt` | `String` | Timestamp when the settlement allocation was created. |
| `currency` | `String` | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `Float` | Expected total amount for the allocation. |
| `file` | `String` | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `String` | Unique identifier of the settlement allocation. |
| `nextPageToken` | `String` | Token for fetching the next page of payment intents. |
| `paymentIntents` | `Array` | List of payment intents associated with the allocation. |
| `paymentReference` | `String` | Unique payment reference for the settlement allocation. |
| `state` | `String` | Current state of the settlement allocation. |
| `updatedAt` | `String` | Timestamp when the settlement allocation was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SettlementAllocation record (raises on error).
settlement_allocation = client.SettlementAllocation.load({ "id" => "settlement_allocation_id" })
```

#### Example: Create

```ruby
settlement_allocation = client.SettlementAllocation.create({
  "command" => {}, # Hash
  "createdAt" => "example_createdAt", # String
  "currency" => "example_currency", # String
  "expectedTotalAmount" => 1, # Float
  "file" => "example_file", # String
  "id" => "example_id", # String
  "paymentReference" => "example_paymentReference", # String
  "state" => "example_state", # String
  "updatedAt" => "example_updatedAt", # String
})
```


### Simulation

Create an instance: `simulation = client.Simulation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `String` |  |
| `created` | `String` |  |
| `creationTime` | `Float` | Time when the card transaction was created. |
| `description` | `Object` | Description of the KYC review item. |
| `details` | `Hash` |  |
| `failure_reason_code` | `String` | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `Boolean` |  |
| `id` | `String` |  |
| `key` | `String` | KYC review item key. |
| `quote` | `Integer` |  |
| `rate` | `Float` |  |
| `reference` | `String` |  |
| `sourceAccount` | `String` |  |
| `sourceCurrency` | `String` |  |
| `sourceValue` | `Integer` |  |
| `state` | `String` | State of the KYC review item. |
| `status` | `String` |  |
| `targetAccount` | `Integer` |  |
| `targetCurrency` | `String` |  |
| `targetValue` | `Float` |  |
| `transactionId` | `Integer` | ID of the transaction. |
| `transferRequest` | `String` |  |
| `user` | `Integer` |  |
| `wise_id` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Simulation record (raises on error).
simulation = client.Simulation.load({ "status" => "status", "transfer_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Simulation entities, one per record (raises on error).
simulations = client.Simulation.list({ "card_token" => "example", "profile_id" => 1 })
simulations.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
simulation = client.Simulation.create({
  "transfer_id" => 1, # Integer
})
```


### SpendControl

Create an instance: `spend_control = client.SpendControl`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ruleId` | `Integer` | The ID of the applied authorisation rule. |

#### Example: List

```ruby
# list returns an Array of SpendControl entities, one per record (raises on error).
spend_controls = client.SpendControl.list({ "application_id" => "example" })
spend_controls.each { |item| puts item.data_get }
```


### SpendLimit

Create an instance: `spend_limit = client.SpendLimit`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `Hash` |  |
| `id` | `String` |  |
| `type` | `String` | The type of transaction. |

#### Example: List

```ruby
# list returns an Array of SpendLimit entities, one per record (raises on error).
spend_limits = client.SpendLimit.list({ "profile_id" => 1 })
spend_limits.each { |item| puts item.data_get }
```


### Subscription

Create an instance: `subscription = client.Subscription`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` | Timestamp of when the subscription was created. |
| `created_by` | `Hash` |  |
| `delivery` | `Hash` |  |
| `id` | `String` | UUID that uniquely identifies the subscription. |
| `name` | `String` | A custom name for your webhook to ease with identification. |
| `scope` | `Hash` |  |
| `trigger_on` | `String` | The event type this subscription is listening for. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Subscription record (raises on error).
subscription = client.Subscription.load({ "id" => "subscription_id", "client_key" => "client_key" })
```

#### Example: List

```ruby
# list returns an Array of Subscription entities, one per record (raises on error).
subscriptions = client.Subscription.list({ "client_key" => "example" })
subscriptions.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
subscription = client.Subscription.create({
  "client_key" => "example_client_key", # String
  "delivery" => {}, # Hash
  "name" => "example_name", # String
  "trigger_on" => "example_trigger_on", # String
})
```


### TestNotification

Create an instance: `test_notification = client.TestNotification`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` | Timestamp of when the test notification was created. |
| `delivery_id` | `String` | ID of the delivery that was queued for sending. |

#### Example: Create

```ruby
test_notification = client.TestNotification.create({
  "client_key" => "example_client_key", # String
  "subscription_id" => "example_subscription_id", # String
})
```


### ThirdPartyTransfer

Create an instance: `third_party_transfer = client.ThirdPartyTransfer`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `String` | Timestamp when transfer was created. |
| `details` | `Hash` | Payment Details |
| `hasActiveIssues` | `Boolean` | Are there any pending issues which stop executing the transfer? |
| `id` | `Integer` | Transfer ID |
| `originalTransferId` | `String` | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `Hash` | Data block to capture payment originator details |
| `quote` | `String` | Quote ID |
| `rate` | `Float` | Exchange rate value |
| `sourceAccount` | `Integer` | Refund recipient account ID |
| `sourceCurrency` | `String` | Source currency code |
| `sourceValue` | `Float` | Transfer amount in source currency |
| `status` | `String` | Transfer current status. |
| `targetAccount` | `Integer` | Recipient account ID |
| `targetCurrency` | `String` | Target currency code |
| `targetValue` | `Float` | Transfer amount in target currency |
| `user` | `Integer` | Your user ID |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ThirdPartyTransfer record (raises on error).
third_party_transfer = client.ThirdPartyTransfer.load({ "id" => 1, "profile_id" => 1 })
```

#### Example: Create

```ruby
third_party_transfer = client.ThirdPartyTransfer.create({
  "profile_id" => 1, # Integer
  "details" => {}, # Hash
  "originalTransferId" => "example_originalTransferId", # String
  "originator" => {}, # Hash
  "quote" => "example_quote", # String
  "targetAccount" => 1, # Integer
})
```


### ThreeDSecure

Create an instance: `three_d_secure = client.ThreeDSecure`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challengeStatus` | `String` | The customer's response to the 3DS challenge. |
| `transactionReference` | `String` | Transaction reference as received in the 3DS challenge webhook event. |

#### Example: Create

```ruby
three_d_secure = client.ThreeDSecure.create({
  "profile_id" => 1, # Integer
  "challengeStatus" => "example_challengeStatus", # String
  "transactionReference" => "example_transactionReference", # String
})
```


### Token

Create an instance: `token = client.Token`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `String` | Access token to be used when calling the API. |
| `created_at` | `String` | Token creation time in ISO 8601 format. |
| `expires_at` | `String` | Access token expiration timestamp (UTC). |
| `expires_in` | `Integer` | Access token expiry time in seconds. |
| `refresh_token` | `String` | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `String` | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `Integer` | Refresh token expiry time in seconds. |
| `scope` | `String` | Scope of the token. |
| `token_type` | `String` | Type of the token. |

#### Example: Create

```ruby
token = client.Token.create({
})
```


### Transfer

Create an instance: `transfer = client.Transfer`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `Object` | Your business profile ID |
| `created` | `String` | Timestamp when transfer was created |
| `customerTransactionId` | `String` | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `Hash` |  |
| `hasActiveIssues` | `Boolean` | Are there any pending issues which stop executing the transfer? |
| `id` | `Integer` | Transfer ID |
| `payinSessionId` | `String` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `Object` | V1 quote ID |
| `quoteUuid` | `String` | V2 quote ID |
| `rate` | `Float` | Exchange rate value |
| `reference` | `String` | Deprecated, use `details.reference` instead |
| `sourceAccount` | `Object` | Refund recipient account ID |
| `sourceCurrency` | `String` | Source currency code |
| `sourceValue` | `Float` | Transfer amount in source currency |
| `status` | `String` | Transfer current status. |
| `targetAccount` | `Integer` | Recipient account ID |
| `targetCurrency` | `String` | Target currency code |
| `targetValue` | `Float` | Transfer amount in target currency |
| `transferRequest` | `Object` | Deprecated |
| `user` | `Integer` | Your user ID |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Transfer record (raises on error).
transfer = client.Transfer.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Transfer entities, one per record (raises on error).
transfers = client.Transfer.list
transfers.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
transfer = client.Transfer.create({
  "customerTransactionId" => "example_customerTransactionId", # String
  "quoteUuid" => "example_quoteUuid", # String
  "targetAccount" => 1, # Integer
})
```


### TransferRequirement

Create an instance: `transfer_requirement = client.TransferRequirement`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerTransactionId` | `String` | Unique identifier for the transfer request |
| `details` | `Hash` |  |
| `originatorLegalEntityType` | `String` | Type of sender. |
| `quoteUuid` | `String` | V2 quote ID |
| `targetAccount` | `Integer` | Recipient account ID |

#### Example: Create

```ruby
transfer_requirement = client.TransferRequirement.create({
  "quoteUuid" => "example_quoteUuid", # String
  "targetAccount" => 1, # Integer
})
```


### Ubo

Create an instance: `ubo = client.Ubo`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressFirstLine` | `String` | First line of address. |
| `city` | `String` | City of residential address. |
| `countryOfResidenceIso3Code` | `String` | 3 character country code. |
| `dateOfBirth` | `String` | Date of birth. |
| `id` | `String` | ID of the ultimate beneficial owner. |
| `name` | `String` | Owner full name. |
| `ownershipPercentage` | `Integer` | Percentage of ownership. |
| `postCode` | `String` | Address post code. |
| `state` | `String` | State or region of residential address. |
| `ubos` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Ubo entities, one per record (raises on error).
ubos = client.Ubo.list({ "profile_id" => 1 })
ubos.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
ubo = client.Ubo.create({
  "profile_id" => 1, # Integer
})
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` | If user is active or not. |
| `details` | `Object` | User details. |
| `email` | `String` | User's email. |
| `id` | `Integer` | User ID. |
| `language` | `String` | User default language for UI and email communication. |
| `name` | `Object` | User's full name. |
| `registrationCode` | `String` | Randomly generated registration code that is unique to this user and request. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the User record (raises on error).
user = client.User.load({ "id" => 1 })
```

#### Example: Create

```ruby
user = client.User.create({
  "email" => "example_email", # String
  "registrationCode" => "example_registrationCode", # String
})
```


### Verification

Create an instance: `verification = client.Verification`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `required_evidences` | `Array` | List of evidence types required to complete verification. |

#### Example: List

```ruby
# list returns an Array of Verification entities, one per record (raises on error).
verifications = client.Verification.list({ "profile_id" => 1 })
verifications.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
verification = client.Verification.create({
  "profile_id" => 1, # Integer
})
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `case` | `messages` | 5 | 7 levels |
| `message` | `submissionData` | 5 | 2 levels |
| `account_detail` | `accountIdentification` | 3 | 0 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Wise_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Wise_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
comparison = client.Comparison
comparison.load({ "source_currency" => "example", "target_currency" => "example" })

# comparison.data_get now returns the comparison data from the last load
# comparison.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
