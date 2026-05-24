'use client';

import { Children, isValidElement, type ReactNode, useEffect, useRef, useId, useState } from 'react';

interface MermaidDiagramProps {
  chart?: string;
  description?: string;
  children?: ReactNode;
}

const ZOOM_STEP = 25;
const ZOOM_MIN = 50;
const ZOOM_MAX = 250;

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (!node) {
    return '';
  }

  let text = '';

  Children.forEach(node, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += String(child);
      return;
    }

    if (isValidElement(child)) {
      text += extractText(child.props.children);
    }
  });

  return text;
}

export default function MermaidDiagram({ chart, description, children }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  // useId can produce colons which are invalid in SVG element IDs
  const id = rawId.replace(/:/g, '');
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        const source = typeof chart === 'string' ? chart : extractText(children);
        const normalizedChart = source.trim();

        if (!normalizedChart) {
          throw new Error('Missing diagram definition. Provide chart prop or text children.');
        }

        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
        });

        await mermaid.parse(normalizedChart);
        const { svg } = await mermaid.render(`mermaid-${id}`, normalizedChart);

        if (!cancelled && containerRef.current) {
          setError(null);
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
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unknown Mermaid rendering error';
          setError(message);
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, children, id]);

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
          className="py-6 px-4 bg-white"
        />
      </div>
      {error ? (
        <p className="mt-2 text-sm text-red-600">
          Mermaid failed to render: {error}
        </p>
      ) : null}
    </figure>
  );
}
