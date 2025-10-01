---
layout: post
title: "Building Your First API Mock with Sandman"
date: 2025-09-20
categories: [tutorial]
tags: [tutorial, api-mocking, getting-started]
author: "Sandman Team"
excerpt: "Learn how to create a complete API mock in under 5 minutes using Sandman's executable markdown documents. Perfect for frontend developers who need to test against APIs that don't exist yet."
---

One of the most common use cases for Sandman is creating API mocks for frontend development. When you're building a frontend application but the backend API isn't ready yet, Sandman can help you create realistic mock servers in minutes.

In this tutorial, we'll build a complete user management API mock that you can use to develop and test your frontend application.

## What We'll Build

We'll create a mock API with the following endpoints:
- `GET /users` - List all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## Step 1: Setting Up the Server

Create a new file called `user-api-mock.md` and start with the server setup:

```lua
-- Start our mock API server
server = sandman.server.start(3000)

-- In-memory user storage
users = {
    {id = 1, name = "John Doe", email = "john@example.com", role = "admin"},
    {id = 2, name = "Jane Smith", email = "jane@example.com", role = "user"},
    {id = 3, name = "Bob Johnson", email = "bob@example.com", role = "user"}
}
next_id = 4

print("Mock API server started on http://localhost:3000")
```

## Step 2: Helper Functions

Let's add some utility functions to make our API more realistic:

```lua
-- Helper function to find user by ID
function find_user(id)
    for i, user in ipairs(users) do
        if user.id == tonumber(id) then
            return user, i
        end
    end
    return nil, nil
end

-- Helper function to validate user data
function validate_user(user_data)
    if not user_data.name or user_data.name == "" then
        return false, "Name is required"
    end
    if not user_data.email or user_data.email == "" then
        return false, "Email is required"
    end
    -- Simple email validation
    if not string.match(user_data.email, "[^@]+@[^@]+%.[^@]+") then
        return false, "Invalid email format"
    end
    return true, nil
end

-- Helper function to create JSON responses
function json_response(data, status)
    status = status or 200
    return {
        status = status,
        body = sandman.json.encode(data),
        headers = {
            ["content-type"] = "application/json",
            ["access-control-allow-origin"] = "*"
        }
    }
end
```

## Step 3: Implementing the Endpoints

Now let's implement each endpoint:

### List All Users

```lua
-- GET /users - List all users
sandman.server.get(server, "/users", function(req)
    return json_response({
        users = users,
        total = #users
    })
end)
```

### Get Specific User

```lua
-- GET /users/:id - Get specific user
sandman.server.get(server, "/users/([0-9]+)", function(req)
    local id = string.match(req.path, "/users/([0-9]+)")
    local user = find_user(id)

    if not user then
        return json_response({
            error = "User not found"
        }, 404)
    end

    return json_response(user)
end)
```

### Create New User

```lua
-- POST /users - Create new user
sandman.server.post(server, "/users", function(req)
    local user_data = sandman.json.decode(req.body)

    -- Validate input
    local valid, error_msg = validate_user(user_data)
    if not valid then
        return json_response({
            error = error_msg
        }, 400)
    end

    -- Create new user
    local new_user = {
        id = next_id,
        name = user_data.name,
        email = user_data.email,
        role = user_data.role or "user",
        created_at = os.time()
    }

    table.insert(users, new_user)
    next_id = next_id + 1

    return json_response(new_user, 201)
end)
```

### Update User

```lua
-- PUT /users/:id - Update user
sandman.server.put(server, "/users/([0-9]+)", function(req)
    local id = string.match(req.path, "/users/([0-9]+)")
    local user, index = find_user(id)

    if not user then
        return json_response({
            error = "User not found"
        }, 404)
    end

    local user_data = sandman.json.decode(req.body)
    local valid, error_msg = validate_user(user_data)
    if not valid then
        return json_response({
            error = error_msg
        }, 400)
    end

    -- Update user
    users[index].name = user_data.name
    users[index].email = user_data.email
    users[index].role = user_data.role or users[index].role
    users[index].updated_at = os.time()

    return json_response(users[index])
end)
```

### Delete User

```lua
-- DELETE /users/:id - Delete user
sandman.server.delete(server, "/users/([0-9]+)", function(req)
    local id = string.match(req.path, "/users/([0-9]+)")
    local user, index = find_user(id)

    if not user then
        return json_response({
            error = "User not found"
        }, 404)
    end

    table.remove(users, index)

    return {
        status = 204,
        body = "",
        headers = {
            ["access-control-allow-origin"] = "*"
        }
    }
end)
```

## Step 4: Adding CORS Support

For frontend development, you'll likely need CORS support:

```lua
-- Handle preflight OPTIONS requests
sandman.server.add_route("OPTIONS", server, "/users.*", function(req)
    return {
        status = 200,
        body = "",
        headers = {
            ["access-control-allow-origin"] = "*",
            ["access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS",
            ["access-control-allow-headers"] = "Content-Type, Authorization"
        }
    }
end)
```

## Step 5: Testing Your Mock API

Let's test our API to make sure everything works:

```lua
-- Test the API endpoints
print("=== Testing Mock API ===")

-- Test GET /users
response = sandman.http.get("http://localhost:3000/users")
print("GET /users:", response.status)

-- Test POST /users
new_user = {
    name = "Alice Wilson",
    email = "alice@example.com",
    role = "moderator"
}

response = sandman.http.post("http://localhost:3000/users", {
    body = sandman.json.encode(new_user),
    headers = { ["content-type"] = "application/json" }
})
print("POST /users:", response.status)

created_user = sandman.json.decode(response.body)
print("Created user ID:", created_user.id)

-- Test GET /users/:id
response = sandman.http.get("http://localhost:3000/users/" .. created_user.id)
print("GET /users/" .. created_user.id .. ":", response.status)

-- Test PUT /users/:id
updated_user = {
    name = "Alice Wilson-Smith",
    email = "alice.smith@example.com",
    role = "admin"
}

response = sandman.http.put("http://localhost:3000/users/" .. created_user.id, {
    body = sandman.json.encode(updated_user),
    headers = { ["content-type"] = "application/json" }
})
print("PUT /users/" .. created_user.id .. ":", response.status)

-- Test DELETE /users/:id
response = sandman.http.delete("http://localhost:3000/users/" .. created_user.id)
print("DELETE /users/" .. created_user.id .. ":", response.status)
```

## Using Your Mock API

Now you can point your frontend application to `http://localhost:3000` and start developing against your mock API. The API will behave like a real backend, with proper HTTP status codes, JSON responses, and error handling.

## Next Steps

This is just the beginning! You can enhance your mock API by:

- Adding authentication with JWT tokens
- Implementing pagination for large datasets
- Adding more realistic data validation
- Creating more complex relationships between entities
- Adding delay simulation to test loading states

## Conclusion

In just a few minutes, we've created a fully functional API mock that you can use for frontend development. Sandman's executable markdown format makes it easy to document your API while providing a working implementation.

The beauty of this approach is that your API documentation and mock implementation live in the same file, ensuring they stay in sync. When the real backend is ready, you can use this document as a specification for the actual implementation.

Happy mocking! 🎭

