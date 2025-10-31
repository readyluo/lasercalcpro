'use client';

import { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

interface Metrics {
  total: number;
  newThisMonth: number;
  unsubscribesThisMonth: number;
  netGrowthRate: number;
  avgRetentionDays: number | null;
}

export default function SubscriptionsAnalyticsPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [sources, setSources] = useState<Array<{ source_tool: string | null; count: number }>>([]);
  const [trend, setTrend] = useState<Array<{ weekStart: string; total: number }>>([]);
  const [funnel, setFunnel] = useState<{ step1_pageViews: number; step2_formShown: number; step3_emailSubmitted: number; step4_confirmed: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch('/api/admin/analytics/subscriptions', { cache: 'no-store' });
      const data = await res.json();
      setMetrics(data.metrics);
      setSources(data.sources);
      setTrend(data.trend);
      setFunnel(data.funnel);
      setLoading(false);
    }
    load();
  }, []);

  const trendData = {
    labels: trend.map((t) => t.weekStart),
    datasets: [
      {
        label: '每周新增订阅',
        data: trend.map((t) => t.total),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const sourceData = {
    labels: sources.map((s) => s.source_tool || 'unknown'),
    datasets: [
      {
        label: '来源分布',
        data: sources.map((s) => s.count),
        backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">订阅统计与漏斗分析</h1>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">加载中...</div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-5">
            <MetricCard title="总订阅数" value={metrics?.total ?? 0} />
            <MetricCard title="本月新增" value={metrics?.newThisMonth ?? 0} />
            <MetricCard title="本月取消" value={metrics?.unsubscribesThisMonth ?? 0} />
            <MetricCard title="净增长率" value={`${(metrics?.netGrowthRate ?? 0).toFixed(1)}%`} />
            <MetricCard title="平均留存(天)" value={(metrics?.avgRetentionDays ?? 0).toFixed(0)} />
          </div>

          {/* Trend & Sources */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4 md:col-span-2">
              <div className="mb-3 font-semibold">每周新增订阅趋势</div>
              <Line data={trendData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-3 font-semibold">来源分布</div>
              <Doughnut data={sourceData} />
            </div>
          </div>

          {/* Funnel */}
          {funnel && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 font-semibold">转化漏斗</div>
              <div className="grid gap-4 md:grid-cols-4">
                <FunnelStep title="页面访问" value={funnel.step1_pageViews} />
                <FunnelStep title="表单展示" value={funnel.step2_formShown} />
                <FunnelStep title="提交邮箱" value={funnel.step3_emailSubmitted} />
                <FunnelStep title="确认订阅" value={funnel.step4_confirmed} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function FunnelStep({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-2 text-xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
