import { Suspense, lazy } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import InteractiveSurface from './InteractiveSurface';

const SceneCanvas = lazy(() => import('./SceneCanvas'));

function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[70px]" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cobalt/35 bg-cobalt/12" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_35%_30%,rgba(130,121,255,0.18),transparent_25%),radial-gradient(circle_at_70%_40%,rgba(55,168,255,0.18),transparent_28%)]" />
    </div>
  );
}

export default function HeroSection({ hero, visualDirection, ui }) {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-36">
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.24em] text-mist shadow-soft backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-ice shadow-[0_0_18px_rgba(125,226,255,0.95)]" />
                {visualDirection.label}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-7">
              <p className="text-sm uppercase tracking-[0.28em] text-cobalt/90">{hero.name}</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] text-white sm:text-6xl lg:text-[5.6rem]">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mist sm:text-xl">
                {hero.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-mist/90">{hero.description}</p>
            </Reveal>

            <Reveal delay={0.14} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href={hero.primaryCta.href} className="button-primary">
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href={hero.secondaryCta.href} className="button-secondary">
                {hero.secondaryCta.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              {hero.highlights.map((item) => (
                <span key={item} className="tag-chip shadow-soft backdrop-blur-lg">
                  <span>{item}</span>
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.16} className="relative">
            <div className="panel min-h-[32rem] p-4 sm:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,114,255,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
              <div className="relative h-[20rem] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,38,0.96),rgba(7,11,24,0.86))] shadow-glow sm:h-[23rem]">
                <Suspense fallback={<SceneFallback />}>
                  <SceneCanvas />
                </Suspense>
                <div className="scene-ui">
                  <div className="scene-badge">
                    <span className="scene-badge-dot" />
                    {ui.sceneLabel}
                  </div>
                  <div className="scene-hint hidden sm:block">{ui.sceneHint}</div>
                </div>
              </div>

              <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
                {hero.metrics.map((metric, index) => (
                  <Reveal key={metric.label} delay={0.18 + index * 0.06} y={22}>
                    <InteractiveSurface
                      className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
                      intensity={8}
                      lift={7}
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-cobalt/90">{metric.label}</p>
                      <p className="mt-3 text-lg font-medium text-white">{metric.value}</p>
                    </InteractiveSurface>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.26} className="mt-14">
          <div className="panel overflow-hidden p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="section-kicker">{ui.visualDirectionEyebrow}</p>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white">{visualDirection.statement}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {hero.orbit.map((item) => (
                  <InteractiveSurface
                    key={item.title}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4"
                    intensity={9}
                    lift={8}
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-mist">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-mist/90">{item.copy}</p>
                  </InteractiveSurface>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
