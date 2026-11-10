# Wise TypeScript SDK



The TypeScript SDK for the Wise API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AccountDetail()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/wise-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/wise-sdk
npm install ./wise-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { WiseSDK } from '@voxgig-sdk/wise-sdk'

const client = new WiseSDK({
  apikey: process.env.WISE_APIKEY,
})
```

### 3. Load a balance

Balance is nested under currency, so provide the `currency`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const balance = await client.Balance().load({
    currency: 'example_currency',
    profile_id: 1,
  })
  console.log(balance.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const comparison = await client.Comparison().load({ source_currency: "example", target_currency: "example" })
  console.log(comparison.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = WiseSDK.test()

const comparison = await client.Comparison().load({ source_currency: 'example_source_currency', target_currency: 'example_target_currency' })
// comparison is the Comparison entity; .data() reads its mock record
console.log(comparison.data())
```

You can also use the instance method:

```ts
const client = new WiseSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Comparison()

// First call runs the operation and stores its result
await entity.load({ source_currency: 'example_source_currency', target_currency: 'example_target_currency' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new WiseSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### WiseSDK

#### Constructor

```ts
new WiseSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AccountDetail(data?)` | `AccountDetailEntity` | Create an AccountDetail entity instance. |
| `AccountRequirement(data?)` | `AccountRequirementEntity` | Create an AccountRequirement entity instance. |
| `Activity(data?)` | `ActivityEntity` | Create an Activity entity instance. |
| `Address(data?)` | `AddressEntity` | Create an Address entity instance. |
| `AddressRequirement(data?)` | `AddressRequirementEntity` | Create an AddressRequirement entity instance. |
| `Balance(data?)` | `BalanceEntity` | Create a Balance entity instance. |
| `BalanceStatement(data?)` | `BalanceStatementEntity` | Create a BalanceStatement entity instance. |
| `BankAccountDetail(data?)` | `BankAccountDetailEntity` | Create a BankAccountDetail entity instance. |
| `BankAccountDetailsOrder(data?)` | `BankAccountDetailsOrderEntity` | Create a BankAccountDetailsOrder entity instance. |
| `BatchGroup(data?)` | `BatchGroupEntity` | Create a BatchGroup entity instance. |
| `BulkSettlement(data?)` | `BulkSettlementEntity` | Create a BulkSettlement entity instance. |
| `BusinessProfile(data?)` | `BusinessProfileEntity` | Create a BusinessProfile entity instance. |
| `Card(data?)` | `CardEntity` | Create a Card entity instance. |
| `CardHolderLimit(data?)` | `CardHolderLimitEntity` | Create a CardHolderLimit entity instance. |
| `CardLimit(data?)` | `CardLimitEntity` | Create a CardLimit entity instance. |
| `CardOrder(data?)` | `CardOrderEntity` | Create a CardOrder entity instance. |
| `CardSensitiveDetail(data?)` | `CardSensitiveDetailEntity` | Create a CardSensitiveDetail entity instance. |
| `CardTransaction(data?)` | `CardTransactionEntity` | Create a CardTransaction entity instance. |
| `Case(data?)` | `CaseEntity` | Create a Case entity instance. |
| `ClaimAccount(data?)` | `ClaimAccountEntity` | Create a ClaimAccount entity instance. |
| `Comparison(data?)` | `ComparisonEntity` | Create a Comparison entity instance. |
| `Contact(data?)` | `ContactEntity` | Create a Contact entity instance. |
| `Currency(data?)` | `CurrencyEntity` | Create a Currency entity instance. |
| `DeliveryEstimate(data?)` | `DeliveryEstimateEntity` | Create a DeliveryEstimate entity instance. |
| `DeliveryUpdate(data?)` | `DeliveryUpdateEntity` | Create a DeliveryUpdate entity instance. |
| `DigitalWallet(data?)` | `DigitalWalletEntity` | Create a DigitalWallet entity instance. |
| `DirectDebitAccount(data?)` | `DirectDebitAccountEntity` | Create a DirectDebitAccount entity instance. |
| `Director(data?)` | `DirectorEntity` | Create a Director entity instance. |
| `Dispute(data?)` | `DisputeEntity` | Create a Dispute entity instance. |
| `DisputeReason(data?)` | `DisputeReasonEntity` | Create a DisputeReason entity instance. |
| `Facetec(data?)` | `FacetecEntity` | Create a Facetec entity instance. |
| `File(data?)` | `FileEntity` | Create a File entity instance. |
| `Funding(data?)` | `FundingEntity` | Create a Funding entity instance. |
| `GpiTracking(data?)` | `GpiTrackingEntity` | Create a GpiTracking entity instance. |
| `HoldLimitBreach(data?)` | `HoldLimitBreachEntity` | Create a HoldLimitBreach entity instance. |
| `IncomingTransfer(data?)` | `IncomingTransferEntity` | Create an IncomingTransfer entity instance. |
| `Jose(data?)` | `JoseEntity` | Create a Jose entity instance. |
| `KycReview(data?)` | `KycReviewEntity` | Create a KycReview entity instance. |
| `LinkRequest(data?)` | `LinkRequestEntity` | Create a LinkRequest entity instance. |
| `Message(data?)` | `MessageEntity` | Create a Message entity instance. |
| `MultiCurrencyAccount(data?)` | `MultiCurrencyAccountEntity` | Create a MultiCurrencyAccount entity instance. |
| `OneTimeToken(data?)` | `OneTimeTokenEntity` | Create an OneTimeToken entity instance. |
| `Ott(data?)` | `OttEntity` | Create an Ott entity instance. |
| `Payin(data?)` | `PayinEntity` | Create a Payin entity instance. |
| `PayinDepositDetail(data?)` | `PayinDepositDetailEntity` | Create a PayinDepositDetail entity instance. |
| `Payment(data?)` | `PaymentEntity` | Create a Payment entity instance. |
| `PaymentInitiation(data?)` | `PaymentInitiationEntity` | Create a PaymentInitiation entity instance. |
| `PaymentInstrument(data?)` | `PaymentInstrumentEntity` | Create a PaymentInstrument entity instance. |
| `PaymentIntent(data?)` | `PaymentIntentEntity` | Create a PaymentIntent entity instance. |
| `PhoneNumber(data?)` | `PhoneNumberEntity` | Create a PhoneNumber entity instance. |
| `Production(data?)` | `ProductionEntity` | Create a Production entity instance. |
| `Profile(data?)` | `ProfileEntity` | Create a Profile entity instance. |
| `Quote(data?)` | `QuoteEntity` | Create a Quote entity instance. |
| `Rate(data?)` | `RateEntity` | Create a Rate entity instance. |
| `Recipient(data?)` | `RecipientEntity` | Create a Recipient entity instance. |
| `Rule(data?)` | `RuleEntity` | Create a Rule entity instance. |
| `Saml(data?)` | `SamlEntity` | Create a Saml entity instance. |
| `ScaDeviceFingerprint(data?)` | `ScaDeviceFingerprintEntity` | Create a ScaDeviceFingerprint entity instance. |
| `ScaFacemap(data?)` | `ScaFacemapEntity` | Create a ScaFacemap entity instance. |
| `ScaOtp(data?)` | `ScaOtpEntity` | Create a ScaOtp entity instance. |
| `ScaSession(data?)` | `ScaSessionEntity` | Create a ScaSession entity instance. |
| `SettlementAllocation(data?)` | `SettlementAllocationEntity` | Create a SettlementAllocation entity instance. |
| `Simulation(data?)` | `SimulationEntity` | Create a Simulation entity instance. |
| `SpendControl(data?)` | `SpendControlEntity` | Create a SpendControl entity instance. |
| `SpendLimit(data?)` | `SpendLimitEntity` | Create a SpendLimit entity instance. |
| `Subscription(data?)` | `SubscriptionEntity` | Create a Subscription entity instance. |
| `TestNotification(data?)` | `TestNotificationEntity` | Create a TestNotification entity instance. |
| `ThirdPartyTransfer(data?)` | `ThirdPartyTransferEntity` | Create a ThirdPartyTransfer entity instance. |
| `ThreeDSecure(data?)` | `ThreeDSecureEntity` | Create a ThreeDSecure entity instance. |
| `Token(data?)` | `TokenEntity` | Create a Token entity instance. |
| `Transfer(data?)` | `TransferEntity` | Create a Transfer entity instance. |
| `TransferRequirement(data?)` | `TransferRequirementEntity` | Create a TransferRequirement entity instance. |
| `Ubo(data?)` | `UboEntity` | Create an Ubo entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `Verification(data?)` | `VerificationEntity` | Create a Verification entity instance. |
| `tester(testopts?, sdkopts?)` | `WiseSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `WiseSDK.test(testopts?, sdkopts?)` | `WiseSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): WiseSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

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

Operations: create, list.

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

Operations: list.

API path: `/profiles/{profileId}/activities`

#### Address

| Field | Description |
| --- | --- |
| `details` | Address details. |
| `id` | Address ID. |
| `profile` | User profile ID. |

Operations: create, list, load.

API path: `/addresses`

#### AddressRequirement

| Field | Description |
| --- | --- |
| `details` | Address details to provide context for requirements lookup. |
| `fields` | List of fields required for the address. |
| `profile` | User profile ID. |
| `type` | Always "address". |

Operations: create, list.

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

Operations: create, list, load, remove.

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

Operations: load.

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

Operations: create.

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

Operations: create, list.

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

Operations: create, load, update.

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

Operations: create.

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

Operations: create, update.

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

Operations: create, list, load, update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count`

