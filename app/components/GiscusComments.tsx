'use client';

import Giscus from '@giscus/react';

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
        loading="lazy"
      />
    </section>
  );
}
