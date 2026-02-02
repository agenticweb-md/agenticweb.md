---
title: "agenticweb.md Examples"
description: "Copy-paste examples for banking, commerce, SaaS, and media using the v1 schema with per-resource permissions and AI model support."
date: 2026-02-02
weight: 30
keywords: ["agenticweb.md examples", "AI discovery examples", "MCP", "A2A", "SKILL.md", "OpenAPI", "marketplaces", "AI Act compliance", "AI models"]
---

Real-world examples of `agenticweb.md` files using the v1 schema with per-resource permissions, certifications, and AI model capabilities.

---

## Bank / Credit Union {#bank}

```yaml
---
agenticweb: "1"
description: "Consumer lending and mortgage tools with rate APIs, eligibility checks, and compliance-ready AI services for responsible lending."
updated: "2026-02-15"

organization:
  name: "Harborstone Credit Union"
  legal_name: "Harborstone Credit Union"
  website: "https://harborstone.example"
  registration_id: "NCUA-48219"
  address:
    street: "500 Harbor Way"
    city: "Seattle"
    postal_code: "98101"
    country: "US"
  certifications:
    - name: "SOC 2 Type II"
    - name: "PCI DSS"

contacts:
  support: "mailto:ai-support@harborstone.example"
  security: "mailto:security@harborstone.example"
  dpo: "mailto:privacy@harborstone.example"

links:
  - name: "docs"
    url: "https://docs.harborstone.example"
    description: "Developer documentation"
  - name: "privacy"
    url: "https://harborstone.example/privacy"
  - name: "ai-policy"
    url: "https://harborstone.example/ai-transparency"
  - name: "llms"
    url: "https://docs.harborstone.example/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: true

capabilities:
  - kind: mcp
    id: rates
    description: "Rate lookup and mortgage comparison tools."
    url: "mcp://api.harborstone.example/rates"
    transport: "http"
    status: "active"
    pricing_model: "free"
    auth_required: true

  - kind: api
    id: mortgage-api
    description: "Mortgage products and eligibility API."
    url: "https://api.harborstone.example/v1"
    schema: "https://api.harborstone.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: skill
    id: eligibility-checker
    description: "Automated mortgage eligibility assessment."
    url: "https://harborstone.example/skills/eligibility-checker/SKILL.md"
    status: "active"
    pricing_model: "free"
    compliance:
      ai_act_risk_level: "high"
      conformity_url: "https://harborstone.example/ai-act/eligibility"
      human_oversight_required: true

  - kind: data
    id: rate-history
    description: "Historical rate dataset (daily)."
    url: "https://data.harborstone.example/rates.csv"
    format: "csv"
    license: "CC-BY-4.0"
    permissions:
      read: true
      train: false
      cache: true
---
```

