---
title: "FAQ - agenticweb.md"
description: "Common questions about the single-file discovery format for agent capabilities."
date: 2026-02-02
weight: 40
keywords: ["agenticweb.md FAQ", "AI discovery", "MCP", "A2A", "SKILL.md", "marketplaces", "trust signals"]
---

Common questions about `agenticweb.md`.

---

## General

### What is agenticweb.md?

`agenticweb.md` is a **single discovery file** at your domain root that tells
agents who you are and where your capabilities live (Skills, MCP, A2A, APIs,
docs).

### Why do we need another file?

Because discovery is fragmented. `agenticweb.md` gives agents and marketplaces a
predictable, domain-owned index instead of scraping or guessing.

### How is this different from robots.txt or llms.txt?

- `robots.txt` controls crawler access.
- `llms.txt` points to LLM-friendly docs.
- `agenticweb.md` is a **capability index** with organization metadata and
  canonical URLs.

### How is this different from AGENTS.md?

`AGENTS.md` is for coding agents **inside your repository**. `agenticweb.md` is
for **external** discovery at your domain root.

---

## Implementation

### What is the minimum required content?

```yaml
---
agenticweb: "1"
description: "Short discovery description."
capabilities:
  - kind: api
    id: public-api
    description: "Public REST API."
    url: "https://api.example.com/v1"
    schema: "https://api.example.com/openapi.json"
---
```

### Where do I put the file?

At your domain root:

```
https://yourcompany.com/agenticweb.md
```

### Can I have multiple agenticweb.md files?

No. There should be **one file per domain**. If you have distinct brands,
use subdomains and publish separate files there.

### What content type should I serve?

`text/markdown` or `text/plain`.

---

## Capabilities

### What capability types are supported?

- `skill` (SKILL.md)
- `mcp` (MCP server)
- `a2a` (A2A Agent Card)
- `api` (REST/GraphQL)
- `docs` (llms.txt or docs)
- `data` (datasets)
- `ui` (UI modules)
- `commerce` (checkout flows)

### Do I need to describe every endpoint?

No. `agenticweb.md` is a directory. Link to OpenAPI, MCP tools, A2A Agent
Cards, or SKILL.md for the actual details.

---

## Trust & Marketplaces

### Why include marketplaces?

Marketplaces provide **external verification signals**. Agents and platforms
can cross-check that your domain entry matches a known listing.

### What if we have no marketplace listing?

Leave `trust.marketplaces` empty. The file is still authoritative for its
domain, but you lose that extra verification signal.

---

## Contributing

### How can I contribute?

- [GitHub repo](https://github.com/agenticweb-md/agenticweb.md)
- Submit examples or improvements via PRs
