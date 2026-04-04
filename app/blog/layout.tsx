import type { ReactNode } from 'react';
import BlogLayoutShell from '@/app/components/BlogLayoutShell';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <BlogLayoutShell locale="en">{children}</BlogLayoutShell>;
}
