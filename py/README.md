# Wise Python SDK



The Python SDK for the Wise API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AccountDetail()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wise-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from wise_sdk import WiseSDK

client = WiseSDK({
    "apikey": os.environ.get("WISE_APIKEY"),
})
```

### 3. Load a balance

Balance is nested under currency, so provide the `currency`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    balance = client.Balance().load({"currency": "example_currency", "profile_id": 1})
    print(balance.data_get())
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    comparison = client.Comparison().load({"source_currency": "example", "target_currency": "example"})
    print(comparison.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = WiseSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
comparison = client.Comparison().load({"source_currency": "example", "target_currency": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = WiseSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### WiseSDK

```python
from wise_sdk import WiseSDK

client = WiseSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = WiseSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### WiseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `account_detail = client.AccountDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `str` | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `Any` | Country/scheme-specific account identification. |
| `country` | `str` | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `int` | Unique identifier for the account details. |
| `profileId` | `int` | Profile ID of the account details owner. |
| `state` | `str` | Current state of the account details. |

#### Example: Load

```python
account_detail = client.AccountDetail().load({"id": 1})
```


### AccountRequirement

Create an instance: `account_requirement = client.AccountRequirement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `str` | Recipient full name. |
| `currency` | `str` | 3-character currency code. |
| `details` | `dict` | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `list` | List of UI field groups to collect required data. |
| `ownedByCustomer` | `bool` | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `int` | Personal or business profile ID of the sender. |
| `title` | `str` | Human-readable title for the requirement group. |
| `type` | `str` | Recipient account type. |
| `ultimateBeneficiary` | `dict | None` | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `str` | Optional usage/help text. |

#### Example: List

```python
account_requirements = client.AccountRequirement().list({"quote_id": "example"})
```

#### Example: Create

```python
account_requirement = client.AccountRequirement().create({
    "quote_id": "example_quote_id",  # str
    "ultimateBeneficiary": {},  # dict | None
})
```


### Activity

Create an instance: `activity = client.Activity()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `str` | Timestamp when the activity was created. |
| `description` | `str` | A short description that briefly summarizes the activity. |
| `id` | `str` | Activity id. |
| `primaryAmount` | `str` | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `dict` | The resource associated with the activity. |
| `secondaryAmount` | `str` | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `str` | Status of the Activity. |
| `title` | `str` | Title of the Activity. |
| `type` | `str` | Type of Activity. |
| `updatedOn` | `str` | Timestamp when the activity was last modified. |

#### Example: List

```python
activitys = client.Activity().list({"profile_id": 1})
```


### Address

Create an instance: `address = client.Address()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `dict` | Address details. |
| `id` | `int` | Address ID. |
| `profile` | `int` | User profile ID. |

#### Example: Load

```python
address = client.Address().load({"id": 1})
```

#### Example: List

```python
addresss = client.Address().list()
```

#### Example: Create

```python
address = client.Address().create({
    "details": {},  # dict
    "profile": 1,  # int
})
```


### AddressRequirement

Create an instance: `address_requirement = client.AddressRequirement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `dict` | Address details to provide context for requirements lookup. |
| `fields` | `list` | List of fields required for the address. |
| `profile` | `int` | User profile ID. |
| `type` | `str` | Always "address". |

#### Example: List

```python
address_requirements = client.AddressRequirement().list()
```

#### Example: Create

```python
address_requirement = client.AddressRequirement().create({
    "details": {},  # dict
})
```


### Balance

Create an instance: `balance = client.Balance()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `dict` | Available balance that can be used to fund transfers. |
| `cashAmount` | `dict` | Cash amount in the account. |
| `creationTime` | `str` | Date when the balance was created. |
| `currency` | `str` | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `dict | None` | Icon for the balance. |
| `id` | `int` | Balance ID. |
| `investmentState` | `str` | Investment state of the balance. |
| `modificationTime` | `str` | Date when the balance was last modified. |
| `name` | `str | None` | Name of the balance. |
| `overdraft` | `dict` | Overdraft details for the account. |
| `reservedAmount` | `dict` | Amount reserved for transactions. |
| `state` | `str` | Must be `CLOSED`. |
| `targetRecipientId` | `int` | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `dict` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `dict` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `dict` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `str` | Type of balance account. |
| `visible` | `bool` | Whether the balance is visible to the user. |

#### Example: Load

```python
balance = client.Balance().load({"id": 1, "currency": "currency", "profile_id": 1})
```

#### Example: List

```python
balances = client.Balance().list({"profile_id": 1, "type": "example"})
```

#### Example: Create

```python
balance = client.Balance().create({
    "profile_id": 1,  # int
    "currency": "example_currency",  # str
    "state": "example_state",  # str
    "targetRecipientId": 1,  # int
    "type": "example_type",  # str
})
```


### BalanceStatement

Create an instance: `balance_statement = client.BalanceStatement()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolder` | `dict` | Account holder information. |
| `bankDetails` | `dict | None` | Local bank details for the account. |
| `endOfStatementBalance` | `dict` | Closing balance for the specified time period. |
| `id` | `str` |  |
| `issuer` | `dict` | Account issuer information. |
| `query` | `dict` | Query parameters used for the request. |
| `transactions` | `list` | List of transactions in the statement period. |

#### Example: Load

```python
balance_statement = client.BalanceStatement().load({"id": 1, "profile_id": 1, "currency": "currency", "interval_end": "interval_end", "interval_start": "interval_start"})
```


### BankAccountDetail

Create an instance: `bank_account_detail = client.BankAccountDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | Status of the account detail. |
| `currency` | `str` | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `str` | Account detail ID. |
| `internationalDetails` | `dict | None` | International bank account details. |
| `localDetails` | `dict` | Local bank account details. |
| `reason` | `str` | Reason for the return. |
| `targetAccountId` | `int` | ID of the currency balance to create account details on. |

#### Example: Create

```python
bank_account_detail = client.BankAccountDetail().create({
    "profile_id": 1,  # int
    "targetAccountId": 1,  # int
})
```


### BankAccountDetailsOrder

