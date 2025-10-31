import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '管理员登录 - LaserCalc Pro',
  description: 'LaserCalc Pro 管理后台登录',
  robots: 'noindex, nofollow',
};

// Login page uses its own full-page layout without the admin sidebar
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
















