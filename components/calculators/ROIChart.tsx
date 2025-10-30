'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import type { ROIResult } from '@/lib/calculators/roi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ROIChartProps {
  result: ROIResult;
}

export function CumulativeCashFlowChart({ result }: ROIChartProps) {
  const data = {
    labels: result.monthlyProjections.map(p => `M${p.month}`),
    datasets: [
      {
        label: 'Cumulative Cash Flow',
        data: result.monthlyProjections.map(p => p.cumulativeCashFlow),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Break Even',
        data: result.monthlyProjections.map(() => 0),
        borderColor: 'rgb(239, 68, 68)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cumulative Cash Flow Over Time',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return '$' + (value / 1000).toFixed(0) + 'K';
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 12,
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}

export function YearlyROIChart({ result }: ROIChartProps) {
  const data = {
    labels: result.yearlyProjections.map(p => `Year ${p.year}`),
    datasets: [
      {
        label: 'Revenue',
        data: result.yearlyProjections.map(p => p.revenue),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Costs',
        data: result.yearlyProjections.map(p => p.costs),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
      {
        label: 'Profit',
        data: result.yearlyProjections.map(p => p.profit),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yearly Financial Overview',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return '$' + (value / 1000).toFixed(0) + 'K';
          },
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export function ROIGrowthChart({ result }: ROIChartProps) {
  const data = {
    labels: result.yearlyProjections.map(p => `Year ${p.year}`),
    datasets: [
      {
        label: 'ROI %',
        data: result.yearlyProjections.map(p => p.roi),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'ROI Growth Over Time',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2) + '%';
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div className="h-[350px]">
      <Line data={data} options={options} />
    </div>
  );
}









