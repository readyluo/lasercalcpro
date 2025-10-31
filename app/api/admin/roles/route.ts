import { NextRequest, NextResponse } from 'next/server';
import { listRoles, createRole } from '@/lib/db/roles';

export const runtime = 'edge';

export async function GET() {
  try {
    const roles = await listRoles();
    return NextResponse.json({ roles });
  } catch (error) {
    console.error('List roles error:', error);
    return NextResponse.json({ error: 'Failed to list roles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, permissions } = body;
    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const ok = await createRole(name, slug, permissions || {});
    if (!ok) return NextResponse.json({ error: 'Create failed' }, { status: 500 });
    const roles = await listRoles();
    return NextResponse.json({ success: true, roles });
  } catch (error) {
    console.error('Create role error:', error);
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
}
