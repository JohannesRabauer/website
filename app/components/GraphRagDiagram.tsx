'use client';

import MermaidDiagram from './MermaidDiagram';

const chart = `
graph LR
    subgraph DataModel["Object Graph"]
        FM[FileMetadata] -- has --> T[Tag]
    end

    DataModel -->|Vectorize| DB[(Neo4j Vector Store)]

    UI([User Input]) -->|Vectorize| Q[Vector Query]
    Q -->|Similarity Search| DB
    DB -->|Returns| R["FileMetadata + Tags"]
`;

export default function GraphRagDiagram() {
  return <MermaidDiagram chart={chart} />;
}
