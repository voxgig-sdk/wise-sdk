# Wise Python SDK Reference

Complete API reference for the Wise Python SDK.


## WiseSDK

### Constructor

```python
from wise_sdk import WiseSDK

client = WiseSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `WiseSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = WiseSDK.test()
```


### Instance Methods

#### `AccountDetail(data=None)`

Create a new `AccountDetailEntity` instance. Pass `None` for no initial data.

#### `AccountRequirement(data=None)`

Create a new `AccountRequirementEntity` instance. Pass `None` for no initial data.

#### `Activity(data=None)`

Create a new `ActivityEntity` instance. Pass `None` for no initial data.

#### `Address(data=None)`

Create a new `AddressEntity` instance. Pass `None` for no initial data.

#### `AddressRequirement(data=None)`

Create a new `AddressRequirementEntity` instance. Pass `None` for no initial data.

#### `Balance(data=None)`

Create a new `BalanceEntity` instance. Pass `None` for no initial data.

#### `BalanceStatement(data=None)`

Create a new `BalanceStatementEntity` instance. Pass `None` for no initial data.

#### `BankAccountDetail(data=None)`

Create a new `BankAccountDetailEntity` instance. Pass `None` for no initial data.

#### `BankAccountDetailsOrder(data=None)`

Create a new `BankAccountDetailsOrderEntity` instance. Pass `None` for no initial data.

#### `BatchGroup(data=None)`

Create a new `BatchGroupEntity` instance. Pass `None` for no initial data.

#### `BulkSettlement(data=None)`

Create a new `BulkSettlementEntity` instance. Pass `None` for no initial data.

#### `BusinessProfile(data=None)`

Create a new `BusinessProfileEntity` instance. Pass `None` for no initial data.

#### `Card(data=None)`

Create a new `CardEntity` instance. Pass `None` for no initial data.

#### `CardHolderLimit(data=None)`

Create a new `CardHolderLimitEntity` instance. Pass `None` for no initial data.

#### `CardLimit(data=None)`

Create a new `CardLimitEntity` instance. Pass `None` for no initial data.

#### `CardOrder(data=None)`

Create a new `CardOrderEntity` instance. Pass `None` for no initial data.

#### `CardSensitiveDetail(data=None)`

Create a new `CardSensitiveDetailEntity` instance. Pass `None` for no initial data.

#### `CardTransaction(data=None)`

Create a new `CardTransactionEntity` instance. Pass `None` for no initial data.

#### `Case(data=None)`

Create a new `CaseEntity` instance. Pass `None` for no initial data.

#### `ClaimAccount(data=None)`

Create a new `ClaimAccountEntity` instance. Pass `None` for no initial data.

#### `Comparison(data=None)`

Create a new `ComparisonEntity` instance. Pass `None` for no initial data.

#### `Contact(data=None)`

Create a new `ContactEntity` instance. Pass `None` for no initial data.

#### `Currency(data=None)`

Create a new `CurrencyEntity` instance. Pass `None` for no initial data.

#### `DeliveryEstimate(data=None)`

Create a new `DeliveryEstimateEntity` instance. Pass `None` for no initial data.

#### `DeliveryUpdate(data=None)`

Create a new `DeliveryUpdateEntity` instance. Pass `None` for no initial data.

#### `DigitalWallet(data=None)`

Create a new `DigitalWalletEntity` instance. Pass `None` for no initial data.

#### `DirectDebitAccount(data=None)`

Create a new `DirectDebitAccountEntity` instance. Pass `None` for no initial data.

#### `Director(data=None)`

Create a new `DirectorEntity` instance. Pass `None` for no initial data.

#### `Dispute(data=None)`

Create a new `DisputeEntity` instance. Pass `None` for no initial data.

#### `DisputeReason(data=None)`

Create a new `DisputeReasonEntity` instance. Pass `None` for no initial data.

#### `Facetec(data=None)`

Create a new `FacetecEntity` instance. Pass `None` for no initial data.

#### `File(data=None)`

Create a new `FileEntity` instance. Pass `None` for no initial data.

#### `Funding(data=None)`

Create a new `FundingEntity` instance. Pass `None` for no initial data.

#### `GpiTracking(data=None)`

Create a new `GpiTrackingEntity` instance. Pass `None` for no initial data.

#### `HoldLimitBreach(data=None)`

Create a new `HoldLimitBreachEntity` instance. Pass `None` for no initial data.

#### `IncomingTransfer(data=None)`

Create a new `IncomingTransferEntity` instance. Pass `None` for no initial data.

#### `Jose(data=None)`

Create a new `JoseEntity` instance. Pass `None` for no initial data.

#### `KycReview(data=None)`

Create a new `KycReviewEntity` instance. Pass `None` for no initial data.

#### `LinkRequest(data=None)`

Create a new `LinkRequestEntity` instance. Pass `None` for no initial data.

#### `Message(data=None)`

Create a new `MessageEntity` instance. Pass `None` for no initial data.

#### `MultiCurrencyAccount(data=None)`

Create a new `MultiCurrencyAccountEntity` instance. Pass `None` for no initial data.

#### `OneTimeToken(data=None)`

Create a new `OneTimeTokenEntity` instance. Pass `None` for no initial data.

#### `Ott(data=None)`

Create a new `OttEntity` instance. Pass `None` for no initial data.

#### `Payin(data=None)`

Create a new `PayinEntity` instance. Pass `None` for no initial data.

#### `PayinDepositDetail(data=None)`

Create a new `PayinDepositDetailEntity` instance. Pass `None` for no initial data.

#### `Payment(data=None)`

Create a new `PaymentEntity` instance. Pass `None` for no initial data.

#### `PaymentInitiation(data=None)`

Create a new `PaymentInitiationEntity` instance. Pass `None` for no initial data.

#### `PaymentInstrument(data=None)`

Create a new `PaymentInstrumentEntity` instance. Pass `None` for no initial data.

#### `PaymentIntent(data=None)`

Create a new `PaymentIntentEntity` instance. Pass `None` for no initial data.

#### `PhoneNumber(data=None)`

Create a new `PhoneNumberEntity` instance. Pass `None` for no initial data.

#### `Production(data=None)`

Create a new `ProductionEntity` instance. Pass `None` for no initial data.

#### `Profile(data=None)`

Create a new `ProfileEntity` instance. Pass `None` for no initial data.

#### `Quote(data=None)`

Create a new `QuoteEntity` instance. Pass `None` for no initial data.

#### `Rate(data=None)`

Create a new `RateEntity` instance. Pass `None` for no initial data.

#### `Recipient(data=None)`

Create a new `RecipientEntity` instance. Pass `None` for no initial data.

#### `Rule(data=None)`

Create a new `RuleEntity` instance. Pass `None` for no initial data.

#### `Saml(data=None)`

Create a new `SamlEntity` instance. Pass `None` for no initial data.

#### `ScaDeviceFingerprint(data=None)`

Create a new `ScaDeviceFingerprintEntity` instance. Pass `None` for no initial data.

#### `ScaFacemap(data=None)`

Create a new `ScaFacemapEntity` instance. Pass `None` for no initial data.

#### `ScaOtp(data=None)`

Create a new `ScaOtpEntity` instance. Pass `None` for no initial data.

#### `ScaSession(data=None)`

Create a new `ScaSessionEntity` instance. Pass `None` for no initial data.

#### `SettlementAllocation(data=None)`

Create a new `SettlementAllocationEntity` instance. Pass `None` for no initial data.

#### `Simulation(data=None)`

Create a new `SimulationEntity` instance. Pass `None` for no initial data.

#### `SpendControl(data=None)`

Create a new `SpendControlEntity` instance. Pass `None` for no initial data.

#### `SpendLimit(data=None)`

Create a new `SpendLimitEntity` instance. Pass `None` for no initial data.

#### `Subscription(data=None)`

Create a new `SubscriptionEntity` instance. Pass `None` for no initial data.

#### `TestNotification(data=None)`

Create a new `TestNotificationEntity` instance. Pass `None` for no initial data.

#### `ThirdPartyTransfer(data=None)`

Create a new `ThirdPartyTransferEntity` instance. Pass `None` for no initial data.

#### `ThreeDSecure(data=None)`

Create a new `ThreeDSecureEntity` instance. Pass `None` for no initial data.

#### `Token(data=None)`

Create a new `TokenEntity` instance. Pass `None` for no initial data.

#### `Transfer(data=None)`

Create a new `TransferEntity` instance. Pass `None` for no initial data.

#### `TransferRequirement(data=None)`

Create a new `TransferRequirementEntity` instance. Pass `None` for no initial data.

#### `Ubo(data=None)`

Create a new `UboEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `Verification(data=None)`

