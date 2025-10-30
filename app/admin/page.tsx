'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { 
  Calculator, Users, TrendingUp, Activity, 
  DollarSign, Eye, MousePointerClick, Clock 
} from 'lucide-react';

// 中文管理后台
export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('获取统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* 标题 */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              管理仪表盘
            </h1>
            <p className="text-gray-600">
              LaserCalc Pro 数据统计与监控
            </p>
          </div>

          {/* 核心指标卡片 */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* 总计算次数 */}
            <div className="card">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">总计</span>
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900">
                {stats?.calculations?.total?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-600">计算次数</div>
              <div className="mt-3 text-xs text-green-600">
                今日: {stats?.calculations?.today || 0}
              </div>
            </div>

            {/* 订阅用户 */}
            <div className="card">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">总计</span>
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900">
                {stats?.subscribers?.total?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-600">订阅用户</div>
              <div className="mt-3 text-xs text-green-600">
                已确认: {stats?.subscribers?.confirmed || 0}
              </div>
            </div>

            {/* 本周活跃 */}
            <div className="card">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">本周</span>
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900">
                {stats?.calculations?.this_week?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-600">周活跃计算</div>
              <div className="mt-3 text-xs text-blue-600">
                本月: {stats?.calculations?.this_month || 0}
              </div>
            </div>

            {/* 系统状态 */}
            <div className="card">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                  运行中
                </span>
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900">
                99.9%
              </div>
              <div className="text-sm text-gray-600">系统可用率</div>
              <div className="mt-3 text-xs text-gray-500">
                最近30天
              </div>
            </div>
          </div>

          {/* 热门计算器排行 */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                热门计算器
              </h2>
              <div className="space-y-4">
                {stats?.popular_tools?.map((tool: any, index: number) => (
                  <div key={tool.tool} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatToolName(tool.tool)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {tool.count} 次使用
                        </div>
                      </div>
                    </div>
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-primary-600"
                        style={{
                          width: `${(tool.count / (stats?.calculations?.total || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500">暂无数据</p>
                )}
              </div>
            </div>

            {/* 关键指标趋势 */}
            <div className="card">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                关键指标
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">日均计算次数</span>
                    <span className="text-lg font-bold text-gray-900">
                      {Math.round((stats?.calculations?.this_month || 0) / 30)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-blue-600" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">订阅转化率</span>
                    <span className="text-lg font-bold text-gray-900">
                      {stats?.subscribers?.total && stats?.calculations?.total
                        ? ((stats.subscribers.total / stats.calculations.total) * 100).toFixed(1)
                        : '0.0'}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-green-600" style={{ width: '45%' }} />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">邮箱确认率</span>
                    <span className="text-lg font-bold text-gray-900">
                      {stats?.subscribers?.total && stats?.subscribers?.confirmed
                        ? ((stats.subscribers.confirmed / stats.subscribers.total) * 100).toFixed(1)
                        : '0.0'}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full bg-purple-600" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="card">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              快速操作
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <button className="rounded-lg border border-gray-300 p-4 text-left transition-colors hover:bg-gray-50">
                <Eye className="mb-2 h-6 w-6 text-primary-600" />
                <div className="font-semibold text-gray-900">查看分析报告</div>
                <div className="text-sm text-gray-600">Google Analytics 数据</div>
              </button>

              <button className="rounded-lg border border-gray-300 p-4 text-left transition-colors hover:bg-gray-50">
                <DollarSign className="mb-2 h-6 w-6 text-green-600" />
                <div className="font-semibold text-gray-900">AdSense收益</div>
                <div className="text-sm text-gray-600">广告收入统计</div>
              </button>

              <button className="rounded-lg border border-gray-300 p-4 text-left transition-colors hover:bg-gray-50">
                <MousePointerClick className="mb-2 h-6 w-6 text-blue-600" />
                <div className="font-semibold text-gray-900">Search Console</div>
                <div className="text-sm text-gray-600">搜索表现数据</div>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function formatToolName(tool: string): string {
  const names: Record<string, string> = {
    'laser-cutting': '激光切割计算器',
    'cnc-machining': 'CNC加工计算器',
    'roi': 'ROI投资回报计算器',
    'energy': '能源成本计算器',
    'material-utilization': '材料利用率计算器',
  };
  return names[tool] || tool;
}

