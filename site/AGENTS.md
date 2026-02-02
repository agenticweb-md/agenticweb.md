# AGENTS.md - agenticweb.md Hugo Site

Instructions for AI agents working on the agenticweb.md Hugo website.

## Project Overview

This is the official website for the agenticweb.md specification, built with Hugo and the PaperMod theme.

- **Framework:** Hugo (static site generator)
- **Theme:** PaperMod (in `themes/PaperMod/`)
- **Language:** English only (single language, no i18n redirects)
- **Deploy:** Static hosting at agenticweb.md

## File Structure

```
site/
├── hugo.yaml                    # Main config
├── assets/css/extended/
│   └── custom.css               # ALL custom styles - edit this file
├── layouts/partials/
│   ├── header.html              # Custom header (logo, nav)
│   ├── footer.html              # Custom footer
│   ├── extend_head.html         # SEO meta tags, JSON-LD (NO language redirect)
│   └── extend_footer.html       # Custom scripts
├── content/                     # Content (English only, NOT in /en/ subdirectory)
│   ├── _index.md                # Homepage
│   ├── spec/_index.md           # Specification
│   ├── examples/_index.md       # Examples
│   ├── quickstart.md            # Quick Start guide
│   ├── generator.md             # Interactive generator
│   ├── faq.md                   # FAQ
│   └── imprint.md               # Legal
├── static/
│   ├── images/                  # Static images
│   │   └── agenticweb-md.png    # Logo (transparent background)
│   └── js/
│       └── generator.js         # Interactive form generator
└── i18n/
    └── en.yaml                  # English strings only
```

## Current Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `content/_index.md` | Homepage with hero |
| `/spec/` | `content/spec/_index.md` | Full v1.0.0 specification |
| `/quickstart/` | `content/quickstart.md` | Step-by-step guide |
| `/generator/` | `content/generator.md` | Interactive form |
| `/examples/` | `content/examples/_index.md` | Industry examples |
| `/faq/` | `content/faq.md` | FAQ |
| `/imprint/` | `content/imprint.md` | Legal information |

## Design System

### Fonts

- **Sans-serif:** Inter (body text, UI)
- **Monospace:** JetBrains Mono (code, logo text, page titles)

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

### Typography Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| h1 | 2rem | 600 | Sans |
| h2 | 1.5rem | 600 | Sans |
| h3 | 1.25rem | 600 | Sans |
| h4 | 1.1rem | 600 | Sans |
| body | 1rem (16px) | 400 | Sans |
| code | 0.875em | 400 | Mono |
| small/caption | 0.875rem | 400 | Sans |

### Colors

Use PaperMod CSS variables for theme compatibility:

| Variable | Usage |
|----------|-------|
| `var(--theme)` | Page background |
| `var(--content)` | Main text color |
| `var(--secondary)` | Muted text |
| `var(--border)` | Borders, dividers |
| `var(--code-bg)` | Code blocks, table headers |
| `var(--primary)` | Links, accents |

### Buttons

```html
<a href="/path/" class="btn btn-primary">Primary Action</a>
<a href="/path/" class="btn btn-secondary">Secondary Action</a>
```

### Generator Form

The generator page (`/generator/`) uses JavaScript in `static/js/generator.js`:
- Form with all v1.0.0 fields
- Generates valid YAML frontmatter
- Copy to clipboard and download functionality

Styles are in `custom.css` under "Generator Form" section.

## Development Commands

```bash
# Start dev server
cd site && hugo server -D

# Build for production
cd site && hugo --minify

# Check for errors
cd site && hugo --templateMetrics
```

## Common Tasks

### Adding a New Page

1. Create file in `content/` (NOT in `content/en/`)
2. Add frontmatter with title, description, date, weight
3. **Important:** Set `date` to today or past (future dates won't build!)
4. Add to menu in `hugo.yaml` if needed

### Modifying Styles

**Always edit `assets/css/extended/custom.css`** - never modify theme files.

Use CSS variables for colors to support dark mode automatically.

### Updating the Generator

1. Edit `static/js/generator.js`
2. Update form fields in `render()` method
3. Update `collectData()` for data gathering
4. Update `toYaml()` for output format
5. Test in browser at `/generator/`

## Do NOT

- Modify files in `themes/PaperMod/` (use overrides in `layouts/`)
- Put content in `content/en/` subdirectory (use `content/` directly)
- Add language redirect scripts (removed for single-language)
- Hardcode colors (use CSS variables)
- Create new CSS files (add to custom.css)
- Use inline styles in content
- Set future dates in frontmatter (pages won't build)

## Testing Checklist

Before committing changes:

- [ ] Run `hugo --minify` without errors
- [ ] Test all routes: /, /spec/, /quickstart/, /generator/, /examples/, /faq/
- [ ] Check both light and dark mode
- [ ] Test generator form creates valid YAML
- [ ] Verify navigation links work
- [ ] Ensure tables are full width
- [ ] Verify fonts are consistent
