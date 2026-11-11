# Wise Lua SDK



The Lua SDK for the Wise API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:AccountDetail()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages and the CLI live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wise-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("wise_sdk")

local client = sdk.new({
  apikey = os.getenv("WISE_APIKEY"),
})
```

### 3. Load a balance

Balance is nested under currency, so provide the `currency`.

`load` returns the entity; `data_get()` reads its record.

```lua
local balance, err = client:Balance():load({ currency = "example_currency", profile_id = 1 })
if err then error(err) end
local rec = balance:data_get()
print(rec["id"])
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local comparison, err = client:Comparison():load({ source_currency = "example", target_currency = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Comparison():load({ source_currency = "example", target_currency = "example" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Verify the server over HTTPS

An `https://` request goes through LuaSocket and LuaSec, and the SDK checks
the server itself before any of the request is sent: its certificate against
the system's trust store, and its name against the host (an address against
the certificate's addresses). Nothing turns that off. `SSL_CERT_FILE` or
`SSL_CERT_DIR` names the trust store, as for OpenSSL; with neither set and no
system store found, an `https://` request fails rather than going unverified.
`WISE_CA_BUNDLE` names a PEM file of roots added to the store,
for a local service with its own certificate authority or a self-signed
certificate. A different policy is a custom fetch function, described next.

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### WiseSDK

```lua
local sdk = require("wise_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### WiseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local account_detail, err = client:AccountDetail():load({ id = "example_id" })
    if err then error(err) end
    -- account_detail is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local account_detail = client:AccountDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `string` | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `any` | Country/scheme-specific account identification. |
| `country` | `string` | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `number` | Unique identifier for the account details. |
| `profileId` | `number` | Profile ID of the account details owner. |
| `state` | `string` | Current state of the account details. |

#### Example: Load

```lua
local account_detail, err = client:AccountDetail():load({ id = 1 })
```


### AccountRequirement

Create an instance: `local account_requirement = client:AccountRequirement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `string` | Recipient full name. |
| `currency` | `string` | 3-character currency code. |
| `details` | `table` | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `table` | List of UI field groups to collect required data. |
| `ownedByCustomer` | `boolean` | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `number` | Personal or business profile ID of the sender. |
| `title` | `string` | Human-readable title for the requirement group. |
| `type` | `string` | Recipient account type. |
| `ultimateBeneficiary` | `table|nil` | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | Optional usage/help text. |

#### Example: List

```lua
local account_requirements, err = client:AccountRequirement():list({ quote_id = "example" })
```

#### Example: Create

```lua
local account_requirement, err = client:AccountRequirement():create({
  quote_id = "example_quote_id", -- string
  ultimateBeneficiary = {}, -- table|nil
})
```


### Activity

Create an instance: `local activity = client:Activity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `string` | Timestamp when the activity was created. |
| `description` | `string` | A short description that briefly summarizes the activity. |
| `id` | `string` | Activity id. |
| `primaryAmount` | `string` | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `table` | The resource associated with the activity. |
| `secondaryAmount` | `string` | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | Status of the Activity. |
| `title` | `string` | Title of the Activity. |
| `type` | `string` | Type of Activity. |
| `updatedOn` | `string` | Timestamp when the activity was last modified. |

#### Example: List

```lua
local activitys, err = client:Activity():list({ profile_id = 1 })
```


### Address

Create an instance: `local address = client:Address(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `table` | Address details. |
| `id` | `number` | Address ID. |
| `profile` | `number` | User profile ID. |

#### Example: Load

```lua
local address, err = client:Address():load({ id = 1 })
```

#### Example: List

```lua
local addresss, err = client:Address():list()
```

#### Example: Create

```lua
local address, err = client:Address():create({
  details = {}, -- table
  profile = 1, -- number
})
```


### AddressRequirement

Create an instance: `local address_requirement = client:AddressRequirement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `table` | Address details to provide context for requirements lookup. |
| `fields` | `table` | List of fields required for the address. |
| `profile` | `number` | User profile ID. |
| `type` | `string` | Always "address". |

#### Example: List

```lua
local address_requirements, err = client:AddressRequirement():list()
```

#### Example: Create

```lua
local address_requirement, err = client:AddressRequirement():create({
  details = {}, -- table
})
```


### Balance

Create an instance: `local balance = client:Balance(nil)`

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
| `amount` | `table` | Available balance that can be used to fund transfers. |
| `cashAmount` | `table` | Cash amount in the account. |
| `creationTime` | `string` | Date when the balance was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `table|nil` | Icon for the balance. |
| `id` | `number` | Balance ID. |
| `investmentState` | `string` | Investment state of the balance. |
| `modificationTime` | `string` | Date when the balance was last modified. |
| `name` | `string|nil` | Name of the balance. |
| `overdraft` | `table` | Overdraft details for the account. |
| `reservedAmount` | `table` | Amount reserved for transactions. |
| `state` | `string` | Must be `CLOSED`. |
| `targetRecipientId` | `number` | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `table` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `table` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `table` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `string` | Type of balance account. |
| `visible` | `boolean` | Whether the balance is visible to the user. |

#### Example: Load

```lua
local balance, err = client:Balance():load({ id = 1, currency = "currency", profile_id = 1 })
```

#### Example: List

```lua
local balances, err = client:Balance():list({ profile_id = 1, type = "example" })
```

#### Example: Create

```lua
local balance, err = client:Balance():create({
  profile_id = 1, -- number
  currency = "example_currency", -- string
  state = "example_state", -- string
  targetRecipientId = 1, -- number
  type = "example_type", -- string
})
```


### BalanceStatement

Create an instance: `local balance_statement = client:BalanceStatement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolder` | `table` | Account holder information. |
| `bankDetails` | `table|nil` | Local bank details for the account. |
| `endOfStatementBalance` | `table` | Closing balance for the specified time period. |
| `id` | `string` |  |
| `issuer` | `table` | Account issuer information. |
| `query` | `table` | Query parameters used for the request. |
| `transactions` | `table` | List of transactions in the statement period. |

#### Example: Load

```lua
local balance_statement, err = client:BalanceStatement():load({ id = 1, profile_id = 1, currency = "currency", interval_end = "interval_end", interval_start = "interval_start" })
```


### BankAccountDetail

Create an instance: `local bank_account_detail = client:BankAccountDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | Status of the account detail. |
| `currency` | `string` | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `string` | Account detail ID. |
| `internationalDetails` | `table|nil` | International bank account details. |
| `localDetails` | `table` | Local bank account details. |
| `reason` | `string` | Reason for the return. |
| `targetAccountId` | `number` | ID of the currency balance to create account details on. |

#### Example: Create

```lua
local bank_account_detail, err = client:BankAccountDetail():create({
  profile_id = 1, -- number
  targetAccountId = 1, -- number
})
```


### BankAccountDetailsOrder

Create an instance: `local bank_account_details_order = client:BankAccountDetailsOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `number` | Unique ID of the issued account details. |
| `balanceId` | `number|nil` | ID of the balance the order is for. |
| `creationTime` | `string` | Timestamp of when the order was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | Unique ID of the order. |
| `modificationTime` | `string` | Timestamp of the last modification to the order. |
| `requirements` | `table` | List of requirements to fulfill the order. |
| `status` | `string` | Order status. |

#### Example: List

```lua
local bank_account_details_orders, err = client:BankAccountDetailsOrder():list({ profile_id = 1, currency = "example" })
```

#### Example: Create

```lua
local bank_account_details_order, err = client:BankAccountDetailsOrder():create({
  profile_id = 1, -- number
  currency = "example_currency", -- string
})
```


### BatchGroup

Create an instance: `local batch_group = client:BatchGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alreadyPaid` | `boolean` | Not applicable to this use case. |
| `fileName` | `string|nil` | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | Batch group ID. |
| `name` | `string` | Descriptive name for the batch group. |
| `payInDetails` | `table` | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `string|nil` | Optional ID of the payin session. |
| `profileId` | `number` | The ID of the profile this payment belongs to. |
| `shortId` | `number` | Not applicable to this use case. |
| `sourceCurrency` | `string` | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `table` | The IDs of all transfers successfully added to the group. |
| `type` | `string` | The method of payment to use. |
| `userId` | `number` | The ID of the user who initiated this payment. |
| `version` | `number` | Batch version, used for concurrency control. |

#### Example: Load

```lua
local batch_group, err = client:BatchGroup():load({ id = "batch_group_id", profile_id = 1 })
```

#### Example: Create

```lua
local batch_group, err = client:BatchGroup():create({
  profile_id = 1, -- number
  name = "example_name", -- string
  sourceCurrency = "example_sourceCurrency", -- string
  type = "example_type", -- string
})
```


### BulkSettlement

Create an instance: `local bulk_settlement = client:BulkSettlement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransfer` | `number` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `table` | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `table` | Array of transfers to be settled. |
| `type` | `string` | Type of settlement. |

#### Example: Create

```lua
local bulk_settlement, err = client:BulkSettlement():create({
  settlementDate = "example_settlementDate", -- string
  settlementReference = "example_settlementReference", -- string
  transfers = {}, -- table
  type = "example_type", -- string
})
```


### BusinessProfile

Create an instance: `local business_profile = client:BusinessProfile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abn` | `string|nil` | Australian Business Number (only for Australian businesses). |
| `acn` | `string|nil` | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | Email of the actor. |
| `address` | `table` | Main registered address of the business. |
| `arbn` | `string|nil` | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | Free-form description of the business activities. |
| `businessName` | `string` | Registered business name. |
| `businessNameInKatakana` | `string|nil` | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `table` | Business representative details. |
| `companyRole` | `string` | Role of the person managing the business profile. |
| `companyType` | `string` | Type of company. |
| `contactDetails` | `table` | Contact information for the business. |
| `createdAt` | `string` | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | Current status of this profile. |
| `descriptionOfBusiness` | `string` | Deprecated. |
| `email` | `string` | Primary email address for the business. |
| `externalCustomerId` | `string` | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | Deprecated. |
| `fullName` | `string` | Full legal name of the business. |
| `id` | `number` | Unique identifier for the profile. |
| `industryCategories` | `table` | One or more industry categories classifying the business. |
| `operationalAddresses` | `table` | An array of operational addresses for the business. |
| `publicId` | `string` | Publicly accessible identifier for the profile. |
| `registrationNumber` | `string` | Business registration number. |
| `secondLevelCategory` | `string` | Deprecated. |
| `type` | `string` | Type of profile. |
| `updatedAt` | `string` | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `number` | The ID of the user associated with this profile. |
| `webpage` | `string` | Business website URL. |

#### Example: Create

```lua
local business_profile, err = client:BusinessProfile():create({
  contactDetails = {}, -- table
})
```


### Card

Create an instance: `local card = client:Card(nil)`

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
| `bankIdentificationNumber` | `string` | Bank identification number (BIN) of the card. |
| `cardHolderName` | `string` | Name of the card holder. |
| `cardProgram` | `table` | Card program details. |
| `clientId` | `string` | Client ID of the partner that issued the card. |
| `creationTime` | `string` | Time when the card was created. |
| `expiryDate` | `string` | Date when the card will expire. |
| `id` | `string` |  |
| `lastFourDigits` | `string` | Last 4 digits of the card number. |
| `modificationTime` | `string` | Time when the card was last modified. |
| `phoneNumber` | `string` | Phone number associated with the card. |
| `profileId` | `number` | Profile ID that owns this card. |
| `status` | `table` | Current status of the card. |
| `token` | `string` | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | Method with which physical card spending permissions can be unlocked. |

#### Example: Load

```lua
local card, err = client:Card():load({ id = "card_id", profile_id = 1 })
```

#### Example: List

```lua
local cards, err = client:Card():list({ profile_id = 1 })
```

#### Example: Create

```lua
local card, err = client:Card():create({
  card_token = "example_card_token", -- string
  profile_id = 1, -- number
})
```


### CardHolderLimit

Create an instance: `local card_holder_limit = client:CardHolderLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `table` | The limits to set, per aggregation window. |
| `spendLimits` | `table` | Spend limits configured for this cardholder. |
| `type` | `string` | The category of spending the limit applies to. |

#### Example: List

```lua
local card_holder_limits, err = client:CardHolderLimit():list({ card_holder_profile_id = 1, profile_id = 1 })
```


### CardLimit

Create an instance: `local card_limit = client:CardLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `table|nil` |  |
| `lifetime` | `table|nil` |  |
| `monthly` | `table|nil` |  |
| `transaction` | `table|nil` |  |

#### Example: Load

```lua
local card_limit, err = client:CardLimit():load({ card_token = "card_token", profile_id = 1 })
```


### CardOrder

Create an instance: `local card_order = client:CardOrder(nil)`

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
| `address` | `table` | Address set during card order. |
| `cardHolderName` | `string` | Name of the card holder. |
| `cardHolderProfileId` | `number` | The cardholder profile for this card. |
| `cardProgram` | `table` | The card program associated with this card order. |
| `cardToken` | `string|nil` | Token of the card associated with card order. |
| `city` | `string` | Card holder's city (max 30 characters). |
| `clientId` | `string` | Client ID. |
| `country` | `string` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | Time when the card order is created. |
| `deliveryDetails` | `table` | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | The delivery method for the card order. |
| `embossedName` | `string` | The cardholder's name to print on the card (physical card only). |
| `errors` | `table` | Collection of validation errors. |
| `firstLine` | `string` | Card holder's address (max 30 characters). |
| `id` | `number` | ID of the card order. |
| `lifetimeLimit` | `number|nil` | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | Time when the card order was last modified. |
| `phoneNumber` | `string` | Phone number associated with the card order. |
| `postCode` | `string` | Card holder's postal code (max 10 characters). |
| `profileId` | `number` | Profile ID. |
| `program` | `string` | The name of the card program. |
| `replacementDetails` | `table` | The replacement details for this card. |
| `replacesCard` | `string|nil` | Token of the card being replaced by this replacement card order. |
| `secondLine` | `string|nil` | Card holder's address (max 30 characters). |
| `state` | `string|nil` | Card holder's state (max 30 characters). |
| `status` | `string` | Status of the card order. |
| `thirdLine` | `string|nil` | Card holder's address (max 30 characters). |

#### Example: Load

```lua
local card_order, err = client:CardOrder():load({ id = 1, profile_id = 1 })
```

#### Example: List

```lua
local card_orders, err = client:CardOrder():list({ profile_id = 1 })
```

#### Example: Create

```lua
local card_order, err = client:CardOrder():create({
  cardHolderName = "example_cardHolderName", -- string
  program = "example_program", -- string
})
```


### CardSensitiveDetail

Create an instance: `local card_sensitive_detail = client:CardSensitiveDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `encryptedPayload` | `string` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `string` | The RSA public key. |
| `keyVersion` | `number` | The version of the key to use. |
| `version` | `number` | Version of the encryption key. |

#### Example: Load

```lua
local card_sensitive_detail, err = client:CardSensitiveDetail():load()
```

#### Example: Create

```lua
local card_sensitive_detail, err = client:CardSensitiveDetail():create({
  encryptedPayload = "example_encryptedPayload", -- string
  keyVersion = 1, -- number
})
```


### CardTransaction

Create an instance: `local card_transaction = client:CardTransaction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approvalCode` | `string|nil` | Also called authorization code. |
| `arn` | `string|nil` | Acquirer reference number |
| `authorisationMethod` | `string` | Authorisation method |
| `balanceChannelReferenceId` | `string|nil` | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `table` | Billing amount |
| `cardToken` | `string` | Unique identifier of the card |
| `creationTime` | `string` | When the transaction was created |
| `credits` | `table` | Array of credits. |
| `debits` | `table` | Array of debits. |
| `declineReason` | `string|nil` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `string|nil` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `table` | Array of fees |
| `id` | `number` | ID of the transaction |
| `merchant` | `table` | Merchant information |
| `modificationTime` | `string` | When the transaction was last updated |
| `pinValidationResult` | `string|nil` | PIN validation result. |
| `purgeTime` | `string|nil` | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `table|nil` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `table` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `table` | Transaction amount including all fees |
| `type` | `string` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

#### Example: Load

```lua
local card_transaction, err = client:CardTransaction():load({ id = 1, profile_id = 1 })
```

#### Example: List

```lua
local card_transactions, err = client:CardTransaction():list({ card_token = "example", profile_id = 1, from_creation_time = "example", to_creation_time = "example" })
```


### Case

Create an instance: `local case = client:Case(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the case was created. |
| `description` | `string` | The description of the request. |
| `details` | `table` | Details related to the case. |
| `externalId` | `string` | Partner-created identifier for this case, if applicable. |
| `id` | `number` | Unique identifier of the case. |
| `messages` | `table` | List of messages associated with this case. |
| `profileId` | `number` | The profile ID associated with this case. |
| `reference` | `table` | Reference information linking the case to a related entity. |
| `status` | `string` | The current status of the support case. |
| `subType` | `string` | The sub-type of the support case. |
| `subject` | `string` | The subject of the case. |
| `type` | `string` | The type of the support case. |
| `updatedAt` | `string` | Timestamp when the case was last updated. |

#### Example: Load

```lua
local case, err = client:Case():load({ id = 1 })
```

#### Example: Create

```lua
local case, err = client:Case():create({
})
```


### ClaimAccount

Create an instance: `local claim_account = client:ClaimAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claimAccountCode` | `string` | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `string` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

#### Example: Create

```lua
local claim_account, err = client:ClaimAccount():create({
  registrationCode = "example_registrationCode", -- string
})
```


### Comparison

Create an instance: `local comparison = client:Comparison(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | The comparison amount |
| `amountType` | `string` | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `string|nil` | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `table` | List of provider types included in the response |
| `providers` | `table` | List of providers with their estimated quotes |
| `sourceCountry` | `string|nil` | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `string|nil` | ISO 4217 source currency code |
| `targetCountry` | `string|nil` | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `string|nil` | ISO 4217 target currency code |

#### Example: Load

```lua
local comparison, err = client:Comparison():load({ source_currency = "source_currency", target_currency = "target_currency" })
```


### Contact

Create an instance: `local contact = client:Contact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contactId` | `string` | Contact ID in the format of UUID. |
| `identifier` | `string` | A Wise profile's identifier. |
| `name` | `string` | Full name of the contact. |
| `targetCurrency` | `string` | 3 character currency code. |

#### Example: Create

```lua
local contact, err = client:Contact():create({
  profile_id = 1, -- number
  is_direct_identifier_creation = true, -- boolean
})
```


### Currency

Create an instance: `local currency = client:Currency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `table` | Keywords associated with this currency. |
| `name` | `string` | Display name of this currency. |
| `supportsDecimals` | `boolean` | Whether this currency supports decimal values or not. |
| `symbol` | `string` | The symbol of this currency. |

#### Example: List

```lua
local currencys, err = client:Currency():list()
```


### DeliveryEstimate

Create an instance: `local delivery_estimate = client:DeliveryEstimate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `estimatedDeliveryDate` | `string` | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `string` | A string to display to users for the estimated delivery date. |
| `id` | `string` |  |

#### Example: Load

```lua
local delivery_estimate, err = client:DeliveryEstimate():load({ id = 1 })
```


### DeliveryUpdate

Create an instance: `local delivery_update = client:DeliveryUpdate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery_update` | `string` | The delivery signal to simulate. |
| `delivery_update_path` | `table` | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `string|nil` | Optional estimated delivery time. |
| `observation_id` | `string` | Server-generated observation identifier. |
| `occurred_at` | `string` | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `string|nil` | Payment scheme to include in the observation. |

#### Example: Create

```lua
local delivery_update, err = client:DeliveryUpdate():create({
  transfer_id = 1, -- number
  delivery_update = "example_delivery_update", -- string
  delivery_update_path = {}, -- table
})
```


### DigitalWallet

Create an instance: `local digital_wallet = client:DigitalWallet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation` | `string` | Approve or decline a payment token activation |
| `paymentTokens` | `table` |  |
| `walletNames` | `table` | List of supported wallet types. |

#### Example: Create

```lua
local digital_wallet, err = client:DigitalWallet():create({
  card_token = "example_card_token", -- string
  profile_id = 1, -- number
  activation = "example_activation", -- string
})
```


### DirectDebitAccount

Create an instance: `local direct_debit_account = client:DirectDebitAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` | Currency of the bank account. |
| `details` | `table` | Bank account details |
| `id` | `number` | Direct debit account ID |
| `type` | `string` | Payment type for which the account is used. |

#### Example: List

```lua
local direct_debit_accounts, err = client:DirectDebitAccount():list({ profile_id = 1, currency = "example", type = "example" })
```

#### Example: Create

```lua
local direct_debit_account, err = client:DirectDebitAccount():create({
  profile_id = 1, -- number
})
```


### Director

Create an instance: `local director = client:Director(nil)`

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
| `countryOfResidenceIso3Code` | `string` | 3 character country code. |
| `dateOfBirth` | `string` | Date of birth. |
| `directors` | `table` |  |
| `firstName` | `string` | Director first name. |
| `id` | `number` | ID of the director. |
| `lastName` | `string` | Director last name. |

#### Example: List

```lua
local directors, err = client:Director():list({ profile_id = 1 })
```

#### Example: Create

```lua
local director, err = client:Director():create({
  profile_id = 1, -- number
})
```


### Dispute

Create an instance: `local dispute = client:Dispute(nil)`

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
| `canWithdraw` | `boolean` | Whether the dispute can be withdrawn. |
| `createdAt` | `string` | Time when the dispute was created. |
| `createdBy` | `string` | Creator of the dispute. |
| `disclaimer` | `table` | Acknowledgement fields. |
| `files` | `table` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `table` | Form fields required to submit this dispute. |
| `id` | `string` | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | Time when the dispute was last updated. |
| `profileId` | `number` | Profile ID. |
| `reason` | `string` | Dispute reason code. |
| `receipt` | `string` | The file to upload. |
| `status` | `string` | Dispute overall status. |
| `statusMessage` | `string` | Explanation for `subStatus`. |
| `subStatus` | `string` | Dispute detailed status. |
| `transaction` | `table` | Transaction details for the dispute. |
| `transactionId` | `number` | Card transaction ID. |

#### Example: Load

```lua
local dispute, err = client:Dispute():load({ id = "dispute_id", profile_id = 1 })
```

#### Example: List

```lua
local disputes, err = client:Dispute():list({ profile_id = 1 })
```

#### Example: Create

```lua
local dispute, err = client:Dispute():create({
  profile_id = 1, -- number
})
```


### DisputeReason

Create an instance: `local dispute_reason = client:DisputeReason(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | The type of reasons available for the dispute. |
| `description` | `string` | The description of the dispute reason. |
| `isFraud` | `boolean` | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `table` | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `boolean` | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | Text to display when showing the dispute form to your users. |

#### Example: List

```lua
local dispute_reasons, err = client:DisputeReason():list({ profile_id = 1 })
```


### Facetec

Create an instance: `local facetec = client:Facetec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local facetec, err = client:Facetec():load()
```


### File

Create an instance: `local file = client:File(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the file was uploaded. |
| `file` | `string` | The file to upload. |
| `fileId` | `string` | Unique identifier of the uploaded file. |
| `fileName` | `string` | The name of the uploaded file. |
| `profileId` | `number` | The ID of the profile this file belongs to. |
| `purpose` | `string` | The purpose of the file upload. |
| `submissionData` | `table` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

#### Example: List

```lua
local files, err = client:File():list()
```

#### Example: Create

```lua
local file, err = client:File():create({
  createdAt = "example_createdAt", -- string
  file = "example_file", -- string
  fileId = "example_fileId", -- string
  fileName = "example_fileName", -- string
  profileId = 1, -- number
  purpose = "example_purpose", -- string
  submissionData = {}, -- table
})
```


### Funding

Create an instance: `local funding = client:Funding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransactionId` | `number` |  |
| `status` | `string` |  |
| `type` | `string` |  |

#### Example: Create

```lua
local funding, err = client:Funding():create({
  profile_id = 1, -- number
  transfer_id = 1, -- number
})
```


### GpiTracking

Create an instance: `local gpi_tracking = client:GpiTracking(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | The type of identifier used to look up the transfer. |
| `transactions` | `table` | The matching GPI tracking transactions. |

#### Example: Create

```lua
local gpi_tracking, err = client:GpiTracking():create({
  identifier = "example_identifier", -- string
  identifierType = "example_identifierType", -- string
})
```


### HoldLimitBreach

Create an instance: `local hold_limit_breach = client:HoldLimitBreach(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Amount value. |
| `closingReason` | `string` | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `string` | Date when the hold limit breach was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `number` | Hold limit breach ID. |
| `profileId` | `number` | ID of the profile that owns the hold limit breach |
| `state` | `string` | Current state of the hold limit breach. |
| `updatedAt` | `string` | Date when the hold limit breach was last modified. |

#### Example: List

```lua
local hold_limit_breachs, err = client:HoldLimitBreach():list({ profile_id = 1 })
```


### IncomingTransfer

Create an instance: `local incoming_transfer = client:IncomingTransfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `string` | Account details ID that received the incoming transfer. |
| `amounts` | `table` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `table` | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `table` | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `number` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `table` | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `table` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `number` | Profile ID of the balance owner. |
| `scheme` | `string` | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Current state of the incoming transfer. |
| `uetr` | `string` | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | Unstructured remittance information provided by the debtor. |

#### Example: Load

```lua
local incoming_transfer, err = client:IncomingTransfer():load({ id = "incoming_transfer_id" })
```


### Jose

Create an instance: `local jose = client:Jose(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `keyId` | `string` | ID of the key in UUID format. |
| `keyMaterial` | `table` |  |
| `publicKeyMaterial` | `table` |  |
| `scope` | `string` | Scope of the key. |
| `validFrom` | `string` | The key is valid from this date. |
| `validTill` | `string` | The key is valid until this date. |
| `version` | `number` | Version of the public key issued. |

#### Example: Load

```lua
local jose, err = client:Jose():load({ algorithm = "algorithm", scope = "scope" })
```

#### Example: Create

```lua
local jose, err = client:Jose():create({
})
```


### KycReview

Create an instance: `local kyc_review = client:KycReview(nil)`

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
| `createdAt` | `string` | Timestamp marking the creation of the KYC Review. |
| `id` | `string` | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `table|nil` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `string|nil` | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `string|nil` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `table|nil` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | Aggregated state of the underlying requirement set. |
| `triggerData` | `table` | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `table` | List of trigger reference objects. |
| `type` | `string` | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `string` | Timestamp marking the last update of the KYC Review. |

#### Example: Load

```lua
local kyc_review, err = client:KycReview():load({ id = "kyc_review_id", profile_id = 1 })
```

#### Example: List

```lua
local kyc_reviews, err = client:KycReview():list({ profile_id = 1 })
```

#### Example: Create

```lua
local kyc_review, err = client:KycReview():create({
  profile_id = 1, -- number
  type = "example_type", -- string
})
```


### LinkRequest

Create an instance: `local link_request = client:LinkRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientKey` | `string` | Client key that created the embedded link request. |
| `email` | `string` | The end user's email address, to receive dispute updates. |
| `id` | `string` | Embedded link request ID. |
| `metadata` | `table` | Flow-specific metadata. |
| `profileId` | `number` | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `number` | The ID of the card transaction to dispute. |
| `type` | `string` | Embedded Flow type. |

#### Example: Load

```lua
local link_request, err = client:LinkRequest():load({ id = "link_request_id" })
```

#### Example: Create

```lua
local link_request, err = client:LinkRequest():create({
  profile_id = 1, -- number
  email = "example_email", -- string
  redirectUrl = "example_redirectUrl", -- string
  transactionId = 1, -- number
})
```


### Message

Create an instance: `local message = client:Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `submissionData` | `table` | The data for the message submission. |
| `type` | `string` | The type of message submission. |

#### Example: Create

```lua
local message, err = client:Message():create({
  case_id = 1, -- number
  submissionData = {}, -- table
  type = "example_type", -- string
})
```


### MultiCurrencyAccount

Create an instance: `local multi_currency_account = client:MultiCurrencyAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local multi_currency_account, err = client:MultiCurrencyAccount():load()
```


### OneTimeToken

Create an instance: `local one_time_token = client:OneTimeToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challenges` | `table` | An array of challenges. |
| `faceMap` | `string` | A base64 encoded string. |
| `oneTimeToken` | `string` | A one-time token unique identifier. |
| `validity` | `number` | The One-Time Token expiration in seconds. |

#### Example: Create

```lua
local one_time_token, err = client:OneTimeToken():create({
  profile_id = 1, -- number
})
```


### Ott

Create an instance: `local ott = client:Ott(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actionType` | `string` | The action bound to the one time token. |
| `challenges` | `table` | Array of challenge objects. |
| `oneTimeToken` | `string` | Unique identifier of a one time token. |
| `userId` | `number` | Creator of this one time token. |
| `validity` | `number` | Seconds until the one time token becomes expired. |

#### Example: Load

```lua
local ott, err = client:Ott():load()
```


### Payin

Create an instance: `local payin = client:Payin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` |  |
| `currency` | `string` |  |
| `details` | `table` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `string` |  |
| `id` | `string` |  |
| `payinSessionId` | `string` |  |
| `paymentInstrumentId` | `string` |  |
| `qrCodeInBase64` | `string` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `string` |  |
| `status` | `string` |  |

#### Example: Create

```lua
local payin, err = client:Payin():create({
  payin_session_id = "example_payin_session_id", -- string
  profile_id = 1, -- number
  payinSessionId = "example_payinSessionId", -- string
})
```


### PayinDepositDetail

Create an instance: `local payin_deposit_detail = client:PayinDepositDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `payinBank` | `table` | Information about the receiving bank. |
| `payinBankAccount` | `table` | Bank account details to use to send the payment to. |
| `wiseInformation` | `table` | Information about the receiving Wise entity, the owner of the bank account. |

#### Example: Load

```lua
local payin_deposit_detail, err = client:PayinDepositDetail():load({ profile_id = 1, transfer_id = 1 })
```


### Payment

Create an instance: `local payment = client:Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Transfer source amount |
| `currency` | `string` | Transfer source currency |
| `id` | `number` | Payment ID |
| `method` | `string` | The payment method used to pay for the transfer |
| `pricingVariant` | `string|nil` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | Date of when payment was created |
| `timeUpdated` | `string` | Date of when payment was updated |

#### Example: List

```lua
local payments, err = client:Payment():list({ transfer_id = 1 })
```


### PaymentInitiation

Create an instance: `local payment_initiation = client:PaymentInitiation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local payment_initiation, err = client:PaymentInitiation():load({ id = 1, batch_group_id = "batch_group_id", profile_id = 1 })
```

#### Example: Create

```lua
local payment_initiation, err = client:PaymentInitiation():create({
  batch_group_id = "example_batch_group_id", -- string
  profile_id = 1, -- number
})
```


### PaymentInstrument

Create an instance: `local payment_instrument = client:PaymentInstrument(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `string` |  |
| `accountNumber` | `string` |  |
| `accountOwnerDetails` | `table` |  |
| `accountType` | `string` |  |
| `bankCode` | `string` |  |
| `bankName` | `string` |  |
| `branchCode` | `string` |  |
| `disconnectReason` | `string` |  |
| `id` | `string` |  |
| `reference` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```lua
local payment_instrument, err = client:PaymentInstrument():load({ id = "payment_instrument_id", profile_id = 1 })
```

#### Example: List

```lua
local payment_instruments, err = client:PaymentInstrument():list({ id = "example", profile_id = 1 })
```

#### Example: Create

```lua
local payment_instrument, err = client:PaymentInstrument():create({
  profile_id = 1, -- number
  accountNumber = "example_accountNumber", -- string
  type = "example_type", -- string
})
```


### PaymentIntent

Create an instance: `local payment_intent = client:PaymentIntent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocationId` | `string` | Unique identifier of the associated settlement allocation. |
| `allocationType` | `string` | Type of allocation. |
| `createdAt` | `string` | Timestamp when the payment intent was created. |
| `fundingSource` | `string` | Source of funding for the payment. |
| `id` | `string` | Unique identifier of the payment intent. |
| `partnerEntityId` | `string` | Partner entity identifier. |
| `paymentReference` | `string` | Payment reference. |
| `profileId` | `string` | Profile identifier. |
| `reason` | `string` | Reason for the payment. |
| `recipientType` | `string` | Type of recipient. |
| `sourceAmount` | `number` | Source amount of the payment. |
| `sourceCurrency` | `string` | Source currency code (ISO 4217). |
| `state` | `string` | Current state of the payment intent. |
| `targetAmount` | `number` | Target amount of the payment. |
| `targetCurrency` | `string` | Target currency code (ISO 4217). |
| `updatedAt` | `string` | Timestamp when the payment intent was last updated. |

#### Example: Load

```lua
local payment_intent, err = client:PaymentIntent():load({ id = "payment_intent_id", allocation_id = "allocation_id" })
```


### PhoneNumber

Create an instance: `local phone_number = client:PhoneNumber(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | Client ID of which this phone number belongs to. |
| `id` | `number` | ID of the phone number. |
| `phoneNumber` | `string` | A text representation of phone number. |
| `type` | `string` | Type of phone number when used in authentication. |
| `verified` | `boolean` | Indicator if phone number is verified. |

#### Example: Create

```lua
local phone_number, err = client:PhoneNumber():create({
  user_id = 1, -- number
})
```


### Production

Create an instance: `local production = client:Production(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string|nil` | Detailed description of the error code. |
| `errorCode` | `string|nil` | Code returned when card production is not successful. |
| `kioskId` | `string|nil` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `string` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `string` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

#### Example: Load

```lua
local production, err = client:Production():load({ card_token = "card_token", profile_id = 1 })
```


### Profile

Create an instance: `local profile = client:Profile(nil)`

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
| `address` | `table` |  |
| `avatar` | `string` |  |
| `contactDetails` | `table` |  |
| `createdAt` | `string` |  |
| `currentState` | `string` |  |
| `dateOfBirth` | `string` |  |
| `email` | `string` |  |
| `firstName` | `string` |  |
| `fullName` | `string` |  |
| `id` | `number` |  |
| `lastName` | `string` |  |
| `phoneNumber` | `string` |  |
| `preferredName` | `string` |  |
| `publicId` | `string` |  |
| `secondaryAddresses` | `table` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `userId` | `number` |  |

#### Example: Load

```lua
local profile, err = client:Profile():load({ id = 1 })
```

#### Example: List

```lua
local profiles, err = client:Profile():list()
```


### Quote

Create an instance: `local quote = client:Quote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdTime` | `string` | Quote created timestamp. |
| `creationContext` | `table` | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | The date and time the quote expires. |
| `guaranteedTargetAmount` | `boolean` | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `boolean` | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | ID of this quote (GUID format). |
| `notices` | `table` | Messages to display to the user. |
| `payOut` | `string` | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `table` | _Optional_. |
| `paymentOptions` | `table` | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | Preferred pay-in method. |
| `pricingConfiguration` | `table` | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `number` | Personal or business profile ID. |
| `providedAmountType` | `string` | Indicates whether the quote was created as source or target. |
| `rate` | `number` | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `string` | Date and time the locked rate expires. |
| `rateType` | `string` | Whether the rate is fixed or floating. |
| `sourceAmount` | `number` | Amount in source currency to send. |
| `sourceCurrency` | `string` | Source (sending) currency code. |
| `status` | `string` | Current status of the quote. |
| `targetAccount` | `number` | _Optional_. |
| `targetAmount` | `number` | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `boolean` | Indicates whether target amount is allowed. |
| `targetCurrency` | `string` | Target (receive) currency code. |
| `user` | `number` | User ID that created the quote. |

#### Example: Load

```lua
local quote, err = client:Quote():load({ id = "quote_id", profile_id = 1 })
```

#### Example: Create

```lua
local quote, err = client:Quote():create({
  sourceCurrency = "example_sourceCurrency", -- string
  targetCurrency = "example_targetCurrency", -- string
})
```


### Rate

Create an instance: `local rate = client:Rate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `number` | Exchange rate value. |
| `source` | `string` | Source (send) currency code. |
| `target` | `string` | Target (receive) currency code. |
| `time` | `string` | Timestamp for exchange rate. |

#### Example: List

```lua
local rates, err = client:Rate():list()
```


### Recipient

Create an instance: `local recipient = client:Recipient(nil)`

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
| `acceptedOutcomes` | `boolean` | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `string` | Recipient full name. |
| `accountId` | `number` | Recipient account ID. |
| `accountSummary` | `string` | Summary of account details for ease of lookup. |
| `active` | `boolean` | Status of the recipient account. |
| `commonFieldMap` | `table` | Map of key lookup fields for the account. |
| `confirmations` | `table` | Contains verification results for the recipient's details. |
| `country` | `string` | 2-character country code. |
| `creatorId` | `number` | Account entity that owns the recipient account. |
| `currency` | `string` | 3-character currency code. |
| `details` | `table` | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `table` | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | Account hash for tracking changes to recipient details. |
| `id` | `number` | ID of the recipient. |
| `isInternal` | `boolean` | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | Entity type of recipient account. |
| `longAccountSummary` | `string` | Longer account details summary. |
| `name` | `table` | Recipient name details. |
| `ownedByCustomer` | `boolean` | Inidicates if recipient account belongs to profile owner. |
| `profile` | `number` | Personal or business profile ID of the sender. |
| `profileId` | `number` | Specific profile that owns the recipient account. |
| `quoteId` | `string` | Quote ID. |
| `type` | `string` | Recipient account type. |
| `ultimateBeneficiary` | `table|nil` | The details for the ultimate beneficiary of this recipient. |

#### Example: Load

```lua
local recipient, err = client:Recipient():load({ account_id = 1 })
```

#### Example: List

```lua
local recipients, err = client:Recipient():list()
```

#### Example: Create

```lua
local recipient, err = client:Recipient():create({
  acceptedOutcomes = true, -- boolean
  ultimateBeneficiary = {}, -- table|nil
})
```


### Rule

Create an instance: `local rule = client:Rule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | The description of the authorisation rule. |
| `id` | `number` | The unique ID for the authorisation rule. |
| `operation` | `string` | Determines whether the transactions should be allowed or blocked. |
| `type` | `string` | The type of authorisation rule. |
| `values` | `table` | A list of values based on the `type` of rule configured. |

#### Example: List

```lua
local rules, err = client:Rule():list({ application_id = "example" })
```

#### Example: Create

```lua
local rule, err = client:Rule():create({
  application_id = "example_application_id", -- string
})
```


### Saml

Create an instance: `local saml = client:Saml(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `RelayState` | `string` | Opaque state value. |
| `SAMLResponse` | `string` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

#### Example: Load

```lua
local saml, err = client:Saml():load({ registration_id = "registration_id" })
```

#### Example: Create

```lua
local saml, err = client:Saml():create({
  SAMLResponse = "example_SAMLResponse", -- string
})
```


### ScaDeviceFingerprint

Create an instance: `local sca_device_fingerprint = client:ScaDeviceFingerprint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `string` | The identifier of the device fingerprint. |
| `id` | `string` |  |

#### Example: Create

```lua
local sca_device_fingerprint, err = client:ScaDeviceFingerprint():create({
  profile_id = 1, -- number
})
```


### ScaFacemap

Create an instance: `local sca_facemap = client:ScaFacemap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `faceMap` | `string` | A base64 encoded string. |

#### Example: Create

```lua
local sca_facemap, err = client:ScaFacemap():create({
  profile_id = 1, -- number
})
```


### ScaOtp

Create an instance: `local sca_otp = client:ScaOtp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |


### ScaSession

Create an instance: `local sca_session = client:ScaSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local sca_session, err = client:ScaSession():create({
  profile_id = 1, -- number
})
```


### SettlementAllocation

Create an instance: `local settlement_allocation = client:SettlementAllocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `table` |  |
| `createdAt` | `string` | Timestamp when the settlement allocation was created. |
| `currency` | `string` | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `number` | Expected total amount for the allocation. |
| `file` | `string` | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | Token for fetching the next page of payment intents. |
| `paymentIntents` | `table` | List of payment intents associated with the allocation. |
| `paymentReference` | `string` | Unique payment reference for the settlement allocation. |
| `state` | `string` | Current state of the settlement allocation. |
| `updatedAt` | `string` | Timestamp when the settlement allocation was last updated. |

#### Example: Load

```lua
local settlement_allocation, err = client:SettlementAllocation():load({ id = "settlement_allocation_id" })
```

#### Example: Create

```lua
local settlement_allocation, err = client:SettlementAllocation():create({
  command = {}, -- table
  createdAt = "example_createdAt", -- string
  currency = "example_currency", -- string
  expectedTotalAmount = 1, -- number
  file = "example_file", -- string
  id = "example_id", -- string
  paymentReference = "example_paymentReference", -- string
  state = "example_state", -- string
  updatedAt = "example_updatedAt", -- string
})
```


### Simulation

Create an instance: `local simulation = client:Simulation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `string` |  |
| `created` | `string` |  |
| `creationTime` | `number` | Time when the card transaction was created. |
| `description` | `string|nil` | Description of the KYC review item. |
| `details` | `table` |  |
| `failure_reason_code` | `string` | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `boolean` |  |
| `id` | `string` |  |
| `key` | `string` | KYC review item key. |
| `quote` | `number` |  |
| `rate` | `number` |  |
| `reference` | `string` |  |
| `sourceAccount` | `string` |  |
| `sourceCurrency` | `string` |  |
| `sourceValue` | `number` |  |
| `state` | `string` | State of the KYC review item. |
| `status` | `string` |  |
| `targetAccount` | `number` |  |
| `targetCurrency` | `string` |  |
| `targetValue` | `number` |  |
| `transactionId` | `number` | ID of the transaction. |
| `transferRequest` | `string` |  |
| `user` | `number` |  |
| `wise_id` | `number` |  |

#### Example: Load

```lua
local simulation, err = client:Simulation():load({ status = "status", transfer_id = 1 })
```

#### Example: List

```lua
local simulations, err = client:Simulation():list({ card_token = "example", profile_id = 1 })
```

#### Example: Create

```lua
local simulation, err = client:Simulation():create({
  transfer_id = 1, -- number
})
```


### SpendControl

Create an instance: `local spend_control = client:SpendControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ruleId` | `number` | The ID of the applied authorisation rule. |

#### Example: List

```lua
local spend_controls, err = client:SpendControl():list({ application_id = "example" })
```


### SpendLimit

Create an instance: `local spend_limit = client:SpendLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `table` |  |
| `id` | `string` |  |
| `type` | `string` | The type of transaction. |

#### Example: List

```lua
local spend_limits, err = client:SpendLimit():list({ profile_id = 1 })
```


### Subscription

Create an instance: `local subscription = client:Subscription(nil)`

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
| `created_at` | `string` | Timestamp of when the subscription was created. |
| `created_by` | `table` |  |
| `delivery` | `table` |  |
| `id` | `string` | UUID that uniquely identifies the subscription. |
| `name` | `string` | A custom name for your webhook to ease with identification. |
| `scope` | `table` |  |
| `trigger_on` | `string` | The event type this subscription is listening for. |

#### Example: Load

```lua
local subscription, err = client:Subscription():load({ id = "subscription_id", client_key = "client_key" })
```

#### Example: List

```lua
local subscriptions, err = client:Subscription():list({ client_key = "example" })
```

#### Example: Create

```lua
local subscription, err = client:Subscription():create({
  client_key = "example_client_key", -- string
  delivery = {}, -- table
  name = "example_name", -- string
  trigger_on = "example_trigger_on", -- string
})
```


### TestNotification

Create an instance: `local test_notification = client:TestNotification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Timestamp of when the test notification was created. |
| `delivery_id` | `string` | ID of the delivery that was queued for sending. |

#### Example: Create

```lua
local test_notification, err = client:TestNotification():create({
  client_key = "example_client_key", -- string
  subscription_id = "example_subscription_id", -- string
})
```


### ThirdPartyTransfer

Create an instance: `local third_party_transfer = client:ThirdPartyTransfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `string` | Timestamp when transfer was created. |
| `details` | `table` | Payment Details |
| `hasActiveIssues` | `boolean` | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | Transfer ID |
| `originalTransferId` | `string` | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `table` | Data block to capture payment originator details |
| `quote` | `string` | Quote ID |
| `rate` | `number` | Exchange rate value |
| `sourceAccount` | `number` | Refund recipient account ID |
| `sourceCurrency` | `string` | Source currency code |
| `sourceValue` | `number` | Transfer amount in source currency |
| `status` | `string` | Transfer current status. |
| `targetAccount` | `number` | Recipient account ID |
| `targetCurrency` | `string` | Target currency code |
| `targetValue` | `number` | Transfer amount in target currency |
| `user` | `number` | Your user ID |

#### Example: Load

```lua
local third_party_transfer, err = client:ThirdPartyTransfer():load({ id = 1, profile_id = 1 })
```

#### Example: Create

```lua
local third_party_transfer, err = client:ThirdPartyTransfer():create({
  profile_id = 1, -- number
  details = {}, -- table
  originalTransferId = "example_originalTransferId", -- string
  originator = {}, -- table
  quote = "example_quote", -- string
  targetAccount = 1, -- number
})
```


### ThreeDSecure

Create an instance: `local three_d_secure = client:ThreeDSecure(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challengeStatus` | `string` | The customer's response to the 3DS challenge. |
| `transactionReference` | `string` | Transaction reference as received in the 3DS challenge webhook event. |

#### Example: Create

```lua
local three_d_secure, err = client:ThreeDSecure():create({
  profile_id = 1, -- number
  challengeStatus = "example_challengeStatus", -- string
  transactionReference = "example_transactionReference", -- string
})
```


### Token

Create an instance: `local token = client:Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | Access token to be used when calling the API. |
| `created_at` | `string` | Token creation time in ISO 8601 format. |
| `expires_at` | `string` | Access token expiration timestamp (UTC). |
| `expires_in` | `number` | Access token expiry time in seconds. |
| `refresh_token` | `string` | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `string` | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `number` | Refresh token expiry time in seconds. |
| `scope` | `string` | Scope of the token. |
| `token_type` | `string` | Type of the token. |

#### Example: Create

```lua
local token, err = client:Token():create({
})
```


### Transfer

Create an instance: `local transfer = client:Transfer(nil)`

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
| `business` | `number|nil` | Your business profile ID |
| `created` | `string` | Timestamp when transfer was created |
| `customerTransactionId` | `string` | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `table` |  |
| `hasActiveIssues` | `boolean` | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | Transfer ID |
| `payinSessionId` | `string` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `number|nil` | V1 quote ID |
| `quoteUuid` | `string` | V2 quote ID |
| `rate` | `number` | Exchange rate value |
| `reference` | `string` | Deprecated, use `details.reference` instead |
| `sourceAccount` | `number|nil` | Refund recipient account ID |
| `sourceCurrency` | `string` | Source currency code |
| `sourceValue` | `number` | Transfer amount in source currency |
| `status` | `string` | Transfer current status. |
| `targetAccount` | `number` | Recipient account ID |
| `targetCurrency` | `string` | Target currency code |
| `targetValue` | `number` | Transfer amount in target currency |
| `transferRequest` | `number|nil` | Deprecated |
| `user` | `number` | Your user ID |

#### Example: Load

```lua
local transfer, err = client:Transfer():load({ id = 1 })
```

#### Example: List

```lua
local transfers, err = client:Transfer():list()
```

#### Example: Create

```lua
local transfer, err = client:Transfer():create({
  customerTransactionId = "example_customerTransactionId", -- string
  quoteUuid = "example_quoteUuid", -- string
  targetAccount = 1, -- number
})
```


### TransferRequirement

Create an instance: `local transfer_requirement = client:TransferRequirement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerTransactionId` | `string` | Unique identifier for the transfer request |
| `details` | `table` |  |
| `originatorLegalEntityType` | `string` | Type of sender. |
| `quoteUuid` | `string` | V2 quote ID |
| `targetAccount` | `number` | Recipient account ID |

#### Example: Create

```lua
local transfer_requirement, err = client:TransferRequirement():create({
  quoteUuid = "example_quoteUuid", -- string
  targetAccount = 1, -- number
})
```


### Ubo

Create an instance: `local ubo = client:Ubo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressFirstLine` | `string` | First line of address. |
| `city` | `string` | City of residential address. |
| `countryOfResidenceIso3Code` | `string` | 3 character country code. |
| `dateOfBirth` | `string` | Date of birth. |
| `id` | `string` | ID of the ultimate beneficial owner. |
| `name` | `string` | Owner full name. |
| `ownershipPercentage` | `number` | Percentage of ownership. |
| `postCode` | `string` | Address post code. |
| `state` | `string` | State or region of residential address. |
| `ubos` | `table` |  |

#### Example: List

```lua
local ubos, err = client:Ubo():list({ profile_id = 1 })
```

#### Example: Create

```lua
local ubo, err = client:Ubo():create({
  profile_id = 1, -- number
})
```


### User

Create an instance: `local user = client:User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | If user is active or not. |
| `details` | `table|nil` | User details. |
| `email` | `string` | User's email. |
| `id` | `number` | User ID. |
| `language` | `string` | User default language for UI and email communication. |
| `name` | `string|nil` | User's full name. |
| `registrationCode` | `string` | Randomly generated registration code that is unique to this user and request. |

#### Example: Load

```lua
local user, err = client:User():load({ id = 1 })
```

#### Example: Create

```lua
local user, err = client:User():create({
  email = "example_email", -- string
  registrationCode = "example_registrationCode", -- string
})
```


### Verification

Create an instance: `local verification = client:Verification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `required_evidences` | `table` | List of evidence types required to complete verification. |

#### Example: List

```lua
local verifications, err = client:Verification():list({ profile_id = 1 })
```

#### Example: Create

```lua
local verification, err = client:Verification():create({
  profile_id = 1, -- number
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── wise_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`wise_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local comparison = client:Comparison()
comparison:load({ source_currency = "example", target_currency = "example" })

-- comparison:data_get() now returns the comparison data from the last load
-- comparison:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
