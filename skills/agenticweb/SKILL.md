---
name: agenticweb
version: "1.0.0"
description: "Discover, validate, and explore agenticweb.md discovery files"
author: "agenticweb.md project"
license: "Apache-2.0"
repository: "https://github.com/agenticweb-md/agenticweb.md"

requirements:
  network: true
  runtime: []
  
tags:
  - agenticweb
  - discovery
  - validation
  - capabilities
  - mcp
  - api
---

# agenticweb

The official skill for working with `agenticweb.md` files. Discover what AI capabilities organizations offer, validate file syntax, and explore available links.

## Commands

This skill provides four main commands:

| Command | Description |
|---------|-------------|
| `discover` | Check if a domain has an agenticweb.md file |
| `validate` | Validate syntax, schema, and links |
| `explore` | Browse and inspect capabilities |
| `generate` | Create an agenticweb.md from templates |

---

## 1. Discover

Check if a domain publishes AI capabilities.

### Usage

```
Check if example.com has an agenticweb.md
```

```
What AI capabilities does stripe.com offer?
```

```
Check these domains for agenticweb.md:
- github.com
- anthropic.com
- openai.com
```

### Discovery Methods

The skill checks in order:

1. **Direct URL:** `https://domain.com/agenticweb.md`
2. **HTML Meta:** `<link rel="agenticweb" href="..." />`

### Output

```
Found: https://example.com/agenticweb.md

Organization: Example Corp
Description: AI-powered developer tools
Updated: 2026-02-01

Capabilities:
  mcp: 3
  skill: 2
  api: 1
  docs: 4

Trust:
  marketplaces: 2
```

---

## 2. Validate

Check an agenticweb.md file for correctness.

### Usage

```
Validate the agenticweb.md at https://example.com/agenticweb.md
```

```
Validate this agenticweb.md content:

---
name: my-company
version: "1.0.0"
---

# My Company
We offer APIs.
```

### What Gets Validated

| Check | Description |
|-------|-------------|
| YAML Syntax | Valid frontmatter between `---` delimiters |
| Required Fields | `agenticweb`, `name`, `description` |
| Field Types | Correct types (strings, booleans, arrays) |
| URL Validity | All URLs are well-formed |
| URL Accessibility | URLs respond (optional, via HEAD request) |
| Schema Compliance | Follows agenticweb.md v1 spec |
| Best Practices | Recommendations for improvement |

### Output

```
VALID

Errors: 0
Warnings: 2
  - Missing 'organization.legal_name' (recommended)
  - No 'trust.marketplaces' entries (optional trust signal)

Suggestions:
  - Add 'contacts.support' for contact info
  - Add 'links.llms' to point to llms.txt
```

---

## 3. Explore

Browse and interact with capabilities from an agenticweb.md.

### Usage

```
What can I do with example.com's capabilities?
```

```
Show me all MCP servers from example.com
```

```
Tell me more about the "loan-calculator" capability
```

```
I need to calculate mortgage payments. What can help me at example.com?
```

### Output

```
Capabilities at example.com:

mcp (3):
  1. loan-calculator
     Calculate payments and amortization schedules
     URL: mcp://api.example.com/loan-calc

skill (2):
  1. mortgage-advisor - Interactive loan guidance
  2. document-prep - Prepare application documents

api (1):
  1. loan-products - REST API
     URL: https://api.example.com/v1
     Schema: https://api.example.com/openapi.json
```

### Task Matching

Ask for capabilities that match your task:

```
I need to search for products and check prices
```

The skill will recommend relevant capabilities from the agenticweb.md.

---

## 4. Generate

Create an agenticweb.md file from templates or existing resources.

### Usage

```
Generate an agenticweb.md for my company "Acme Corp"
```

```
Create an agenticweb.md from my OpenAPI spec at https://api.example.com/openapi.json
```

```
Generate an agenticweb.md template for an e-commerce company
```

### Templates Available

| Template | Description |
|----------|-------------|
| `minimal` | Just the required fields |
| `basic` | Common fields for most organizations |
| `full` | All fields with documentation |
| `bank` | Financial services template |
| `ecommerce` | E-commerce platform template |
| `saas` | Developer tools template |
| `media` | News/media organization template |

### Output

The generator creates a complete agenticweb.md file that you can customize.

---

## Examples

### Quick Check

```
Does anthropic.com have an agenticweb.md?
```

### Full Analysis

```
Fetch, validate, and summarize the agenticweb.md from stripe.com
```

### Find Capabilities

```
What payment-related capabilities are available at stripe.com?
```

### Create New File

```
Generate a basic agenticweb.md for "TechStartup Inc" that offers a REST API
```

---

## Implementation Notes

This skill:

- Only makes GET/HEAD requests to public URLs
- Requires user consent before connecting to any service
- Does NOT automatically authenticate or make purchases
- Does NOT install packages without explicit approval

## Related Resources

- [agenticweb.md Specification](https://agenticweb.md/spec/)
- [Example Files](https://github.com/agenticweb-md/agenticweb.md/tree/main/examples)
- [Quick Start Guide](https://agenticweb.md/quickstart/)

---

*Part of the [agenticweb.md](https://agenticweb.md) project*
