import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-bold tracking-widest text-white text-lg">
            SANKALP
          </Link>
          <p className="text-sm text-muted-foreground font-light">
            Built for thinkers, builders & problem-solvers.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#explore" className="hover:text-white transition-colors">Explore</Link>
          <Link href="#guide" className="hover:text-white transition-colors">Guide</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </nav>

        <div className="text-xs text-muted-foreground/60 font-mono">
          © {new Date().getFullYear()} SANKALP
        </div>
      </div>
    </footer>
  )
}
