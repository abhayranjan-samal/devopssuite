import React, { useState } from "react";

const templates = {
  "github-action": `name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
`,
  "kubernetes-deploy": `apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
        - name: example
          image: nginx:latest
`,
  "terraform-s3": `resource "aws_s3_bucket" "example" {
  bucket = "my-bucket"
  acl    = "private"
}
`,
};

function TemplatesTool() {
  const [selected, setSelected] = useState("github-action");

  return (
    <div style={{ padding: 10 }}>
      <h2>Templates</h2>
      <label>
        Select a Template:
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          <option value="github-action">GitHub Action</option>
          <option value="kubernetes-deploy">Kubernetes Deployment</option>
          <option value="terraform-s3">Terraform S3 Bucket</option>
        </select>
      </label>
      <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 10, marginTop: 10 }}>
        {templates[selected]}
      </pre>
    </div>
  );
}

export default TemplatesTool;

