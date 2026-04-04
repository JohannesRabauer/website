export const BLOG_LOCALES = ['en', 'de'] as const;

export type BlogLocale = (typeof BLOG_LOCALES)[number];

export const DEFAULT_BLOG_LOCALE: BlogLocale = 'en';
export const BLOG_SITE_URL = 'https://rabauer.dev';
export const BLOG_LOCALE_STORAGE_KEY = 'preferred-blog-locale';

type BlogCopy = {
  htmlLang: string;
  openGraphLocale: string;
  localeSwitcherLabel: string;
  layout: {
    blogLabel: string;
    skipToContent: string;
    navigation: string;
    home: string;
    rssFeed: string;
    footerRights: string;
  };
  listing: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    description: string;
    bannerAriaLabel: string;
    noPostsYet: string;
    backToHome: string;
    allTags: string;
    searchPosts: string;
    searchPlaceholder: string;
    clearSearch: string;
    noPostsFound: string;
    noPostsMatch: string;
    clearFilters: string;
    postsPublished: (count: number) => string;
    postsFound: (count: number) => string;
  };
  post: {
    allPosts: string;
    comments: string;
    commentsConsentTitle: string;
    commentsConsentDescription: string;
    commentsConsentLabel: string;
    commentsLoadLabel: string;
    commentsExternalLabel: string;
    commentsPrivacyNotice: string;
    commentsConsentRequired: string;
    commentsHideLabel: string;
    commentsLoadedNotice: string;
    published: string;
    readingTimeLabel: string;
    share: string;
    linkCopied: string;
    sharePostLink: string;
    onThisPage: string;
    tableOfContentsAriaLabel: string;
    projectSource: string;
    workingRepository: string;
    projectSourceDescription: string;
    openRepository: string;
    sessionTimeline: string;
    coSpeaker: string;
    website: string;
    video: string;
    withCoSpeaker: (name: string) => string;
    translationUnavailable: string;
  };
  feeds: {
    title: string;
    description: string;
  };
};

