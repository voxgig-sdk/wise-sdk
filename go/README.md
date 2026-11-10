# Wise Golang SDK



The Golang SDK for the Wise API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AccountDetail(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/wise-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/wise-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/wise-sdk/go=../wise-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/wise-sdk/go"
)

func main() {
    client := sdk.NewWiseSDK(map[string]any{
        "apikey": os.Getenv("WISE_APIKEY"),
    })

    // Load a single accountDetail — the value is the entity; Data() reads its record.
    accountDetail, err := client.AccountDetail(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(accountDetail.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
comparison, err := client.Comparison(nil).Load(map[string]any{"source_currency": "example", "target_currency": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = comparison
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

comparison, err := client.Comparison(nil).Load(
    map[string]any{"source_currency": "example", "target_currency": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(comparison.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewWiseSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewWiseSDK

```go
func NewWiseSDK(options map[string]any) *WiseSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *WiseSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### WiseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AccountDetail` | `(data map[string]any) WiseEntityBase` | Create an AccountDetail entity instance. |
| `AccountRequirement` | `(data map[string]any) WiseEntityBase` | Create an AccountRequirement entity instance. |
| `Activity` | `(data map[string]any) WiseEntityBase` | Create an Activity entity instance. |
| `Address` | `(data map[string]any) WiseEntityBase` | Create an Address entity instance. |
| `AddressRequirement` | `(data map[string]any) WiseEntityBase` | Create an AddressRequirement entity instance. |
| `Balance` | `(data map[string]any) WiseEntityBase` | Create a Balance entity instance. |
| `BalanceStatement` | `(data map[string]any) WiseEntityBase` | Create a BalanceStatement entity instance. |
| `BankAccountDetail` | `(data map[string]any) WiseEntityBase` | Create a BankAccountDetail entity instance. |
| `BankAccountDetailsOrder` | `(data map[string]any) WiseEntityBase` | Create a BankAccountDetailsOrder entity instance. |
| `BatchGroup` | `(data map[string]any) WiseEntityBase` | Create a BatchGroup entity instance. |
| `BulkSettlement` | `(data map[string]any) WiseEntityBase` | Create a BulkSettlement entity instance. |
| `BusinessProfile` | `(data map[string]any) WiseEntityBase` | Create a BusinessProfile entity instance. |
| `Card` | `(data map[string]any) WiseEntityBase` | Create a Card entity instance. |
| `CardHolderLimit` | `(data map[string]any) WiseEntityBase` | Create a CardHolderLimit entity instance. |
| `CardLimit` | `(data map[string]any) WiseEntityBase` | Create a CardLimit entity instance. |
| `CardOrder` | `(data map[string]any) WiseEntityBase` | Create a CardOrder entity instance. |
| `CardSensitiveDetail` | `(data map[string]any) WiseEntityBase` | Create a CardSensitiveDetail entity instance. |
| `CardTransaction` | `(data map[string]any) WiseEntityBase` | Create a CardTransaction entity instance. |
| `Case` | `(data map[string]any) WiseEntityBase` | Create a Case entity instance. |
| `ClaimAccount` | `(data map[string]any) WiseEntityBase` | Create a ClaimAccount entity instance. |
| `Comparison` | `(data map[string]any) WiseEntityBase` | Create a Comparison entity instance. |
| `Contact` | `(data map[string]any) WiseEntityBase` | Create a Contact entity instance. |
| `Currency` | `(data map[string]any) WiseEntityBase` | Create a Currency entity instance. |
| `DeliveryEstimate` | `(data map[string]any) WiseEntityBase` | Create a DeliveryEstimate entity instance. |
| `DeliveryUpdate` | `(data map[string]any) WiseEntityBase` | Create a DeliveryUpdate entity instance. |
| `DigitalWallet` | `(data map[string]any) WiseEntityBase` | Create a DigitalWallet entity instance. |
| `DirectDebitAccount` | `(data map[string]any) WiseEntityBase` | Create a DirectDebitAccount entity instance. |
| `Director` | `(data map[string]any) WiseEntityBase` | Create a Director entity instance. |
| `Dispute` | `(data map[string]any) WiseEntityBase` | Create a Dispute entity instance. |
| `DisputeReason` | `(data map[string]any) WiseEntityBase` | Create a DisputeReason entity instance. |
| `Facetec` | `(data map[string]any) WiseEntityBase` | Create a Facetec entity instance. |
| `File` | `(data map[string]any) WiseEntityBase` | Create a File entity instance. |
| `Funding` | `(data map[string]any) WiseEntityBase` | Create a Funding entity instance. |
| `GpiTracking` | `(data map[string]any) WiseEntityBase` | Create a GpiTracking entity instance. |
| `HoldLimitBreach` | `(data map[string]any) WiseEntityBase` | Create a HoldLimitBreach entity instance. |
| `IncomingTransfer` | `(data map[string]any) WiseEntityBase` | Create an IncomingTransfer entity instance. |
| `Jose` | `(data map[string]any) WiseEntityBase` | Create a Jose entity instance. |
| `KycReview` | `(data map[string]any) WiseEntityBase` | Create a KycReview entity instance. |
| `LinkRequest` | `(data map[string]any) WiseEntityBase` | Create a LinkRequest entity instance. |
| `Message` | `(data map[string]any) WiseEntityBase` | Create a Message entity instance. |
| `MultiCurrencyAccount` | `(data map[string]any) WiseEntityBase` | Create a MultiCurrencyAccount entity instance. |
| `OneTimeToken` | `(data map[string]any) WiseEntityBase` | Create an OneTimeToken entity instance. |
| `Ott` | `(data map[string]any) WiseEntityBase` | Create an Ott entity instance. |
| `Payin` | `(data map[string]any) WiseEntityBase` | Create a Payin entity instance. |
| `PayinDepositDetail` | `(data map[string]any) WiseEntityBase` | Create a PayinDepositDetail entity instance. |
| `Payment` | `(data map[string]any) WiseEntityBase` | Create a Payment entity instance. |
| `PaymentInitiation` | `(data map[string]any) WiseEntityBase` | Create a PaymentInitiation entity instance. |
| `PaymentInstrument` | `(data map[string]any) WiseEntityBase` | Create a PaymentInstrument entity instance. |
| `PaymentIntent` | `(data map[string]any) WiseEntityBase` | Create a PaymentIntent entity instance. |
| `PhoneNumber` | `(data map[string]any) WiseEntityBase` | Create a PhoneNumber entity instance. |
| `Production` | `(data map[string]any) WiseEntityBase` | Create a Production entity instance. |
| `Profile` | `(data map[string]any) WiseEntityBase` | Create a Profile entity instance. |
| `Quote` | `(data map[string]any) WiseEntityBase` | Create a Quote entity instance. |
| `Rate` | `(data map[string]any) WiseEntityBase` | Create a Rate entity instance. |
| `Recipient` | `(data map[string]any) WiseEntityBase` | Create a Recipient entity instance. |
| `Rule` | `(data map[string]any) WiseEntityBase` | Create a Rule entity instance. |
| `Saml` | `(data map[string]any) WiseEntityBase` | Create a Saml entity instance. |
| `ScaDeviceFingerprint` | `(data map[string]any) WiseEntityBase` | Create a ScaDeviceFingerprint entity instance. |
| `ScaFacemap` | `(data map[string]any) WiseEntityBase` | Create a ScaFacemap entity instance. |
| `ScaOtp` | `(data map[string]any) WiseEntityBase` | Create a ScaOtp entity instance. |
| `ScaSession` | `(data map[string]any) WiseEntityBase` | Create a ScaSession entity instance. |
| `SettlementAllocation` | `(data map[string]any) WiseEntityBase` | Create a SettlementAllocation entity instance. |
| `Simulation` | `(data map[string]any) WiseEntityBase` | Create a Simulation entity instance. |
| `SpendControl` | `(data map[string]any) WiseEntityBase` | Create a SpendControl entity instance. |
| `SpendLimit` | `(data map[string]any) WiseEntityBase` | Create a SpendLimit entity instance. |
| `Subscription` | `(data map[string]any) WiseEntityBase` | Create a Subscription entity instance. |
| `TestNotification` | `(data map[string]any) WiseEntityBase` | Create a TestNotification entity instance. |
| `ThirdPartyTransfer` | `(data map[string]any) WiseEntityBase` | Create a ThirdPartyTransfer entity instance. |
| `ThreeDSecure` | `(data map[string]any) WiseEntityBase` | Create a ThreeDSecure entity instance. |
| `Token` | `(data map[string]any) WiseEntityBase` | Create a Token entity instance. |
| `Transfer` | `(data map[string]any) WiseEntityBase` | Create a Transfer entity instance. |
| `TransferRequirement` | `(data map[string]any) WiseEntityBase` | Create a TransferRequirement entity instance. |
| `Ubo` | `(data map[string]any) WiseEntityBase` | Create an Ubo entity instance. |
| `User` | `(data map[string]any) WiseEntityBase` | Create an User entity instance. |
| `Verification` | `(data map[string]any) WiseEntityBase` | Create a Verification entity instance. |

### Entity interface (WiseEntityBase)

All entities implement the `WiseEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity, and return it marked as deleted. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    accountDetail, err := client.AccountDetail(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // accountDetail is the entity; accountDetail.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### AccountDetail

| Field | Description |
| --- | --- |
| `"accountHolderName"` | Name of the account holder as it appears on the account details. |
| `"accountIdentification"` | Country/scheme-specific account identification. |
| `"country"` | ISO 3166-1 alpha-2 country code the account details belong to. |
| `"id"` | Unique identifier for the account details. |
| `"profileId"` | Profile ID of the account details owner. |
| `"state"` | Current state of the account details. |

Operations: Load.

API path: `/balances/account-details/{id}`

#### AccountRequirement

| Field | Description |
| --- | --- |
| `"accountHolderName"` | Recipient full name. |
| `"currency"` | 3-character currency code. |
| `"details"` | Contains the details of the recipient account specific to its currency and type. |
| `"fields"` | List of UI field groups to collect required data. |
| `"ownedByCustomer"` | Indicates whether the recipient account is owned by the profile owner. |
| `"profile"` | Personal or business profile ID of the sender. |
| `"title"` | Human-readable title for the requirement group. |
| `"type"` | Recipient account type. |
| `"ultimateBeneficiary"` | The details about the ultimate beneficiary for this recipient, if present. |
| `"usageInfo"` | Optional usage/help text. |

Operations: Create, List.

API path: `/quotes/{quoteId}/account-requirements`

#### Activity

| Field | Description |
| --- | --- |
| `"createdOn"` | Timestamp when the activity was created. |
| `"description"` | A short description that briefly summarizes the activity. |
| `"id"` | Activity id. |
| `"primaryAmount"` | A currency formatted text that describe the primary amount of transaction. |
| `"resource"` | The resource associated with the activity. |
| `"secondaryAmount"` | A currency formatted text that describe the secondary amount of transaction. |
| `"status"` | Status of the Activity. |
| `"title"` | Title of the Activity. |
| `"type"` | Type of Activity. |
| `"updatedOn"` | Timestamp when the activity was last modified. |

Operations: List.

API path: `/profiles/{profileId}/activities`

#### Address

| Field | Description |
| --- | --- |
| `"details"` | Address details. |
| `"id"` | Address ID. |
| `"profile"` | User profile ID. |

Operations: Create, List, Load.

API path: `/addresses`

#### AddressRequirement

| Field | Description |
| --- | --- |
| `"details"` | Address details to provide context for requirements lookup. |
| `"fields"` | List of fields required for the address. |
| `"profile"` | User profile ID. |
| `"type"` | Always "address". |

Operations: Create, List.

API path: `/address-requirements`

#### Balance

| Field | Description |
| --- | --- |
| `"amount"` | Available balance that can be used to fund transfers. |
| `"cashAmount"` | Cash amount in the account. |
| `"creationTime"` | Date when the balance was created. |
| `"currency"` | Currency code (ISO 4217 Alphabetic Code). |
| `"icon"` | Icon for the balance. |
| `"id"` | Balance ID. |
| `"investmentState"` | Investment state of the balance. |
| `"modificationTime"` | Date when the balance was last modified. |
| `"name"` | Name of the balance. |
| `"overdraft"` | Overdraft details for the account. |
| `"reservedAmount"` | Amount reserved for transactions. |
| `"state"` | Must be `CLOSED`. |
| `"targetRecipientId"` | ID of the recipient to receive the refund of the excess funds. |
| `"totalAvailable"` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `"totalCash"` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `"totalWorth"` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `"type"` | Type of balance account. |
| `"visible"` | Whether the balance is visible to the user. |

Operations: Create, List, Load, Remove.

API path: `/profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}`

#### BalanceStatement

| Field | Description |
| --- | --- |
| `"accountHolder"` | Account holder information. |
| `"bankDetails"` | Local bank details for the account. |
| `"endOfStatementBalance"` | Closing balance for the specified time period. |
| `"id"` |  |
| `"issuer"` | Account issuer information. |
| `"query"` | Query parameters used for the request. |
| `"transactions"` | List of transactions in the statement period. |

Operations: Load.

API path: `/profiles/{profileId}/balance-statements/{balanceId}/statement.json`

#### BankAccountDetail

| Field | Description |
| --- | --- |
| `"active"` | Status of the account detail. |
| `"currency"` | Account detail currency (ISO 4217 Alphabetic Code). |
| `"id"` | Account detail ID. |
| `"internationalDetails"` | International bank account details. |
| `"localDetails"` | Local bank account details. |
| `"reason"` | Reason for the return. |
| `"targetAccountId"` | ID of the currency balance to create account details on. |

Operations: Create.

API path: `/profiles/{profileId}/account-details/payments/{paymentId}/returns`

#### BankAccountDetailsOrder

| Field | Description |
| --- | --- |
| `"accountDetailsId"` | Unique ID of the issued account details. |
| `"balanceId"` | ID of the balance the order is for. |
| `"creationTime"` | Timestamp of when the order was created. |
| `"currency"` | Currency code (ISO 4217 Alphabetic Code). |
| `"id"` | Unique ID of the order. |
| `"modificationTime"` | Timestamp of the last modification to the order. |
| `"requirements"` | List of requirements to fulfill the order. |
| `"status"` | Order status. |

Operations: Create, List.

API path: `/profiles/{profileId}/account-details-orders`

#### BatchGroup

| Field | Description |
| --- | --- |
| `"alreadyPaid"` | Not applicable to this use case. |
| `"fileName"` | If this batch was submitted as a file, this is the given file name. |
| `"groupType"` | Whether this batch was submitted over the API or as a file. |
| `"id"` | Batch group ID. |
| `"name"` | Descriptive name for the batch group. |
| `"payInDetails"` | List of pay-in details describing how the batch group can be funded. |
| `"payinSessionId"` | Optional ID of the payin session. |
| `"profileId"` | The ID of the profile this payment belongs to. |
| `"shortId"` | Not applicable to this use case. |
| `"sourceCurrency"` | Source currency code (ISO 4217 Alphabetic Code). |
| `"status"` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `"transferIds"` | The IDs of all transfers successfully added to the group. |
| `"type"` | The method of payment to use. |
| `"userId"` | The ID of the user who initiated this payment. |
| `"version"` | Batch version, used for concurrency control. |

Operations: Create, Load, Update.

API path: `/profiles/{profileId}/batch-payments/{batchGroupId}/payments`

#### BulkSettlement

| Field | Description |
| --- | --- |
| `"balanceTransfer"` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `"refundedTransfers"` | Array of transfers for which refunds have been processed. |
| `"settlementCurrency"` | The currency in which the transfers in this journal will be settled. |
| `"settlementDate"` | The date you send the settlement funds, ISO 8601 format. |
| `"settlementReference"` | Reference used when paying the end of day settlement monies to Wise. |
| `"transfers"` | Array of transfers to be settled. |
| `"type"` | Type of settlement. |

Operations: Create.

API path: `/settlements`

#### BusinessProfile

| Field | Description |
| --- | --- |
| `"abn"` | Australian Business Number (only for Australian businesses). |
| `"acn"` | Australian Company Number (only for Australian businesses). |
| `"actorEmail"` | Email of the actor. |
| `"address"` | Main registered address of the business. |
| `"arbn"` | Australian Registered Body Number (only for Australian businesses). |
| `"businessFreeFormDescription"` | Free-form description of the business activities. |
| `"businessName"` | Registered business name. |
| `"businessNameInKatakana"` | Business name in Katakana (only for Japanese businesses). |
| `"businessRepresentative"` | Business representative details. |
| `"companyRole"` | Role of the person managing the business profile. |
| `"companyType"` | Type of company. |
| `"contactDetails"` | Contact information for the business. |
| `"createdAt"` | Timestamp when the profile was created (ISO 8601 format). |
| `"currentState"` | Current status of this profile. |
| `"descriptionOfBusiness"` | Deprecated. |
| `"email"` | Primary email address for the business. |
| `"externalCustomerId"` | An external reference identifier mapping the customer of this profile to your system. |
| `"firstLevelCategory"` | Deprecated. |
| `"fullName"` | Full legal name of the business. |
| `"id"` | Unique identifier for the profile. |
| `"industryCategories"` | One or more industry categories classifying the business. |
| `"operationalAddresses"` | An array of operational addresses for the business. |
| `"publicId"` | Publicly accessible identifier for the profile. |
| `"registrationNumber"` | Business registration number. |
| `"secondLevelCategory"` | Deprecated. |
| `"type"` | Type of profile. |
| `"updatedAt"` | Timestamp when the profile was last updated (ISO 8601 format). |
| `"userId"` | The ID of the user associated with this profile. |
| `"webpage"` | Business website URL. |

Operations: Create, Update.

API path: `/profiles/business-profile`

#### Card

| Field | Description |
| --- | --- |
| `"bankIdentificationNumber"` | Bank identification number (BIN) of the card. |
| `"cardHolderName"` | Name of the card holder. |
| `"cardProgram"` | Card program details. |
| `"clientId"` | Client ID of the partner that issued the card. |
| `"creationTime"` | Time when the card was created. |
| `"expiryDate"` | Date when the card will expire. |
| `"id"` |  |
| `"lastFourDigits"` | Last 4 digits of the card number. |
| `"modificationTime"` | Time when the card was last modified. |
| `"phoneNumber"` | Phone number associated with the card. |
| `"profileId"` | Profile ID that owns this card. |
| `"status"` | Current status of the card. |
| `"token"` | Unique identifier for the card. |
| `"unlockSpendingPermissions"` | Method with which physical card spending permissions can be unlocked. |

Operations: Create, List, Load, Update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count`

#### CardHolderLimit

| Field | Description |
| --- | --- |
| `"aggregateWindow"` | The limits to set, per aggregation window. |
| `"spendLimits"` | Spend limits configured for this cardholder. |
| `"type"` | The category of spending the limit applies to. |

Operations: List, Remove, Update.

API path: `/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits`

#### CardLimit

| Field | Description |
| --- | --- |
| `"daily"` |  |
| `"lifetime"` |  |
| `"monthly"` |  |
| `"transaction"` |  |

Operations: Load, Update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/spend-limits`

#### CardOrder

| Field | Description |
| --- | --- |
| `"address"` | Address set during card order. |
| `"cardHolderName"` | Name of the card holder. |
| `"cardHolderProfileId"` | The cardholder profile for this card. |
| `"cardProgram"` | The card program associated with this card order. |
| `"cardToken"` | Token of the card associated with card order. |
| `"city"` | Card holder's city (max 30 characters). |
| `"clientId"` | Client ID. |
| `"country"` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `"creationTime"` | Time when the card order is created. |
| `"deliveryDetails"` | Delivery details of a physical card order. |
| `"deliveryEstimate"` | The estimated time when the card will be delivered. |
| `"deliveryOption"` | The delivery method for the card order. |
| `"embossedName"` | The cardholder's name to print on the card (physical card only). |
| `"errors"` | Collection of validation errors. |
| `"firstLine"` | Card holder's address (max 30 characters). |
| `"id"` | ID of the card order. |
| `"lifetimeLimit"` | Maximum amount of spending on the card once issued. |
| `"modificationTime"` | Time when the card order was last modified. |
| `"phoneNumber"` | Phone number associated with the card order. |
| `"postCode"` | Card holder's postal code (max 10 characters). |
| `"profileId"` | Profile ID. |
| `"program"` | The name of the card program. |
| `"replacementDetails"` | The replacement details for this card. |
| `"replacesCard"` | Token of the card being replaced by this replacement card order. |
| `"secondLine"` | Card holder's address (max 30 characters). |
| `"state"` | Card holder's state (max 30 characters). |
| `"status"` | Status of the card order. |
| `"thirdLine"` | Card holder's address (max 30 characters). |

Operations: Create, List, Load, Update.

API path: `/spend/profiles/{profileId}/card-orders`

#### CardSensitiveDetail

| Field | Description |
| --- | --- |
| `"encryptedPayload"` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `"key"` | The RSA public key. |
| `"keyVersion"` | The version of the key to use. |
| `"version"` | Version of the encryption key. |

Operations: Create, Load.

API path: `/twcard-data/v1/sensitive-card-data/details`

#### CardTransaction

| Field | Description |
| --- | --- |
| `"approvalCode"` | Also called authorization code. |
| `"arn"` | Acquirer reference number |
| `"authorisationMethod"` | Authorisation method |
| `"balanceChannelReferenceId"` | Balance channel reference ID associated with the card transaction |
| `"billingAmount"` | Billing amount |
| `"cardToken"` | Unique identifier of the card |
| `"creationTime"` | When the transaction was created |
| `"credits"` | Array of credits. |
| `"debits"` | Array of debits. |
| `"declineReason"` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `"detailedDeclineReason"` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `"fees"` | Array of fees |
| `"id"` | ID of the transaction |
| `"merchant"` | Merchant information |
| `"modificationTime"` | When the transaction was last updated |
| `"pinValidationResult"` | PIN validation result. |
| `"purgeTime"` | Time at which reserved funds will be released after the authorisation hold expires |
| `"relayAuthorisationData"` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `"state"` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `"transactionAmount"` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `"transactionAmountWithFees"` | Transaction amount including all fees |
| `"type"` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

Operations: List, Load.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/transactions`

#### Case

| Field | Description |
| --- | --- |
| `"createdAt"` | Timestamp when the case was created. |
| `"description"` | The description of the request. |
| `"details"` | Details related to the case. |
| `"externalId"` | Partner-created identifier for this case, if applicable. |
| `"id"` | Unique identifier of the case. |
| `"messages"` | List of messages associated with this case. |
| `"profileId"` | The profile ID associated with this case. |
| `"reference"` | Reference information linking the case to a related entity. |
| `"status"` | The current status of the support case. |
| `"subType"` | The sub-type of the support case. |
| `"subject"` | The subject of the case. |
| `"type"` | The type of the support case. |
| `"updatedAt"` | Timestamp when the case was last updated. |

Operations: Create, Load.

API path: `/cases`

#### ClaimAccount

| Field | Description |
| --- | --- |
| `"claimAccountCode"` | The `claim_account_code` to be used in the redirect to Wise. |
| `"registrationCode"` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

Operations: Create.

API path: `/user/claim-account`

#### Comparison

| Field | Description |
| --- | --- |
| `"amount"` | The comparison amount |
| `"amountType"` | Whether the amount represents a send amount or recipient gets amount |
| `"providerCountry"` | Provider country (ISO 3166-1 Alpha-2 code) |
| `"providerTypes"` | List of provider types included in the response |
| `"providers"` | List of providers with their estimated quotes |
| `"sourceCountry"` | Source country (ISO 3166-1 Alpha-2 code) |
| `"sourceCurrency"` | ISO 4217 source currency code |
| `"targetCountry"` | Target country (ISO 3166-1 Alpha-2 code) |
| `"targetCurrency"` | ISO 4217 target currency code |

Operations: Load.

API path: `/comparisons`

#### Contact

| Field | Description |
| --- | --- |
| `"contactId"` | Contact ID in the format of UUID. |
| `"identifier"` | A Wise profile's identifier. |
| `"name"` | Full name of the contact. |
| `"targetCurrency"` | 3 character currency code. |

Operations: Create.

API path: `/profiles/{profileId}/contacts`

#### Currency

| Field | Description |
| --- | --- |
| `"code"` | Currency code (ISO 4217 Alphabetic Code). |
| `"countryKeywords"` | Keywords associated with this currency. |
| `"name"` | Display name of this currency. |
| `"supportsDecimals"` | Whether this currency supports decimal values or not. |
| `"symbol"` | The symbol of this currency. |

Operations: List.

API path: `/currencies`

#### DeliveryEstimate

| Field | Description |
| --- | --- |
| `"estimatedDeliveryDate"` | Estimated time when funds will arrive in the recipient's bank account. |
| `"formattedEstimatedDeliveryDate"` | A string to display to users for the estimated delivery date. |
| `"id"` |  |

Operations: Load.

API path: `/delivery-estimates/{transferId}`

#### DeliveryUpdate

| Field | Description |
| --- | --- |
| `"delivery_update"` | The delivery signal to simulate. |
| `"delivery_update_path"` | Delivery signals supported by the simulated route, not a history of events. |
| `"estimated_delivery_at"` | Optional estimated delivery time. |
| `"observation_id"` | Server-generated observation identifier. |
| `"occurred_at"` | Server-generated observation time in UTC with millisecond precision. |
| `"scheme"` | Payment scheme to include in the observation. |

Operations: Create.

API path: `/simulation/transfers/{transferId}/delivery-update`

#### DigitalWallet

| Field | Description |
| --- | --- |
| `"activation"` | Approve or decline a payment token activation |
| `"paymentTokens"` |  |
| `"walletNames"` | List of supported wallet types. |

Operations: Create.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation`

#### DirectDebitAccount

| Field | Description |
| --- | --- |
| `"currency"` | Currency of the bank account. |
| `"details"` | Bank account details |
| `"id"` | Direct debit account ID |
| `"type"` | Payment type for which the account is used. |

Operations: Create, List.

API path: `/profiles/{profileId}/direct-debit-accounts`

#### Director

| Field | Description |
| --- | --- |
| `"countryOfResidenceIso3Code"` | 3 character country code. |
| `"dateOfBirth"` | Date of birth. |
| `"directors"` |  |
| `"firstName"` | Director first name. |
| `"id"` | ID of the director. |
| `"lastName"` | Director last name. |

Operations: Create, List, Remove, Update.

API path: `/profiles/{profileId}/directors`

#### Dispute

| Field | Description |
| --- | --- |
| `"canWithdraw"` | Whether the dispute can be withdrawn. |
| `"createdAt"` | Time when the dispute was created. |
| `"createdBy"` | Creator of the dispute. |
| `"disclaimer"` | Acknowledgement fields. |
| `"files"` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `"form"` | Form fields required to submit this dispute. |
| `"id"` | Unique identifier of the dispute. |
| `"lastUpdatedAt"` | Time when the dispute was last updated. |
| `"profileId"` | Profile ID. |
| `"reason"` | Dispute reason code. |
| `"receipt"` | The file to upload. |
| `"status"` | Dispute overall status. |
| `"statusMessage"` | Explanation for `subStatus`. |
| `"subStatus"` | Dispute detailed status. |
| `"transaction"` | Transaction details for the dispute. |
| `"transactionId"` | Card transaction ID. |

Operations: Create, List, Load, Update.

API path: `/spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}`

#### DisputeReason

| Field | Description |
| --- | --- |
| `"code"` | The type of reasons available for the dispute. |
| `"description"` | The description of the dispute reason. |
| `"isFraud"` | Flag indicating that the dispute reason is fraud-related. |
| `"subOptions"` | Optional list of sub-reasons that should be used as the dispute reason. |
| `"supportsMultipleTransactions"` | Whether the dispute supports multiple transactions. |
| `"tooltip"` | Text to display when showing the dispute form to your users. |

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
| `"createdAt"` | Timestamp when the file was uploaded. |
| `"file"` | The file to upload. |
| `"fileId"` | Unique identifier of the uploaded file. |
| `"fileName"` | The name of the uploaded file. |
| `"profileId"` | The ID of the profile this file belongs to. |
| `"purpose"` | The purpose of the file upload. |
| `"submissionData"` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

Operations: Create, List.

API path: `/cases/files`

#### Funding

| Field | Description |
| --- | --- |
| `"balanceTransactionId"` |  |
| `"status"` |  |
| `"type"` |  |

Operations: Create.

API path: `/profiles/{profileId}/transfers/{transferId}/payments`

#### GpiTracking

| Field | Description |
| --- | --- |
| `"identifier"` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `"identifierType"` | The type of identifier used to look up the transfer. |
| `"transactions"` | The matching GPI tracking transactions. |

Operations: Create.

API path: `/gpi-tracking`

#### HoldLimitBreach

| Field | Description |
| --- | --- |
| `"amount"` | Amount value. |
| `"closingReason"` | Reason the breach was closed, null if state is `OPEN`. |
| `"createdAt"` | Date when the hold limit breach was created. |
| `"currency"` | Currency code (ISO 4217 Alphabetic Code). |
| `"id"` | Hold limit breach ID. |
| `"profileId"` | ID of the profile that owns the hold limit breach |
| `"state"` | Current state of the hold limit breach. |
| `"updatedAt"` | Date when the hold limit breach was last modified. |

Operations: List.

API path: `/profiles/{profileId}/balances/hold-limit-breach`

#### IncomingTransfer

| Field | Description |
| --- | --- |
| `"accountDetailsId"` | Account details ID that received the incoming transfer. |
| `"amounts"` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `"balanceId"` | Balance ID associated with the incoming transfer. |
| `"chargeBearer"` | Charge bearer code indicating who pays the transaction fees. |
| `"creditTransferType"` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `"creditedTime"` | Timestamp when the incoming transfer was credited to the balance. |
| `"creditor"` | The creditor (beneficiary) of the incoming transfer. |
| `"debtor"` | The debtor (ordering party) of the incoming transfer. |
| `"endToEndId"` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `"exchangeRate"` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `"fees"` | Breakdown of fees applied to the incoming transfer. |
| `"id"` | Unique identifier for the incoming transfer. |
| `"previousInstructingAgents"` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `"profileId"` | Profile ID of the balance owner. |
| `"scheme"` | The payment scheme through which the incoming transfer was received. |
| `"state"` | Current state of the incoming transfer. |
| `"uetr"` | Universal End-to-End Transaction Reference. |
| `"unstructuredReference"` | Unstructured remittance information provided by the debtor. |

Operations: Load.

API path: `/incoming-transfers/{incomingTransferId}`

#### Jose

| Field | Description |
| --- | --- |
| `"keyId"` | ID of the key in UUID format. |
| `"keyMaterial"` |  |
| `"publicKeyMaterial"` |  |
| `"scope"` | Scope of the key. |
| `"validFrom"` | The key is valid from this date. |
| `"validTill"` | The key is valid until this date. |
| `"version"` | Version of the public key issued. |

Operations: Create, Load.

API path: `/auth/jose/playground/jwsjwe`

#### KycReview

| Field | Description |
| --- | --- |
| `"createdAt"` | Timestamp marking the creation of the KYC Review. |
| `"id"` | Unique identifier for a KYC Review resource, generated by Wise. |
| `"link"` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `"redirectUrl"` | URL where the user will be redirected at the end of the flow. |
| `"requiredBy"` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `"requirements"` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `"status"` | Aggregated state of the underlying requirement set. |
| `"triggerData"` | Object containing data of the underlying product object that triggered the KYC Review. |
| `"triggerReferences"` | List of trigger reference objects. |
| `"type"` | Type of the underlying action or process this KYC Review is for. |
| `"updatedAt"` | Timestamp marking the last update of the KYC Review. |

Operations: Create, List, Load, Update.

API path: `/profiles/{profileId}/kyc-requirements/{requirementKey}`

#### LinkRequest

| Field | Description |
| --- | --- |
| `"clientKey"` | Client key that created the embedded link request. |
| `"email"` | The end user's email address, to receive dispute updates. |
| `"id"` | Embedded link request ID. |
| `"metadata"` | Flow-specific metadata. |
| `"profileId"` | Profile that owns the embedded flow. |
| `"redirectUrl"` | URL where Wise redirects the user after the flow resolves. |
| `"transactionId"` | The ID of the card transaction to dispute. |
| `"type"` | Embedded Flow type. |

Operations: Create, Load.

API path: `/profiles/{profileId}/embedded-flows/link-requests/kyc-reviews`

#### Message

| Field | Description |
| --- | --- |
| `"submissionData"` | The data for the message submission. |
| `"type"` | The type of message submission. |

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
| `"challenges"` | An array of challenges. |
| `"faceMap"` | A base64 encoded string. |
| `"oneTimeToken"` | A one-time token unique identifier. |
| `"validity"` | The One-Time Token expiration in seconds. |

Operations: Create.

API path: `/profiles/{profileId}/device-fingerprints/verify`

#### Ott

| Field | Description |
| --- | --- |
| `"actionType"` | The action bound to the one time token. |
| `"challenges"` | Array of challenge objects. |
| `"oneTimeToken"` | Unique identifier of a one time token. |
| `"userId"` | Creator of this one time token. |
| `"validity"` | Seconds until the one time token becomes expired. |

Operations: Create, Load.

API path: `/one-time-token/sms/verify`

#### Payin

| Field | Description |
| --- | --- |
| `"amount"` |  |
| `"currency"` |  |
| `"details"` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `"failureReason"` |  |
| `"id"` |  |
| `"payinSessionId"` |  |
| `"paymentInstrumentId"` |  |
| `"qrCodeInBase64"` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `"reference"` |  |
| `"status"` |  |

Operations: Create.

API path: `/profiles/{profileId}/payin-sessions/{payinSessionId}/paynow`

#### PayinDepositDetail

| Field | Description |
| --- | --- |
| `"payinBank"` | Information about the receiving bank. |
| `"payinBankAccount"` | Bank account details to use to send the payment to. |
| `"wiseInformation"` | Information about the receiving Wise entity, the owner of the bank account. |

Operations: Load.

API path: `/profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer`

#### Payment

| Field | Description |
| --- | --- |
| `"amount"` | Transfer source amount |
| `"currency"` | Transfer source currency |
| `"id"` | Payment ID |
| `"method"` | The payment method used to pay for the transfer |
| `"pricingVariant"` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `"timeCreated"` | Date of when payment was created |
| `"timeUpdated"` | Date of when payment was updated |

Operations: List.

API path: `/transfers/{transferId}/payments`

#### PaymentInitiation

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Create, Load.

API path: `/profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations`

#### PaymentInstrument

| Field | Description |
| --- | --- |
| `"accountHolderName"` |  |
| `"accountNumber"` |  |
| `"accountOwnerDetails"` |  |
| `"accountType"` |  |
| `"bankCode"` |  |
| `"bankName"` |  |
| `"branchCode"` |  |
| `"disconnectReason"` |  |
| `"id"` |  |
| `"reference"` |  |
| `"status"` |  |
| `"type"` |  |

Operations: Create, List, Load.

API path: `/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation`

#### PaymentIntent

| Field | Description |
| --- | --- |
| `"allocationId"` | Unique identifier of the associated settlement allocation. |
| `"allocationType"` | Type of allocation. |
| `"createdAt"` | Timestamp when the payment intent was created. |
| `"fundingSource"` | Source of funding for the payment. |
| `"id"` | Unique identifier of the payment intent. |
| `"partnerEntityId"` | Partner entity identifier. |
| `"paymentReference"` | Payment reference. |
| `"profileId"` | Profile identifier. |
| `"reason"` | Reason for the payment. |
| `"recipientType"` | Type of recipient. |
| `"sourceAmount"` | Source amount of the payment. |
| `"sourceCurrency"` | Source currency code (ISO 4217). |
| `"state"` | Current state of the payment intent. |
| `"targetAmount"` | Target amount of the payment. |
| `"targetCurrency"` | Target currency code (ISO 4217). |
| `"updatedAt"` | Timestamp when the payment intent was last updated. |

Operations: Load.

API path: `/settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}`

#### PhoneNumber

| Field | Description |
| --- | --- |
| `"clientId"` | Client ID of which this phone number belongs to. |
| `"id"` | ID of the phone number. |
| `"phoneNumber"` | A text representation of phone number. |
| `"type"` | Type of phone number when used in authentication. |
| `"verified"` | Indicator if phone number is verified. |

Operations: Create.

API path: `/application/users/{userId}/phone-numbers`

#### Production

| Field | Description |
| --- | --- |
| `"description"` | Detailed description of the error code. |
| `"errorCode"` | Code returned when card production is not successful. |
| `"kioskId"` | Identifier that specifies which kiosk machine is producing the card. |
| `"occurredAt"` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `"status"` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

Operations: Load, Update.

API path: `/spend/profiles/{profileId}/cards/{cardToken}/production`

#### Profile

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"avatar"` |  |
| `"contactDetails"` |  |
| `"createdAt"` |  |
| `"currentState"` |  |
| `"dateOfBirth"` |  |
| `"email"` |  |
| `"firstName"` |  |
| `"fullName"` |  |
| `"id"` |  |
| `"lastName"` |  |
| `"phoneNumber"` |  |
| `"preferredName"` |  |
| `"publicId"` |  |
| `"secondaryAddresses"` |  |
| `"type"` |  |
| `"updatedAt"` |  |
| `"userId"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/profiles/{profileId}/pin`

#### Quote

| Field | Description |
| --- | --- |
| `"createdTime"` | Quote created timestamp. |
| `"creationContext"` | Used to pass additional metadata about the intended transfer. |
| `"expirationTime"` | The date and time the quote expires. |
| `"guaranteedTargetAmount"` | Indicates whether the target amount is guaranteed. |
| `"guaranteedTargetAmountAllowed"` | Indicates whether guaranteed target amount is allowed. |
| `"id"` | ID of this quote (GUID format). |
| `"notices"` | Messages to display to the user. |
| `"payOut"` | Mechanism Wise uses to deliver the transfer. |
| `"paymentMetadata"` | _Optional_. |
| `"paymentOptions"` | List of the methods available to pay for the transfer. |
| `"preferredPayIn"` | Preferred pay-in method. |
| `"pricingConfiguration"` | Allows partners to override pricing configurations on a transfer level. |
| `"profile"` | Personal or business profile ID. |
| `"providedAmountType"` | Indicates whether the quote was created as source or target. |
| `"rate"` | Exchange rate value used for the conversion. |
| `"rateExpirationTime"` | Date and time the locked rate expires. |
| `"rateType"` | Whether the rate is fixed or floating. |
| `"sourceAmount"` | Amount in source currency to send. |
| `"sourceCurrency"` | Source (sending) currency code. |
| `"status"` | Current status of the quote. |
| `"targetAccount"` | _Optional_. |
| `"targetAmount"` | Amount in target currency to be received by the recipient. |
| `"targetAmountAllowed"` | Indicates whether target amount is allowed. |
| `"targetCurrency"` | Target (receive) currency code. |
| `"user"` | User ID that created the quote. |

Operations: Create, Load, Update.

API path: `/profiles/{profileId}/quotes`

#### Rate

| Field | Description |
| --- | --- |
| `"rate"` | Exchange rate value. |
| `"source"` | Source (send) currency code. |
| `"target"` | Target (receive) currency code. |
| `"time"` | Timestamp for exchange rate. |

Operations: List.

API path: `/rates`

#### Recipient

| Field | Description |
| --- | --- |
| `"acceptedOutcomes"` | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `"accountHolderName"` | Recipient full name. |
| `"accountId"` | Recipient account ID. |
| `"accountSummary"` | Summary of account details for ease of lookup. |
| `"active"` | Status of the recipient account. |
| `"commonFieldMap"` | Map of key lookup fields for the account. |
| `"confirmations"` | Contains verification results for the recipient's details. |
| `"country"` | 2-character country code. |
| `"creatorId"` | Account entity that owns the recipient account. |
| `"currency"` | 3-character currency code. |
| `"details"` | Contains the details of the recipient account specific to its currency and type. |
| `"displayFields"` | Lookup fields (key/label/value) for rendering in your front-end. |
| `"hash"` | Account hash for tracking changes to recipient details. |
| `"id"` | ID of the recipient. |
| `"isInternal"` | Indicates whether recipient is internal. |
| `"legalEntityType"` | Entity type of recipient account. |
| `"longAccountSummary"` | Longer account details summary. |
| `"name"` | Recipient name details. |
| `"ownedByCustomer"` | Inidicates if recipient account belongs to profile owner. |
| `"profile"` | Personal or business profile ID of the sender. |
| `"profileId"` | Specific profile that owns the recipient account. |
| `"quoteId"` | Quote ID. |
| `"type"` | Recipient account type. |
| `"ultimateBeneficiary"` | The details for the ultimate beneficiary of this recipient. |

Operations: Create, List, Load, Remove, Update.

API path: `/accounts/{accountId}/quotes/{quoteId}/compatibility`

#### Rule

| Field | Description |
| --- | --- |
| `"description"` | The description of the authorisation rule. |
| `"id"` | The unique ID for the authorisation rule. |
| `"operation"` | Determines whether the transactions should be allowed or blocked. |
| `"type"` | The type of authorisation rule. |
| `"values"` | A list of values based on the `type` of rule configured. |

Operations: Create, List.

API path: `/spend/applications/{clientId}/spend-controls/rules`

#### Saml

| Field | Description |
| --- | --- |
| `"RelayState"` | Opaque state value. |
| `"SAMLResponse"` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

Operations: Create, Load.

API path: `/login/saml2/sso`

#### ScaDeviceFingerprint

| Field | Description |
| --- | --- |
| `"createdAt"` | The device fingerprint creation timestamp. |
| `"deviceFingerprintId"` | The identifier of the device fingerprint. |
| `"id"` |  |

Operations: Create, Remove.

API path: `/profiles/{profileId}/device-fingerprints`

#### ScaFacemap

| Field | Description |
| --- | --- |
| `"faceMap"` | A base64 encoded string. |

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
| `"command"` |  |
| `"createdAt"` | Timestamp when the settlement allocation was created. |
| `"currency"` | Currency code for the allocation (ISO 4217). |
| `"expectedTotalAmount"` | Expected total amount for the allocation. |
| `"file"` | Settlement Allocation Request (SAR) file containing payment intent details |
| `"id"` | Unique identifier of the settlement allocation. |
| `"nextPageToken"` | Token for fetching the next page of payment intents. |
| `"paymentIntents"` | List of payment intents associated with the allocation. |
| `"paymentReference"` | Unique payment reference for the settlement allocation. |
| `"state"` | Current state of the settlement allocation. |
| `"updatedAt"` | Timestamp when the settlement allocation was last updated. |

Operations: Create, Load.

API path: `/settlement/allocations`

#### Simulation

| Field | Description |
| --- | --- |
| `"business"` |  |
| `"created"` |  |
| `"creationTime"` | Time when the card transaction was created. |
| `"description"` | Description of the KYC review item. |
| `"details"` |  |
| `"failure_reason_code"` | Failure reason code to trigger for payout failure. |
| `"hasActiveIssues"` |  |
| `"id"` |  |
| `"key"` | KYC review item key. |
| `"quote"` |  |
| `"rate"` |  |
| `"reference"` |  |
| `"sourceAccount"` |  |
| `"sourceCurrency"` |  |
| `"sourceValue"` |  |
| `"state"` | State of the KYC review item. |
| `"status"` |  |
| `"targetAccount"` |  |
| `"targetCurrency"` |  |
| `"targetValue"` |  |
| `"transactionId"` | ID of the transaction. |
| `"transferRequest"` |  |
| `"user"` |  |
| `"wise_id"` |  |

Operations: Create, List, Load.

API path: `/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation`

#### SpendControl

| Field | Description |
| --- | --- |
| `"ruleId"` | The ID of the applied authorisation rule. |

Operations: Create, List, Remove.

API path: `/spend/applications/{clientId}/spend-controls/rules/apply`

#### SpendLimit

| Field | Description |
| --- | --- |
| `"aggregateWindow"` |  |
| `"id"` |  |
| `"type"` | The type of transaction. |

Operations: List, Remove, Update.

API path: `/spend/profiles/{profileId}/spend-limits`

#### Subscription

| Field | Description |
| --- | --- |
| `"created_at"` | Timestamp of when the subscription was created. |
| `"created_by"` |  |
| `"delivery"` |  |
| `"id"` | UUID that uniquely identifies the subscription. |
| `"name"` | A custom name for your webhook to ease with identification. |
| `"scope"` |  |
| `"trigger_on"` | The event type this subscription is listening for. |

Operations: Create, List, Load, Remove.

API path: `/applications/{clientKey}/subscriptions`

#### TestNotification

| Field | Description |
| --- | --- |
| `"created_at"` | Timestamp of when the test notification was created. |
| `"delivery_id"` | ID of the delivery that was queued for sending. |

Operations: Create.

API path: `/applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications`

#### ThirdPartyTransfer

| Field | Description |
| --- | --- |
| `"created"` | Timestamp when transfer was created. |
| `"details"` | Payment Details |
| `"hasActiveIssues"` | Are there any pending issues which stop executing the transfer? |
| `"id"` | Transfer ID |
| `"originalTransferId"` | Unique identifier randomly generated per transfer request by the calling client |
| `"originator"` | Data block to capture payment originator details |
| `"quote"` | Quote ID |
| `"rate"` | Exchange rate value |
| `"sourceAccount"` | Refund recipient account ID |
| `"sourceCurrency"` | Source currency code |
| `"sourceValue"` | Transfer amount in source currency |
| `"status"` | Transfer current status. |
| `"targetAccount"` | Recipient account ID |
| `"targetCurrency"` | Target currency code |
| `"targetValue"` | Transfer amount in target currency |
| `"user"` | Your user ID |

Operations: Create, Load.

API path: `/profiles/{profileId}/third-party-transfers`

#### ThreeDSecure

| Field | Description |
| --- | --- |
| `"challengeStatus"` | The customer's response to the 3DS challenge. |
| `"transactionReference"` | Transaction reference as received in the 3DS challenge webhook event. |

Operations: Create.

API path: `/spend/profiles/{profileId}/3dsecure/challenge-result`

#### Token

| Field | Description |
| --- | --- |
| `"access_token"` | Access token to be used when calling the API. |
| `"created_at"` | Token creation time in ISO 8601 format. |
| `"expires_at"` | Access token expiration timestamp (UTC). |
| `"expires_in"` | Access token expiry time in seconds. |
| `"refresh_token"` | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `"refresh_token_expires_at"` | Refresh token expiration timestamp (UTC). |
| `"refresh_token_expires_in"` | Refresh token expiry time in seconds. |
| `"scope"` | Scope of the token. |
| `"token_type"` | Type of the token. |

Operations: Create.

API path: `/oauth/token`

#### Transfer

| Field | Description |
| --- | --- |
| `"business"` | Your business profile ID |
| `"created"` | Timestamp when transfer was created |
| `"customerTransactionId"` | Unique identifier randomly generated per transfer request by the calling client |
| `"details"` |  |
| `"hasActiveIssues"` | Are there any pending issues which stop executing the transfer? |
| `"id"` | Transfer ID |
| `"payinSessionId"` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `"quote"` | V1 quote ID |
| `"quoteUuid"` | V2 quote ID |
| `"rate"` | Exchange rate value |
| `"reference"` | Deprecated, use `details.reference` instead |
| `"sourceAccount"` | Refund recipient account ID |
| `"sourceCurrency"` | Source currency code |
| `"sourceValue"` | Transfer amount in source currency |
| `"status"` | Transfer current status. |
| `"targetAccount"` | Recipient account ID |
| `"targetCurrency"` | Target currency code |
| `"targetValue"` | Transfer amount in target currency |
| `"transferRequest"` | Deprecated |
| `"user"` | Your user ID |

Operations: Create, List, Load, Update.

API path: `/transfers`

#### TransferRequirement

| Field | Description |
| --- | --- |
| `"customerTransactionId"` | Unique identifier for the transfer request |
| `"details"` |  |
| `"originatorLegalEntityType"` | Type of sender. |
| `"quoteUuid"` | V2 quote ID |
| `"targetAccount"` | Recipient account ID |

Operations: Create.

API path: `/transfer-requirements`

#### Ubo

| Field | Description |
| --- | --- |
| `"addressFirstLine"` | First line of address. |
| `"city"` | City of residential address. |
| `"countryOfResidenceIso3Code"` | 3 character country code. |
| `"dateOfBirth"` | Date of birth. |
| `"id"` | ID of the ultimate beneficial owner. |
| `"name"` | Owner full name. |
| `"ownershipPercentage"` | Percentage of ownership. |
| `"postCode"` | Address post code. |
| `"state"` | State or region of residential address. |
| `"ubos"` |  |

Operations: Create, List, Update.

API path: `/profiles/{profileId}/ubos`

#### User

| Field | Description |
| --- | --- |
| `"active"` | If user is active or not. |
| `"details"` | User details. |
| `"email"` | User's email. |
| `"id"` | User ID. |
| `"language"` | User default language for UI and email communication. |
| `"name"` | User's full name. |
| `"registrationCode"` | Randomly generated registration code that is unique to this user and request. |

Operations: Create, Load, Update.

API path: `/user/signup/registration_code`

#### Verification

| Field | Description |
| --- | --- |
| `"required_evidences"` | List of evidence types required to complete verification. |

Operations: Create, List.

API path: `/profiles/{profileId}/additional-verification/upload-evidences`



## Entities


### AccountDetail

Create an instance: `accountDetail := client.AccountDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `string` | Name of the account holder as it appears on the account details. |
| `accountIdentification` | `any` | Country/scheme-specific account identification. |
| `country` | `string` | ISO 3166-1 alpha-2 country code the account details belong to. |
| `id` | `int` | Unique identifier for the account details. |
| `profileId` | `int` | Profile ID of the account details owner. |
| `state` | `string` | Current state of the account details. |

#### Example: Load

```go
accountDetail, err := client.AccountDetail(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(accountDetail.(sdk.Entity).Data()) // the loaded entity's record
```


### AccountRequirement

Create an instance: `accountRequirement := client.AccountRequirement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `string` | Recipient full name. |
| `currency` | `string` | 3-character currency code. |
| `details` | `map[string]any` | Contains the details of the recipient account specific to its currency and type. |
| `fields` | `[]any` | List of UI field groups to collect required data. |
| `ownedByCustomer` | `bool` | Indicates whether the recipient account is owned by the profile owner. |
| `profile` | `int` | Personal or business profile ID of the sender. |
| `title` | `string` | Human-readable title for the requirement group. |
| `type` | `string` | Recipient account type. |
| `ultimateBeneficiary` | `any` | The details about the ultimate beneficiary for this recipient, if present. |
| `usageInfo` | `string` | Optional usage/help text. |

#### Example: List

```go
accountRequirements, err := client.AccountRequirement(nil).List(map[string]any{"quote_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range accountRequirements.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AccountRequirement(nil).Create(map[string]any{
    "quote_id": "example_quote_id",
    "ultimateBeneficiary": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Activity

Create an instance: `activity := client.Activity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `string` | Timestamp when the activity was created. |
| `description` | `string` | A short description that briefly summarizes the activity. |
| `id` | `string` | Activity id. |
| `primaryAmount` | `string` | A currency formatted text that describe the primary amount of transaction. |
| `resource` | `map[string]any` | The resource associated with the activity. |
| `secondaryAmount` | `string` | A currency formatted text that describe the secondary amount of transaction. |
| `status` | `string` | Status of the Activity. |
| `title` | `string` | Title of the Activity. |
| `type` | `string` | Type of Activity. |
| `updatedOn` | `string` | Timestamp when the activity was last modified. |

#### Example: List

```go
activitys, err := client.Activity(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range activitys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Address

Create an instance: `address := client.Address(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `map[string]any` | Address details. |
| `id` | `int` | Address ID. |
| `profile` | `int` | User profile ID. |

#### Example: Load

```go
address, err := client.Address(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(address.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
addresss, err := client.Address(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range addresss.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Address(nil).Create(map[string]any{
    "details": map[string]any{},
    "profile": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### AddressRequirement

Create an instance: `addressRequirement := client.AddressRequirement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `map[string]any` | Address details to provide context for requirements lookup. |
| `fields` | `[]any` | List of fields required for the address. |
| `profile` | `int` | User profile ID. |
| `type` | `string` | Always "address". |

#### Example: List

```go
addressRequirements, err := client.AddressRequirement(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range addressRequirements.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.AddressRequirement(nil).Create(map[string]any{
    "details": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Balance

Create an instance: `balance := client.Balance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `map[string]any` | Available balance that can be used to fund transfers. |
| `cashAmount` | `map[string]any` | Cash amount in the account. |
| `creationTime` | `string` | Date when the balance was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `icon` | `any` | Icon for the balance. |
| `id` | `int` | Balance ID. |
| `investmentState` | `string` | Investment state of the balance. |
| `modificationTime` | `string` | Date when the balance was last modified. |
| `name` | `any` | Name of the balance. |
| `overdraft` | `map[string]any` | Overdraft details for the account. |
| `reservedAmount` | `map[string]any` | Amount reserved for transactions. |
| `state` | `string` | Must be `CLOSED`. |
| `targetRecipientId` | `int` | ID of the recipient to receive the refund of the excess funds. |
| `totalAvailable` | `map[string]any` | Total available balance, which is the sum of cash ledger balance and any approved overdraft limit. |
| `totalCash` | `map[string]any` | Total cash balance across all balances, including group balances but excluding asset portfolios. |
| `totalWorth` | `map[string]any` | Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested. |
| `type` | `string` | Type of balance account. |
| `visible` | `bool` | Whether the balance is visible to the user. |

#### Example: Load

```go
balance, err := client.Balance(nil).Load(map[string]any{"id": 1, "currency": "currency", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(balance.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
balances, err := client.Balance(nil).List(map[string]any{"profile_id": 1, "type": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range balances.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BalanceStatement

Create an instance: `balanceStatement := client.BalanceStatement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolder` | `map[string]any` | Account holder information. |
| `bankDetails` | `any` | Local bank details for the account. |
| `endOfStatementBalance` | `map[string]any` | Closing balance for the specified time period. |
| `id` | `string` |  |
| `issuer` | `map[string]any` | Account issuer information. |
| `query` | `map[string]any` | Query parameters used for the request. |
| `transactions` | `[]any` | List of transactions in the statement period. |

#### Example: Load

```go
balanceStatement, err := client.BalanceStatement(nil).Load(map[string]any{"id": 1, "profile_id": 1, "currency": "currency", "interval_end": "interval_end", "interval_start": "interval_start"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(balanceStatement.(sdk.Entity).Data()) // the loaded entity's record
```


### BankAccountDetail

Create an instance: `bankAccountDetail := client.BankAccountDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | Status of the account detail. |
| `currency` | `string` | Account detail currency (ISO 4217 Alphabetic Code). |
| `id` | `string` | Account detail ID. |
| `internationalDetails` | `any` | International bank account details. |
| `localDetails` | `map[string]any` | Local bank account details. |
| `reason` | `string` | Reason for the return. |
| `targetAccountId` | `int` | ID of the currency balance to create account details on. |

#### Example: Create

```go
result, err := client.BankAccountDetail(nil).Create(map[string]any{
    "profile_id": 1,
    "targetAccountId": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BankAccountDetailsOrder

Create an instance: `bankAccountDetailsOrder := client.BankAccountDetailsOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `int` | Unique ID of the issued account details. |
| `balanceId` | `any` | ID of the balance the order is for. |
| `creationTime` | `string` | Timestamp of when the order was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `string` | Unique ID of the order. |
| `modificationTime` | `string` | Timestamp of the last modification to the order. |
| `requirements` | `[]any` | List of requirements to fulfill the order. |
| `status` | `string` | Order status. |

#### Example: List

```go
bankAccountDetailsOrders, err := client.BankAccountDetailsOrder(nil).List(map[string]any{"profile_id": 1, "currency": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range bankAccountDetailsOrders.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.BankAccountDetailsOrder(nil).Create(map[string]any{
    "profile_id": 1,
    "currency": "example_currency",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BatchGroup

Create an instance: `batchGroup := client.BatchGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alreadyPaid` | `bool` | Not applicable to this use case. |
| `fileName` | `any` | If this batch was submitted as a file, this is the given file name. |
| `groupType` | `string` | Whether this batch was submitted over the API or as a file. |
| `id` | `string` | Batch group ID. |
| `name` | `string` | Descriptive name for the batch group. |
| `payInDetails` | `[]any` | List of pay-in details describing how the batch group can be funded. |
| `payinSessionId` | `any` | Optional ID of the payin session. |
| `profileId` | `int` | The ID of the profile this payment belongs to. |
| `shortId` | `int` | Not applicable to this use case. |
| `sourceCurrency` | `string` | Source currency code (ISO 4217 Alphabetic Code). |
| `status` | `string` | Current batch group status: - `NEW` — New batch group with zero or more transfers. |
| `transferIds` | `[]any` | The IDs of all transfers successfully added to the group. |
| `type` | `string` | The method of payment to use. |
| `userId` | `int` | The ID of the user who initiated this payment. |
| `version` | `int` | Batch version, used for concurrency control. |

#### Example: Load

```go
batchGroup, err := client.BatchGroup(nil).Load(map[string]any{"id": "batch_group_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(batchGroup.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BulkSettlement

Create an instance: `bulkSettlement := client.BulkSettlement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransfer` | `float64` | The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative. |
| `refundedTransfers` | `[]any` | Array of transfers for which refunds have been processed. |
| `settlementCurrency` | `string` | The currency in which the transfers in this journal will be settled. |
| `settlementDate` | `string` | The date you send the settlement funds, ISO 8601 format. |
| `settlementReference` | `string` | Reference used when paying the end of day settlement monies to Wise. |
| `transfers` | `[]any` | Array of transfers to be settled. |
| `type` | `string` | Type of settlement. |

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### BusinessProfile

Create an instance: `businessProfile := client.BusinessProfile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abn` | `any` | Australian Business Number (only for Australian businesses). |
| `acn` | `any` | Australian Company Number (only for Australian businesses). |
| `actorEmail` | `string` | Email of the actor. |
| `address` | `map[string]any` | Main registered address of the business. |
| `arbn` | `any` | Australian Registered Body Number (only for Australian businesses). |
| `businessFreeFormDescription` | `string` | Free-form description of the business activities. |
| `businessName` | `string` | Registered business name. |
| `businessNameInKatakana` | `any` | Business name in Katakana (only for Japanese businesses). |
| `businessRepresentative` | `map[string]any` | Business representative details. |
| `companyRole` | `string` | Role of the person managing the business profile. |
| `companyType` | `string` | Type of company. |
| `contactDetails` | `map[string]any` | Contact information for the business. |
| `createdAt` | `string` | Timestamp when the profile was created (ISO 8601 format). |
| `currentState` | `string` | Current status of this profile. |
| `descriptionOfBusiness` | `string` | Deprecated. |
| `email` | `string` | Primary email address for the business. |
| `externalCustomerId` | `string` | An external reference identifier mapping the customer of this profile to your system. |
| `firstLevelCategory` | `string` | Deprecated. |
| `fullName` | `string` | Full legal name of the business. |
| `id` | `int` | Unique identifier for the profile. |
| `industryCategories` | `[]any` | One or more industry categories classifying the business. |
| `operationalAddresses` | `[]any` | An array of operational addresses for the business. |
| `publicId` | `string` | Publicly accessible identifier for the profile. |
| `registrationNumber` | `string` | Business registration number. |
| `secondLevelCategory` | `string` | Deprecated. |
| `type` | `string` | Type of profile. |
| `updatedAt` | `string` | Timestamp when the profile was last updated (ISO 8601 format). |
| `userId` | `int` | The ID of the user associated with this profile. |
| `webpage` | `string` | Business website URL. |

#### Example: Create

```go
result, err := client.BusinessProfile(nil).Create(map[string]any{
    "contactDetails": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Card

Create an instance: `card := client.Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bankIdentificationNumber` | `string` | Bank identification number (BIN) of the card. |
| `cardHolderName` | `string` | Name of the card holder. |
| `cardProgram` | `map[string]any` | Card program details. |
| `clientId` | `string` | Client ID of the partner that issued the card. |
| `creationTime` | `string` | Time when the card was created. |
| `expiryDate` | `string` | Date when the card will expire. |
| `id` | `string` |  |
| `lastFourDigits` | `string` | Last 4 digits of the card number. |
| `modificationTime` | `string` | Time when the card was last modified. |
| `phoneNumber` | `string` | Phone number associated with the card. |
| `profileId` | `int` | Profile ID that owns this card. |
| `status` | `map[string]any` | Current status of the card. |
| `token` | `string` | Unique identifier for the card. |
| `unlockSpendingPermissions` | `string` | Method with which physical card spending permissions can be unlocked. |

#### Example: Load

```go
card, err := client.Card(nil).Load(map[string]any{"id": "card_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(card.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
cards, err := client.Card(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cards.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Card(nil).Create(map[string]any{
    "card_token": "example_card_token",
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CardHolderLimit

Create an instance: `cardHolderLimit := client.CardHolderLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `map[string]any` | The limits to set, per aggregation window. |
| `spendLimits` | `[]any` | Spend limits configured for this cardholder. |
| `type` | `string` | The category of spending the limit applies to. |

#### Example: List

```go
cardHolderLimits, err := client.CardHolderLimit(nil).List(map[string]any{"card_holder_profile_id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cardHolderLimits.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### CardLimit

Create an instance: `cardLimit := client.CardLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `daily` | `any` |  |
| `lifetime` | `any` |  |
| `monthly` | `any` |  |
| `transaction` | `any` |  |

#### Example: Load

```go
cardLimit, err := client.CardLimit(nil).Load(map[string]any{"card_token": "card_token", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardLimit.(sdk.Entity).Data()) // the loaded entity's record
```


### CardOrder

Create an instance: `cardOrder := client.CardOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `map[string]any` | Address set during card order. |
| `cardHolderName` | `string` | Name of the card holder. |
| `cardHolderProfileId` | `int` | The cardholder profile for this card. |
| `cardProgram` | `map[string]any` | The card program associated with this card order. |
| `cardToken` | `any` | Token of the card associated with card order. |
| `city` | `string` | Card holder's city (max 30 characters). |
| `clientId` | `string` | Client ID. |
| `country` | `string` | Card holder's country (ISO 3166-1 alpha-2, max 2 characters). |
| `creationTime` | `string` | Time when the card order is created. |
| `deliveryDetails` | `map[string]any` | Delivery details of a physical card order. |
| `deliveryEstimate` | `string` | The estimated time when the card will be delivered. |
| `deliveryOption` | `string` | The delivery method for the card order. |
| `embossedName` | `string` | The cardholder's name to print on the card (physical card only). |
| `errors` | `[]any` | Collection of validation errors. |
| `firstLine` | `string` | Card holder's address (max 30 characters). |
| `id` | `int` | ID of the card order. |
| `lifetimeLimit` | `any` | Maximum amount of spending on the card once issued. |
| `modificationTime` | `string` | Time when the card order was last modified. |
| `phoneNumber` | `string` | Phone number associated with the card order. |
| `postCode` | `string` | Card holder's postal code (max 10 characters). |
| `profileId` | `int` | Profile ID. |
| `program` | `string` | The name of the card program. |
| `replacementDetails` | `map[string]any` | The replacement details for this card. |
| `replacesCard` | `any` | Token of the card being replaced by this replacement card order. |
| `secondLine` | `any` | Card holder's address (max 30 characters). |
| `state` | `any` | Card holder's state (max 30 characters). |
| `status` | `string` | Status of the card order. |
| `thirdLine` | `any` | Card holder's address (max 30 characters). |

#### Example: Load

```go
cardOrder, err := client.CardOrder(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardOrder.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
cardOrders, err := client.CardOrder(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cardOrders.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.CardOrder(nil).Create(map[string]any{
    "cardHolderName": "example_cardHolderName",
    "program": "example_program",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CardSensitiveDetail

Create an instance: `cardSensitiveDetail := client.CardSensitiveDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `encryptedPayload` | `string` | Your [JWE payload](/guides/product/issue-cards/sensitive-card-details). |
| `key` | `string` | The RSA public key. |
| `keyVersion` | `int` | The version of the key to use. |
| `version` | `int` | Version of the encryption key. |

#### Example: Load

```go
cardSensitiveDetail, err := client.CardSensitiveDetail(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardSensitiveDetail.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.CardSensitiveDetail(nil).Create(map[string]any{
    "encryptedPayload": "example_encryptedPayload",
    "keyVersion": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### CardTransaction

Create an instance: `cardTransaction := client.CardTransaction(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approvalCode` | `any` | Also called authorization code. |
| `arn` | `any` | Acquirer reference number |
| `authorisationMethod` | `string` | Authorisation method |
| `balanceChannelReferenceId` | `any` | Balance channel reference ID associated with the card transaction |
| `billingAmount` | `map[string]any` | Billing amount |
| `cardToken` | `string` | Unique identifier of the card |
| `creationTime` | `string` | When the transaction was created |
| `credits` | `[]any` | Array of credits. |
| `debits` | `[]any` | Array of debits. |
| `declineReason` | `any` | Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable |
| `detailedDeclineReason` | `any` | Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable |
| `fees` | `[]any` | Array of fees |
| `id` | `int` | ID of the transaction |
| `merchant` | `map[string]any` | Merchant information |
| `modificationTime` | `string` | When the transaction was last updated |
| `pinValidationResult` | `any` | PIN validation result. |
| `purgeTime` | `any` | Time at which reserved funds will be released after the authorisation hold expires |
| `relayAuthorisationData` | `any` | Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation) |
| `state` | `string` | The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction. |
| `transactionAmount` | `map[string]any` | Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise |
| `transactionAmountWithFees` | `map[string]any` | Transaction amount including all fees |
| `type` | `string` | [Type](/api-reference/card-transaction#card-transaction-type) of the transaction. |

#### Example: Load

```go
cardTransaction, err := client.CardTransaction(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardTransaction.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
cardTransactions, err := client.CardTransaction(nil).List(map[string]any{"card_token": "example", "profile_id": 1, "from_creation_time": "example", "to_creation_time": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range cardTransactions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Case

Create an instance: `case_ := client.Case(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the case was created. |
| `description` | `string` | The description of the request. |
| `details` | `map[string]any` | Details related to the case. |
| `externalId` | `string` | Partner-created identifier for this case, if applicable. |
| `id` | `int` | Unique identifier of the case. |
| `messages` | `[]any` | List of messages associated with this case. |
| `profileId` | `int` | The profile ID associated with this case. |
| `reference` | `map[string]any` | Reference information linking the case to a related entity. |
| `status` | `string` | The current status of the support case. |
| `subType` | `string` | The sub-type of the support case. |
| `subject` | `string` | The subject of the case. |
| `type` | `string` | The type of the support case. |
| `updatedAt` | `string` | Timestamp when the case was last updated. |

#### Example: Load

```go
case_, err := client.Case(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(case_.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Case(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ClaimAccount

Create an instance: `claimAccount := client.ClaimAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `claimAccountCode` | `string` | The `claim_account_code` to be used in the redirect to Wise. |
| `registrationCode` | `string` | The `registration_code` obtained when [creating the user](/api-reference/user/usercreate). |

#### Example: Create

```go
result, err := client.ClaimAccount(nil).Create(map[string]any{
    "registrationCode": "example_registrationCode",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Comparison

Create an instance: `comparison := client.Comparison(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | The comparison amount |
| `amountType` | `string` | Whether the amount represents a send amount or recipient gets amount |
| `providerCountry` | `any` | Provider country (ISO 3166-1 Alpha-2 code) |
| `providerTypes` | `[]any` | List of provider types included in the response |
| `providers` | `[]any` | List of providers with their estimated quotes |
| `sourceCountry` | `any` | Source country (ISO 3166-1 Alpha-2 code) |
| `sourceCurrency` | `any` | ISO 4217 source currency code |
| `targetCountry` | `any` | Target country (ISO 3166-1 Alpha-2 code) |
| `targetCurrency` | `any` | ISO 4217 target currency code |

#### Example: Load

```go
comparison, err := client.Comparison(nil).Load(map[string]any{"source_currency": "source_currency", "target_currency": "target_currency"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(comparison.(sdk.Entity).Data()) // the loaded entity's record
```


### Contact

Create an instance: `contact := client.Contact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contactId` | `string` | Contact ID in the format of UUID. |
| `identifier` | `string` | A Wise profile's identifier. |
| `name` | `string` | Full name of the contact. |
| `targetCurrency` | `string` | 3 character currency code. |

#### Example: Create

```go
result, err := client.Contact(nil).Create(map[string]any{
    "profile_id": 1,
    "is_direct_identifier_creation": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Currency

Create an instance: `currency := client.Currency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `countryKeywords` | `[]any` | Keywords associated with this currency. |
| `name` | `string` | Display name of this currency. |
| `supportsDecimals` | `bool` | Whether this currency supports decimal values or not. |
| `symbol` | `string` | The symbol of this currency. |

#### Example: List

```go
currencys, err := client.Currency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range currencys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### DeliveryEstimate

Create an instance: `deliveryEstimate := client.DeliveryEstimate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `estimatedDeliveryDate` | `string` | Estimated time when funds will arrive in the recipient's bank account. |
| `formattedEstimatedDeliveryDate` | `string` | A string to display to users for the estimated delivery date. |
| `id` | `string` |  |

#### Example: Load

```go
deliveryEstimate, err := client.DeliveryEstimate(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deliveryEstimate.(sdk.Entity).Data()) // the loaded entity's record
```


### DeliveryUpdate

Create an instance: `deliveryUpdate := client.DeliveryUpdate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delivery_update` | `string` | The delivery signal to simulate. |
| `delivery_update_path` | `[]any` | Delivery signals supported by the simulated route, not a history of events. |
| `estimated_delivery_at` | `any` | Optional estimated delivery time. |
| `observation_id` | `string` | Server-generated observation identifier. |
| `occurred_at` | `string` | Server-generated observation time in UTC with millisecond precision. |
| `scheme` | `any` | Payment scheme to include in the observation. |

#### Example: Create

```go
result, err := client.DeliveryUpdate(nil).Create(map[string]any{
    "transfer_id": 1,
    "delivery_update": "example_delivery_update",
    "delivery_update_path": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DigitalWallet

Create an instance: `digitalWallet := client.DigitalWallet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activation` | `string` | Approve or decline a payment token activation |
| `paymentTokens` | `[]any` |  |
| `walletNames` | `[]any` | List of supported wallet types. |

#### Example: Create

```go
result, err := client.DigitalWallet(nil).Create(map[string]any{
    "card_token": "example_card_token",
    "profile_id": 1,
    "activation": "example_activation",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DirectDebitAccount

Create an instance: `directDebitAccount := client.DirectDebitAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currency` | `string` | Currency of the bank account. |
| `details` | `map[string]any` | Bank account details |
| `id` | `int` | Direct debit account ID |
| `type` | `string` | Payment type for which the account is used. |

#### Example: List

```go
directDebitAccounts, err := client.DirectDebitAccount(nil).List(map[string]any{"profile_id": 1, "currency": "example", "type": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range directDebitAccounts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.DirectDebitAccount(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Director

Create an instance: `director := client.Director(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryOfResidenceIso3Code` | `string` | 3 character country code. |
| `dateOfBirth` | `string` | Date of birth. |
| `directors` | `[]any` |  |
| `firstName` | `string` | Director first name. |
| `id` | `int` | ID of the director. |
| `lastName` | `string` | Director last name. |

#### Example: List

```go
directors, err := client.Director(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range directors.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Director(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Dispute

Create an instance: `dispute := client.Dispute(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `canWithdraw` | `bool` | Whether the dispute can be withdrawn. |
| `createdAt` | `string` | Time when the dispute was created. |
| `createdBy` | `string` | Creator of the dispute. |
| `disclaimer` | `map[string]any` | Acknowledgement fields. |
| `files` | `map[string]any` | Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). |
| `form` | `map[string]any` | Form fields required to submit this dispute. |
| `id` | `string` | Unique identifier of the dispute. |
| `lastUpdatedAt` | `string` | Time when the dispute was last updated. |
| `profileId` | `int` | Profile ID. |
| `reason` | `string` | Dispute reason code. |
| `receipt` | `string` | The file to upload. |
| `status` | `string` | Dispute overall status. |
| `statusMessage` | `string` | Explanation for `subStatus`. |
| `subStatus` | `string` | Dispute detailed status. |
| `transaction` | `map[string]any` | Transaction details for the dispute. |
| `transactionId` | `int` | Card transaction ID. |

#### Example: Load

```go
dispute, err := client.Dispute(nil).Load(map[string]any{"id": "dispute_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dispute.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
disputes, err := client.Dispute(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range disputes.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Dispute(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### DisputeReason

Create an instance: `disputeReason := client.DisputeReason(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | The type of reasons available for the dispute. |
| `description` | `string` | The description of the dispute reason. |
| `isFraud` | `bool` | Flag indicating that the dispute reason is fraud-related. |
| `subOptions` | `[]any` | Optional list of sub-reasons that should be used as the dispute reason. |
| `supportsMultipleTransactions` | `bool` | Whether the dispute supports multiple transactions. |
| `tooltip` | `string` | Text to display when showing the dispute form to your users. |

#### Example: List

```go
disputeReasons, err := client.DisputeReason(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range disputeReasons.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Facetec

Create an instance: `facetec := client.Facetec(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
facetec, err := client.Facetec(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(facetec.(sdk.Entity).Data()) // the loaded entity's record
```


### File

Create an instance: `file := client.File(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp when the file was uploaded. |
| `file` | `string` | The file to upload. |
| `fileId` | `string` | Unique identifier of the uploaded file. |
| `fileName` | `string` | The name of the uploaded file. |
| `profileId` | `int` | The ID of the profile this file belongs to. |
| `purpose` | `string` | The purpose of the file upload. |
| `submissionData` | `map[string]any` | Metadata for the file upload, sent as the `submissionData` part of the multipart request. |

#### Example: List

```go
files, err := client.File(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range files.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Funding

Create an instance: `funding := client.Funding(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balanceTransactionId` | `int` |  |
| `status` | `string` |  |
| `type` | `string` |  |

#### Example: Create

```go
result, err := client.Funding(nil).Create(map[string]any{
    "profile_id": 1,
    "transfer_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### GpiTracking

Create an instance: `gpiTracking := client.GpiTracking(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. |
| `identifierType` | `string` | The type of identifier used to look up the transfer. |
| `transactions` | `[]any` | The matching GPI tracking transactions. |

#### Example: Create

```go
result, err := client.GpiTracking(nil).Create(map[string]any{
    "identifier": "example_identifier",
    "identifierType": "example_identifierType",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### HoldLimitBreach

Create an instance: `holdLimitBreach := client.HoldLimitBreach(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | Amount value. |
| `closingReason` | `string` | Reason the breach was closed, null if state is `OPEN`. |
| `createdAt` | `string` | Date when the hold limit breach was created. |
| `currency` | `string` | Currency code (ISO 4217 Alphabetic Code). |
| `id` | `int` | Hold limit breach ID. |
| `profileId` | `int` | ID of the profile that owns the hold limit breach |
| `state` | `string` | Current state of the hold limit breach. |
| `updatedAt` | `string` | Date when the hold limit breach was last modified. |

#### Example: List

```go
holdLimitBreachs, err := client.HoldLimitBreach(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range holdLimitBreachs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### IncomingTransfer

Create an instance: `incomingTransfer := client.IncomingTransfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountDetailsId` | `string` | Account details ID that received the incoming transfer. |
| `amounts` | `map[string]any` | Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited. |
| `balanceId` | `string` | Balance ID associated with the incoming transfer. |
| `chargeBearer` | `string` | Charge bearer code indicating who pays the transaction fees. |
| `creditTransferType` | `string` | - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. |
| `creditedTime` | `string` | Timestamp when the incoming transfer was credited to the balance. |
| `creditor` | `map[string]any` | The creditor (beneficiary) of the incoming transfer. |
| `debtor` | `map[string]any` | The debtor (ordering party) of the incoming transfer. |
| `endToEndId` | `string` | End-to-end identifier assigned by the debtor for reconciliation purposes. |
| `exchangeRate` | `float64` | Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number. |
| `fees` | `map[string]any` | Breakdown of fees applied to the incoming transfer. |
| `id` | `string` | Unique identifier for the incoming transfer. |
| `previousInstructingAgents` | `[]any` | Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise). |
| `profileId` | `int` | Profile ID of the balance owner. |
| `scheme` | `string` | The payment scheme through which the incoming transfer was received. |
| `state` | `string` | Current state of the incoming transfer. |
| `uetr` | `string` | Universal End-to-End Transaction Reference. |
| `unstructuredReference` | `string` | Unstructured remittance information provided by the debtor. |

#### Example: Load

```go
incomingTransfer, err := client.IncomingTransfer(nil).Load(map[string]any{"id": "incoming_transfer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(incomingTransfer.(sdk.Entity).Data()) // the loaded entity's record
```


### Jose

Create an instance: `jose := client.Jose(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `keyId` | `string` | ID of the key in UUID format. |
| `keyMaterial` | `map[string]any` |  |
| `publicKeyMaterial` | `map[string]any` |  |
| `scope` | `string` | Scope of the key. |
| `validFrom` | `string` | The key is valid from this date. |
| `validTill` | `string` | The key is valid until this date. |
| `version` | `int` | Version of the public key issued. |

#### Example: Load

```go
jose, err := client.Jose(nil).Load(map[string]any{"algorithm": "algorithm", "scope": "scope"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(jose.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Jose(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### KycReview

Create an instance: `kycReview := client.KycReview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp marking the creation of the KYC Review. |
| `id` | `string` | Unique identifier for a KYC Review resource, generated by Wise. |
| `link` | `any` | Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. |
| `redirectUrl` | `any` | URL where the user will be redirected at the end of the flow. |
| `requiredBy` | `any` | Timestamp by which the underlying requirement set needs to be verified to not block the customer. |
| `requirements` | `any` | Nested list of [KYC Requirement](api-reference/kyc-review/kyc-requirement) objects in `[[Requirement]]` format, where each inner list represents a combination of possible requirements to be provided. |
| `status` | `string` | Aggregated state of the underlying requirement set. |
| `triggerData` | `map[string]any` | Object containing data of the underlying product object that triggered the KYC Review. |
| `triggerReferences` | `[]any` | List of trigger reference objects. |
| `type` | `string` | Type of the underlying action or process this KYC Review is for. |
| `updatedAt` | `string` | Timestamp marking the last update of the KYC Review. |

#### Example: Load

```go
kycReview, err := client.KycReview(nil).Load(map[string]any{"id": "kyc_review_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(kycReview.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
kycReviews, err := client.KycReview(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range kycReviews.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.KycReview(nil).Create(map[string]any{
    "profile_id": 1,
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### LinkRequest

Create an instance: `linkRequest := client.LinkRequest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientKey` | `string` | Client key that created the embedded link request. |
| `email` | `string` | The end user's email address, to receive dispute updates. |
| `id` | `string` | Embedded link request ID. |
| `metadata` | `map[string]any` | Flow-specific metadata. |
| `profileId` | `int` | Profile that owns the embedded flow. |
| `redirectUrl` | `string` | URL where Wise redirects the user after the flow resolves. |
| `transactionId` | `int` | The ID of the card transaction to dispute. |
| `type` | `string` | Embedded Flow type. |

#### Example: Load

```go
linkRequest, err := client.LinkRequest(nil).Load(map[string]any{"id": "link_request_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(linkRequest.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Message

Create an instance: `message := client.Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `submissionData` | `map[string]any` | The data for the message submission. |
| `type` | `string` | The type of message submission. |

#### Example: Create

```go
result, err := client.Message(nil).Create(map[string]any{
    "case_id": 1,
    "submissionData": map[string]any{},
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### MultiCurrencyAccount

Create an instance: `multiCurrencyAccount := client.MultiCurrencyAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
multiCurrencyAccount, err := client.MultiCurrencyAccount(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(multiCurrencyAccount.(sdk.Entity).Data()) // the loaded entity's record
```


### OneTimeToken

Create an instance: `oneTimeToken := client.OneTimeToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challenges` | `[]any` | An array of challenges. |
| `faceMap` | `string` | A base64 encoded string. |
| `oneTimeToken` | `string` | A one-time token unique identifier. |
| `validity` | `int` | The One-Time Token expiration in seconds. |

#### Example: Create

```go
result, err := client.OneTimeToken(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Ott

Create an instance: `ott := client.Ott(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actionType` | `string` | The action bound to the one time token. |
| `challenges` | `[]any` | Array of challenge objects. |
| `oneTimeToken` | `string` | Unique identifier of a one time token. |
| `userId` | `int` | Creator of this one time token. |
| `validity` | `int` | Seconds until the one time token becomes expired. |

#### Example: Load

```go
ott, err := client.Ott(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ott.(sdk.Entity).Data()) // the loaded entity's record
```


### Payin

Create an instance: `payin := client.Payin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` |  |
| `currency` | `string` |  |
| `details` | `map[string]any` | Manual input details that can be used by the end user to make the transfer without scanning the QR image. |
| `failureReason` | `string` |  |
| `id` | `string` |  |
| `payinSessionId` | `string` |  |
| `paymentInstrumentId` | `string` |  |
| `qrCodeInBase64` | `string` | An encoded QR image in base64 format, which can be decoded and displayed directly to the end user. |
| `reference` | `string` |  |
| `status` | `string` |  |

#### Example: Create

```go
result, err := client.Payin(nil).Create(map[string]any{
    "payin_session_id": "example_payin_session_id",
    "profile_id": 1,
    "payinSessionId": "example_payinSessionId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PayinDepositDetail

Create an instance: `payinDepositDetail := client.PayinDepositDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `payinBank` | `map[string]any` | Information about the receiving bank. |
| `payinBankAccount` | `map[string]any` | Bank account details to use to send the payment to. |
| `wiseInformation` | `map[string]any` | Information about the receiving Wise entity, the owner of the bank account. |

#### Example: Load

```go
payinDepositDetail, err := client.PayinDepositDetail(nil).Load(map[string]any{"profile_id": 1, "transfer_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(payinDepositDetail.(sdk.Entity).Data()) // the loaded entity's record
```


### Payment

Create an instance: `payment := client.Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | Transfer source amount |
| `currency` | `string` | Transfer source currency |
| `id` | `int` | Payment ID |
| `method` | `string` | The payment method used to pay for the transfer |
| `pricingVariant` | `any` | The qualifier that allows to apply different pricing policy within the same payment method. |
| `timeCreated` | `string` | Date of when payment was created |
| `timeUpdated` | `string` | Date of when payment was updated |

#### Example: List

```go
payments, err := client.Payment(nil).List(map[string]any{"transfer_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range payments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PaymentInitiation

Create an instance: `paymentInitiation := client.PaymentInitiation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
paymentInitiation, err := client.PaymentInitiation(nil).Load(map[string]any{"id": 1, "batch_group_id": "batch_group_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paymentInitiation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.PaymentInitiation(nil).Create(map[string]any{
    "batch_group_id": "example_batch_group_id",
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PaymentInstrument

Create an instance: `paymentInstrument := client.PaymentInstrument(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountHolderName` | `string` |  |
| `accountNumber` | `string` |  |
| `accountOwnerDetails` | `map[string]any` |  |
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

```go
paymentInstrument, err := client.PaymentInstrument(nil).Load(map[string]any{"id": "payment_instrument_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paymentInstrument.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
paymentInstruments, err := client.PaymentInstrument(nil).List(map[string]any{"id": "example", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range paymentInstruments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.PaymentInstrument(nil).Create(map[string]any{
    "profile_id": 1,
    "accountNumber": "example_accountNumber",
    "type": "example_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PaymentIntent

Create an instance: `paymentIntent := client.PaymentIntent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `sourceAmount` | `float64` | Source amount of the payment. |
| `sourceCurrency` | `string` | Source currency code (ISO 4217). |
| `state` | `string` | Current state of the payment intent. |
| `targetAmount` | `float64` | Target amount of the payment. |
| `targetCurrency` | `string` | Target currency code (ISO 4217). |
| `updatedAt` | `string` | Timestamp when the payment intent was last updated. |

#### Example: Load

```go
paymentIntent, err := client.PaymentIntent(nil).Load(map[string]any{"id": "payment_intent_id", "allocation_id": "allocation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paymentIntent.(sdk.Entity).Data()) // the loaded entity's record
```


### PhoneNumber

Create an instance: `phoneNumber := client.PhoneNumber(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | Client ID of which this phone number belongs to. |
| `id` | `int` | ID of the phone number. |
| `phoneNumber` | `string` | A text representation of phone number. |
| `type` | `string` | Type of phone number when used in authentication. |
| `verified` | `bool` | Indicator if phone number is verified. |

#### Example: Create

```go
result, err := client.PhoneNumber(nil).Create(map[string]any{
    "user_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Production

Create an instance: `production := client.Production(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `any` | Detailed description of the error code. |
| `errorCode` | `any` | Code returned when card production is not successful. |
| `kioskId` | `any` | Identifier that specifies which kiosk machine is producing the card. |
| `occurredAt` | `string` | Time when the card production request has been sent to the kiosk machine (ISO 8601 format). |
| `status` | `string` | Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. |

#### Example: Load

```go
production, err := client.Production(nil).Load(map[string]any{"card_token": "card_token", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(production.(sdk.Entity).Data()) // the loaded entity's record
```


### Profile

Create an instance: `profile := client.Profile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `map[string]any` |  |
| `avatar` | `string` |  |
| `contactDetails` | `map[string]any` |  |
| `createdAt` | `string` |  |
| `currentState` | `string` |  |
| `dateOfBirth` | `string` |  |
| `email` | `string` |  |
| `firstName` | `string` |  |
| `fullName` | `string` |  |
| `id` | `int` |  |
| `lastName` | `string` |  |
| `phoneNumber` | `string` |  |
| `preferredName` | `string` |  |
| `publicId` | `string` |  |
| `secondaryAddresses` | `[]any` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `userId` | `int` |  |

#### Example: Load

```go
profile, err := client.Profile(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(profile.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
profiles, err := client.Profile(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range profiles.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Quote

Create an instance: `quote := client.Quote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdTime` | `string` | Quote created timestamp. |
| `creationContext` | `map[string]any` | Used to pass additional metadata about the intended transfer. |
| `expirationTime` | `string` | The date and time the quote expires. |
| `guaranteedTargetAmount` | `bool` | Indicates whether the target amount is guaranteed. |
| `guaranteedTargetAmountAllowed` | `bool` | Indicates whether guaranteed target amount is allowed. |
| `id` | `string` | ID of this quote (GUID format). |
| `notices` | `[]any` | Messages to display to the user. |
| `payOut` | `string` | Mechanism Wise uses to deliver the transfer. |
| `paymentMetadata` | `map[string]any` | _Optional_. |
| `paymentOptions` | `[]any` | List of the methods available to pay for the transfer. |
| `preferredPayIn` | `string` | Preferred pay-in method. |
| `pricingConfiguration` | `map[string]any` | Allows partners to override pricing configurations on a transfer level. |
| `profile` | `int` | Personal or business profile ID. |
| `providedAmountType` | `string` | Indicates whether the quote was created as source or target. |
| `rate` | `float64` | Exchange rate value used for the conversion. |
| `rateExpirationTime` | `string` | Date and time the locked rate expires. |
| `rateType` | `string` | Whether the rate is fixed or floating. |
| `sourceAmount` | `float64` | Amount in source currency to send. |
| `sourceCurrency` | `string` | Source (sending) currency code. |
| `status` | `string` | Current status of the quote. |
| `targetAccount` | `int` | _Optional_. |
| `targetAmount` | `float64` | Amount in target currency to be received by the recipient. |
| `targetAmountAllowed` | `bool` | Indicates whether target amount is allowed. |
| `targetCurrency` | `string` | Target (receive) currency code. |
| `user` | `int` | User ID that created the quote. |

#### Example: Load

```go
quote, err := client.Quote(nil).Load(map[string]any{"id": "quote_id", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(quote.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Quote(nil).Create(map[string]any{
    "sourceCurrency": "example_sourceCurrency",
    "targetCurrency": "example_targetCurrency",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Rate

Create an instance: `rate := client.Rate(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate` | `float64` | Exchange rate value. |
| `source` | `string` | Source (send) currency code. |
| `target` | `string` | Target (receive) currency code. |
| `time` | `string` | Timestamp for exchange rate. |

#### Example: List

```go
rates, err := client.Rate(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range rates.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Recipient

Create an instance: `recipient := client.Recipient(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acceptedOutcomes` | `bool` | Set to `true` to indicate the customer accepted the confirmation outcome. |
| `accountHolderName` | `string` | Recipient full name. |
| `accountId` | `int` | Recipient account ID. |
| `accountSummary` | `string` | Summary of account details for ease of lookup. |
| `active` | `bool` | Status of the recipient account. |
| `commonFieldMap` | `map[string]any` | Map of key lookup fields for the account. |
| `confirmations` | `map[string]any` | Contains verification results for the recipient's details. |
| `country` | `string` | 2-character country code. |
| `creatorId` | `int` | Account entity that owns the recipient account. |
| `currency` | `string` | 3-character currency code. |
| `details` | `map[string]any` | Contains the details of the recipient account specific to its currency and type. |
| `displayFields` | `[]any` | Lookup fields (key/label/value) for rendering in your front-end. |
| `hash` | `string` | Account hash for tracking changes to recipient details. |
| `id` | `int` | ID of the recipient. |
| `isInternal` | `bool` | Indicates whether recipient is internal. |
| `legalEntityType` | `string` | Entity type of recipient account. |
| `longAccountSummary` | `string` | Longer account details summary. |
| `name` | `map[string]any` | Recipient name details. |
| `ownedByCustomer` | `bool` | Inidicates if recipient account belongs to profile owner. |
| `profile` | `int` | Personal or business profile ID of the sender. |
| `profileId` | `int` | Specific profile that owns the recipient account. |
| `quoteId` | `string` | Quote ID. |
| `type` | `string` | Recipient account type. |
| `ultimateBeneficiary` | `any` | The details for the ultimate beneficiary of this recipient. |

#### Example: Load

```go
recipient, err := client.Recipient(nil).Load(map[string]any{"account_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(recipient.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
recipients, err := client.Recipient(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range recipients.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Recipient(nil).Create(map[string]any{
    "acceptedOutcomes": true,
    "ultimateBeneficiary": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Rule

Create an instance: `rule := client.Rule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | The description of the authorisation rule. |
| `id` | `int` | The unique ID for the authorisation rule. |
| `operation` | `string` | Determines whether the transactions should be allowed or blocked. |
| `type` | `string` | The type of authorisation rule. |
| `values` | `[]any` | A list of values based on the `type` of rule configured. |

#### Example: List

```go
rules, err := client.Rule(nil).List(map[string]any{"application_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range rules.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Rule(nil).Create(map[string]any{
    "application_id": "example_application_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Saml

Create an instance: `saml := client.Saml(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `RelayState` | `string` | Opaque state value. |
| `SAMLResponse` | `string` | Base64-encoded SAML `<samlp:Response>` message issued by the identity provider. |

#### Example: Load

```go
saml, err := client.Saml(nil).Load(map[string]any{"registration_id": "registration_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(saml.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.Saml(nil).Create(map[string]any{
    "SAMLResponse": "example_SAMLResponse",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ScaDeviceFingerprint

Create an instance: `scaDeviceFingerprint := client.ScaDeviceFingerprint(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | The device fingerprint creation timestamp. |
| `deviceFingerprintId` | `string` | The identifier of the device fingerprint. |
| `id` | `string` |  |

#### Example: Create

```go
result, err := client.ScaDeviceFingerprint(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ScaFacemap

Create an instance: `scaFacemap := client.ScaFacemap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `faceMap` | `string` | A base64 encoded string. |

#### Example: Create

```go
result, err := client.ScaFacemap(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ScaOtp

Create an instance: `scaOtp := client.ScaOtp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### ScaSession

Create an instance: `scaSession := client.ScaSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.ScaSession(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SettlementAllocation

Create an instance: `settlementAllocation := client.SettlementAllocation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `command` | `map[string]any` |  |
| `createdAt` | `string` | Timestamp when the settlement allocation was created. |
| `currency` | `string` | Currency code for the allocation (ISO 4217). |
| `expectedTotalAmount` | `float64` | Expected total amount for the allocation. |
| `file` | `string` | Settlement Allocation Request (SAR) file containing payment intent details |
| `id` | `string` | Unique identifier of the settlement allocation. |
| `nextPageToken` | `string` | Token for fetching the next page of payment intents. |
| `paymentIntents` | `[]any` | List of payment intents associated with the allocation. |
| `paymentReference` | `string` | Unique payment reference for the settlement allocation. |
| `state` | `string` | Current state of the settlement allocation. |
| `updatedAt` | `string` | Timestamp when the settlement allocation was last updated. |

#### Example: Load

```go
settlementAllocation, err := client.SettlementAllocation(nil).Load(map[string]any{"id": "settlement_allocation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(settlementAllocation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Simulation

Create an instance: `simulation := client.Simulation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `string` |  |
| `created` | `string` |  |
| `creationTime` | `float64` | Time when the card transaction was created. |
| `description` | `any` | Description of the KYC review item. |
| `details` | `map[string]any` |  |
| `failure_reason_code` | `string` | Failure reason code to trigger for payout failure. |
| `hasActiveIssues` | `bool` |  |
| `id` | `string` |  |
| `key` | `string` | KYC review item key. |
| `quote` | `int` |  |
| `rate` | `float64` |  |
| `reference` | `string` |  |
| `sourceAccount` | `string` |  |
| `sourceCurrency` | `string` |  |
| `sourceValue` | `int` |  |
| `state` | `string` | State of the KYC review item. |
| `status` | `string` |  |
| `targetAccount` | `int` |  |
| `targetCurrency` | `string` |  |
| `targetValue` | `float64` |  |
| `transactionId` | `int` | ID of the transaction. |
| `transferRequest` | `string` |  |
| `user` | `int` |  |
| `wise_id` | `int` |  |

#### Example: Load

```go
simulation, err := client.Simulation(nil).Load(map[string]any{"status": "status", "transfer_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(simulation.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
simulations, err := client.Simulation(nil).List(map[string]any{"card_token": "example", "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range simulations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Simulation(nil).Create(map[string]any{
    "transfer_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### SpendControl

Create an instance: `spendControl := client.SpendControl(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ruleId` | `int` | The ID of the applied authorisation rule. |

#### Example: List

```go
spendControls, err := client.SpendControl(nil).List(map[string]any{"application_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range spendControls.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SpendLimit

Create an instance: `spendLimit := client.SpendLimit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aggregateWindow` | `map[string]any` |  |
| `id` | `string` |  |
| `type` | `string` | The type of transaction. |

#### Example: List

```go
spendLimits, err := client.SpendLimit(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range spendLimits.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Subscription

Create an instance: `subscription := client.Subscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Timestamp of when the subscription was created. |
| `created_by` | `map[string]any` |  |
| `delivery` | `map[string]any` |  |
| `id` | `string` | UUID that uniquely identifies the subscription. |
| `name` | `string` | A custom name for your webhook to ease with identification. |
| `scope` | `map[string]any` |  |
| `trigger_on` | `string` | The event type this subscription is listening for. |

#### Example: Load

```go
subscription, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id", "client_key": "client_key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(subscription.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
subscriptions, err := client.Subscription(nil).List(map[string]any{"client_key": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range subscriptions.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### TestNotification

Create an instance: `testNotification := client.TestNotification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Timestamp of when the test notification was created. |
| `delivery_id` | `string` | ID of the delivery that was queued for sending. |

#### Example: Create

```go
result, err := client.TestNotification(nil).Create(map[string]any{
    "client_key": "example_client_key",
    "subscription_id": "example_subscription_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ThirdPartyTransfer

Create an instance: `thirdPartyTransfer := client.ThirdPartyTransfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `string` | Timestamp when transfer was created. |
| `details` | `map[string]any` | Payment Details |
| `hasActiveIssues` | `bool` | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | Transfer ID |
| `originalTransferId` | `string` | Unique identifier randomly generated per transfer request by the calling client |
| `originator` | `map[string]any` | Data block to capture payment originator details |
| `quote` | `string` | Quote ID |
| `rate` | `float64` | Exchange rate value |
| `sourceAccount` | `int` | Refund recipient account ID |
| `sourceCurrency` | `string` | Source currency code |
| `sourceValue` | `float64` | Transfer amount in source currency |
| `status` | `string` | Transfer current status. |
| `targetAccount` | `int` | Recipient account ID |
| `targetCurrency` | `string` | Target currency code |
| `targetValue` | `float64` | Transfer amount in target currency |
| `user` | `int` | Your user ID |

#### Example: Load

```go
thirdPartyTransfer, err := client.ThirdPartyTransfer(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(thirdPartyTransfer.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

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
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### ThreeDSecure

Create an instance: `threeDSecure := client.ThreeDSecure(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `challengeStatus` | `string` | The customer's response to the 3DS challenge. |
| `transactionReference` | `string` | Transaction reference as received in the 3DS challenge webhook event. |

#### Example: Create

```go
result, err := client.ThreeDSecure(nil).Create(map[string]any{
    "profile_id": 1,
    "challengeStatus": "example_challengeStatus",
    "transactionReference": "example_transactionReference",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Token

Create an instance: `token := client.Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | Access token to be used when calling the API. |
| `created_at` | `string` | Token creation time in ISO 8601 format. |
| `expires_at` | `string` | Access token expiration timestamp (UTC). |
| `expires_in` | `int` | Access token expiry time in seconds. |
| `refresh_token` | `string` | Refresh token used to obtain new user access tokens without requiring the user to re-authorise. |
| `refresh_token_expires_at` | `string` | Refresh token expiration timestamp (UTC). |
| `refresh_token_expires_in` | `int` | Refresh token expiry time in seconds. |
| `scope` | `string` | Scope of the token. |
| `token_type` | `string` | Type of the token. |

#### Example: Create

```go
result, err := client.Token(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Transfer

Create an instance: `transfer := client.Transfer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `business` | `any` | Your business profile ID |
| `created` | `string` | Timestamp when transfer was created |
| `customerTransactionId` | `string` | Unique identifier randomly generated per transfer request by the calling client |
| `details` | `map[string]any` |  |
| `hasActiveIssues` | `bool` | Are there any pending issues which stop executing the transfer? |
| `id` | `int` | Transfer ID |
| `payinSessionId` | `string` | ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer |
| `quote` | `any` | V1 quote ID |
| `quoteUuid` | `string` | V2 quote ID |
| `rate` | `float64` | Exchange rate value |
| `reference` | `string` | Deprecated, use `details.reference` instead |
| `sourceAccount` | `any` | Refund recipient account ID |
| `sourceCurrency` | `string` | Source currency code |
| `sourceValue` | `float64` | Transfer amount in source currency |
| `status` | `string` | Transfer current status. |
| `targetAccount` | `int` | Recipient account ID |
| `targetCurrency` | `string` | Target currency code |
| `targetValue` | `float64` | Transfer amount in target currency |
| `transferRequest` | `any` | Deprecated |
| `user` | `int` | Your user ID |

#### Example: Load

```go
transfer, err := client.Transfer(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(transfer.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
transfers, err := client.Transfer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range transfers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Transfer(nil).Create(map[string]any{
    "customerTransactionId": "example_customerTransactionId",
    "quoteUuid": "example_quoteUuid",
    "targetAccount": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### TransferRequirement

Create an instance: `transferRequirement := client.TransferRequirement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `customerTransactionId` | `string` | Unique identifier for the transfer request |
| `details` | `map[string]any` |  |
| `originatorLegalEntityType` | `string` | Type of sender. |
| `quoteUuid` | `string` | V2 quote ID |
| `targetAccount` | `int` | Recipient account ID |

#### Example: Create

```go
result, err := client.TransferRequirement(nil).Create(map[string]any{
    "quoteUuid": "example_quoteUuid",
    "targetAccount": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Ubo

Create an instance: `ubo := client.Ubo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addressFirstLine` | `string` | First line of address. |
| `city` | `string` | City of residential address. |
| `countryOfResidenceIso3Code` | `string` | 3 character country code. |
| `dateOfBirth` | `string` | Date of birth. |
| `id` | `string` | ID of the ultimate beneficial owner. |
| `name` | `string` | Owner full name. |
| `ownershipPercentage` | `int` | Percentage of ownership. |
| `postCode` | `string` | Address post code. |
| `state` | `string` | State or region of residential address. |
| `ubos` | `[]any` |  |

#### Example: List

```go
ubos, err := client.Ubo(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range ubos.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Ubo(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | If user is active or not. |
| `details` | `any` | User details. |
| `email` | `string` | User's email. |
| `id` | `int` | User ID. |
| `language` | `string` | User default language for UI and email communication. |
| `name` | `any` | User's full name. |
| `registrationCode` | `string` | Randomly generated registration code that is unique to this user and request. |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: Create

```go
result, err := client.User(nil).Create(map[string]any{
    "email": "example_email",
    "registrationCode": "example_registrationCode",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Verification

Create an instance: `verification := client.Verification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `required_evidences` | `[]any` | List of evidence types required to complete verification. |

#### Example: List

```go
verifications, err := client.Verification(nil).List(map[string]any{"profile_id": 1}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range verifications.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Verification(nil).Create(map[string]any{
    "profile_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/wise-sdk/go/
├── wise.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/wise-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
comparison := client.Comparison(nil)
comparison.Load(map[string]any{"source_currency": "example", "target_currency": "example"}, nil)

// comparison.Data() now returns the comparison data from the last load
// comparison.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
