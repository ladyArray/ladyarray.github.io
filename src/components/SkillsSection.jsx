import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import InteractiveSurface from './InteractiveSurface';

export default function SkillsSection({ skills, eyebrow }) {
  return (
    <section id="skills" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={skills.title}
          description={skills.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.groups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={0.05 * index}
              className={group.featured ? 'md:col-span-2 xl:col-span-2' : ''}
            >
              <InteractiveSurface
                as="article"
                className="panel h-full p-6 sm:p-7"
                intensity={10}
                lift={9}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-kicker">{group.label}</p>
                    <h3 className="mt-4 text-2xl font-medium text-white">{group.title}</h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-display text-lg text-cobalt">
                    {group.mark}
                  </div>
                </div>

                <p className="mt-5 max-w-xl text-base leading-7 text-mist">{group.copy}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className="tag-chip px-3 py-1.5 text-sm">
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </InteractiveSurface>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
