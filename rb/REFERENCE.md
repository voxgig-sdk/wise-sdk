# Wise Ruby SDK Reference

Complete API reference for the Wise Ruby SDK.


## WiseSDK

### Constructor

```ruby
require_relative 'Wise_sdk'

client = WiseSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WiseSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = WiseSDK.test
```


### Instance Methods

#### `AccountDetail(data = nil)`

Create a new `AccountDetail` entity instance. Pass `nil` for no initial data.

#### `AccountRequirement(data = nil)`

Create a new `AccountRequirement` entity instance. Pass `nil` for no initial data.

#### `Activity(data = nil)`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Address(data = nil)`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `AddressRequirement(data = nil)`

Create a new `AddressRequirement` entity instance. Pass `nil` for no initial data.

#### `Balance(data = nil)`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BalanceStatement(data = nil)`

Create a new `BalanceStatement` entity instance. Pass `nil` for no initial data.

#### `BankAccountDetail(data = nil)`

Create a new `BankAccountDetail` entity instance. Pass `nil` for no initial data.

#### `BankAccountDetailsOrder(data = nil)`

Create a new `BankAccountDetailsOrder` entity instance. Pass `nil` for no initial data.

#### `BatchGroup(data = nil)`

Create a new `BatchGroup` entity instance. Pass `nil` for no initial data.

#### `BulkSettlement(data = nil)`

Create a new `BulkSettlement` entity instance. Pass `nil` for no initial data.

#### `BusinessProfile(data = nil)`

Create a new `BusinessProfile` entity instance. Pass `nil` for no initial data.

#### `Card(data = nil)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardHolderLimit(data = nil)`

Create a new `CardHolderLimit` entity instance. Pass `nil` for no initial data.

#### `CardLimit(data = nil)`

Create a new `CardLimit` entity instance. Pass `nil` for no initial data.

#### `CardOrder(data = nil)`

Create a new `CardOrder` entity instance. Pass `nil` for no initial data.

#### `CardSensitiveDetail(data = nil)`

Create a new `CardSensitiveDetail` entity instance. Pass `nil` for no initial data.

#### `CardTransaction(data = nil)`

Create a new `CardTransaction` entity instance. Pass `nil` for no initial data.

#### `Case(data = nil)`

Create a new `Case` entity instance. Pass `nil` for no initial data.

#### `ClaimAccount(data = nil)`

Create a new `ClaimAccount` entity instance. Pass `nil` for no initial data.

#### `Comparison(data = nil)`

Create a new `Comparison` entity instance. Pass `nil` for no initial data.

#### `Contact(data = nil)`

Create a new `Contact` entity instance. Pass `nil` for no initial data.

#### `Currency(data = nil)`

Create a new `Currency` entity instance. Pass `nil` for no initial data.

#### `DeliveryEstimate(data = nil)`

Create a new `DeliveryEstimate` entity instance. Pass `nil` for no initial data.

#### `DeliveryUpdate(data = nil)`

Create a new `DeliveryUpdate` entity instance. Pass `nil` for no initial data.

#### `DigitalWallet(data = nil)`

Create a new `DigitalWallet` entity instance. Pass `nil` for no initial data.

#### `DirectDebitAccount(data = nil)`

Create a new `DirectDebitAccount` entity instance. Pass `nil` for no initial data.

#### `Director(data = nil)`

Create a new `Director` entity instance. Pass `nil` for no initial data.

#### `Dispute(data = nil)`

Create a new `Dispute` entity instance. Pass `nil` for no initial data.

#### `DisputeReason(data = nil)`

Create a new `DisputeReason` entity instance. Pass `nil` for no initial data.

#### `Facetec(data = nil)`

Create a new `Facetec` entity instance. Pass `nil` for no initial data.

#### `File(data = nil)`

Create a new `File` entity instance. Pass `nil` for no initial data.

#### `Funding(data = nil)`

Create a new `Funding` entity instance. Pass `nil` for no initial data.

#### `GpiTracking(data = nil)`

Create a new `GpiTracking` entity instance. Pass `nil` for no initial data.

#### `HoldLimitBreach(data = nil)`

Create a new `HoldLimitBreach` entity instance. Pass `nil` for no initial data.

#### `IncomingTransfer(data = nil)`

Create a new `IncomingTransfer` entity instance. Pass `nil` for no initial data.

#### `Jose(data = nil)`

Create a new `Jose` entity instance. Pass `nil` for no initial data.

#### `KycReview(data = nil)`

Create a new `KycReview` entity instance. Pass `nil` for no initial data.

#### `LinkRequest(data = nil)`

Create a new `LinkRequest` entity instance. Pass `nil` for no initial data.

#### `Message(data = nil)`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `MultiCurrencyAccount(data = nil)`

Create a new `MultiCurrencyAccount` entity instance. Pass `nil` for no initial data.

#### `OneTimeToken(data = nil)`

Create a new `OneTimeToken` entity instance. Pass `nil` for no initial data.

#### `Ott(data = nil)`

Create a new `Ott` entity instance. Pass `nil` for no initial data.

#### `Payin(data = nil)`

Create a new `Payin` entity instance. Pass `nil` for no initial data.

#### `PayinDepositDetail(data = nil)`

Create a new `PayinDepositDetail` entity instance. Pass `nil` for no initial data.

#### `Payment(data = nil)`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `PaymentInitiation(data = nil)`

Create a new `PaymentInitiation` entity instance. Pass `nil` for no initial data.

#### `PaymentInstrument(data = nil)`

Create a new `PaymentInstrument` entity instance. Pass `nil` for no initial data.

#### `PaymentIntent(data = nil)`

Create a new `PaymentIntent` entity instance. Pass `nil` for no initial data.

#### `PhoneNumber(data = nil)`

Create a new `PhoneNumber` entity instance. Pass `nil` for no initial data.

#### `Production(data = nil)`

Create a new `Production` entity instance. Pass `nil` for no initial data.

#### `Profile(data = nil)`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `Quote(data = nil)`

Create a new `Quote` entity instance. Pass `nil` for no initial data.

#### `Rate(data = nil)`

Create a new `Rate` entity instance. Pass `nil` for no initial data.

#### `Recipient(data = nil)`

Create a new `Recipient` entity instance. Pass `nil` for no initial data.

#### `Rule(data = nil)`

Create a new `Rule` entity instance. Pass `nil` for no initial data.

#### `Saml(data = nil)`

Create a new `Saml` entity instance. Pass `nil` for no initial data.

#### `ScaDeviceFingerprint(data = nil)`

Create a new `ScaDeviceFingerprint` entity instance. Pass `nil` for no initial data.

#### `ScaFacemap(data = nil)`

Create a new `ScaFacemap` entity instance. Pass `nil` for no initial data.

#### `ScaOtp(data = nil)`

Create a new `ScaOtp` entity instance. Pass `nil` for no initial data.

#### `ScaSession(data = nil)`

Create a new `ScaSession` entity instance. Pass `nil` for no initial data.

#### `SettlementAllocation(data = nil)`

Create a new `SettlementAllocation` entity instance. Pass `nil` for no initial data.

#### `Simulation(data = nil)`

Create a new `Simulation` entity instance. Pass `nil` for no initial data.

