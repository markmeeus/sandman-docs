---
layout: docs
title: "Sandman Lua API"
description: "Complete reference for all Lua functions available in Sandman. These functions provide HTTP client/server capabilities, data encoding/decoding, and utility functions for your scripts."
permalink: /docs/api/
nav_order: 2
has_children: true
---

# Sandman Lua API Overview

Sandman provides a comprehensive Lua API for HTTP scripting, data manipulation, and server creation. The API is organized into several modules, each focused on specific functionality.

## API Modules

### [Global Functions](/sandman-docs/docs/api-global/)
Core functions available globally without any module prefix:
- [`print()`](/sandman-docs/docs/api-global/#print) - Prints values to the console/logs

### [HTTP Client](/sandman-docs/docs/api-http/)
Make HTTP requests to external services:
- [`get()`](/sandman-docs/docs/api-http/#sandmanhttpget) - Makes an HTTP GET request
- [`post()`](/sandman-docs/docs/api-http/#sandmanhttppost) - Makes an HTTP POST request
- [`put()`](/sandman-docs/docs/api-http/#sandmanhttpput) - Makes an HTTP PUT request
- [`delete()`](/sandman-docs/docs/api-http/#sandmanhttpdelete) - Makes an HTTP DELETE request
- [`patch()`](/sandman-docs/docs/api-http/#sandmanhttppatch) - Makes an HTTP PATCH request
- [`head()`](/sandman-docs/docs/api-http/#sandmanhttphead) - Makes an HTTP HEAD request
- [`send()`](/sandman-docs/docs/api-http/#sandmanhttpsend) - Sends an HTTP request with custom configuration

### [HTTP Server](/sandman-docs/docs/api-server/)
Create HTTP server endpoints and handle requests:
- [`start()`](/sandman-docs/docs/api-server/#sandmanserverstart) - Starts the HTTP server
- [`get()`](/sandman-docs/docs/api-server/#sandmanserverget) - Handles HTTP GET requests on the server
- [`post()`](/sandman-docs/docs/api-server/#sandmanserverpost) - Handles HTTP POST requests on the server
- [`put()`](/sandman-docs/docs/api-server/#sandmanserverput) - Handles HTTP PUT requests on the server
- [`delete()`](/sandman-docs/docs/api-server/#sandmanserverdelete) - Handles HTTP DELETE requests on the server
- [`patch()`](/sandman-docs/docs/api-server/#sandmanserverpatch) - Handles HTTP PATCH requests on the server
- [`head()`](/sandman-docs/docs/api-server/#sandmanserverhead) - Handles HTTP HEAD requests on the server
- [`add_route()`](/sandman-docs/docs/api-server/#sandmanserveradd_route) - Adds a route to the HTTP server

### [Document Context](/sandman-docs/docs/api-document/)
Manage document-scoped persistent data:
- [`set()`](/sandman-docs/docs/api-document/#sandmandocumentset) - Sets a value in the document context
- [`get()`](/sandman-docs/docs/api-document/#sandmandocumentget) - Gets a value from the document context

### [JSON Utilities](/sandman-docs/docs/api-json/)
Encode and decode JSON data:
- [`sandman.json.try_decode()`](/sandman-docs/docs/api-json/#sandmanjsondecode) - Decodes a JSON string into a Lua variable
- [`encode()`](/sandman-docs/docs/api-json/#sandmanjsonencode) - Encodes a Lua variable into a JSON string

### [Base64 Utilities](/sandman-docs/docs/api-base64/)
Base64 encoding and decoding with URL-safe variants:
- [`sandman.base64.try_decode()`](/sandman-docs/docs/api-base64/#sandmanbase64decode) - Decodes a base64 string
- [`encode()`](/sandman-docs/docs/api-base64/#sandmanbase64encode) - Encodes a string to base64
- [`sandman.base64.try_decode_url()`](/sandman-docs/docs/api-base64/#sandmanbase64decode_url) - Decodes a URL-safe base64 string
- [`encode_url()`](/sandman-docs/docs/api-base64/#sandmanbase64encode_url) - Encodes a string to URL-safe base64

### [JWT Utilities](/sandman-docs/docs/api-jwt/)
JSON Web Token creation and verification:
- [`sign()`](/sandman-docs/docs/api-jwt/#sandmanjwtsign) - Signs a JWT token
- [`sandman.jwt.try_decode()`](/sandman-docs/docs/api-jwt/#sandmanjwtdecode) - Decodes a JWT token
- [`sandman.jwt.try_verify()`](/sandman-docs/docs/api-jwt/#sandmanjwtverify) - Verifies a JWT token

### [URI Utilities](/sandman-docs/docs/api-uri/)
Parse, construct, and manipulate URIs and URLs:
- [`parse()`](/sandman-docs/docs/api-uri/#sandmanuriparse) - Parses a URI string into components
- [`tostring()`](/sandman-docs/docs/api-uri/#sandmanuritostring) - Converts URI components to a string
- [`encode()`](/sandman-docs/docs/api-uri/#sandmanuriencode) - URL-encodes a string
- [`decode()`](/sandman-docs/docs/api-uri/#sandmanuridecode) - URL-decodes a string
- [`encodeComponent()`](/sandman-docs/docs/api-uri/#sandmanuriencodecomponent) - URL-encodes a string component
- [`decodeComponent()`](/sandman-docs/docs/api-uri/#sandmanuridecodecomponent) - URL-decodes a string component


## Quick Start Example

Here's a simple example that demonstrates several API modules:

```lua
-- Start an HTTP server
sandman.server.start({port = 8080})

-- Create a simple API endpoint
sandman.server.get("/api/hello", function(req)
    local response_data = {
        message = "Hello, World!",
        timestamp = os.time(),
        user_agent = req.headers["user-agent"]
    }

    return {
        status = 200,
        headers = {["Content-Type"] = "application/json"},
        body = sandman.json.encode(response_data)
    }
end)

-- Make an HTTP request to external API
local response = sandman.http.get("https://api.github.com/users/octocat")
if response.status == 200 then
    local user_data = sandman.json.decode(response.body)
    print("GitHub user:", user_data.login)

    -- Store in document context
    sandman.document.set("github_user", user_data)
end
```

## Error Handling

Many API functions have "try" variants that return success/failure status instead of throwing errors:

```lua
-- Safe JSON decoding
local success, result = sandman.json.try_decode(untrusted_json)
if success then
    print("Parsed JSON:", result)
else
    print("JSON error:", result)
end

-- Safe JWT verification
local valid, payload = sandman.jwt.try_verify(token, secret)
if valid then
    print("User ID:", payload.user_id)
else
    print("Invalid token:", payload)
end
```

Browse the individual module pages for detailed documentation, examples, and use cases.
