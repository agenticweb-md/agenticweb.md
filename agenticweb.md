---
agenticweb: "1"
description: "The specification and tools for agenticweb.md discovery files. A standardized format for organizations to publish their AI agent capabilities at their domain root."
updated: "2026-02-15"

organization:
  name: "agenticweb.md"
  legal_name: "agenticweb.md Open Source Project"
  website: "https://agenticweb.md"

contacts:
  support: "mailto:hello@agenticweb.md"
  security: "mailto:security@agenticweb.md"
  press: "mailto:press@agenticweb.md"

links:
  - name: "docs"
    url: "https://agenticweb.md/spec"
    description: "Formal specification"
  - name: "github"
    url: "https://github.com/agenticweb-md/agenticweb.md"
    description: "Source code and issues"
  - name: "privacy"
    url: "https://agenticweb.md/privacy"
  - name: "terms"
    url: "https://agenticweb.md/terms"
  - name: "ai-policy"
    url: "https://agenticweb.md/transparency"
  - name: "llms"
    url: "https://agenticweb.md/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: true
      cache: true

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

capabilities:
  - kind: docs
    id: spec
    description: "Formal agenticweb.md specification v1.0.0."
    url: "https://agenticweb.md/spec"
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
    url: "https://agenticweb.md/quickstart"
    format: "markdown"
    status: "active"
    pricing_model: "free"

  - kind: docs
    id: examples
    description: "Industry examples and templates."
    url: "https://agenticweb.md/examples"
    format: "markdown"
    status: "active"
    pricing_model: "free"

  - kind: skill
    id: agenticweb-validator
    description: "Validate agenticweb.md files against the official schema."
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
---

# agenticweb.md

Single-file discovery for the agentic web.