Create an instance: `bank_account_details_order = client.BankAccountDetailsOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `int` | Unique ID of the issued account details. |
| `balanceId` | `int | None` | ID of the balance the order is for. |
| `creationTime` | `str` | Timestamp of when the order was created. |
| `currency` | `str` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `str` | Unique ID of the order. |
| `modificationTime` | `str` | Timestamp of the last modification to the order. |
| `requirements` | `list` | List of requirements to fulfill the order. |
| `status` | `str` | Order status. |

#### Example: List

```python
bank_account_details_orders = client.BankAccountDetailsOrder().list({"profile_id": 1, "currency": "example"})
```

#### Example: Create

```python
bank_account_details_order = client.BankAccountDetailsOrder().create({
    "profile_id": 1,  # int
    "currency": "example_currency",  # str
})
```


### BatchGroup

Create an instance: `batch_group = client.BatchGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alreadyPaid` | `bool` | Not applicable to this use case. |
| `fileName` | `str | None` | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `str` | Whether this batch was submitted over the API or as a file. |
| `id` | `str` | Batch group ID. |
| `name` | `str` | Descriptive name for the batch group. |
| `payInDetails` | `list` | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `str | None` | Optional ID of the payin session. |
| `profileId` | `int` | The ID of the profile this payment belongs to. |
| `shortId` | `int` | Not applicable to this use case. |
| `sourceCurrency` | `str` | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `str` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `list` | The IDs of all transfers successfully added to the group. |
| `type` | `str` | The method of payment to use. |
| `userId` | `int` | The ID of the user who initiated this payment. |
| `version` | `int` | Batch version, used for concurrency control. |

#### Example: Load

```python
batch_group = client.BatchGroup().load({"id": "batch_group_id", "profile_id": 1})
```

#### Example: Create

```python
batch_group = client.BatchGroup().create({
    "profile_id": 1,  # int
    "name": "example_name",  # str
    "sourceCurrency": "example_sourceCurrency",  # str
    "type": "example_type",  # str
})
```


### BulkSettlement

Create an instance: `bulk_settlement = client.BulkSettlement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransfer` | `float` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `list` | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `str` | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `str` | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `str` | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `list` | Array of transfers to be settled. |
| `type` | `str` | Type of settlement. |

#### Example: Create

```python
bulk_settlement = client.BulkSettlement().create({
    "settlementDate": "example_settlementDate",  # str
    "settlementReference": "example_settlementReference",  # str
    "transfers": [],  # list
    "type": "example_type",  # str
})
```


### BusinessProfile

Create an instance: `business_profile = client.BusinessProfile()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abn` | `str | None` | Australian Business Number (only for Australian businesses). |
| `acn` | `str | None` | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `str` | Email of the actor. |
| `address` | `dict` | Main registered address of the business. |
| `arbn` | `str | None` | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `str` | Free-form description of the business activities. |
| `businessName` | `str` | Registered business name. |
| `businessNameInKatakana` | `str | None` | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `dict` | Business representative details. |
| `companyRole` | `str` | Role of the person managing the business profile. |
| `companyType` | `str` | Type of company. |
| `contactDetails` | `dict` | Contact information for the business. |
| `createdAt` | `str` | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `str` | Current status of this profile. |
| `descriptionOfBusiness` | `str` | Deprecated. |
| `email` | `str` | Primary email address for the business. |
| `externalCustomerId` | `str` | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `str` | Deprecated. |
| `fullName` | `str` | Full legal name of the business. |
| `id` | `int` | Unique identifier for the profile. |
| `industryCategories` | `list` | One or more industry categories classifying the business. |
| `operationalAddresses` | `list` | An array of operational addresses for the business. |
| `publicId` | `str` | Publicly accessible identifier for the profile. |
| `registrationNumber` | `str` | Business registration number. |
| `secondLevelCategory` | `str` | Deprecated. |
| `type` | `str` | Type of profile. |
| `updatedAt` | `str` | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `int` | The ID of the user associated with this profile. |
| `webpage` | `str` | Business website URL. |

#### Example: Create

```python
business_profile = client.BusinessProfile().create({
    "contactDetails": {},  # dict
})
```


### Card

Create an instance: `card = client.Card()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bankIdentificationNumber` | `str` | Bank identification number (BIN) of the card. |
| `cardHolderName` | `str` | Name of the card holder. |
| `cardProgram` | `dict` | Card program details. |
| `clientId` | `str` | Client ID of the partner that issued the card. |
| `creationTime` | `str` | Time when the card was created. |
| `expiryDate` | `str` | Date when the card will expire. |
| `id` | `str` |  |
| `lastFourDigits` | `str` | Last 4 digits of the card number. |
| `modificationTime` | `str` | Time when the card was last modified. |
| `phoneNumber` | `str` | Phone number associated with the card. |
| `profileId` | `int` | Profile ID that owns this card. |
| `status` | `dict` | Current status of the card. |
| `token` | `str` | Unique identifier for the card. |
| `unlockSpendingPermissions` | `str` | Method with which physical card spending permissions can be unlocked. |

#### Example: Load

```python
card = client.Card().load({"id": "card_id", "profile_id": 1})
```

#### Example: List

```python
cards = client.Card().list({"profile_id": 1})
```

#### Example: Create

```python
card = client.Card().create({
    "card_token": "example_card_token",  # str
    "profile_id": 1,  # int
})
```


### CardHolderLimit

Create an instance: `card_holder_limit = client.CardHolderLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `dict` | The limits to set, per aggregation window. |
| `spendLimits` | `list` | Spend limits configured for this cardholder. |
| `type` | `str` | The category of spending the limit applies to. |

#### Example: List

```python
card_holder_limits = client.CardHolderLimit().list({"card_holder_profile_id": 1, "profile_id": 1})
```


### CardLimit

