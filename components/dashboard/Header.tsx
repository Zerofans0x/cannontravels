

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Icon } from "@iconify/react";

// interface HeaderProps {
//   title?: string;
//   onOpenMobileMenu?: () => void;
// }

// export default function DashboardHeader({
//   title = "Terminal",
//   onOpenMobileMenu,
// }: HeaderProps) {
//   const pathname = usePathname();
//   const [quizSeconds, setQuizSeconds] = useState(0);

//   const isVerification = pathname.startsWith("/dashboard/mandates/verify");
//   const isLesson = pathname.includes("/lesson");
//   const isQuizResult =
//     pathname.includes("/quiz") && pathname.includes("/result");
//   const isQuiz = pathname.includes("/quiz") && !isQuizResult;
//   const isCourseDetail =
//     pathname.startsWith("/dashboard/courses/") &&
//     pathname !== "/dashboard/courses" &&
//     !isLesson &&
//     !isQuiz &&
//     !isQuizResult;

//   useEffect(() => {
//     if (!isQuiz) {
//       setQuizSeconds(0);
//       return;
//     }
//     const interval = setInterval(() => {
//       setQuizSeconds((prev) => prev + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [isQuiz]);

//   const formatTimer = (totalSeconds: number) => {
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const renderHeader = (leftContent: React.ReactNode, rightContent: React.ReactNode) => (
//     <header className="w-full h-16 bg-[#f8fafc]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 sticky top-0 z-30 transition-colors border-b border-slate-200">
//       <div className="w-full h-full flex items-center justify-between">
//         {leftContent}
//         {rightContent}
//       </div>
//     </header>
//   );

//   if (isVerification) {
//     return renderHeader(
//       /* Left: Mobile Logo & Desktop Breadcrumb */
//       <div className="flex items-center gap-3 sm:gap-4">
//         {/* Mobile Logo */}
//         <Link href="/dashboard" className="lg:hidden flex items-center">
//           <Image
//             src="/images/dashboard/dashboard-logo-mobile.png"
//             alt="cannontravels"
//             width={32}
//             height={32}
//             className="h-7 w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Title */}
//         <h1 className="hidden lg:block text-[14px] sm:text-[15px] font-normal text-slate-800">
//           Verified Mandates
//         </h1>
//       </div>,

//       /* Right: My Mandate Button & Actions */
//       <div className="flex items-center gap-2 sm:gap-2.5">
//         {/* Desktop My Mandate Button */}
//         <Link
//           href="/dashboard/mandates"
//           className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-4 sm:px-5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[12.5px] sm:text-[13px] font-normal transition-all shadow-sm shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
//         >
//           <Icon icon="lucide:graduation-cap" className="w-4 h-4 text-white" />
//           <span>My Mandates</span>
//         </Link>

//         {/* Search */}
//         <button
//           type="button"
//           className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Search"
//         >
//           <Icon icon="lucide:search" className="w-4 h-4 text-slate-700" />
//         </button>

//         {/* Notifications */}
//         <button
//           type="button"
//           className="w-9 h-9 rounded-full bg-[#ecfdf5] lg:bg-[#F1F5F9] hover:bg-[#d1fae5] lg:hover:bg-[#E2E8F0] active:scale-95 text-slate-800 lg:text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
//           aria-label="Notifications"
//         >
//           <Icon icon="boxicons:bell" className="w-4 h-4 text-slate-800 lg:text-slate-700" />
//         </button>

//         {/* Profile Link Button */}
//         <Link
//           href="/dashboard/settings"
//           className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Profile account"
//         >
//           <Icon icon="basil:user-solid" className="w-4 h-4 text-slate-700" />
//         </Link>

//         {/* Mobile Hamburger */}
//         <button
//           type="button"
//           onClick={onOpenMobileMenu}
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Open navigation menu"
//         >
//           <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
//         </button>
//       </div>
//     );
//   }

//   if (isLesson) {
//     return renderHeader(
//       /* Left: Mobile Logo (<lg) & Desktop Back Link + Breadcrumb (lg+) */
//       <div className="flex items-center gap-3 sm:gap-6">
//         {/* Mobile Logo */}
//         <Link href="/dashboard" className="lg:hidden flex items-center">
//           <Image
//             src="/images/dashboard/dashboard-logo-mobile.png"
//             alt="cannontravels"
//             width={32}
//             height={32}
//             className="h-7 w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Course Overview Link & Breadcrumb */}
//         <div className="hidden lg:flex items-center gap-6">
//           <Link
//             href="/dashboard/courses/1"
//             className="text-[13.5px] sm:text-[14px] text-slate-800 hover:text-[#059669] flex items-center gap-2 transition-colors cursor-pointer group"
//           >
//             <Icon
//               icon="lucide:arrow-left"
//               className="w-4 h-4 text-slate-800 group-hover:text-[#059669] transition-colors"
//             />
//             <span>Module Overview</span>
//           </Link>

//           <div className="flex items-center gap-2 text-[13.5px] sm:text-[14px] text-slate-800">
//             <span>Institutional Liquidity Foundations</span>
//             <span className="text-slate-400">/</span>
//             <span>Module 1</span>
//             <span className="text-slate-400">/</span>
//             <span>Section 1</span>
//           </div>
//         </div>
//       </div>,

//       /* Right: Mobile Circular Bell + Menu & Desktop Next Button */
//       <div className="flex items-center gap-2 sm:gap-2.5">
//         {/* Desktop Next Section Button */}
//         <Link
//           href="/dashboard/courses/1/quiz"
//           className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13px] font-normal transition-all shadow-sm shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
//         >
//           <span>Next Section</span>
//           <svg
//             className="w-3.5 h-3.5 text-white"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="4" y1="12" x2="20" y2="12" />
//             <polyline points="14 6 20 12 14 18" />
//           </svg>
//         </Link>

//         {/* Mobile Notification Button */}
//         <button
//           type="button"
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
//           aria-label="Notifications"
//         >
//           <Icon icon="lucide:bell" className="w-4 h-4 text-slate-800" />
//         </button>

//         {/* Mobile Hamburger Menu Button */}
//         <button
//           type="button"
//           onClick={onOpenMobileMenu}
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Open navigation menu"
//         >
//           <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
//         </button>
//       </div>
//     );
//   }

//   if (isQuizResult) {
//     return renderHeader(
//       /* Left: Mobile Logo (<lg) & Desktop Title (lg+) */
//       <div className="flex items-center gap-3 sm:gap-6">
//         {/* Mobile Logo */}
//         <Link href="/dashboard" className="lg:hidden flex items-center">
//           <Image
//             src="/images/dashboard/dashboard-logo-mobile.png"
//             alt="cannontravels"
//             width={32}
//             height={32}
//             className="h-7 w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Assessment Complete Title */}
//         <span className="hidden lg:inline text-[14px] text-slate-800 font-normal">
//           Assessment complete
//         </span>
//       </div>,

//       /* Right: Mobile Circular Bell + Menu & Desktop Back to module link */
//       <div className="flex items-center gap-2 sm:gap-2.5">
//         {/* Desktop Back to module link */}
//         <Link
//           href="/dashboard/courses/1"
//           className="hidden lg:inline text-[13.5px] text-slate-600 hover:text-[#059669] font-normal transition-colors cursor-pointer"
//         >
//           Back to module
//         </Link>

//         {/* Mobile Notification Button */}
//         <button
//           type="button"
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
//           aria-label="Notifications"
//         >
//           <Icon icon="lucide:bell" className="w-4 h-4 text-slate-800" />
//         </button>

//         {/* Mobile Hamburger Menu Button */}
//         <button
//           type="button"
//           onClick={onOpenMobileMenu}
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Open navigation menu"
//         >
//           <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
//         </button>
//       </div>
//     );
//   }

//   if (isQuiz) {
//     return renderHeader(
//       /* Left: Mobile Logo (<lg) & Desktop Quit Quiz + Breadcrumb */
//       <div className="flex items-center gap-4 sm:gap-8">
//         {/* Mobile Logo */}
//         <Link href="/dashboard" className="lg:hidden flex items-center">
//           <Image
//             src="/images/dashboard/dashboard-logo-mobile.png"
//             alt="cannontravels"
//             width={32}
//             height={32}
//             className="h-7 w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Exit Assessment Link */}
//         <Link
//           href="/dashboard/courses/1"
//           className="hidden lg:flex text-[13.5px] sm:text-[14px] text-slate-800 hover:text-[#059669] items-center gap-2 transition-colors cursor-pointer group"
//         >
//           <Icon
//             icon="lucide:arrow-left"
//             className="w-4 h-4 text-slate-800 group-hover:text-[#059669] transition-colors"
//           />
//           <span>Exit Assessment</span>
//         </Link>

//         {/* Desktop Breadcrumb */}
//         <div className="hidden lg:flex items-center gap-2 text-[13.5px] sm:text-[14px] text-slate-800">
//           <span>Institutional Liquidity Foundations</span>
//           <span className="text-slate-400">/</span>
//           <span>Module 1</span>
//           <span className="text-slate-400">/</span>
//           <span>Assessment</span>
//         </div>
//       </div>,

//       /* Right: Timer Pill (Desktop) & Mobile Controls */
//       <div className="flex items-center gap-2 sm:gap-2.5">
//         {/* Desktop Timer Badge */}
//         <div className="hidden lg:inline-flex items-center gap-2 h-9 px-4 sm:px-5 rounded-full bg-[#059669] text-white shadow-sm shadow-emerald-500/20">
//           <Icon icon="lucide:timer" className="w-4 h-4 text-white" />
//           <span className="font-thicccboi text-[13.5px] sm:text-[14px] text-white leading-none tracking-normal">
//             {formatTimer(quizSeconds)}
//           </span>
//         </div>

//         {/* Mobile Notification Button */}
//         <button
//           type="button"
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
//           aria-label="Notifications"
//         >
//           <Icon icon="boxicons:bell" className="w-4 h-4 text-slate-800" />
//         </button>

//         {/* Mobile Hamburger Menu Button */}
//         <button
//           type="button"
//           onClick={onOpenMobileMenu}
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Open navigation menu"
//         >
//           <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
//         </button>
//       </div>
//     );
//   }

//   if (isCourseDetail) {
//     return renderHeader(
//       /* Left: Mobile Logo (<lg) & Desktop Back Link + Breadcrumb (lg+) */
//       <div className="flex items-center gap-3 sm:gap-6">
//         {/* Mobile Logo */}
//         <Link href="/dashboard" className="lg:hidden flex items-center">
//           <Image
//             src="/images/dashboard/dashboard-logo-mobile.png"
//             alt="cannontravels"
//             width={32}
//             height={32}
//             className="h-7 w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Back Link & Breadcrumb */}
//         <div className="hidden lg:flex items-center gap-6">
//           <Link
//             href="/dashboard/courses"
//             className="text-[13.5px] sm:text-[14px] text-slate-800 hover:text-[#059669] flex items-center gap-2 transition-colors cursor-pointer group"
//           >
//             <Icon
//               icon="lucide:arrow-left"
//               className="w-4 h-4 text-slate-800 group-hover:text-[#059669] transition-colors"
//             />
//             <span>Module Library</span>
//           </Link>

//           <div className="flex items-center gap-2 text-[13.5px] sm:text-[14px] text-slate-800">
//             <span>Modules</span>
//             <span className="text-slate-400">/</span>
//             <span>Institutional Liquidity Foundations</span>
//           </div>
//         </div>
//       </div>,

//       /* Right: Mobile Circular Bell + Menu & Desktop Initialize Module Button */
//       <div className="flex items-center gap-2 sm:gap-2.5">
//         {/* Desktop Initialize Module Button */}
//         <Link
//           href="/dashboard/courses/lesson/1"
//           className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13px] font-normal transition-all shadow-sm shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
//         >
//           <span>Initialize Module</span>
//           <svg
//             className="w-3.5 h-3.5 text-white"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <line x1="4" y1="12" x2="20" y2="12" />
//             <polyline points="14 6 20 12 14 18" />
//           </svg>
//         </Link>

//         {/* Mobile Notification Button */}
//         <button
//           type="button"
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
//           aria-label="Notifications"
//         >
//           <Icon icon="lucide:bell" className="w-4 h-4 text-slate-800" />
//         </button>

//         {/* Mobile Hamburger Menu Button */}
//         <button
//           type="button"
//           onClick={onOpenMobileMenu}
//           className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
//           aria-label="Open navigation menu"
//         >
//           <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
//         </button>
//       </div>
//     );
//   }

//   return renderHeader(
//     /* Left: Mobile Logo (<lg) & Desktop Title (lg+) */
//     <div className="flex items-center gap-3">
//       {/* Mobile Logo */}
//       <Link href="/dashboard" className="lg:hidden flex items-center">
//         <Image
//           src="/images/dashboard/dashboard-logo-mobile.png"
//           alt="cannontravels"
//           width={32}
//           height={32}
//           className="h-7 w-auto object-contain"
//         />
//       </Link>

//       {/* Desktop Title */}
//       <h1 className="hidden lg:block text-[14px] sm:text-[15px] font-normal text-slate-800">
//         {title}
//       </h1>
//     </div>,

//     /* Right Actions: Mobile (Bell + Menu in circular pills) & Desktop (Search, Bell, Profile) */
//     <div className="flex items-center gap-2 sm:gap-2.5">
//       {/* Desktop Verify Mandate Button (on /dashboard/mandates) */}
//       {pathname === "/dashboard/mandates" && (
//         <Link
//           href="/dashboard/mandates/verify"
//           className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-4 sm:px-5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[12.5px] sm:text-[13px] font-normal transition-all shadow-sm shadow-emerald-500/20 cursor-pointer whitespace-nowrap"
//         >
//           <Icon icon="boxicons:seal-check-filled" className="w-4 h-4 text-white" />
//           <span>Verify Mandate</span>
//         </Link>
//       )}

//       {/* Desktop Search Button */}
//       <button
//         type="button"
//         className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
//         aria-label="Search"
//       >
//         <Icon icon="lucide:search" className="w-4 h-4 text-slate-700" />
//       </button>

//       {/* Notification Button */}
//       <button
//         type="button"
//         className="w-9 h-9 rounded-full bg-[#ecfdf5] lg:bg-[#F1F5F9] hover:bg-[#d1fae5] lg:hover:bg-[#E2E8F0] active:scale-95 text-slate-800 lg:text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
//         aria-label="Notifications"
//       >
//         <Icon icon="boxicons:bell" className="w-4 h-4 text-slate-800 lg:text-slate-700" />
//       </button>

//       {/* Desktop Profile Link Button */}
//       <Link
//         href="/dashboard/settings"
//         className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
//         aria-label="Profile account"
//       >
//         <Icon icon="basil:user-solid" className="w-4 h-4 text-slate-700" />
//       </Link>

//       {/* Mobile Hamburger Menu Button */}
//       <button
//         type="button"
//         onClick={onOpenMobileMenu}
//         className="lg:hidden w-9 h-9 rounded-full bg-[#ecfdf5] hover:bg-[#d1fae5] active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
//         aria-label="Open navigation menu"
//       >
//         <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
//       </button>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

interface HeaderProps {
  title?: string;
  onOpenMobileMenu?: () => void;
}

export default function DashboardHeader({
  title = "Terminal",
  onOpenMobileMenu,
}: HeaderProps) {
  const pathname = usePathname();
  const [quizSeconds, setQuizSeconds] = useState(0);

  const isVerification = pathname.startsWith("/dashboard/delegated/verify");
  const isLesson = pathname.includes("/lesson");
  const isQuizResult =
    pathname.includes("/quiz") && pathname.includes("/result");
  const isQuiz = pathname.includes("/quiz") && !isQuizResult;
  const isCourseDetail =
    pathname.startsWith("/dashboard/flights/") &&
    pathname !== "/dashboard/flights" &&
    !isLesson &&
    !isQuiz &&
    !isQuizResult;

  useEffect(() => {
    if (!isQuiz) {
      setQuizSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setQuizSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isQuiz]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const renderHeader = (leftContent: React.ReactNode, rightContent: React.ReactNode) => (
    <header className="w-full h-16 bg-[#f8fafc]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 sticky top-0 z-30 transition-colors border-b border-slate-200">
      <div className="w-full h-full flex items-center justify-between">
        {leftContent}
        {rightContent}
      </div>
    </header>
  );

  if (isVerification) {
    return renderHeader(
      /* Left: Mobile Logo & Desktop Breadcrumb */
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Logo */}
        <Link href="/dashboard" className="lg:hidden flex items-center">
          <Image
            src="/images/dashboard/dashboard-logo-mobile.png"
            alt="cannontravels"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Title */}
        <h1 className="hidden lg:block text-[14px] sm:text-[15px] font-normal text-slate-800">
          Delegated Payments
        </h1>
      </div>,

      /* Right: My Delegated Button & Actions */
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Desktop My Delegated Link Button */}
        <Link
          href="/dashboard/delegated"
          className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-4 sm:px-5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white text-[12.5px] sm:text-[13px] font-normal transition-all shadow-sm shadow-red-600/20 cursor-pointer whitespace-nowrap"
        >
          <Icon icon="lucide:link" className="w-4 h-4 text-white" />
          <span>My Delegated Links</span>
        </Link>

        {/* Search */}
        <button
          type="button"
          className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Search"
        >
          <Icon icon="lucide:search" className="w-4 h-4 text-slate-700" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-red-50 lg:bg-[#F1F5F9] hover:bg-red-100 lg:hover:bg-[#E2E8F0] active:scale-95 text-slate-800 lg:text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
          aria-label="Notifications"
        >
          <Icon icon="boxicons:bell" className="w-4 h-4 text-slate-800 lg:text-slate-700" />
        </button>

        {/* Profile Link Button */}
        <Link
          href="/dashboard/settings"
          className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Profile account"
        >
          <Icon icon="basil:user-solid" className="w-4 h-4 text-slate-700" />
        </Link>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Open navigation menu"
        >
          <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
        </button>
      </div>
    );
  }

  if (isLesson) {
    return renderHeader(
      /* Left: Mobile Logo (<lg) & Desktop Back Link + Breadcrumb (lg+) */
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Mobile Logo */}
        <Link href="/dashboard" className="lg:hidden flex items-center">
          <Image
            src="/images/dashboard/dashboard-logo-mobile.png"
            alt="cannontravels"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Flight Overview Link & Breadcrumb */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/dashboard/flights/1"
            className="text-[13.5px] sm:text-[14px] text-slate-800 hover:text-[#DC2626] flex items-center gap-2 transition-colors cursor-pointer group"
          >
            <Icon
              icon="lucide:arrow-left"
              className="w-4 h-4 text-slate-800 group-hover:text-[#DC2626] transition-colors"
            />
            <span>Flight Overview</span>
          </Link>

          <div className="flex items-center gap-2 text-[13.5px] sm:text-[14px] text-slate-800">
            <span>Global Route Inventory</span>
            <span className="text-slate-400">/</span>
            <span>Flight Segment 1</span>
            <span className="text-slate-400">/</span>
            <span>Check-in</span>
          </div>
        </div>
      </div>,

      /* Right: Mobile Circular Bell + Menu & Desktop Next Button */
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Desktop Next Section Button */}
        <Link
          href="/dashboard/flights/1/quiz"
          className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white text-[13px] font-normal transition-all shadow-sm shadow-red-600/20 cursor-pointer whitespace-nowrap"
        >
          <span>Next Flight Check</span>
          <svg
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="14 6 20 12 14 18" />
          </svg>
        </Link>

        {/* Mobile Notification Button */}
        <button
          type="button"
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
          aria-label="Notifications"
        >
          <Icon icon="lucide:bell" className="w-4 h-4 text-slate-800" />
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Open navigation menu"
        >
          <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
        </button>
      </div>
    );
  }

  if (isQuizResult) {
    return renderHeader(
      /* Left: Mobile Logo (<lg) & Desktop Title (lg+) */
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Mobile Logo */}
        <Link href="/dashboard" className="lg:hidden flex items-center">
          <Image
            src="/images/dashboard/dashboard-logo-mobile.png"
            alt="cannontravels"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Assessment Complete Title */}
        <span className="hidden lg:inline text-[14px] text-slate-800 font-normal">
          Checkout complete
        </span>
      </div>,

      /* Right: Mobile Circular Bell + Menu & Desktop Back to flight link */
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Desktop Back to flight link */}
        <Link
          href="/dashboard/flights/1"
          className="hidden lg:inline text-[13.5px] text-slate-600 hover:text-[#DC2626] font-normal transition-colors cursor-pointer"
        >
          Back to flight
        </Link>

        {/* Mobile Notification Button */}
        <button
          type="button"
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
          aria-label="Notifications"
        >
          <Icon icon="lucide:bell" className="w-4 h-4 text-slate-800" />
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Open navigation menu"
        >
          <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
        </button>
      </div>
    );
  }

  if (isQuiz) {
    return renderHeader(
      /* Left: Mobile Logo (<lg) & Desktop Quit Quiz + Breadcrumb */
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Mobile Logo */}
        <Link href="/dashboard" className="lg:hidden flex items-center">
          <Image
            src="/images/dashboard/dashboard-logo-mobile.png"
            alt="cannontravels"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Exit Assessment Link */}
        <Link
          href="/dashboard/flights/1"
          className="hidden lg:flex text-[13.5px] sm:text-[14px] text-slate-800 hover:text-[#DC2626] items-center gap-2 transition-colors cursor-pointer group"
        >
          <Icon
            icon="lucide:arrow-left"
            className="w-4 h-4 text-slate-800 group-hover:text-[#DC2626] transition-colors"
          />
          <span>Exit Checkout</span>
        </Link>

        {/* Desktop Breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-[13.5px] sm:text-[14px] text-slate-800">
          <span>Global Flight Inventory</span>
          <span className="text-slate-400">/</span>
          <span>Segment 1</span>
          <span className="text-slate-400">/</span>
          <span>Checkout Assessment</span>
        </div>
      </div>,

      /* Right: Timer Pill (Desktop) & Mobile Controls */
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Desktop Timer Badge */}
        <div className="hidden lg:inline-flex items-center gap-2 h-9 px-4 sm:px-5 rounded-full bg-[#DC2626] text-white shadow-sm shadow-red-600/20">
          <Icon icon="lucide:timer" className="w-4 h-4 text-white" />
          <span className="font-mono text-[13.5px] sm:text-[14px] text-white leading-none tracking-normal">
            {formatTimer(quizSeconds)}
          </span>
        </div>

        {/* Mobile Notification Button */}
        <button
          type="button"
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
          aria-label="Notifications"
        >
          <Icon icon="boxicons:bell" className="w-4 h-4 text-slate-800" />
        </button>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Open navigation menu"
        >
          <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
        </button>
      </div>
    );
  }

  if (isCourseDetail) {
    return renderHeader(
      /* Left: Mobile Logo (<lg) & Desktop Back Link + Breadcrumb (lg+) */
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Mobile Logo */}
        <Link href="/dashboard" className="lg:hidden flex items-center">
          <Image
            src="/images/dashboard/dashboard-logo-mobile.png"
            alt="cannontravels"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Back Link & Breadcrumb */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/dashboard/flights"
            className="text-[13.5px] sm:text-[14px] text-slate-800 hover:text-[#DC2626] flex items-center gap-2 transition-colors cursor-pointer group"
          >
            <Icon
              icon="lucide:arrow-left"
              className="w-4 h-4 text-slate-800 group-hover:text-[#DC2626] transition-colors"
            />
            <span>Flight Library</span>
          </Link>

          <div className="flex items-center gap-2 text-[13.5px] sm:text-[14px] text-slate-800">
            <span>Inventory</span>
            <span className="text-slate-400">/</span>
            <span>Global Route Explorer</span>
          </div>
        </div>
      </div>,

      /* Right: Mobile Circular Bell + Menu & Desktop Initialize Flight Button */
      // <div className="flex items-center gap-2 sm:gap-2.5">
      //   {/* Desktop Initialize Flight Button */}
      //   <Link
      //     href="/dashboard/flights/lesson/1"
      //     className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white text-[13px] font-normal transition-all shadow-sm shadow-red-600/20 cursor-pointer whitespace-nowrap"
      //   >
      //     {/* <span>Initialize Flight</span> */}
      //     <svg
      //       className="w-3.5 h-3.5 text-white"
      //       viewBox="0 0 24 24"
      //       fill="none"
      //       stroke="currentColor"
      //       strokeWidth="2.5"
      //       strokeLinecap="round"
      //       strokeLinejoin="round"
      //     >
      //       <line x1="4" y1="12" x2="20" y2="12" />
      //       <polyline points="14 6 20 12 14 18" />
      //     </svg>
      //   </Link>

      //   {/* Mobile Notification Button */}
      //   <button
      //     type="button"
      //     className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
      //     aria-label="Notifications"
      //   >
      //     <Icon icon="lucide:bell" className="w-4 h-4 text-slate-800" />
      //   </button>

      //   {/* Mobile Hamburger Menu Button */}
      //   <button
      //     type="button"
      //     onClick={onOpenMobileMenu}
      //     className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
      //     aria-label="Open navigation menu"
      //   >
      //     <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
      //   </button>
      // </div>
    );
  }

  return renderHeader(
    /* Left: Mobile Logo (<lg) & Desktop Title (lg+) */
    <div className="flex items-center gap-3">
      {/* Mobile Logo */}
      <Link href="/dashboard" className="lg:hidden flex items-center">
        <Image
          src="/images/dashboard/dashboard-logo-mobile.png"
          alt="cannontravels"
          width={32}
          height={32}
          className="h-7 w-auto object-contain"
        />
      </Link>

      {/* Desktop Title */}
      <h1 className="hidden lg:block text-[14px] sm:text-[15px] font-normal text-slate-800">
        {title}
      </h1>
    </div>,

    /* Right Actions: Mobile (Bell + Menu in circular pills) & Desktop (Search, Bell, Profile) */
    <div className="flex items-center gap-2 sm:gap-2.5">
      {/* Desktop Verify Mandate Button (on /dashboard/delegated) */}
      {pathname === "/dashboard/delegated" && (
        <Link
          href="/dashboard/delegated/verify"
          className="hidden lg:inline-flex items-center justify-center gap-2 h-9 px-4 sm:px-5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white text-[12.5px] sm:text-[13px] font-normal transition-all shadow-sm shadow-red-600/20 cursor-pointer whitespace-nowrap"
        >
          <Icon icon="boxicons:seal-check-filled" className="w-4 h-4 text-white" />
          <span>Verify Payment Link</span>
        </Link>
      )}

      {/* Desktop Search Button */}
      <button
        type="button"
        className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
        aria-label="Search"
      >
        <Icon icon="lucide:search" className="w-4 h-4 text-slate-700" />
      </button>

      {/* Notification Button */}
      <button
        type="button"
        className="w-9 h-9 rounded-full bg-red-50 lg:bg-[#F1F5F9] hover:bg-red-100 lg:hover:bg-[#E2E8F0] active:scale-95 text-slate-800 lg:text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
        aria-label="Notifications"
      >
        <Icon icon="boxicons:bell" className="w-4 h-4 text-slate-800 lg:text-slate-700" />
      </button>

      {/* Desktop Profile Link Button */}
      <Link
        href="/dashboard/settings"
        className="hidden lg:flex w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 text-slate-700 items-center justify-center transition-all cursor-pointer shadow-sm"
        aria-label="Profile account"
      >
        <Icon icon="basil:user-solid" className="w-4 h-4 text-slate-700" />
      </Link>

      {/* Mobile Hamburger Menu Button */}
      <button
        type="button"
        onClick={onOpenMobileMenu}
        className="lg:hidden w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 active:scale-95 text-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-sm"
        aria-label="Open navigation menu"
      >
        <Icon icon="lucide:menu" className="w-4 h-4 text-slate-800" />
      </button>
    </div>
  );
}