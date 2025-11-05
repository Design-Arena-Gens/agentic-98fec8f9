import { describe, it, expect } from 'vitest';
import { runAgents } from '@/lib/graph';

describe('Legal AI Agent System', () => {
  it('routes to legal research by default', async () => {
    const res = await runAgents('Find precedents on breach of contract');
    expect(res.output).toMatch(/Research summary/);
    expect(res.trace.some(t => t.node === 'LegalResearcher')).toBe(true);
  });

  it('routes to contract analysis for contract tasks', async () => {
    const res = await runAgents('Analyze this contract for indemnification clauses', [{ id: 'c1', text: 'This Agreement includes limitation of liability and indemnification.' }]);
    expect(res.output).toMatch(/Contract analysis/);
    expect(res.trace.some(t => t.node === 'ContractAnalyzer')).toBe(true);
  });

  it('includes safety disclaimer', async () => {
    const res = await runAgents('Provide a summary of GDPR compliance considerations');
    expect(res.trace[0].summary).toMatch(/Disclaimer/);
  });
});
