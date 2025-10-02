---
layout: docs
title: "URI Utilities"
permalink: /docs/api-uri/
nav_order: 9
parent: "Sandman Lua API"
---

# URI Utilities

Parse, construct, and manipulate URIs and URLs:

## Functions

- [`sandman.uri.parse()`](#sandmanuriparse) - Parses a URI string into components
- [`sandman.uri.tostring()`](#sandmanuritostring) - Converts URI components to a string
- [`sandman.uri.encode()`](#sandmanuriencode) - URL-encodes a string
- [`sandman.uri.decode()`](#sandmanuridecode) - URL-decodes a string
- [`sandman.uri.encodeComponent()`](#sandmanuriencodecomponent) - URL-encodes a string component
- [`sandman.uri.decodeComponent()`](#sandmanuridecodecomponent) - URL-decodes a string component


## sandman.uri.parse {#sandmanuriparse}

**Type:** Function  
**Description:** Parses a URI string into components

### Usage

```lua
result = sandman.uri.parse(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.uri.parse
result = sandman.uri.parse()
```


## sandman.uri.tostring {#sandmanuritostring}

**Type:** Function  
**Description:** Converts URI components to a string

### Usage

```lua
result = sandman.uri.tostring(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.uri.tostring
result = sandman.uri.tostring()
```


## sandman.uri.encode {#sandmanuriencode}

**Type:** Function  
**Description:** URL-encodes a string

### Usage

```lua
result = sandman.uri.encode(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.uri.encode
result = sandman.uri.encode()
```


## sandman.uri.decode {#sandmanuridecode}

**Type:** Function  
**Description:** URL-decodes a string

### Usage

```lua
result = sandman.uri.decode(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.uri.decode
result = sandman.uri.decode()
```


## sandman.uri.encodeComponent {#sandmanuriencodecomponent}

**Type:** Function  
**Description:** URL-encodes a string component

### Usage

```lua
result = sandman.uri.encodeComponent(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.uri.encodeComponent
result = sandman.uri.encodeComponent()
```


## sandman.uri.decodeComponent {#sandmanuridecodecomponent}

**Type:** Function  
**Description:** URL-decodes a string component

### Usage

```lua
result = sandman.uri.decodeComponent(...)
```

### Examples

```lua
-- Basic usage
-- Example usage of sandman.uri.decodeComponent
result = sandman.uri.decodeComponent()
```

