---
title: "agenticweb.md Specification v1.0.0"
description: "Minimal, frontmatter-only discovery spec for org identity, trust signals, permissions, compliance, and capability links (Skills, MCP, A2A, APIs, AI Models, docs)."
date: 2026-02-02
weight: 10
keywords: ["agenticweb.md specification", "AI agent discovery", "capability index", "MCP", "A2A", "SKILL.md", "OpenAPI", "llms.txt", "trust signals", "AI Act compliance", "AI models"]
---

**Version:** 1.0.0  
**Status:** Stable  
**Last Updated:** February 2026

---

## Overview

`agenticweb.md` is a **single discovery file** at your domain root that tells
agents who you are and where your capabilities live. It provides **pre-flight
information** that agents need before deciding to interact, then links to
authoritative specifications (SKILL.md, MCP, OpenAPI, A2A, Model Cards) for
implementation details.

**Key Principles:**
- **Gateway, not duplicate.** Information that belongs in SKILL.md, OpenAPI, MCP, A2A, or Model Cards should NOT be duplicated here.
- **Domain as identity.** The domain where `agenticweb.md` is published serves as the organization identifier.
- **Per-resource permissions.** Permissions are specified at the resource level (links and capabilities), not at the organization level.

## Location & Discovery

### Default Location

```
https://example.com/agenticweb.md
```

- Must be HTTPS and at the domain root.
- Must be UTF-8.

### DNS Discovery (Optional)

Organizations can use DNS TXT records for alternative locations:

```
_agenticweb.example.com  TXT  "url=https://cdn.example.com/agenticweb.md"
_agenticweb.example.com  TXT  "path=/custom/agenticweb.md"
```

**Discovery Order:**
1. Check DNS TXT record at `_agenticweb.{domain}`
2. Fallback to `https://{domain}/agenticweb.md`

### HTML Discovery (Optional)

```html
<link rel="agenticweb" href="/agenticweb.md" type="text/markdown" />
```

## Parsing Rules

- Only YAML frontmatter is machine-readable.
- The Markdown body is human-only and optional.

## Required Fields

| Field | Description |
|-------|-------------|
| `agenticweb` | Spec version (`"1"` or `"1.0.0"`) |
| `description` | Discovery description (max 400 chars) |

## Core Blocks

### Organization

Provides identity information and can serve as a machine-readable legal imprint (EU Impressum):

```yaml
organization:
  name: "Acme Bank"
  legal_name: "Acme Bank, N.A."
  website: "https://acme.example"
  registration_id: "HRB 12345"
  vat_id: "DE123456789"
  address:
    street: "123 Financial Blvd"
    city: "Frankfurt"
    postal_code: "60311"
    country: "DE"
  managing_director: "Jane Doe"
  certifications:
    - name: "ISO 27001"
      valid_until: "2027-12-31"
    - name: "SOC 2 Type II"
    - name: "TISAX"
      level: "AL3"
```

### Contacts

Contact URIs can be `mailto:` for email or `https://` for web forms:

```yaml
contacts:
  support: "mailto:support@example.com"
  security: "mailto:security@example.com"
  dpo: "mailto:dpo@example.com"
  sales: "https://example.com/contact-sales"
```

### Links

A flexible array of links with optional permissions:

```yaml
links:
  - name: "docs"
    url: "https://docs.example.com"
    description: "Developer documentation"
    
  - name: "privacy"
    url: "https://example.com/privacy"
    
  - name: "llms"
    url: "https://docs.example.com/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: true
      
  - name: "twitter"
    url: "https://twitter.com/example"
```

**Common link names:** `docs`, `privacy`, `terms`, `ai-policy`, `llms`, `sitemap`, `status`, `developer-portal`, `twitter`, `github`, `linkedin`, `discord`

### Trust

```yaml
trust:
  allowed_origins:
    - "https://example.com"
    - "https://api.example.com"
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-abc123"
      listing_type: "agent"
    - platform: "mcp-registry"
      url: "https://mcp.run/servers/acme-catalog"
      listing_type: "mcp"
```

### Permissions (Per-Resource)

Permissions are specified on links and capabilities, not at the organization level:

```yaml
permissions:
  read: true        # Access and read the content
  cite: true        # Quote with attribution
  summarize: true   # Summarize for users
  train: false      # Use for AI model training
  execute: true     # Interact with APIs/tools
  cache: true       # Store/cache locally
```

## Capabilities

All capabilities in a unified list with **pre-flight information**:

```yaml
capabilities:
  - kind: "skill"
    id: "mortgage-advisor"
    description: "Guides users through mortgage options."
    url: "https://example.com/skills/mortgage-advisor/SKILL.md"
    status: "active"           # active | beta | deprecated
    pricing_model: "free"      # free | freemium | paid
    auth_required: false

  - kind: "mcp"
    id: "rates"
    description: "MCP tools for rate lookup."
    url: "mcp://api.example.com/rates"
    transport: "http"
    status: "active"
    pricing_model: "freemium"
    auth_required: true
    auth_registration: "https://developers.example.com/signup"

  - kind: "api"
    id: "orders"
    description: "Orders REST API."
    url: "https://api.example.com/v1"
    schema: "https://api.example.com/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: "model"
    id: "finance-llm"
    description: "Fine-tuned LLM for financial analysis."
    url: "https://api.example.com/v1/completions"
    source: "huggingface"
    model_id: "acme/finance-llm-v2"
    model_card: "https://huggingface.co/acme/finance-llm-v2"
    api_compatibility: "openai"
    status: "active"
    pricing_model: "paid"

  - kind: "a2a"
    id: "support-agent"
    description: "Remote support agent via A2A."
    url: "https://example.com/.well-known/agent-card.json"
    status: "active"
    pricing_model: "paid"
```

