const tone = (dark) => (dark ? 'border-white/10 bg-white/[0.05]' : 'border-slate-200 bg-white')
const bar = (dark) => (dark ? 'bg-white/10' : 'bg-slate-200')

export const CardSkeleton = ({ className = '', dark = false }) => (
  <div aria-hidden="true" className={`animate-pulse rounded-3xl border p-6 ${tone(dark)} ${className}`}>
    <div className={`h-10 w-10 rounded-xl ${bar(dark)}`} />
    <div className={`mt-5 h-4 w-2/3 rounded-full ${bar(dark)}`} />
    <div className={`mt-3 h-3 w-full rounded-full ${bar(dark)}`} />
    <div className={`mt-2 h-3 w-5/6 rounded-full ${bar(dark)}`} />
    <div className="mt-8 flex h-24 items-end gap-3">
      {[40, 65, 50, 90].map((h) => (
        <span key={h} className={`flex-1 rounded-t-lg ${bar(dark)}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
)

export const CardGridSkeleton = ({ count = 3, dark = false, id }) => (
  <section id={id} aria-busy="true" className={`min-h-[70svh] py-16 ${dark ? 'bg-[#0B1730]' : ''}`}>
    <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} dark={dark} />
      ))}
    </div>
  </section>
)

export const PageSkeleton = () => (
  <div aria-busy="true">
    <div className="animate-pulse bg-[#0B1730] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-40 rounded-full bg-white/10" />
        <div className="mt-6 h-10 w-2/3 max-w-xl rounded-full bg-white/10" />
        <div className="mt-4 h-4 w-1/2 max-w-md rounded-full bg-white/10" />
      </div>
    </div>
    <CardGridSkeleton count={3} />
  </div>
)
