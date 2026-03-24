import { motion } from 'framer-motion';

export default function Header({ items }) {
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
            Front-End / SPFx
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

        <motion.a
          href="#contact"
          className="pointer-events-auto button-secondary hidden sm:inline-flex"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          Let&apos;s talk
        </motion.a>
      </div>
    </header>
  );
}
