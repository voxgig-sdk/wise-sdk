<?php
declare(strict_types=1);

// Wise SDK exists test

require_once __DIR__ . '/../wise_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = WiseSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
