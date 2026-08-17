import { Terminal } from 'lucide-react'

export default function FloatingContact() {
  return (
    <a 
      href="mailto:hello@mahdijafari.ir" 
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-30 flex items-center gap-2 border border-brand-accent/40 bg-[#050505]/95 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-brand-accent transition-all hover:bg-brand-accent hover:text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] rounded-full md:rounded-none shadow-lg"
    >
      <Terminal size={15} className="animate-pulse" />
      <span>EXECUTE_CONTACT</span>
    </a>
  )
}
