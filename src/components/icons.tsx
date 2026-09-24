import {
  Baby,
  BookOpen,
  Car,
  Church,
  Clock,
  Coffee,
  Compass,
  Droplets,
  Flame,
  Gamepad2,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  House,
  Lightbulb,
  MapPin,
  MessageCircleHeart,
  Music,
  Shirt,
  ShieldCheck,
  Smile,
  Sparkles,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/data/types";

export const iconMap: Record<IconKey, LucideIcon> = {
  baby: Baby,
  coffee: Coffee,
  car: Car,
  users: Users,
  home: House,
  sparkles: Sparkles,
  music: Music,
  clock: Clock,
  shirt: Shirt,
  heart: Heart,
  shield: ShieldCheck,
  smile: Smile,
  book: BookOpen,
  compass: Compass,
  droplets: Droplets,
  "hand-heart": HeartHandshake,
  flame: Flame,
  sprout: Sprout,
  "map-pin": MapPin,
  gamepad: Gamepad2,
  graduation: GraduationCap,
  message: MessageCircleHeart,
  handshake: Handshake,
  lightbulb: Lightbulb,
  church: Church,
};

export function Icon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Cmp = iconMap[name];
  return <Cmp className={className} aria-hidden="true" />;
}

/** lucide-react v1 ya no incluye iconos de marca; SVG propio. */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
