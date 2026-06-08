import { BLOG_SITE_URL } from './blog-i18n';

export const PERSON_NAME = 'Johannes Rabauer';
export const SITE_NAME = 'rabauer.dev';
export const SITE_URL = BLOG_SITE_URL;
export const PERSON_JOB_TITLE = 'Senior Software Engineer';
export const PERSON_EMPLOYER = 'XDEV Software GmbH';
export const PERSON_EMPLOYER_URL = 'https://xdev.software/';
export const PERSON_EMAIL = 'johannes@rabauer.dev';
export const PERSON_IMAGE_PATH = '/Logo_round.png';
export const PERSON_BANNER_PATH = '/banner.jpg';

export const HOMEPAGE_ANSWER =
  'Johannes Rabauer is a Senior Software Engineer at XDEV Software GmbH, a Java specialist, and a public speaker focused on AI-assisted development, software architecture, and secure, scalable systems.';

export const HOMEPAGE_INTRO =
  'Java, AI-assisted development, public speaking, and practical engineering craft.';

export const HOMEPAGE_SUMMARY =
  'On rabauer.dev he publishes practical articles, conference material, videos, certifications, and publications about modern Java, engineering craft, and real-world AI workflows.';

export const PERSON_DESCRIPTION = `${HOMEPAGE_ANSWER} ${HOMEPAGE_SUMMARY}`;

export const PERSON_KNOWS_ABOUT = [
  'Java',
  'AI-assisted software development',
  'Software architecture',
  'Modernization',
  'Code review culture',
  'Developer productivity',
  'Secure software delivery',
  'Cloud-native systems',
] as const;

export const PERSON_SAME_AS = [
  'https://github.com/JohannesRabauer',
  'https://www.linkedin.com/in/johannes-rabauer',
  'https://www.youtube.com/@johannesrabauer',
  'https://x.com/JohannesRabauer',
  'https://mastodon.online/@rabauer',
  'https://bsky.app/profile/rabauer.dev',
  'https://www.tiktok.com/@johannes.rabauer',
  'https://www.twitch.tv/johannesrabauer',
  'https://sessionize.com/johannes/',
] as const;

export const HOMEPAGE_FAQS = [
  {
    question: 'Who is Johannes Rabauer?',
    answer:
      'Johannes Rabauer is a Senior Software Engineer at XDEV Software GmbH, a Java specialist, a public speaker, and the author of rabauer.dev.',
  },
  {
    question: 'What topics does Johannes Rabauer write and speak about?',
    answer:
      'He focuses on Java, AI-assisted development, software modernization, software architecture, code review culture, and practical engineering workflows.',
  },
  {
    question: 'What can I find on rabauer.dev?',
    answer:
      'The site collects portfolio information, blog posts, conference material, YouTube playlists, certifications, publications, and links to Johannes Rabauer’s public profiles.',
  },
  {
    question: 'Which pages are the best citation targets?',
    answer:
      'The homepage is the best source for identity and profile information, while the locale-specific blog posts are the best source for detailed technical explanations and attributable quotes.',
  },
] as const;
