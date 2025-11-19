import Link from 'next/link';

export const dynamic = 'force-dynamic';

type RoleRecord = {
  id: number;
  name: string;
  slug: string;
  permissions: string;
  created_at: string;
};

async function fetchRoles(): Promise<RoleRecord[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${base}/api/admin/roles`, { cache: 'no-store' });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return data.roles as RoleRecord[];
}

export default async function AdminRolesPage() {
  const roles = await fetchRoles();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-sm text-gray-600">Grant access to admin tools by assigning permissions.</p>
        </div>
        <Link
          href="/admin/roles/new"
          className="rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700"
        >
          New role
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {roles.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No roles found.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-gray-600">Name</th>
                <th className="px-4 py-3 text-gray-600">Slug</th>
                <th className="px-4 py-3 text-gray-600">Permissions</th>
                <th className="px-4 py-3 text-gray-600">Created</th>
                <th className="px-4 py-3 text-right text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roles.map((role) => {
                let permissions: Record<string, string[]> | null = null;
                try {
                  permissions = role.permissions ? JSON.parse(role.permissions) : null;
                } catch {
                  permissions = null;
                }
                return (
                  <tr key={role.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{role.name}</td>
                    <td className="px-4 py-3 text-gray-600">{role.slug}</td>
                    <td className="px-4 py-3">
                      {permissions ? (
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(permissions).map(([moduleName, actions]) => (
                            <span key={moduleName} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                              {moduleName}: {actions.join('/')}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No permissions</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(role.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/roles/${role.id}`} className="text-primary-600 hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
