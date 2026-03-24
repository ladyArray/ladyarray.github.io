import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ValueSection from './components/ValueSection';
import ContactSection from './components/ContactSection';
import { portfolio } from './data/portfolio';

export default function App() {
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

      <Header items={portfolio.navigation} />

      <main className="relative z-10">
        <HeroSection hero={portfolio.hero} visualDirection={portfolio.visualDirection} />
        <AboutSection about={portfolio.about} />
        <SkillsSection skills={portfolio.skills} />
        <ExperienceSection experience={portfolio.experience} />
        <ProjectsSection projects={portfolio.projects} />
        <ValueSection values={portfolio.values} />
        <ContactSection contact={portfolio.contact} />
      </main>
    </div>
  );
}
