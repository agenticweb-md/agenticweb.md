# agenticweb.md Specification v1.0.0

**Version:** 1.0.0  
**Status:** Stable  
**Last Updated:** February 2026  
**License:** CC-BY-4.0

---

## Abstract

This document specifies the `agenticweb.md` file format, a single discovery
endpoint that organizations publish at their domain root. The file provides
machine-readable organization metadata, trust signals, permissions, compliance
information, and a unified index of capabilities (Skills, MCP, A2A, APIs,
AI Models, documentation, data, UI, commerce).

`agenticweb.md` is intentionally minimal: it provides **pre-flight information**
that agents need before deciding to interact, then links to authoritative
specifications (SKILL.md, MCP, OpenAPI, A2A Agent Cards, Model Cards) for
implementation details.

---

## 1. Goals

1. **Discovery** — A predictable entry point for AI agents and marketplaces.
2. **Trust** — Organization metadata, compliance signals, and verified listings.
3. **Pre-Flight Checks** — Information agents need *before* loading capabilities.
4. **Simplicity** — One file, frontmatter-only parsing for machines.
5. **Interoperability** — Link to existing standards, do not replace them.
6. **Legal Compliance** — Support for EU Impressum and regulatory requirements.

---

## 2. File Location and Discovery

### 2.1 Canonical Location

An `agenticweb.md` file MUST be available at the domain root:

```
https://example.com/agenticweb.md
```

**Requirements:**

- MUST be accessible via HTTPS.
- MUST be at the domain root (not in subdirectories).
- MUST be encoded in UTF-8.
- SHOULD be served with `Content-Type: text/markdown` or `text/plain`.

**Note:** The domain itself serves as the organization identifier. No separate
slug or ID field is required.

### 2.2 DNS Discovery (Optional)

Organizations MAY publish a DNS TXT record at `_agenticweb.{domain}` to specify
an alternative location:

```
_agenticweb.example.com  TXT  "url=https://cdn.example.com/agenticweb.md"
_agenticweb.example.com  TXT  "path=/custom/agenticweb.md"
```

**TXT Record Format:**

| Key | Description | Example |
|-----|-------------|---------|
| `url` | Full URL to the agenticweb.md file | `url=https://cdn.example.com/agenticweb.md` |
| `path` | Path on the same domain | `path=/bucket/agenticweb.md` |

**Discovery Order:**

1. Check DNS TXT record at `_agenticweb.{domain}`.
2. If `url=` is present, fetch from that URL.
3. If `path=` is present, fetch from `https://{domain}{path}`.
4. Otherwise, fetch from `https://{domain}/agenticweb.md`.

### 2.3 HTML Discovery (Optional)

Organizations MAY include a discovery link in HTML:

```html
<link rel="agenticweb" href="/agenticweb.md" type="text/markdown" />
```

---

## 3. Parsing Rules

1. Ignore a UTF-8 BOM if present.
2. Extract YAML frontmatter between the first pair of `---` delimiters.
3. Parse YAML using a compliant parser.
4. The Markdown body is **non-normative** and for humans only.

Agents MUST NOT parse capability data from the Markdown body.

---

## 4. YAML Frontmatter Schema

### 4.1 Required Fields

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `agenticweb` | string | `"1"` or `"1.0.0"` | Spec version identifier |
| `description` | string | 1-400 chars | Discovery description for the organization |

### 4.2 Recommended Fields

| Field | Type | Description |
|-------|------|-------------|
| `updated` | string | ISO 8601 date (`YYYY-MM-DD`) |

### 4.3 Organization Block

The organization block provides identity information and can serve as a
machine-readable legal imprint (EU Impressum).

```yaml
organization:
  name: "Acme Bank"
  legal_name: "Acme Bank, N.A."
  website: "https://acme.example"
  registration_id: "LEI-549300EXAMPLE"
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
    - name: "ISO 42001"
    - name: "SOC 2 Type II"
    - name: "TISAX"
      level: "AL3"
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Human display name (brand) |
| `legal_name` | string | Full legal entity name |
| `website` | URL | Primary website |
| `registration_id` | string | Official registration ID (LEI, DUNS, HRB, etc.) |
| `vat_id` | string | VAT identification number |
| `address` | object | Physical address |
| `address.street` | string | Street address |
| `address.city` | string | City |
| `address.postal_code` | string | Postal/ZIP code |
| `address.country` | string | ISO 3166-1 alpha-2 country code |
| `managing_director` | string | Responsible person (Geschäftsführer, CEO) |
| `certifications` | array | Organization-level certifications |

**Certifications:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Certification name (e.g., "ISO 27001", "TISAX", "SOC 2") |
| `valid_until` | No | Expiration date (ISO 8601) |
| `level` | No | Certification level if applicable (e.g., TISAX "AL3") |

### 4.4 Contacts Block

Contact information for various purposes. Values can be either `mailto:` URIs
for email addresses or `https://` URLs for web forms.

