# Wise TypeScript SDK Reference

Complete API reference for the Wise TypeScript SDK.


## WiseSDK

### Constructor

```ts
new WiseSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WiseSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = WiseSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `WiseSDK` instance in test mode.


### Instance Methods

#### `AccountDetail(data?: object)`

Create a new `AccountDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountDetailEntity` instance.

#### `AccountRequirement(data?: object)`

Create a new `AccountRequirement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountRequirementEntity` instance.

#### `Activity(data?: object)`

Create a new `Activity` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ActivityEntity` instance.

#### `Address(data?: object)`

Create a new `Address` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddressEntity` instance.

#### `AddressRequirement(data?: object)`

Create a new `AddressRequirement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddressRequirementEntity` instance.

#### `Balance(data?: object)`

Create a new `Balance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BalanceEntity` instance.

#### `BalanceStatement(data?: object)`

Create a new `BalanceStatement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BalanceStatementEntity` instance.

#### `BankAccountDetail(data?: object)`

Create a new `BankAccountDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BankAccountDetailEntity` instance.

#### `BankAccountDetailsOrder(data?: object)`

Create a new `BankAccountDetailsOrder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BankAccountDetailsOrderEntity` instance.

#### `BatchGroup(data?: object)`

Create a new `BatchGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchGroupEntity` instance.

#### `BulkSettlement(data?: object)`

Create a new `BulkSettlement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BulkSettlementEntity` instance.

#### `BusinessProfile(data?: object)`

Create a new `BusinessProfile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BusinessProfileEntity` instance.

#### `Card(data?: object)`

Create a new `Card` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardEntity` instance.

#### `CardHolderLimit(data?: object)`

Create a new `CardHolderLimit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardHolderLimitEntity` instance.

#### `CardLimit(data?: object)`

Create a new `CardLimit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardLimitEntity` instance.

#### `CardOrder(data?: object)`

Create a new `CardOrder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardOrderEntity` instance.

#### `CardSensitiveDetail(data?: object)`

Create a new `CardSensitiveDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardSensitiveDetailEntity` instance.

#### `CardTransaction(data?: object)`

Create a new `CardTransaction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardTransactionEntity` instance.

#### `Case(data?: object)`

Create a new `Case` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CaseEntity` instance.

#### `ClaimAccount(data?: object)`

Create a new `ClaimAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClaimAccountEntity` instance.

#### `Comparison(data?: object)`

Create a new `Comparison` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ComparisonEntity` instance.

#### `Contact(data?: object)`

Create a new `Contact` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactEntity` instance.

#### `Currency(data?: object)`

Create a new `Currency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CurrencyEntity` instance.

#### `DeliveryEstimate(data?: object)`

Create a new `DeliveryEstimate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeliveryEstimateEntity` instance.

#### `DeliveryUpdate(data?: object)`

Create a new `DeliveryUpdate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeliveryUpdateEntity` instance.

#### `DigitalWallet(data?: object)`

Create a new `DigitalWallet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DigitalWalletEntity` instance.

#### `DirectDebitAccount(data?: object)`

Create a new `DirectDebitAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DirectDebitAccountEntity` instance.

#### `Director(data?: object)`

Create a new `Director` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DirectorEntity` instance.

#### `Dispute(data?: object)`

Create a new `Dispute` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DisputeEntity` instance.

#### `DisputeReason(data?: object)`

Create a new `DisputeReason` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DisputeReasonEntity` instance.

#### `Facetec(data?: object)`

Create a new `Facetec` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FacetecEntity` instance.

#### `File(data?: object)`

Create a new `File` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FileEntity` instance.

#### `Funding(data?: object)`

Create a new `Funding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FundingEntity` instance.

#### `GpiTracking(data?: object)`

Create a new `GpiTracking` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GpiTrackingEntity` instance.

#### `HoldLimitBreach(data?: object)`

Create a new `HoldLimitBreach` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HoldLimitBreachEntity` instance.

#### `IncomingTransfer(data?: object)`

Create a new `IncomingTransfer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IncomingTransferEntity` instance.

#### `Jose(data?: object)`

Create a new `Jose` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JoseEntity` instance.

#### `KycReview(data?: object)`

Create a new `KycReview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KycReviewEntity` instance.

#### `LinkRequest(data?: object)`

Create a new `LinkRequest` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkRequestEntity` instance.

#### `Message(data?: object)`

Create a new `Message` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageEntity` instance.

#### `MultiCurrencyAccount(data?: object)`

Create a new `MultiCurrencyAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MultiCurrencyAccountEntity` instance.

#### `OneTimeToken(data?: object)`

Create a new `OneTimeToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OneTimeTokenEntity` instance.

#### `Ott(data?: object)`

Create a new `Ott` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OttEntity` instance.

#### `Payin(data?: object)`

Create a new `Payin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PayinEntity` instance.

#### `PayinDepositDetail(data?: object)`

Create a new `PayinDepositDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PayinDepositDetailEntity` instance.

#### `Payment(data?: object)`

Create a new `Payment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentEntity` instance.

#### `PaymentInitiation(data?: object)`

Create a new `PaymentInitiation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentInitiationEntity` instance.

#### `PaymentInstrument(data?: object)`

Create a new `PaymentInstrument` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentInstrumentEntity` instance.

#### `PaymentIntent(data?: object)`

Create a new `PaymentIntent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentIntentEntity` instance.

#### `PhoneNumber(data?: object)`

Create a new `PhoneNumber` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhoneNumberEntity` instance.

#### `Production(data?: object)`

Create a new `Production` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductionEntity` instance.

#### `Profile(data?: object)`

Create a new `Profile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProfileEntity` instance.

#### `Quote(data?: object)`

Create a new `Quote` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QuoteEntity` instance.

#### `Rate(data?: object)`

Create a new `Rate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RateEntity` instance.

#### `Recipient(data?: object)`

Create a new `Recipient` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecipientEntity` instance.

#### `Rule(data?: object)`

Create a new `Rule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RuleEntity` instance.

#### `Saml(data?: object)`

Create a new `Saml` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SamlEntity` instance.

#### `ScaDeviceFingerprint(data?: object)`

Create a new `ScaDeviceFingerprint` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScaDeviceFingerprintEntity` instance.

#### `ScaFacemap(data?: object)`

Create a new `ScaFacemap` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScaFacemapEntity` instance.

#### `ScaOtp(data?: object)`

Create a new `ScaOtp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScaOtpEntity` instance.

#### `ScaSession(data?: object)`

Create a new `ScaSession` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScaSessionEntity` instance.

#### `SettlementAllocation(data?: object)`

Create a new `SettlementAllocation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SettlementAllocationEntity` instance.

#### `Simulation(data?: object)`

Create a new `Simulation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SimulationEntity` instance.

#### `SpendControl(data?: object)`

Create a new `SpendControl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpendControlEntity` instance.

#### `SpendLimit(data?: object)`

Create a new `SpendLimit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpendLimitEntity` instance.

#### `Subscription(data?: object)`

Create a new `Subscription` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubscriptionEntity` instance.

#### `TestNotification(data?: object)`

Create a new `TestNotification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TestNotificationEntity` instance.

#### `ThirdPartyTransfer(data?: object)`

Create a new `ThirdPartyTransfer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThirdPartyTransferEntity` instance.

#### `ThreeDSecure(data?: object)`

Create a new `ThreeDSecure` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThreeDSecureEntity` instance.

#### `Token(data?: object)`

Create a new `Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenEntity` instance.

#### `Transfer(data?: object)`

Create a new `Transfer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransferEntity` instance.

#### `TransferRequirement(data?: object)`

Create a new `TransferRequirement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransferRequirementEntity` instance.

#### `Ubo(data?: object)`

Create a new `Ubo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UboEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `Verification(data?: object)`

