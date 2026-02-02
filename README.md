# agenticweb.md

> **Your Organization's Front Door to the Agentic Web**

`agenticweb.md` is a single discovery file you publish at your domain root:

```
https://example.com/agenticweb.md
```

It answers key questions for agents and marketplaces **before** they load your full specs:

1. **Who are you?** — organization metadata, jurisdiction
2. **What's allowed?** — permissions (read, cite, train, execute)
3. **Is it safe?** — compliance (GDPR, AI Act risk level)
4. **What do you offer?** — capability index with pre-flight info
5. **Where is it?** — canonical URLs to Skills, MCP, APIs, etc.

It **does not** replace SKILL.md, MCP, OpenAPI, or A2A. It links to them.

---

## Quick Example

```yaml
---
agenticweb: "1"
name: example-org
description: "APIs and skills for payment processing."
updated: "2026-02-02"

organization:
  name: "Example Org"
  legal_name: "Example Org, Inc."
  website: "https://example.com"
  jurisdiction: ["US", "EU"]

contacts:
  support: "mailto:support@example.com"
  security: "mailto:security@example.com"

permissions:
  read: true
  cite: true
  summarize: true
  train: false
  execute: true
  cache: true

compliance:
  gdpr_compliant: true
  ai_act_risk_level: "minimal"

trust:
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-abc123"
      listing_type: "agent"

capabilities:
  - kind: api
    id: payments
    description: "Payments REST API."
    url: "https://api.example.com/v1"
    schema: "https://api.example.com/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true
    auth_registration: "https://developers.example.com/signup"

  - kind: skill
    id: invoice-assistant
    description: "Generate and reconcile invoices."
    url: "https://example.com/skills/invoice-assistant/SKILL.md"
    status: "active"
    pricing_model: "free"
---
```

---

## Why This Exists

- **Discovery:** agents need a predictable entry point
- **Pre-flight checks:** agents can filter capabilities without loading full specs
- **Trust:** marketplaces get consistent org metadata and verification hints
- **Compliance:** declare GDPR, AI Act, certifications upfront
- **Simplicity:** one file, frontmatter-only parsing, minimal schema

---

## Capability Types

| Kind | Description | Example URL |
|------|-------------|-------------|
| `skill` | SKILL.md file | `https://example.com/skills/foo/SKILL.md` |
| `mcp` | MCP server endpoint | `mcp://api.example.com/tools` |
| `a2a` | A2A Agent Card | `https://example.com/.well-known/agent.json` |
| `api` | REST/GraphQL API | `https://api.example.com/v1` |
| `docs` | llms.txt or docs | `https://docs.example.com/llms.txt` |
| `data` | Datasets | `https://example.com/data/catalog.json` |
| `ui` | UI widgets | `https://example.com/widgets/checkout` |
| `commerce` | Checkout flows | `https://example.com/checkout` |

---

## Discovery

**Default location:**
```
https://example.com/agenticweb.md
```

**DNS fallback (for CDN/bucket hosting):**
```
_agenticweb.example.com TXT "url=https://cdn.example.com/agenticweb.md"
```

---

## Validation

```bash
# Validate via URL
npx @agenticweb-md/validator https://example.com/agenticweb.md

# Validate local file
npx @agenticweb-md/validator ./agenticweb.md
```

---

## Project Structure

```
agenticweb.md/
├── site/                    # Hugo website (agenticweb.md)
├── spec/                    # Formal specification
├── schema/                  # JSON Schema for validation
├── examples/                # Industry examples (bank, ecommerce, saas, media)
├── tools/validator/         # CLI validator (@agenticweb-md/validator)
├── skills/                  # Example skills
├── agenticweb.md            # Self-example (dogfooding)
└── README.md                # This file
```

---

## Documentation

- **Website:** https://agenticweb.md
- **Specification:** https://agenticweb.md/spec/
- **Quick Start:** https://agenticweb.md/quickstart/
- **Generator:** https://agenticweb.md/generator/
- **Examples:** https://agenticweb.md/examples/

---

## License

- **Specification:** [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)
- **Code/Tools:** [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
