import { stringify } from 'yaml';

export interface GeneratorOptions {
  description: string;
  updated?: string;
  organization?: {
    name?: string;
    legal_name?: string;
    website?: string;
    registration_id?: string;
    vat_id?: string;
    address?: {
      street?: string;
      city?: string;
      postal_code?: string;
      country?: string;
    };
    managing_director?: string;
    certifications?: Array<{
      name: string;
      valid_until?: string;
    }>;
  };
  contacts?: Record<string, string>;
  links?: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
  capabilities?: Array<{
    kind: string;
    id: string;
    description: string;
    url: string;
    status?: string;
    pricing_model?: string;
    auth_required?: boolean;
    [key: string]: unknown;
  }>;
}

export function generateAgenticWeb(options: GeneratorOptions): string {
  const doc: Record<string, unknown> = {
    agenticweb: '1',
    description: options.description,
  };

  if (options.updated) {
    doc.updated = options.updated;
  }

  if (options.organization && Object.keys(options.organization).length > 0) {
    // Filter out empty nested objects
    const org: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(options.organization)) {
      if (value !== undefined && value !== null && value !== '') {
        if (typeof value === 'object' && !Array.isArray(value)) {
          const filtered = Object.fromEntries(
            Object.entries(value).filter(([, v]) => v !== undefined && v !== null && v !== '')
          );
          if (Object.keys(filtered).length > 0) {
            org[key] = filtered;
          }
        } else if (Array.isArray(value) && value.length > 0) {
          org[key] = value;
        } else {
          org[key] = value;
        }
      }
    }
    if (Object.keys(org).length > 0) {
      doc.organization = org;
    }
  }

  if (options.contacts && Object.keys(options.contacts).length > 0) {
    doc.contacts = options.contacts;
  }

  if (options.links && options.links.length > 0) {
    doc.links = options.links;
  }

  if (options.capabilities && options.capabilities.length > 0) {
    doc.capabilities = options.capabilities;
  }

  const yaml = stringify(doc, {
    lineWidth: 0,
    defaultStringType: 'QUOTE_DOUBLE',
    defaultKeyType: 'PLAIN',
  });

  return `---\n${yaml}---\n\n# Your Organization\n\nAdd your content below the frontmatter.\n`;
}

export function generateMinimal(description: string): string {
  return generateAgenticWeb({ description });
}

export function today(): string {
  return new Date().toISOString().split('T')[0];
}
