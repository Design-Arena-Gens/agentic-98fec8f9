import { NextRequest, NextResponse } from 'next/server';
import { runAgents } from '@/lib/graph';
import { SafetyInputSchema } from '@/lib/safety';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SafetyInputSchema.parse({ task: body.task, userId: 'anon' });
    const docs = Array.isArray(body.documents) ? body.documents : undefined;
    const result = await runAgents(parsed.task, docs);
    return NextResponse.json({ output: result.output, trace: result.trace });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 400 });
  }
}
