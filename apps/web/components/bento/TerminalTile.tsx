'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'system' | 'agent' | 'user'
  isHtml?: boolean
}

export default function TerminalTile() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '$ ./init_agent.sh', sender: 'system' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContainerSmall = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // اسکرول هوشمند بدون پریدنِ صفحه
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
    if (scrollContainerSmall.current) {
      scrollContainerSmall.current.scrollTo({
        top: scrollContainerSmall.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isTyping, isExpanded])

  // قفل کردن اسکرول بدنه سایت در زمان باز بودن مودال + خروج با دکمه ESC
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false)
    }

    if (isExpanded) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    } else {
      document.body.style.overflow = ''
    }
    return () => { 
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isExpanded])

  useEffect(() => {
    const bootLines = [
      { id: '2', text: '<div class="flex justify-between items-center"><span class="text-[#00F0FF]">&gt; FastAPI_Engine <span class="text-white/30 text-[10px]">[LOADED]</span></span></div>', isHtml: true, delay: 300 },
      { id: '3', text: '<div class="flex justify-between items-center"><span class="text-white">&gt; Vector_DB <span class="text-white/30 text-[10px]">[SYNCED]</span></span></div>', isHtml: true, delay: 700 },
      { id: '4', text: '<div class="flex justify-between items-center"><span class="text-green-400">&gt; Awaiting Query...</span></div>', isHtml: true, delay: 1100 },
    ]
    bootLines.forEach(({ id, text, isHtml, delay }) => {
      setTimeout(() => {
        setMessages(prev => {
          if (prev.find(m => m.id === id)) return prev
          return [...prev, { id, text, sender: 'system', isHtml }]
        })
      }, delay)
    })
  }, [])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: 'user' }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "This is a simulated response. Once the FastAPI backend is deployed, I will analyze your query.",
        sender: 'agent',
      }])
    }, 1500)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.stopPropagation(); handleSend() }
  }

  const terminalContent = (
    <AnimatePresence>
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6" style={{ fontStyle: 'normal' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsExpanded(false)}
          />
          
          <motion.section
            layoutId="terminal-wrapper"
            className="w-full h-[100dvh] sm:h-[85vh] sm:max-w-4xl bg-[#050505] border-t sm:border border-[#00F0FF]/30 rounded-none sm:rounded-3xl flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,240,255,0.1)] glass-effect"
            onLayoutAnimationComplete={() => inputRef.current?.focus()}
          >
            <TerminalHeader isExpanded={true} onClose={() => setIsExpanded(false)} />
            
            <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
              <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 font-mono text-sm scrollbar-hide">
                {messages.map(m => (
                  <div key={m.id} className={`flex flex-col gap-1 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    {m.sender !== 'system' && (
                      <span className={`text-[10px] uppercase tracking-tighter ${m.sender === 'user' ? 'text-white/40' : 'text-[#00F0FF]'}`}>
                        {m.sender}
                      </span>
                    )}
                    <div className={
                      m.sender === 'system'
                        ? 'text-[#A0A0A0] w-full'
                        : `p-3 rounded-xl max-w-[90%] ${m.sender === 'user' ? 'bg-white/10 text-white rounded-tr-none' : 'border border-white/10 text-[#A0A0A0] rounded-tl-none'}`
                    }>
                      {m.isHtml ? <div dangerouslySetInnerHTML={{ __html: m.text }} /> : m.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[#00F0FF] text-xs animate-pulse mt-2">Analyzing RAG database...</div>}
                <div className="h-2 shrink-0" />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 pt-4 border-t border-white/5 flex gap-3 items-center pb-safe"
              >
                <span className="text-[#00F0FF] font-bold tracking-tighter">{'>'}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about my systems..."
                  className="flex-1 bg-transparent border-0 text-white focus:ring-0 p-0 text-sm font-mono outline-none shadow-none"
                  autoComplete="off"
                />
                <button onClick={handleSend} className="text-[#00F0FF] p-2 hover:bg-[#00F0FF]/10 rounded-lg transition-colors">
                  <Send size={18} />
                </button>
              </motion.div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <motion.section
        layoutId="terminal-wrapper"
        onClick={() => setIsExpanded(true)}
        className={`col-span-full lg:col-span-1 h-[350px] glass-effect rounded-3xl cursor-pointer flex flex-col overflow-hidden group border border-white/5 hover:border-[#00F0FF]/30 transition-colors ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <TerminalHeader isExpanded={false} onClose={() => {}} />
        <div className="p-6 font-mono text-xs text-[#A0A0A0] flex-1 flex flex-col justify-end relative">
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm z-20">
                <span className="text-[#00F0FF] border border-[#00F0FF]/30 px-3 py-1 rounded-full bg-black/50">OPEN_AGENT_INTERFACE</span>
             </div>
             
             <div ref={scrollContainerSmall} className="flex-1 overflow-y-auto space-y-2 scrollbar-hide z-10 flex flex-col justify-end mt-auto text-sm">
                {messages.filter(m => m.sender === 'system').map(m =>
                  m.isHtml ? (
                    <div key={m.id} dangerouslySetInnerHTML={{ __html: m.text }} />
                  ) : (
                    <p key={m.id}>{m.text}</p>
                  )
                )}
             </div>
             <p className="animate-blink text-[#00F0FF] mt-2 z-10">_</p>
        </div>
      </motion.section>

      {/* خروج از گرید و رندر در ریشه صفحه */}
      {mounted && typeof document !== 'undefined' && createPortal(terminalContent, document.body)}
      
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </>
  )
}

function TerminalHeader({ isExpanded, onClose }: { isExpanded: boolean; onClose: (e: React.MouseEvent) => void }) {
  return (
    <div className="bg-black/80 px-5 py-3 border-b border-white/10 flex justify-between items-center z-10 sm:rounded-t-3xl shrink-0">
      <div className="flex gap-2 items-center">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="text-[11px] font-mono text-[#A0A0A0] ml-2 tracking-widest">mahdi_neural_node.sh</span>
      </div>
      {isExpanded && (
        <button
          onClick={e => { e.stopPropagation(); onClose(e); }}
          className="text-[#A0A0A0] hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
