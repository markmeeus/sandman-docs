---
title: "Getting Started"
description: "Get started with Sandman - learn how to create executable notebooks for HTTP API testing and documentation in minutes."
permalink: /docs/
nav_order: 1
---

# Getting Started with Sandman

Sandman is an executable notebook for HTTP APIs. Write API workflows as interactive blocks of Lua code mixed with Markdown documentation—all in git-friendly files.

## Your First Notebook in 5 Minutes

### Step 1: Install Sandman

[Download Sandman]({{ '/downloads/' | relative_url }})

Currently only on macOS *Windows, Linux, and CLI versions coming soon*

### Step 2: Open a Folder

Launch Sandman and select a folder to work in. This could be your project folder or any directory where you want to keep your notebooks.

Sandman will display the folder tree on the right side, showing all your files.

### Step 3: Create a New File

In the folder tree, create a new file (e.g., `my-first-test.md`).

Click on the file to open it. You'll see an empty Sandman document.

### Step 4: Add Your First Block

You'll see two buttons:
- **Add Code** - Creates a Lua code block
- **Add Markdown** - Creates a markdown text block

Click **"Add Code"** to create your first code block. A block editor will appear where you can write Lua code.

Try this simple example:

```lua
response = sandman.http.get("https://api.github.com/users/octocat")
print("Status:", response.status)
print("Username:", sandman.json.decode(response.body).login)
```

### Step 5: Run It

Click the **Run** button on the code block (or press `⌘+Enter`). Watch as your code executes and displays the results in the output area.

### Step 6: Add Documentation

Click **"Add Markdown"** to add a text block above or below your code. Document what your code does:

```markdown
## Testing the GitHub API

This example fetches user information from GitHub's public API.
```

### Step 7: Inspect Everything

Click line below the code block to see the captured HTTP request and response details—headers, body, status code, timing, everything.

### Step 8: Build Workflows

Add more code blocks. Each block can use variables and results from previous blocks—they execute sequentially with shared state.

```lua
-- Block 2 can use the response from Block 1
user = sandman.json.decode(response.body)
repos_url = user.repos_url

-- Fetch the user's repositories
repos_response = sandman.http.get(repos_url)
repos = sandman.json.decode(repos_response.body)
print("Repositories:", #repos)
```

### Step 9: Save & Share

Your notebook is just a Markdown file. It's automatically saved. Commit it to git, share it with your team, review it like code—because it *is* code.

## What Makes Sandman Different?

### Executable Documentation
Your API documentation and tests are the same file. If the notebook runs, the docs are correct.

### Stateful Blocks
Each code block builds on the previous one's state. No more copying variables between requests or managing global state manually.

### Client & Server
Test webhooks by spinning up a local server. Mock external APIs. Test full request/response cycles—all in one notebook.

### Git-Native
Plain Markdown files with executable Lua blocks. Perfect for version control, code review, and team collaboration.

## Next Steps

- **[Lua API Reference]({{ '/docs/api/' | relative_url }})** - Complete reference for all available functions
- **[Download Sandman]({{ '/downloads/' | relative_url }})** - Get the macOS app

