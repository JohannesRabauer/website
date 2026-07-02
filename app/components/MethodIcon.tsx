import {
  FiAnchor,
  FiArchive,
  FiArrowUpRight,
  FiLayers,
  FiRefreshCw,
  FiSliders,
  FiUsers,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { MethodIconName } from '@/lib/methods';

const ICONS: Record<MethodIconName, IconType> = {
  layers: FiLayers,
  anchor: FiAnchor,
  users: FiUsers,
  'refresh-cw': FiRefreshCw,
  archive: FiArchive,
  sliders: FiSliders,
};

interface Props {
  name?: MethodIconName;
  className?: string;
}

export default function MethodIcon({ name, className = 'h-4 w-4' }: Props) {
  const Icon = name ? ICONS[name] : FiArrowUpRight;
  return <Icon className={className} aria-hidden="true" />;
}