```yaml
contacts:
  support: "mailto:support@example.com"
  security: "mailto:security@example.com"
  dpo: "mailto:dpo@example.com"
  sales: "https://example.com/contact-sales"
```

| Field | Description |
|-------|-------------|
| `support` | General support contact |
| `security` | Security issues and vulnerability reports |
| `dpo` | Data Protection Officer (GDPR) |
| `sales` | Sales inquiries |
| `press` | Press and media inquiries |

**Notes:**

- Values MUST be valid URIs (`mailto:` or `https://`).
- `dpo` is recommended for GDPR compliance.
- Additional custom contact types are allowed.

### 4.5 Links Block

A flexible array of links to resources. Each link can have optional permissions
to indicate how AI agents may use that resource.

```yaml
links:
  - name: "docs"
    url: "https://docs.example.com"
    description: "Developer documentation"
    
  - name: "privacy"
    url: "https://example.com/privacy"
    
  - name: "terms"
    url: "https://example.com/terms"
    
  - name: "ai-policy"
    url: "https://example.com/ai-transparency"
    description: "AI transparency and usage policy"
    
  - name: "llms"
    url: "https://docs.example.com/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: true
      
  - name: "sitemap"
    url: "https://example.com/sitemap.xml"
    
  - name: "twitter"
    url: "https://twitter.com/example"
    
  - name: "github"
    url: "https://github.com/example"
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Link identifier (e.g., "privacy", "docs", "twitter") |
| `url` | Yes | The link URL |
| `description` | No | Human-readable description |
| `permissions` | No | Permission settings for this resource |

**Common link names:**

- `docs` — Documentation
- `privacy` — Privacy policy
- `terms` — Terms of service
- `ai-policy` — AI usage policy
- `llms` — llms.txt file
- `sitemap` — XML sitemap
- `status` — Status page
- `developer-portal` — Developer portal
- Social media: `twitter`, `github`, `linkedin`, `discord`, etc.

### 4.6 Permissions Object

Permissions declare what AI agents are allowed to do with a resource.
Permissions are specified **per-link** and **per-capability**, not at the
organization level.

```yaml
permissions:
  read: true
  cite: true
  summarize: true
  train: false
  execute: true
  cache: true
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | boolean | `true` | Agent may access and read the content |
| `cite` | boolean | `true` | Agent may quote content with attribution |
| `summarize` | boolean | `true` | Agent may summarize content for users |
| `train` | boolean | `false` | Content may be used for AI model training |
| `execute` | boolean | `false` | Agent may interact with APIs/tools |
| `cache` | boolean | `true` | Agent may store/cache content locally |

### 4.7 Trust Block

The trust block provides lightweight signals that help agents and marketplaces
confirm ownership and scope.

```yaml
trust:
  allowed_origins:
    - "https://example.com"
    - "https://api.example.com"
    - "https://docs.example.com"
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-abc123"
      listing_type: "agent"
    - platform: "mcp-registry"
      url: "https://mcp.run/servers/acme-catalog"
      listing_type: "mcp"
```

| Field | Description |
|-------|-------------|
| `allowed_origins` | List of origins controlled by the organization |
| `marketplaces` | External listings that corroborate identity |

**Marketplace listing fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `platform` | Yes | Platform identifier (free-form string) |
| `url` | Yes | URL to the listing |
| `listing_type` | No | Type: `"agent"`, `"mcp"`, `"api"`, `"organization"` |

---

## 5. Capabilities Block

All capabilities are listed in a single array. Each capability provides
**pre-flight information** that agents need before loading the full specification.

### 5.1 Required Capability Fields

| Field | Required | Description |
|-------|----------|-------------|
| `kind` | Yes | `skill`, `mcp`, `api`, `a2a`, `model`, `docs`, `data`, `ui`, `commerce` |
| `id` | Yes | Stable identifier, lowercase `a-z0-9-` |
| `description` | Yes | Short description (1-160 chars) |
| `url` | Yes | Canonical URL or endpoint |

