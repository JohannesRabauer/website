import type { PostFrontmatter } from './posts';

const HQDEFAULT_VIDEO_IDS = new Set(['emA_olJE6AU']);

export function getYouTubeThumbnail(videoId: string): string {
  const variant = HQDEFAULT_VIDEO_IDS.has(videoId) ? 'hqdefault' : 'maxresdefault';

  return `https://img.youtube.com/vi/${videoId}/${variant}.jpg`;
}

export function getPostCoverImage(frontmatter: PostFrontmatter): string {
  if (frontmatter.coverImage) {
    return frontmatter.coverImage;
  }

  if (frontmatter.youtubeId) {
    return getYouTubeThumbnail(frontmatter.youtubeId);
  }

  return '/blog/blog_banner.png';
}
