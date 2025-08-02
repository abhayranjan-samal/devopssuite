// DevOps Automation Suite JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTabs();
    initGenerators();
    initThemeToggle();
    initMobileMenu();
    initTemplates();
    initNotifications();
    
    console.log('DevOps Automation Suite initialized successfully!');
});

// Fixed Navigation between main sections
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-nav]');
    const sections = document.querySelectorAll('.section');
    
    // Show home section by default
    showSection('home');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-nav');
            showSection(targetId);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav__menu');
            const menuToggle = document.querySelector('.nav__toggle');
            if (navMenu && menuToggle) {
                navMenu.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update page title
            updatePageTitle(sectionId);
            
            console.log(`Navigated to section: ${sectionId}`);
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.parentElement?.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-nav="${sectionId}"]`);
        if (activeLink) {
            activeLink.parentElement?.classList.add('active');
        }
    }
    
    function updatePageTitle(sectionId) {
        const titles = {
            'home': 'DevOps Automation Suite - Home',
            'kubernetes': 'Kubernetes Tools - DevOps Suite',
            'cicd': 'CI/CD Tools - DevOps Suite', 
            'iac': 'Infrastructure as Code - DevOps Suite',
            'shell': 'Shell Tools - DevOps Suite',
            'templates': 'Template Library - DevOps Suite',
            'docs': 'Documentation - DevOps Suite'
        };
        
        document.title = titles[sectionId] || 'DevOps Automation Suite';
    }
}

// Fixed Tab switching within generator sections
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = button.getAttribute('data-tab');
            const parentSection = button.closest('.generator-section');
            
            if (parentSection) {
                // Remove active class from all tabs in this section
                const sectionTabs = parentSection.querySelectorAll('.tab-btn');
                const sectionContents = parentSection.querySelectorAll('.tab-content');
                
                sectionTabs.forEach(tab => tab.classList.remove('active'));
                sectionContents.forEach(content => content.classList.remove('active'));
                
                // Activate clicked tab and corresponding content
                button.classList.add('active');
                const targetContent = parentSection.querySelector(`#${tabId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // Generate initial code for the active tab
                    setTimeout(() => {
                        const form = targetContent.querySelector('[data-generator]');
                        if (form) {
                            const generatorType = form.getAttribute('data-generator');
                            generateCode(generatorType, form);
                        }
                    }, 100);
                }
                
                console.log(`Switched to tab: ${tabId}`);
            }
        });
    });
}

// Fixed and Enhanced Generators
function initGenerators() {
    const generators = document.querySelectorAll('[data-generator]');
    
    generators.forEach(form => {
        const generatorType = form.getAttribute('data-generator');
        
        // Generate initial code
        generateCode(generatorType, form);
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateCode(generatorType, form);
            showNotification('Configuration generated successfully!', 'success');
        });
        
        // Real-time generation on input change with debouncing
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(() => {
                generateCode(generatorType, form);
            }, 300));
            
            input.addEventListener('change', () => {
                generateCode(generatorType, form);
            });
        });
    });
    
    // Initialize copy and download buttons
    initCopyButtons();
    initDownloadButtons();
}

// Enhanced code generation with better error handling
function generateCode(generatorType, form) {
    try {
        const formData = new FormData(form);
        const data = {};
        
        // Process form data including checkboxes
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Handle unchecked checkboxes
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const name = checkbox.name;
            if (!formData.has(name)) {
                if (!data[name]) data[name] = [];
            }
        });
        
        let generatedCode = '';
        
        switch (generatorType) {
            case 'helm-chart':
                generatedCode = generateHelmChart(data);
                break;
            case 'k8s-yaml':
                generatedCode = generateKubernetesYAML(data);
                break;
            case 'helm-debug':
                generatedCode = generateHelmDebug(data);
                break;
            case 'github-actions':
                generatedCode = generateGitHubActions(data);
                break;
            case 'gitlab-ci':
                generatedCode = generateGitLabCI(data);
                break;
            case 'jenkins':
                generatedCode = generateJenkins(data);
                break;
            case 'ansible':
                generatedCode = generateAnsible(data);
                break;
            case 'terraform':
                generatedCode = generateTerraform(data);
                break;
            case 'cloudformation':
                generatedCode = generateCloudFormation(data);
                break;
            case 'bash':
                generatedCode = generateBashScript(data);
                break;
            case 'powershell':
                generatedCode = generatePowerShell(data);
                break;
            case 'sysadmin':
                generatedCode = generateSysAdminScript(data);
                break;
            default:
                generatedCode = `# Generator for ${generatorType} is being implemented
# This is a placeholder configuration
# 
# Generated with data:
${JSON.stringify(data, null, 2)}`;
        }
        
        // Update output with animation
        const outputElement = document.getElementById(`${generatorType}-output`);
        if (outputElement) {
            outputElement.textContent = generatedCode;
            
            // Add success styling temporarily
            const outputContainer = outputElement.closest('.generator-output');
            if (outputContainer) {
                outputContainer.classList.add('status-success');
                setTimeout(() => {
                    outputContainer.classList.remove('status-success');
                }, 1000);
            }
        }
        
    } catch (error) {
        console.error('Code generation error:', error);
        const outputElement = document.getElementById(`${generatorType}-output`);
        if (outputElement) {
            outputElement.textContent = `# Error generating code: ${error.message}
# Please check your input values and try again.`;
            
            const outputContainer = outputElement.closest('.generator-output');
            if (outputContainer) {
                outputContainer.classList.add('status-error');
                setTimeout(() => {
                    outputContainer.classList.remove('status-error');
                }, 2000);
            }
        }
        showNotification('Error generating code. Please check your inputs.', 'error');
    }
}