#### CardHolderLimit

| Field | Description |
| --- | --- |
| `aggregateWindow` | The limits to set, per aggregation window. |
| `spendLimits` | Spend limits configured for this cardholder. |
| `type` | The category of spending the limit applies to. |

Operations: list, remove, update.

API path: `/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits`

#### CardLimit

| Field | Description |
| --- | --- |
| `daily` |  |
| `lifetime` |  |
| `monthly` |  |
| `transaction` |  |

Operations: load, update.

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

Operations: create, list, load, update.

API path: `/spend/profiles/{profileId}/card-orders`

#### CardSensitiveDetail

| Field | Description |
| --- | --- |
| `encryptedPayload` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | The RSA public key. |
| `keyVersion` | The version of the key to use. |
| `version` | Version of the encryption key. |

Operations: create, load.

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

Operations: list, load.

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

Operations: create, load.

API path: `/cases`

#### ClaimAccount

| Field | Description |
| --- | --- |
| `claimAccountCode` | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

Operations: create.

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

Operations: load.

API path: `/comparisons`

#### Contact

| Field | Description |
| --- | --- |
| `contactId` | Contact ID in the format of UUID. |
| `identifier` | A Wise profile's identifier. |
| `name` | Full name of the contact. |
| `targetCurrency` | 3 character currency code. |

Operations: create.

API path: `/profiles/{profileId}/contacts`

#### Currency

| Field | Description |
| --- | --- |
| `code` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | Keywords associated with this currency. |
| `name` | Display name of this currency. |
| `supportsDecimals` | Whether this currency supports decimal values or not. |
| `symbol` | The symbol of this currency. |

Operations: list.

API path: `/currencies`

#### DeliveryEstimate

| Field | Description |
| --- | --- |
| `estimatedDeliveryDate` | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | A string to display to users for the estimated delivery date. |
| `id` |  |

Operations: load.

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

Operations: create.

API path: `/simulation/transfers/{transferId}/delivery-update`

#### DigitalWallet

| Field | Description |
| --- | --- |
| `activation` | Approve or decline a payment token activation |
| `paymentTokens` |  |
| `walletNames` | List of supported wallet types. |