Create an instance: `card_limit = client.CardLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `dict | None` |  |
| `lifetime` | `dict | None` |  |
| `monthly` | `dict | None` |  |
| `transaction` | `dict | None` |  |

#### Example: Load

```python
card_limit = client.CardLimit().load({"card_token": "card_token", "profile_id": 1})
```


### CardOrder

Create an instance: `card_order = client.CardOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `dict` | Address set during card order. |
| `cardHolderName` | `str` | Name of the card holder. |
| `cardHolderProfileId` | `int` | The cardholder profile for this card. |
| `cardProgram` | `dict` | The card program associated with this card order. |
| `cardToken` | `str | None` | Token of the card associated with card order. |
| `city` | `str` | Card holder's city (max 30 characters). |
| `clientId` | `str` | Client ID. |
| `country` | `str` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `str` | Time when the card order is created. |
| `deliveryDetails` | `dict` | Delivery details of a physical card order. |
| `deliveryEstimate` | `str` | The estimated time when the card will be delivered. |
| `deliveryOption` | `str` | The delivery method for the card order. |
| `embossedName` | `str` | The cardholder's name to print on the card (physical card only). |
| `errors` | `list` | Collection of validation errors. |
| `firstLine` | `str` | Card holder's address (max 30 characters). |
| `id` | `int` | ID of the card order. |
| `lifetimeLimit` | `float | None` | Maximum amount of spending on the card once issued. |
| `modificationTime` | `str` | Time when the card order was last modified. |
| `phoneNumber` | `str` | Phone number associated with the card order. |
| `postCode` | `str` | Card holder's postal code (max 10 characters). |
| `profileId` | `int` | Profile ID. |
| `program` | `str` | The name of the card program. |
| `replacementDetails` | `dict` | The replacement details for this card. |
| `replacesCard` | `str | None` | Token of the card being replaced by this replacement card order. |
| `secondLine` | `str | None` | Card holder's address (max 30 characters). |
| `state` | `str | None` | Card holder's state (max 30 characters). |
| `status` | `str` | Status of the card order. |
| `thirdLine` | `str | None` | Card holder's address (max 30 characters). |

#### Example: Load

```python
card_order = client.CardOrder().load({"id": 1, "profile_id": 1})
```

#### Example: List

```python
card_orders = client.CardOrder().list({"profile_id": 1})
```

#### Example: Create

```python
card_order = client.CardOrder().create({
    "cardHolderName": "example_cardHolderName",  # str
    "program": "example_program",  # str
})
```


### CardSensitiveDetail

Create an instance: `card_sensitive_detail = client.CardSensitiveDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `encryptedPayload` | `str` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `str` | The RSA public key. |
| `keyVersion` | `int` | The version of the key to use. |
| `version` | `int` | Version of the encryption key. |

#### Example: Load

```python
card_sensitive_detail = client.CardSensitiveDetail().load()
```

#### Example: Create

```python
card_sensitive_detail = client.CardSensitiveDetail().create({
    "encryptedPayload": "example_encryptedPayload",  # str
    "keyVersion": 1,  # int
})
```


### CardTransaction

Create an instance: `card_transaction = client.CardTransaction()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approvalCode` | `str | None` | Also called authorization code. |
| `arn` | `str | None` | Acquirer reference number |
| `authorisationMethod` | `str` | Authorisation method |
| `balanceChannelReferenceId` | `str | None` | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `dict` | Billing amount |
| `cardToken` | `str` | Unique identifier of the card |
| `creationTime` | `str` | When the transaction was created |
| `credits` | `list` | Array of credits. |
| `debits` | `list` | Array of debits. |
| `declineReason` | `str | None` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `str | None` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `list` | Array of fees |
| `id` | `int` | ID of the transaction |
| `merchant` | `dict` | Merchant information |
| `modificationTime` | `str` | When the transaction was last updated |
| `pinValidationResult` | `str | None` | PIN validation result. |
| `purgeTime` | `str | None` | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `dict | None` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `str` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `dict` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `dict` | Transaction amount including all fees |
| `type` | `str` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

#### Example: Load

```python
card_transaction = client.CardTransaction().load({"id": 1, "profile_id": 1})
```

#### Example: List

```python
card_transactions = client.CardTransaction().list({"card_token": "example", "profile_id": 1, "from_creation_time": "example", "to_creation_time": "example"})
```


### Case

Create an instance: `case = client.Case()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Timestamp when the case was created. |
| `description` | `str` | The description of the request. |
| `details` | `dict` | Details related to the case. |
| `externalId` | `str` | Partner-created identifier for this case, if applicable. |
| `id` | `int` | Unique identifier of the case. |
| `messages` | `list` | List of messages associated with this case. |
| `profileId` | `int` | The profile ID associated with this case. |
| `reference` | `dict` | Reference information linking the case to a related entity. |
| `status` | `str` | The current status of the support case. |
| `subType` | `str` | The sub-type of the support case. |
| `subject` | `str` | The subject of the case. |
| `type` | `str` | The type of the support case. |
| `updatedAt` | `str` | Timestamp when the case was last updated. |

#### Example: Load

```python
case = client.Case().load({"id": 1})
```

#### Example: Create

```python
case = client.Case().create({
})
```


### ClaimAccount

Create an instance: `claim_account = client.ClaimAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claimAccountCode` | `str` | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `str` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

#### Example: Create

```python
claim_account = client.ClaimAccount().create({
    "registrationCode": "example_registrationCode",  # str
})
```


### Comparison

Create an instance: `comparison = client.Comparison()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | The comparison amount |
| `amountType` | `str` | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `str | None` | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `list` | List of provider types included in the response |
| `providers` | `list` | List of providers with their estimated quotes |
| `sourceCountry` | `str | None` | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `str | None` | ISO 4217 source currency code |
| `targetCountry` | `str | None` | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `str | None` | ISO 4217 target currency code |

#### Example: Load

```python
comparison = client.Comparison().load({"source_currency": "source_currency", "target_currency": "target_currency"})
```


### Contact

Create an instance: `contact = client.Contact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contactId` | `str` | Contact ID in the format of UUID. |
| `identifier` | `str` | A Wise profile's identifier. |
| `name` | `str` | Full name of the contact. |
| `targetCurrency` | `str` | 3 character currency code. |

#### Example: Create

```python
contact = client.Contact().create({
    "profile_id": 1,  # int
    "is_direct_identifier_creation": True,  # bool
})
```


### Currency

Create an instance: `currency = client.Currency()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `list` | Keywords associated with this currency. |
| `name` | `str` | Display name of this currency. |
| `supportsDecimals` | `bool` | Whether this currency supports decimal values or not. |
| `symbol` | `str` | The symbol of this currency. |

#### Example: List

```python
currencys = client.Currency().list()
```


### DeliveryEstimate

