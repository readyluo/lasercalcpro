'use client';

import { usePathname } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Login page should NOT use AdminLayout - it has its own full-page layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // All other admin pages use AdminLayout with auth check and sidebar
  return <AdminLayout>{children}</AdminLayout>;
}

