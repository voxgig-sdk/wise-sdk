# Wise Platform API

The Wise Platform API is a REST-based interface that enables programmatic access to Wise&#39;s payment infrastructure: quotes, recipients, transfers, balances, cards and the profiles that own them.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 75 entities and 229 HTTP routes. There are 6 SDK targets and 1 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [AccountDetail](docs/api/account_detail.html)

Bank account details by id.

Results: GetAccountDetails 200 response.

SDK operations: `load`.

Key fields to recognise:

- `accountHolderName`: Name of the account holder as it appears on the account details.
- `accountIdentification`: Country/scheme-specific account identification.
- `country`: ISO 3166-1 alpha-2 country code the account details belong to.
- `id`: Unique identifier for the account details.
- `profileId`: Profile ID of the account details owner.

### [AccountRequirement](docs/api/account_requirement.html)

The fields a recipient account needs, for a quote&#39;s route.

Results: Updated account requirements based on provided data.; Dynamic account requirements for building a recipient form.

SDK operations: `create`, `list`.

Key fields to recognise:

- `accountHolderName`: Recipient full name.
- `currency`: 3-character currency code.
- `details`: Contains the details of the recipient account specific to its currency and type.
- `fields`: List of UI field groups to collect required data.
- `ownedByCustomer`: Indicates whether the recipient account is owned by the profile owner.

### [Activity](docs/api/activity.html)

A profile&#39;s activities.

Results: OK - Successfully retrieved activities.

SDK operations: `list`.

Key fields to recognise:

- `createdOn`: Timestamp when the activity was created.
- `description`: A short description that briefly summarizes the activity.
- `id`: Activity id.
- `primaryAmount`: A currency formatted text that describe the primary amount of transaction. Value of this field is intended to have units in it and should not be treated as a numeric value. One example of primaryAmount would be: &quot;Topping up 100 USD balance with 80 GBP&quot;. In this case `100 USD` would be the primaryAmount of the activity.
- `resource`: The resource associated with the activity.

### [Address](docs/api/address.html)

A profile&#39;s address: create or update, list, or get one.

Results: OK - Address successfully created or updated.; OK - Successfully retrieved addresses.; OK - Successfully retrieved the address.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `details`: Address details.
- `id`: Address ID.
- `profile`: User profile ID.

### [AddressRequirement](docs/api/address_requirement.html)

The fields an address needs.

Results: OK - Successfully retrieved address requirements.

SDK operations: `create`, `list`.

Key fields to recognise:

- `details`: Address details to provide context for requirements lookup.
- `fields`: List of fields required for the address.
- `profile`: User profile ID.
- `type`: Always &quot;address&quot;.

### [Balance](docs/api/balance.html)

A balance account: create, list, get or remove one, convert or move money between balances, and get total funds.

Results: Returns 204 No Content on success.; Created - Movement completed successfully.; Created - Balance successfully created.; OK - Successfully retrieved balances.; OK - Successfully retrieved total funds.; OK - Successfully retrieved the balance.; No Content - Balance successfully removed.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `amount`: Available balance that can be used to fund transfers.
- `cashAmount`: Cash amount in the account.
- `creationTime`: When the movement was created.
- `currency`: Currency code.
- `icon`: Icon for the balance.

### [BalanceStatement](docs/api/balance_statement.html)

A balance statement.

Results: OK - Successfully retrieved balance statement.

SDK operations: `load`.

Key fields to recognise:

- `accountHolder`: Account holder information.
- `bankDetails`: Local bank details for the account.
- `endOfStatementBalance`: Closing balance for the specified time period.
- `issuer`: Account issuer information.
- `query`: Query parameters used for the request.

### [BankAccountDetail](docs/api/bank_account_detail.html)

Bank account details: create several, or create a payment return.

Results: Payment return created.; Bank account details created.

SDK operations: `create`.

Key fields to recognise:

- `active`: Status of the account detail.
- `currency`: Account detail currency (ISO 4217 Alphabetic Code).
- `id`: ID of the return created.
- `internationalDetails`: International bank account details. Only returned if SWIFT payments are supported for that currency.
- `localDetails`: Local bank account details.

### [BankAccountDetailsOrder](docs/api/bank_account_details_order.html)

An order for bank account details: create one, or list them.

Results: Bank account details order created. The objects in the `requirements` array include the type and status of each requirement. All requirements must be fulfilled to complete the order.; A list of bank account detail orders.

SDK operations: `create`, `list`.

Key fields to recognise:

- `accountDetailsId`: Unique ID of the issued account details. Populated only for completed orders.
- `balanceId`: ID of the balance the order is for. If null, primary balance can be assumed.
- `creationTime`: Timestamp of when the order was created.
- `currency`: Currency code (ISO 4217 Alphabetic Code).
- `id`: Unique ID of the order.

### [BatchGroup](docs/api/batch_group.html)

A batch group of transfers: create, get or update one, add a transfer, or fund it from a balance.

Results: Batch group funded successfully.; Transfer created successfully. Returns a transfer object.; Batch group created successfully. Note that `payInDetails` is empty for newly created batch groups.; Batch group retrieved successfully.; Batch group updated successfully.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `alreadyPaid`: Not applicable to this use case.
- `fileName`: If this batch was submitted as a file, this is the given file name.
- `groupType`: Whether this batch was submitted over the API or as a file.
- `id`: Unique batch group ID.
- `name`: Descriptive name.

### [BulkSettlement](docs/api/bulk_settlement.html)

A settlement journal.

Results: Settlement journal received successfully. Empty response body.

SDK operations: `create`.

Key fields to recognise:

- `balanceTransfer`: The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative.
- `refundedTransfers`: Array of transfers for which refunds have been processed.
- `settlementCurrency`: The currency in which the transfers in this journal will be settled.
- `settlementDate`: The date you send the settlement funds, ISO 8601 format.
- `settlementReference`: Reference used when paying the end of day settlement monies to Wise.

### [BusinessProfile](docs/api/business_profile.html)

A business profile: create or update one.

Results: Created business profile.; Updated business profile.

SDK operations: `create`, `update`.

Key fields to recognise:

- `abn`: Australian Business Number (only for Australian businesses).
- `acn`: Australian Company Number (only for Australian businesses).
- `actorEmail`: Email of the actor.
- `address`: Main registered address of the business.
- `arbn`: Australian Registered Body Number (only for Australian businesses).

### [Card](docs/api/card.html)

A card: list a profile&#39;s cards, get one, update its status or permissions, or reset its PIN count.

Results: PIN count reset successfully.; Card permissions retrieved successfully.; List of cards retrieved successfully.; Card details retrieved successfully.; Permissions updated successfully.; Card status updated successfully.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `bankIdentificationNumber`: Bank identification number (BIN) of the card.
- `cardHolderName`: Name of the card holder.
- `cardProgram`: Card program details.
- `clientId`: Client ID of the partner that issued the card.
- `creationTime`: Time when the card was created.

### [CardHolderLimit](docs/api/card_holder_limit.html)

A cardholder&#39;s spending limits.

Results: Cardholder spend limits.; Spend limits removed. No response body.; Updated cardholder spend limits. See Retrieve cardholder limits.

SDK operations: `list`, `remove`, `update`.

Key fields to recognise:

- `aggregateWindow`: The limits per aggregation window. A window is `null` when no limit is configured for it.
- `spendLimits`: Spend limits configured for this cardholder. These limits apply to the cardholder&#39;s combined spending across all cards belonging to them, rather than to an individual card or the entire business profile. Empty when no cardholder limits are configured. Currently contains at most one entry, representing the `PURCHASE` limit type.
- `type`: The category of spending the limit applies to.

### [CardLimit](docs/api/card_limit.html)

A card&#39;s spending limits.

Results: Card spend limits.; Updated card spend limits. See Retrieve card limits.

SDK operations: `load`, `update`.

### [CardOrder](docs/api/card_order.html)

A card order: create one, list or get them, update its status, and check requirements, programs and addresses.

Results: OK - Card order created successfully.; OK - Validation result returned. An empty errors collection means the address is valid.; OK - Successfully retrieved card order requirements.; OK - Successfully retrieved card orders.; OK - Successfully retrieved available card programs.; OK - Successfully retrieved card order.; Accepted - Card order status update has been accepted.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `address`: Address set during card order. **Required** for physical cards. **Optional** for virtual cards (defaults to the profile address, if omitted). Fields vary by country. See the card address validation guide for country-specific fields and validation rules.
- `cardHolderName`: Name of the card holder.
- `cardHolderProfileId`: The cardholder profile for this card.
- `cardProgram`: The card program associated with this card order. A Card Program is what Wise refers to all the cards that you will be issuing with us, grouped by product type and by issuing country.
- `cardToken`: Token of the card associated with card order. Nullable.

