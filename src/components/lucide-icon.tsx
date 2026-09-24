import {
  Baby,
  ClipboardList,
  Flower2,
  HeartPulse,
  Leaf,
  Package,
  Sparkles,
  Stethoscope,
  Sun,
  Truck,
  Waves,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  HeartPulse,
  ClipboardList,
  Sparkles,
  Leaf,
  Truck,
  Package,
  Baby,
  Waves,
  Sun,
  Flower2,
};

export function LucideIconByName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} />;
}
