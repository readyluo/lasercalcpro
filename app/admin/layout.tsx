import { Metadata } from 'next';
import { AdminLayout } from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: '管理后台 - LaserCalc Pro',
  description: 'LaserCalc Pro 管理后台系统',
  robots: 'noindex, nofollow',
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: Login page should NOT use this layout (it has its own full page layout)
  // The AdminLayout component handles auth checks and redirects
  return <AdminLayout>{children}</AdminLayout>;
}