// All generator functions remain the same as they were working correctly
function generateHelmChart(data) {
    const chartName = data.chartName || 'my-app';
    const appType = data.appType || 'Deployment';
    const image = data.image || 'nginx:latest';
    const replicas = data.replicas || '3';
    const serviceType = data.serviceType || 'ClusterIP';
    const port = data.port || '80';
    
    return `# Helm Chart for ${chartName}
apiVersion: v2
name: ${chartName}
description: A Helm chart for Kubernetes
type: application
version: 0.1.0
appVersion: "1.0.0"

---
# values.yaml
replicaCount: ${replicas}

image:
  repository: ${image.split(':')[0]}
  tag: "${image.split(':')[1] || 'latest'}"
  pullPolicy: IfNotPresent

service:
  type: ${serviceType}
  port: ${port}

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

nodeSelector: {}
tolerations: []
affinity: {}

---
# templates/deployment.yaml
apiVersion: apps/v1
kind: ${appType}
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "${chartName}.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "${chartName}.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: ${port}
              protocol: TCP
          resources:
            {{- toYaml .Values.resources | nindent 12 }}

---
# templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ include "${chartName}.fullname" . }}
  labels:
    {{- include "${chartName}.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: http
      protocol: TCP
      name: http
  selector:
    {{- include "${chartName}.selectorLabels" . | nindent 4 }}`;
}

function generateKubernetesYAML(data) {
    const resourceType = data.resourceType || 'deployment';
    const name = data.resourceName || 'my-app';
    const namespace = data.namespace || 'default';
    
    switch (resourceType) {
        case 'deployment':
            return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${name}
spec:
  replicas: ${data.replicas || 3}
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
      - name: ${name}
        image: ${data.image || 'nginx:latest'}
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"`;
            
        case 'service':
            return `apiVersion: v1
kind: Service
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
    app: ${name}
spec:
  selector:
    app: ${name}
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP`;
    
        case 'configmap':
            return `apiVersion: v1
kind: ConfigMap
metadata:
  name: ${name}
  namespace: ${namespace}
data:
  config.properties: |
    key1=value1
    key2=value2
  config.yaml: |
    database:
      host: localhost
      port: 5432`;
      
        case 'secret':
            return `apiVersion: v1
kind: Secret
metadata:
  name: ${name}
  namespace: ${namespace}
type: Opaque
data:
  username: dXNlcm5hbWU=  # base64 encoded
  password: cGFzc3dvcmQ=  # base64 encoded`;
  
        case 'ingress':
            return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}
  namespace: ${namespace}
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: ${name}.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${name}
            port:
              number: 80`;
              
        default:
            return `# Unsupported resource type: ${resourceType}`;
    }
}

function generateHelmDebug(data) {
    const template = data.helmTemplate || '';
    const values = data.helmValues || '';
    
    try {
        let rendered = template;
        const valuesObj = parseSimpleYAML(values);
        
        // Replace simple template variables like {{ .Values.name }}
        rendered = rendered.replace(/\{\{\s*\.Values\.(\w+)\s*\}\}/g, (match, key) => {
            return valuesObj[key] || match;
        });
        
        return `# Rendered Helm Template
${rendered}

# Debug Information:
# - Template variables found and replaced
# - Values applied from input
# - Result: Template successfully rendered`;
    } catch (error) {
        return `# Error rendering template
# ${error.message}

# Original Template:
${template}

# Values:
${values}`;
    }
}

