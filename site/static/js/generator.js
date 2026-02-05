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
    this.links = [];
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
          <label for="org-description">Description *</label>
          <input type="text" id="org-description" placeholder="Short description of what you offer" maxlength="400" required>
          <small>Max 400 characters</small>
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
        <div id="links-list"></div>
        <button type="button" id="add-link" class="btn btn-secondary">+ Add Link</button>

        <h3>Trust</h3>
        <div class="form-group">
          <label for="allowed-origins">Allowed Origins</label>
          <input type="text" id="allowed-origins" placeholder="https://example.com, https://api.example.com">
          <small>Comma-separated HTTPS URLs</small>
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
    document.getElementById('add-link').addEventListener('click', () => this.addLink());
    document.getElementById('add-capability').addEventListener('click', () => this.addCapability());
    document.getElementById('generate-btn').addEventListener('click', () => this.generate());
    document.getElementById('copy-btn').addEventListener('click', () => this.copyToClipboard());
    document.getElementById('download-btn').addEventListener('click', () => this.download());
    document.getElementById('edit-btn').addEventListener('click', () => this.showForm());
  }

  addLink() {
    const id = Date.now();
    this.links.push(id);
    
    const list = document.getElementById('links-list');
    const div = document.createElement('div');
    div.className = 'capability-item';
    div.id = `link-${id}`;
    div.innerHTML = `
      <div class="capability-header">
        <span>Link</span>
        <button type="button" class="remove-link" data-id="${id}">&times;</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Name *</label>
          <input type="text" class="link-name" data-id="${id}" placeholder="docs, privacy, terms">
        </div>
        <div class="form-group">
          <label>URL *</label>
          <input type="url" class="link-url" data-id="${id}" placeholder="https://example.com/docs">
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="link-description" data-id="${id}" placeholder="Optional description">
      </div>
      <div class="form-group">
        <label><input type="checkbox" class="link-has-perms" data-id="${id}"> Set custom permissions</label>
      </div>
      <div class="permissions-section" id="link-perms-${id}" style="display: none;">
        <div class="permissions-grid">
          <label><input type="checkbox" class="link-perm-read" data-id="${id}" checked> Read</label>
          <label><input type="checkbox" class="link-perm-cite" data-id="${id}" checked> Cite</label>
          <label><input type="checkbox" class="link-perm-summarize" data-id="${id}" checked> Summarize</label>
          <label><input type="checkbox" class="link-perm-train" data-id="${id}"> Train</label>
          <label><input type="checkbox" class="link-perm-cache" data-id="${id}" checked> Cache</label>
        </div>
      </div>
    `;
    list.appendChild(div);

    div.querySelector('.remove-link').addEventListener('click', () => this.removeLink(id));
    div.querySelector('.link-has-perms').addEventListener('change', (e) => {
      document.getElementById(`link-perms-${id}`).style.display = e.target.checked ? 'block' : 'none';
    });
  }

  removeLink(id) {
    this.links = this.links.filter(l => l !== id);
    document.getElementById(`link-${id}`).remove();
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
      <div class="form-group">
        <label><input type="checkbox" class="cap-has-perms" data-id="${id}"> Set custom permissions</label>
      </div>
      <div class="permissions-section" id="cap-perms-${id}" style="display: none;">
        <div class="permissions-grid">
          <label><input type="checkbox" class="cap-perm-read" data-id="${id}" checked> Read</label>
          <label><input type="checkbox" class="cap-perm-cite" data-id="${id}" checked> Cite</label>
          <label><input type="checkbox" class="cap-perm-summarize" data-id="${id}" checked> Summarize</label>
          <label><input type="checkbox" class="cap-perm-train" data-id="${id}"> Train</label>
          <label><input type="checkbox" class="cap-perm-execute" data-id="${id}" checked> Execute</label>
          <label><input type="checkbox" class="cap-perm-cache" data-id="${id}" checked> Cache</label>
        </div>
      </div>
      <div class="form-group">
        <label><input type="checkbox" class="cap-has-compliance" data-id="${id}"> Add AI Act compliance</label>
      </div>
      <div class="compliance-section" id="cap-compliance-${id}" style="display: none;">
        <div class="form-row">
          <div class="form-group">
            <label>AI Act Risk Level</label>
            <select class="cap-ai-risk" data-id="${id}">
              <option value="">Not specified</option>
              <option value="minimal">Minimal</option>
              <option value="limited">Limited</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="form-group">
            <label><input type="checkbox" class="cap-human-oversight" data-id="${id}"> Human oversight required</label>
          </div>
        </div>
        <div class="form-group">
          <label>Conformity URL</label>
          <input type="url" class="cap-conformity-url" data-id="${id}" placeholder="https://example.com/ai-act/conformity">
        </div>
      </div>
    `;
    list.appendChild(div);

    // Event listeners
    div.querySelector('.remove-cap').addEventListener('click', () => this.removeCapability(id));
    div.querySelector('.cap-kind').addEventListener('change', (e) => this.onKindChange(id, e.target.value));
    div.querySelector('.cap-has-perms').addEventListener('change', (e) => {
      document.getElementById(`cap-perms-${id}`).style.display = e.target.checked ? 'block' : 'none';
    });
    div.querySelector('.cap-has-compliance').addEventListener('change', (e) => {
      document.getElementById(`cap-compliance-${id}`).style.display = e.target.checked ? 'block' : 'none';
    });
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

    // Links (array)
    const links = this.links.map(id => {
      const link = {
        name: document.querySelector(`.link-name[data-id="${id}"]`).value,
        url: document.querySelector(`.link-url[data-id="${id}"]`).value
      };
      
      const desc = document.querySelector(`.link-description[data-id="${id}"]`).value;
      if (desc) link.description = desc;

      // Permissions (only if checkbox checked)
      if (document.querySelector(`.link-has-perms[data-id="${id}"]`).checked) {
        link.permissions = {
          read: document.querySelector(`.link-perm-read[data-id="${id}"]`).checked,
          cite: document.querySelector(`.link-perm-cite[data-id="${id}"]`).checked,
          summarize: document.querySelector(`.link-perm-summarize[data-id="${id}"]`).checked,
          train: document.querySelector(`.link-perm-train[data-id="${id}"]`).checked,
          cache: document.querySelector(`.link-perm-cache[data-id="${id}"]`).checked
        };
      }

      return link;
    }).filter(l => l.name && l.url);
    
    if (links.length) data.links = links;

    // Trust
    const allowedOrigins = getValue('allowed-origins').split(',').map(s => s.trim()).filter(Boolean);
    if (allowedOrigins.length) {
      data.trust = { allowed_origins: allowedOrigins };
    }

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

      // Permissions (only if checkbox checked)
      if (document.querySelector(`.cap-has-perms[data-id="${id}"]`).checked) {
        cap.permissions = {
          read: document.querySelector(`.cap-perm-read[data-id="${id}"]`).checked,
          cite: document.querySelector(`.cap-perm-cite[data-id="${id}"]`).checked,
          summarize: document.querySelector(`.cap-perm-summarize[data-id="${id}"]`).checked,
          train: document.querySelector(`.cap-perm-train[data-id="${id}"]`).checked,
          execute: document.querySelector(`.cap-perm-execute[data-id="${id}"]`).checked,
          cache: document.querySelector(`.cap-perm-cache[data-id="${id}"]`).checked
        };
      }

      // Compliance (only if checkbox checked)
      if (document.querySelector(`.cap-has-compliance[data-id="${id}"]`).checked) {
        const compliance = {};
        const aiRisk = document.querySelector(`.cap-ai-risk[data-id="${id}"]`).value;
        if (aiRisk) compliance.ai_act_risk_level = aiRisk;
        
        if (document.querySelector(`.cap-human-oversight[data-id="${id}"]`).checked) {
          compliance.human_oversight_required = true;
        }
        
        const conformityUrl = document.querySelector(`.cap-conformity-url[data-id="${id}"]`).value;
        if (conformityUrl) compliance.conformity_url = conformityUrl;
        
        if (Object.keys(compliance).length) cap.compliance = compliance;
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
    if (data.trust) {
      addLine('trust', data.trust);
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
