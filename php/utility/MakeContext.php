<?php
declare(strict_types=1);

// Wise SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WiseMakeContext
{
    public static function call(array $ctxmap, ?WiseContext $basectx): WiseContext
    {
        return new WiseContext($ctxmap, $basectx);
    }
}
