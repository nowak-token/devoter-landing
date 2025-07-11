"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";


const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#workflow" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0e131f]/40 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-r from-[#1a233a] to-[#05080f]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="relative group text-white font-medium"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-gradient-to-r from-cyan-400 to-purple-400" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 rounded-full border border-cyan-400 bg-cyan-500 text-white transition cursor-pointer">
            Connect Wallet
          </button>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 text-white shadow-md cursor-pointer">
            Launch App
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 backdrop-blur-xl bg-black/80 rounded-b-lg space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="block text-white font-medium"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-2">
            <button className="w-full px-4 py-2 rounded-full border border-cyan-400  bg-cyan-500 text-white transition">
              Connect Wallet
            </button>
            <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 text-white shadow-md">
              Launch App
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
