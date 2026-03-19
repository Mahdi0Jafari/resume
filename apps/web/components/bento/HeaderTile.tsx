export default function HeaderTile() {
    return (
      <header className="col-span-full md:col-span-4 glass-effect px-8 py-4 rounded-3xl flex flex-wrap items-center justify-between card-glow">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 bg-brand-accent rounded flex items-center justify-center">
            <span className="text-black font-bold text-xs">M</span>
          </div>
          <span className="font-mono text-lg font-bold tracking-tighter">mahdi0jafari</span>
        </div>
        <nav className="flex gap-8 text-sm font-medium text-brand-secondary">
          <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
          <a href="#stack" className="hover:text-brand-accent transition-colors">Stack</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
        </nav>
      </header>
    )
  }
