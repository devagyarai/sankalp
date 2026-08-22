"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navbar() {
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
            ? "bg-background/70 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors duration-300">
              SANKALP
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <NavLink href="#explore" label="Explore" />
            <NavLink href="#how-it-works" label="How It Works" />
            <NavLink href="#guide" label="Guide" />
            <NavLink href="#faq" label="FAQ" />
            
            <Link 
              href="/explore"
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold tracking-wide"
            >
              Start Creating
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
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
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
        >
          <MobileNavLink href="#explore" label="Explore" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="#how-it-works" label="How It Works" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="#guide" label="Guide" onClick={() => setMobileMenuOpen(false)} />
          <MobileNavLink href="#faq" label="FAQ" onClick={() => setMobileMenuOpen(false)} />
          <Link 
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 mt-4 rounded-full bg-white text-black text-lg font-semibold"
          >
            Start Creating
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
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-2xl font-medium text-muted-foreground hover:text-white transition-colors">
      {label}
    </Link>
  )
}
