const items = [
  { label: 'Cyber exposure', color: '#1685DB' },
  { label: 'Legal and commercial risk', color: '#E9AB27' },
  { label: 'Compliance gaps', color: '#7146C8' },
  { label: 'Technology challenges', color: '#C58A19' },
]

const Track = ({ hidden = false }) => (
  <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden}>
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-12">
        <span className="flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-white sm:text-xl">
          <span className="h-2 w-2 rotate-45 rounded-[2px]" style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}` }} />
          {item.label}
          <span className="font-medium text-slate-500">identified earlier, handled better</span>
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-white/30 to-transparent" />
      </div>
    ))}
  </div>
)

const Marquee = () => (
  <div className="sticky bottom-0 z-30 mt-auto overflow-hidden border-y border-white/10 bg-[#0B1730] py-5">
    <div className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Track />
        <Track hidden />
      </div>
    </div>

    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#60A5FA]/25 to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#60A5FA]/25 to-transparent" />
  </div>
)

export default Marquee