### [CardSensitiveDetail](docs/api/card_sensitive_detail.html)

A card&#39;s sensitive details and PIN, read or set with client-side encryption.

Results: Sensitive card details retrieved successfully.; Card PIN retrieved successfully.; OK - PIN set successfully.; RSA encryption key retrieved successfully.

SDK operations: `create`, `load`.

Key fields to recognise:

- `encryptedPayload`: Your JWE payload.
- `key`: The RSA public key.
- `keyVersion`: The version of the key to use.
- `version`: Version of the encryption key.

### [CardTransaction](docs/api/card_transaction.html)

A card transaction.

Results: Card transactions retrieved successfully.; Card transaction retrieved successfully.

SDK operations: `list`, `load`.

Key fields to recognise:

- `approvalCode`: Also called authorization code. This can be used to prove ownership of a customer&#39;s card/account to a merchant
- `arn`: Acquirer reference number
- `authorisationMethod`: Authorisation method
- `balanceChannelReferenceId`: Balance channel reference ID associated with the card transaction
- `billingAmount`: Billing amount

### [Case](docs/api/case.html)

A support case.

Results: Created case.; Case details retrieved successfully.

SDK operations: `create`, `load`.

Key fields to recognise:

- `createdAt`: When the case was originally created.
- `description`: The description of the request.
- `details`: Details related to the case.
- `externalId`: An ID provided by the external partner for partner internal tracking.
- `id`: Case ID. Generated by Wise.

### [ClaimAccount](docs/api/claim_account.html)

A claim account code.

Results: Claim account code generated successfully.

SDK operations: `create`.

Key fields to recognise:

- `claimAccountCode`: The `claim_account_code` to be used in the redirect to Wise.
- `registrationCode`: The `registration_code` obtained when creating the user.

### [Comparison](docs/api/comparison.html)

A comparison of what providers charge for a transfer.

Results: Comparison data retrieved successfully.

SDK operations: `load`.

Key fields to recognise:

- `amount`: The comparison amount
- `amountType`: Whether the amount represents a send amount or recipient gets amount
- `providerCountry`: Provider country (ISO 3166-1 Alpha-2 code)
- `providerTypes`: List of provider types included in the response
- `providers`: List of providers with their estimated quotes

### [Contact](docs/api/contact.html)

A contact, created from an identifier.

Results: Contact created successfully.

SDK operations: `create`.

Key fields to recognise:

- `contactId`: Contact ID in the format of UUID.
- `identifier`: A Wise profile&#39;s identifier.
- `name`: Full name of the contact.
- `targetCurrency`: 3 character currency code.

### [Currency](docs/api/currency.html)

A currency Wise allows for transfers.

Results: List of currencies allowed for transfers.

SDK operations: `list`.

Key fields to recognise:

- `code`: Currency code (ISO 4217 Alphabetic Code).
- `countryKeywords`: Keywords associated with this currency.
- `name`: Display name of this currency.
- `supportsDecimals`: Whether this currency supports decimal values or not.
- `symbol`: The symbol of this currency.

### [DeliveryEstimate](docs/api/delivery_estimate.html)

The delivery estimate for a transfer.

Results: Delivery estimate for the transfer.

SDK operations: `load`.

Key fields to recognise:

- `estimatedDeliveryDate`: Estimated time when funds will arrive in the recipient&#39;s bank account.
- `formattedEstimatedDeliveryDate`: A string to display to users for the estimated delivery date.

### [DeliveryUpdate](docs/api/delivery_update.html)

A simulated transfer delivery update (Sandbox).

Results: Observation accepted for asynchronous webhook processing.

SDK operations: `create`.

Key fields to recognise:

- `delivery_update`: The delivery signal to simulate.
- `delivery_update_path`: Delivery signals supported by the simulated route, not a history of events.
- `estimated_delivery_at`: Optional estimated delivery time.
- `observation_id`: Server-generated observation identifier. Matches `data.observation_id` in the webhook.
- `occurred_at`: Server-generated observation time in UTC with millisecond precision. Matches `data.occurred_at` in the webhook.

### [DigitalWallet](docs/api/digital_wallet.html)

A card in a digital wallet: Apple Pay and Google Pay provisioning, and payment tokens.

Results: No Content - Payment token have been successfully activated or declined; Returns all the payment tokens except deactivated.; Encrypted cardholder information for Apple Pay.; Encrypted cardholder information for Google Pay.

SDK operations: `create`.

Key fields to recognise:

- `activation`: Approve or decline a payment token activation
- `walletNames`: List of supported wallet types.

### [DirectDebitAccount](docs/api/direct_debit_account.html)

A direct debit account.

Results: Direct debit account created successfully.; List of direct debit accounts matching the filters.

SDK operations: `create`, `list`.

Key fields to recognise:

- `currency`: Currency of the bank account. 3-character currency code,  `USD` for ACH, `CAD` for EFT
- `details`: Bank account details
- `id`: Direct debit account ID
- `type`: Payment type for which the account is used. - `ACH` , US direct debit (USD) - `EFT` , CA direct debit (CAD)

### [Director](docs/api/director.html)

A business profile&#39;s directors.

Results: List of all directors associated with the business profile.; List of director objects.; List of all directors deleted from the business profile.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `countryOfResidenceIso3Code`: 3 character country code.
- `dateOfBirth`: Date of birth.
- `firstName`: Director first name.
- `id`: ID of the director. Automatically set.
- `lastName`: Director last name.

### [Dispute](docs/api/dispute.html)

A card transaction dispute: submit, list, get or withdraw one, or upload a file for it.

Results: Dynamic Flow JSON response. If using the Dynamic Flow framework, pass this to the framework. If using the API directly, the response can be ignored.; A key-value pair mapping the file name to the assigned file ID.; Paginated list of disputes.; The dispute.; The updated dispute.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `canWithdraw`: Whether the dispute can be withdrawn.
- `createdAt`: Time when the dispute was created.
- `createdBy`: Creator of the dispute. Currently set to the user ID.
- `disclaimer`: Acknowledgement fields.
- `files`: Key-value pairs mapping file field names to file IDs obtained from the file upload endpoint.

### [DisputeReason](docs/api/dispute_reason.html)

The reasons a dispute can give.

Results: List of dispute reasons.

SDK operations: `list`.

Key fields to recognise:

- `code`: The type of reasons available for the dispute. Top-level codes include `ATM_DISPENSED_NO_FUNDS`, `WRONG_AMOUNT`, `TROUBLE_WITH_GOODS_SERVICES`, `MERCHANT_CHARGED_AGAIN`, `NO_REFUND`, `UNAUTHORIZED`. If a reason has `subOptions`, use the sub-option reason code when submitting a dispute.
- `description`: The description of the dispute reason.
- `isFraud`: Flag indicating that the dispute reason is fraud-related.
- `subOptions`: Optional list of sub-reasons that should be used as the dispute reason.
- `supportsMultipleTransactions`: Whether the dispute supports multiple transactions.

### [Facetec](docs/api/facetec.html)

Wise&#39;s FaceTec public key.

Results: Plain text containing the public key.

SDK operations: `load`.

### [File](docs/api/file.html)

A file for a case.

Results: File uploaded successfully; Paginated list of files.

SDK operations: `create`, `list`.

Key fields to recognise:

- `createdAt`: Timestamp when the file was uploaded. Format: ISO 8601 datetime without timezone (server timezone is UTC).
- `file`: The file to upload.
- `fileId`: Unique identifier of the uploaded file (UUID v4).
- `fileName`: The original name of the uploaded file.
- `profileId`: The ID of the profile this file belongs to.

### [Funding](docs/api/funding.html)

The funding of a transfer.

Results: FundTransfer 201 response.

SDK operations: `create`.

Key fields to recognise:

- `balanceTransactionId`: ID of the balance transaction created to settle the transfer.
- `status`: Outcome of the funding attempt.

### [GpiTracking](docs/api/gpi_tracking.html)

A SWIFT gpi tracking lookup.

Results: Returns matching GPI tracking transactions.

SDK operations: `create`.

Key fields to recognise:

