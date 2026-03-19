import Image from 'next/image'

export default function HeroTile() {
  return (
    <section className="col-span-full lg:col-span-3 glass-effect p-10 md:p-14 rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[420px] card-glow group">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent opacity-5 blur-[120px] rounded-full transition-opacity group-hover:opacity-10 duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-gradient-to-br from-brand-accent/20 to-transparent flex items-center justify-center">
            {/* Fallback initial if image totally fails to load */}
            <span className="absolute text-5xl font-bold text-brand-accent/30 pointer-events-none">M</span>
            
            <Image 
              src="/profile.jpg" 
              alt="Mahdi Jafari"
              fill
              className="object-cover relative z-10"
              priority
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-mono border border-brand-accent/20">
              SYSTEMS_ARCHITECT_V3.0
            </span>
            <span className="text-brand-secondary text-sm font-mono">Based in Iran | Global Operator</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Engineering Autonomous Systems <br className="hidden md:block"/>
          <span className="text-brand-secondary">@ Speed of AI</span>
        </h1>
        <p className="text-brand-secondary max-w-xl text-lg leading-relaxed">
          Orchestrating scalable infrastructure with deterministic precision.
        </p>
      </div>
    </section>
  )
}
