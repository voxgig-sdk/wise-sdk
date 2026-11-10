# Wise Lua SDK Reference

Complete API reference for the Wise Lua SDK.


## WiseSDK

### Constructor

```lua
local sdk = require("wise_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AccountDetail(data)`

Create a new `AccountDetail` entity instance. Pass `nil` for no initial data.

#### `AccountRequirement(data)`

Create a new `AccountRequirement` entity instance. Pass `nil` for no initial data.

#### `Activity(data)`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Address(data)`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `AddressRequirement(data)`

Create a new `AddressRequirement` entity instance. Pass `nil` for no initial data.

#### `Balance(data)`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BalanceStatement(data)`

Create a new `BalanceStatement` entity instance. Pass `nil` for no initial data.

#### `BankAccountDetail(data)`

Create a new `BankAccountDetail` entity instance. Pass `nil` for no initial data.

#### `BankAccountDetailsOrder(data)`

Create a new `BankAccountDetailsOrder` entity instance. Pass `nil` for no initial data.

#### `BatchGroup(data)`

Create a new `BatchGroup` entity instance. Pass `nil` for no initial data.

#### `BulkSettlement(data)`

Create a new `BulkSettlement` entity instance. Pass `nil` for no initial data.

#### `BusinessProfile(data)`

Create a new `BusinessProfile` entity instance. Pass `nil` for no initial data.

#### `Card(data)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardHolderLimit(data)`

Create a new `CardHolderLimit` entity instance. Pass `nil` for no initial data.

#### `CardLimit(data)`

Create a new `CardLimit` entity instance. Pass `nil` for no initial data.

#### `CardOrder(data)`

Create a new `CardOrder` entity instance. Pass `nil` for no initial data.

#### `CardSensitiveDetail(data)`

Create a new `CardSensitiveDetail` entity instance. Pass `nil` for no initial data.

#### `CardTransaction(data)`

Create a new `CardTransaction` entity instance. Pass `nil` for no initial data.

#### `Case(data)`

Create a new `Case` entity instance. Pass `nil` for no initial data.

#### `ClaimAccount(data)`

Create a new `ClaimAccount` entity instance. Pass `nil` for no initial data.

#### `Comparison(data)`

Create a new `Comparison` entity instance. Pass `nil` for no initial data.

#### `Contact(data)`

Create a new `Contact` entity instance. Pass `nil` for no initial data.

#### `Currency(data)`

Create a new `Currency` entity instance. Pass `nil` for no initial data.

#### `DeliveryEstimate(data)`

Create a new `DeliveryEstimate` entity instance. Pass `nil` for no initial data.

#### `DeliveryUpdate(data)`

Create a new `DeliveryUpdate` entity instance. Pass `nil` for no initial data.

#### `DigitalWallet(data)`

Create a new `DigitalWallet` entity instance. Pass `nil` for no initial data.

#### `DirectDebitAccount(data)`

Create a new `DirectDebitAccount` entity instance. Pass `nil` for no initial data.

#### `Director(data)`

Create a new `Director` entity instance. Pass `nil` for no initial data.

#### `Dispute(data)`

Create a new `Dispute` entity instance. Pass `nil` for no initial data.

#### `DisputeReason(data)`

Create a new `DisputeReason` entity instance. Pass `nil` for no initial data.

#### `Facetec(data)`

Create a new `Facetec` entity instance. Pass `nil` for no initial data.

#### `File(data)`

Create a new `File` entity instance. Pass `nil` for no initial data.

#### `Funding(data)`

Create a new `Funding` entity instance. Pass `nil` for no initial data.

#### `GpiTracking(data)`

Create a new `GpiTracking` entity instance. Pass `nil` for no initial data.

#### `HoldLimitBreach(data)`

Create a new `HoldLimitBreach` entity instance. Pass `nil` for no initial data.

#### `IncomingTransfer(data)`

Create a new `IncomingTransfer` entity instance. Pass `nil` for no initial data.

#### `Jose(data)`

Create a new `Jose` entity instance. Pass `nil` for no initial data.

#### `KycReview(data)`

Create a new `KycReview` entity instance. Pass `nil` for no initial data.

#### `LinkRequest(data)`

Create a new `LinkRequest` entity instance. Pass `nil` for no initial data.

#### `Message(data)`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `MultiCurrencyAccount(data)`

Create a new `MultiCurrencyAccount` entity instance. Pass `nil` for no initial data.

#### `OneTimeToken(data)`

Create a new `OneTimeToken` entity instance. Pass `nil` for no initial data.

#### `Ott(data)`

Create a new `Ott` entity instance. Pass `nil` for no initial data.

#### `Payin(data)`

Create a new `Payin` entity instance. Pass `nil` for no initial data.

#### `PayinDepositDetail(data)`

Create a new `PayinDepositDetail` entity instance. Pass `nil` for no initial data.

#### `Payment(data)`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `PaymentInitiation(data)`

Create a new `PaymentInitiation` entity instance. Pass `nil` for no initial data.

#### `PaymentInstrument(data)`

Create a new `PaymentInstrument` entity instance. Pass `nil` for no initial data.

#### `PaymentIntent(data)`

Create a new `PaymentIntent` entity instance. Pass `nil` for no initial data.

#### `PhoneNumber(data)`

Create a new `PhoneNumber` entity instance. Pass `nil` for no initial data.

#### `Production(data)`

Create a new `Production` entity instance. Pass `nil` for no initial data.

#### `Profile(data)`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `Quote(data)`

Create a new `Quote` entity instance. Pass `nil` for no initial data.

#### `Rate(data)`

Create a new `Rate` entity instance. Pass `nil` for no initial data.

#### `Recipient(data)`

Create a new `Recipient` entity instance. Pass `nil` for no initial data.

#### `Rule(data)`

Create a new `Rule` entity instance. Pass `nil` for no initial data.

#### `Saml(data)`

Create a new `Saml` entity instance. Pass `nil` for no initial data.

#### `ScaDeviceFingerprint(data)`

Create a new `ScaDeviceFingerprint` entity instance. Pass `nil` for no initial data.

#### `ScaFacemap(data)`

Create a new `ScaFacemap` entity instance. Pass `nil` for no initial data.

#### `ScaOtp(data)`

Create a new `ScaOtp` entity instance. Pass `nil` for no initial data.

#### `ScaSession(data)`

Create a new `ScaSession` entity instance. Pass `nil` for no initial data.

#### `SettlementAllocation(data)`

Create a new `SettlementAllocation` entity instance. Pass `nil` for no initial data.

#### `Simulation(data)`

Create a new `Simulation` entity instance. Pass `nil` for no initial data.

#### `SpendControl(data)`

Create a new `SpendControl` entity instance. Pass `nil` for no initial data.

#### `SpendLimit(data)`

Create a new `SpendLimit` entity instance. Pass `nil` for no initial data.

#### `Subscription(data)`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `TestNotification(data)`

Create a new `TestNotification` entity instance. Pass `nil` for no initial data.

#### `ThirdPartyTransfer(data)`

Create a new `ThirdPartyTransfer` entity instance. Pass `nil` for no initial data.

#### `ThreeDSecure(data)`

Create a new `ThreeDSecure` entity instance. Pass `nil` for no initial data.

#### `Token(data)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `Transfer(data)`

Create a new `Transfer` entity instance. Pass `nil` for no initial data.

#### `TransferRequirement(data)`

Create a new `TransferRequirement` entity instance. Pass `nil` for no initial data.

#### `Ubo(data)`

