'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, permissions: {} }),
    });
    setSaving(false);
    if (res.ok) router.push('/admin/roles');
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">新建角色</h1>
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">名称</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">标识</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" required />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
            {saving ? '创建中...' : '创建'}
          </button>
          <button type="button" onClick={() => history.back()} className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-50">取消</button>
        </div>
      </form>
    </div>
  );
}
