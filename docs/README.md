# Sandman Jekyll Website

This is the Jekyll-powered website for Sandman, an HTTP scripting environment that lets you write executable markdown documents.

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7 or higher
- Bundler gem

### Installation

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Start the development server:**
   ```bash
   bundle exec jekyll serve
   ```

3. **View the site:**
   Open [http://localhost:4000](http://localhost:4000) in your browser

### Building for Production

```bash
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## 📁 Site Structure

```
site/
├── _config.yml          # Jekyll configuration
├── _layouts/             # Page layouts
│   ├── default.html      # Base layout
│   ├── post.html         # Blog post layout
│   └── docs.html         # Documentation layout
├── _includes/            # Reusable components
│   ├── header.html       # Site header
│   └── footer.html       # Site footer
├── _posts/               # Blog posts
├── _docs/                # Documentation pages
├── assets/               # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── index.html            # Homepage
├── downloads.html        # Downloads page
└── blog.html            # Blog index
```

## 🎨 Design Features

### Sandy Nighttime Theme
The website uses a carefully crafted color palette that reflects the "Sandman working under desert stars" concept:

- **Primary Yellow**: `#ffb71b` (matches your logo exactly)
- **Secondary Gold**: `#e6a419` (deeper desert gold)
- **Dark Backgrounds**: Warm brown undertones evoking nighttime sand
- **Sandy Accents**: Beach sand and burlywood colors

### Key Features
- **Responsive design** for all devices
- **Dark theme** optimized for developer workflows
- **Zero external dependencies** for fast loading
- **SEO optimized** with Jekyll SEO plugin
- **Accessible** design with proper ARIA labels

## ✍️ Content Management

### Adding Blog Posts

Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-09-27
categories: [release, tutorial]
tags: [api, lua, http]
author: "Your Name"
featured: true  # Optional: makes it the featured post
excerpt: "Brief description for the blog index"
---

Your content here...
```

### Adding Documentation

Create a new file in `_docs/` with appropriate front matter:

```markdown
---
title: "Page Title"
description: "Page description for SEO"
permalink: /docs/your-page/
---

Your documentation content...
```

### Updating Site Configuration

Edit `_config.yml` to update:
- Site title and description
- Navigation menu
- Version information
- Social links

## 🎯 Customization

### Colors
The color palette is defined in `assets/css/main.scss` using CSS custom properties:

```scss
:root {
    --primary-color: #ffb71b;    /* Your logo yellow */
    --secondary-color: #e6a419;  /* Desert gold */
    --background: #1a1611;       /* Dark sand */
    --surface: #2d2419;          /* Sandy surface */
    /* ... more colors ... */
}
```

### Navigation
Update the navigation menu in `_config.yml`:

```yaml
navigation:
  - title: "Home"
    url: "/"
  - title: "Downloads"
    url: "/downloads/"
  - title: "Documentation"
    url: "/docs/"
  - title: "Blog"
    url: "/blog/"
```

### Homepage Content
Edit `index.html` to update the hero section, features, and call-to-action areas.

## 🚀 Deployment

### GitHub Pages
1. Push your Jekyll site to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`
4. Deploy automatically on push

### Custom Domain
To use a custom domain like `sandmanapp.com`:

1. Add a `CNAME` file to the root with your domain
2. Configure DNS to point to your hosting provider
3. Enable HTTPS in your hosting provider's settings

## 📝 Content Guidelines

### Writing Style
- Use clear, developer-friendly language
- Include code examples where relevant
- Keep paragraphs concise
- Use proper heading hierarchy (H1 → H2 → H3)

### Code Examples
Use fenced code blocks with language specification:

```lua
-- This is a Lua code example
server = sandman.server.start(8080)
```

### Images
Store images in `assets/images/` and reference them:

```markdown
![Alt text]({{ '/assets/images/screenshot.png' | relative_url }})
```

## 🔧 Development

### Local Development
```bash
# Install dependencies
bundle install

# Start development server with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

### Adding Plugins
Add plugins to `_config.yml` and `Gemfile`:

```yaml
# _config.yml
plugins:
  - jekyll-sitemap
  - jekyll-feed
```

```ruby
# Gemfile
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end
```

## 📊 Analytics & SEO

The site includes:
- **Jekyll SEO Tag** for meta tags and structured data
- **Jekyll Sitemap** for search engine indexing
- **Jekyll Feed** for RSS/Atom feeds
- **Semantic HTML** for accessibility and SEO

To add Google Analytics, add your tracking ID to `_config.yml`:

```yaml
google_analytics: G-XXXXXXXXXX
```

## 🐛 Troubleshooting

### Common Issues

**Jekyll won't start:**
- Check Ruby version: `ruby --version`
- Update bundler: `gem update bundler`
- Clear cache: `bundle exec jekyll clean`

**Styles not loading:**
- Ensure `assets/css/main.scss` has Jekyll front matter (`---`)
- Check for SCSS syntax errors
- Verify file paths in includes

**Images not showing:**
- Use `{{ '/assets/images/file.png' | relative_url }}` for proper paths
- Ensure images are in the correct directory
- Check file permissions

## 📄 License

This website is part of the Sandman project. The design and code are available for reference, but please respect the branding and create your own unique design for other projects.

---

**Built with ❤️ using Jekyll and the sandy nighttime aesthetic that makes your yellow bag logo shine!** 🏜️✨