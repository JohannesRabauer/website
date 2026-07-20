import { FaQuoteLeft } from 'react-icons/fa6';

interface Props {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export default function Quote({ children, author, role }: Props) {
  return (
    <blockquote className="not-prose relative my-8 rounded-2xl border border-blog-border bg-blog-purple-light/50 py-6 pl-16 pr-6 sm:pr-8">
      <FaQuoteLeft
        className="absolute left-5 top-6 h-6 w-6 text-blog-purple/25"
        aria-hidden="true"
      />
      <p className="text-lg italic leading-relaxed text-blog-text">{children}</p>
      {author && (
        <footer className="mt-4 text-sm font-medium not-italic text-blog-purple">
          {'— '}
          {author}
          {role && <span className="font-normal text-blog-muted">, {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