Create a new `Ubo` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Verification(data)`

Create a new `Verification` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AccountDetailEntity

```lua
local account_detail = client:AccountDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | Yes | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `any` | Yes | Country/scheme-specific account identification. |
| `country` | `string` | Yes | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `number` | Yes | Unique identifier for the account details. |
| `profileId` | `number` | Yes | Profile ID of the account details owner. |
| `state` | `string` | Yes | Current state of the account details. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:AccountDetail():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AccountRequirementEntity

```lua
local account_requirement = client:AccountRequirement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No | Recipient full name. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `table` | No | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `table` | No | List of UI field groups to collect required data. |
| `ownedByCustomer` | `boolean` | No | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `number` | No | Personal or business profile ID of the sender. |
| `title` | `string` | No | Human-readable title for the requirement group. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `table|nil` | Yes | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | No | Optional usage/help text. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AccountRequirement():create({
  quote_id = --[[ string ]],
  ultimateBeneficiary = --[[ table|nil ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AccountRequirement():list({ quote_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountRequirementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ActivityEntity

```lua
local activity = client:Activity(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | No | Timestamp when the activity was created. |
| `description` | `string` | No | A short description that briefly summarizes the activity. |
| `id` | `string` | No | Activity id. |
| `primaryAmount` | `string` | No | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `table` | No | The resource associated with the activity. |
| `secondaryAmount` | `string` | No | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | No | Status of the Activity. |
| `title` | `string` | No | Title of the Activity. |
| `type` | `string` | No | Type of Activity. |
| `updatedOn` | `string` | No | Timestamp when the activity was last modified. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Activity():list({ profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AddressEntity

```lua
local address = client:Address(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `table` | No | Address details. |
| `id` | `number` | No | Address ID. |
| `profile` | `number` | No | User profile ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `details` | - | - | Yes |
| `id` | - | - | - |
| `profile` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Address():create({
  details = --[[ table ]],
  profile = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Address():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Address():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AddressRequirementEntity

```lua
local address_requirement = client:AddressRequirement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `table` | Yes | Address details to provide context for requirements lookup. |
| `fields` | `table` | No | List of fields required for the address. |
| `profile` | `number` | No | User profile ID. |
| `type` | `string` | No | Always "address". |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AddressRequirement():create({
  details = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:AddressRequirement():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressRequirementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BalanceEntity

```lua
local balance = client:Balance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `table` | No | Available balance that can be used to fund transfers. |
| `cashAmount` | `table` | No | Cash amount in the account. |
| `creationTime` | `string` | No | Date when the balance was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `table|nil` | No | Icon for the balance. |
| `id` | `number` | No | Balance ID. |
| `investmentState` | `string` | No | Investment state of the balance. |
| `modificationTime` | `string` | No | Date when the balance was last modified. |
| `name` | `string|nil` | No | Name of the balance. |
| `overdraft` | `table` | No | Overdraft details for the account. |
| `reservedAmount` | `table` | No | Amount reserved for transactions. |
| `state` | `string` | Yes | Must be `CLOSED`. |
| `targetRecipientId` | `number` | Yes | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `table` | No | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `table` | No | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `table` | No | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `string` | No | Type of balance account. |
| `visible` | `boolean` | No | Whether the balance is visible to the user. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `amount` | - | - | - | - |
| `cashAmount` | - | - | - | - |
| `creationTime` | - | - | - | - |
| `currency` | - | - | Yes | - |
| `icon` | - | - | - | - |
| `id` | - | - | - | - |
| `investmentState` | - | - | - | - |
| `modificationTime` | - | - | - | - |
| `name` | - | - | - | - |
| `overdraft` | - | - | - | - |
| `reservedAmount` | - | - | - | - |
| `state` | - | - | - | - |
| `targetRecipientId` | - | - | - | - |
| `totalAvailable` | - | - | - | - |
| `totalCash` | - | - | - | - |
| `totalWorth` | - | - | - | - |
| `type` | - | - | Yes | - |
| `visible` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Balance():create({
  profile_id = --[[ number ]],
  currency = --[[ string ]],
  state = --[[ string ]],
  targetRecipientId = --[[ number ]],
  type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Balance():list({ profile_id = 1, type = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Balance():load({ id = 1, currency = "currency", profile_id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Balance():remove({ id = 1, profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BalanceStatementEntity

```lua
local balance_statement = client:BalanceStatement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolder` | `table` | No | Account holder information. |
| `bankDetails` | `table|nil` | No | Local bank details for the account. |
| `endOfStatementBalance` | `table` | No | Closing balance for the specified time period. |
| `id` | `string` | No |  |
| `issuer` | `table` | No | Account issuer information. |
| `query` | `table` | No | Query parameters used for the request. |
| `transactions` | `table` | No | List of transactions in the statement period. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BalanceStatement():load({ id = 1, profile_id = 1, currency = "currency", interval_end = "interval_end", interval_start = "interval_start" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceStatementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BankAccountDetailEntity

```lua
local bank_account_detail = client:BankAccountDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No | Status of the account detail. |
| `currency` | `string` | No | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Account detail ID. |
| `internationalDetails` | `table|nil` | No | International bank account details. |
| `localDetails` | `table` | No | Local bank account details. |
| `reason` | `string` | No | Reason for the return. |
| `targetAccountId` | `number` | Yes | ID of the currency balance to create account details on. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BankAccountDetail():create({
  profile_id = --[[ number ]],
  targetAccountId = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankAccountDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BankAccountDetailsOrderEntity

```lua
local bank_account_details_order = client:BankAccountDetailsOrder(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `number` | No | Unique ID of the issued account details. |
| `balanceId` | `number|nil` | No | ID of the balance the order is for. |
| `creationTime` | `string` | No | Timestamp of when the order was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Unique ID of the order. |
| `modificationTime` | `string` | No | Timestamp of the last modification to the order. |
| `requirements` | `table` | No | List of requirements to fulfill the order. |
| `status` | `string` | No | Order status. |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `accountDetailsId` | - | - |
| `balanceId` | - | - |
| `creationTime` | - | - |
| `currency` | - | Yes |
| `id` | - | - |
| `modificationTime` | - | - |
| `requirements` | - | - |
| `status` | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BankAccountDetailsOrder():create({
  profile_id = --[[ number ]],
  currency = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:BankAccountDetailsOrder():list({ profile_id = 1, currency = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankAccountDetailsOrderEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BatchGroupEntity

```lua
local batch_group = client:BatchGroup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alreadyPaid` | `boolean` | No | Not applicable to this use case. |
| `fileName` | `string|nil` | No | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | No | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | No | Batch group ID. |
| `name` | `string` | No | Descriptive name for the batch group. |
| `payInDetails` | `table` | No | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `string|nil` | No | Optional ID of the payin session. |
| `profileId` | `number` | No | The ID of the profile this payment belongs to. |
| `shortId` | `number` | No | Not applicable to this use case. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | No | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `table` | No | The IDs of all transfers successfully added to the group. |
| `type` | `string` | Yes | The method of payment to use. |
| `userId` | `number` | No | The ID of the user who initiated this payment. |
| `version` | `number` | No | Batch version, used for concurrency control. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `alreadyPaid` | - | - | - |
| `fileName` | - | - | - |
| `groupType` | - | - | - |
| `id` | - | - | - |
| `name` | - | Yes | - |
| `payInDetails` | - | - | - |
| `payinSessionId` | - | - | - |
| `profileId` | - | - | - |
| `shortId` | - | - | - |
| `sourceCurrency` | - | Yes | - |
| `status` | - | - | Yes |
| `transferIds` | - | - | - |
| `type` | - | - | - |
| `userId` | - | - | - |
| `version` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BatchGroup():create({
  profile_id = --[[ number ]],
  name = --[[ string ]],
  sourceCurrency = --[[ string ]],
  type = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:BatchGroup():load({ id = "batch_group_id", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:BatchGroup():update({
  id = "batch_group_id",
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchGroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BulkSettlementEntity

```lua
local bulk_settlement = client:BulkSettlement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransfer` | `number` | No | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `table` | No | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | No | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | Yes | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Yes | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `table` | Yes | Array of transfers to be settled. |
| `type` | `string` | Yes | Type of settlement. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BulkSettlement():create({
  settlementDate = --[[ string ]],
  settlementReference = --[[ string ]],
  transfers = --[[ table ]],
  type = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkSettlementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BusinessProfileEntity

```lua
local business_profile = client:BusinessProfile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abn` | `string|nil` | No | Australian Business Number (only for Australian businesses). |
| `acn` | `string|nil` | No | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | No | Email of the actor. |
| `address` | `table` | No | Main registered address of the business. |
| `arbn` | `string|nil` | No | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | No | Free-form description of the business activities. |
| `businessName` | `string` | No | Registered business name. |
| `businessNameInKatakana` | `string|nil` | No | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `table` | No | Business representative details. |
| `companyRole` | `string` | No | Role of the person managing the business profile. |
| `companyType` | `string` | No | Type of company. |
| `contactDetails` | `table` | No | Contact information for the business. |
| `createdAt` | `string` | No | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | No | Current status of this profile. |
| `descriptionOfBusiness` | `string` | No | Deprecated. |
| `email` | `string` | No | Primary email address for the business. |
| `externalCustomerId` | `string` | No | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | No | Deprecated. |
| `fullName` | `string` | No | Full legal name of the business. |
| `id` | `number` | No | Unique identifier for the profile. |
| `industryCategories` | `table` | No | One or more industry categories classifying the business. |
| `operationalAddresses` | `table` | No | An array of operational addresses for the business. |
| `publicId` | `string` | No | Publicly accessible identifier for the profile. |
| `registrationNumber` | `string` | No | Business registration number. |
| `secondLevelCategory` | `string` | No | Deprecated. |
| `type` | `string` | Yes | Type of profile. |
| `updatedAt` | `string` | No | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `number` | No | The ID of the user associated with this profile. |
| `webpage` | `string` | No | Business website URL. |

### Field Usage by Operation

| Field | create | update |
| --- | --- | --- |
| `abn` | - | - |
| `acn` | - | - |
| `actorEmail` | - | - |
| `address` | - | - |
| `arbn` | - | - |
| `businessFreeFormDescription` | - | - |
| `businessName` | - | - |
| `businessNameInKatakana` | - | - |
| `businessRepresentative` | - | - |
| `companyRole` | - | - |
| `companyType` | - | - |
| `contactDetails` | Yes | Yes |
| `createdAt` | - | - |
| `currentState` | - | - |
| `descriptionOfBusiness` | - | - |
| `email` | - | - |
| `externalCustomerId` | - | - |
| `firstLevelCategory` | - | - |
| `fullName` | - | - |
| `id` | - | - |
| `industryCategories` | - | - |
| `operationalAddresses` | - | - |
| `publicId` | - | - |
| `registrationNumber` | - | - |
| `secondLevelCategory` | - | - |
| `type` | - | - |
| `updatedAt` | - | - |
| `userId` | - | - |
| `webpage` | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:BusinessProfile():create({
  contactDetails = --[[ table ]],
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:BusinessProfile():update({
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BusinessProfileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardEntity

```lua
local card = client:Card(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bankIdentificationNumber` | `string` | No | Bank identification number (BIN) of the card. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardProgram` | `table` | No | Card program details. |
| `clientId` | `string` | No | Client ID of the partner that issued the card. |
| `creationTime` | `string` | No | Time when the card was created. |
| `expiryDate` | `string` | No | Date when the card will expire. |
| `id` | `string` | No |  |
| `lastFourDigits` | `string` | No | Last 4 digits of the card number. |
| `modificationTime` | `string` | No | Time when the card was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card. |
| `profileId` | `number` | No | Profile ID that owns this card. |
| `status` | `table` | No | Current status of the card. |
| `token` | `string` | No | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | No | Method with which physical card spending permissions can be unlocked. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Card():create({
  card_token = --[[ string ]],
  profile_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Card():list({ profile_id = 1 })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Card():load({ id = "card_id", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardHolderLimitEntity

```lua
local card_holder_limit = client:CardHolderLimit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `table` | Yes | The limits to set, per aggregation window. |
| `spendLimits` | `table` | No | Spend limits configured for this cardholder. |
| `type` | `string` | Yes | The category of spending the limit applies to. |

### Field Usage by Operation

| Field | list | update | remove |
| --- | --- | --- | --- |
| `aggregateWindow` | Yes | - | - |
| `spendLimits` | - | - | - |
| `type` | Yes | - | - |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CardHolderLimit():list({ card_holder_profile_id = 1, profile_id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:CardHolderLimit():remove({ card_holder_profile_id = 1, profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CardHolderLimit():update({
  card_holder_profile_id = 1,
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardHolderLimitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardLimitEntity

```lua
local card_limit = client:CardLimit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `table|nil` | No |  |
| `lifetime` | `table|nil` | No |  |
| `monthly` | `table|nil` | No |  |
| `transaction` | `table|nil` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CardLimit():load({ card_token = "card_token", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CardLimit():update({
  card_token = "card_token",
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardLimitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardOrderEntity

```lua
local card_order = client:CardOrder(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `table` | No | Address set during card order. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardHolderProfileId` | `number` | No | The cardholder profile for this card. |
| `cardProgram` | `table` | No | The card program associated with this card order. |
| `cardToken` | `string|nil` | No | Token of the card associated with card order. |
| `city` | `string` | No | Card holder's city (max 30 characters). |
| `clientId` | `string` | No | Client ID. |
| `country` | `string` | No | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | No | Time when the card order is created. |
| `deliveryDetails` | `table` | No | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | No | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | No | The delivery method for the card order. |
| `embossedName` | `string` | No | The cardholder's name to print on the card (physical card only). |
| `errors` | `table` | No | Collection of validation errors. |
| `firstLine` | `string` | No | Card holder's address (max 30 characters). |
| `id` | `number` | No | ID of the card order. |
| `lifetimeLimit` | `number|nil` | No | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | No | Time when the card order was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card order. |
| `postCode` | `string` | No | Card holder's postal code (max 10 characters). |
| `profileId` | `number` | No | Profile ID. |
| `program` | `string` | Yes | The name of the card program. |
| `replacementDetails` | `table` | No | The replacement details for this card. |
| `replacesCard` | `string|nil` | No | Token of the card being replaced by this replacement card order. |
| `secondLine` | `string|nil` | No | Card holder's address (max 30 characters). |
| `state` | `string|nil` | No | Card holder's state (max 30 characters). |
| `status` | `string` | No | Status of the card order. |
| `thirdLine` | `string|nil` | No | Card holder's address (max 30 characters). |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `address` | - | - | - | - |
| `cardHolderName` | - | - | Yes | - |
| `cardHolderProfileId` | - | - | - | - |
| `cardProgram` | - | - | - | - |
| `cardToken` | - | - | - | - |
| `city` | - | - | - | - |
| `clientId` | - | - | - | - |
| `country` | - | - | - | - |
| `creationTime` | - | - | - | - |
| `deliveryDetails` | - | - | - | - |
| `deliveryEstimate` | - | - | - | - |
| `deliveryOption` | - | - | - | - |
| `embossedName` | - | - | - | - |
| `errors` | - | - | - | - |
| `firstLine` | - | - | - | - |
| `id` | - | - | - | - |
| `lifetimeLimit` | - | - | - | - |
| `modificationTime` | - | - | - | - |
| `phoneNumber` | - | - | - | - |
| `postCode` | - | - | - | - |
| `profileId` | - | - | - | - |
| `program` | - | - | - | - |
| `replacementDetails` | - | - | - | - |
| `replacesCard` | - | - | - | - |
| `secondLine` | - | - | - | - |
| `state` | - | - | - | - |
| `status` | - | - | - | - |
| `thirdLine` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CardOrder():create({
  cardHolderName = --[[ string ]],
  program = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CardOrder():list({ profile_id = 1 })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CardOrder():load({ id = 1, profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:CardOrder():update({
  id = 1,
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardSensitiveDetailEntity

```lua
local card_sensitive_detail = client:CardSensitiveDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `encryptedPayload` | `string` | Yes | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `string` | No | The RSA public key. |
| `keyVersion` | `number` | Yes | The version of the key to use. |
| `version` | `number` | No | Version of the encryption key. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:CardSensitiveDetail():create({
  encryptedPayload = --[[ string ]],
  keyVersion = --[[ number ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CardSensitiveDetail():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardSensitiveDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CardTransactionEntity

```lua
local card_transaction = client:CardTransaction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approvalCode` | `string|nil` | No | Also called authorization code. |
| `arn` | `string|nil` | No | Acquirer reference number |
| `authorisationMethod` | `string` | No | Authorisation method |
| `balanceChannelReferenceId` | `string|nil` | No | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `table` | No | Billing amount |
| `cardToken` | `string` | No | Unique identifier of the card |
| `creationTime` | `string` | No | When the transaction was created |
| `credits` | `table` | No | Array of credits. |
| `debits` | `table` | No | Array of debits. |
| `declineReason` | `string|nil` | No | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `string|nil` | No | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `table` | No | Array of fees |
| `id` | `number` | No | ID of the transaction |
| `merchant` | `table` | No | Merchant information |
| `modificationTime` | `string` | No | When the transaction was last updated |
| `pinValidationResult` | `string|nil` | No | PIN validation result. |
| `purgeTime` | `string|nil` | No | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `table|nil` | No | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | No | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `table` | No | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `table` | No | Transaction amount including all fees |
| `type` | `string` | No | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:CardTransaction():list({ card_token = "example", profile_id = 1, from_creation_time = "example", to_creation_time = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:CardTransaction():load({ id = 1, profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardTransactionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CaseEntity

```lua
local case = client:Case(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp when the case was created. |
| `description` | `string` | No | The description of the request. |
| `details` | `table` | No | Details related to the case. |
| `externalId` | `string` | No | Partner-created identifier for this case, if applicable. |
| `id` | `number` | Yes | Unique identifier of the case. |
| `messages` | `table` | Yes | List of messages associated with this case. |
| `profileId` | `number` | Yes | The profile ID associated with this case. |
| `reference` | `table` | Yes | Reference information linking the case to a related entity. |
| `status` | `string` | Yes | The current status of the support case. |
| `subType` | `string` | No | The sub-type of the support case. |
| `subject` | `string` | No | The subject of the case. |
| `type` | `string` | Yes | The type of the support case. |
| `updatedAt` | `string` | No | Timestamp when the case was last updated. |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `createdAt` | - | Yes |
| `description` | - | - |
| `details` | - | - |
| `externalId` | - | - |
| `id` | - | Yes |
| `messages` | - | - |
| `profileId` | - | - |
| `reference` | - | - |
| `status` | - | Yes |
| `subType` | - | - |
| `subject` | - | - |
| `type` | - | Yes |
| `updatedAt` | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Case():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Case():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CaseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ClaimAccountEntity

```lua
local claim_account = client:ClaimAccount(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claimAccountCode` | `string` | No | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `string` | Yes | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ClaimAccount():create({
  registrationCode = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClaimAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ComparisonEntity

```lua
local comparison = client:Comparison(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | The comparison amount |
| `amountType` | `string` | No | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `string|nil` | No | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `table` | No | List of provider types included in the response |
| `providers` | `table` | No | List of providers with their estimated quotes |
| `sourceCountry` | `string|nil` | No | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `string|nil` | No | ISO 4217 source currency code |
| `targetCountry` | `string|nil` | No | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `string|nil` | No | ISO 4217 target currency code |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Comparison():load({ source_currency = "source_currency", target_currency = "target_currency" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContactEntity

```lua
local contact = client:Contact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | `string` | No | Contact ID in the format of UUID. |
| `identifier` | `string` | No | A Wise profile's identifier. |
| `name` | `string` | No | Full name of the contact. |
| `targetCurrency` | `string` | No | 3 character currency code. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Contact():create({
  profile_id = --[[ number ]],
  is_direct_identifier_creation = --[[ boolean ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContactEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CurrencyEntity

```lua
local currency = client:Currency(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `table` | No | Keywords associated with this currency. |
| `name` | `string` | No | Display name of this currency. |
| `supportsDecimals` | `boolean` | No | Whether this currency supports decimal values or not. |
| `symbol` | `string` | No | The symbol of this currency. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Currency():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeliveryEstimateEntity

```lua
local delivery_estimate = client:DeliveryEstimate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estimatedDeliveryDate` | `string` | No | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `string` | No | A string to display to users for the estimated delivery date. |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:DeliveryEstimate():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeliveryEstimateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeliveryUpdateEntity

```lua
local delivery_update = client:DeliveryUpdate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery_update` | `string` | Yes | The delivery signal to simulate. |
| `delivery_update_path` | `table` | Yes | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `string|nil` | No | Optional estimated delivery time. |
| `observation_id` | `string` | Yes | Server-generated observation identifier. |
| `occurred_at` | `string` | Yes | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `string|nil` | No | Payment scheme to include in the observation. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DeliveryUpdate():create({
  transfer_id = --[[ number ]],
  delivery_update = --[[ string ]],
  delivery_update_path = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeliveryUpdateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DigitalWalletEntity

```lua
local digital_wallet = client:DigitalWallet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation` | `string` | Yes | Approve or decline a payment token activation |
| `paymentTokens` | `table` | No |  |
| `walletNames` | `table` | No | List of supported wallet types. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DigitalWallet():create({
  card_token = --[[ string ]],
  profile_id = --[[ number ]],
  activation = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalWalletEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DirectDebitAccountEntity

```lua
local direct_debit_account = client:DirectDebitAccount(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | No | Currency of the bank account. |
| `details` | `table` | No | Bank account details |
| `id` | `number` | No | Direct debit account ID |
| `type` | `string` | No | Payment type for which the account is used. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:DirectDebitAccount():create({
  profile_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DirectDebitAccount():list({ profile_id = 1, currency = "example", type = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DirectDebitAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DirectorEntity

```lua
local director = client:Director(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryOfResidenceIso3Code` | `string` | No | 3 character country code. |
| `dateOfBirth` | `string` | No | Date of birth. |
| `directors` | `table` | No |  |
| `firstName` | `string` | No | Director first name. |
| `id` | `number` | No | ID of the director. |
| `lastName` | `string` | No | Director last name. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Director():create({
  profile_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Director():list({ profile_id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Director():remove({ profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Director():update({
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DirectorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DisputeEntity

```lua
local dispute = client:Dispute(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canWithdraw` | `boolean` | No | Whether the dispute can be withdrawn. |
| `createdAt` | `string` | No | Time when the dispute was created. |
| `createdBy` | `string` | No | Creator of the dispute. |
| `disclaimer` | `table` | No | Acknowledgement fields. |
| `files` | `table` | No | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `table` | No | Form fields required to submit this dispute. |
| `id` | `string` | No | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | No | Time when the dispute was last updated. |
| `profileId` | `number` | No | Profile ID. |
| `reason` | `string` | No | Dispute reason code. |
| `receipt` | `string` | No | The file to upload. |
| `status` | `string` | No | Dispute overall status. |
| `statusMessage` | `string` | No | Explanation for `subStatus`. |
| `subStatus` | `string` | No | Dispute detailed status. |
| `transaction` | `table` | No | Transaction details for the dispute. |
| `transactionId` | `number` | No | Card transaction ID. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Dispute():create({
  profile_id = --[[ number ]],
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Dispute():list({ profile_id = 1 })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Dispute():load({ id = "dispute_id", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Dispute():update({
  id = "dispute_id",
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DisputeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DisputeReasonEntity

```lua
local dispute_reason = client:DisputeReason(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The type of reasons available for the dispute. |
| `description` | `string` | No | The description of the dispute reason. |
| `isFraud` | `boolean` | No | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `table` | No | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `boolean` | No | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | No | Text to display when showing the dispute form to your users. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:DisputeReason():list({ profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DisputeReasonEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FacetecEntity

```lua
local facetec = client:Facetec(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Facetec():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FacetecEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FileEntity

```lua
local file = client:File(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp when the file was uploaded. |
| `file` | `string` | Yes | The file to upload. |
| `fileId` | `string` | Yes | Unique identifier of the uploaded file. |
| `fileName` | `string` | Yes | The name of the uploaded file. |
| `profileId` | `number` | Yes | The ID of the profile this file belongs to. |
| `purpose` | `string` | Yes | The purpose of the file upload. |
| `submissionData` | `table` | Yes | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:File():create({
  createdAt = --[[ string ]],
  file = --[[ string ]],
  fileId = --[[ string ]],
  fileName = --[[ string ]],
  profileId = --[[ number ]],
  purpose = --[[ string ]],
  submissionData = --[[ table ]],
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:File():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FundingEntity

```lua
local funding = client:Funding(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransactionId` | `number` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Funding():create({
  profile_id = --[[ number ]],
  transfer_id = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FundingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GpiTrackingEntity

```lua
local gpi_tracking = client:GpiTracking(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | Yes | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | Yes | The type of identifier used to look up the transfer. |
| `transactions` | `table` | No | The matching GPI tracking transactions. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:GpiTracking():create({
  identifier = --[[ string ]],
  identifierType = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GpiTrackingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HoldLimitBreachEntity

```lua
local hold_limit_breach = client:HoldLimitBreach(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | Amount value. |
| `closingReason` | `string` | No | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `string` | No | Date when the hold limit breach was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `number` | No | Hold limit breach ID. |
| `profileId` | `number` | No | ID of the profile that owns the hold limit breach |
| `state` | `string` | No | Current state of the hold limit breach. |
| `updatedAt` | `string` | No | Date when the hold limit breach was last modified. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:HoldLimitBreach():list({ profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HoldLimitBreachEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IncomingTransferEntity

```lua
local incoming_transfer = client:IncomingTransfer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `string` | No | Account details ID that received the incoming transfer. |
| `amounts` | `table` | Yes | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Yes | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | No | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | No | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Yes | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `table` | Yes | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `table` | Yes | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | No | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `number` | Yes | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `table` | Yes | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Yes | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `table` | Yes | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `number` | Yes | Profile ID of the balance owner. |
| `scheme` | `string` | Yes | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Yes | Current state of the incoming transfer. |
| `uetr` | `string` | No | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | No | Unstructured remittance information provided by the debtor. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:IncomingTransfer():load({ id = "incoming_transfer_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IncomingTransferEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## JoseEntity

```lua
local jose = client:Jose(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keyId` | `string` | No | ID of the key in UUID format. |
| `keyMaterial` | `table` | No |  |
| `publicKeyMaterial` | `table` | No |  |
| `scope` | `string` | No | Scope of the key. |
| `validFrom` | `string` | No | The key is valid from this date. |
| `validTill` | `string` | No | The key is valid until this date. |
| `version` | `number` | No | Version of the public key issued. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Jose():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Jose():load({ algorithm = "algorithm", scope = "scope" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JoseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## KycReviewEntity

```lua
local kyc_review = client:KycReview(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Timestamp marking the creation of the KYC Review. |
| `id` | `string` | No | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `table|nil` | No | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `string|nil` | No | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `string|nil` | No | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `table|nil` | No | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | No | Aggregated state of the underlying requirement set. |
| `triggerData` | `table` | No | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `table` | No | List of trigger reference objects. |
| `type` | `string` | Yes | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `string` | No | Timestamp marking the last update of the KYC Review. |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - |
| `id` | - | - | - | - |
| `link` | - | - | - | - |
| `redirectUrl` | - | - | - | Yes |
| `requiredBy` | - | - | - | - |
| `requirements` | - | - | - | - |
| `status` | - | - | - | - |
| `triggerData` | - | - | - | - |
| `triggerReferences` | - | - | - | - |
| `type` | - | - | - | - |
| `updatedAt` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:KycReview():create({
  profile_id = --[[ number ]],
  type = --[[ string ]],
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:KycReview():list({ profile_id = 1 })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:KycReview():load({ id = "kyc_review_id", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:KycReview():update({
  id = "kyc_review_id",
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KycReviewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LinkRequestEntity

```lua
local link_request = client:LinkRequest(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientKey` | `string` | Yes | Client key that created the embedded link request. |
| `email` | `string` | Yes | The end user's email address, to receive dispute updates. |
| `id` | `string` | Yes | Embedded link request ID. |
| `metadata` | `table` | Yes | Flow-specific metadata. |
| `profileId` | `number` | Yes | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | Yes | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `number` | Yes | The ID of the card transaction to dispute. |
| `type` | `string` | Yes | Embedded Flow type. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:LinkRequest():create({
  profile_id = --[[ number ]],
  email = --[[ string ]],
  redirectUrl = --[[ string ]],
  transactionId = --[[ number ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:LinkRequest():load({ id = "link_request_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkRequestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MessageEntity

```lua
local message = client:Message(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionData` | `table` | Yes | The data for the message submission. |
| `type` | `string` | Yes | The type of message submission. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Message():create({
  case_id = --[[ number ]],
  submissionData = --[[ table ]],
  type = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MultiCurrencyAccountEntity

```lua
local multi_currency_account = client:MultiCurrencyAccount(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:MultiCurrencyAccount():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MultiCurrencyAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OneTimeTokenEntity

```lua
local one_time_token = client:OneTimeToken(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challenges` | `table` | No | An array of challenges. |
| `faceMap` | `string` | No | A base64 encoded string. |
| `oneTimeToken` | `string` | No | A one-time token unique identifier. |
| `validity` | `number` | No | The One-Time Token expiration in seconds. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:OneTimeToken():create({
  profile_id = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OneTimeTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OttEntity

```lua
local ott = client:Ott(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionType` | `string` | No | The action bound to the one time token. |
| `challenges` | `table` | No | Array of challenge objects. |
| `oneTimeToken` | `string` | No | Unique identifier of a one time token. |
| `userId` | `number` | No | Creator of this one time token. |
| `validity` | `number` | No | Seconds until the one time token becomes expired. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Ott():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OttEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PayinEntity

```lua
local payin = client:Payin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No |  |
| `currency` | `string` | No |  |
| `details` | `table` | No | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `string` | No |  |
| `id` | `string` | No |  |
| `payinSessionId` | `string` | No |  |
| `paymentInstrumentId` | `string` | No |  |
| `qrCodeInBase64` | `string` | No | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `string` | No |  |
| `status` | `string` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `amount` | - |
| `currency` | - |
| `details` | - |
| `failureReason` | - |
| `id` | - |
| `payinSessionId` | Yes |
| `paymentInstrumentId` | - |
| `qrCodeInBase64` | - |
| `reference` | - |
| `status` | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Payin():create({
  payin_session_id = --[[ string ]],
  profile_id = --[[ number ]],
  payinSessionId = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayinEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PayinDepositDetailEntity

```lua
local payin_deposit_detail = client:PayinDepositDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `payinBank` | `table` | No | Information about the receiving bank. |
| `payinBankAccount` | `table` | No | Bank account details to use to send the payment to. |
| `wiseInformation` | `table` | No | Information about the receiving Wise entity, the owner of the bank account. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PayinDepositDetail():load({ profile_id = 1, transfer_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayinDepositDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentEntity

```lua
local payment = client:Payment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | Transfer source amount |
| `currency` | `string` | No | Transfer source currency |
| `id` | `number` | No | Payment ID |
| `method` | `string` | No | The payment method used to pay for the transfer |
| `pricingVariant` | `string|nil` | No | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | No | Date of when payment was created |
| `timeUpdated` | `string` | No | Date of when payment was updated |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Payment():list({ transfer_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentInitiationEntity

```lua
local payment_initiation = client:PaymentInitiation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PaymentInitiation():create({
  batch_group_id = --[[ string ]],
  profile_id = --[[ number ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PaymentInitiation():load({ id = 1, batch_group_id = "batch_group_id", profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentInitiationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentInstrumentEntity

```lua
local payment_instrument = client:PaymentInstrument(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No |  |
| `accountNumber` | `string` | No |  |
| `accountOwnerDetails` | `table` | No |  |
| `accountType` | `string` | No |  |
| `bankCode` | `string` | No |  |
| `bankName` | `string` | No |  |
| `branchCode` | `string` | No |  |
| `disconnectReason` | `string` | No |  |
| `id` | `string` | No |  |
| `reference` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `accountHolderName` | - | - | - |
| `accountNumber` | - | - | Yes |
| `accountOwnerDetails` | - | - | - |
| `accountType` | - | - | - |
| `bankCode` | - | - | - |
| `bankName` | - | - | - |
| `branchCode` | - | - | - |
| `disconnectReason` | - | - | - |
| `id` | - | - | - |
| `reference` | - | - | - |
| `status` | - | - | - |
| `type` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PaymentInstrument():create({
  profile_id = --[[ number ]],
  accountNumber = --[[ string ]],
  type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PaymentInstrument():list({ id = "example", profile_id = 1 })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PaymentInstrument():load({ id = "payment_instrument_id", profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentInstrumentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentIntentEntity

```lua
local payment_intent = client:PaymentIntent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocationId` | `string` | No | Unique identifier of the associated settlement allocation. |
| `allocationType` | `string` | No | Type of allocation. |
| `createdAt` | `string` | No | Timestamp when the payment intent was created. |
| `fundingSource` | `string` | No | Source of funding for the payment. |
| `id` | `string` | No | Unique identifier of the payment intent. |
| `partnerEntityId` | `string` | No | Partner entity identifier. |
| `paymentReference` | `string` | No | Payment reference. |
| `profileId` | `string` | No | Profile identifier. |
| `reason` | `string` | No | Reason for the payment. |
| `recipientType` | `string` | No | Type of recipient. |
| `sourceAmount` | `number` | No | Source amount of the payment. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217). |
| `state` | `string` | No | Current state of the payment intent. |
| `targetAmount` | `number` | No | Target amount of the payment. |
| `targetCurrency` | `string` | No | Target currency code (ISO 4217). |
| `updatedAt` | `string` | No | Timestamp when the payment intent was last updated. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PaymentIntent():load({ id = "payment_intent_id", allocation_id = "allocation_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentIntentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhoneNumberEntity

```lua
local phone_number = client:PhoneNumber(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | No | Client ID of which this phone number belongs to. |
| `id` | `number` | No | ID of the phone number. |
| `phoneNumber` | `string` | No | A text representation of phone number. |
| `type` | `string` | No | Type of phone number when used in authentication. |
| `verified` | `boolean` | No | Indicator if phone number is verified. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PhoneNumber():create({
  user_id = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhoneNumberEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductionEntity

```lua
local production = client:Production(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string|nil` | No | Detailed description of the error code. |
| `errorCode` | `string|nil` | No | Code returned when card production is not successful. |
| `kioskId` | `string|nil` | No | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `string` | No | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `string` | No | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `description` | - | - |
| `errorCode` | - | - |
| `kioskId` | - | Yes |
| `occurredAt` | - | - |
| `status` | - | - |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Production():load({ card_token = "card_token", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Production():update({
  card_token = "card_token",
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProfileEntity

```lua
local profile = client:Profile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `table` | No |  |
| `avatar` | `string` | No |  |
| `contactDetails` | `table` | No |  |
| `createdAt` | `string` | No |  |
| `currentState` | `string` | No |  |
| `dateOfBirth` | `string` | No |  |
| `email` | `string` | No |  |
| `firstName` | `string` | No |  |
| `fullName` | `string` | No |  |
| `id` | `number` | No |  |
| `lastName` | `string` | No |  |
| `phoneNumber` | `string` | No |  |
| `preferredName` | `string` | No |  |
| `publicId` | `string` | No |  |
| `secondaryAddresses` | `table` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `userId` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Profile():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Profile():load({ id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QuoteEntity

```lua
local quote = client:Quote(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdTime` | `string` | No | Quote created timestamp. |
| `creationContext` | `table` | No | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | No | The date and time the quote expires. |
| `guaranteedTargetAmount` | `boolean` | No | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `boolean` | No | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | No | ID of this quote (GUID format). |
| `notices` | `table` | No | Messages to display to the user. |
| `payOut` | `string` | No | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `table` | No | _Optional_. |
| `paymentOptions` | `table` | No | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | No | Preferred pay-in method. |
| `pricingConfiguration` | `table` | No | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `number` | No | Personal or business profile ID. |
| `providedAmountType` | `string` | No | Indicates whether the quote was created as source or target. |
| `rate` | `number` | No | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `string` | No | Date and time the locked rate expires. |
| `rateType` | `string` | No | Whether the rate is fixed or floating. |
| `sourceAmount` | `number` | No | Amount in source currency to send. |
| `sourceCurrency` | `string` | No | Source (sending) currency code. |
| `status` | `string` | No | Current status of the quote. |
| `targetAccount` | `number` | No | _Optional_. |
| `targetAmount` | `number` | No | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `boolean` | No | Indicates whether target amount is allowed. |
| `targetCurrency` | `string` | No | Target (receive) currency code. |
| `user` | `number` | No | User ID that created the quote. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `createdTime` | - | - | - |
| `creationContext` | - | - | - |
| `expirationTime` | - | - | - |
| `guaranteedTargetAmount` | - | - | - |
| `guaranteedTargetAmountAllowed` | - | - | - |
| `id` | - | - | - |
| `notices` | - | - | - |
| `payOut` | - | - | - |
| `paymentMetadata` | - | - | - |
| `paymentOptions` | - | - | - |
| `preferredPayIn` | - | - | - |
| `pricingConfiguration` | - | - | - |
| `profile` | - | - | - |
| `providedAmountType` | - | - | - |
| `rate` | - | - | - |
| `rateExpirationTime` | - | - | - |
| `rateType` | - | - | - |
| `sourceAmount` | - | - | - |
| `sourceCurrency` | - | Yes | - |
| `status` | - | - | - |
| `targetAccount` | - | - | - |
| `targetAmount` | - | - | - |
| `targetAmountAllowed` | - | - | - |
| `targetCurrency` | - | Yes | - |
| `user` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Quote():create({
  sourceCurrency = --[[ string ]],
  targetCurrency = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Quote():load({ id = "quote_id", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Quote():update({
  id = "quote_id",
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RateEntity

```lua
local rate = client:Rate(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `number` | Yes | Exchange rate value. |
| `source` | `string` | Yes | Source (send) currency code. |
| `target` | `string` | Yes | Target (receive) currency code. |
| `time` | `string` | Yes | Timestamp for exchange rate. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Rate():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecipientEntity

```lua
local recipient = client:Recipient(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedOutcomes` | `boolean` | Yes | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `string` | No | Recipient full name. |
| `accountId` | `number` | No | Recipient account ID. |
| `accountSummary` | `string` | No | Summary of account details for ease of lookup. |
| `active` | `boolean` | No | Status of the recipient account. |
| `commonFieldMap` | `table` | No | Map of key lookup fields for the account. |
| `confirmations` | `table` | No | Contains verification results for the recipient's details. |
| `country` | `string` | No | 2-character country code. |
| `creatorId` | `number` | No | Account entity that owns the recipient account. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `table` | No | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `table` | No | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | No | Account hash for tracking changes to recipient details. |
| `id` | `number` | No | ID of the recipient. |
| `isInternal` | `boolean` | No | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | No | Entity type of recipient account. |
| `longAccountSummary` | `string` | No | Longer account details summary. |
| `name` | `table` | No | Recipient name details. |
| `ownedByCustomer` | `boolean` | No | Inidicates if recipient account belongs to profile owner. |
| `profile` | `number` | No | Personal or business profile ID of the sender. |
| `profileId` | `number` | No | Specific profile that owns the recipient account. |
| `quoteId` | `string` | No | Quote ID. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `table|nil` | Yes | The details for the ultimate beneficiary of this recipient. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Recipient():create({
  acceptedOutcomes = --[[ boolean ]],
  ultimateBeneficiary = --[[ table|nil ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Recipient():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Recipient():load({ account_id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Recipient():remove({ account_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Recipient():update({
  account_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipientEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RuleEntity

```lua
local rule = client:Rule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | The description of the authorisation rule. |
| `id` | `number` | No | The unique ID for the authorisation rule. |
| `operation` | `string` | No | Determines whether the transactions should be allowed or blocked. |
| `type` | `string` | No | The type of authorisation rule. |
| `values` | `table` | No | A list of values based on the `type` of rule configured. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Rule():create({
  application_id = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Rule():list({ application_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SamlEntity

```lua
local saml = client:Saml(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `RelayState` | `string` | No | Opaque state value. |
| `SAMLResponse` | `string` | Yes | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Saml():create({
  SAMLResponse = --[[ string ]],
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Saml():load({ registration_id = "registration_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SamlEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScaDeviceFingerprintEntity

```lua
local sca_device_fingerprint = client:ScaDeviceFingerprint(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `string` | No | The identifier of the device fingerprint. |
| `id` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ScaDeviceFingerprint():create({
  profile_id = --[[ number ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:ScaDeviceFingerprint():remove({ id = "sca_device_fingerprint_id", profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaDeviceFingerprintEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScaFacemapEntity

```lua
local sca_facemap = client:ScaFacemap(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `faceMap` | `string` | No | A base64 encoded string. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ScaFacemap():create({
  profile_id = --[[ number ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:ScaFacemap():remove({ profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaFacemapEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScaOtpEntity

```lua
local sca_otp = client:ScaOtp(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:ScaOtp():remove({ phone_number_id = 1, user_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaOtpEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScaSessionEntity

```lua
local sca_session = client:ScaSession(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ScaSession():create({
  profile_id = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaSessionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SettlementAllocationEntity

```lua
local settlement_allocation = client:SettlementAllocation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | `table` | Yes |  |
| `createdAt` | `string` | No | Timestamp when the settlement allocation was created. |
| `currency` | `string` | No | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `number` | No | Expected total amount for the allocation. |
| `file` | `string` | Yes | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | No | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | No | Token for fetching the next page of payment intents. |
| `paymentIntents` | `table` | No | List of payment intents associated with the allocation. |
| `paymentReference` | `string` | No | Unique payment reference for the settlement allocation. |
| `state` | `string` | No | Current state of the settlement allocation. |
| `updatedAt` | `string` | No | Timestamp when the settlement allocation was last updated. |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `command` | - | - |
| `createdAt` | - | Yes |
| `currency` | - | Yes |
| `expectedTotalAmount` | - | Yes |
| `file` | - | - |
| `id` | - | Yes |
| `nextPageToken` | - | - |
| `paymentIntents` | - | - |
| `paymentReference` | - | Yes |
| `state` | - | Yes |
| `updatedAt` | - | Yes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:SettlementAllocation():create({
  command = --[[ table ]],
  createdAt = --[[ string ]],
  currency = --[[ string ]],
  expectedTotalAmount = --[[ number ]],
  file = --[[ string ]],
  id = --[[ string ]],
  paymentReference = --[[ string ]],
  state = --[[ string ]],
  updatedAt = --[[ string ]],
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:SettlementAllocation():load({ id = "settlement_allocation_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SettlementAllocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SimulationEntity

```lua
local simulation = client:Simulation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `string` | No |  |
| `created` | `string` | No |  |
| `creationTime` | `number` | No | Time when the card transaction was created. |
| `description` | `string|nil` | No | Description of the KYC review item. |
| `details` | `table` | No |  |
| `failure_reason_code` | `string` | No | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `boolean` | No |  |
| `id` | `string` | No |  |
| `key` | `string` | No | KYC review item key. |
| `quote` | `number` | No |  |
| `rate` | `number` | No |  |
| `reference` | `string` | No |  |
| `sourceAccount` | `string` | No |  |
| `sourceCurrency` | `string` | No |  |
| `sourceValue` | `number` | No |  |
| `state` | `string` | No | State of the KYC review item. |
| `status` | `string` | No |  |
| `targetAccount` | `number` | No |  |
| `targetCurrency` | `string` | No |  |
| `targetValue` | `number` | No |  |
| `transactionId` | `number` | No | ID of the transaction. |
| `transferRequest` | `string` | No |  |
| `user` | `number` | No |  |
| `wise_id` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Simulation():create({
  transfer_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Simulation():list({ card_token = "example", profile_id = 1 })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Simulation():load({ status = "status", transfer_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SimulationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SpendControlEntity

```lua
local spend_control = client:SpendControl(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ruleId` | `number` | No | The ID of the applied authorisation rule. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:SpendControl():list({ application_id = "example" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:SpendControl():remove({ application_id = "application_id", rule_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpendControlEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SpendLimitEntity

```lua
local spend_limit = client:SpendLimit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `table` | No |  |
| `id` | `string` | No |  |
| `type` | `string` | No | The type of transaction. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:SpendLimit():list({ profile_id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:SpendLimit():remove({ id = "spend_limit_id", card_id = "card_id", profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:SpendLimit():update({
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpendLimitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SubscriptionEntity

```lua
local subscription = client:Subscription(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the subscription was created. |
| `created_by` | `table` | No |  |
| `delivery` | `table` | No |  |
| `id` | `string` | No | UUID that uniquely identifies the subscription. |
| `name` | `string` | No | A custom name for your webhook to ease with identification. |
| `scope` | `table` | No |  |
| `trigger_on` | `string` | No | The event type this subscription is listening for. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - |
| `created_by` | - | - | - | - |
| `delivery` | - | - | Yes | - |
| `id` | - | - | - | - |
| `name` | - | - | Yes | - |
| `scope` | - | - | - | - |
| `trigger_on` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Subscription():create({
  client_key = --[[ string ]],
  delivery = --[[ table ]],
  name = --[[ string ]],
  trigger_on = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Subscription():list({ client_key = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Subscription():load({ id = "subscription_id", client_key = "client_key" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Subscription():remove({ id = "subscription_id", client_key = "client_key" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TestNotificationEntity

```lua
local test_notification = client:TestNotification(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the test notification was created. |
| `delivery_id` | `string` | No | ID of the delivery that was queued for sending. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:TestNotification():create({
  client_key = --[[ string ]],
  subscription_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TestNotificationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ThirdPartyTransferEntity

```lua
local third_party_transfer = client:ThirdPartyTransfer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | No | Timestamp when transfer was created. |
| `details` | `table` | No | Payment Details |
| `hasActiveIssues` | `boolean` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | No | Transfer ID |
| `originalTransferId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `table` | No | Data block to capture payment originator details |
| `quote` | `string` | No | Quote ID |
| `rate` | `number` | No | Exchange rate value |
| `sourceAccount` | `number` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `number` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `number` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `number` | No | Transfer amount in target currency |
| `user` | `number` | No | Your user ID |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `created` | - | - |
| `details` | - | Yes |
| `hasActiveIssues` | - | - |
| `id` | - | - |
| `originalTransferId` | - | Yes |
| `originator` | - | Yes |
| `quote` | - | Yes |
| `rate` | - | - |
| `sourceAccount` | - | - |
| `sourceCurrency` | - | - |
| `sourceValue` | - | - |
| `status` | - | - |
| `targetAccount` | - | Yes |
| `targetCurrency` | - | - |
| `targetValue` | - | - |
| `user` | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ThirdPartyTransfer():create({
  profile_id = --[[ number ]],
  details = --[[ table ]],
  originalTransferId = --[[ string ]],
  originator = --[[ table ]],
  quote = --[[ string ]],
  targetAccount = --[[ number ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ThirdPartyTransfer():load({ id = 1, profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThirdPartyTransferEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ThreeDSecureEntity

```lua
local three_d_secure = client:ThreeDSecure(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeStatus` | `string` | Yes | The customer's response to the 3DS challenge. |
| `transactionReference` | `string` | Yes | Transaction reference as received in the 3DS challenge webhook event. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:ThreeDSecure():create({
  profile_id = --[[ number ]],
  challengeStatus = --[[ string ]],
  transactionReference = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThreeDSecureEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TokenEntity

```lua
local token = client:Token(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | No | Access token to be used when calling the API. |
| `created_at` | `string` | No | Token creation time in ISO 8601 format. |
| `expires_at` | `string` | No | Access token expiration timestamp (UTC). |
| `expires_in` | `number` | No | Access token expiry time in seconds. |
| `refresh_token` | `string` | No | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `string` | No | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `number` | No | Refresh token expiry time in seconds. |
| `scope` | `string` | No | Scope of the token. |
| `token_type` | `string` | No | Type of the token. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Token():create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TransferEntity

```lua
local transfer = client:Transfer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `number|nil` | No | Your business profile ID |
| `created` | `string` | No | Timestamp when transfer was created |
| `customerTransactionId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `table` | No |  |
| `hasActiveIssues` | `boolean` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | No | Transfer ID |
| `payinSessionId` | `string` | No | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `number|nil` | No | V1 quote ID |
| `quoteUuid` | `string` | No | V2 quote ID |
| `rate` | `number` | No | Exchange rate value |
| `reference` | `string` | No | Deprecated, use `details.reference` instead |
| `sourceAccount` | `number|nil` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `number` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `number` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `number` | No | Transfer amount in target currency |
| `transferRequest` | `number|nil` | No | Deprecated |
| `user` | `number` | No | Your user ID |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `business` | - | - | - | - |
| `created` | - | - | - | - |
| `customerTransactionId` | - | - | Yes | - |
| `details` | - | - | - | - |
| `hasActiveIssues` | - | - | - | - |
| `id` | - | - | - | - |
| `payinSessionId` | - | - | - | - |
| `quote` | - | - | - | - |
| `quoteUuid` | - | - | Yes | - |
| `rate` | - | - | - | - |
| `reference` | - | - | - | - |
| `sourceAccount` | - | - | - | - |
| `sourceCurrency` | - | - | - | - |
| `sourceValue` | - | - | - | - |
| `status` | - | - | - | - |
| `targetAccount` | - | - | Yes | - |
| `targetCurrency` | - | - | - | - |
| `targetValue` | - | - | - | - |
| `transferRequest` | - | - | - | - |
| `user` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Transfer():create({
  customerTransactionId = --[[ string ]],
  quoteUuid = --[[ string ]],
  targetAccount = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Transfer():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Transfer():load({ id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Transfer():update({
  id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransferEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TransferRequirementEntity

```lua
local transfer_requirement = client:TransferRequirement(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customerTransactionId` | `string` | No | Unique identifier for the transfer request |
| `details` | `table` | No |  |
| `originatorLegalEntityType` | `string` | No | Type of sender. |
| `quoteUuid` | `string` | Yes | V2 quote ID |
| `targetAccount` | `number` | Yes | Recipient account ID |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:TransferRequirement():create({
  quoteUuid = --[[ string ]],
  targetAccount = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransferRequirementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UboEntity

```lua
local ubo = client:Ubo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressFirstLine` | `string` | No | First line of address. |
| `city` | `string` | No | City of residential address. |
| `countryOfResidenceIso3Code` | `string` | No | 3 character country code. |
| `dateOfBirth` | `string` | No | Date of birth. |
| `id` | `string` | No | ID of the ultimate beneficial owner. |
| `name` | `string` | No | Owner full name. |
| `ownershipPercentage` | `number` | No | Percentage of ownership. |
| `postCode` | `string` | No | Address post code. |
| `state` | `string` | No | State or region of residential address. |
| `ubos` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Ubo():create({
  profile_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Ubo():list({ profile_id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:Ubo():update({
  profile_id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UboEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No | If user is active or not. |
| `details` | `table|nil` | No | User details. |
| `email` | `string` | No | User's email. |
| `id` | `number` | No | User ID. |
| `language` | `string` | No | User default language for UI and email communication. |
| `name` | `string|nil` | No | User's full name. |
| `registrationCode` | `string` | Yes | Randomly generated registration code that is unique to this user and request. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `active` | - | - | - |
| `details` | - | - | - |
| `email` | - | Yes | - |
| `id` | - | - | - |
| `language` | - | - | - |
| `name` | - | - | - |
| `registrationCode` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:User():create({
  email = --[[ string ]],
  registrationCode = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:User():load({ id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:User():update({
  id = 1,
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VerificationEntity

```lua
local verification = client:Verification(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_evidences` | `table` | No | List of evidence types required to complete verification. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Verification():create({
  profile_id = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Verification():list({ profile_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    secrets = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

