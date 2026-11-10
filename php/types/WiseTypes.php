<?php
declare(strict_types=1);

// Typed models for the Wise SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AccountDetail entity data model. */
class AccountDetail
{
    public string $accountHolderName;
    public mixed $accountIdentification;
    public string $country;
    public int $id;
    public int $profileId;
    public string $state;
}

/** Request payload for AccountDetail#load. */
class AccountDetailLoadMatch
{
    public int $id;
}

/** AccountRequirement entity data model. */
class AccountRequirement
{
    public ?string $accountHolderName = null;
    public ?string $currency = null;
    public ?array $details = null;
    public ?array $fields = null;
    public ?bool $ownedByCustomer = null;
    public ?int $profile = null;
    public ?string $title = null;
    public ?string $type = null;
    public mixed $ultimateBeneficiary;
    public ?string $usageInfo = null;
}

/** Request payload for AccountRequirement#list. */
class AccountRequirementListMatch
{
    public string $quote_id;
    public ?bool $address_required = null;
    public ?string $originator_legal_entity_type = null;
}

/** Request payload for AccountRequirement#create. */
class AccountRequirementCreateData
{
    public string $quote_id;
    public ?string $originator_legal_entity_type = null;
    public ?string $accountHolderName = null;
    public ?string $currency = null;
    public ?array $details = null;
    public ?bool $ownedByCustomer = null;
    public ?int $profile = null;
    public ?string $type = null;
    public mixed $ultimateBeneficiary;
}

/** Activity entity data model. */
class Activity
{
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $primaryAmount = null;
    public ?array $resource = null;
    public ?string $secondaryAmount = null;
    public ?string $status = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $updatedOn = null;
}

/** Request payload for Activity#list. */
class ActivityListMatch
{
    public int $profile_id;
    public ?string $monetary_resource_type = null;
    public ?string $next_cursor = null;
    public ?string $since = null;
    public ?int $size = null;
    public ?string $status = null;
    public ?string $until = null;
}

/** Address entity data model. */
class Address
{
    public ?array $details = null;
    public ?int $id = null;
    public ?int $profile = null;
}

/** Request payload for Address#load. */
class AddressLoadMatch
{
    public int $id;
}

/** Request payload for Address#list. */
class AddressListMatch
{
    public ?int $profile = null;
}

/** Request payload for Address#create. */
class AddressCreateData
{
    public array $details;
    public int $profile;
}

/** AddressRequirement entity data model. */
class AddressRequirement
{
    public array $details;
    public ?array $fields = null;
    public ?int $profile = null;
    public ?string $type = null;
}

/** Request payload for AddressRequirement#list. */
class AddressRequirementListMatch
{
    public ?array $details = null;
    public ?array $fields = null;
    public ?int $profile = null;
    public ?string $type = null;
}

/** Request payload for AddressRequirement#create. */
class AddressRequirementCreateData
{
    public array $details;
    public ?int $profile = null;
}

/** Balance entity data model. */
class Balance
{
    public ?array $amount = null;
    public ?array $cashAmount = null;
    public ?string $creationTime = null;
    public ?string $currency = null;
    public mixed $icon = null;
    public ?int $id = null;
    public ?string $investmentState = null;
    public ?string $modificationTime = null;
    public mixed $name = null;
    public ?array $overdraft = null;
    public ?array $reservedAmount = null;
    public string $state;
    public int $targetRecipientId;
    public ?array $totalAvailable = null;
    public ?array $totalCash = null;
    public ?array $totalWorth = null;
    public ?string $type = null;
    public ?bool $visible = null;
}

/** Request payload for Balance#load. */
class BalanceLoadMatch
{
    public ?string $currency = null;
    public int $profile_id;
    public ?int $id = null;
}

/** Request payload for Balance#list. */
class BalanceListMatch
{
    public int $profile_id;
    public string $type;
}

/** Request payload for Balance#create. */
class BalanceCreateData
{
    public ?int $hold_limit_breach_id = null;
    public int $profile_id;
    public string $currency;
    public mixed $name = null;
    public string $state;
    public int $targetRecipientId;
    public string $type;
}

/** Request payload for Balance#remove. */
class BalanceRemoveMatch
{
    public int $id;
    public int $profile_id;
}

/** BalanceStatement entity data model. */
class BalanceStatement
{
    public ?array $accountHolder = null;
    public mixed $bankDetails = null;
    public ?array $endOfStatementBalance = null;
    public ?string $id = null;
    public ?array $issuer = null;
    public ?array $query = null;
    public ?array $transactions = null;
}

/** Request payload for BalanceStatement#load. */
class BalanceStatementLoadMatch
{
    public int $id;
    public int $profile_id;
    public string $currency;
    public string $interval_end;
    public string $interval_start;
    public ?string $statement_locale = null;
    public ?string $type = null;
}

/** BankAccountDetail entity data model. */
class BankAccountDetail
{
    public ?bool $active = null;
    public ?string $currency = null;
    public ?string $id = null;
    public mixed $internationalDetails = null;
    public ?array $localDetails = null;
    public ?string $reason = null;
    public int $targetAccountId;
}

/** Request payload for BankAccountDetail#create. */
class BankAccountDetailCreateData
{
    public ?int $payment_id = null;
    public int $profile_id;
    public ?string $reason = null;
    public int $targetAccountId;
}

/** BankAccountDetailsOrder entity data model. */
class BankAccountDetailsOrder
{
    public ?int $accountDetailsId = null;
    public mixed $balanceId = null;
    public ?string $creationTime = null;
    public ?string $currency = null;
    public ?string $id = null;
    public ?string $modificationTime = null;
    public ?array $requirements = null;
    public ?string $status = null;
}

/** Request payload for BankAccountDetailsOrder#list. */
class BankAccountDetailsOrderListMatch
{
    public int $profile_id;
    public string $currency;
}

/** Request payload for BankAccountDetailsOrder#create. */
class BankAccountDetailsOrderCreateData
{
    public int $profile_id;
    public string $currency;
}

/** BatchGroup entity data model. */
class BatchGroup
{
    public ?bool $alreadyPaid = null;
    public mixed $fileName = null;
    public ?string $groupType = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $payInDetails = null;
    public mixed $payinSessionId = null;
    public ?int $profileId = null;
    public ?int $shortId = null;
    public ?string $sourceCurrency = null;
    public ?string $status = null;
    public ?array $transferIds = null;
    public string $type;
    public ?int $userId = null;
    public ?int $version = null;
}

/** Request payload for BatchGroup#load. */
class BatchGroupLoadMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for BatchGroup#create. */
class BatchGroupCreateData
{
    public ?string $batch_payment_id = null;
    public int $profile_id;
    public string $name;
    public string $sourceCurrency;
    public string $type;
}

/** Request payload for BatchGroup#update. */
class BatchGroupUpdateData
{
    public string $id;
    public int $profile_id;
    public ?string $status = null;
    public ?int $version = null;
}

/** BulkSettlement entity data model. */
class BulkSettlement
{
    public ?float $balanceTransfer = null;
    public ?array $refundedTransfers = null;
    public ?string $settlementCurrency = null;
    public string $settlementDate;
    public string $settlementReference;
    public array $transfers;
    public string $type;
}

