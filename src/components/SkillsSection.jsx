import { motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function SkillsSection({ skills }) {
  return (
    <section id="skills" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Capabilities"
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
              <motion.article
                className="panel h-full p-6 sm:p-7"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm text-mist"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
