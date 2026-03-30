'use client';

import { useEffect, useRef, useId, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  description?: string;
}

const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 250;

export default function MermaidDiagram({ chart, description }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  // useId can produce colons which are invalid in SVG element IDs
  const id = rawId.replace(/:/g, '');
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled && containerRef.current) {
        containerRef.current.innerHTML = svg;
        // Strip the fixed dimensions mermaid sets so the SVG scales with its container
        const svgEl = containerRef.current.querySelector('svg');
        if (svgEl) {
          svgEl.removeAttribute('width');
          svgEl.removeAttribute('height');
          svgEl.style.width = '100%';
          svgEl.style.height = 'auto';
          svgEl.style.display = 'block';
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <figure role="img" aria-label={description || 'Diagram'} className="my-6">
      {/* Zoom controls */}
      <div className="flex items-center justify-end gap-1.5 mb-2">
        <span className="text-xs text-blog-muted tabular-nums">{zoom}%</span>
        <button
          onClick={() => setZoom(z => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
          disabled={zoom <= ZOOM_MIN}
          aria-label="Zoom out diagram"
          title="Zoom out"
          className="w-7 h-7 rounded border border-blog-border text-blog-purple hover:bg-blog-purple-light disabled:opacity-35 text-base leading-none flex items-center justify-center"
        >−</button>
        <button
          onClick={() => setZoom(z => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
          disabled={zoom >= ZOOM_MAX}
          aria-label="Zoom in diagram"
          title="Zoom in"
          className="w-7 h-7 rounded border border-blog-border text-blog-purple hover:bg-blog-purple-light disabled:opacity-35 text-base leading-none flex items-center justify-center"
        >+</button>
        {zoom !== 100 && (
          <button
            onClick={() => setZoom(100)}
            aria-label="Reset diagram zoom"
            className="text-xs text-blog-purple hover:underline px-1"
          >Reset</button>
        )}
      </div>
      {/* Scroll container — inner div width drives zoom */}
      <div className="overflow-x-auto rounded-lg border border-blog-border">
        <div
          ref={containerRef}
          style={{ width: `${zoom}%`, minWidth: '300px' }}
          className="py-6 px-4"
        />
      </div>
    </figure>
  );
}
