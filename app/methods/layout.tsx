import type { ReactNode } from 'react';
import MethodsLayoutShell from '@/app/components/MethodsLayoutShell';

export default function MethodsLayout({ children }: { children: ReactNode }) {
  return <MethodsLayoutShell>{children}</MethodsLayoutShell>;
}