/** Request payload for BulkSettlement#create. */
class BulkSettlementCreateData
{
    public ?float $balanceTransfer = null;
    public ?array $refundedTransfers = null;
    public ?string $settlementCurrency = null;
    public string $settlementDate;
    public string $settlementReference;
    public array $transfers;
    public string $type;
}

/** BusinessProfile entity data model. */
class BusinessProfile
{
    public mixed $abn = null;
    public mixed $acn = null;
    public ?string $actorEmail = null;
    public ?array $address = null;
    public mixed $arbn = null;
    public ?string $businessFreeFormDescription = null;
    public ?string $businessName = null;
    public mixed $businessNameInKatakana = null;
    public ?array $businessRepresentative = null;
    public ?string $companyRole = null;
    public ?string $companyType = null;
    public ?array $contactDetails = null;
    public ?string $createdAt = null;
    public ?string $currentState = null;
    public ?string $descriptionOfBusiness = null;
    public ?string $email = null;
    public ?string $externalCustomerId = null;
    public ?string $firstLevelCategory = null;
    public ?string $fullName = null;
    public ?int $id = null;
    public ?array $industryCategories = null;
    public ?array $operationalAddresses = null;
    public ?string $publicId = null;
    public ?string $registrationNumber = null;
    public ?string $secondLevelCategory = null;
    public string $type;
    public ?string $updatedAt = null;
    public ?int $userId = null;
    public ?string $webpage = null;
}

/** Request payload for BusinessProfile#create. */
class BusinessProfileCreateData
{
    public mixed $abn = null;
    public mixed $acn = null;
    public ?string $actorEmail = null;
    public ?array $address = null;
    public mixed $arbn = null;
    public ?string $businessFreeFormDescription = null;
    public ?string $businessName = null;
    public mixed $businessNameInKatakana = null;
    public ?array $businessRepresentative = null;
    public ?string $companyRole = null;
    public ?string $companyType = null;
    public array $contactDetails;
    public ?string $externalCustomerId = null;
    public ?string $firstLevelCategory = null;
    public ?array $industryCategories = null;
    public ?array $operationalAddresses = null;
    public ?string $registrationNumber = null;
    public ?string $secondLevelCategory = null;
    public ?string $webpage = null;
}

/** Request payload for BusinessProfile#update. */
class BusinessProfileUpdateData
{
    public int $profile_id;
    public mixed $abn = null;
    public mixed $acn = null;
    public ?array $address = null;
    public mixed $arbn = null;
    public ?string $businessFreeFormDescription = null;
    public ?string $businessName = null;
    public mixed $businessNameInKatakana = null;
    public ?string $companyRole = null;
    public ?string $companyType = null;
    public ?array $contactDetails = null;
    public ?string $externalCustomerId = null;
    public ?string $firstLevelCategory = null;
    public ?int $id = null;
    public ?array $industryCategories = null;
    public ?array $operationalAddresses = null;
    public ?string $registrationNumber = null;
    public ?string $secondLevelCategory = null;
    public ?string $webpage = null;
}