Create an instance: `delivery_estimate = client.DeliveryEstimate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `estimatedDeliveryDate` | `str` | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `str` | A string to display to users for the estimated delivery date. |
| `id` | `str` |  |

#### Example: Load

```python
delivery_estimate = client.DeliveryEstimate().load({"id": 1})
```


### DeliveryUpdate

Create an instance: `delivery_update = client.DeliveryUpdate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery_update` | `str` | The delivery signal to simulate. |
| `delivery_update_path` | `list` | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `str | None` | Optional estimated delivery time. |
| `observation_id` | `str` | Server-generated observation identifier. |
| `occurred_at` | `str` | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `str | None` | Payment scheme to include in the observation. |

#### Example: Create

```python
delivery_update = client.DeliveryUpdate().create({
    "transfer_id": 1,  # int
    "delivery_update": "example_delivery_update",  # str
    "delivery_update_path": [],  # list
})
```


### DigitalWallet

Create an instance: `digital_wallet = client.DigitalWallet()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation` | `str` | Approve or decline a payment token activation |
| `paymentTokens` | `list` |  |
| `walletNames` | `list` | List of supported wallet types. |

#### Example: Create

```python
digital_wallet = client.DigitalWallet().create({
    "card_token": "example_card_token",  # str
    "profile_id": 1,  # int
    "activation": "example_activation",  # str
})
```


### DirectDebitAccount

Create an instance: `direct_debit_account = client.DirectDebitAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `str` | Currency of the bank account. |
| `details` | `dict` | Bank account details |
| `id` | `int` | Direct debit account ID |
| `type` | `str` | Payment type for which the account is used. |

#### Example: List

```python
direct_debit_accounts = client.DirectDebitAccount().list({"profile_id": 1, "currency": "example", "type": "example"})
```

#### Example: Create

```python
direct_debit_account = client.DirectDebitAccount().create({
    "profile_id": 1,  # int
})
```


### Director

Create an instance: `director = client.Director()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryOfResidenceIso3Code` | `str` | 3 character country code. |
| `dateOfBirth` | `str` | Date of birth. |
| `directors` | `list` |  |
| `firstName` | `str` | Director first name. |
| `id` | `int` | ID of the director. |
| `lastName` | `str` | Director last name. |

#### Example: List

```python
directors = client.Director().list({"profile_id": 1})
```

#### Example: Create

```python
director = client.Director().create({
    "profile_id": 1,  # int
})
```


### Dispute

Create an instance: `dispute = client.Dispute()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canWithdraw` | `bool` | Whether the dispute can be withdrawn. |
| `createdAt` | `str` | Time when the dispute was created. |
| `createdBy` | `str` | Creator of the dispute. |
| `disclaimer` | `dict` | Acknowledgement fields. |
| `files` | `dict` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `dict` | Form fields required to submit this dispute. |
| `id` | `str` | Unique identifier of the dispute. |
| `lastUpdatedAt` | `str` | Time when the dispute was last updated. |
| `profileId` | `int` | Profile ID. |
| `reason` | `str` | Dispute reason code. |
| `receipt` | `str` | The file to upload. |
| `status` | `str` | Dispute overall status. |
| `statusMessage` | `str` | Explanation for `subStatus`. |
| `subStatus` | `str` | Dispute detailed status. |
| `transaction` | `dict` | Transaction details for the dispute. |
| `transactionId` | `int` | Card transaction ID. |

#### Example: Load

```python
dispute = client.Dispute().load({"id": "dispute_id", "profile_id": 1})
```

#### Example: List

```python
disputes = client.Dispute().list({"profile_id": 1})
```

#### Example: Create

```python
dispute = client.Dispute().create({
    "profile_id": 1,  # int
})
```


### DisputeReason

Create an instance: `dispute_reason = client.DisputeReason()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` | The type of reasons available for the dispute. |
| `description` | `str` | The description of the dispute reason. |
| `isFraud` | `bool` | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `list` | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `bool` | Whether the dispute supports multiple transactions. |
| `tooltip` | `str` | Text to display when showing the dispute form to your users. |

#### Example: List

```python
dispute_reasons = client.DisputeReason().list({"profile_id": 1})
```


### Facetec

Create an instance: `facetec = client.Facetec()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
facetec = client.Facetec().load()
```


### File

Create an instance: `file = client.File()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Timestamp when the file was uploaded. |
| `file` | `str` | The file to upload. |
| `fileId` | `str` | Unique identifier of the uploaded file. |
| `fileName` | `str` | The name of the uploaded file. |
| `profileId` | `int` | The ID of the profile this file belongs to. |
| `purpose` | `str` | The purpose of the file upload. |
| `submissionData` | `dict` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

#### Example: List

```python
files = client.File().list()
```

#### Example: Create

```python
file = client.File().create({
    "createdAt": "example_createdAt",  # str
    "file": "example_file",  # str
    "fileId": "example_fileId",  # str
    "fileName": "example_fileName",  # str
    "profileId": 1,  # int
    "purpose": "example_purpose",  # str
    "submissionData": {},  # dict
})
```


### Funding

Create an instance: `funding = client.Funding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransactionId` | `int` |  |
| `status` | `str` |  |
| `type` | `str` |  |

#### Example: Create

```python
funding = client.Funding().create({
    "profile_id": 1,  # int
    "transfer_id": 1,  # int
})
```


### GpiTracking

Create an instance: `gpi_tracking = client.GpiTracking()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `identifier` | `str` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `str` | The type of identifier used to look up the transfer. |
| `transactions` | `list` | The matching GPI tracking transactions. |

#### Example: Create

```python
gpi_tracking = client.GpiTracking().create({
    "identifier": "example_identifier",  # str
    "identifierType": "example_identifierType",  # str
})
```


### HoldLimitBreach

Create an instance: `hold_limit_breach = client.HoldLimitBreach()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | Amount value. |
| `closingReason` | `str` | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `str` | Date when the hold limit breach was created. |
| `currency` | `str` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `int` | Hold limit breach ID. |
| `profileId` | `int` | ID of the profile that owns the hold limit breach |
| `state` | `str` | Current state of the hold limit breach. |
| `updatedAt` | `str` | Date when the hold limit breach was last modified. |

#### Example: List

```python
hold_limit_breachs = client.HoldLimitBreach().list({"profile_id": 1})
```


### IncomingTransfer

Create an instance: `incoming_transfer = client.IncomingTransfer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `str` | Account details ID that received the incoming transfer. |
| `amounts` | `dict` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `str` | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `str` | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `str` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `str` | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `dict` | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `dict` | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `str` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `float` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `dict` | Breakdown of fees applied to the incoming transfer. |
| `id` | `str` | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `list` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `int` | Profile ID of the balance owner. |
| `scheme` | `str` | The payment scheme through which the incoming transfer was received. |
| `state` | `str` | Current state of the incoming transfer. |
| `uetr` | `str` | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `str` | Unstructured remittance information provided by the debtor. |

