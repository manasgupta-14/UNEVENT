let store = new WeakMap()

if (typeof window !== 'undefined') {
  window.addEventListener(
    'resize',
    () => {
      store = new WeakMap()
    },
    { passive: true },
  )
}

export const rectOf = (element) => {
  const now = performance.now()
  const scroll = window.scrollY
  const hit = store.get(element)

  if (hit && now - hit.at < 800) {
    return { left: hit.left, top: hit.top + hit.scroll - scroll, width: hit.width, height: hit.height }
  }

  const rect = element.getBoundingClientRect()
  store.set(element, { left: rect.left, top: rect.top, width: rect.width, height: rect.height, scroll, at: now })
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
}