/** Card entity data model. */
class Card
{
    public ?string $bankIdentificationNumber = null;
    public ?string $cardHolderName = null;
    public ?array $cardProgram = null;
    public ?string $clientId = null;
    public ?string $creationTime = null;
    public ?string $expiryDate = null;
    public ?string $id = null;
    public ?string $lastFourDigits = null;
    public ?string $modificationTime = null;
    public ?string $phoneNumber = null;
    public ?int $profileId = null;
    public ?array $status = null;
    public ?string $token = null;
    public ?string $unlockSpendingPermissions = null;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for Card#list. */
class CardListMatch
{
    public int $profile_id;
    public ?int $page_number = null;
    public ?int $page_size = null;
}

/** Request payload for Card#create. */
class CardCreateData
{
    public string $card_token;
    public int $profile_id;
    public ?string $bankIdentificationNumber = null;
    public ?string $cardHolderName = null;
    public ?array $cardProgram = null;
    public ?string $clientId = null;
    public ?string $creationTime = null;
    public ?string $expiryDate = null;
    public ?string $id = null;
    public ?string $lastFourDigits = null;
    public ?string $modificationTime = null;
    public ?string $phoneNumber = null;
    public ?int $profileId = null;
    public ?array $status = null;
    public ?string $token = null;
    public ?string $unlockSpendingPermissions = null;
}

/** Request payload for Card#update. */
class CardUpdateData
{
    public string $card_token;
    public int $profile_id;
    public ?array $status = null;
    public mixed $permissions = null;
}

/** CardHolderLimit entity data model. */
class CardHolderLimit
{
    public array $aggregateWindow;
    public ?array $spendLimits = null;
    public string $type;
}

/** Request payload for CardHolderLimit#list. */
class CardHolderLimitListMatch
{
    public int $card_holder_profile_id;
    public int $profile_id;
}

/** Request payload for CardHolderLimit#update. */
class CardHolderLimitUpdateData
{
    public int $card_holder_profile_id;
    public int $profile_id;
    public ?array $aggregateWindow = null;
    public ?string $type = null;
}

/** Request payload for CardHolderLimit#remove. */
class CardHolderLimitRemoveMatch
{
    public int $card_holder_profile_id;
    public int $profile_id;
}

/** CardLimit entity data model. */
class CardLimit
{
    public mixed $daily = null;
    public mixed $lifetime = null;
    public mixed $monthly = null;
    public mixed $transaction = null;
}

/** Request payload for CardLimit#load. */
class CardLimitLoadMatch
{
    public string $card_token;
    public int $profile_id;
}

/** Request payload for CardLimit#update. */
class CardLimitUpdateData
{
    public string $card_token;
    public int $profile_id;
    public mixed $daily = null;
    public mixed $lifetime = null;
    public mixed $monthly = null;
    public mixed $transaction = null;
}

/** CardOrder entity data model. */
class CardOrder
{
    public ?array $address = null;
    public ?string $cardHolderName = null;
    public ?int $cardHolderProfileId = null;
    public ?array $cardProgram = null;
    public mixed $cardToken = null;
    public ?string $city = null;
    public ?string $clientId = null;
    public ?string $country = null;
    public ?string $creationTime = null;
    public ?array $deliveryDetails = null;
    public ?string $deliveryEstimate = null;
    public ?string $deliveryOption = null;
    public ?string $embossedName = null;
    public ?array $errors = null;
    public ?string $firstLine = null;
    public ?int $id = null;
    public mixed $lifetimeLimit = null;
    public ?string $modificationTime = null;
    public ?string $phoneNumber = null;
    public ?string $postCode = null;
    public ?int $profileId = null;
    public string $program;
    public ?array $replacementDetails = null;
    public mixed $replacesCard = null;
    public mixed $secondLine = null;
    public mixed $state = null;
    public ?string $status = null;
    public mixed $thirdLine = null;
}

/** Request payload for CardOrder#load. */
class CardOrderLoadMatch
{
    public int $id;
    public int $profile_id;
}

/** Request payload for CardOrder#list. */
class CardOrderListMatch
{
    public int $profile_id;
    public ?int $page_number = null;
    public ?int $page_size = null;
}

/** Request payload for CardOrder#create. */
class CardOrderCreateData
{
    public ?array $address = null;
    public string $cardHolderName;
    public ?int $cardHolderProfileId = null;
    public ?string $city = null;
    public ?string $country = null;
    public ?string $deliveryOption = null;
    public ?string $embossedName = null;
    public ?string $firstLine = null;
    public mixed $lifetimeLimit = null;
    public ?string $phoneNumber = null;
    public ?string $postCode = null;
    public string $program;
    public ?array $replacementDetails = null;
    public mixed $secondLine = null;
    public mixed $state = null;
    public mixed $thirdLine = null;
}

/** Request payload for CardOrder#update. */
class CardOrderUpdateData
{
    public int $id;
    public int $profile_id;
    public ?string $status = null;
}

/** CardSensitiveDetail entity data model. */
class CardSensitiveDetail
{
    public string $encryptedPayload;
    public ?string $key = null;
    public int $keyVersion;
    public ?int $version = null;
}

/** Request payload for CardSensitiveDetail#load. */
class CardSensitiveDetailLoadMatch
{
    public ?string $encryptedPayload = null;
    public ?string $key = null;
    public ?int $keyVersion = null;
    public ?int $version = null;
}

/** Request payload for CardSensitiveDetail#create. */
class CardSensitiveDetailCreateData
{
    public string $encryptedPayload;
    public int $keyVersion;
}

/** CardTransaction entity data model. */
class CardTransaction
{
    public mixed $approvalCode = null;
    public mixed $arn = null;
    public ?string $authorisationMethod = null;
    public mixed $balanceChannelReferenceId = null;
    public ?array $billingAmount = null;
    public ?string $cardToken = null;
    public ?string $creationTime = null;
    public ?array $credits = null;
    public ?array $debits = null;
    public mixed $declineReason = null;
    public mixed $detailedDeclineReason = null;
    public ?array $fees = null;
    public ?int $id = null;
    public ?array $merchant = null;
    public ?string $modificationTime = null;
    public mixed $pinValidationResult = null;
    public mixed $purgeTime = null;
    public mixed $relayAuthorisationData = null;
    public ?string $state = null;
    public ?array $transactionAmount = null;
    public ?array $transactionAmountWithFees = null;
    public ?string $type = null;
}

/** Request payload for CardTransaction#load. */
class CardTransactionLoadMatch
{
    public int $id;
    public int $profile_id;
}

/** Request payload for CardTransaction#list. */
class CardTransactionListMatch
{
    public string $card_token;
    public int $profile_id;
    public string $from_creation_time;
    public ?int $last_id = null;
    public ?int $page_size = null;
    public string $to_creation_time;
}

/** Case entity data model. */
class CaseType
{
    public string $createdAt;
    public ?string $description = null;
    public ?array $details = null;
    public ?string $externalId = null;
    public int $id;
    public array $messages;
    public int $profileId;
    public array $reference;
    public string $status;
    public ?string $subType = null;
    public ?string $subject = null;
    public string $type;
    public ?string $updatedAt = null;
}

/** Request payload for Case#load. */
class CaseLoadMatch
{
    public int $id;
}

/** Request payload for Case#create. */
class CaseCreateData
{
    public ?string $description = null;
    public ?array $details = null;
    public ?string $externalId = null;
    public ?string $subject = null;
    public ?string $type = null;
}

/** ClaimAccount entity data model. */
class ClaimAccount
{
    public ?string $claimAccountCode = null;
    public string $registrationCode;
}

/** Request payload for ClaimAccount#create. */
class ClaimAccountCreateData
{
    public string $registrationCode;
}

/** Comparison entity data model. */
class Comparison
{
    public ?float $amount = null;
    public ?string $amountType = null;
    public mixed $providerCountry = null;
    public ?array $providerTypes = null;
    public ?array $providers = null;
    public mixed $sourceCountry = null;
    public mixed $sourceCurrency = null;
    public mixed $targetCountry = null;
    public mixed $targetCurrency = null;
}

/** Request payload for Comparison#load. */
class ComparisonLoadMatch
{
    public ?bool $exclude_partner = null;
    public ?string $filter = null;
    public ?bool $include_wise = null;
    public ?float $mid_market_rate = null;
    public ?int $number_of_provider = null;
    public ?string $pay_in_method = null;
    public ?string $provider = null;
    public ?string $provider_country = null;
    public ?array $provider_type = null;
    public ?float $recipient_gets_amount = null;
    public ?float $send_amount = null;
    public ?string $source_country = null;
    public string $source_currency;
    public ?string $target_country = null;
    public string $target_currency;
    public ?string $wise_estimated_delivery = null;
    public ?float $wise_fee = null;
    public ?string $wise_quote_created_time = null;
}

/** Contact entity data model. */
class Contact
{
    public ?string $contactId = null;
    public ?string $identifier = null;
    public ?string $name = null;
    public ?string $targetCurrency = null;
}

/** Request payload for Contact#create. */
class ContactCreateData
{
    public int $profile_id;
    public bool $is_direct_identifier_creation;
    public ?string $identifier = null;
    public ?string $targetCurrency = null;
}

/** Currency entity data model. */
class Currency
{
    public ?string $code = null;
    public ?array $countryKeywords = null;
    public ?string $name = null;
    public ?bool $supportsDecimals = null;
    public ?string $symbol = null;
}

/** Request payload for Currency#list. */
class CurrencyListMatch
{
    public ?string $code = null;
    public ?array $countryKeywords = null;
    public ?string $name = null;
    public ?bool $supportsDecimals = null;
    public ?string $symbol = null;
}

/** DeliveryEstimate entity data model. */
class DeliveryEstimate
{
    public ?string $estimatedDeliveryDate = null;
    public ?string $formattedEstimatedDeliveryDate = null;
    public ?string $id = null;
}

/** Request payload for DeliveryEstimate#load. */
class DeliveryEstimateLoadMatch
{
    public int $id;
    public ?string $timezone = null;
}

/** DeliveryUpdate entity data model. */
class DeliveryUpdate
{
    public string $delivery_update;
    public array $delivery_update_path;
    public mixed $estimated_delivery_at = null;
    public string $observation_id;
    public string $occurred_at;
    public mixed $scheme = null;
}

/** Request payload for DeliveryUpdate#create. */
class DeliveryUpdateCreateData
{
    public int $transfer_id;
    public string $delivery_update;
    public array $delivery_update_path;
    public mixed $estimated_delivery_at = null;
    public mixed $scheme = null;
}

/** DigitalWallet entity data model. */
class DigitalWallet
{
    public string $activation;
    public ?array $paymentTokens = null;
    public ?array $walletNames = null;
}

/** Request payload for DigitalWallet#create. */
class DigitalWalletCreateData
{
    public string $card_token;
    public ?string $payment_token_unique_reference = null;
    public int $profile_id;
    public string $activation;
    public ?array $walletNames = null;
}

/** DirectDebitAccount entity data model. */
class DirectDebitAccount
{
    public ?string $currency = null;
    public ?array $details = null;
    public ?int $id = null;
    public ?string $type = null;
}

/** Request payload for DirectDebitAccount#list. */
class DirectDebitAccountListMatch
{
    public int $profile_id;
    public string $currency;
    public string $type;
}

/** Request payload for DirectDebitAccount#create. */
class DirectDebitAccountCreateData
{
    public int $profile_id;
    public ?string $currency = null;
    public ?array $details = null;
    public ?string $type = null;
}

/** Director entity data model. */
class Director
{
    public ?string $countryOfResidenceIso3Code = null;
    public ?string $dateOfBirth = null;
    public ?array $directors = null;
    public ?string $firstName = null;
    public ?int $id = null;
    public ?string $lastName = null;
}

/** Request payload for Director#list. */
class DirectorListMatch
{
    public int $profile_id;
}

/** Request payload for Director#create. */
class DirectorCreateData
{
    public int $profile_id;
    public ?array $directors = null;
}

/** Request payload for Director#update. */
class DirectorUpdateData
{
    public int $profile_id;
    public ?array $directors = null;
}

/** Request payload for Director#remove. */
class DirectorRemoveMatch
{
    public int $profile_id;
}

/** Dispute entity data model. */
class Dispute
{
    public ?bool $canWithdraw = null;
    public ?string $createdAt = null;
    public ?string $createdBy = null;
    public ?array $disclaimer = null;
    public ?array $files = null;
    public ?array $form = null;
    public ?string $id = null;
    public ?string $lastUpdatedAt = null;
    public ?int $profileId = null;
    public ?string $reason = null;
    public ?string $receipt = null;
    public ?string $status = null;
    public ?string $statusMessage = null;
    public ?string $subStatus = null;
    public ?array $transaction = null;
    public ?int $transactionId = null;
}

/** Request payload for Dispute#load. */
class DisputeLoadMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for Dispute#list. */
class DisputeListMatch
{
    public int $profile_id;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $status = null;
    public ?int $transaction_id = null;
}

/** Request payload for Dispute#create. */
class DisputeCreateData
{
    public int $profile_id;
    public ?string $reason = null;
    public ?string $scheme = null;
    public ?bool $canWithdraw = null;
    public ?string $createdAt = null;
    public ?string $createdBy = null;
    public ?array $disclaimer = null;
    public ?array $files = null;
    public ?array $form = null;
    public ?string $id = null;
    public ?string $lastUpdatedAt = null;
    public ?int $profileId = null;
    public ?string $receipt = null;
    public ?string $status = null;
    public ?string $statusMessage = null;
    public ?string $subStatus = null;
    public ?array $transaction = null;
    public ?int $transactionId = null;
}

/** Request payload for Dispute#update. */
class DisputeUpdateData
{
    public string $id;
    public int $profile_id;
    public ?string $status = null;
}

/** DisputeReason entity data model. */
class DisputeReason
{
    public ?string $code = null;
    public ?string $description = null;
    public ?bool $isFraud = null;
    public ?array $subOptions = null;
    public ?bool $supportsMultipleTransactions = null;
    public ?string $tooltip = null;
}

/** Request payload for DisputeReason#list. */
class DisputeReasonListMatch
{
    public int $profile_id;
}

/** Facetec entity data model. */
class Facetec
{
}

/** Request payload for Facetec#load. */
class FacetecLoadMatch
{
}

/** File entity data model. */
class File
{
    public string $createdAt;
    public string $file;
    public string $fileId;
    public string $fileName;
    public int $profileId;
    public string $purpose;
    public array $submissionData;
}

/** Request payload for File#list. */
class FileListMatch
{
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $profile_id = null;
}

/** Request payload for File#create. */
class FileCreateData
{
    public string $createdAt;
    public string $file;
    public string $fileId;
    public string $fileName;
    public int $profileId;
    public string $purpose;
    public array $submissionData;
}

/** Funding entity data model. */
class Funding
{
    public ?int $balanceTransactionId = null;
    public ?string $status = null;
    public ?string $type = null;
}

/** Request payload for Funding#create. */
class FundingCreateData
{
    public int $profile_id;
    public int $transfer_id;
    public ?string $status = null;
    public ?string $type = null;
    public mixed $balanceId = null;
    public mixed $partnerReference = null;
}

/** GpiTracking entity data model. */
class GpiTracking
{
    public string $identifier;
    public string $identifierType;
    public ?array $transactions = null;
}

/** Request payload for GpiTracking#create. */
class GpiTrackingCreateData
{
    public string $identifier;
    public string $identifierType;
}

/** HoldLimitBreach entity data model. */
class HoldLimitBreach
{
    public ?float $amount = null;
    public ?string $closingReason = null;
    public ?string $createdAt = null;
    public ?string $currency = null;
    public ?int $id = null;
    public ?int $profileId = null;
    public ?string $state = null;
    public ?string $updatedAt = null;
}

/** Request payload for HoldLimitBreach#list. */
class HoldLimitBreachListMatch
{
    public int $profile_id;
    public ?string $closing_reason = null;
    public ?string $state = null;
}

/** IncomingTransfer entity data model. */
class IncomingTransfer
{
    public ?string $accountDetailsId = null;
    public array $amounts;
    public string $balanceId;
    public ?string $chargeBearer = null;
    public ?string $creditTransferType = null;
    public string $creditedTime;
    public array $creditor;
    public array $debtor;
    public ?string $endToEndId = null;
    public float $exchangeRate;
    public array $fees;
    public string $id;
    public array $previousInstructingAgents;
    public int $profileId;
    public string $scheme;
    public string $state;
    public ?string $uetr = null;
    public ?string $unstructuredReference = null;
}

/** Request payload for IncomingTransfer#load. */
class IncomingTransferLoadMatch
{
    public string $id;
}

/** Jose entity data model. */
class Jose
{
    public ?string $keyId = null;
    public ?array $keyMaterial = null;
    public ?array $publicKeyMaterial = null;
    public ?string $scope = null;
    public ?string $validFrom = null;
    public ?string $validTill = null;
    public ?int $version = null;
}

/** Request payload for Jose#load. */
class JoseLoadMatch
{
    public string $algorithm;
    public string $scope;
    public ?int $version = null;
}

/** Request payload for Jose#create. */
class JoseCreateData
{
    public ?string $keyId = null;
    public ?array $publicKeyMaterial = null;
    public ?string $scope = null;
    public ?string $validFrom = null;
    public ?string $validTill = null;
}

/** KycReview entity data model. */
class KycReview
{
    public ?string $createdAt = null;
    public ?string $id = null;
    public mixed $link = null;
    public mixed $redirectUrl = null;
    public mixed $requiredBy = null;
    public mixed $requirements = null;
    public ?string $status = null;
    public ?array $triggerData = null;
    public ?array $triggerReferences = null;
    public string $type;
    public ?string $updatedAt = null;
}

/** Request payload for KycReview#load. */
class KycReviewLoadMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for KycReview#list. */
class KycReviewListMatch
{
    public int $profile_id;
    public ?int $page_number = null;
    public ?int $page_size = null;
}

/** Request payload for KycReview#create. */
class KycReviewCreateData
{
    public int $profile_id;
    public ?string $requirement_key = null;
    public ?string $createdAt = null;
    public ?string $id = null;
    public mixed $link = null;
    public mixed $redirectUrl = null;
    public mixed $requiredBy = null;
    public mixed $requirements = null;
    public ?string $status = null;
    public ?array $triggerData = null;
    public ?array $triggerReferences = null;
    public string $type;
    public ?string $updatedAt = null;
}

/** Request payload for KycReview#update. */
class KycReviewUpdateData
{
    public string $id;
    public int $profile_id;
    public mixed $redirectUrl = null;
}

/** LinkRequest entity data model. */
class LinkRequest
{
    public string $clientKey;
    public string $email;
    public string $id;
    public array $metadata;
    public int $profileId;
    public string $redirectUrl;
    public int $transactionId;
    public string $type;
}

/** Request payload for LinkRequest#load. */
class LinkRequestLoadMatch
{
    public string $id;
}

/** Request payload for LinkRequest#create. */
class LinkRequestCreateData
{
    public int $profile_id;
    public string $email;
    public string $redirectUrl;
    public int $transactionId;
}

/** Message entity data model. */
class Message
{
    public array $submissionData;
    public string $type;
}

/** Request payload for Message#create. */
class MessageCreateData
{
    public int $case_id;
    public array $submissionData;
    public string $type;
}

/** MultiCurrencyAccount entity data model. */
class MultiCurrencyAccount
{
}

/** Request payload for MultiCurrencyAccount#load. */
class MultiCurrencyAccountLoadMatch
{
    public ?string $country = null;
    public ?int $profile_id = null;
    public ?string $state = null;
}

/** Request payload for MultiCurrencyAccount#list. */
class MultiCurrencyAccountListMatch
{
    public int $profile_id;
}

/** OneTimeToken entity data model. */
class OneTimeToken
{
    public ?array $challenges = null;
    public ?string $faceMap = null;
    public ?string $oneTimeToken = null;
    public ?int $validity = null;
}

/** Request payload for OneTimeToken#create. */
class OneTimeTokenCreateData
{
    public int $profile_id;
    public ?string $faceMap = null;
}

/** Ott entity data model. */
class Ott
{
    public ?string $actionType = null;
    public ?array $challenges = null;
    public ?string $oneTimeToken = null;
    public ?int $userId = null;
    public ?int $validity = null;
}

/** Request payload for Ott#load. */
class OttLoadMatch
{
    public ?string $actionType = null;
    public ?array $challenges = null;
    public ?string $oneTimeToken = null;
    public ?int $userId = null;
    public ?int $validity = null;
}

/** Request payload for Ott#create. */
class OttCreateData
{
    public mixed $otpCode = null;
}

/** Payin entity data model. */
class Payin
{
    public ?float $amount = null;
    public ?string $currency = null;
    public ?array $details = null;
    public ?string $failureReason = null;
    public ?string $id = null;
    public ?string $payinSessionId = null;
    public ?string $paymentInstrumentId = null;
    public ?string $qrCodeInBase64 = null;
    public ?string $reference = null;
    public ?string $status = null;
}

/** Request payload for Payin#create. */
class PayinCreateData
{
    public ?string $payin_session_id = null;
    public int $profile_id;
    public ?string $payment_instrument_id = null;
    public ?float $amount = null;
    public ?string $currency = null;
    public ?array $details = null;
    public ?string $failureReason = null;
    public ?string $id = null;
    public string $payinSessionId;
    public ?string $paymentInstrumentId = null;
    public ?string $qrCodeInBase64 = null;
    public ?string $reference = null;
    public ?string $status = null;
}

/** PayinDepositDetail entity data model. */
class PayinDepositDetail
{
    public ?array $payinBank = null;
    public ?array $payinBankAccount = null;
    public ?array $wiseInformation = null;
}

/** Request payload for PayinDepositDetail#load. */
class PayinDepositDetailLoadMatch
{
    public int $profile_id;
    public int $transfer_id;
}

/** Payment entity data model. */
class Payment
{
    public ?float $amount = null;
    public ?string $currency = null;
    public ?int $id = null;
    public ?string $method = null;
    public mixed $pricingVariant = null;
    public ?string $timeCreated = null;
    public ?string $timeUpdated = null;
}

/** Request payload for Payment#list. */
class PaymentListMatch
{
    public int $transfer_id;
}

/** PaymentInitiation entity data model. */
class PaymentInitiation
{
    public ?string $id = null;
}

/** Request payload for PaymentInitiation#load. */
class PaymentInitiationLoadMatch
{
    public string $batch_group_id;
    public int $id;
    public int $profile_id;
}

/** Request payload for PaymentInitiation#create. */
class PaymentInitiationCreateData
{
    public string $batch_group_id;
    public int $profile_id;
    public mixed $accountId = null;
    public mixed $reference = null;
    public mixed $type = null;
}

/** PaymentInstrument entity data model. */
class PaymentInstrument
{
    public ?string $accountHolderName = null;
    public ?string $accountNumber = null;
    public ?array $accountOwnerDetails = null;
    public ?string $accountType = null;
    public ?string $bankCode = null;
    public ?string $bankName = null;
    public ?string $branchCode = null;
    public ?string $disconnectReason = null;
    public ?string $id = null;
    public ?string $reference = null;
    public ?string $status = null;
    public ?string $type = null;
}

/** Request payload for PaymentInstrument#load. */
class PaymentInstrumentLoadMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for PaymentInstrument#list. */
class PaymentInstrumentListMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for PaymentInstrument#create. */
class PaymentInstrumentCreateData
{
    public int $profile_id;
    public ?string $accountHolderName = null;
    public string $accountNumber;
    public ?array $accountOwnerDetails = null;
    public ?string $accountType = null;
    public ?string $bankCode = null;
    public ?string $branchCode = null;
    public ?string $reference = null;
    public string $type;
}

/** PaymentIntent entity data model. */
class PaymentIntent
{
    public ?string $allocationId = null;
    public ?string $allocationType = null;
    public ?string $createdAt = null;
    public ?string $fundingSource = null;
    public ?string $id = null;
    public ?string $partnerEntityId = null;
    public ?string $paymentReference = null;
    public ?string $profileId = null;
    public ?string $reason = null;
    public ?string $recipientType = null;
    public ?float $sourceAmount = null;
    public ?string $sourceCurrency = null;
    public ?string $state = null;
    public ?float $targetAmount = null;
    public ?string $targetCurrency = null;
    public ?string $updatedAt = null;
}

/** Request payload for PaymentIntent#load. */
class PaymentIntentLoadMatch
{
    public string $allocation_id;
    public string $id;
}

/** PhoneNumber entity data model. */
class PhoneNumber
{
    public ?string $clientId = null;
    public ?int $id = null;
    public ?string $phoneNumber = null;
    public ?string $type = null;
    public ?bool $verified = null;
}

/** Request payload for PhoneNumber#create. */
class PhoneNumberCreateData
{
    public int $user_id;
    public ?string $phoneNumber = null;
}

/** Production entity data model. */
class Production
{
    public mixed $description = null;
    public mixed $errorCode = null;
    public mixed $kioskId = null;
    public ?string $occurredAt = null;
    public ?string $status = null;
}

/** Request payload for Production#load. */
class ProductionLoadMatch
{
    public string $card_token;
    public int $profile_id;
}

/** Request payload for Production#update. */
class ProductionUpdateData
{
    public string $card_token;
    public int $profile_id;
    public mixed $kioskId = null;
}

/** Profile entity data model. */
class Profile
{
    public ?array $address = null;
    public ?string $avatar = null;
    public ?array $contactDetails = null;
    public ?string $createdAt = null;
    public ?string $currentState = null;
    public ?string $dateOfBirth = null;
    public ?string $email = null;
    public ?string $firstName = null;
    public ?string $fullName = null;
    public ?int $id = null;
    public ?string $lastName = null;
    public ?string $phoneNumber = null;
    public ?string $preferredName = null;
    public ?string $publicId = null;
    public ?array $secondaryAddresses = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
    public ?int $userId = null;
}

/** Request payload for Profile#load. */
class ProfileLoadMatch
{
    public int $id;
}

/** Request payload for Profile#list. */
class ProfileListMatch
{
    public ?array $address = null;
    public ?string $avatar = null;
    public ?array $contactDetails = null;
    public ?string $createdAt = null;
    public ?string $currentState = null;
    public ?string $dateOfBirth = null;
    public ?string $email = null;
    public ?string $firstName = null;
    public ?string $fullName = null;
    public ?int $id = null;
    public ?string $lastName = null;
    public ?string $phoneNumber = null;
    public ?string $preferredName = null;
    public ?string $publicId = null;
    public ?array $secondaryAddresses = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
    public ?int $userId = null;
}

/** Request payload for Profile#create. */
class ProfileCreateData
{
    public ?array $address = null;
    public ?string $avatar = null;
    public ?array $contactDetails = null;
    public ?string $createdAt = null;
    public ?string $currentState = null;
    public ?string $dateOfBirth = null;
    public ?string $email = null;
    public ?string $firstName = null;
    public ?string $fullName = null;
    public ?int $id = null;
    public ?string $lastName = null;
    public ?string $phoneNumber = null;
    public ?string $preferredName = null;
    public ?string $publicId = null;
    public ?array $secondaryAddresses = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
    public ?int $userId = null;
    public mixed $birthCity = null;
    public mixed $birthCountry = null;
    public mixed $employerCity = null;
    public mixed $employerCountry = null;
    public mixed $employerName = null;
    public mixed $expiryDate = null;
    public mixed $externalCustomerId = null;
    public mixed $firstNameInKana = null;
    public mixed $issueDate = null;
    public mixed $issuerCountry = null;
    public mixed $issuerState = null;
    public mixed $lastNameInKana = null;
    public mixed $nationality = null;
    public mixed $occupations = null;
    public mixed $recipientId = null;
    public mixed $uniqueIdentifier = null;
}

/** Request payload for Profile#update. */
class ProfileUpdateData
{
    public int $id;
    public ?array $address = null;
    public ?array $contactDetails = null;
    public ?string $dateOfBirth = null;
    public ?string $firstName = null;
    public ?string $lastName = null;
    public ?string $preferredName = null;
    public ?string $type = null;
    public mixed $actorEmail = null;
    public mixed $clientId = null;
    public mixed $expiryDate = null;
    public mixed $externalCustomerId = null;
    public mixed $firstNameInKana = null;
    public mixed $issueDate = null;
    public mixed $issuerCountry = null;
    public mixed $issuerState = null;
    public mixed $lastNameInKana = null;
    public mixed $localizedInformation = null;
    public mixed $nationality = null;
    public mixed $occupations = null;
    public mixed $placeOfBirth = null;
    public mixed $sex = null;
    public mixed $uniqueIdentifier = null;
    public mixed $updateContext = null;
}

/** Request payload for Profile#remove. */
class ProfileRemoveMatch
{
    public int $id;
}

/** Quote entity data model. */
class Quote
{
    public ?string $createdTime = null;
    public ?array $creationContext = null;
    public ?string $expirationTime = null;
    public ?bool $guaranteedTargetAmount = null;
    public ?bool $guaranteedTargetAmountAllowed = null;
    public ?string $id = null;
    public ?array $notices = null;
    public ?string $payOut = null;
    public ?array $paymentMetadata = null;
    public ?array $paymentOptions = null;
    public ?string $preferredPayIn = null;
    public ?array $pricingConfiguration = null;
    public ?int $profile = null;
    public ?string $providedAmountType = null;
    public ?float $rate = null;
    public ?string $rateExpirationTime = null;
    public ?string $rateType = null;
    public ?float $sourceAmount = null;
    public ?string $sourceCurrency = null;
    public ?string $status = null;
    public ?int $targetAccount = null;
    public ?float $targetAmount = null;
    public ?bool $targetAmountAllowed = null;
    public ?string $targetCurrency = null;
    public ?int $user = null;
}

/** Request payload for Quote#load. */
class QuoteLoadMatch
{
    public string $id;
    public int $profile_id;
}

/** Request payload for Quote#create. */
class QuoteCreateData
{
    public ?array $creationContext = null;
    public ?string $payOut = null;
    public ?array $paymentMetadata = null;
    public ?string $preferredPayIn = null;
    public ?array $pricingConfiguration = null;
    public ?float $sourceAmount = null;
    public string $sourceCurrency;
    public ?int $targetAccount = null;
    public ?float $targetAmount = null;
    public string $targetCurrency;
}

/** Request payload for Quote#update. */
class QuoteUpdateData
{
    public string $id;
    public int $profile_id;
    public ?string $payOut = null;
    public ?array $paymentMetadata = null;
    public ?array $pricingConfiguration = null;
    public ?int $targetAccount = null;
}

/** Rate entity data model. */
class Rate
{
    public float $rate;
    public string $source;
    public string $target;
    public string $time;
}

/** Request payload for Rate#list. */
class RateListMatch
{
    public ?string $from = null;
    public ?string $group = null;
    public ?string $source = null;
    public ?string $target = null;
    public ?string $time = null;
    public ?string $to = null;
}

/** Recipient entity data model. */
class Recipient
{
    public bool $acceptedOutcomes;
    public ?string $accountHolderName = null;
    public ?int $accountId = null;
    public ?string $accountSummary = null;
    public ?bool $active = null;
    public ?array $commonFieldMap = null;
    public ?array $confirmations = null;
    public ?string $country = null;
    public ?int $creatorId = null;
    public ?string $currency = null;
    public ?array $details = null;
    public ?array $displayFields = null;
    public ?string $hash = null;
    public ?int $id = null;
    public ?bool $isInternal = null;
    public ?string $legalEntityType = null;
    public ?string $longAccountSummary = null;
    public ?array $name = null;
    public ?bool $ownedByCustomer = null;
    public ?int $profile = null;
    public ?int $profileId = null;
    public ?string $quoteId = null;
    public ?string $type = null;
    public mixed $ultimateBeneficiary;
}

/** Request payload for Recipient#load. */
class RecipientLoadMatch
{
    public int $account_id;
}

/** Request payload for Recipient#list. */
class RecipientListMatch
{
    public ?bool $active = null;
    public ?int $creator_id = null;
    public ?string $currency = null;
    public ?bool $owned_by_customer = null;
    public ?int $profile = null;
    public ?int $profile_id = null;
    public mixed $seek_position = null;
    public ?int $size = null;
    public ?string $sort = null;
    public ?string $type = null;
}

/** Request payload for Recipient#create. */
class RecipientCreateData
{
    public ?bool $refund = null;
    public bool $acceptedOutcomes;
    public ?string $accountHolderName = null;
    public ?int $accountId = null;
    public ?string $accountSummary = null;
    public ?bool $active = null;
    public ?array $commonFieldMap = null;
    public ?array $confirmations = null;
    public ?string $country = null;
    public ?int $creatorId = null;
    public ?string $currency = null;
    public ?array $details = null;
    public ?array $displayFields = null;
    public ?string $hash = null;
    public ?int $id = null;
    public ?bool $isInternal = null;
    public ?string $legalEntityType = null;
    public ?string $longAccountSummary = null;
    public ?array $name = null;
    public ?bool $ownedByCustomer = null;
    public ?int $profile = null;
    public ?int $profileId = null;
    public ?string $quoteId = null;
    public ?string $type = null;
    public mixed $ultimateBeneficiary;
}

/** Request payload for Recipient#update. */
class RecipientUpdateData
{
    public int $account_id;
    public ?string $quote_id = null;
    public ?bool $acceptedOutcomes = null;
}

/** Request payload for Recipient#remove. */
class RecipientRemoveMatch
{
    public int $account_id;
}

/** Rule entity data model. */
class Rule
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $operation = null;
    public ?string $type = null;
    public ?array $values = null;
}

