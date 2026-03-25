import { ArrowUpRight, GitBranch } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import InteractiveSurface from './InteractiveSurface';

function ProjectPreview({ accent }) {
  const [start, end] = accent;

  return (
    <div
      className="relative aspect-[1.18] overflow-hidden rounded-[1.7rem] border border-white/10"
      style={{
        background: `radial-gradient(circle at 18% 22%, ${start}55, transparent 30%), radial-gradient(circle at 78% 24%, ${end}50, transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0)), linear-gradient(145deg, rgba(7,11,24,0.96), rgba(13,19,36,0.86))`
      }}
    >
      <div className="absolute inset-4 rounded-[1.35rem] border border-white/10 bg-white/[0.025] transition duration-500 group-hover/project:scale-[1.02]" />
      <div
        className="absolute left-6 top-6 h-20 w-20 rounded-full blur-2xl transition duration-700 group-hover/project:scale-110 group-hover/project:opacity-100"
        style={{ backgroundColor: `${start}66` }}
      />
      <div
        className="absolute bottom-10 right-10 h-24 w-24 rounded-full blur-3xl transition duration-700 group-hover/project:translate-x-2 group-hover/project:-translate-y-2"
        style={{ backgroundColor: `${end}44` }}
      />
      <div className="absolute inset-0">
        <div className="absolute left-[12%] top-[22%] h-[1px] w-[68%] rotate-[14deg] bg-white/20 transition duration-700 group-hover/project:translate-x-2 group-hover/project:opacity-80" />
        <div className="absolute left-[16%] top-[54%] h-[1px] w-[54%] -rotate-[18deg] bg-white/15 transition duration-700 group-hover/project:-translate-x-2 group-hover/project:opacity-80" />
        <div className="absolute left-[32%] top-[18%] h-24 w-24 rounded-full border border-white/12 transition duration-700 group-hover/project:scale-105" />
        <div className="absolute right-[12%] top-[34%] h-16 w-16 rounded-full border border-white/10 transition duration-700 group-hover/project:-translate-y-1 group-hover/project:scale-110" />
        <div className="absolute bottom-[18%] left-[18%] h-12 w-12 rounded-xl border border-white/10 bg-white/[0.04] transition duration-700 group-hover/project:-translate-y-1 group-hover/project:rotate-3" />
        <div className="absolute bottom-[20%] right-[16%] h-20 w-20 rounded-[1.4rem] border border-white/10 bg-white/[0.035] transition duration-700 group-hover/project:translate-y-1 group-hover/project:-rotate-3" />
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

export default function ProjectsSection({ projects, ui }) {
  return (
    <section id="projects" className="section-space">
      <div className="section-shell">
        <SectionHeading
          eyebrow={ui.eyebrow}
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
              <InteractiveSurface
                as="article"
                className="group/project panel h-full p-5 sm:p-6"
                intensity={9}
                lift={9}
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
                        <span key={item} className="tag-chip px-3 py-1.5 text-sm">
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 text-sm leading-7 text-mist/80">
                      <span className="text-white">{ui.roleLabel}:</span> {project.role}
                    </p>

                    {project.impact ? (
                      <div className="mt-6 rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-cobalt/90">{ui.impactLabel}</p>
                        <p className="mt-3 text-sm leading-7 text-mist">{project.impact}</p>
                      </div>
                    ) : null}

                    <div className="mt-7 flex flex-wrap gap-3">
                      <ProjectLink href={project.links.repo} icon={<GitBranch className="h-4 w-4" />}>
                        {ui.repositoryLabel}
                      </ProjectLink>
                      <ProjectLink
                        href={project.links.demo}
                        icon={<ArrowUpRight className="h-4 w-4" />}
                        muted
                      >
                        {project.links.demo ? ui.livePreviewLabel : ui.noDemoLabel}
                      </ProjectLink>
                    </div>
                  </div>
                </div>
              </InteractiveSurface>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
