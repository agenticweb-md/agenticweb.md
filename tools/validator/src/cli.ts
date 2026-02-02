#!/usr/bin/env node

import { validateFile, validateUrl, ValidationResult } from './index.js';

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

function printUsage(): void {
  console.log(`
${COLORS.blue}agenticweb-validator${COLORS.reset} - Validate agenticweb.md files

${COLORS.yellow}Usage:${COLORS.reset}
  agenticweb-validator <file-or-url> [options]
  agenticweb-validator ./agenticweb.md
  agenticweb-validator https://example.com/agenticweb.md

${COLORS.yellow}Options:${COLORS.reset}
  --help, -h     Show this help message
  --json         Output results as JSON
  --quiet, -q    Only output errors

${COLORS.yellow}Examples:${COLORS.reset}
  # Validate a local file
  agenticweb-validator ./agenticweb.md

  # Validate from URL
  agenticweb-validator https://example.com/agenticweb.md

  # Output as JSON (for CI/CD)
  agenticweb-validator ./agenticweb.md --json

  # Validate multiple files
  for f in examples/*/agenticweb.md; do
    agenticweb-validator "$f"
  done
`);
}

function printResult(target: string, result: ValidationResult, options: { json?: boolean; quiet?: boolean }): void {
  if (options.json) {
    console.log(JSON.stringify({ target, ...result }, null, 2));
    return;
  }

  if (result.valid) {
    if (!options.quiet) {
      console.log(`${COLORS.green}✓${COLORS.reset} ${target} is valid`);
      
      if (result.data) {
        console.log(`  ${COLORS.dim}description: ${result.data.description}${COLORS.reset}`);
        if (result.data.organization?.name) {
          console.log(`  ${COLORS.dim}organization: ${result.data.organization.name}${COLORS.reset}`);
        }
        if (result.data.capabilities) {
          console.log(`  ${COLORS.dim}capabilities: ${result.data.capabilities.length}${COLORS.reset}`);
        }
      }
    }
  } else {
    console.log(`${COLORS.red}✗${COLORS.reset} ${target} is invalid`);
    console.log();
    
    for (const error of result.errors) {
      console.log(`  ${COLORS.red}•${COLORS.reset} ${error.path}: ${error.message}`);
      if (error.params && Object.keys(error.params).length > 0) {
        console.log(`    ${COLORS.dim}${JSON.stringify(error.params)}${COLORS.reset}`);
      }
    }
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  // Parse options
  const options = {
    help: args.includes('--help') || args.includes('-h'),
    json: args.includes('--json'),
    quiet: args.includes('--quiet') || args.includes('-q'),
  };
  
  // Filter out options to get targets
  const targets = args.filter(arg => !arg.startsWith('-'));
  
  if (options.help || targets.length === 0) {
    printUsage();
    process.exit(options.help ? 0 : 1);
  }
  
  let hasErrors = false;
  
  for (const target of targets) {
    let result: ValidationResult;
    
    if (target.startsWith('http://') || target.startsWith('https://')) {
      result = await validateUrl(target);
    } else {
      result = validateFile(target);
    }
    
    printResult(target, result, options);
    
    if (!result.valid) {
      hasErrors = true;
    }
    
    // Add spacing between multiple results
    if (targets.length > 1 && !options.json) {
      console.log();
    }
  }
  
  process.exit(hasErrors ? 1 : 0);
}

main().catch((error) => {
  console.error(`${COLORS.red}Error:${COLORS.reset} ${error.message}`);
  process.exit(1);
});