/** Request payload for Rule#list. */
class RuleListMatch
{
    public string $application_id;
}

/** Request payload for Rule#create. */
class RuleCreateData
{
    public string $application_id;
    public ?string $description = null;
    public ?string $operation = null;
    public ?string $type = null;
    public ?array $values = null;
}

/** Saml entity data model. */
class Saml
{
    public ?string $RelayState = null;
    public string $SAMLResponse;
}

/** Request payload for Saml#load. */
class SamlLoadMatch
{
    public string $registration_id;
}

/** Request payload for Saml#create. */
class SamlCreateData
{
    public ?string $RelayState = null;
    public string $SAMLResponse;
}

/** ScaDeviceFingerprint entity data model. */
class ScaDeviceFingerprint
{
    public ?string $createdAt = null;
    public ?string $deviceFingerprintId = null;
    public ?string $id = null;
}

/** Request payload for ScaDeviceFingerprint#create. */
class ScaDeviceFingerprintCreateData
{
    public int $profile_id;
}

/** Request payload for ScaDeviceFingerprint#remove. */
class ScaDeviceFingerprintRemoveMatch
{
    public string $id;
    public int $profile_id;
}

/** ScaFacemap entity data model. */
class ScaFacemap
{
    public ?string $faceMap = null;
}

/** Request payload for ScaFacemap#create. */
class ScaFacemapCreateData
{
    public int $profile_id;
    public ?string $faceMap = null;
}

