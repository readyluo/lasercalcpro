import { NextResponse } from 'next/server';
import { publishDueArticles } from '@/lib/db/articles';
import { requireAuth } from '@/lib/auth/middleware';

export const runtime = 'edge';

async function handle() {
  try {
    const affected = await publishDueArticles();
    return NextResponse.json({ success: true, affected });
  } catch (error) {
    console.error('Publish due error:', error);
    return NextResponse.json({ error: 'Failed to publish due articles' }, { status: 500 });
  }
}

export const POST = requireAuth(handle);