### 5.2 Pre-Flight Capability Fields

These fields provide information agents need *before* loading the capability:

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | `"active"` (default), `"beta"`, `"deprecated"` |
| `pricing_model` | string | `"free"`, `"freemium"`, `"paid"` |
| `auth_required` | boolean | Whether authentication is required |
| `auth_registration` | URL | Where to register for credentials |
| `permissions` | object | Permission settings for this capability |

### 5.3 Capability-Level Compliance

For AI capabilities (skills, models, etc.), compliance information can be
specified per capability. This is where EU AI Act risk levels belong.

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

| Field | Type | Description |
|-------|------|-------------|
| `compliance.ai_act_risk_level` | string | `"minimal"`, `"limited"`, `"high"` |
| `compliance.conformity_url` | URL | Link to conformity assessment |
| `compliance.human_oversight_required` | boolean | Requires human review |

### 5.4 Kind-Specific Fields

#### skill

```yaml
- kind: "skill"
  id: "mortgage-advisor"
  description: "Guides users through mortgage options and requirements."
  url: "https://example.com/skills/mortgage-advisor/SKILL.md"
  status: "active"
  pricing_model: "free"
```

#### mcp

```yaml
- kind: "mcp"
  id: "rates"
  description: "MCP tools for rate lookup and comparisons."
  url: "mcp://api.example.com/rates"
  transport: "http"
  status: "active"
  pricing_model: "freemium"
  auth_required: true
```

| Field | Type | Values |
|-------|------|--------|
| `transport` | string | `"stdio"`, `"http"`, `"sse"` |

#### api

```yaml
- kind: "api"
  id: "orders"
  description: "Orders REST API."
  url: "https://api.example.com/v1"
  schema: "https://api.example.com/openapi.json"
  status: "active"
  pricing_model: "freemium"
  auth_required: true
  auth_registration: "https://developers.example.com/signup"
```

| Field | Type | Description |
|-------|------|-------------|
| `schema` | URL | OpenAPI or GraphQL schema URL |

#### a2a

```yaml
- kind: "a2a"
  id: "support-agent"
  description: "Remote support agent via A2A."
  url: "https://example.com/.well-known/agent-card.json"
  status: "active"
  pricing_model: "paid"
```

#### model

For AI models (LLMs, embeddings, etc.):

```yaml
- kind: "model"
  id: "acme-finance-llm"
  description: "Fine-tuned LLM for financial document analysis."
  url: "https://api.example.com/v1/completions"
  source: "huggingface"
  model_id: "acme-org/finance-llm-v2"
  model_card: "https://huggingface.co/acme-org/finance-llm-v2"
  api_compatibility: "openai"
  schema: "https://api.example.com/openapi.json"
  status: "active"
  pricing_model: "paid"
  auth_required: true
  compliance:
    ai_act_risk_level: "limited"
```

| Field | Type | Description |
|-------|------|-------------|
| `source` | string | `"huggingface"`, `"github"`, `"ollama"`, `"custom"` |
| `model_id` | string | Identifier on the source platform |
| `model_card` | URL | Link to model card with full details |
| `api_compatibility` | string | `"openai"`, `"gemini"`, `"anthropic"`, `"custom"` |
| `schema` | URL | OpenAPI spec if custom API |

#### docs

```yaml
- kind: "docs"
  id: "developer-docs"
  description: "Developer documentation."
  url: "https://docs.example.com/llms.txt"
  format: "llms.txt"
  permissions:
    read: true
    train: false
```

| Field | Type | Values |
|-------|------|--------|
| `format` | string | `"llms.txt"`, `"markdown"`, `"html"` |

#### data

```yaml
- kind: "data"
  id: "rate-history"
  description: "Historical rate dataset (daily)."
  url: "https://data.example.com/rates.csv"
  format: "csv"
  license: "CC-BY-4.0"
  status: "active"
  pricing_model: "free"
  permissions:
    read: true
    train: true
    cache: true
```

| Field | Type | Description |
|-------|------|-------------|
| `format` | string | `"csv"`, `"json"`, `"parquet"`, etc. |
| `license` | string | SPDX license identifier |

#### ui

```yaml
- kind: "ui"
  id: "dashboard"
  description: "Interactive dashboard widget."
  url: "https://example.com/embed/dashboard"
  manifest: "https://example.com/embed/manifest.json"
```

| Field | Type | Description |
|-------|------|-------------|
| `manifest` | URL | UI manifest URL |

#### commerce