/** Request payload for ScaFacemap#remove. */
class ScaFacemapRemoveMatch
{
    public int $profile_id;
}

/** ScaOtp entity data model. */
class ScaOtp
{
}

/** Request payload for ScaOtp#create. */
class ScaOtpCreateData
{
}

/** Request payload for ScaOtp#remove. */
class ScaOtpRemoveMatch
{
    public int $phone_number_id;
    public int $user_id;
}

/** ScaSession entity data model. */
class ScaSession
{
}

/** Request payload for ScaSession#create. */
class ScaSessionCreateData
{
    public int $profile_id;
}

/** SettlementAllocation entity data model. */
class SettlementAllocation
{
    public array $command;
    public ?string $createdAt = null;
    public ?string $currency = null;
    public ?float $expectedTotalAmount = null;
    public string $file;
    public ?string $id = null;
    public ?string $nextPageToken = null;
    public ?array $paymentIntents = null;
    public ?string $paymentReference = null;
    public ?string $state = null;
    public ?string $updatedAt = null;
}

/** Request payload for SettlementAllocation#load. */
class SettlementAllocationLoadMatch
{
    public string $id;
    public ?bool $include_payment_intent = null;
    public ?int $page_size = null;
    public ?string $page_token = null;
}

/** Request payload for SettlementAllocation#create. */
class SettlementAllocationCreateData
{
    public array $command;
    public string $createdAt;
    public string $currency;
    public float $expectedTotalAmount;
    public string $file;
    public string $id;
    public ?string $nextPageToken = null;
    public ?array $paymentIntents = null;
    public string $paymentReference;
    public string $state;
    public string $updatedAt;
}