Operations: create.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation`

#### DirectDebitAccount

| Field | Description |
| --- | --- |
| `currency` | Currency of the bank account. |
| `details` | Bank account details |
| `id` | Direct debit account ID |
| `type` | Payment type for which the account is used. |

Operations: create, list.

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

Operations: create, list, remove, update.

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

Operations: create, list, load, update.

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

Operations: list.

API path: `/spend/profiles/{profileId}/dispute-form/reasons`

#### Facetec

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: create, list.

API path: `/cases/files`

#### Funding

| Field | Description |
| --- | --- |
| `balanceTransactionId` |  |
| `status` |  |
| `type` |  |

Operations: create.

API path: `/profiles/{profileId}/transfers/{transferId}/payments`

#### GpiTracking

| Field | Description |
| --- | --- |
| `identifier` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | The type of identifier used to look up the transfer. |
| `transactions` | The matching GPI tracking transactions. |

Operations: create.

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

Operations: list.

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

Operations: load.

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

Operations: create, load.

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

Operations: create, list, load, update.

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

Operations: create, load.

API path: `/profiles/{profileId}/embedded-flows/link-requests/kyc-reviews`

#### Message

| Field | Description |
| --- | --- |
| `submissionData` | The data for the message submission. |
| `type` | The type of message submission. |

Operations: create.

API path: `/cases/{caseId}/messages`

#### MultiCurrencyAccount

| Field | Description |
| --- | --- |

Operations: list, load.

API path: `/borderless-accounts-configuration/profiles/{profileId}/available-currencies`

#### OneTimeToken

| Field | Description |
| --- | --- |
| `challenges` | An array of challenges. |
| `faceMap` | A base64 encoded string. |
| `oneTimeToken` | A one-time token unique identifier. |
| `validity` | The One-Time Token expiration in seconds. |

Operations: create.

API path: `/profiles/{profileId}/device-fingerprints/verify`

#### Ott

| Field | Description |
| --- | --- |
| `actionType` | The action bound to the one time token. |
| `challenges` | Array of challenge objects. |
| `oneTimeToken` | Unique identifier of a one time token. |
| `userId` | Creator of this one time token. |
| `validity` | Seconds until the one time token becomes expired. |

Operations: create, load.

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

Operations: create.

API path: `/profiles/{profileId}/payin-sessions/{payinSessionId}/paynow`

#### PayinDepositDetail

| Field | Description |
| --- | --- |
| `payinBank` | Information about the receiving bank. |
| `payinBankAccount` | Bank account details to use to send the payment to. |
| `wiseInformation` | Information about the receiving Wise entity, the owner of the bank account. |

Operations: load.

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

Operations: list.

API path: `/transfers/{transferId}/payments`

#### PaymentInitiation

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load.

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

Operations: create, list, load.

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

Operations: load.

API path: `/settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}`

#### PhoneNumber

| Field | Description |
| --- | --- |
| `clientId` | Client ID of which this phone number belongs to. |
| `id` | ID of the phone number. |
| `phoneNumber` | A text representation of phone number. |
| `type` | Type of phone number when used in authentication. |
| `verified` | Indicator if phone number is verified. |

Operations: create.

API path: `/application/users/{userId}/phone-numbers`

#### Production

| Field | Description |
| --- | --- |
| `description` | Detailed description of the error code. |
| `errorCode` | Code returned when card production is not successful. |
| `kioskId` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

Operations: load, update.

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

Operations: create, list, load, remove, update.

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

Operations: create, load, update.

API path: `/profiles/{profileId}/quotes`

#### Rate

| Field | Description |
| --- | --- |
| `rate` | Exchange rate value. |
| `source` | Source (send) currency code. |
| `target` | Target (receive) currency code. |
| `time` | Timestamp for exchange rate. |

Operations: list.

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

Operations: create, list, load, remove, update.

API path: `/accounts/{accountId}/quotes/{quoteId}/compatibility`

#### Rule

| Field | Description |
| --- | --- |
| `description` | The description of the authorisation rule. |
| `id` | The unique ID for the authorisation rule. |
| `operation` | Determines whether the transactions should be allowed or blocked. |
| `type` | The type of authorisation rule. |
| `values` | A list of values based on the `type` of rule configured. |

Operations: create, list.

API path: `/spend/applications/{clientId}/spend-controls/rules`

#### Saml

| Field | Description |
| --- | --- |
| `RelayState` | Opaque state value. |
| `SAMLResponse` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

Operations: create, load.

API path: `/login/saml2/sso`

#### ScaDeviceFingerprint

| Field | Description |
| --- | --- |
| `createdAt` | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | The identifier of the device fingerprint. |
| `id` |  |

Operations: create, remove.

API path: `/profiles/{profileId}/device-fingerprints`

#### ScaFacemap

| Field | Description |
| --- | --- |
| `faceMap` | A base64 encoded string. |

Operations: create, remove.

API path: `/profiles/{profileId}/facemaps`

#### ScaOtp

| Field | Description |
| --- | --- |

Operations: create, remove.

API path: `/one-time-token/sms/trigger`

#### ScaSession

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: create, load.

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

Operations: create, list, load.

API path: `/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation`

#### SpendControl

| Field | Description |
| --- | --- |
| `ruleId` | The ID of the applied authorisation rule. |

Operations: create, list, remove.

API path: `/spend/applications/{clientId}/spend-controls/rules/apply`

#### SpendLimit

| Field | Description |
| --- | --- |
| `aggregateWindow` |  |
| `id` |  |
| `type` | The type of transaction. |

Operations: list, remove, update.

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

Operations: create, list, load, remove.

API path: `/applications/{clientKey}/subscriptions`

#### TestNotification

| Field | Description |
| --- | --- |
| `created_at` | Timestamp of when the test notification was created. |
| `delivery_id` | ID of the delivery that was queued for sending. |

Operations: create.

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

Operations: create, load.

API path: `/profiles/{profileId}/third-party-transfers`

#### ThreeDSecure

| Field | Description |
| --- | --- |
| `challengeStatus` | The customer's response to the 3DS challenge. |
| `transactionReference` | Transaction reference as received in the 3DS challenge webhook event. |

Operations: create.

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

Operations: create.

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

Operations: create, list, load, update.

API path: `/transfers`

#### TransferRequirement

| Field | Description |
| --- | --- |
| `customerTransactionId` | Unique identifier for the transfer request |
| `details` |  |
| `originatorLegalEntityType` | Type of sender. |
| `quoteUuid` | V2 quote ID |
| `targetAccount` | Recipient account ID |

Operations: create.

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

Operations: create, list, update.

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

Operations: create, load, update.

API path: `/user/signup/registration_code`

#### Verification

| Field | Description |
| --- | --- |
| `required_evidences` | List of evidence types required to complete verification. |

Operations: create, list.

API path: `/profiles/{profileId}/additional-verification/upload-evidences`



## Entities


### AccountDetail

Create an instance: `const account_detail = client.AccountDetail()`

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

```ts
const account_detail = await client.AccountDetail().load({ id: 1 })
```


### AccountRequirement

Create an instance: `const account_requirement = client.AccountRequirement()`

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
| `details` | `Record<string, any>` | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `any[]` | List of UI field groups to collect required data. |
| `ownedByCustomer` | `boolean` | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `number` | Personal or business profile ID of the sender. |
| `title` | `string` | Human-readable title for the requirement group. |
| `type` | `string` | Recipient account type. |
| `ultimateBeneficiary` | `Record<string, any> | null` | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | Optional usage/help text. |

#### Example: List

```ts
const account_requirements = await client.AccountRequirement().list({ quote_id: "example" })
```

#### Example: Create

```ts
const account_requirement = await client.AccountRequirement().create({
  quote_id: 'example_quote_id',
  ultimateBeneficiary: {},
})
```


### Activity

Create an instance: `const activity = client.Activity()`

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
| `resource` | `Record<string, any>` | The resource associated with the activity. |
| `secondaryAmount` | `string` | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | Status of the Activity. |
| `title` | `string` | Title of the Activity. |
| `type` | `string` | Type of Activity. |
| `updatedOn` | `string` | Timestamp when the activity was last modified. |

#### Example: List

```ts
const activitys = await client.Activity().list({ profile_id: 1 })
```


### Address

Create an instance: `const address = client.Address()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `Record<string, any>` | Address details. |
| `id` | `number` | Address ID. |
| `profile` | `number` | User profile ID. |

#### Example: Load

```ts
const address = await client.Address().load({ id: 1 })
```

#### Example: List

```ts
const addresss = await client.Address().list()
```

#### Example: Create

```ts
const address = await client.Address().create({
  details: {},
  profile: 1,
})
```


### AddressRequirement

