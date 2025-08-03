import React, { useState } from "react";

function IACGenerator() {
  const [resource, setResource] = useState("aws_s3_bucket");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const generate = () => {
    if (!resource || !name) {
      setCode("# Please enter resource type and name.");
      return;
    }
    const template = 
`resource "${resource}" "${name}" {
  bucket = "${name}-bucket"
  acl    = "private"
}`;
    setCode(template);
  };

  return (
    <div style={{ padding: 10 }}>
      <h2>Infrastructure as Code (Terraform) Generator</h2>
      <label>
        Resource Type:
        <input type="text" value={resource} onChange={e => setResource(e.target.value)} />
      </label>
      <br />
      <label>
        Resource Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <button onClick={generate}>Generate Terraform</button>
      <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 10 }}>
        {code}
      </pre>
    </div>
  );
}

export default IACGenerator;

