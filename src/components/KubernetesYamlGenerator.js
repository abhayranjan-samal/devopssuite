import React, { useState } from "react";

function KubernetesYamlGenerator() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [replicas, setReplicas] = useState(1);
  const [yaml, setYaml] = useState("");

  const generateYaml = () => {
    if (!name || !image || replicas < 1) {
      setYaml("# Please fill all fields correctly.");
      return;
    }
    const yamlString = 
`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
spec:
  replicas: ${replicas}
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
        image: ${image}
        ports:
        - containerPort: 80
`;
    setYaml(yamlString);
  };

  return (
    <div style={{ padding: 10 }}>
      <h2>Kubernetes YAML Generator</h2>
      <label>
        Deployment Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Container Image:
        <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      </label>
      <br />
      <label>
        Replicas:
        <input
          type="number"
          min="1"
          value={replicas}
          onChange={e => setReplicas(parseInt(e.target.value) || 1)}
        />
      </label>
      <br />
      <button onClick={generateYaml}>Generate YAML</button>
      <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 10 }}>
        {yaml}
      </pre>
    </div>
  );
}

export default KubernetesYamlGenerator;

