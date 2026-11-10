"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "account_detail",
        "accessor": "AccountDetail",
        "op": "load",
        "method": "GET",
        "path": "/balances/account-details/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 32345678,
            "profileId": 87654321,
            "state": "ACTIVE",
            "accountHolderName": "Sarah Jenkins",
            "country": "BE",
            "accountIdentification": {
                "beAccountIdentification": {
                    "bic": "TRWIBEB1",
                    "iban": "BE71096123456769",
                    "institutionName": "Wise",
                    "institutionAddress": {
                        "streetName": "Avenue Louise",
                        "buildingNumber": "54",
                        "townName": "Brussels",
                        "postCode": "1050",
                        "country": "BE",
                        "addressLines": []
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "account_requirement",
        "accessor": "AccountRequirement",
        "op": "create",
        "method": "POST",
        "path": "/quotes/{quoteId}/account-requirements",
        "args": [
            {
                "name": "quote_id",
                "wire": "quoteId",
                "value": "p1"
            }
        ],
        "select": {
            "originator_legal_entity_type": "v1"
        },
        "headers": [
            {
                "name": "accept_minor_version",
                "wire": "Accept-Minor-Version",
                "value": "h1"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "originatorLegalEntityType"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "south_korean_paygate",
                "title": "PayGate",
                "usageInfo": null,
                "fields": [
                    {
                        "name": "E-mail",
                        "group": [
                            {
                                "key": "email",
                                "name": "E-mail",
                                "type": "text",
                                "refreshRequirementsOnChange": false,
                                "required": true,
                                "displayFormat": null,
                                "example": "example@example.ex",
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": "^[^\\s]+@[^\\s]+\\.[^\\s]{2,}$",
                                "validationAsync": null,
                                "valuesAllowed": null
                            }
                        ]
                    },
                    {
                        "name": "Recipient type",
                        "group": [
                            {
                                "key": "legalType",
                                "name": "Recipient type",
                                "type": "select",
                                "refreshRequirementsOnChange": false,
                                "required": true,
                                "displayFormat": null,
                                "example": "",
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "PRIVATE",
                                        "name": "Person"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Full Name",
                        "group": [
                            {
                                "key": "accountHolderName",
                                "name": "Full Name",
                                "type": "text",
                                "refreshRequirementsOnChange": false,
                                "required": true,
                                "displayFormat": null,
                                "example": "",
                                "minLength": 2,
                                "maxLength": 140,
                                "validationRegexp": "^[0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,.%#^@{}~<>+$\"\\[\\]\\\\ ]+$",
                                "validationAsync": null,
                                "valuesAllowed": null
                            }
                        ]
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "account_requirement",
        "accessor": "AccountRequirement",
        "op": "list",
        "method": "GET",
        "path": "/quotes/{quoteId}/account-requirements",
        "args": [
            {
                "name": "quote_id",
                "wire": "quoteId",
                "value": "p1"
            }
        ],
        "select": {
            "address_required": "v1",
            "originator_legal_entity_type": "v1"
        },
        "headers": [
            {
                "name": "accept_minor_version",
                "wire": "Accept-Minor-Version",
                "value": "h1"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "originatorLegalEntityType",
            "addressRequired"
        ],
        "queryArgs": [
            {
                "name": "address_required",
                "wire": "addressRequired"
            },
            {
                "name": "originator_legal_entity_type",
                "wire": "originatorLegalEntityType"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "south_korean_paygate",
                "title": "PayGate",
                "usageInfo": null,
                "fields": [
                    {
                        "name": "E-mail",
                        "group": [
                            {
                                "key": "email",
                                "name": "E-mail",
                                "type": "text",
                                "refreshRequirementsOnChange": false,
                                "required": true,
                                "displayFormat": null,
                                "example": "example@example.ex",
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": "^[^\\s]+@[^\\s]+\\.[^\\s]{2,}$",
                                "validationAsync": null,
                                "valuesAllowed": null
                            }
                        ]
                    },
                    {
                        "name": "Recipient type",
                        "group": [
                            {
                                "key": "legalType",
                                "name": "Recipient type",
                                "type": "select",
                                "refreshRequirementsOnChange": false,
                                "required": true,
                                "displayFormat": null,
                                "example": "",
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "PRIVATE",
                                        "name": "Person"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Full Name",
                        "group": [
                            {
                                "key": "accountHolderName",
                                "name": "Full Name",
                                "type": "text",
                                "refreshRequirementsOnChange": false,
                                "required": true,
                                "displayFormat": null,
                                "example": "",
                                "minLength": 2,
                                "maxLength": 140,
                                "validationRegexp": "^[0-9A-Za-zÀ-ÖØ-öø-ÿ-_()'*,.%#^@{}~<>+$\"\\[\\]\\\\ ]+$",
                                "validationAsync": null,
                                "valuesAllowed": null
                            }
                        ]
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "activity",
        "accessor": "Activity",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/activities",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "monetary_resource_type": "TRANSFER",
            "next_cursor": "",
            "since": "2025-03-10T11:56:30.376Z",
            "size": 10,
            "status": "IN_PROGRESS",
            "until": "2025-03-30T23:59:59.999Z"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "monetaryResourceType",
            "status",
            "since",
            "until",
            "nextCursor",
            "size"
        ],
        "queryArgs": [
            {
                "name": "monetary_resource_type",
                "wire": "monetaryResourceType"
            },
            {
                "name": "next_cursor",
                "wire": "nextCursor"
            },
            {
                "name": "since",
                "wire": "since"
            },
            {
                "name": "size",
                "wire": "size"
            },
            {
                "name": "status",
                "wire": "status"
            },
            {
                "name": "until",
                "wire": "until"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "cursor": "WyJQUklPUklUWSIsMTAwMDAxNjY5NzA4MjI0MDAwMDE2MDk5OV0=",
            "activities": [
                {
                    "id": "TU9ORVRBUllfQUNUSVZJVFk6OjE0NTU4OTk4OjpDQVJEX1RSQU5TQUNUSU9OOjozNDMwNDk=",
                    "type": "CARD_PAYMENT",
                    "resource": {
                        "type": "CARD_TRANSACTION",
                        "id": "343049"
                    },
                    "title": "<strong>Test Payment</strong>",
                    "description": "",
                    "primaryAmount": "150 JPY",
                    "secondaryAmount": "1.50 SGD",
                    "status": "COMPLETED",
                    "createdOn": "2023-01-01T00:00:00.000Z",
                    "updatedOn": "2023-01-01T00:00:00.000Z"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "create",
        "method": "POST",
        "path": "/addresses",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 10000001,
            "profile": 12345678,
            "details": {
                "country": "US",
                "state": "AZ",
                "city": "Phoenix",
                "postCode": "10025",
                "firstLine": "50 Sunflower Ave",
                "occupations": [
                    {
                        "code": "Software Engineer",
                        "format": "FREE_FORM"
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "list",
        "method": "GET",
        "path": "/addresses",
        "args": [],
        "select": {
            "profile": 12345678
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "profile"
        ],
        "queryArgs": [
            {
                "name": "profile",
                "wire": "profile"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 10000001,
                "profile": 12345678,
                "details": {
                    "country": "US",
                    "state": "AZ",
                    "city": "Phoenix",
                    "postCode": "10025",
                    "firstLine": "50 Sunflower Ave",
                    "occupations": [
                        {
                            "code": "Software Engineer",
                            "format": "FREE_FORM"
                        }
                    ]
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "load",
        "method": "GET",
        "path": "/addresses/{addressId}",
        "args": [
            {
                "name": "id",
                "wire": "addressId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 10000001,
            "profile": 12345678,
            "details": {
                "country": "US",
                "state": "AZ",
                "city": "Phoenix",
                "postCode": "10025",
                "firstLine": "50 Sunflower Ave",
                "occupations": [
                    {
                        "code": "Software Engineer",
                        "format": "FREE_FORM"
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "address_requirement",
        "accessor": "AddressRequirement",
        "op": "create",
        "method": "POST",
        "path": "/address-requirements",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "address",
                "fields": [
                    {
                        "name": "Country",
                        "group": [
                            {
                                "key": "country",
                                "type": "select",
                                "refreshRequirementsOnChange": true,
                                "required": true,
                                "displayFormat": null,
                                "example": "Germany",
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "US",
                                        "name": "United States"
                                    },
                                    {
                                        "key": "GB",
                                        "name": "United Kingdom"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "address_requirement",
        "accessor": "AddressRequirement",
        "op": "list",
        "method": "GET",
        "path": "/address-requirements",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "address",
                "fields": [
                    {
                        "name": "Country",
                        "group": [
                            {
                                "key": "country",
                                "type": "select",
                                "refreshRequirementsOnChange": true,
                                "required": true,
                                "displayFormat": null,
                                "example": "Germany",
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "US",
                                        "name": "United States"
                                    },
                                    {
                                        "key": "GB",
                                        "name": "United Kingdom"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "balance",
        "accessor": "Balance",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}",
        "args": [
            {
                "name": "hold_limit_breach_id",
                "wire": "holdLimitBreachId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "balance",
        "accessor": "Balance",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/balances",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "type": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "types"
        ],
        "queryArgs": [
            {
                "name": "type",
                "wire": "types"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 200001,
                "currency": "EUR",
                "type": "STANDARD",
                "name": null,
                "icon": null,
                "investmentState": "NOT_INVESTED",
                "amount": {
                    "value": 310.86,
                    "currency": "EUR"
                },
                "reservedAmount": {
                    "value": 0,
                    "currency": "EUR"
                },
                "cashAmount": {
                    "value": 310.86,
                    "currency": "EUR"
                },
                "totalWorth": {
                    "value": 310.86,
                    "currency": "EUR"
                },
                "creationTime": "2020-05-20T14:43:16.658Z",
                "modificationTime": "2020-05-20T14:43:16.658Z",
                "visible": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "balance",
        "accessor": "Balance",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/total-funds/{currency}",
        "args": [
            {
                "name": "currency",
                "wire": "currency",
                "value": "EUR"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "totalWorth": {
                "value": 2000,
                "currency": "EUR"
            },
            "totalAvailable": {
                "value": 2500,
                "currency": "EUR"
            },
            "totalCash": {
                "value": 2000,
                "currency": "EUR"
            },
            "overdraft": {
                "limit": {
                    "value": 500,
                    "currency": "EUR"
                },
                "used": {
                    "value": 0,
                    "currency": "EUR"
                },
                "available": {
                    "value": 500,
                    "currency": "EUR"
                },
                "availableByCurrency": [
                    {
                        "value": 500,
                        "currency": "EUR"
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "balance",
        "accessor": "Balance",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/balances/{balanceId}",
        "args": [
            {
                "name": "id",
                "wire": "balanceId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 200001,
            "currency": "EUR",
            "type": "STANDARD",
            "name": null,
            "icon": null,
            "investmentState": "NOT_INVESTED",
            "amount": {
                "value": 310.86,
                "currency": "EUR"
            },
            "reservedAmount": {
                "value": 0,
                "currency": "EUR"
            },
            "cashAmount": {
                "value": 310.86,
                "currency": "EUR"
            },
            "totalWorth": {
                "value": 310.86,
                "currency": "EUR"
            },
            "creationTime": "2020-05-20T14:43:16.658Z",
            "modificationTime": "2020-05-20T14:43:16.658Z",
            "visible": true
        },
        "idField": "id"
    },
    {
        "entity": "balance",
        "accessor": "Balance",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/balances/{balanceId}",
        "args": [
            {
                "name": "id",
                "wire": "balanceId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "balance_statement",
        "accessor": "BalanceStatement",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/balance-statements/{balanceId}/statement.json",
        "args": [
            {
                "name": "id",
                "wire": "balanceId",
                "value": 64
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345
            }
        ],
        "select": {
            "currency": "EUR",
            "interval_end": "v1",
            "interval_start": "v1",
            "statement_locale": "en",
            "type": "COMPACT"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "currency",
            "intervalStart",
            "intervalEnd",
            "type",
            "statementLocale"
        ],
        "queryArgs": [
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "interval_end",
                "wire": "intervalEnd"
            },
            {
                "name": "interval_start",
                "wire": "intervalStart"
            },
            {
                "name": "statement_locale",
                "wire": "statementLocale"
            },
            {
                "name": "type",
                "wire": "type"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "accountHolder": {
                "type": "PERSONAL",
                "address": {
                    "addressFirstLine": "Veerenni 24",
                    "city": "Tallinn",
                    "postCode": "12112",
                    "stateCode": "",
                    "countryName": "Estonia"
                },
                "firstName": "Oliver",
                "lastName": "Wilson"
            },
            "issuer": {
                "name": "TransferWise Ltd.",
                "firstLine": "56 Shoreditch High Street",
                "city": "London",
                "postCode": "E1 6JJ",
                "stateCode": "",
                "country": "United Kingdom"
            },
            "bankDetails": {},
            "transactions": [
                {
                    "type": "DEBIT",
                    "date": "2018-04-30T08:47:05.832Z",
                    "amount": {
                        "value": -7.76,
                        "currency": "EUR"
                    },
                    "totalFees": {
                        "value": 0.04,
                        "currency": "EUR"
                    },
                    "details": {
                        "type": "CARD",
                        "description": "Card transaction of 6.80 GBP issued by Tfl.gov.uk/cp TFL TRAVEL CH",
                        "amount": {
                            "value": 6.8,
                            "currency": "GBP"
                        },
                        "senderName": "HEIN LAURI",
                        "senderAccount": "EE76 1700 0170 0049 6704",
                        "paymentReference": "SVWZ+topup card",
                        "category": "Transportation Suburban and Loca",
                        "merchant": {
                            "name": "Tfl.gov.uk/cp",
                            "firstLine": "x",
                            "postCode": "SW1H 0TL",
                            "city": "TFL TRAVEL CH",
                            "state": "",
                            "country": "GB",
                            "category": "Transportation Suburban and Loca"
                        },
                        "sourceAmount": {
                            "value": 8.69,
                            "currency": "GBP"
                        },
                        "targetAmount": {
                            "value": 9.94,
                            "currency": "EUR"
                        },
                        "fee": {
                            "value": 0.03,
                            "currency": "GBP"
                        },
                        "rate": 1.147806
                    },
                    "exchangeDetails": {
                        "forAmount": {
                            "value": 6.8,
                            "currency": "GBP"
                        },
                        "rate": 1
                    },
                    "runningBalance": {
                        "value": 16.01,
                        "currency": "EUR"
                    },
                    "referenceNumber": "CARD-249281"
                }
            ],
            "endOfStatementBalance": {
                "value": 9.94,
                "currency": "EUR"
            },
            "query": {
                "intervalStart": "2018-03-01T00:00:00Z",
                "intervalEnd": "2018-04-30T23:59:59.999Z",
                "currency": "EUR",
                "accountId": 64
            }
        },
        "idField": "id"
    },
    {
        "entity": "bank_account_detail",
        "accessor": "BankAccountDetail",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/account-details/payments/{paymentId}/returns",
        "args": [
            {
                "name": "payment_id",
                "wire": "paymentId",
                "value": 987654321
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "4cc39f2b-3513-453d-8792-9ccc22e513c3"
        },
        "idField": "id"
    },
    {
        "entity": "bank_account_detail",
        "accessor": "BankAccountDetail",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/account-details-orders",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {
            "currency": "GBP"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "currency"
        ],
        "queryArgs": [
            {
                "name": "currency",
                "wire": "currency"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "status": "DONE",
                "currency": "EUR",
                "balanceId": 200001,
                "requirements": [
                    {
                        "type": "TOP_UP",
                        "status": "DONE"
                    }
                ],
                "accountDetailsId": 123456789,
                "modificationTime": "2026-01-01T12:30:00Z",
                "creationTime": "2026-01-01T12:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "batch_group",
        "accessor": "BatchGroup",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/batch-payments/{batchGroupId}/payments",
        "args": [
            {
                "name": "batch_payment_id",
                "wire": "batchGroupId",
                "value": "54a6bc09-cef9-49a8-9041-f1f0c654cd88"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "name": "My batch group",
            "fileName": null,
            "alreadyPaid": true,
            "shortId": 12345,
            "userId": 33333333,
            "profileId": 44444444,
            "sourceCurrency": "GBP",
            "status": "COMPLETED",
            "groupType": "API",
            "transferIds": [
                100001,
                100002,
                100003
            ]
        },
        "idField": "id"
    },
    {
        "entity": "batch_group",
        "accessor": "BatchGroup",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/batch-groups/{batchGroupId}/transfers",
        "action": "transfer",
        "args": [
            {
                "name": "id",
                "wire": "batchGroupId",
                "value": "54a6bc09-cef9-49a8-9041-f1f0c654cd88"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "batch_group",
        "accessor": "BatchGroup",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/batch-groups",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "version": 0,
            "name": "My batch group",
            "sourceCurrency": "GBP",
            "status": "NEW",
            "transferIds": [],
            "payInDetails": [],
            "payinSessionId": null
        },
        "idField": "id"
    },
    {
        "entity": "batch_group",
        "accessor": "BatchGroup",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/batch-groups/{batchGroupId}",
        "args": [
            {
                "name": "id",
                "wire": "batchGroupId",
                "value": "54a6bc09-cef9-49a8-9041-f1f0c654cd88"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "version": 123,
            "name": "My batch group",
            "sourceCurrency": "GBP",
            "status": "COMPLETED",
            "transferIds": [
                234,
                456
            ],
            "payInDetails": [
                {
                    "type": "bank_transfer",
                    "reference": "B5323",
                    "amount": 12504.54,
                    "currency": "NOK",
                    "name": "TransferWise Ltd",
                    "branchName": null,
                    "accountNumber": "9910728",
                    "accountType": null,
                    "bankCode": "8301",
                    "bankAddress": {
                        "name": "CitiBank Europe Plc",
                        "firstLine": "Bolette brygge 1",
                        "postCode": "0252",
                        "city": "Oslo",
                        "stateCode": null,
                        "country": "Norway"
                    },
                    "transferWiseAddress": {
                        "name": "TransferWise Ltd",
                        "firstLine": "6th Floor, The Tea Building, 56 Shoreditch High Street",
                        "postCode": "E1 6JJ",
                        "city": "London",
                        "stateCode": null,
                        "country": "United Kingdom"
                    },
                    "iban": null,
                    "bban": "83019910728",
                    "institutionNumber": null,
                    "transitNumber": null,
                    "beneficiaryBankBIC": null,
                    "intermediaryBankBIC": null,
                    "fpsIdentifier": null,
                    "clearingNumber": null
                }
            ],
            "payinSessionId": "23330542-8e9e-419f-95eb-312b880f92ad"
        },
        "idField": "id"
    },
    {
        "entity": "batch_group",
        "accessor": "BatchGroup",
        "op": "update",
        "method": "PATCH",
        "path": "/profiles/{profileId}/batch-groups/{batchGroupId}",
        "args": [
            {
                "name": "id",
                "wire": "batchGroupId",
                "value": "54a6bc09-cef9-49a8-9041-f1f0c654cd88"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "version": 123,
            "name": "My batch group",
            "sourceCurrency": "GBP",
            "status": "COMPLETED",
            "transferIds": [
                234,
                456
            ],
            "payInDetails": [
                {
                    "type": "bank_transfer",
                    "reference": "B5323",
                    "amount": 12504.54,
                    "currency": "NOK",
                    "name": "TransferWise Ltd",
                    "branchName": null,
                    "accountNumber": "9910728",
                    "accountType": null,
                    "bankCode": "8301",
                    "bankAddress": {
                        "name": "CitiBank Europe Plc",
                        "firstLine": "Bolette brygge 1",
                        "postCode": "0252",
                        "city": "Oslo",
                        "stateCode": null,
                        "country": "Norway"
                    },
                    "transferWiseAddress": {
                        "name": "TransferWise Ltd",
                        "firstLine": "6th Floor, The Tea Building, 56 Shoreditch High Street",
                        "postCode": "E1 6JJ",
                        "city": "London",
                        "stateCode": null,
                        "country": "United Kingdom"
                    },
                    "iban": null,
                    "bban": "83019910728",
                    "institutionNumber": null,
                    "transitNumber": null,
                    "beneficiaryBankBIC": null,
                    "intermediaryBankBIC": null,
                    "fpsIdentifier": null,
                    "clearingNumber": null
                }
            ],
            "payinSessionId": "23330542-8e9e-419f-95eb-312b880f92ad"
        },
        "idField": "id"
    },
    {
        "entity": "bulk_settlement",
        "accessor": "BulkSettlement",
        "op": "create",
        "method": "POST",
        "path": "/settlements",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "business_profile",
        "accessor": "BusinessProfile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/business-profile",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "xidempotence_uuid",
                "wire": "X-idempotence-uuid",
                "value": "h2"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "type": "BUSINESS",
            "id": 14599371,
            "publicId": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
            "userId": 9889627,
            "address": {
                "id": 36086782,
                "addressFirstLine": "24 Willow Creek Lane",
                "city": "Bristol",
                "countryIso2Code": "GB",
                "countryIso3Code": "gbr",
                "postCode": "BS1 6AE",
                "stateCode": null
            },
            "email": "info@innovate-solutions.co.uk",
            "createdAt": "2024-03-10T09:00:00",
            "updatedAt": "2025-06-18T14:22:00",
            "currentState": "VISIBLE",
            "contactDetails": {
                "email": "contact@innovate-solutions.co.uk",
                "phoneNumber": "+441617891234"
            },
            "businessName": "Innovate Solutions Ltd",
            "registrationNumber": "SC1234567890ABCD",
            "descriptionOfBusiness": "IT_DEVELOPMENT",
            "webpage": "https://www.innovate-solutions.co.uk",
            "companyType": "LIMITED_COMPANY",
            "companyRole": "OWNER",
            "businessFreeFormDescription": "We create cutting-edge software for businesses.",
            "firstLevelCategory": "CONSULTING_IT_BUSINESS_SERVICES",
            "secondLevelCategory": "IT_DEVELOPMENT",
            "industryCategories": [
                "SOFTWARE_DEVELOPMENT_PUBLISHING",
                "IT_CONSULTANCY_TECHNICAL_SUPPORT_SERVICES"
            ],
            "operationalAddresses": [
                {
                    "id": 36086782,
                    "addressFirstLine": "24 Willow Creek Lane",
                    "city": "Bristol",
                    "countryIso2Code": "GB",
                    "countryIso3Code": "gbr",
                    "postCode": "BS1 6AE",
                    "stateCode": null
                }
            ],
            "fullName": "Innovate Solutions Ltd"
        },
        "idField": "id"
    },
    {
        "entity": "business_profile",
        "accessor": "BusinessProfile",
        "op": "update",
        "method": "PUT",
        "path": "/profiles/{profileId}/business-profile",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "type": "BUSINESS",
            "id": 14599371,
            "publicId": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
            "userId": 9889627,
            "address": {
                "id": 36086782,
                "addressFirstLine": "24 Willow Creek Lane",
                "city": "Bristol",
                "countryIso2Code": "GB",
                "countryIso3Code": "gbr",
                "postCode": "BS1 6AE",
                "stateCode": null
            },
            "email": "info@innovate-solutions.co.uk",
            "createdAt": "2024-03-10T09:00:00",
            "updatedAt": "2025-06-18T14:22:00",
            "currentState": "VISIBLE",
            "contactDetails": {
                "email": "contact@innovate-solutions.co.uk",
                "phoneNumber": "+441617891234"
            },
            "businessName": "Innovate Solutions Ltd",
            "registrationNumber": "SC1234567890ABCD",
            "descriptionOfBusiness": "IT_DEVELOPMENT",
            "webpage": "https://www.innovate-solutions.co.uk",
            "companyType": "LIMITED_COMPANY",
            "companyRole": "OWNER",
            "businessFreeFormDescription": "We create cutting-edge software for businesses.",
            "firstLevelCategory": "CONSULTING_IT_BUSINESS_SERVICES",
            "secondLevelCategory": "IT_DEVELOPMENT",
            "industryCategories": [
                "SOFTWARE_DEVELOPMENT_PUBLISHING",
                "IT_CONSULTANCY_TECHNICAL_SUPPORT_SERVICES"
            ],
            "operationalAddresses": [
                {
                    "id": 36086782,
                    "addressFirstLine": "24 Willow Creek Lane",
                    "city": "Bristol",
                    "countryIso2Code": "GB",
                    "countryIso3Code": "gbr",
                    "postCode": "BS1 6AE",
                    "stateCode": null
                }
            ],
            "fullName": "Innovate Solutions Ltd"
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count",
        "action": "reset_pin_count",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/spending-permissions",
        "action": "spending_permission",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "permissions": [
                {
                    "type": "ECOM",
                    "isEnabled": false,
                    "isLocked": false
                },
                {
                    "type": "POS_CHIP",
                    "isEnabled": true,
                    "isLocked": false
                },
                {
                    "type": "ATM_WITHDRAWAL",
                    "isEnabled": false,
                    "isLocked": false
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {
            "page_number": 1,
            "page_size": 10
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "pageSize",
            "pageNumber"
        ],
        "queryArgs": [
            {
                "name": "page_number",
                "wire": "pageNumber"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "cards": [
                {
                    "token": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52",
                    "profileId": 123456,
                    "clientId": "wise_api_docs",
                    "status": {
                        "value": "ACTIVE"
                    },
                    "cardHolderName": "John Smith",
                    "expiryDate": "2028-05-31T00:00:00Z",
                    "lastFourDigits": "6320",
                    "bankIdentificationNumber": "459661",
                    "phoneNumber": "+441234567890",
                    "cardProgram": {
                        "name": "VISA_DEBIT_BUSINESS_UK_1",
                        "scheme": "VISA",
                        "defaultCurrency": "GBP",
                        "cardType": "VIRTUAL"
                    },
                    "unlockSpendingPermissions": "WITH_PARTNER_API",
                    "creationTime": "2022-05-31T01:43:24.596321434Z",
                    "modificationTime": "2022-05-31T01:43:24.596321825Z"
                }
            ],
            "totalCount": 1
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "load",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}",
        "args": [
            {
                "name": "id",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "token": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52",
            "profileId": 123456,
            "clientId": "wise_api_docs",
            "status": {
                "value": "ACTIVE"
            },
            "cardHolderName": "John Smith",
            "expiryDate": "2028-05-31T00:00:00Z",
            "lastFourDigits": "6320",
            "bankIdentificationNumber": "459661",
            "phoneNumber": "+441234567890",
            "cardProgram": {
                "name": "VISA_DEBIT_BUSINESS_UK_1",
                "scheme": "VISA",
                "defaultCurrency": "GBP",
                "cardType": "VIRTUAL"
            },
            "unlockSpendingPermissions": "WITH_PARTNER_API",
            "creationTime": "2022-05-31T01:43:24.596321434Z",
            "modificationTime": "2022-05-31T01:43:24.596321825Z"
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "update",
        "method": "PATCH",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/spending-permissions",
        "action": "spending_permission",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "update",
        "method": "PUT",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/status",
        "action": "status",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "token": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52",
            "profileId": 123456,
            "clientId": "wise_api_docs",
            "status": {
                "value": "ACTIVE"
            },
            "cardHolderName": "John Smith",
            "expiryDate": "2028-05-31T00:00:00Z",
            "lastFourDigits": "6320",
            "bankIdentificationNumber": "459661",
            "phoneNumber": "+441234567890",
            "cardProgram": {
                "name": "VISA_DEBIT_BUSINESS_UK_1",
                "scheme": "VISA",
                "defaultCurrency": "GBP",
                "cardType": "VIRTUAL"
            },
            "unlockSpendingPermissions": "WITH_PARTNER_API",
            "creationTime": "2022-05-31T01:43:24.596321434Z",
            "modificationTime": "2022-05-31T01:43:24.596321825Z"
        },
        "idField": "id"
    },
    {
        "entity": "card_holder_limit",
        "accessor": "CardHolderLimit",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits",
        "args": [
            {
                "name": "card_holder_profile_id",
                "wire": "cardHolderProfileId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "businessProfileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "spendLimits": [
                {
                    "type": "PURCHASE",
                    "aggregateWindow": {
                        "daily": {
                            "value": {
                                "amount": 1000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 100,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T15:59:59.999Z"
                        },
                        "monthly": {
                            "value": {
                                "amount": 3000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 100,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T15:59:59.999Z"
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_holder_limit",
        "accessor": "CardHolderLimit",
        "op": "remove",
        "method": "DELETE",
        "path": "/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits",
        "args": [
            {
                "name": "card_holder_profile_id",
                "wire": "cardHolderProfileId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "businessProfileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "card_holder_limit",
        "accessor": "CardHolderLimit",
        "op": "update",
        "method": "PATCH",
        "path": "/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits",
        "args": [
            {
                "name": "card_holder_profile_id",
                "wire": "cardHolderProfileId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "businessProfileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "spendLimits": [
                {
                    "type": "PURCHASE",
                    "aggregateWindow": {
                        "daily": {
                            "value": {
                                "amount": 1000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 100,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T15:59:59.999Z"
                        },
                        "monthly": {
                            "value": {
                                "amount": 3000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 100,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T15:59:59.999Z"
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_limit",
        "accessor": "CardLimit",
        "op": "load",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/spend-limits",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "transaction": {
                "value": {
                    "amount": 100,
                    "currency": "GBP"
                },
                "usage": {
                    "amount": 0,
                    "currency": "GBP"
                },
                "resetAt": null
            },
            "daily": {
                "value": {
                    "amount": 2000,
                    "currency": "GBP"
                },
                "usage": {
                    "amount": 100,
                    "currency": "GBP"
                },
                "resetAt": "2023-09-29T22:59:59.999999999Z"
            },
            "monthly": {
                "value": {
                    "amount": 3000,
                    "currency": "GBP"
                },
                "usage": {
                    "amount": 100,
                    "currency": "GBP"
                },
                "resetAt": "2023-09-30T22:59:59.999999999Z"
            },
            "lifetime": {
                "value": {
                    "amount": 5000,
                    "currency": "GBP"
                },
                "usage": {
                    "amount": 100,
                    "currency": "GBP"
                },
                "resetAt": null
            }
        },
        "idField": "id"
    },
    {
        "entity": "card_limit",
        "accessor": "CardLimit",
        "op": "update",
        "method": "PATCH",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/spend-limits",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/card-orders",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "xidempotence_uuid",
                "wire": "X-idempotence-uuid",
                "value": "054064c9-e01e-49fb-8fd9-b0990b9442f4"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 142,
            "profileId": 123456,
            "clientId": "your-client-id",
            "cardProgram": {
                "name": "VISA_DEBIT_BUSINESS_UK_1_PHYSICAL_CARDS_API",
                "scheme": "VISA",
                "defaultCurrency": "GBP",
                "cardType": "PHYSICAL"
            },
            "address": {
                "firstLine": "56 Shoreditch High St",
                "secondLine": "The Tea Bldg",
                "thirdLine": null,
                "city": "London",
                "postCode": "E1 6JJ",
                "state": null,
                "country": "GB"
            },
            "cardToken": "4dc0be88-903f-49e4-8237-735f1139e3dd",
            "replacesCard": "4dc0be88-903f-49e4-8237-735f1139e3dd",
            "creationTime": "2023-07-31T01:43:24.596321434Z",
            "modificationTime": "2023-07-31T01:43:24.596321825Z",
            "status": "PRODUCED",
            "cardHolderName": "John Smith",
            "phoneNumber": "+441234567890",
            "lifetimeLimit": 100,
            "deliveryEstimate": "2023-10-30T07:11:00.848681Z",
            "deliveryDetails": {
                "deliveryOption": "POSTAL_SERVICE_WITH_TRACKING",
                "deliveryVendor": "DHL",
                "trackingUrl": "https://www.dhl.com/gb-en/home/tracking/tracking-express.html?submit=1&tracking-id=1999473803",
                "trackingNumber": "1999473803"
            }
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "create",
        "method": "POST",
        "path": "/spend/address/validate",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errors": [
                {
                    "field": "city",
                    "message": "Required Field"
                },
                {
                    "field": "postCode",
                    "message": "Please enter a valid postcode"
                },
                {
                    "field": "firstLine",
                    "message": "Must be less than 30 characters"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/card-orders/{cardOrderId}/requirements",
        "action": "requirement",
        "args": [
            {
                "name": "id",
                "wire": "cardOrderId",
                "value": 142
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "requirements": [
                {
                    "type": "PIN",
                    "status": "NOT_INITIATED"
                },
                {
                    "type": "VERIFICATION",
                    "status": "PENDING"
                },
                {
                    "type": "ADDRESS",
                    "status": "COMPLETED"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/card-orders",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {
            "page_number": 1,
            "page_size": 10
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "pageSize",
            "pageNumber"
        ],
        "queryArgs": [
            {
                "name": "page_number",
                "wire": "pageNumber"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "totalCount": 5,
            "cardOrders": [
                {
                    "id": 142,
                    "profileId": 123456,
                    "clientId": "your-client-id",
                    "cardProgram": {
                        "name": "VISA_DEBIT_BUSINESS_UK_1_PHYSICAL_CARDS_API",
                        "scheme": "VISA",
                        "defaultCurrency": "GBP",
                        "cardType": "PHYSICAL"
                    },
                    "address": {
                        "firstLine": "56 Shoreditch High St",
                        "secondLine": "The Tea Bldg",
                        "thirdLine": null,
                        "city": "London",
                        "postCode": "E1 6JJ",
                        "state": null,
                        "country": "GB"
                    },
                    "cardToken": "4dc0be88-903f-49e4-8237-735f1139e3dd",
                    "replacesCard": "4dc0be88-903f-49e4-8237-735f1139e3dd",
                    "creationTime": "2023-07-31T01:43:24.596321434Z",
                    "modificationTime": "2023-07-31T01:43:24.596321825Z",
                    "status": "PRODUCED",
                    "cardHolderName": "John Smith",
                    "phoneNumber": "+441234567890",
                    "lifetimeLimit": 100,
                    "deliveryEstimate": "2023-10-30T07:11:00.848681Z",
                    "deliveryDetails": {
                        "deliveryOption": "POSTAL_SERVICE_WITH_TRACKING",
                        "deliveryVendor": "DHL",
                        "trackingUrl": "https://www.dhl.com/gb-en/home/tracking/tracking-express.html?submit=1&tracking-id=1999473803",
                        "trackingNumber": "1999473803"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/card-orders/availability",
        "action": "availability",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "cardPrograms": [
                {
                    "name": "VISA_DEBIT_BUSINESS_UK_1_CARDS_API",
                    "scheme": "VISA",
                    "defaultCurrency": "GBP",
                    "cardType": "VIRTUAL_NON_UPGRADEABLE"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "load",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/card-orders/{cardOrderId}",
        "args": [
            {
                "name": "id",
                "wire": "cardOrderId",
                "value": 142
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 142,
            "profileId": 123456,
            "clientId": "your-client-id",
            "cardProgram": {
                "name": "VISA_DEBIT_BUSINESS_UK_1_PHYSICAL_CARDS_API",
                "scheme": "VISA",
                "defaultCurrency": "GBP",
                "cardType": "PHYSICAL"
            },
            "address": {
                "firstLine": "56 Shoreditch High St",
                "secondLine": "The Tea Bldg",
                "thirdLine": null,
                "city": "London",
                "postCode": "E1 6JJ",
                "state": null,
                "country": "GB"
            },
            "cardToken": "4dc0be88-903f-49e4-8237-735f1139e3dd",
            "replacesCard": "4dc0be88-903f-49e4-8237-735f1139e3dd",
            "creationTime": "2023-07-31T01:43:24.596321434Z",
            "modificationTime": "2023-07-31T01:43:24.596321825Z",
            "status": "PRODUCED",
            "cardHolderName": "John Smith",
            "phoneNumber": "+441234567890",
            "lifetimeLimit": 100,
            "deliveryEstimate": "2023-10-30T07:11:00.848681Z",
            "deliveryDetails": {
                "deliveryOption": "POSTAL_SERVICE_WITH_TRACKING",
                "deliveryVendor": "DHL",
                "trackingUrl": "https://www.dhl.com/gb-en/home/tracking/tracking-express.html?submit=1&tracking-id=1999473803",
                "trackingNumber": "1999473803"
            }
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "update",
        "method": "PUT",
        "path": "/spend/profiles/{profileId}/card-orders/{cardOrderId}/status",
        "action": "status",
        "args": [
            {
                "name": "id",
                "wire": "cardOrderId",
                "value": 142
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "card_sensitive_detail",
        "accessor": "CardSensitiveDetail",
        "op": "create",
        "method": "POST",
        "path": "/twcard-data/v1/sensitive-card-data/preset-pin",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "x_tw_twcard_order_id",
                "wire": "x-tw-twcard-order-id",
                "value": "142"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "text/plain"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "card_sensitive_detail",
        "accessor": "CardSensitiveDetail",
        "op": "load",
        "method": "GET",
        "path": "/twcard-data/v1/clientSideEncryption/fetchEncryptingKey",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "version": 1,
            "key": "<encryption key>"
        },
        "idField": "id"
    },
    {
        "entity": "card_transaction",
        "accessor": "CardTransaction",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/transactions",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "59123122-223d-45f9-b840-0ad4a4f80937"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {
            "from_creation_time": "v1",
            "to_creation_time": "v1",
            "last_id": 342672,
            "page_size": 10
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "fromCreationTime",
            "toCreationTime",
            "pageSize",
            "lastId"
        ],
        "queryArgs": [
            {
                "name": "from_creation_time",
                "wire": "fromCreationTime"
            },
            {
                "name": "last_id",
                "wire": "lastId"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "to_creation_time",
                "wire": "toCreationTime"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "transactions": [
                {
                    "id": 342671,
                    "cardToken": "59123122-223d-45f9-b840-0ad4a4f80937",
                    "type": "ECOM_PURCHASE",
                    "state": "IN_PROGRESS",
                    "declineReason": null,
                    "creationTime": "2022-11-28T08:17:54.241Z",
                    "modificationTime": "2022-11-28T08:17:54.241Z",
                    "purgeTime": "2022-11-28T08:17:54.241Z",
                    "transactionAmount": {
                        "amount": 1.4,
                        "currency": "SGD"
                    },
                    "fees": [
                        {
                            "amount": 0.1,
                            "currency": "SGD",
                            "fee_type": "ATM_MACHINE"
                        }
                    ],
                    "transactionAmountWithFees": {
                        "amount": 1.5,
                        "currency": "SGD"
                    },
                    "merchant": {
                        "name": "Test Payment",
                        "location": {
                            "country": "France",
                            "city": "Rouen",
                            "zipCode": "00000",
                            "region": null,
                            "state": null
                        },
                        "category": {
                            "name": "MISCELLANEOUS_FOOD_STORES_CONVEN",
                            "code": "5999",
                            "description": "5999 R Miscellaneous and Special"
                        }
                    },
                    "authorisationMethod": "MANUAL_ENTRY",
                    "approvalCode": "913647",
                    "billingAmount": {
                        "amount": 1.1,
                        "currency": "EUR"
                    },
                    "arn": "04300014127798385983852",
                    "pinValidationResult": "ONLINE_PIN_VALIDATED",
                    "balanceChannelReferenceId": "6e71018d-2f4d-4fc3-6711-f517f4664712"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "card_transaction",
        "accessor": "CardTransaction",
        "op": "load",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards/transactions/{transactionId}",
        "args": [
            {
                "name": "id",
                "wire": "transactionId",
                "value": 342671
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 342671,
            "cardToken": "59123122-223d-45f9-b840-0ad4a4f80937",
            "type": "ECOM_PURCHASE",
            "state": "IN_PROGRESS",
            "declineReason": null,
            "detailedDeclineReason": null,
            "creationTime": "2022-11-28T08:17:54.241Z",
            "modificationTime": "2022-11-28T08:17:54.241Z",
            "purgeTime": "2022-11-28T08:17:54.241Z",
            "transactionAmount": {
                "amount": 1.4,
                "currency": "SGD"
            },
            "fees": [
                {
                    "amount": 0.1,
                    "currency": "SGD",
                    "fee_type": "ATM_MACHINE"
                }
            ],
            "transactionAmountWithFees": {
                "amount": 1.5,
                "currency": "SGD"
            },
            "merchant": {
                "name": "Test Payment",
                "location": {
                    "country": "France",
                    "city": "Rouen",
                    "zipCode": "00000",
                    "region": null,
                    "state": null
                },
                "category": {
                    "name": "MISCELLANEOUS_FOOD_STORES_CONVEN",
                    "code": "5999",
                    "description": "5999 R Miscellaneous and Special"
                }
            },
            "authorisationMethod": "MANUAL_ENTRY",
            "approvalCode": "913647",
            "billingAmount": {
                "amount": 1.1,
                "currency": "EUR"
            },
            "arn": "04300014127798385983852",
            "pinValidationResult": "ONLINE_PIN_VALIDATED",
            "balanceChannelReferenceId": "6e71018d-2f4d-4fc3-6711-f517f4664712",
            "debits": [
                {
                    "balanceId": 52832,
                    "debitedAmount": {
                        "amount": 1.1,
                        "currency": "EUR"
                    },
                    "forAmount": {
                        "amount": 1.5,
                        "currency": "SGD"
                    },
                    "rate": 1.36363636364,
                    "fee": {
                        "amount": 0.04,
                        "currency": "EUR"
                    },
                    "creationTime": "2022-11-28T08:17:54.241Z"
                }
            ],
            "credits": [
                {
                    "balanceId": 52832,
                    "creditedAmount": {
                        "amount": 1.5,
                        "currency": "SGD"
                    },
                    "creationTime": "2022-11-28T08:17:54.241Z"
                }
            ],
            "relayAuthorisationData": {
                "responseCode": "APPROVED",
                "fallback": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "case",
        "accessor": "Case",
        "op": "create",
        "method": "POST",
        "path": "/cases",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 123456789,
            "status": "CREATING",
            "type": "GENERAL_ENQUIRY",
            "externalId": "partner_12344567",
            "createdAt": "2023-06-28T15:21:24.901",
            "updatedAt": "2023-06-28T15:21:24.901"
        },
        "idField": "id"
    },
    {
        "entity": "case",
        "accessor": "Case",
        "op": "load",
        "method": "GET",
        "path": "/cases/{caseId}",
        "args": [
            {
                "name": "id",
                "wire": "caseId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 485,
            "profileId": 220002553,
            "type": "SANCTIONS",
            "subType": "REFERENCE_SANCTION_HIT",
            "status": "RESOLVED",
            "externalId": null,
            "createdAt": "2026-07-29T16:06:06.003",
            "updatedAt": "2026-07-29T16:09:32.998",
            "reference": {
                "type": "TRANSFER",
                "referenceId": "2147513101"
            },
            "messages": [
                {
                    "id": "67631430-77fd-4bbb-a8e0-fdfa67563d66",
                    "caseId": 485,
                    "createdAt": "2026-07-29T16:06:06.014",
                    "content": {
                        "attributes": {
                            "business": {
                                "name": {
                                    "type": "String",
                                    "required": true
                                },
                                "address": {
                                    "type": "Address",
                                    "required": true
                                },
                                "natureOfBusiness": {
                                    "type": "String",
                                    "required": false
                                },
                                "website": {
                                    "type": "String",
                                    "required": false
                                }
                            },
                            "vessel": {
                                "imoNumber": {
                                    "type": "String",
                                    "required": true
                                }
                            },
                            "other": {
                                "explanation": {
                                    "type": "String",
                                    "required": true
                                }
                            },
                            "individual": {
                                "name": {
                                    "type": "String",
                                    "required": true
                                },
                                "dob": {
                                    "type": "LocalDate",
                                    "required": false
                                },
                                "countryOfResidenceIso3": {
                                    "type": "String",
                                    "required": false
                                },
                                "nationality": {
                                    "type": "String",
                                    "required": false
                                }
                            }
                        }
                    },
                    "type": "REFERENCE_SANCTION_HIT_REQUEST",
                    "author": "WISE_SYSTEM"
                },
                {
                    "id": "8c08894d-1e62-45c4-8332-cd1565916273",
                    "caseId": 485,
                    "createdAt": "2026-07-29T16:08:14.308",
                    "content": {
                        "submissionData": {
                            "individual": {
                                "name": "Mr. Robert Downy Junior",
                                "countryOfResidenceIso3": "GBR"
                            }
                        }
                    },
                    "type": "REFERENCE_SANCTION_HIT_SUBMISSION",
                    "author": "PARTNER"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "claim_account",
        "accessor": "ClaimAccount",
        "op": "create",
        "method": "POST",
        "path": "/user/claim-account",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "claimAccountCode": "<claim_account_code>"
        },
        "idField": "id"
    },
    {
        "entity": "comparison",
        "accessor": "Comparison",
        "op": "list",
        "method": "GET",
        "path": "/comparisons",
        "args": [],
        "select": {
            "source_currency": "v1",
            "target_currency": "v1",
            "exclude_partner": "v1",
            "filter": "v1",
            "include_wise": "v1",
            "mid_market_rate": "v1",
            "number_of_provider": "v1",
            "pay_in_method": "v1",
            "provider": "v1",
            "provider_country": "v1",
            "provider_type": "v1",
            "recipient_gets_amount": "v1",
            "send_amount": 10000,
            "source_country": "v1",
            "target_country": "v1",
            "wise_estimated_delivery": "v1",
            "wise_fee": "v1",
            "wise_quote_created_time": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "sourceCurrency",
            "targetCurrency",
            "sendAmount",
            "recipientGetsAmount",
            "midMarketRate",
            "wiseFee",
            "wiseEstimatedDelivery",
            "wiseQuoteCreatedTime",
            "payInMethod",
            "sourceCountry",
            "targetCountry",
            "providerCountry",
            "filter",
            "numberOfProviders",
            "providerTypes",
            "providers",
            "excludePartners",
            "includeWise"
        ],
        "queryArgs": [
            {
                "name": "exclude_partner",
                "wire": "excludePartners"
            },
            {
                "name": "filter",
                "wire": "filter"
            },
            {
                "name": "include_wise",
                "wire": "includeWise"
            },
            {
                "name": "mid_market_rate",
                "wire": "midMarketRate"
            },
            {
                "name": "number_of_provider",
                "wire": "numberOfProviders"
            },
            {
                "name": "pay_in_method",
                "wire": "payInMethod"
            },
            {
                "name": "provider",
                "wire": "providers"
            },
            {
                "name": "provider_country",
                "wire": "providerCountry"
            },
            {
                "name": "provider_type",
                "wire": "providerTypes"
            },
            {
                "name": "recipient_gets_amount",
                "wire": "recipientGetsAmount"
            },
            {
                "name": "send_amount",
                "wire": "sendAmount"
            },
            {
                "name": "source_country",
                "wire": "sourceCountry"
            },
            {
                "name": "source_currency",
                "wire": "sourceCurrency"
            },
            {
                "name": "target_country",
                "wire": "targetCountry"
            },
            {
                "name": "target_currency",
                "wire": "targetCurrency"
            },
            {
                "name": "wise_estimated_delivery",
                "wire": "wiseEstimatedDelivery"
            },
            {
                "name": "wise_fee",
                "wire": "wiseFee"
            },
            {
                "name": "wise_quote_created_time",
                "wire": "wiseQuoteCreatedTime"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "sourceCurrency": "GBP",
            "targetCurrency": "EUR",
            "sourceCountry": null,
            "targetCountry": null,
            "providerCountry": null,
            "providerTypes": [
                "bank",
                "moneyTransferProvider"
            ],
            "amount": 10000,
            "amountType": "SEND",
            "providers": [
                {
                    "id": 39,
                    "alias": "wise",
                    "name": "Wise",
                    "logos": {
                        "normal": {
                            "svgUrl": "https://wise.com/public-resources/assets/logos/wise-personal/logo.svg",
                            "pngUrl": "https://wise.com/public-resources/assets/logos/wise-personal/logo.png"
                        },
                        "inverse": {
                            "svgUrl": "https://wise.com/public-resources/assets/logos/wise-personal/logo_inverse.svg",
                            "pngUrl": "https://wise.com/public-resources/assets/logos/wise-personal/logo_inverse.png"
                        },
                        "white": {
                            "svgUrl": "https://wise.com/public-resources/assets/logos/wise-personal/logo_white.svg",
                            "pngUrl": "https://wise.com/public-resources/assets/logos/wise-personal/logo_white.png"
                        },
                        "circle": {
                            "svgUrl": "https://dq8dwmysp7hk1.cloudfront.net/logos/wise-mark.svg",
                            "pngUrl": null
                        },
                        "altText": "Wise"
                    },
                    "type": "moneyTransferProvider",
                    "partner": false,
                    "quotes": [
                        {
                            "rate": 1.15989,
                            "fee": 37.12,
                            "dateCollected": "2019-10-22T14:36:43Z",
                            "sourceCountry": null,
                            "targetCountry": null,
                            "markup": 0,
                            "receivedAmount": 11555.84,
                            "sendAmount": null,
                            "deliveryEstimation": {
                                "duration": {
                                    "min": "PT20H8M16.305111S",
                                    "max": "PT20H8M16.305111S"
                                },
                                "providerGivesEstimate": true
                            },
                            "isConsideredMidMarketRate": true
                        }
                    ]
                },
                {
                    "id": 1,
                    "alias": "barclays",
                    "name": "Barclays",
                    "logos": {
                        "normal": {
                            "svgUrl": "https://dq8dwmysp7hk1.cloudfront.net/logos/barclays.svg",
                            "pngUrl": "https://dq8dwmysp7hk1.cloudfront.net/logos/barclays.png"
                        },
                        "inverse": {
                            "svgUrl": null,
                            "pngUrl": null
                        },
                        "white": {
                            "svgUrl": "https://dq8dwmysp7hk1.cloudfront.net/logos/barclays--white.svg",
                            "pngUrl": "https://dq8dwmysp7hk1.cloudfront.net/logos/barclays--white.png"
                        },
                        "circle": {
                            "svgUrl": "https://dq8dwmysp7hk1.cloudfront.net/logos/barclays-mark.svg",
                            "pngUrl": null
                        },
                        "altText": "Barclays"
                    },
                    "type": "bank",
                    "partner": false,
                    "quotes": [
                        {
                            "rate": 1.12792426,
                            "fee": 0,
                            "dateCollected": "2019-10-22T14:00:04Z",
                            "sourceCountry": "GB",
                            "targetCountry": "ES",
                            "markup": 2.75592858,
                            "receivedAmount": 11279.24,
                            "sendAmount": null,
                            "deliveryEstimation": {
                                "duration": {
                                    "min": "PT24H",
                                    "max": "PT24H"
                                },
                                "providerGivesEstimate": true
                            },
                            "isConsideredMidMarketRate": false
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "contact",
        "accessor": "Contact",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/contacts",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {
            "is_direct_identifier_creation": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "isDirectIdentifierCreation"
        ],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "contactId": "00000000-0000-0000-0000-000000000000",
            "name": "Jonathan Peters"
        },
        "idField": "id"
    },
    {
        "entity": "create_third_party_transfer_response_content",
        "accessor": "CreateThirdPartyTransferResponseContent",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/third-party-transfers",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456789
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": 16521632,
            "originalTransferId": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "user": 4342275,
            "targetAccount": 8692237,
            "sourceAccount": 1527389,
            "quote": "8fa9be20-ba43-4b15-abbb-9424e1481050",
            "status": "cancelled",
            "rate": 0.89,
            "details": {
                "reference": "T475890"
            },
            "hasActiveIssues": false,
            "sourceCurrency": "EUR",
            "sourceValue": 0,
            "targetCurrency": "GBP",
            "targetValue": 150,
            "originator": {
                "legalEntityType": "BUSINESS",
                "name": {
                    "fullName": "Hot Air Balloon Services Ltd"
                },
                "reference": "CST-2991992",
                "businessRegistrationCode": "83920-546",
                "businessRegistrationDate": "2020-01-15",
                "address": {
                    "firstLine": "Salu tee 14",
                    "city": "Tallinn",
                    "stateCode": "",
                    "countryCode": "EE",
                    "postCode": "12112"
                },
                "accountDetails": "23456789"
            },
            "created": "2025-10-29T12:28:16.000Z"
        },
        "idField": "id"
    },
    {
        "entity": "currency",
        "accessor": "Currency",
        "op": "list",
        "method": "GET",
        "path": "/currencies",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "accept_language",
                "wire": "Accept-Language",
                "value": "en"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "code": "AUD",
                "symbol": "A$",
                "name": "Australian dollar",
                "countryKeywords": [
                    "AUD",
                    "AU",
                    "Australia"
                ],
                "supportsDecimals": true
            },
            {
                "code": "JPY",
                "symbol": "¥",
                "name": "Japanese yen",
                "countryKeywords": [
                    "JPY",
                    "JP",
                    "Japan"
                ],
                "supportsDecimals": false
            }
        ],
        "idField": "id"
    },
    {
        "entity": "delivery_estimate",
        "accessor": "DeliveryEstimate",
        "op": "load",
        "method": "GET",
        "path": "/delivery-estimates/{transferId}",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": 12345678
            }
        ],
        "select": {
            "timezone": "Asia/Singapore"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "timezone"
        ],
        "queryArgs": [
            {
                "name": "timezone",
                "wire": "timezone"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "estimatedDeliveryDate": "2018-01-10T12:15:00.000+0000",
            "formattedEstimatedDeliveryDate": "in seconds"
        },
        "idField": "id"
    },
    {
        "entity": "delivery_update",
        "accessor": "DeliveryUpdate",
        "op": "create",
        "method": "POST",
        "path": "/simulation/transfers/{transferId}/delivery-update",
        "args": [
            {
                "name": "transfer_id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "observation_id": "550e8400-e29b-41d4-a716-446655440000",
            "occurred_at": "2026-10-01T10:00:00.123Z"
        },
        "idField": "id"
    },
    {
        "entity": "digital_wallet",
        "accessor": "DigitalWallet",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "a3f90c98-1cd1-4488-9050-2e32c696f8fa"
            },
            {
                "name": "payment_token_unique_reference",
                "wire": "paymentTokenUniqueReference",
                "value": "DNITHE382607223583426199"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "digital_wallet",
        "accessor": "DigitalWallet",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "a3f90c98-1cd1-4488-9050-2e32c696f8fa"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "paymentTokens": [
                {
                    "cardToken": "a3f90c98-1cd1-4488-9050-2e32c696f8fa",
                    "walletName": "GOOGLE_PAY",
                    "paymentTokenUniqueReference": "DSHRMC0000255389d1106783179b420aa5b5ca09ba2f12b8",
                    "panUniqueReference": "FSHRMC000025538959679bc73c9d4fdc8031b20fa91d0e3b",
                    "provisioningStatus": "ACTIVE",
                    "creationTime": "2025-02-06T15:34:23.877041000Z",
                    "modificationTime": "2025-02-06T15:34:23.877343000Z"
                },
                {
                    "cardToken": "a3f90c98-1cd1-4488-9050-2e32c696f8fa",
                    "walletName": "GOOGLE_PAY",
                    "paymentTokenUniqueReference": "DSHRMC0000255389e2f7133754ab4e2f87fc323730fdfd8e",
                    "panUniqueReference": "",
                    "provisioningStatus": "INACTIVE",
                    "creationTime": "2025-06-25T22:05:47.116016000Z",
                    "modificationTime": "2025-06-25T22:05:47.116077000Z"
                },
                {
                    "cardToken": "a3f90c98-1cd1-4488-9050-2e32c696f8fa",
                    "walletName": "APPLE_PAY",
                    "paymentTokenUniqueReference": "DAPLMC000025538967ea1d7972414a93a6544a07dae27a8c",
                    "panUniqueReference": "FAPLMC0000255389d7df244df7244803aa2c4ce2a29c242a",
                    "provisioningStatus": "ACTIVE",
                    "creationTime": "2025-08-19T21:28:28.434472000Z",
                    "modificationTime": "2025-08-19T21:28:28.434738000Z"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "direct_debit_account",
        "accessor": "DirectDebitAccount",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/direct-debit-accounts",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "currency": "USD",
            "type": "ACH",
            "details": {
                "routingNumber": "000000000",
                "accountNumber": "0000000000",
                "accountType": "CHECKING"
            }
        },
        "idField": "id"
    },
    {
        "entity": "direct_debit_account",
        "accessor": "DirectDebitAccount",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/direct-debit-accounts",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {
            "currency": "USD",
            "type": "ACH"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "type",
            "currency"
        ],
        "queryArgs": [
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "type",
                "wire": "type"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "currency": "USD",
                "type": "ACH",
                "details": {
                    "routingNumber": "000000000",
                    "accountNumber": "0000000000",
                    "accountType": "CHECKING"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "director",
        "accessor": "Director",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/directors",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 10,
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa"
            },
            {
                "id": 11,
                "firstName": "Jane",
                "lastName": "Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "director",
        "accessor": "Director",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/directors",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 10,
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa"
            },
            {
                "id": 11,
                "firstName": "Jane",
                "lastName": "Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "director",
        "accessor": "Director",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/directors",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 14,
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa"
            },
            {
                "id": 15,
                "firstName": "Jane",
                "lastName": "Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "director",
        "accessor": "Director",
        "op": "update",
        "method": "PUT",
        "path": "/profiles/{profileId}/directors",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 14,
                "firstName": "John",
                "lastName": "Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa"
            },
            {
                "id": 15,
                "firstName": "Jane",
                "lastName": "Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "dispute",
        "accessor": "Dispute",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 14547572
            },
            {
                "name": "reason",
                "wire": "reason",
                "value": "WRONG_AMOUNT"
            },
            {
                "name": "scheme",
                "wire": "scheme",
                "value": "VISA"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "key": "final",
            "type": "form",
            "title": "Done!",
            "actions": [
                {
                    "title": "Continue",
                    "exit": true,
                    "$id": "continue"
                }
            ],
            "schemas": [],
            "layout": [
                {
                    "width": "md",
                    "components": [
                        {
                            "url": "https://wise.com/web-art/assets/illustrations/email-success-large%402x.png",
                            "type": "image"
                        }
                    ],
                    "type": "box"
                },
                {
                    "margin": "lg",
                    "align": "center",
                    "type": "info",
                    "markdown": "Thanks for reporting this transaction. It's pre-authorised right now, but as soon as it becomes \"spent\" we'll begin our investigation."
                },
                {
                    "type": "button",
                    "action": {
                        "$ref": "continue",
                        "x-ref": "continue"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "dispute",
        "accessor": "Dispute",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/dispute-form/file",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 14547572
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "receipt": "ab4f5d2"
        },
        "idField": "id"
    },
    {
        "entity": "dispute",
        "accessor": "Dispute",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/disputes",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 16605997
            }
        ],
        "select": {
            "page_number": 1,
            "page_size": 10,
            "status": "ACTIVE",
            "transaction_id": 2040
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "status",
            "transactionId",
            "pageSize",
            "pageNumber"
        ],
        "queryArgs": [
            {
                "name": "page_number",
                "wire": "pageNumber"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "status",
                "wire": "status"
            },
            {
                "name": "transaction_id",
                "wire": "transactionId"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "totalCount": 2,
            "disputes": [
                {
                    "id": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb",
                    "transactionId": 2040,
                    "profileId": 16605997,
                    "reason": "NEVER_ARRIVED",
                    "status": "ACTIVE",
                    "subStatus": "SUBMITTED",
                    "statusMessage": "Submitted",
                    "createdAt": "2024-03-08T08:30:14.989Z",
                    "createdBy": "6097861",
                    "lastUpdatedAt": "2024-03-08T08:30:14.989Z",
                    "canWithdraw": true
                },
                {
                    "id": "9c5ca0cb-00d6-41f7-8214-8cfdb11388a7",
                    "transactionId": 3405,
                    "profileId": 16605997,
                    "reason": "CANCELLED_ORDER",
                    "status": "ACTIVE",
                    "subStatus": "SUBMITTED",
                    "statusMessage": "Submitted",
                    "createdAt": "2024-03-27T02:24:16.878Z",
                    "createdBy": "6097861",
                    "lastUpdatedAt": "2024-03-27T02:24:16.878Z",
                    "canWithdraw": true
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "dispute",
        "accessor": "Dispute",
        "op": "load",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/disputes/{disputeId}",
        "args": [
            {
                "name": "id",
                "wire": "disputeId",
                "value": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 16605997
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "b4eae16c-b3a9-4327-b0bd-6a2ad430d803",
            "transactionId": 476873,
            "profileId": 14547572,
            "reason": "WRONG_AMOUNT",
            "status": "CLOSED",
            "subStatus": "WITHDRAWN",
            "statusMessage": "Withdrawn",
            "createdAt": "2024-03-18T03:47:52.493Z",
            "createdBy": "9867661",
            "lastUpdatedAt": "2024-03-27T02:30:27.374Z",
            "canWithdraw": false
        },
        "idField": "id"
    },
    {
        "entity": "dispute",
        "accessor": "Dispute",
        "op": "update",
        "method": "PUT",
        "path": "/spend/profiles/{profileId}/disputes/{disputeId}/status",
        "action": "status",
        "args": [
            {
                "name": "id",
                "wire": "disputeId",
                "value": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 16605997
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb",
            "transactionId": 2040,
            "profileId": 16605997,
            "reason": "NEVER_ARRIVED",
            "status": "CLOSED",
            "subStatus": "WITHDRAWN",
            "statusMessage": "Withdrawn",
            "createdAt": "2024-03-08T08:30:14.989Z",
            "createdBy": "6097861",
            "lastUpdatedAt": "2024-03-27T13:12:28.390Z",
            "canWithdraw": false
        },
        "idField": "id"
    },
    {
        "entity": "dispute_reason",
        "accessor": "DisputeReason",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/dispute-form/reasons",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 14547572
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "code": "ATM_DISPENSED_NO_FUNDS",
                "description": "I didn't receive the money from the ATM or cash machine",
                "isFraud": false,
                "supportsMultipleTransactions": false,
                "tooltip": "Choose this if the ATM did not dispense the money or gave you less than expected"
            },
            {
                "code": "WRONG_AMOUNT",
                "description": "I was charged the wrong amount or currency",
                "isFraud": false,
                "supportsMultipleTransactions": false,
                "tooltip": "Choose this if you were overcharged or the payment was in a different currency than you were expecting"
            },
            {
                "code": "TROUBLE_WITH_GOODS_SERVICES",
                "description": "There's a problem with the goods or service I ordered",
                "isFraud": false,
                "supportsMultipleTransactions": false,
                "tooltip": "Choose this if the goods or service never arrived, or if the product was defective or different from what you expected"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "facetec",
        "accessor": "Facetec",
        "op": "load",
        "method": "GET",
        "path": "/facetec/public-key",
        "action": "public_key",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "text/plain"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "file",
        "accessor": "File",
        "op": "create",
        "method": "POST",
        "path": "/cases/files",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 201,
        "sample": {
            "profileId": 14556049,
            "fileId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            "fileName": "company-registration.pdf",
            "createdAt": "2026-09-28T10:00:00.123",
            "purpose": "GENERAL"
        },
        "idField": "id"
    },
    {
        "entity": "file",
        "accessor": "File",
        "op": "list",
        "method": "GET",
        "path": "/cases/files",
        "args": [],
        "select": {
            "page_number": 1,
            "page_size": 2,
            "profile_id": 14556049
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "pageNumber",
            "pageSize",
            "profileId"
        ],
        "queryArgs": [
            {
                "name": "page_number",
                "wire": "pageNumber"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "profile_id",
                "wire": "profileId"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "files": [
                {
                    "profileId": 14556049,
                    "fileId": "a1b2c3d4-e5f6-4789-abcd-ef1234567890",
                    "fileName": "company-registration.pdf",
                    "createdAt": "2026-09-30T10:00:00.123",
                    "purpose": "GENERAL"
                },
                {
                    "profileId": 14556049,
                    "fileId": "b2c3d4e5-f6a7-4890-bcde-f12345678901",
                    "fileName": "identity-document.png",
                    "createdAt": "2026-09-29T10:00:00.123",
                    "purpose": "GENERAL"
                }
            ],
            "totalFiles": 5
        },
        "idField": "id"
    },
    {
        "entity": "funding",
        "accessor": "Funding",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/transfers/{transferId}/payments",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456789
            },
            {
                "name": "transfer_id",
                "wire": "transferId",
                "value": 16521632
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "type": "BALANCE",
            "status": "COMPLETED",
            "balanceTransactionId": 987654321
        },
        "idField": "id"
    },
    {
        "entity": "hold_limit_breach",
        "accessor": "HoldLimitBreach",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/balances/hold-limit-breach",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "closing_reason": "AUTOMATICALLY_RESOLVED",
            "state": "OPEN"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "state",
            "closingReason"
        ],
        "queryArgs": [
            {
                "name": "closing_reason",
                "wire": "closingReason"
            },
            {
                "name": "state",
                "wire": "state"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 200001,
                "profileId": 123456,
                "amount": 310.86,
                "currency": "EUR",
                "state": "OPEN",
                "closingReason": "AUTOMATICALLY_RESOLVED",
                "createdAt": "2020-05-20T14:43:16.658Z",
                "updatedAt": "2020-05-20T14:43:16.658Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "incoming_transfer",
        "accessor": "IncomingTransfer",
        "op": "load",
        "method": "GET",
        "path": "/incoming-transfers/{incomingTransferId}",
        "args": [
            {
                "name": "id",
                "wire": "incomingTransferId",
                "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "123e4567-e89b-12d3-a456-426614174000",
            "profileId": 12345678,
            "balanceId": "555555",
            "accountDetailsId": "987654",
            "state": "CREDITED",
            "creditTransferType": "CUSTOMER_CREDIT_TRANSFER",
            "scheme": "SWIFT",
            "endToEndId": "INVOICE-2026-998",
            "uetr": "123e4567-e89b-42d3-a456-426614174000",
            "unstructuredReference": "/RFB/INV-2025-001",
            "creditedTime": "2025-08-21T12:34:56.000Z",
            "debtor": {
                "name": "Sarah Jenkins",
                "address": {
                    "streetName": "Clifton Street, London",
                    "buildingNumber": "65",
                    "townName": "London",
                    "postCode": "EC2A 4JE",
                    "countrySubDivision": "Greater London",
                    "country": "GB",
                    "addressLines": [
                        "1st Floor, Worship Square",
                        "EV2A 4JE"
                    ]
                },
                "account": {
                    "number": "GB29NWBK60161331926819"
                },
                "agent": {
                    "bic": "TRWIGB2L",
                    "nationalCode": "230801",
                    "nationalCodeType": "ABA",
                    "name": "Wise Payments Ltd",
                    "address": {
                        "streetName": "Clifton Street, London",
                        "buildingNumber": "65",
                        "townName": "London",
                        "postCode": "EC2A 4JE",
                        "countrySubDivision": "Greater London",
                        "country": "GB",
                        "addressLines": [
                            "1st Floor, Worship Square",
                            "EV2A 4JE"
                        ]
                    }
                }
            },
            "creditor": {
                "name": "Sarah Jenkins",
                "address": {
                    "streetName": "Clifton Street, London",
                    "buildingNumber": "65",
                    "townName": "London",
                    "postCode": "EC2A 4JE",
                    "countrySubDivision": "Greater London",
                    "country": "GB",
                    "addressLines": [
                        "1st Floor, Worship Square",
                        "EV2A 4JE"
                    ]
                },
                "account": {
                    "number": "GB29NWBK60161331926819"
                },
                "agent": {
                    "bic": "TRWIGB2L",
                    "nationalCode": "230801",
                    "nationalCodeType": "ABA",
                    "name": "Wise Payments Ltd",
                    "address": {
                        "streetName": "Clifton Street, London",
                        "buildingNumber": "65",
                        "townName": "London",
                        "postCode": "EC2A 4JE",
                        "countrySubDivision": "Greater London",
                        "country": "GB",
                        "addressLines": [
                            "1st Floor, Worship Square",
                            "EV2A 4JE"
                        ]
                    }
                }
            },
            "amounts": {
                "instructed": {
                    "value": 1000,
                    "currency": "USD"
                },
                "interbankSettlement": {
                    "value": 1000,
                    "currency": "USD"
                },
                "credited": {
                    "value": 1000,
                    "currency": "USD"
                }
            },
            "exchangeRate": 0.6325,
            "chargeBearer": "DEBTOR",
            "previousInstructingAgents": [
                {
                    "bic": "TRWIGB2L",
                    "nationalCode": "230801",
                    "nationalCodeType": "ABA",
                    "name": "Wise Payments Ltd",
                    "address": {
                        "streetName": "Clifton Street, London",
                        "buildingNumber": "65",
                        "townName": "London",
                        "postCode": "EC2A 4JE",
                        "countrySubDivision": "Greater London",
                        "country": "GB",
                        "addressLines": [
                            "1st Floor, Worship Square",
                            "EV2A 4JE"
                        ]
                    }
                }
            ],
            "fees": {
                "wise": [
                    {
                        "type": "CONVERSION",
                        "value": 7.25,
                        "currency": "EUR"
                    }
                ],
                "correspondent": [
                    {
                        "value": 15,
                        "currency": "USD",
                        "agent": {
                            "bic": "TRWIGB2L",
                            "nationalCode": "230801",
                            "nationalCodeType": "ABA",
                            "name": "Wise Payments Ltd",
                            "address": {
                                "streetName": "Clifton Street, London",
                                "buildingNumber": "65",
                                "townName": "London",
                                "postCode": "EC2A 4JE",
                                "countrySubDivision": "Greater London",
                                "country": "GB",
                                "addressLines": [
                                    "1st Floor, Worship Square",
                                    "EV2A 4JE"
                                ]
                            }
                        }
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "jose",
        "accessor": "Jose",
        "op": "create",
        "method": "POST",
        "path": "/auth/jose/playground/jwsjwe",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "accept_encoding",
                "wire": "Accept-Encoding",
                "value": "identity"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "x_tw_jose_encryption_kid",
                "wire": "X-TW-JOSE-Encryption-kid",
                "value": "2333836d-2e1c-4acd-8b52-234d379260aa"
            },
            {
                "name": "x_tw_jose_method",
                "wire": "x-tw-jose-method",
                "value": "jws+jwe"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/jose+json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": "eyJraWQiOiJiMzc0ODE1MC0xNGQ0LTRlMDAtYjM5NC03YWUwYzkzYmUyNDUiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.VGhpcyBpcyB0aGUgZW5jcnlwdGVkIENFSw.aXZfdmFsdWU.ZW5jcnlwdGVkX3BheWxvYWQ.YXV0aF90YWc",
        "idField": "id"
    },
    {
        "entity": "jose",
        "accessor": "Jose",
        "op": "create",
        "method": "POST",
        "path": "/auth/jose/request/public-keys",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 201,
        "sample": {
            "clientId": null,
            "keyId": "e87da464-8e5e-4380-8f2d-4e4e04052672",
            "scope": "PAYLOAD_SIGNING",
            "validFrom": "2023-04-27 00:00:00",
            "validTill": "2024-04-01 00:00:00",
            "publicKeyMaterial": {
                "algorithm": "ES512",
                "keyMaterial": "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBYAwVICxD0Paq7MOuO34omujHxSrQXZtiTQ/VMteqAeUfM4wE+vTSpbYCqb1pNhhcQpF+FJd2H8jB1H1zil7qLLcBw+yl4PrnLza1pmNLr+kqQVoVXVyVx/xxMK2WObLn8tHxXtW4k+bm1/ySF+0RQ265IZcw2i8YYX2FY59JkwE2Fac="
            },
            "deactivationTimestamp": null
        },
        "idField": "id"
    },
    {
        "entity": "jose",
        "accessor": "Jose",
        "op": "load",
        "method": "GET",
        "path": "/auth/jose/response/public-keys",
        "args": [],
        "select": {
            "algorithm": "ES512",
            "scope": "PAYLOAD_SIGNING",
            "version": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "version",
            "algorithm",
            "scope"
        ],
        "queryArgs": [
            {
                "name": "algorithm",
                "wire": "algorithm"
            },
            {
                "name": "scope",
                "wire": "scope"
            },
            {
                "name": "version",
                "wire": "version"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "version": 1,
            "keyMaterial": {
                "algorithm": "ES512",
                "keyMaterial": "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBYAwVICxD0Paq7MOuO34omujHxSrQXZtiTQ/VMteqAeUfM4wE+vTSpbYCqb1pNhhcQpF+FJd2H8jB1H1zil7qLLcBw+yl4PrnLza1pmNLr+kqQVoVXVyVx/xxMK2WObLn8tHxXtW4k+bm1/ySF+0RQ265IZcw2i8YYX2FY59JkwE2Fac="
            },
            "scope": "PAYLOAD_SIGNING"
        },
        "idField": "id"
    },
    {
        "entity": "kyc_review",
        "accessor": "KycReview",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/kyc-requirements/{requirementKey}",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            },
            {
                "name": "requirement_key",
                "wire": "requirementKey",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "kyc_review",
        "accessor": "KycReview",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/kyc-reviews",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "id": "46e1a5c4-4a9b-4563-39d3-18174d3ac0f8",
            "status": "WAITING_CUSTOMER_INPUT",
            "createdAt": "2024-09-03T16:22:02.257725",
            "updatedAt": "2024-09-03T16:29:41.147522",
            "requiredBy": "2024-09-03T16:22:02.257725",
            "triggerReferences": [
                {
                    "type": "QUOTE",
                    "triggerData": {
                        "id": "ba83a43a-f623-46f0-956d-196c13e2ab01"
                    }
                }
            ],
            "redirectUrl": "https://example.com",
            "requirements": [
                [
                    {
                        "key": "ID_DOCUMENT",
                        "state": "NOT_PROVIDED",
                        "apiCollectionSupported": true,
                        "additionalRequirements": [
                            {
                                "additionalRequirementId": "8b789c45-60ae-475d-b667-c8714db9a6a4",
                                "key": "DOCUMENT_OR_WRITTEN_ANSWER",
                                "state": "NOT_PROVIDED",
                                "reasons": {},
                                "attributes": {}
                            }
                        ],
                        "versions": [
                            {
                                "version": "v1",
                                "validUntil": "2026-06-30"
                            }
                        ],
                        "attributes": {}
                    }
                ]
            ]
        },
        "idField": "id"
    },
    {
        "entity": "kyc_review",
        "accessor": "KycReview",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/kyc-reviews",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "page_number": 1,
            "page_size": 100
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "pageNumber",
            "pageSize"
        ],
        "queryArgs": [
            {
                "name": "page_number",
                "wire": "pageNumber"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "46e1a5c4-4a9b-4563-39d3-18174d3ac0f8",
                "status": "WAITING_CUSTOMER_INPUT",
                "createdAt": "2024-09-03T16:22:02.257725",
                "updatedAt": "2024-09-03T16:29:41.147522",
                "requiredBy": "2024-09-03T16:22:02.257725",
                "triggerReferences": [
                    {
                        "type": "QUOTE",
                        "triggerData": {
                            "id": "ba83a43a-f623-46f0-956d-196c13e2ab01"
                        }
                    }
                ],
                "redirectUrl": "https://example.com",
                "requirements": [
                    [
                        {
                            "key": "ID_DOCUMENT",
                            "state": "NOT_PROVIDED",
                            "apiCollectionSupported": true,
                            "additionalRequirements": [
                                {}
                            ],
                            "versions": [
                                {}
                            ],
                            "attributes": {}
                        }
                    ]
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "kyc_review",
        "accessor": "KycReview",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/kyc-reviews/{kycReviewId}",
        "args": [
            {
                "name": "id",
                "wire": "kycReviewId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "46e1a5c4-4a9b-4563-39d3-18174d3ac0f8",
            "status": "WAITING_CUSTOMER_INPUT",
            "createdAt": "2024-09-03T16:22:02.257725",
            "updatedAt": "2024-09-03T16:29:41.147522",
            "requiredBy": "2024-09-03T16:22:02.257725",
            "triggerReferences": [
                {
                    "type": "QUOTE",
                    "triggerData": {
                        "id": "ba83a43a-f623-46f0-956d-196c13e2ab01"
                    }
                }
            ],
            "redirectUrl": "https://example.com",
            "requirements": [
                [
                    {
                        "key": "ID_DOCUMENT",
                        "state": "NOT_PROVIDED",
                        "apiCollectionSupported": true,
                        "additionalRequirements": [
                            {
                                "additionalRequirementId": "8b789c45-60ae-475d-b667-c8714db9a6a4",
                                "key": "DOCUMENT_OR_WRITTEN_ANSWER",
                                "state": "NOT_PROVIDED",
                                "reasons": {},
                                "attributes": {}
                            }
                        ],
                        "versions": [
                            {
                                "version": "v1",
                                "validUntil": "2026-06-30"
                            }
                        ],
                        "attributes": {}
                    }
                ]
            ]
        },
        "idField": "id"
    },
    {
        "entity": "kyc_review",
        "accessor": "KycReview",
        "op": "update",
        "method": "PATCH",
        "path": "/profiles/{profileId}/kyc-reviews/{kycReviewId}",
        "args": [
            {
                "name": "id",
                "wire": "kycReviewId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "46e1a5c4-4a9b-4563-39d3-18174d3ac0f8",
            "status": "WAITING_CUSTOMER_INPUT",
            "link": {
                "value": "https://wise-sandbox.com/embedded-flows/verification?token=d7332edb-25bf-41af-a4e9-09f5efe39ded&checkId=3120073",
                "expiresAt": "2024-09-03T16:29:41.203225146"
            },
            "createdAt": "2024-09-03T16:22:02.257725",
            "updatedAt": "2024-09-03T16:29:41.147522",
            "requiredBy": "2024-09-03T16:22:02.257725",
            "triggerReferences": [
                {
                    "type": "QUOTE",
                    "triggerData": {
                        "id": "ba83a43a-f623-46f0-956d-196c13e2ab01"
                    }
                }
            ],
            "redirectUrl": "https://example.com",
            "requirements": [
                [
                    {
                        "key": "ID_DOCUMENT",
                        "state": "NOT_PROVIDED",
                        "apiCollectionSupported": true,
                        "additionalRequirements": [
                            {
                                "additionalRequirementId": "8b789c45-60ae-475d-b667-c8714db9a6a4",
                                "key": "DOCUMENT_OR_WRITTEN_ANSWER",
                                "state": "NOT_PROVIDED",
                                "reasons": {},
                                "attributes": {}
                            }
                        ],
                        "versions": [
                            {
                                "version": "v1",
                                "validUntil": "2026-06-30"
                            }
                        ],
                        "attributes": {}
                    }
                ]
            ]
        },
        "idField": "id"
    },
    {
        "entity": "link_request",
        "accessor": "LinkRequest",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/embedded-flows/link-requests/kyc-reviews",
        "action": "kyc_review",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "url": "https://wise-sandbox.com/embedded-flows?embeddedLinkRequestId=9f5f5812-2609-4e48-8418-b64437c0c7cd#token=0d0bdc88-bcf4-43dd-85be-7ca65441db20",
            "expiresAt": "2026-06-15T13:23:20.265Z"
        },
        "idField": "id"
    },
    {
        "entity": "link_request",
        "accessor": "LinkRequest",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/embedded-flows/link-requests/payment-instrument",
        "action": "payment_instrument",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "url": "https://wise-sandbox.com/embedded-flows?embeddedLinkRequestId=9f5f5812-2609-4e48-8418-b64437c0c7cd#token=0d0bdc88-bcf4-43dd-85be-7ca65441db20",
            "expiresAt": "2026-06-15T13:23:20.265Z"
        },
        "idField": "id"
    },
    {
        "entity": "link_request",
        "accessor": "LinkRequest",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/embedded-flows/link-requests/recipients",
        "action": "recipient",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "url": "https://wise-sandbox.com/embedded-flows?embeddedLinkRequestId=9f5f5812-2609-4e48-8418-b64437c0c7cd#token=0d0bdc88-bcf4-43dd-85be-7ca65441db20",
            "expiresAt": "2026-06-15T13:23:20.265Z"
        },
        "idField": "id"
    },
    {
        "entity": "link_request",
        "accessor": "LinkRequest",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/embedded-flows/link-requests/spend/disputes",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "url": "https://wise-sandbox.com/embedded-flows?embeddedLinkRequestId=9f5f5812-2609-4e48-8418-b64437c0c7cd#token=0d0bdc88-bcf4-43dd-85be-7ca65441db20",
            "expiresAt": "2026-06-15T13:23:20.265Z"
        },
        "idField": "id"
    },
    {
        "entity": "link_request",
        "accessor": "LinkRequest",
        "op": "load",
        "method": "GET",
        "path": "/embedded-flows/link-requests/{embeddedLinkRequestId}",
        "args": [
            {
                "name": "id",
                "wire": "embeddedLinkRequestId",
                "value": "ea5eb6ca-3af7-4e88-a2e2-6a68dd92f198"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ea5eb6ca-3af7-4e88-a2e2-6a68dd92f198",
            "profileId": 12345,
            "type": "RECIPIENT",
            "clientKey": "partner-client-key",
            "metadata": {
                "targetCurrency": "USD"
            },
            "redirectUrl": "https://example.com/return"
        },
        "idField": "id"
    },
    {
        "entity": "lookup_gpi_tracking_response_content",
        "accessor": "LookupGpiTrackingResponseContent",
        "op": "create",
        "method": "POST",
        "path": "/gpi-tracking",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "transactions": [
                {
                    "uetr": "97ed4827-7b6f-4491-a206-42bcf859a919",
                    "status": "ACSP",
                    "cancellationStatus": "CANCELLATION_REJECTED",
                    "initiatedAt": "2023-09-18T12:05:50Z",
                    "lastUpdatedAt": "2023-09-18T12:13:33.314Z",
                    "events": [
                        {
                            "status": "ACSP",
                            "statusReason": {
                                "code": "G001",
                                "settlementMethod": {
                                    "code": "INGA"
                                },
                                "instructedAgent": "LHVBEE22XXX",
                                "chargeBearer": "SHAR"
                            },
                            "statusTime": "2023-09-18T12:13:33.314Z",
                            "amountInconsistency": false,
                            "eventType": "CANCELLATION_RESPONSE",
                            "eventTarget": "CREDIT_TRANSFER",
                            "eventCreationTime": "2023-09-18T12:13:33.348Z"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "message",
        "accessor": "Message",
        "op": "create",
        "method": "POST",
        "path": "/cases/{caseId}/messages",
        "args": [
            {
                "name": "case_id",
                "wire": "caseId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 201,
        "sample": {
            "id": "660e8400-e29b-41d4-a716-446655440001",
            "caseId": 12345678,
            "createdAt": "2026-07-27T15:00:00.000",
            "content": {
                "text": {
                    "freeText": "The transfer has been verified and approved by our compliance team."
                }
            },
            "type": "FREEFORM",
            "author": "PARTNER"
        },
        "idField": "id"
    },
    {
        "entity": "multi_currency_account",
        "accessor": "MultiCurrencyAccount",
        "op": "load",
        "method": "GET",
        "path": "/multi-currency-account/eligibility",
        "action": "eligibility",
        "args": [],
        "select": {
            "country": "FR",
            "profile_id": "v1",
            "state": "CA"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "profileId",
            "country",
            "state"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "profile_id",
                "wire": "profileId"
            },
            {
                "name": "state",
                "wire": "state"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "eligible": true,
            "eligibilityCode": "eligible",
            "accountType": "FULL",
            "ineligibilityReason": null
        },
        "idField": "id"
    },
    {
        "entity": "n3ds",
        "accessor": "N3ds",
        "op": "create",
        "method": "POST",
        "path": "/spend/profiles/{profileId}/3dsecure/challenge-result",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "one_time_token",
        "accessor": "OneTimeToken",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/facemaps/verify",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "one_time_token",
                "wire": "One-Time-Token",
                "value": "h1"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "oneTimeToken": "5932d5b5-ec13-452f-8688-308feade7834",
            "challenges": [
                {
                    "primaryChallenge": {
                        "type": "PIN"
                    },
                    "passed": false
                }
            ],
            "validity": 3600
        },
        "idField": "id"
    },
    {
        "entity": "ott",
        "accessor": "Ott",
        "op": "load",
        "method": "GET",
        "path": "/one-time-token/status",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "one_time_token",
                "wire": "One-Time-Token",
                "value": "h1"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "oneTimeTokenProperties": {
                "oneTimeToken": "9f5f5812-2609-4e48-8418-b64437c0c7cd",
                "challenges": [
                    {
                        "primaryChallenge": {
                            "type": "PIN",
                            "viewData": {
                                "attributes": {
                                    "userId": 6146956
                                }
                            }
                        },
                        "alternatives": [],
                        "required": true,
                        "passed": false
                    }
                ],
                "validity": 3600,
                "actionType": "BALANCE__GET_STATEMENT",
                "userId": 6146956
            }
        },
        "idField": "id"
    },
    {
        "entity": "payin",
        "accessor": "Payin",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/payin-sessions/{payinSessionId}/paynow",
        "args": [
            {
                "name": "payin_session_id",
                "wire": "payinSessionId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "qrCodeInBase64": "iVBORw0KGgoAAAANSUhEUgAAAXUAAAF1CAIAAACYn+2fAAB2CUlEQVR4Xux9B2BU15k1cYxAdJCQhB...",
            "details": {
                "virtualPaymentAddress": "UEN123456789R#WISE",
                "amount": 100,
                "currency": "SGD",
                "reference": "PP12345678",
                "entityName": "WISE ASIA-PACIFIC PTE LTD"
            }
        },
        "idField": "id"
    },
    {
        "entity": "payin",
        "accessor": "Payin",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins",
        "args": [
            {
                "name": "payment_instrument_id",
                "wire": "paymentInstrumentId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "amount": 1,
            "currency": "x",
            "failureReason": "x",
            "id": "x",
            "payinSessionId": "x",
            "paymentInstrumentId": "x",
            "reference": "x",
            "status": "x"
        },
        "idField": "id"
    },
    {
        "entity": "payin_deposit_detail",
        "accessor": "PayinDepositDetail",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            },
            {
                "name": "transfer_id",
                "wire": "transferId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "payinBank": {
                "bankName": "Wise Europe SA/NV",
                "bankAddress": {
                    "country": "BE",
                    "firstLine": "Rue Du Trône 100, box 3",
                    "postCode": "1050",
                    "city": "Brussels",
                    "state": null,
                    "phone": "+32 472 123 456"
                }
            },
            "payinBankAccount": {
                "currency": "EUR",
                "bankAccountType": "RECIPIENT",
                "details": [
                    {
                        "type": "iban",
                        "label": "IBAN",
                        "value": "BE11111111111111",
                        "rawValue": "BE11111111111111",
                        "formattedValue": "BE11 1111 1111 1111",
                        "description": "International Bank Account Number"
                    }
                ]
            },
            "wiseInformation": {
                "localCompanyName": "Wise Europe SA",
                "localAddress": {
                    "country": "BE",
                    "firstLine": "Rue du Trône 100, 3rd floor",
                    "postCode": "1050",
                    "city": "Brussels",
                    "state": null,
                    "phone": null
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "list",
        "method": "GET",
        "path": "/transfers/{transferId}/payments",
        "args": [
            {
                "name": "transfer_id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 50000000,
                "method": "BANK_TRANSFER",
                "pricingVariant": null,
                "amount": 1000,
                "currency": "GBP",
                "timeCreated": "2020-01-01T12:30:15.000Z",
                "timeUpdated": "2020-01-01T12:30:15.000Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "payment_initiation",
        "accessor": "PaymentInitiation",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations",
        "args": [
            {
                "name": "batch_group_id",
                "wire": "batchGroupId",
                "value": "54a6bc09-cef9-49a8-9041-f1f0c654cd88"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 12345,
            "batchGroupId": "068e186d-9632-4937-b753-af3e53f4d0b0",
            "reference": "B1234567",
            "userId": 33333333,
            "profileId": 44444444,
            "type": "DIRECT_DEBIT",
            "status": "NEW",
            "accountId": 1,
            "transferId": 2149510998,
            "createdTime": "2022-01-01T19:51:41.423404Z"
        },
        "idField": "id"
    },
    {
        "entity": "payment_initiation",
        "accessor": "PaymentInitiation",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations/{paymentInitiationId}",
        "args": [
            {
                "name": "batch_group_id",
                "wire": "batchGroupId",
                "value": "54a6bc09-cef9-49a8-9041-f1f0c654cd88"
            },
            {
                "name": "id",
                "wire": "paymentInitiationId",
                "value": 12345
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 12345678
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 12345,
            "batchGroupId": "068e186d-9632-4937-b753-af3e53f4d0b0",
            "reference": "B1234567",
            "userId": 33333333,
            "profileId": 44444444,
            "type": "DIRECT_DEBIT",
            "status": "NEW",
            "accountId": 1,
            "transferId": 2149510998,
            "createdTime": "2022-01-01T19:51:41.423404Z"
        },
        "idField": "id"
    },
    {
        "entity": "payment_instrument",
        "accessor": "PaymentInstrument",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/payment-instruments",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "accountNumber": "x",
            "accountOwnerDetails": {
                "city": "x",
                "companyName": "x",
                "country": "x",
                "firstLine": "x",
                "postCode": "x",
                "state": "x"
            },
            "bankCode": "x",
            "bankName": "x",
            "branchCode": "x",
            "disconnectReason": "x",
            "id": "x",
            "reference": "x",
            "status": "x",
            "type": "x"
        },
        "idField": "id"
    },
    {
        "entity": "payment_instrument",
        "accessor": "PaymentInstrument",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins",
        "action": "payin",
        "args": [
            {
                "name": "id",
                "wire": "paymentInstrumentId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "payins": [
                {
                    "amount": 1,
                    "currency": "x",
                    "failureReason": "x",
                    "id": "x",
                    "payinSessionId": "x",
                    "paymentInstrumentId": "x",
                    "reference": "x",
                    "status": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "payment_instrument",
        "accessor": "PaymentInstrument",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/payment-instruments/{paymentInstrumentId}",
        "args": [
            {
                "name": "id",
                "wire": "paymentInstrumentId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "accountNumber": "x",
            "accountOwnerDetails": {
                "city": "x",
                "companyName": "x",
                "country": "x",
                "firstLine": "x",
                "postCode": "x",
                "state": "x"
            },
            "bankCode": "x",
            "bankName": "x",
            "branchCode": "x",
            "disconnectReason": "x",
            "id": "x",
            "reference": "x",
            "status": "x",
            "type": "x"
        },
        "idField": "id"
    },
    {
        "entity": "payment_instrument_details_resource",
        "accessor": "PaymentInstrumentDetailsResource",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation",
        "action": "manual-confirmation",
        "args": [
            {
                "name": "id",
                "wire": "paymentInstrumentId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "accountNumber": "x",
            "accountOwnerDetails": {
                "city": "x",
                "companyName": "x",
                "country": "x",
                "firstLine": "x",
                "postCode": "x",
                "state": "x"
            },
            "bankCode": "x",
            "bankName": "x",
            "branchCode": "x",
            "disconnectReason": "x",
            "id": "x",
            "reference": "x",
            "status": "x",
            "type": "x"
        },
        "idField": "id"
    },
    {
        "entity": "payment_intent",
        "accessor": "PaymentIntent",
        "op": "load",
        "method": "GET",
        "path": "/settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}",
        "args": [
            {
                "name": "allocation_id",
                "wire": "allocationId",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "id",
                "wire": "paymentIntentId",
                "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            "allocationId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            "partnerEntityId": "PARTNER-001",
            "profileId": "12345678",
            "recipientType": "SELLER",
            "sourceAmount": 100,
            "sourceCurrency": "EUR",
            "targetAmount": 85,
            "targetCurrency": "GBP",
            "allocationType": "CREDIT",
            "paymentReference": "REF-001",
            "reason": "Invoice payment",
            "state": "NEW",
            "fundingSource": "WISE_COLLECTION_ACCOUNT",
            "createdAt": "2026-07-10T10:35:16.000Z",
            "updatedAt": "2026-07-10T10:45:41.000Z"
        },
        "idField": "id"
    },
    {
        "entity": "phone_number",
        "accessor": "PhoneNumber",
        "op": "create",
        "method": "POST",
        "path": "/application/users/{userId}/phone-numbers",
        "args": [
            {
                "name": "user_id",
                "wire": "userId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1230944,
            "phoneNumber": "+6588888888",
            "type": "PRIMARY",
            "verified": true,
            "clientId": "clientId"
        },
        "idField": "id"
    },
    {
        "entity": "production",
        "accessor": "Production",
        "op": "load",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/production",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "READY",
            "kioskId": null,
            "occurredAt": "2024-01-01T12:24:56.124Z",
            "errorCode": null,
            "description": "Card ready for production"
        },
        "idField": "id"
    },
    {
        "entity": "production",
        "accessor": "Production",
        "op": "update",
        "method": "PUT",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/production",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "IN_PROGRESS",
            "kioskId": "WIS00001",
            "occurredAt": "2024-01-01T12:24:56.121Z"
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/pin",
        "action": "pin",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "accept_encoding",
                "wire": "Accept-Encoding",
                "value": "identity"
            },
            {
                "name": "content_encoding",
                "wire": "Content-Encoding",
                "value": "identity"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "xtw_jose_method",
                "wire": "X-tw-jose-method",
                "value": "jwe"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/verification-status/bank-transfer",
        "action": "verification_status_bank_transfer",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "source_currency": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "source_currencies"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "routes": [
                {
                    "source_currency": "GBP",
                    "maximum_entitled_amount": 100000,
                    "current_status": "verified"
                },
                {
                    "source_currency": "USD",
                    "maximum_entitled_amount": 0,
                    "current_status": "not_verified"
                },
                {
                    "source_currency": "EUR",
                    "maximum_entitled_amount": 10000,
                    "current_status": "not_verified"
                }
            ],
            "request_id": "e66da5f6-2456-403c-bfcb-908885ee1a61"
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/excess-money-account",
        "action": "excess_money_account",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "userProfileId": 12321323,
            "recipientId": 148393305
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/update-window",
        "action": "update_window",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/verification-documents",
        "action": "verification_document",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errorMessage": null,
            "success": true
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/verification-status/upload-document",
        "action": "verification_status_upload_document",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "create",
        "method": "POST",
        "path": "/profiles/personal-profile",
        "action": "personal_profile",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "xidempotence_uuid",
                "wire": "X-idempotence-uuid",
                "value": "h2"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 30000001,
            "type": "PERSONAL",
            "details": {
                "firstName": "Oliver",
                "lastName": "Wilson",
                "preferredName": "Olivia",
                "firstNameInKana": null,
                "lastNameInKana": null,
                "address": {
                    "addressFirstLine": "50 Sunflower Ave",
                    "city": "Phoenix",
                    "countryIso3Code": "usa",
                    "postCode": "10025",
                    "stateCode": "AZ"
                },
                "nationality": "usa",
                "dateOfBirth": "1977-07-01",
                "externalCustomerId": "12345-oliver-wilson",
                "contactDetails": {
                    "email": "o.wilson@example.com",
                    "phoneNumber": "+3725064992"
                },
                "occupations": [
                    {
                        "code": "Software Engineer",
                        "format": "FREE_FORM"
                    }
                ],
                "localizedInformation": [
                    {}
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "list",
        "method": "GET",
        "path": "/profiles",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "PERSONAL",
                "id": 14575282,
                "publicId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "userId": 9889627,
                "address": {
                    "id": 36086782,
                    "addressFirstLine": "24 Willow Creek Lane",
                    "city": "Bristol",
                    "countryIso2Code": "GB",
                    "countryIso3Code": "gbr",
                    "postCode": "BS1 6AE",
                    "stateCode": null
                },
                "email": "sarah.jenkins@example.com",
                "createdAt": "2023-01-15T10:30:00",
                "updatedAt": "2025-06-18T14:20:00",
                "avatar": "https://example.com/avatars/sarah_jenkins.png",
                "currentState": "VISIBLE",
                "contactDetails": {
                    "email": "sarah.contact@example.com",
                    "phoneNumber": "+447700900123"
                },
                "firstName": "Sarah",
                "lastName": "Jenkins",
                "preferredName": "Sal",
                "dateOfBirth": "1985-05-20",
                "phoneNumber": "+447700900456",
                "secondaryAddresses": [],
                "fullName": "Sarah Jenkins"
            },
            {
                "type": "BUSINESS",
                "id": 14599371,
                "publicId": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
                "userId": 9889627,
                "address": {
                    "id": 36152772,
                    "addressFirstLine": "15 Tech Hub Studios",
                    "city": "Manchester",
                    "countryIso2Code": "GB",
                    "countryIso3Code": "gbr",
                    "postCode": "M1 7JA",
                    "stateCode": null
                },
                "email": "info@innovate-solutions.co.uk",
                "createdAt": "2024-03-10T09:00:00",
                "updatedAt": "2025-06-18T14:22:00",
                "contactDetails": {
                    "email": "contact@innovate-solutions.co.uk",
                    "phoneNumber": "+441617891234"
                },
                "businessName": "Innovate Solutions Ltd",
                "registrationNumber": "SC1234567890ABCD",
                "descriptionOfBusiness": "IT_DEVELOPMENT",
                "webpage": "https://www.innovate-solutions.co.uk",
                "companyType": "LIMITED_COMPANY",
                "businessFreeFormDescription": "We create cutting-edge software for businesses.",
                "firstLevelCategory": "CONSULTING_IT_BUSINESS_SERVICES",
                "secondLevelCategory": "IT_DEVELOPMENT",
                "industryCategories": [
                    "SOFTWARE_DEVELOPMENT_PUBLISHING",
                    "IT_CONSULTANCY_TECHNICAL_SUPPORT_SERVICES"
                ],
                "operationalAddresses": [
                    {
                        "id": 36152773,
                        "addressFirstLine": "Unit 5, Innovation Park",
                        "city": "Leeds",
                        "countryIso2Code": "GB",
                        "countryIso3Code": "gbr",
                        "postCode": "LS1 4YZ",
                        "stateCode": null
                    }
                ],
                "fullName": "Innovate Solutions Ltd"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/balance-capacity",
        "action": "balance_capacity",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "currency": "SGD"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "currency"
        ],
        "queryArgs": [
            {
                "name": "currency",
                "wire": "currency"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "hasLimit": true,
            "depositLimit": {
                "amount": 2000,
                "currency": "SGD"
            }
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "type": "PERSONAL",
            "id": 14575282,
            "publicId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "userId": 9889627,
            "address": {
                "id": 36086782,
                "addressFirstLine": "24 Willow Creek Lane",
                "city": "Bristol",
                "countryIso2Code": "GB",
                "countryIso3Code": "gbr",
                "postCode": "BS1 6AE",
                "stateCode": null
            },
            "email": "sarah.jenkins@example.com",
            "createdAt": "2023-01-15T10:30:00",
            "updatedAt": "2025-06-18T14:20:00",
            "avatar": null,
            "currentState": "VISIBLE",
            "contactDetails": {
                "email": "sarah.contact@example.com",
                "phoneNumber": "+447700900123"
            },
            "firstName": "Sarah",
            "lastName": "Jenkins",
            "preferredName": "Sal",
            "dateOfBirth": "1985-05-20",
            "phoneNumber": "+447700900456",
            "secondaryAddresses": [
                {
                    "id": 36086782,
                    "addressFirstLine": "24 Willow Creek Lane",
                    "city": "Bristol",
                    "countryIso2Code": "GB",
                    "countryIso3Code": "gbr",
                    "postCode": "BS1 6AE",
                    "stateCode": null
                }
            ],
            "fullName": "Sarah Jenkins"
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/business-profile/business-representative",
        "action": "business_profile_business_representative",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/multi-currency-account",
        "action": "multi_currency_account",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "profileId": 33333333,
            "recipientId": 12345678,
            "creationTime": "2020-05-20T14:43:16.658Z",
            "modificationTime": "2020-05-20T14:43:16.658Z",
            "active": true,
            "eligible": true
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/pin",
        "action": "pin",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/update-window",
        "action": "update_window",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "update",
        "method": "PUT",
        "path": "/profiles/{profileId}/business-profile/business-representative",
        "action": "business_profile_business_representative",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "update",
        "method": "PUT",
        "path": "/profiles/{profileId}/personal-profile",
        "action": "personal_profile",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "update",
        "method": "PUT",
        "path": "/profiles/{profileId}/verification-documents",
        "action": "verification_document",
        "args": [
            {
                "name": "id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errorMessage": null,
            "success": true
        },
        "idField": "id"
    },
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/quotes",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 101
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf",
            "sourceCurrency": "GBP",
            "targetCurrency": "USD",
            "sourceAmount": 100,
            "targetAmount": 129.24,
            "payOut": "BANK_TRANSFER",
            "preferredPayIn": "BANK_TRANSFER",
            "rate": 1.30445,
            "createdTime": "2019-04-05T13:18:58Z",
            "user": 55,
            "profile": 101,
            "rateType": "FIXED",
            "rateExpirationTime": "2019-04-08T13:18:57Z",
            "guaranteedTargetAmountAllowed": true,
            "targetAmountAllowed": true,
            "guaranteedTargetAmount": false,
            "providedAmountType": "SOURCE",
            "pricingConfiguration": {
                "fee": {
                    "type": "OVERRIDE",
                    "variable": 0.011,
                    "fixed": 15.42
                }
            },
            "paymentOptions": [
                {
                    "disabled": false,
                    "estimatedDelivery": "2019-04-08T12:30:00Z",
                    "formattedEstimatedDelivery": "by Apr 8",
                    "estimatedDeliveryDelays": [
                        {
                            "reason": "sample reason"
                        }
                    ],
                    "fee": {
                        "transferwise": 3.04,
                        "payIn": 0,
                        "discount": 2.27,
                        "partner": 0,
                        "total": 0.77
                    },
                    "price": {
                        "priceSetId": 238,
                        "total": {
                            "type": "TOTAL",
                            "label": "Total fees",
                            "value": {
                                "amount": 0.77,
                                "currency": "GBP",
                                "label": "0.77 GBP"
                            },
                            "explanation": {}
                        },
                        "items": [
                            {
                                "id": "x",
                                "type": "FEE",
                                "label": "fee",
                                "value": {},
                                "explanation": {}
                            }
                        ],
                        "deferredFee": {
                            "amount": 14.79,
                            "currency": "BRL"
                        },
                        "calculatedOn": {
                            "unroundedAmountToConvert": {
                                "amount": 179.97342,
                                "currency": "BRL"
                            }
                        }
                    },
                    "sourceAmount": 100,
                    "targetAmount": 129.24,
                    "sourceCurrency": "GBP",
                    "targetCurrency": "USD",
                    "payIn": "BANK_TRANSFER",
                    "payOut": "BANK_TRANSFER",
                    "allowedProfileTypes": [
                        "PERSONAL",
                        "BUSINESS"
                    ],
                    "payInProduct": "CHEAP",
                    "feePercentage": 0.0092,
                    "disabledReason": {
                        "code": "x",
                        "message": "x"
                    }
                }
            ],
            "status": "PENDING",
            "expirationTime": "2019-04-05T13:48:58Z",
            "notices": [
                {
                    "text": "You can have a maximum of 3 open transfers with a guaranteed rate. After that, they'll be transferred using the live rate. Complete or cancel your other transfers to regain the use of guaranteed rate.",
                    "link": null,
                    "type": "WARNING"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "create",
        "method": "POST",
        "path": "/quotes",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "id": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf",
            "sourceCurrency": "GBP",
            "targetCurrency": "USD",
            "sourceAmount": 100,
            "targetAmount": 129.24,
            "payOut": "BANK_TRANSFER",
            "preferredPayIn": "BANK_TRANSFER",
            "rate": 1.30445,
            "createdTime": "2019-04-05T13:18:58Z",
            "user": 55,
            "profile": 101,
            "rateType": "FIXED",
            "rateExpirationTime": "2019-04-08T13:18:57Z",
            "guaranteedTargetAmountAllowed": true,
            "targetAmountAllowed": true,
            "guaranteedTargetAmount": false,
            "providedAmountType": "SOURCE",
            "pricingConfiguration": {
                "fee": {
                    "type": "OVERRIDE",
                    "variable": 0.011,
                    "fixed": 15.42
                }
            },
            "paymentOptions": [
                {
                    "disabled": false,
                    "estimatedDelivery": "2019-04-08T12:30:00Z",
                    "formattedEstimatedDelivery": "by Apr 8",
                    "estimatedDeliveryDelays": [
                        {
                            "reason": "sample reason"
                        }
                    ],
                    "fee": {
                        "transferwise": 3.04,
                        "payIn": 0,
                        "discount": 2.27,
                        "partner": 0,
                        "total": 0.77
                    },
                    "price": {
                        "priceSetId": 238,
                        "total": {
                            "type": "TOTAL",
                            "label": "Total fees",
                            "value": {
                                "amount": 0.77,
                                "currency": "GBP",
                                "label": "0.77 GBP"
                            },
                            "explanation": {}
                        },
                        "items": [
                            {
                                "id": "x",
                                "type": "FEE",
                                "label": "fee",
                                "value": {},
                                "explanation": {}
                            }
                        ],
                        "deferredFee": {
                            "amount": 14.79,
                            "currency": "BRL"
                        },
                        "calculatedOn": {
                            "unroundedAmountToConvert": {
                                "amount": 179.97342,
                                "currency": "BRL"
                            }
                        }
                    },
                    "sourceAmount": 100,
                    "targetAmount": 129.24,
                    "sourceCurrency": "GBP",
                    "targetCurrency": "USD",
                    "payIn": "BANK_TRANSFER",
                    "payOut": "BANK_TRANSFER",
                    "allowedProfileTypes": [
                        "PERSONAL",
                        "BUSINESS"
                    ],
                    "payInProduct": "CHEAP",
                    "feePercentage": 0.0092,
                    "disabledReason": {
                        "code": "x",
                        "message": "x"
                    }
                }
            ],
            "status": "PENDING",
            "expirationTime": "2019-04-05T13:48:58Z",
            "notices": [
                {
                    "text": "You can have a maximum of 3 open transfers with a guaranteed rate. After that, they'll be transferred using the live rate. Complete or cancel your other transfers to regain the use of guaranteed rate.",
                    "link": null,
                    "type": "WARNING"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/quotes/{quoteId}",
        "args": [
            {
                "name": "id",
                "wire": "quoteId",
                "value": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 101
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf",
            "sourceCurrency": "GBP",
            "targetCurrency": "USD",
            "sourceAmount": 100,
            "targetAmount": 129.24,
            "payOut": "BANK_TRANSFER",
            "preferredPayIn": "BANK_TRANSFER",
            "rate": 1.30445,
            "createdTime": "2019-04-05T13:18:58Z",
            "user": 55,
            "profile": 101,
            "rateType": "FIXED",
            "rateExpirationTime": "2019-04-08T13:18:57Z",
            "guaranteedTargetAmountAllowed": true,
            "targetAmountAllowed": true,
            "guaranteedTargetAmount": false,
            "providedAmountType": "SOURCE",
            "pricingConfiguration": {
                "fee": {
                    "type": "OVERRIDE",
                    "variable": 0.011,
                    "fixed": 15.42
                }
            },
            "paymentOptions": [
                {
                    "disabled": false,
                    "estimatedDelivery": "2019-04-08T12:30:00Z",
                    "formattedEstimatedDelivery": "by Apr 8",
                    "estimatedDeliveryDelays": [
                        {
                            "reason": "sample reason"
                        }
                    ],
                    "fee": {
                        "transferwise": 3.04,
                        "payIn": 0,
                        "discount": 2.27,
                        "partner": 0,
                        "total": 0.77
                    },
                    "price": {
                        "priceSetId": 238,
                        "total": {
                            "type": "TOTAL",
                            "label": "Total fees",
                            "value": {
                                "amount": 0.77,
                                "currency": "GBP",
                                "label": "0.77 GBP"
                            },
                            "explanation": {}
                        },
                        "items": [
                            {
                                "id": "x",
                                "type": "FEE",
                                "label": "fee",
                                "value": {},
                                "explanation": {}
                            }
                        ],
                        "deferredFee": {
                            "amount": 14.79,
                            "currency": "BRL"
                        },
                        "calculatedOn": {
                            "unroundedAmountToConvert": {
                                "amount": 179.97342,
                                "currency": "BRL"
                            }
                        }
                    },
                    "sourceAmount": 100,
                    "targetAmount": 129.24,
                    "sourceCurrency": "GBP",
                    "targetCurrency": "USD",
                    "payIn": "BANK_TRANSFER",
                    "payOut": "BANK_TRANSFER",
                    "allowedProfileTypes": [
                        "PERSONAL",
                        "BUSINESS"
                    ],
                    "payInProduct": "CHEAP",
                    "feePercentage": 0.0092,
                    "disabledReason": {
                        "code": "x",
                        "message": "x"
                    }
                }
            ],
            "status": "PENDING",
            "expirationTime": "2019-04-05T13:48:58Z",
            "notices": [
                {
                    "text": "You can have a maximum of 3 open transfers with a guaranteed rate. After that, they'll be transferred using the live rate. Complete or cancel your other transfers to regain the use of guaranteed rate.",
                    "link": null,
                    "type": "WARNING"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "update",
        "method": "PATCH",
        "path": "/profiles/{profileId}/quotes/{quoteId}",
        "args": [
            {
                "name": "id",
                "wire": "quoteId",
                "value": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 101
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf",
            "sourceCurrency": "GBP",
            "targetCurrency": "USD",
            "sourceAmount": 100,
            "targetAmount": 129.24,
            "payOut": "BANK_TRANSFER",
            "preferredPayIn": "BANK_TRANSFER",
            "rate": 1.30445,
            "createdTime": "2019-04-05T13:18:58Z",
            "user": 55,
            "profile": 101,
            "rateType": "FIXED",
            "rateExpirationTime": "2019-04-08T13:18:57Z",
            "guaranteedTargetAmountAllowed": true,
            "targetAmountAllowed": true,
            "guaranteedTargetAmount": false,
            "providedAmountType": "SOURCE",
            "pricingConfiguration": {
                "fee": {
                    "type": "OVERRIDE",
                    "variable": 0.011,
                    "fixed": 15.42
                }
            },
            "paymentOptions": [
                {
                    "disabled": false,
                    "estimatedDelivery": "2019-04-08T12:30:00Z",
                    "formattedEstimatedDelivery": "by Apr 8",
                    "estimatedDeliveryDelays": [
                        {
                            "reason": "sample reason"
                        }
                    ],
                    "fee": {
                        "transferwise": 3.04,
                        "payIn": 0,
                        "discount": 2.27,
                        "partner": 0,
                        "total": 0.77
                    },
                    "price": {
                        "priceSetId": 238,
                        "total": {
                            "type": "TOTAL",
                            "label": "Total fees",
                            "value": {
                                "amount": 0.77,
                                "currency": "GBP",
                                "label": "0.77 GBP"
                            },
                            "explanation": {}
                        },
                        "items": [
                            {
                                "id": "x",
                                "type": "FEE",
                                "label": "fee",
                                "value": {},
                                "explanation": {}
                            }
                        ],
                        "deferredFee": {
                            "amount": 14.79,
                            "currency": "BRL"
                        },
                        "calculatedOn": {
                            "unroundedAmountToConvert": {
                                "amount": 179.97342,
                                "currency": "BRL"
                            }
                        }
                    },
                    "sourceAmount": 100,
                    "targetAmount": 129.24,
                    "sourceCurrency": "GBP",
                    "targetCurrency": "USD",
                    "payIn": "BANK_TRANSFER",
                    "payOut": "BANK_TRANSFER",
                    "allowedProfileTypes": [
                        "PERSONAL",
                        "BUSINESS"
                    ],
                    "payInProduct": "CHEAP",
                    "feePercentage": 0.0092,
                    "disabledReason": {
                        "code": "x",
                        "message": "x"
                    }
                }
            ],
            "status": "PENDING",
            "expirationTime": "2019-04-05T13:48:58Z",
            "notices": [
                {
                    "text": "You can have a maximum of 3 open transfers with a guaranteed rate. After that, they'll be transferred using the live rate. Complete or cancel your other transfers to regain the use of guaranteed rate.",
                    "link": null,
                    "type": "WARNING"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "rate",
        "accessor": "Rate",
        "op": "list",
        "method": "GET",
        "path": "/rates",
        "args": [],
        "select": {
            "from": "2019-02-13T14:53:01",
            "group": "day",
            "source": "EUR",
            "target": "USD",
            "time": "2019-02-13T14:53:01",
            "to": "2019-03-13T14:53:01"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "source",
            "target",
            "time",
            "from",
            "to",
            "group"
        ],
        "queryArgs": [
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "group",
                "wire": "group"
            },
            {
                "name": "source",
                "wire": "source"
            },
            {
                "name": "target",
                "wire": "target"
            },
            {
                "name": "time",
                "wire": "time"
            },
            {
                "name": "to",
                "wire": "to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "rate": 1.166,
                "source": "EUR",
                "target": "USD",
                "time": "2018-08-31T10:43:31+0000"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "create",
        "method": "POST",
        "path": "/accounts/{accountId}/quotes/{quoteId}/compatibility",
        "args": [
            {
                "name": "account_id",
                "wire": "accountId",
                "value": "p1"
            },
            {
                "name": "quote_id",
                "wire": "quoteId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "accountId": 40000000,
            "quoteId": "00000000-0000-0000-0000-000000000000",
            "confirmations": {
                "acceptedOutcomes": false,
                "acceptedAt": null,
                "quoteId": "00000000-0000-0000-0000-000000000000",
                "outcomes": [
                    {
                        "type": "NAME_MATCHING",
                        "outcome": "PARTIAL_FAILURE",
                        "requiresCustomerAcceptance": true,
                        "fieldsChecked": [
                            "name/fullName",
                            "details/accountNumber"
                        ],
                        "message": "The name entered is slightly different to the name on the account.",
                        "providedName": "John Doe",
                        "resolvedName": "Joe Doe",
                        "recommendedUpdates": [
                            {
                                "path": "name/fullName",
                                "value": "Joe Doe"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "create",
        "method": "POST",
        "path": "/accounts",
        "args": [],
        "select": {
            "refund": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "refund"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 40000000,
            "creatorId": 41000000,
            "profileId": 30000000,
            "name": {
                "fullName": "John Doe",
                "givenName": null,
                "familyName": null,
                "middleName": null,
                "patronymicName": null,
                "cannotHavePatronymicName": null
            },
            "currency": "GBP",
            "country": "GB",
            "type": "SortCode",
            "legalEntityType": "PERSON",
            "active": true,
            "details": {
                "reference": null,
                "sortCode": "040075",
                "accountNumber": "37778842",
                "hashedByLooseHashAlgorithm": "ad245621b974efa3ef870895c3wer419a3f01af18a8a5790b47645dba6304194"
            },
            "commonFieldMap": {
                "accountNumberField": "accountNumber",
                "bankCodeField": "sortCode"
            },
            "hash": "666ef880f8aa6113fa112ba6531d3ed2c26dd9fgbd7de5136bfb827a6e800479",
            "accountSummary": "(04-00-75) 37778842",
            "longAccountSummary": "GBP account ending in 8842",
            "displayFields": [
                {
                    "key": "details/sortCode",
                    "label": "UK sort code",
                    "value": "04-00-75"
                },
                {
                    "key": "details/accountNumber",
                    "label": "Account number",
                    "value": "37778842"
                }
            ],
            "isInternal": false,
            "ownedByCustomer": false,
            "ultimateBeneficiary": {
                "accountNumber": "37778842",
                "bankName": "Wise Payments Limited",
                "bankCode": "026073150",
                "name": {
                    "fullName": "John Doe"
                },
                "address": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                },
                "bankAddress": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                }
            },
            "confirmations": {
                "acceptedOutcomes": false,
                "acceptedAt": null,
                "quoteId": null,
                "outcomes": [
                    {
                        "type": "NAME_MATCHING",
                        "timestamp": "2024-11-11T23:58:11.105916743Z",
                        "outcome": "PARTIAL_FAILURE",
                        "requiresCustomerAcceptance": true,
                        "fieldsChecked": [
                            "name/fullName",
                            "details/accountNumber"
                        ],
                        "providedName": "John Doe",
                        "resolvedName": "Joe Doe",
                        "message": "The name entered is slightly different to the name on the account.",
                        "recommendedUpdates": [
                            {
                                "path": "name/fullName",
                                "value": "Joe Doe"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "list",
        "method": "GET",
        "path": "/accounts",
        "args": [],
        "select": {
            "active": "v1",
            "creator_id": "v1",
            "currency": "v1",
            "owned_by_customer": "v1",
            "profile": "v1",
            "profile_id": "v1",
            "seek_position": "v1",
            "size": "v1",
            "sort": "id,asc",
            "type": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "creatorId",
            "profileId",
            "profile",
            "currency",
            "active",
            "type",
            "ownedByCustomer",
            "size",
            "seekPosition",
            "sort"
        ],
        "queryArgs": [
            {
                "name": "active",
                "wire": "active"
            },
            {
                "name": "creator_id",
                "wire": "creatorId"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "owned_by_customer",
                "wire": "ownedByCustomer"
            },
            {
                "name": "profile",
                "wire": "profile"
            },
            {
                "name": "profile_id",
                "wire": "profileId"
            },
            {
                "name": "seek_position",
                "wire": "seekPosition"
            },
            {
                "name": "size",
                "wire": "size"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "type",
                "wire": "type"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "content": [
                {
                    "id": 40000000,
                    "creatorId": 41000000,
                    "profileId": 30000000,
                    "name": {
                        "fullName": "John Doe",
                        "givenName": null,
                        "familyName": null,
                        "middleName": null,
                        "patronymicName": null,
                        "cannotHavePatronymicName": null
                    },
                    "currency": "GBP",
                    "country": "GB",
                    "type": "SortCode",
                    "legalEntityType": "PERSON",
                    "active": true,
                    "details": {
                        "reference": null,
                        "sortCode": "040075",
                        "accountNumber": "37778842",
                        "hashedByLooseHashAlgorithm": "ad245621b974efa3ef870895c3wer419a3f01af18a8a5790b47645dba6304194"
                    },
                    "commonFieldMap": {
                        "accountNumberField": "accountNumber",
                        "bankCodeField": "sortCode"
                    },
                    "hash": "666ef880f8aa6113fa112ba6531d3ed2c26dd9fgbd7de5136bfb827a6e800479",
                    "accountSummary": "(04-00-75) 37778842",
                    "longAccountSummary": "GBP account ending in 8842",
                    "displayFields": [
                        {
                            "key": "details/sortCode",
                            "label": "UK sort code",
                            "value": "04-00-75"
                        },
                        {
                            "key": "details/accountNumber",
                            "label": "Account number",
                            "value": "37778842"
                        }
                    ],
                    "isInternal": false,
                    "ownedByCustomer": false
                }
            ],
            "seekPositionForNext": 40000001,
            "seekPositionForCurrent": 40000000,
            "sort": {
                "empty": true,
                "sorted": false,
                "unsorted": true
            },
            "size": 20
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "load",
        "method": "GET",
        "path": "/accounts/{accountId}",
        "args": [
            {
                "name": "account_id",
                "wire": "accountId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 40000000,
            "creatorId": 41000000,
            "profileId": 30000000,
            "name": {
                "fullName": "John Doe",
                "givenName": null,
                "familyName": null,
                "middleName": null,
                "patronymicName": null,
                "cannotHavePatronymicName": null
            },
            "currency": "GBP",
            "country": "GB",
            "type": "SortCode",
            "legalEntityType": "PERSON",
            "active": true,
            "details": {
                "reference": null,
                "sortCode": "040075",
                "accountNumber": "37778842",
                "hashedByLooseHashAlgorithm": "ad245621b974efa3ef870895c3wer419a3f01af18a8a5790b47645dba6304194"
            },
            "commonFieldMap": {
                "accountNumberField": "accountNumber",
                "bankCodeField": "sortCode"
            },
            "hash": "666ef880f8aa6113fa112ba6531d3ed2c26dd9fgbd7de5136bfb827a6e800479",
            "accountSummary": "(04-00-75) 37778842",
            "longAccountSummary": "GBP account ending in 8842",
            "displayFields": [
                {
                    "key": "details/sortCode",
                    "label": "UK sort code",
                    "value": "04-00-75"
                },
                {
                    "key": "details/accountNumber",
                    "label": "Account number",
                    "value": "37778842"
                }
            ],
            "isInternal": false,
            "ownedByCustomer": false,
            "ultimateBeneficiary": {
                "accountNumber": "37778842",
                "bankName": "Wise Payments Limited",
                "bankCode": "026073150",
                "name": {
                    "fullName": "John Doe"
                },
                "address": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                },
                "bankAddress": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                }
            },
            "confirmations": {
                "acceptedOutcomes": false,
                "acceptedAt": null,
                "quoteId": null,
                "outcomes": [
                    {
                        "type": "NAME_MATCHING",
                        "timestamp": "2024-11-11T23:58:11.105916743Z",
                        "outcome": "PARTIAL_FAILURE",
                        "requiresCustomerAcceptance": true,
                        "fieldsChecked": [
                            "name/fullName",
                            "details/accountNumber"
                        ],
                        "providedName": "John Doe",
                        "resolvedName": "Joe Doe",
                        "message": "The name entered is slightly different to the name on the account.",
                        "recommendedUpdates": [
                            {
                                "path": "name/fullName",
                                "value": "Joe Doe"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "remove",
        "method": "DELETE",
        "path": "/accounts/{accountId}",
        "args": [
            {
                "name": "account_id",
                "wire": "accountId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 40000000,
            "creatorId": 41000000,
            "profileId": 30000000,
            "name": {
                "fullName": "John Doe",
                "givenName": null,
                "familyName": null,
                "middleName": null,
                "patronymicName": null,
                "cannotHavePatronymicName": null
            },
            "currency": "GBP",
            "country": "GB",
            "type": "SortCode",
            "legalEntityType": "PERSON",
            "active": true,
            "details": {
                "reference": null,
                "sortCode": "040075",
                "accountNumber": "37778842",
                "hashedByLooseHashAlgorithm": "ad245621b974efa3ef870895c3wer419a3f01af18a8a5790b47645dba6304194"
            },
            "commonFieldMap": {
                "accountNumberField": "accountNumber",
                "bankCodeField": "sortCode"
            },
            "hash": "666ef880f8aa6113fa112ba6531d3ed2c26dd9fgbd7de5136bfb827a6e800479",
            "accountSummary": "(04-00-75) 37778842",
            "longAccountSummary": "GBP account ending in 8842",
            "displayFields": [
                {
                    "key": "details/sortCode",
                    "label": "UK sort code",
                    "value": "04-00-75"
                },
                {
                    "key": "details/accountNumber",
                    "label": "Account number",
                    "value": "37778842"
                }
            ],
            "isInternal": false,
            "ownedByCustomer": false,
            "ultimateBeneficiary": {
                "accountNumber": "37778842",
                "bankName": "Wise Payments Limited",
                "bankCode": "026073150",
                "name": {
                    "fullName": "John Doe"
                },
                "address": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                },
                "bankAddress": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                }
            },
            "confirmations": {
                "acceptedOutcomes": false,
                "acceptedAt": null,
                "quoteId": null,
                "outcomes": [
                    {
                        "type": "NAME_MATCHING",
                        "timestamp": "2024-11-11T23:58:11.105916743Z",
                        "outcome": "PARTIAL_FAILURE",
                        "requiresCustomerAcceptance": true,
                        "fieldsChecked": [
                            "name/fullName",
                            "details/accountNumber"
                        ],
                        "providedName": "John Doe",
                        "resolvedName": "Joe Doe",
                        "message": "The name entered is slightly different to the name on the account.",
                        "recommendedUpdates": [
                            {
                                "path": "name/fullName",
                                "value": "Joe Doe"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "recipient",
        "accessor": "Recipient",
        "op": "update",
        "method": "PATCH",
        "path": "/accounts/{accountId}/confirmations",
        "args": [
            {
                "name": "account_id",
                "wire": "accountId",
                "value": "p1"
            }
        ],
        "select": {
            "quote_id": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "quoteId"
        ],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 40000000,
            "creatorId": 41000000,
            "profileId": 30000000,
            "name": {
                "fullName": "John Doe",
                "givenName": null,
                "familyName": null,
                "middleName": null,
                "patronymicName": null,
                "cannotHavePatronymicName": null
            },
            "currency": "GBP",
            "country": "GB",
            "type": "SortCode",
            "legalEntityType": "PERSON",
            "active": true,
            "details": {
                "reference": null,
                "sortCode": "040075",
                "accountNumber": "37778842",
                "hashedByLooseHashAlgorithm": "ad245621b974efa3ef870895c3wer419a3f01af18a8a5790b47645dba6304194"
            },
            "commonFieldMap": {
                "accountNumberField": "accountNumber",
                "bankCodeField": "sortCode"
            },
            "hash": "666ef880f8aa6113fa112ba6531d3ed2c26dd9fgbd7de5136bfb827a6e800479",
            "accountSummary": "(04-00-75) 37778842",
            "longAccountSummary": "GBP account ending in 8842",
            "displayFields": [
                {
                    "key": "details/sortCode",
                    "label": "UK sort code",
                    "value": "04-00-75"
                },
                {
                    "key": "details/accountNumber",
                    "label": "Account number",
                    "value": "37778842"
                }
            ],
            "isInternal": false,
            "ownedByCustomer": false,
            "ultimateBeneficiary": {
                "accountNumber": "37778842",
                "bankName": "Wise Payments Limited",
                "bankCode": "026073150",
                "name": {
                    "fullName": "John Doe"
                },
                "address": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                },
                "bankAddress": {
                    "country": "US",
                    "firstLine": "x",
                    "postCode": "x",
                    "city": "x",
                    "state": "x"
                }
            },
            "confirmations": {
                "acceptedOutcomes": false,
                "acceptedAt": null,
                "quoteId": null,
                "outcomes": [
                    {
                        "type": "NAME_MATCHING",
                        "timestamp": "2024-11-11T23:58:11.105916743Z",
                        "outcome": "PARTIAL_FAILURE",
                        "requiresCustomerAcceptance": true,
                        "fieldsChecked": [
                            "name/fullName",
                            "details/accountNumber"
                        ],
                        "providedName": "John Doe",
                        "resolvedName": "Joe Doe",
                        "message": "The name entered is slightly different to the name on the account.",
                        "recommendedUpdates": [
                            {
                                "path": "name/fullName",
                                "value": "Joe Doe"
                            }
                        ]
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "create",
        "method": "POST",
        "path": "/spend/applications/{clientId}/spend-controls/rules",
        "args": [
            {
                "name": "application_id",
                "wire": "clientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 123,
            "description": "my authorisation rule",
            "type": "MCC",
            "operation": "BLOCK",
            "values": [
                "1234",
                "5678"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "list",
        "method": "GET",
        "path": "/spend/applications/{clientId}/spend-controls/rules",
        "args": [
            {
                "name": "application_id",
                "wire": "clientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "description": "Blacklist gambling MCCs",
                "type": "MCC",
                "operation": "BLOCK",
                "values": [
                    "7801",
                    "7802",
                    "7995"
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "saml",
        "accessor": "Saml",
        "op": "create",
        "method": "POST",
        "path": "/login/saml2/sso",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "saml",
        "accessor": "Saml",
        "op": "load",
        "method": "GET",
        "path": "/saml2/authenticate/{registrationId}",
        "args": [
            {
                "name": "registration_id",
                "wire": "registrationId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "saml",
        "accessor": "Saml",
        "op": "load",
        "method": "GET",
        "path": "/saml2/metadata",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/samlmetadata+xml"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "sca_device_fingerprint",
        "accessor": "ScaDeviceFingerprint",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/device-fingerprints",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "accept_encoding",
                "wire": "Accept-Encoding",
                "value": "identity"
            },
            {
                "name": "content_encoding",
                "wire": "Content-Encoding",
                "value": "identity"
            },
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "xtw_jose_method",
                "wire": "X-tw-jose-method",
                "value": "jwe"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "deviceFingerprintId": "636a5514-aa86-4719-8700-e9a9a0ae7ea7",
            "createdAt": "2025-05-24T07:27:58.273205554Z"
        },
        "idField": "id"
    },
    {
        "entity": "sca_device_fingerprint",
        "accessor": "ScaDeviceFingerprint",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/device-fingerprints/{deviceFingerprintId}",
        "args": [
            {
                "name": "id",
                "wire": "deviceFingerprintId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "sca_facemap",
        "accessor": "ScaFacemap",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/facemaps",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "sca_facemap",
        "accessor": "ScaFacemap",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/facemaps",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "sca_otp",
        "accessor": "ScaOtp",
        "op": "remove",
        "method": "DELETE",
        "path": "/application/users/{userId}/phone-numbers/{phoneNumberId}",
        "args": [
            {
                "name": "phone_number_id",
                "wire": "phoneNumberId",
                "value": "p1"
            },
            {
                "name": "user_id",
                "wire": "userId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "sca_session",
        "accessor": "ScaSession",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/sca-sessions/authorise",
        "action": "authorise",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "oneTimeTokenProperties": {
                "oneTimeToken": "5932d5b5-ec13-452f-8688-308feade7834",
                "challenges": [
                    {
                        "primaryChallenge": {
                            "type": "PIN"
                        },
                        "passed": false
                    }
                ],
                "validity": 3600
            }
        },
        "idField": "id"
    },
    {
        "entity": "settlement_allocation_response_content",
        "accessor": "SettlementAllocationResponseContent",
        "op": "create",
        "method": "POST",
        "path": "/settlement/allocations",
        "action": "allocation",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            },
            {
                "name": "x_signature",
                "wire": "X-Signature",
                "value": "1023c8e2a19cc42260968ab2dcf1698e8344a2939ac97f686d21aacb650273e2"
            },
            {
                "name": "x_signature_timestamp",
                "wire": "X-Signature-Timestamp",
                "value": "1700000000"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 202,
        "sample": {
            "id": "x",
            "expectedTotalAmount": 10000,
            "currency": "USD",
            "state": "NEW",
            "paymentReference": "PAY-2024-001234",
            "createdAt": "2026-01-01T00:00:00Z",
            "updatedAt": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "settlement_allocation_response_content",
        "accessor": "SettlementAllocationResponseContent",
        "op": "load",
        "method": "GET",
        "path": "/settlement/allocations/{allocationId}",
        "args": [
            {
                "name": "allocation_id",
                "wire": "allocationId",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "select": {
            "include_payment_intent": "v1",
            "page_size": 20,
            "page_token": "abc123"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "includePaymentIntents",
            "pageToken",
            "pageSize"
        ],
        "queryArgs": [
            {
                "name": "include_payment_intent",
                "wire": "includePaymentIntents"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "page_token",
                "wire": "pageToken"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            "expectedTotalAmount": 1000.5,
            "currency": "EUR",
            "state": "MATCHED",
            "paymentReference": "PAY-123456",
            "createdAt": "2026-07-10T10:30:16.000Z",
            "updatedAt": "2026-07-10T11:00:41.000Z",
            "paymentIntents": [
                {
                    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                    "allocationId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    "partnerEntityId": "PARTNER-001",
                    "profileId": "12345678",
                    "recipientType": "SELLER",
                    "sourceAmount": 100,
                    "sourceCurrency": "EUR",
                    "targetAmount": 85,
                    "targetCurrency": "GBP",
                    "allocationType": "CREDIT",
                    "paymentReference": "REF-001",
                    "reason": "Invoice payment",
                    "state": "NEW",
                    "fundingSource": "WISE_COLLECTION_ACCOUNT",
                    "createdAt": "2026-07-10T10:35:41.147522",
                    "updatedAt": "2026-07-10T10:45:41.147522"
                }
            ],
            "nextPageToken": "def456"
        },
        "idField": "id"
    },
    {
        "entity": "simulation",
        "accessor": "Simulation",
        "op": "create",
        "method": "POST",
        "path": "/simulation/transfers/{transferId}/payout-failure",
        "args": [
            {
                "name": "transfer_id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "failure_reason_code": "WRONG_ID_NUMBER",
            "failure_description": "Invalid recipient's ID document number",
            "occurred_at": "2023-08-10T10:17:23.123Z"
        },
        "idField": "id"
    },
    {
        "entity": "simulation",
        "accessor": "Simulation",
        "op": "create",
        "method": "POST",
        "path": "/simulation/sanction-cases",
        "action": "sanction_case",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "eventId": "550e8400-e29b-41d4-a716-446655440001",
            "caseId": 42
        },
        "idField": "id"
    },
    {
        "entity": "simulation",
        "accessor": "Simulation",
        "op": "create",
        "method": "POST",
        "path": "/simulation/verify-profile",
        "action": "verify_profile",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "simulation",
        "accessor": "Simulation",
        "op": "list",
        "method": "GET",
        "path": "/simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions",
        "args": [
            {
                "name": "card_token",
                "wire": "cardToken",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {
            "limit": 10
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "transactionId": 5028,
                "creationTime": 1723600773.748887
            },
            {
                "transactionId": 5027,
                "creationTime": 1723600659.095692
            },
            {
                "transactionId": 5026,
                "creationTime": 1723600648.133955
            }
        ],
        "idField": "id"
    },
    {
        "entity": "simulation",
        "accessor": "Simulation",
        "op": "list",
        "method": "GET",
        "path": "/simulation/profiles/{profileId}/kyc-reviews/{kycReviewId}/requirements",
        "args": [
            {
                "name": "kyc_review_id",
                "wire": "kycReviewId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "requirements": [
                {
                    "key": "ID_DOCUMENT_WITH_LIVENESS",
                    "state": "IN_REVIEW",
                    "description": null
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "simulation",
        "accessor": "Simulation",
        "op": "load",
        "method": "GET",
        "path": "/simulation/transfers/{transferId}/{status}",
        "args": [
            {
                "name": "status",
                "wire": "status",
                "value": "p1"
            },
            {
                "name": "transfer_id",
                "wire": "transferId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 15574445,
            "user": 294205,
            "targetAccount": 7993919,
            "sourceAccount": null,
            "quote": 113379,
            "status": "processing",
            "reference": "good times",
            "rate": 1.2151,
            "created": "2017-03-14 15:25:51",
            "business": null,
            "transferRequest": null,
            "details": {
                "reference": "good times"
            },
            "hasActiveIssues": false,
            "sourceValue": 1000,
            "sourceCurrency": "EUR",
            "targetValue": 895.32,
            "targetCurrency": "GBP"
        },
        "idField": "id"
    },
    {
        "entity": "spend_control",
        "accessor": "SpendControl",
        "op": "list",
        "method": "GET",
        "path": "/spend/applications/{clientId}/spend-controls/rules/applied",
        "args": [
            {
                "name": "application_id",
                "wire": "clientId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "ruleId": 123
            },
            {
                "ruleId": 456
            }
        ],
        "idField": "id"
    },
    {
        "entity": "spend_control",
        "accessor": "SpendControl",
        "op": "remove",
        "method": "DELETE",
        "path": "/spend/applications/{clientId}/spend-controls/rules/{ruleId}",
        "args": [
            {
                "name": "application_id",
                "wire": "clientId",
                "value": "p1"
            },
            {
                "name": "rule_id",
                "wire": "ruleId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "spend_limit",
        "accessor": "SpendLimit",
        "op": "list",
        "method": "GET",
        "path": "/spend/profiles/{profileId}/spend-limits",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "spendLimits": [
                {
                    "type": "PURCHASE",
                    "aggregateWindow": {
                        "daily": {
                            "value": {
                                "amount": 20000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 0,
                                "currency": "GBP"
                            },
                            "max": {
                                "amount": 30000,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T22:59:59.999999999Z"
                        },
                        "monthly": {
                            "value": {
                                "amount": 20000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 0,
                                "currency": "GBP"
                            },
                            "max": {
                                "amount": 30000,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T22:59:59.999999999Z"
                        }
                    }
                },
                {
                    "type": "ATM_WITHDRAWAL",
                    "aggregateWindow": {
                        "daily": {
                            "value": {
                                "amount": 1000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 0,
                                "currency": "GBP"
                            },
                            "max": {
                                "amount": 4000,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T22:59:59.999999999Z"
                        },
                        "monthly": {
                            "value": {
                                "amount": 1000,
                                "currency": "GBP"
                            },
                            "usage": {
                                "amount": 0,
                                "currency": "GBP"
                            },
                            "max": {
                                "amount": 4000,
                                "currency": "GBP"
                            },
                            "resetAt": "2023-07-31T22:59:59.999999999Z"
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "spend_limit",
        "accessor": "SpendLimit",
        "op": "remove",
        "method": "DELETE",
        "path": "/spend/profiles/{profileId}/cards/{cardToken}/spend-limits/{granularity}",
        "args": [
            {
                "name": "card_id",
                "wire": "cardToken",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "granularity",
                "value": "p2"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "spend_limit",
        "accessor": "SpendLimit",
        "op": "update",
        "method": "PATCH",
        "path": "/spend/profiles/{profileId}/spend-limits",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "create",
        "method": "POST",
        "path": "/applications/{clientKey}/subscriptions",
        "args": [
            {
                "name": "client_key",
                "wire": "clientKey",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "72195556-e5cb-495e-a010-b37a4f2a3043",
            "name": "Webhook Subscription #1",
            "trigger_on": "transfers#state-change",
            "delivery": {
                "version": "4.0.0",
                "url": "https://your.webhook.url/12345"
            },
            "scope": {
                "domain": "application",
                "id": "<your client key>"
            },
            "created_by": {
                "type": "application",
                "id": "<your client ID>"
            },
            "created_at": "2019-10-10T13:55:57Z"
        },
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/subscriptions",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "72195556-e5cb-495e-a010-b37a4f2a3043",
            "name": "Webhook Subscription #1",
            "delivery": {
                "version": "4.0.0",
                "url": "https://your.webhook.url/12345"
            },
            "trigger_on": "transfers#state-change",
            "scope": {
                "domain": "profile",
                "id": "<your profile ID>"
            },
            "created_by": {
                "type": "user",
                "id": "<your user ID>"
            },
            "created_at": "2019-10-10T13:55:57Z"
        },
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "list",
        "method": "GET",
        "path": "/applications/{clientKey}/subscriptions",
        "args": [
            {
                "name": "client_key",
                "wire": "clientKey",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": "72195556-e5cb-495e-a010-b37a4f2a3043",
                "name": "Webhook Subscription #1",
                "trigger_on": "transfers#state-change",
                "delivery": {
                    "version": "4.0.0",
                    "url": "https://your.webhook.url/12345"
                },
                "scope": {
                    "domain": "application",
                    "id": "<your client key>"
                },
                "created_by": {
                    "type": "application",
                    "id": "<your client ID>"
                },
                "created_at": "2019-10-10T13:55:57Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/subscriptions",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "e889e085-3677-4110-be26-3e9160ac9f25",
                "name": "#1 subscription",
                "delivery": {
                    "version": "2.0.0",
                    "url": "https://your.webhook.url/12345"
                },
                "trigger_on": "transfers#state-change",
                "scope": {
                    "domain": "profile",
                    "id": "<your profile ID>"
                },
                "created_by": {
                    "type": "user",
                    "id": "<your user ID>"
                }
            },
            {
                "id": "eabeb3f5-c134-4a1c-99e2-86a1163daf1b",
                "name": "#2 subscription",
                "delivery": {
                    "version": "2.0.0",
                    "url": "https://your.webhook.url/12345"
                },
                "trigger_on": "transfers#state-change",
                "scope": {
                    "domain": "profile",
                    "id": "<your profile ID>"
                },
                "created_by": {
                    "type": "user",
                    "id": "<your user ID>"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "load",
        "method": "GET",
        "path": "/applications/{clientKey}/subscriptions/{subscriptionId}",
        "args": [
            {
                "name": "client_key",
                "wire": "clientKey",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "subscriptionId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "72195556-e5cb-495e-a010-b37a4f2a3043",
            "name": "Webhook Subscription #1",
            "trigger_on": "transfers#state-change",
            "delivery": {
                "version": "4.0.0",
                "url": "https://your.webhook.url/12345"
            },
            "scope": {
                "domain": "application",
                "id": "<your client key>"
            },
            "created_by": {
                "type": "application",
                "id": "<your client ID>"
            },
            "created_at": "2019-10-10T13:55:57Z"
        },
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/subscriptions/{subscriptionId}",
        "args": [
            {
                "name": "id",
                "wire": "subscriptionId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "f215f353-35fd-405b-b27f-4fd603c905ed",
            "name": "Webhook Subscription #1",
            "delivery": {
                "version": "2.0.0",
                "url": "https://your.webhook.url/12345"
            },
            "trigger_on": "balances#credit",
            "scope": {
                "domain": "profile",
                "id": "<your profile ID>"
            },
            "created_by": {
                "type": "user",
                "id": "<your user ID>"
            },
            "created_at": "2008-09-15T15:53:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "remove",
        "method": "DELETE",
        "path": "/applications/{clientKey}/subscriptions/{subscriptionId}",
        "args": [
            {
                "name": "client_key",
                "wire": "clientKey",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "subscriptionId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "subscription",
        "accessor": "Subscription",
        "op": "remove",
        "method": "DELETE",
        "path": "/profiles/{profileId}/subscriptions/{subscriptionId}",
        "args": [
            {
                "name": "id",
                "wire": "subscriptionId",
                "value": "p1"
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "test_notification",
        "accessor": "TestNotification",
        "op": "create",
        "method": "POST",
        "path": "/applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications",
        "args": [
            {
                "name": "client_key",
                "wire": "clientKey",
                "value": "p1"
            },
            {
                "name": "subscription_id",
                "wire": "subscriptionId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "delivery_id": "4a6b9810-4279-4de5-8d8d-1a6cf3b92a75",
                "created_at": "2019-03-28T11:22:33Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "third_party_transfer",
        "accessor": "ThirdPartyTransfer",
        "op": "load",
        "method": "GET",
        "path": "/profiles/{profileId}/third-party-transfers/{transferId}",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": 16521632
            },
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": 123456789
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 16521632,
            "originalTransferId": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "user": 4342275,
            "targetAccount": 8692237,
            "sourceAccount": 1527389,
            "quote": "8fa9be20-ba43-4b15-abbb-9424e1481050",
            "status": "cancelled",
            "rate": 0.89,
            "details": {
                "reference": "T475890"
            },
            "hasActiveIssues": false,
            "sourceCurrency": "EUR",
            "sourceValue": 0,
            "targetCurrency": "GBP",
            "targetValue": 150,
            "originator": {
                "legalEntityType": "BUSINESS",
                "name": {
                    "fullName": "John Godspeed"
                },
                "reference": "CST-2991992",
                "businessRegistrationCode": "83920-546",
                "businessRegistrationDate": "2020-01-15",
                "address": {
                    "firstLine": "Salu tee 14",
                    "city": "Tallinn",
                    "stateCode": "",
                    "countryCode": "EE",
                    "postCode": "12112"
                },
                "accountDetails": "23456789"
            },
            "created": "2025-10-29T12:28:16.000Z"
        },
        "idField": "id"
    },
    {
        "entity": "token",
        "accessor": "Token",
        "op": "create",
        "method": "POST",
        "path": "/oauth/token",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "access_token": "01234567-89ab-cdef-0123-456789abcdef",
            "token_type": "bearer",
            "refresh_token": "01234567-89ab-cdef-0123-456789abcdef",
            "expires_in": 43199,
            "expires_at": "2025-04-11T03:43:28.148Z",
            "refresh_token_expires_in": 628639555,
            "refresh_token_expires_at": "2045-03-12T13:49:23.552Z",
            "scope": "transfers",
            "created_at": "2020-01-01T12:33:33.12345Z"
        },
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "create",
        "method": "POST",
        "path": "/transfers",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 16521632,
            "user": 4342275,
            "targetAccount": 8692237,
            "sourceAccount": null,
            "quote": null,
            "quoteUuid": "8fa9be20-ba43-4b15-abbb-9424e1481050",
            "status": "incoming_payment_waiting",
            "reference": "reference text",
            "rate": 0.89,
            "created": "2017-11-24 10:47:49",
            "business": null,
            "transferRequest": null,
            "details": {
                "reference": "Testing"
            },
            "hasActiveIssues": false,
            "sourceCurrency": "EUR",
            "sourceValue": 0,
            "targetCurrency": "GBP",
            "targetValue": 150,
            "customerTransactionId": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "payinSessionId": "23330542-8e9e-419f-95eb-312b880f92ad"
        },
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "list",
        "method": "GET",
        "path": "/transfers",
        "args": [],
        "select": {
            "created_date_end": "v1",
            "created_date_start": "v1",
            "limit": "v1",
            "offset": "v1",
            "profile": "v1",
            "source_currency": "v1",
            "status": "v1",
            "target_currency": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "profile",
            "status",
            "sourceCurrency",
            "targetCurrency",
            "createdDateStart",
            "createdDateEnd",
            "limit",
            "offset"
        ],
        "queryArgs": [
            {
                "name": "created_date_end",
                "wire": "createdDateEnd"
            },
            {
                "name": "created_date_start",
                "wire": "createdDateStart"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "profile",
                "wire": "profile"
            },
            {
                "name": "source_currency",
                "wire": "sourceCurrency"
            },
            {
                "name": "status",
                "wire": "status"
            },
            {
                "name": "target_currency",
                "wire": "targetCurrency"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 16521632,
                "user": 4342275,
                "targetAccount": 8692237,
                "sourceAccount": null,
                "quote": null,
                "quoteUuid": "8fa9be20-ba43-4b15-abbb-9424e1481050",
                "status": "incoming_payment_waiting",
                "reference": "reference text",
                "rate": 0.89,
                "created": "2017-11-24 10:47:49",
                "business": null,
                "transferRequest": null,
                "details": {
                    "reference": "Testing"
                },
                "hasActiveIssues": false,
                "sourceCurrency": "EUR",
                "sourceValue": 0,
                "targetCurrency": "GBP",
                "targetValue": 150,
                "customerTransactionId": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
                "payinSessionId": "23330542-8e9e-419f-95eb-312b880f92ad"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "load",
        "method": "GET",
        "path": "/transfers/{transferId}",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 16521632,
            "user": 4342275,
            "targetAccount": 8692237,
            "sourceAccount": null,
            "quote": null,
            "quoteUuid": "8fa9be20-ba43-4b15-abbb-9424e1481050",
            "status": "incoming_payment_waiting",
            "reference": "reference text",
            "rate": 0.89,
            "created": "2017-11-24 10:47:49",
            "business": null,
            "transferRequest": null,
            "details": {
                "reference": "Testing"
            },
            "hasActiveIssues": false,
            "sourceCurrency": "EUR",
            "sourceValue": 0,
            "targetCurrency": "GBP",
            "targetValue": 150,
            "customerTransactionId": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "payinSessionId": "23330542-8e9e-419f-95eb-312b880f92ad"
        },
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "load",
        "method": "GET",
        "path": "/transfers/{transferId}/documents/noc",
        "action": "document_noc",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/pdf"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "load",
        "method": "GET",
        "path": "/transfers/{transferId}/invoices/bankingpartner",
        "action": "invoice_bankingpartner",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "processorName": "Acme Bank Ltd.",
            "deliveryMode": "SWIFT",
            "bankingPartnerReference": "ABCD1234",
            "bankingPartnerName": "Global Bank Corp.",
            "mt103": "{1:F01XXXXGBXXAXXX0000000000}{2:I103XXXXGBXXXXXXN}{3:{108:1234567}{111:001}{121:00000000-0000-0000-0000-000000000000}}{4:\n:20:1234567\n:23B:CRED\n:32A:221212USD12345,\n:33B:USD12345,\n:50K:/11111111\nSOME COMPANY INC.\n1 SOME STREET MIAMI 33132 US\n:59:/GB00000000000000\nCOMPANY NAME LTD\nUK LONDON 1234 GB\n:70:REFERENCE\n:71A:OUR\n:71G:USD11,\n-}\n"
        },
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "load",
        "method": "GET",
        "path": "/transfers/{transferId}/receipt.pdf",
        "action": "receiptpdf",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/pdf"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "load",
        "method": "GET",
        "path": "/transfers/{transferId}/us-combined-receipt.pdf",
        "action": "us_combined_receiptpdf",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/pdf"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "transfer",
        "accessor": "Transfer",
        "op": "update",
        "method": "PUT",
        "path": "/transfers/{transferId}/cancel",
        "action": "cancel",
        "args": [
            {
                "name": "id",
                "wire": "transferId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 16521632,
            "user": 4342275,
            "targetAccount": 8692237,
            "sourceAccount": null,
            "quote": null,
            "quoteUuid": "8fa9be20-ba43-4b15-abbb-9424e1481050",
            "status": "incoming_payment_waiting",
            "reference": "reference text",
            "rate": 0.89,
            "created": "2017-11-24 10:47:49",
            "business": null,
            "transferRequest": null,
            "details": {
                "reference": "Testing"
            },
            "hasActiveIssues": false,
            "sourceCurrency": "EUR",
            "sourceValue": 0,
            "targetCurrency": "GBP",
            "targetValue": 150,
            "customerTransactionId": "54a6bc09-cef9-49a8-9041-f1f0c654cd88",
            "payinSessionId": "23330542-8e9e-419f-95eb-312b880f92ad"
        },
        "idField": "id"
    },
    {
        "entity": "transfer_requirement",
        "accessor": "TransferRequirement",
        "op": "create",
        "method": "POST",
        "path": "/transfer-requirements",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "type": "transfer",
                "fields": [
                    {
                        "name": "Transfer reference",
                        "group": [
                            {
                                "key": "reference",
                                "name": "Transfer reference",
                                "type": "text",
                                "refreshRequirementsOnChange": false,
                                "required": false,
                                "displayFormat": null,
                                "example": null,
                                "minLength": null,
                                "maxLength": 10,
                                "validationRegexp": "[a-zA-Z0-9- ]*",
                                "validationAsync": null,
                                "valuesAllowed": null
                            }
                        ]
                    },
                    {
                        "name": "Transfer purpose",
                        "group": [
                            {
                                "key": "transferPurpose",
                                "name": "Transfer purpose",
                                "type": "select",
                                "refreshRequirementsOnChange": true,
                                "required": true,
                                "displayFormat": null,
                                "example": null,
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "verification.transfers.purpose.purchase.property",
                                        "name": "Buying property abroad"
                                    },
                                    {
                                        "key": "verification.transfers.purpose.pay.bills",
                                        "name": "Rent or other property expenses"
                                    },
                                    {
                                        "key": "verification.transfers.purpose.mortgage",
                                        "name": "Mortgage payment"
                                    }
                                ]
                            },
                            {
                                "key": "transferPurposeSubTransferPurpose",
                                "name": "Please select a specific reason for your transfer",
                                "type": "select",
                                "refreshRequirementsOnChange": true,
                                "required": true,
                                "displayFormat": null,
                                "example": null,
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "INTERPRETATION_SERVICE",
                                        "name": "Interpretation service"
                                    },
                                    {
                                        "key": "TRANSLATION_SERVICE",
                                        "name": "Translation service"
                                    },
                                    {
                                        "key": "HUMAN_RESOURCE_SERVICE",
                                        "name": "Human resource service"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Source of funds",
                        "group": [
                            {
                                "key": "sourceOfFunds",
                                "name": "Source of funds",
                                "type": "select",
                                "refreshRequirementsOnChange": true,
                                "required": true,
                                "displayFormat": null,
                                "example": null,
                                "minLength": null,
                                "maxLength": null,
                                "validationRegexp": null,
                                "validationAsync": null,
                                "valuesAllowed": [
                                    {
                                        "key": "verification.source.of.funds.salary",
                                        "name": "Salary"
                                    },
                                    {
                                        "key": "verification.source.of.funds.investment",
                                        "name": "Investments (stocks, properties, etc.)"
                                    },
                                    {
                                        "key": "verification.source.of.funds.inheritance",
                                        "name": "Inheritance"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "ubo",
        "accessor": "Ubo",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/ubos",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "ubos": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": [
            {
                "id": "013ab1c2688d0185b582ee7e0bcb28b2",
                "name": "John Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa",
                "addressFirstLine": "123 Fake St",
                "postCode": "FK 12345",
                "city": "Phoenix",
                "state": "AZ",
                "ownershipPercentage": 30
            },
            {
                "id": "912ce3f31c8b3a10572137e78417caa3",
                "name": "Jane Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa",
                "addressFirstLine": "125 Fake St",
                "postCode": "FK 12545",
                "city": "Phoenix",
                "state": "AZ",
                "ownershipPercentage": 70
            }
        ],
        "idField": "id"
    },
    {
        "entity": "ubo",
        "accessor": "Ubo",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/ubos",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "013ab1c2688d0185b582ee7e0bcb28b2",
                "name": "John Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa",
                "addressFirstLine": "123 Fake St",
                "postCode": "FK 12345",
                "city": "Phoenix",
                "state": "AZ",
                "ownershipPercentage": 30
            },
            {
                "id": "912ce3f31c8b3a10572137e78417caa3",
                "name": "Jane Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa",
                "addressFirstLine": "125 Fake St",
                "postCode": "FK 12545",
                "city": "Phoenix",
                "state": "AZ",
                "ownershipPercentage": 70
            }
        ],
        "idField": "id"
    },
    {
        "entity": "ubo",
        "accessor": "Ubo",
        "op": "update",
        "method": "PUT",
        "path": "/profiles/{profileId}/ubos",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {
            "ubos": "v1"
        },
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "ff01cf3f206b40c090a14a1e51163e9e",
                "name": "John Doe",
                "dateOfBirth": "1982-05-20",
                "countryOfResidenceIso3Code": "usa",
                "addressFirstLine": "123 Fake St",
                "postCode": "FK 12345",
                "city": "Phoenix",
                "state": "AZ",
                "ownershipPercentage": 30
            },
            {
                "id": "c36b687d28ad44ad8c3864411f5f2612",
                "name": "Jane Doe",
                "dateOfBirth": "1981-12-07",
                "countryOfResidenceIso3Code": "usa",
                "addressFirstLine": "125 Fake St",
                "postCode": "FK 12545",
                "city": "Phoenix",
                "state": "AZ",
                "ownershipPercentage": 70
            }
        ],
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "create",
        "method": "POST",
        "path": "/user/signup/registration_code",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 12345,
            "name": null,
            "email": "new.user@domain.com",
            "active": true,
            "details": null
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "create",
        "method": "POST",
        "path": "/users/exists",
        "action": "exist",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "exists": true
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "load",
        "method": "GET",
        "path": "/users/{userId}",
        "args": [
            {
                "name": "id",
                "wire": "userId",
                "value": 101
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 101,
            "name": "Example Person",
            "email": "person@example.com",
            "active": true,
            "details": {
                "firstName": "Example",
                "lastName": "Person",
                "phoneNumber": "+37111111111",
                "dateOfBirth": "1977-01-01",
                "occupation": "",
                "avatar": "https://lh6.googleusercontent.com/photo.jpg",
                "primaryAddress": 111,
                "address": {
                    "countryCode": "EE",
                    "firstLine": "Road 123",
                    "postCode": "11111",
                    "city": "Tallinn",
                    "state": "",
                    "occupation": ""
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "load",
        "method": "GET",
        "path": "/users/{userId}/contact-email",
        "action": "contact_email",
        "args": [
            {
                "name": "id",
                "wire": "userId",
                "value": 101
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "email": "new-user@email.com"
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "load",
        "method": "GET",
        "path": "/me",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 101,
            "name": "Example Person",
            "email": "person@example.com",
            "active": true,
            "details": {
                "firstName": "Example",
                "lastName": "Person",
                "phoneNumber": "+37111111111",
                "dateOfBirth": "1977-01-01",
                "occupation": "",
                "avatar": "https://lh6.googleusercontent.com/photo.jpg",
                "primaryAddress": 111,
                "address": {
                    "countryCode": "EE",
                    "firstLine": "Road 123",
                    "postCode": "11111",
                    "city": "Tallinn",
                    "state": "",
                    "occupation": ""
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "update",
        "method": "PUT",
        "path": "/users/{userId}/contact-email",
        "action": "contact_email",
        "args": [
            {
                "name": "id",
                "wire": "userId",
                "value": 101
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "email": "new-user@email.com"
        },
        "idField": "id"
    },
    {
        "entity": "verification",
        "accessor": "Verification",
        "op": "create",
        "method": "POST",
        "path": "/profiles/{profileId}/additional-verification/upload-evidences",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 207,
        "sample": {
            "overallStatus": "SUCCESS",
            "results": [
                {
                    "evidenceRequirementKey": "accountPurpose",
                    "result": "SUCCESS",
                    "message": "SUCCESS"
                },
                {
                    "evidenceRequirementKey": "annualIncome",
                    "result": "SUCCESS",
                    "message": "SUCCESS"
                },
                {
                    "evidenceRequirementKey": "intendedCountries",
                    "result": "SUCCESS",
                    "message": "SUCCESS"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "verification",
        "accessor": "Verification",
        "op": "list",
        "method": "GET",
        "path": "/profiles/{profileId}/verification-status/required-evidences",
        "args": [
            {
                "name": "profile_id",
                "wire": "profileId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [
            {
                "name": "x_external_correlation_id",
                "wire": "X-External-Correlation-Id",
                "value": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
            }
        ],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "required_evidences": [
                "SOURCE_OF_WEALTH",
                "INCOME",
                "USE_CASE_COUNTRIES"
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map