- `identifier`: The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`.
- `identifierType`: The type of identifier used to look up the transfer.
- `transactions`: The matching GPI tracking transactions.

### [HoldLimitBreach](docs/api/hold_limit_breach.html)

A breach of a balance hold limit.

Results: Successfully returned list of hold limit breaches.

SDK operations: `list`.

Key fields to recognise:

- `amount`: Amount value.
- `closingReason`: Reason the breach was closed, null if state is `OPEN`.
- `createdAt`: Date when the hold limit breach was created.
- `currency`: Currency code (ISO 4217 Alphabetic Code).
- `id`: Hold limit breach ID.

### [IncomingTransfer](docs/api/incoming_transfer.html)

An incoming transfer.

Results: GetIncomingTransfer 200 response.

SDK operations: `load`.

Key fields to recognise:

- `accountDetailsId`: Account details ID that received the incoming transfer. A balance may have multiple account details (for example multiple IBANs). This identifies the specific one that was credited. Omitted when the payment was received via correspondent model.
- `amounts`: Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited.
- `balanceId`: Balance ID associated with the incoming transfer. This is the balance that was credited.
- `chargeBearer`: Charge bearer code indicating who pays the transaction fees. Omitted if not specified in the payment message.
- `creditTransferType`: - `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution. - `FI_CREDIT_TRANSFER` - Direct bank-to-bank settlement, liquidity movement, or cover transfer where both parties are financial institutions.

### [Jose](docs/api/jose.html)

JOSE keys, and a playground for testing JWS and JWE signing and encryption.

Results: Signed and encrypted response.; Encrypted response.; Encrypted response using direct encryption.; Signed response.; Public key created successfully.; Public key object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `keyId`: Unique public key identifier in UUID format.
- `keyMaterial`: Public key material in DER (Distinguished Encoding Rules) format and base64 encoded.
- `scope`: Scope of the payload operation.
- `validFrom`: The key is valid from this date. Format: `yyyy-MM-dd HH:mm:ss` (UTC).
- `validTill`: The key is valid until this date. Format: `yyyy-MM-dd HH:mm:ss` (UTC).

### [KycReview](docs/api/kyc_review.html)

A KYC review: create, list, get or update one, or submit a requirement.

