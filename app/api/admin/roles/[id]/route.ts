import { NextRequest, NextResponse } from 'next/server';
import { getRoleById, updateRole, deleteRole } from '@/lib/db/roles';

export const runtime = 'edge';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const role = await getRoleById(Number(params.id));
    if (!role) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ role });
  } catch (error) {
    console.error('Get role error:', error);
    return NextResponse.json({ error: 'Failed to get role' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const ok = await updateRole(Number(params.id), body);
    if (!ok) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    const role = await getRoleById(Number(params.id));
    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ok = await deleteRole(Number(params.id));
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete role error:', error);
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
}
