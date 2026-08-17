export default function HeaderTile() {
  return (
    <header className="col-span-full md:col-span-4 glass-effect px-5 py-3.5 sm:px-8 sm:py-4 rounded-3xl flex flex-wrap items-center justify-between gap-3 card-glow">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 bg-brand-accent rounded flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)]">
          <span className="text-black font-bold text-xs">M</span>
        </div>
        <span className="font-mono text-base sm:text-lg font-bold tracking-tighter">mahdi0jafari</span>
      </div>
      <nav className="flex gap-5 sm:gap-8 text-xs sm:text-sm font-medium text-brand-secondary">
        <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
        <a href="#stack" className="hover:text-brand-accent transition-colors">Stack</a>
        <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
      </nav>
    </header>
  )
}
