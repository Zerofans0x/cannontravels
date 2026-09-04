
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// export interface AuthHeroCardProps {
//   badge?: React.ReactNode;
//   title?: React.ReactNode;
//   subtitle?: React.ReactNode;
//   illustrationSrc?: string;
//   illustrationAlt?: string;
//   illustrationWidth?: string | number;
//   illustrationWidthMobile?: string | number;
//   illustrationPosition?: string;
//   illustrationPositionMobile?: string;
//   illustrationObjectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
//   illustrationClassName?: string;
//   illustrationWrapperClassName?: string;
//   cardWidth?: string;
//   bgColor?: string;
//   socialProofText?: string;
//   avatars?: string[];
//   showSocialProof?: boolean;
//   tagline?: string;
//   showBlurOverlay?: boolean;
//   imagesWidth?: string;
// }

// export default function AuthHeroCard({
//   badge,
//   title = (
//     <>
//       Welcome back. <br />
//       <span className="text-[#DC2626]">Your flight dashboard is active.</span>
//     </>
//   ),
//   subtitle = "Pick up exactly where you left off. Your PNR bookings, third-party sponsorships, and live airspace telemetry — all secured.",
//   illustrationSrc = "/images/auth/auth.gif",
//   illustrationAlt = "Auth Illustration",
//   illustrationWidth,
//   imagesWidth,
//   illustrationWidthMobile,
//   illustrationPosition = "-translate-y-14 lg:-translate-y-16",
//   illustrationPositionMobile,
//   illustrationObjectFit = "contain",
//   illustrationClassName = "",
//   illustrationWrapperClassName,
//   cardWidth = "w-[550px]",
//   bgColor = "bg-slate-900",
//   socialProofText = "1,420 global travelers booking today",
//   avatars = [
//     "/images/emrld.jpg",
//     "/images/bella.jpg",
//     "/images/alubarika.jpg",
//   ],
//   showSocialProof = true,
//   tagline,
//   showBlurOverlay = true,
// }: AuthHeroCardProps) {
//   const resolvedWidthClass = (() => {
//     const toWidthClass = (w: string | number) =>
//       typeof w === "number" ? `w-[${w}px]` : w.startsWith("w-") ? w : `w-[${w}]`;

//     if (illustrationWidthMobile !== undefined && illustrationWidth !== undefined) {
//       return `${toWidthClass(illustrationWidthMobile)} lg:${toWidthClass(illustrationWidth)}`;
//     }
//     if (illustrationWidthMobile !== undefined) {
//       return toWidthClass(illustrationWidthMobile);
//     }
//     if (illustrationWidth !== undefined) {
//       return toWidthClass(illustrationWidth);
//     }
//     return "w-[260px] lg:w-[420px]";
//   })();

//   const resolvedPositionClass = (() => {
//     if (illustrationPositionMobile && illustrationPosition) {
//       if (illustrationPosition.includes("lg:") || illustrationPosition.includes("md:")) {
//         return `${illustrationPositionMobile} ${illustrationPosition}`;
//       }
//       return `${illustrationPositionMobile} lg:${illustrationPosition}`;
//     }
//     return illustrationPosition || illustrationPositionMobile || "-translate-y-14 lg:-translate-y-16";
//   })();

//   return (
//     <div className="lg:col-span-6 flex flex-col h-full justify-center">
//       <div
//         className={`relative ${cardWidth} max-w-full h-full max-h-[880px] overflow-hidden p-7 pt-8 sm:p-10 lg:p-12 flex flex-col justify-between rounded-[32px] sm:rounded-[36px] lg:rounded-[20px] ${bgColor} text-white border border-slate-800 shadow-xl`}
//       >
//         <div className="absolute z-10 -bottom-10 -left-10 -right-10 h-[50%] pointer-events-none rounded-b-[32px] sm:rounded-b-[36px] lg:rounded-b-[20px] bg-slate-950/80 blur-lg" />

