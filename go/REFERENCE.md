# Wise Golang SDK Reference

Complete API reference for the Wise Golang SDK.


## WiseSDK

### Constructor

```go
func NewWiseSDK(options map[string]any) *WiseSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *WiseSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *WiseSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AccountDetail(data map[string]any) WiseEntityBase`

Create a new `AccountDetail` entity instance. Pass `nil` for no initial data.

#### `AccountRequirement(data map[string]any) WiseEntityBase`

Create a new `AccountRequirement` entity instance. Pass `nil` for no initial data.

#### `Activity(data map[string]any) WiseEntityBase`

Create a new `Activity` entity instance. Pass `nil` for no initial data.

#### `Address(data map[string]any) WiseEntityBase`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `AddressRequirement(data map[string]any) WiseEntityBase`

Create a new `AddressRequirement` entity instance. Pass `nil` for no initial data.

#### `Balance(data map[string]any) WiseEntityBase`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BalanceStatement(data map[string]any) WiseEntityBase`

Create a new `BalanceStatement` entity instance. Pass `nil` for no initial data.

#### `BankAccountDetail(data map[string]any) WiseEntityBase`

Create a new `BankAccountDetail` entity instance. Pass `nil` for no initial data.

#### `BankAccountDetailsOrder(data map[string]any) WiseEntityBase`

Create a new `BankAccountDetailsOrder` entity instance. Pass `nil` for no initial data.

#### `BatchGroup(data map[string]any) WiseEntityBase`

Create a new `BatchGroup` entity instance. Pass `nil` for no initial data.

#### `BulkSettlement(data map[string]any) WiseEntityBase`

Create a new `BulkSettlement` entity instance. Pass `nil` for no initial data.

#### `BusinessProfile(data map[string]any) WiseEntityBase`

Create a new `BusinessProfile` entity instance. Pass `nil` for no initial data.

#### `Card(data map[string]any) WiseEntityBase`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardHolderLimit(data map[string]any) WiseEntityBase`

Create a new `CardHolderLimit` entity instance. Pass `nil` for no initial data.

#### `CardLimit(data map[string]any) WiseEntityBase`

Create a new `CardLimit` entity instance. Pass `nil` for no initial data.

#### `CardOrder(data map[string]any) WiseEntityBase`

Create a new `CardOrder` entity instance. Pass `nil` for no initial data.

#### `CardSensitiveDetail(data map[string]any) WiseEntityBase`

Create a new `CardSensitiveDetail` entity instance. Pass `nil` for no initial data.

#### `CardTransaction(data map[string]any) WiseEntityBase`

Create a new `CardTransaction` entity instance. Pass `nil` for no initial data.

#### `Case(data map[string]any) WiseEntityBase`

Create a new `Case` entity instance. Pass `nil` for no initial data.

#### `ClaimAccount(data map[string]any) WiseEntityBase`

Create a new `ClaimAccount` entity instance. Pass `nil` for no initial data.

#### `Comparison(data map[string]any) WiseEntityBase`

Create a new `Comparison` entity instance. Pass `nil` for no initial data.

#### `Contact(data map[string]any) WiseEntityBase`

Create a new `Contact` entity instance. Pass `nil` for no initial data.

#### `Currency(data map[string]any) WiseEntityBase`

Create a new `Currency` entity instance. Pass `nil` for no initial data.

#### `DeliveryEstimate(data map[string]any) WiseEntityBase`

Create a new `DeliveryEstimate` entity instance. Pass `nil` for no initial data.

#### `DeliveryUpdate(data map[string]any) WiseEntityBase`

Create a new `DeliveryUpdate` entity instance. Pass `nil` for no initial data.

#### `DigitalWallet(data map[string]any) WiseEntityBase`

Create a new `DigitalWallet` entity instance. Pass `nil` for no initial data.

#### `DirectDebitAccount(data map[string]any) WiseEntityBase`

Create a new `DirectDebitAccount` entity instance. Pass `nil` for no initial data.

#### `Director(data map[string]any) WiseEntityBase`

Create a new `Director` entity instance. Pass `nil` for no initial data.

#### `Dispute(data map[string]any) WiseEntityBase`

Create a new `Dispute` entity instance. Pass `nil` for no initial data.

#### `DisputeReason(data map[string]any) WiseEntityBase`

Create a new `DisputeReason` entity instance. Pass `nil` for no initial data.

#### `Facetec(data map[string]any) WiseEntityBase`

Create a new `Facetec` entity instance. Pass `nil` for no initial data.

#### `File(data map[string]any) WiseEntityBase`

Create a new `File` entity instance. Pass `nil` for no initial data.

#### `Funding(data map[string]any) WiseEntityBase`

Create a new `Funding` entity instance. Pass `nil` for no initial data.

#### `GpiTracking(data map[string]any) WiseEntityBase`

Create a new `GpiTracking` entity instance. Pass `nil` for no initial data.

#### `HoldLimitBreach(data map[string]any) WiseEntityBase`

Create a new `HoldLimitBreach` entity instance. Pass `nil` for no initial data.

#### `IncomingTransfer(data map[string]any) WiseEntityBase`

Create a new `IncomingTransfer` entity instance. Pass `nil` for no initial data.

#### `Jose(data map[string]any) WiseEntityBase`

Create a new `Jose` entity instance. Pass `nil` for no initial data.

#### `KycReview(data map[string]any) WiseEntityBase`

Create a new `KycReview` entity instance. Pass `nil` for no initial data.

#### `LinkRequest(data map[string]any) WiseEntityBase`

Create a new `LinkRequest` entity instance. Pass `nil` for no initial data.

#### `Message(data map[string]any) WiseEntityBase`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `MultiCurrencyAccount(data map[string]any) WiseEntityBase`

Create a new `MultiCurrencyAccount` entity instance. Pass `nil` for no initial data.

#### `OneTimeToken(data map[string]any) WiseEntityBase`

Create a new `OneTimeToken` entity instance. Pass `nil` for no initial data.

#### `Ott(data map[string]any) WiseEntityBase`

Create a new `Ott` entity instance. Pass `nil` for no initial data.

#### `Payin(data map[string]any) WiseEntityBase`

Create a new `Payin` entity instance. Pass `nil` for no initial data.

#### `PayinDepositDetail(data map[string]any) WiseEntityBase`

Create a new `PayinDepositDetail` entity instance. Pass `nil` for no initial data.

#### `Payment(data map[string]any) WiseEntityBase`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `PaymentInitiation(data map[string]any) WiseEntityBase`

Create a new `PaymentInitiation` entity instance. Pass `nil` for no initial data.

#### `PaymentInstrument(data map[string]any) WiseEntityBase`

Create a new `PaymentInstrument` entity instance. Pass `nil` for no initial data.

#### `PaymentIntent(data map[string]any) WiseEntityBase`

Create a new `PaymentIntent` entity instance. Pass `nil` for no initial data.

#### `PhoneNumber(data map[string]any) WiseEntityBase`

Create a new `PhoneNumber` entity instance. Pass `nil` for no initial data.

#### `Production(data map[string]any) WiseEntityBase`

Create a new `Production` entity instance. Pass `nil` for no initial data.

#### `Profile(data map[string]any) WiseEntityBase`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `Quote(data map[string]any) WiseEntityBase`

Create a new `Quote` entity instance. Pass `nil` for no initial data.

#### `Rate(data map[string]any) WiseEntityBase`

Create a new `Rate` entity instance. Pass `nil` for no initial data.

