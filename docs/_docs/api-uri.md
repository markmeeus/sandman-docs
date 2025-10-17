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
- [`sandman.uri.encode()`](#sandmanuriencode) - URI-encodes a url
- [`sandman.uri.decode()`](#sandmanuridecode) - URI-decodes a URI
- [`sandman.uri.encode_component()`](#sandmanuriencode_component) - URI-encodes a URI component
- [`sandman.uri.decode_component()`](#sandmanuridecode_component) - URI-decodes a URI component


## sandman.uri.parse {#sandmanuriparse}

**Type:** Function  
**Description:** Parses a URI string into components

### Usage

```lua
components = sandman.uri.parse("https://user@server.com:1234/test/path?qry=1&param=2")
```

### Parameters

- **uri: string**

### Returns

- **components: table**

### Examples

```lua
-- Basic usage
components = sandman.uri.parse("https://user@server.com:1234/test/path?qry=1&param=2")
```


## sandman.uri.tostring {#sandmanuritostring}

**Type:** Function  
**Description:** Converts URI components to a string

### Usage

```lua
uri = sandman.uri.tostring({host = "server.com", path = "/test/path", port = 1234, query = {qry = 1, param = 2}, scheme = "https", userinfo = "user"})
```

### Parameters

- **components: table**

### Returns

- **uri: string**

### Examples

```lua
-- Basic usage
uri = sandman.uri.tostring({host = "server.com", path = "/test/path", port = 1234, query = {qry = 1, param = 2}, scheme = "https", userinfo = "user"})
```


## sandman.uri.encode {#sandmanuriencode}

**Type:** Function  
**Description:** URI-encodes a url

### Usage

```lua
encoded_uri = sandman.uri.encode("http://test.com/Hello Sandman")
```

### Parameters

- **uri: string**

### Returns

- **encoded_uri: string**

### Examples

```lua
-- Basic usage
encoded_uri = sandman.uri.encode("http://test.com/Hello Sandman")
```


## sandman.uri.decode {#sandmanuridecode}

**Type:** Function  
**Description:** URI-decodes a URI

### Usage

```lua
uri = sandman.uri.decode("http://test.com/Hello%20Sandman")
```

### Parameters

- **encoded_uri: string**

### Returns

- **uri: string**

### Examples

```lua
-- Basic usage
uri = sandman.uri.decode("http://test.com/Hello%20Sandman")
```


## sandman.uri.encode_component {#sandmanuriencode_component}

**Type:** Function  
**Description:** URI-encodes a URI component

### Usage

```lua
encoded_uri = sandman.uri.encode_component("http://test.com/Hello Sandman")
```

### Parameters

- **uri: string**

### Returns

- **encoded_uri: string**

### Examples

```lua
-- Basic usage
encoded_uri = sandman.uri.encode_component("http://test.com/Hello Sandman")
```


## sandman.uri.decode_component {#sandmanuridecode_component}

**Type:** Function  
**Description:** URI-decodes a URI component

### Usage

```lua
uri = sandman.uri.decode_component("http%3A%2F%2Ftest.com%2FHello%20Sandman")
```

### Parameters

- **encoded_uri: string**

### Returns

- **uri: string**

### Examples

```lua
-- Basic usage
uri = sandman.uri.decode_component("http%3A%2F%2Ftest.com%2FHello%20Sandman")
```

