import Image from 'next/image';
import { useEffect } from 'react';
import type { TimelineEvent } from '@/data/timeline';

interface TimelineLightboxProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TimelineLightbox({
  event,
  isOpen,
  onClose,
}: TimelineLightboxProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close lightbox"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4 h-[90vh] bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#841811]/90 hover:bg-[#841811] text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Close lightbox"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Close</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Section - Full image display */}
        {event.image && (
          <div className="relative flex-1 bg-[#841811]/5 flex items-center justify-center p-4 min-h-0">
            <div className="relative w-full h-full min-h-[300px]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        )}

        {/* Content Section - Bottom positioned */}
        <div className="flex-shrink-0 p-6 lg:p-8 text-center bg-white/90 backdrop-blur-sm">
          {/* Date */}
          {event.date && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#841811]/10 text-[#841811] rounded-full text-sm font-medium">
                {event.date}
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className="wedding-title text-2xl lg:text-3xl font-bold text-[#841811] mb-4">
            {event.title}
          </h2>

          {/* Description */}
          <p className="wedding-text text-lg leading-relaxed max-w-2xl mx-auto">
            {event.description}
          </p>

          {/* Wedding decoration */}
          <div className="mt-6 flex items-center justify-center">
            <div className="w-16 h-0.5 bg-[#841811]/20"></div>
            <div className="mx-3 text-[#841811] text-xl">♥</div>
            <div className="w-16 h-0.5 bg-[#841811]/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