//         <div className="relative z-10 flex items-center justify-between w-full">
//           <Link href="/" className="flex items-center">
//             <span className="font-mazzard text-xl font-black tracking-tight text-white flex items-center gap-2">
//               <span className="w-3 h-3 rounded-full bg-[#DC2626] animate-pulse" />
//               CannonTravels
//             </span>
//           </Link>
//           {tagline && (
//             <span className="hidden sm:inline-block text-red-400 text-[11.5px] sm:text-[13.5px] font-bold tracking-wide">
//               {tagline}
//             </span>
//           )}
//         </div>

//         {illustrationSrc && (
//           <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
//             <div
//               className={
//                 illustrationWrapperClassName ||
//                 (imagesWidth
//                   ? `relative aspect-[4/5] ${imagesWidth}`
//                   : `relative aspect-[4/5] ${resolvedWidthClass} ${resolvedPositionClass}`)
//               }
//             >
//               <Image
//                 src={illustrationSrc}
//                 alt={illustrationAlt}
//                 fill
//                 priority
//                 style={{ objectFit: illustrationObjectFit }}
//                 className={illustrationClassName}
//               />
//             </div>
//           </div>
//         )}

//         {showBlurOverlay && (
//           <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[5] pointer-events-none rounded-b-[28px] sm:rounded-b-[32px] lg:rounded-b-[20px] overflow-hidden">
//             <div className="blur-xl bg-slate-900/10 p-10 rounded-full" />
//           </div>
//         )}

//         <div className="relative z-10 flex flex-col mt-auto pt-3 sm:pt-4">
//           {badge && <div className="mb-2.5 sm:mb-3.5">{badge}</div>}

//           <h1 className="font-mazzard text-[24px] sm:text-3xl lg:text-4xl text-white leading-[1.14] tracking-tight font-black">
//             {title}
//           </h1>

//           {subtitle && (
//             <p className="mt-2 sm:mt-3 text-slate-300 text-[11.5px] sm:text-[13px] lg:text-[14px] leading-relaxed max-w-[420px] font-medium">
//               {subtitle}
//             </p>
//           )}

//           {showSocialProof && (
//             <>
//               <div className="w-full h-px bg-slate-800 my-4 sm:my-6" />

//               <div className="flex items-center gap-2.5 sm:gap-3">
//                 <div className="flex -space-x-2">
//                   {avatars.map((avatar, idx) => (
//                     <div
//                       key={idx}
//                       className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full border-2 border-slate-900 overflow-hidden relative shadow-xs bg-slate-800"
//                     >
//                       <Image
//                         src={avatar}
//                         alt="Traveler avatar"
//                         fill
//                         sizes="28px"
//                         className="object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <span className="text-[11.5px] sm:text-[13px] text-slate-300 font-medium">
//                   {socialProofText}
//                 </span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// components/auth/AuthHeroCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface AuthHeroCardProps {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  illustrationSrc?: string;
  illustrationAlt?: string;
  illustrationWidth?: string | number;
  illustrationWidthMobile?: string | number;
  illustrationPosition?: string;
  illustrationPositionMobile?: string;
  illustrationObjectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  illustrationClassName?: string;
  illustrationWrapperClassName?: string;
  cardWidth?: string;
  bgColor?: string;
  socialProofText?: string;
  avatars?: string[];
  showSocialProof?: boolean;
  tagline?: string;
  showBlurOverlay?: boolean;
  imagesWidth?: string;
}

