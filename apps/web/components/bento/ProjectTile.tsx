interface ProjectProps {
    title: string;
    description: string;
    status: 'Production' | 'Beta' | 'Archived';
    tags: string[];
    url?: string;
  }
  
  export default function ProjectTile({ title, description, status, tags, url }: ProjectProps) {
    
    const getStatusStyle = (s: string) => {
      switch(s) {
        case 'Production': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'Beta': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      }
    }
  
    const Component = url ? 'a' : 'article';
    
    return (
      <Component 
        href={url}
        target={url ? "_blank" : undefined}
        rel={url ? "noopener noreferrer" : undefined}
        className={`col-span-full md:col-span-1 lg:col-span-1 glass-effect p-8 rounded-3xl flex flex-col justify-between card-glow h-[350px] transition-all duration-300 ${url ? 'cursor-pointer hover:-translate-y-2 hover:border-brand-accent/50 group' : ''}`}
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider border ${getStatusStyle(status)}`}>
              {status}
            </span>
            {url && (
              <svg className="w-5 h-5 text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-brand-secondary text-sm leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-brand-secondary px-2 py-1 bg-white/5 rounded border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </Component>
    )
  }
