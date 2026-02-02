# agenticweb.md - Concept Document

> **Your Organization's Front Door to the Agentic Web**

**Version:** 1.0.0  
**Status:** Draft (pre-release)  
**Last Updated:** February 2026  
**Repository:** https://github.com/agenticweb-md/agenticweb.md

---

## Executive Summary

`agenticweb.md` is a **single discovery file** that organizations publish at
their domain root. It gives AI agents and marketplaces a predictable entry
point for organization identity and capability links.

The file is intentionally minimal. It **links to** authoritative sources
(SKILL.md, MCP, OpenAPI, A2A Agent Cards, llms.txt) instead of duplicating them.

---

## The Problem

AI capability discovery is fragmented:

- Marketplaces need verification.
- Agents must scrape and guess.
- Every platform uses different onboarding requirements.

Organizations need a single, authoritative place to say **who they are** and
**where their agent capabilities live**.

---

## The Solution

`agenticweb.md` is a minimal, frontmatter-only discovery index with:

1. **Organization metadata** — marketplace-ready identity
2. **Trust signals** — verified listings and allowed origins
3. **Capability index** — one list of capability links

---

## Design Principles

- **Single file** per domain
- **Frontmatter-only parsing** for machines
- **No duplication** of existing standards
- **Short descriptions** for discovery ranking

---

## Relationship to Existing Standards

`agenticweb.md` sits alongside established files:

- `robots.txt` — crawler permissions
- `llms.txt` — documentation index
- `AGENTS.md` — internal coding instructions
- `SKILL.md` — skill-level instructions
- `OpenAPI` — API schemas
- `A2A Agent Card` — agent-to-agent discovery

`agenticweb.md` **links to** these; it does not replace them.

---

## Minimal Example

```yaml
---
agenticweb: "1"
name: example-org
description: "APIs and skills for payment processing."

organization:
  name: "Example Org"
  legal_name: "Example Org, Inc."
  website: "https://example.com"

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
---
```

---

## Capability Index

Capabilities are listed in a single array, each with `kind`, `id`,
`description`, and a canonical `url`.

Supported kinds:

- `skill`
- `mcp`
- `a2a`
- `api`
- `docs`
- `data`
- `ui`
- `commerce`

---

## Trust Signals

`trust.marketplaces` lists external listings that corroborate identity.

Agents can treat these as **verification hints**, while the domain itself
remains the root of authority.

---

## Roadmap

- **v1 (now):** single-file discovery index
- **v2 (future):** optional signatures or integrity metadata if needed

---

## Contributing

We welcome feedback and PRs:

- https://github.com/agenticweb-md/agenticweb.md
