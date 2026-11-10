<?php
declare(strict_types=1);

// Wise SDK base feature

class WiseBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WiseContext $ctx, array $options): void {}
    public function PostConstruct(WiseContext $ctx): void {}
    public function PostConstructEntity(WiseContext $ctx): void {}
    public function SetData(WiseContext $ctx): void {}
    public function GetData(WiseContext $ctx): void {}
    public function GetMatch(WiseContext $ctx): void {}
    public function SetMatch(WiseContext $ctx): void {}
    public function PrePoint(WiseContext $ctx): void {}
    public function PreSpec(WiseContext $ctx): void {}
    public function PreRequest(WiseContext $ctx): void {}
    public function PreResponse(WiseContext $ctx): void {}
    public function PreResult(WiseContext $ctx): void {}
    public function PreDone(WiseContext $ctx): void {}
    public function PreUnexpected(WiseContext $ctx): void {}
}
