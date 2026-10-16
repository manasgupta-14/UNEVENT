export const inputClass = (error) =>
  `w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none transition-all duration-300 hover:bg-white/[0.07] focus:bg-white/[0.08] focus:ring-2 ${
    error
      ? 'border-red-400/70 hover:border-red-400 focus:border-red-400 focus:ring-red-400/30'
      : 'border-white/10 hover:border-[#1473E6]/70 focus:border-[#F5B82E] focus:ring-[#F5B82E]/25'
  }`
