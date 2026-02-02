---
agenticweb: "1"
description: "E-commerce catalog, search, and checkout endpoints for AI agents. Full agentic commerce support with product discovery, cart management, and user-confirmed purchases."
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
  press: "mailto:press@glowmarket.example"
  dpo: "mailto:privacy@glowmarket.example"
  sales: "https://glowmarket.example/contact-sales"

links:
  - name: "docs"
    url: "https://docs.glowmarket.example"
    description: "Developer documentation"
  - name: "developer-portal"
    url: "https://developers.glowmarket.example"
  - name: "status"
    url: "https://status.glowmarket.example"
  - name: "privacy"
    url: "https://glowmarket.example/privacy"
  - name: "terms"
    url: "https://glowmarket.example/terms"
  - name: "ai-policy"
    url: "https://glowmarket.example/ai-policy"
  - name: "llms"
    url: "https://docs.glowmarket.example/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: true
  - name: "twitter"
    url: "https://twitter.com/glowmarket"

trust:
  allowed_origins:
    - "https://glowmarket.example"
    - "https://api.glowmarket.example"
  marketplaces:
    - platform: "openai-gpts"
      url: "https://chat.openai.com/g/g-glowmarket"
      listing_type: "agent"
    - platform: "mcp-registry"
      url: "https://mcp.run/servers/glowmarket-search"
      listing_type: "mcp"

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
    auth_registration: "https://developers.glowmarket.example/signup"

  - kind: api
    id: orders-api
    description: "Orders and returns API."
    url: "https://api.glowmarket.example/v2/orders"
    schema: "https://api.glowmarket.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true

  - kind: commerce
    id: checkout
    description: "Agent-initiated checkout flow with user confirmation."
    url: "https://glowmarket.example/checkout"
    pricing: "https://developers.glowmarket.example/pricing"
    refunds: "https://glowmarket.example/returns"
    currencies: ["USD", "EUR"]
    regions: ["US", "EU"]
    requires_user_confirmation: true
    status: "active"
    pricing_model: "paid"
    auth_required: true

  - kind: docs
    id: developer-docs
    description: "Developer documentation and schemas."
    url: "https://docs.glowmarket.example/llms.txt"
    format: "llms.txt"
---

# Glowmarket

Catalog, orders, and checkout endpoints for agentic commerce.
