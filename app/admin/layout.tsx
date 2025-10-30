import { Metadata } from 'next';
import { AdminLayoutWrapper } from './admin-layout-wrapper';

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
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}

