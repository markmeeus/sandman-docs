---
layout: docs
title: "Base64 Utilities"
permalink: /docs/api-base64/
nav_order: 7
parent: "Sandman Lua API"
---

# Base64 Utilities

Base64 encoding and decoding with URL-safe variants:

## Functions

- [`sandman.base64.try_decode()`](#sandmanbase64decode) - Decodes a base64 string
- [`sandman.base64.encode()`](#sandmanbase64encode) - Encodes a string to base64
- [`sandman.base64.try_decode_url()`](#sandmanbase64decode_url) - Decodes a URL-safe base64 string
- [`sandman.base64.encode_url()`](#sandmanbase64encode_url) - Encodes a string to URL-safe base64


## sandman.base64.try_decode {#sandmanbase64decode}

**Type:** Function  
**Description:** Decodes a base64 string

**⚠️ Note:** This function can throw errors. A `sandman.base64.try_decode` alternative is available that returns `result_or_nil, error` instead of throwing.

### Usage

```lua
data = sandman.base64.decode(b64_string)
```

### Parameters

- **b64_string: string**

### Returns

- **data: string**

### Examples

```lua
-- Basic usage
data = sandman.base64.decode(b64_string)

-- Safe alternative (returns data_or_nil, error):
data_or_nil, error = sandman.base64.try_decode(b64_string)
if data_or_nil then
  -- Use data_or_nil
else
  -- Handle the error
end
```


## sandman.base64.encode {#sandmanbase64encode}

**Type:** Function  
**Description:** Encodes a string to base64

### Usage

```lua
b64_string = sandman.base64.encode(data)
```

### Parameters

- **data: string**

### Returns

- **b64_string: string**

### Examples

```lua
-- Basic usage
b64_string = sandman.base64.encode(data)
```


## sandman.base64.try_decode_url {#sandmanbase64decode_url}

**Type:** Function  
**Description:** Decodes a URL-safe base64 string

**⚠️ Note:** This function can throw errors. A `sandman.base64.try_decode_url` alternative is available that returns `result_or_nil, error` instead of throwing.

### Usage

```lua
data = sandman.base64.decode_url(b64_string)
```

### Parameters

- **b64_string: string**

### Returns

- **data: string**

### Examples

```lua
-- Basic usage
data = sandman.base64.decode_url(b64_string)

-- Safe alternative (returns data_or_nil, error):
data_or_nil, error = sandman.base64.try_decode_url(b64_string)
if data_or_nil then
  -- Use data_or_nil
else
  -- Handle the error
end
```


## sandman.base64.encode_url {#sandmanbase64encode_url}

**Type:** Function  
**Description:** Encodes a string to URL-safe base64

### Usage

```lua
b64_string = sandman.base64.encode_url(data)
```

### Parameters

- **data: string**

### Returns

- **b64_string: string**

### Examples

```lua
-- Basic usage
b64_string = sandman.base64.encode_url(data)
```

