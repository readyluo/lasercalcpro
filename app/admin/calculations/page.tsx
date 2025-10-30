'use client';

import { useState, useEffect } from 'react';
import { 
  Filter, Download, Trash2, Eye,
  ChevronLeft, ChevronRight
} from 'lucide-react';

interface Calculation {
  id: number;
  tool_type: string;
  input_params: string;
  result: string;
  user_ip: string;
  user_country: string;
  created_at: string;
}

export default function CalculationsManagementPage() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    tool_type: '',
    start_date: '',
    end_date: '',
    country: '',
  });
  const [selectedCalc, setSelectedCalc] = useState<Calculation | null>(null);

  useEffect(() => {
    fetchCalculations();
  }, [page, filters]);

  const fetchCalculations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      });

      const response = await fetch(`/api/admin/calculations?${params}`);
      const data = await response.json();

      if (data.success) {
        setCalculations(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch calculations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条计算记录吗？')) return;

    try {
      const response = await fetch(`/api/admin/calculations?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCalculations();
      }
    } catch (error) {
      console.error('Failed to delete calculation:', error);
    }
  };

  const formatToolName = (tool: string): string => {
    const names: Record<string, string> = {
      'laser-cutting': '激光切割',
      'cnc-machining': 'CNC加工',
      'roi': 'ROI投资回报',
      'energy': '能源成本',
      'material-utilization': '材料利用率',
    };
    return names[tool] || tool;
  };

  const exportToCSV = () => {
    const headers = ['ID', '计算器类型', 'IP地址', '国家', '创建时间'];
    const rows = calculations.map(calc => [
      calc.id,
      formatToolName(calc.tool_type),
      calc.user_ip || '',
      calc.user_country || '',
      new Date(calc.created_at).toLocaleString('zh-CN'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `calculations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          计算历史管理
        </h1>
        <p className="text-gray-600">
          查看和管理所有计算记录
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              计算器类型
            </label>
            <select
              value={filters.tool_type}
              onChange={(e) => setFilters({ ...filters, tool_type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">全部</option>
              <option value="laser-cutting">激光切割</option>
              <option value="cnc-machining">CNC加工</option>
              <option value="roi">ROI投资回报</option>
              <option value="energy">能源成本</option>
              <option value="material-utilization">材料利用率</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              开始日期
            </label>
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              结束日期
            </label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              国家
            </label>
            <input
              type="text"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              placeholder="输入国家代码"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={fetchCalculations}
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
                      计算器类型
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP地址
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      国家
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创建时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {calculations.map((calc) => (
                    <tr key={calc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {calc.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {formatToolName(calc.tool_type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {calc.user_ip || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {calc.user_country || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(calc.created_at).toLocaleString('zh-CN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedCalc(calc)}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          <Eye className="h-4 w-4 inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(calc.id)}
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

      {/* Detail Modal */}
      {selectedCalc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">计算详情</h3>
              <button
                onClick={() => setSelectedCalc(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">输入参数</label>
                  <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedCalc.input_params), null, 2)}
                  </pre>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">计算结果</label>
                  <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedCalc.result), null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