### Capability Pre-Flight Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | `"active"` (default), `"beta"`, `"deprecated"` |
| `pricing_model` | string | `"free"`, `"freemium"`, `"paid"` |
| `auth_required` | boolean | Whether authentication is required |
| `auth_registration` | URL | Where to register for credentials |
| `permissions` | object | Permission settings for this capability |

### Capability-Level Compliance

For AI capabilities (skills, models), specify EU AI Act compliance:

```yaml
capabilities:
  - kind: "skill"
    id: "credit-scorer"
    description: "Automated credit scoring system."
    url: "https://example.com/skills/credit-scorer/SKILL.md"
    status: "active"
    pricing_model: "paid"
    auth_required: true
    compliance:
      ai_act_risk_level: "high"
      conformity_url: "https://example.com/ai-act/credit-scorer"
      human_oversight_required: true
```

### Allowed Kinds

`skill`, `mcp`, `api`, `a2a`, `model`, `docs`, `data`, `ui`, `commerce`

**Kind-specific fields:**

- `schema` (api, model) - OpenAPI/GraphQL schema URL
- `transport` (mcp) - `stdio`, `http`, `sse`
- `format` (docs/data) - `llms.txt`, `markdown`, `csv`, `json`
- `license` (data) - SPDX identifier
- `manifest` (ui) - UI manifest URL
- `source`, `model_id`, `model_card`, `api_compatibility` (model) - Model details
- `pricing`, `refunds`, `currencies`, `regions`, `requires_user_confirmation` (commerce)

## Minimal Example

```yaml
---
agenticweb: "1"
description: "APIs and skills for payment processing."

capabilities:
  - kind: api
    id: payments
    description: "Payments REST API."
    url: "https://api.example.com/v1"
    schema: "https://api.example.com/openapi.json"
---
```

## Full Example

```yaml
---
agenticweb: "1"
description: "Consumer banking APIs, mortgage tools, and compliance-ready AI services."
updated: "2026-02-15"

organization:
  name: "Acme Bank"
  legal_name: "Acme Bank, N.A."
  website: "https://acme.example"
  registration_id: "HRB 12345"
  vat_id: "DE123456789"
  address:
    street: "123 Financial Blvd"
    city: "Frankfurt"
    postal_code: "60311"
    country: "DE"
  managing_director: "Jane Doe"
  certifications:
    - name: "ISO 27001"
      valid_until: "2027-12-31"
    - name: "SOC 2 Type II"

contacts:
  support: "mailto:api-support@acme.example"
  security: "mailto:security@acme.example"
  dpo: "mailto:privacy@acme.example"
  sales: "https://acme.example/contact-sales"

links:
  - name: "docs"
    url: "https://docs.acme.example"
    description: "Developer documentation"
  - name: "privacy"
    url: "https://acme.example/privacy"
  - name: "terms"
    url: "https://acme.example/terms"
  - name: "ai-policy"
    url: "https://acme.example/ai-transparency"
  - name: "llms"
    url: "https://docs.acme.example/llms.txt"
    permissions:
      read: true
      summarize: true
      train: false

trust:
  allowed_origins:
    - "https://acme.example"
    - "https://api.acme.example"
  marketplaces:
    - platform: "mcp-registry"
      url: "https://mcp.run/servers/acme-rates"
      listing_type: "mcp"

capabilities:
  - kind: model
    id: acme-finance-llm
    description: "Fine-tuned LLM for financial document analysis."
    url: "https://api.acme.example/v1/completions"
    source: "huggingface"
    model_id: "acme-bank/finance-llm-v2"
    model_card: "https://huggingface.co/acme-bank/finance-llm-v2"
    api_compatibility: "openai"
    status: "active"
    pricing_model: "paid"
    auth_required: true
    compliance:
      ai_act_risk_level: "limited"

  - kind: mcp
    id: rates
    description: "Rate lookup and mortgage comparison tools."
    url: "mcp://api.acme.example/rates"
    transport: "http"
    status: "active"
    pricing_model: "free"
    auth_required: true
    auth_registration: "https://developers.acme.example/signup"

  - kind: api
    id: mortgage-api
    description: "Mortgage products and eligibility API."
    url: "https://api.acme.example/v1"
    schema: "https://api.acme.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: skill
    id: credit-scorer
    description: "Automated credit scoring assessment."
    url: "https://acme.example/skills/credit-scorer/SKILL.md"
    status: "active"
    pricing_model: "paid"
    auth_required: true
    compliance:
      ai_act_risk_level: "high"
      conformity_url: "https://acme.example/ai-act/credit-scorer"
      human_oversight_required: true

  - kind: data
    id: rate-history
    description: "Historical rate dataset (daily updates)."
    url: "https://data.acme.example/rates.csv"
    format: "csv"
    license: "CC-BY-4.0"
    status: "active"
    pricing_model: "free"
    permissions:
      read: true
      train: true
      cache: true
---
```

## Validation

Use the official validator:

```bash
npx @agenticweb-md/validator ./agenticweb.md
```

Or validate from URL:

```bash
npx @agenticweb-md/validator https://example.com/agenticweb.md
```

---

**References:**

- [SKILL.md](https://agentskills.io)
- [MCP](https://modelcontextprotocol.io)
- [A2A](https://a2a-protocol.org)
- [llms.txt](https://llmstxt.org)
- [EU AI Act](https://artificialintelligenceact.eu)
- [Hugging Face Model Cards](https://huggingface.co/docs/hub/model-cards)
