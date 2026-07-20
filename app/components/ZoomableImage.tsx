'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';

type Props = React.ComponentPropsWithoutRef<'img'> & { caption?: React.ReactNode };

export default function ZoomableImage({ src, alt, width, height, className, caption, ...rest }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = () => setOpen(true);
  const closeLightbox = useCallback(() => setOpen(false), []);

  // Open/close the <dialog> element
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  // Close on Escape key (native dialog handles this, but we sync state)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handler = () => setOpen(false);
    dialog.addEventListener('close', handler);
    return () => dialog.removeEventListener('close', handler);
  }, []);

  // Close when clicking the backdrop (outside the inner image)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeLightbox();
    }
  };

  if (!src) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ''} cursor-zoom-in`}
        onClick={openLightbox}
        {...rest}
      />

      {caption && <span className="mdx-image-caption">{caption}</span>}

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[9999] m-0 max-w-none max-h-none w-full h-full bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        aria-label={alt ?? 'Image lightbox'}
      >
        <div className="flex items-center justify-center w-full h-full" onClick={closeLightbox}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? ''}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
            aria-label="Close image"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
