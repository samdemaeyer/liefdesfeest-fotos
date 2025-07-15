'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: PhotoLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const currentPhoto = photos[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (currentIndex < photos.length - 1) {
            onNext();
          }
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onPrevious();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onNext, onPrevious]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Reset loading state when photo changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  // Touch gesture handling for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      touchStartX = touchEvent.touches[0].clientX;
      touchStartY = touchEvent.touches[0].clientY;
    };

    const handleTouchEnd = (e: Event) => {
      const touchEvent = e as TouchEvent;
      const touchEndX = touchEvent.changedTouches[0].clientX;
      const touchEndY = touchEvent.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Only handle horizontal swipes (ignore vertical swipes)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentIndex > 0) {
          onPrevious();
        } else if (deltaX < 0 && currentIndex < photos.length - 1) {
          onNext();
        }
      }
    };

    const lightboxElement = document.querySelector('.lightbox-container');
    if (lightboxElement) {
      lightboxElement.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      lightboxElement.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });
    }

    return () => {
      if (lightboxElement) {
        lightboxElement.removeEventListener('touchstart', handleTouchStart);
        lightboxElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex, photos.length, onNext, onPrevious]);

  if (!currentPhoto) {
    return null;
  }

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < photos.length - 1;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 lightbox-container'>
      {/* Backdrop - Click to close */}
      <div
        className='absolute inset-0 cursor-pointer'
        onClick={onClose}
        aria-label='Close lightbox'
      />

      {/* Content */}
      <div className='relative max-w-full max-h-full p-4'>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 z-10 p-2 text-white hover:text-gray-300 transition-colors'
          aria-label='Close'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Photo counter */}
        <div className='absolute top-2 left-2 z-10 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded'>
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Previous button */}
        {canGoPrevious && (
          <button
            onClick={onPrevious}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors'
            aria-label='Previous photo'
          >
            <svg
              className='w-8 h-8'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        )}

        {/* Next button */}
        {canGoNext && (
          <button
            onClick={onNext}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors'
            aria-label='Next photo'
          >
            <svg
              className='w-8 h-8'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        )}

        {/* Photo */}
        <div className='relative max-w-screen-lg max-h-screen'>
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin' />
            </div>
          )}

          <Image
            src={currentPhoto.url}
            alt={currentPhoto.filename}
            width={1200}
            height={800}
            className='max-w-full max-h-[90vh] object-contain'
            onLoad={() => setIsLoading(false)}
            priority
          />
        </div>

        {/* Photo info */}
        <div className='absolute bottom-2 left-2 right-2 text-center'>
          <div className='inline-block px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded'>
            {currentPhoto.filename}
          </div>
        </div>
      </div>

      {/* Mobile touch gestures hint */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-60 md:hidden'>
        Swipe left/right to navigate
      </div>
    </div>
  );
}