Create an instance: `const address_requirement = client.AddressRequirement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `Record<string, any>` | Address details to provide context for requirements lookup. |
| `fields` | `any[]` | List of fields required for the address. |
| `profile` | `number` | User profile ID. |
| `type` | `string` | Always "address". |

#### Example: List

```ts
const address_requirements = await client.AddressRequirement().list()
```

#### Example: Create

```ts
const address_requirement = await client.AddressRequirement().create({
  details: {},
})
```


### Balance

Create an instance: `const balance = client.Balance()`

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
| `amount` | `Record<string, any>` | Available balance that can be used to fund transfers. |
| `cashAmount` | `Record<string, any>` | Cash amount in the account. |
| `creationTime` | `string` | Date when the balance was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `Record<string, any> | null` | Icon for the balance. |
| `id` | `number` | Balance ID. |
| `investmentState` | `string` | Investment state of the balance. |
| `modificationTime` | `string` | Date when the balance was last modified. |
| `name` | `string | null` | Name of the balance. |
| `overdraft` | `Record<string, any>` | Overdraft details for the account. |
| `reservedAmount` | `Record<string, any>` | Amount reserved for transactions. |
| `state` | `string` | Must be `CLOSED`. |
| `targetRecipientId` | `number` | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `Record<string, any>` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `Record<string, any>` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `Record<string, any>` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `string` | Type of balance account. |
| `visible` | `boolean` | Whether the balance is visible to the user. |

#### Example: Load

```ts
const balance = await client.Balance().load({ id: 1, currency: 'currency', profile_id: 1 })
```

#### Example: List

```ts
const balances = await client.Balance().list({ profile_id: 1, type: "example" })
```

#### Example: Create

```ts
const balance = await client.Balance().create({
  profile_id: 1,
  currency: 'example_currency',
  state: 'example_state',
  targetRecipientId: 1,
  type: 'example_type',
})
```


### BalanceStatement

Create an instance: `const balance_statement = client.BalanceStatement()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolder` | `Record<string, any>` | Account holder information. |
| `bankDetails` | `Record<string, any> | null` | Local bank details for the account. |
| `endOfStatementBalance` | `Record<string, any>` | Closing balance for the specified time period. |
| `id` | `string` |  |
| `issuer` | `Record<string, any>` | Account issuer information. |
| `query` | `Record<string, any>` | Query parameters used for the request. |
| `transactions` | `any[]` | List of transactions in the statement period. |

#### Example: Load

```ts
const balance_statement = await client.BalanceStatement().load({ id: 1, profile_id: 1, currency: 'currency', interval_end: 'interval_end', interval_start: 'interval_start' })
```


### BankAccountDetail

Create an instance: `const bank_account_detail = client.BankAccountDetail()`

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
| `internationalDetails` | `Record<string, any> | null` | International bank account details. |
| `localDetails` | `Record<string, any>` | Local bank account details. |
| `reason` | `string` | Reason for the return. |
| `targetAccountId` | `number` | ID of the currency balance to create account details on. |

#### Example: Create

```ts
const bank_account_detail = await client.BankAccountDetail().create({
  profile_id: 1,
  targetAccountId: 1,
})
```


### BankAccountDetailsOrder

Create an instance: `const bank_account_details_order = client.BankAccountDetailsOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `number` | Unique ID of the issued account details. |
| `balanceId` | `number | null` | ID of the balance the order is for. |
| `creationTime` | `string` | Timestamp of when the order was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | Unique ID of the order. |
| `modificationTime` | `string` | Timestamp of the last modification to the order. |
| `requirements` | `any[]` | List of requirements to fulfill the order. |
| `status` | `string` | Order status. |

#### Example: List

```ts
const bank_account_details_orders = await client.BankAccountDetailsOrder().list({ profile_id: 1, currency: "example" })
```

#### Example: Create

```ts
const bank_account_details_order = await client.BankAccountDetailsOrder().create({
  profile_id: 1,
  currency: 'example_currency',
})
```


### BatchGroup

Create an instance: `const batch_group = client.BatchGroup()`

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
| `fileName` | `string | null` | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | Batch group ID. |
| `name` | `string` | Descriptive name for the batch group. |
| `payInDetails` | `any[]` | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `string | null` | Optional ID of the payin session. |
| `profileId` | `number` | The ID of the profile this payment belongs to. |
| `shortId` | `number` | Not applicable to this use case. |
| `sourceCurrency` | `string` | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `any[]` | The IDs of all transfers successfully added to the group. |
| `type` | `string` | The method of payment to use. |
| `userId` | `number` | The ID of the user who initiated this payment. |
| `version` | `number` | Batch version, used for concurrency control. |

#### Example: Load

```ts
const batch_group = await client.BatchGroup().load({ id: 'batch_group_id', profile_id: 1 })
```

#### Example: Create

```ts
const batch_group = await client.BatchGroup().create({
  profile_id: 1,
  name: 'example_name',
  sourceCurrency: 'example_sourceCurrency',
  type: 'example_type',
})
```


### BulkSettlement

Create an instance: `const bulk_settlement = client.BulkSettlement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransfer` | `number` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `any[]` | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `any[]` | Array of transfers to be settled. |
| `type` | `string` | Type of settlement. |

#### Example: Create

```ts
const bulk_settlement = await client.BulkSettlement().create({
  settlementDate: 'example_settlementDate',
  settlementReference: 'example_settlementReference',
  transfers: [],
  type: 'example_type',
})
```


### BusinessProfile

Create an instance: `const business_profile = client.BusinessProfile()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abn` | `string | null` | Australian Business Number (only for Australian businesses). |
| `acn` | `string | null` | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | Email of the actor. |
| `address` | `Record<string, any>` | Main registered address of the business. |
| `arbn` | `string | null` | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | Free-form description of the business activities. |
| `businessName` | `string` | Registered business name. |
| `businessNameInKatakana` | `string | null` | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `Record<string, any>` | Business representative details. |
| `companyRole` | `string` | Role of the person managing the business profile. |
| `companyType` | `string` | Type of company. |
| `contactDetails` | `Record<string, any>` | Contact information for the business. |
| `createdAt` | `string` | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | Current status of this profile. |
| `descriptionOfBusiness` | `string` | Deprecated. |
| `email` | `string` | Primary email address for the business. |
| `externalCustomerId` | `string` | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | Deprecated. |
| `fullName` | `string` | Full legal name of the business. |
| `id` | `number` | Unique identifier for the profile. |
| `industryCategories` | `any[]` | One or more industry categories classifying the business. |
| `operationalAddresses` | `any[]` | An array of operational addresses for the business. |
| `publicId` | `string` | Publicly accessible identifier for the profile. |
| `registrationNumber` | `string` | Business registration number. |
| `secondLevelCategory` | `string` | Deprecated. |
| `type` | `string` | Type of profile. |
| `updatedAt` | `string` | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `number` | The ID of the user associated with this profile. |
| `webpage` | `string` | Business website URL. |

#### Example: Create

```ts
const business_profile = await client.BusinessProfile().create({
  contactDetails: {},
})
```


### Card

Create an instance: `const card = client.Card()`

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
| `cardProgram` | `Record<string, any>` | Card program details. |
| `clientId` | `string` | Client ID of the partner that issued the card. |
| `creationTime` | `string` | Time when the card was created. |
| `expiryDate` | `string` | Date when the card will expire. |
| `id` | `string` |  |
| `lastFourDigits` | `string` | Last 4 digits of the card number. |
| `modificationTime` | `string` | Time when the card was last modified. |
| `phoneNumber` | `string` | Phone number associated with the card. |
| `profileId` | `number` | Profile ID that owns this card. |
| `status` | `Record<string, any>` | Current status of the card. |
| `token` | `string` | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | Method with which physical card spending permissions can be unlocked. |

#### Example: Load

```ts
const card = await client.Card().load({ id: 'card_id', profile_id: 1 })
```

#### Example: List

```ts
const cards = await client.Card().list({ profile_id: 1 })
```

#### Example: Create

```ts
const card = await client.Card().create({
  card_token: 'example_card_token',
  profile_id: 1,
})
```


### CardHolderLimit

Create an instance: `const card_holder_limit = client.CardHolderLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `Record<string, any>` | The limits to set, per aggregation window. |
| `spendLimits` | `any[]` | Spend limits configured for this cardholder. |
| `type` | `string` | The category of spending the limit applies to. |

#### Example: List

```ts
const card_holder_limits = await client.CardHolderLimit().list({ card_holder_profile_id: 1, profile_id: 1 })
```


### CardLimit

Create an instance: `const card_limit = client.CardLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `Record<string, any> | null` |  |
| `lifetime` | `Record<string, any> | null` |  |
| `monthly` | `Record<string, any> | null` |  |
| `transaction` | `Record<string, any> | null` |  |

#### Example: Load

```ts
const card_limit = await client.CardLimit().load({ card_token: 'card_token', profile_id: 1 })
```


### CardOrder

