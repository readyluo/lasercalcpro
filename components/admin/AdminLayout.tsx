'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calculator,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Shield,
  BarChart3,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

interface Admin {
  id: number;
  username: string;
  email: string;
  display_name: string | null;
  role: string;
}

const navigationItems = [
  {
    name: '仪表盘',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: '计算历史',
    href: '/admin/calculations',
    icon: Calculator,
  },
  {
    name: '订阅用户',
    href: '/admin/subscribers',
    icon: Users,
  },
  {
    name: '文章管理',
    href: '/admin/articles',
    icon: FileText,
  },
  {
    name: '数据分析',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: '管理员',
    href: '/admin/users',
    icon: Shield,
  },
  {
    name: '系统设置',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me');
      
      if (!response.ok) {
        // Not authenticated, redirect to login
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      setAdmin(data.admin);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="border-t border-gray-200 p-4">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900">
                  {admin?.display_name || admin?.username}
                </div>
                <div className="text-xs text-gray-500">{admin?.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* User menu dropdown */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 lg:flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              LaserCalc Pro 管理后台
            </h1>
            
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-sm text-gray-600">
                欢迎回来, {admin?.display_name || admin?.username}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

