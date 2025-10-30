'use client';

import { useState, useEffect } from 'react';
import {
  Filter, Download, Trash2, Check, X, Mail,
  ChevronLeft, ChevronRight
} from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  source_tool: string;
  is_confirmed: boolean;
  subscribed_at: string;
  confirmed_at: string;
}

export default function SubscribersManagementPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    is_confirmed: '',
    search: '',
  });

  useEffect(() => {
    fetchSubscribers();
  }, [page, filters]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await fetch(`/api/admin/subscribers?${params}`);
      const data = await response.json();

      if (data.success) {
        setSubscribers(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个订阅用户吗？')) return;

    try {
      const response = await fetch(`/api/admin/subscribers?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
    }
  };

  const handleToggleConfirm = async (subscriber: Subscriber) => {
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: subscriber.id,
          is_confirmed: !subscriber.is_confirmed,
        }),
      });

      if (response.ok) {
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Failed to update subscriber:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', '邮箱', '来源', '状态', '订阅时间', '确认时间'];
    const rows = subscribers.map(sub => [
      sub.id,
      sub.email,
      sub.source_tool || '-',
      sub.is_confirmed ? '已确认' : '未确认',
      new Date(sub.subscribed_at).toLocaleString('zh-CN'),
      sub.confirmed_at ? new Date(sub.confirmed_at).toLocaleString('zh-CN') : '-',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          订阅用户管理
        </h1>
        <p className="text-gray-600">
          管理和分析订阅用户数据
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              确认状态
            </label>
            <select
              value={filters.is_confirmed}
              onChange={(e) => setFilters({ ...filters, is_confirmed: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">全部</option>
              <option value="true">已确认</option>
              <option value="false">未确认</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              搜索邮箱
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="输入邮箱地址"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={fetchSubscribers}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Filter className="h-4 w-4 inline mr-2" />
              应用筛选
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 inline mr-2" />
              导出 CSV
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      邮箱
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      来源
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      订阅时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sub.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {sub.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {sub.source_tool || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sub.is_confirmed ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            已确认
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <X className="h-3 w-3 mr-1" />
                            未确认
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(sub.subscribed_at).toLocaleString('zh-CN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleToggleConfirm(sub)}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                          title={sub.is_confirmed ? '取消确认' : '设为已确认'}
                        >
                          {sub.is_confirmed ? '取消确认' : '确认'}
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                第 {page} 页，共 {totalPages} 页
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