/** Simulation entity data model. */
class Simulation
{
    public ?string $business = null;
    public ?string $created = null;
    public ?float $creationTime = null;
    public mixed $description = null;
    public ?array $details = null;
    public ?string $failure_reason_code = null;
    public ?bool $hasActiveIssues = null;
    public ?string $id = null;
    public ?string $key = null;
    public ?int $quote = null;
    public ?float $rate = null;
    public ?string $reference = null;
    public ?string $sourceAccount = null;
    public ?string $sourceCurrency = null;
    public ?int $sourceValue = null;
    public ?string $state = null;
    public ?string $status = null;
    public ?int $targetAccount = null;
    public ?string $targetCurrency = null;
    public ?float $targetValue = null;
    public ?int $transactionId = null;
    public ?string $transferRequest = null;
    public ?int $user = null;
    public ?int $wise_id = null;
}

/** Request payload for Simulation#load. */
class SimulationLoadMatch
{
    public string $status;
    public int $transfer_id;
}

/** Request payload for Simulation#list. */
class SimulationListMatch
{
    public ?string $card_token = null;
    public int $profile_id;
    public ?int $limit = null;
    public ?string $kyc_review_id = null;
}

/** Request payload for Simulation#create. */
class SimulationCreateData
{
    public int $transfer_id;
    public ?string $failure_reason_code = null;
}