Create an instance: `const card_order = client.CardOrder()`

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
| `address` | `Record<string, any>` | Address set during card order. |
| `cardHolderName` | `string` | Name of the card holder. |
| `cardHolderProfileId` | `number` | The cardholder profile for this card. |
| `cardProgram` | `Record<string, any>` | The card program associated with this card order. |
| `cardToken` | `string | null` | Token of the card associated with card order. |
| `city` | `string` | Card holder's city (max 30 characters). |
| `clientId` | `string` | Client ID. |
| `country` | `string` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | Time when the card order is created. |
| `deliveryDetails` | `Record<string, any>` | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | The delivery method for the card order. |
| `embossedName` | `string` | The cardholder's name to print on the card (physical card only). |
| `errors` | `any[]` | Collection of validation errors. |
| `firstLine` | `string` | Card holder's address (max 30 characters). |
| `id` | `number` | ID of the card order. |
| `lifetimeLimit` | `number | null` | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | Time when the card order was last modified. |
| `phoneNumber` | `string` | Phone number associated with the card order. |
| `postCode` | `string` | Card holder's postal code (max 10 characters). |
| `profileId` | `number` | Profile ID. |
| `program` | `string` | The name of the card program. |
| `replacementDetails` | `Record<string, any>` | The replacement details for this card. |
| `replacesCard` | `string | null` | Token of the card being replaced by this replacement card order. |
| `secondLine` | `string | null` | Card holder's address (max 30 characters). |
| `state` | `string | null` | Card holder's state (max 30 characters). |
| `status` | `string` | Status of the card order. |
| `thirdLine` | `string | null` | Card holder's address (max 30 characters). |

#### Example: Load

```ts
const card_order = await client.CardOrder().load({ id: 1, profile_id: 1 })
```

#### Example: List

```ts
const card_orders = await client.CardOrder().list({ profile_id: 1 })
```

#### Example: Create

```ts
const card_order = await client.CardOrder().create({
  cardHolderName: 'example_cardHolderName',
  program: 'example_program',
})
```


### CardSensitiveDetail

Create an instance: `const card_sensitive_detail = client.CardSensitiveDetail()`

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

```ts
const card_sensitive_detail = await client.CardSensitiveDetail().load()
```

#### Example: Create

```ts
const card_sensitive_detail = await client.CardSensitiveDetail().create({
  encryptedPayload: 'example_encryptedPayload',
  keyVersion: 1,
})
```


### CardTransaction

Create an instance: `const card_transaction = client.CardTransaction()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approvalCode` | `string | null` | Also called authorization code. |
| `arn` | `string | null` | Acquirer reference number |
| `authorisationMethod` | `string` | Authorisation method |
| `balanceChannelReferenceId` | `string | null` | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `Record<string, any>` | Billing amount |
| `cardToken` | `string` | Unique identifier of the card |
| `creationTime` | `string` | When the transaction was created |
| `credits` | `any[]` | Array of credits. |
| `debits` | `any[]` | Array of debits. |
| `declineReason` | `string | null` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `string | null` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `any[]` | Array of fees |
| `id` | `number` | ID of the transaction |
| `merchant` | `Record<string, any>` | Merchant information |
| `modificationTime` | `string` | When the transaction was last updated |
| `pinValidationResult` | `string | null` | PIN validation result. |
| `purgeTime` | `string | null` | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `Record<string, any> | null` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `Record<string, any>` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `Record<string, any>` | Transaction amount including all fees |
| `type` | `string` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

#### Example: Load

```ts
const card_transaction = await client.CardTransaction().load({ id: 1, profile_id: 1 })
```

#### Example: List

```ts
const card_transactions = await client.CardTransaction().list({ card_token: "example", profile_id: 1, from_creation_time: "example", to_creation_time: "example" })
```


### Case

Create an instance: `const case_ = client.Case()`

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
| `details` | `Record<string, any>` | Details related to the case. |
| `externalId` | `string` | Partner-created identifier for this case, if applicable. |
| `id` | `number` | Unique identifier of the case. |
| `messages` | `any[]` | List of messages associated with this case. |
| `profileId` | `number` | The profile ID associated with this case. |
| `reference` | `Record<string, any>` | Reference information linking the case to a related entity. |
| `status` | `string` | The current status of the support case. |
| `subType` | `string` | The sub-type of the support case. |
| `subject` | `string` | The subject of the case. |
| `type` | `string` | The type of the support case. |
| `updatedAt` | `string` | Timestamp when the case was last updated. |

#### Example: Load

```ts
const case_ = await client.Case().load({ id: 1 })
```

#### Example: Create

```ts
const case_ = await client.Case().create({
})
```


### ClaimAccount

Create an instance: `const claim_account = client.ClaimAccount()`

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

```ts
const claim_account = await client.ClaimAccount().create({
  registrationCode: 'example_registrationCode',
})
```


### Comparison

Create an instance: `const comparison = client.Comparison()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | The comparison amount |
| `amountType` | `string` | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `string | null` | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `any[]` | List of provider types included in the response |
| `providers` | `any[]` | List of providers with their estimated quotes |
| `sourceCountry` | `string | null` | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `string | null` | ISO 4217 source currency code |
| `targetCountry` | `string | null` | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `string | null` | ISO 4217 target currency code |

#### Example: Load

```ts
const comparison = await client.Comparison().load({ source_currency: 'source_currency', target_currency: 'target_currency' })
```


### Contact

Create an instance: `const contact = client.Contact()`

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

```ts
const contact = await client.Contact().create({
  profile_id: 1,
  is_direct_identifier_creation: true,
})
```


### Currency

Create an instance: `const currency = client.Currency()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `any[]` | Keywords associated with this currency. |
| `name` | `string` | Display name of this currency. |
| `supportsDecimals` | `boolean` | Whether this currency supports decimal values or not. |
| `symbol` | `string` | The symbol of this currency. |

#### Example: List

```ts
const currencys = await client.Currency().list()
```


### DeliveryEstimate

Create an instance: `const delivery_estimate = client.DeliveryEstimate()`

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

```ts
const delivery_estimate = await client.DeliveryEstimate().load({ id: 1 })
```


### DeliveryUpdate

Create an instance: `const delivery_update = client.DeliveryUpdate()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery_update` | `string` | The delivery signal to simulate. |
| `delivery_update_path` | `any[]` | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `string | null` | Optional estimated delivery time. |
| `observation_id` | `string` | Server-generated observation identifier. |
| `occurred_at` | `string` | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `string | null` | Payment scheme to include in the observation. |

#### Example: Create

```ts
const delivery_update = await client.DeliveryUpdate().create({
  transfer_id: 1,
  delivery_update: 'example_delivery_update',
  delivery_update_path: [],
})
```


### DigitalWallet

Create an instance: `const digital_wallet = client.DigitalWallet()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation` | `string` | Approve or decline a payment token activation |
| `paymentTokens` | `any[]` |  |
| `walletNames` | `any[]` | List of supported wallet types. |

#### Example: Create

```ts
const digital_wallet = await client.DigitalWallet().create({
  card_token: 'example_card_token',
  profile_id: 1,
  activation: 'example_activation',
})
```


### DirectDebitAccount

Create an instance: `const direct_debit_account = client.DirectDebitAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` | Currency of the bank account. |
| `details` | `Record<string, any>` | Bank account details |
| `id` | `number` | Direct debit account ID |
| `type` | `string` | Payment type for which the account is used. |

#### Example: List

```ts
const direct_debit_accounts = await client.DirectDebitAccount().list({ profile_id: 1, currency: "example", type: "example" })
```

