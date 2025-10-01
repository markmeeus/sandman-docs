---
layout: docs
title: "JWT Utilities"
permalink: /docs/api/jwt/
nav_order: 8
parent: "Sandman Lua API"
---

# JWT Utilities

JSON Web Token creation and verification:

## Functions

- [`sandman.jwt.sign()`](#sandmanjwtsign) - Signs a JWT token
- [`sandman.jwt.try_verify()`](#sandmanjwtverify) - Verifies a JWT token


## sandman.jwt.sign {#sandmanjwtsign}

**Type:** Function  
**Description:** Signs a JWT token

### Usage

```lua
result = sandman.jwt.sign(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.jwt.sign
result = sandman.jwt.sign()
```


## sandman.jwt.try_verify {#sandmanjwtverify}

**Type:** Function  
**Description:** Verifies a JWT token
**⚠️ Note:** This function can throw errors. A `sandman.jwt.try_verify` alternative is available that returns `result_or_nil, error` instead of throwing.

### Usage

```lua
result = sandman.jwt.verify(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.jwt.verify
result = sandman.jwt.verify()

-- Safe alternative (returns result_or_nil, error):
result_or_nil, error = sandman.jwt.try_verify()
if result_or_nil then
  -- Use result_or_nil
else
  -- Handle the error
end
```

