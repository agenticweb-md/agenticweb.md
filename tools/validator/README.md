# @agenticweb-md/validator

Validate `agenticweb.md` files against the official schema.

## Installation

```bash
npm install @agenticweb-md/validator
```

Or use directly with npx:

```bash
npx @agenticweb-md/validator ./agenticweb.md
```

## CLI Usage

```bash
# Validate a local file
agenticweb-validator ./agenticweb.md

# Validate from URL
agenticweb-validator https://example.com/agenticweb.md

# Output as JSON (for CI/CD)
agenticweb-validator ./agenticweb.md --json

# Quiet mode (only show errors)
agenticweb-validator ./agenticweb.md --quiet

# Validate multiple files
for f in examples/*/agenticweb.md; do
  agenticweb-validator "$f"
done
```

## Programmatic Usage

```typescript
import { 
  validateFile, 
  validateUrl, 
  validateContent, 
  validateDocument 
} from '@agenticweb-md/validator';

// Validate a local file
const result = validateFile('./agenticweb.md');
if (result.valid) {
  console.log('Valid!', result.data);
} else {
  console.error('Errors:', result.errors);
}

// Validate from URL
const urlResult = await validateUrl('https://example.com/agenticweb.md');

// Validate raw content
const content = `---
agenticweb: "1"
name: example
description: "Example organization"
---
`;
const contentResult = validateContent(content);

// Validate parsed YAML object
const data = { agenticweb: '1', name: 'example', description: 'Example' };
const docResult = validateDocument(data);
```

## API

### `validateFile(filePath: string): ValidationResult`

Validate an agenticweb.md file from disk.

### `validateUrl(url: string): Promise<ValidationResult>`

Fetch and validate an agenticweb.md file from a URL.

### `validateContent(content: string): ValidationResult`

Validate agenticweb.md content (including YAML frontmatter).

### `validateDocument(data: unknown): ValidationResult`

Validate a parsed YAML object against the schema.

### `extractFrontmatter(content: string): string | null`

Extract YAML frontmatter from markdown content.

### `parseYamlContent(yamlContent: string): unknown`

Parse YAML string to object.

### Types

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  data?: AgenticWebDocument;
}

interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  params?: Record<string, unknown>;
}
```

## License

MIT