#### Example: Create

```ts
const direct_debit_account = await client.DirectDebitAccount().create({
  profile_id: 1,
})
```


### Director

Create an instance: `const director = client.Director()`

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
| `directors` | `any[]` |  |
| `firstName` | `string` | Director first name. |
| `id` | `number` | ID of the director. |
| `lastName` | `string` | Director last name. |

#### Example: List

```ts
const directors = await client.Director().list({ profile_id: 1 })
```

#### Example: Create

```ts
const director = await client.Director().create({
  profile_id: 1,
})
```


### Dispute

Create an instance: `const dispute = client.Dispute()`

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
| `disclaimer` | `Record<string, any>` | Acknowledgement fields. |
| `files` | `Record<string, any>` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `Record<string, any>` | Form fields required to submit this dispute. |
| `id` | `string` | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | Time when the dispute was last updated. |
| `profileId` | `number` | Profile ID. |
| `reason` | `string` | Dispute reason code. |
| `receipt` | `string` | The file to upload. |
| `status` | `string` | Dispute overall status. |
| `statusMessage` | `string` | Explanation for `subStatus`. |
| `subStatus` | `string` | Dispute detailed status. |
| `transaction` | `Record<string, any>` | Transaction details for the dispute. |
| `transactionId` | `number` | Card transaction ID. |

#### Example: Load

```ts
const dispute = await client.Dispute().load({ id: 'dispute_id', profile_id: 1 })
```

#### Example: List

```ts
const disputes = await client.Dispute().list({ profile_id: 1 })
```

#### Example: Create

```ts
const dispute = await client.Dispute().create({
  profile_id: 1,
})
```


### DisputeReason

Create an instance: `const dispute_reason = client.DisputeReason()`

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
| `subOptions` | `any[]` | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `boolean` | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | Text to display when showing the dispute form to your users. |

#### Example: List

```ts
const dispute_reasons = await client.DisputeReason().list({ profile_id: 1 })
```


### Facetec

Create an instance: `const facetec = client.Facetec()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const facetec = await client.Facetec().load()
```


### File

Create an instance: `const file = client.File()`

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
| `submissionData` | `Record<string, any>` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

#### Example: List

```ts
const files = await client.File().list()
```

#### Example: Create

```ts
const file = await client.File().create({
  createdAt: 'example_createdAt',
  file: 'example_file',
  fileId: 'example_fileId',
  fileName: 'example_fileName',
  profileId: 1,
  purpose: 'example_purpose',
  submissionData: {},
})
```


### Funding

Create an instance: `const funding = client.Funding()`

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

```ts
const funding = await client.Funding().create({
  profile_id: 1,
  transfer_id: 1,
})
```


### GpiTracking

Create an instance: `const gpi_tracking = client.GpiTracking()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | The type of identifier used to look up the transfer. |
| `transactions` | `any[]` | The matching GPI tracking transactions. |

#### Example: Create

```ts
const gpi_tracking = await client.GpiTracking().create({
  identifier: 'example_identifier',
  identifierType: 'example_identifierType',
})
```


### HoldLimitBreach

Create an instance: `const hold_limit_breach = client.HoldLimitBreach()`

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

```ts
const hold_limit_breachs = await client.HoldLimitBreach().list({ profile_id: 1 })
```


### IncomingTransfer

Create an instance: `const incoming_transfer = client.IncomingTransfer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `string` | Account details ID that received the incoming transfer. |
| `amounts` | `Record<string, any>` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `Record<string, any>` | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `Record<string, any>` | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `number` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `Record<string, any>` | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `any[]` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `number` | Profile ID of the balance owner. |
| `scheme` | `string` | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Current state of the incoming transfer. |
| `uetr` | `string` | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | Unstructured remittance information provided by the debtor. |

#### Example: Load

```ts
const incoming_transfer = await client.IncomingTransfer().load({ id: 'incoming_transfer_id' })
```


### Jose

Create an instance: `const jose = client.Jose()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `keyId` | `string` | ID of the key in UUID format. |
| `keyMaterial` | `Record<string, any>` |  |
| `publicKeyMaterial` | `Record<string, any>` |  |
| `scope` | `string` | Scope of the key. |
| `validFrom` | `string` | The key is valid from this date. |
| `validTill` | `string` | The key is valid until this date. |
| `version` | `number` | Version of the public key issued. |

#### Example: Load

```ts
const jose = await client.Jose().load({ algorithm: 'algorithm', scope: 'scope' })
```

#### Example: Create

```ts
const jose = await client.Jose().create({
})
```


### KycReview

Create an instance: `const kyc_review = client.KycReview()`

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
| `link` | `Record<string, any> | null` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `string | null` | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `string | null` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `any[] | null` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | Aggregated state of the underlying requirement set. |
| `triggerData` | `Record<string, any>` | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `any[]` | List of trigger reference objects. |
| `type` | `string` | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `string` | Timestamp marking the last update of the KYC Review. |

#### Example: Load

```ts
const kyc_review = await client.KycReview().load({ id: 'kyc_review_id', profile_id: 1 })
```

#### Example: List

```ts
const kyc_reviews = await client.KycReview().list({ profile_id: 1 })
```

#### Example: Create

```ts
const kyc_review = await client.KycReview().create({
  profile_id: 1,
  type: 'example_type',
})
```


### LinkRequest

Create an instance: `const link_request = client.LinkRequest()`

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
| `metadata` | `Record<string, any>` | Flow-specific metadata. |
| `profileId` | `number` | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `number` | The ID of the card transaction to dispute. |
| `type` | `string` | Embedded Flow type. |

#### Example: Load

```ts
const link_request = await client.LinkRequest().load({ id: 'link_request_id' })
```

#### Example: Create

```ts
const link_request = await client.LinkRequest().create({
  profile_id: 1,
  email: 'example_email',
  redirectUrl: 'example_redirectUrl',
  transactionId: 1,
})
```


### Message

Create an instance: `const message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `submissionData` | `Record<string, any>` | The data for the message submission. |
| `type` | `string` | The type of message submission. |

#### Example: Create

```ts
const message = await client.Message().create({
  case_id: 1,
  submissionData: {},
  type: 'example_type',
})
```


### MultiCurrencyAccount

Create an instance: `const multi_currency_account = client.MultiCurrencyAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const multi_currency_account = await client.MultiCurrencyAccount().load()
```


### OneTimeToken

Create an instance: `const one_time_token = client.OneTimeToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challenges` | `any[]` | An array of challenges. |
| `faceMap` | `string` | A base64 encoded string. |
| `oneTimeToken` | `string` | A one-time token unique identifier. |
| `validity` | `number` | The One-Time Token expiration in seconds. |

#### Example: Create

```ts
const one_time_token = await client.OneTimeToken().create({
  profile_id: 1,
})
```


### Ott

Create an instance: `const ott = client.Ott()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actionType` | `string` | The action bound to the one time token. |
| `challenges` | `any[]` | Array of challenge objects. |
| `oneTimeToken` | `string` | Unique identifier of a one time token. |
| `userId` | `number` | Creator of this one time token. |
| `validity` | `number` | Seconds until the one time token becomes expired. |

#### Example: Load

```ts
const ott = await client.Ott().load()
```


### Payin

