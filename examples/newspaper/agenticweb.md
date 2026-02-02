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
    description: "Developer documentation"
  - name: "privacy"
    url: "https://atlasjournal.example/privacy"
  - name: "terms"
    url: "https://atlasjournal.example/terms"
  - name: "ai-policy"
    url: "https://atlasjournal.example/ai-policy"
    description: "AI usage and training policy"
  - name: "llms"
    url: "https://developers.atlasjournal.example/llms.txt"
    permissions:
      read: true
      cite: true
      summarize: true
      train: false
      cache: false
  - name: "twitter"
    url: "https://twitter.com/atlasjournal"

trust:
  allowed_origins:
    - "https://atlasjournal.example"
    - "https://api.atlasjournal.example"
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
    auth_registration: "https://developers.atlasjournal.example/signup"

  - kind: api
    id: archive-api
    description: "Archive access and metadata API."
    url: "https://api.atlasjournal.example/v1"
    schema: "https://api.atlasjournal.example/openapi.json"
    status: "active"
    pricing_model: "freemium"
    auth_required: true
    auth_registration: "https://developers.atlasjournal.example/signup"

  - kind: docs
    id: citation-guide
    description: "Citation and attribution guidelines."
    url: "https://atlasjournal.example/cite"
    format: "markdown"

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

# Atlas Journal

Newsroom access for discovery, citations, and archive research.
