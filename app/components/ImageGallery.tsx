'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface GalleryImageProps {
  src: string;
  alt: string;
}

/** Data-carrier component — renders nothing, props are read by ImageGallery */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GalleryImage(_props: GalleryImageProps): null {
  return null;
}

interface Image {
  src: string;
  alt: string;
}

export default function ImageGallery({ children }: { children?: React.ReactNode }) {
  const images: Image[] = React.Children.toArray(children)
    .filter((child): child is React.ReactElement<GalleryImageProps> => React.isValidElement(child))
    .map((child) => ({
      src: (child.props as GalleryImageProps).src,
      alt: (child.props as GalleryImageProps).alt,
    }))
    .filter((img) => Boolean(img.src));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Open / close the native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  // Sync state when dialog is dismissed via Escape
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handler = () => setActiveIndex(null);
    dialog.addEventListener('close', handler);
    return () => dialog.removeEventListener('close', handler);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, prev, next]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  const current = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="mdx-screenshot-grid">
        {images.map((img, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="cursor-zoom-in"
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[9999] m-0 max-w-none max-h-none w-full h-full bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        aria-label="Image gallery"
      >
        {current && (
          <div className="flex items-center justify-center w-full h-full" onClick={close}>
            {/* prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="max-w-[82vw] max-h-[88vh] object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors"
              aria-label="Next image"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* close */}
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
              aria-label="Close gallery"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* counter */}
            {images.length > 1 && (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 rounded-full px-3 py-1">
                {(activeIndex ?? 0) + 1} / {images.length}
              </span>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