#### Example: Load

```python
incoming_transfer = client.IncomingTransfer().load({"id": "incoming_transfer_id"})
```


### Jose

Create an instance: `jose = client.Jose()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `keyId` | `str` | ID of the key in UUID format. |
| `keyMaterial` | `dict` |  |
| `publicKeyMaterial` | `dict` |  |
| `scope` | `str` | Scope of the key. |
| `validFrom` | `str` | The key is valid from this date. |
| `validTill` | `str` | The key is valid until this date. |
| `version` | `int` | Version of the public key issued. |

#### Example: Load

```python
jose = client.Jose().load({"algorithm": "algorithm", "scope": "scope"})
```

#### Example: Create

```python
jose = client.Jose().create({
})
```


### KycReview

Create an instance: `kyc_review = client.KycReview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Timestamp marking the creation of the KYC Review. |
| `id` | `str` | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `dict | None` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `str | None` | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `str | None` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `list | None` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `str` | Aggregated state of the underlying requirement set. |
| `triggerData` | `dict` | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `list` | List of trigger reference objects. |
| `type` | `str` | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `str` | Timestamp marking the last update of the KYC Review. |

#### Example: Load

```python
kyc_review = client.KycReview().load({"id": "kyc_review_id", "profile_id": 1})
```

#### Example: List

```python
kyc_reviews = client.KycReview().list({"profile_id": 1})
```

#### Example: Create

```python
kyc_review = client.KycReview().create({
    "profile_id": 1,  # int
    "type": "example_type",  # str
})
```


### LinkRequest

Create an instance: `link_request = client.LinkRequest()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientKey` | `str` | Client key that created the embedded link request. |
| `email` | `str` | The end user's email address, to receive dispute updates. |
| `id` | `str` | Embedded link request ID. |
| `metadata` | `dict` | Flow-specific metadata. |
| `profileId` | `int` | Profile that owns the embedded flow. |
| `redirectUrl` | `str` | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `int` | The ID of the card transaction to dispute. |
| `type` | `str` | Embedded Flow type. |

#### Example: Load

```python
link_request = client.LinkRequest().load({"id": "link_request_id"})
```

#### Example: Create

```python
link_request = client.LinkRequest().create({
    "profile_id": 1,  # int
    "email": "example_email",  # str
    "redirectUrl": "example_redirectUrl",  # str
    "transactionId": 1,  # int
})
```


### Message

Create an instance: `message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `submissionData` | `dict` | The data for the message submission. |
| `type` | `str` | The type of message submission. |

#### Example: Create

```python
message = client.Message().create({
    "case_id": 1,  # int
    "submissionData": {},  # dict
    "type": "example_type",  # str
})
```


### MultiCurrencyAccount

Create an instance: `multi_currency_account = client.MultiCurrencyAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
multi_currency_account = client.MultiCurrencyAccount().load()
```


### OneTimeToken

Create an instance: `one_time_token = client.OneTimeToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challenges` | `list` | An array of challenges. |
| `faceMap` | `str` | A base64 encoded string. |
| `oneTimeToken` | `str` | A one-time token unique identifier. |
| `validity` | `int` | The One-Time Token expiration in seconds. |

#### Example: Create

```python
one_time_token = client.OneTimeToken().create({
    "profile_id": 1,  # int
})
```


### Ott

Create an instance: `ott = client.Ott()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actionType` | `str` | The action bound to the one time token. |
| `challenges` | `list` | Array of challenge objects. |
| `oneTimeToken` | `str` | Unique identifier of a one time token. |
| `userId` | `int` | Creator of this one time token. |
| `validity` | `int` | Seconds until the one time token becomes expired. |

#### Example: Load

```python
ott = client.Ott().load()
```


### Payin

Create an instance: `payin = client.Payin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` |  |
| `currency` | `str` |  |
| `details` | `dict` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `str` |  |
| `id` | `str` |  |
| `payinSessionId` | `str` |  |
| `paymentInstrumentId` | `str` |  |
| `qrCodeInBase64` | `str` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `str` |  |
| `status` | `str` |  |

#### Example: Create

```python
payin = client.Payin().create({
    "payin_session_id": "example_payin_session_id",  # str
    "profile_id": 1,  # int
    "payinSessionId": "example_payinSessionId",  # str
})
```


### PayinDepositDetail

Create an instance: `payin_deposit_detail = client.PayinDepositDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `payinBank` | `dict` | Information about the receiving bank. |
| `payinBankAccount` | `dict` | Bank account details to use to send the payment to. |
| `wiseInformation` | `dict` | Information about the receiving Wise entity, the owner of the bank account. |

#### Example: Load

```python
payin_deposit_detail = client.PayinDepositDetail().load({"profile_id": 1, "transfer_id": 1})
```


### Payment