Create an instance: `const payin = client.Payin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` |  |
| `currency` | `string` |  |
| `details` | `Record<string, any>` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `string` |  |
| `id` | `string` |  |
| `payinSessionId` | `string` |  |
| `paymentInstrumentId` | `string` |  |
| `qrCodeInBase64` | `string` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `string` |  |
| `status` | `string` |  |

#### Example: Create

```ts
const payin = await client.Payin().create({
  payin_session_id: 'example_payin_session_id',
  profile_id: 1,
  payinSessionId: 'example_payinSessionId',
})
```


### PayinDepositDetail

Create an instance: `const payin_deposit_detail = client.PayinDepositDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `payinBank` | `Record<string, any>` | Information about the receiving bank. |
| `payinBankAccount` | `Record<string, any>` | Bank account details to use to send the payment to. |
| `wiseInformation` | `Record<string, any>` | Information about the receiving Wise entity, the owner of the bank account. |

#### Example: Load

```ts
const payin_deposit_detail = await client.PayinDepositDetail().load({ profile_id: 1, transfer_id: 1 })
```


### Payment

Create an instance: `const payment = client.Payment()`

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
| `pricingVariant` | `string | null` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | Date of when payment was created |
| `timeUpdated` | `string` | Date of when payment was updated |

#### Example: List

```ts
const payments = await client.Payment().list({ transfer_id: 1 })
```


### PaymentInitiation

Create an instance: `const payment_initiation = client.PaymentInitiation()`

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

```ts
const payment_initiation = await client.PaymentInitiation().load({ id: 1, batch_group_id: 'batch_group_id', profile_id: 1 })
```

#### Example: Create

```ts
const payment_initiation = await client.PaymentInitiation().create({
  batch_group_id: 'example_batch_group_id',
  profile_id: 1,
})
```


### PaymentInstrument

Create an instance: `const payment_instrument = client.PaymentInstrument()`

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
| `accountOwnerDetails` | `Record<string, any>` |  |
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

```ts
const payment_instrument = await client.PaymentInstrument().load({ id: 'payment_instrument_id', profile_id: 1 })
```

#### Example: List

```ts
const payment_instruments = await client.PaymentInstrument().list({ id: "example", profile_id: 1 })
```

#### Example: Create

```ts
const payment_instrument = await client.PaymentInstrument().create({
  profile_id: 1,
  accountNumber: 'example_accountNumber',
  type: 'example_type',
})
```


### PaymentIntent

Create an instance: `const payment_intent = client.PaymentIntent()`

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

```ts
const payment_intent = await client.PaymentIntent().load({ id: 'payment_intent_id', allocation_id: 'allocation_id' })
```


### PhoneNumber

Create an instance: `const phone_number = client.PhoneNumber()`

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

```ts
const phone_number = await client.PhoneNumber().create({
  user_id: 1,
})
```


### Production

Create an instance: `const production = client.Production()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string | null` | Detailed description of the error code. |
| `errorCode` | `string | null` | Code returned when card production is not successful. |
| `kioskId` | `string | null` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `string` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `string` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

#### Example: Load

```ts
const production = await client.Production().load({ card_token: 'card_token', profile_id: 1 })
```


### Profile

Create an instance: `const profile = client.Profile()`

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
| `address` | `Record<string, any>` |  |
| `avatar` | `string` |  |
| `contactDetails` | `Record<string, any>` |  |
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
| `secondaryAddresses` | `any[]` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `userId` | `number` |  |

#### Example: Load

```ts
const profile = await client.Profile().load({ id: 1 })
```

#### Example: List

```ts
const profiles = await client.Profile().list()
```


### Quote

Create an instance: `const quote = client.Quote()`

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
| `creationContext` | `Record<string, any>` | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | The date and time the quote expires. |
| `guaranteedTargetAmount` | `boolean` | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `boolean` | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | ID of this quote (GUID format). |
| `notices` | `any[]` | Messages to display to the user. |
| `payOut` | `string` | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `Record<string, any>` | _Optional_. |
| `paymentOptions` | `any[]` | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | Preferred pay-in method. |
| `pricingConfiguration` | `Record<string, any>` | Allows partners to override pricing configurations on a transfer level. |
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

```ts
const quote = await client.Quote().load({ id: 'quote_id', profile_id: 1 })
```

#### Example: Create

```ts
const quote = await client.Quote().create({
  sourceCurrency: 'example_sourceCurrency',
  targetCurrency: 'example_targetCurrency',
})
```


### Rate

Create an instance: `const rate = client.Rate()`

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

```ts
const rates = await client.Rate().list()
```


### Recipient

Create an instance: `const recipient = client.Recipient()`

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
| `commonFieldMap` | `Record<string, any>` | Map of key lookup fields for the account. |
| `confirmations` | `Record<string, any>` | Contains verification results for the recipient's details. |
| `country` | `string` | 2-character country code. |
| `creatorId` | `number` | Account entity that owns the recipient account. |
| `currency` | `string` | 3-character currency code. |
| `details` | `Record<string, any>` | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `any[]` | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | Account hash for tracking changes to recipient details. |
| `id` | `number` | ID of the recipient. |
| `isInternal` | `boolean` | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | Entity type of recipient account. |
| `longAccountSummary` | `string` | Longer account details summary. |
| `name` | `Record<string, any>` | Recipient name details. |
| `ownedByCustomer` | `boolean` | Inidicates if recipient account belongs to profile owner. |
| `profile` | `number` | Personal or business profile ID of the sender. |
| `profileId` | `number` | Specific profile that owns the recipient account. |
| `quoteId` | `string` | Quote ID. |
| `type` | `string` | Recipient account type. |
| `ultimateBeneficiary` | `Record<string, any> | null` | The details for the ultimate beneficiary of this recipient. |

#### Example: Load

```ts
const recipient = await client.Recipient().load({ account_id: 1 })
```

#### Example: List

```ts
const recipients = await client.Recipient().list()
```

#### Example: Create

```ts
const recipient = await client.Recipient().create({
  acceptedOutcomes: true,
  ultimateBeneficiary: {},
})
```


### Rule

Create an instance: `const rule = client.Rule()`

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
| `values` | `any[]` | A list of values based on the `type` of rule configured. |

#### Example: List

```ts
const rules = await client.Rule().list({ application_id: "example" })
```

#### Example: Create

```ts
const rule = await client.Rule().create({
  application_id: 'example_application_id',
})
```


### Saml

Create an instance: `const saml = client.Saml()`

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

```ts
const saml = await client.Saml().load({ registration_id: 'registration_id' })
```

#### Example: Create

```ts
const saml = await client.Saml().create({
  SAMLResponse: 'example_SAMLResponse',
})
```


### ScaDeviceFingerprint

Create an instance: `const sca_device_fingerprint = client.ScaDeviceFingerprint()`

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

```ts
const sca_device_fingerprint = await client.ScaDeviceFingerprint().create({
  profile_id: 1,
})
```


### ScaFacemap

Create an instance: `const sca_facemap = client.ScaFacemap()`

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

```ts
const sca_facemap = await client.ScaFacemap().create({
  profile_id: 1,
})
```


### ScaOtp

Create an instance: `const sca_otp = client.ScaOtp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |


### ScaSession

Create an instance: `const sca_session = client.ScaSession()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const sca_session = await client.ScaSession().create({
  profile_id: 1,
})
```


### SettlementAllocation