#### `SpendControl(data = nil)`

Create a new `SpendControl` entity instance. Pass `nil` for no initial data.

#### `SpendLimit(data = nil)`

Create a new `SpendLimit` entity instance. Pass `nil` for no initial data.

#### `Subscription(data = nil)`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `TestNotification(data = nil)`

Create a new `TestNotification` entity instance. Pass `nil` for no initial data.

#### `ThirdPartyTransfer(data = nil)`

Create a new `ThirdPartyTransfer` entity instance. Pass `nil` for no initial data.

#### `ThreeDSecure(data = nil)`

Create a new `ThreeDSecure` entity instance. Pass `nil` for no initial data.

#### `Token(data = nil)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `Transfer(data = nil)`

Create a new `Transfer` entity instance. Pass `nil` for no initial data.

#### `TransferRequirement(data = nil)`

Create a new `TransferRequirement` entity instance. Pass `nil` for no initial data.

#### `Ubo(data = nil)`

Create a new `Ubo` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Verification(data = nil)`

Create a new `Verification` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AccountDetailEntity

```ruby
account_detail = client.AccountDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `String` | Yes | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `Object` | Yes | Country/scheme-specific account identification. |
| `country` | `String` | Yes | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `Integer` | Yes | Unique identifier for the account details. |
| `profileId` | `Integer` | Yes | Profile ID of the account details owner. |
| `state` | `String` | Yes | Current state of the account details. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.AccountDetail.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccountDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AccountRequirementEntity

```ruby
account_requirement = client.AccountRequirement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `String` | No | Recipient full name. |
| `currency` | `String` | No | 3-character currency code. |
| `details` | `Hash` | No | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `Array` | No | List of UI field groups to collect required data. |
| `ownedByCustomer` | `Boolean` | No | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `Integer` | No | Personal or business profile ID of the sender. |
| `title` | `String` | No | Human-readable title for the requirement group. |
| `type` | `String` | No | Recipient account type. |
| `ultimateBeneficiary` | `Object` | Yes | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `String` | No | Optional usage/help text. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AccountRequirement.create({
  "quote_id" => "example_quote_id", # String
  "ultimateBeneficiary" => {}, # Object
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AccountRequirement.list({ "quote_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccountRequirementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ActivityEntity

```ruby
activity = client.Activity
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `String` | No | Timestamp when the activity was created. |
| `description` | `String` | No | A short description that briefly summarizes the activity. |
| `id` | `String` | No | Activity id. |
| `primaryAmount` | `String` | No | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `Hash` | No | The resource associated with the activity. |
| `secondaryAmount` | `String` | No | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `String` | No | Status of the Activity. |
| `title` | `String` | No | Title of the Activity. |
| `type` | `String` | No | Type of Activity. |
| `updatedOn` | `String` | No | Timestamp when the activity was last modified. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Activity.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AddressEntity

