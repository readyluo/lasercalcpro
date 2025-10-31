'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const MODULES = ['articles','users','subscribers','settings','calculations','analytics','case_studies'] as const;
const ACTIONS = ['view','create','edit','delete','publish','export','approve'] as const;

type Module = typeof MODULES[number];

type Role = {
  id: number;
  name: string;
  slug: string;
  permissions: string; // JSON
};

export default function RoleEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [matrix, setMatrix] = useState<Record<Module, string[]>>({} as any);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/admin/roles/${id}`, { cache: 'no-store' });
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      setRole(data.role);
      setName(data.role.name);
      setSlug(data.role.slug);
      try {
        const p = data.role.permissions ? JSON.parse(data.role.permissions) : {};
        setMatrix(p);
      } catch {
        setMatrix({} as any);
      }
      setLoading(false);
    }
    if (id) load();
  }, [id]);

  const toggle = (mod: Module, action: string) => {
    setMatrix((prev) => {
      const current = new Set(prev[mod] || []);
      if (current.has(action)) current.delete(action); else current.add(action);
      return { ...prev, [mod]: Array.from(current).sort() } as any;
    });
  };

  const save = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, permissions: matrix }),
    });
    setSaving(false);
    if (res.ok) router.push('/admin/roles');
  };

  if (loading) return <div className="p-6">加载中...</div>;
  if (!role) return <div className="p-6">未找到角色</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">编辑角色</h1>
      </div>

      {/* Basic */}
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">名称</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">标识</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
      </div>

      {/* Matrix */}
      <div className="overflow-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">模块 / 权限</th>
              {ACTIONS.map((a) => (
                <th key={a} className="px-3 py-3 text-center capitalize">{a}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {MODULES.map((m) => (
              <tr key={m}>
                <td className="px-4 py-3 font-medium">{m}</td>
                {ACTIONS.map((a) => {
                  const checked = (matrix[m] || []).includes(a);
                  return (
                    <td key={a} className="px-3 py-3 text-center">
                      <input type="checkbox" checked={checked} onChange={() => toggle(m, a)} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button onClick={save} disabled={saving} className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
          {saving ? '保存中...' : '保存更改'}
        </button>
        <button onClick={() => history.back()} className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-50">取消</button>
      </div>
    </div>
  );
}
