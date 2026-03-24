import { motion } from 'framer-motion';

function LanguageToggle({ locale, onLocaleChange, ui }) {
  return (
    <div className="pointer-events-auto group relative overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(10,15,30,0.94),rgba(12,18,36,0.9))] p-1.5 shadow-soft backdrop-blur-xl transition duration-300 hover:border-cobalt/20 hover:shadow-[0_18px_40px_rgba(16,28,66,0.38)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(55,168,255,0.16),transparent_28%),radial-gradient(circle_at_82%_50%,rgba(193,139,255,0.16),transparent_28%)] transition duration-500 group-hover:opacity-100" />
      <div className="absolute inset-[1px] rounded-full border border-white/[0.04] opacity-70 transition duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1.5 sm:flex">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-2 w-2 rounded-full bg-cobalt shadow-[0_0_16px_rgba(55,168,255,0.9)]" />
            <span className="absolute h-4.5 w-4.5 rounded-full border border-cobalt/30" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-mist/65">{ui.label}</span>
        </div>

        <div className="relative inline-grid grid-cols-2 gap-1 rounded-full border border-white/8 bg-[#070b18]/80 p-1">
          {ui.options.map((option) => {
            const isActive = locale === option.value;

            return (
              <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              aria-label={`${ui.label}: ${option.shortLabel}`}
              onClick={() => onLocaleChange(option.value)}
              className="relative min-w-[3.5rem] overflow-hidden rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] outline-none transition duration-300 hover:-translate-y-[1px] focus-visible:-translate-y-[1px] focus-visible:shadow-[0_0_0_1px_rgba(125,226,255,0.35),0_0_0_6px_rgba(55,168,255,0.12)]"
            >
              {isActive ? (
                <motion.span
                  layoutId="language-toggle-pill"
                  className="absolute inset-0 overflow-hidden rounded-full border border-cobalt/30 bg-[linear-gradient(135deg,rgba(132,102,255,0.88),rgba(42,147,255,0.82))] shadow-[0_12px_30px_rgba(62,82,255,0.28)]"
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                >
                  <span className="absolute inset-[1px] rounded-full bg-[linear-gradient(135deg,rgba(152,120,255,0.95),rgba(65,173,255,0.84))]" />
                  <span className="absolute inset-x-4 top-[2px] h-[38%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />
                  <span className="absolute left-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/95 shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
                  <span className="absolute left-2 top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full border border-white/20" />
                  <span className="absolute right-2.5 top-1/2 h-[1px] w-3 -translate-y-1/2 bg-white/35" />
                </motion.span>
              ) : null}

              <span
                className={`relative z-10 transition duration-300 ${
                  isActive ? 'text-white' : 'text-mist hover:text-white focus-visible:text-white'
                }`}
              >
                {option.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Header({ items, locale, onLocaleChange, ui }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="section-shell flex items-center justify-between py-5">
        <motion.a
          href="#top"
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm shadow-soft backdrop-blur-xl"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-ice shadow-[0_0_18px_rgba(125,226,255,0.95)]" />
          <span className="font-display text-base tracking-[0.2em] text-white">REGY</span>
          <span className="hidden text-xs uppercase tracking-[0.24em] text-mist/80 sm:block">
            {ui.brandTagline}
          </span>
        </motion.a>

        <motion.nav
          className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1 shadow-soft backdrop-blur-xl lg:flex"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-mist transition duration-300 hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.nav>

        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <LanguageToggle locale={locale} onLocaleChange={onLocaleChange} ui={ui.language} />
          </motion.div>

          <motion.a
            href="#contact"
            className="pointer-events-auto button-secondary hidden sm:inline-flex"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {ui.contactCta}
          </motion.a>
        </div>
      </div>
    </header>
  );
}
