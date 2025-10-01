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

### [Global Functions](/docs/api/global/)
Core functions available globally without any module prefix:
- [`print()`](/docs/api/global/#print) - Prints values to the console/logs

### [HTTP Client](/docs/api/http/)
Make HTTP requests to external services:
- [`get()`](/docs/api/http/#sandmanhttpget) - Makes an HTTP GET request
- [`post()`](/docs/api/http/#sandmanhttppost) - Makes an HTTP POST request
- [`put()`](/docs/api/http/#sandmanhttpput) - Makes an HTTP PUT request
- [`delete()`](/docs/api/http/#sandmanhttpdelete) - Makes an HTTP DELETE request
- [`patch()`](/docs/api/http/#sandmanhttppatch) - Makes an HTTP PATCH request
- [`head()`](/docs/api/http/#sandmanhttphead) - Makes an HTTP HEAD request
- [`send()`](/docs/api/http/#sandmanhttpsend) - Sends an HTTP request with custom configuration

### [HTTP Server](/docs/api/server/)
Create HTTP server endpoints and handle requests:
- [`start()`](/docs/api/server/#sandmanserverstart) - Starts the HTTP server
- [`get()`](/docs/api/server/#sandmanserverget) - Handles HTTP GET requests on the server
- [`post()`](/docs/api/server/#sandmanserverpost) - Handles HTTP POST requests on the server
- [`put()`](/docs/api/server/#sandmanserverput) - Handles HTTP PUT requests on the server
- [`delete()`](/docs/api/server/#sandmanserverdelete) - Handles HTTP DELETE requests on the server
- [`patch()`](/docs/api/server/#sandmanserverpatch) - Handles HTTP PATCH requests on the server
- [`head()`](/docs/api/server/#sandmanserverhead) - Handles HTTP HEAD requests on the server
- [`add_route()`](/docs/api/server/#sandmanserveradd_route) - Adds a route to the HTTP server

### [Document Context](/docs/api/document/)
Manage document-scoped persistent data:
- [`set()`](/docs/api/document/#sandmandocumentset) - Sets a value in the document context
- [`get()`](/docs/api/document/#sandmandocumentget) - Gets a value from the document context

### [JSON Utilities](/docs/api/json/)
Encode and decode JSON data:
- [`sandman.json.try_decode()`](/docs/api/json/#sandmanjsondecode) - Decodes a JSON string into a Lua variable
- [`encode()`](/docs/api/json/#sandmanjsonencode) - Encodes a Lua variable into a JSON string

### [Base64 Utilities](/docs/api/base64/)
Base64 encoding and decoding with URL-safe variants:
- [`sandman.base64.try_decode()`](/docs/api/base64/#sandmanbase64decode) - Decodes a base64 string
- [`encode()`](/docs/api/base64/#sandmanbase64encode) - Encodes a string to base64
- [`sandman.base64.try_decode_url()`](/docs/api/base64/#sandmanbase64decode_url) - Decodes a URL-safe base64 string
- [`encode_url()`](/docs/api/base64/#sandmanbase64encode_url) - Encodes a string to URL-safe base64

### [JWT Utilities](/docs/api/jwt/)
JSON Web Token creation and verification:
- [`sign()`](/docs/api/jwt/#sandmanjwtsign) - Signs a JWT token
- [`sandman.jwt.try_verify()`](/docs/api/jwt/#sandmanjwtverify) - Verifies a JWT token

### [URI Utilities](/docs/api/uri/)
Parse, construct, and manipulate URIs and URLs:
- [`parse()`](/docs/api/uri/#sandmanuriparse) - Parses a URI string into components
- [`tostring()`](/docs/api/uri/#sandmanuritostring) - Converts URI components to a string
- [`encode()`](/docs/api/uri/#sandmanuriencode) - URL-encodes a string
- [`decode()`](/docs/api/uri/#sandmanuridecode) - URL-decodes a string
- [`encodeComponent()`](/docs/api/uri/#sandmanuriencodecomponent) - URL-encodes a string component
- [`decodeComponent()`](/docs/api/uri/#sandmanuridecodecomponent) - URL-decodes a string component


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