export default function AuthHeroCard({
  badge,
  title = (
    <>
      Welcome back. <br />
      <span className="text-[#DC2626]">Your flight dashboard is active.</span>
    </>
  ),
  subtitle = "Pick up exactly where you left off. Your PNR bookings, third-party sponsorships, and live airspace telemetry — all secured.",
  illustrationSrc = "/images/auth/auth.gif",
  illustrationAlt = "Auth Illustration",
  illustrationWidth,
  imagesWidth,
  illustrationWidthMobile,
  illustrationPosition = "-translate-y-14 lg:-translate-y-16",
  illustrationPositionMobile,
  illustrationObjectFit = "contain",
  illustrationClassName = "",
  illustrationWrapperClassName,
  cardWidth = "w-[550px]",
  bgColor = "bg-slate-900",
  socialProofText = "1,420 global travelers booking today",
  avatars = [
    "/images/emrld.jpg",
    "/images/bella.jpg",
    "/images/alubarika.jpg",
  ],
  showSocialProof = true,
  tagline,
  showBlurOverlay = true,
}: AuthHeroCardProps) {
  const resolvedWidthClass = (() => {
    const toWidthClass = (w: string | number) =>
      typeof w === "number" ? `w-[${w}px]` : w.startsWith("w-") ? w : `w-[${w}]`;

    if (illustrationWidthMobile !== undefined && illustrationWidth !== undefined) {
      return `${toWidthClass(illustrationWidthMobile)} lg:${toWidthClass(illustrationWidth)}`;
    }
    if (illustrationWidthMobile !== undefined) {
      return toWidthClass(illustrationWidthMobile);
    }
    if (illustrationWidth !== undefined) {
      return toWidthClass(illustrationWidth);
    }
    return "w-[260px] lg:w-[420px]";
  })();

  const resolvedPositionClass = (() => {
    if (illustrationPositionMobile && illustrationPosition) {
      if (illustrationPosition.includes("lg:") || illustrationPosition.includes("md:")) {
        return `${illustrationPositionMobile} ${illustrationPosition}`;
      }
      return `${illustrationPositionMobile} lg:${illustrationPosition}`;
    }
    return illustrationPosition || illustrationPositionMobile || "-translate-y-14 lg:-translate-y-16";
  })();

  return (
    <div className="lg:col-span-6 flex flex-col h-full justify-center">
      <div
        className={`relative ${cardWidth} max-w-full h-full max-h-[880px] overflow-hidden p-7 pt-8 sm:p-10 lg:p-12 flex flex-col justify-between rounded-[32px] sm:rounded-[36px] lg:rounded-[20px] ${bgColor} text-white border border-slate-800 shadow-xl`}
      >
        <div className="absolute z-10 -bottom-10 -left-10 -right-10 h-[50%] pointer-events-none rounded-b-[32px] sm:rounded-b-[36px] lg:rounded-b-[20px] bg-slate-950/80 blur-lg" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center">
            <span className="font-mazzard text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DC2626] animate-pulse" />
              CannonTravels
            </span>
          </Link>
          {tagline && (
            <span className="hidden sm:inline-block text-red-400 text-[11.5px] sm:text-[13.5px] font-bold tracking-wide">
              {tagline}
            </span>
          )}
        </div>

        {illustrationSrc && (
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div
              className={
                illustrationWrapperClassName ||
                (imagesWidth
                  ? `relative aspect-[4/5] ${imagesWidth}`
                  : `relative aspect-[4/5] ${resolvedWidthClass} ${resolvedPositionClass}`)
              }
            >
              <Image
                src={illustrationSrc}
                alt={illustrationAlt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                style={{ objectFit: illustrationObjectFit }}
                className={illustrationClassName}
              />
            </div>
          </div>
        )}

        {showBlurOverlay && (
          <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[5] pointer-events-none rounded-b-[28px] sm:rounded-b-[32px] lg:rounded-b-[20px] overflow-hidden">
            <div className="blur-xl bg-slate-900/10 p-10 rounded-full" />
          </div>
        )}

        <div className="relative z-10 flex flex-col mt-auto pt-3 sm:pt-4">
          {badge && <div className="mb-2.5 sm:mb-3.5">{badge}</div>}

          <h1 className="font-mazzard text-[24px] sm:text-3xl lg:text-4xl text-white leading-[1.14] tracking-tight font-black">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 sm:mt-3 text-slate-300 text-[11.5px] sm:text-[13px] lg:text-[14px] leading-relaxed max-w-[420px] font-medium">
              {subtitle}
            </p>
          )}

          {showSocialProof && (
            <>
              <div className="w-full h-px bg-slate-800 my-4 sm:my-6" />

              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, idx) => (
                    <div
                      key={idx}
                      className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full border-2 border-slate-900 overflow-hidden relative shadow-xs bg-slate-800"
                    >
                      <Image
                        src={avatar}
                        alt="Traveler avatar"
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[11.5px] sm:text-[13px] text-slate-300 font-medium">
                  {socialProofText}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}