#### `Recipient(data map[string]any) WiseEntityBase`

Create a new `Recipient` entity instance. Pass `nil` for no initial data.

#### `Rule(data map[string]any) WiseEntityBase`

Create a new `Rule` entity instance. Pass `nil` for no initial data.

#### `Saml(data map[string]any) WiseEntityBase`

Create a new `Saml` entity instance. Pass `nil` for no initial data.

#### `ScaDeviceFingerprint(data map[string]any) WiseEntityBase`

Create a new `ScaDeviceFingerprint` entity instance. Pass `nil` for no initial data.

#### `ScaFacemap(data map[string]any) WiseEntityBase`

Create a new `ScaFacemap` entity instance. Pass `nil` for no initial data.

#### `ScaOtp(data map[string]any) WiseEntityBase`

Create a new `ScaOtp` entity instance. Pass `nil` for no initial data.

#### `ScaSession(data map[string]any) WiseEntityBase`

Create a new `ScaSession` entity instance. Pass `nil` for no initial data.

#### `SettlementAllocation(data map[string]any) WiseEntityBase`

Create a new `SettlementAllocation` entity instance. Pass `nil` for no initial data.

#### `Simulation(data map[string]any) WiseEntityBase`

Create a new `Simulation` entity instance. Pass `nil` for no initial data.

#### `SpendControl(data map[string]any) WiseEntityBase`

Create a new `SpendControl` entity instance. Pass `nil` for no initial data.

#### `SpendLimit(data map[string]any) WiseEntityBase`

Create a new `SpendLimit` entity instance. Pass `nil` for no initial data.

#### `Subscription(data map[string]any) WiseEntityBase`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `TestNotification(data map[string]any) WiseEntityBase`

Create a new `TestNotification` entity instance. Pass `nil` for no initial data.

#### `ThirdPartyTransfer(data map[string]any) WiseEntityBase`

Create a new `ThirdPartyTransfer` entity instance. Pass `nil` for no initial data.

#### `ThreeDSecure(data map[string]any) WiseEntityBase`

Create a new `ThreeDSecure` entity instance. Pass `nil` for no initial data.

#### `Token(data map[string]any) WiseEntityBase`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `Transfer(data map[string]any) WiseEntityBase`

Create a new `Transfer` entity instance. Pass `nil` for no initial data.

#### `TransferRequirement(data map[string]any) WiseEntityBase`

Create a new `TransferRequirement` entity instance. Pass `nil` for no initial data.

#### `Ubo(data map[string]any) WiseEntityBase`

