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
  - name: "developer-portal"
    url: "https://developers.harborstone.example"
  - name: "status"
    url: "https://status.harborstone.example"
  - name: "privacy"
    url: "https://harborstone.example/privacy"
  - name: "terms"
    url: "https://harborstone.example/terms"
  - name: "ai-policy"
    url: "https://harborstone.example/ai-transparency"
    description: "AI transparency and usage policy"
  - name: "llms"
    url: "https://docs.harborstone.example/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: true

trust:
  allowed_origins:
    - "https://harborstone.example"
    - "https://api.harborstone.example"
    - "https://docs.harborstone.example"
  marketplaces:
    - platform: "mcp-registry"
      url: "https://mcp.run/servers/harborstone-rates"
      listing_type: "mcp"

capabilities:
  - kind: mcp
    id: rates
    description: "Rate lookup and mortgage comparison tools."
    url: "mcp://api.harborstone.example/rates"
    transport: "http"
    status: "active"
    pricing_model: "free"
    auth_required: true
    auth_registration: "https://developers.harborstone.example/signup"

  - kind: api
    id: mortgage-api
    description: "Mortgage products and eligibility API."
    url: "https://api.harborstone.example/v1"
    schema: "https://api.harborstone.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true
    auth_registration: "https://developers.harborstone.example/signup"

  - kind: skill
    id: mortgage-guide
    description: "Guides users through mortgage options and required documents."
    url: "https://harborstone.example/skills/mortgage-guide/SKILL.md"
    status: "active"
    pricing_model: "free"

  - kind: skill
    id: eligibility-checker
    description: "Automated mortgage eligibility assessment."
    url: "https://harborstone.example/skills/eligibility-checker/SKILL.md"
    status: "active"
    pricing_model: "free"
    auth_required: true
    compliance:
      ai_act_risk_level: "high"
      conformity_url: "https://harborstone.example/ai-act/eligibility"
      human_oversight_required: true

  - kind: docs
    id: developer-docs
    description: "Developer documentation and onboarding."
    url: "https://docs.harborstone.example/llms.txt"
    format: "llms.txt"

  - kind: data
    id: rate-history
    description: "Historical rate dataset (daily)."
    url: "https://data.harborstone.example/rates.csv"
    format: "csv"
    license: "CC-BY-4.0"
    status: "active"
    pricing_model: "free"
    permissions:
      read: true
      train: false
      cache: true
---

# Harborstone Credit Union

Responsible lending tools and APIs for mortgage discovery.
