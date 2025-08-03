import React from "react";

const docContent = `
# DevOps Automation Suite Documentation

Welcome to the documentation for the DevOps Automation Tools.

## Kubernetes YAML Generator

Generate Kubernetes manifest files for deployments, services, and more.

## CI/CD Generator

Create GitHub Actions YAML workflows for your projects.

## Infrastructure as Code

Generate sample Terraform resources and templates.

## Shell Script Generator

Quickly create shell scripts based on simple task descriptions.

## Templates

Access common DevOps templates for fast-start development.

Refer to each tool's help section for detailed usage instructions.
`;

function Documentation() {
  return (
    <div style={{ padding: 10 }}>
      <h2>Documentation</h2>
      <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f9f9f9", padding: 15, border: "1px solid #ddd" }}>
        {docContent}
      </pre>
    </div>
  );
}

export default Documentation;

