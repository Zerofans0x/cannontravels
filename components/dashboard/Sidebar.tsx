
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userInitial = user?.firstName ? user.firstName.charAt(0).toUpperCase() : "U";
  const fullName = user ? `${user.firstName} ${user.lastName || ""}`.trim() : "User";

  const navSections = [
    {
      title: "CORE",
      items: [
        { name: "Flight Terminal", href: "/dashboard", icon: "lucide:home" },
        { name: "Global Inventory", href: "/dashboard/flights", icon: "lucide:plane" },
        { name: "My Bookings & PNR", href: "/dashboard/bookings", icon: "lucide:ticket" },
      ],
    },
    {
      title: "FINANCE & PAYMENTS",
      items: [
        { name: "Delegated Payments", href: "/dashboard/delegated", icon: "lucide:link" },
        { name: "Transaction Journal", href: "/dashboard/execution-journal", icon: "bi:journal" },
        { name: "Flight Schedule", href: "/dashboard/macro-calendar", icon: "lucide:calendar" },
      ],
    },
    {
      title: "OPERATIONS",
      items: [
        { name: "Airspace Telemetry", href: "/dashboard/risk-telemetry", icon: "lucide:calculator" },
        { name: "Market Intelligence", href: "/dashboard/market-intelligence", icon: "lucide:telescope" },
        { name: "Account Settings", href: "/dashboard/settings", icon: "lucide:settings" },
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
        <div className="w-full h-full max-h-[96vh] bg-[#1a0505] text-white rounded-[20px] p-4 sm:p-5 flex flex-col justify-between shadow-2xl overflow-y-auto lg:overflow-y-hidden [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 border border-red-950/40">
          <div>
            {/* Desktop Top Logo */}
            <div className="hidden lg:flex items-center justify-between pt-1 pb-4 sm:pb-5 px-1">
              <Link href="/dashboard" className="inline-flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-tight flex items-center gap-1">
                  <span className="text-[#DC2626]">Cannon</span>Travels
                </span>
              </Link>
            </div>

            {/* Mobile Top Profile Card */}
            <div className="lg:hidden bg-[#2a0808] border border-red-900/40 rounded-[14px] p-3 flex items-center justify-between gap-2.5 mb-5 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-[8px] bg-[#DC2626] text-white font-bold text-[13px] flex items-center justify-center flex-shrink-0 shadow-xs">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-medium text-[#fca5a5] truncate">
                    {fullName}
                  </p>
                  <p className="text-[10px] text-white/50 truncate flex items-center gap-1">
                    <span>Passenger Portal</span>
                    <span>·</span>
                    <Link
                      href="/dashboard/settings"
                      onClick={onClose}
                      className="text-white/70 hover:text-white"
                    >
                      Settings
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
                  {sIdx > 0 && <div className="h-px bg-white/10 my-3 sm:my-3.5" />}
                  <p className="text-[10px] tracking-wider text-white/40 mb-1.5 px-3 font-mono">
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
                              ? "bg-[#DC2626] text-white shadow-md shadow-red-600/20"
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
              <div className="w-8 h-8 rounded-[8px] bg-[#DC2626] text-white font-bold text-[13px] flex items-center justify-center flex-shrink-0 shadow-xs">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-[#fca5a5] truncate">
                  {fullName}
                </p>
                <p className="text-[10px] text-white/50 truncate flex items-center gap-1">
                  <span>Passenger Portal</span>
                  <span>·</span>
                  <Link
                    href="/dashboard/settings"
                    className="text-white/70 hover:text-white"
                  >
                    Settings
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