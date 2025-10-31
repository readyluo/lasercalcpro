import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function fetchRoles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/admin/roles`, { cache: 'no-store' });
  const data = await res.json();
  return data.roles as Array<{ id: number; name: string; slug: string; permissions: string; created_at: string }>;
}

export default async function AdminRolesPage() {
  const roles = await fetchRoles();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">角色管理</h1>
        <Link href="/admin/roles/new" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">新建角色</Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">名称</th>
              <th className="px-4 py-3">标识</th>
              <th className="px-4 py-3">权限范围</th>
              <th className="px-4 py-3">创建时间</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles?.map((r) => {
              let perm: Record<string, string[]> | null = null;
              try { perm = r.permissions ? JSON.parse(r.permissions) : null; } catch {}
              return (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">{r.slug}</td>
                  <td className="px-4 py-3">
                    {perm ? (
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(perm).map((m) => (
                          <span key={m} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">{m}:{perm![m].join('/')}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/roles/${r.id}`} className="text-blue-600 hover:underline">编辑</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
