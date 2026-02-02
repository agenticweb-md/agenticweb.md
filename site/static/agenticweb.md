---
agenticweb: "1"
description: "The specification and tools for agenticweb.md discovery files. A standardized format for organizations to publish their AI agent capabilities at their domain root."
updated: "2025-02-02"

organization:
  name: "agenticweb.md"
  legal_name: "agenticweb.md Open Source Project"
  website: "https://agenticweb.md"

contacts:
  support: "mailto:hello@agenticweb.md"
  security: "mailto:security@agenticweb.md"

links:
  - name: "docs"
    url: "https://agenticweb.md/spec/"
    description: "Formal specification"
  - name: "github"
    url: "https://github.com/agenticweb-md/agenticweb.md"
    description: "Source code and issues"
  - name: "quickstart"
    url: "https://agenticweb.md/quickstart/"
    description: "Get started in minutes"

trust:
  allowed_origins:
    - "https://agenticweb.md"
    - "https://github.com"
  marketplaces:
    - platform: "github"
      url: "https://github.com/agenticweb-md/agenticweb.md"
      listing_type: "organization"
    - platform: "npm"
      url: "https://www.npmjs.com/package/@agenticweb-md/validator"
      listing_type: "organization"
    - platform: "npm"
      url: "https://www.npmjs.com/package/@agenticweb-md/generator"
      listing_type: "organization"

capabilities:
  - kind: docs
    id: spec
    description: "Formal agenticweb.md specification v1.0.0."
    url: "https://agenticweb.md/spec/"
    format: "markdown"
    status: "active"
    pricing_model: "free"
    permissions:
      read: true
      cite: true
      summarize: true
      train: true

  - kind: docs
    id: quickstart
    description: "Quick start guide and templates."
    url: "https://agenticweb.md/quickstart/"
    format: "markdown"
    status: "active"
    pricing_model: "free"

  - kind: docs
    id: examples
    description: "Industry examples and templates."
    url: "https://agenticweb.md/examples/"
    format: "markdown"
    status: "active"
    pricing_model: "free"

  - kind: skill
    id: agenticweb-skill
    description: "SKILL.md for AI agents to validate and generate agenticweb.md files."
    url: "https://agenticweb.md/skills/agenticweb/SKILL.md"
    status: "active"
    pricing_model: "free"

  - kind: data
    id: schema
    description: "JSON Schema for agenticweb.md validation."
    url: "https://agenticweb.md/schema/v1.json"
    format: "json"
    license: "CC-BY-4.0"
    status: "active"
    pricing_model: "free"
    permissions:
      read: true
      train: true
      cache: true

  - kind: api
    id: validator
    description: "CLI tool to validate agenticweb.md files against the JSON Schema."
    url: "https://www.npmjs.com/package/@agenticweb-md/validator"
    status: "active"
    pricing_model: "free"
    auth_required: false

  - kind: api
    id: generator
    description: "Interactive CLI tool to generate agenticweb.md files with guided prompts."
    url: "https://www.npmjs.com/package/@agenticweb-md/generator"
    status: "active"
    pricing_model: "free"
    auth_required: false
---

# agenticweb.md

Single-file discovery for the agentic web.

## What is this?

This file (`agenticweb.md`) is a discovery document that tells AI agents what this organization offers. It's published at the domain root so agents can find it at a predictable location.

## Learn More

- [Specification](https://agenticweb.md/spec/) - Full technical specification
- [Quick Start](https://agenticweb.md/quickstart/) - Create your own in minutes
- [Examples](https://agenticweb.md/examples/) - See industry examples
- [GitHub](https://github.com/agenticweb-md/agenticweb.md) - Source code and issues
