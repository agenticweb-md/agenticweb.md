#!/usr/bin/env node

import {
  input,
  select,
  confirm,
  checkbox,
} from '@inquirer/prompts';
import { writeFileSync, existsSync } from 'fs';
import { generateAgenticWeb, today, GeneratorOptions } from './index.js';

const VERSION = '1.0.0';

// ANSI codes
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function banner(): void {
  console.log(`
  ${c.cyan}${c.bold}    _    ____ _____ _   _ _____ ___ ____${c.reset}
  ${c.cyan}${c.bold}   / \\  / ___| ____| \\ | |_   _|_ _/ ___|${c.reset}
  ${c.cyan}${c.bold}  / _ \\| |  _|  _| |  \\| | | |  | | |    ${c.reset}
  ${c.cyan}${c.bold} / ___ \\ |_| | |___| |\\  | | |  | | |___ ${c.reset}
  ${c.cyan}${c.bold}/_/   \\_\\____|_____|_| \\_| |_| |___\\____|${c.reset}
                    ${c.yellow}${c.bold}W E B . M D${c.reset}

       ${c.dim}Interactive agenticweb.md Generator${c.reset}
                   ${c.dim}v${VERSION}${c.reset}
`);
}

function section(title: string): void {
  console.log(`\n${c.cyan}${c.bold}━━━ ${title} ━━━${c.reset}\n`);
}

function success(message: string): void {
  console.log(`${c.green}${c.bold}✓${c.reset} ${message}`);
}

function info(message: string): void {
  console.log(`${c.blue}ℹ${c.reset} ${c.dim}${message}${c.reset}`);
}

