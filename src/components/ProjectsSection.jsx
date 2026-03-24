import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function ProjectPreview({ accent }) {
  const [start, end] = accent;

  return (
    <div
      className="relative aspect-[1.18] overflow-hidden rounded-[1.7rem] border border-white/10"
      style={{
        background: `radial-gradient(circle at 18% 22%, ${start}55, transparent 30%), radial-gradient(circle at 78% 24%, ${end}50, transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0)), linear-gradient(145deg, rgba(7,11,24,0.96), rgba(13,19,36,0.86))`
      }}
    >
      <div className="absolute inset-4 rounded-[1.35rem] border border-white/10 bg-white/[0.025]" />
      <div className="absolute left-6 top-6 h-20 w-20 rounded-full blur-2xl" style={{ backgroundColor: `${start}66` }} />
      <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full blur-3xl" style={{ backgroundColor: `${end}44` }} />
      <div className="absolute inset-0">
        <div className="absolute left-[12%] top-[22%] h-[1px] w-[68%] rotate-[14deg] bg-white/20" />
        <div className="absolute left-[16%] top-[54%] h-[1px] w-[54%] -rotate-[18deg] bg-white/15" />
        <div className="absolute left-[32%] top-[18%] h-24 w-24 rounded-full border border-white/12" />
        <div className="absolute right-[12%] top-[34%] h-16 w-16 rounded-full border border-white/10" />
        <div className="absolute bottom-[18%] left-[18%] h-12 w-12 rounded-xl border border-white/10 bg-white/[0.04]" />
        <div className="absolute bottom-[20%] right-[16%] h-20 w-20 rounded-[1.4rem] border border-white/10 bg-white/[0.035]" />
      </div>
    </div>
  );
}

function ProjectLink({ href, icon, children, muted = false }) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/12 px-4 py-2 text-sm text-mist/70">
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition duration-300 ${
        muted
          ? 'border border-white/12 text-mist hover:border-white/18 hover:text-white'
          : 'border border-cobalt/30 bg-cobalt/12 text-white hover:-translate-y-0.5 hover:border-cobalt/45 hover:bg-cobalt/18'
      }`}
    >
      {content}
    </a>
  );
}

export default function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Selected Work"
          title={projects.title}
          description={projects.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.items.map((project, index) => (
            <Reveal
              key={project.title}
              delay={0.04 * index}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <motion.article
                className="panel h-full p-5 sm:p-6"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`grid gap-6 ${project.featured ? 'xl:grid-cols-[0.92fr_1.08fr]' : ''}`}>
                  <ProjectPreview accent={project.accent} />

                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.22em] text-cobalt/90">
                        {project.status}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-mist">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl font-medium text-white sm:text-[1.9rem]">{project.title}</h3>
                    <p className="mt-4 text-base leading-8 text-mist">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm text-mist"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 text-sm leading-7 text-mist/80">
                      <span className="text-white">Role:</span> {project.role}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <ProjectLink href={project.links.repo} icon={<GitBranch className="h-4 w-4" />}>
                        Repository
                      </ProjectLink>
                      <ProjectLink
                        href={project.links.demo}
                        icon={<ArrowUpRight className="h-4 w-4" />}
                        muted
                      >
                        {project.links.demo ? 'Live preview' : 'No public demo yet'}
                      </ProjectLink>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
