---
title: "agenticweb.md - Open Standard for AI Discovery"
description: "Publish one file at your domain root to declare who you are and where your agent capabilities live."
date: 2026-02-02
layout: "home"
keywords: ["agenticweb.md", "AI agent discovery", "capability index", "MCP", "A2A", "SKILL.md", "OpenAPI", "marketplaces"]
---

<div class="hero-section">

# agenticweb.md

### Your Organization's Front Door to the Agentic Web

One file at your domain root that tells agents **who you are** and **where your
capabilities live**.

<div class="hero-buttons">
  <a href="/quickstart/" class="btn btn-primary">Get Started</a>
  <a href="/spec/" class="btn btn-secondary">Read the Spec</a>
  <a href="https://github.com/agenticweb-md/agenticweb.md" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">GitHub</a>
</div>

</div>

---

## What is agenticweb.md?

Place a single file at `example.com/agenticweb.md` to publish:

- **Organization identity** — Legal imprint, certifications, contacts
- **Trust signals** — Verified marketplace listings
- **Capability index** — Skills, MCP, APIs, AI Models, docs
- **Permissions** — What agents can do with your content

```yaml
---
agenticweb: "1"
description: "Rate comparison tools and mortgage guidance for homebuyers."

organization:
  name: "Acme Bank"
  legal_name: "Acme Bank, N.A."
  certifications:
    - name: "ISO 27001"
    - name: "SOC 2 Type II"

contacts:
  support: "mailto:support@acme.example"
  dpo: "mailto:privacy@acme.example"

links:
  - name: "privacy"
    url: "https://acme.example/privacy"
  - name: "docs"
    url: "https://docs.acme.example"
    permissions:
      train: false

capabilities:
  - kind: mcp
    id: rates
    description: "Rate lookup and comparison tools."
    url: "mcp://api.acme.example/rates"
    transport: "http"

  - kind: skill
    id: mortgage-advisor
    description: "Guides users through mortgage options."
    url: "https://acme.example/skills/mortgage-advisor/SKILL.md"
---
```

**One file. Every AI agent. Clear discovery.**

---

## Why agenticweb.md?

<div class="comparison-table">

| Without agenticweb.md | With agenticweb.md |
|-----------------------|-------------------|
| Agents scrape and guess | Single authoritative entry |
| No way to declare permissions | Per-resource `train: false` signals |
| Marketplaces need manual verification | Org info + trust links | 
| Capabilities scattered | Unified index with canonical URLs |
| Missing compliance info | Certifications + AI Act risk levels |
| No machine-readable imprint | Legal name, address, DPO contact |

</div>

### Compliance & Legal Imprint

Organizations can publish **machine-readable compliance information**:

- **Certifications** — ISO 27001, ISO 42001, SOC 2, TISAX, PCI DSS
- **Legal imprint** — Required in many jurisdictions (EU Impressum)
- **AI Act risk levels** — Per-capability EU AI Act classification
- **DPO contact** — Data Protection Officer for GDPR requests
- **Permissions** — Explicit `train: false` to opt out of AI training

Agents can use this information to make informed decisions before interacting with your services.

---

## Capability Types

The index is a single list with `kind` + URL:

- **skill** — SKILL.md conversational guides
- **mcp** — MCP server endpoint
- **model** — AI models (LLMs, embeddings)
- **a2a** — A2A Agent Card URL
- **api** — REST/GraphQL API (OpenAPI)
- **docs** — llms.txt or docs pages
- **data** — datasets with licenses
- **ui** — UI modules
- **commerce** — checkout flows

---

## Quick Start

1. Create `agenticweb.md`
2. Add organization metadata
3. List capabilities
4. Publish at your domain root

[Full Quick Start Guide →](/quickstart/)

---

## Example Industries

- **[Bank / Credit Union](/examples/#bank)** — rate MCP + mortgage APIs
- **[E-Commerce Platform](/examples/#ecommerce)** — catalog, orders, checkout
- **[SaaS Developer Tools](/examples/#saas)** — CI/CD MCP + A2A support
- **[Media / Newsroom](/examples/#media)** — archive API + citations

[View All Examples →](/examples/)

---

## Get Involved

- **[Read the Spec](/spec/)**
- **[View Examples](/examples/)**
- **[GitHub](https://github.com/agenticweb-md/agenticweb.md)**

---

<div class="footer-cta">

## Ready to Open Your Front Door?

Create your organization's `agenticweb.md` today and join the agentic web.

[Get Started →](/quickstart/)

</div>
