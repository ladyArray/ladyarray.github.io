import { ArrowUpRight, GitBranch, Link2, Mail } from 'lucide-react';
import Reveal from './Reveal';

const iconMap = {
  github: GitBranch,
  linkedin: Link2,
  email: Mail
};

export default function ContactSection({ contact, ui }) {
  return (
    <section id="contact" className="section-space pb-24 sm:pb-28">
      <div className="section-shell">
        <Reveal className="panel overflow-hidden p-7 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(136,102,255,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(55,168,255,0.16),transparent_34%)]" />

          <div className="relative grid gap-10 xl:grid-cols-[1.02fr_0.98fr] xl:items-end">
            <div>
              <p className="section-kicker">{ui.eyebrow}</p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-[4rem]">
                {contact.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{contact.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {contact.availability.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-mist"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {contact.links.map((link) => {
                const Icon = iconMap[link.type];

                if (!link.href) {
                  return (
                    <div
                      key={link.type}
                      className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] p-5 text-mist/75"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                            <Icon className="h-5 w-5 text-cobalt" />
                          </div>
                          <div>
                            <p className="text-sm uppercase tracking-[0.22em] text-mist/80">{link.label}</p>
                            <p className="mt-1 text-base text-white">{link.value}</p>
                          </div>
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-mist/70">
                          {ui.replaceLabel}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.type}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:bg-white/[0.055]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                          <Icon className="h-5 w-5 text-cobalt" />
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-[0.22em] text-mist/80">{link.label}</p>
                          <p className="mt-1 text-base text-white">{link.value}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-mist transition duration-300 group-hover:text-white" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
