import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function AboutSection({ about, eyebrow }) {
  return (
    <section id="about" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={about.title}
          description={about.description}
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="panel p-7 sm:p-9">
            <p className="max-w-2xl font-display text-2xl leading-tight text-white sm:text-[2rem]">
              {about.pullQuote}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-mist">{about.body}</p>
          </Reveal>

          <div className="grid gap-6">
            {about.highlights.map((item, index) => (
              <Reveal key={item.title} delay={0.06 * index} className="panel p-6">
                <p className="section-kicker">{item.label}</p>
                <h3 className="mt-4 text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-mist">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
