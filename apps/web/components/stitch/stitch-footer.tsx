import Link from "next/link"
import { Rocket } from "lucide-react"
import { ChatWidget } from "@/components/chatbot/ChatWidget"

export function StitchFooter() {
  return (
    <footer className="py-12 px-6 border-t border-[#00e5ff]/20 relative z-10 bg-black overflow-hidden">
      {/* Background glow for footer */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#00e5ff]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="#explore" className="flex items-center gap-2 font-semibold tracking-widest text-white text-xl uppercase group">
            <Rocket className="w-5 h-5 text-[#00e5ff] group-hover:-translate-y-1 transition-transform" />
            SANKALP
          </Link>
          <p className="text-sm text-zinc-500 font-medium">
            Built for cosmic thinkers & problem-solvers.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-zinc-400 uppercase tracking-widest">
          <Link href="#explore" className="hover:text-[#00e5ff] transition-colors">Explore</Link>
          <Link href="#guide" className="hover:text-[#00e5ff] transition-colors">Guide</Link>
          <Link href="#faq" className="hover:text-[#00e5ff] transition-colors">FAQ</Link>
          <Link href="/about" className="hover:text-[#00e5ff] transition-colors">About</Link>
        </nav>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="text-xs text-zinc-600 font-mono tracking-widest">
            © {new Date().getFullYear()} SANKALP COSMOS.
          </div>
        </div>
      </div>

      {/* Interactive Chat Widget */}
      <ChatWidget />
    </footer>
  )
}
