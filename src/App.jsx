import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ValueSection from './components/ValueSection';
import ContactSection from './components/ContactSection';
import { defaultLocale, portfolio, supportedLocales } from './data/portfolio';

const LOCALE_STORAGE_KEY = 'regy-portfolio-locale';

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  if (savedLocale && supportedLocales.includes(savedLocale)) {
    return savedLocale;
  }

  const browserLocale = window.navigator.language.toLowerCase();

  if (browserLocale.startsWith('es')) {
    return 'es';
  }

  return defaultLocale;
}

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const content = portfolio[locale] || portfolio[defaultLocale];

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.title = content.meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');

    if (descriptionTag) {
      descriptionTag.setAttribute('content', content.meta.description);
    }
  }, [content.meta.description, content.meta.title, locale]);

  return (
    <div className="relative isolate overflow-hidden bg-base text-ink">
      <div className="fixed inset-0 -z-20 bg-base" />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full bg-violet/30 blur-[150px]" />
        <div className="absolute right-[-10rem] top-[8rem] h-[26rem] w-[26rem] rounded-full bg-cobalt/20 blur-[140px]" />
        <div className="absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cobalt/10 blur-[170px]" />
        <div className="absolute inset-0 bg-grid bg-[size:72px_72px] opacity-[0.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,24,0.32)_0%,rgba(7,11,24,0.82)_55%,rgba(7,11,24,1)_100%)]" />
      </div>

      <Header
        items={content.navigation}
        locale={locale}
        onLocaleChange={setLocale}
        ui={content.ui.header}
      />

      <main className="relative z-10">
        <HeroSection
          hero={content.hero}
          visualDirection={content.visualDirection}
          ui={content.ui.hero}
        />
        <AboutSection about={content.about} eyebrow={content.ui.sections.about} />
        <SkillsSection skills={content.skills} eyebrow={content.ui.sections.skills} />
        <ExperienceSection experience={content.experience} ui={content.ui.experience} />
        <ProjectsSection projects={content.projects} ui={content.ui.projects} />
        <ValueSection values={content.values} eyebrow={content.ui.sections.value} />
        <ContactSection contact={content.contact} ui={content.ui.contact} />
      </main>
    </div>
  );
}
