import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ValueSection({ values, eyebrow }) {
  return (
    <section id="value" className="section-space">
      <div className="section-shell">
        <SectionHeading eyebrow={eyebrow} title={values.title} description={values.description} />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.items.map((item, index) => (
            <Reveal key={item.title} delay={0.05 * index} className="panel p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-display text-lg text-cobalt">
                {item.mark}
              </div>
              <h3 className="mt-5 text-xl font-medium text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-mist">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
