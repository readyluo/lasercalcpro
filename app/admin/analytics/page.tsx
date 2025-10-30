'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, Calendar, Download,
  BarChart3, PieChart, LineChart as LineChartIcon
} from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const reportData = JSON.stringify(stats, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analytics_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            数据分析
          </h1>
          <p className="text-gray-600">
            深入了解网站运营数据和用户行为
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            导出报告
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-500">至</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                总计算次数
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.calculations?.total?.toLocaleString() || '0'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                本周: {stats?.calculations?.this_week || 0} | 今日: {stats?.calculations?.today || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <PieChart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                订阅用户
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.subscribers?.total?.toLocaleString() || '0'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                确认率: {stats?.subscribers?.total && stats?.subscribers?.confirmed
                  ? ((stats.subscribers.confirmed / stats.subscribers.total) * 100).toFixed(1)
                  : '0.0'}%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <LineChartIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                日均活跃
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round((stats?.calculations?.this_month || 0) / 30)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                本月: {stats?.calculations?.this_month || 0}
              </p>
            </div>
          </div>

          {/* Popular Tools */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              计算器使用排行
            </h2>
            <div className="space-y-4">
              {stats?.popular_tools?.map((tool: any, index: number) => {
                const percentage = ((tool.count / (stats?.calculations?.total || 1)) * 100).toFixed(1);
                return (
                  <div key={tool.tool} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {tool.tool}
                        </span>
                        <span className="text-sm text-gray-600">
                          {tool.count} 次 ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Growth Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              增长趋势
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                图表组件 (需要集成 Chart.js 或其他图表库)
              </p>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                地理分布
              </h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">地图组件</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                访问时段分布
              </h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">热力图组件</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

