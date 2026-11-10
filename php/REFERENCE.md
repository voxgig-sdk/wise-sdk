# Wise PHP SDK Reference

Complete API reference for the Wise PHP SDK.


## WiseSDK

### Constructor

```php
require_once __DIR__ . '/wise_sdk.php';

$client = new WiseSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WiseSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = WiseSDK::test();
```


### Instance Methods

#### `AccountDetail($data = null)`

Create a new `AccountDetailEntity` instance. Pass `null` for no initial data.

#### `AccountRequirement($data = null)`

Create a new `AccountRequirementEntity` instance. Pass `null` for no initial data.

#### `Activity($data = null)`

Create a new `ActivityEntity` instance. Pass `null` for no initial data.

#### `Address($data = null)`

Create a new `AddressEntity` instance. Pass `null` for no initial data.

#### `AddressRequirement($data = null)`

Create a new `AddressRequirementEntity` instance. Pass `null` for no initial data.

#### `Balance($data = null)`

Create a new `BalanceEntity` instance. Pass `null` for no initial data.

#### `BalanceStatement($data = null)`

Create a new `BalanceStatementEntity` instance. Pass `null` for no initial data.

#### `BankAccountDetail($data = null)`

Create a new `BankAccountDetailEntity` instance. Pass `null` for no initial data.

#### `BankAccountDetailsOrder($data = null)`

Create a new `BankAccountDetailsOrderEntity` instance. Pass `null` for no initial data.

#### `BatchGroup($data = null)`

Create a new `BatchGroupEntity` instance. Pass `null` for no initial data.

#### `BulkSettlement($data = null)`

Create a new `BulkSettlementEntity` instance. Pass `null` for no initial data.

#### `BusinessProfile($data = null)`

Create a new `BusinessProfileEntity` instance. Pass `null` for no initial data.

#### `Card($data = null)`

Create a new `CardEntity` instance. Pass `null` for no initial data.

#### `CardHolderLimit($data = null)`

Create a new `CardHolderLimitEntity` instance. Pass `null` for no initial data.

#### `CardLimit($data = null)`

Create a new `CardLimitEntity` instance. Pass `null` for no initial data.

#### `CardOrder($data = null)`

Create a new `CardOrderEntity` instance. Pass `null` for no initial data.

#### `CardSensitiveDetail($data = null)`

Create a new `CardSensitiveDetailEntity` instance. Pass `null` for no initial data.

#### `CardTransaction($data = null)`

Create a new `CardTransactionEntity` instance. Pass `null` for no initial data.

#### `Case($data = null)`

Create a new `CaseEntity` instance. Pass `null` for no initial data.

#### `ClaimAccount($data = null)`

Create a new `ClaimAccountEntity` instance. Pass `null` for no initial data.

#### `Comparison($data = null)`

Create a new `ComparisonEntity` instance. Pass `null` for no initial data.

#### `Contact($data = null)`

Create a new `ContactEntity` instance. Pass `null` for no initial data.

#### `Currency($data = null)`

Create a new `CurrencyEntity` instance. Pass `null` for no initial data.

#### `DeliveryEstimate($data = null)`

Create a new `DeliveryEstimateEntity` instance. Pass `null` for no initial data.

#### `DeliveryUpdate($data = null)`

Create a new `DeliveryUpdateEntity` instance. Pass `null` for no initial data.

#### `DigitalWallet($data = null)`

Create a new `DigitalWalletEntity` instance. Pass `null` for no initial data.

#### `DirectDebitAccount($data = null)`

Create a new `DirectDebitAccountEntity` instance. Pass `null` for no initial data.

#### `Director($data = null)`

Create a new `DirectorEntity` instance. Pass `null` for no initial data.

#### `Dispute($data = null)`

Create a new `DisputeEntity` instance. Pass `null` for no initial data.

#### `DisputeReason($data = null)`

Create a new `DisputeReasonEntity` instance. Pass `null` for no initial data.

#### `Facetec($data = null)`

Create a new `FacetecEntity` instance. Pass `null` for no initial data.

#### `File($data = null)`

Create a new `FileEntity` instance. Pass `null` for no initial data.

#### `Funding($data = null)`

Create a new `FundingEntity` instance. Pass `null` for no initial data.

#### `GpiTracking($data = null)`

Create a new `GpiTrackingEntity` instance. Pass `null` for no initial data.

#### `HoldLimitBreach($data = null)`

Create a new `HoldLimitBreachEntity` instance. Pass `null` for no initial data.

#### `IncomingTransfer($data = null)`

Create a new `IncomingTransferEntity` instance. Pass `null` for no initial data.

#### `Jose($data = null)`

Create a new `JoseEntity` instance. Pass `null` for no initial data.

#### `KycReview($data = null)`

Create a new `KycReviewEntity` instance. Pass `null` for no initial data.

#### `LinkRequest($data = null)`

Create a new `LinkRequestEntity` instance. Pass `null` for no initial data.

#### `Message($data = null)`

Create a new `MessageEntity` instance. Pass `null` for no initial data.

#### `MultiCurrencyAccount($data = null)`

Create a new `MultiCurrencyAccountEntity` instance. Pass `null` for no initial data.

#### `OneTimeToken($data = null)`

Create a new `OneTimeTokenEntity` instance. Pass `null` for no initial data.

#### `Ott($data = null)`

Create a new `OttEntity` instance. Pass `null` for no initial data.

#### `Payin($data = null)`

Create a new `PayinEntity` instance. Pass `null` for no initial data.

#### `PayinDepositDetail($data = null)`

Create a new `PayinDepositDetailEntity` instance. Pass `null` for no initial data.

#### `Payment($data = null)`

Create a new `PaymentEntity` instance. Pass `null` for no initial data.

#### `PaymentInitiation($data = null)`

Create a new `PaymentInitiationEntity` instance. Pass `null` for no initial data.

#### `PaymentInstrument($data = null)`

Create a new `PaymentInstrumentEntity` instance. Pass `null` for no initial data.

#### `PaymentIntent($data = null)`

Create a new `PaymentIntentEntity` instance. Pass `null` for no initial data.

#### `PhoneNumber($data = null)`

Create a new `PhoneNumberEntity` instance. Pass `null` for no initial data.

#### `Production($data = null)`

Create a new `ProductionEntity` instance. Pass `null` for no initial data.

#### `Profile($data = null)`

Create a new `ProfileEntity` instance. Pass `null` for no initial data.

#### `Quote($data = null)`

