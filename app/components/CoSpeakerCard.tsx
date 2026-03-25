import { FiGlobe } from 'react-icons/fi';
import { FaBluesky, FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6';

interface Props {
  name: string;
  role: string;
  company?: string;
  bio?: string;
  imageSrc?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  x?: string;
  bluesky?: string;
  youtube?: string;
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-blog-border bg-white px-3 py-1.5 text-sm text-blog-muted no-underline transition hover:border-blog-purple hover:text-blog-purple"
    >
      {icon}
      {label}
    </a>
  );
}

export default function CoSpeakerCard({
  name,
  role,
  company,
  bio,
  imageSrc,
  website,
  github,
  linkedin,
  x,
  bluesky,
  youtube,
}: Props) {
  if (!name || !role) return null;

  return (
    <section className="my-10 rounded-3xl border border-blog-border bg-blog-surface p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="h-24 w-24 rounded-2xl object-cover ring-1 ring-blog-border"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blog-purple-light to-blog-green-light text-2xl font-semibold text-blog-purple ring-1 ring-blog-border">
            {name
              .split(' ')
              .filter(Boolean)
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-blog-green">
            Co-Speaker
          </p>
          <h2 className="!my-0 font-[family-name:var(--font-heading)] text-2xl text-blog-purple">
            {name}
          </h2>
          <p className="mt-1 text-sm text-blog-muted">
            {role}
            {company ? ` at ${company}` : ''}
          </p>
          {bio && <p className="mt-3 text-sm leading-6 text-blog-text">{bio}</p>}

          <div className="mt-4 flex flex-wrap gap-2">
            <SocialLink href={website} label="Website" icon={<FiGlobe className="h-4 w-4" />} />
            <SocialLink href={github} label="GitHub" icon={<FaGithub className="h-4 w-4" />} />
            <SocialLink href={linkedin} label="LinkedIn" icon={<FaLinkedin className="h-4 w-4" />} />
            <SocialLink href={x} label="X" icon={<FaXTwitter className="h-4 w-4" />} />
            <SocialLink href={bluesky} label="Bluesky" icon={<FaBluesky className="h-4 w-4" />} />
            <SocialLink href={youtube} label="YouTube" icon={<FaYoutube className="h-4 w-4" />} />
          </div>
        </div>
      </div>
    </section>
  );
}
