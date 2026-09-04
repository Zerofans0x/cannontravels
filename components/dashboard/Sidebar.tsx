

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navSections = [
    {
      title: "CORE",
      items: [
        { name: "Terminal", href: "/dashboard", icon: "lucide:home" },
        { name: "Portfolio", href: "/dashboard/portfolio", icon: "charm:book" },
        { name: "Mandates", href: "/dashboard/mandates", icon: "lucide:graduation-cap" },
      ],
    },
    {
      title: "TELEMETRY",
      items: [
        { name: "Risk Telemetry", href: "/dashboard/risk-telemetry", icon: "lucide:calculator" },
        { name: "Execution Journal", href: "/dashboard/execution-journal", icon: "bi:journal" },
        { name: "Macro Calendar", href: "/dashboard/macro-calendar", icon: "lucide:calendar" },
      ],
    },
    {
      title: "INTELLIGENCE",
      items: [
        { name: "Market Intelligence", href: "/dashboard/market-intelligence", icon: "lucide:telescope" },
        { name: "Strategy Alerts", href: "/dashboard/strategy-alert", icon: "charm:clock-alarm" },
        { name: "Institutional Outlook", href: "/dashboard/institutional-outlook", icon: "hugeicons:user-group-02" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-[240px] xl:w-[260px] h-screen max-h-screen flex-shrink-0 p-3 sm:p-4 lg:p-3 flex flex-col justify-center transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="w-full h-full max-h-[96vh] bg-[#022c22] text-white rounded-[20px] p-4 sm:p-5 flex flex-col justify-between shadow-2xl overflow-y-auto lg:overflow-y-hidden [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10">
          <div>
            {/* Desktop Top Logo */}
            <div className="hidden lg:flex items-center justify-between pt-1 pb-4 sm:pb-5 px-1">
              <Link href="/dashboard" className="inline-flex items-center gap-2">
                <Image
                  src="/images/logo-sidebar.png"
                  alt="cannontravels"
                  width={130}
                  height={28}
                  className="h-6 sm:h-7 w-auto object-contain brightness-0 invert"
                />
              </Link>
            </div>

            {/* Mobile Top Profile Card */}
            <div className="lg:hidden bg-[#064e3b] border border-white/10 rounded-[14px] p-3 flex items-center justify-between gap-2.5 mb-5 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-[8px] bg-white text-[#022c22] font-medium text-[13px] flex items-center justify-center flex-shrink-0 shadow-xs">
                  B
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium text-[#fbbf24] truncate">
                    John D.
                  </p>
                  <p className="text-[10px] text-white/50 truncate flex items-center gap-1">
                    <span>Pro Mandate</span>
                    <span>·</span>
                    <Link
                      href="/pricing"
                      onClick={onClose}
                      className="text-white/70 hover:text-white"
                    >
                      Scale
                    </Link>
                  </p>
                </div>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-white/60 hover:text-white p-1 cursor-pointer flex-shrink-0"
                  aria-label="Close sidebar"
                >
                  <Icon icon="lucide:x" className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Navigation Groups */}
            <div className="space-y-3.5 sm:space-y-4">
              {navSections.map((section, sIdx) => (
                <div key={section.title}>
                  {sIdx > 0 && <div className="h-px bg-white/20 my-3 sm:my-3.5" />}
                  <p className="text-[10px] tracking-wider text-white/40 mb-1.5 px-3">
                    {section.title}
                  </p>
                  <nav className="space-y-0.5 sm:space-y-1">
                    {section.items.map((item) => {
                      const isActive =
                        item.href === "/dashboard"
                          ? pathname === "/dashboard"
                          : pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-[13px] font-medium transition-all ${
                            isActive
                              ? "bg-[#059669] text-white shadow-md shadow-emerald-500/20"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive ? "text-white" : "text-white/60"
                            }`}
                          />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile Footer (Desktop Only) */}
          <div className="hidden lg:block pt-4 mt-6 border-t border-white/10">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-[8px] bg-white text-[#022c22] font-medium text-[13px] flex items-center justify-center flex-shrink-0 shadow-xs">
                B
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-[#fbbf24] truncate">
                  John D.
                </p>
                <p className="text-[10px] text-white/50 truncate flex items-center gap-1">
                  <span>Pro Mandate</span>
                  <span>·</span>
                  <Link
                    href="/pricing"
                    className="text-white/70 hover:text-white"
                  >
                    Scale
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}