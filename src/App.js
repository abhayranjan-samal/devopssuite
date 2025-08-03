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
    <div>
      <nav>
        <button onClick={() => setActiveTool('kubernetes')}>Kubernetes</button>
        <button onClick={() => setActiveTool('cicd')}>CI/CD</button>
        <button onClick={() => setActiveTool('iac')}>Infrastructure</button>
        <button onClick={() => setActiveTool('shell')}>Shell Tools</button>
        <button onClick={() => setActiveTool('templates')}>Templates</button>
        <button onClick={() => setActiveTool('docs')}>Documentation</button>
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

