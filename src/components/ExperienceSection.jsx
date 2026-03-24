import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ExperienceSection({ experience, ui }) {
  return (
    <section id="experience" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={ui.eyebrow}
          title={experience.title}
          description={experience.description}
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
          <Reveal className="panel p-7 sm:p-9">
            <p className="section-kicker">{ui.introEyebrow}</p>
            <p className="mt-5 max-w-xl font-display text-2xl leading-tight text-white sm:text-[2rem]">
              {ui.introStatement}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {experience.signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist"
                >
                  {signal}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6">
            {experience.stages.map((stage, index) => (
              <Reveal key={stage.title} delay={0.05 * index} className="panel p-6 sm:p-7">
                <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cobalt/25 bg-cobalt/10 font-display text-2xl text-white">
                    {stage.step}
                  </div>
                  <div>
                    <p className="section-kicker">{stage.label}</p>
                    <h3 className="mt-3 text-2xl font-medium text-white">{stage.title}</h3>
                    <p className="mt-4 text-base leading-7 text-mist">{stage.copy}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {stage.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm text-mist"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