```yaml
- kind: "commerce"
  id: "checkout"
  description: "Agent-initiated checkout flow with user confirmation."
  url: "https://example.com/checkout"
  pricing: "https://developers.example.com/pricing"
  refunds: "https://example.com/returns"
  currencies: ["USD", "EUR"]
  regions: ["US", "EU"]
  requires_user_confirmation: true
  status: "active"
  pricing_model: "paid"
```

| Field | Type | Description |
|-------|------|-------------|
| `pricing` | URL | Pricing page URL |
| `refunds` | URL | Refund policy URL |
| `currencies` | array | Supported currency codes |
| `regions` | array | Supported region codes |
| `requires_user_confirmation` | boolean | User must confirm transactions |

---

## 6. Validation Rules

Agents SHOULD validate:

1. Required fields present: `agenticweb`, `description`.
2. URLs are valid and use HTTPS (except `mcp://`).
3. Capability `id` follows slug rules (`a-z0-9-`).
4. `kind` is one of the allowed values.
5. `status` is one of: `active`, `beta`, `deprecated`.
6. `pricing_model` is one of: `free`, `freemium`, `paid`.
7. `ai_act_risk_level` is one of: `minimal`, `limited`, `high`.
8. Contact values are valid URIs (`mailto:` or `https://`).

---

## 7. Examples

### 7.1 Minimal Example

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

### 7.2 Full Example

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
    - name: "PCI DSS"

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
  - name: "status"
    url: "https://status.acme.example"

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
    auth_registration: "https://developers.acme.example/signup"

  - kind: skill
    id: mortgage-advisor
    description: "Guides users through mortgage options and requirements."
    url: "https://acme.example/skills/mortgage-advisor/SKILL.md"
    status: "active"
    pricing_model: "free"

  - kind: skill
    id: credit-scorer
    description: "Automated credit scoring and eligibility assessment."
    url: "https://acme.example/skills/credit-scorer/SKILL.md"
    status: "active"
    pricing_model: "paid"
    auth_required: true
    compliance:
      ai_act_risk_level: "high"
      conformity_url: "https://acme.example/ai-act/credit-scorer"
      human_oversight_required: true

  - kind: docs
    id: developer-docs
    description: "Developer documentation and onboarding."
    url: "https://docs.acme.example/llms.txt"
    format: "llms.txt"

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

# Acme Bank

Consumer banking APIs and mortgage tools for the agentic web.
```

---

## 8. Design Principles

### 8.1 Gateway, Not Duplicate

`agenticweb.md` is a **gateway** to capabilities, not a replacement for their
specifications. Information that belongs in SKILL.md, OpenAPI, MCP, A2A, or
Model Cards should NOT be duplicated here.

**Include in agenticweb.md:**
- Pre-flight checks (status, pricing, auth required)
- Organization identity and legal imprint
- Trust signals and certifications
- Resource permissions
- Discovery metadata

**Do NOT include (belongs in linked specs):**
- Detailed authentication flows
- API endpoints and parameters
- Tool definitions
- Model architecture details
- Dependencies between capabilities

### 8.2 Pre-Flight Philosophy

Every field in agenticweb.md should answer a question an agent has **before**
loading the full capability specification:

| Question | Field |
|----------|-------|
| Who is this organization? | `organization` |
| Can I trust them? | `certifications`, `trust.marketplaces` |
| How do I contact them? | `contacts` |
| What do they offer? | `capabilities` |
| Is it production-ready? | `status` |
| Will it cost money? | `pricing_model` |
| Do I need credentials? | `auth_required`, `auth_registration` |
| Can I use this content? | `permissions` (per-resource) |
| What are the AI risks? | `compliance.ai_act_risk_level` (per-capability) |

### 8.3 Domain as Identity

The domain where `agenticweb.md` is published serves as the organization
identifier. No separate slug or ID field is needed at the root level.

### 8.4 Per-Resource Permissions

Permissions are specified at the resource level (links and capabilities), not
at the organization level. This allows fine-grained control over how agents
may use different resources.

---

## 9. References

- [Agent Skills (SKILL.md)](https://agentskills.io)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- [A2A Protocol](https://a2a-protocol.org)
- [llms.txt](https://llmstxt.org)
- [EU AI Act](https://artificialintelligenceact.eu)
- [Hugging Face Model Cards](https://huggingface.co/docs/hub/model-cards)

---

*This specification is maintained at https://github.com/agenticweb-md/agenticweb.md*
