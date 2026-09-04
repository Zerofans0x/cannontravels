
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Flights", href: "/flights" },
    { name: "Live Tracking", href: "/tracking" },
    { name: "Support", href: "/contact" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isHome = pathname === "/";

  return (
    <header
      className={`w-full pb-4 flex items-center justify-between z-30 relative ${
        isHome
          ? "px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8"
          : "px-[36px] sm:px-[64px] lg:px-[88px] pt-[36px] sm:pt-[56px] lg:pt-[64px]"
      }`}
    >
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#DC2626] rounded-lg flex items-center justify-center shadow-sm">
           <span className="text-white font-black text-xl leading-none">C</span>
        </div>
        <span className="text-slate-900 font-black text-xl sm:text-2xl tracking-tight hidden sm:block">
          Cannon<span className="text-[#DC2626]">Travels</span>
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-10 text-[15px] font-bold">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors duration-150 ${
                isActive
                  ? "text-[#DC2626] border-b-2 border-[#DC2626] pb-1 -mb-1"
                  : "text-slate-600 hover:text-[#DC2626]"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Action Buttons / Auth State */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 text-[15px] font-bold text-white bg-[#DC2626] rounded-full hover:bg-[#B91C1C] transition-colors duration-200 shadow-md shadow-red-600/20"
            >
              Dashboard
            </Link>
            <button
              onClick={() => logout()}
              className="px-4 py-2.5 text-[14px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-2.5 text-[15px] font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 text-[15px] font-bold text-white bg-[#DC2626] rounded-full hover:bg-[#B91C1C] transition-colors duration-200 shadow-md shadow-red-600/20"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button & Dropdown */}
      <div className="relative md:hidden" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all shadow-sm cursor-pointer ${
            isOpen || !isHome
              ? "bg-[#DC2626] text-white shadow-md"
              : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
          }`}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="text-[15px] leading-none">+</span>
          <span>Menu</span>
        </button>

        {/* Mobile Dropdown Card */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2.5 bg-white rounded-[24px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-slate-100 p-2 flex flex-col gap-1 w-[160px] text-center z-50 animate-in fade-in zoom-in-95 duration-150">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full py-2.5 px-3 rounded-full text-[13.5px] font-bold transition-all ${
                    isActive
                      ? "bg-red-50 text-[#DC2626]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="w-full h-px bg-slate-100 my-1" />

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-3 rounded-full text-[13.5px] font-bold bg-[#DC2626] text-white shadow-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full py-2.5 px-3 rounded-full text-[13.5px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-3 rounded-full text-[13.5px] font-bold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 px-3 rounded-full text-[13.5px] font-bold bg-[#DC2626] text-white shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}