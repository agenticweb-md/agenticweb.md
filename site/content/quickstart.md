---
title: "Quick Start - Create Your agenticweb.md"
description: "Create a single discovery file for your organization in minutes."
date: 2026-02-02
weight: 20
keywords: ["agenticweb.md quickstart", "AI agent discovery", "capability index", "MCP", "A2A", "SKILL.md"]
---

Create your `agenticweb.md` in minutes.

---

## Step 1: Create the File

Create `agenticweb.md` with this minimal structure:

```yaml
---
agenticweb: "1"
description: "Short discovery description of what you offer (up to 400 chars)."

capabilities:
  - kind: api
    id: public-api
    description: "Public REST API."
    url: "https://api.yourcompany.com/v1"
    schema: "https://api.yourcompany.com/openapi.json"
---
```

**Required fields:** `agenticweb`, `description`.

---

## Step 2: Add Organization Info

Include identity and legal imprint information:

```yaml
organization:
  name: "Your Company"
  legal_name: "Your Company, Inc."
  website: "https://yourcompany.com"
  registration_id: "HRB 12345"
  vat_id: "DE123456789"
  address:
    street: "123 Main Street"
    city: "Berlin"
    postal_code: "10115"
    country: "DE"
  certifications:
    - name: "ISO 27001"
    - name: "SOC 2 Type II"

contacts:
  support: "mailto:support@yourcompany.com"
  security: "mailto:security@yourcompany.com"
  dpo: "mailto:dpo@yourcompany.com"
  sales: "https://yourcompany.com/contact-sales"
```

---

## Step 3: Add Links with Permissions

Add links to resources with optional per-resource permissions:

```yaml
links:
  - name: "docs"
    url: "https://docs.yourcompany.com"
    description: "Developer documentation"
  - name: "privacy"
    url: "https://yourcompany.com/privacy"
  - name: "terms"
    url: "https://yourcompany.com/terms"
  - name: "llms"
    url: "https://docs.yourcompany.com/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false        # Important: opt out of training
      cache: true
```

---

## Step 4: Add Trust Signals

Marketplaces help confirm that the entry is real.

```yaml
trust:
  allowed_origins:
    - "https://yourcompany.com"
    - "https://api.yourcompany.com"
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-yourcompany"
      listing_type: "agent"
```

---

## Step 5: Add Pre-Flight Info to Capabilities

Help agents make decisions before loading full specs:

```yaml
capabilities:
  - kind: api
    id: public-api
    description: "Public REST API."
    url: "https://api.yourcompany.com/v1"
    schema: "https://api.yourcompany.com/openapi.json"
    status: "active"           # active | beta | deprecated
    pricing_model: "freemium"  # free | freemium | paid
    auth_required: true
    auth_registration: "https://developers.yourcompany.com/signup"

  - kind: data
    id: public-dataset
    description: "Public dataset for research."
    url: "https://data.yourcompany.com/dataset.csv"
    format: "csv"
    license: "CC-BY-4.0"
    permissions:
      read: true
      train: true
      cache: true
```

---

## Step 6: Publish

Place the file at:

```
https://yourcompany.com/agenticweb.md
```

Or use DNS discovery for custom locations:

```
_agenticweb.yourcompany.com  TXT  "url=https://cdn.yourcompany.com/agenticweb.md"
```

---

## Step 7: Validate

```bash
# Using npx (no install needed)
npx @agenticweb-md/validator https://yourcompany.com/agenticweb.md

# Or validate locally
npx @agenticweb-md/validator ./agenticweb.md
```

---

## Full Example

```yaml
---
agenticweb: "1"
description: "Retail catalog, orders, and checkout endpoints for AI agents. Full agentic commerce support with product discovery and user-confirmed purchases."
updated: "2026-02-15"

organization:
  name: "Lumen Retail"
  legal_name: "Lumen Retail Inc."
  website: "https://lumen.example"
  registration_id: "US-DE-1234567"
  address:
    street: "100 Commerce Blvd"
    city: "San Francisco"
    postal_code: "94105"
    country: "US"
  certifications:
    - name: "SOC 2 Type II"

contacts:
  support: "mailto:support@lumen.example"
  security: "mailto:security@lumen.example"
  dpo: "mailto:privacy@lumen.example"
  sales: "https://lumen.example/contact-sales"

links:
  - name: "docs"
    url: "https://docs.lumen.example"
    description: "Developer documentation"
  - name: "developer-portal"
    url: "https://developers.lumen.example"
  - name: "privacy"
    url: "https://lumen.example/privacy"
  - name: "terms"
    url: "https://lumen.example/terms"
  - name: "ai-policy"
    url: "https://lumen.example/ai-policy"
  - name: "llms"
    url: "https://docs.lumen.example/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: true

trust:
  allowed_origins:
    - "https://lumen.example"
    - "https://api.lumen.example"
  marketplaces:
    - platform: "mcp-registry"
      url: "https://mcp.run/servers/lumen-search"
      listing_type: "mcp"

capabilities:
  - kind: mcp
    id: catalog-search
    description: "Product search and recommendations."
    url: "mcp://api.lumen.example/search"
    transport: "http"
    status: "active"
    pricing_model: "free"
    auth_required: true
    auth_registration: "https://developers.lumen.example/signup"

  - kind: api
    id: orders-api
    description: "Orders REST API."
    url: "https://api.lumen.example/v1/orders"
    schema: "https://api.lumen.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: commerce
    id: checkout
    description: "Checkout flow with user confirmation."
    url: "https://lumen.example/checkout"
    pricing: "https://developers.lumen.example/pricing"
    requires_user_confirmation: true
    status: "active"
    pricing_model: "paid"
---

# Lumen Retail

Catalog, orders, and checkout endpoints for agentic commerce.
```

---

## Resources

- [Specification](/spec/)
- [Examples](/examples/)
- [Validator (npm)](https://www.npmjs.com/package/@agenticweb-md/validator)
- [GitHub](https://github.com/agenticweb-md/agenticweb.md)