```ruby
address = client.Address
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `Hash` | No | Address details. |
| `id` | `Integer` | No | Address ID. |
| `profile` | `Integer` | No | User profile ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `details` | - | - | Yes |
| `id` | - | - | - |
| `profile` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Address.create({
  "details" => {}, # Hash
  "profile" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Address.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Address.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AddressRequirementEntity

```ruby
address_requirement = client.AddressRequirement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `Hash` | Yes | Address details to provide context for requirements lookup. |
| `fields` | `Array` | No | List of fields required for the address. |
| `profile` | `Integer` | No | User profile ID. |
| `type` | `String` | No | Always "address". |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AddressRequirement.create({
  "details" => {}, # Hash
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.AddressRequirement.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AddressRequirementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BalanceEntity

```ruby
balance = client.Balance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Hash` | No | Available balance that can be used to fund transfers. |
| `cashAmount` | `Hash` | No | Cash amount in the account. |
| `creationTime` | `String` | No | Date when the balance was created. |
| `currency` | `String` | No | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `Object` | No | Icon for the balance. |
| `id` | `Integer` | No | Balance ID. |
| `investmentState` | `String` | No | Investment state of the balance. |
| `modificationTime` | `String` | No | Date when the balance was last modified. |
| `name` | `Object` | No | Name of the balance. |
| `overdraft` | `Hash` | No | Overdraft details for the account. |
| `reservedAmount` | `Hash` | No | Amount reserved for transactions. |
| `state` | `String` | Yes | Must be `CLOSED`. |
| `targetRecipientId` | `Integer` | Yes | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `Hash` | No | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `Hash` | No | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `Hash` | No | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `String` | No | Type of balance account. |
| `visible` | `Boolean` | No | Whether the balance is visible to the user. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Balance.create({
  "profile_id" => 1, # Integer
  "currency" => "example_currency", # String
  "state" => "example_state", # String
  "targetRecipientId" => 1, # Integer
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Balance.list({ "profile_id" => 1, "type" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Balance.load({ "id" => 1, "currency" => "currency", "profile_id" => 1 })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Balance.remove({ "id" => 1, "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BalanceStatementEntity

```ruby
balance_statement = client.BalanceStatement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolder` | `Hash` | No | Account holder information. |
| `bankDetails` | `Object` | No | Local bank details for the account. |
| `endOfStatementBalance` | `Hash` | No | Closing balance for the specified time period. |
| `id` | `String` | No |  |
| `issuer` | `Hash` | No | Account issuer information. |
| `query` | `Hash` | No | Query parameters used for the request. |
| `transactions` | `Array` | No | List of transactions in the statement period. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BalanceStatement.load({ "id" => 1, "profile_id" => 1, "currency" => "currency", "interval_end" => "interval_end", "interval_start" => "interval_start" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BalanceStatementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BankAccountDetailEntity

```ruby
bank_account_detail = client.BankAccountDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | No | Status of the account detail. |
| `currency` | `String` | No | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `String` | No | Account detail ID. |
| `internationalDetails` | `Object` | No | International bank account details. |
| `localDetails` | `Hash` | No | Local bank account details. |
| `reason` | `String` | No | Reason for the return. |
| `targetAccountId` | `Integer` | Yes | ID of the currency balance to create account details on. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BankAccountDetail.create({
  "profile_id" => 1, # Integer
  "targetAccountId" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BankAccountDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BankAccountDetailsOrderEntity

```ruby
bank_account_details_order = client.BankAccountDetailsOrder
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `Integer` | No | Unique ID of the issued account details. |
| `balanceId` | `Object` | No | ID of the balance the order is for. |
| `creationTime` | `String` | No | Timestamp of when the order was created. |
| `currency` | `String` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `String` | No | Unique ID of the order. |
| `modificationTime` | `String` | No | Timestamp of the last modification to the order. |
| `requirements` | `Array` | No | List of requirements to fulfill the order. |
| `status` | `String` | No | Order status. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BankAccountDetailsOrder.create({
  "profile_id" => 1, # Integer
  "currency" => "example_currency", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.BankAccountDetailsOrder.list({ "profile_id" => 1, "currency" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BankAccountDetailsOrderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BatchGroupEntity

```ruby
batch_group = client.BatchGroup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alreadyPaid` | `Boolean` | No | Not applicable to this use case. |
| `fileName` | `Object` | No | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `String` | No | Whether this batch was submitted over the API or as a file. |
| `id` | `String` | No | Batch group ID. |
| `name` | `String` | No | Descriptive name for the batch group. |
| `payInDetails` | `Array` | No | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `Object` | No | Optional ID of the payin session. |
| `profileId` | `Integer` | No | The ID of the profile this payment belongs to. |
| `shortId` | `Integer` | No | Not applicable to this use case. |
| `sourceCurrency` | `String` | No | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `String` | No | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `Array` | No | The IDs of all transfers successfully added to the group. |
| `type` | `String` | Yes | The method of payment to use. |
| `userId` | `Integer` | No | The ID of the user who initiated this payment. |
| `version` | `Integer` | No | Batch version, used for concurrency control. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BatchGroup.create({
  "profile_id" => 1, # Integer
  "name" => "example_name", # String
  "sourceCurrency" => "example_sourceCurrency", # String
  "type" => "example_type", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.BatchGroup.load({ "id" => "batch_group_id", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.BatchGroup.update({
  "id" => "batch_group_id",
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BatchGroupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BulkSettlementEntity

```ruby
bulk_settlement = client.BulkSettlement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransfer` | `Float` | No | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `Array` | No | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `String` | No | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `String` | Yes | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `String` | Yes | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `Array` | Yes | Array of transfers to be settled. |
| `type` | `String` | Yes | Type of settlement. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BulkSettlement.create({
  "settlementDate" => "example_settlementDate", # String
  "settlementReference" => "example_settlementReference", # String
  "transfers" => [], # Array
  "type" => "example_type", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BulkSettlementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BusinessProfileEntity

```ruby
business_profile = client.BusinessProfile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abn` | `Object` | No | Australian Business Number (only for Australian businesses). |
| `acn` | `Object` | No | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `String` | No | Email of the actor. |
| `address` | `Hash` | No | Main registered address of the business. |
| `arbn` | `Object` | No | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `String` | No | Free-form description of the business activities. |
| `businessName` | `String` | No | Registered business name. |
| `businessNameInKatakana` | `Object` | No | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `Hash` | No | Business representative details. |
| `companyRole` | `String` | No | Role of the person managing the business profile. |
| `companyType` | `String` | No | Type of company. |
| `contactDetails` | `Hash` | No | Contact information for the business. |
| `createdAt` | `String` | No | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `String` | No | Current status of this profile. |
| `descriptionOfBusiness` | `String` | No | Deprecated. |
| `email` | `String` | No | Primary email address for the business. |
| `externalCustomerId` | `String` | No | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `String` | No | Deprecated. |
| `fullName` | `String` | No | Full legal name of the business. |
| `id` | `Integer` | No | Unique identifier for the profile. |
| `industryCategories` | `Array` | No | One or more industry categories classifying the business. |
| `operationalAddresses` | `Array` | No | An array of operational addresses for the business. |
| `publicId` | `String` | No | Publicly accessible identifier for the profile. |
| `registrationNumber` | `String` | No | Business registration number. |
| `secondLevelCategory` | `String` | No | Deprecated. |
| `type` | `String` | Yes | Type of profile. |
| `updatedAt` | `String` | No | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `Integer` | No | The ID of the user associated with this profile. |
| `webpage` | `String` | No | Business website URL. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.BusinessProfile.create({
  "contactDetails" => {}, # Hash
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.BusinessProfile.update({
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BusinessProfileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardEntity

```ruby
card = client.Card
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bankIdentificationNumber` | `String` | No | Bank identification number (BIN) of the card. |
| `cardHolderName` | `String` | No | Name of the card holder. |
| `cardProgram` | `Hash` | No | Card program details. |
| `clientId` | `String` | No | Client ID of the partner that issued the card. |
| `creationTime` | `String` | No | Time when the card was created. |
| `expiryDate` | `String` | No | Date when the card will expire. |
| `id` | `String` | No |  |
| `lastFourDigits` | `String` | No | Last 4 digits of the card number. |
| `modificationTime` | `String` | No | Time when the card was last modified. |
| `phoneNumber` | `String` | No | Phone number associated with the card. |
| `profileId` | `Integer` | No | Profile ID that owns this card. |
| `status` | `Hash` | No | Current status of the card. |
| `token` | `String` | No | Unique identifier for the card. |
| `unlockSpendingPermissions` | `String` | No | Method with which physical card spending permissions can be unlocked. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Card.create({
  "card_token" => "example_card_token", # String
  "profile_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Card.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Card.load({ "id" => "card_id", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardHolderLimitEntity

```ruby
card_holder_limit = client.CardHolderLimit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `Hash` | Yes | The limits to set, per aggregation window. |
| `spendLimits` | `Array` | No | Spend limits configured for this cardholder. |
| `type` | `String` | Yes | The category of spending the limit applies to. |

### Field Usage by Operation

| Field | list | update | remove |
| --- | --- | --- | --- |
| `aggregateWindow` | Yes | - | - |
| `spendLimits` | - | - | - |
| `type` | Yes | - | - |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CardHolderLimit.list({ "card_holder_profile_id" => 1, "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.CardHolderLimit.remove({ "card_holder_profile_id" => 1, "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CardHolderLimit.update({
  "card_holder_profile_id" => 1,
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardHolderLimitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardLimitEntity

```ruby
card_limit = client.CardLimit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `Object` | No |  |
| `lifetime` | `Object` | No |  |
| `monthly` | `Object` | No |  |
| `transaction` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CardLimit.load({ "card_token" => "card_token", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CardLimit.update({
  "card_token" => "card_token",
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardLimitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardOrderEntity

```ruby
card_order = client.CardOrder
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `Hash` | No | Address set during card order. |
| `cardHolderName` | `String` | No | Name of the card holder. |
| `cardHolderProfileId` | `Integer` | No | The cardholder profile for this card. |
| `cardProgram` | `Hash` | No | The card program associated with this card order. |
| `cardToken` | `Object` | No | Token of the card associated with card order. |
| `city` | `String` | No | Card holder's city (max 30 characters). |
| `clientId` | `String` | No | Client ID. |
| `country` | `String` | No | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `String` | No | Time when the card order is created. |
| `deliveryDetails` | `Hash` | No | Delivery details of a physical card order. |
| `deliveryEstimate` | `String` | No | The estimated time when the card will be delivered. |
| `deliveryOption` | `String` | No | The delivery method for the card order. |
| `embossedName` | `String` | No | The cardholder's name to print on the card (physical card only). |
| `errors` | `Array` | No | Collection of validation errors. |
| `firstLine` | `String` | No | Card holder's address (max 30 characters). |
| `id` | `Integer` | No | ID of the card order. |
| `lifetimeLimit` | `Object` | No | Maximum amount of spending on the card once issued. |
| `modificationTime` | `String` | No | Time when the card order was last modified. |
| `phoneNumber` | `String` | No | Phone number associated with the card order. |
| `postCode` | `String` | No | Card holder's postal code (max 10 characters). |
| `profileId` | `Integer` | No | Profile ID. |
| `program` | `String` | Yes | The name of the card program. |
| `replacementDetails` | `Hash` | No | The replacement details for this card. |
| `replacesCard` | `Object` | No | Token of the card being replaced by this replacement card order. |
| `secondLine` | `Object` | No | Card holder's address (max 30 characters). |
| `state` | `Object` | No | Card holder's state (max 30 characters). |
| `status` | `String` | No | Status of the card order. |
| `thirdLine` | `Object` | No | Card holder's address (max 30 characters). |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CardOrder.create({
  "cardHolderName" => "example_cardHolderName", # String
  "program" => "example_program", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CardOrder.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CardOrder.load({ "id" => 1, "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.CardOrder.update({
  "id" => 1,
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardSensitiveDetailEntity

```ruby
card_sensitive_detail = client.CardSensitiveDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `encryptedPayload` | `String` | Yes | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `String` | No | The RSA public key. |
| `keyVersion` | `Integer` | Yes | The version of the key to use. |
| `version` | `Integer` | No | Version of the encryption key. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.CardSensitiveDetail.create({
  "encryptedPayload" => "example_encryptedPayload", # String
  "keyVersion" => 1, # Integer
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CardSensitiveDetail.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardSensitiveDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardTransactionEntity

```ruby
card_transaction = client.CardTransaction
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approvalCode` | `Object` | No | Also called authorization code. |
| `arn` | `Object` | No | Acquirer reference number |
| `authorisationMethod` | `String` | No | Authorisation method |
| `balanceChannelReferenceId` | `Object` | No | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `Hash` | No | Billing amount |
| `cardToken` | `String` | No | Unique identifier of the card |
| `creationTime` | `String` | No | When the transaction was created |
| `credits` | `Array` | No | Array of credits. |
| `debits` | `Array` | No | Array of debits. |
| `declineReason` | `Object` | No | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `Object` | No | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `Array` | No | Array of fees |
| `id` | `Integer` | No | ID of the transaction |
| `merchant` | `Hash` | No | Merchant information |
| `modificationTime` | `String` | No | When the transaction was last updated |
| `pinValidationResult` | `Object` | No | PIN validation result. |
| `purgeTime` | `Object` | No | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `Object` | No | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `String` | No | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `Hash` | No | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `Hash` | No | Transaction amount including all fees |
| `type` | `String` | No | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.CardTransaction.list({ "card_token" => "example", "profile_id" => 1, "from_creation_time" => "example", "to_creation_time" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.CardTransaction.load({ "id" => 1, "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardTransactionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CaseEntity

```ruby
case_ = client.Case
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | Yes | Timestamp when the case was created. |
| `description` | `String` | No | The description of the request. |
| `details` | `Hash` | No | Details related to the case. |
| `externalId` | `String` | No | Partner-created identifier for this case, if applicable. |
| `id` | `Integer` | Yes | Unique identifier of the case. |
| `messages` | `Array` | Yes | List of messages associated with this case. |
| `profileId` | `Integer` | Yes | The profile ID associated with this case. |
| `reference` | `Hash` | Yes | Reference information linking the case to a related entity. |
| `status` | `String` | Yes | The current status of the support case. |
| `subType` | `String` | No | The sub-type of the support case. |
| `subject` | `String` | No | The subject of the case. |
| `type` | `String` | Yes | The type of the support case. |
| `updatedAt` | `String` | No | Timestamp when the case was last updated. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Case.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Case.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CaseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ClaimAccountEntity

```ruby
claim_account = client.ClaimAccount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claimAccountCode` | `String` | No | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `String` | Yes | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ClaimAccount.create({
  "registrationCode" => "example_registrationCode", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ClaimAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ComparisonEntity

```ruby
comparison = client.Comparison
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | No | The comparison amount |
| `amountType` | `String` | No | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `Object` | No | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `Array` | No | List of provider types included in the response |
| `providers` | `Array` | No | List of providers with their estimated quotes |
| `sourceCountry` | `Object` | No | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `Object` | No | ISO 4217 source currency code |
| `targetCountry` | `Object` | No | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `Object` | No | ISO 4217 target currency code |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Comparison.load({ "source_currency" => "source_currency", "target_currency" => "target_currency" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContactEntity

```ruby
contact = client.Contact
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | `String` | No | Contact ID in the format of UUID. |
| `identifier` | `String` | No | A Wise profile's identifier. |
| `name` | `String` | No | Full name of the contact. |
| `targetCurrency` | `String` | No | 3 character currency code. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Contact.create({
  "profile_id" => 1, # Integer
  "is_direct_identifier_creation" => true, # Boolean
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContactEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CurrencyEntity

```ruby
currency = client.Currency
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | No | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `Array` | No | Keywords associated with this currency. |
| `name` | `String` | No | Display name of this currency. |
| `supportsDecimals` | `Boolean` | No | Whether this currency supports decimal values or not. |
| `symbol` | `String` | No | The symbol of this currency. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Currency.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeliveryEstimateEntity

```ruby
delivery_estimate = client.DeliveryEstimate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estimatedDeliveryDate` | `String` | No | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `String` | No | A string to display to users for the estimated delivery date. |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.DeliveryEstimate.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeliveryEstimateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeliveryUpdateEntity

```ruby
delivery_update = client.DeliveryUpdate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery_update` | `String` | Yes | The delivery signal to simulate. |
| `delivery_update_path` | `Array` | Yes | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `Object` | No | Optional estimated delivery time. |
| `observation_id` | `String` | Yes | Server-generated observation identifier. |
| `occurred_at` | `String` | Yes | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `Object` | No | Payment scheme to include in the observation. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DeliveryUpdate.create({
  "transfer_id" => 1, # Integer
  "delivery_update" => "example_delivery_update", # String
  "delivery_update_path" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeliveryUpdateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DigitalWalletEntity

```ruby
digital_wallet = client.DigitalWallet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation` | `String` | Yes | Approve or decline a payment token activation |
| `paymentTokens` | `Array` | No |  |
| `walletNames` | `Array` | No | List of supported wallet types. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DigitalWallet.create({
  "card_token" => "example_card_token", # String
  "profile_id" => 1, # Integer
  "activation" => "example_activation", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DigitalWalletEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DirectDebitAccountEntity

```ruby
direct_debit_account = client.DirectDebitAccount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `String` | No | Currency of the bank account. |
| `details` | `Hash` | No | Bank account details |
| `id` | `Integer` | No | Direct debit account ID |
| `type` | `String` | No | Payment type for which the account is used. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.DirectDebitAccount.create({
  "profile_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DirectDebitAccount.list({ "profile_id" => 1, "currency" => "example", "type" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DirectDebitAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DirectorEntity

```ruby
director = client.Director
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryOfResidenceIso3Code` | `String` | No | 3 character country code. |
| `dateOfBirth` | `String` | No | Date of birth. |
| `directors` | `Array` | No |  |
| `firstName` | `String` | No | Director first name. |
| `id` | `Integer` | No | ID of the director. |
| `lastName` | `String` | No | Director last name. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Director.create({
  "profile_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Director.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Director.remove({ "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Director.update({
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DirectorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DisputeEntity

```ruby
dispute = client.Dispute
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canWithdraw` | `Boolean` | No | Whether the dispute can be withdrawn. |
| `createdAt` | `String` | No | Time when the dispute was created. |
| `createdBy` | `String` | No | Creator of the dispute. |
| `disclaimer` | `Hash` | No | Acknowledgement fields. |
| `files` | `Hash` | No | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `Hash` | No | Form fields required to submit this dispute. |
| `id` | `String` | No | Unique identifier of the dispute. |
| `lastUpdatedAt` | `String` | No | Time when the dispute was last updated. |
| `profileId` | `Integer` | No | Profile ID. |
| `reason` | `String` | No | Dispute reason code. |
| `receipt` | `String` | No | The file to upload. |
| `status` | `String` | No | Dispute overall status. |
| `statusMessage` | `String` | No | Explanation for `subStatus`. |
| `subStatus` | `String` | No | Dispute detailed status. |
| `transaction` | `Hash` | No | Transaction details for the dispute. |
| `transactionId` | `Integer` | No | Card transaction ID. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Dispute.create({
  "profile_id" => 1, # Integer
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Dispute.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Dispute.load({ "id" => "dispute_id", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Dispute.update({
  "id" => "dispute_id",
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DisputeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DisputeReasonEntity

```ruby
dispute_reason = client.DisputeReason
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | No | The type of reasons available for the dispute. |
| `description` | `String` | No | The description of the dispute reason. |
| `isFraud` | `Boolean` | No | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `Array` | No | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `Boolean` | No | Whether the dispute supports multiple transactions. |
| `tooltip` | `String` | No | Text to display when showing the dispute form to your users. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.DisputeReason.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DisputeReasonEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FacetecEntity

```ruby
facetec = client.Facetec
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Facetec.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FacetecEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FileEntity

```ruby
file = client.File
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | Yes | Timestamp when the file was uploaded. |
| `file` | `String` | Yes | The file to upload. |
| `fileId` | `String` | Yes | Unique identifier of the uploaded file. |
| `fileName` | `String` | Yes | The name of the uploaded file. |
| `profileId` | `Integer` | Yes | The ID of the profile this file belongs to. |
| `purpose` | `String` | Yes | The purpose of the file upload. |
| `submissionData` | `Hash` | Yes | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.File.create({
  "createdAt" => "example_createdAt", # String
  "file" => "example_file", # String
  "fileId" => "example_fileId", # String
  "fileName" => "example_fileName", # String
  "profileId" => 1, # Integer
  "purpose" => "example_purpose", # String
  "submissionData" => {}, # Hash
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.File.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FundingEntity

```ruby
funding = client.Funding
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransactionId` | `Integer` | No |  |
| `status` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Funding.create({
  "profile_id" => 1, # Integer
  "transfer_id" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FundingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GpiTrackingEntity

```ruby
gpi_tracking = client.GpiTracking
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `String` | Yes | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `String` | Yes | The type of identifier used to look up the transfer. |
| `transactions` | `Array` | No | The matching GPI tracking transactions. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.GpiTracking.create({
  "identifier" => "example_identifier", # String
  "identifierType" => "example_identifierType", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GpiTrackingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HoldLimitBreachEntity

```ruby
hold_limit_breach = client.HoldLimitBreach
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | No | Amount value. |
| `closingReason` | `String` | No | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `String` | No | Date when the hold limit breach was created. |
| `currency` | `String` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `Integer` | No | Hold limit breach ID. |
| `profileId` | `Integer` | No | ID of the profile that owns the hold limit breach |
| `state` | `String` | No | Current state of the hold limit breach. |
| `updatedAt` | `String` | No | Date when the hold limit breach was last modified. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.HoldLimitBreach.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HoldLimitBreachEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IncomingTransferEntity

```ruby
incoming_transfer = client.IncomingTransfer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `String` | No | Account details ID that received the incoming transfer. |
| `amounts` | `Hash` | Yes | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `String` | Yes | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `String` | No | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `String` | No | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `String` | Yes | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `Hash` | Yes | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `Hash` | Yes | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `String` | No | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `Float` | Yes | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `Hash` | Yes | Breakdown of fees applied to the incoming transfer. |
| `id` | `String` | Yes | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `Array` | Yes | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `Integer` | Yes | Profile ID of the balance owner. |
| `scheme` | `String` | Yes | The payment scheme through which the incoming transfer was received. |
| `state` | `String` | Yes | Current state of the incoming transfer. |
| `uetr` | `String` | No | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `String` | No | Unstructured remittance information provided by the debtor. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.IncomingTransfer.load({ "id" => "incoming_transfer_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IncomingTransferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## JoseEntity

```ruby
jose = client.Jose
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keyId` | `String` | No | ID of the key in UUID format. |
| `keyMaterial` | `Hash` | No |  |
| `publicKeyMaterial` | `Hash` | No |  |
| `scope` | `String` | No | Scope of the key. |
| `validFrom` | `String` | No | The key is valid from this date. |
| `validTill` | `String` | No | The key is valid until this date. |
| `version` | `Integer` | No | Version of the public key issued. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Jose.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Jose.load({ "algorithm" => "algorithm", "scope" => "scope" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `JoseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## KycReviewEntity

```ruby
kyc_review = client.KycReview
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No | Timestamp marking the creation of the KYC Review. |
| `id` | `String` | No | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `Object` | No | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `Object` | No | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `Object` | No | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `Object` | No | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `String` | No | Aggregated state of the underlying requirement set. |
| `triggerData` | `Hash` | No | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `Array` | No | List of trigger reference objects. |
| `type` | `String` | Yes | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `String` | No | Timestamp marking the last update of the KYC Review. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.KycReview.create({
  "profile_id" => 1, # Integer
  "type" => "example_type", # String
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.KycReview.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.KycReview.load({ "id" => "kyc_review_id", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.KycReview.update({
  "id" => "kyc_review_id",
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `KycReviewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkRequestEntity

```ruby
link_request = client.LinkRequest
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientKey` | `String` | Yes | Client key that created the embedded link request. |
| `email` | `String` | Yes | The end user's email address, to receive dispute updates. |
| `id` | `String` | Yes | Embedded link request ID. |
| `metadata` | `Hash` | Yes | Flow-specific metadata. |
| `profileId` | `Integer` | Yes | Profile that owns the embedded flow. |
| `redirectUrl` | `String` | Yes | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `Integer` | Yes | The ID of the card transaction to dispute. |
| `type` | `String` | Yes | Embedded Flow type. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.LinkRequest.create({
  "profile_id" => 1, # Integer
  "email" => "example_email", # String
  "redirectUrl" => "example_redirectUrl", # String
  "transactionId" => 1, # Integer
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.LinkRequest.load({ "id" => "link_request_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkRequestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessageEntity

```ruby
message = client.Message
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionData` | `Hash` | Yes | The data for the message submission. |
| `type` | `String` | Yes | The type of message submission. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Message.create({
  "case_id" => 1, # Integer
  "submissionData" => {}, # Hash
  "type" => "example_type", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MultiCurrencyAccountEntity

```ruby
multi_currency_account = client.MultiCurrencyAccount
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.MultiCurrencyAccount.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MultiCurrencyAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OneTimeTokenEntity

```ruby
one_time_token = client.OneTimeToken
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challenges` | `Array` | No | An array of challenges. |
| `faceMap` | `String` | No | A base64 encoded string. |
| `oneTimeToken` | `String` | No | A one-time token unique identifier. |
| `validity` | `Integer` | No | The One-Time Token expiration in seconds. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.OneTimeToken.create({
  "profile_id" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OneTimeTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OttEntity

```ruby
ott = client.Ott
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionType` | `String` | No | The action bound to the one time token. |
| `challenges` | `Array` | No | Array of challenge objects. |
| `oneTimeToken` | `String` | No | Unique identifier of a one time token. |
| `userId` | `Integer` | No | Creator of this one time token. |
| `validity` | `Integer` | No | Seconds until the one time token becomes expired. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Ott.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OttEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PayinEntity

```ruby
payin = client.Payin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | No |  |
| `currency` | `String` | No |  |
| `details` | `Hash` | No | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `String` | No |  |
| `id` | `String` | No |  |
| `payinSessionId` | `String` | No |  |
| `paymentInstrumentId` | `String` | No |  |
| `qrCodeInBase64` | `String` | No | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `String` | No |  |
| `status` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Payin.create({
  "payin_session_id" => "example_payin_session_id", # String
  "profile_id" => 1, # Integer
  "payinSessionId" => "example_payinSessionId", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PayinEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PayinDepositDetailEntity

```ruby
payin_deposit_detail = client.PayinDepositDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `payinBank` | `Hash` | No | Information about the receiving bank. |
| `payinBankAccount` | `Hash` | No | Bank account details to use to send the payment to. |
| `wiseInformation` | `Hash` | No | Information about the receiving Wise entity, the owner of the bank account. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PayinDepositDetail.load({ "profile_id" => 1, "transfer_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PayinDepositDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentEntity

```ruby
payment = client.Payment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | No | Transfer source amount |
| `currency` | `String` | No | Transfer source currency |
| `id` | `Integer` | No | Payment ID |
| `method` | `String` | No | The payment method used to pay for the transfer |
| `pricingVariant` | `Object` | No | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `String` | No | Date of when payment was created |
| `timeUpdated` | `String` | No | Date of when payment was updated |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Payment.list({ "transfer_id" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentInitiationEntity

```ruby
payment_initiation = client.PaymentInitiation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PaymentInitiation.create({
  "batch_group_id" => "example_batch_group_id", # String
  "profile_id" => 1, # Integer
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PaymentInitiation.load({ "id" => 1, "batch_group_id" => "batch_group_id", "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentInitiationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentInstrumentEntity

```ruby
payment_instrument = client.PaymentInstrument
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `String` | No |  |
| `accountNumber` | `String` | No |  |
| `accountOwnerDetails` | `Hash` | No |  |
| `accountType` | `String` | No |  |
| `bankCode` | `String` | No |  |
| `bankName` | `String` | No |  |
| `branchCode` | `String` | No |  |
| `disconnectReason` | `String` | No |  |
| `id` | `String` | No |  |
| `reference` | `String` | No |  |
| `status` | `String` | No |  |
| `type` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PaymentInstrument.create({
  "profile_id" => 1, # Integer
  "accountNumber" => "example_accountNumber", # String
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PaymentInstrument.list({ "id" => "example", "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PaymentInstrument.load({ "id" => "payment_instrument_id", "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentInstrumentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentIntentEntity

```ruby
payment_intent = client.PaymentIntent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocationId` | `String` | No | Unique identifier of the associated settlement allocation. |
| `allocationType` | `String` | No | Type of allocation. |
| `createdAt` | `String` | No | Timestamp when the payment intent was created. |
| `fundingSource` | `String` | No | Source of funding for the payment. |
| `id` | `String` | No | Unique identifier of the payment intent. |
| `partnerEntityId` | `String` | No | Partner entity identifier. |
| `paymentReference` | `String` | No | Payment reference. |
| `profileId` | `String` | No | Profile identifier. |
| `reason` | `String` | No | Reason for the payment. |
| `recipientType` | `String` | No | Type of recipient. |
| `sourceAmount` | `Float` | No | Source amount of the payment. |
| `sourceCurrency` | `String` | No | Source currency code (ISO 4217). |
| `state` | `String` | No | Current state of the payment intent. |
| `targetAmount` | `Float` | No | Target amount of the payment. |
| `targetCurrency` | `String` | No | Target currency code (ISO 4217). |
| `updatedAt` | `String` | No | Timestamp when the payment intent was last updated. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PaymentIntent.load({ "id" => "payment_intent_id", "allocation_id" => "allocation_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentIntentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhoneNumberEntity

```ruby
phone_number = client.PhoneNumber
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `String` | No | Client ID of which this phone number belongs to. |
| `id` | `Integer` | No | ID of the phone number. |
| `phoneNumber` | `String` | No | A text representation of phone number. |
| `type` | `String` | No | Type of phone number when used in authentication. |
| `verified` | `Boolean` | No | Indicator if phone number is verified. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PhoneNumber.create({
  "user_id" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhoneNumberEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductionEntity

```ruby
production = client.Production
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `Object` | No | Detailed description of the error code. |
| `errorCode` | `Object` | No | Code returned when card production is not successful. |
| `kioskId` | `Object` | No | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `String` | No | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `String` | No | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `description` | - | - |
| `errorCode` | - | - |
| `kioskId` | - | Yes |
| `occurredAt` | - | - |
| `status` | - | - |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Production.load({ "card_token" => "card_token", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Production.update({
  "card_token" => "card_token",
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProfileEntity

```ruby
profile = client.Profile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `Hash` | No |  |
| `avatar` | `String` | No |  |
| `contactDetails` | `Hash` | No |  |
| `createdAt` | `String` | No |  |
| `currentState` | `String` | No |  |
| `dateOfBirth` | `String` | No |  |
| `email` | `String` | No |  |
| `firstName` | `String` | No |  |
| `fullName` | `String` | No |  |
| `id` | `Integer` | No |  |
| `lastName` | `String` | No |  |
| `phoneNumber` | `String` | No |  |
| `preferredName` | `String` | No |  |
| `publicId` | `String` | No |  |
| `secondaryAddresses` | `Array` | No |  |
| `type` | `String` | No |  |
| `updatedAt` | `String` | No |  |
| `userId` | `Integer` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Profile.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Profile.load({ "id" => 1 })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QuoteEntity

```ruby
quote = client.Quote
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdTime` | `String` | No | Quote created timestamp. |
| `creationContext` | `Hash` | No | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `String` | No | The date and time the quote expires. |
| `guaranteedTargetAmount` | `Boolean` | No | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `Boolean` | No | Indicates whether guaranteed target amount is allowed. |
| `id` | `String` | No | ID of this quote (GUID format). |
| `notices` | `Array` | No | Messages to display to the user. |
| `payOut` | `String` | No | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `Hash` | No | _Optional_. |
| `paymentOptions` | `Array` | No | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `String` | No | Preferred pay-in method. |
| `pricingConfiguration` | `Hash` | No | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `Integer` | No | Personal or business profile ID. |
| `providedAmountType` | `String` | No | Indicates whether the quote was created as source or target. |
| `rate` | `Float` | No | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `String` | No | Date and time the locked rate expires. |
| `rateType` | `String` | No | Whether the rate is fixed or floating. |
| `sourceAmount` | `Float` | No | Amount in source currency to send. |
| `sourceCurrency` | `String` | No | Source (sending) currency code. |
| `status` | `String` | No | Current status of the quote. |
| `targetAccount` | `Integer` | No | _Optional_. |
| `targetAmount` | `Float` | No | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `Boolean` | No | Indicates whether target amount is allowed. |
| `targetCurrency` | `String` | No | Target (receive) currency code. |
| `user` | `Integer` | No | User ID that created the quote. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Quote.create({
  "sourceCurrency" => "example_sourceCurrency", # String
  "targetCurrency" => "example_targetCurrency", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Quote.load({ "id" => "quote_id", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Quote.update({
  "id" => "quote_id",
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RateEntity

```ruby
rate = client.Rate
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `Float` | Yes | Exchange rate value. |
| `source` | `String` | Yes | Source (send) currency code. |
| `target` | `String` | Yes | Target (receive) currency code. |
| `time` | `String` | Yes | Timestamp for exchange rate. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Rate.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecipientEntity

```ruby
recipient = client.Recipient
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedOutcomes` | `Boolean` | Yes | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `String` | No | Recipient full name. |
| `accountId` | `Integer` | No | Recipient account ID. |
| `accountSummary` | `String` | No | Summary of account details for ease of lookup. |
| `active` | `Boolean` | No | Status of the recipient account. |
| `commonFieldMap` | `Hash` | No | Map of key lookup fields for the account. |
| `confirmations` | `Hash` | No | Contains verification results for the recipient's details. |
| `country` | `String` | No | 2-character country code. |
| `creatorId` | `Integer` | No | Account entity that owns the recipient account. |
| `currency` | `String` | No | 3-character currency code. |
| `details` | `Hash` | No | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `Array` | No | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `String` | No | Account hash for tracking changes to recipient details. |
| `id` | `Integer` | No | ID of the recipient. |
| `isInternal` | `Boolean` | No | Indicates whether recipient is internal. |
| `legalEntityType` | `String` | No | Entity type of recipient account. |
| `longAccountSummary` | `String` | No | Longer account details summary. |
| `name` | `Hash` | No | Recipient name details. |
| `ownedByCustomer` | `Boolean` | No | Inidicates if recipient account belongs to profile owner. |
| `profile` | `Integer` | No | Personal or business profile ID of the sender. |
| `profileId` | `Integer` | No | Specific profile that owns the recipient account. |
| `quoteId` | `String` | No | Quote ID. |
| `type` | `String` | No | Recipient account type. |
| `ultimateBeneficiary` | `Object` | Yes | The details for the ultimate beneficiary of this recipient. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Recipient.create({
  "acceptedOutcomes" => true, # Boolean
  "ultimateBeneficiary" => {}, # Object
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Recipient.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Recipient.load({ "account_id" => 1 })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Recipient.remove({ "account_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Recipient.update({
  "account_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecipientEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RuleEntity

```ruby
rule = client.Rule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | The description of the authorisation rule. |
| `id` | `Integer` | No | The unique ID for the authorisation rule. |
| `operation` | `String` | No | Determines whether the transactions should be allowed or blocked. |
| `type` | `String` | No | The type of authorisation rule. |
| `values` | `Array` | No | A list of values based on the `type` of rule configured. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Rule.create({
  "application_id" => "example_application_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Rule.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SamlEntity

```ruby
saml = client.Saml
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `RelayState` | `String` | No | Opaque state value. |
| `SAMLResponse` | `String` | Yes | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Saml.create({
  "SAMLResponse" => "example_SAMLResponse", # String
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Saml.load({ "registration_id" => "registration_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SamlEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScaDeviceFingerprintEntity

```ruby
sca_device_fingerprint = client.ScaDeviceFingerprint
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `String` | No | The identifier of the device fingerprint. |
| `id` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ScaDeviceFingerprint.create({
  "profile_id" => 1, # Integer
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ScaDeviceFingerprint.remove({ "id" => "sca_device_fingerprint_id", "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScaDeviceFingerprintEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScaFacemapEntity

```ruby
sca_facemap = client.ScaFacemap
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `faceMap` | `String` | No | A base64 encoded string. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ScaFacemap.create({
  "profile_id" => 1, # Integer
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ScaFacemap.remove({ "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScaFacemapEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScaOtpEntity

```ruby
sca_otp = client.ScaOtp
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.ScaOtp.remove({ "phone_number_id" => 1, "user_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScaOtpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScaSessionEntity

```ruby
sca_session = client.ScaSession
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ScaSession.create({
  "profile_id" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScaSessionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SettlementAllocationEntity

```ruby
settlement_allocation = client.SettlementAllocation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | `Hash` | Yes |  |
| `createdAt` | `String` | No | Timestamp when the settlement allocation was created. |
| `currency` | `String` | No | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `Float` | No | Expected total amount for the allocation. |
| `file` | `String` | Yes | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `String` | No | Unique identifier of the settlement allocation. |
| `nextPageToken` | `String` | No | Token for fetching the next page of payment intents. |
| `paymentIntents` | `Array` | No | List of payment intents associated with the allocation. |
| `paymentReference` | `String` | No | Unique payment reference for the settlement allocation. |
| `state` | `String` | No | Current state of the settlement allocation. |
| `updatedAt` | `String` | No | Timestamp when the settlement allocation was last updated. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.SettlementAllocation.create({
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

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.SettlementAllocation.load({ "id" => "settlement_allocation_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SettlementAllocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SimulationEntity

```ruby
simulation = client.Simulation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `String` | No |  |
| `created` | `String` | No |  |
| `creationTime` | `Float` | No | Time when the card transaction was created. |
| `description` | `Object` | No | Description of the KYC review item. |
| `details` | `Hash` | No |  |
| `failure_reason_code` | `String` | No | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `key` | `String` | No | KYC review item key. |
| `quote` | `Integer` | No |  |
| `rate` | `Float` | No |  |
| `reference` | `String` | No |  |
| `sourceAccount` | `String` | No |  |
| `sourceCurrency` | `String` | No |  |
| `sourceValue` | `Integer` | No |  |
| `state` | `String` | No | State of the KYC review item. |
| `status` | `String` | No |  |
| `targetAccount` | `Integer` | No |  |
| `targetCurrency` | `String` | No |  |
| `targetValue` | `Float` | No |  |
| `transactionId` | `Integer` | No | ID of the transaction. |
| `transferRequest` | `String` | No |  |
| `user` | `Integer` | No |  |
| `wise_id` | `Integer` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Simulation.create({
  "transfer_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Simulation.list({ "card_token" => "example", "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Simulation.load({ "status" => "status", "transfer_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SimulationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpendControlEntity

```ruby
spend_control = client.SpendControl
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ruleId` | `Integer` | No | The ID of the applied authorisation rule. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.SpendControl.list({ "application_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.SpendControl.remove({ "application_id" => "application_id", "rule_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpendControlEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpendLimitEntity

```ruby
spend_limit = client.SpendLimit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `Hash` | No |  |
| `id` | `String` | No |  |
| `type` | `String` | No | The type of transaction. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.SpendLimit.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.SpendLimit.remove({ "id" => "spend_limit_id", "card_id" => "card_id", "profile_id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.SpendLimit.update({
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpendLimitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubscriptionEntity

```ruby
subscription = client.Subscription
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No | Timestamp of when the subscription was created. |
| `created_by` | `Hash` | No |  |
| `delivery` | `Hash` | No |  |
| `id` | `String` | No | UUID that uniquely identifies the subscription. |
| `name` | `String` | No | A custom name for your webhook to ease with identification. |
| `scope` | `Hash` | No |  |
| `trigger_on` | `String` | No | The event type this subscription is listening for. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Subscription.create({
  "client_key" => "example_client_key", # String
  "delivery" => {}, # Hash
  "name" => "example_name", # String
  "trigger_on" => "example_trigger_on", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Subscription.list({ "client_key" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Subscription.load({ "id" => "subscription_id", "client_key" => "client_key" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Subscription.remove({ "id" => "subscription_id", "client_key" => "client_key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TestNotificationEntity

```ruby
test_notification = client.TestNotification
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No | Timestamp of when the test notification was created. |
| `delivery_id` | `String` | No | ID of the delivery that was queued for sending. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.TestNotification.create({
  "client_key" => "example_client_key", # String
  "subscription_id" => "example_subscription_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TestNotificationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ThirdPartyTransferEntity

```ruby
third_party_transfer = client.ThirdPartyTransfer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `String` | No | Timestamp when transfer was created. |
| `details` | `Hash` | No | Payment Details |
| `hasActiveIssues` | `Boolean` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `Integer` | No | Transfer ID |
| `originalTransferId` | `String` | No | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `Hash` | No | Data block to capture payment originator details |
| `quote` | `String` | No | Quote ID |
| `rate` | `Float` | No | Exchange rate value |
| `sourceAccount` | `Integer` | No | Refund recipient account ID |
| `sourceCurrency` | `String` | No | Source currency code |
| `sourceValue` | `Float` | No | Transfer amount in source currency |
| `status` | `String` | No | Transfer current status. |
| `targetAccount` | `Integer` | No | Recipient account ID |
| `targetCurrency` | `String` | No | Target currency code |
| `targetValue` | `Float` | No | Transfer amount in target currency |
| `user` | `Integer` | No | Your user ID |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ThirdPartyTransfer.create({
  "profile_id" => 1, # Integer
  "details" => {}, # Hash
  "originalTransferId" => "example_originalTransferId", # String
  "originator" => {}, # Hash
  "quote" => "example_quote", # String
  "targetAccount" => 1, # Integer
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ThirdPartyTransfer.load({ "id" => 1, "profile_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ThirdPartyTransferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ThreeDSecureEntity

```ruby
three_d_secure = client.ThreeDSecure
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeStatus` | `String` | Yes | The customer's response to the 3DS challenge. |
| `transactionReference` | `String` | Yes | Transaction reference as received in the 3DS challenge webhook event. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.ThreeDSecure.create({
  "profile_id" => 1, # Integer
  "challengeStatus" => "example_challengeStatus", # String
  "transactionReference" => "example_transactionReference", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ThreeDSecureEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TokenEntity

```ruby
token = client.Token
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `String` | No | Access token to be used when calling the API. |
| `created_at` | `String` | No | Token creation time in ISO 8601 format. |
| `expires_at` | `String` | No | Access token expiration timestamp (UTC). |
| `expires_in` | `Integer` | No | Access token expiry time in seconds. |
| `refresh_token` | `String` | No | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `String` | No | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `Integer` | No | Refresh token expiry time in seconds. |
| `scope` | `String` | No | Scope of the token. |
| `token_type` | `String` | No | Type of the token. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Token.create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TransferEntity

```ruby
transfer = client.Transfer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `Object` | No | Your business profile ID |
| `created` | `String` | No | Timestamp when transfer was created |
| `customerTransactionId` | `String` | No | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `Hash` | No |  |
| `hasActiveIssues` | `Boolean` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `Integer` | No | Transfer ID |
| `payinSessionId` | `String` | No | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `Object` | No | V1 quote ID |
| `quoteUuid` | `String` | No | V2 quote ID |
| `rate` | `Float` | No | Exchange rate value |
| `reference` | `String` | No | Deprecated, use `details.reference` instead |
| `sourceAccount` | `Object` | No | Refund recipient account ID |
| `sourceCurrency` | `String` | No | Source currency code |
| `sourceValue` | `Float` | No | Transfer amount in source currency |
| `status` | `String` | No | Transfer current status. |
| `targetAccount` | `Integer` | No | Recipient account ID |
| `targetCurrency` | `String` | No | Target currency code |
| `targetValue` | `Float` | No | Transfer amount in target currency |
| `transferRequest` | `Object` | No | Deprecated |
| `user` | `Integer` | No | Your user ID |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Transfer.create({
  "customerTransactionId" => "example_customerTransactionId", # String
  "quoteUuid" => "example_quoteUuid", # String
  "targetAccount" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Transfer.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Transfer.load({ "id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Transfer.update({
  "id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TransferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TransferRequirementEntity

```ruby
transfer_requirement = client.TransferRequirement
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customerTransactionId` | `String` | No | Unique identifier for the transfer request |
| `details` | `Hash` | No |  |
| `originatorLegalEntityType` | `String` | No | Type of sender. |
| `quoteUuid` | `String` | Yes | V2 quote ID |
| `targetAccount` | `Integer` | Yes | Recipient account ID |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.TransferRequirement.create({
  "quoteUuid" => "example_quoteUuid", # String
  "targetAccount" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TransferRequirementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UboEntity

```ruby
ubo = client.Ubo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressFirstLine` | `String` | No | First line of address. |
| `city` | `String` | No | City of residential address. |
| `countryOfResidenceIso3Code` | `String` | No | 3 character country code. |
| `dateOfBirth` | `String` | No | Date of birth. |
| `id` | `String` | No | ID of the ultimate beneficial owner. |
| `name` | `String` | No | Owner full name. |
| `ownershipPercentage` | `Integer` | No | Percentage of ownership. |
| `postCode` | `String` | No | Address post code. |
| `state` | `String` | No | State or region of residential address. |
| `ubos` | `Array` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Ubo.create({
  "profile_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Ubo.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.Ubo.update({
  "profile_id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UboEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | No | If user is active or not. |
| `details` | `Object` | No | User details. |
| `email` | `String` | No | User's email. |
| `id` | `Integer` | No | User ID. |
| `language` | `String` | No | User default language for UI and email communication. |
| `name` | `Object` | No | User's full name. |
| `registrationCode` | `String` | Yes | Randomly generated registration code that is unique to this user and request. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.User.create({
  "email" => "example_email", # String
  "registrationCode" => "example_registrationCode", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.User.load({ "id" => 1 })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.User.update({
  "id" => 1,
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VerificationEntity

```ruby
verification = client.Verification
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_evidences` | `Array` | No | List of evidence types required to complete verification. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Verification.create({
  "profile_id" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Verification.list({ "profile_id" => 1 })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VerificationEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = WiseSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

