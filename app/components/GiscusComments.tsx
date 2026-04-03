'use client';

import dynamic from 'next/dynamic';
import ExternalContentGate from './ExternalContentGate';
import { giscusDiscussionUrl } from '@/lib/legal';

const Giscus = dynamic(() => import('@giscus/react'), {
  ssr: false,
});

/**
 * Giscus comment section.
 * Configure your repo/category details at https://giscus.app
 * and replace the placeholder values below.
 */
export default function GiscusComments() {
  return (
    <section className="mt-16 pt-8 border-t border-blog-border">
      <h3 className="font-heading text-2xl text-blog-purple mb-6">
        Comments
      </h3>
      <ExternalContentGate
        title="Kommentare über GitHub laden"
        description="Mit einem Klick wird die Kommentarfunktion von Giscus geladen. Dabei wird eine Verbindung zu GitHub aufgebaut und es können personenbezogene Daten an GitHub übermittelt werden."
        loadLabel="Kommentare laden"
        externalHref={giscusDiscussionUrl}
        externalLabel="Auf GitHub öffnen"
      >
        <Giscus
          repo="JohannesRabauer/website"
          repoId="R_kgDOPudYiQ"
          category="giscus"
          categoryId="DIC_kwDOPudYic4C5MMP"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="eager"
        />
      </ExternalContentGate>
    </section>
  );
}
