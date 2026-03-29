'use client';

import { useEffect, useRef, useId } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  // useId can produce colons which are invalid in SVG element IDs
  const id = rawId.replace(/:/g, '');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled && containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={containerRef} className="my-6 flex justify-center" />;
}