Results: KYC requirement successfully submitted.; KYC Review successfully created.; Returns a list of KYC Review objects for the profile. Returns an empty list if no KYC Review exists for the profile.; Returns the KYC Review object including the `requirements` field.; Returns the updated KYC Review object.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `createdAt`: Timestamp marking the creation of the KYC Review.
- `id`: Unique identifier for a KYC Review resource, generated by Wise.
- `link`: Contains the URL and expiry of said URL the end customer needs to be directed to in order to go through Hosted KYC flow. `link` is returned only when `status` is `WAITING_CUSTOMER_INPUT` and Update redirect URL is called.
- `redirectUrl`: URL where the user will be redirected at the end of the flow. Can contain query params and path fragments. It has to be a valid URL as per [RFC 2396](https://www.ietf.org/rfc/rfc2396.txt). Provided by the caller in the Update redirect URL call.
- `requiredBy`: Timestamp by which the underlying requirement set needs to be verified to not block the customer. Only relevant if the status is `PASSED_WITH_REQUIREMENTS`.

### [LinkRequest](docs/api/link_request.html)

An embedded-flow link request, for KYC, payment instruments, recipients or disputes.

Results: Embedded link request created.; Embedded link request found.

SDK operations: `create`, `load`.

Key fields to recognise:

- `clientKey`: Client key that created the embedded link request.
- `email`: The end user&#39;s email address, to receive dispute updates.
- `id`: Embedded link request ID.
- `metadata`: Flow-specific metadata.
- `profileId`: Profile that owns the embedded flow.

### [Message](docs/api/message.html)

A message on a case.

Results: Message submitted successfully.

SDK operations: `create`.

Key fields to recognise:

- `submissionData`: The data for the message submission.
- `type`: The type of the created message.

### [MultiCurrencyAccount](docs/api/multi_currency_account.html)

The multi-currency account: eligibility, and its available and payin currencies.

Results: List of currencies available for balance accounts.; List of currencies available for payin with bank account details.; Eligibility result.

SDK operations: `list`, `load`.

### [OneTimeToken](docs/api/one_time_token.html)

A strong customer authentication check: a device fingerprint, PIN or facemap.

Results: The device fingerprint has been successfully verified.; The PIN has been successfully verified.; The facemap has been successfully verified.

SDK operations: `create`.

Key fields to recognise:

- `challenges`: An array of challenges.
- `faceMap`: A base64 encoded string.
- `oneTimeToken`: A one-time token unique identifier.
- `validity`: The One-Time Token expiration in seconds.

### [Ott](docs/api/ott.html)

A one-time token: verify its SMS, voice or WhatsApp challenge, or get its status.

Results: One time token status.

SDK operations: `create`, `load`.

Key fields to recognise:

- `actionType`: The action bound to the one time token. For example, `BALANCE__GET_STATEMENT` when we want to retrieve a balance account statement.
- `challenges`: Array of challenge objects.
- `oneTimeToken`: Unique identifier of a one time token.
- `userId`: Creator of this one time token.
- `validity`: Seconds until the one time token becomes expired.

### [Payin](docs/api/payin.html)

A payin.

Results: PayNow payment object.; OK.

SDK operations: `create`.

Key fields to recognise:

- `amount`: Transfer amount.
- `currency`: Currency.
- `details`: Manual input details that can be used by the end user to make the transfer without scanning the QR image.
- `qrCodeInBase64`: An encoded QR image in base64 format, which can be decoded and displayed directly to the end user.
- `reference`: Payment reference used for linking the PayNow transaction to the transfer created by the profile.

### [PayinDepositDetail](docs/api/payin_deposit_detail.html)

The bank transfer details for paying in to a transfer.

Results: Payin deposit detail object.

SDK operations: `load`.

Key fields to recognise:

- `payinBank`: Information about the receiving bank.
- `payinBankAccount`: Bank account details to use to send the payment to.
- `wiseInformation`: Information about the receiving Wise entity, the owner of the bank account.

### [Payment](docs/api/payment.html)

A transfer&#39;s completed payments.

Results: Returns a list of completed payment objects.

SDK operations: `list`.

Key fields to recognise:

- `amount`: Transfer source amount
- `currency`: Transfer source currency
- `id`: Payment ID
- `method`: The payment method used to pay for the transfer
- `pricingVariant`: The qualifier that allows to apply different pricing policy within the same payment method. Often the value might be the payment method itself

### [PaymentInitiation](docs/api/payment_initiation.html)

A payment initiation.

Results: Payment initiation created successfully. You need to save payment initiation ID for tracking its status later.; Payment initiation retrieved successfully.

SDK operations: `create`, `load`.

Key fields to recognise:

- `id`: Payment initiation ID.

### [PaymentInstrument](docs/api/payment_instrument.html)

A payment instrument: create, get or confirm one, or list its payins.

Results: OK.

SDK operations: `create`, `list`, `load`.

### [PaymentIntent](docs/api/payment_intent.html)

A payment intent.

Results: Payment intent details retrieved successfully.

SDK operations: `load`.

Key fields to recognise:

- `allocationId`: Unique identifier of the associated settlement allocation.
- `allocationType`: Type of allocation.
- `createdAt`: Timestamp when the payment intent was created.
- `fundingSource`: Source of funding for the payment.
- `id`: Unique identifier of the payment intent.

### [PhoneNumber](docs/api/phone_number.html)

A user&#39;s phone number.

Results: OK.

SDK operations: `create`.

Key fields to recognise:

- `clientId`: Client ID of which this phone number belongs to.
- `id`: ID of the phone number.
- `phoneNumber`: A text representation of phone number.
- `type`: Type of phone number when used in authentication. Only **PRIMARY** is supported at the moment.
- `verified`: Indicator if phone number is verified.

### [Production](docs/api/production.html)

A card&#39;s production status.

Results: OK - Successfully retrieved card production status.; OK - The card information has been successfully sent to the kiosk machine.

SDK operations: `load`, `update`.

Key fields to recognise:

- `description`: Detailed description of the error code.
- `errorCode`: Code returned when card production is not successful. Nullable. **Request errors** - Returned when `status` is `REQUEST_ERROR`: - `UNKNOWN_ERROR` - An error occurred on the server - `REQUEST_ALREADY_EXISTS` - The request has already been submitted - `KIOSK_ID_NOT_FOUND` - The kiosk ID does not exist - `CARD_TYPE_NOT_FOUND` - The card type does not exist - `INVALID_FIELD_VALUE` - Some field values are unexpected - `INVALID_PIN_FORMAT` - The PIN does not follow ISO0 or ISO2 standard - `EMPTY_OR_NULL_FIELD_VALUE` - Some required fields are empty or null - `EMPTY_OR_NULL_OR_WRONG_SIZE_FIELD_VALUE` - Some required fields are empty, null, or have incorrect lengths - `CHARSET_NOT_SUPPORTED` - The character set for some fields is not supported - `INVALID_FIELD_FORMAT` - Some field formats are invalid - `INVALID_FIELD_ENCODING` - The encoding for some fields is not expected - `CDATA_ENCODING_OR_FORMATING_ERROR` - The encoding or formatting for XML text field values is incorrect - `PIN_LENGTH_ERROR` - The PIN length is incorrect - `PIN_VERIFICATION_FAILED` - The PIN cannot be verified because the server is unreachable - `DATA_PREPARATION_FAILED` - The server failed to parse the request - `PARTIAL_DATA_RECEIVED` - Only part of the expected data has been received - `NO_BRANCH_LINKED_TO_KIOSK` - The kiosk has not been linked to any branch - `IMAGE_SERVER_ERROR` - The image server is unreachable or failed to process the data - `PAN_ALREADY_EXISTS` - The PAN already exists - `PRINTER_OR_SATELLITE_NOT_READY` - The printer or satellite is not ready to start the production - `REQUEST_CREATED_BUT_NOT_STARTED` - The request has been created, but production is pending until the printer or satellite is ready - `UNABLE_TO_ACCEPT_REQUEST` - The system is currently busy and cannot accept new requests at this time **Production errors** - Returned when `status` is `PRODUCTION_ERROR`: - `CB_NOT_AVAILABLE` - Main server error: central base not available - `CB_DB_NOT_AVAILABLE` - Main server error: database not available - `CB_NETWORK_NOT_AVAILABLE` - Main server error: network not available - `CB_AUTHENTICATION_FAILED` - Main server error: user authentication verification failed - `CB_SERVICE_NOT_ALLOWED` - Main server error: the accessed service requires a higher security level - `CB_TIME` - Main server error: timeout occurred on the Central Base side - `DP_NOT_AVAILABLE` - Data processing error: the Data preparation module is not available - `DP_IO_ERROR` - Data processing error: Input/Output error when communicating with the DP - `DP_TIMEOUT` - Data processing error: timeout error - `SAT_SERVER_NOT_REACHABLE` - Satellite agent error: the server is not reachable - `SAT_AUTHENTICATION_FAILED` - Satellite agent error: user authentication failed on satellite - `SAT_NETWORK_NOT_AVAILABLE` - Satellite agent error: the network is not available - `PRT_NOT_REACHABLE` - Printer error: printer is not reachable - `PRT_SETUP_ERROR` - Printer error: printer setup is incorrect - `PRT_TIMEOUT` - Printer error: printer timeout - `PRT_RIBBON` - Printer error: ribbon error - `PRT_LOCK_ERROR` - Printer error: printer physically unlocked - `PRT_RIBBON_MISSING` - Printer error: ribbon is missing - `PRT_RIBBON_ENDED` - Printer error: ribbon has ended - `PRT_COVER_OPEN` - Printer error: printer cover is open - `PRT_PAUSED` - Printer error: printer paused - `PRD_UNEXPECTED_DATA` - Production error: production data is incorrect - `PRD_FEEDER_EMPTY` - Production error: feeder is empty - `PRD_FEEDER_JAM` - Production error: feeder card jam - `PRD_HOPPER_FULL` - Production error: hopper is full - `PRD_HOPPER_DOOR` - Production error: hopper door is open - `PRD_HOPPER_JAM` - Production error: hopper card jam - `PRD_MAGSTRIPE` - Production error: error occurred during magstripe encoding - `PRD_SMARTCARD` - Production error: error occurred during chip personalization - `PRD_EMBOSSER` - Production error: error occurred during embossing - `PRD_TIMEOUT` - Production error: production timeout has been reached - `PRD_REJECT_FULL` - Production error: reject box is full - `PRD_SMARTCARD_CARD_NOT_IN_READER` - Production error: card is not in reader - `PRD_FINAL_VALIDATION_NOK` - Production error: user has rejected card production - `INV_NOT_INITIALIZED` - Production error: inventory not initialized - `UNKNOWN_ERROR` - Unknown error
- `kioskId`: Identifier that specifies which kiosk machine is producing the card. When the status is `READY`, this value is null.
- `occurredAt`: Time when the card production request has been sent to the kiosk machine (ISO 8601 format).
- `status`: Current production status: - `READY` - Card is ready for production - `IN_PROGRESS` - Card is in production at the kiosk machine - `PRODUCED` - Card is produced and collected. This is a final state - `PRODUCTION_ERROR` - Card production failed - `REQUEST_ERROR` - Card production request failed

### [Profile](docs/api/profile.html)

A personal or business profile, the owner of balances, recipients and transfers.

Results: The PIN has been successfully created.; Verification status response.; OK - Excess money account configured successfully.; Update window opened successfully.; Identification document created successfully.; No Content - Document successfully uploaded.; Created personal profile.; Array of profile objects. Note that there might be more than one business profile returned in the response.; OK - Successfully retrieved deposit limits.; Profile object.; Business representative object.; Multi currency account object.; The PIN has been deleted.; Update window closed successfully.; Business representative updated successfully.; Updated personal profile.; Identification document updated successfully.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `address`: Main registered address of the profile.
- `avatar`: Link to person avatar image.
- `contactDetails`: Contact information for the profile.
- `createdAt`: Timestamp when the profile was created (ISO 8601 format).
- `currentState`: Current status of this profile.

### [Quote](docs/api/quote.html)

A quote for a transfer: its exchange rate and fees.

Results: Returns a quote object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `createdTime`: Quote created timestamp.
- `creationContext`: Used to pass additional metadata about the intended transfer.
- `expirationTime`: The date and time the quote expires.
- `guaranteedTargetAmount`: Indicates whether the target amount is guaranteed.
- `guaranteedTargetAmountAllowed`: Indicates whether guaranteed target amount is allowed.

### [Rate](docs/api/rate.html)

Current and historical exchange rates.

Results: List of exchange rate values which meet your query criteria.

SDK operations: `list`.

Key fields to recognise:

- `rate`: Exchange rate value.
- `source`: Source (send) currency code.
- `target`: Target (receive) currency code.
- `time`: Timestamp for exchange rate.

### [Recipient](docs/api/recipient.html)

A recipient account: create, list, get or deactivate one.

Results: Returns the compatibility result, including any verification outcomes. See the Recipient verification guide for details about handling the `confirmations` object.; Recipient account created successfully.; Paginated list of recipient accounts.; Recipient account details.; Recipient returned with `active=false`.; Recipient with updated confirmation status.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `acceptedOutcomes`: Indicates whether we&#39;ve received an explicit customer acceptance.
- `accountHolderName`: Recipient full name.
- `accountId`: Recipient account ID.
- `accountSummary`: Summary of account details for ease of lookup. Can be used to display recipient details in your UI.
- `active`: Status of the recipient account.

### [Rule](docs/api/rule.html)

An authorisation rule for card spend.

Results: The created rule.; A list of authorisation rules.

SDK operations: `create`, `list`.

Key fields to recognise:

- `description`: The description of the authorisation rule.
- `id`: The unique ID for the authorisation rule.
- `operation`: Determines whether the transactions should be allowed or blocked.
- `type`: The type of authorisation rule.
- `values`: A list of values based on the `type` of rule configured.

### [Saml](docs/api/saml.html)

SAML single sign-on.

Results: The service provider metadata.

SDK operations: `create`, `load`.

Key fields to recognise:

- `RelayState`: Opaque state value.
- `SAMLResponse`: Base64-encoded SAML `&lt;samlp:Response&gt;` message issued by the identity provider.

### [ScaDeviceFingerprint](docs/api/sca_device_fingerprint.html)

A device fingerprint, for strong customer authentication.

Results: The device fingerprint has been successfully created.; The device fingerprint has been deleted.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `createdAt`: The device fingerprint creation timestamp.
- `deviceFingerprintId`: The identifier of the device fingerprint.

### [ScaFacemap](docs/api/sca_facemap.html)

A facemap, for strong customer authentication.

Results: The facemap has been successfully created.; The facemap has been deleted.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `faceMap`: A base64 encoded string.

### [ScaOtp](docs/api/sca_otp.html)

A one-time-password challenge by SMS, voice or WhatsApp, for strong customer authentication.

Results: Trigger result with obfuscated phone number.; No Content.

SDK operations: `create`, `remove`.

### [ScaSession](docs/api/sca_session.html)

A strong customer authentication session.

Results: A list of challenges to clear SCA.

SDK operations: `create`.

### [SettlementAllocation](docs/api/settlement_allocation.html)

A settlement allocation request.

Results: Settlement allocation request accepted; Settlement allocation details retrieved successfully.

SDK operations: `create`, `load`.

Key fields to recognise:

- `createdAt`: Creation timestamp
- `currency`: Currency code
- `expectedTotalAmount`: Expected total amount
- `file`: Settlement Allocation Request (SAR) file containing payment intent details
- `id`: Unique identifier of the settlement allocation request

### [Simulation](docs/api/simulation.html)

Sandbox simulations: transfers, cards, KYC reviews, top-ups and incoming payments.

Results: Simulated card authorisation.; Simulated transaction clearing result.; Card production state changed successfully.; Simulated transaction reversal result.; Requirement added successfully. No content returned.; Requirement submitted successfully. No content returned.; KYC review verified successfully. No content returned.; Bank transaction imported successfully. No content returned.; Swift payment simulated successfully.; Verification state changed successfully. No content returned.; Successful initiation of payout failure.; Simulated balance top-up result.; Sanction case successfully closed.; Sanction case successfully created.; Funds received simulation completed successfully.; List of simulated card transactions.; List of KYC review requirements.; Transfer with updated status.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `creationTime`: Time when the card transaction was created.
- `description`: Description of the KYC review item.
- `failure_reason_code`: Failure reason code to trigger for payout failure.
- `id`: The ID of the balance account.
- `key`: KYC review item key.

### [SpendControl](docs/api/spend_control.html)

The authorisation rules applied to an application.

Results: Rule applied successfully.; Rule unapplied successfully.; A list of applied rule IDs.; Rule deleted successfully.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `ruleId`: The ID of the applied authorisation rule.

### [SpendLimit](docs/api/spend_limit.html)

A profile&#39;s spending limits.

Results: Profile spend limits.; Updated card spend limits. See Retrieve card limits.; Updated profile spend limits. See Retrieve profile limits.

SDK operations: `list`, `remove`, `update`.

Key fields to recognise:

- `type`: The type of transaction. `PURCHASE` is a combined limit that applies to contactless, magnetic, online purchase, chip and PIN/mobile wallet transactions.

### [Subscription](docs/api/subscription.html)

A webhook subscription, for an application or a profile.

Results: OK; No Content.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `created_at`: Timestamp of when the subscription was created.
- `id`: UUID that uniquely identifies the subscription.
- `name`: A custom name for your webhook to ease with identification.
- `trigger_on`: The event type this subscription is listening for. List of available events.

### [TestNotification](docs/api/test_notification.html)

A test notification to an application webhook subscription.

Results: OK.

SDK operations: `create`.

Key fields to recognise:

- `created_at`: Timestamp of when the test notification was created.
- `delivery_id`: ID of the delivery that was queued for sending.

### [ThirdPartyTransfer](docs/api/third_party_transfer.html)

A third party transfer.

Results: Third party transfer successfully created.; Returns the originator transfer object.

SDK operations: `create`, `load`.

Key fields to recognise:

- `created`: Timestamp when transfer was created.
- `details`: Payment Details
- `hasActiveIssues`: Are there any pending issues which stop executing the transfer?
- `id`: Transfer ID
- `originalTransferId`: Unique identifier randomly generated per transfer request by the calling client

### [ThreeDSecure](docs/api/three_d_secure.html)

The result of a 3-D Secure challenge.

Results: No Content - Challenge result has been successfully recorded.

SDK operations: `create`.

Key fields to recognise:

- `challengeStatus`: The customer&#39;s response to the 3DS challenge.
- `transactionReference`: Transaction reference as received in the 3DS challenge webhook event.

### [Token](docs/api/token.html)

An OAuth token.

Results: Token created successfully.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: Access token to be used when calling the API. Valid for 12 hours.
- `created_at`: Token creation time in ISO 8601 format. Only returned for user access token grant types (`registration_code`, `authorization_code`, `refresh_token`).
- `expires_at`: Access token expiration timestamp (UTC).
- `expires_in`: Access token expiry time in seconds.
- `refresh_token`: Refresh token used to obtain new user access tokens without requiring the user to re-authorise. Valid for up to 20 years. Only returned for user access token grant types (`registration_code`, `authorization_code`, `refresh_token`).

### [Transfer](docs/api/transfer.html)

A transfer: create, list, get or cancel one, and its receipts and payout information.

Results: Transfer successfully created.; Returns an array of transfer objects, with or without an `originator` block depending on the type of each transfer.; Returns the transfer object, with or without an `originator` block depending on the type of transfer.; Non objection certificate in PDF format.; Returns payout information for the transfer.; Transfer confirmation receipt in Wise branded PDF format.; The US Combined Receipt in Wise branded PDF format.; Returns the transfer object with `status` set to `cancelled`. If the original transfer was a third-party transfer, the response includes the `originator` object.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `business`: Your business profile ID
- `created`: Timestamp when transfer was created
- `customerTransactionId`: Unique identifier randomly generated per transfer request by the calling client
- `hasActiveIssues`: Are there any pending issues which stop executing the transfer?
- `id`: Transfer ID

### [TransferRequirement](docs/api/transfer_requirement.html)

The fields a transfer needs.

Results: Returns a list of transfer requirement objects describing the dynamic form fields.

SDK operations: `create`.

Key fields to recognise:

- `customerTransactionId`: Unique identifier for the transfer request
- `originatorLegalEntityType`: Type of sender.
- `quoteUuid`: V2 quote ID
- `targetAccount`: Recipient account ID

### [Ubo](docs/api/ubo.html)

A business profile&#39;s ultimate beneficial owners.

Results: List of all ultimate beneficial owners associated with the business profile.; List of ultimate beneficial owner objects.

SDK operations: `create`, `list`, `update`.

Key fields to recognise:

- `addressFirstLine`: First line of address.
- `city`: City of residential address.
- `countryOfResidenceIso3Code`: 3 character country code.
- `dateOfBirth`: Date of birth.
- `id`: ID of the ultimate beneficial owner.

### [User](docs/api/user.html)

A user: create one, check one exists, get one, or set its contact email.

Results: OK - User is created successfully.; OK - Successfully checked user existence.; OK - Successfully retrieved user.; OK - Successfully retrieved contact email address.; OK - Contact email address set successfully.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `active`: If user is active or not.
- `details`: User details.
- `email`: User&#39;s email.
- `id`: User ID.
- `language`: User default language for UI and email communication.

### [Verification](docs/api/verification.html)

Verification evidence for a profile.

Results: Multi-Status - Evidence(s) successfully uploaded, fully or partially.; OK - Successfully retrieved required evidences.

SDK operations: `create`, `list`.

Key fields to recognise:

- `required_evidences`: List of evidence types required to complete verification.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [AccountDetail](docs/api/account_detail.html) | `load` | `GET /balances/account-details/{id}` | Required |
| [AccountRequirement](docs/api/account_requirement.html) | `create` | `POST /quotes/{quoteId}/account-requirements` | Required |
| [AccountRequirement](docs/api/account_requirement.html) | `list` | `GET /quotes/{quoteId}/account-requirements` | Required |
| [Activity](docs/api/activity.html) | `list` | `GET /profiles/{profileId}/activities` | Required |
| [Address](docs/api/address.html) | `create` | `POST /addresses` | Required |
| [Address](docs/api/address.html) | `list` | `GET /addresses` | Required |
| [Address](docs/api/address.html) | `load` | `GET /addresses/{addressId}` | Required |
| [AddressRequirement](docs/api/address_requirement.html) | `create` | `POST /address-requirements` | Required |
| [AddressRequirement](docs/api/address_requirement.html) | `list` | `GET /address-requirements` | Required |
| [Balance](docs/api/balance.html) | `create` | `POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}` | Required |
| [Balance](docs/api/balance.html) | `create` | `POST /profiles/{profileId}/balance-movements` | Required |
| [Balance](docs/api/balance.html) | `create` | `POST /profiles/{profileId}/balances` | Required |
| [Balance](docs/api/balance.html) | `list` | `GET /profiles/{profileId}/balances` | Required |
| [Balance](docs/api/balance.html) | `load` | `GET /profiles/{profileId}/total-funds/{currency}` | Required |
| [Balance](docs/api/balance.html) | `load` | `GET /profiles/{profileId}/balances/{balanceId}` | Required |
| [Balance](docs/api/balance.html) | `remove` | `DELETE /profiles/{profileId}/balances/{balanceId}` | Required |
| [BalanceStatement](docs/api/balance_statement.html) | `load` | `GET /profiles/{profileId}/balance-statements/{balanceId}/statement.json` | Required |
| [BankAccountDetail](docs/api/bank_account_detail.html) | `create` | `POST /profiles/{profileId}/account-details/payments/{paymentId}/returns` | Required |
| [BankAccountDetail](docs/api/bank_account_detail.html) | `create` | `POST /profiles/{profileId}/bank-details` | Required |
| [BankAccountDetailsOrder](docs/api/bank_account_details_order.html) | `create` | `POST /profiles/{profileId}/account-details-orders` | Required |
| [BankAccountDetailsOrder](docs/api/bank_account_details_order.html) | `list` | `GET /profiles/{profileId}/account-details-orders` | Required |
| [BatchGroup](docs/api/batch_group.html) | `create` | `POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments` | Required |
| [BatchGroup](docs/api/batch_group.html) | `create` | `POST /profiles/{profileId}/batch-groups/{batchGroupId}/transfers` | Required |
| [BatchGroup](docs/api/batch_group.html) | `create` | `POST /profiles/{profileId}/batch-groups` | Required |
| [BatchGroup](docs/api/batch_group.html) | `load` | `GET /profiles/{profileId}/batch-groups/{batchGroupId}` | Required |
| [BatchGroup](docs/api/batch_group.html) | `update` | `PATCH /profiles/{profileId}/batch-groups/{batchGroupId}` | Required |
| [BulkSettlement](docs/api/bulk_settlement.html) | `create` | `POST /settlements` | Required |
| [BusinessProfile](docs/api/business_profile.html) | `create` | `POST /profiles/business-profile` | Required |
| [BusinessProfile](docs/api/business_profile.html) | `update` | `PUT /profiles/{profileId}/business-profile` | Required |
| [Card](docs/api/card.html) | `create` | `POST /spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count` | Required |
| [Card](docs/api/card.html) | `list` | `GET /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions` | Required |
| [Card](docs/api/card.html) | `list` | `GET /spend/profiles/{profileId}/cards` | Required |
| [Card](docs/api/card.html) | `load` | `GET /spend/profiles/{profileId}/cards/{cardToken}` | Required |
| [Card](docs/api/card.html) | `update` | `PATCH /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions` | Required |
| [Card](docs/api/card.html) | `update` | `PUT /spend/profiles/{profileId}/cards/{cardToken}/status` | Required |
| [CardHolderLimit](docs/api/card_holder_limit.html) | `list` | `GET /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits` | Required |
| [CardHolderLimit](docs/api/card_holder_limit.html) | `remove` | `DELETE /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits` | Required |
| [CardHolderLimit](docs/api/card_holder_limit.html) | `update` | `PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits` | Required |
| [CardLimit](docs/api/card_limit.html) | `load` | `GET /spend/profiles/{profileId}/cards/{cardToken}/spend-limits` | Required |
| [CardLimit](docs/api/card_limit.html) | `update` | `PATCH /spend/profiles/{profileId}/cards/{cardToken}/spend-limits` | Required |
| [CardOrder](docs/api/card_order.html) | `create` | `POST /spend/profiles/{profileId}/card-orders` | Required |
| [CardOrder](docs/api/card_order.html) | `create` | `POST /spend/address/validate` | Required |
| [CardOrder](docs/api/card_order.html) | `list` | `GET /spend/profiles/{profileId}/card-orders/{cardOrderId}/requirements` | Required |
| [CardOrder](docs/api/card_order.html) | `list` | `GET /spend/profiles/{profileId}/card-orders` | Required |
| [CardOrder](docs/api/card_order.html) | `list` | `GET /spend/profiles/{profileId}/card-orders/availability` | Required |
| [CardOrder](docs/api/card_order.html) | `load` | `GET /spend/profiles/{profileId}/card-orders/{cardOrderId}` | Required |
| [CardOrder](docs/api/card_order.html) | `update` | `PUT /spend/profiles/{profileId}/card-orders/{cardOrderId}/status` | Required |
| [CardSensitiveDetail](docs/api/card_sensitive_detail.html) | `create` | `POST /twcard-data/v1/sensitive-card-data/details` | Required |
| [CardSensitiveDetail](docs/api/card_sensitive_detail.html) | `create` | `POST /twcard-data/v1/sensitive-card-data/pin` | Required |
| [CardSensitiveDetail](docs/api/card_sensitive_detail.html) | `create` | `POST /twcard-data/v1/sensitive-card-data/preset-pin` | Required |
| [CardSensitiveDetail](docs/api/card_sensitive_detail.html) | `load` | `GET /twcard-data/v1/clientSideEncryption/fetchEncryptingKey` | Required |
| [CardTransaction](docs/api/card_transaction.html) | `list` | `GET /spend/profiles/{profileId}/cards/{cardToken}/transactions` | Required |
| [CardTransaction](docs/api/card_transaction.html) | `load` | `GET /spend/profiles/{profileId}/cards/transactions/{transactionId}` | Required |
| [Case](docs/api/case.html) | `create` | `POST /cases` | Required |
| [Case](docs/api/case.html) | `load` | `GET /cases/{caseId}` | Required |
| [ClaimAccount](docs/api/claim_account.html) | `create` | `POST /user/claim-account` | Required |
| [Comparison](docs/api/comparison.html) | `load` | `GET /comparisons` | Required |
| [Contact](docs/api/contact.html) | `create` | `POST /profiles/{profileId}/contacts` | Required |
| [Currency](docs/api/currency.html) | `list` | `GET /currencies` | Required |
| [DeliveryEstimate](docs/api/delivery_estimate.html) | `load` | `GET /delivery-estimates/{transferId}` | Required |
| [DeliveryUpdate](docs/api/delivery_update.html) | `create` | `POST /simulation/transfers/{transferId}/delivery-update` | Required |
| [DigitalWallet](docs/api/digital_wallet.html) | `create` | `POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation` | Required |
| [DigitalWallet](docs/api/digital_wallet.html) | `create` | `POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens` | Required |
| [DigitalWallet](docs/api/digital_wallet.html) | `create` | `POST /twcard-data/v1/push-provisioning/encrypted-payload/apple-pay` | Required |
| [DigitalWallet](docs/api/digital_wallet.html) | `create` | `POST /twcard-data/v1/push-provisioning/encrypted-payload/google-pay` | Required |
| [DirectDebitAccount](docs/api/direct_debit_account.html) | `create` | `POST /profiles/{profileId}/direct-debit-accounts` | Required |
| [DirectDebitAccount](docs/api/direct_debit_account.html) | `list` | `GET /profiles/{profileId}/direct-debit-accounts` | Required |
| [Director](docs/api/director.html) | `create` | `POST /profiles/{profileId}/directors` | Required |
| [Director](docs/api/director.html) | `list` | `GET /profiles/{profileId}/directors` | Required |
| [Director](docs/api/director.html) | `remove` | `DELETE /profiles/{profileId}/directors` | Required |
| [Director](docs/api/director.html) | `update` | `PUT /profiles/{profileId}/directors` | Required |
| [Dispute](docs/api/dispute.html) | `create` | `POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}` | Required |
| [Dispute](docs/api/dispute.html) | `create` | `POST /spend/profiles/{profileId}/dispute-form/file` | Required |
| [Dispute](docs/api/dispute.html) | `list` | `GET /spend/profiles/{profileId}/disputes` | Required |
| [Dispute](docs/api/dispute.html) | `load` | `GET /spend/profiles/{profileId}/disputes/{disputeId}` | Required |
| [Dispute](docs/api/dispute.html) | `update` | `PUT /spend/profiles/{profileId}/disputes/{disputeId}/status` | Required |
| [DisputeReason](docs/api/dispute_reason.html) | `list` | `GET /spend/profiles/{profileId}/dispute-form/reasons` | Required |
| [Facetec](docs/api/facetec.html) | `load` | `GET /facetec/public-key` | Required |
| [File](docs/api/file.html) | `create` | `POST /cases/files` | Required |
| [File](docs/api/file.html) | `list` | `GET /cases/files` | Required |
| [Funding](docs/api/funding.html) | `create` | `POST /profiles/{profileId}/transfers/{transferId}/payments` | Required |
| [GpiTracking](docs/api/gpi_tracking.html) | `create` | `POST /gpi-tracking` | Required |
| [HoldLimitBreach](docs/api/hold_limit_breach.html) | `list` | `GET /profiles/{profileId}/balances/hold-limit-breach` | Required |
| [IncomingTransfer](docs/api/incoming_transfer.html) | `load` | `GET /incoming-transfers/{incomingTransferId}` | Required |
| [Jose](docs/api/jose.html) | `create` | `POST /auth/jose/playground/jwsjwe` | Required |
| [Jose](docs/api/jose.html) | `create` | `POST /auth/jose/playground/jwe` | Required |
| [Jose](docs/api/jose.html) | `create` | `POST /auth/jose/playground/jwe-direct-encryption` | Required |
| [Jose](docs/api/jose.html) | `create` | `POST /auth/jose/playground/jws` | Required |
| [Jose](docs/api/jose.html) | `create` | `POST /auth/jose/request/public-keys` | Required |
| [Jose](docs/api/jose.html) | `load` | `GET /auth/jose/response/public-keys` | Required |
| [Jose](docs/api/jose.html) | `load` | `GET /auth/jose/playground/jwe` | Required |
| [Jose](docs/api/jose.html) | `load` | `GET /auth/jose/playground/jwsjwe` | Required |
| [KycReview](docs/api/kyc_review.html) | `create` | `POST /profiles/{profileId}/kyc-requirements/{requirementKey}` | Required |
| [KycReview](docs/api/kyc_review.html) | `create` | `POST /profiles/{profileId}/kyc-reviews` | Required |
| [KycReview](docs/api/kyc_review.html) | `list` | `GET /profiles/{profileId}/kyc-reviews` | Required |
| [KycReview](docs/api/kyc_review.html) | `load` | `GET /profiles/{profileId}/kyc-reviews/{kycReviewId}` | Required |
| [KycReview](docs/api/kyc_review.html) | `update` | `PATCH /profiles/{profileId}/kyc-reviews/{kycReviewId}` | Required |
| [LinkRequest](docs/api/link_request.html) | `create` | `POST /profiles/{profileId}/embedded-flows/link-requests/kyc-reviews` | Required |
| [LinkRequest](docs/api/link_request.html) | `create` | `POST /profiles/{profileId}/embedded-flows/link-requests/payment-instrument` | Required |
| [LinkRequest](docs/api/link_request.html) | `create` | `POST /profiles/{profileId}/embedded-flows/link-requests/recipients` | Required |
| [LinkRequest](docs/api/link_request.html) | `create` | `POST /profiles/{profileId}/embedded-flows/link-requests/spend/disputes` | Required |
| [LinkRequest](docs/api/link_request.html) | `load` | `GET /embedded-flows/link-requests/{embeddedLinkRequestId}` | Required |
| [Message](docs/api/message.html) | `create` | `POST /cases/{caseId}/messages` | Required |
| [MultiCurrencyAccount](docs/api/multi_currency_account.html) | `list` | `GET /borderless-accounts-configuration/profiles/{profileId}/available-currencies` | Required |
| [MultiCurrencyAccount](docs/api/multi_currency_account.html) | `list` | `GET /borderless-accounts-configuration/profiles/{profileId}/payin-currencies` | Required |
| [MultiCurrencyAccount](docs/api/multi_currency_account.html) | `load` | `GET /multi-currency-account/eligibility` | Required |
| [OneTimeToken](docs/api/one_time_token.html) | `create` | `POST /profiles/{profileId}/device-fingerprints/verify` | Required |
| [OneTimeToken](docs/api/one_time_token.html) | `create` | `POST /profiles/{profileId}/pin/verify` | Required |
| [OneTimeToken](docs/api/one_time_token.html) | `create` | `POST /profiles/{profileId}/facemaps/verify` | Required |
| [Ott](docs/api/ott.html) | `create` | `POST /one-time-token/sms/verify` | Required |
| [Ott](docs/api/ott.html) | `create` | `POST /one-time-token/voice/verify` | Required |
| [Ott](docs/api/ott.html) | `create` | `POST /one-time-token/whatsapp/verify` | Required |
| [Ott](docs/api/ott.html) | `load` | `GET /one-time-token/status` | Required |
| [Payin](docs/api/payin.html) | `create` | `POST /profiles/{profileId}/payin-sessions/{payinSessionId}/paynow` | Required |
| [Payin](docs/api/payin.html) | `create` | `POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins` | Required |
| [PayinDepositDetail](docs/api/payin_deposit_detail.html) | `load` | `GET /profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer` | Required |
| [Payment](docs/api/payment.html) | `list` | `GET /transfers/{transferId}/payments` | Required |
| [PaymentInitiation](docs/api/payment_initiation.html) | `create` | `POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations` | Required |
| [PaymentInitiation](docs/api/payment_initiation.html) | `load` | `GET /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations/{paymentInitiationId}` | Required |
| [PaymentInstrument](docs/api/payment_instrument.html) | `create` | `POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation` | Required |
| [PaymentInstrument](docs/api/payment_instrument.html) | `create` | `POST /profiles/{profileId}/payment-instruments` | Required |
| [PaymentInstrument](docs/api/payment_instrument.html) | `list` | `GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins` | Required |
| [PaymentInstrument](docs/api/payment_instrument.html) | `load` | `GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}` | Required |
| [PaymentIntent](docs/api/payment_intent.html) | `load` | `GET /settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}` | Required |
| [PhoneNumber](docs/api/phone_number.html) | `create` | `POST /application/users/{userId}/phone-numbers` | Required |
| [Production](docs/api/production.html) | `load` | `GET /spend/profiles/{profileId}/cards/{cardToken}/production` | Required |
| [Production](docs/api/production.html) | `update` | `PUT /spend/profiles/{profileId}/cards/{cardToken}/production` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/{profileId}/pin` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/{profileId}/verification-status/bank-transfer` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/{profileId}/excess-money-account` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/{profileId}/update-window` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/{profileId}/verification-documents` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/{profileId}/verification-status/upload-document` | Required |
| [Profile](docs/api/profile.html) | `create` | `POST /profiles/personal-profile` | Required |
| [Profile](docs/api/profile.html) | `list` | `GET /profiles` | Required |
| [Profile](docs/api/profile.html) | `load` | `GET /profiles/{profileId}/balance-capacity` | Required |
| [Profile](docs/api/profile.html) | `load` | `GET /profiles/{profileId}` | Required |
| [Profile](docs/api/profile.html) | `load` | `GET /profiles/{profileId}/business-profile/business-representative` | Required |
| [Profile](docs/api/profile.html) | `load` | `GET /profiles/{profileId}/multi-currency-account` | Required |
| [Profile](docs/api/profile.html) | `remove` | `DELETE /profiles/{profileId}/pin` | Required |
| [Profile](docs/api/profile.html) | `remove` | `DELETE /profiles/{profileId}/update-window` | Required |
| [Profile](docs/api/profile.html) | `update` | `PUT /profiles/{profileId}/business-profile/business-representative` | Required |
| [Profile](docs/api/profile.html) | `update` | `PUT /profiles/{profileId}/personal-profile` | Required |
| [Profile](docs/api/profile.html) | `update` | `PUT /profiles/{profileId}/verification-documents` | Required |
| [Quote](docs/api/quote.html) | `create` | `POST /profiles/{profileId}/quotes` | Required |
| [Quote](docs/api/quote.html) | `create` | `POST /quotes` | Not required |
| [Quote](docs/api/quote.html) | `load` | `GET /profiles/{profileId}/quotes/{quoteId}` | Required |
| [Quote](docs/api/quote.html) | `update` | `PATCH /profiles/{profileId}/quotes/{quoteId}` | Required |
| [Rate](docs/api/rate.html) | `list` | `GET /rates` | Required |
| [Recipient](docs/api/recipient.html) | `create` | `POST /accounts/{accountId}/quotes/{quoteId}/compatibility` | Required |
| [Recipient](docs/api/recipient.html) | `create` | `POST /accounts` | Required |
| [Recipient](docs/api/recipient.html) | `list` | `GET /accounts` | Required |
| [Recipient](docs/api/recipient.html) | `load` | `GET /accounts/{accountId}` | Required |
| [Recipient](docs/api/recipient.html) | `remove` | `DELETE /accounts/{accountId}` | Required |
| [Recipient](docs/api/recipient.html) | `update` | `PATCH /accounts/{accountId}/confirmations` | Required |
| [Rule](docs/api/rule.html) | `create` | `POST /spend/applications/{clientId}/spend-controls/rules` | Required |
| [Rule](docs/api/rule.html) | `list` | `GET /spend/applications/{clientId}/spend-controls/rules` | Required |
| [Saml](docs/api/saml.html) | `create` | `POST /login/saml2/sso` | Not required |
| [Saml](docs/api/saml.html) | `load` | `GET /saml2/authenticate/{registrationId}` | Not required |
| [Saml](docs/api/saml.html) | `load` | `GET /saml2/metadata` | Not required |
| [ScaDeviceFingerprint](docs/api/sca_device_fingerprint.html) | `create` | `POST /profiles/{profileId}/device-fingerprints` | Required |
| [ScaDeviceFingerprint](docs/api/sca_device_fingerprint.html) | `remove` | `DELETE /profiles/{profileId}/device-fingerprints/{deviceFingerprintId}` | Required |
| [ScaFacemap](docs/api/sca_facemap.html) | `create` | `POST /profiles/{profileId}/facemaps` | Required |
| [ScaFacemap](docs/api/sca_facemap.html) | `remove` | `DELETE /profiles/{profileId}/facemaps` | Required |
| [ScaOtp](docs/api/sca_otp.html) | `create` | `POST /one-time-token/sms/trigger` | Required |
| [ScaOtp](docs/api/sca_otp.html) | `create` | `POST /one-time-token/voice/trigger` | Required |
| [ScaOtp](docs/api/sca_otp.html) | `create` | `POST /one-time-token/whatsapp/trigger` | Required |
| [ScaOtp](docs/api/sca_otp.html) | `remove` | `DELETE /application/users/{userId}/phone-numbers/{phoneNumberId}` | Required |
| [ScaSession](docs/api/sca_session.html) | `create` | `POST /profiles/{profileId}/sca-sessions/authorise` | Required |
| [SettlementAllocation](docs/api/settlement_allocation.html) | `create` | `POST /settlement/allocations` | Required |
| [SettlementAllocation](docs/api/settlement_allocation.html) | `load` | `GET /settlement/allocations/{allocationId}` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/clearing` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/production` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/reversal` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/requirements/add` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/requirements/submit` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/verify` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/profiles/{profileId}/bank-transactions/import` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/profiles/{profileId}/swift-in` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/profiles/{profileId}/verifications` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/transfers/{transferId}/payout-failure` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/balance/topup` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/sanction-cases` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/settlement/funds` | Required |
| [Simulation](docs/api/simulation.html) | `create` | `POST /simulation/verify-profile` | Required |
| [Simulation](docs/api/simulation.html) | `list` | `GET /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions` | Required |
| [Simulation](docs/api/simulation.html) | `list` | `GET /simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/requirements` | Required |
| [Simulation](docs/api/simulation.html) | `load` | `GET /simulation/transfers/{transferId}/{status}` | Required |
| [SpendControl](docs/api/spend_control.html) | `create` | `POST /spend/applications/{clientId}/spend-controls/rules/apply` | Required |
| [SpendControl](docs/api/spend_control.html) | `create` | `POST /spend/applications/{clientId}/spend-controls/rules/unapply` | Required |
| [SpendControl](docs/api/spend_control.html) | `list` | `GET /spend/applications/{clientId}/spend-controls/rules/applied` | Required |
| [SpendControl](docs/api/spend_control.html) | `remove` | `DELETE /spend/applications/{clientId}/spend-controls/rules/{ruleId}` | Required |
| [SpendLimit](docs/api/spend_limit.html) | `list` | `GET /spend/profiles/{profileId}/spend-limits` | Required |
| [SpendLimit](docs/api/spend_limit.html) | `remove` | `DELETE /spend/profiles/{profileId}/cards/{cardToken}/spend-limits/{granularity}` | Required |
| [SpendLimit](docs/api/spend_limit.html) | `update` | `PATCH /spend/profiles/{profileId}/spend-limits` | Required |
| [Subscription](docs/api/subscription.html) | `create` | `POST /applications/{clientKey}/subscriptions` | Required |
| [Subscription](docs/api/subscription.html) | `create` | `POST /profiles/{profileId}/subscriptions` | Required |
| [Subscription](docs/api/subscription.html) | `list` | `GET /applications/{clientKey}/subscriptions` | Required |
| [Subscription](docs/api/subscription.html) | `list` | `GET /profiles/{profileId}/subscriptions` | Required |
| [Subscription](docs/api/subscription.html) | `load` | `GET /applications/{clientKey}/subscriptions/{subscriptionId}` | Required |
| [Subscription](docs/api/subscription.html) | `load` | `GET /profiles/{profileId}/subscriptions/{subscriptionId}` | Required |
| [Subscription](docs/api/subscription.html) | `remove` | `DELETE /applications/{clientKey}/subscriptions/{subscriptionId}` | Required |
| [Subscription](docs/api/subscription.html) | `remove` | `DELETE /profiles/{profileId}/subscriptions/{subscriptionId}` | Required |
| [TestNotification](docs/api/test_notification.html) | `create` | `POST /applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications` | Required |
| [ThirdPartyTransfer](docs/api/third_party_transfer.html) | `create` | `POST /profiles/{profileId}/third-party-transfers` | Required |
| [ThirdPartyTransfer](docs/api/third_party_transfer.html) | `load` | `GET /profiles/{profileId}/third-party-transfers/{transferId}` | Required |
| [ThreeDSecure](docs/api/three_d_secure.html) | `create` | `POST /spend/profiles/{profileId}/3dsecure/challenge-result` | Required |
| [Token](docs/api/token.html) | `create` | `POST /oauth/token` | Required |
| [Transfer](docs/api/transfer.html) | `create` | `POST /transfers` | Required |
| [Transfer](docs/api/transfer.html) | `list` | `GET /transfers` | Required |
| [Transfer](docs/api/transfer.html) | `load` | `GET /transfers/{transferId}` | Required |
| [Transfer](docs/api/transfer.html) | `load` | `GET /transfers/{transferId}/documents/noc` | Required |
| [Transfer](docs/api/transfer.html) | `load` | `GET /transfers/{transferId}/invoices/bankingpartner` | Required |
| [Transfer](docs/api/transfer.html) | `load` | `GET /transfers/{transferId}/receipt.pdf` | Required |
| [Transfer](docs/api/transfer.html) | `load` | `GET /transfers/{transferId}/us-combined-receipt.pdf` | Required |
| [Transfer](docs/api/transfer.html) | `update` | `PUT /transfers/{transferId}/cancel` | Required |
| [TransferRequirement](docs/api/transfer_requirement.html) | `create` | `POST /transfer-requirements` | Required |
| [Ubo](docs/api/ubo.html) | `create` | `POST /profiles/{profileId}/ubos` | Required |
| [Ubo](docs/api/ubo.html) | `list` | `GET /profiles/{profileId}/ubos` | Required |
| [Ubo](docs/api/ubo.html) | `update` | `PUT /profiles/{profileId}/ubos` | Required |
| [User](docs/api/user.html) | `create` | `POST /user/signup/registration_code` | Required |
| [User](docs/api/user.html) | `create` | `POST /users/exists` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/{userId}` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/{userId}/contact-email` | Required |
| [User](docs/api/user.html) | `load` | `GET /me` | Required |
| [User](docs/api/user.html) | `update` | `PUT /users/{userId}/contact-email` | Required |
| [Verification](docs/api/verification.html) | `create` | `POST /profiles/{profileId}/additional-verification/upload-evidences` | Required |
| [Verification](docs/api/verification.html) | `list` | `GET /profiles/{profileId}/verification-status/required-evidences` | Required |

## Connect to the API

- Production Environment: `https://api.wise.com/2026Q4`
- Sandbox Environment: `https://api.wise-sandbox.com/2026Q4`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

> User Access Token for making API calls on behalf of a Wise user.
>
> Can be obtained via two OAuth 2.0 flows:
> - **`registration_code` grant**: For partners creating users via API
> - **`authorization_code` grant**: For partners using Wise&#39;s authorization page
>
> Access tokens are valid for 12 hours and can be refreshed using a refresh token.

Personal API Token for individual personal or small business users. Generated from Wise.com &gt; Settings &gt; Connect and manage apps &gt; API tokens. Has limited API access compared to OAuth tokens (PSD2 restrictions apply for EU/UK users).

> Application-level token for partner operations that don&#39;t require a specific user context, such as bulk settlement and card spend controls.
>
> Obtained via `POST /oauth/token` with Basic Authentication (client-id:client-secret) and `grant_type=client_credentials`.
>
> Valid for 12 hours. No refresh token, fetch a new token when expired.
>
> See [create an OAuth token](/api-reference/oauth-token/oauthtokencreate) for details.

> Basic Authentication using your Client ID and Client Secret as the username and password.
>
> Client credentials are provided by Wise when your partnership begins. See [Getting Started](/guides/developer) for details.

> HMAC-SHA256 signature proving the request body has not been tampered with, hex-encoded in lowercase.
>
> Check the API reference for the endpoint you are calling to see whether it requires HMAC signing. Where it applies, it is used **in addition to** a bearer token, not instead of one.
>
> The signature is computed over a canonical string built from the request timestamp and a SHA-256 hash of each signed part:
>
> ```
> &#123;timestamp&#125;.&#123;sha256_hex(json_part)&#125;.&#123;sha256_hex(file_part)&#125;
> ```
>
> Must be sent together with the `X-Signature-Timestamp` header. Signatures are accepted within 300 seconds of Wise server time.
>
> See [HMAC request signing](/guides/developer/auth-and-security/hmac) for the full algorithm, a verified test vector, and troubleshooting.

> The Unix timestamp in **seconds** at which the `X-Signature` value was generated, as a decimal string.
>
> This value is part of the signed canonical string, so it must match the timestamp used when computing the signature exactly. Requests more than 300 seconds away from Wise server time are rejected in either direction, which limits how long a captured request can be replayed.
>
> See [HMAC request signing](/guides/developer/auth-and-security/hmac) for details.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /saml2/metadata`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.wise.com/2026Q4/saml2/metadata'
```

Inspect the response using the [Saml](docs/api/saml.html) reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`secrets`](docs/features/secrets.html): Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

