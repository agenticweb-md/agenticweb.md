#!/usr/bin/env node

import { validateFile, validateUrl, ValidationResult } from './index.js';

const VERSION = '1.0.0';

// ANSI color codes
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
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
};

// Symbols
const sym = {
  check: '✓',
  cross: '✗',
  bullet: '•',
  arrow: '→',
  info: 'ℹ',
  warning: '⚠',
};

function printBanner(): void {
  console.log(`
${c.cyan}${c.bold}  ╭─────────────────────────────────────╮${c.reset}
${c.cyan}${c.bold}  │${c.reset}   ${c.magenta}agenticweb.md${c.reset} ${c.dim}validator v${VERSION}${c.reset}   ${c.cyan}${c.bold}│${c.reset}
${c.cyan}${c.bold}  ╰─────────────────────────────────────╯${c.reset}
`);
}

function printUsage(): void {
  printBanner();
  console.log(`${c.bold}USAGE${c.reset}
  ${c.cyan}npx @agenticweb-md/validator${c.reset} ${c.dim}<file-or-url>${c.reset} [options]

${c.bold}ARGUMENTS${c.reset}
  ${c.yellow}<file-or-url>${c.reset}    Path to agenticweb.md file or URL

${c.bold}OPTIONS${c.reset}
  ${c.green}--help, -h${c.reset}      Show this help message
  ${c.green}--version, -v${c.reset}   Show version number
  ${c.green}--json${c.reset}          Output results as JSON
  ${c.green}--quiet, -q${c.reset}     Only output errors

${c.bold}EXAMPLES${c.reset}
  ${c.dim}# Validate a local file${c.reset}
  ${c.cyan}npx @agenticweb-md/validator${c.reset} ./agenticweb.md

  ${c.dim}# Validate from URL${c.reset}
  ${c.cyan}npx @agenticweb-md/validator${c.reset} https://example.com/agenticweb.md

  ${c.dim}# JSON output for CI/CD${c.reset}
  ${c.cyan}npx @agenticweb-md/validator${c.reset} ./agenticweb.md --json

  ${c.dim}# Validate multiple files${c.reset}
  ${c.cyan}for f in examples/*/agenticweb.md; do
    npx @agenticweb-md/validator "$f"
  done${c.reset}

${c.bold}LEARN MORE${c.reset}
  ${c.blue}https://agenticweb.md${c.reset}
`);
}

function printVersion(): void {
  console.log(`@agenticweb-md/validator v${VERSION}`);
}

function formatCapabilities(caps: Array<{ kind: string; id: string }>): string {
  const byKind: Record<string, string[]> = {};
  for (const cap of caps) {
    if (!byKind[cap.kind]) byKind[cap.kind] = [];
    byKind[cap.kind].push(cap.id);
  }
  
  return Object.entries(byKind)
    .map(([kind, ids]) => `${c.dim}${kind}:${c.reset} ${ids.join(', ')}`)
    .join('\n    ');
}

function printResult(target: string, result: ValidationResult, options: { json?: boolean; quiet?: boolean }): void {
  if (options.json) {
    console.log(JSON.stringify({ target, ...result }, null, 2));
    return;
  }

  if (result.valid) {
    if (!options.quiet) {
      console.log(`${c.green}${c.bold}${sym.check} VALID${c.reset} ${c.dim}${target}${c.reset}`);
      console.log();
      
      if (result.data) {
        // Description
        const desc = result.data.description.length > 70 
          ? result.data.description.substring(0, 67) + '...' 
          : result.data.description;
        console.log(`  ${c.bold}Description${c.reset}`);
        console.log(`    ${desc}`);
        console.log();
        
        // Organization
        if (result.data.organization?.name) {
          console.log(`  ${c.bold}Organization${c.reset}`);
          console.log(`    ${result.data.organization.name}`);
          if (result.data.organization.website) {
            console.log(`    ${c.dim}${result.data.organization.website}${c.reset}`);
          }
          console.log();
        }
        
        // Capabilities
        if (result.data.capabilities && result.data.capabilities.length > 0) {
          console.log(`  ${c.bold}Capabilities${c.reset} ${c.dim}(${result.data.capabilities.length})${c.reset}`);
          console.log(`    ${formatCapabilities(result.data.capabilities)}`);
          console.log();
        }

        // Links
        if (result.data.links && result.data.links.length > 0) {
          console.log(`  ${c.bold}Links${c.reset} ${c.dim}(${result.data.links.length})${c.reset}`);
          console.log(`    ${result.data.links.map(l => l.name).join(', ')}`);
          console.log();
        }
      }
    }
  } else {
    console.log(`${c.red}${c.bold}${sym.cross} INVALID${c.reset} ${c.dim}${target}${c.reset}`);
    console.log();
    console.log(`  ${c.bold}${c.red}${result.errors.length} error${result.errors.length > 1 ? 's' : ''} found:${c.reset}`);
    console.log();
    
    for (const error of result.errors) {
      const path = error.path === '/' || error.path === '' ? '(root)' : error.path;
      console.log(`  ${c.red}${sym.bullet}${c.reset} ${c.yellow}${path}${c.reset}`);
      console.log(`    ${error.message}`);
      if (error.params && Object.keys(error.params).length > 0 && error.keyword !== 'required') {
        console.log(`    ${c.dim}${JSON.stringify(error.params)}${c.reset}`);
      }
      console.log();
    }
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  // Parse options
  const options = {
    help: args.includes('--help') || args.includes('-h'),
    version: args.includes('--version') || args.includes('-v'),
    json: args.includes('--json'),
    quiet: args.includes('--quiet') || args.includes('-q'),
  };
  
  // Filter out options to get targets
  const targets = args.filter(arg => !arg.startsWith('-'));
  
  if (options.version) {
    printVersion();
    process.exit(0);
  }
  
  if (options.help || targets.length === 0) {
    printUsage();
    process.exit(options.help ? 0 : 1);
  }
  
  if (!options.json && !options.quiet) {
    printBanner();
  }
  
  let hasErrors = false;
  
  for (const target of targets) {
    let result: ValidationResult;
    
    if (target.startsWith('http://') || target.startsWith('https://')) {
      if (!options.json && !options.quiet) {
        process.stdout.write(`${c.dim}Fetching ${target}...${c.reset}\r`);
      }
      result = await validateUrl(target);
      if (!options.json && !options.quiet) {
        process.stdout.write('\x1b[2K'); // Clear line
      }
    } else {
      result = validateFile(target);
    }
    
    printResult(target, result, options);
    
    if (!result.valid) {
      hasErrors = true;
    }
  }
  
  // Summary for multiple files
  if (targets.length > 1 && !options.json && !options.quiet) {
    const valid = targets.length - (hasErrors ? 1 : 0);
    console.log(`${c.dim}─────────────────────────────────────${c.reset}`);
    console.log(`${c.bold}Summary:${c.reset} ${valid}/${targets.length} files valid`);
  }
  
  process.exit(hasErrors ? 1 : 0);
}

main().catch((error) => {
  console.error(`${c.red}${c.bold}Error:${c.reset} ${error.message}`);
  process.exit(1);
});