const BLOG_COPY: Record<BlogLocale, BlogCopy> = {
  en: {
    htmlLang: 'en',
    openGraphLocale: 'en_US',
    localeSwitcherLabel: 'Language',
    layout: {
      blogLabel: 'Blog',
      skipToContent: 'Skip to content',
      navigation: 'Blog navigation',
      home: 'Home',
      rssFeed: 'RSS Feed',
      footerRights: 'All rights reserved.',
    },
    listing: {
      metaTitle: 'Live-Coding Learnings: Modern Java with AI',
      metaDescription:
        'Summaries, reflections, and practical takeaways from live coding sessions about Java, AI, and modernization.',
      title: 'Live-Coding Learnings',
      subtitle: 'Modern Java with AI',
      description:
        'Summaries, reflections, and practical takeaways from my live coding sessions. I share useful patterns, failed attempts, and what changed my mind while building with Java and AI.',
      bannerAriaLabel: 'Blog header illustration',
      noPostsYet: 'No posts yet. Check back soon.',
      backToHome: 'Back to Home',
      allTags: 'All',
      searchPosts: 'Search posts',
      searchPlaceholder: 'Search posts…',
      clearSearch: 'Clear search',
      noPostsFound: 'No posts found.',
      noPostsMatch: 'No posts match your search.',
      clearFilters: 'Clear filters',
      postsPublished: (count) => `${count} post${count === 1 ? '' : 's'} published`,
      postsFound: (count) => `${count} post${count === 1 ? '' : 's'} found`,
    },
    post: {
      allPosts: 'All posts',
      comments: 'Comments',
      commentsConsentTitle: 'Load comments from GitHub optionally',
      commentsConsentDescription:
        'The comment section is provided via Giscus and GitHub Discussions. It will only be loaded after your explicit consent. When loading it, personal data such as your IP address and technical metadata may be transmitted to GitHub, and cookies or similar technologies may be set.',
      commentsConsentLabel:
        'I agree that the comment section may be loaded from GitHub/Giscus.',
      commentsLoadLabel: 'Load comments',
      commentsExternalLabel: 'Open discussion on GitHub',
      commentsPrivacyNotice: 'More details are available in the privacy policy.',
      commentsConsentRequired:
        'Please confirm first before loading the comment section.',
      commentsHideLabel: 'Hide comments again',
      commentsLoadedNotice:
        'The comment section is active. You can hide it again here at any time.',
      published: 'Published',
      readingTimeLabel: 'Reading time',
      share: 'Share',
      linkCopied: 'Link copied!',
      sharePostLink: 'Share post link',
      onThisPage: 'On this page',
      tableOfContentsAriaLabel: 'Table of contents',
      projectSource: 'Project Source',
      workingRepository: 'Working Repository',
      projectSourceDescription:
        'Explore prompts, instructions, and examples used in the live modernization workflow.',
      openRepository: 'Open repository',
      sessionTimeline: 'Session Timeline',
      coSpeaker: 'Co-Speaker',
      website: 'Website',
      video: 'Video',
      withCoSpeaker: (name) => `with ${name}`,
      translationUnavailable: 'Translation not available yet',
    },
    feeds: {
      title: 'Live-Coding Learnings: Modern Java with AI',
      description:
        'Live coding sessions and engineering craft.',
    },
  },
  de: {
    htmlLang: 'de',
    openGraphLocale: 'de_DE',
    localeSwitcherLabel: 'Sprache',
    layout: {
      blogLabel: 'Blog',
      skipToContent: 'Zum Inhalt springen',
      navigation: 'Blog-Navigation',
      home: 'Startseite',
      rssFeed: 'RSS-Feed',
      footerRights: 'Alle Rechte vorbehalten.',
    },
    listing: {
      metaTitle: 'Live-Coding Learnings: Modern Java with AI',
      metaDescription:
        'Zusammenfassungen, Reflexionen und praktische Erkenntnisse aus Live-Coding-Sessions zu Java, KI und Modernisierung.',
      title: 'Live-Coding Learnings',
      subtitle: 'Modern Java with AI',
      description:
        'Zusammenfassungen, Reflexionen und praktische Erkenntnisse aus meinen Live-Coding-Sessions. Ich teile nützliche Muster, gescheiterte Versuche und konkrete Learnings aus den Live-Coding-Sessions mit Java und KI.',
      bannerAriaLabel: 'Illustration zum Blog-Header',
      noPostsYet: 'Noch keine Beiträge. Schau bald wieder vorbei.',
      backToHome: 'Zur Startseite',
      allTags: 'Alle',
      searchPosts: 'Beiträge durchsuchen',
      searchPlaceholder: 'Beiträge durchsuchen…',
      clearSearch: 'Suche löschen',
      noPostsFound: 'Keine Beiträge gefunden.',
      noPostsMatch: 'Kein Beitrag passt zur aktuellen Suche.',
      clearFilters: 'Filter zurücksetzen',
      postsPublished: (count) => `${count} Beitrag${count === 1 ? '' : 'e'} veröffentlicht`,
      postsFound: (count) => `${count} Beitrag${count === 1 ? '' : 'e'} gefunden`,
    },
    post: {
      allPosts: 'Alle Beiträge',
      comments: 'Kommentare',
      commentsConsentTitle: 'Kommentare optional von GitHub laden',
      commentsConsentDescription:
        'Die Kommentarfunktion wird über Giscus und GitHub Discussions bereitgestellt. Sie wird erst nach Ihrer ausdrücklichen Einwilligung geladen. Beim Laden können personenbezogene Daten wie Ihre IP-Adresse und technische Metadaten an GitHub übermittelt sowie Cookies oder ähnliche Technologien gesetzt werden.',
      commentsConsentLabel:
        'Ich willige ein, dass die Kommentarfunktion von GitHub/Giscus geladen wird.',
      commentsLoadLabel: 'Kommentare laden',
      commentsExternalLabel: 'Diskussion auf GitHub öffnen',
      commentsPrivacyNotice: 'Mehr dazu in der Datenschutzerklärung.',
      commentsConsentRequired:
        'Bitte bestätigen Sie zuerst Ihre Einwilligung, bevor die Kommentare geladen werden.',
      commentsHideLabel: 'Kommentare wieder ausblenden',
      commentsLoadedNotice:
        'Die Kommentarfunktion ist aktiv. Sie können sie hier jederzeit wieder ausblenden.',
      published: 'Veröffentlicht',
      readingTimeLabel: 'Lesezeit',
      share: 'Teilen',
      linkCopied: 'Link kopiert!',
      sharePostLink: 'Beitragslink teilen',
      onThisPage: 'Auf dieser Seite',
      tableOfContentsAriaLabel: 'Inhaltsverzeichnis',
      projectSource: 'Projektquelle',
      workingRepository: 'Arbeits-Repository',
      projectSourceDescription:
        'Hier findest du Prompts, Instructions und Beispiele aus dem gezeigten Modernisierungs-Workflow.',
      openRepository: 'Repository öffnen',
      sessionTimeline: 'Timestamps der Session',
      coSpeaker: 'Co-Speaker',
      website: 'Webseite',
      video: 'Video',
      withCoSpeaker: (name) => `mit ${name}`,
      translationUnavailable: 'Übersetzung noch nicht verfügbar',
    },
    feeds: {
      title: 'Live-Coding Learnings: Modern Java with AI',
      description:
        'Live-Coding-Sessions, Java-Deep-Dives und Engineering-Learnings.',
    },
  },
};

export function isBlogLocale(value: string): value is BlogLocale {
  return BLOG_LOCALES.includes(value as BlogLocale);
}

export function getBlogDictionary(locale: BlogLocale): BlogCopy {
  return BLOG_COPY[locale];
}

export function getBlogListingPath(locale: BlogLocale): string {
  return `/${locale}/blog`;
}

export function getBlogPostPath(locale: BlogLocale, slug: string): string {
  return `${getBlogListingPath(locale)}/${slug}`;
}

export function getBlogAliasPath(slug?: string): string {
  return slug ? `/blog/${slug}` : '/blog';
}

export function getBlogRssPath(locale?: BlogLocale): string {
  void locale;
  return '/rss.xml';
}

export function getBlogAlternates(
  slug?: string,
  locales: BlogLocale[] = [...BLOG_LOCALES]
): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, slug ? getBlogPostPath(locale, slug) : getBlogListingPath(locale)])
  );
}

export function formatBlogDate(locale: BlogLocale, value: string): string {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

export function formatReadingTime(locale: BlogLocale, minutes: number): string {
  if (locale === 'de') {
    return `${minutes} Min. Lesezeit`;
  }

  return `${minutes} min read`;
}
