<?php
declare(strict_types=1);

// Wise SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class WiseSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new WiseUtility();
        $this->_utility = $utility;

        $config = WiseConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = WiseHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = WiseHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!WiseFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, WiseFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'Wise'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return WiseUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = WiseHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!WisePrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = WiseHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = WiseHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new WiseSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        $has_accept = false;
        foreach (array_keys($ctx->spec->headers) as $k) {
            if (strtolower((string)$k) === 'accept') {
                $has_accept = true;
                break;
            }
        }
        if (!$has_accept) {
            $ctx->spec->headers['accept'] = 'application/json';
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return WisePrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new WiseError($op . "_allow",
                "WiseSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = WiseHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = WiseHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (WiseFetcher::usesDefault($ctx)) {
                        $sent = WiseFetcher::sentHeaders($sent);
                    }
                    $body_err = WiseResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new WiseError("graphql_error",
                "WiseSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_account_detail = null;

    // Canonical facade: $client->AccountDetail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account_detail()
    // resolves here too.
    public function AccountDetail($data = null)
    {
        require_once __DIR__ . '/entity/account_detail_entity.php';
        if ($data === null) {
            if ($this->_account_detail === null) {
                $this->_account_detail = new AccountDetailEntity($this, null);
            }
            return $this->_account_detail;
        }
        return new AccountDetailEntity($this, $data);
    }


    private $_account_requirement = null;

    // Canonical facade: $client->AccountRequirement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account_requirement()
    // resolves here too.
    public function AccountRequirement($data = null)
    {
        require_once __DIR__ . '/entity/account_requirement_entity.php';
        if ($data === null) {
            if ($this->_account_requirement === null) {
                $this->_account_requirement = new AccountRequirementEntity($this, null);
            }
            return $this->_account_requirement;
        }
        return new AccountRequirementEntity($this, $data);
    }


    private $_activity = null;

    // Canonical facade: $client->Activity()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->activity()
    // resolves here too.
    public function Activity($data = null)
    {
        require_once __DIR__ . '/entity/activity_entity.php';
        if ($data === null) {
            if ($this->_activity === null) {
                $this->_activity = new ActivityEntity($this, null);
            }
            return $this->_activity;
        }
        return new ActivityEntity($this, $data);
    }


    private $_address = null;

    // Canonical facade: $client->Address()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->address()
    // resolves here too.
    public function Address($data = null)
    {
        require_once __DIR__ . '/entity/address_entity.php';
        if ($data === null) {
            if ($this->_address === null) {
                $this->_address = new AddressEntity($this, null);
            }
            return $this->_address;
        }
        return new AddressEntity($this, $data);
    }


    private $_address_requirement = null;

    // Canonical facade: $client->AddressRequirement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->address_requirement()
    // resolves here too.
    public function AddressRequirement($data = null)
    {
        require_once __DIR__ . '/entity/address_requirement_entity.php';
        if ($data === null) {
            if ($this->_address_requirement === null) {
                $this->_address_requirement = new AddressRequirementEntity($this, null);
            }
            return $this->_address_requirement;
        }
        return new AddressRequirementEntity($this, $data);
    }


    private $_balance = null;

    // Canonical facade: $client->Balance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->balance()
    // resolves here too.
    public function Balance($data = null)
    {
        require_once __DIR__ . '/entity/balance_entity.php';
        if ($data === null) {
            if ($this->_balance === null) {
                $this->_balance = new BalanceEntity($this, null);
            }
            return $this->_balance;
        }
        return new BalanceEntity($this, $data);
    }


    private $_balance_statement = null;

    // Canonical facade: $client->BalanceStatement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->balance_statement()
    // resolves here too.
    public function BalanceStatement($data = null)
    {
        require_once __DIR__ . '/entity/balance_statement_entity.php';
        if ($data === null) {
            if ($this->_balance_statement === null) {
                $this->_balance_statement = new BalanceStatementEntity($this, null);
            }
            return $this->_balance_statement;
        }
        return new BalanceStatementEntity($this, $data);
    }


    private $_bank_account_detail = null;

    // Canonical facade: $client->BankAccountDetail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bank_account_detail()
    // resolves here too.
    public function BankAccountDetail($data = null)
    {
        require_once __DIR__ . '/entity/bank_account_detail_entity.php';
        if ($data === null) {
            if ($this->_bank_account_detail === null) {
                $this->_bank_account_detail = new BankAccountDetailEntity($this, null);
            }
            return $this->_bank_account_detail;
        }
        return new BankAccountDetailEntity($this, $data);
    }


    private $_bank_account_details_order = null;

    // Canonical facade: $client->BankAccountDetailsOrder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bank_account_details_order()
    // resolves here too.
    public function BankAccountDetailsOrder($data = null)
    {
        require_once __DIR__ . '/entity/bank_account_details_order_entity.php';
        if ($data === null) {
            if ($this->_bank_account_details_order === null) {
                $this->_bank_account_details_order = new BankAccountDetailsOrderEntity($this, null);
            }
            return $this->_bank_account_details_order;
        }
        return new BankAccountDetailsOrderEntity($this, $data);
    }


    private $_batch_group = null;

    // Canonical facade: $client->BatchGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->batch_group()
    // resolves here too.
    public function BatchGroup($data = null)
    {
        require_once __DIR__ . '/entity/batch_group_entity.php';
        if ($data === null) {
            if ($this->_batch_group === null) {
                $this->_batch_group = new BatchGroupEntity($this, null);
            }
            return $this->_batch_group;
        }
        return new BatchGroupEntity($this, $data);
    }


    private $_bulk_settlement = null;

    // Canonical facade: $client->BulkSettlement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bulk_settlement()
    // resolves here too.
    public function BulkSettlement($data = null)
    {
        require_once __DIR__ . '/entity/bulk_settlement_entity.php';
        if ($data === null) {
            if ($this->_bulk_settlement === null) {
                $this->_bulk_settlement = new BulkSettlementEntity($this, null);
            }
            return $this->_bulk_settlement;
        }
        return new BulkSettlementEntity($this, $data);
    }


    private $_business_profile = null;

    // Canonical facade: $client->BusinessProfile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->business_profile()
    // resolves here too.
    public function BusinessProfile($data = null)
    {
        require_once __DIR__ . '/entity/business_profile_entity.php';
        if ($data === null) {
            if ($this->_business_profile === null) {
                $this->_business_profile = new BusinessProfileEntity($this, null);
            }
            return $this->_business_profile;
        }
        return new BusinessProfileEntity($this, $data);
    }


    private $_card = null;

    // Canonical facade: $client->Card()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card()
    // resolves here too.
    public function Card($data = null)
    {
        require_once __DIR__ . '/entity/card_entity.php';
        if ($data === null) {
            if ($this->_card === null) {
                $this->_card = new CardEntity($this, null);
            }
            return $this->_card;
        }
        return new CardEntity($this, $data);
    }


    private $_card_holder_limit = null;

    // Canonical facade: $client->CardHolderLimit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_holder_limit()
    // resolves here too.
    public function CardHolderLimit($data = null)
    {
        require_once __DIR__ . '/entity/card_holder_limit_entity.php';
        if ($data === null) {
            if ($this->_card_holder_limit === null) {
                $this->_card_holder_limit = new CardHolderLimitEntity($this, null);
            }
            return $this->_card_holder_limit;
        }
        return new CardHolderLimitEntity($this, $data);
    }


    private $_card_limit = null;

    // Canonical facade: $client->CardLimit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_limit()
    // resolves here too.
    public function CardLimit($data = null)
    {
        require_once __DIR__ . '/entity/card_limit_entity.php';
        if ($data === null) {
            if ($this->_card_limit === null) {
                $this->_card_limit = new CardLimitEntity($this, null);
            }
            return $this->_card_limit;
        }
        return new CardLimitEntity($this, $data);
    }


    private $_card_order = null;

    // Canonical facade: $client->CardOrder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_order()
    // resolves here too.
    public function CardOrder($data = null)
    {
        require_once __DIR__ . '/entity/card_order_entity.php';
        if ($data === null) {
            if ($this->_card_order === null) {
                $this->_card_order = new CardOrderEntity($this, null);
            }
            return $this->_card_order;
        }
        return new CardOrderEntity($this, $data);
    }


    private $_card_sensitive_detail = null;

    // Canonical facade: $client->CardSensitiveDetail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_sensitive_detail()
    // resolves here too.
    public function CardSensitiveDetail($data = null)
    {
        require_once __DIR__ . '/entity/card_sensitive_detail_entity.php';
        if ($data === null) {
            if ($this->_card_sensitive_detail === null) {
                $this->_card_sensitive_detail = new CardSensitiveDetailEntity($this, null);
            }
            return $this->_card_sensitive_detail;
        }
        return new CardSensitiveDetailEntity($this, $data);
    }


    private $_card_transaction = null;

    // Canonical facade: $client->CardTransaction()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_transaction()
    // resolves here too.
    public function CardTransaction($data = null)
    {
        require_once __DIR__ . '/entity/card_transaction_entity.php';
        if ($data === null) {
            if ($this->_card_transaction === null) {
                $this->_card_transaction = new CardTransactionEntity($this, null);
            }
            return $this->_card_transaction;
        }
        return new CardTransactionEntity($this, $data);
    }


    private $_case = null;

    // Canonical facade: $client->Case()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->case()
    // resolves here too.
    public function Case($data = null)
    {
        require_once __DIR__ . '/entity/case_entity.php';
        if ($data === null) {
            if ($this->_case === null) {
                $this->_case = new CaseEntity($this, null);
            }
            return $this->_case;
        }
        return new CaseEntity($this, $data);
    }


    private $_claim_account = null;

    // Canonical facade: $client->ClaimAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->claim_account()
    // resolves here too.
    public function ClaimAccount($data = null)
    {
        require_once __DIR__ . '/entity/claim_account_entity.php';
        if ($data === null) {
            if ($this->_claim_account === null) {
                $this->_claim_account = new ClaimAccountEntity($this, null);
            }
            return $this->_claim_account;
        }
        return new ClaimAccountEntity($this, $data);
    }


    private $_comparison = null;

    // Canonical facade: $client->Comparison()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->comparison()
    // resolves here too.
    public function Comparison($data = null)
    {
        require_once __DIR__ . '/entity/comparison_entity.php';
        if ($data === null) {
            if ($this->_comparison === null) {
                $this->_comparison = new ComparisonEntity($this, null);
            }
            return $this->_comparison;
        }
        return new ComparisonEntity($this, $data);
    }


    private $_contact = null;

    // Canonical facade: $client->Contact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->contact()
    // resolves here too.
    public function Contact($data = null)
    {
        require_once __DIR__ . '/entity/contact_entity.php';
        if ($data === null) {
            if ($this->_contact === null) {
                $this->_contact = new ContactEntity($this, null);
            }
            return $this->_contact;
        }
        return new ContactEntity($this, $data);
    }


    private $_currency = null;

    // Canonical facade: $client->Currency()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->currency()
    // resolves here too.
    public function Currency($data = null)
    {
        require_once __DIR__ . '/entity/currency_entity.php';
        if ($data === null) {
            if ($this->_currency === null) {
                $this->_currency = new CurrencyEntity($this, null);
            }
            return $this->_currency;
        }
        return new CurrencyEntity($this, $data);
    }


    private $_delivery_estimate = null;

    // Canonical facade: $client->DeliveryEstimate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->delivery_estimate()
    // resolves here too.
    public function DeliveryEstimate($data = null)
    {
        require_once __DIR__ . '/entity/delivery_estimate_entity.php';
        if ($data === null) {
            if ($this->_delivery_estimate === null) {
                $this->_delivery_estimate = new DeliveryEstimateEntity($this, null);
            }
            return $this->_delivery_estimate;
        }
        return new DeliveryEstimateEntity($this, $data);
    }


    private $_delivery_update = null;

    // Canonical facade: $client->DeliveryUpdate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->delivery_update()
    // resolves here too.
    public function DeliveryUpdate($data = null)
    {
        require_once __DIR__ . '/entity/delivery_update_entity.php';
        if ($data === null) {
            if ($this->_delivery_update === null) {
                $this->_delivery_update = new DeliveryUpdateEntity($this, null);
            }
            return $this->_delivery_update;
        }
        return new DeliveryUpdateEntity($this, $data);
    }


    private $_digital_wallet = null;

    // Canonical facade: $client->DigitalWallet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->digital_wallet()
    // resolves here too.
    public function DigitalWallet($data = null)
    {
        require_once __DIR__ . '/entity/digital_wallet_entity.php';
        if ($data === null) {
            if ($this->_digital_wallet === null) {
                $this->_digital_wallet = new DigitalWalletEntity($this, null);
            }
            return $this->_digital_wallet;
        }
        return new DigitalWalletEntity($this, $data);
    }


    private $_direct_debit_account = null;

    // Canonical facade: $client->DirectDebitAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->direct_debit_account()
    // resolves here too.
    public function DirectDebitAccount($data = null)
    {
        require_once __DIR__ . '/entity/direct_debit_account_entity.php';
        if ($data === null) {
            if ($this->_direct_debit_account === null) {
                $this->_direct_debit_account = new DirectDebitAccountEntity($this, null);
            }
            return $this->_direct_debit_account;
        }
        return new DirectDebitAccountEntity($this, $data);
    }


    private $_director = null;

    // Canonical facade: $client->Director()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->director()
    // resolves here too.
    public function Director($data = null)
    {
        require_once __DIR__ . '/entity/director_entity.php';
        if ($data === null) {
            if ($this->_director === null) {
                $this->_director = new DirectorEntity($this, null);
            }
            return $this->_director;
        }
        return new DirectorEntity($this, $data);
    }


    private $_dispute = null;

    // Canonical facade: $client->Dispute()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->dispute()
    // resolves here too.
    public function Dispute($data = null)
    {
        require_once __DIR__ . '/entity/dispute_entity.php';
        if ($data === null) {
            if ($this->_dispute === null) {
                $this->_dispute = new DisputeEntity($this, null);
            }
            return $this->_dispute;
        }
        return new DisputeEntity($this, $data);
    }


    private $_dispute_reason = null;

    // Canonical facade: $client->DisputeReason()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->dispute_reason()
    // resolves here too.
    public function DisputeReason($data = null)
    {
        require_once __DIR__ . '/entity/dispute_reason_entity.php';
        if ($data === null) {
            if ($this->_dispute_reason === null) {
                $this->_dispute_reason = new DisputeReasonEntity($this, null);
            }
            return $this->_dispute_reason;
        }
        return new DisputeReasonEntity($this, $data);
    }


    private $_facetec = null;

    // Canonical facade: $client->Facetec()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->facetec()
    // resolves here too.
    public function Facetec($data = null)
    {
        require_once __DIR__ . '/entity/facetec_entity.php';
        if ($data === null) {
            if ($this->_facetec === null) {
                $this->_facetec = new FacetecEntity($this, null);
            }
            return $this->_facetec;
        }
        return new FacetecEntity($this, $data);
    }


    private $_file = null;

    // Canonical facade: $client->File()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->file()
    // resolves here too.
    public function File($data = null)
    {
        require_once __DIR__ . '/entity/file_entity.php';
        if ($data === null) {
            if ($this->_file === null) {
                $this->_file = new FileEntity($this, null);
            }
            return $this->_file;
        }
        return new FileEntity($this, $data);
    }


    private $_funding = null;

    // Canonical facade: $client->Funding()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->funding()
    // resolves here too.
    public function Funding($data = null)
    {
        require_once __DIR__ . '/entity/funding_entity.php';
        if ($data === null) {
            if ($this->_funding === null) {
                $this->_funding = new FundingEntity($this, null);
            }
            return $this->_funding;
        }
        return new FundingEntity($this, $data);
    }


    private $_gpi_tracking = null;

    // Canonical facade: $client->GpiTracking()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gpi_tracking()
    // resolves here too.
    public function GpiTracking($data = null)
    {
        require_once __DIR__ . '/entity/gpi_tracking_entity.php';
        if ($data === null) {
            if ($this->_gpi_tracking === null) {
                $this->_gpi_tracking = new GpiTrackingEntity($this, null);
            }
            return $this->_gpi_tracking;
        }
        return new GpiTrackingEntity($this, $data);
    }


    private $_hold_limit_breach = null;

    // Canonical facade: $client->HoldLimitBreach()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hold_limit_breach()
    // resolves here too.
    public function HoldLimitBreach($data = null)
    {
        require_once __DIR__ . '/entity/hold_limit_breach_entity.php';
        if ($data === null) {
            if ($this->_hold_limit_breach === null) {
                $this->_hold_limit_breach = new HoldLimitBreachEntity($this, null);
            }
            return $this->_hold_limit_breach;
        }
        return new HoldLimitBreachEntity($this, $data);
    }


    private $_incoming_transfer = null;

    // Canonical facade: $client->IncomingTransfer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->incoming_transfer()
    // resolves here too.
    public function IncomingTransfer($data = null)
    {
        require_once __DIR__ . '/entity/incoming_transfer_entity.php';
        if ($data === null) {
            if ($this->_incoming_transfer === null) {
                $this->_incoming_transfer = new IncomingTransferEntity($this, null);
            }
            return $this->_incoming_transfer;
        }
        return new IncomingTransferEntity($this, $data);
    }


    private $_jose = null;

    // Canonical facade: $client->Jose()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->jose()
    // resolves here too.
    public function Jose($data = null)
    {
        require_once __DIR__ . '/entity/jose_entity.php';
        if ($data === null) {
            if ($this->_jose === null) {
                $this->_jose = new JoseEntity($this, null);
            }
            return $this->_jose;
        }
        return new JoseEntity($this, $data);
    }


    private $_kyc_review = null;

    // Canonical facade: $client->KycReview()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->kyc_review()
    // resolves here too.
    public function KycReview($data = null)
    {
        require_once __DIR__ . '/entity/kyc_review_entity.php';
        if ($data === null) {
            if ($this->_kyc_review === null) {
                $this->_kyc_review = new KycReviewEntity($this, null);
            }
            return $this->_kyc_review;
        }
        return new KycReviewEntity($this, $data);
    }


    private $_link_request = null;

    // Canonical facade: $client->LinkRequest()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->link_request()
    // resolves here too.
    public function LinkRequest($data = null)
    {
        require_once __DIR__ . '/entity/link_request_entity.php';
        if ($data === null) {
            if ($this->_link_request === null) {
                $this->_link_request = new LinkRequestEntity($this, null);
            }
            return $this->_link_request;
        }
        return new LinkRequestEntity($this, $data);
    }


    private $_message = null;

    // Canonical facade: $client->Message()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->message()
    // resolves here too.
    public function Message($data = null)
    {
        require_once __DIR__ . '/entity/message_entity.php';
        if ($data === null) {
            if ($this->_message === null) {
                $this->_message = new MessageEntity($this, null);
            }
            return $this->_message;
        }
        return new MessageEntity($this, $data);
    }


    private $_multi_currency_account = null;

    // Canonical facade: $client->MultiCurrencyAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->multi_currency_account()
    // resolves here too.
    public function MultiCurrencyAccount($data = null)
    {
        require_once __DIR__ . '/entity/multi_currency_account_entity.php';
        if ($data === null) {
            if ($this->_multi_currency_account === null) {
                $this->_multi_currency_account = new MultiCurrencyAccountEntity($this, null);
            }
            return $this->_multi_currency_account;
        }
        return new MultiCurrencyAccountEntity($this, $data);
    }


    private $_one_time_token = null;

    // Canonical facade: $client->OneTimeToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->one_time_token()
    // resolves here too.
    public function OneTimeToken($data = null)
    {
        require_once __DIR__ . '/entity/one_time_token_entity.php';
        if ($data === null) {
            if ($this->_one_time_token === null) {
                $this->_one_time_token = new OneTimeTokenEntity($this, null);
            }
            return $this->_one_time_token;
        }
        return new OneTimeTokenEntity($this, $data);
    }


    private $_ott = null;

    // Canonical facade: $client->Ott()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ott()
    // resolves here too.
    public function Ott($data = null)
    {
        require_once __DIR__ . '/entity/ott_entity.php';
        if ($data === null) {
            if ($this->_ott === null) {
                $this->_ott = new OttEntity($this, null);
            }
            return $this->_ott;
        }
        return new OttEntity($this, $data);
    }


    private $_payin = null;

    // Canonical facade: $client->Payin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payin()
    // resolves here too.
    public function Payin($data = null)
    {
        require_once __DIR__ . '/entity/payin_entity.php';
        if ($data === null) {
            if ($this->_payin === null) {
                $this->_payin = new PayinEntity($this, null);
            }
            return $this->_payin;
        }
        return new PayinEntity($this, $data);
    }


    private $_payin_deposit_detail = null;

    // Canonical facade: $client->PayinDepositDetail()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payin_deposit_detail()
    // resolves here too.
    public function PayinDepositDetail($data = null)
    {
        require_once __DIR__ . '/entity/payin_deposit_detail_entity.php';
        if ($data === null) {
            if ($this->_payin_deposit_detail === null) {
                $this->_payin_deposit_detail = new PayinDepositDetailEntity($this, null);
            }
            return $this->_payin_deposit_detail;
        }
        return new PayinDepositDetailEntity($this, $data);
    }


    private $_payment = null;

    // Canonical facade: $client->Payment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment()
    // resolves here too.
    public function Payment($data = null)
    {
        require_once __DIR__ . '/entity/payment_entity.php';
        if ($data === null) {
            if ($this->_payment === null) {
                $this->_payment = new PaymentEntity($this, null);
            }
            return $this->_payment;
        }
        return new PaymentEntity($this, $data);
    }


    private $_payment_initiation = null;

    // Canonical facade: $client->PaymentInitiation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment_initiation()
    // resolves here too.
    public function PaymentInitiation($data = null)
    {
        require_once __DIR__ . '/entity/payment_initiation_entity.php';
        if ($data === null) {
            if ($this->_payment_initiation === null) {
                $this->_payment_initiation = new PaymentInitiationEntity($this, null);
            }
            return $this->_payment_initiation;
        }
        return new PaymentInitiationEntity($this, $data);
    }


    private $_payment_instrument = null;

    // Canonical facade: $client->PaymentInstrument()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment_instrument()
    // resolves here too.
    public function PaymentInstrument($data = null)
    {
        require_once __DIR__ . '/entity/payment_instrument_entity.php';
        if ($data === null) {
            if ($this->_payment_instrument === null) {
                $this->_payment_instrument = new PaymentInstrumentEntity($this, null);
            }
            return $this->_payment_instrument;
        }
        return new PaymentInstrumentEntity($this, $data);
    }


    private $_payment_intent = null;

    // Canonical facade: $client->PaymentIntent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment_intent()
    // resolves here too.
    public function PaymentIntent($data = null)
    {
        require_once __DIR__ . '/entity/payment_intent_entity.php';
        if ($data === null) {
            if ($this->_payment_intent === null) {
                $this->_payment_intent = new PaymentIntentEntity($this, null);
            }
            return $this->_payment_intent;
        }
        return new PaymentIntentEntity($this, $data);
    }


    private $_phone_number = null;

    // Canonical facade: $client->PhoneNumber()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->phone_number()
    // resolves here too.
    public function PhoneNumber($data = null)
    {
        require_once __DIR__ . '/entity/phone_number_entity.php';
        if ($data === null) {
            if ($this->_phone_number === null) {
                $this->_phone_number = new PhoneNumberEntity($this, null);
            }
            return $this->_phone_number;
        }
        return new PhoneNumberEntity($this, $data);
    }


    private $_production = null;

    // Canonical facade: $client->Production()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->production()
    // resolves here too.
    public function Production($data = null)
    {
        require_once __DIR__ . '/entity/production_entity.php';
        if ($data === null) {
            if ($this->_production === null) {
                $this->_production = new ProductionEntity($this, null);
            }
            return $this->_production;
        }
        return new ProductionEntity($this, $data);
    }


    private $_profile = null;

    // Canonical facade: $client->Profile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->profile()
    // resolves here too.
    public function Profile($data = null)
    {
        require_once __DIR__ . '/entity/profile_entity.php';
        if ($data === null) {
            if ($this->_profile === null) {
                $this->_profile = new ProfileEntity($this, null);
            }
            return $this->_profile;
        }
        return new ProfileEntity($this, $data);
    }


    private $_quote = null;

    // Canonical facade: $client->Quote()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->quote()
    // resolves here too.
    public function Quote($data = null)
    {
        require_once __DIR__ . '/entity/quote_entity.php';
        if ($data === null) {
            if ($this->_quote === null) {
                $this->_quote = new QuoteEntity($this, null);
            }
            return $this->_quote;
        }
        return new QuoteEntity($this, $data);
    }


    private $_rate = null;

    // Canonical facade: $client->Rate()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->rate()
    // resolves here too.
    public function Rate($data = null)
    {
        require_once __DIR__ . '/entity/rate_entity.php';
        if ($data === null) {
            if ($this->_rate === null) {
                $this->_rate = new RateEntity($this, null);
            }
            return $this->_rate;
        }
        return new RateEntity($this, $data);
    }


    private $_recipient = null;

    // Canonical facade: $client->Recipient()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recipient()
    // resolves here too.
    public function Recipient($data = null)
    {
        require_once __DIR__ . '/entity/recipient_entity.php';
        if ($data === null) {
            if ($this->_recipient === null) {
                $this->_recipient = new RecipientEntity($this, null);
            }
            return $this->_recipient;
        }
        return new RecipientEntity($this, $data);
    }


    private $_rule = null;

    // Canonical facade: $client->Rule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->rule()
    // resolves here too.
    public function Rule($data = null)
    {
        require_once __DIR__ . '/entity/rule_entity.php';
        if ($data === null) {
            if ($this->_rule === null) {
                $this->_rule = new RuleEntity($this, null);
            }
            return $this->_rule;
        }
        return new RuleEntity($this, $data);
    }


    private $_saml = null;

    // Canonical facade: $client->Saml()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->saml()
    // resolves here too.
    public function Saml($data = null)
    {
        require_once __DIR__ . '/entity/saml_entity.php';
        if ($data === null) {
            if ($this->_saml === null) {
                $this->_saml = new SamlEntity($this, null);
            }
            return $this->_saml;
        }
        return new SamlEntity($this, $data);
    }


    private $_sca_device_fingerprint = null;

    // Canonical facade: $client->ScaDeviceFingerprint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sca_device_fingerprint()
    // resolves here too.
    public function ScaDeviceFingerprint($data = null)
    {
        require_once __DIR__ . '/entity/sca_device_fingerprint_entity.php';
        if ($data === null) {
            if ($this->_sca_device_fingerprint === null) {
                $this->_sca_device_fingerprint = new ScaDeviceFingerprintEntity($this, null);
            }
            return $this->_sca_device_fingerprint;
        }
        return new ScaDeviceFingerprintEntity($this, $data);
    }


    private $_sca_facemap = null;

    // Canonical facade: $client->ScaFacemap()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sca_facemap()
    // resolves here too.
    public function ScaFacemap($data = null)
    {
        require_once __DIR__ . '/entity/sca_facemap_entity.php';
        if ($data === null) {
            if ($this->_sca_facemap === null) {
                $this->_sca_facemap = new ScaFacemapEntity($this, null);
            }
            return $this->_sca_facemap;
        }
        return new ScaFacemapEntity($this, $data);
    }


    private $_sca_otp = null;

    // Canonical facade: $client->ScaOtp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sca_otp()
    // resolves here too.
    public function ScaOtp($data = null)
    {
        require_once __DIR__ . '/entity/sca_otp_entity.php';
        if ($data === null) {
            if ($this->_sca_otp === null) {
                $this->_sca_otp = new ScaOtpEntity($this, null);
            }
            return $this->_sca_otp;
        }
        return new ScaOtpEntity($this, $data);
    }


    private $_sca_session = null;

    // Canonical facade: $client->ScaSession()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sca_session()
    // resolves here too.
    public function ScaSession($data = null)
    {
        require_once __DIR__ . '/entity/sca_session_entity.php';
        if ($data === null) {
            if ($this->_sca_session === null) {
                $this->_sca_session = new ScaSessionEntity($this, null);
            }
            return $this->_sca_session;
        }
        return new ScaSessionEntity($this, $data);
    }


    private $_settlement_allocation = null;

    // Canonical facade: $client->SettlementAllocation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->settlement_allocation()
    // resolves here too.
    public function SettlementAllocation($data = null)
    {
        require_once __DIR__ . '/entity/settlement_allocation_entity.php';
        if ($data === null) {
            if ($this->_settlement_allocation === null) {
                $this->_settlement_allocation = new SettlementAllocationEntity($this, null);
            }
            return $this->_settlement_allocation;
        }
        return new SettlementAllocationEntity($this, $data);
    }


    private $_simulation = null;

    // Canonical facade: $client->Simulation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->simulation()
    // resolves here too.
    public function Simulation($data = null)
    {
        require_once __DIR__ . '/entity/simulation_entity.php';
        if ($data === null) {
            if ($this->_simulation === null) {
                $this->_simulation = new SimulationEntity($this, null);
            }
            return $this->_simulation;
        }
        return new SimulationEntity($this, $data);
    }


    private $_spend_control = null;

    // Canonical facade: $client->SpendControl()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spend_control()
    // resolves here too.
    public function SpendControl($data = null)
    {
        require_once __DIR__ . '/entity/spend_control_entity.php';
        if ($data === null) {
            if ($this->_spend_control === null) {
                $this->_spend_control = new SpendControlEntity($this, null);
            }
            return $this->_spend_control;
        }
        return new SpendControlEntity($this, $data);
    }


    private $_spend_limit = null;

    // Canonical facade: $client->SpendLimit()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spend_limit()
    // resolves here too.
    public function SpendLimit($data = null)
    {
        require_once __DIR__ . '/entity/spend_limit_entity.php';
        if ($data === null) {
            if ($this->_spend_limit === null) {
                $this->_spend_limit = new SpendLimitEntity($this, null);
            }
            return $this->_spend_limit;
        }
        return new SpendLimitEntity($this, $data);
    }


    private $_subscription = null;

    // Canonical facade: $client->Subscription()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->subscription()
    // resolves here too.
    public function Subscription($data = null)
    {
        require_once __DIR__ . '/entity/subscription_entity.php';
        if ($data === null) {
            if ($this->_subscription === null) {
                $this->_subscription = new SubscriptionEntity($this, null);
            }
            return $this->_subscription;
        }
        return new SubscriptionEntity($this, $data);
    }


    private $_test_notification = null;

    // Canonical facade: $client->TestNotification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->test_notification()
    // resolves here too.
    public function TestNotification($data = null)
    {
        require_once __DIR__ . '/entity/test_notification_entity.php';
        if ($data === null) {
            if ($this->_test_notification === null) {
                $this->_test_notification = new TestNotificationEntity($this, null);
            }
            return $this->_test_notification;
        }
        return new TestNotificationEntity($this, $data);
    }


    private $_third_party_transfer = null;

    // Canonical facade: $client->ThirdPartyTransfer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->third_party_transfer()
    // resolves here too.
    public function ThirdPartyTransfer($data = null)
    {
        require_once __DIR__ . '/entity/third_party_transfer_entity.php';
        if ($data === null) {
            if ($this->_third_party_transfer === null) {
                $this->_third_party_transfer = new ThirdPartyTransferEntity($this, null);
            }
            return $this->_third_party_transfer;
        }
        return new ThirdPartyTransferEntity($this, $data);
    }


    private $_three_d_secure = null;

    // Canonical facade: $client->ThreeDSecure()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->three_d_secure()
    // resolves here too.
    public function ThreeDSecure($data = null)
    {
        require_once __DIR__ . '/entity/three_d_secure_entity.php';
        if ($data === null) {
            if ($this->_three_d_secure === null) {
                $this->_three_d_secure = new ThreeDSecureEntity($this, null);
            }
            return $this->_three_d_secure;
        }
        return new ThreeDSecureEntity($this, $data);
    }


    private $_token = null;

    // Canonical facade: $client->Token()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->token()
    // resolves here too.
    public function Token($data = null)
    {
        require_once __DIR__ . '/entity/token_entity.php';
        if ($data === null) {
            if ($this->_token === null) {
                $this->_token = new TokenEntity($this, null);
            }
            return $this->_token;
        }
        return new TokenEntity($this, $data);
    }


    private $_transfer = null;

    // Canonical facade: $client->Transfer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->transfer()
    // resolves here too.
    public function Transfer($data = null)
    {
        require_once __DIR__ . '/entity/transfer_entity.php';
        if ($data === null) {
            if ($this->_transfer === null) {
                $this->_transfer = new TransferEntity($this, null);
            }
            return $this->_transfer;
        }
        return new TransferEntity($this, $data);
    }


    private $_transfer_requirement = null;

    // Canonical facade: $client->TransferRequirement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->transfer_requirement()
    // resolves here too.
    public function TransferRequirement($data = null)
    {
        require_once __DIR__ . '/entity/transfer_requirement_entity.php';
        if ($data === null) {
            if ($this->_transfer_requirement === null) {
                $this->_transfer_requirement = new TransferRequirementEntity($this, null);
            }
            return $this->_transfer_requirement;
        }
        return new TransferRequirementEntity($this, $data);
    }


    private $_ubo = null;

    // Canonical facade: $client->Ubo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ubo()
    // resolves here too.
    public function Ubo($data = null)
    {
        require_once __DIR__ . '/entity/ubo_entity.php';
        if ($data === null) {
            if ($this->_ubo === null) {
                $this->_ubo = new UboEntity($this, null);
            }
            return $this->_ubo;
        }
        return new UboEntity($this, $data);
    }


    private $_user = null;

    // Canonical facade: $client->User()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user()
    // resolves here too.
    public function User($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }


    private $_verification = null;

    // Canonical facade: $client->Verification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->verification()
    // resolves here too.
    public function Verification($data = null)
    {
        require_once __DIR__ . '/entity/verification_entity.php';
        if ($data === null) {
            if ($this->_verification === null) {
                $this->_verification = new VerificationEntity($this, null);
            }
            return $this->_verification;
        }
        return new VerificationEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new WiseSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
