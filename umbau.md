# Umbau-Plan: agenticweb.md v1 (Vereinfachung)

## Zielbild

`agenticweb.md` ist ein einzelner, leicht parsbarer Discovery-Index pro Domain. Er beschreibt:

- Wer die Organisation ist (für Marketplaces/Vertrauen)
- Was es gibt (Skills, MCP, A2A, APIs, Docs, Data, UI, Commerce)
- Wo es zu finden ist (klare URLs)
- Welche externen Listings die Identität stützen (Marketplaces als Trust-Signal)

Detail-Spezifikationen bleiben in SKILL.md, MCP, OpenAPI, A2A Agent Card, llms.txt.

## Kernentscheidungen

1. **Parsing**
   - Nur YAML-Frontmatter ist normativ.
   - Markdown-Body ist rein menschlich und optional.

2. **Required Fields (minimal)**
   - `agenticweb` (Spec-Version)
   - `name` (slug)
   - `description` (kurz, Discovery-Text)

3. **Organisation & Trust**
   - `organization` enthält Marketplace-taugliche Daten.
   - `trust.marketplaces` listet verifizierende Listings.
   - `trust.allowed_origins` listet autorisierte Hosts.

4. **Capabilities**
   - Einheitliche Liste `capabilities[]`.
   - Jedes Item hat `kind`, `id`, `description`, `url`.
   - Kleine, optionale Felder pro Kind (z.B. `schema` für APIs).

5. **Alles Alte entfernen**
   - Keine Permissions-/Compliance-Blöcke in v1.
   - Keine Tabellen/YAML-Blöcke im Body als Quelle.

## Arbeitsplan

1. **Spec neu schreiben**
   - `spec/agenticweb-spec-v1.md`
   - `site/content/en/spec/_index.md`

2. **Docs aktualisieren**
   - `site/content/en/_index.md`
   - `site/content/en/quickstart.md`
   - `site/content/en/examples/_index.md`
   - `site/content/en/faq.md`
   - `README.md`
   - `concept.md`

3. **Self-Example & Beispiele ersetzen**
   - `agenticweb.md`
   - `examples/*/agenticweb.md`

4. **Konsistenz-Check**
   - Begriffe, Felder, Beispiele und Links angleichen.
   - Veraltete Aussagen entfernen.
