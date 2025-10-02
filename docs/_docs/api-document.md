---
layout: docs
title: "Document Context"
permalink: /docs/api-document/
nav_order: 5
parent: "Sandman Lua API"
---

# Document Context

Manage document-scoped persistent data:

## Functions

- [`sandman.document.set()`](#sandmandocumentset) - Sets a value in the document context
- [`sandman.document.get()`](#sandmandocumentget) - Gets a value from the document context


## sandman.document.set {#sandmandocumentset}

**Type:** Function  
**Description:** Sets a value in the document context

### Usage

```lua
result = sandman.document.set(key, value)
```

### Parameters

- **key: string**
- **value: any**

### Examples

```lua
-- Basic usage
result = sandman.document.set(key, value)
```


## sandman.document.get {#sandmandocumentget}

**Type:** Function  
**Description:** Gets a value from the document context

### Usage

```lua
result = sandman.document.get(key)
```

### Parameters

- **key: string**

### Returns

- **result: any**

### Examples

```lua
-- Basic usage
result = sandman.document.get(key)
```

