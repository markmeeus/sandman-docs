---
layout: docs
title: "JSON Utilities"
permalink: /docs/api/json/
nav_order: 6
parent: "Sandman Lua API"
---

# JSON Utilities

Encode and decode JSON data:

## Functions

- [`sandman.json.try_decode()`](#sandmanjsondecode) - Decodes a JSON string into a Lua variable
- [`sandman.json.encode()`](#sandmanjsonencode) - Encodes a Lua variable into a JSON string


## sandman.json.try_decode {#sandmanjsondecode}

**Type:** Function  
**Description:** Decodes a JSON string into a Lua variable
**⚠️ Note:** This function can throw errors. A `sandman.json.try_decode` alternative is available that returns `result_or_nil, error` instead of throwing.

### Usage

```lua
value = sandman.json.decode('{"this": "is Sandman"}')
```

### Parameters

- **json_string: string**

### Returns

- **value: any**

### Examples

```lua
-- Basic usage
value = sandman.json.decode('{"this": "is Sandman"}')

-- Safe alternative (returns value_or_nil, error):
value_or_nil, error = sandman.json.try_decode('{"this": "is Sandman"}')
if value_or_nil then
  -- Use value_or_nil
else
  -- Handle the error
end
```


## sandman.json.encode {#sandmanjsonencode}

**Type:** Function  
**Description:** Encodes a Lua variable into a JSON string

### Usage

```lua
json_string = sandman.json.encode({this = "is Sandman"})
```

### Parameters

- **value: any**

### Returns

- **json_string: string**

### Examples

```lua
-- Basic usage
json_string = sandman.json.encode({this = "is Sandman"})
```

