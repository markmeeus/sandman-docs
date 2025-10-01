---
title: "Code Examples"
description: "Practical examples showing how to use Sandman for common HTTP scripting tasks. Each example is a complete, runnable Sandman document."
permalink: /docs/examples/
---

Practical examples showing how to use Sandman for common HTTP scripting tasks. Each example is a complete, runnable Sandman document.

## Basic HTTP Server {#basic-server}

Create a simple HTTP server with multiple routes and JSON responses.

**File: `basic-server.md`**

```markdown
# Basic HTTP Server

Let's create a simple API server with a few endpoints:

```lua
-- Start server on port 8080
server = sandman.server.start(8080)

-- Health check endpoint
sandman.server.get(server, "/health", function(req)
    return {
        status = 200,
        body = sandman.json.encode({
            status = "healthy",
            timestamp = os.time()
        }),
        headers = { ["content-type"] = "application/json" }
    }
end)

-- Get all users
sandman.server.get(server, "/users", function(req)
    local users = {
        {id = 1, name = "John Doe", email = "john@example.com"},
        {id = 2, name = "Jane Smith", email = "jane@example.com"}
    }

    return {
        status = 200,
        body = sandman.json.encode({users = users}),
        headers = { ["content-type"] = "application/json" }
    }
end)

-- Create a new user
sandman.server.post(server, "/users", function(req)
    local user_data = sandman.json.decode(req.body)

    -- Simple validation
    if not user_data.name or not user_data.email then
        return {
            status = 400,
            body = sandman.json.encode({error = "Name and email are required"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    -- Create user (in real app, save to database)
    local new_user = {
        id = math.random(1000, 9999),
        name = user_data.name,
        email = user_data.email,
        created_at = os.time()
    }

    return {
        status = 201,
        body = sandman.json.encode(new_user),
        headers = { ["content-type"] = "application/json" }
    }
end)

print("Server started on http://localhost:8080")
```

## Test the Server

Now let's test our endpoints:

```lua
-- Test health endpoint
health = sandman.http.get("http://localhost:8080/health")
print("Health check:", health.status, health.body)

-- Test get users
users = sandman.http.get("http://localhost:8080/users")
print("Users:", users.body)

-- Test create user
new_user = sandman.http.post("http://localhost:8080/users", {
    body = sandman.json.encode({
        name = "Alice Johnson",
        email = "alice@example.com"
    }),
    headers = { ["content-type"] = "application/json" }
})
print("Created user:", new_user.status, new_user.body)
```
```

## API Client with Authentication {#api-client}

Make authenticated requests to external APIs and handle responses.

**File: `api-client.md`**

```markdown
# API Client Example

This example shows how to interact with external APIs using authentication.

## Setup

First, let's store our API credentials:

```lua
-- Store API configuration
sandman.document.set("api_base", "https://jsonplaceholder.typicode.com")
sandman.document.set("api_token", "your-api-token-here")

print("API client configured")
```

## Basic GET Request

```lua
base_url = sandman.document.get("api_base")

-- Fetch all posts
response = sandman.http.get(base_url .. "/posts")

if response.status == 200 then
    posts = sandman.json.decode(response.body)
    print("Found", #posts, "posts")

    -- Show first post
    if #posts > 0 then
        print("First post:", posts[1].title)
    end
else
    print("Error:", response.status, response.body)
end
```

## Authenticated Request

```lua
-- Example with authentication header
token = sandman.document.get("api_token")

response = sandman.http.get(base_url .. "/posts/1", {
    headers = {
        ["Authorization"] = "Bearer " .. token,
        ["User-Agent"] = "Sandman-Client/1.0"
    }
})

if response.status == 200 then
    post = sandman.json.decode(response.body)
    print("Post title:", post.title)
    print("Post body:", post.body)
else
    print("Failed to fetch post:", response.status)
end
```

## POST Request with Data

```lua
-- Create a new post
new_post = {
    title = "My New Post",
    body = "This is the content of my new post",
    userId = 1
}

response = sandman.http.post(base_url .. "/posts", {
    body = sandman.json.encode(new_post),
    headers = {
        ["Content-Type"] = "application/json",
        ["Authorization"] = "Bearer " .. token
    }
})

if response.status == 201 then
    created_post = sandman.json.decode(response.body)
    print("Created post with ID:", created_post.id)
else
    print("Failed to create post:", response.status, response.body)
end
```
```

## JWT Authentication Server {#jwt-auth}

Create a server with JWT-based authentication for protected endpoints.

**File: `jwt-auth.md`**

```markdown
# JWT Authentication Server

This example demonstrates JWT-based authentication with login and protected routes.

## Setup

```lua
-- Configuration
local JWT_SECRET = "my-super-secret-key"
local users = {
    {id = 1, username = "admin", password = "password123"},
    {id = 2, username = "user", password = "userpass"}
}

-- Start server
server = sandman.server.start(8080)

print("JWT Auth Server started on port 8080")
```

## Helper Functions

```lua
-- Helper function to find user by username
function find_user(username)
    for _, user in ipairs(users) do
        if user.username == username then
            return user
        end
    end
    return nil
end

-- Helper function to extract JWT from Authorization header
function extract_jwt(req)
    local auth_header = req.headers["authorization"]
    if auth_header and string.match(auth_header, "^Bearer ") then
        return string.gsub(auth_header, "^Bearer ", "")
    end
    return nil
end
```

## Login Endpoint

```lua
-- Login endpoint
sandman.server.post(server, "/login", function(req)
    local login_data = sandman.json.decode(req.body)

    if not login_data.username or not login_data.password then
        return {
            status = 400,
            body = sandman.json.encode({error = "Username and password required"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    local user = find_user(login_data.username)
    if not user or user.password ~= login_data.password then
        return {
            status = 401,
            body = sandman.json.encode({error = "Invalid credentials"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    -- Create JWT token
    local payload = {
        user_id = user.id,
        username = user.username,
        exp = os.time() + 3600  -- 1 hour expiry
    }

    local token = sandman.jwt.sign(payload, JWT_SECRET)

    return {
        status = 200,
        body = sandman.json.encode({
            token = token,
            user = {id = user.id, username = user.username}
        }),
        headers = { ["content-type"] = "application/json" }
    }
end)
```

## Protected Endpoint

```lua
-- Protected profile endpoint
sandman.server.get(server, "/profile", function(req)
    local token = extract_jwt(req)

    if not token then
        return {
            status = 401,
            body = sandman.json.encode({error = "Authorization token required"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    -- Verify JWT token
    local success, payload = pcall(sandman.jwt.verify, token, JWT_SECRET)

    if not success then
        return {
            status = 401,
            body = sandman.json.encode({error = "Invalid or expired token"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    -- Return user profile
    return {
        status = 200,
        body = sandman.json.encode({
            user_id = payload.user_id,
            username = payload.username,
            token_expires = payload.exp
        }),
        headers = { ["content-type"] = "application/json" }
    }
end)
```
```

## Complete CRUD API {#crud-api}

A full CRUD (Create, Read, Update, Delete) API with in-memory data storage.

**File: `crud-api.md`**

```markdown
# CRUD API Example

A complete REST API for managing a collection of books.

## Setup

```lua
-- In-memory database
local books = {
    {id = 1, title = "The Lua Programming Language", author = "Roberto Ierusalimschy", year = 2016},
    {id = 2, title = "Programming in Lua", author = "Roberto Ierusalimschy", year = 2013}
}
local next_id = 3

-- Start server
server = sandman.server.start(8080)

print("CRUD API Server started on port 8080")
```

## Helper Functions

```lua
-- Find book by ID
function find_book(id)
    for i, book in ipairs(books) do
        if book.id == tonumber(id) then
            return book, i
        end
    end
    return nil, nil
end

-- Validate book data
function validate_book(book_data)
    if not book_data.title or book_data.title == "" then
        return false, "Title is required"
    end
    if not book_data.author or book_data.author == "" then
        return false, "Author is required"
    end
    if book_data.year and type(book_data.year) ~= "number" then
        return false, "Year must be a number"
    end
    return true, nil
end
```

## CRUD Endpoints

```lua
-- GET /books - List all books
sandman.server.get(server, "/books", function(req)
    return {
        status = 200,
        body = sandman.json.encode({books = books, count = #books}),
        headers = { ["content-type"] = "application/json" }
    }
end)

-- GET /books/:id - Get specific book
sandman.server.get(server, "/books/([0-9]+)", function(req)
    local id = string.match(req.path, "/books/([0-9]+)")
    local book = find_book(id)

    if not book then
        return {
            status = 404,
            body = sandman.json.encode({error = "Book not found"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    return {
        status = 200,
        body = sandman.json.encode(book),
        headers = { ["content-type"] = "application/json" }
    }
end)

-- POST /books - Create new book
sandman.server.post(server, "/books", function(req)
    local book_data = sandman.json.decode(req.body)

    local valid, error_msg = validate_book(book_data)
    if not valid then
        return {
            status = 400,
            body = sandman.json.encode({error = error_msg}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    local new_book = {
        id = next_id,
        title = book_data.title,
        author = book_data.author,
        year = book_data.year or nil,
        created_at = os.time()
    }

    table.insert(books, new_book)
    next_id = next_id + 1

    return {
        status = 201,
        body = sandman.json.encode(new_book),
        headers = { ["content-type"] = "application/json" }
    }
end)

-- PUT /books/:id - Update book
sandman.server.put(server, "/books/([0-9]+)", function(req)
    local id = string.match(req.path, "/books/([0-9]+)")
    local book, index = find_book(id)

    if not book then
        return {
            status = 404,
            body = sandman.json.encode({error = "Book not found"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    local book_data = sandman.json.decode(req.body)
    local valid, error_msg = validate_book(book_data)
    if not valid then
        return {
            status = 400,
            body = sandman.json.encode({error = error_msg}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    -- Update book
    books[index].title = book_data.title
    books[index].author = book_data.author
    books[index].year = book_data.year
    books[index].updated_at = os.time()

    return {
        status = 200,
        body = sandman.json.encode(books[index]),
        headers = { ["content-type"] = "application/json" }
    }
end)

-- DELETE /books/:id - Delete book
sandman.server.delete(server, "/books/([0-9]+)", function(req)
    local id = string.match(req.path, "/books/([0-9]+)")
    local book, index = find_book(id)

    if not book then
        return {
            status = 404,
            body = sandman.json.encode({error = "Book not found"}),
            headers = { ["content-type"] = "application/json" }
        }
    end

    table.remove(books, index)

    return {
        status = 204,
        body = "",
        headers = {}
    }
end)
```
```

## HTTP Proxy Server {#proxy-server}

Create a simple HTTP proxy server that forwards requests to other servers.

**File: `proxy-server.md`**

```markdown
# HTTP Proxy Server

This example creates a simple HTTP proxy that forwards requests to different backend servers.

## Setup

```lua
-- Configuration
local config = {
    port = 8080,
    routes = {
        ["/api/users"] = "https://jsonplaceholder.typicode.com/users",
        ["/api/posts"] = "https://jsonplaceholder.typicode.com/posts",
        ["/api/comments"] = "https://jsonplaceholder.typicode.com/comments"
    },
    default_target = "https://httpbin.org"
}

-- Start proxy server
server = sandman.server.start(config.port)

print("Proxy server started on port", config.port)
```

## Proxy Logic

```lua
-- Helper function to forward requests
function proxy_request(target_url, req)
    local options = {
        method = req.method,
        headers = {}
    }

    -- Copy headers (exclude host)
    for key, value in pairs(req.headers) do
        if string.lower(key) ~= "host" then
            options.headers[key] = value
        end
    end

    -- Add body for POST/PUT/PATCH requests
    if req.method == "POST" or req.method == "PUT" or req.method == "PATCH" then
        options.body = req.body
    end

    -- Add query parameters
    if req.query and next(req.query) then
        local query_parts = {}
        for key, value in pairs(req.query) do
            table.insert(query_parts, key .. "=" .. sandman.uri.encode(value))
        end
        target_url = target_url .. "?" .. table.concat(query_parts, "&")
    end

    -- Make the proxied request
    local response = sandman.http.send({
        method = req.method,
        url = target_url,
        headers = options.headers,
        body = options.body
    })

    return response
end

-- Catch-all route for proxying
sandman.server.add_route("*", server, "/(.*)", function(req)
    local path = "/" .. string.match(req.path, "/(.*)")

    -- Find matching route
    local target_url = nil
    for route_pattern, target in pairs(config.routes) do
        if string.find(path, "^" .. route_pattern) then
            target_url = target .. string.gsub(path, "^" .. route_pattern, "")
            break
        end
    end

    -- Use default target if no route matches
    if not target_url then
        target_url = config.default_target .. path
    end

    print("Proxying", req.method, req.path, "->", target_url)

    -- Forward the request
    local success, response = pcall(proxy_request, target_url, req)

    if not success then
        return {
            status = 502,
            body = sandman.json.encode({
                error = "Proxy error",
                message = response
            }),
            headers = { ["content-type"] = "application/json" }
        }
    end

    -- Add proxy headers
    response.headers = response.headers or {}
    response.headers["X-Proxy"] = "Sandman-Proxy/1.0"
    response.headers["X-Target-URL"] = target_url

    return response
end)
```
```

## More Examples

These examples demonstrate the core capabilities of Sandman. You can combine these patterns to create more complex HTTP scripts and servers. For more inspiration, check out the [blog]({{ '/blog/' | relative_url }}) for tutorials and advanced use cases.