Create a new `Verification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VerificationEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `WiseSDK.test()`.

**Returns:** `WiseSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccountDetailEntity

```ts
const account_detail = client.AccountDetail()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AccountDetail().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AccountRequirementEntity

```ts
const account_requirement = client.AccountRequirement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No | Recipient full name. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `Record<string, any>` | No | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `any[]` | No | List of UI field groups to collect required data. |
| `ownedByCustomer` | `boolean` | No | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `number` | No | Personal or business profile ID of the sender. |
| `title` | `string` | No | Human-readable title for the requirement group. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `Record<string, any> | null` | Yes | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | No | Optional usage/help text. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AccountRequirement().create({
  quote_id: 'example_quote_id',
  ultimateBeneficiary: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AccountRequirement().list({ quote_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountRequirementEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ActivityEntity

```ts
const activity = client.Activity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | No | Timestamp when the activity was created. |
| `description` | `string` | No | A short description that briefly summarizes the activity. |
| `id` | `string` | No | Activity id. |
| `primaryAmount` | `string` | No | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `Record<string, any>` | No | The resource associated with the activity. |
| `secondaryAmount` | `string` | No | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | No | Status of the Activity. |
| `title` | `string` | No | Title of the Activity. |
| `type` | `string` | No | Type of Activity. |
| `updatedOn` | `string` | No | Timestamp when the activity was last modified. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Activity().list({ profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ActivityEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddressEntity

```ts
const address = client.Address()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `Record<string, any>` | No | Address details. |
| `id` | `number` | No | Address ID. |
| `profile` | `number` | No | User profile ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `details` | - | - | Yes |
| `id` | - | - | - |
| `profile` | - | - | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Address().create({
  details: {},
  profile: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Address().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Address().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddressEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AddressRequirementEntity

```ts
const address_requirement = client.AddressRequirement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `Record<string, any>` | Yes | Address details to provide context for requirements lookup. |
| `fields` | `any[]` | No | List of fields required for the address. |
| `profile` | `number` | No | User profile ID. |
| `type` | `string` | No | Always "address". |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AddressRequirement().create({
  details: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AddressRequirement().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddressRequirementEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BalanceEntity

```ts
const balance = client.Balance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Record<string, any>` | No | Available balance that can be used to fund transfers. |
| `cashAmount` | `Record<string, any>` | No | Cash amount in the account. |
| `creationTime` | `string` | No | Date when the balance was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `Record<string, any> | null` | No | Icon for the balance. |
| `id` | `number` | No | Balance ID. |
| `investmentState` | `string` | No | Investment state of the balance. |
| `modificationTime` | `string` | No | Date when the balance was last modified. |
| `name` | `string | null` | No | Name of the balance. |
| `overdraft` | `Record<string, any>` | No | Overdraft details for the account. |
| `reservedAmount` | `Record<string, any>` | No | Amount reserved for transactions. |
| `state` | `string` | Yes | Must be `CLOSED`. |
| `targetRecipientId` | `number` | Yes | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `Record<string, any>` | No | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `Record<string, any>` | No | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `Record<string, any>` | No | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `movement` | `/profiles/{profileId}/balance-movements` | `client.Balance().create({ $action: 'movement', ... })` |

An action returns that action's OWN response, which is not necessarily a
Balance record — check the API definition for its shape.

```ts
const result = await client.Balance().create({
  $action: 'movement',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Balance().create({
  profile_id: 1,
  currency: 'example_currency',
  state: 'example_state',
  targetRecipientId: 1,
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Balance().list({ profile_id: 1, type: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Balance().load({ id: 1, currency: 'currency', profile_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Balance().remove({ id: 1, profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BalanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BalanceStatementEntity

```ts
const balance_statement = client.BalanceStatement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolder` | `Record<string, any>` | No | Account holder information. |
| `bankDetails` | `Record<string, any> | null` | No | Local bank details for the account. |
| `endOfStatementBalance` | `Record<string, any>` | No | Closing balance for the specified time period. |
| `id` | `string` | No |  |
| `issuer` | `Record<string, any>` | No | Account issuer information. |
| `query` | `Record<string, any>` | No | Query parameters used for the request. |
| `transactions` | `any[]` | No | List of transactions in the statement period. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BalanceStatement().load({ id: 1, profile_id: 1, currency: 'currency', interval_end: 'interval_end', interval_start: 'interval_start' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BalanceStatementEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BankAccountDetailEntity

```ts
const bank_account_detail = client.BankAccountDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No | Status of the account detail. |
| `currency` | `string` | No | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Account detail ID. |
| `internationalDetails` | `Record<string, any> | null` | No | International bank account details. |
| `localDetails` | `Record<string, any>` | No | Local bank account details. |
| `reason` | `string` | No | Reason for the return. |
| `targetAccountId` | `number` | Yes | ID of the currency balance to create account details on. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BankAccountDetail().create({
  profile_id: 1,
  targetAccountId: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BankAccountDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BankAccountDetailsOrderEntity

```ts
const bank_account_details_order = client.BankAccountDetailsOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `number` | No | Unique ID of the issued account details. |
| `balanceId` | `number | null` | No | ID of the balance the order is for. |
| `creationTime` | `string` | No | Timestamp of when the order was created. |
| `currency` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | No | Unique ID of the order. |
| `modificationTime` | `string` | No | Timestamp of the last modification to the order. |
| `requirements` | `any[]` | No | List of requirements to fulfill the order. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BankAccountDetailsOrder().create({
  profile_id: 1,
  currency: 'example_currency',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.BankAccountDetailsOrder().list({ profile_id: 1, currency: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BankAccountDetailsOrderEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BatchGroupEntity

```ts
const batch_group = client.BatchGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alreadyPaid` | `boolean` | No | Not applicable to this use case. |
| `fileName` | `string | null` | No | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | No | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | No | Batch group ID. |
| `name` | `string` | No | Descriptive name for the batch group. |
| `payInDetails` | `any[]` | No | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `string | null` | No | Optional ID of the payin session. |
| `profileId` | `number` | No | The ID of the profile this payment belongs to. |
| `shortId` | `number` | No | Not applicable to this use case. |
| `sourceCurrency` | `string` | No | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | No | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `any[]` | No | The IDs of all transfers successfully added to the group. |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `transfer` | `/profiles/{profileId}/batch-groups/{batchGroupId}/transfers` | `client.BatchGroup().create({ $action: 'transfer', ... })` |

An action returns that action's OWN response, which is not necessarily a
BatchGroup record — check the API definition for its shape.

```ts
const result = await client.BatchGroup().create({
  $action: 'transfer',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BatchGroup().create({
  profile_id: 1,
  name: 'example_name',
  sourceCurrency: 'example_sourceCurrency',
  type: 'example_type',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BatchGroup().load({ id: 'batch_group_id', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.BatchGroup().update({
  id: 'batch_group_id',
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BulkSettlementEntity

```ts
const bulk_settlement = client.BulkSettlement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransfer` | `number` | No | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `any[]` | No | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | No | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | Yes | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Yes | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `any[]` | Yes | Array of transfers to be settled. |
| `type` | `string` | Yes | Type of settlement. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BulkSettlement().create({
  settlementDate: 'example_settlementDate',
  settlementReference: 'example_settlementReference',
  transfers: [],
  type: 'example_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BulkSettlementEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BusinessProfileEntity

```ts
const business_profile = client.BusinessProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abn` | `string | null` | No | Australian Business Number (only for Australian businesses). |
| `acn` | `string | null` | No | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | No | Email of the actor. |
| `address` | `Record<string, any>` | No | Main registered address of the business. |
| `arbn` | `string | null` | No | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | No | Free-form description of the business activities. |
| `businessName` | `string` | No | Registered business name. |
| `businessNameInKatakana` | `string | null` | No | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `Record<string, any>` | No | Business representative details. |
| `companyRole` | `string` | No | Role of the person managing the business profile. |
| `companyType` | `string` | No | Type of company. |
| `contactDetails` | `Record<string, any>` | No | Contact information for the business. |
| `createdAt` | `string` | No | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | No | Current status of this profile. |
| `descriptionOfBusiness` | `string` | No | Deprecated. |
| `email` | `string` | No | Primary email address for the business. |
| `externalCustomerId` | `string` | No | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | No | Deprecated. |
| `fullName` | `string` | No | Full legal name of the business. |
| `id` | `number` | No | Unique identifier for the profile. |
| `industryCategories` | `any[]` | No | One or more industry categories classifying the business. |
| `operationalAddresses` | `any[]` | No | An array of operational addresses for the business. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.BusinessProfile().create({
  contactDetails: {},
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.BusinessProfile().update({
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BusinessProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardEntity

```ts
const card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bankIdentificationNumber` | `string` | No | Bank identification number (BIN) of the card. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardProgram` | `Record<string, any>` | No | Card program details. |
| `clientId` | `string` | No | Client ID of the partner that issued the card. |
| `creationTime` | `string` | No | Time when the card was created. |
| `expiryDate` | `string` | No | Date when the card will expire. |
| `id` | `string` | No |  |
| `lastFourDigits` | `string` | No | Last 4 digits of the card number. |
| `modificationTime` | `string` | No | Time when the card was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card. |
| `profileId` | `number` | No | Profile ID that owns this card. |
| `status` | `Record<string, any>` | No | Current status of the card. |
| `token` | `string` | No | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | No | Method with which physical card spending permissions can be unlocked. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `reset_pin_count` | `/spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count` | `client.Card().create({ $action: 'reset_pin_count', ... })` |
| `spending_permission` | `/spend/profiles/{profileId}/cards/{cardToken}/spending-permissions` | `client.Card().list({ $action: 'spending_permission', ... })` |
| `spending_permission` | `/spend/profiles/{profileId}/cards/{cardToken}/spending-permissions` | `client.Card().update({ $action: 'spending_permission', ... })` |
| `status` | `/spend/profiles/{profileId}/cards/{cardToken}/status` | `client.Card().update({ $action: 'status', ... })` |

An action returns that action's OWN response, which is not necessarily a
Card record — check the API definition for its shape.

```ts
const result = await client.Card().create({
  $action: 'reset_pin_count',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Card().create({
  card_token: 'example_card_token',
  profile_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Card().list({ profile_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Card().load({ id: 'card_id', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardHolderLimitEntity

```ts
const card_holder_limit = client.CardHolderLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `Record<string, any>` | Yes | The limits to set, per aggregation window. |
| `spendLimits` | `any[]` | No | Spend limits configured for this cardholder. |
| `type` | `string` | Yes | The category of spending the limit applies to. |

### Field Usage by Operation

| Field | list | update | remove |
| --- | --- | --- | --- |
| `aggregateWindow` | Yes | - | - |
| `spendLimits` | - | - | - |
| `type` | Yes | - | - |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CardHolderLimit().list({ card_holder_profile_id: 1, profile_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CardHolderLimit().remove({ card_holder_profile_id: 1, profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CardHolderLimit().update({
  card_holder_profile_id: 1,
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardHolderLimitEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardLimitEntity

```ts
const card_limit = client.CardLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `Record<string, any> | null` | No |  |
| `lifetime` | `Record<string, any> | null` | No |  |
| `monthly` | `Record<string, any> | null` | No |  |
| `transaction` | `Record<string, any> | null` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CardLimit().load({ card_token: 'card_token', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CardLimit().update({
  card_token: 'card_token',
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardLimitEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardOrderEntity

```ts
const card_order = client.CardOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `Record<string, any>` | No | Address set during card order. |
| `cardHolderName` | `string` | No | Name of the card holder. |
| `cardHolderProfileId` | `number` | No | The cardholder profile for this card. |
| `cardProgram` | `Record<string, any>` | No | The card program associated with this card order. |
| `cardToken` | `string | null` | No | Token of the card associated with card order. |
| `city` | `string` | No | Card holder's city (max 30 characters). |
| `clientId` | `string` | No | Client ID. |
| `country` | `string` | No | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | No | Time when the card order is created. |
| `deliveryDetails` | `Record<string, any>` | No | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | No | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | No | The delivery method for the card order. |
| `embossedName` | `string` | No | The cardholder's name to print on the card (physical card only). |
| `errors` | `any[]` | No | Collection of validation errors. |
| `firstLine` | `string` | No | Card holder's address (max 30 characters). |
| `id` | `number` | No | ID of the card order. |
| `lifetimeLimit` | `number | null` | No | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | No | Time when the card order was last modified. |
| `phoneNumber` | `string` | No | Phone number associated with the card order. |
| `postCode` | `string` | No | Card holder's postal code (max 10 characters). |
| `profileId` | `number` | No | Profile ID. |
| `program` | `string` | Yes | The name of the card program. |
| `replacementDetails` | `Record<string, any>` | No | The replacement details for this card. |
| `replacesCard` | `string | null` | No | Token of the card being replaced by this replacement card order. |
| `secondLine` | `string | null` | No | Card holder's address (max 30 characters). |
| `state` | `string | null` | No | Card holder's state (max 30 characters). |
| `status` | `string` | No | Status of the card order. |
| `thirdLine` | `string | null` | No | Card holder's address (max 30 characters). |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `availability` | `/spend/profiles/{profileId}/card-orders/availability` | `client.CardOrder().list({ $action: 'availability', ... })` |
| `requirement` | `/spend/profiles/{profileId}/card-orders/{cardOrderId}/requirements` | `client.CardOrder().list({ $action: 'requirement', ... })` |
| `status` | `/spend/profiles/{profileId}/card-orders/{cardOrderId}/status` | `client.CardOrder().update({ $action: 'status', ... })` |

An action returns that action's OWN response, which is not necessarily a
CardOrder record — check the API definition for its shape.

```ts
const result = await client.CardOrder().list({
  $action: 'availability',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CardOrder().create({
  cardHolderName: 'example_cardHolderName',
  program: 'example_program',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CardOrder().list({ profile_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CardOrder().load({ id: 1, profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.CardOrder().update({
  id: 1,
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardSensitiveDetailEntity

```ts
const card_sensitive_detail = client.CardSensitiveDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `encryptedPayload` | `string` | Yes | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `string` | No | The RSA public key. |
| `keyVersion` | `number` | Yes | The version of the key to use. |
| `version` | `number` | No | Version of the encryption key. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `details` | `/twcard-data/v1/sensitive-card-data/details` | `client.CardSensitiveDetail().create({ $action: 'details', ... })` |
| `pin` | `/twcard-data/v1/sensitive-card-data/pin` | `client.CardSensitiveDetail().create({ $action: 'pin', ... })` |

An action returns that action's OWN response, which is not necessarily a
CardSensitiveDetail record — check the API definition for its shape.

```ts
const result = await client.CardSensitiveDetail().create({
  $action: 'details',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CardSensitiveDetail().create({
  encryptedPayload: 'example_encryptedPayload',
  keyVersion: 1,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CardSensitiveDetail().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardSensitiveDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardTransactionEntity

```ts
const card_transaction = client.CardTransaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approvalCode` | `string | null` | No | Also called authorization code. |
| `arn` | `string | null` | No | Acquirer reference number |
| `authorisationMethod` | `string` | No | Authorisation method |
| `balanceChannelReferenceId` | `string | null` | No | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `Record<string, any>` | No | Billing amount |
| `cardToken` | `string` | No | Unique identifier of the card |
| `creationTime` | `string` | No | When the transaction was created |
| `credits` | `any[]` | No | Array of credits. |
| `debits` | `any[]` | No | Array of debits. |
| `declineReason` | `string | null` | No | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `string | null` | No | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `any[]` | No | Array of fees |
| `id` | `number` | No | ID of the transaction |
| `merchant` | `Record<string, any>` | No | Merchant information |
| `modificationTime` | `string` | No | When the transaction was last updated |
| `pinValidationResult` | `string | null` | No | PIN validation result. |
| `purgeTime` | `string | null` | No | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `Record<string, any> | null` | No | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | No | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `Record<string, any>` | No | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `Record<string, any>` | No | Transaction amount including all fees |
| `type` | `string` | No | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CardTransaction().list({ card_token: "example", profile_id: 1, from_creation_time: "example", to_creation_time: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.CardTransaction().load({ id: 1, profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardTransactionEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CaseEntity

```ts
const case_ = client.Case()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp when the case was created. |
| `description` | `string` | No | The description of the request. |
| `details` | `Record<string, any>` | No | Details related to the case. |
| `externalId` | `string` | No | Partner-created identifier for this case, if applicable. |
| `id` | `number` | Yes | Unique identifier of the case. |
| `messages` | `any[]` | Yes | List of messages associated with this case. |
| `profileId` | `number` | Yes | The profile ID associated with this case. |
| `reference` | `Record<string, any>` | Yes | Reference information linking the case to a related entity. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Case().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Case().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ClaimAccountEntity

```ts
const claim_account = client.ClaimAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claimAccountCode` | `string` | No | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `string` | Yes | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ClaimAccount().create({
  registrationCode: 'example_registrationCode',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClaimAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ComparisonEntity

```ts
const comparison = client.Comparison()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | The comparison amount |
| `amountType` | `string` | No | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `string | null` | No | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `any[]` | No | List of provider types included in the response |
| `providers` | `any[]` | No | List of providers with their estimated quotes |
| `sourceCountry` | `string | null` | No | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `string | null` | No | ISO 4217 source currency code |
| `targetCountry` | `string | null` | No | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `string | null` | No | ISO 4217 target currency code |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Comparison().load({ source_currency: 'source_currency', target_currency: 'target_currency' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ComparisonEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactEntity

```ts
const contact = client.Contact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | `string` | No | Contact ID in the format of UUID. |
| `identifier` | `string` | No | A Wise profile's identifier. |
| `name` | `string` | No | Full name of the contact. |
| `targetCurrency` | `string` | No | 3 character currency code. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Contact().create({
  profile_id: 1,
  is_direct_identifier_creation: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CurrencyEntity

```ts
const currency = client.Currency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `any[]` | No | Keywords associated with this currency. |
| `name` | `string` | No | Display name of this currency. |
| `supportsDecimals` | `boolean` | No | Whether this currency supports decimal values or not. |
| `symbol` | `string` | No | The symbol of this currency. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Currency().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CurrencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeliveryEstimateEntity

```ts
const delivery_estimate = client.DeliveryEstimate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estimatedDeliveryDate` | `string` | No | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `string` | No | A string to display to users for the estimated delivery date. |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DeliveryEstimate().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeliveryEstimateEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeliveryUpdateEntity

```ts
const delivery_update = client.DeliveryUpdate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery_update` | `string` | Yes | The delivery signal to simulate. |
| `delivery_update_path` | `any[]` | Yes | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `string | null` | No | Optional estimated delivery time. |
| `observation_id` | `string` | Yes | Server-generated observation identifier. |
| `occurred_at` | `string` | Yes | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `string | null` | No | Payment scheme to include in the observation. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DeliveryUpdate().create({
  transfer_id: 1,
  delivery_update: 'example_delivery_update',
  delivery_update_path: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeliveryUpdateEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DigitalWalletEntity

```ts
const digital_wallet = client.DigitalWallet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation` | `string` | Yes | Approve or decline a payment token activation |
| `paymentTokens` | `any[]` | No |  |
| `walletNames` | `any[]` | No | List of supported wallet types. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `apple-pay` | `/twcard-data/v1/push-provisioning/encrypted-payload/apple-pay` | `client.DigitalWallet().create({ $action: 'apple-pay', ... })` |
| `google-pay` | `/twcard-data/v1/push-provisioning/encrypted-payload/google-pay` | `client.DigitalWallet().create({ $action: 'google-pay', ... })` |

An action returns that action's OWN response, which is not necessarily a
DigitalWallet record — check the API definition for its shape.

```ts
const result = await client.DigitalWallet().create({
  $action: 'apple-pay',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DigitalWallet().create({
  card_token: 'example_card_token',
  profile_id: 1,
  activation: 'example_activation',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DigitalWalletEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DirectDebitAccountEntity

```ts
const direct_debit_account = client.DirectDebitAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `string` | No | Currency of the bank account. |
| `details` | `Record<string, any>` | No | Bank account details |
| `id` | `number` | No | Direct debit account ID |
| `type` | `string` | No | Payment type for which the account is used. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.DirectDebitAccount().create({
  profile_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DirectDebitAccount().list({ profile_id: 1, currency: "example", type: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DirectDebitAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DirectorEntity

```ts
const director = client.Director()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryOfResidenceIso3Code` | `string` | No | 3 character country code. |
| `dateOfBirth` | `string` | No | Date of birth. |
| `directors` | `any[]` | No |  |
| `firstName` | `string` | No | Director first name. |
| `id` | `number` | No | ID of the director. |
| `lastName` | `string` | No | Director last name. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Director().create({
  profile_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Director().list({ profile_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Director().remove({ profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Director().update({
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DirectorEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DisputeEntity

```ts
const dispute = client.Dispute()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canWithdraw` | `boolean` | No | Whether the dispute can be withdrawn. |
| `createdAt` | `string` | No | Time when the dispute was created. |
| `createdBy` | `string` | No | Creator of the dispute. |
| `disclaimer` | `Record<string, any>` | No | Acknowledgement fields. |
| `files` | `Record<string, any>` | No | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `Record<string, any>` | No | Form fields required to submit this dispute. |
| `id` | `string` | No | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | No | Time when the dispute was last updated. |
| `profileId` | `number` | No | Profile ID. |
| `reason` | `string` | No | Dispute reason code. |
| `receipt` | `string` | No | The file to upload. |
| `status` | `string` | No | Dispute overall status. |
| `statusMessage` | `string` | No | Explanation for `subStatus`. |
| `subStatus` | `string` | No | Dispute detailed status. |
| `transaction` | `Record<string, any>` | No | Transaction details for the dispute. |
| `transactionId` | `number` | No | Card transaction ID. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `status` | `/spend/profiles/{profileId}/disputes/{disputeId}/status` | `client.Dispute().update({ $action: 'status', ... })` |

An action returns that action's OWN response, which is not necessarily a
Dispute record — check the API definition for its shape.

```ts
const result = await client.Dispute().update({
  $action: 'status',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Dispute().create({
  profile_id: 1,
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Dispute().list({ profile_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Dispute().load({ id: 'dispute_id', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Dispute().update({
  id: 'dispute_id',
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DisputeEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DisputeReasonEntity

```ts
const dispute_reason = client.DisputeReason()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | The type of reasons available for the dispute. |
| `description` | `string` | No | The description of the dispute reason. |
| `isFraud` | `boolean` | No | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `any[]` | No | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `boolean` | No | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | No | Text to display when showing the dispute form to your users. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DisputeReason().list({ profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DisputeReasonEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FacetecEntity

```ts
const facetec = client.Facetec()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `public_key` | `/facetec/public-key` | `client.Facetec().load({ $action: 'public_key', ... })` |

An action returns that action's OWN response, which is not necessarily a
Facetec record — check the API definition for its shape.

```ts
const result = await client.Facetec().load({
  $action: 'public_key',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Facetec().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FacetecEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FileEntity

```ts
const file = client.File()
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
| `submissionData` | `Record<string, any>` | Yes | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.File().create({
  createdAt: 'example_createdAt',
  file: 'example_file',
  fileId: 'example_fileId',
  fileName: 'example_fileName',
  profileId: 1,
  purpose: 'example_purpose',
  submissionData: {},
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.File().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FileEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FundingEntity

```ts
const funding = client.Funding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransactionId` | `number` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Funding().create({
  profile_id: 1,
  transfer_id: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FundingEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GpiTrackingEntity

```ts
const gpi_tracking = client.GpiTracking()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `string` | Yes | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | Yes | The type of identifier used to look up the transfer. |
| `transactions` | `any[]` | No | The matching GPI tracking transactions. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.GpiTracking().create({
  identifier: 'example_identifier',
  identifierType: 'example_identifierType',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GpiTrackingEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HoldLimitBreachEntity

```ts
const hold_limit_breach = client.HoldLimitBreach()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.HoldLimitBreach().list({ profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HoldLimitBreachEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IncomingTransferEntity

```ts
const incoming_transfer = client.IncomingTransfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `string` | No | Account details ID that received the incoming transfer. |
| `amounts` | `Record<string, any>` | Yes | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Yes | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | No | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | No | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Yes | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `Record<string, any>` | Yes | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `Record<string, any>` | Yes | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | No | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `number` | Yes | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `Record<string, any>` | Yes | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Yes | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `any[]` | Yes | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `number` | Yes | Profile ID of the balance owner. |
| `scheme` | `string` | Yes | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Yes | Current state of the incoming transfer. |
| `uetr` | `string` | No | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | No | Unstructured remittance information provided by the debtor. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.IncomingTransfer().load({ id: 'incoming_transfer_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IncomingTransferEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JoseEntity

```ts
const jose = client.Jose()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keyId` | `string` | No | ID of the key in UUID format. |
| `keyMaterial` | `Record<string, any>` | No |  |
| `publicKeyMaterial` | `Record<string, any>` | No |  |
| `scope` | `string` | No | Scope of the key. |
| `validFrom` | `string` | No | The key is valid from this date. |
| `validTill` | `string` | No | The key is valid until this date. |
| `version` | `number` | No | Version of the public key issued. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `jwe` | `/auth/jose/playground/jwe` | `client.Jose().create({ $action: 'jwe', ... })` |
| `jwe-direct-encryption` | `/auth/jose/playground/jwe-direct-encryption` | `client.Jose().create({ $action: 'jwe-direct-encryption', ... })` |
| `jws` | `/auth/jose/playground/jws` | `client.Jose().create({ $action: 'jws', ... })` |
| `jwsjwe` | `/auth/jose/playground/jwsjwe` | `client.Jose().create({ $action: 'jwsjwe', ... })` |
| `jwe` | `/auth/jose/playground/jwe` | `client.Jose().load({ $action: 'jwe', ... })` |
| `jwsjwe` | `/auth/jose/playground/jwsjwe` | `client.Jose().load({ $action: 'jwsjwe', ... })` |

An action returns that action's OWN response, which is not necessarily a
Jose record — check the API definition for its shape.

```ts
const result = await client.Jose().create({
  $action: 'jwe',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Jose().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Jose().load({ algorithm: 'algorithm', scope: 'scope' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JoseEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KycReviewEntity

```ts
const kyc_review = client.KycReview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Timestamp marking the creation of the KYC Review. |
| `id` | `string` | No | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `Record<string, any> | null` | No | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `string | null` | No | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `string | null` | No | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `any[] | null` | No | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | No | Aggregated state of the underlying requirement set. |
| `triggerData` | `Record<string, any>` | No | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `any[]` | No | List of trigger reference objects. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.KycReview().create({
  profile_id: 1,
  type: 'example_type',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.KycReview().list({ profile_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.KycReview().load({ id: 'kyc_review_id', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.KycReview().update({
  id: 'kyc_review_id',
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KycReviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkRequestEntity

```ts
const link_request = client.LinkRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientKey` | `string` | Yes | Client key that created the embedded link request. |
| `email` | `string` | Yes | The end user's email address, to receive dispute updates. |
| `id` | `string` | Yes | Embedded link request ID. |
| `metadata` | `Record<string, any>` | Yes | Flow-specific metadata. |
| `profileId` | `number` | Yes | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | Yes | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `number` | Yes | The ID of the card transaction to dispute. |
| `type` | `string` | Yes | Embedded Flow type. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `kyc_review` | `/profiles/{profileId}/embedded-flows/link-requests/kyc-reviews` | `client.LinkRequest().create({ $action: 'kyc_review', ... })` |
| `payment_instrument` | `/profiles/{profileId}/embedded-flows/link-requests/payment-instrument` | `client.LinkRequest().create({ $action: 'payment_instrument', ... })` |
| `recipient` | `/profiles/{profileId}/embedded-flows/link-requests/recipients` | `client.LinkRequest().create({ $action: 'recipient', ... })` |

An action returns that action's OWN response, which is not necessarily a
LinkRequest record — check the API definition for its shape.

```ts
const result = await client.LinkRequest().create({
  $action: 'kyc_review',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.LinkRequest().create({
  profile_id: 1,
  email: 'example_email',
  redirectUrl: 'example_redirectUrl',
  transactionId: 1,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.LinkRequest().load({ id: 'link_request_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkRequestEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageEntity

```ts
const message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionData` | `Record<string, any>` | Yes | The data for the message submission. |
| `type` | `string` | Yes | The type of message submission. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Message().create({
  case_id: 1,
  submissionData: {},
  type: 'example_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MultiCurrencyAccountEntity

```ts
const multi_currency_account = client.MultiCurrencyAccount()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `available-currencies` | `/borderless-accounts-configuration/profiles/{profileId}/available-currencies` | `client.MultiCurrencyAccount().list({ $action: 'available-currencies', ... })` |
| `payin-currencies` | `/borderless-accounts-configuration/profiles/{profileId}/payin-currencies` | `client.MultiCurrencyAccount().list({ $action: 'payin-currencies', ... })` |
| `eligibility` | `/multi-currency-account/eligibility` | `client.MultiCurrencyAccount().load({ $action: 'eligibility', ... })` |

An action returns that action's OWN response, which is not necessarily a
MultiCurrencyAccount record — check the API definition for its shape.

```ts
const result = await client.MultiCurrencyAccount().list({
  $action: 'available-currencies',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MultiCurrencyAccount().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MultiCurrencyAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OneTimeTokenEntity

```ts
const one_time_token = client.OneTimeToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challenges` | `any[]` | No | An array of challenges. |
| `faceMap` | `string` | No | A base64 encoded string. |
| `oneTimeToken` | `string` | No | A one-time token unique identifier. |
| `validity` | `number` | No | The One-Time Token expiration in seconds. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `device-fingerprint` | `/profiles/{profileId}/device-fingerprints/verify` | `client.OneTimeToken().create({ $action: 'device-fingerprint', ... })` |
| `pin` | `/profiles/{profileId}/pin/verify` | `client.OneTimeToken().create({ $action: 'pin', ... })` |

An action returns that action's OWN response, which is not necessarily a
OneTimeToken record — check the API definition for its shape.

```ts
const result = await client.OneTimeToken().create({
  $action: 'device-fingerprint',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.OneTimeToken().create({
  profile_id: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OneTimeTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OttEntity

```ts
const ott = client.Ott()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionType` | `string` | No | The action bound to the one time token. |
| `challenges` | `any[]` | No | Array of challenge objects. |
| `oneTimeToken` | `string` | No | Unique identifier of a one time token. |
| `userId` | `number` | No | Creator of this one time token. |
| `validity` | `number` | No | Seconds until the one time token becomes expired. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `sms` | `/one-time-token/sms/verify` | `client.Ott().create({ $action: 'sms', ... })` |
| `voice` | `/one-time-token/voice/verify` | `client.Ott().create({ $action: 'voice', ... })` |
| `whatsapp` | `/one-time-token/whatsapp/verify` | `client.Ott().create({ $action: 'whatsapp', ... })` |

An action returns that action's OWN response, which is not necessarily a
Ott record — check the API definition for its shape.

```ts
const result = await client.Ott().create({
  $action: 'sms',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Ott().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OttEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PayinEntity

```ts
const payin = client.Payin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No |  |
| `currency` | `string` | No |  |
| `details` | `Record<string, any>` | No | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Payin().create({
  payin_session_id: 'example_payin_session_id',
  profile_id: 1,
  payinSessionId: 'example_payinSessionId',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PayinEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PayinDepositDetailEntity

```ts
const payin_deposit_detail = client.PayinDepositDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `payinBank` | `Record<string, any>` | No | Information about the receiving bank. |
| `payinBankAccount` | `Record<string, any>` | No | Bank account details to use to send the payment to. |
| `wiseInformation` | `Record<string, any>` | No | Information about the receiving Wise entity, the owner of the bank account. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PayinDepositDetail().load({ profile_id: 1, transfer_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PayinDepositDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentEntity

```ts
const payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | No | Transfer source amount |
| `currency` | `string` | No | Transfer source currency |
| `id` | `number` | No | Payment ID |
| `method` | `string` | No | The payment method used to pay for the transfer |
| `pricingVariant` | `string | null` | No | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | No | Date of when payment was created |
| `timeUpdated` | `string` | No | Date of when payment was updated |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Payment().list({ transfer_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentInitiationEntity

```ts
const payment_initiation = client.PaymentInitiation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PaymentInitiation().create({
  batch_group_id: 'example_batch_group_id',
  profile_id: 1,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PaymentInitiation().load({ id: 1, batch_group_id: 'batch_group_id', profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentInitiationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentInstrumentEntity

```ts
const payment_instrument = client.PaymentInstrument()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `string` | No |  |
| `accountNumber` | `string` | No |  |
| `accountOwnerDetails` | `Record<string, any>` | No |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `manual-confirmation` | `/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation` | `client.PaymentInstrument().create({ $action: 'manual-confirmation', ... })` |
| `payin` | `/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins` | `client.PaymentInstrument().list({ $action: 'payin', ... })` |

An action returns that action's OWN response, which is not necessarily a
PaymentInstrument record — check the API definition for its shape.

```ts
const result = await client.PaymentInstrument().create({
  $action: 'manual-confirmation',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PaymentInstrument().create({
  profile_id: 1,
  accountNumber: 'example_accountNumber',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PaymentInstrument().list({ id: "example", profile_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PaymentInstrument().load({ id: 'payment_instrument_id', profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentInstrumentEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentIntentEntity

```ts
const payment_intent = client.PaymentIntent()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PaymentIntent().load({ id: 'payment_intent_id', allocation_id: 'allocation_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentIntentEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhoneNumberEntity

```ts
const phone_number = client.PhoneNumber()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PhoneNumber().create({
  user_id: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhoneNumberEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductionEntity

```ts
const production = client.Production()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string | null` | No | Detailed description of the error code. |
| `errorCode` | `string | null` | No | Code returned when card production is not successful. |
| `kioskId` | `string | null` | No | Identifier that specifies which kiosk machine is producing the card. |
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Production().load({ card_token: 'card_token', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Production().update({
  card_token: 'card_token',
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductionEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProfileEntity

```ts
const profile = client.Profile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `Record<string, any>` | No |  |
| `avatar` | `string` | No |  |
| `contactDetails` | `Record<string, any>` | No |  |
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
| `secondaryAddresses` | `any[]` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `userId` | `number` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `excess_money_account` | `/profiles/{profileId}/excess-money-account` | `client.Profile().create({ $action: 'excess_money_account', ... })` |
| `personal_profile` | `/profiles/personal-profile` | `client.Profile().create({ $action: 'personal_profile', ... })` |
| `pin` | `/profiles/{profileId}/pin` | `client.Profile().create({ $action: 'pin', ... })` |
| `update_window` | `/profiles/{profileId}/update-window` | `client.Profile().create({ $action: 'update_window', ... })` |
| `verification_document` | `/profiles/{profileId}/verification-documents` | `client.Profile().create({ $action: 'verification_document', ... })` |
| `verification_status_bank_transfer` | `/profiles/{profileId}/verification-status/bank-transfer` | `client.Profile().create({ $action: 'verification_status_bank_transfer', ... })` |
| `verification_status_upload_document` | `/profiles/{profileId}/verification-status/upload-document` | `client.Profile().create({ $action: 'verification_status_upload_document', ... })` |
| `balance_capacity` | `/profiles/{profileId}/balance-capacity` | `client.Profile().load({ $action: 'balance_capacity', ... })` |
| `business_profile_business_representative` | `/profiles/{profileId}/business-profile/business-representative` | `client.Profile().load({ $action: 'business_profile_business_representative', ... })` |
| `multi_currency_account` | `/profiles/{profileId}/multi-currency-account` | `client.Profile().load({ $action: 'multi_currency_account', ... })` |
| `pin` | `/profiles/{profileId}/pin` | `client.Profile().remove({ $action: 'pin', ... })` |
| `update_window` | `/profiles/{profileId}/update-window` | `client.Profile().remove({ $action: 'update_window', ... })` |
| `business_profile_business_representative` | `/profiles/{profileId}/business-profile/business-representative` | `client.Profile().update({ $action: 'business_profile_business_representative', ... })` |
| `personal_profile` | `/profiles/{profileId}/personal-profile` | `client.Profile().update({ $action: 'personal_profile', ... })` |
| `verification_document` | `/profiles/{profileId}/verification-documents` | `client.Profile().update({ $action: 'verification_document', ... })` |

An action returns that action's OWN response, which is not necessarily a
Profile record — check the API definition for its shape.

```ts
const result = await client.Profile().create({
  $action: 'excess_money_account',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Profile().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Profile().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QuoteEntity

```ts
const quote = client.Quote()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdTime` | `string` | No | Quote created timestamp. |
| `creationContext` | `Record<string, any>` | No | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | No | The date and time the quote expires. |
| `guaranteedTargetAmount` | `boolean` | No | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `boolean` | No | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | No | ID of this quote (GUID format). |
| `notices` | `any[]` | No | Messages to display to the user. |
| `payOut` | `string` | No | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `Record<string, any>` | No | _Optional_. |
| `paymentOptions` | `any[]` | No | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | No | Preferred pay-in method. |
| `pricingConfiguration` | `Record<string, any>` | No | Allows partners to override pricing configurations on a transfer level. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Quote().create({
  sourceCurrency: 'example_sourceCurrency',
  targetCurrency: 'example_targetCurrency',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Quote().load({ id: 'quote_id', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Quote().update({
  id: 'quote_id',
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QuoteEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RateEntity

```ts
const rate = client.Rate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `number` | Yes | Exchange rate value. |
| `source` | `string` | Yes | Source (send) currency code. |
| `target` | `string` | Yes | Target (receive) currency code. |
| `time` | `string` | Yes | Timestamp for exchange rate. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Rate().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RateEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecipientEntity

```ts
const recipient = client.Recipient()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedOutcomes` | `boolean` | Yes | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `string` | No | Recipient full name. |
| `accountId` | `number` | No | Recipient account ID. |
| `accountSummary` | `string` | No | Summary of account details for ease of lookup. |
| `active` | `boolean` | No | Status of the recipient account. |
| `commonFieldMap` | `Record<string, any>` | No | Map of key lookup fields for the account. |
| `confirmations` | `Record<string, any>` | No | Contains verification results for the recipient's details. |
| `country` | `string` | No | 2-character country code. |
| `creatorId` | `number` | No | Account entity that owns the recipient account. |
| `currency` | `string` | No | 3-character currency code. |
| `details` | `Record<string, any>` | No | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `any[]` | No | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | No | Account hash for tracking changes to recipient details. |
| `id` | `number` | No | ID of the recipient. |
| `isInternal` | `boolean` | No | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | No | Entity type of recipient account. |
| `longAccountSummary` | `string` | No | Longer account details summary. |
| `name` | `Record<string, any>` | No | Recipient name details. |
| `ownedByCustomer` | `boolean` | No | Inidicates if recipient account belongs to profile owner. |
| `profile` | `number` | No | Personal or business profile ID of the sender. |
| `profileId` | `number` | No | Specific profile that owns the recipient account. |
| `quoteId` | `string` | No | Quote ID. |
| `type` | `string` | No | Recipient account type. |
| `ultimateBeneficiary` | `Record<string, any> | null` | Yes | The details for the ultimate beneficiary of this recipient. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Recipient().create({
  acceptedOutcomes: true,
  ultimateBeneficiary: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Recipient().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Recipient().load({ account_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Recipient().remove({ account_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Recipient().update({
  account_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecipientEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RuleEntity

```ts
const rule = client.Rule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | The description of the authorisation rule. |
| `id` | `number` | No | The unique ID for the authorisation rule. |
| `operation` | `string` | No | Determines whether the transactions should be allowed or blocked. |
| `type` | `string` | No | The type of authorisation rule. |
| `values` | `any[]` | No | A list of values based on the `type` of rule configured. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Rule().create({
  application_id: 'example_application_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Rule().list({ application_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SamlEntity

```ts
const saml = client.Saml()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `RelayState` | `string` | No | Opaque state value. |
| `SAMLResponse` | `string` | Yes | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Saml().create({
  SAMLResponse: 'example_SAMLResponse',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Saml().load({ registration_id: 'registration_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SamlEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScaDeviceFingerprintEntity

```ts
const sca_device_fingerprint = client.ScaDeviceFingerprint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `string` | No | The identifier of the device fingerprint. |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ScaDeviceFingerprint().create({
  profile_id: 1,
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ScaDeviceFingerprint().remove({ id: 'sca_device_fingerprint_id', profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScaDeviceFingerprintEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScaFacemapEntity

```ts
const sca_facemap = client.ScaFacemap()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `faceMap` | `string` | No | A base64 encoded string. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ScaFacemap().create({
  profile_id: 1,
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ScaFacemap().remove({ profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScaFacemapEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScaOtpEntity

```ts
const sca_otp = client.ScaOtp()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `sms` | `/one-time-token/sms/trigger` | `client.ScaOtp().create({ $action: 'sms', ... })` |
| `voice` | `/one-time-token/voice/trigger` | `client.ScaOtp().create({ $action: 'voice', ... })` |
| `whatsapp` | `/one-time-token/whatsapp/trigger` | `client.ScaOtp().create({ $action: 'whatsapp', ... })` |

An action returns that action's OWN response, which is not necessarily a
ScaOtp record — check the API definition for its shape.

```ts
const result = await client.ScaOtp().create({
  $action: 'sms',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ScaOtp().remove({ phone_number_id: 1, user_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScaOtpEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScaSessionEntity

```ts
const sca_session = client.ScaSession()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `authorise` | `/profiles/{profileId}/sca-sessions/authorise` | `client.ScaSession().create({ $action: 'authorise', ... })` |

An action returns that action's OWN response, which is not necessarily a
ScaSession record — check the API definition for its shape.

```ts
const result = await client.ScaSession().create({
  $action: 'authorise',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ScaSession().create({
  profile_id: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScaSessionEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SettlementAllocationEntity

```ts
const settlement_allocation = client.SettlementAllocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | `Record<string, any>` | Yes |  |
| `createdAt` | `string` | No | Timestamp when the settlement allocation was created. |
| `currency` | `string` | No | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `number` | No | Expected total amount for the allocation. |
| `file` | `string` | Yes | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | No | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | No | Token for fetching the next page of payment intents. |
| `paymentIntents` | `any[]` | No | List of payment intents associated with the allocation. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.SettlementAllocation().create({
  command: {},
  createdAt: 'example_createdAt',
  currency: 'example_currency',
  expectedTotalAmount: 1,
  file: 'example_file',
  id: 'example_id',
  paymentReference: 'example_paymentReference',
  state: 'example_state',
  updatedAt: 'example_updatedAt',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SettlementAllocation().load({ id: 'settlement_allocation_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SettlementAllocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SimulationEntity

```ts
const simulation = client.Simulation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `string` | No |  |
| `created` | `string` | No |  |
| `creationTime` | `number` | No | Time when the card transaction was created. |
| `description` | `string | null` | No | Description of the KYC review item. |
| `details` | `Record<string, any>` | No |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `balance-topup` | `/simulation/balance/topup` | `client.Simulation().create({ $action: 'balance-topup', ... })` |
| `bank-transaction-import` | `/simulation/profiles/{profileId}/bank-transactions/import` | `client.Simulation().create({ $action: 'bank-transaction-import', ... })` |
| `card-authorisation` | `/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation` | `client.Simulation().create({ $action: 'card-authorisation', ... })` |
| `card-clearing` | `/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/clearing` | `client.Simulation().create({ $action: 'card-clearing', ... })` |
| `card-production` | `/simulation/spend/profiles/{profileId}/cards/{cardToken}/production` | `client.Simulation().create({ $action: 'card-production', ... })` |
| `card-reversal` | `/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/reversal` | `client.Simulation().create({ $action: 'card-reversal', ... })` |
| `kyc-requirement-add` | `/simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/requirements/add` | `client.Simulation().create({ $action: 'kyc-requirement-add', ... })` |
| `kyc-requirement-submit` | `/simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/requirements/submit` | `client.Simulation().create({ $action: 'kyc-requirement-submit', ... })` |
| `kyc-review-verify` | `/simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/verify` | `client.Simulation().create({ $action: 'kyc-review-verify', ... })` |
| `sanction_case` | `/simulation/sanction-cases` | `client.Simulation().create({ $action: 'sanction_case', ... })` |
| `settlement-funds` | `/simulation/settlement/funds` | `client.Simulation().create({ $action: 'settlement-funds', ... })` |
| `swift-in` | `/simulation/profiles/{profileId}/swift-in` | `client.Simulation().create({ $action: 'swift-in', ... })` |
| `verification` | `/simulation/profiles/{profileId}/verifications` | `client.Simulation().create({ $action: 'verification', ... })` |
| `verify_profile` | `/simulation/verify-profile` | `client.Simulation().create({ $action: 'verify_profile', ... })` |

An action returns that action's OWN response, which is not necessarily a
Simulation record — check the API definition for its shape.

```ts
const result = await client.Simulation().create({
  $action: 'balance-topup',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Simulation().create({
  transfer_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Simulation().list({ card_token: "example", profile_id: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Simulation().load({ status: 'status', transfer_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SimulationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpendControlEntity

```ts
const spend_control = client.SpendControl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ruleId` | `number` | No | The ID of the applied authorisation rule. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `apply` | `/spend/applications/{clientId}/spend-controls/rules/apply` | `client.SpendControl().create({ $action: 'apply', ... })` |
| `unapply` | `/spend/applications/{clientId}/spend-controls/rules/unapply` | `client.SpendControl().create({ $action: 'unapply', ... })` |

An action returns that action's OWN response, which is not necessarily a
SpendControl record — check the API definition for its shape.

```ts
const result = await client.SpendControl().create({
  $action: 'apply',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SpendControl().list({ application_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.SpendControl().remove({ application_id: 'application_id', rule_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpendControlEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpendLimitEntity

```ts
const spend_limit = client.SpendLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `Record<string, any>` | No |  |
| `id` | `string` | No |  |
| `type` | `string` | No | The type of transaction. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SpendLimit().list({ profile_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.SpendLimit().remove({ id: 'spend_limit_id', card_id: 'card_id', profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.SpendLimit().update({
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpendLimitEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubscriptionEntity

```ts
const subscription = client.Subscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the subscription was created. |
| `created_by` | `Record<string, any>` | No |  |
| `delivery` | `Record<string, any>` | No |  |
| `id` | `string` | No | UUID that uniquely identifies the subscription. |
| `name` | `string` | No | A custom name for your webhook to ease with identification. |
| `scope` | `Record<string, any>` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Subscription().create({
  client_key: 'example_client_key',
  delivery: {},
  name: 'example_name',
  trigger_on: 'example_trigger_on',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Subscription().list({ client_key: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Subscription().load({ id: 'subscription_id', client_key: 'client_key' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Subscription().remove({ id: 'subscription_id', client_key: 'client_key' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TestNotificationEntity

```ts
const test_notification = client.TestNotification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Timestamp of when the test notification was created. |
| `delivery_id` | `string` | No | ID of the delivery that was queued for sending. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.TestNotification().create({
  client_key: 'example_client_key',
  subscription_id: 'example_subscription_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TestNotificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThirdPartyTransferEntity

```ts
const third_party_transfer = client.ThirdPartyTransfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | No | Timestamp when transfer was created. |
| `details` | `Record<string, any>` | No | Payment Details |
| `hasActiveIssues` | `boolean` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | No | Transfer ID |
| `originalTransferId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `Record<string, any>` | No | Data block to capture payment originator details |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ThirdPartyTransfer().create({
  profile_id: 1,
  details: {},
  originalTransferId: 'example_originalTransferId',
  originator: {},
  quote: 'example_quote',
  targetAccount: 1,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ThirdPartyTransfer().load({ id: 1, profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThirdPartyTransferEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThreeDSecureEntity

```ts
const three_d_secure = client.ThreeDSecure()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeStatus` | `string` | Yes | The customer's response to the 3DS challenge. |
| `transactionReference` | `string` | Yes | Transaction reference as received in the 3DS challenge webhook event. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ThreeDSecure().create({
  profile_id: 1,
  challengeStatus: 'example_challengeStatus',
  transactionReference: 'example_transactionReference',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThreeDSecureEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenEntity

```ts
const token = client.Token()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Token().create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransferEntity

```ts
const transfer = client.Transfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `number | null` | No | Your business profile ID |
| `created` | `string` | No | Timestamp when transfer was created |
| `customerTransactionId` | `string` | No | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `Record<string, any>` | No |  |
| `hasActiveIssues` | `boolean` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | No | Transfer ID |
| `payinSessionId` | `string` | No | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `number | null` | No | V1 quote ID |
| `quoteUuid` | `string` | No | V2 quote ID |
| `rate` | `number` | No | Exchange rate value |
| `reference` | `string` | No | Deprecated, use `details.reference` instead |
| `sourceAccount` | `number | null` | No | Refund recipient account ID |
| `sourceCurrency` | `string` | No | Source currency code |
| `sourceValue` | `number` | No | Transfer amount in source currency |
| `status` | `string` | No | Transfer current status. |
| `targetAccount` | `number` | No | Recipient account ID |
| `targetCurrency` | `string` | No | Target currency code |
| `targetValue` | `number` | No | Transfer amount in target currency |
| `transferRequest` | `number | null` | No | Deprecated |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `document_noc` | `/transfers/{transferId}/documents/noc` | `client.Transfer().load({ $action: 'document_noc', ... })` |
| `invoice_bankingpartner` | `/transfers/{transferId}/invoices/bankingpartner` | `client.Transfer().load({ $action: 'invoice_bankingpartner', ... })` |
| `receiptpdf` | `/transfers/{transferId}/receipt.pdf` | `client.Transfer().load({ $action: 'receiptpdf', ... })` |
| `us_combined_receiptpdf` | `/transfers/{transferId}/us-combined-receipt.pdf` | `client.Transfer().load({ $action: 'us_combined_receiptpdf', ... })` |
| `cancel` | `/transfers/{transferId}/cancel` | `client.Transfer().update({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
Transfer record — check the API definition for its shape.

```ts
const result = await client.Transfer().load({
  $action: 'document_noc',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Transfer().create({
  customerTransactionId: 'example_customerTransactionId',
  quoteUuid: 'example_quoteUuid',
  targetAccount: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Transfer().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Transfer().load({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Transfer().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransferEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransferRequirementEntity

```ts
const transfer_requirement = client.TransferRequirement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customerTransactionId` | `string` | No | Unique identifier for the transfer request |
| `details` | `Record<string, any>` | No |  |
| `originatorLegalEntityType` | `string` | No | Type of sender. |
| `quoteUuid` | `string` | Yes | V2 quote ID |
| `targetAccount` | `number` | Yes | Recipient account ID |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.TransferRequirement().create({
  quoteUuid: 'example_quoteUuid',
  targetAccount: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransferRequirementEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UboEntity

```ts
const ubo = client.Ubo()
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
| `ubos` | `any[]` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Ubo().create({
  profile_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Ubo().list({ profile_id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Ubo().update({
  profile_id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UboEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No | If user is active or not. |
| `details` | `Record<string, any> | null` | No | User details. |
| `email` | `string` | No | User's email. |
| `id` | `number` | No | User ID. |
| `language` | `string` | No | User default language for UI and email communication. |
| `name` | `string | null` | No | User's full name. |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `exist` | `/users/exists` | `client.User().create({ $action: 'exist', ... })` |
| `contact_email` | `/users/{userId}/contact-email` | `client.User().load({ $action: 'contact_email', ... })` |
| `contact_email` | `/users/{userId}/contact-email` | `client.User().update({ $action: 'contact_email', ... })` |

An action returns that action's OWN response, which is not necessarily a
User record — check the API definition for its shape.

```ts
const result = await client.User().create({
  $action: 'exist',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.User().create({
  email: 'example_email',
  registrationCode: 'example_registrationCode',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.User().load({ id: 1 })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.User().update({
  id: 1,
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VerificationEntity

```ts
const verification = client.Verification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_evidences` | `any[]` | No | List of evidence types required to complete verification. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Verification().create({
  profile_id: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Verification().list({ profile_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VerificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `WiseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new WiseSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    secrets: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

