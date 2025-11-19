'use client';

import { useCallback, useEffect, useState } from 'react';
import { buildAuditLogQuery } from '@/lib/admin/query';

interface AuditLog {
  id: number;
  user_id: number | null;
  action: string;
  module: string;
  description: string;
  ip_address?: string | null;
  payload?: string | null;
  created_at: string;
}

interface ApiResponse {
  items: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState('');
  const [action, setAction] = useState('');
  const [module, setModule] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AuditLog | null>(null);

  const fetchData = useCallback(async (p = 1) => {
    setLoading(true);
    const query = buildAuditLogQuery({
      page: p,
      limit: 50,
      keyword: q || undefined,
      action: action || undefined,
      module: module || undefined,
      from: from || undefined,
      to: to || undefined,
    });
    const res = await fetch(`/api/admin/audit-logs?${query}`, { cache: 'no-store' });
    const data: ApiResponse = await res.json();
    setLogs(data.items);
    setPage(data.page);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, [action, from, module, q, to]);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const exportCSV = () => {
    const query = buildAuditLogQuery({
      keyword: q || undefined,
      action: action || undefined,
      module: module || undefined,
      from: from || undefined,
      to: to || undefined,
    });
    window.location.href = `/api/admin/audit-logs/export?${query}`;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <button onClick={exportCSV} className="rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-6">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-gray-700">Keyword</label>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Search description" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700">Action</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="">All</option>
            {['create','edit','delete','login','logout','export','publish','approve','settings_update'].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700">Module</label>
          <select value={module} onChange={(e) => setModule(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="">All</option>
            {['articles','users','settings','subscribers','calculations','analytics','roles','case_studies'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700">Start date</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-700">End date</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div className="md:col-span-6 flex gap-2">
          <button onClick={() => fetchData(1)} className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black">Apply filters</button>
          <button onClick={() => { setQ(''); setAction(''); setModule(''); setFrom(''); setTo(''); fetchData(1); }} className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">Reset</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={7}>Loading…</td></tr>
            ) : logs.length === 0 ? (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={7}>No results</td></tr>
            ) : (
              logs.map((l) => (
                <tr key={l.id}>
                  <td className="px-4 py-3">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">{l.user_id ?? '-'}</td>
                  <td className="px-4 py-3">{l.action}</td>
                  <td className="px-4 py-3">{l.module}</td>
                  <td className="px-4 py-3">{l.description}</td>
                  <td className="px-4 py-3">{l.ip_address || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelected(l)} className="text-primary-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => fetchData(i + 1)} className={`rounded-lg px-3 py-1 text-sm ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}>{i + 1}</button>
          ))}
        </div>
      )}

      {/* JSON Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-2xl rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Log payload</h3>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-gray-200 px-3 py-1 hover:bg-gray-50">
                Close
              </button>
            </div>
            <pre className="max-h-[60vh] overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-green-200">
{JSON.stringify({ id: selected.id, user_id: selected.user_id, action: selected.action, module: selected.module, description: selected.description, ip_address: selected.ip_address, payload: selected.payload ? JSON.parse(selected.payload) : null, created_at: selected.created_at }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