Create an instance: `payment = client.Payment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | Transfer source amount |
| `currency` | `str` | Transfer source currency |
| `id` | `int` | Payment ID |
| `method` | `str` | The payment method used to pay for the transfer |
| `pricingVariant` | `str | None` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `str` | Date of when payment was created |
| `timeUpdated` | `str` | Date of when payment was updated |

#### Example: List

```python
payments = client.Payment().list({"transfer_id": 1})
```


### PaymentInitiation

Create an instance: `payment_initiation = client.PaymentInitiation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
payment_initiation = client.PaymentInitiation().load({"id": 1, "batch_group_id": "batch_group_id", "profile_id": 1})
```

#### Example: Create

```python
payment_initiation = client.PaymentInitiation().create({
    "batch_group_id": "example_batch_group_id",  # str
    "profile_id": 1,  # int
})
```


### PaymentInstrument

Create an instance: `payment_instrument = client.PaymentInstrument()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `str` |  |
| `accountNumber` | `str` |  |
| `accountOwnerDetails` | `dict` |  |
| `accountType` | `str` |  |
| `bankCode` | `str` |  |
| `bankName` | `str` |  |
| `branchCode` | `str` |  |
| `disconnectReason` | `str` |  |
| `id` | `str` |  |
| `reference` | `str` |  |
| `status` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
payment_instrument = client.PaymentInstrument().load({"id": "payment_instrument_id", "profile_id": 1})
```

#### Example: List

```python
payment_instruments = client.PaymentInstrument().list({"id": "example", "profile_id": 1})
```

#### Example: Create

```python
payment_instrument = client.PaymentInstrument().create({
    "profile_id": 1,  # int
    "accountNumber": "example_accountNumber",  # str
    "type": "example_type",  # str
})
```


### PaymentIntent

Create an instance: `payment_intent = client.PaymentIntent()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocationId` | `str` | Unique identifier of the associated settlement allocation. |
| `allocationType` | `str` | Type of allocation. |
| `createdAt` | `str` | Timestamp when the payment intent was created. |
| `fundingSource` | `str` | Source of funding for the payment. |
| `id` | `str` | Unique identifier of the payment intent. |
| `partnerEntityId` | `str` | Partner entity identifier. |
| `paymentReference` | `str` | Payment reference. |
| `profileId` | `str` | Profile identifier. |
| `reason` | `str` | Reason for the payment. |
| `recipientType` | `str` | Type of recipient. |
| `sourceAmount` | `float` | Source amount of the payment. |
| `sourceCurrency` | `str` | Source currency code (ISO 4217). |
| `state` | `str` | Current state of the payment intent. |
| `targetAmount` | `float` | Target amount of the payment. |
| `targetCurrency` | `str` | Target currency code (ISO 4217). |
| `updatedAt` | `str` | Timestamp when the payment intent was last updated. |

#### Example: Load

```python
payment_intent = client.PaymentIntent().load({"id": "payment_intent_id", "allocation_id": "allocation_id"})
```


### PhoneNumber

Create an instance: `phone_number = client.PhoneNumber()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `str` | Client ID of which this phone number belongs to. |
| `id` | `int` | ID of the phone number. |
| `phoneNumber` | `str` | A text representation of phone number. |
| `type` | `str` | Type of phone number when used in authentication. |
| `verified` | `bool` | Indicator if phone number is verified. |

#### Example: Create

```python
phone_number = client.PhoneNumber().create({
    "user_id": 1,  # int
})
```


### Production

Create an instance: `production = client.Production()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str | None` | Detailed description of the error code. |
| `errorCode` | `str | None` | Code returned when card production is not successful. |
| `kioskId` | `str | None` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `str` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `str` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

#### Example: Load

```python
production = client.Production().load({"card_token": "card_token", "profile_id": 1})
```


### Profile

Create an instance: `profile = client.Profile()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `dict` |  |
| `avatar` | `str` |  |
| `contactDetails` | `dict` |  |
| `createdAt` | `str` |  |
| `currentState` | `str` |  |
| `dateOfBirth` | `str` |  |
| `email` | `str` |  |
| `firstName` | `str` |  |
| `fullName` | `str` |  |
| `id` | `int` |  |
| `lastName` | `str` |  |
| `phoneNumber` | `str` |  |
| `preferredName` | `str` |  |
| `publicId` | `str` |  |
| `secondaryAddresses` | `list` |  |
| `type` | `str` |  |
| `updatedAt` | `str` |  |
| `userId` | `int` |  |

#### Example: Load

```python
profile = client.Profile().load({"id": 1})
```

#### Example: List

```python
profiles = client.Profile().list()
```


### Quote

Create an instance: `quote = client.Quote()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdTime` | `str` | Quote created timestamp. |
| `creationContext` | `dict` | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `str` | The date and time the quote expires. |
| `guaranteedTargetAmount` | `bool` | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `bool` | Indicates whether guaranteed target amount is allowed. |
| `id` | `str` | ID of this quote (GUID format). |
| `notices` | `list` | Messages to display to the user. |
| `payOut` | `str` | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `dict` | _Optional_. |
| `paymentOptions` | `list` | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `str` | Preferred pay-in method. |
| `pricingConfiguration` | `dict` | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `int` | Personal or business profile ID. |
| `providedAmountType` | `str` | Indicates whether the quote was created as source or target. |
| `rate` | `float` | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `str` | Date and time the locked rate expires. |
| `rateType` | `str` | Whether the rate is fixed or floating. |
| `sourceAmount` | `float` | Amount in source currency to send. |
| `sourceCurrency` | `str` | Source (sending) currency code. |
| `status` | `str` | Current status of the quote. |
| `targetAccount` | `int` | _Optional_. |
| `targetAmount` | `float` | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `bool` | Indicates whether target amount is allowed. |
| `targetCurrency` | `str` | Target (receive) currency code. |
| `user` | `int` | User ID that created the quote. |

#### Example: Load

```python
quote = client.Quote().load({"id": "quote_id", "profile_id": 1})
```

#### Example: Create

```python
quote = client.Quote().create({
    "sourceCurrency": "example_sourceCurrency",  # str
    "targetCurrency": "example_targetCurrency",  # str
})
```


### Rate

Create an instance: `rate = client.Rate()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `float` | Exchange rate value. |
| `source` | `str` | Source (send) currency code. |
| `target` | `str` | Target (receive) currency code. |
| `time` | `str` | Timestamp for exchange rate. |

#### Example: List

```python
rates = client.Rate().list()
```


### Recipient

Create an instance: `recipient = client.Recipient()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptedOutcomes` | `bool` | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `str` | Recipient full name. |
| `accountId` | `int` | Recipient account ID. |
| `accountSummary` | `str` | Summary of account details for ease of lookup. |
| `active` | `bool` | Status of the recipient account. |
| `commonFieldMap` | `dict` | Map of key lookup fields for the account. |
| `confirmations` | `dict` | Contains verification results for the recipient's details. |
| `country` | `str` | 2-character country code. |
| `creatorId` | `int` | Account entity that owns the recipient account. |
| `currency` | `str` | 3-character currency code. |
| `details` | `dict` | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `list` | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `str` | Account hash for tracking changes to recipient details. |
| `id` | `int` | ID of the recipient. |
| `isInternal` | `bool` | Indicates whether recipient is internal. |
| `legalEntityType` | `str` | Entity type of recipient account. |
| `longAccountSummary` | `str` | Longer account details summary. |
| `name` | `dict` | Recipient name details. |
| `ownedByCustomer` | `bool` | Inidicates if recipient account belongs to profile owner. |
| `profile` | `int` | Personal or business profile ID of the sender. |
| `profileId` | `int` | Specific profile that owns the recipient account. |
| `quoteId` | `str` | Quote ID. |
| `type` | `str` | Recipient account type. |
| `ultimateBeneficiary` | `dict | None` | The details for the ultimate beneficiary of this recipient. |

