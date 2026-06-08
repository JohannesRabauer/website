import type { PostFrontmatter } from './posts';

export function getPostCoverImage(frontmatter: PostFrontmatter): string {
  if (frontmatter.coverImage) {
    return frontmatter.coverImage;
  }

  if (frontmatter.youtubeId) {
    return `https://img.youtube.com/vi/${frontmatter.youtubeId}/hqdefault.jpg`;
  }

  return '/blog/blog_banner.png';
}
