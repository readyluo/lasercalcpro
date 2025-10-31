import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/db/audit-logs';

export const runtime = 'edge';

function toCSV(rows: any[]): string {
  if (rows.length === 0) return 'id,user_id,action,module,description,ip_address,created_at\n';
  const header = Object.keys(rows[0]).join(',');
  const lines = rows.map((r) => Object.values(r).map((v) => {
    const s = v === null || v === undefined ? '' : String(v);
    const needsQuote = /[",\n]/.test(s);
    const escaped = s.replace(/"/g, '""');
    return needsQuote ? `"${escaped}"` : escaped;
  }).join(','));
  return [header, ...lines].join('\n');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data = await getAuditLogs(
      {
        from: searchParams.get('from') || undefined,
        to: searchParams.get('to') || undefined,
        userId: searchParams.get('userId') ? Number(searchParams.get('userId')) : undefined,
        action: (searchParams.get('action') as any) || undefined,
        module: (searchParams.get('module') as any) || undefined,
        q: searchParams.get('q') || undefined,
      },
      { page: 1, limit: 5000 }
    );

    const csv = toCSV(data.items.map(({ id, user_id, action, module, description, ip_address, created_at }) => ({ id, user_id, action, module, description, ip_address, created_at })));

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="audit-logs.csv"`,
      },
    });
  } catch (error) {
    console.error('Export audit logs error:', error);
    return NextResponse.json({ error: 'Failed to export audit logs' }, { status: 500 });
  }
}