Create a new `QuoteEntity` instance. Pass `null` for no initial data.

#### `Rate($data = null)`

Create a new `RateEntity` instance. Pass `null` for no initial data.

#### `Recipient($data = null)`

Create a new `RecipientEntity` instance. Pass `null` for no initial data.

#### `Rule($data = null)`

Create a new `RuleEntity` instance. Pass `null` for no initial data.

#### `Saml($data = null)`

Create a new `SamlEntity` instance. Pass `null` for no initial data.

#### `ScaDeviceFingerprint($data = null)`

Create a new `ScaDeviceFingerprintEntity` instance. Pass `null` for no initial data.

#### `ScaFacemap($data = null)`

Create a new `ScaFacemapEntity` instance. Pass `null` for no initial data.

#### `ScaOtp($data = null)`

Create a new `ScaOtpEntity` instance. Pass `null` for no initial data.

#### `ScaSession($data = null)`

Create a new `ScaSessionEntity` instance. Pass `null` for no initial data.

#### `SettlementAllocation($data = null)`

Create a new `SettlementAllocationEntity` instance. Pass `null` for no initial data.

#### `Simulation($data = null)`

Create a new `SimulationEntity` instance. Pass `null` for no initial data.

#### `SpendControl($data = null)`

Create a new `SpendControlEntity` instance. Pass `null` for no initial data.

#### `SpendLimit($data = null)`

Create a new `SpendLimitEntity` instance. Pass `null` for no initial data.

#### `Subscription($data = null)`

Create a new `SubscriptionEntity` instance. Pass `null` for no initial data.

#### `TestNotification($data = null)`

Create a new `TestNotificationEntity` instance. Pass `null` for no initial data.

#### `ThirdPartyTransfer($data = null)`

Create a new `ThirdPartyTransferEntity` instance. Pass `null` for no initial data.

#### `ThreeDSecure($data = null)`

Create a new `ThreeDSecureEntity` instance. Pass `null` for no initial data.

#### `Token($data = null)`

Create a new `TokenEntity` instance. Pass `null` for no initial data.

#### `Transfer($data = null)`

Create a new `TransferEntity` instance. Pass `null` for no initial data.

#### `TransferRequirement($data = null)`

Create a new `TransferRequirementEntity` instance. Pass `null` for no initial data.

#### `Ubo($data = null)`

Create a new `UboEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `Verification($data = null)`

Create a new `VerificationEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): WiseUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AccountDetailEntity

```php
$account_detail = $client->AccountDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | Yes | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `mixed` | Yes | Country/scheme-specific account identification. |
| `country` | `string` | Yes | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `int` | Yes | Unique identifier for the account details. |
| `profileId` | `int` | Yes | Profile ID of the account details owner. |
| `state` | `string` | Yes | Current state of the account details. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AccountDetail()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountDetailEntity`