#### Example: Load

```python
recipient = client.Recipient().load({"account_id": 1})
```

#### Example: List

```python
recipients = client.Recipient().list()
```

#### Example: Create

```python
recipient = client.Recipient().create({
    "acceptedOutcomes": True,  # bool
    "ultimateBeneficiary": {},  # dict | None
})
```


### Rule

Create an instance: `rule = client.Rule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | The description of the authorisation rule. |
| `id` | `int` | The unique ID for the authorisation rule. |
| `operation` | `str` | Determines whether the transactions should be allowed or blocked. |
| `type` | `str` | The type of authorisation rule. |
| `values` | `list` | A list of values based on the `type` of rule configured. |

#### Example: List

```python
rules = client.Rule().list({"application_id": "example"})
```

#### Example: Create

```python
rule = client.Rule().create({
    "application_id": "example_application_id",  # str
})
```


### Saml

Create an instance: `saml = client.Saml()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `RelayState` | `str` | Opaque state value. |
| `SAMLResponse` | `str` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

#### Example: Load

```python
saml = client.Saml().load({"registration_id": "registration_id"})
```

#### Example: Create

```python
saml = client.Saml().create({
    "SAMLResponse": "example_SAMLResponse",  # str
})
```


### ScaDeviceFingerprint

Create an instance: `sca_device_fingerprint = client.ScaDeviceFingerprint()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `str` | The identifier of the device fingerprint. |
| `id` | `str` |  |

#### Example: Create

```python
sca_device_fingerprint = client.ScaDeviceFingerprint().create({
    "profile_id": 1,  # int
})
```


### ScaFacemap

Create an instance: `sca_facemap = client.ScaFacemap()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `faceMap` | `str` | A base64 encoded string. |

#### Example: Create

```python
sca_facemap = client.ScaFacemap().create({
    "profile_id": 1,  # int
})
```


### ScaOtp

Create an instance: `sca_otp = client.ScaOtp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |


### ScaSession

Create an instance: `sca_session = client.ScaSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
sca_session = client.ScaSession().create({
    "profile_id": 1,  # int
})
```


### SettlementAllocation

Create an instance: `settlement_allocation = client.SettlementAllocation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `dict` |  |
| `createdAt` | `str` | Timestamp when the settlement allocation was created. |
| `currency` | `str` | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `float` | Expected total amount for the allocation. |
| `file` | `str` | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `str` | Unique identifier of the settlement allocation. |
| `nextPageToken` | `str` | Token for fetching the next page of payment intents. |
| `paymentIntents` | `list` | List of payment intents associated with the allocation. |
| `paymentReference` | `str` | Unique payment reference for the settlement allocation. |
| `state` | `str` | Current state of the settlement allocation. |
| `updatedAt` | `str` | Timestamp when the settlement allocation was last updated. |

#### Example: Load

```python
settlement_allocation = client.SettlementAllocation().load({"id": "settlement_allocation_id"})
```

#### Example: Create

```python
settlement_allocation = client.SettlementAllocation().create({
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


### Simulation

Create an instance: `simulation = client.Simulation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `str` |  |
| `created` | `str` |  |
| `creationTime` | `float` | Time when the card transaction was created. |
| `description` | `str | None` | Description of the KYC review item. |
| `details` | `dict` |  |
| `failure_reason_code` | `str` | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `bool` |  |
| `id` | `str` |  |
| `key` | `str` | KYC review item key. |
| `quote` | `int` |  |
| `rate` | `float` |  |
| `reference` | `str` |  |
| `sourceAccount` | `str` |  |
| `sourceCurrency` | `str` |  |
| `sourceValue` | `int` |  |
| `state` | `str` | State of the KYC review item. |
| `status` | `str` |  |
| `targetAccount` | `int` |  |
| `targetCurrency` | `str` |  |
| `targetValue` | `float` |  |
| `transactionId` | `int` | ID of the transaction. |
| `transferRequest` | `str` |  |
| `user` | `int` |  |
| `wise_id` | `int` |  |

#### Example: Load

```python
simulation = client.Simulation().load({"status": "status", "transfer_id": 1})
```

#### Example: List

```python
simulations = client.Simulation().list({"card_token": "example", "profile_id": 1})
```

#### Example: Create

```python
simulation = client.Simulation().create({
    "transfer_id": 1,  # int
})
```


### SpendControl

Create an instance: `spend_control = client.SpendControl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ruleId` | `int` | The ID of the applied authorisation rule. |

#### Example: List

```python
spend_controls = client.SpendControl().list({"application_id": "example"})
```


### SpendLimit

Create an instance: `spend_limit = client.SpendLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `dict` |  |
| `id` | `str` |  |
| `type` | `str` | The type of transaction. |

#### Example: List

```python
spend_limits = client.SpendLimit().list({"profile_id": 1})
```


### Subscription

Create an instance: `subscription = client.Subscription()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Timestamp of when the subscription was created. |
| `created_by` | `dict` |  |
| `delivery` | `dict` |  |
| `id` | `str` | UUID that uniquely identifies the subscription. |
| `name` | `str` | A custom name for your webhook to ease with identification. |
| `scope` | `dict` |  |
| `trigger_on` | `str` | The event type this subscription is listening for. |

#### Example: Load

```python
subscription = client.Subscription().load({"id": "subscription_id", "client_key": "client_key"})
```

#### Example: List

```python
subscriptions = client.Subscription().list({"client_key": "example"})
```

#### Example: Create

```python
subscription = client.Subscription().create({
    "client_key": "example_client_key",  # str
    "delivery": {},  # dict
    "name": "example_name",  # str
    "trigger_on": "example_trigger_on",  # str
})
```


### TestNotification