Create a new `VerificationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AccountDetailEntity

```python
account_detail = client.AccountDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `str` | Yes | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `Any` | Yes | Country/scheme-specific account identification. |
| `country` | `str` | Yes | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `int` | Yes | Unique identifier for the account details. |
| `profileId` | `int` | Yes | Profile ID of the account details owner. |
| `state` | `str` | Yes | Current state of the account details. |

### Operations

#### `load(reqmatch, ctrl=None) -> AccountDetailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.AccountDetail().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AccountRequirementEntity

```python
account_requirement = client.AccountRequirement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `str` | No | Recipient full name. |
| `currency` | `str` | No | 3-character currency code. |
| `details` | `dict` | No | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `list` | No | List of UI field groups to collect required data. |
| `ownedByCustomer` | `bool` | No | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `int` | No | Personal or business profile ID of the sender. |
| `title` | `str` | No | Human-readable title for the requirement group. |
| `type` | `str` | No | Recipient account type. |
| `ultimateBeneficiary` | `dict | None` | Yes | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `str` | No | Optional usage/help text. |

### Operations

#### `create(reqdata, ctrl=None) -> AccountRequirementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AccountRequirement().create({
    "quote_id": "example_quote_id",  # str
    "ultimateBeneficiary": {},  # dict | None
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AccountRequirementEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AccountRequirement().list({"quote_id": "example"})
for account_requirement in results:
    print(account_requirement.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountRequirementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ActivityEntity

```python
activity = client.Activity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `str` | No | Timestamp when the activity was created. |
| `description` | `str` | No | A short description that briefly summarizes the activity. |
| `id` | `str` | No | Activity id. |
| `primaryAmount` | `str` | No | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `dict` | No | The resource associated with the activity. |
| `secondaryAmount` | `str` | No | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `str` | No | Status of the Activity. |
| `title` | `str` | No | Title of the Activity. |
| `type` | `str` | No | Type of Activity. |
| `updatedOn` | `str` | No | Timestamp when the activity was last modified. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ActivityEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Activity().list({"profile_id": 1})
for activity in results:
    print(activity.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActivityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddressEntity

```python
address = client.Address()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `dict` | No | Address details. |
| `id` | `int` | No | Address ID. |
| `profile` | `int` | No | User profile ID. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `details` | - | - | Yes |
| `id` | - | - | - |
| `profile` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl=None) -> AddressEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Address().create({
    "details": {},  # dict
    "profile": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AddressEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Address().list()
for address in results:
    print(address.data_get())
```

#### `load(reqmatch, ctrl=None) -> AddressEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Address().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AddressRequirementEntity

```python
address_requirement = client.AddressRequirement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `dict` | Yes | Address details to provide context for requirements lookup. |
| `fields` | `list` | No | List of fields required for the address. |
| `profile` | `int` | No | User profile ID. |
| `type` | `str` | No | Always "address". |

### Operations

#### `create(reqdata, ctrl=None) -> AddressRequirementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.AddressRequirement().create({
    "details": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list[AddressRequirementEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.AddressRequirement().list()
for address_requirement in results:
    print(address_requirement.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressRequirementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BalanceEntity

```python
balance = client.Balance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `dict` | No | Available balance that can be used to fund transfers. |
| `cashAmount` | `dict` | No | Cash amount in the account. |
| `creationTime` | `str` | No | Date when the balance was created. |
| `currency` | `str` | No | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `dict | None` | No | Icon for the balance. |
| `id` | `int` | No | Balance ID. |
| `investmentState` | `str` | No | Investment state of the balance. |
| `modificationTime` | `str` | No | Date when the balance was last modified. |
| `name` | `str | None` | No | Name of the balance. |
| `overdraft` | `dict` | No | Overdraft details for the account. |
| `reservedAmount` | `dict` | No | Amount reserved for transactions. |
| `state` | `str` | Yes | Must be `CLOSED`. |
| `targetRecipientId` | `int` | Yes | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `dict` | No | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `dict` | No | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `dict` | No | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `str` | No | Type of balance account. |
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

#### `create(reqdata, ctrl=None) -> BalanceEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Balance().create({
    "profile_id": 1,  # int
    "currency": "example_currency",  # str
    "state": "example_state",  # str
    "targetRecipientId": 1,  # int
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BalanceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Balance().list({"profile_id": 1, "type": "example"})
for balance in results:
    print(balance.data_get())
```

#### `load(reqmatch, ctrl=None) -> BalanceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Balance().load({"id": 1, "currency": "currency", "profile_id": 1})
```

#### `remove(reqmatch, ctrl=None) -> BalanceEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Balance().remove({"id": 1, "profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BalanceStatementEntity

```python
balance_statement = client.BalanceStatement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolder` | `dict` | No | Account holder information. |
| `bankDetails` | `dict | None` | No | Local bank details for the account. |
| `endOfStatementBalance` | `dict` | No | Closing balance for the specified time period. |
| `id` | `str` | No |  |
| `issuer` | `dict` | No | Account issuer information. |
| `query` | `dict` | No | Query parameters used for the request. |
| `transactions` | `list` | No | List of transactions in the statement period. |

### Operations

#### `load(reqmatch, ctrl=None) -> BalanceStatementEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BalanceStatement().load({"id": 1, "profile_id": 1, "currency": "currency", "interval_end": "interval_end", "interval_start": "interval_start"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceStatementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BankAccountDetailEntity

```python
bank_account_detail = client.BankAccountDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | Status of the account detail. |
| `currency` | `str` | No | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `str` | No | Account detail ID. |
| `internationalDetails` | `dict | None` | No | International bank account details. |
| `localDetails` | `dict` | No | Local bank account details. |
| `reason` | `str` | No | Reason for the return. |
| `targetAccountId` | `int` | Yes | ID of the currency balance to create account details on. |

### Operations

#### `create(reqdata, ctrl=None) -> BankAccountDetailEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BankAccountDetail().create({
    "profile_id": 1,  # int
    "targetAccountId": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankAccountDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BankAccountDetailsOrderEntity

```python
bank_account_details_order = client.BankAccountDetailsOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `int` | No | Unique ID of the issued account details. |
| `balanceId` | `int | None` | No | ID of the balance the order is for. |
| `creationTime` | `str` | No | Timestamp of when the order was created. |
| `currency` | `str` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `str` | No | Unique ID of the order. |
| `modificationTime` | `str` | No | Timestamp of the last modification to the order. |
| `requirements` | `list` | No | List of requirements to fulfill the order. |
| `status` | `str` | No | Order status. |

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

#### `create(reqdata, ctrl=None) -> BankAccountDetailsOrderEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BankAccountDetailsOrder().create({
    "profile_id": 1,  # int
    "currency": "example_currency",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[BankAccountDetailsOrderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.BankAccountDetailsOrder().list({"profile_id": 1, "currency": "example"})
for bank_account_details_order in results:
    print(bank_account_details_order.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankAccountDetailsOrderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BatchGroupEntity

```python
batch_group = client.BatchGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alreadyPaid` | `bool` | No | Not applicable to this use case. |
| `fileName` | `str | None` | No | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `str` | No | Whether this batch was submitted over the API or as a file. |
| `id` | `str` | No | Batch group ID. |
| `name` | `str` | No | Descriptive name for the batch group. |
| `payInDetails` | `list` | No | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `str | None` | No | Optional ID of the payin session. |
| `profileId` | `int` | No | The ID of the profile this payment belongs to. |
| `shortId` | `int` | No | Not applicable to this use case. |
| `sourceCurrency` | `str` | No | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `str` | No | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `list` | No | The IDs of all transfers successfully added to the group. |
| `type` | `str` | Yes | The method of payment to use. |
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

#### `create(reqdata, ctrl=None) -> BatchGroupEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BatchGroup().create({
    "profile_id": 1,  # int
    "name": "example_name",  # str
    "sourceCurrency": "example_sourceCurrency",  # str
    "type": "example_type",  # str
})
```

#### `load(reqmatch, ctrl=None) -> BatchGroupEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BatchGroup().load({"id": "batch_group_id", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> BatchGroupEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.BatchGroup().update({
    "id": "batch_group_id",
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BatchGroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BulkSettlementEntity

```python
bulk_settlement = client.BulkSettlement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransfer` | `float` | No | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `list` | No | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `str` | No | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `str` | Yes | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `str` | Yes | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `list` | Yes | Array of transfers to be settled. |
| `type` | `str` | Yes | Type of settlement. |

### Operations

#### `create(reqdata, ctrl=None) -> BulkSettlementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BulkSettlement().create({
    "settlementDate": "example_settlementDate",  # str
    "settlementReference": "example_settlementReference",  # str
    "transfers": [],  # list
    "type": "example_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BulkSettlementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BusinessProfileEntity

```python
business_profile = client.BusinessProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abn` | `str | None` | No | Australian Business Number (only for Australian businesses). |
| `acn` | `str | None` | No | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `str` | No | Email of the actor. |
| `address` | `dict` | No | Main registered address of the business. |
| `arbn` | `str | None` | No | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `str` | No | Free-form description of the business activities. |
| `businessName` | `str` | No | Registered business name. |
| `businessNameInKatakana` | `str | None` | No | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `dict` | No | Business representative details. |
| `companyRole` | `str` | No | Role of the person managing the business profile. |
| `companyType` | `str` | No | Type of company. |
| `contactDetails` | `dict` | No | Contact information for the business. |
| `createdAt` | `str` | No | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `str` | No | Current status of this profile. |
| `descriptionOfBusiness` | `str` | No | Deprecated. |
| `email` | `str` | No | Primary email address for the business. |
| `externalCustomerId` | `str` | No | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `str` | No | Deprecated. |
| `fullName` | `str` | No | Full legal name of the business. |
| `id` | `int` | No | Unique identifier for the profile. |
| `industryCategories` | `list` | No | One or more industry categories classifying the business. |
| `operationalAddresses` | `list` | No | An array of operational addresses for the business. |
| `publicId` | `str` | No | Publicly accessible identifier for the profile. |
| `registrationNumber` | `str` | No | Business registration number. |
| `secondLevelCategory` | `str` | No | Deprecated. |
| `type` | `str` | Yes | Type of profile. |
| `updatedAt` | `str` | No | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `int` | No | The ID of the user associated with this profile. |
| `webpage` | `str` | No | Business website URL. |

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

#### `create(reqdata, ctrl=None) -> BusinessProfileEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.BusinessProfile().create({
    "contactDetails": {},  # dict
})
```

#### `update(reqdata, ctrl=None) -> BusinessProfileEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.BusinessProfile().update({
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BusinessProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardEntity

```python
card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bankIdentificationNumber` | `str` | No | Bank identification number (BIN) of the card. |
| `cardHolderName` | `str` | No | Name of the card holder. |
| `cardProgram` | `dict` | No | Card program details. |
| `clientId` | `str` | No | Client ID of the partner that issued the card. |
| `creationTime` | `str` | No | Time when the card was created. |
| `expiryDate` | `str` | No | Date when the card will expire. |
| `id` | `str` | No |  |
| `lastFourDigits` | `str` | No | Last 4 digits of the card number. |
| `modificationTime` | `str` | No | Time when the card was last modified. |
| `phoneNumber` | `str` | No | Phone number associated with the card. |
| `profileId` | `int` | No | Profile ID that owns this card. |
| `status` | `dict` | No | Current status of the card. |
| `token` | `str` | No | Unique identifier for the card. |
| `unlockSpendingPermissions` | `str` | No | Method with which physical card spending permissions can be unlocked. |

### Operations

#### `create(reqdata, ctrl=None) -> CardEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Card().create({
    "card_token": "example_card_token",  # str
    "profile_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CardEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Card().list({"profile_id": 1})
for card in results:
    print(card.data_get())
```

#### `load(reqmatch, ctrl=None) -> CardEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Card().load({"id": "card_id", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> CardEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardHolderLimitEntity

```python
card_holder_limit = client.CardHolderLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `dict` | Yes | The limits to set, per aggregation window. |
| `spendLimits` | `list` | No | Spend limits configured for this cardholder. |
| `type` | `str` | Yes | The category of spending the limit applies to. |

### Field Usage by Operation

| Field | list | update | remove |
| --- | --- | --- | --- |
| `aggregateWindow` | Yes | - | - |
| `spendLimits` | - | - | - |
| `type` | Yes | - | - |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CardHolderLimitEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CardHolderLimit().list({"card_holder_profile_id": 1, "profile_id": 1})
for card_holder_limit in results:
    print(card_holder_limit.data_get())
```

#### `remove(reqmatch, ctrl=None) -> CardHolderLimitEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.CardHolderLimit().remove({"card_holder_profile_id": 1, "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> CardHolderLimitEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CardHolderLimit().update({
    "card_holder_profile_id": 1,
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardHolderLimitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardLimitEntity

```python
card_limit = client.CardLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `daily` | `dict | None` | No |  |
| `lifetime` | `dict | None` | No |  |
| `monthly` | `dict | None` | No |  |
| `transaction` | `dict | None` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> CardLimitEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CardLimit().load({"card_token": "card_token", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> CardLimitEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CardLimit().update({
    "card_token": "card_token",
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardLimitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardOrderEntity

```python
card_order = client.CardOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `dict` | No | Address set during card order. |
| `cardHolderName` | `str` | No | Name of the card holder. |
| `cardHolderProfileId` | `int` | No | The cardholder profile for this card. |
| `cardProgram` | `dict` | No | The card program associated with this card order. |
| `cardToken` | `str | None` | No | Token of the card associated with card order. |
| `city` | `str` | No | Card holder's city (max 30 characters). |
| `clientId` | `str` | No | Client ID. |
| `country` | `str` | No | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `str` | No | Time when the card order is created. |
| `deliveryDetails` | `dict` | No | Delivery details of a physical card order. |
| `deliveryEstimate` | `str` | No | The estimated time when the card will be delivered. |
| `deliveryOption` | `str` | No | The delivery method for the card order. |
| `embossedName` | `str` | No | The cardholder's name to print on the card (physical card only). |
| `errors` | `list` | No | Collection of validation errors. |
| `firstLine` | `str` | No | Card holder's address (max 30 characters). |
| `id` | `int` | No | ID of the card order. |
| `lifetimeLimit` | `float | None` | No | Maximum amount of spending on the card once issued. |
| `modificationTime` | `str` | No | Time when the card order was last modified. |
| `phoneNumber` | `str` | No | Phone number associated with the card order. |
| `postCode` | `str` | No | Card holder's postal code (max 10 characters). |
| `profileId` | `int` | No | Profile ID. |
| `program` | `str` | Yes | The name of the card program. |
| `replacementDetails` | `dict` | No | The replacement details for this card. |
| `replacesCard` | `str | None` | No | Token of the card being replaced by this replacement card order. |
| `secondLine` | `str | None` | No | Card holder's address (max 30 characters). |
| `state` | `str | None` | No | Card holder's state (max 30 characters). |
| `status` | `str` | No | Status of the card order. |
| `thirdLine` | `str | None` | No | Card holder's address (max 30 characters). |

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

#### `create(reqdata, ctrl=None) -> CardOrderEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CardOrder().create({
    "cardHolderName": "example_cardHolderName",  # str
    "program": "example_program",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[CardOrderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CardOrder().list({"profile_id": 1})
for card_order in results:
    print(card_order.data_get())
```

#### `load(reqmatch, ctrl=None) -> CardOrderEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CardOrder().load({"id": 1, "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> CardOrderEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.CardOrder().update({
    "id": 1,
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardOrderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardSensitiveDetailEntity

```python
card_sensitive_detail = client.CardSensitiveDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `encryptedPayload` | `str` | Yes | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `str` | No | The RSA public key. |
| `keyVersion` | `int` | Yes | The version of the key to use. |
| `version` | `int` | No | Version of the encryption key. |

### Operations

#### `create(reqdata, ctrl=None) -> CardSensitiveDetailEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CardSensitiveDetail().create({
    "encryptedPayload": "example_encryptedPayload",  # str
    "keyVersion": 1,  # int
})
```

#### `load(reqmatch, ctrl=None) -> CardSensitiveDetailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CardSensitiveDetail().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardSensitiveDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardTransactionEntity

```python
card_transaction = client.CardTransaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approvalCode` | `str | None` | No | Also called authorization code. |
| `arn` | `str | None` | No | Acquirer reference number |
| `authorisationMethod` | `str` | No | Authorisation method |
| `balanceChannelReferenceId` | `str | None` | No | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `dict` | No | Billing amount |
| `cardToken` | `str` | No | Unique identifier of the card |
| `creationTime` | `str` | No | When the transaction was created |
| `credits` | `list` | No | Array of credits. |
| `debits` | `list` | No | Array of debits. |
| `declineReason` | `str | None` | No | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `str | None` | No | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `list` | No | Array of fees |
| `id` | `int` | No | ID of the transaction |
| `merchant` | `dict` | No | Merchant information |
| `modificationTime` | `str` | No | When the transaction was last updated |
| `pinValidationResult` | `str | None` | No | PIN validation result. |
| `purgeTime` | `str | None` | No | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `dict | None` | No | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `str` | No | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `dict` | No | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `dict` | No | Transaction amount including all fees |
| `type` | `str` | No | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CardTransactionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.CardTransaction().list({"card_token": "example", "profile_id": 1, "from_creation_time": "example", "to_creation_time": "example"})
for card_transaction in results:
    print(card_transaction.data_get())
```

#### `load(reqmatch, ctrl=None) -> CardTransactionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.CardTransaction().load({"id": 1, "profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardTransactionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CaseEntity

```python
case = client.Case()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes | Timestamp when the case was created. |
| `description` | `str` | No | The description of the request. |
| `details` | `dict` | No | Details related to the case. |
| `externalId` | `str` | No | Partner-created identifier for this case, if applicable. |
| `id` | `int` | Yes | Unique identifier of the case. |
| `messages` | `list` | Yes | List of messages associated with this case. |
| `profileId` | `int` | Yes | The profile ID associated with this case. |
| `reference` | `dict` | Yes | Reference information linking the case to a related entity. |
| `status` | `str` | Yes | The current status of the support case. |
| `subType` | `str` | No | The sub-type of the support case. |
| `subject` | `str` | No | The subject of the case. |
| `type` | `str` | Yes | The type of the support case. |
| `updatedAt` | `str` | No | Timestamp when the case was last updated. |

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

#### `create(reqdata, ctrl=None) -> CaseEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Case().create({
})
```

#### `load(reqmatch, ctrl=None) -> CaseEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Case().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CaseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ClaimAccountEntity

```python
claim_account = client.ClaimAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `claimAccountCode` | `str` | No | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `str` | Yes | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

### Operations

#### `create(reqdata, ctrl=None) -> ClaimAccountEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ClaimAccount().create({
    "registrationCode": "example_registrationCode",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClaimAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ComparisonEntity

```python
comparison = client.Comparison()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | The comparison amount |
| `amountType` | `str` | No | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `str | None` | No | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `list` | No | List of provider types included in the response |
| `providers` | `list` | No | List of providers with their estimated quotes |
| `sourceCountry` | `str | None` | No | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `str | None` | No | ISO 4217 source currency code |
| `targetCountry` | `str | None` | No | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `str | None` | No | ISO 4217 target currency code |

### Operations

#### `load(reqmatch, ctrl=None) -> ComparisonEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Comparison().load({"source_currency": "source_currency", "target_currency": "target_currency"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ComparisonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContactEntity

```python
contact = client.Contact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactId` | `str` | No | Contact ID in the format of UUID. |
| `identifier` | `str` | No | A Wise profile's identifier. |
| `name` | `str` | No | Full name of the contact. |
| `targetCurrency` | `str` | No | 3 character currency code. |

### Operations

#### `create(reqdata, ctrl=None) -> ContactEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Contact().create({
    "profile_id": 1,  # int
    "is_direct_identifier_creation": True,  # bool
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CurrencyEntity

```python
currency = client.Currency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `list` | No | Keywords associated with this currency. |
| `name` | `str` | No | Display name of this currency. |
| `supportsDecimals` | `bool` | No | Whether this currency supports decimal values or not. |
| `symbol` | `str` | No | The symbol of this currency. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CurrencyEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Currency().list()
for currency in results:
    print(currency.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CurrencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeliveryEstimateEntity

```python
delivery_estimate = client.DeliveryEstimate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estimatedDeliveryDate` | `str` | No | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `str` | No | A string to display to users for the estimated delivery date. |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> DeliveryEstimateEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.DeliveryEstimate().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeliveryEstimateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeliveryUpdateEntity

```python
delivery_update = client.DeliveryUpdate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delivery_update` | `str` | Yes | The delivery signal to simulate. |
| `delivery_update_path` | `list` | Yes | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `str | None` | No | Optional estimated delivery time. |
| `observation_id` | `str` | Yes | Server-generated observation identifier. |
| `occurred_at` | `str` | Yes | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `str | None` | No | Payment scheme to include in the observation. |

### Operations

#### `create(reqdata, ctrl=None) -> DeliveryUpdateEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DeliveryUpdate().create({
    "transfer_id": 1,  # int
    "delivery_update": "example_delivery_update",  # str
    "delivery_update_path": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeliveryUpdateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DigitalWalletEntity

```python
digital_wallet = client.DigitalWallet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `activation` | `str` | Yes | Approve or decline a payment token activation |
| `paymentTokens` | `list` | No |  |
| `walletNames` | `list` | No | List of supported wallet types. |

### Operations

#### `create(reqdata, ctrl=None) -> DigitalWalletEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DigitalWallet().create({
    "card_token": "example_card_token",  # str
    "profile_id": 1,  # int
    "activation": "example_activation",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DigitalWalletEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DirectDebitAccountEntity

```python
direct_debit_account = client.DirectDebitAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `currency` | `str` | No | Currency of the bank account. |
| `details` | `dict` | No | Bank account details |
| `id` | `int` | No | Direct debit account ID |
| `type` | `str` | No | Payment type for which the account is used. |

### Operations

#### `create(reqdata, ctrl=None) -> DirectDebitAccountEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.DirectDebitAccount().create({
    "profile_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DirectDebitAccountEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DirectDebitAccount().list({"profile_id": 1, "currency": "example", "type": "example"})
for direct_debit_account in results:
    print(direct_debit_account.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DirectDebitAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DirectorEntity

```python
director = client.Director()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryOfResidenceIso3Code` | `str` | No | 3 character country code. |
| `dateOfBirth` | `str` | No | Date of birth. |
| `directors` | `list` | No |  |
| `firstName` | `str` | No | Director first name. |
| `id` | `int` | No | ID of the director. |
| `lastName` | `str` | No | Director last name. |

### Operations

#### `create(reqdata, ctrl=None) -> DirectorEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Director().create({
    "profile_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[DirectorEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Director().list({"profile_id": 1})
for director in results:
    print(director.data_get())
```

#### `remove(reqmatch, ctrl=None) -> DirectorEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Director().remove({"profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> DirectorEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Director().update({
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DirectorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DisputeEntity

```python
dispute = client.Dispute()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `canWithdraw` | `bool` | No | Whether the dispute can be withdrawn. |
| `createdAt` | `str` | No | Time when the dispute was created. |
| `createdBy` | `str` | No | Creator of the dispute. |
| `disclaimer` | `dict` | No | Acknowledgement fields. |
| `files` | `dict` | No | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `dict` | No | Form fields required to submit this dispute. |
| `id` | `str` | No | Unique identifier of the dispute. |
| `lastUpdatedAt` | `str` | No | Time when the dispute was last updated. |
| `profileId` | `int` | No | Profile ID. |
| `reason` | `str` | No | Dispute reason code. |
| `receipt` | `str` | No | The file to upload. |
| `status` | `str` | No | Dispute overall status. |
| `statusMessage` | `str` | No | Explanation for `subStatus`. |
| `subStatus` | `str` | No | Dispute detailed status. |
| `transaction` | `dict` | No | Transaction details for the dispute. |
| `transactionId` | `int` | No | Card transaction ID. |

### Operations

#### `create(reqdata, ctrl=None) -> DisputeEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Dispute().create({
    "profile_id": 1,  # int
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch=None, ctrl=None) -> list[DisputeEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Dispute().list({"profile_id": 1})
for dispute in results:
    print(dispute.data_get())
```

#### `load(reqmatch, ctrl=None) -> DisputeEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Dispute().load({"id": "dispute_id", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> DisputeEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Dispute().update({
    "id": "dispute_id",
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DisputeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DisputeReasonEntity

```python
dispute_reason = client.DisputeReason()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | The type of reasons available for the dispute. |
| `description` | `str` | No | The description of the dispute reason. |
| `isFraud` | `bool` | No | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `list` | No | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `bool` | No | Whether the dispute supports multiple transactions. |
| `tooltip` | `str` | No | Text to display when showing the dispute form to your users. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DisputeReasonEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.DisputeReason().list({"profile_id": 1})
for dispute_reason in results:
    print(dispute_reason.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DisputeReasonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FacetecEntity

```python
facetec = client.Facetec()
```

### Operations

#### `load(reqmatch, ctrl=None) -> FacetecEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Facetec().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FacetecEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FileEntity

```python
file = client.File()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes | Timestamp when the file was uploaded. |
| `file` | `str` | Yes | The file to upload. |
| `fileId` | `str` | Yes | Unique identifier of the uploaded file. |
| `fileName` | `str` | Yes | The name of the uploaded file. |
| `profileId` | `int` | Yes | The ID of the profile this file belongs to. |
| `purpose` | `str` | Yes | The purpose of the file upload. |
| `submissionData` | `dict` | Yes | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

### Operations

#### `create(reqdata, ctrl=None) -> FileEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.File().create({
    "createdAt": "example_createdAt",  # str
    "file": "example_file",  # str
    "fileId": "example_fileId",  # str
    "fileName": "example_fileName",  # str
    "profileId": 1,  # int
    "purpose": "example_purpose",  # str
    "submissionData": {},  # dict
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch=None, ctrl=None) -> list[FileEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.File().list()
for file in results:
    print(file.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FundingEntity

```python
funding = client.Funding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balanceTransactionId` | `int` | No |  |
| `status` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> FundingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Funding().create({
    "profile_id": 1,  # int
    "transfer_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FundingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GpiTrackingEntity

```python
gpi_tracking = client.GpiTracking()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `identifier` | `str` | Yes | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `str` | Yes | The type of identifier used to look up the transfer. |
| `transactions` | `list` | No | The matching GPI tracking transactions. |

### Operations

#### `create(reqdata, ctrl=None) -> GpiTrackingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.GpiTracking().create({
    "identifier": "example_identifier",  # str
    "identifierType": "example_identifierType",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GpiTrackingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HoldLimitBreachEntity

```python
hold_limit_breach = client.HoldLimitBreach()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | Amount value. |
| `closingReason` | `str` | No | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `str` | No | Date when the hold limit breach was created. |
| `currency` | `str` | No | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `int` | No | Hold limit breach ID. |
| `profileId` | `int` | No | ID of the profile that owns the hold limit breach |
| `state` | `str` | No | Current state of the hold limit breach. |
| `updatedAt` | `str` | No | Date when the hold limit breach was last modified. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[HoldLimitBreachEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.HoldLimitBreach().list({"profile_id": 1})
for hold_limit_breach in results:
    print(hold_limit_breach.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HoldLimitBreachEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IncomingTransferEntity

```python
incoming_transfer = client.IncomingTransfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountDetailsId` | `str` | No | Account details ID that received the incoming transfer. |
| `amounts` | `dict` | Yes | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `str` | Yes | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `str` | No | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `str` | No | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `str` | Yes | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `dict` | Yes | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `dict` | Yes | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `str` | No | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `float` | Yes | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `dict` | Yes | Breakdown of fees applied to the incoming transfer. |
| `id` | `str` | Yes | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `list` | Yes | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `int` | Yes | Profile ID of the balance owner. |
| `scheme` | `str` | Yes | The payment scheme through which the incoming transfer was received. |
| `state` | `str` | Yes | Current state of the incoming transfer. |
| `uetr` | `str` | No | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `str` | No | Unstructured remittance information provided by the debtor. |

### Operations

#### `load(reqmatch, ctrl=None) -> IncomingTransferEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.IncomingTransfer().load({"id": "incoming_transfer_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IncomingTransferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JoseEntity

```python
jose = client.Jose()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keyId` | `str` | No | ID of the key in UUID format. |
| `keyMaterial` | `dict` | No |  |
| `publicKeyMaterial` | `dict` | No |  |
| `scope` | `str` | No | Scope of the key. |
| `validFrom` | `str` | No | The key is valid from this date. |
| `validTill` | `str` | No | The key is valid until this date. |
| `version` | `int` | No | Version of the public key issued. |

### Operations

#### `create(reqdata, ctrl=None) -> JoseEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Jose().create({
})
```

#### `load(reqmatch, ctrl=None) -> JoseEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Jose().load({"algorithm": "algorithm", "scope": "scope"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JoseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KycReviewEntity

```python
kyc_review = client.KycReview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No | Timestamp marking the creation of the KYC Review. |
| `id` | `str` | No | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `dict | None` | No | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `str | None` | No | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `str | None` | No | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `list | None` | No | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `str` | No | Aggregated state of the underlying requirement set. |
| `triggerData` | `dict` | No | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `list` | No | List of trigger reference objects. |
| `type` | `str` | Yes | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `str` | No | Timestamp marking the last update of the KYC Review. |

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

#### `create(reqdata, ctrl=None) -> KycReviewEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.KycReview().create({
    "profile_id": 1,  # int
    "type": "example_type",  # str
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `list(reqmatch=None, ctrl=None) -> list[KycReviewEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.KycReview().list({"profile_id": 1})
for kyc_review in results:
    print(kyc_review.data_get())
```

#### `load(reqmatch, ctrl=None) -> KycReviewEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.KycReview().load({"id": "kyc_review_id", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> KycReviewEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.KycReview().update({
    "id": "kyc_review_id",
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KycReviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkRequestEntity

```python
link_request = client.LinkRequest()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientKey` | `str` | Yes | Client key that created the embedded link request. |
| `email` | `str` | Yes | The end user's email address, to receive dispute updates. |
| `id` | `str` | Yes | Embedded link request ID. |
| `metadata` | `dict` | Yes | Flow-specific metadata. |
| `profileId` | `int` | Yes | Profile that owns the embedded flow. |
| `redirectUrl` | `str` | Yes | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `int` | Yes | The ID of the card transaction to dispute. |
| `type` | `str` | Yes | Embedded Flow type. |

### Operations

#### `create(reqdata, ctrl=None) -> LinkRequestEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.LinkRequest().create({
    "profile_id": 1,  # int
    "email": "example_email",  # str
    "redirectUrl": "example_redirectUrl",  # str
    "transactionId": 1,  # int
})
```

#### `load(reqmatch, ctrl=None) -> LinkRequestEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.LinkRequest().load({"id": "link_request_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkRequestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageEntity

```python
message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `submissionData` | `dict` | Yes | The data for the message submission. |
| `type` | `str` | Yes | The type of message submission. |

### Operations

#### `create(reqdata, ctrl=None) -> MessageEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Message().create({
    "case_id": 1,  # int
    "submissionData": {},  # dict
    "type": "example_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MultiCurrencyAccountEntity

```python
multi_currency_account = client.MultiCurrencyAccount()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MultiCurrencyAccountEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

#### `load(reqmatch, ctrl=None) -> MultiCurrencyAccountEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.MultiCurrencyAccount().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MultiCurrencyAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OneTimeTokenEntity

```python
one_time_token = client.OneTimeToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challenges` | `list` | No | An array of challenges. |
| `faceMap` | `str` | No | A base64 encoded string. |
| `oneTimeToken` | `str` | No | A one-time token unique identifier. |
| `validity` | `int` | No | The One-Time Token expiration in seconds. |

### Operations

#### `create(reqdata, ctrl=None) -> OneTimeTokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.OneTimeToken().create({
    "profile_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OneTimeTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OttEntity

```python
ott = client.Ott()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actionType` | `str` | No | The action bound to the one time token. |
| `challenges` | `list` | No | Array of challenge objects. |
| `oneTimeToken` | `str` | No | Unique identifier of a one time token. |
| `userId` | `int` | No | Creator of this one time token. |
| `validity` | `int` | No | Seconds until the one time token becomes expired. |

### Operations

#### `create(reqdata, ctrl=None) -> OttEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `load(reqmatch, ctrl=None) -> OttEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Ott().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OttEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PayinEntity

```python
payin = client.Payin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No |  |
| `currency` | `str` | No |  |
| `details` | `dict` | No | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `str` | No |  |
| `id` | `str` | No |  |
| `payinSessionId` | `str` | No |  |
| `paymentInstrumentId` | `str` | No |  |
| `qrCodeInBase64` | `str` | No | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `str` | No |  |
| `status` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> PayinEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Payin().create({
    "payin_session_id": "example_payin_session_id",  # str
    "profile_id": 1,  # int
    "payinSessionId": "example_payinSessionId",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayinEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PayinDepositDetailEntity

```python
payin_deposit_detail = client.PayinDepositDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `payinBank` | `dict` | No | Information about the receiving bank. |
| `payinBankAccount` | `dict` | No | Bank account details to use to send the payment to. |
| `wiseInformation` | `dict` | No | Information about the receiving Wise entity, the owner of the bank account. |

### Operations

#### `load(reqmatch, ctrl=None) -> PayinDepositDetailEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PayinDepositDetail().load({"profile_id": 1, "transfer_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PayinDepositDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentEntity

```python
payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | No | Transfer source amount |
| `currency` | `str` | No | Transfer source currency |
| `id` | `int` | No | Payment ID |
| `method` | `str` | No | The payment method used to pay for the transfer |
| `pricingVariant` | `str | None` | No | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `str` | No | Date of when payment was created |
| `timeUpdated` | `str` | No | Date of when payment was updated |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaymentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Payment().list({"transfer_id": 1})
for payment in results:
    print(payment.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentInitiationEntity

```python
payment_initiation = client.PaymentInitiation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> PaymentInitiationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PaymentInitiation().create({
    "batch_group_id": "example_batch_group_id",  # str
    "profile_id": 1,  # int
})
```

#### `load(reqmatch, ctrl=None) -> PaymentInitiationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PaymentInitiation().load({"id": 1, "batch_group_id": "batch_group_id", "profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentInitiationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentInstrumentEntity

```python
payment_instrument = client.PaymentInstrument()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountHolderName` | `str` | No |  |
| `accountNumber` | `str` | No |  |
| `accountOwnerDetails` | `dict` | No |  |
| `accountType` | `str` | No |  |
| `bankCode` | `str` | No |  |
| `bankName` | `str` | No |  |
| `branchCode` | `str` | No |  |
| `disconnectReason` | `str` | No |  |
| `id` | `str` | No |  |
| `reference` | `str` | No |  |
| `status` | `str` | No |  |
| `type` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> PaymentInstrumentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PaymentInstrument().create({
    "profile_id": 1,  # int
    "accountNumber": "example_accountNumber",  # str
    "type": "example_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[PaymentInstrumentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PaymentInstrument().list({"id": "example", "profile_id": 1})
for payment_instrument in results:
    print(payment_instrument.data_get())
```

#### `load(reqmatch, ctrl=None) -> PaymentInstrumentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PaymentInstrument().load({"id": "payment_instrument_id", "profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentInstrumentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentIntentEntity

```python
payment_intent = client.PaymentIntent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocationId` | `str` | No | Unique identifier of the associated settlement allocation. |
| `allocationType` | `str` | No | Type of allocation. |
| `createdAt` | `str` | No | Timestamp when the payment intent was created. |
| `fundingSource` | `str` | No | Source of funding for the payment. |
| `id` | `str` | No | Unique identifier of the payment intent. |
| `partnerEntityId` | `str` | No | Partner entity identifier. |
| `paymentReference` | `str` | No | Payment reference. |
| `profileId` | `str` | No | Profile identifier. |
| `reason` | `str` | No | Reason for the payment. |
| `recipientType` | `str` | No | Type of recipient. |
| `sourceAmount` | `float` | No | Source amount of the payment. |
| `sourceCurrency` | `str` | No | Source currency code (ISO 4217). |
| `state` | `str` | No | Current state of the payment intent. |
| `targetAmount` | `float` | No | Target amount of the payment. |
| `targetCurrency` | `str` | No | Target currency code (ISO 4217). |
| `updatedAt` | `str` | No | Timestamp when the payment intent was last updated. |

### Operations

#### `load(reqmatch, ctrl=None) -> PaymentIntentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PaymentIntent().load({"id": "payment_intent_id", "allocation_id": "allocation_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentIntentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhoneNumberEntity

```python
phone_number = client.PhoneNumber()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `str` | No | Client ID of which this phone number belongs to. |
| `id` | `int` | No | ID of the phone number. |
| `phoneNumber` | `str` | No | A text representation of phone number. |
| `type` | `str` | No | Type of phone number when used in authentication. |
| `verified` | `bool` | No | Indicator if phone number is verified. |

### Operations

#### `create(reqdata, ctrl=None) -> PhoneNumberEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.PhoneNumber().create({
    "user_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhoneNumberEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductionEntity

```python
production = client.Production()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str | None` | No | Detailed description of the error code. |
| `errorCode` | `str | None` | No | Code returned when card production is not successful. |
| `kioskId` | `str | None` | No | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `str` | No | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `str` | No | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

### Field Usage by Operation

| Field | load | update |
| --- | --- | --- |
| `description` | - | - |
| `errorCode` | - | - |
| `kioskId` | - | Yes |
| `occurredAt` | - | - |
| `status` | - | - |

### Operations

#### `load(reqmatch, ctrl=None) -> ProductionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Production().load({"card_token": "card_token", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> ProductionEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Production().update({
    "card_token": "card_token",
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProfileEntity

```python
profile = client.Profile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `dict` | No |  |
| `avatar` | `str` | No |  |
| `contactDetails` | `dict` | No |  |
| `createdAt` | `str` | No |  |
| `currentState` | `str` | No |  |
| `dateOfBirth` | `str` | No |  |
| `email` | `str` | No |  |
| `firstName` | `str` | No |  |
| `fullName` | `str` | No |  |
| `id` | `int` | No |  |
| `lastName` | `str` | No |  |
| `phoneNumber` | `str` | No |  |
| `preferredName` | `str` | No |  |
| `publicId` | `str` | No |  |
| `secondaryAddresses` | `list` | No |  |
| `type` | `str` | No |  |
| `updatedAt` | `str` | No |  |
| `userId` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> ProfileEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[ProfileEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Profile().list()
for profile in results:
    print(profile.data_get())
```

#### `load(reqmatch, ctrl=None) -> ProfileEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Profile().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> ProfileEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

#### `update(reqdata, ctrl=None) -> ProfileEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QuoteEntity

```python
quote = client.Quote()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdTime` | `str` | No | Quote created timestamp. |
| `creationContext` | `dict` | No | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `str` | No | The date and time the quote expires. |
| `guaranteedTargetAmount` | `bool` | No | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `bool` | No | Indicates whether guaranteed target amount is allowed. |
| `id` | `str` | No | ID of this quote (GUID format). |
| `notices` | `list` | No | Messages to display to the user. |
| `payOut` | `str` | No | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `dict` | No | _Optional_. |
| `paymentOptions` | `list` | No | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `str` | No | Preferred pay-in method. |
| `pricingConfiguration` | `dict` | No | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `int` | No | Personal or business profile ID. |
| `providedAmountType` | `str` | No | Indicates whether the quote was created as source or target. |
| `rate` | `float` | No | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `str` | No | Date and time the locked rate expires. |
| `rateType` | `str` | No | Whether the rate is fixed or floating. |
| `sourceAmount` | `float` | No | Amount in source currency to send. |
| `sourceCurrency` | `str` | No | Source (sending) currency code. |
| `status` | `str` | No | Current status of the quote. |
| `targetAccount` | `int` | No | _Optional_. |
| `targetAmount` | `float` | No | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `bool` | No | Indicates whether target amount is allowed. |
| `targetCurrency` | `str` | No | Target (receive) currency code. |
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

#### `create(reqdata, ctrl=None) -> QuoteEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Quote().create({
    "sourceCurrency": "example_sourceCurrency",  # str
    "targetCurrency": "example_targetCurrency",  # str
})
```

#### `load(reqmatch, ctrl=None) -> QuoteEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Quote().load({"id": "quote_id", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> QuoteEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Quote().update({
    "id": "quote_id",
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QuoteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RateEntity

```python
rate = client.Rate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate` | `float` | Yes | Exchange rate value. |
| `source` | `str` | Yes | Source (send) currency code. |
| `target` | `str` | Yes | Target (receive) currency code. |
| `time` | `str` | Yes | Timestamp for exchange rate. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[RateEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Rate().list()
for rate in results:
    print(rate.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecipientEntity

```python
recipient = client.Recipient()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acceptedOutcomes` | `bool` | Yes | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `str` | No | Recipient full name. |
| `accountId` | `int` | No | Recipient account ID. |
| `accountSummary` | `str` | No | Summary of account details for ease of lookup. |
| `active` | `bool` | No | Status of the recipient account. |
| `commonFieldMap` | `dict` | No | Map of key lookup fields for the account. |
| `confirmations` | `dict` | No | Contains verification results for the recipient's details. |
| `country` | `str` | No | 2-character country code. |
| `creatorId` | `int` | No | Account entity that owns the recipient account. |
| `currency` | `str` | No | 3-character currency code. |
| `details` | `dict` | No | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `list` | No | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `str` | No | Account hash for tracking changes to recipient details. |
| `id` | `int` | No | ID of the recipient. |
| `isInternal` | `bool` | No | Indicates whether recipient is internal. |
| `legalEntityType` | `str` | No | Entity type of recipient account. |
| `longAccountSummary` | `str` | No | Longer account details summary. |
| `name` | `dict` | No | Recipient name details. |
| `ownedByCustomer` | `bool` | No | Inidicates if recipient account belongs to profile owner. |
| `profile` | `int` | No | Personal or business profile ID of the sender. |
| `profileId` | `int` | No | Specific profile that owns the recipient account. |
| `quoteId` | `str` | No | Quote ID. |
| `type` | `str` | No | Recipient account type. |
| `ultimateBeneficiary` | `dict | None` | Yes | The details for the ultimate beneficiary of this recipient. |

### Operations

#### `create(reqdata, ctrl=None) -> RecipientEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Recipient().create({
    "acceptedOutcomes": True,  # bool
    "ultimateBeneficiary": {},  # dict | None
})
```

#### `list(reqmatch=None, ctrl=None) -> list[RecipientEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Recipient().list()
for recipient in results:
    print(recipient.data_get())
```

#### `load(reqmatch, ctrl=None) -> RecipientEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Recipient().load({"account_id": 1})
```

#### `remove(reqmatch, ctrl=None) -> RecipientEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Recipient().remove({"account_id": 1})
```

#### `update(reqdata, ctrl=None) -> RecipientEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Recipient().update({
    "account_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecipientEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RuleEntity

```python
rule = client.Rule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | The description of the authorisation rule. |
| `id` | `int` | No | The unique ID for the authorisation rule. |
| `operation` | `str` | No | Determines whether the transactions should be allowed or blocked. |
| `type` | `str` | No | The type of authorisation rule. |
| `values` | `list` | No | A list of values based on the `type` of rule configured. |

### Operations

#### `create(reqdata, ctrl=None) -> RuleEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Rule().create({
    "application_id": "example_application_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[RuleEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Rule().list({"application_id": "example"})
for rule in results:
    print(rule.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SamlEntity

```python
saml = client.Saml()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `RelayState` | `str` | No | Opaque state value. |
| `SAMLResponse` | `str` | Yes | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

### Operations

#### `create(reqdata, ctrl=None) -> SamlEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Saml().create({
    "SAMLResponse": "example_SAMLResponse",  # str
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl=None) -> SamlEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Saml().load({"registration_id": "registration_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SamlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScaDeviceFingerprintEntity

```python
sca_device_fingerprint = client.ScaDeviceFingerprint()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `str` | No | The identifier of the device fingerprint. |
| `id` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> ScaDeviceFingerprintEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ScaDeviceFingerprint().create({
    "profile_id": 1,  # int
})
```

#### `remove(reqmatch, ctrl=None) -> ScaDeviceFingerprintEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ScaDeviceFingerprint().remove({"id": "sca_device_fingerprint_id", "profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaDeviceFingerprintEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScaFacemapEntity

```python
sca_facemap = client.ScaFacemap()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `faceMap` | `str` | No | A base64 encoded string. |

### Operations

#### `create(reqdata, ctrl=None) -> ScaFacemapEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ScaFacemap().create({
    "profile_id": 1,  # int
})
```

#### `remove(reqmatch, ctrl=None) -> ScaFacemapEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ScaFacemap().remove({"profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaFacemapEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScaOtpEntity

```python
sca_otp = client.ScaOtp()
```

### Operations

#### `create(reqdata, ctrl=None) -> ScaOtpEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `remove(reqmatch, ctrl=None) -> ScaOtpEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.ScaOtp().remove({"phone_number_id": 1, "user_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaOtpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScaSessionEntity

```python
sca_session = client.ScaSession()
```

### Operations

#### `create(reqdata, ctrl=None) -> ScaSessionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ScaSession().create({
    "profile_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaSessionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SettlementAllocationEntity

```python
settlement_allocation = client.SettlementAllocation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | `dict` | Yes |  |
| `createdAt` | `str` | No | Timestamp when the settlement allocation was created. |
| `currency` | `str` | No | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `float` | No | Expected total amount for the allocation. |
| `file` | `str` | Yes | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `str` | No | Unique identifier of the settlement allocation. |
| `nextPageToken` | `str` | No | Token for fetching the next page of payment intents. |
| `paymentIntents` | `list` | No | List of payment intents associated with the allocation. |
| `paymentReference` | `str` | No | Unique payment reference for the settlement allocation. |
| `state` | `str` | No | Current state of the settlement allocation. |
| `updatedAt` | `str` | No | Timestamp when the settlement allocation was last updated. |

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

#### `create(reqdata, ctrl=None) -> SettlementAllocationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.SettlementAllocation().create({
    "command": {},  # dict
    "createdAt": "example_createdAt",  # str
    "currency": "example_currency",  # str
    "expectedTotalAmount": 1,  # float
    "file": "example_file",  # str
    "id": "example_id",  # str
    "paymentReference": "example_paymentReference",  # str
    "state": "example_state",  # str
    "updatedAt": "example_updatedAt",  # str
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl=None) -> SettlementAllocationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SettlementAllocation().load({"id": "settlement_allocation_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SettlementAllocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SimulationEntity

```python
simulation = client.Simulation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `str` | No |  |
| `created` | `str` | No |  |
| `creationTime` | `float` | No | Time when the card transaction was created. |
| `description` | `str | None` | No | Description of the KYC review item. |
| `details` | `dict` | No |  |
| `failure_reason_code` | `str` | No | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `bool` | No |  |
| `id` | `str` | No |  |
| `key` | `str` | No | KYC review item key. |
| `quote` | `int` | No |  |
| `rate` | `float` | No |  |
| `reference` | `str` | No |  |
| `sourceAccount` | `str` | No |  |
| `sourceCurrency` | `str` | No |  |
| `sourceValue` | `int` | No |  |
| `state` | `str` | No | State of the KYC review item. |
| `status` | `str` | No |  |
| `targetAccount` | `int` | No |  |
| `targetCurrency` | `str` | No |  |
| `targetValue` | `float` | No |  |
| `transactionId` | `int` | No | ID of the transaction. |
| `transferRequest` | `str` | No |  |
| `user` | `int` | No |  |
| `wise_id` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> SimulationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Simulation().create({
    "transfer_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[SimulationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Simulation().list({"card_token": "example", "profile_id": 1})
for simulation in results:
    print(simulation.data_get())
```

#### `load(reqmatch, ctrl=None) -> SimulationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Simulation().load({"status": "status", "transfer_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SimulationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpendControlEntity

```python
spend_control = client.SpendControl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ruleId` | `int` | No | The ID of the applied authorisation rule. |

### Operations

#### `create(reqdata, ctrl=None) -> SpendControlEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

#### `list(reqmatch=None, ctrl=None) -> list[SpendControlEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SpendControl().list({"application_id": "example"})
for spend_control in results:
    print(spend_control.data_get())
```

#### `remove(reqmatch, ctrl=None) -> SpendControlEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.SpendControl().remove({"application_id": "application_id", "rule_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpendControlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpendLimitEntity

```python
spend_limit = client.SpendLimit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aggregateWindow` | `dict` | No |  |
| `id` | `str` | No |  |
| `type` | `str` | No | The type of transaction. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SpendLimitEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.SpendLimit().list({"profile_id": 1})
for spend_limit in results:
    print(spend_limit.data_get())
```

#### `remove(reqmatch, ctrl=None) -> SpendLimitEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.SpendLimit().remove({"id": "spend_limit_id", "card_id": "card_id", "profile_id": 1})
```

#### `update(reqdata, ctrl=None) -> SpendLimitEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.SpendLimit().update({
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpendLimitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubscriptionEntity

```python
subscription = client.Subscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Timestamp of when the subscription was created. |
| `created_by` | `dict` | No |  |
| `delivery` | `dict` | No |  |
| `id` | `str` | No | UUID that uniquely identifies the subscription. |
| `name` | `str` | No | A custom name for your webhook to ease with identification. |
| `scope` | `dict` | No |  |
| `trigger_on` | `str` | No | The event type this subscription is listening for. |

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

#### `create(reqdata, ctrl=None) -> SubscriptionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Subscription().create({
    "client_key": "example_client_key",  # str
    "delivery": {},  # dict
    "name": "example_name",  # str
    "trigger_on": "example_trigger_on",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list[SubscriptionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Subscription().list({"client_key": "example"})
for subscription in results:
    print(subscription.data_get())
```

#### `load(reqmatch, ctrl=None) -> SubscriptionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Subscription().load({"id": "subscription_id", "client_key": "client_key"})
```

#### `remove(reqmatch, ctrl=None) -> SubscriptionEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Subscription().remove({"id": "subscription_id", "client_key": "client_key"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TestNotificationEntity

```python
test_notification = client.TestNotification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Timestamp of when the test notification was created. |
| `delivery_id` | `str` | No | ID of the delivery that was queued for sending. |

### Operations

#### `create(reqdata, ctrl=None) -> TestNotificationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.TestNotification().create({
    "client_key": "example_client_key",  # str
    "subscription_id": "example_subscription_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TestNotificationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ThirdPartyTransferEntity

```python
third_party_transfer = client.ThirdPartyTransfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `str` | No | Timestamp when transfer was created. |
| `details` | `dict` | No | Payment Details |
| `hasActiveIssues` | `bool` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | No | Transfer ID |
| `originalTransferId` | `str` | No | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `dict` | No | Data block to capture payment originator details |
| `quote` | `str` | No | Quote ID |
| `rate` | `float` | No | Exchange rate value |
| `sourceAccount` | `int` | No | Refund recipient account ID |
| `sourceCurrency` | `str` | No | Source currency code |
| `sourceValue` | `float` | No | Transfer amount in source currency |
| `status` | `str` | No | Transfer current status. |
| `targetAccount` | `int` | No | Recipient account ID |
| `targetCurrency` | `str` | No | Target currency code |
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

#### `create(reqdata, ctrl=None) -> ThirdPartyTransferEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ThirdPartyTransfer().create({
    "profile_id": 1,  # int
    "details": {},  # dict
    "originalTransferId": "example_originalTransferId",  # str
    "originator": {},  # dict
    "quote": "example_quote",  # str
    "targetAccount": 1,  # int
})
```

#### `load(reqmatch, ctrl=None) -> ThirdPartyTransferEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ThirdPartyTransfer().load({"id": 1, "profile_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThirdPartyTransferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ThreeDSecureEntity

```python
three_d_secure = client.ThreeDSecure()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `challengeStatus` | `str` | Yes | The customer's response to the 3DS challenge. |
| `transactionReference` | `str` | Yes | Transaction reference as received in the 3DS challenge webhook event. |

### Operations

#### `create(reqdata, ctrl=None) -> ThreeDSecureEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.ThreeDSecure().create({
    "profile_id": 1,  # int
    "challengeStatus": "example_challengeStatus",  # str
    "transactionReference": "example_transactionReference",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThreeDSecureEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TokenEntity

```python
token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `str` | No | Access token to be used when calling the API. |
| `created_at` | `str` | No | Token creation time in ISO 8601 format. |
| `expires_at` | `str` | No | Access token expiration timestamp (UTC). |
| `expires_in` | `int` | No | Access token expiry time in seconds. |
| `refresh_token` | `str` | No | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `str` | No | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `int` | No | Refresh token expiry time in seconds. |
| `scope` | `str` | No | Scope of the token. |
| `token_type` | `str` | No | Type of the token. |

### Operations

#### `create(reqdata, ctrl=None) -> TokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Token().create({
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TransferEntity

```python
transfer = client.Transfer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `business` | `int | None` | No | Your business profile ID |
| `created` | `str` | No | Timestamp when transfer was created |
| `customerTransactionId` | `str` | No | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `dict` | No |  |
| `hasActiveIssues` | `bool` | No | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | No | Transfer ID |
| `payinSessionId` | `str` | No | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `int | None` | No | V1 quote ID |
| `quoteUuid` | `str` | No | V2 quote ID |
| `rate` | `float` | No | Exchange rate value |
| `reference` | `str` | No | Deprecated, use `details.reference` instead |
| `sourceAccount` | `int | None` | No | Refund recipient account ID |
| `sourceCurrency` | `str` | No | Source currency code |
| `sourceValue` | `float` | No | Transfer amount in source currency |
| `status` | `str` | No | Transfer current status. |
| `targetAccount` | `int` | No | Recipient account ID |
| `targetCurrency` | `str` | No | Target currency code |
| `targetValue` | `float` | No | Transfer amount in target currency |
| `transferRequest` | `int | None` | No | Deprecated |
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

#### `create(reqdata, ctrl=None) -> TransferEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Transfer().create({
    "customerTransactionId": "example_customerTransactionId",  # str
    "quoteUuid": "example_quoteUuid",  # str
    "targetAccount": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[TransferEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Transfer().list()
for transfer in results:
    print(transfer.data_get())
```

#### `load(reqmatch, ctrl=None) -> TransferEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Transfer().load({"id": 1})
```

#### `update(reqdata, ctrl=None) -> TransferEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Transfer().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TransferRequirementEntity

```python
transfer_requirement = client.TransferRequirement()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customerTransactionId` | `str` | No | Unique identifier for the transfer request |
| `details` | `dict` | No |  |
| `originatorLegalEntityType` | `str` | No | Type of sender. |
| `quoteUuid` | `str` | Yes | V2 quote ID |
| `targetAccount` | `int` | Yes | Recipient account ID |

### Operations

#### `create(reqdata, ctrl=None) -> TransferRequirementEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.TransferRequirement().create({
    "quoteUuid": "example_quoteUuid",  # str
    "targetAccount": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransferRequirementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UboEntity

```python
ubo = client.Ubo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addressFirstLine` | `str` | No | First line of address. |
| `city` | `str` | No | City of residential address. |
| `countryOfResidenceIso3Code` | `str` | No | 3 character country code. |
| `dateOfBirth` | `str` | No | Date of birth. |
| `id` | `str` | No | ID of the ultimate beneficial owner. |
| `name` | `str` | No | Owner full name. |
| `ownershipPercentage` | `int` | No | Percentage of ownership. |
| `postCode` | `str` | No | Address post code. |
| `state` | `str` | No | State or region of residential address. |
| `ubos` | `list` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> UboEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Ubo().create({
    "profile_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[UboEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Ubo().list({"profile_id": 1})
for ubo in results:
    print(ubo.data_get())
```

#### `update(reqdata, ctrl=None) -> UboEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.Ubo().update({
    "profile_id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UboEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | If user is active or not. |
| `details` | `dict | None` | No | User details. |
| `email` | `str` | No | User's email. |
| `id` | `int` | No | User ID. |
| `language` | `str` | No | User default language for UI and email communication. |
| `name` | `str | None` | No | User's full name. |
| `registrationCode` | `str` | Yes | Randomly generated registration code that is unique to this user and request. |

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

#### `create(reqdata, ctrl=None) -> UserEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.User().create({
    "email": "example_email",  # str
    "registrationCode": "example_registrationCode",  # str
})
```

#### `load(reqmatch, ctrl=None) -> UserEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.User().load({"id": 1})
```

#### `update(reqdata, ctrl=None) -> UserEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.User().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VerificationEntity

```python
verification = client.Verification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_evidences` | `list` | No | List of evidence types required to complete verification. |

### Operations

#### `create(reqdata, ctrl=None) -> VerificationEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Verification().create({
    "profile_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list[VerificationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Verification().list({"profile_id": 1})
for verification in results:
    print(verification.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VerificationEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = WiseSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "secrets": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