async function askCapability(): Promise<GeneratorOptions['capabilities']> {
  const capabilities: NonNullable<GeneratorOptions['capabilities']> = [];

  let addMore = true;
  while (addMore) {
    section(`Capability ${capabilities.length + 1}`);

    const kind = await select({
      message: 'What type of capability?',
      choices: [
        { value: 'api', name: '🔌 API - REST/GraphQL endpoint' },
        { value: 'mcp', name: '🤖 MCP - Model Context Protocol server' },
        { value: 'skill', name: '🎯 Skill - SKILL.md file' },
        { value: 'a2a', name: '🤝 A2A - Agent-to-Agent card' },
        { value: 'model', name: '🧠 Model - AI model endpoint' },
        { value: 'docs', name: '📚 Docs - Documentation or llms.txt' },
        { value: 'data', name: '📊 Data - Dataset or catalog' },
        { value: 'ui', name: '🖼️  UI - Widget or component' },
        { value: 'commerce', name: '🛒 Commerce - Checkout flow' },
      ],
    });

    const id = await input({
      message: 'Capability ID (slug):',
      validate: (v) => /^[a-z0-9-]+$/.test(v) || 'Use lowercase letters, numbers, hyphens only',
    });

    const description = await input({
      message: 'Short description (max 400 chars):',
      validate: (v) => v.length > 0 && v.length <= 400 || 'Required, max 400 characters',
    });

    const url = await input({
      message: 'URL:',
      validate: (v) => {
        try {
          new URL(v);
          return true;
        } catch {
          return 'Must be a valid URL';
        }
      },
    });

    const status = await select({
      message: 'Status:',
      choices: [
        { value: 'active', name: '🟢 Active' },
        { value: 'beta', name: '🟡 Beta' },
        { value: 'deprecated', name: '🔴 Deprecated' },
      ],
    });

    const pricing_model = await select({
      message: 'Pricing model:',
      choices: [
        { value: 'free', name: '🆓 Free' },
        { value: 'freemium', name: '🎁 Freemium' },
        { value: 'paid', name: '💰 Paid' },
      ],
    });

    const auth_required = await confirm({
      message: 'Does it require authentication?',
      default: false,
    });

    const cap: NonNullable<GeneratorOptions['capabilities']>[0] = {
      kind,
      id,
      description,
      url,
      status,
      pricing_model,
      auth_required,
    };

    // Kind-specific fields
    if (kind === 'api') {
      const hasSchema = await confirm({ message: 'Do you have an OpenAPI schema URL?', default: false });
      if (hasSchema) {
        cap.schema = await input({ message: 'OpenAPI schema URL:' });
      }
    } else if (kind === 'mcp') {
      cap.transport = await select({
        message: 'Transport:',
        choices: [
          { value: 'stdio', name: 'stdio' },
          { value: 'http', name: 'http' },
          { value: 'sse', name: 'sse' },
        ],
      });
    } else if (kind === 'model') {
      cap.source = await select({
        message: 'Model source:',
        choices: [
          { value: 'huggingface', name: '🤗 Hugging Face' },
          { value: 'github', name: '🐙 GitHub' },
          { value: 'ollama', name: '🦙 Ollama' },
          { value: 'custom', name: '⚙️  Custom' },
        ],
      });
      cap.model_id = await input({ message: 'Model ID:' });
      cap.api_compatibility = await select({
        message: 'API compatibility:',
        choices: [
          { value: 'openai', name: 'OpenAI compatible' },
          { value: 'anthropic', name: 'Anthropic compatible' },
          { value: 'custom', name: 'Custom API' },
        ],
      });
    } else if (kind === 'docs' || kind === 'data') {
      cap.format = await input({ 
        message: 'Format (e.g., markdown, json, csv):',
        default: kind === 'docs' ? 'markdown' : 'json',
      });
    }

    capabilities.push(cap);

    addMore = await confirm({
      message: 'Add another capability?',
      default: false,
    });
  }

  return capabilities;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    banner();
    console.log(`${c.bold}USAGE${c.reset}
  ${c.cyan}npx @agenticweb-md/generator${c.reset} [options]

${c.bold}OPTIONS${c.reset}
  ${c.green}--help, -h${c.reset}      Show this help message
  ${c.green}--version, -v${c.reset}   Show version number
  ${c.green}--output, -o${c.reset}    Output file path (default: ./agenticweb.md)
  ${c.green}--minimal${c.reset}       Generate minimal file (non-interactive)

${c.bold}EXAMPLES${c.reset}
  ${c.dim}# Interactive mode${c.reset}
  ${c.cyan}npx @agenticweb-md/generator${c.reset}

  ${c.dim}# Specify output file${c.reset}
  ${c.cyan}npx @agenticweb-md/generator${c.reset} -o ./my-org/agenticweb.md

${c.bold}LEARN MORE${c.reset}
  ${c.blue}https://agenticweb.md${c.reset}
`);
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`@agenticweb-md/generator v${VERSION}`);
    process.exit(0);
  }

  // Parse output file
  let outputFile = './agenticweb.md';
  const outputIdx = args.findIndex(a => a === '--output' || a === '-o');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    outputFile = args[outputIdx + 1];
  }

  banner();

  console.log(`${c.dim}Create your agenticweb.md discovery file step by step.${c.reset}`);
  console.log(`${c.dim}Press Ctrl+C at any time to cancel.${c.reset}\n`);

  const options: GeneratorOptions = {
    description: '',
  };

  // ==========================================
  // BASICS
  // ==========================================
  section('📝 Basics');

  options.description = await input({
    message: 'Description (what does your organization offer?):',
    validate: (v) => v.length > 0 && v.length <= 400 || 'Required, max 400 characters',
  });

  const addUpdated = await confirm({
    message: 'Add last updated date?',
    default: true,
  });
  if (addUpdated) {
    options.updated = today();
    info(`Using today's date: ${options.updated}`);
  }

  // ==========================================
  // ORGANIZATION
  // ==========================================
  const addOrg = await confirm({
    message: 'Add organization details?',
    default: true,
  });

  if (addOrg) {
    section('🏢 Organization');
    
    options.organization = {};
    
    options.organization.name = await input({
      message: 'Organization name:',
    });

    const addLegal = await confirm({
      message: 'Add legal details (legal name, registration, VAT)?',
      default: false,
    });

    if (addLegal) {
      options.organization.legal_name = await input({
        message: 'Legal name (e.g., "Company GmbH"):',
      });
      options.organization.registration_id = await input({
        message: 'Registration ID (e.g., HRB 12345):',
      });
      options.organization.vat_id = await input({
        message: 'VAT ID (e.g., DE123456789):',
      });
      options.organization.managing_director = await input({
        message: 'Managing Director (for German Impressum):',
      });
    }

    options.organization.website = await input({
      message: 'Website URL:',
      validate: (v) => {
        if (!v) return true;
        try {
          new URL(v);
          return true;
        } catch {
          return 'Must be a valid URL';
        }
      },
    });

    const addAddress = await confirm({
      message: 'Add address?',
      default: false,
    });

    if (addAddress) {
      options.organization.address = {
        street: await input({ message: 'Street:' }),
        city: await input({ message: 'City:' }),
        postal_code: await input({ message: 'Postal code:' }),
        country: await input({ message: 'Country code (e.g., DE, US):' }),
      };
    }

    const addCerts = await confirm({
      message: 'Add certifications (ISO 27001, SOC 2, etc.)?',
      default: false,
    });

    if (addCerts) {
      const certChoices = await checkbox({
        message: 'Select certifications:',
        choices: [
          { value: 'ISO 27001', name: 'ISO 27001' },
          { value: 'SOC 2 Type II', name: 'SOC 2 Type II' },
          { value: 'TISAX', name: 'TISAX' },
          { value: 'GDPR compliant', name: 'GDPR compliant' },
          { value: 'HIPAA', name: 'HIPAA' },
        ],
      });
      if (certChoices.length > 0) {
        options.organization.certifications = certChoices.map(name => ({ name }));
      }
    }
  }

  // ==========================================
  // CONTACTS
  // ==========================================
  const addContacts = await confirm({
    message: 'Add contact information?',
    default: true,
  });

  if (addContacts) {
    section('📧 Contacts');
    info('Use mailto: for emails or https:// for web forms');
    
    options.contacts = {};

    const support = await input({
      message: 'Support contact (mailto: or https://):',
    });
    if (support) options.contacts.support = support;

    const security = await input({
      message: 'Security contact:',
    });
    if (security) options.contacts.security = security;

    const addMoreContacts = await confirm({
      message: 'Add more contacts (DPO, sales, press)?',
      default: false,
    });

    if (addMoreContacts) {
      const dpo = await input({ message: 'DPO (Data Protection Officer):' });
      if (dpo) options.contacts.dpo = dpo;
      
      const sales = await input({ message: 'Sales:' });
      if (sales) options.contacts.sales = sales;
      
      const press = await input({ message: 'Press:' });
      if (press) options.contacts.press = press;
    }

    // Clean empty contacts
    options.contacts = Object.fromEntries(
      Object.entries(options.contacts).filter(([, v]) => v)
    );
    if (Object.keys(options.contacts).length === 0) {
      delete options.contacts;
    }
  }

  // ==========================================
  // LINKS
  // ==========================================
  const addLinks = await confirm({
    message: 'Add links (docs, privacy, terms)?',
    default: true,
  });

  if (addLinks) {
    section('🔗 Links');
    options.links = [];

    const linkTypes = await checkbox({
      message: 'Which links do you want to add?',
      choices: [
        { value: 'docs', name: '📚 Documentation' },
        { value: 'privacy', name: '🔒 Privacy Policy' },
        { value: 'terms', name: '📜 Terms of Service' },
        { value: 'github', name: '🐙 GitHub' },
        { value: 'llms', name: '🤖 llms.txt' },
      ],
    });

    for (const linkType of linkTypes) {
      const url = await input({
        message: `${linkType} URL:`,
        validate: (v) => {
          try {
            new URL(v);
            return true;
          } catch {
            return 'Must be a valid URL';
          }
        },
      });
      options.links.push({ name: linkType, url });
    }
  }

  // ==========================================
  // CAPABILITIES
  // ==========================================
  const addCaps = await confirm({
    message: 'Add capabilities (APIs, MCP servers, Skills)?',
    default: true,
  });

  if (addCaps) {
    section('⚡ Capabilities');
    options.capabilities = await askCapability();
  }

  // ==========================================
  // GENERATE
  // ==========================================
  section('📄 Generating');

  const content = generateAgenticWeb(options);

  // Check if file exists
  if (existsSync(outputFile)) {
    const overwrite = await confirm({
      message: `${outputFile} already exists. Overwrite?`,
      default: false,
    });
    if (!overwrite) {
      console.log(`${c.yellow}Cancelled.${c.reset}`);
      process.exit(0);
    }
  }

  writeFileSync(outputFile, content, 'utf-8');

  console.log(`

  ${c.green}${c.bold}+---------------------------------------+${c.reset}
  ${c.green}${c.bold}|                                       |${c.reset}
  ${c.green}${c.bold}|   SUCCESS!                            |${c.reset}
  ${c.green}${c.bold}|   Your agenticweb.md has been created |${c.reset}
  ${c.green}${c.bold}|                                       |${c.reset}
  ${c.green}${c.bold}+---------------------------------------+${c.reset}

  ${c.bold}File:${c.reset} ${c.cyan}${outputFile}${c.reset}

${c.bold}Next steps:${c.reset}

  ${c.yellow}1.${c.reset} Review and edit the file
  ${c.yellow}2.${c.reset} Validate it:
     ${c.cyan}npx @agenticweb-md/validator ${outputFile}${c.reset}
  ${c.yellow}3.${c.reset} Deploy to your domain root:
     ${c.dim}https://yourdomain.com/agenticweb.md${c.reset}

${c.dim}Learn more: https://agenticweb.md${c.reset}
`);
}

main().catch((error) => {
  if (error.name === 'ExitPromptError') {
    console.log(`\n${c.yellow}Cancelled.${c.reset}`);
    process.exit(0);
  }
  console.error(`${c.red}${c.bold}Error:${c.reset} ${error.message}`);
  process.exit(1);
});
