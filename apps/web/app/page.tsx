import HeaderTile from '@/components/bento/HeaderTile'
import HeroTile from '@/components/bento/HeroTile'
import SocialTile from '@/components/bento/SocialTile'
import EcosystemShowcase from '@/components/ecosystem/EcosystemShowcase'
import TerminalTile from '@/components/bento/TerminalTile'
import FloatingContact from '@/components/FloatingContact'
import { getGitHubProjects } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const projects = await getGitHubProjects();

  return (
    <>
      <FloatingContact />
      <main className="bento-grid relative">
        <HeaderTile />
        <HeroTile />
        <SocialTile />
        
        <EcosystemShowcase />

        <TerminalTile />

        <a href="https://github.com/mahdi0jafari?tab=repositories" target="_blank" rel="noopener noreferrer" className="col-span-full glass-effect p-5 rounded-2xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm font-mono text-brand-secondary hover:text-brand-primary hover:border-brand-accent/30 transition-all duration-300 card-glow group cursor-pointer">
          <span className="text-brand-accent group-hover:text-white transition-colors">&gt; cd ./archive && ls -la</span>
          <span className="opacity-50 hidden md:inline">|</span>
          <span>View {projects.length}+ other deployed projects & experiments &rarr;</span>
        </a>

        <footer id="contact" className="col-span-full glass-effect p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between card-glow gap-6">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold mb-1">Let's build something future-proof.</p>
            <p className="text-brand-secondary text-sm">Now accepting new system architecture design invitations.</p>
          </div>
          <a href="mailto:hello@mahdijafari.ir" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 w-full md:w-auto text-center">
            Deploy Message
          </a>
        </footer>
      </main>
    </>
  )
}
