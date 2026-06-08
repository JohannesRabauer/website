import { HOMEPAGE_ENTRY_POINTS, HOMEPAGE_FAQS, HOMEPAGE_QUICK_FACTS, HOMEPAGE_SUMMARY } from '@/lib/site-data';

export default function HomeEntitySection() {
  return (
    <section
      aria-labelledby="about-johannes-heading"
      className="content-layer w-full max-w-6xl px-4 pb-8"
    >
      <div className="rounded-3xl border border-cyber-cyan/30 bg-cyber-bg/75 p-6 shadow-xl shadow-cyber-cyan/5 md:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div>
              <h2
                id="about-johannes-heading"
                className="mb-4 text-2xl font-semibold text-cyber-cyan md:text-3xl"
              >
                About Johannes Rabauer
              </h2>
              <p className="max-w-3xl text-base leading-8 text-gray-200 md:text-lg">
                {HOMEPAGE_SUMMARY}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {HOMEPAGE_QUICK_FACTS.map((fact) => (
                <article
                  key={fact.label}
                  className="rounded-2xl border border-cyber-purple/25 bg-cyber-purple/10 p-4 text-left"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-cyber-purple">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-gray-200 md:text-base">
                    {fact.value}
                  </p>
                </article>
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-cyber-green md:text-2xl">
                Best starting points
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {HOMEPAGE_ENTRY_POINTS.map((entry) => (
                  <a
                    key={entry.href}
                    href={entry.href}
                    target={entry.href.startsWith('http') ? '_blank' : undefined}
                    rel={entry.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="rounded-2xl border border-cyber-green/20 bg-cyber-green/10 p-4 transition hover:border-cyber-green/40 hover:bg-cyber-green/15"
                  >
                    <p className="text-base font-semibold text-cyber-green">{entry.title}</p>
                    <p className="mt-2 text-sm leading-7 text-gray-300">{entry.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/10 p-6">
            <h3 className="mb-4 text-xl font-semibold text-cyber-cyan md:text-2xl">FAQ</h3>
            <dl className="space-y-5 text-left">
              {HOMEPAGE_FAQS.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-sm font-semibold uppercase tracking-[0.18em] text-cyber-cyan">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-gray-200 md:text-base">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
