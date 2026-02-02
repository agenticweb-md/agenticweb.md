import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { parse as parseYaml } from 'yaml';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load schema
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schemaPath = join(__dirname, '..', 'schema', 'agenticweb-v1.schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));

// Initialize Ajv
const ajv = new Ajv.default({
  allErrors: true,
  verbose: true,
  strict: false,
});
addFormats.default(ajv);

const validate = ajv.compile(schema);

export interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  params?: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  data?: AgenticWebDocument;
}

export interface Permissions {
  read?: boolean;
  cite?: boolean;
  summarize?: boolean;
  train?: boolean;
  execute?: boolean;
  cache?: boolean;
}

export interface Address {
  street?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export interface Certification {
  name: string;
  valid_until?: string;
  level?: string;
}

export interface Link {
  name: string;
  url: string;
  description?: string;
  permissions?: Permissions;
}

export interface MarketplaceListing {
  platform: string;
  url: string;
  listing_type?: 'agent' | 'mcp' | 'api' | 'organization';
}

export interface CapabilityCompliance {
  ai_act_risk_level?: 'minimal' | 'limited' | 'high';
  conformity_url?: string;
  human_oversight_required?: boolean;
}

export interface Capability {
  kind: 'skill' | 'mcp' | 'api' | 'a2a' | 'model' | 'docs' | 'data' | 'ui' | 'commerce';
  id: string;
  description: string;
  url: string;
  status?: 'active' | 'beta' | 'deprecated';
  pricing_model?: 'free' | 'freemium' | 'paid';
  auth_required?: boolean;
  auth_registration?: string;
  permissions?: Permissions;
  compliance?: CapabilityCompliance;
  // Kind-specific fields
  transport?: 'stdio' | 'http' | 'sse'; // mcp
  schema?: string; // api, model
  format?: string; // docs, data
  license?: string; // data
  manifest?: string; // ui
  pricing?: string; // commerce
  refunds?: string; // commerce
  currencies?: string[]; // commerce
  regions?: string[]; // commerce
  requires_user_confirmation?: boolean; // commerce
  source?: 'huggingface' | 'github' | 'ollama' | 'custom'; // model
  model_id?: string; // model
  model_card?: string; // model
  api_compatibility?: 'openai' | 'gemini' | 'anthropic' | 'custom'; // model
  [key: string]: unknown;
}

export interface AgenticWebDocument {
  agenticweb: string;
  description: string;
  updated?: string;
  organization?: {
    name?: string;
    legal_name?: string;
    website?: string;
    registration_id?: string;
    vat_id?: string;
    address?: Address;
    managing_director?: string;
    certifications?: Certification[];
  };
  contacts?: Record<string, string>;
  links?: Link[];
  trust?: {
    allowed_origins?: string[];
    marketplaces?: MarketplaceListing[];
  };
  capabilities?: Capability[];
}

/**
 * Extract YAML frontmatter from markdown content
 */
export function extractFrontmatter(content: string): string | null {
  // Remove BOM if present
  const cleanContent = content.replace(/^\uFEFF/, '');
  
  // Match YAML frontmatter between --- delimiters
  const match = cleanContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  
  if (!match) {
    return null;
  }
  
  return match[1];
}

/**
 * Parse YAML content into an object
 */
export function parseYamlContent(yamlContent: string): unknown {
  return parseYaml(yamlContent);
}

/**
 * Validate an agenticweb.md document
 */
export function validateDocument(data: unknown): ValidationResult {
  const valid = validate(data);
  
  if (valid) {
    return {
      valid: true,
      errors: [],
      data: data as AgenticWebDocument,
    };
  }
  
  const errors: ValidationError[] = (validate.errors || []).map((error: ErrorObject) => ({
    path: error.instancePath || '/',
    message: error.message || 'Unknown error',
    keyword: error.keyword,
    params: error.params as Record<string, unknown>,
  }));
  
  return {
    valid: false,
    errors,
  };
}

/**
 * Validate agenticweb.md content (full file including frontmatter)
 */
export function validateContent(content: string): ValidationResult {
  const yamlContent = extractFrontmatter(content);
  
  if (!yamlContent) {
    return {
      valid: false,
      errors: [{
        path: '/',
        message: 'No YAML frontmatter found. File must start with ---',
        keyword: 'format',
      }],
    };
  }
  
  let data: unknown;
  try {
    data = parseYamlContent(yamlContent);
  } catch (error) {
    return {
      valid: false,
      errors: [{
        path: '/',
        message: `Invalid YAML: ${error instanceof Error ? error.message : 'Unknown error'}`,
        keyword: 'parse',
      }],
    };
  }
  
  return validateDocument(data);
}

/**
 * Validate an agenticweb.md file
 */
export function validateFile(filePath: string): ValidationResult {
  let content: string;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (error) {
    return {
      valid: false,
      errors: [{
        path: filePath,
        message: `Could not read file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        keyword: 'file',
      }],
    };
  }
  
  return validateContent(content);
}

/**
 * Fetch and validate agenticweb.md from a URL
 */
export async function validateUrl(url: string): Promise<ValidationResult> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return {
        valid: false,
        errors: [{
          path: url,
          message: `HTTP ${response.status}: ${response.statusText}`,
          keyword: 'fetch',
        }],
      };
    }
    
    const content = await response.text();
    return validateContent(content);
  } catch (error) {
    return {
      valid: false,
      errors: [{
        path: url,
        message: `Fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        keyword: 'fetch',
      }],
    };
  }
}

// Export schema for external use
export { schema };
