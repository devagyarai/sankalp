"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X, Rocket } from "lucide-react"

export function StitchNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-[#00e5ff]/10 shadow-[0_4px_30px_rgba(0,229,255,0.05)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Rocket className="w-5 h-5 text-[#00e5ff] group-hover:animate-pulse" />
            <span className="font-semibold text-xl tracking-widest text-white uppercase transition-colors duration-300 group-hover:text-[#00e5ff]">
              SANKALP
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <NavLink href="#explore" label="Explore" />
            <NavLink href="#how-it-works" label="How It Works" />
            <NavLink href="#guide" label="Guide" />
            <NavLink href="#faq" label="FAQ" />
            
            <Link 
              href="/dashboard"
              className="px-6 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#00e5ff]/50 text-white hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 font-bold tracking-wide flex items-center gap-2"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#00e5ff] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
        >
          <MobileNavLink href="#explore" label="Explore" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="#how-it-works" label="How It Works" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="#guide" label="Guide" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="#faq" label="FAQ" onClick={() => setMobileMenuOpen(false)} />
          <Link 
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 mt-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-lg font-bold hover:border-[#00e5ff]/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            Dashboard
          </Link>
        </motion.div>
      )}
    </>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="hover:text-white transition-colors duration-200 relative group">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00e5ff] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-2xl font-medium text-zinc-400 hover:text-[#00e5ff] transition-colors">
      {label}
    </Link>
  )
}

