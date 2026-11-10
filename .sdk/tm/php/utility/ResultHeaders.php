<?php
declare(strict_types=1);

// Wise SDK utility: result_headers

class WiseResultHeaders
{
    public static function call(WiseContext $ctx): ?WiseResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
