const items = [
  { label: 'Cyber threats', color: '#1473E6' },
  { label: 'Legal risk', color: '#F5B82E' },
  { label: 'Compliance failures', color: '#A855F7' },
  { label: 'Technology challenges', color: '#F97316' },
]

const Track = ({ hidden = false }) => (
  <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden}>
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-12">
        <span className="flex items-center gap-3 whitespace-nowrap font-display text-lg font-semibold text-white sm:text-xl">
          <span className="h-2 w-2 rotate-45 rounded-[2px]" style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}` }} />
          {item.label}
          <span className="font-medium text-slate-500">become a non-event</span>
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-white/30 to-transparent" />
      </div>
    ))}
  </div>
)

const Marquee = () => (
  <div className="relative overflow-hidden border-y border-white/10 bg-[#0B1730] py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
      <Track />
      <Track hidden />
    </div>
  </div>
)

export default Marquee