/** SpendControl entity data model. */
class SpendControl
{
    public ?int $ruleId = null;
}

/** Request payload for SpendControl#list. */
class SpendControlListMatch
{
    public string $application_id;
}

/** Request payload for SpendControl#create. */
class SpendControlCreateData
{
    public string $application_id;
    public ?int $ruleId = null;
}

/** Request payload for SpendControl#remove. */
class SpendControlRemoveMatch
{
    public string $application_id;
    public int $rule_id;
}

/** SpendLimit entity data model. */
class SpendLimit
{
    public ?array $aggregateWindow = null;
    public ?string $id = null;
    public ?string $type = null;
}

/** Request payload for SpendLimit#list. */
class SpendLimitListMatch
{
    public int $profile_id;
}

/** Request payload for SpendLimit#update. */
class SpendLimitUpdateData
{
    public int $profile_id;
    public ?array $aggregateWindow = null;
    public ?string $type = null;
}

/** Request payload for SpendLimit#remove. */
class SpendLimitRemoveMatch
{
    public string $card_id;
    public string $id;
    public int $profile_id;
}

/** Subscription entity data model. */
class Subscription
{
    public ?string $created_at = null;
    public ?array $created_by = null;
    public ?array $delivery = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $scope = null;
    public ?string $trigger_on = null;
}

/** Request payload for Subscription#load. */
class SubscriptionLoadMatch
{
    public ?string $client_key = null;
    public string $id;
    public ?int $profile_id = null;
}

/** Request payload for Subscription#list. */
class SubscriptionListMatch
{
    public string $client_key;
}

/** Request payload for Subscription#create. */
class SubscriptionCreateData
{
    public string $client_key;
    public array $delivery;
    public string $name;
    public string $trigger_on;
}

