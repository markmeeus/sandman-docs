---
title: "Welcome to Sandman"
description: "Sandman is an HTTP scripting environment that lets you write executable markdown documents. Combine the power of Lua scripting with the simplicity of markdown to create APIs, test endpoints, and prototype quickly."
permalink: /docs/
---

## What is Sandman?

Sandman transforms markdown documents into interactive HTTP scripting environments. You can:

- **Write executable documentation** - Your API docs become working examples
- **Prototype servers quickly** - Spin up HTTP servers in seconds
- **Test APIs interactively** - Make requests and inspect responses in real-time
- **Share reproducible scripts** - Everything is contained in markdown files

## Core Features

### 📝 Executable Markdown
Write markdown with embedded Lua code blocks that execute when you run them. Perfect for living documentation.

### 🌐 HTTP Client & Server
Built-in HTTP client for making requests and server capabilities for creating mock APIs and prototypes.

### 🔍 Request Inspection
Visualize HTTP requests and responses with detailed inspection tools and real-time logging.

### 🛠️ Rich API
Comprehensive Lua API with JSON handling, JWT support, Base64 encoding, and more utilities.

## Quick Example

Here's a simple example of what a Sandman document looks like:

```markdown
# My API Test

Let's create a simple server:

```lua
-- Start a server on port 8080
server = sandman.server.start(8080)

-- Add a route
sandman.server.get(server, "/hello", function(req)
    return {
        status = 200,
        body = sandman.json.encode({
            message = "Hello, World!",
            timestamp = os.time()
        }),
        headers = { ["content-type"] = "application/json" }
    }
end)
```

Now let's test our server:

```lua
-- Make a request to our server
response = sandman.http.get("http://localhost:8080/hello")
print("Status:", response.status)
print("Body:", response.body)
```
```

## Getting Started

Ready to start using Sandman? Here are your next steps:

1. **[Download Sandman]({{ '/downloads/' | relative_url }})** - Get the native app for your platform
2. **[Quick Start Guide]({{ '/docs/getting-started/' | relative_url }})** - Learn the basics in 5 minutes
3. **[View Examples]({{ '/docs/examples/' | relative_url }})** - See Sandman in action with real examples

## Popular Topics

- **[Making HTTP Requests]({{ '/docs/http-requests/' | relative_url }})** - Learn how to use the HTTP client
- **[Creating HTTP Servers]({{ '/docs/creating-servers/' | relative_url }})** - Build mock servers and API prototypes
- **[Lua API Reference]({{ '/docs/api/' | relative_url }})** - Complete reference for all available functions
- **[Authentication]({{ '/docs/authentication/' | relative_url }})** - Handle various authentication methods

## Need Help?

If you can't find what you're looking for in the documentation:

- Check out the [examples section]({{ '/docs/examples/' | relative_url }}) for practical use cases
- Read the [blog]({{ '/blog/' | relative_url }}) for tutorials and tips
- Review the [API reference]({{ '/docs/api/' | relative_url }}) for detailed function documentation

