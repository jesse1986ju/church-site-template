// POST /api/revalidate
// Called by the Engage My Church dashboard after a content update.
// Triggers Cloudflare Pages to rebuild via the deploy hook URL.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret      = req.headers.get('x-revalidate-secret');
  const deployHook  = process.env.CF_DEPLOY_HOOK_URL;
  const hookSecret  = process.env.REVALIDATE_SECRET;

  if (!hookSecret || secret !== hookSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!deployHook) {
    return NextResponse.json({ error: 'Deploy hook not configured' }, { status: 500 });
  }

  const res = await fetch(deployHook, { method: 'POST' });

  if (!res.ok) {
    return NextResponse.json({ error: 'Deploy hook failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
