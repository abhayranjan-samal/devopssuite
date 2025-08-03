import React, { useState } from "react";

function CICDYamlGenerator() {
  const [nodeVersion, setNodeVersion] = useState("18");
  const [branch, setBranch] = useState("main");
  const [yaml, setYaml] = useState("");

  const generateYaml = () => {
    const yamlString = 
`name: CI/CD Pipeline
on:
  push:
    branches: [${branch}]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${nodeVersion}
      - run: npm install
      - run: npm run build
      - run: npm test
`;
    setYaml(yamlString);
  };

  return (
    <div style={{ padding: 10 }}>
      <h2>CI/CD YAML Generator (GitHub Actions)</h2>
      <label>
        Node.js Version:
        <input type="text" value={nodeVersion} onChange={e => setNodeVersion(e.target.value)} />
      </label>
      <br />
      <label>
        Branch to Trigger:
        <input type="text" value={branch} onChange={e => setBranch(e.target.value)} />
      </label>
      <br />
      <button onClick={generateYaml}>Generate YAML</button>
      <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 10 }}>
        {yaml}
      </pre>
    </div>
  );
}

export default CICDYamlGenerator;

