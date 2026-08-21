'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { FiMaximize2, FiX } from 'react-icons/fi';

const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 300;

interface Props {
  /** Full prose description of what the diagram shows, used as the accessible name. */
  ariaLabel: string;
  /** The <svg>...</svg> markup to render, both inline and in the lightbox. */
  children: ReactNode;
}

/**
 * Shared chrome for every hand-built SVG diagram on the blog: a clickable inline preview
 * that opens a fullscreen, zoomable lightbox. Wrap a diagram's <svg> in this instead of a
 * bare <figure role="img">, see app/components/EntireCheckpointDiagram.tsx for a diagram
 * that still needs migrating and app/components/LangGraph4jControlTowerDiagram.tsx for the
 * current usage pattern.
 */
export default function ZoomableDiagram({ ariaLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = () => {
    setZoom(100);
    setOpen(true);
  };
  const closeLightbox = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handler = () => setOpen(false);
    dialog.addEventListener('close', handler);
    return () => dialog.removeEventListener('close', handler);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeLightbox();
  };

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        aria-haspopup="dialog"
        aria-label={`${ariaLabel} Click to open an enlarged, zoomable view.`}
        className="not-prose group relative my-8 block w-full cursor-zoom-in rounded-2xl border border-blog-border bg-gradient-to-b from-white to-blog-purple-light/40 p-4 text-left transition hover:border-blog-purple/50 sm:p-6"
      >
        <div aria-hidden="true">{children}</div>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-blog-border bg-white/90 px-2 py-1 text-xs text-blog-muted opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <FiMaximize2 className="h-3 w-3" aria-hidden="true" />
          Enlarge
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        aria-label={ariaLabel}
        className="fixed inset-0 z-[9999] m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
          <div
            className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-2 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="px-1 text-xs tabular-nums text-white/80">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
              disabled={zoom <= ZOOM_MIN}
              aria-label="Zoom out"
              title="Zoom out"
              className="flex h-7 w-7 items-center justify-center rounded text-white hover:bg-white/15 disabled:opacity-30"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
              disabled={zoom >= ZOOM_MAX}
              aria-label="Zoom in"
              title="Zoom in"
              className="flex h-7 w-7 items-center justify-center rounded text-white hover:bg-white/15 disabled:opacity-30"
            >
              +
            </button>
            {zoom !== 100 && (
              <button
                type="button"
                onClick={() => setZoom(100)}
                className="px-1.5 text-xs text-white/80 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          <div
            className="max-h-[78vh] w-full max-w-[95vw] overflow-auto rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: `${zoom}%`, minWidth: 320 }}>{children}</div>
          </div>

          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
