# API Definition

`wise-openapi.json` is Wise's published OpenAPI definition for the Wise Platform API, vendored
byte for byte.

| | |
|---|---|
| Source | https://docs.wise.com/_bundle/api-reference/@latest/index.json?download (the "Download OpenAPI description" link of the API reference at https://docs.wise.com) |
| Fetched | 2026-11-10T15:19:35Z |
| Size | 2236796 bytes |
| sha256 | `26a173d3f063345da6b927b95a3f6f2f9fbbe2f3a93e362ee884f713d4e0594a` |
| Version | `info.version` 2026Q4, OpenAPI 3.1.0 — 188 paths, 229 operations, 316 schemas, 31 webhooks, 56 tags |
| Terms | The definition declares no `license` and no `termsOfService`. |

`@latest` moves to the next quarterly version (`2026Q4`, then `2027Q1`), so record the version
with every fetch.

The base URL is the definition's own `servers[0]`, `https://api.wise.com/2026Q4` (Production).
Its `servers[1]` is the Sandbox, `https://api.wise-sandbox.com/2026Q4`.
