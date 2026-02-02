# AGENTS.md - Contributor Guide for AI Coding Agents

> Instructions for AI coding agents working on the agenticweb.md project

## Project Overview

This repository contains the **agenticweb.md specification v1.0.0** — a standardized file format for organizations to publish their AI agent capabilities at their domain root.

**Status:** v1.0.0 is complete and ready for use.

## Project Structure

```
agenticweb.md/
├── site/                        # Hugo website (agenticweb.md)
│   ├── content/                 # English content (single language)
│   │   ├── _index.md            # Homepage
│   │   ├── spec/_index.md       # Specification page
│   │   ├── quickstart.md        # Quick start guide
│   │   ├── generator.md         # Interactive generator
│   │   ├── examples/_index.md   # Examples page
│   │   ├── faq.md               # FAQ
│   │   └── imprint.md           # Legal
│   ├── static/js/generator.js   # Generator JavaScript
│   ├── layouts/partials/        # Custom Hugo partials
│   ├── assets/css/extended/     # Custom CSS
│   └── hugo.yaml                # Hugo configuration
├── spec/                        # Formal specification
│   └── agenticweb-spec-v1.md    # v1.0.0 spec document
├── schema/                      # JSON Schema
│   └── agenticweb-v1.schema.json
├── examples/                    # Industry examples
│   ├── bank/agenticweb.md       # Harborstone Credit Union
│   ├── ecommerce/agenticweb.md  # Glowmarket
│   ├── saas/agenticweb.md       # Stacklane
│   └── newspaper/agenticweb.md  # Atlas Journal
├── tools/                       # Tooling
│   └── validator/               # @agenticweb-md/validator npm package
│       ├── src/index.ts         # Validation functions
│       ├── src/cli.ts           # CLI tool
│       └── package.json
├── skills/                      # Example SKILL.md files
├── agenticweb.md                # Self-example (dogfooding)
├── concept.md                   # Design rationale
└── README.md                    # Project overview
```

## What's Implemented (v1.0.0)

### Specification
- **Core fields:** `agenticweb`, `description`, `updated`
- **Organization:** `organization` block with name, legal_name, website, registration_id, vat_id, address, managing_director, certifications
- **Contacts:** `contacts` block (support, security, dpo, sales, press) - values can be mailto: or https:
- **Links:** Array of link objects with name, url, description, and optional permissions
- **Trust:** `trust` block with allowed_origins and marketplaces
- **Permissions:** Per-resource permissions (read, cite, summarize, train, execute, cache) on links and capabilities
- **Capabilities:** Array with pre-flight fields:
  - `kind`: api, mcp, skill, a2a, model, docs, data, ui, commerce
  - `id`, `description`, `url`
  - `status`: active, beta, deprecated
  - `pricing_model`: free, freemium, paid
  - `auth_required`, `auth_registration`
  - `permissions`: Per-capability permissions
  - `compliance`: AI Act risk level (for AI capabilities)
  - Kind-specific fields (schema, transport, format, source, model_id, etc.)

### Key Design Changes (v1)
- **Domain as identity:** No root-level `name` slug - the domain is the identifier
- **Per-resource permissions:** Permissions on links and capabilities, not organization-level
- **Links as array:** Flexible array of link objects with optional permissions
- **Certifications in organization:** ISO 27001, TISAX, SOC 2, etc. in organization block
- **AI Act per-capability:** EU AI Act risk levels on AI capabilities (skills, models), not org-level
- **Model kind:** New capability kind for AI models with source, model_id, model_card, api_compatibility
- **Legal imprint:** Organization block supports EU Impressum fields (vat_id, address, managing_director)
- **No categories:** Removed categories block

### Discovery Mechanisms
- Default: `https://example.com/agenticweb.md`
- DNS fallback: `_agenticweb.example.com TXT "url=https://..."`
- HTML link: `<link rel="agenticweb" href="/agenticweb.md">`

### Tooling
- **Validator CLI:** `npx @agenticweb-md/validator <file-or-url>`
- **Web Generator:** Interactive form at /generator/
- **JSON Schema:** For programmatic validation

### Website
- Single-language (English)
- Hugo + PaperMod theme
- Pages: Home, Spec, Quick Start, Generator, Examples, FAQ, Imprint

## Development Guidelines

### Working with the Hugo Site

```bash
cd site
hugo server -D          # Development server
hugo --minify           # Production build
```

**Important:**
- Content is in `site/content/` (NOT `site/content/en/`)
- Single language only - no i18n redirects
- Custom styles in `site/assets/css/extended/custom.css`

### Validation

```bash
# Validate a file
cd tools/validator
npm run build
node dist/cli.js ../../agenticweb.md

# Or use npx
npx @agenticweb-md/validator ./agenticweb.md

# Validate all examples
for f in examples/*/agenticweb.md; do
  npx @agenticweb-md/validator "$f"
done
```

### Updating the Spec

When making spec changes:
1. Update `spec/agenticweb-spec-v1.md`
2. Update `schema/agenticweb-v1.schema.json`
3. Sync to `site/content/spec/_index.md`
4. Update `site/content/quickstart.md` examples
5. Update `site/content/examples/_index.md`
6. Update `examples/*/agenticweb.md` files
7. Update `tools/validator/schema/` copy
8. Update root `agenticweb.md` (dogfooding)
9. Validate all files

### Working with Examples

Examples should include:
- All required fields (`agenticweb`, `description`)
- `organization` block with certifications where applicable
- `links` array with permissions on sensitive resources
- `capabilities` with `status` and `pricing_model`
- `compliance` block on AI capabilities (skills, models)
- `auth_required` and `auth_registration` where applicable
- `permissions` on data capabilities

## Code Style

### YAML
- 2-space indentation
- Quote strings that could be misinterpreted
- Use explicit types when needed

### Markdown
- ATX-style headers (`#`, `##`)
- Code blocks with language specifiers
- Keep lines under 100 characters

### TypeScript (validator)
- ES modules
- Strict type checking
- No external dependencies beyond ajv and yaml

## Common Tasks

### Adding a New Content Page
1. Create file in `site/content/`
2. Add frontmatter with title, description, date, weight
3. Add to menu in `site/hugo.yaml` if needed

### Adding a New Example
1. Create directory in `examples/`
2. Add `agenticweb.md` with all v1 fields
3. Validate: `npx @agenticweb-md/validator examples/new/agenticweb.md`
4. Add to `site/content/examples/_index.md`

### Updating the Generator
1. Edit `site/static/js/generator.js`
2. Update form fields to match schema
3. Update `toYaml()` method for output
4. Test in browser

## Commit Guidelines

Use conventional commits:
```
feat: add new capability kind
fix: correct schema validation
docs: update quickstart examples
chore: update dependencies
```

## Testing Checklist

Before committing:
- [ ] All example files validate
- [ ] Hugo builds without errors: `hugo --minify`
- [ ] All routes work (/, /spec/, /quickstart/, /generator/, /examples/, /faq/)
- [ ] Generator JS loads and works
- [ ] Light and dark mode look correct

---

*This is the authoritative guide for AI agents working on this repository.*
