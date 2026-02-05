/**
 * agenticweb.md Generator
 * Interactive form to generate agenticweb.md files
 */

const STANDARD_CATEGORIES = [
  'finance', 'banking', 'insurance', 'healthcare', 'technology',
  'devtools', 'e-commerce', 'retail', 'education', 'media',
  'entertainment', 'travel', 'real-estate', 'legal', 'government',
  'nonprofit', 'manufacturing', 'logistics', 'energy',
  'telecommunications', 'agriculture'
];

const CAPABILITY_KINDS = [
  { value: 'skill', label: 'Skill (SKILL.md)' },
  { value: 'mcp', label: 'MCP Server' },
  { value: 'api', label: 'API (REST/GraphQL)' },
  { value: 'model', label: 'AI Model (LLM/Embedding)' },
  { value: 'a2a', label: 'A2A Agent' },
  { value: 'docs', label: 'Documentation' },
  { value: 'data', label: 'Data/Dataset' },
  { value: 'ui', label: 'UI Widget' },
  { value: 'commerce', label: 'Commerce' }
];

class AgenticWebGenerator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.capabilities = [];
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="generator-form">
        <h3>Basic Information</h3>
        <div class="form-group">
          <label for="org-name">Organization Slug *</label>
          <input type="text" id="org-name" placeholder="your-company" pattern="[a-z0-9-]+" required>
          <small>Lowercase, alphanumeric, hyphens only</small>
        </div>
        <div class="form-group">
          <label for="org-description">Description *</label>
          <input type="text" id="org-description" placeholder="Short description of what you offer" maxlength="160" required>
          <small>Max 160 characters</small>
        </div>

        <h3>Organization Details</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="display-name">Display Name</label>
            <input type="text" id="display-name" placeholder="Your Company">
          </div>
          <div class="form-group">
            <label for="legal-name">Legal Name</label>
            <input type="text" id="legal-name" placeholder="Your Company, Inc.">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="website">Website</label>
            <input type="url" id="website" placeholder="https://yourcompany.com">
          </div>
          <div class="form-group">
            <label for="jurisdiction">Jurisdiction</label>
            <input type="text" id="jurisdiction" placeholder="US, EU">
            <small>Comma-separated</small>
          </div>
        </div>

        <h3>Contacts</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="support-email">Support</label>
            <input type="email" id="support-email" placeholder="support@yourcompany.com">
          </div>
          <div class="form-group">
            <label for="security-email">Security</label>
            <input type="email" id="security-email" placeholder="security@yourcompany.com">
          </div>
        </div>

        <h3>Links</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="docs-url">Documentation</label>
            <input type="url" id="docs-url" placeholder="https://docs.yourcompany.com">
          </div>
          <div class="form-group">
            <label for="privacy-url">Privacy Policy</label>
            <input type="url" id="privacy-url" placeholder="https://yourcompany.com/privacy">
          </div>
        </div>

        <h3>Permissions</h3>
        <div class="permissions-grid">
          <label><input type="checkbox" id="perm-read" checked> Read content</label>
          <label><input type="checkbox" id="perm-cite" checked> Cite with attribution</label>
          <label><input type="checkbox" id="perm-summarize" checked> Summarize content</label>
          <label><input type="checkbox" id="perm-train"> Use for training</label>
          <label><input type="checkbox" id="perm-execute" checked> Execute APIs/tools</label>
          <label><input type="checkbox" id="perm-cache" checked> Cache content</label>
        </div>

        <h3>Compliance</h3>
        <div class="form-row">
          <div class="form-group">
            <label><input type="checkbox" id="gdpr-compliant"> GDPR Compliant</label>
          </div>
          <div class="form-group">
            <label for="ai-act-level">AI Act Risk Level</label>
            <select id="ai-act-level">
              <option value="">Not specified</option>
              <option value="minimal">Minimal</option>
              <option value="limited">Limited</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <h3>Categories</h3>
        <div class="form-group">
          <label for="categories">Standard Categories</label>
          <select id="categories" multiple>
            ${STANDARD_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <small>Hold Ctrl/Cmd to select multiple</small>
        </div>

        <h3>Capabilities</h3>
        <div id="capabilities-list"></div>
        <button type="button" id="add-capability" class="btn btn-secondary">+ Add Capability</button>

        <div class="generator-actions">
          <button type="button" id="generate-btn" class="btn btn-primary">Generate agenticweb.md</button>
        </div>
      </div>

      <div class="generator-output" style="display: none;">
        <h3>Generated agenticweb.md</h3>
        <pre><code id="output-code"></code></pre>
        <div class="output-actions">
          <button type="button" id="copy-btn" class="btn btn-primary">Copy to Clipboard</button>
          <button type="button" id="download-btn" class="btn btn-secondary">Download</button>
          <button type="button" id="edit-btn" class="btn btn-secondary">Edit</button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    document.getElementById('add-capability').addEventListener('click', () => this.addCapability());
    document.getElementById('generate-btn').addEventListener('click', () => this.generate());
    document.getElementById('copy-btn').addEventListener('click', () => this.copyToClipboard());
    document.getElementById('download-btn').addEventListener('click', () => this.download());
    document.getElementById('edit-btn').addEventListener('click', () => this.showForm());
  }

  addCapability() {
    const id = Date.now();
    this.capabilities.push(id);
    
    const list = document.getElementById('capabilities-list');
    const div = document.createElement('div');
    div.className = 'capability-item';
    div.id = `cap-${id}`;
    div.innerHTML = `
      <div class="capability-header">
        <span>Capability</span>
        <button type="button" class="remove-cap" data-id="${id}">&times;</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Kind *</label>
          <select class="cap-kind" data-id="${id}">
            ${CAPABILITY_KINDS.map(k => `<option value="${k.value}">${k.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>ID *</label>
          <input type="text" class="cap-id" data-id="${id}" placeholder="my-api" pattern="[a-z0-9-]+">
        </div>
      </div>
      <div class="form-group">
        <label>Description *</label>
        <input type="text" class="cap-description" data-id="${id}" placeholder="What this capability does" maxlength="160">
      </div>
      <div class="form-group">
        <label>URL *</label>
        <input type="text" class="cap-url" data-id="${id}" placeholder="https://api.yourcompany.com/v1">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Status</label>
          <select class="cap-status" data-id="${id}">
            <option value="active">Active</option>
            <option value="beta">Beta</option>
            <option value="deprecated">Deprecated</option>
          </select>
        </div>
        <div class="form-group">
          <label>Pricing Model</label>
          <select class="cap-pricing" data-id="${id}">
            <option value="">Not specified</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label><input type="checkbox" class="cap-auth" data-id="${id}"> Auth Required</label>
        </div>
        <div class="form-group">
          <label>Auth Registration URL</label>
          <input type="url" class="cap-auth-url" data-id="${id}" placeholder="https://developers.yourcompany.com/signup">
        </div>
      </div>
      <div class="form-group kind-specific kind-api" style="display: none;">
        <label>Schema URL (OpenAPI)</label>
        <input type="url" class="cap-schema" data-id="${id}" placeholder="https://api.yourcompany.com/openapi.json">
      </div>
      <div class="form-group kind-specific kind-mcp" style="display: none;">
        <label>Transport</label>
        <select class="cap-transport" data-id="${id}">
          <option value="http">HTTP</option>
          <option value="sse">SSE</option>
          <option value="stdio">stdio</option>
        </select>
      </div>
      <div class="kind-specific kind-model" style="display: none;">
        <div class="form-row">
          <div class="form-group">
            <label>Source</label>
            <input type="text" class="cap-source" data-id="${id}" placeholder="huggingface, openai, anthropic">
          </div>
          <div class="form-group">
            <label>Model ID</label>
            <input type="text" class="cap-model-id" data-id="${id}" placeholder="org/model-name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Model Card URL</label>
            <input type="url" class="cap-model-card" data-id="${id}" placeholder="https://huggingface.co/org/model">
          </div>
          <div class="form-group">
            <label>API Compatibility</label>
            <input type="text" class="cap-api-compat" data-id="${id}" placeholder="openai, anthropic">
          </div>
        </div>
      </div>
    `;
    list.appendChild(div);

    // Event listeners
    div.querySelector('.remove-cap').addEventListener('click', () => this.removeCapability(id));
    div.querySelector('.cap-kind').addEventListener('change', (e) => this.onKindChange(id, e.target.value));
  }

  removeCapability(id) {
    this.capabilities = this.capabilities.filter(c => c !== id);
    document.getElementById(`cap-${id}`).remove();
  }

  onKindChange(id, kind) {
    const item = document.getElementById(`cap-${id}`);
    item.querySelectorAll('.kind-specific').forEach(el => el.style.display = 'none');
    const kindEl = item.querySelector(`.kind-${kind}`);
    if (kindEl) kindEl.style.display = 'block';
  }

  generate() {
    const data = this.collectData();
    const yaml = this.toYaml(data);
    
    document.getElementById('output-code').textContent = yaml;
    document.querySelector('.generator-form').style.display = 'none';
    document.querySelector('.generator-output').style.display = 'block';
  }

  collectData() {
    const getValue = (id) => document.getElementById(id)?.value?.trim() || '';
    const getChecked = (id) => document.getElementById(id)?.checked || false;

    const data = {
      agenticweb: '1',
      name: getValue('org-name'),
      description: getValue('org-description'),
      updated: new Date().toISOString().split('T')[0]
    };

    // Organization
    const org = {};
    if (getValue('display-name')) org.name = getValue('display-name');
    if (getValue('legal-name')) org.legal_name = getValue('legal-name');
    if (getValue('website')) org.website = getValue('website');
    if (getValue('jurisdiction')) {
      const j = getValue('jurisdiction').split(',').map(s => s.trim()).filter(Boolean);
      if (j.length) org.jurisdiction = j;
    }
    if (Object.keys(org).length) data.organization = org;

    // Contacts
    const contacts = {};
    if (getValue('support-email')) contacts.support = `mailto:${getValue('support-email')}`;
    if (getValue('security-email')) contacts.security = `mailto:${getValue('security-email')}`;
    if (Object.keys(contacts).length) data.contacts = contacts;

    // Links
    const links = {};
    if (getValue('docs-url')) links.docs = getValue('docs-url');
    if (getValue('privacy-url')) links.privacy = getValue('privacy-url');
    if (Object.keys(links).length) data.links = links;

    // Permissions
    data.permissions = {
      read: getChecked('perm-read'),
      cite: getChecked('perm-cite'),
      summarize: getChecked('perm-summarize'),
      train: getChecked('perm-train'),
      execute: getChecked('perm-execute'),
      cache: getChecked('perm-cache')
    };

    // Categories
    const selected = Array.from(document.getElementById('categories').selectedOptions).map(o => o.value);
    if (selected.length) {
      data.categories = { standard: selected };
    }

    // Compliance
    const compliance = {};
    if (getChecked('gdpr-compliant')) compliance.gdpr_compliant = true;
    const aiLevel = getValue('ai-act-level');
    if (aiLevel) compliance.ai_act_risk_level = aiLevel;
    if (Object.keys(compliance).length) data.compliance = compliance;

    // Capabilities
    data.capabilities = this.capabilities.map(id => {
      const cap = {
        kind: document.querySelector(`.cap-kind[data-id="${id}"]`).value,
        id: document.querySelector(`.cap-id[data-id="${id}"]`).value,
        description: document.querySelector(`.cap-description[data-id="${id}"]`).value,
        url: document.querySelector(`.cap-url[data-id="${id}"]`).value
      };

      const status = document.querySelector(`.cap-status[data-id="${id}"]`).value;
      if (status && status !== 'active') cap.status = status;
      
      const pricing = document.querySelector(`.cap-pricing[data-id="${id}"]`).value;
      if (pricing) cap.pricing_model = pricing;

      if (document.querySelector(`.cap-auth[data-id="${id}"]`).checked) {
        cap.auth_required = true;
        const authUrl = document.querySelector(`.cap-auth-url[data-id="${id}"]`).value;
        if (authUrl) cap.auth_registration = authUrl;
      }

      // Kind-specific
      if (cap.kind === 'api') {
        const schema = document.querySelector(`.cap-schema[data-id="${id}"]`).value;
        if (schema) cap.schema = schema;
      }
      if (cap.kind === 'mcp') {
        cap.transport = document.querySelector(`.cap-transport[data-id="${id}"]`).value;
      }
      if (cap.kind === 'model') {
        const source = document.querySelector(`.cap-source[data-id="${id}"]`).value;
        if (source) cap.source = source;
        const modelId = document.querySelector(`.cap-model-id[data-id="${id}"]`).value;
        if (modelId) cap.model_id = modelId;
        const modelCard = document.querySelector(`.cap-model-card[data-id="${id}"]`).value;
        if (modelCard) cap.model_card = modelCard;
        const apiCompat = document.querySelector(`.cap-api-compat[data-id="${id}"]`).value;
        if (apiCompat) cap.api_compatibility = apiCompat;
      }

      return cap;
    }).filter(c => c.id && c.url);

    return data;
  }

  toYaml(data) {
    const lines = ['---'];
    
    const addLine = (key, value, indent = 0) => {
      const prefix = '  '.repeat(indent);
      if (typeof value === 'boolean') {
        lines.push(`${prefix}${key}: ${value}`);
      } else if (Array.isArray(value)) {
        if (value.length === 0) return;
        if (typeof value[0] === 'object') {
          lines.push(`${prefix}${key}:`);
          value.forEach(item => {
            let first = true;
            for (const [k, v] of Object.entries(item)) {
              if (first) {
                lines.push(`${prefix}  - ${k}: ${JSON.stringify(v)}`);
                first = false;
              } else {
                lines.push(`${prefix}    ${k}: ${JSON.stringify(v)}`);
              }
            }
          });
        } else {
          lines.push(`${prefix}${key}:`);
          value.forEach(v => lines.push(`${prefix}  - "${v}"`));
        }
      } else if (typeof value === 'object') {
        lines.push(`${prefix}${key}:`);
        for (const [k, v] of Object.entries(value)) {
          addLine(k, v, indent + 1);
        }
      } else {
        lines.push(`${prefix}${key}: "${value}"`);
      }
    };

    addLine('agenticweb', data.agenticweb);
    addLine('name', data.name);
    addLine('description', data.description);
    addLine('updated', data.updated);
    lines.push('');

    if (data.organization) {
      addLine('organization', data.organization);
      lines.push('');
    }
    if (data.contacts) {
      addLine('contacts', data.contacts);
      lines.push('');
    }
    if (data.links) {
      addLine('links', data.links);
      lines.push('');
    }
    if (data.permissions) {
      addLine('permissions', data.permissions);
      lines.push('');
    }
    if (data.categories) {
      addLine('categories', data.categories);
      lines.push('');
    }
    if (data.compliance) {
      addLine('compliance', data.compliance);
      lines.push('');
    }
    if (data.capabilities?.length) {
      addLine('capabilities', data.capabilities);
    }

    lines.push('---');
    return lines.join('\n');
  }

  showForm() {
    document.querySelector('.generator-form').style.display = 'block';
    document.querySelector('.generator-output').style.display = 'none';
  }

  async copyToClipboard() {
    const code = document.getElementById('output-code').textContent;
    await navigator.clipboard.writeText(code);
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy to Clipboard', 2000);
  }

  download() {
    const code = document.getElementById('output-code').textContent;
    const blob = new Blob([code], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agenticweb.md';
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('agenticweb-generator');
  if (container) {
    new AgenticWebGenerator('agenticweb-generator');
  }
});
