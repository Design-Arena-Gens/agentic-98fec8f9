"use client";

import { useState } from 'react';

type AgentLog = {
  step: string;
  node: string;
  summary: string;
};

export default function AgentUI() {
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLogs([]);
    setResult("");

    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: query })
    });

    const data = await res.json();
    setLogs(data.trace || []);
    setResult(data.output || "");
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>Legal AI Agent System</h1>
        <span className="badge">Demo - Not Legal Advice</span>
        <p style={{ opacity: 0.8 }}>This interface orchestrates multiple specialized agents to assist with legal research, contract analysis, compliance, and more. All outputs include safety checks.</p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Describe your legal task (e.g., summarize a case, analyze a clause)" rows={5} />
          <button className="button" disabled={loading || !query.trim()}>{loading ? 'Running...' : 'Run Agents'}</button>
        </form>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Agent Trace</h3>
        <div className="log">
          {logs.length === 0 ? (
            <div>Awaiting run...</div>
          ) : (
            logs.map((l, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div><strong>Step {i + 1}</strong> ? <span className="badge">{l.node}</span></div>
                <div>{l.summary}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Result</h3>
        <div className="log">{result || '?'}</div>
      </div>
    </div>
  );
}