Create an instance: `const settlement_allocation = client.SettlementAllocation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `Record<string, any>` |  |
| `createdAt` | `string` | Timestamp when the settlement allocation was created. |
| `currency` | `string` | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `number` | Expected total amount for the allocation. |
| `file` | `string` | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | Token for fetching the next page of payment intents. |
| `paymentIntents` | `any[]` | List of payment intents associated with the allocation. |
| `paymentReference` | `string` | Unique payment reference for the settlement allocation. |
| `state` | `string` | Current state of the settlement allocation. |
| `updatedAt` | `string` | Timestamp when the settlement allocation was last updated. |

#### Example: Load

```ts
const settlement_allocation = await client.SettlementAllocation().load({ id: 'settlement_allocation_id' })
```

#### Example: Create

```ts
const settlement_allocation = await client.SettlementAllocation().create({
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


### Simulation

Create an instance: `const simulation = client.Simulation()`

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
| `description` | `string | null` | Description of the KYC review item. |
| `details` | `Record<string, any>` |  |
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

```ts
const simulation = await client.Simulation().load({ status: 'status', transfer_id: 1 })
```

#### Example: List

```ts
const simulations = await client.Simulation().list({ card_token: "example", profile_id: 1 })
```

#### Example: Create

```ts
const simulation = await client.Simulation().create({
  transfer_id: 1,
})
```


### SpendControl

Create an instance: `const spend_control = client.SpendControl()`

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

```ts
const spend_controls = await client.SpendControl().list({ application_id: "example" })
```


### SpendLimit

Create an instance: `const spend_limit = client.SpendLimit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `Record<string, any>` |  |
| `id` | `string` |  |
| `type` | `string` | The type of transaction. |

#### Example: List

```ts
const spend_limits = await client.SpendLimit().list({ profile_id: 1 })
```


### Subscription

Create an instance: `const subscription = client.Subscription()`

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
| `created_by` | `Record<string, any>` |  |
| `delivery` | `Record<string, any>` |  |
| `id` | `string` | UUID that uniquely identifies the subscription. |
| `name` | `string` | A custom name for your webhook to ease with identification. |
| `scope` | `Record<string, any>` |  |
| `trigger_on` | `string` | The event type this subscription is listening for. |

#### Example: Load

```ts
const subscription = await client.Subscription().load({ id: 'subscription_id', client_key: 'client_key' })
```

#### Example: List

```ts
const subscriptions = await client.Subscription().list({ client_key: "example" })
```

#### Example: Create

```ts
const subscription = await client.Subscription().create({
  client_key: 'example_client_key',
  delivery: {},
  name: 'example_name',
  trigger_on: 'example_trigger_on',
})
```


### TestNotification

Create an instance: `const test_notification = client.TestNotification()`

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

```ts
const test_notification = await client.TestNotification().create({
  client_key: 'example_client_key',
  subscription_id: 'example_subscription_id',
})
```


### ThirdPartyTransfer

Create an instance: `const third_party_transfer = client.ThirdPartyTransfer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `string` | Timestamp when transfer was created. |
| `details` | `Record<string, any>` | Payment Details |
| `hasActiveIssues` | `boolean` | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | Transfer ID |
| `originalTransferId` | `string` | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `Record<string, any>` | Data block to capture payment originator details |
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

```ts
const third_party_transfer = await client.ThirdPartyTransfer().load({ id: 1, profile_id: 1 })
```

#### Example: Create

```ts
const third_party_transfer = await client.ThirdPartyTransfer().create({
  profile_id: 1,
  details: {},
  originalTransferId: 'example_originalTransferId',
  originator: {},
  quote: 'example_quote',
  targetAccount: 1,
})
```


### ThreeDSecure

Create an instance: `const three_d_secure = client.ThreeDSecure()`

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

```ts
const three_d_secure = await client.ThreeDSecure().create({
  profile_id: 1,
  challengeStatus: 'example_challengeStatus',
  transactionReference: 'example_transactionReference',
})
```


### Token

Create an instance: `const token = client.Token()`

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

```ts
const token = await client.Token().create({
})
```


### Transfer

Create an instance: `const transfer = client.Transfer()`

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
| `business` | `number | null` | Your business profile ID |
| `created` | `string` | Timestamp when transfer was created |
| `customerTransactionId` | `string` | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `Record<string, any>` |  |
| `hasActiveIssues` | `boolean` | Are there any pending issues which stop executing the transfer? |
| `id` | `number` | Transfer ID |
| `payinSessionId` | `string` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `number | null` | V1 quote ID |
| `quoteUuid` | `string` | V2 quote ID |
| `rate` | `number` | Exchange rate value |
| `reference` | `string` | Deprecated, use `details.reference` instead |
| `sourceAccount` | `number | null` | Refund recipient account ID |
| `sourceCurrency` | `string` | Source currency code |
| `sourceValue` | `number` | Transfer amount in source currency |
| `status` | `string` | Transfer current status. |
| `targetAccount` | `number` | Recipient account ID |
| `targetCurrency` | `string` | Target currency code |
| `targetValue` | `number` | Transfer amount in target currency |
| `transferRequest` | `number | null` | Deprecated |
| `user` | `number` | Your user ID |

#### Example: Load

```ts
const transfer = await client.Transfer().load({ id: 1 })
```

#### Example: List

```ts
const transfers = await client.Transfer().list()
```

#### Example: Create

```ts
const transfer = await client.Transfer().create({
  customerTransactionId: 'example_customerTransactionId',
  quoteUuid: 'example_quoteUuid',
  targetAccount: 1,
})
```


### TransferRequirement

Create an instance: `const transfer_requirement = client.TransferRequirement()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerTransactionId` | `string` | Unique identifier for the transfer request |
| `details` | `Record<string, any>` |  |
| `originatorLegalEntityType` | `string` | Type of sender. |
| `quoteUuid` | `string` | V2 quote ID |
| `targetAccount` | `number` | Recipient account ID |

#### Example: Create

```ts
const transfer_requirement = await client.TransferRequirement().create({
  quoteUuid: 'example_quoteUuid',
  targetAccount: 1,
})
```


### Ubo

Create an instance: `const ubo = client.Ubo()`

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
| `ubos` | `any[]` |  |

#### Example: List

```ts
const ubos = await client.Ubo().list({ profile_id: 1 })
```

#### Example: Create

```ts
const ubo = await client.Ubo().create({
  profile_id: 1,
})
```


### User

Create an instance: `const user = client.User()`

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
| `details` | `Record<string, any> | null` | User details. |
| `email` | `string` | User's email. |
| `id` | `number` | User ID. |
| `language` | `string` | User default language for UI and email communication. |
| `name` | `string | null` | User's full name. |
| `registrationCode` | `string` | Randomly generated registration code that is unique to this user and request. |

#### Example: Load

```ts
const user = await client.User().load({ id: 1 })
```

#### Example: Create

```ts
const user = await client.User().create({
  email: 'example_email',
  registrationCode: 'example_registrationCode',
})
```


### Verification

Create an instance: `const verification = client.Verification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `required_evidences` | `any[]` | List of evidence types required to complete verification. |

#### Example: List

```ts
const verifications = await client.Verification().list({ profile_id: 1 })
```

#### Example: Create

```ts
const verification = await client.Verification().create({
  profile_id: 1,
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
wise/
├── src/
│   ├── WiseSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { WiseSDK } from '@voxgig-sdk/wise-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const comparison = client.Comparison()
await comparison.load({ source_currency: "example", target_currency: "example" })

// comparison.data() now returns the comparison data from the last `load`
// comparison.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
