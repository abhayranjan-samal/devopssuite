import React, { useState } from "react";

function ShellScriptGenerator() {
  const [desc, setDesc] = useState("");
  const [script, setScript] = useState("");

  const generate = () => {
    const input = desc.toLowerCase();
    let result = "# Unable to generate script for the input. Please provide more details.";
    if (input.includes("list files")) {
      result = "ls -alh\n";
    } else if (input.includes("check disk")) {
      result = "df -h\n";
    } else if (input.includes("create directory")) {
      result = "mkdir new_directory\n";
    }
    setScript(result);
  };

  return (
    <div style={{ padding: 10 }}>
      <h2>Shell Script Generator</h2>
      <label>
        Describe Your Task:
        <input type="text" value={desc} onChange={e => setDesc(e.target.value)} style={{width:"60%"}} />
      </label>
      <br />
      <button onClick={generate}>Generate Script</button>
      <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f4f4f4", padding: 10 }}>
        {script}
      </pre>
    </div>
  );
}

export default ShellScriptGenerator;

