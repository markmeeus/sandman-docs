---
layout: docs
title: "JWT Utilities"
permalink: /docs/api-jwt/
nav_order: 8
parent: "Sandman Lua API"
---

# JWT Utilities

JSON Web Token creation and verification:

## Functions

- [`sandman.jwt.sign()`](#sandmanjwtsign) - Signs a JWT token
- [`sandman.jwt.try_decode()`](#sandmanjwtdecode) - Decodes a JWT token
- [`sandman.jwt.try_verify()`](#sandmanjwtverify) - Verifies a JWT token


## sandman.jwt.sign {#sandmanjwtsign}

**Type:** Function  
**Description:** Signs a JWT token

### Usage

```lua
token = sandman.jwt.sign({name = "Sandman"}, "SECRET", {alg = "HS512"})
```

### Parameters

- **claims: table**
- **secret: string**
- **options: table**

### Returns

- **token: string**

### Examples

```lua
-- Basic usage
token = sandman.jwt.sign({name = "Sandman"}, "SECRET", {alg = "HS512"})
```


## sandman.jwt.try_decode {#sandmanjwtdecode}

**Type:** Function  
**Description:** Decodes a JWT token

**⚠️ Note:** This function can throw errors. A `sandman.jwt.try_decode` alternative is available that returns `result_or_nil, error` instead of throwing.

### Usage

```lua
claims = sandman.jwt.decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZG1hbiJ9.wbxPiV7bVJ_IlvdHTORcdvdQe6-nwo4wc61fhtcKK-Ua8A4xk8qqmNUTi0Am82Zf4RwB9KpqPnUe0EzA77EfSg")
```

### Parameters

- **token: string**

### Returns

- **claims: table**
- **header: table**

### Examples

```lua
-- Basic usage
claims = sandman.jwt.decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZG1hbiJ9.wbxPiV7bVJ_IlvdHTORcdvdQe6-nwo4wc61fhtcKK-Ua8A4xk8qqmNUTi0Am82Zf4RwB9KpqPnUe0EzA77EfSg")

-- Safe alternative (returns claims_or_nil, error):
claims_or_nil, error = sandman.jwt.try_decode("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZG1hbiJ9.wbxPiV7bVJ_IlvdHTORcdvdQe6-nwo4wc61fhtcKK-Ua8A4xk8qqmNUTi0Am82Zf4RwB9KpqPnUe0EzA77EfSg")
if claims_or_nil then
  -- Use claims_or_nil
else
  -- Handle the error
end
```


## sandman.jwt.try_verify {#sandmanjwtverify}

**Type:** Function  
**Description:** Verifies a JWT token

**⚠️ Note:** This function can throw errors. A `sandman.jwt.try_verify` alternative is available that returns `result_or_nil, error` instead of throwing.

### Usage

```lua
claims = sandman.jwt.verify("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZG1hbiJ9.wbxPiV7bVJ_IlvdHTORcdvdQe6-nwo4wc61fhtcKK-Ua8A4xk8qqmNUTi0Am82Zf4RwB9KpqPnUe0EzA77EfSg", "SECRET", {alg = "HS512"})
```

### Parameters

- **token: string**
- **secret: string**
- **options: table**

### Returns

- **claims: table**
- **header: table**

### Examples

```lua
-- Basic usage
claims = sandman.jwt.verify("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZG1hbiJ9.wbxPiV7bVJ_IlvdHTORcdvdQe6-nwo4wc61fhtcKK-Ua8A4xk8qqmNUTi0Am82Zf4RwB9KpqPnUe0EzA77EfSg", "SECRET", {alg = "HS512"})

-- Safe alternative (returns claims_or_nil, error):
claims_or_nil, error = sandman.jwt.try_verify("eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZG1hbiJ9.wbxPiV7bVJ_IlvdHTORcdvdQe6-nwo4wc61fhtcKK-Ua8A4xk8qqmNUTi0Am82Zf4RwB9KpqPnUe0EzA77EfSg", "SECRET", {alg = "HS512"})
if claims_or_nil then
  -- Use claims_or_nil
else
  -- Handle the error
end
```