Create an instance: `test_notification = client.TestNotification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Timestamp of when the test notification was created. |
| `delivery_id` | `str` | ID of the delivery that was queued for sending. |

#### Example: Create

```python
test_notification = client.TestNotification().create({
    "client_key": "example_client_key",  # str
    "subscription_id": "example_subscription_id",  # str
})
```


### ThirdPartyTransfer

Create an instance: `third_party_transfer = client.ThirdPartyTransfer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `str` | Timestamp when transfer was created. |
| `details` | `dict` | Payment Details |
| `hasActiveIssues` | `bool` | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | Transfer ID |
| `originalTransferId` | `str` | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `dict` | Data block to capture payment originator details |
| `quote` | `str` | Quote ID |
| `rate` | `float` | Exchange rate value |
| `sourceAccount` | `int` | Refund recipient account ID |
| `sourceCurrency` | `str` | Source currency code |
| `sourceValue` | `float` | Transfer amount in source currency |
| `status` | `str` | Transfer current status. |
| `targetAccount` | `int` | Recipient account ID |
| `targetCurrency` | `str` | Target currency code |
| `targetValue` | `float` | Transfer amount in target currency |
| `user` | `int` | Your user ID |

#### Example: Load

```python
third_party_transfer = client.ThirdPartyTransfer().load({"id": 1, "profile_id": 1})
```

#### Example: Create

```python
third_party_transfer = client.ThirdPartyTransfer().create({
    "profile_id": 1,  # int
    "details": {},  # dict
    "originalTransferId": "example_originalTransferId",  # str
    "originator": {},  # dict
    "quote": "example_quote",  # str
    "targetAccount": 1,  # int
})
```


### ThreeDSecure

Create an instance: `three_d_secure = client.ThreeDSecure()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challengeStatus` | `str` | The customer's response to the 3DS challenge. |
| `transactionReference` | `str` | Transaction reference as received in the 3DS challenge webhook event. |

#### Example: Create

```python
three_d_secure = client.ThreeDSecure().create({
    "profile_id": 1,  # int
    "challengeStatus": "example_challengeStatus",  # str
    "transactionReference": "example_transactionReference",  # str
})
```


### Token

Create an instance: `token = client.Token()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `str` | Access token to be used when calling the API. |
| `created_at` | `str` | Token creation time in ISO 8601 format. |
| `expires_at` | `str` | Access token expiration timestamp (UTC). |
| `expires_in` | `int` | Access token expiry time in seconds. |
| `refresh_token` | `str` | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `str` | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `int` | Refresh token expiry time in seconds. |
| `scope` | `str` | Scope of the token. |
| `token_type` | `str` | Type of the token. |

#### Example: Create

```python
token = client.Token().create({
})
```


### Transfer

Create an instance: `transfer = client.Transfer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `int | None` | Your business profile ID |
| `created` | `str` | Timestamp when transfer was created |
| `customerTransactionId` | `str` | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `dict` |  |
| `hasActiveIssues` | `bool` | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | Transfer ID |
| `payinSessionId` | `str` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `int | None` | V1 quote ID |
| `quoteUuid` | `str` | V2 quote ID |
| `rate` | `float` | Exchange rate value |
| `reference` | `str` | Deprecated, use `details.reference` instead |
| `sourceAccount` | `int | None` | Refund recipient account ID |
| `sourceCurrency` | `str` | Source currency code |
| `sourceValue` | `float` | Transfer amount in source currency |
| `status` | `str` | Transfer current status. |
| `targetAccount` | `int` | Recipient account ID |
| `targetCurrency` | `str` | Target currency code |
| `targetValue` | `float` | Transfer amount in target currency |
| `transferRequest` | `int | None` | Deprecated |
| `user` | `int` | Your user ID |

#### Example: Load

```python
transfer = client.Transfer().load({"id": 1})
```

#### Example: List

```python
transfers = client.Transfer().list()
```

#### Example: Create

```python
transfer = client.Transfer().create({
    "customerTransactionId": "example_customerTransactionId",  # str
    "quoteUuid": "example_quoteUuid",  # str
    "targetAccount": 1,  # int
})
```


### TransferRequirement

Create an instance: `transfer_requirement = client.TransferRequirement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerTransactionId` | `str` | Unique identifier for the transfer request |
| `details` | `dict` |  |
| `originatorLegalEntityType` | `str` | Type of sender. |
| `quoteUuid` | `str` | V2 quote ID |
| `targetAccount` | `int` | Recipient account ID |

#### Example: Create

```python
transfer_requirement = client.TransferRequirement().create({
    "quoteUuid": "example_quoteUuid",  # str
    "targetAccount": 1,  # int
})
```


### Ubo

Create an instance: `ubo = client.Ubo()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressFirstLine` | `str` | First line of address. |
| `city` | `str` | City of residential address. |
| `countryOfResidenceIso3Code` | `str` | 3 character country code. |
| `dateOfBirth` | `str` | Date of birth. |
| `id` | `str` | ID of the ultimate beneficial owner. |
| `name` | `str` | Owner full name. |
| `ownershipPercentage` | `int` | Percentage of ownership. |
| `postCode` | `str` | Address post code. |
| `state` | `str` | State or region of residential address. |
| `ubos` | `list` |  |

#### Example: List

```python
ubos = client.Ubo().list({"profile_id": 1})
```

#### Example: Create

```python
ubo = client.Ubo().create({
    "profile_id": 1,  # int
})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | If user is active or not. |
| `details` | `dict | None` | User details. |
| `email` | `str` | User's email. |
| `id` | `int` | User ID. |
| `language` | `str` | User default language for UI and email communication. |
| `name` | `str | None` | User's full name. |
| `registrationCode` | `str` | Randomly generated registration code that is unique to this user and request. |

#### Example: Load

```python
user = client.User().load({"id": 1})
```

#### Example: Create

```python
user = client.User().create({
    "email": "example_email",  # str
    "registrationCode": "example_registrationCode",  # str
})
```


### Verification

Create an instance: `verification = client.Verification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `required_evidences` | `list` | List of evidence types required to complete verification. |

#### Example: List

```python
verifications = client.Verification().list({"profile_id": 1})
```

#### Example: Create

```python
verification = client.Verification().create({
    "profile_id": 1,  # int
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── wise_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`wise_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
comparison = client.Comparison()
comparison.load({"source_currency": "example", "target_currency": "example"})

# comparison.data_get() now returns the comparison data from the last load
# comparison.match_get() returns the last match criteria
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
