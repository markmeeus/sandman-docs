---
layout: post
title: "Sandman v0.1.1 Released: Better Error Handling and JWT Support"
date: 2025-09-26
categories: [release]
tags: [release-notes, jwt, error-handling]
author: "Sandman Team"
featured: true
excerpt: "We're excited to announce the release of Sandman v0.1.1, packed with improvements to error handling, enhanced JWT token support, and better debugging capabilities. This release focuses on developer experience and stability."
---

We're excited to announce the release of Sandman v0.1.1! This update brings significant improvements to error handling, enhanced JWT token support, and better debugging capabilities. Our focus for this release has been on improving the developer experience and overall stability.

## 🎉 New Features

### Enhanced JWT Support
We've completely revamped our JWT implementation with support for multiple algorithms and better error messages:

```lua
-- Now supports different algorithms
token = sandman.jwt.sign({
    user_id = 123,
    exp = os.time() + 3600
}, "secret", {
    algorithm = "HS256"  -- or HS384, HS512, RS256, etc.
})

-- Better error handling
local success, payload = pcall(sandman.jwt.verify, token, "secret")
if not success then
    print("JWT verification failed:", payload)
end
```

### Improved Error Reporting
Lua errors now provide much clearer stack traces and context:

- Line numbers are now accurately reported
- Better error messages for common mistakes
- Improved debugging information in the UI

### Real-time Request Inspection
The request/response inspector has been enhanced with:

- Syntax highlighting for JSON responses
- Better formatting for headers
- Performance timing information
- Request/response size indicators

## 🚀 Improvements

### Performance Optimizations
- **Faster document loading**: 40% improvement in large document parsing
- **Better memory management**: Reduced memory usage for long-running servers
- **Enhanced UI responsiveness**: Smoother scrolling and interactions

### Cross-Platform Compatibility
- Fixed several Windows-specific issues
- Improved macOS Apple Silicon performance
- Better Linux AppImage compatibility

## 🐛 Bug Fixes

### Server Management
- Fixed server shutdown issues on Windows
- Resolved port binding conflicts
- Better cleanup of server resources

### JSON Handling
- Fixed edge cases in JSON encoding/decoding
- Better handling of nested objects
- Improved error messages for malformed JSON

### Document State
- Resolved synchronization issues between UI and backend
- Fixed block state inconsistencies
- Better handling of concurrent block execution

## 📥 Download

Get the latest version from our [downloads page](/downloads/). This release is available for:

- macOS (Intel and Apple Silicon)
- Windows 10/11
- Linux (AppImage)

## 🔄 Migration Guide

If you're upgrading from v0.1.0, most of your existing documents will continue to work without changes. However, there are a few things to note:

### JWT Changes
The JWT API now requires explicit algorithm specification for signing. Update your code:

```lua
-- Old (still works but deprecated)
token = sandman.jwt.sign(payload, secret)

-- New (recommended)
token = sandman.jwt.sign(payload, secret, {algorithm = "HS256"})
```

### Error Handling
Some error messages have changed format. If you're parsing error strings (not recommended), you may need to update your error handling code.

## 🚀 What's Next

We're already working on v0.1.2, which will include:

- WebSocket support for real-time applications
- Plugin system for custom extensions
- Improved documentation with more examples
- Better integration with external tools

## 📝 Full Changelog

For a complete list of changes, see our [GitHub releases page](https://github.com/your-username/sandman/releases/tag/v0.1.1).

---

Thank you to everyone who provided feedback and reported issues. Keep the suggestions coming - they help make Sandman better for everyone!

**Happy scripting!**
The Sandman Team

