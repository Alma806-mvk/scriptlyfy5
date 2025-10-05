export default function TrustBar() {
  return (
    <section className="border-t border-b border-slate-200 bg-slate-50/50">
      {/* Mobile-first compact layout */}
      <div className="px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 sm:py-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 w-full">
        {/* Label (smaller on mobile) */}
        <div className="text-[11px] font-medium tracking-wide uppercase text-slate-500 sm:text-xs">
          As seen in
        </div>
        {/* Logo list: trimmed + wraps; hide last two on very small screens to reduce noise */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 opacity-80 text-xs sm:text-sm">
          {[
            "GrowthDaily",
            "SaaSWeekly",
            "CreatorHub",
            "AdOps Pro",
            "PMM Today",
          ].map((name, i) => (
            <div
              key={name}
              className={
                // hide 4th+ items on very narrow view, reveal progressively
                i >= 3
                  ? "hidden xs:inline-block sm:inline-block h-5 sm:h-6 font-semibold tracking-wide text-slate-500"
                  : "h-5 sm:h-6 font-semibold tracking-wide text-slate-500"
              }
            >
              {name}
            </div>
          ))}
        </div>
        {/* Stat: hide on base, show from sm up; keeps mobile minimal */}
        <div className="hidden sm:block text-xs sm:text-sm sm:ml-auto font-medium text-slate-500">
          17,834 videos transcribed this week
        </div>
      </div>
    </section>
  );
}
