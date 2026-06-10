/**
 * Consistent section heading block used on the home page.
 * Renders a mono kicker, colored h2, and a gradient divider line.
 */
export default function SectionHeading({
  id,
  kicker,
  title,
  colorClass,
  dividerColor,
}: {
  id: string;
  kicker: string;
  title: string;
  colorClass: string;
  dividerColor: string;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35 mb-2">
        {kicker}
      </p>
      <h2 id={id} className={`${colorClass} text-2xl md:text-3xl font-bold`}>
        {title}
      </h2>
      <div
        className="mt-3 mx-auto h-px w-20 rounded-full opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${dividerColor}, transparent)`,
        }}
      />
    </div>
  );
}
