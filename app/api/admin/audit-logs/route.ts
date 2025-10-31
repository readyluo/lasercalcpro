import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/db/audit-logs';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '50', 10) || 50;

    const data = await getAuditLogs(
      {
        from: searchParams.get('from') || undefined,
        to: searchParams.get('to') || undefined,
        userId: searchParams.get('userId') ? Number(searchParams.get('userId')) : undefined,
        action: (searchParams.get('action') as any) || undefined,
        module: (searchParams.get('module') as any) || undefined,
        q: searchParams.get('q') || undefined,
      },
      { page, limit }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('List audit logs error:', error);
    return NextResponse.json({ error: 'Failed to list audit logs' }, { status: 500 });
  }
}