Create a new `AccountDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AccountRequirementEntity

```php
$account_requirement = $client->AccountRequirement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No | Recipient full name. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `array` | No | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `array` | No | List of UI field groups to collect required data. |
| `ownedByCustomer` | `bool` | No | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `int` | No | Personal or business profile ID of the sender. |
| `title` | `string` | No | Human-readable title for the requirement group. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `mixed` | Yes | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | No | Optional usage/help text. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AccountRequirement()->create([
  "quote_id" => null, // string
  "ultimateBeneficiary" => null, // mixed
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AccountRequirement()->list(["quote_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountRequirementEntity`

Create a new `AccountRequirementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ActivityEntity

```php
$activity = $client->Activity();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | No | Timestamp when the activity was created. |
| `description` | `string` | No | A short description that briefly summarizes the activity. |
| `id` | `string` | No | Activity id. |
| `primaryAmount` | `string` | No | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `array` | No | The resource associated with the activity. |
| `secondaryAmount` | `string` | No | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | No | Status of the Activity. |
| `title` | `string` | No | Title of the Activity. |
| `type` | `string` | No | Type of Activity. |
| `updatedOn` | `string` | No | Timestamp when the activity was last modified. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Activity()->list(["profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ActivityEntity`

Create a new `ActivityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AddressEntity

```php
$address = $client->Address();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `array` | No | Address details. |
| `id` | `int` | No | Address ID. |
| `profile` | `int` | No | User profile ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `details` | - | - | Yes |
| `id` | - | - | - |
| `profile` | - | - | Yes |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Address()->create([
  "details" => null, // array
  "profile" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Address()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Address()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AddressEntity`

Create a new `AddressEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AddressRequirementEntity

```php
$address_requirement = $client->AddressRequirement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `array` | Yes | Address details to provide context for requirements lookup. |
| `fields` | `array` | No | List of fields required for the address. |
| `profile` | `int` | No | User profile ID. |
| `type` | `string` | No | Always "address". |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->AddressRequirement()->create([
  "details" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->AddressRequirement()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AddressRequirementEntity`

Create a new `AddressRequirementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BalanceEntity

```php
$balance = $client->Balance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `array` | No | Available balance that can be used to fund transfers. |
| `cashAmount` | `array` | No | Cash amount in the account. |
| `creationTime` | `string` | No | Date when the balance was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `mixed` | No | Icon for the balance. |
| `id` | `int` | No | Balance ID. |
| `investmentState` | `string` | No | Investment state of the balance. |
| `modificationTime` | `string` | No | Date when the balance was last modified. |
| `name` | `mixed` | No | Name of the balance. |
| `overdraft` | `array` | No | Overdraft details for the account. |
| `reservedAmount` | `array` | No | Amount reserved for transactions. |
| `state` | `string` | Yes | Must be `CLOSED`. |
| `targetRecipientId` | `int` | Yes | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `array` | No | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `array` | No | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `array` | No | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Balance()->create([
  "profile_id" => null, // int
  "currency" => null, // string
  "state" => null, // string
  "targetRecipientId" => null, // int
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Balance()->list(["profile_id" => 1, "type" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Balance()->load(["id" => 1, "currency" => "currency", "profile_id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Balance()->remove(["id" => 1, "profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BalanceEntity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BalanceStatementEntity

```php
$balance_statement = $client->BalanceStatement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolder` | `array` | No | Account holder information. |
| `bankDetails` | `mixed` | No | Local bank details for the account. |
| `endOfStatementBalance` | `array` | No | Closing balance for the specified time period. |
| `id` | `string` | No |  |
| `issuer` | `array` | No | Account issuer information. |
| `query` | `array` | No | Query parameters used for the request. |
| `transactions` | `array` | No | List of transactions in the statement period. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BalanceStatement()->load(["id" => 1, "profile_id" => 1, "currency" => "currency", "interval_end" => "interval_end", "interval_start" => "interval_start"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BalanceStatementEntity`

Create a new `BalanceStatementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BankAccountDetailEntity

```php
$bank_account_detail = $client->BankAccountDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | Status of the account detail. |
| `currency` | `string` | No | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Account detail ID. |
| `internationalDetails` | `mixed` | No | International bank account details. |
| `localDetails` | `array` | No | Local bank account details. |
| `reason` | `string` | No | Reason for the return. |
| `targetAccountId` | `int` | Yes | ID of the currency balance to create account details on. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BankAccountDetail()->create([
  "profile_id" => null, // int
  "targetAccountId" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BankAccountDetailEntity`

Create a new `BankAccountDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BankAccountDetailsOrderEntity

```php
$bank_account_details_order = $client->BankAccountDetailsOrder();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `int` | No | Unique ID of the issued account details. |
| `balanceId` | `mixed` | No | ID of the balance the order is for. |
| `creationTime` | `string` | No | Timestamp of when the order was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Unique ID of the order. |
| `modificationTime` | `string` | No | Timestamp of the last modification to the order. |
| `requirements` | `array` | No | List of requirements to fulfill the order. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BankAccountDetailsOrder()->create([
  "profile_id" => null, // int
  "currency" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->BankAccountDetailsOrder()->list(["profile_id" => 1, "currency" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BankAccountDetailsOrderEntity`

Create a new `BankAccountDetailsOrderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BatchGroupEntity

```php
$batch_group = $client->BatchGroup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alreadyPaid` | `bool` | No | Not applicable to this use case. |
| `fileName` | `mixed` | No | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | No | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | No | Batch group ID. |
| `name` | `string` | No | Descriptive name for the batch group. |
| `payInDetails` | `array` | No | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `mixed` | No | Optional ID of the payin session. |
| `profileId` | `int` | No | The ID of the profile this payment belongs to. |
| `shortId` | `int` | No | Not applicable to this use case. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | No | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `array` | No | The IDs of all transfers successfully added to the group. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BatchGroup()->create([
  "profile_id" => null, // int
  "name" => null, // string
  "sourceCurrency" => null, // string
  "type" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->BatchGroup()->load(["id" => "batch_group_id", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->BatchGroup()->update([
  "id" => "batch_group_id",
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BatchGroupEntity`

Create a new `BatchGroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BulkSettlementEntity

```php
$bulk_settlement = $client->BulkSettlement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransfer` | `float` | No | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `array` | No | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | No | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | Yes | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Yes | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `array` | Yes | Array of transfers to be settled. |
| `type` | `string` | Yes | Type of settlement. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BulkSettlement()->create([
  "settlementDate" => null, // string
  "settlementReference" => null, // string
  "transfers" => null, // array
  "type" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BulkSettlementEntity`

Create a new `BulkSettlementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BusinessProfileEntity

```php
$business_profile = $client->BusinessProfile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abn` | `mixed` | No | Australian Business Number (only for Australian businesses). |
| `acn` | `mixed` | No | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | No | Email of the actor. |
| `address` | `array` | No | Main registered address of the business. |
| `arbn` | `mixed` | No | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | No | Free-form description of the business activities. |
| `businessName` | `string` | No | Registered business name. |
| `businessNameInKatakana` | `mixed` | No | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `array` | No | Business representative details. |
| `companyRole` | `string` | No | Role of the person managing the business profile. |
| `companyType` | `string` | No | Type of company. |
| `contactDetails` | `array` | No | Contact information for the business. |
| `createdAt` | `string` | No | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | No | Current status of this profile. |
| `descriptionOfBusiness` | `string` | No | Deprecated. |
| `email` | `string` | No | Primary email address for the business. |
| `externalCustomerId` | `string` | No | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | No | Deprecated. |
| `fullName` | `string` | No | Full legal name of the business. |
| `id` | `int` | No | Unique identifier for the profile. |
| `industryCategories` | `array` | No | One or more industry categories classifying the business. |
| `operationalAddresses` | `array` | No | An array of operational addresses for the business. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->BusinessProfile()->create([
  "contactDetails" => null, // array
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->BusinessProfile()->update([
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BusinessProfileEntity`

Create a new `BusinessProfileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bankIdentificationNumber` | `string` | No | Bank identification number (BIN) of the card. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardProgram` | `array` | No | Card program details. |
| `clientId` | `string` | No | Client ID of the partner that issued the card. |
| `creationTime` | `string` | No | Time when the card was created. |
| `expiryDate` | `string` | No | Date when the card will expire. |
| `id` | `string` | No |  |
| `lastFourDigits` | `string` | No | Last 4 digits of the card number. |
| `modificationTime` | `string` | No | Time when the card was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card. |
| `profileId` | `int` | No | Profile ID that owns this card. |
| `status` | `array` | No | Current status of the card. |
| `token` | `string` | No | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | No | Method with which physical card spending permissions can be unlocked. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Card()->create([
  "card_token" => null, // string
  "profile_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Card()->list(["profile_id" => 1]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Card()->load(["id" => "card_id", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardHolderLimitEntity

```php
$card_holder_limit = $client->CardHolderLimit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `array` | Yes | The limits to set, per aggregation window. |
| `spendLimits` | `array` | No | Spend limits configured for this cardholder. |
| `type` | `string` | Yes | The category of spending the limit applies to. |

### Field Usage by Operation

| Field | list | update | remove |
| --- | --- | --- | --- |
| `aggregateWindow` | Yes | - | - |
| `spendLimits` | - | - | - |
| `type` | Yes | - | - |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CardHolderLimit()->list(["card_holder_profile_id" => 1, "profile_id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->CardHolderLimit()->remove(["card_holder_profile_id" => 1, "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CardHolderLimit()->update([
  "card_holder_profile_id" => 1,
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardHolderLimitEntity`

Create a new `CardHolderLimitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardLimitEntity

```php
$card_limit = $client->CardLimit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `mixed` | No |  |
| `lifetime` | `mixed` | No |  |
| `monthly` | `mixed` | No |  |
| `transaction` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CardLimit()->load(["card_token" => "card_token", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CardLimit()->update([
  "card_token" => "card_token",
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardLimitEntity`

Create a new `CardLimitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardOrderEntity

```php
$card_order = $client->CardOrder();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `array` | No | Address set during card order. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardHolderProfileId` | `int` | No | The cardholder profile for this card. |
| `cardProgram` | `array` | No | The card program associated with this card order. |
| `cardToken` | `mixed` | No | Token of the card associated with card order. |
| `city` | `string` | No | Card holder's city (max 30 characters). |
| `clientId` | `string` | No | Client ID. |
| `country` | `string` | No | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | No | Time when the card order is created. |
| `deliveryDetails` | `array` | No | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | No | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | No | The delivery method for the card order. |
| `embossedName` | `string` | No | The cardholder's name to print on the card (physical card only). |
| `errors` | `array` | No | Collection of validation errors. |
| `firstLine` | `string` | No | Card holder's address (max 30 characters). |
| `id` | `int` | No | ID of the card order. |
| `lifetimeLimit` | `mixed` | No | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | No | Time when the card order was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card order. |
| `postCode` | `string` | No | Card holder's postal code (max 10 characters). |
| `profileId` | `int` | No | Profile ID. |
| `program` | `string` | Yes | The name of the card program. |
| `replacementDetails` | `array` | No | The replacement details for this card. |
| `replacesCard` | `mixed` | No | Token of the card being replaced by this replacement card order. |
| `secondLine` | `mixed` | No | Card holder's address (max 30 characters). |
| `state` | `mixed` | No | Card holder's state (max 30 characters). |
| `status` | `string` | No | Status of the card order. |
| `thirdLine` | `mixed` | No | Card holder's address (max 30 characters). |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CardOrder()->create([
  "cardHolderName" => null, // string
  "program" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CardOrder()->list(["profile_id" => 1]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CardOrder()->load(["id" => 1, "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->CardOrder()->update([
  "id" => 1,
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardOrderEntity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardSensitiveDetailEntity

```php
$card_sensitive_detail = $client->CardSensitiveDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `encryptedPayload` | `string` | Yes | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `string` | No | The RSA public key. |
| `keyVersion` | `int` | Yes | The version of the key to use. |
| `version` | `int` | No | Version of the encryption key. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->CardSensitiveDetail()->create([
  "encryptedPayload" => null, // string
  "keyVersion" => null, // int
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CardSensitiveDetail()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardSensitiveDetailEntity`

Create a new `CardSensitiveDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardTransactionEntity

```php
$card_transaction = $client->CardTransaction();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approvalCode` | `mixed` | No | Also called authorization code. |
| `arn` | `mixed` | No | Acquirer reference number |
| `authorisationMethod` | `string` | No | Authorisation method |
| `balanceChannelReferenceId` | `mixed` | No | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `array` | No | Billing amount |
| `cardToken` | `string` | No | Unique identifier of the card |
| `creationTime` | `string` | No | When the transaction was created |
| `credits` | `array` | No | Array of credits. |
| `debits` | `array` | No | Array of debits. |
| `declineReason` | `mixed` | No | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `mixed` | No | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `array` | No | Array of fees |
| `id` | `int` | No | ID of the transaction |
| `merchant` | `array` | No | Merchant information |
| `modificationTime` | `string` | No | When the transaction was last updated |
| `pinValidationResult` | `mixed` | No | PIN validation result. |
| `purgeTime` | `mixed` | No | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `mixed` | No | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | No | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `array` | No | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `array` | No | Transaction amount including all fees |
| `type` | `string` | No | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->CardTransaction()->list(["card_token" => "example", "profile_id" => 1, "from_creation_time" => "example", "to_creation_time" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->CardTransaction()->load(["id" => 1, "profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardTransactionEntity`

Create a new `CardTransactionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CaseEntity

```php
$case = $client->Case();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp when the case was created. |
| `description` | `string` | No | The description of the request. |
| `details` | `array` | No | Details related to the case. |
| `externalId` | `string` | No | Partner-created identifier for this case, if applicable. |
| `id` | `int` | Yes | Unique identifier of the case. |
| `messages` | `array` | Yes | List of messages associated with this case. |
| `profileId` | `int` | Yes | The profile ID associated with this case. |
| `reference` | `array` | Yes | Reference information linking the case to a related entity. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Case()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Case()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CaseEntity`

Create a new `CaseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ClaimAccountEntity

```php
$claim_account = $client->ClaimAccount();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claimAccountCode` | `string` | No | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `string` | Yes | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ClaimAccount()->create([
  "registrationCode" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ClaimAccountEntity`

Create a new `ClaimAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ComparisonEntity

```php
$comparison = $client->Comparison();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | The comparison amount |
| `amountType` | `string` | No | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `mixed` | No | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `array` | No | List of provider types included in the response |
| `providers` | `array` | No | List of providers with their estimated quotes |
| `sourceCountry` | `mixed` | No | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `mixed` | No | ISO 4217 source currency code |
| `targetCountry` | `mixed` | No | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `mixed` | No | ISO 4217 target currency code |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Comparison()->load(["source_currency" => "source_currency", "target_currency" => "target_currency"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ComparisonEntity`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContactEntity

```php
$contact = $client->Contact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | `string` | No | Contact ID in the format of UUID. |
| `identifier` | `string` | No | A Wise profile's identifier. |
| `name` | `string` | No | Full name of the contact. |
| `targetCurrency` | `string` | No | 3 character currency code. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Contact()->create([
  "profile_id" => null, // int
  "is_direct_identifier_creation" => null, // bool
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContactEntity`

Create a new `ContactEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CurrencyEntity

```php
$currency = $client->Currency();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `array` | No | Keywords associated with this currency. |
| `name` | `string` | No | Display name of this currency. |
| `supportsDecimals` | `bool` | No | Whether this currency supports decimal values or not. |
| `symbol` | `string` | No | The symbol of this currency. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Currency()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CurrencyEntity`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeliveryEstimateEntity

```php
$delivery_estimate = $client->DeliveryEstimate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estimatedDeliveryDate` | `string` | No | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `string` | No | A string to display to users for the estimated delivery date. |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->DeliveryEstimate()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeliveryEstimateEntity`

Create a new `DeliveryEstimateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeliveryUpdateEntity

```php
$delivery_update = $client->DeliveryUpdate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery_update` | `string` | Yes | The delivery signal to simulate. |
| `delivery_update_path` | `array` | Yes | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `mixed` | No | Optional estimated delivery time. |
| `observation_id` | `string` | Yes | Server-generated observation identifier. |
| `occurred_at` | `string` | Yes | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `mixed` | No | Payment scheme to include in the observation. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DeliveryUpdate()->create([
  "transfer_id" => null, // int
  "delivery_update" => null, // string
  "delivery_update_path" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeliveryUpdateEntity`

Create a new `DeliveryUpdateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DigitalWalletEntity

```php
$digital_wallet = $client->DigitalWallet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation` | `string` | Yes | Approve or decline a payment token activation |
| `paymentTokens` | `array` | No |  |
| `walletNames` | `array` | No | List of supported wallet types. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DigitalWallet()->create([
  "card_token" => null, // string
  "profile_id" => null, // int
  "activation" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DigitalWalletEntity`

Create a new `DigitalWalletEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DirectDebitAccountEntity

```php
$direct_debit_account = $client->DirectDebitAccount();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | No | Currency of the bank account. |
| `details` | `array` | No | Bank account details |
| `id` | `int` | No | Direct debit account ID |
| `type` | `string` | No | Payment type for which the account is used. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->DirectDebitAccount()->create([
  "profile_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DirectDebitAccount()->list(["profile_id" => 1, "currency" => "example", "type" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DirectDebitAccountEntity`

Create a new `DirectDebitAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DirectorEntity

```php
$director = $client->Director();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryOfResidenceIso3Code` | `string` | No | 3 character country code. |
| `dateOfBirth` | `string` | No | Date of birth. |
| `directors` | `array` | No |  |
| `firstName` | `string` | No | Director first name. |
| `id` | `int` | No | ID of the director. |
| `lastName` | `string` | No | Director last name. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Director()->create([
  "profile_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Director()->list(["profile_id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Director()->remove(["profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Director()->update([
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DirectorEntity`

Create a new `DirectorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DisputeEntity

```php
$dispute = $client->Dispute();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canWithdraw` | `bool` | No | Whether the dispute can be withdrawn. |
| `createdAt` | `string` | No | Time when the dispute was created. |
| `createdBy` | `string` | No | Creator of the dispute. |
| `disclaimer` | `array` | No | Acknowledgement fields. |
| `files` | `array` | No | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `array` | No | Form fields required to submit this dispute. |
| `id` | `string` | No | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | No | Time when the dispute was last updated. |
| `profileId` | `int` | No | Profile ID. |
| `reason` | `string` | No | Dispute reason code. |
| `receipt` | `string` | No | The file to upload. |
| `status` | `string` | No | Dispute overall status. |
| `statusMessage` | `string` | No | Explanation for `subStatus`. |
| `subStatus` | `string` | No | Dispute detailed status. |
| `transaction` | `array` | No | Transaction details for the dispute. |
| `transactionId` | `int` | No | Card transaction ID. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Dispute()->create([
  "profile_id" => null, // int
]);
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Dispute()->list(["profile_id" => 1]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Dispute()->load(["id" => "dispute_id", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Dispute()->update([
  "id" => "dispute_id",
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DisputeEntity`

Create a new `DisputeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DisputeReasonEntity

```php
$dispute_reason = $client->DisputeReason();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The type of reasons available for the dispute. |
| `description` | `string` | No | The description of the dispute reason. |
| `isFraud` | `bool` | No | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `array` | No | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `bool` | No | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | No | Text to display when showing the dispute form to your users. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->DisputeReason()->list(["profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DisputeReasonEntity`

Create a new `DisputeReasonEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FacetecEntity

```php
$facetec = $client->Facetec();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Facetec()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FacetecEntity`

Create a new `FacetecEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FileEntity

```php
$file = $client->File();
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
| `submissionData` | `array` | Yes | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->File()->create([
  "createdAt" => null, // string
  "file" => null, // string
  "fileId" => null, // string
  "fileName" => null, // string
  "profileId" => null, // int
  "purpose" => null, // string
  "submissionData" => null, // array
]);
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->File()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FileEntity`

Create a new `FileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FundingEntity

```php
$funding = $client->Funding();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransactionId` | `int` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Funding()->create([
  "profile_id" => null, // int
  "transfer_id" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FundingEntity`

Create a new `FundingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GpiTrackingEntity

```php
$gpi_tracking = $client->GpiTracking();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | Yes | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | Yes | The type of identifier used to look up the transfer. |
| `transactions` | `array` | No | The matching GPI tracking transactions. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->GpiTracking()->create([
  "identifier" => null, // string
  "identifierType" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GpiTrackingEntity`

Create a new `GpiTrackingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HoldLimitBreachEntity

```php
$hold_limit_breach = $client->HoldLimitBreach();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | Amount value. |
| `closingReason` | `string` | No | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `string` | No | Date when the hold limit breach was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `int` | No | Hold limit breach ID. |
| `profileId` | `int` | No | ID of the profile that owns the hold limit breach |
| `state` | `string` | No | Current state of the hold limit breach. |
| `updatedAt` | `string` | No | Date when the hold limit breach was last modified. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->HoldLimitBreach()->list(["profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HoldLimitBreachEntity`

Create a new `HoldLimitBreachEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IncomingTransferEntity

```php
$incoming_transfer = $client->IncomingTransfer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `string` | No | Account details ID that received the incoming transfer. |
| `amounts` | `array` | Yes | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Yes | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | No | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | No | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Yes | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `array` | Yes | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `array` | Yes | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | No | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `float` | Yes | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `array` | Yes | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Yes | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `array` | Yes | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `int` | Yes | Profile ID of the balance owner. |
| `scheme` | `string` | Yes | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Yes | Current state of the incoming transfer. |
| `uetr` | `string` | No | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | No | Unstructured remittance information provided by the debtor. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->IncomingTransfer()->load(["id" => "incoming_transfer_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IncomingTransferEntity`

Create a new `IncomingTransferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## JoseEntity

```php
$jose = $client->Jose();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keyId` | `string` | No | ID of the key in UUID format. |
| `keyMaterial` | `array` | No |  |
| `publicKeyMaterial` | `array` | No |  |
| `scope` | `string` | No | Scope of the key. |
| `validFrom` | `string` | No | The key is valid from this date. |
| `validTill` | `string` | No | The key is valid until this date. |
| `version` | `int` | No | Version of the public key issued. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Jose()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Jose()->load(["algorithm" => "algorithm", "scope" => "scope"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): JoseEntity`

Create a new `JoseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## KycReviewEntity

```php
$kyc_review = $client->KycReview();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Timestamp marking the creation of the KYC Review. |
| `id` | `string` | No | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `mixed` | No | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `mixed` | No | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `mixed` | No | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `mixed` | No | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | No | Aggregated state of the underlying requirement set. |
| `triggerData` | `array` | No | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `array` | No | List of trigger reference objects. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->KycReview()->create([
  "profile_id" => null, // int
  "type" => null, // string
]);
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->KycReview()->list(["profile_id" => 1]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->KycReview()->load(["id" => "kyc_review_id", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->KycReview()->update([
  "id" => "kyc_review_id",
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): KycReviewEntity`

Create a new `KycReviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LinkRequestEntity

```php
$link_request = $client->LinkRequest();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientKey` | `string` | Yes | Client key that created the embedded link request. |
| `email` | `string` | Yes | The end user's email address, to receive dispute updates. |
| `id` | `string` | Yes | Embedded link request ID. |
| `metadata` | `array` | Yes | Flow-specific metadata. |
| `profileId` | `int` | Yes | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | Yes | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `int` | Yes | The ID of the card transaction to dispute. |
| `type` | `string` | Yes | Embedded Flow type. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->LinkRequest()->create([
  "profile_id" => null, // int
  "email" => null, // string
  "redirectUrl" => null, // string
  "transactionId" => null, // int
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->LinkRequest()->load(["id" => "link_request_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LinkRequestEntity`

Create a new `LinkRequestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MessageEntity

```php
$message = $client->Message();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionData` | `array` | Yes | The data for the message submission. |
| `type` | `string` | Yes | The type of message submission. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Message()->create([
  "case_id" => null, // int
  "submissionData" => null, // array
  "type" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MessageEntity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MultiCurrencyAccountEntity

```php
$multi_currency_account = $client->MultiCurrencyAccount();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->MultiCurrencyAccount()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MultiCurrencyAccountEntity`

Create a new `MultiCurrencyAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OneTimeTokenEntity

```php
$one_time_token = $client->OneTimeToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challenges` | `array` | No | An array of challenges. |
| `faceMap` | `string` | No | A base64 encoded string. |
| `oneTimeToken` | `string` | No | A one-time token unique identifier. |
| `validity` | `int` | No | The One-Time Token expiration in seconds. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->OneTimeToken()->create([
  "profile_id" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OneTimeTokenEntity`

Create a new `OneTimeTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OttEntity

```php
$ott = $client->Ott();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionType` | `string` | No | The action bound to the one time token. |
| `challenges` | `array` | No | Array of challenge objects. |
| `oneTimeToken` | `string` | No | Unique identifier of a one time token. |
| `userId` | `int` | No | Creator of this one time token. |
| `validity` | `int` | No | Seconds until the one time token becomes expired. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Ott()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OttEntity`

Create a new `OttEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PayinEntity

```php
$payin = $client->Payin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No |  |
| `currency` | `string` | No |  |
| `details` | `array` | No | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Payin()->create([
  "payin_session_id" => null, // string
  "profile_id" => null, // int
  "payinSessionId" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PayinEntity`

Create a new `PayinEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PayinDepositDetailEntity

```php
$payin_deposit_detail = $client->PayinDepositDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `payinBank` | `array` | No | Information about the receiving bank. |
| `payinBankAccount` | `array` | No | Bank account details to use to send the payment to. |
| `wiseInformation` | `array` | No | Information about the receiving Wise entity, the owner of the bank account. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PayinDepositDetail()->load(["profile_id" => 1, "transfer_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PayinDepositDetailEntity`

Create a new `PayinDepositDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentEntity

```php
$payment = $client->Payment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | Transfer source amount |
| `currency` | `string` | No | Transfer source currency |
| `id` | `int` | No | Payment ID |
| `method` | `string` | No | The payment method used to pay for the transfer |
| `pricingVariant` | `mixed` | No | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | No | Date of when payment was created |
| `timeUpdated` | `string` | No | Date of when payment was updated |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Payment()->list(["transfer_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentEntity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentInitiationEntity

```php
$payment_initiation = $client->PaymentInitiation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PaymentInitiation()->create([
  "batch_group_id" => null, // string
  "profile_id" => null, // int
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PaymentInitiation()->load(["id" => 1, "batch_group_id" => "batch_group_id", "profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentInitiationEntity`

Create a new `PaymentInitiationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentInstrumentEntity

```php
$payment_instrument = $client->PaymentInstrument();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No |  |
| `accountNumber` | `string` | No |  |
| `accountOwnerDetails` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PaymentInstrument()->create([
  "profile_id" => null, // int
  "accountNumber" => null, // string
  "type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PaymentInstrument()->list(["id" => "example", "profile_id" => 1]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PaymentInstrument()->load(["id" => "payment_instrument_id", "profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentInstrumentEntity`

Create a new `PaymentInstrumentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentIntentEntity

```php
$payment_intent = $client->PaymentIntent();
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
| `sourceAmount` | `float` | No | Source amount of the payment. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217). |
| `state` | `string` | No | Current state of the payment intent. |
| `targetAmount` | `float` | No | Target amount of the payment. |
| `targetCurrency` | `string` | No | Target currency code (ISO 4217). |
| `updatedAt` | `string` | No | Timestamp when the payment intent was last updated. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PaymentIntent()->load(["id" => "payment_intent_id", "allocation_id" => "allocation_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentIntentEntity`

Create a new `PaymentIntentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhoneNumberEntity

```php
$phone_number = $client->PhoneNumber();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->PhoneNumber()->create([
  "user_id" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhoneNumberEntity`

Create a new `PhoneNumberEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductionEntity

```php
$production = $client->Production();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `mixed` | No | Detailed description of the error code. |
| `errorCode` | `mixed` | No | Code returned when card production is not successful. |
| `kioskId` | `mixed` | No | Identifier that specifies which kiosk machine is producing the card. |
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Production()->load(["card_token" => "card_token", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Production()->update([
  "card_token" => "card_token",
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductionEntity`

Create a new `ProductionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProfileEntity

```php
$profile = $client->Profile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `array` | No |  |
| `avatar` | `string` | No |  |
| `contactDetails` | `array` | No |  |
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
| `secondaryAddresses` | `array` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `userId` | `int` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Profile()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Profile()->load(["id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProfileEntity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QuoteEntity

```php
$quote = $client->Quote();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdTime` | `string` | No | Quote created timestamp. |
| `creationContext` | `array` | No | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | No | The date and time the quote expires. |
| `guaranteedTargetAmount` | `bool` | No | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `bool` | No | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | No | ID of this quote (GUID format). |
| `notices` | `array` | No | Messages to display to the user. |
| `payOut` | `string` | No | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `array` | No | _Optional_. |
| `paymentOptions` | `array` | No | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | No | Preferred pay-in method. |
| `pricingConfiguration` | `array` | No | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `int` | No | Personal or business profile ID. |
| `providedAmountType` | `string` | No | Indicates whether the quote was created as source or target. |
| `rate` | `float` | No | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `string` | No | Date and time the locked rate expires. |
| `rateType` | `string` | No | Whether the rate is fixed or floating. |
| `sourceAmount` | `float` | No | Amount in source currency to send. |
| `sourceCurrency` | `string` | No | Source (sending) currency code. |
| `status` | `string` | No | Current status of the quote. |
| `targetAccount` | `int` | No | _Optional_. |
| `targetAmount` | `float` | No | Amount in target currency to be received by the recipient. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Quote()->create([
  "sourceCurrency" => null, // string
  "targetCurrency" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Quote()->load(["id" => "quote_id", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Quote()->update([
  "id" => "quote_id",
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QuoteEntity`

Create a new `QuoteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RateEntity

```php
$rate = $client->Rate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `float` | Yes | Exchange rate value. |
| `source` | `string` | Yes | Source (send) currency code. |
| `target` | `string` | Yes | Target (receive) currency code. |
| `time` | `string` | Yes | Timestamp for exchange rate. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Rate()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RateEntity`

Create a new `RateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecipientEntity

```php
$recipient = $client->Recipient();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedOutcomes` | `bool` | Yes | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `string` | No | Recipient full name. |
| `accountId` | `int` | No | Recipient account ID. |
| `accountSummary` | `string` | No | Summary of account details for ease of lookup. |
| `active` | `bool` | No | Status of the recipient account. |
| `commonFieldMap` | `array` | No | Map of key lookup fields for the account. |
| `confirmations` | `array` | No | Contains verification results for the recipient's details. |
| `country` | `string` | No | 2-character country code. |
| `creatorId` | `int` | No | Account entity that owns the recipient account. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `array` | No | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `array` | No | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | No | Account hash for tracking changes to recipient details. |
| `id` | `int` | No | ID of the recipient. |
| `isInternal` | `bool` | No | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | No | Entity type of recipient account. |
| `longAccountSummary` | `string` | No | Longer account details summary. |
| `name` | `array` | No | Recipient name details. |
| `ownedByCustomer` | `bool` | No | Inidicates if recipient account belongs to profile owner. |
| `profile` | `int` | No | Personal or business profile ID of the sender. |
| `profileId` | `int` | No | Specific profile that owns the recipient account. |
| `quoteId` | `string` | No | Quote ID. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `mixed` | Yes | The details for the ultimate beneficiary of this recipient. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Recipient()->create([
  "acceptedOutcomes" => null, // bool
  "ultimateBeneficiary" => null, // mixed
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Recipient()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Recipient()->load(["account_id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Recipient()->remove(["account_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Recipient()->update([
  "account_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecipientEntity`

Create a new `RecipientEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RuleEntity

```php
$rule = $client->Rule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | The description of the authorisation rule. |
| `id` | `int` | No | The unique ID for the authorisation rule. |
| `operation` | `string` | No | Determines whether the transactions should be allowed or blocked. |
| `type` | `string` | No | The type of authorisation rule. |
| `values` | `array` | No | A list of values based on the `type` of rule configured. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Rule()->create([
  "application_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Rule()->list(["application_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RuleEntity`

Create a new `RuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SamlEntity

```php
$saml = $client->Saml();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `RelayState` | `string` | No | Opaque state value. |
| `SAMLResponse` | `string` | Yes | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Saml()->create([
  "SAMLResponse" => null, // string
]);
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Saml()->load(["registration_id" => "registration_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SamlEntity`

Create a new `SamlEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScaDeviceFingerprintEntity

```php
$sca_device_fingerprint = $client->ScaDeviceFingerprint();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `string` | No | The identifier of the device fingerprint. |
| `id` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ScaDeviceFingerprint()->create([
  "profile_id" => null, // int
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->ScaDeviceFingerprint()->remove(["id" => "sca_device_fingerprint_id", "profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScaDeviceFingerprintEntity`

Create a new `ScaDeviceFingerprintEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScaFacemapEntity

```php
$sca_facemap = $client->ScaFacemap();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `faceMap` | `string` | No | A base64 encoded string. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ScaFacemap()->create([
  "profile_id" => null, // int
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->ScaFacemap()->remove(["profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScaFacemapEntity`

Create a new `ScaFacemapEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScaOtpEntity

```php
$sca_otp = $client->ScaOtp();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->ScaOtp()->remove(["phone_number_id" => 1, "user_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScaOtpEntity`

Create a new `ScaOtpEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScaSessionEntity

```php
$sca_session = $client->ScaSession();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ScaSession()->create([
  "profile_id" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScaSessionEntity`

Create a new `ScaSessionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SettlementAllocationEntity

```php
$settlement_allocation = $client->SettlementAllocation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | `array` | Yes |  |
| `createdAt` | `string` | No | Timestamp when the settlement allocation was created. |
| `currency` | `string` | No | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `float` | No | Expected total amount for the allocation. |
| `file` | `string` | Yes | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | No | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | No | Token for fetching the next page of payment intents. |
| `paymentIntents` | `array` | No | List of payment intents associated with the allocation. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->SettlementAllocation()->create([
  "command" => null, // array
  "createdAt" => null, // string
  "currency" => null, // string
  "expectedTotalAmount" => null, // float
  "file" => null, // string
  "id" => null, // string
  "paymentReference" => null, // string
  "state" => null, // string
  "updatedAt" => null, // string
]);
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->SettlementAllocation()->load(["id" => "settlement_allocation_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SettlementAllocationEntity`

Create a new `SettlementAllocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SimulationEntity

```php
$simulation = $client->Simulation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `string` | No |  |
| `created` | `string` | No |  |
| `creationTime` | `float` | No | Time when the card transaction was created. |
| `description` | `mixed` | No | Description of the KYC review item. |
| `details` | `array` | No |  |
| `failure_reason_code` | `string` | No | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `bool` | No |  |
| `id` | `string` | No |  |
| `key` | `string` | No | KYC review item key. |
| `quote` | `int` | No |  |
| `rate` | `float` | No |  |
| `reference` | `string` | No |  |
| `sourceAccount` | `string` | No |  |
| `sourceCurrency` | `string` | No |  |
| `sourceValue` | `int` | No |  |
| `state` | `string` | No | State of the KYC review item. |
| `status` | `string` | No |  |
| `targetAccount` | `int` | No |  |
| `targetCurrency` | `string` | No |  |
| `targetValue` | `float` | No |  |
| `transactionId` | `int` | No | ID of the transaction. |
| `transferRequest` | `string` | No |  |
| `user` | `int` | No |  |
| `wise_id` | `int` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Simulation()->create([
  "transfer_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Simulation()->list(["card_token" => "example", "profile_id" => 1]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Simulation()->load(["status" => "status", "transfer_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SimulationEntity`

Create a new `SimulationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SpendControlEntity

```php
$spend_control = $client->SpendControl();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ruleId` | `int` | No | The ID of the applied authorisation rule. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->SpendControl()->list(["application_id" => "example"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->SpendControl()->remove(["application_id" => "application_id", "rule_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SpendControlEntity`

Create a new `SpendControlEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SpendLimitEntity

```php
$spend_limit = $client->SpendLimit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `array` | No |  |
| `id` | `string` | No |  |
| `type` | `string` | No | The type of transaction. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->SpendLimit()->list(["profile_id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->SpendLimit()->remove(["id" => "spend_limit_id", "card_id" => "card_id", "profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->SpendLimit()->update([
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SpendLimitEntity`

Create a new `SpendLimitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SubscriptionEntity

```php
$subscription = $client->Subscription();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the subscription was created. |
| `created_by` | `array` | No |  |
| `delivery` | `array` | No |  |
| `id` | `string` | No | UUID that uniquely identifies the subscription. |
| `name` | `string` | No | A custom name for your webhook to ease with identification. |
| `scope` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Subscription()->create([
  "client_key" => null, // string
  "delivery" => null, // array
  "name" => null, // string
  "trigger_on" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Subscription()->list(["client_key" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Subscription()->load(["id" => "subscription_id", "client_key" => "client_key"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and throws on error.

```php
$result = $client->Subscription()->remove(["id" => "subscription_id", "client_key" => "client_key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SubscriptionEntity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TestNotificationEntity

```php
$test_notification = $client->TestNotification();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the test notification was created. |
| `delivery_id` | `string` | No | ID of the delivery that was queued for sending. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->TestNotification()->create([
  "client_key" => null, // string
  "subscription_id" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TestNotificationEntity`

Create a new `TestNotificationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ThirdPartyTransferEntity

```php
$third_party_transfer = $client->ThirdPartyTransfer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | No | Timestamp when transfer was created. |
| `details` | `array` | No | Payment Details |
| `hasActiveIssues` | `bool` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | No | Transfer ID |
| `originalTransferId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `array` | No | Data block to capture payment originator details |
| `quote` | `string` | No | Quote ID |
| `rate` | `float` | No | Exchange rate value |
| `sourceAccount` | `int` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `float` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `int` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `float` | No | Transfer amount in target currency |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ThirdPartyTransfer()->create([
  "profile_id" => null, // int
  "details" => null, // array
  "originalTransferId" => null, // string
  "originator" => null, // array
  "quote" => null, // string
  "targetAccount" => null, // int
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ThirdPartyTransfer()->load(["id" => 1, "profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ThirdPartyTransferEntity`

Create a new `ThirdPartyTransferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ThreeDSecureEntity

```php
$three_d_secure = $client->ThreeDSecure();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeStatus` | `string` | Yes | The customer's response to the 3DS challenge. |
| `transactionReference` | `string` | Yes | Transaction reference as received in the 3DS challenge webhook event. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->ThreeDSecure()->create([
  "profile_id" => null, // int
  "challengeStatus" => null, // string
  "transactionReference" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ThreeDSecureEntity`

Create a new `ThreeDSecureEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TokenEntity

```php
$token = $client->Token();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Token()->create([
]);
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TokenEntity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TransferEntity

```php
$transfer = $client->Transfer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `mixed` | No | Your business profile ID |
| `created` | `string` | No | Timestamp when transfer was created |
| `customerTransactionId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `array` | No |  |
| `hasActiveIssues` | `bool` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | No | Transfer ID |
| `payinSessionId` | `string` | No | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `mixed` | No | V1 quote ID |
| `quoteUuid` | `string` | No | V2 quote ID |
| `rate` | `float` | No | Exchange rate value |
| `reference` | `string` | No | Deprecated, use `details.reference` instead |
| `sourceAccount` | `mixed` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `float` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `int` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `float` | No | Transfer amount in target currency |
| `transferRequest` | `mixed` | No | Deprecated |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Transfer()->create([
  "customerTransactionId" => null, // string
  "quoteUuid" => null, // string
  "targetAccount" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Transfer()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Transfer()->load(["id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Transfer()->update([
  "id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TransferEntity`

Create a new `TransferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TransferRequirementEntity

```php
$transfer_requirement = $client->TransferRequirement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customerTransactionId` | `string` | No | Unique identifier for the transfer request |
| `details` | `array` | No |  |
| `originatorLegalEntityType` | `string` | No | Type of sender. |
| `quoteUuid` | `string` | Yes | V2 quote ID |
| `targetAccount` | `int` | Yes | Recipient account ID |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->TransferRequirement()->create([
  "quoteUuid" => null, // string
  "targetAccount" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TransferRequirementEntity`

Create a new `TransferRequirementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UboEntity

```php
$ubo = $client->Ubo();
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
| `ubos` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Ubo()->create([
  "profile_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Ubo()->list(["profile_id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->Ubo()->update([
  "profile_id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UboEntity`

Create a new `UboEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | If user is active or not. |
| `details` | `mixed` | No | User details. |
| `email` | `string` | No | User's email. |
| `id` | `int` | No | User ID. |
| `language` | `string` | No | User default language for UI and email communication. |
| `name` | `mixed` | No | User's full name. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->User()->create([
  "email" => null, // string
  "registrationCode" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->User()->load(["id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->User()->update([
  "id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VerificationEntity

```php
$verification = $client->Verification();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_evidences` | `array` | No | List of evidence types required to complete verification. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Verification()->create([
  "profile_id" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Verification()->list(["profile_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VerificationEntity`

Create a new `VerificationEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new WiseSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "secrets" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