/** Request payload for Subscription#remove. */
class SubscriptionRemoveMatch
{
    public ?string $client_key = null;
    public string $id;
    public ?int $profile_id = null;
}

/** TestNotification entity data model. */
class TestNotification
{
    public ?string $created_at = null;
    public ?string $delivery_id = null;
}

/** Request payload for TestNotification#create. */
class TestNotificationCreateData
{
    public string $client_key;
    public string $subscription_id;
    public ?string $created_at = null;
    public ?string $delivery_id = null;
}

/** ThirdPartyTransfer entity data model. */
class ThirdPartyTransfer
{
    public ?string $created = null;
    public ?array $details = null;
    public ?bool $hasActiveIssues = null;
    public ?int $id = null;
    public ?string $originalTransferId = null;
    public ?array $originator = null;
    public ?string $quote = null;
    public ?float $rate = null;
    public ?int $sourceAccount = null;
    public ?string $sourceCurrency = null;
    public ?float $sourceValue = null;
    public ?string $status = null;
    public ?int $targetAccount = null;
    public ?string $targetCurrency = null;
    public ?float $targetValue = null;
    public ?int $user = null;
}

/** Request payload for ThirdPartyTransfer#load. */
class ThirdPartyTransferLoadMatch
{
    public int $id;
    public int $profile_id;
}

/** Request payload for ThirdPartyTransfer#create. */
class ThirdPartyTransferCreateData
{
    public int $profile_id;
    public array $details;
    public string $originalTransferId;
    public array $originator;
    public string $quote;
    public ?int $sourceAccount = null;
    public int $targetAccount;
}

/** ThreeDSecure entity data model. */
class ThreeDSecure
{
    public string $challengeStatus;
    public string $transactionReference;
}

/** Request payload for ThreeDSecure#create. */
class ThreeDSecureCreateData
{
    public int $profile_id;
    public string $challengeStatus;
    public string $transactionReference;
}

/** Token entity data model. */
class Token
{
    public ?string $access_token = null;
    public ?string $created_at = null;
    public ?string $expires_at = null;
    public ?int $expires_in = null;
    public ?string $refresh_token = null;
    public ?string $refresh_token_expires_at = null;
    public ?int $refresh_token_expires_in = null;
    public ?string $scope = null;
    public ?string $token_type = null;
}

/** Request payload for Token#create. */
class TokenCreateData
{
    public ?string $access_token = null;
    public ?string $created_at = null;
    public ?string $expires_at = null;
    public ?int $expires_in = null;
    public ?string $refresh_token = null;
    public ?string $refresh_token_expires_at = null;
    public ?int $refresh_token_expires_in = null;
    public ?string $scope = null;
    public ?string $token_type = null;
}

/** Transfer entity data model. */
class Transfer
{
    public mixed $business = null;
    public ?string $created = null;
    public ?string $customerTransactionId = null;
    public ?array $details = null;
    public ?bool $hasActiveIssues = null;
    public ?int $id = null;
    public ?string $payinSessionId = null;
    public mixed $quote = null;
    public ?string $quoteUuid = null;
    public ?float $rate = null;
    public ?string $reference = null;
    public mixed $sourceAccount = null;
    public ?string $sourceCurrency = null;
    public ?float $sourceValue = null;
    public ?string $status = null;
    public ?int $targetAccount = null;
    public ?string $targetCurrency = null;
    public ?float $targetValue = null;
    public mixed $transferRequest = null;
    public ?int $user = null;
}

/** Request payload for Transfer#load. */
class TransferLoadMatch
{
    public int $id;
}

/** Request payload for Transfer#list. */
class TransferListMatch
{
    public ?string $created_date_end = null;
    public ?string $created_date_start = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?int $profile = null;
    public ?string $source_currency = null;
    public ?string $status = null;
    public ?string $target_currency = null;
}

/** Request payload for Transfer#create. */
class TransferCreateData
{
    public string $customerTransactionId;
    public ?array $details = null;
    public string $quoteUuid;
    public mixed $sourceAccount = null;
    public int $targetAccount;
}

/** Request payload for Transfer#update. */
class TransferUpdateData
{
    public int $id;
    public mixed $business = null;
    public ?string $created = null;
    public ?string $customerTransactionId = null;
    public ?array $details = null;
    public ?bool $hasActiveIssues = null;
    public ?string $payinSessionId = null;
    public mixed $quote = null;
    public ?string $quoteUuid = null;
    public ?float $rate = null;
    public ?string $reference = null;
    public mixed $sourceAccount = null;
    public ?string $sourceCurrency = null;
    public ?float $sourceValue = null;
    public ?string $status = null;
    public ?int $targetAccount = null;
    public ?string $targetCurrency = null;
    public ?float $targetValue = null;
    public mixed $transferRequest = null;
    public ?int $user = null;
}

/** TransferRequirement entity data model. */
class TransferRequirement
{
    public ?string $customerTransactionId = null;
    public ?array $details = null;
    public ?string $originatorLegalEntityType = null;
    public string $quoteUuid;
    public int $targetAccount;
}

/** Request payload for TransferRequirement#create. */
class TransferRequirementCreateData
{
    public ?string $customerTransactionId = null;
    public ?array $details = null;
    public ?string $originatorLegalEntityType = null;
    public string $quoteUuid;
    public int $targetAccount;
}

/** Ubo entity data model. */
class Ubo
{
    public ?string $addressFirstLine = null;
    public ?string $city = null;
    public ?string $countryOfResidenceIso3Code = null;
    public ?string $dateOfBirth = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?int $ownershipPercentage = null;
    public ?string $postCode = null;
    public ?string $state = null;
    public ?array $ubos = null;
}

/** Request payload for Ubo#list. */
class UboListMatch
{
    public int $profile_id;
}

/** Request payload for Ubo#create. */
class UboCreateData
{
    public int $profile_id;
    public ?array $ubos = null;
}

/** Request payload for Ubo#update. */
class UboUpdateData
{
    public int $profile_id;
    public ?array $ubos = null;
}

/** User entity data model. */
class User
{
    public ?bool $active = null;
    public mixed $details = null;
    public ?string $email = null;
    public ?int $id = null;
    public ?string $language = null;
    public mixed $name = null;
    public string $registrationCode;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public int $id;
}

/** Request payload for User#create. */
class UserCreateData
{
    public string $email;
    public ?string $language = null;
    public string $registrationCode;
}

/** Request payload for User#update. */
class UserUpdateData
{
    public int $id;
    public ?string $email = null;
}

/** Verification entity data model. */
class Verification
{
    public ?array $required_evidences = null;
}

/** Request payload for Verification#list. */
class VerificationListMatch
{
    public int $profile_id;
}

/** Request payload for Verification#create. */
class VerificationCreateData
{
    public int $profile_id;
    public mixed $accountPurpose = null;
    public mixed $accountPurposeExplanation = null;
    public mixed $annualIncome = null;
    public mixed $businessUseCase = null;
    public mixed $incomeExplanation = null;
    public mixed $intendedCountries = null;
    public mixed $mainSourceOfFunding = null;
    public mixed $mainSourceOfIncome = null;
    public mixed $monthlyAnticipatedVolume = null;
    public mixed $yearlyAnticipatedVolume = null;
}