[Download this example →](https://github.com/agenticweb-md/agenticweb.md/blob/main/examples/bank/agenticweb.md)

---

## E-Commerce Platform {#ecommerce}

```yaml
---
agenticweb: "1"
description: "E-commerce catalog, search, and checkout endpoints for AI agents. Full agentic commerce support with product discovery and user-confirmed purchases."
updated: "2026-02-15"

organization:
  name: "Glowmarket"
  legal_name: "Glowmarket Commerce, Inc."
  website: "https://glowmarket.example"
  registration_id: "US-DE-7829104"
  vat_id: "EU372819456"
  address:
    street: "100 Commerce Blvd"
    city: "San Francisco"
    postal_code: "94105"
    country: "US"

contacts:
  support: "mailto:api@glowmarket.example"
  security: "mailto:security@glowmarket.example"
  dpo: "mailto:privacy@glowmarket.example"
  sales: "https://glowmarket.example/contact-sales"

links:
  - name: "docs"
    url: "https://docs.glowmarket.example"
  - name: "privacy"
    url: "https://glowmarket.example/privacy"
  - name: "llms"
    url: "https://docs.glowmarket.example/llms.txt"
    permissions:
      read: true
      summarize: true
      train: false

trust:
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-glowmarket"
      listing_type: "agent"

capabilities:
  - kind: mcp
    id: catalog-search
    description: "Product search, filtering, and recommendations."
    url: "mcp://api.glowmarket.example/search"
    transport: "http"
    status: "active"
    pricing_model: "free"
    auth_required: true
    auth_registration: "https://developers.glowmarket.example/signup"

  - kind: api
    id: catalog-api
    description: "Catalog and inventory REST API."
    url: "https://api.glowmarket.example/v2"
    schema: "https://api.glowmarket.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: commerce
    id: checkout
    description: "Agent-initiated checkout flow with user confirmation."
    url: "https://glowmarket.example/checkout"
    requires_user_confirmation: true
    currencies: ["USD", "EUR"]
    regions: ["US", "EU"]
    status: "active"
    pricing_model: "paid"
---
```

[Download this example →](https://github.com/agenticweb-md/agenticweb.md/blob/main/examples/ecommerce/agenticweb.md)

---

## SaaS Developer Tools {#saas}

```yaml
---
agenticweb: "1"
description: "CI/CD automation platform with MCP deployment tools, pipeline APIs, and an A2A support agent. Infrastructure management for the agentic web."
updated: "2026-02-15"

organization:
  name: "Stacklane"
  legal_name: "Stacklane Systems, Inc."
  website: "https://stacklane.example"
  registration_id: "US-DE-9182736"
  address:
    street: "200 Tech Park Drive"
    city: "Austin"
    postal_code: "78701"
    country: "US"
  certifications:
    - name: "SOC 2 Type II"
      valid_until: "2027-06-30"
    - name: "ISO 27001"
      valid_until: "2027-12-31"

contacts:
  support: "mailto:support@stacklane.example"
  security: "mailto:security@stacklane.example"
  sales: "mailto:sales@stacklane.example"

links:
  - name: "docs"
    url: "https://docs.stacklane.example"
  - name: "privacy"
    url: "https://stacklane.example/privacy"
  - name: "llms"
    url: "https://docs.stacklane.example/llms.txt"
    permissions:
      read: true
      train: false
  - name: "github"
    url: "https://github.com/stacklane"

capabilities:
  - kind: mcp
    id: deploy
    description: "Deployments, rollbacks, and environment checks."
    url: "mcp://api.stacklane.example/deploy"
    transport: "http"
    status: "active"
    pricing_model: "freemium"
    auth_required: true
    auth_registration: "https://developers.stacklane.example/signup"

  - kind: api
    id: pipelines
    description: "Pipelines REST API."
    url: "https://api.stacklane.example/v1"
    schema: "https://api.stacklane.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: a2a
    id: support-agent
    description: "Remote support agent via A2A."
    url: "https://stacklane.example/.well-known/agent-card.json"
    status: "active"
    pricing_model: "paid"
    auth_required: true
---
```

[Download this example →](https://github.com/agenticweb-md/agenticweb.md/blob/main/examples/saas/agenticweb.md)

---

## Media / Newsroom {#media}

```yaml
---
agenticweb: "1"
description: "Newsroom search, archive access, and citation resources. Quality journalism with AI-friendly access policies and proper attribution guidelines."
updated: "2026-02-15"

organization:
  name: "Atlas Journal"
  legal_name: "Atlas Journal Media Group"
  website: "https://atlasjournal.example"
  registration_id: "US-NY-2847391"
  vat_id: "EU827364918"
  address:
    street: "1 Media Plaza"
    city: "New York"
    postal_code: "10001"
    country: "US"

contacts:
  support: "mailto:editorial@atlasjournal.example"
  press: "mailto:press@atlasjournal.example"
  dpo: "mailto:privacy@atlasjournal.example"
  sales: "https://atlasjournal.example/licensing"

links:
  - name: "docs"
    url: "https://developers.atlasjournal.example"
  - name: "privacy"
    url: "https://atlasjournal.example/privacy"
  - name: "ai-policy"
    url: "https://atlasjournal.example/ai-policy"
    description: "AI usage and training policy"
  - name: "llms"
    url: "https://developers.atlasjournal.example/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false       # Important for news organizations
      cache: false       # Discourage long-term caching of news

trust:
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-atlas-journal"
      listing_type: "agent"

capabilities:
  - kind: mcp
    id: newsroom-search
    description: "Search headlines, tags, and authors."
    url: "mcp://api.atlasjournal.example/search"
    transport: "http"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: api
    id: archive-api
    description: "Archive access and metadata API."
    url: "https://api.atlasjournal.example/v1"
    schema: "https://api.atlasjournal.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: data
    id: corrections-feed
    description: "Corrections feed (daily)."
    url: "https://atlasjournal.example/corrections.json"
    format: "json"
    license: "CC-BY-4.0"
    status: "active"
    pricing_model: "free"
    permissions:
      read: true
      cite: true
      cache: true

  - kind: data
    id: headlines-archive
    description: "Historical headlines archive (monthly)."
    url: "https://data.atlasjournal.example/headlines.csv"
    format: "csv"
    license: "CC-BY-NC-4.0"
    status: "active"
    pricing_model: "paid"
    auth_required: true
    permissions:
      read: true
      train: false
      cache: false
---
```

[Download this example →](https://github.com/agenticweb-md/agenticweb.md/blob/main/examples/newspaper/agenticweb.md)

---

## Validate Your File

```bash
npx @agenticweb-md/validator ./agenticweb.md
```
