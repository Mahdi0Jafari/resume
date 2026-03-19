import { Terminal } from 'lucide-react'

export default function FloatingContact() {
    return (
      <a 
        href="mailto:hello@mahdijafari.ir" 
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-2 border border-brand-accent/40 bg-[#050505] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-brand-accent transition-all hover:bg-brand-accent hover:text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
      >
        <Terminal size={16} className="animate-pulse" />
        <span>EXECUTE_CONTACT</span>
      </a>
    )
  }
