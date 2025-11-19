'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  Activity,
  Calculator,
  DollarSign,
  Eye,
  MousePointerClick,
  RefreshCw,
  TrendingUp,
  Users,
} from 'lucide-react';

interface StatBucket {
  total?: number;
  today?: number;
  this_week?: number;
  this_month?: number;
  confirmed?: number;
}

interface PopularTool {
  tool: string;
  count: number;
}

interface DashboardStats {
  calculations?: StatBucket;
  subscribers?: StatBucket;
  articles?: StatBucket;
  popular_tools?: PopularTool[];
}

const QUICK_ACTIONS = [
  {
    title: 'View Analytics',
    subtitle: 'Open the GA4 performance dashboard',
    icon: Eye,
  },
  {
    title: 'Review Monetization',
    subtitle: 'Check Google AdSense revenue trends',
    icon: DollarSign,
  },
  {
    title: 'Search Console',
    subtitle: 'Inspect top queries and CTR',
    icon: MousePointerClick,
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    refreshStats();
  }, []);

  const refreshStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/stats');
      if (!response.ok) {
        throw new Error('Failed to load dashboard stats');
      }
      const data = (await response.json()) as DashboardStats;
      setStats(data);
    } catch (err) {
      console.error('Failed to load dashboard stats', err);
      setError('Unable to fetch the latest metrics. Please try again.');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        <p className="mt-4 text-gray-600">Loading dashboard metrics…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
      <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Operational Overview</h1>
          <p className="text-gray-600">Track calculator usage, subscriber growth, and publishing cadence.</p>
        </div>
        <button
          onClick={refreshStats}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {error}
        </div>
      )}

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Calculations"
          primary={formatNumber(stats?.calculations?.total)}
          secondary={`Today: ${formatNumber(stats?.calculations?.today, 0)}`}
          icon={<Calculator className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Subscribers"
          primary={formatNumber(stats?.subscribers?.total)}
          secondary={`Confirmed: ${formatNumber(stats?.subscribers?.confirmed, 0)}`}
          icon={<Users className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Weekly Activity"
          primary={formatNumber(stats?.calculations?.this_week)}
          secondary={`Month: ${formatNumber(stats?.calculations?.this_month, 0)}`}
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
        />
        <StatCard
          title="Published Articles"
          primary={formatNumber(stats?.articles?.total)}
          secondary={`Live: ${formatNumber(stats?.articles?.confirmed ?? stats?.articles?.total, 0)}`}
          icon={<Activity className="h-6 w-6 text-yellow-600" />}
        />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Popular Calculators</h2>
          <div className="space-y-4">
            {(stats?.popular_tools ?? []).length === 0 && (
              <p className="text-sm text-gray-500">No usage data yet.</p>
            )}
            {(stats?.popular_tools ?? []).map((tool, index) => (
              <div key={tool.tool} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">{formatToolName(tool.tool)}</span>
                    <span className="text-sm text-gray-600">
                      {tool.count.toLocaleString()} uses ({formatPercentage(tool.count, stats?.calculations?.total)})
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                      style={{ width: `${Math.min(100, (tool.count / (stats?.calculations?.total || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Key Indicators</h2>
          <div className="space-y-6">
            <MetricRow
              label="Average Daily Runs"
              value={formatNumber(Math.round((stats?.calculations?.this_month || 0) / 30) || 0, 0)}
            />
            <MetricRow
              label="Subscriber Conversion"
              value={`${formatPercentage(stats?.subscribers?.total, stats?.calculations?.total)}`}
            />
            <MetricRow
              label="Article Completion"
              value={`${formatPercentage(stats?.articles?.confirmed, stats?.articles?.total)}`}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.title}
              type="button"
              className="rounded-lg border border-gray-300 p-4 text-left transition-colors hover:bg-gray-50"
            >
              <action.icon className="mb-2 h-6 w-6 text-primary-600" />
              <div className="font-semibold text-gray-900">{action.title}</div>
              <div className="text-sm text-gray-600">{action.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  primary,
  secondary,
  icon,
}: {
  title: string;
  primary: string;
  secondary: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">{icon}</div>
        <span className="text-sm font-semibold text-gray-500">Live</span>
      </div>
      <div className="mb-1 text-3xl font-bold text-gray-900">{primary}</div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="mt-3 text-xs text-gray-500">{secondary}</div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
        <span>{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-primary-600" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

function formatNumber(value?: number, fallbackDecimals = 1): string {
  if (typeof value !== 'number') return '0';
  return value < 1000 ? value.toLocaleString() : `${(value / 1000).toFixed(fallbackDecimals)}K`;
}

function formatPercentage(part?: number, total?: number): string {
  if (!part || !total) return '0%';
  return `${((part / total) * 100).toFixed(1)}%`;
}

function formatToolName(tool: string): string {
  const names: Record<string, string> = {
    'laser-cutting': 'Laser Cutting Calculator',
    'cnc-machining': 'CNC Machining Estimator',
    roi: 'Equipment ROI Calculator',
    energy: 'Energy Cost Calculator',
    'material-utilization': 'Material Utilization Planner',
  };
  return names[tool] || tool;
}