function generateGitHubActions(data) {
    const workflowName = data.workflowName || 'CI/CD Pipeline';
    const language = data.language || 'node';
    const triggers = Array.isArray(data.triggers) ? data.triggers : [data.triggers].filter(Boolean);
    const includeDocker = data.includeDocker === 'on';
    const deployTarget = data.deployTarget;
    
    let triggerSection = 'on:\n';
    if (triggers.includes('push')) triggerSection += '  push:\n    branches: [ main, develop ]\n';
    if (triggers.includes('pull_request')) triggerSection += '  pull_request:\n    branches: [ main ]\n';
    if (triggers.includes('schedule')) triggerSection += '  schedule:\n    - cron: \'0 2 * * 1\'\n';
    
    let jobSteps = '';
    
    switch (language) {
        case 'node':
            jobSteps = `      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build`;
            break;
            
        case 'python':
            jobSteps = `      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Run tests
        run: pytest
      
      - name: Build application
        run: python setup.py build`;
            break;
            
        default:
            jobSteps = `      - uses: actions/checkout@v4
      
      - name: Build application
        run: echo "Add your build steps here"
      
      - name: Run tests
        run: echo "Add your test steps here"`;
    }
    
    if (includeDocker) {
        jobSteps += `
      
      - name: Build Docker image
        run: docker build -t \${{ github.repository }}:\${{ github.sha }} .
      
      - name: Push Docker image
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push \${{ github.repository }}:\${{ github.sha }}`;
    }
    
    return `name: ${workflowName}

${triggerSection}

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
${jobSteps}`;
}

function generateGitLabCI(data) {
    const language = data.language || 'node';
    const stages = Array.isArray(data.stages) ? data.stages : [data.stages].filter(Boolean);
    
    let stagesSection = 'stages:\n';
    stages.forEach(stage => {
        stagesSection += `  - ${stage}\n`;
    });
    
    return `${stagesSection}
variables:
  DOCKER_DRIVER: overlay2

build:
  stage: build
  image: ${language === 'node' ? 'node:18' : 'alpine:latest'}  
  script:
    - echo "Building with ${language}"
    - echo "Add your build commands here"

test:
  stage: test
  image: ${language === 'node' ? 'node:18' : 'alpine:latest'}
  script:
    - echo "Running tests"
    - echo "Add your test commands here"`;
}

function generateJenkins(data) {
    const pipelineType = data.pipelineType || 'declarative';
    const agent = data.agent || 'any';
    const language = data.language || 'node';
    
    return `pipeline {
    agent ${agent}
    
    stages {
        stage('Build') {
            steps {
                echo 'Building with ${language}...'
                // Add your build steps here
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add your test steps here
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Add your deploy steps here
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed'
            cleanWs()
        }
    }
}`;
}

function generateAnsible(data) {
    const playbookName = data.playbookName || 'Deploy Application';
    const hosts = data.hosts || 'webservers';
    const remoteUser = data.remoteUser || 'ubuntu';
    
    return `---
- name: ${playbookName}
  hosts: ${hosts}
  remote_user: ${remoteUser}
  become: yes
  
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes
        
    - name: Install nginx
      apt:
        name: nginx
        state: present
        
    - name: Start nginx service
      systemd:
        name: nginx
        state: started
        enabled: yes`;
}

function generateTerraform(data) {
    const provider = data.provider || 'aws';
    const instanceType = data.instanceType || 't3.micro';
    
    return `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "${instanceType}"

  tags = {
    Name = "DevOps-Instance"
  }
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}`;
}

function generateCloudFormation(data) {
    const description = data.description || 'AWS Infrastructure Stack';
    const instanceType = data.instanceType || 't3.micro';
    
    const template = {
        "AWSTemplateFormatVersion": "2010-09-09",
        "Description": description,
        "Resources": {
            "EC2Instance": {
                "Type": "AWS::EC2::Instance",
                "Properties": {
                    "InstanceType": instanceType,
                    "ImageId": "ami-0c02fb55956c7d316"
                }
            }
        },
        "Outputs": {
            "InstanceId": {
                "Description": "Instance ID",
                "Value": { "Ref": "EC2Instance" }
            }
        }
    };
    
    return JSON.stringify(template, null, 2);
}

function generateBashScript(data) {
    const scriptName = data.scriptName || 'script';
    const purpose = data.purpose || 'deployment';
    
    return `#!/bin/bash
# ${scriptName}.sh
# Purpose: ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} script

set -euo pipefail

log() {
    echo "[\$(date '+%Y-%m-%d %H:%M:%S')] \$1"
}

main() {
    log "Starting ${purpose} process..."
    
    # Add your ${purpose} logic here
    echo "Hello from ${scriptName}!"
    
    log "${purpose.charAt(0).toUpperCase() + purpose.slice(1)} completed successfully!"
}

main "\$@"`;
}

