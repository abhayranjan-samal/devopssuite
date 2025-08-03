import React, { useState } from 'react';
import {
  KubernetesYamlGenerator,
  CICDYamlGenerator,
  IACGenerator,
  ShellScriptGenerator,
  TemplatesTool,
  Documentation
} from './components';

function App() {
  const [activeTool, setActiveTool] = useState('kubernetes');

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: 20 }}>
        {['kubernetes', 'cicd', 'iac', 'shell', 'templates', 'docs'].map(toolKey => (
          <button
            key={toolKey}
            onClick={() => setActiveTool(toolKey)}
            style={{
              fontWeight: activeTool === toolKey ? 'bold' : 'normal',
              marginRight: 10,
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              backgroundColor: activeTool === toolKey ? '#eef' : '#fff'
            }}
            aria-pressed={activeTool === toolKey}
          >
            {toolKey === 'cicd' ? 'CI/CD' : toolKey.charAt(0).toUpperCase() + toolKey.slice(1)}
          </button>
        ))}
      </nav>
      <main>
        {activeTool === 'kubernetes' && <KubernetesYamlGenerator />}
        {activeTool === 'cicd' && <CICDYamlGenerator />}
        {activeTool === 'iac' && <IACGenerator />}
        {activeTool === 'shell' && <ShellScriptGenerator />}
        {activeTool === 'templates' && <TemplatesTool />}
        {activeTool === 'docs' && <Documentation />}
      </main>
    </div>
  );
}

export default App;
