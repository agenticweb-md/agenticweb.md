# @agenticweb-md/generator

Interactive CLI generator for `agenticweb.md` discovery files.

## Installation

```bash
npm install -g @agenticweb-md/generator
```

Or use directly with npx:

```bash
npx @agenticweb-md/generator
```

## CLI Usage

```bash
# Interactive mode (recommended)
npx @agenticweb-md/generator

# Specify output file
npx @agenticweb-md/generator -o ./my-project/agenticweb.md

# Show help
npx @agenticweb-md/generator --help
```

The interactive wizard will guide you through:

1. **Basics** - Description and update date
2. **Organization** - Name, legal details, address, certifications
3. **Contacts** - Support, security, DPO, sales
4. **Links** - Documentation, privacy, terms, GitHub
5. **Capabilities** - APIs, MCP servers, Skills, Models, etc.

## Programmatic Usage

```typescript
import { generateAgenticWeb, today } from '@agenticweb-md/generator';

const content = generateAgenticWeb({
  description: 'My organization description',
  updated: today(),
  organization: {
    name: 'My Company',
    website: 'https://example.com',
  },
  contacts: {
    support: 'mailto:support@example.com',
  },
  capabilities: [
    {
      kind: 'api',
      id: 'my-api',
      description: 'My REST API',
      url: 'https://api.example.com',
      status: 'active',
      pricing_model: 'free',
    },
  ],
});

console.log(content);
```

## API

### `generateAgenticWeb(options: GeneratorOptions): string`

Generate a complete agenticweb.md file content.

### `generateMinimal(description: string): string`

Generate a minimal agenticweb.md with just the description.

### `today(): string`

Returns today's date in YYYY-MM-DD format.

## After Generation

1. Review and edit the generated file
2. Validate it:
   ```bash
   npx @agenticweb-md/validator ./agenticweb.md
   ```
3. Deploy to your domain root: `https://yourdomain.com/agenticweb.md`

## License

MIT
