import Link from 'next/link';

interface FloatingNavProps {
  currentPage: 'home' | 'timeline';
}

export default function FloatingNav({ currentPage }: FloatingNavProps) {
  const isTimeline = currentPage === 'timeline';
  const href = isTimeline ? '/' : '/ons-verhaal';
  const text = isTimeline ? "Foto's" : 'Ons Verhaal';
  const icon = isTimeline ? '📸' : '💕';

  const linkClassName =
    'flex items-center gap-1.5 bg-[#841811]/10 backdrop-blur-sm text-[#841811] px-3 py-2 rounded-full shadow-md border border-[#841811]/20 hover:border-[#841811]/40 hover:bg-[#841811]/15 transition-all duration-200 hover:scale-105';

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {/* Existing navigation toggle */}
      <Link href={href} className={linkClassName}>
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-medium whitespace-nowrap">{text}</span>
      </Link>

      {/* Photobooth link */}
      <a
        href="https://lightroom.adobe.com/shares/c96ac8a3186b40c7b97500c09d9a7f87"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <span className="text-sm">📷</span>
        <span className="text-xs font-medium whitespace-nowrap">
          Photobooth
        </span>
      </a>

      {/* Poll link */}
      <a
        href="https://strawpoll.com/NMnQNvAOAg6"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <span className="text-sm">📊</span>
        <span className="text-xs font-medium whitespace-nowrap">Poll</span>
      </a>
    </div>
  );
}
