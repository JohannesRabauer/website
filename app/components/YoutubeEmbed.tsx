"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { type BlogLocale } from '@/lib/blog-i18n';

interface Props {
  videoId: string;
  title?: string;
  locale?: BlogLocale;
}

const COPY = {
  en: {
    eyebrow: 'YouTube',
    consentTitle: 'Load YouTube video',
    consentText:
      'This video is embedded from YouTube and will only be loaded after your consent. When loading it, personal data may be transmitted to YouTube or Google and cookies may be set.',
    loadLabel: 'I agree and load the video',
    openLabel: 'Open on YouTube',
    privacyPrefix: 'More details are available in the ',
    privacyLink: 'privacy policy',
  },
  de: {
    eyebrow: 'YouTube',
    consentTitle: 'YouTube-Video laden',
    consentText:
      'Dieses Video wird von YouTube eingebettet und erst nach Ihrer Einwilligung geladen. Beim Laden können personenbezogene Daten an YouTube oder Google übermittelt und Cookies gesetzt werden.',
    loadLabel: 'Ich stimme zu und lade das Video',
    openLabel: 'Auf YouTube öffnen',
    privacyPrefix: 'Mehr dazu in der ',
    privacyLink: 'Datenschutzerklärung',
  },
} as const;

export default function YoutubeEmbed({
  videoId,
  title = 'YouTube video',
  locale = 'en',
}: Props) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const copy = COPY[locale];
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <div className="my-8 overflow-hidden rounded-[1.5rem] border border-blog-border bg-blog-surface shadow-md ring-1 ring-blog-purple/10">
        <div className="relative h-0 pb-[56.25%]">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="overflow-hidden rounded-[1.5rem] border border-blog-border bg-blog-surface shadow-md ring-1 ring-blog-purple/10">
        <div className="relative aspect-video overflow-hidden bg-blog-purple-light">
          <Image
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/95 text-white shadow-lg">
              <FaPlay className="ml-1 h-6 w-6" aria-hidden="true" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
              {copy.eyebrow}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-snug sm:text-xl">
              {title}
            </h3>
          </div>
        </div>

        <div className="space-y-4 px-5 py-5 text-sm text-blog-muted">
          <div>
            <h4 className="text-base font-semibold text-blog-text">{copy.consentTitle}</h4>
            <p className="mt-2 leading-6">{copy.consentText}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="rounded-full bg-blog-purple px-4 py-2 font-semibold text-white transition hover:bg-blog-purple-mid"
            >
              {copy.loadLabel}
            </button>

            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-blog-border px-4 py-2 font-medium text-blog-muted transition hover:border-blog-purple hover:text-blog-purple"
            >
              {copy.openLabel}
            </a>
          </div>

          <p className="text-xs leading-5">
            {copy.privacyPrefix}
            <Link href="/datenschutz" className="underline underline-offset-2">
              {copy.privacyLink}
            </Link>
            .
          </p>
        </div>

      </div>
    </div>
  );
}
