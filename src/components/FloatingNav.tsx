import Link from 'next/link';

interface FloatingNavProps {
  currentPage: 'home' | 'timeline';
}

export default function FloatingNav({ currentPage }: FloatingNavProps) {
  const isTimeline = currentPage === 'timeline';
  const href = isTimeline ? '/' : '/ons-verhaal';
  const text = isTimeline ? "Foto's" : 'Ons Verhaal';
  const icon = isTimeline ? '📸' : '💕';

  return (
    <div className="fixed top-4 right-4 z-50">
      <Link
        href={href}
        className="flex items-center gap-1.5 bg-[#841811]/10 backdrop-blur-sm text-[#841811] px-3 py-2 rounded-full shadow-md border border-[#841811]/20 hover:border-[#841811]/40 hover:bg-[#841811]/15 transition-all duration-200 hover:scale-105"
      >
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-medium whitespace-nowrap">{text}</span>
      </Link>
    </div>
  );
}