Create a new `Ubo` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) WiseEntityBase`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `Verification(data map[string]any) WiseEntityBase`

Create a new `Verification` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AccountDetailEntity

```go
accountDetail := client.AccountDetail(nil)
fmt.Println(accountDetail.GetName()) // "account_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | Yes | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `any` | Yes | Country/scheme-specific account identification. |
| `country` | `string` | Yes | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `int` | Yes | Unique identifier for the account details. |
| `profileId` | `int` | Yes | Profile ID of the account details owner. |
| `state` | `string` | Yes | Current state of the account details. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.AccountDetail(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountDetailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AccountRequirementEntity

```go
accountRequirement := client.AccountRequirement(nil)
fmt.Println(accountRequirement.GetName()) // "account_requirement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No | Recipient full name. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `map[string]any` | No | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `[]any` | No | List of UI field groups to collect required data. |
| `ownedByCustomer` | `bool` | No | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `int` | No | Personal or business profile ID of the sender. |
| `title` | `string` | No | Human-readable title for the requirement group. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `any` | Yes | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | No | Optional usage/help text. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AccountRequirement(nil).List(map[string]any{"quote_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AccountRequirement(nil).Create(map[string]any{
    "quote_id": "example_quote_id",
    "ultimateBeneficiary": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountRequirementEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ActivityEntity

```go
activity := client.Activity(nil)
fmt.Println(activity.GetName()) // "activity"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | No | Timestamp when the activity was created. |
| `description` | `string` | No | A short description that briefly summarizes the activity. |
| `id` | `string` | No | Activity id. |
| `primaryAmount` | `string` | No | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `map[string]any` | No | The resource associated with the activity. |
| `secondaryAmount` | `string` | No | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | No | Status of the Activity. |
| `title` | `string` | No | Title of the Activity. |
| `type` | `string` | No | Type of Activity. |
| `updatedOn` | `string` | No | Timestamp when the activity was last modified. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Activity(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AddressEntity

```go
address := client.Address(nil)
fmt.Println(address.GetName()) // "address"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `map[string]any` | No | Address details. |
| `id` | `int` | No | Address ID. |
| `profile` | `int` | No | User profile ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `details` | - | - | Yes |
| `id` | - | - | - |
| `profile` | - | - | Yes |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Address(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Address(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Address(nil).Create(map[string]any{
    "details": map[string]any{},
    "profile": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## AddressRequirementEntity

```go
addressRequirement := client.AddressRequirement(nil)
fmt.Println(addressRequirement.GetName()) // "address_requirement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `map[string]any` | Yes | Address details to provide context for requirements lookup. |
| `fields` | `[]any` | No | List of fields required for the address. |
| `profile` | `int` | No | User profile ID. |
| `type` | `string` | No | Always "address". |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.AddressRequirement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.AddressRequirement(nil).Create(map[string]any{
    "details": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AddressRequirementEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BalanceEntity

```go
balance := client.Balance(nil)
fmt.Println(balance.GetName()) // "balance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `map[string]any` | No | Available balance that can be used to fund transfers. |
| `cashAmount` | `map[string]any` | No | Cash amount in the account. |
| `creationTime` | `string` | No | Date when the balance was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `any` | No | Icon for the balance. |
| `id` | `int` | No | Balance ID. |
| `investmentState` | `string` | No | Investment state of the balance. |
| `modificationTime` | `string` | No | Date when the balance was last modified. |
| `name` | `any` | No | Name of the balance. |
| `overdraft` | `map[string]any` | No | Overdraft details for the account. |
| `reservedAmount` | `map[string]any` | No | Amount reserved for transactions. |
| `state` | `string` | Yes | Must be `CLOSED`. |
| `targetRecipientId` | `int` | Yes | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `map[string]any` | No | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `map[string]any` | No | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `map[string]any` | No | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `string` | No | Type of balance account. |
| `visible` | `bool` | No | Whether the balance is visible to the user. |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Balance(nil).List(map[string]any{"profile_id": 1, "type": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Balance(nil).Load(map[string]any{"id": 1, "currency": "currency", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Balance(nil).Create(map[string]any{
    "profile_id": 1,
    "currency": "example_currency",
    "state": "example_state",
    "targetRecipientId": 1,
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Balance(nil).Remove(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BalanceStatementEntity

```go
balanceStatement := client.BalanceStatement(nil)
fmt.Println(balanceStatement.GetName()) // "balance_statement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolder` | `map[string]any` | No | Account holder information. |
| `bankDetails` | `any` | No | Local bank details for the account. |
| `endOfStatementBalance` | `map[string]any` | No | Closing balance for the specified time period. |
| `id` | `string` | No |  |
| `issuer` | `map[string]any` | No | Account issuer information. |
| `query` | `map[string]any` | No | Query parameters used for the request. |
| `transactions` | `[]any` | No | List of transactions in the statement period. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BalanceStatement(nil).Load(map[string]any{"id": 1, "profile_id": 1, "currency": "currency", "interval_end": "interval_end", "interval_start": "interval_start"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BalanceStatementEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BankAccountDetailEntity

```go
bankAccountDetail := client.BankAccountDetail(nil)
fmt.Println(bankAccountDetail.GetName()) // "bank_account_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | Status of the account detail. |
| `currency` | `string` | No | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Account detail ID. |
| `internationalDetails` | `any` | No | International bank account details. |
| `localDetails` | `map[string]any` | No | Local bank account details. |
| `reason` | `string` | No | Reason for the return. |
| `targetAccountId` | `int` | Yes | ID of the currency balance to create account details on. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BankAccountDetail(nil).Create(map[string]any{
    "profile_id": 1,
    "targetAccountId": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BankAccountDetailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BankAccountDetailsOrderEntity

```go
bankAccountDetailsOrder := client.BankAccountDetailsOrder(nil)
fmt.Println(bankAccountDetailsOrder.GetName()) // "bank_account_details_order"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `int` | No | Unique ID of the issued account details. |
| `balanceId` | `any` | No | ID of the balance the order is for. |
| `creationTime` | `string` | No | Timestamp of when the order was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Unique ID of the order. |
| `modificationTime` | `string` | No | Timestamp of the last modification to the order. |
| `requirements` | `[]any` | No | List of requirements to fulfill the order. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.BankAccountDetailsOrder(nil).List(map[string]any{"profile_id": 1, "currency": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BankAccountDetailsOrder(nil).Create(map[string]any{
    "profile_id": 1,
    "currency": "example_currency",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BankAccountDetailsOrderEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BatchGroupEntity

```go
batchGroup := client.BatchGroup(nil)
fmt.Println(batchGroup.GetName()) // "batch_group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alreadyPaid` | `bool` | No | Not applicable to this use case. |
| `fileName` | `any` | No | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | No | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | No | Batch group ID. |
| `name` | `string` | No | Descriptive name for the batch group. |
| `payInDetails` | `[]any` | No | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `any` | No | Optional ID of the payin session. |
| `profileId` | `int` | No | The ID of the profile this payment belongs to. |
| `shortId` | `int` | No | Not applicable to this use case. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | No | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `[]any` | No | The IDs of all transfers successfully added to the group. |
| `type` | `string` | Yes | The method of payment to use. |
| `userId` | `int` | No | The ID of the user who initiated this payment. |
| `version` | `int` | No | Batch version, used for concurrency control. |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.BatchGroup(nil).Load(map[string]any{"id": "batch_group_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BatchGroup(nil).Create(map[string]any{
    "profile_id": 1,
    "name": "example_name",
    "sourceCurrency": "example_sourceCurrency",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.BatchGroup(nil).Update(map[string]any{
    "id": "batch_group_id",
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BatchGroupEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BulkSettlementEntity

```go
bulkSettlement := client.BulkSettlement(nil)
fmt.Println(bulkSettlement.GetName()) // "bulk_settlement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransfer` | `float64` | No | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `[]any` | No | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | No | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | Yes | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Yes | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `[]any` | Yes | Array of transfers to be settled. |
| `type` | `string` | Yes | Type of settlement. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BulkSettlement(nil).Create(map[string]any{
    "settlementDate": "example_settlementDate",
    "settlementReference": "example_settlementReference",
    "transfers": []any{},
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BulkSettlementEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## BusinessProfileEntity

```go
businessProfile := client.BusinessProfile(nil)
fmt.Println(businessProfile.GetName()) // "business_profile"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abn` | `any` | No | Australian Business Number (only for Australian businesses). |
| `acn` | `any` | No | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | No | Email of the actor. |
| `address` | `map[string]any` | No | Main registered address of the business. |
| `arbn` | `any` | No | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | No | Free-form description of the business activities. |
| `businessName` | `string` | No | Registered business name. |
| `businessNameInKatakana` | `any` | No | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `map[string]any` | No | Business representative details. |
| `companyRole` | `string` | No | Role of the person managing the business profile. |
| `companyType` | `string` | No | Type of company. |
| `contactDetails` | `map[string]any` | No | Contact information for the business. |
| `createdAt` | `string` | No | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | No | Current status of this profile. |
| `descriptionOfBusiness` | `string` | No | Deprecated. |
| `email` | `string` | No | Primary email address for the business. |
| `externalCustomerId` | `string` | No | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | No | Deprecated. |
| `fullName` | `string` | No | Full legal name of the business. |
| `id` | `int` | No | Unique identifier for the profile. |
| `industryCategories` | `[]any` | No | One or more industry categories classifying the business. |
| `operationalAddresses` | `[]any` | No | An array of operational addresses for the business. |
| `publicId` | `string` | No | Publicly accessible identifier for the profile. |
| `registrationNumber` | `string` | No | Business registration number. |
| `secondLevelCategory` | `string` | No | Deprecated. |
| `type` | `string` | Yes | Type of profile. |
| `updatedAt` | `string` | No | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `int` | No | The ID of the user associated with this profile. |
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.BusinessProfile(nil).Create(map[string]any{
    "contactDetails": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.BusinessProfile(nil).Update(map[string]any{
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BusinessProfileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CardEntity

```go
card := client.Card(nil)
fmt.Println(card.GetName()) // "card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bankIdentificationNumber` | `string` | No | Bank identification number (BIN) of the card. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardProgram` | `map[string]any` | No | Card program details. |
| `clientId` | `string` | No | Client ID of the partner that issued the card. |
| `creationTime` | `string` | No | Time when the card was created. |
| `expiryDate` | `string` | No | Date when the card will expire. |
| `id` | `string` | No |  |
| `lastFourDigits` | `string` | No | Last 4 digits of the card number. |
| `modificationTime` | `string` | No | Time when the card was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card. |
| `profileId` | `int` | No | Profile ID that owns this card. |
| `status` | `map[string]any` | No | Current status of the card. |
| `token` | `string` | No | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | No | Method with which physical card spending permissions can be unlocked. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Card(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Card(nil).Create(map[string]any{
    "card_token": "example_card_token",
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CardHolderLimitEntity

```go
cardHolderLimit := client.CardHolderLimit(nil)
fmt.Println(cardHolderLimit.GetName()) // "card_holder_limit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `map[string]any` | Yes | The limits to set, per aggregation window. |
| `spendLimits` | `[]any` | No | Spend limits configured for this cardholder. |
| `type` | `string` | Yes | The category of spending the limit applies to. |

### Field Usage by Operation

| Field | list | update | remove |
| --- | --- | --- | --- |
| `aggregateWindow` | Yes | - | - |
| `spendLimits` | - | - | - |
| `type` | Yes | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CardHolderLimit(nil).List(map[string]any{"card_holder_profile_id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CardHolderLimit(nil).Update(map[string]any{
    "card_holder_profile_id": 1,
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.CardHolderLimit(nil).Remove(map[string]any{"card_holder_profile_id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardHolderLimitEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CardLimitEntity

```go
cardLimit := client.CardLimit(nil)
fmt.Println(cardLimit.GetName()) // "card_limit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `any` | No |  |
| `lifetime` | `any` | No |  |
| `monthly` | `any` | No |  |
| `transaction` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CardLimit(nil).Load(map[string]any{"card_token": "card_token", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CardLimit(nil).Update(map[string]any{
    "card_token": "card_token",
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardLimitEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CardOrderEntity

```go
cardOrder := client.CardOrder(nil)
fmt.Println(cardOrder.GetName()) // "card_order"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `map[string]any` | No | Address set during card order. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardHolderProfileId` | `int` | No | The cardholder profile for this card. |
| `cardProgram` | `map[string]any` | No | The card program associated with this card order. |
| `cardToken` | `any` | No | Token of the card associated with card order. |
| `city` | `string` | No | Card holder's city (max 30 characters). |
| `clientId` | `string` | No | Client ID. |
| `country` | `string` | No | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | No | Time when the card order is created. |
| `deliveryDetails` | `map[string]any` | No | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | No | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | No | The delivery method for the card order. |
| `embossedName` | `string` | No | The cardholder's name to print on the card (physical card only). |
| `errors` | `[]any` | No | Collection of validation errors. |
| `firstLine` | `string` | No | Card holder's address (max 30 characters). |
| `id` | `int` | No | ID of the card order. |
| `lifetimeLimit` | `any` | No | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | No | Time when the card order was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card order. |
| `postCode` | `string` | No | Card holder's postal code (max 10 characters). |
| `profileId` | `int` | No | Profile ID. |
| `program` | `string` | Yes | The name of the card program. |
| `replacementDetails` | `map[string]any` | No | The replacement details for this card. |
| `replacesCard` | `any` | No | Token of the card being replaced by this replacement card order. |
| `secondLine` | `any` | No | Card holder's address (max 30 characters). |
| `state` | `any` | No | Card holder's state (max 30 characters). |
| `status` | `string` | No | Status of the card order. |
| `thirdLine` | `any` | No | Card holder's address (max 30 characters). |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CardOrder(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CardOrder(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CardOrder(nil).Create(map[string]any{
    "cardHolderName": "example_cardHolderName",
    "program": "example_program",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.CardOrder(nil).Update(map[string]any{
    "id": 1,
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CardSensitiveDetailEntity

```go
cardSensitiveDetail := client.CardSensitiveDetail(nil)
fmt.Println(cardSensitiveDetail.GetName()) // "card_sensitive_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `encryptedPayload` | `string` | Yes | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `string` | No | The RSA public key. |
| `keyVersion` | `int` | Yes | The version of the key to use. |
| `version` | `int` | No | Version of the encryption key. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CardSensitiveDetail(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.CardSensitiveDetail(nil).Create(map[string]any{
    "encryptedPayload": "example_encryptedPayload",
    "keyVersion": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardSensitiveDetailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CardTransactionEntity

```go
cardTransaction := client.CardTransaction(nil)
fmt.Println(cardTransaction.GetName()) // "card_transaction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approvalCode` | `any` | No | Also called authorization code. |
| `arn` | `any` | No | Acquirer reference number |
| `authorisationMethod` | `string` | No | Authorisation method |
| `balanceChannelReferenceId` | `any` | No | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `map[string]any` | No | Billing amount |
| `cardToken` | `string` | No | Unique identifier of the card |
| `creationTime` | `string` | No | When the transaction was created |
| `credits` | `[]any` | No | Array of credits. |
| `debits` | `[]any` | No | Array of debits. |
| `declineReason` | `any` | No | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `any` | No | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `[]any` | No | Array of fees |
| `id` | `int` | No | ID of the transaction |
| `merchant` | `map[string]any` | No | Merchant information |
| `modificationTime` | `string` | No | When the transaction was last updated |
| `pinValidationResult` | `any` | No | PIN validation result. |
| `purgeTime` | `any` | No | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `any` | No | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | No | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `map[string]any` | No | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `map[string]any` | No | Transaction amount including all fees |
| `type` | `string` | No | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.CardTransaction(nil).List(map[string]any{"card_token": "example", "profile_id": 1, "from_creation_time": "example", "to_creation_time": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.CardTransaction(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardTransactionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CaseEntity

```go
case_ := client.Case(nil)
fmt.Println(case_.GetName()) // "case"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp when the case was created. |
| `description` | `string` | No | The description of the request. |
| `details` | `map[string]any` | No | Details related to the case. |
| `externalId` | `string` | No | Partner-created identifier for this case, if applicable. |
| `id` | `int` | Yes | Unique identifier of the case. |
| `messages` | `[]any` | Yes | List of messages associated with this case. |
| `profileId` | `int` | Yes | The profile ID associated with this case. |
| `reference` | `map[string]any` | Yes | Reference information linking the case to a related entity. |
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Case(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Case(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CaseEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ClaimAccountEntity

```go
claimAccount := client.ClaimAccount(nil)
fmt.Println(claimAccount.GetName()) // "claim_account"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claimAccountCode` | `string` | No | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `string` | Yes | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ClaimAccount(nil).Create(map[string]any{
    "registrationCode": "example_registrationCode",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ClaimAccountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ComparisonEntity

```go
comparison := client.Comparison(nil)
fmt.Println(comparison.GetName()) // "comparison"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | No | The comparison amount |
| `amountType` | `string` | No | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `any` | No | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `[]any` | No | List of provider types included in the response |
| `providers` | `[]any` | No | List of providers with their estimated quotes |
| `sourceCountry` | `any` | No | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `any` | No | ISO 4217 source currency code |
| `targetCountry` | `any` | No | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `any` | No | ISO 4217 target currency code |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Comparison(nil).Load(map[string]any{"source_currency": "source_currency", "target_currency": "target_currency"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ContactEntity

```go
contact := client.Contact(nil)
fmt.Println(contact.GetName()) // "contact"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | `string` | No | Contact ID in the format of UUID. |
| `identifier` | `string` | No | A Wise profile's identifier. |
| `name` | `string` | No | Full name of the contact. |
| `targetCurrency` | `string` | No | 3 character currency code. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Contact(nil).Create(map[string]any{
    "profile_id": 1,
    "is_direct_identifier_creation": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContactEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## CurrencyEntity

```go
currency := client.Currency(nil)
fmt.Println(currency.GetName()) // "currency"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `[]any` | No | Keywords associated with this currency. |
| `name` | `string` | No | Display name of this currency. |
| `supportsDecimals` | `bool` | No | Whether this currency supports decimal values or not. |
| `symbol` | `string` | No | The symbol of this currency. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Currency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeliveryEstimateEntity

```go
deliveryEstimate := client.DeliveryEstimate(nil)
fmt.Println(deliveryEstimate.GetName()) // "delivery_estimate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estimatedDeliveryDate` | `string` | No | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `string` | No | A string to display to users for the estimated delivery date. |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.DeliveryEstimate(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeliveryEstimateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DeliveryUpdateEntity

```go
deliveryUpdate := client.DeliveryUpdate(nil)
fmt.Println(deliveryUpdate.GetName()) // "delivery_update"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery_update` | `string` | Yes | The delivery signal to simulate. |
| `delivery_update_path` | `[]any` | Yes | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `any` | No | Optional estimated delivery time. |
| `observation_id` | `string` | Yes | Server-generated observation identifier. |
| `occurred_at` | `string` | Yes | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `any` | No | Payment scheme to include in the observation. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DeliveryUpdate(nil).Create(map[string]any{
    "transfer_id": 1,
    "delivery_update": "example_delivery_update",
    "delivery_update_path": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeliveryUpdateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DigitalWalletEntity

```go
digitalWallet := client.DigitalWallet(nil)
fmt.Println(digitalWallet.GetName()) // "digital_wallet"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation` | `string` | Yes | Approve or decline a payment token activation |
| `paymentTokens` | `[]any` | No |  |
| `walletNames` | `[]any` | No | List of supported wallet types. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DigitalWallet(nil).Create(map[string]any{
    "card_token": "example_card_token",
    "profile_id": 1,
    "activation": "example_activation",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DigitalWalletEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DirectDebitAccountEntity

```go
directDebitAccount := client.DirectDebitAccount(nil)
fmt.Println(directDebitAccount.GetName()) // "direct_debit_account"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | No | Currency of the bank account. |
| `details` | `map[string]any` | No | Bank account details |
| `id` | `int` | No | Direct debit account ID |
| `type` | `string` | No | Payment type for which the account is used. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DirectDebitAccount(nil).List(map[string]any{"profile_id": 1, "currency": "example", "type": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.DirectDebitAccount(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DirectDebitAccountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DirectorEntity

```go
director := client.Director(nil)
fmt.Println(director.GetName()) // "director"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryOfResidenceIso3Code` | `string` | No | 3 character country code. |
| `dateOfBirth` | `string` | No | Date of birth. |
| `directors` | `[]any` | No |  |
| `firstName` | `string` | No | Director first name. |
| `id` | `int` | No | ID of the director. |
| `lastName` | `string` | No | Director last name. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Director(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Director(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Director(nil).Update(map[string]any{
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Director(nil).Remove(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DirectorEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DisputeEntity

```go
dispute := client.Dispute(nil)
fmt.Println(dispute.GetName()) // "dispute"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canWithdraw` | `bool` | No | Whether the dispute can be withdrawn. |
| `createdAt` | `string` | No | Time when the dispute was created. |
| `createdBy` | `string` | No | Creator of the dispute. |
| `disclaimer` | `map[string]any` | No | Acknowledgement fields. |
| `files` | `map[string]any` | No | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `map[string]any` | No | Form fields required to submit this dispute. |
| `id` | `string` | No | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | No | Time when the dispute was last updated. |
| `profileId` | `int` | No | Profile ID. |
| `reason` | `string` | No | Dispute reason code. |
| `receipt` | `string` | No | The file to upload. |
| `status` | `string` | No | Dispute overall status. |
| `statusMessage` | `string` | No | Explanation for `subStatus`. |
| `subStatus` | `string` | No | Dispute detailed status. |
| `transaction` | `map[string]any` | No | Transaction details for the dispute. |
| `transactionId` | `int` | No | Card transaction ID. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Dispute(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Dispute(nil).Load(map[string]any{"id": "dispute_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Dispute(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Dispute(nil).Update(map[string]any{
    "id": "dispute_id",
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DisputeEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## DisputeReasonEntity

```go
disputeReason := client.DisputeReason(nil)
fmt.Println(disputeReason.GetName()) // "dispute_reason"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The type of reasons available for the dispute. |
| `description` | `string` | No | The description of the dispute reason. |
| `isFraud` | `bool` | No | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `[]any` | No | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `bool` | No | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | No | Text to display when showing the dispute form to your users. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.DisputeReason(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DisputeReasonEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FacetecEntity

```go
facetec := client.Facetec(nil)
fmt.Println(facetec.GetName()) // "facetec"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Facetec(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FacetecEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FileEntity

```go
file := client.File(nil)
fmt.Println(file.GetName()) // "file"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp when the file was uploaded. |
| `file` | `string` | Yes | The file to upload. |
| `fileId` | `string` | Yes | Unique identifier of the uploaded file. |
| `fileName` | `string` | Yes | The name of the uploaded file. |
| `profileId` | `int` | Yes | The ID of the profile this file belongs to. |
| `purpose` | `string` | Yes | The purpose of the file upload. |
| `submissionData` | `map[string]any` | Yes | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.File(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.File(nil).Create(map[string]any{
    "createdAt": "example_createdAt",
    "file": "example_file",
    "fileId": "example_fileId",
    "fileName": "example_fileName",
    "profileId": 1,
    "purpose": "example_purpose",
    "submissionData": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## FundingEntity

```go
funding := client.Funding(nil)
fmt.Println(funding.GetName()) // "funding"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransactionId` | `int` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Funding(nil).Create(map[string]any{
    "profile_id": 1,
    "transfer_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FundingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## GpiTrackingEntity

```go
gpiTracking := client.GpiTracking(nil)
fmt.Println(gpiTracking.GetName()) // "gpi_tracking"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | Yes | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | Yes | The type of identifier used to look up the transfer. |
| `transactions` | `[]any` | No | The matching GPI tracking transactions. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.GpiTracking(nil).Create(map[string]any{
    "identifier": "example_identifier",
    "identifierType": "example_identifierType",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GpiTrackingEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## HoldLimitBreachEntity

```go
holdLimitBreach := client.HoldLimitBreach(nil)
fmt.Println(holdLimitBreach.GetName()) // "hold_limit_breach"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | No | Amount value. |
| `closingReason` | `string` | No | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `string` | No | Date when the hold limit breach was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `int` | No | Hold limit breach ID. |
| `profileId` | `int` | No | ID of the profile that owns the hold limit breach |
| `state` | `string` | No | Current state of the hold limit breach. |
| `updatedAt` | `string` | No | Date when the hold limit breach was last modified. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.HoldLimitBreach(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HoldLimitBreachEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## IncomingTransferEntity

```go
incomingTransfer := client.IncomingTransfer(nil)
fmt.Println(incomingTransfer.GetName()) // "incoming_transfer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `string` | No | Account details ID that received the incoming transfer. |
| `amounts` | `map[string]any` | Yes | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Yes | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | No | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | No | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Yes | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `map[string]any` | Yes | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `map[string]any` | Yes | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | No | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `float64` | Yes | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `map[string]any` | Yes | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Yes | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `[]any` | Yes | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `int` | Yes | Profile ID of the balance owner. |
| `scheme` | `string` | Yes | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Yes | Current state of the incoming transfer. |
| `uetr` | `string` | No | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | No | Unstructured remittance information provided by the debtor. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.IncomingTransfer(nil).Load(map[string]any{"id": "incoming_transfer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IncomingTransferEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## JoseEntity

```go
jose := client.Jose(nil)
fmt.Println(jose.GetName()) // "jose"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keyId` | `string` | No | ID of the key in UUID format. |
| `keyMaterial` | `map[string]any` | No |  |
| `publicKeyMaterial` | `map[string]any` | No |  |
| `scope` | `string` | No | Scope of the key. |
| `validFrom` | `string` | No | The key is valid from this date. |
| `validTill` | `string` | No | The key is valid until this date. |
| `version` | `int` | No | Version of the public key issued. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Jose(nil).Load(map[string]any{"algorithm": "algorithm", "scope": "scope"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Jose(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JoseEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## KycReviewEntity

```go
kycReview := client.KycReview(nil)
fmt.Println(kycReview.GetName()) // "kyc_review"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Timestamp marking the creation of the KYC Review. |
| `id` | `string` | No | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `any` | No | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `any` | No | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `any` | No | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `any` | No | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | No | Aggregated state of the underlying requirement set. |
| `triggerData` | `map[string]any` | No | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `[]any` | No | List of trigger reference objects. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.KycReview(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.KycReview(nil).Load(map[string]any{"id": "kyc_review_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.KycReview(nil).Create(map[string]any{
    "profile_id": 1,
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.KycReview(nil).Update(map[string]any{
    "id": "kyc_review_id",
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `KycReviewEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LinkRequestEntity

```go
linkRequest := client.LinkRequest(nil)
fmt.Println(linkRequest.GetName()) // "link_request"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientKey` | `string` | Yes | Client key that created the embedded link request. |
| `email` | `string` | Yes | The end user's email address, to receive dispute updates. |
| `id` | `string` | Yes | Embedded link request ID. |
| `metadata` | `map[string]any` | Yes | Flow-specific metadata. |
| `profileId` | `int` | Yes | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | Yes | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `int` | Yes | The ID of the card transaction to dispute. |
| `type` | `string` | Yes | Embedded Flow type. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.LinkRequest(nil).Load(map[string]any{"id": "link_request_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.LinkRequest(nil).Create(map[string]any{
    "profile_id": 1,
    "email": "example_email",
    "redirectUrl": "example_redirectUrl",
    "transactionId": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkRequestEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MessageEntity

```go
message := client.Message(nil)
fmt.Println(message.GetName()) // "message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionData` | `map[string]any` | Yes | The data for the message submission. |
| `type` | `string` | Yes | The type of message submission. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Message(nil).Create(map[string]any{
    "case_id": 1,
    "submissionData": map[string]any{},
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MultiCurrencyAccountEntity

```go
multiCurrencyAccount := client.MultiCurrencyAccount(nil)
fmt.Println(multiCurrencyAccount.GetName()) // "multi_currency_account"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.MultiCurrencyAccount(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MultiCurrencyAccountEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OneTimeTokenEntity

```go
oneTimeToken := client.OneTimeToken(nil)
fmt.Println(oneTimeToken.GetName()) // "one_time_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challenges` | `[]any` | No | An array of challenges. |
| `faceMap` | `string` | No | A base64 encoded string. |
| `oneTimeToken` | `string` | No | A one-time token unique identifier. |
| `validity` | `int` | No | The One-Time Token expiration in seconds. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.OneTimeToken(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OneTimeTokenEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OttEntity

```go
ott := client.Ott(nil)
fmt.Println(ott.GetName()) // "ott"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionType` | `string` | No | The action bound to the one time token. |
| `challenges` | `[]any` | No | Array of challenge objects. |
| `oneTimeToken` | `string` | No | Unique identifier of a one time token. |
| `userId` | `int` | No | Creator of this one time token. |
| `validity` | `int` | No | Seconds until the one time token becomes expired. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Ott(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OttEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PayinEntity

```go
payin := client.Payin(nil)
fmt.Println(payin.GetName()) // "payin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | No |  |
| `currency` | `string` | No |  |
| `details` | `map[string]any` | No | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Payin(nil).Create(map[string]any{
    "payin_session_id": "example_payin_session_id",
    "profile_id": 1,
    "payinSessionId": "example_payinSessionId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PayinEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PayinDepositDetailEntity

```go
payinDepositDetail := client.PayinDepositDetail(nil)
fmt.Println(payinDepositDetail.GetName()) // "payin_deposit_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `payinBank` | `map[string]any` | No | Information about the receiving bank. |
| `payinBankAccount` | `map[string]any` | No | Bank account details to use to send the payment to. |
| `wiseInformation` | `map[string]any` | No | Information about the receiving Wise entity, the owner of the bank account. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PayinDepositDetail(nil).Load(map[string]any{"profile_id": 1, "transfer_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PayinDepositDetailEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PaymentEntity

```go
payment := client.Payment(nil)
fmt.Println(payment.GetName()) // "payment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | No | Transfer source amount |
| `currency` | `string` | No | Transfer source currency |
| `id` | `int` | No | Payment ID |
| `method` | `string` | No | The payment method used to pay for the transfer |
| `pricingVariant` | `any` | No | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | No | Date of when payment was created |
| `timeUpdated` | `string` | No | Date of when payment was updated |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Payment(nil).List(map[string]any{"transfer_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PaymentInitiationEntity

```go
paymentInitiation := client.PaymentInitiation(nil)
fmt.Println(paymentInitiation.GetName()) // "payment_initiation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PaymentInitiation(nil).Load(map[string]any{"id": 1, "batch_group_id": "batch_group_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PaymentInitiation(nil).Create(map[string]any{
    "batch_group_id": "example_batch_group_id",
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaymentInitiationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PaymentInstrumentEntity

```go
paymentInstrument := client.PaymentInstrument(nil)
fmt.Println(paymentInstrument.GetName()) // "payment_instrument"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No |  |
| `accountNumber` | `string` | No |  |
| `accountOwnerDetails` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.PaymentInstrument(nil).List(map[string]any{"id": "example", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PaymentInstrument(nil).Load(map[string]any{"id": "payment_instrument_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PaymentInstrument(nil).Create(map[string]any{
    "profile_id": 1,
    "accountNumber": "example_accountNumber",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaymentInstrumentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PaymentIntentEntity

```go
paymentIntent := client.PaymentIntent(nil)
fmt.Println(paymentIntent.GetName()) // "payment_intent"
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
| `sourceAmount` | `float64` | No | Source amount of the payment. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217). |
| `state` | `string` | No | Current state of the payment intent. |
| `targetAmount` | `float64` | No | Target amount of the payment. |
| `targetCurrency` | `string` | No | Target currency code (ISO 4217). |
| `updatedAt` | `string` | No | Timestamp when the payment intent was last updated. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.PaymentIntent(nil).Load(map[string]any{"id": "payment_intent_id", "allocation_id": "allocation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaymentIntentEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PhoneNumberEntity

```go
phoneNumber := client.PhoneNumber(nil)
fmt.Println(phoneNumber.GetName()) // "phone_number"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | No | Client ID of which this phone number belongs to. |
| `id` | `int` | No | ID of the phone number. |
| `phoneNumber` | `string` | No | A text representation of phone number. |
| `type` | `string` | No | Type of phone number when used in authentication. |
| `verified` | `bool` | No | Indicator if phone number is verified. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.PhoneNumber(nil).Create(map[string]any{
    "user_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhoneNumberEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProductionEntity

```go
production := client.Production(nil)
fmt.Println(production.GetName()) // "production"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `any` | No | Detailed description of the error code. |
| `errorCode` | `any` | No | Code returned when card production is not successful. |
| `kioskId` | `any` | No | Identifier that specifies which kiosk machine is producing the card. |
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Production(nil).Load(map[string]any{"card_token": "card_token", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Production(nil).Update(map[string]any{
    "card_token": "card_token",
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ProfileEntity

```go
profile := client.Profile(nil)
fmt.Println(profile.GetName()) // "profile"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `map[string]any` | No |  |
| `avatar` | `string` | No |  |
| `contactDetails` | `map[string]any` | No |  |
| `createdAt` | `string` | No |  |
| `currentState` | `string` | No |  |
| `dateOfBirth` | `string` | No |  |
| `email` | `string` | No |  |
| `firstName` | `string` | No |  |
| `fullName` | `string` | No |  |
| `id` | `int` | No |  |
| `lastName` | `string` | No |  |
| `phoneNumber` | `string` | No |  |
| `preferredName` | `string` | No |  |
| `publicId` | `string` | No |  |
| `secondaryAddresses` | `[]any` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `userId` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Profile(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Profile(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## QuoteEntity

```go
quote := client.Quote(nil)
fmt.Println(quote.GetName()) // "quote"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdTime` | `string` | No | Quote created timestamp. |
| `creationContext` | `map[string]any` | No | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | No | The date and time the quote expires. |
| `guaranteedTargetAmount` | `bool` | No | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `bool` | No | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | No | ID of this quote (GUID format). |
| `notices` | `[]any` | No | Messages to display to the user. |
| `payOut` | `string` | No | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `map[string]any` | No | _Optional_. |
| `paymentOptions` | `[]any` | No | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | No | Preferred pay-in method. |
| `pricingConfiguration` | `map[string]any` | No | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `int` | No | Personal or business profile ID. |
| `providedAmountType` | `string` | No | Indicates whether the quote was created as source or target. |
| `rate` | `float64` | No | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `string` | No | Date and time the locked rate expires. |
| `rateType` | `string` | No | Whether the rate is fixed or floating. |
| `sourceAmount` | `float64` | No | Amount in source currency to send. |
| `sourceCurrency` | `string` | No | Source (sending) currency code. |
| `status` | `string` | No | Current status of the quote. |
| `targetAccount` | `int` | No | _Optional_. |
| `targetAmount` | `float64` | No | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `bool` | No | Indicates whether target amount is allowed. |
| `targetCurrency` | `string` | No | Target (receive) currency code. |
| `user` | `int` | No | User ID that created the quote. |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Quote(nil).Load(map[string]any{"id": "quote_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Quote(nil).Create(map[string]any{
    "sourceCurrency": "example_sourceCurrency",
    "targetCurrency": "example_targetCurrency",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Quote(nil).Update(map[string]any{
    "id": "quote_id",
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RateEntity

```go
rate := client.Rate(nil)
fmt.Println(rate.GetName()) // "rate"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `float64` | Yes | Exchange rate value. |
| `source` | `string` | Yes | Source (send) currency code. |
| `target` | `string` | Yes | Target (receive) currency code. |
| `time` | `string` | Yes | Timestamp for exchange rate. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Rate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RateEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RecipientEntity

```go
recipient := client.Recipient(nil)
fmt.Println(recipient.GetName()) // "recipient"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedOutcomes` | `bool` | Yes | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `string` | No | Recipient full name. |
| `accountId` | `int` | No | Recipient account ID. |
| `accountSummary` | `string` | No | Summary of account details for ease of lookup. |
| `active` | `bool` | No | Status of the recipient account. |
| `commonFieldMap` | `map[string]any` | No | Map of key lookup fields for the account. |
| `confirmations` | `map[string]any` | No | Contains verification results for the recipient's details. |
| `country` | `string` | No | 2-character country code. |
| `creatorId` | `int` | No | Account entity that owns the recipient account. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `map[string]any` | No | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `[]any` | No | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | No | Account hash for tracking changes to recipient details. |
| `id` | `int` | No | ID of the recipient. |
| `isInternal` | `bool` | No | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | No | Entity type of recipient account. |
| `longAccountSummary` | `string` | No | Longer account details summary. |
| `name` | `map[string]any` | No | Recipient name details. |
| `ownedByCustomer` | `bool` | No | Inidicates if recipient account belongs to profile owner. |
| `profile` | `int` | No | Personal or business profile ID of the sender. |
| `profileId` | `int` | No | Specific profile that owns the recipient account. |
| `quoteId` | `string` | No | Quote ID. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `any` | Yes | The details for the ultimate beneficiary of this recipient. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Recipient(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Load(map[string]any{"account_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Create(map[string]any{
    "acceptedOutcomes": true,
    "ultimateBeneficiary": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Update(map[string]any{
    "account_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Recipient(nil).Remove(map[string]any{"account_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecipientEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## RuleEntity

```go
rule := client.Rule(nil)
fmt.Println(rule.GetName()) // "rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | The description of the authorisation rule. |
| `id` | `int` | No | The unique ID for the authorisation rule. |
| `operation` | `string` | No | Determines whether the transactions should be allowed or blocked. |
| `type` | `string` | No | The type of authorisation rule. |
| `values` | `[]any` | No | A list of values based on the `type` of rule configured. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Rule(nil).List(map[string]any{"application_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Rule(nil).Create(map[string]any{
    "application_id": "example_application_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RuleEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SamlEntity

```go
saml := client.Saml(nil)
fmt.Println(saml.GetName()) // "saml"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `RelayState` | `string` | No | Opaque state value. |
| `SAMLResponse` | `string` | Yes | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Saml(nil).Load(map[string]any{"registration_id": "registration_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Saml(nil).Create(map[string]any{
    "SAMLResponse": "example_SAMLResponse",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SamlEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScaDeviceFingerprintEntity

```go
scaDeviceFingerprint := client.ScaDeviceFingerprint(nil)
fmt.Println(scaDeviceFingerprint.GetName()) // "sca_device_fingerprint"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `string` | No | The identifier of the device fingerprint. |
| `id` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ScaDeviceFingerprint(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ScaDeviceFingerprint(nil).Remove(map[string]any{"id": "sca_device_fingerprint_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScaDeviceFingerprintEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScaFacemapEntity

```go
scaFacemap := client.ScaFacemap(nil)
fmt.Println(scaFacemap.GetName()) // "sca_facemap"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `faceMap` | `string` | No | A base64 encoded string. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ScaFacemap(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ScaFacemap(nil).Remove(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScaFacemapEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScaOtpEntity

```go
scaOtp := client.ScaOtp(nil)
fmt.Println(scaOtp.GetName()) // "sca_otp"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.ScaOtp(nil).Remove(map[string]any{"phone_number_id": 1, "user_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScaOtpEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ScaSessionEntity

```go
scaSession := client.ScaSession(nil)
fmt.Println(scaSession.GetName()) // "sca_session"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ScaSession(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScaSessionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SettlementAllocationEntity

```go
settlementAllocation := client.SettlementAllocation(nil)
fmt.Println(settlementAllocation.GetName()) // "settlement_allocation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | `map[string]any` | Yes |  |
| `createdAt` | `string` | No | Timestamp when the settlement allocation was created. |
| `currency` | `string` | No | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `float64` | No | Expected total amount for the allocation. |
| `file` | `string` | Yes | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | No | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | No | Token for fetching the next page of payment intents. |
| `paymentIntents` | `[]any` | No | List of payment intents associated with the allocation. |
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.SettlementAllocation(nil).Load(map[string]any{"id": "settlement_allocation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.SettlementAllocation(nil).Create(map[string]any{
    "command": map[string]any{},
    "createdAt": "example_createdAt",
    "currency": "example_currency",
    "expectedTotalAmount": 1,
    "file": "example_file",
    "id": "example_id",
    "paymentReference": "example_paymentReference",
    "state": "example_state",
    "updatedAt": "example_updatedAt",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SettlementAllocationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SimulationEntity

```go
simulation := client.Simulation(nil)
fmt.Println(simulation.GetName()) // "simulation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `string` | No |  |
| `created` | `string` | No |  |
| `creationTime` | `float64` | No | Time when the card transaction was created. |
| `description` | `any` | No | Description of the KYC review item. |
| `details` | `map[string]any` | No |  |
| `failure_reason_code` | `string` | No | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `bool` | No |  |
| `id` | `string` | No |  |
| `key` | `string` | No | KYC review item key. |
| `quote` | `int` | No |  |
| `rate` | `float64` | No |  |
| `reference` | `string` | No |  |
| `sourceAccount` | `string` | No |  |
| `sourceCurrency` | `string` | No |  |
| `sourceValue` | `int` | No |  |
| `state` | `string` | No | State of the KYC review item. |
| `status` | `string` | No |  |
| `targetAccount` | `int` | No |  |
| `targetCurrency` | `string` | No |  |
| `targetValue` | `float64` | No |  |
| `transactionId` | `int` | No | ID of the transaction. |
| `transferRequest` | `string` | No |  |
| `user` | `int` | No |  |
| `wise_id` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Simulation(nil).List(map[string]any{"card_token": "example", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Simulation(nil).Load(map[string]any{"status": "status", "transfer_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Simulation(nil).Create(map[string]any{
    "transfer_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SimulationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SpendControlEntity

```go
spendControl := client.SpendControl(nil)
fmt.Println(spendControl.GetName()) // "spend_control"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ruleId` | `int` | No | The ID of the applied authorisation rule. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SpendControl(nil).List(map[string]any{"application_id": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.SpendControl(nil).Remove(map[string]any{"application_id": "application_id", "rule_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpendControlEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SpendLimitEntity

```go
spendLimit := client.SpendLimit(nil)
fmt.Println(spendLimit.GetName()) // "spend_limit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `type` | `string` | No | The type of transaction. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.SpendLimit(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.SpendLimit(nil).Update(map[string]any{
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.SpendLimit(nil).Remove(map[string]any{"id": "spend_limit_id", "card_id": "card_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpendLimitEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## SubscriptionEntity

```go
subscription := client.Subscription(nil)
fmt.Println(subscription.GetName()) // "subscription"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the subscription was created. |
| `created_by` | `map[string]any` | No |  |
| `delivery` | `map[string]any` | No |  |
| `id` | `string` | No | UUID that uniquely identifies the subscription. |
| `name` | `string` | No | A custom name for your webhook to ease with identification. |
| `scope` | `map[string]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Subscription(nil).List(map[string]any{"client_key": "example"}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id", "client_key": "client_key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Subscription(nil).Create(map[string]any{
    "client_key": "example_client_key",
    "delivery": map[string]any{},
    "name": "example_name",
    "trigger_on": "example_trigger_on",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria. Returns the entity, marked as deleted; `err` is non-nil on failure.

```go
result, err := client.Subscription(nil).Remove(map[string]any{"id": "subscription_id", "client_key": "client_key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TestNotificationEntity

```go
testNotification := client.TestNotification(nil)
fmt.Println(testNotification.GetName()) // "test_notification"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the test notification was created. |
| `delivery_id` | `string` | No | ID of the delivery that was queued for sending. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.TestNotification(nil).Create(map[string]any{
    "client_key": "example_client_key",
    "subscription_id": "example_subscription_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TestNotificationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ThirdPartyTransferEntity

```go
thirdPartyTransfer := client.ThirdPartyTransfer(nil)
fmt.Println(thirdPartyTransfer.GetName()) // "third_party_transfer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | No | Timestamp when transfer was created. |
| `details` | `map[string]any` | No | Payment Details |
| `hasActiveIssues` | `bool` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | No | Transfer ID |
| `originalTransferId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `map[string]any` | No | Data block to capture payment originator details |
| `quote` | `string` | No | Quote ID |
| `rate` | `float64` | No | Exchange rate value |
| `sourceAccount` | `int` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `float64` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `int` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `float64` | No | Transfer amount in target currency |
| `user` | `int` | No | Your user ID |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.ThirdPartyTransfer(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ThirdPartyTransfer(nil).Create(map[string]any{
    "profile_id": 1,
    "details": map[string]any{},
    "originalTransferId": "example_originalTransferId",
    "originator": map[string]any{},
    "quote": "example_quote",
    "targetAccount": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ThirdPartyTransferEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ThreeDSecureEntity

```go
threeDSecure := client.ThreeDSecure(nil)
fmt.Println(threeDSecure.GetName()) // "three_d_secure"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeStatus` | `string` | Yes | The customer's response to the 3DS challenge. |
| `transactionReference` | `string` | Yes | Transaction reference as received in the 3DS challenge webhook event. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.ThreeDSecure(nil).Create(map[string]any{
    "profile_id": 1,
    "challengeStatus": "example_challengeStatus",
    "transactionReference": "example_transactionReference",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ThreeDSecureEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TokenEntity

```go
token := client.Token(nil)
fmt.Println(token.GetName()) // "token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | No | Access token to be used when calling the API. |
| `created_at` | `string` | No | Token creation time in ISO 8601 format. |
| `expires_at` | `string` | No | Access token expiration timestamp (UTC). |
| `expires_in` | `int` | No | Access token expiry time in seconds. |
| `refresh_token` | `string` | No | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `string` | No | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `int` | No | Refresh token expiry time in seconds. |
| `scope` | `string` | No | Scope of the token. |
| `token_type` | `string` | No | Type of the token. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Token(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TransferEntity

```go
transfer := client.Transfer(nil)
fmt.Println(transfer.GetName()) // "transfer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `any` | No | Your business profile ID |
| `created` | `string` | No | Timestamp when transfer was created |
| `customerTransactionId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `map[string]any` | No |  |
| `hasActiveIssues` | `bool` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | No | Transfer ID |
| `payinSessionId` | `string` | No | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `any` | No | V1 quote ID |
| `quoteUuid` | `string` | No | V2 quote ID |
| `rate` | `float64` | No | Exchange rate value |
| `reference` | `string` | No | Deprecated, use `details.reference` instead |
| `sourceAccount` | `any` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `float64` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `int` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `float64` | No | Transfer amount in target currency |
| `transferRequest` | `any` | No | Deprecated |
| `user` | `int` | No | Your user ID |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Transfer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Transfer(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Transfer(nil).Create(map[string]any{
    "customerTransactionId": "example_customerTransactionId",
    "quoteUuid": "example_quoteUuid",
    "targetAccount": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Transfer(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TransferEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TransferRequirementEntity

```go
transferRequirement := client.TransferRequirement(nil)
fmt.Println(transferRequirement.GetName()) // "transfer_requirement"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customerTransactionId` | `string` | No | Unique identifier for the transfer request |
| `details` | `map[string]any` | No |  |
| `originatorLegalEntityType` | `string` | No | Type of sender. |
| `quoteUuid` | `string` | Yes | V2 quote ID |
| `targetAccount` | `int` | Yes | Recipient account ID |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.TransferRequirement(nil).Create(map[string]any{
    "quoteUuid": "example_quoteUuid",
    "targetAccount": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TransferRequirementEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UboEntity

```go
ubo := client.Ubo(nil)
fmt.Println(ubo.GetName()) // "ubo"
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
| `ownershipPercentage` | `int` | No | Percentage of ownership. |
| `postCode` | `string` | No | Address post code. |
| `state` | `string` | No | State or region of residential address. |
| `ubos` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Ubo(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Ubo(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.Ubo(nil).Update(map[string]any{
    "profile_id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UboEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | If user is active or not. |
| `details` | `any` | No | User details. |
| `email` | `string` | No | User's email. |
| `id` | `int` | No | User ID. |
| `language` | `string` | No | User default language for UI and email communication. |
| `name` | `any` | No | User's full name. |
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.User(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.User(nil).Create(map[string]any{
    "email": "example_email",
    "registrationCode": "example_registrationCode",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`. Returns the updated entity; `err` is non-nil on failure.

```go
result, err := client.User(nil).Update(map[string]any{
    "id": 1,
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## VerificationEntity

```go
verification := client.Verification(nil)
fmt.Println(verification.GetName()) // "verification"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_evidences` | `[]any` | No | List of evidence types required to complete verification. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Verification(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data. Returns the created entity; `err` is non-nil on failure.

```go
result, err := client.Verification(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VerificationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewWiseSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "secrets": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

