'use client';

import { useEffect, useState } from 'react';

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

  const fetchData = async (p = 1) => {
    setLoading(true);
    const sp = new URLSearchParams({ page: String(p), limit: '50' });
    if (q) sp.set('q', q);
    if (action) sp.set('action', action);
    if (module) sp.set('module', module);
    if (from) sp.set('from', from);
    if (to) sp.set('to', to);
    const res = await fetch(`/api/admin/audit-logs?${sp.toString()}`, { cache: 'no-store' });
    const data: ApiResponse = await res.json();
    setLogs(data.items);
    setPage(data.page);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportCSV = () => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (action) sp.set('action', action);
    if (module) sp.set('module', module);
    if (from) sp.set('from', from);
    if (to) sp.set('to', to);
    window.location.href = `/api/admin/audit-logs/export?${sp.toString()}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">审计日志</h1>
        <button onClick={exportCSV} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">导出 CSV</button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-6">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm">关键字</label>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="描述搜索" />
        </div>
        <div>
          <label className="mb-1 block text-sm">动作</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="">全部</option>
            {['create','edit','delete','login','logout','export','publish','approve','settings_update'].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">模块</label>
          <select value={module} onChange={(e) => setModule(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2">
            <option value="">全部</option>
            {['articles','users','settings','subscribers','calculations','analytics','roles','case_studies'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">起始日期</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm">结束日期</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
        </div>
        <div className="md:col-span-6 flex gap-2">
          <button onClick={() => fetchData(1)} className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black">筛选</button>
          <button onClick={() => { setQ(''); setAction(''); setModule(''); setFrom(''); setTo(''); fetchData(1); }} className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">重置</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">时间</th>
              <th className="px-4 py-3">用户</th>
              <th className="px-4 py-3">动作</th>
              <th className="px-4 py-3">模块</th>
              <th className="px-4 py-3">描述</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3 text-right">详情</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={7}>加载中...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={7}>暂无数据</td></tr>
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
                    <button onClick={() => setSelected(l)} className="text-blue-600 hover:underline">查看</button>
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
              <h3 className="text-lg font-bold">详情</h3>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-gray-200 px-3 py-1 hover:bg-gray-50">关闭</button>
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
