import HeaderTile from '@/components/bento/HeaderTile'
import HeroTile from '@/components/bento/HeroTile'
import SocialTile from '@/components/bento/SocialTile'
import ProjectTile from '@/components/bento/ProjectTile'
import TerminalTile from '@/components/bento/TerminalTile'
import FloatingContact from '@/components/FloatingContact'
import { getGitHubProjects } from '@/lib/api'

export default async function Home() {
  const projects = await getGitHubProjects();
  const topProjects = projects.slice(0, 3); // Take the top 3 projects sorted by stars

  return (
    <>
      <FloatingContact />
      <main className="bento-grid relative">
        <HeaderTile />
        <HeroTile />
        <SocialTile />
        
        {/* Featured Projects Section with Anchor & Semantic H2 */}
        <section id="projects" className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 scroll-mt-6">
          <div className="col-span-full flex items-center justify-between">
            <h2 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
              <span className="text-brand-accent">01.</span> Featured Projects
            </h2>
            <span className="text-xs font-mono text-brand-secondary">Curated Deployments</span>
          </div>

          {topProjects.length > 0 ? (
            topProjects.map((project) => (
              <ProjectTile 
                key={project.id}
                title={project.repo_name}
                description={project.description || "No description provided."}
                status="Production"
                url={project.url}
                tags={[...(project.languages && project.languages.length > 0 ? project.languages : ["Code"]), `⭐ ${project.stars}`]}
              />
            ))
          ) : (
            <div className="col-span-full glass-effect p-8 rounded-3xl flex items-center justify-center card-glow h-[200px] text-brand-secondary font-mono text-sm">
              Syncing agent databanks... 
            </div>
          )}
        </section>

        {/* AI Agent Terminal & Stack Section with Anchor & Semantic H2 */}
        <section id="stack" className="col-span-full scroll-mt-6">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-xl font-bold font-mono tracking-tight flex items-center gap-2">
              <span className="text-brand-accent">02.</span> AI Agent Terminal & Architecture Stack
            </h2>
            <span className="text-xs font-mono text-brand-secondary">Interactive Engine</span>
          </div>
          <TerminalTile />
        </section>

        <a 
          href="https://github.com/mahdi0jafari?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="col-span-full glass-effect p-5 rounded-2xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm font-mono text-brand-secondary hover:text-brand-primary hover:border-brand-accent/30 transition-all duration-300 card-glow group cursor-pointer"
        >
          <span className="text-brand-accent group-hover:text-white transition-colors">&gt; cd ./archive && ls -la</span>
          <span className="opacity-50 hidden md:inline">|</span>
          <span>View {projects.length > 0 ? `${projects.length}+` : ''} other deployed projects & experiments &rarr;</span>
        </a>

        <footer id="contact" className="col-span-full glass-effect p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between card-glow gap-6 scroll-mt-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-1">Let's build something future-proof.</h2>
            <p className="text-brand-secondary text-sm">Now accepting new system architecture design invitations.</p>
          </div>
          <a 
            href="mailto:hello@mahdijafari.ir" 
            className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-brand-accent hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 w-full md:w-auto text-center"
          >
            Deploy Message
          </a>
        </footer>
      </main>
    </>
  )
}