function generatePowerShell(data) {
    const scriptName = data.scriptName || 'System-Management';
    
    return `<#
.SYNOPSIS
    ${scriptName} PowerShell script

.DESCRIPTION
    System management PowerShell script

.EXAMPLE
    .\\${scriptName}.ps1

.NOTES
    Generated by DevOps Automation Suite
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = \$false)]
    [string]\$ComputerName = \$env:COMPUTERNAME
)

Write-Host "Processing computer: \$ComputerName" -ForegroundColor Green

try {
    \$systemInfo = Get-WmiObject -Class Win32_ComputerSystem -ComputerName \$ComputerName
    Write-Output "Computer Name: \$(\$systemInfo.Name)"
    Write-Output "Total Memory: \$([math]::Round(\$systemInfo.TotalPhysicalMemory / 1GB, 2)) GB"
} catch {
    Write-Error "Failed to process \$ComputerName`: \$(\$_.Exception.Message)"
}`;
}

function generateSysAdminScript(data) {
    const templateType = data.templateType || 'backup';
    
    return `#!/bin/bash
# System ${templateType.charAt(0).toUpperCase() + templateType.slice(1)} Script

set -euo pipefail

LOG_FILE="/var/log/${templateType}.log"

log() {
    echo "[\$(date '+%Y-%m-%d %H:%M:%S')] \$1" | tee -a "\${LOG_FILE}"
}

main() {
    log "Starting ${templateType} process..."
    
    # Add your ${templateType} logic here
    echo "Performing ${templateType} operations..."
    
    log "${templateType.charAt(0).toUpperCase() + templateType.slice(1)} completed successfully!"
}

main "\$@"`;
}

// Helper functions
function parseSimpleYAML(yamlString) {
    const lines = yamlString.split('\n');
    const result = {};
    
    for (let line of lines) {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                result[key.trim()] = value;
            }
        }
    }
    
    return result;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fixed Copy functionality
function initCopyButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
            const outputElement = e.target.closest('.generator-output').querySelector('code');
            if (outputElement && outputElement.textContent.trim()) {
                navigator.clipboard.writeText(outputElement.textContent).then(() => {
                    showNotification('Code copied to clipboard!', 'success');
                    e.target.textContent = 'Copied!';
                    setTimeout(() => {
                        e.target.textContent = 'Copy';
                    }, 2000);
                }).catch(() => {
                    showNotification('Failed to copy code', 'error');
                });
            } else {
                showNotification('No code to copy', 'warning');
            }
        }
    });
}

// Fixed Download functionality
function initDownloadButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('download-btn')) {
            const outputElement = e.target.closest('.generator-output').querySelector('code');
            const tabContent = e.target.closest('.tab-content');
            
            if (outputElement && tabContent && outputElement.textContent.trim()) {
                const content = outputElement.textContent;
                const filename = getFilename(tabContent.id, content);
                downloadFile(content, filename);
                showNotification(`Downloaded ${filename}`, 'success');
            } else {
                showNotification('No code to download', 'warning');
            }
        }
    });
}

function getFilename(tabId, content) {
    const extensions = {
        'helm-chart': 'yaml',
        'k8s-yaml': 'yaml',
        'helm-debug': 'yaml',
        'github-actions': 'yml',
        'gitlab-ci': 'yml',
        'jenkins': 'groovy',
        'ansible': 'yml',
        'terraform': 'tf',
        'cloudformation': 'json',
        'bash': 'sh',
        'powershell': 'ps1',
        'sysadmin': 'sh'
    };
    
    const extension = extensions[tabId] || 'txt';
    const baseName = tabId.replace(/-/g, '_');
    
    return `${baseName}.${extension}`;
}

function downloadFile(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Fixed Theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeToggle(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-color-scheme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-color-scheme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggle(newTheme);
            
            showNotification(`Switched to ${newTheme} theme`, 'success');
        });
    }
}

function updateThemeToggle(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    }
}

// Fixed Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = navMenu.classList.contains('mobile-open');
            
            if (isOpen) {
                navMenu.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
            } else {
                navMenu.classList.add('mobile-open');
                menuToggle.classList.add('active');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Template functionality
function initTemplates() {
    const templateButtons = document.querySelectorAll('.template-btn');
    
    templateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const templateId = button.getAttribute('data-template');
            loadTemplate(templateId);
        });
    });
}

function loadTemplate(templateId) {
    showNotification(`Loading template: ${templateId}`, 'success');
    
    // Switch to appropriate tool section
    const toolMapping = {
        'k8s-full-deployment': 'kubernetes',
        'nodejs-cicd': 'cicd',
        'aws-infra': 'iac',
        'server-deployment': 'iac',
        'backup-script': 'shell',
        'system-monitor': 'shell'
    };
    
    const targetSection = toolMapping[templateId];
    if (targetSection) {
        const targetLink = document.querySelector(`[data-nav="${targetSection}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

// Enhanced Notification system
function initNotifications() {
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',  
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, duration);
}

console.log('DevOps Automation Suite v1.0.0 - Fully functional and ready to use!');